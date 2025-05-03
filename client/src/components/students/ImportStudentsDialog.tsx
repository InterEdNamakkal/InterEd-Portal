import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FileSpreadsheet, Upload, AlertTriangle, CheckCircle2, X } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ImportStudentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ImportStudentsDialog: React.FC<ImportStudentsDialogProps> = ({ open, onOpenChange }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [importStats, setImportStats] = useState<{
    total: number;
    imported: number;
    skipped: number;
    failed: number;
  } | null>(null);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv' && 
          selectedFile.type !== 'application/vnd.ms-excel' &&
          !selectedFile.type.includes('spreadsheet')) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a CSV or Excel file",
          variant: "destructive"
        });
        return;
      }
      
      setFile(selectedFile);
      setUploadStatus('idle');
      setErrorMessage(null);
      setImportStats(null);
    }
  };
  
  // Reset state when dialog is closed
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setFile(null);
      setUploadStatus('idle');
      setErrorMessage(null);
      setImportStats(null);
    }
    onOpenChange(open);
  };
  
  // Define import response type
  interface ImportResponse {
    total: number;
    imported: number;
    skipped: number;
    failed: number;
  }
  
  // Import students mutation
  const importStudentsMutation = useMutation<ImportResponse, Error, File>({
    mutationFn: async (file: File) => {
      setUploadStatus('uploading');
      
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await apiRequest('/api/students/import', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      return data as ImportResponse;
    },
    onSuccess: (data) => {
      setUploadStatus('success');
      setImportStats({
        total: data.total || 0,
        imported: data.imported || 0,
        skipped: data.skipped || 0,
        failed: data.failed || 0,
      });
      
      toast({
        title: "Import Successful",
        description: `Successfully imported ${data.imported} students`,
      });
      
      // Refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/students'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats/students/stage-counts'] });
    },
    onError: (error: Error) => {
      setUploadStatus('error');
      setErrorMessage(error.message || "Failed to import students");
      
      toast({
        title: "Import Failed",
        description: error.message || "Failed to import students",
        variant: "destructive"
      });
    }
  });
  
  const handleUpload = () => {
    if (file) {
      importStudentsMutation.mutate(file);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Students</DialogTitle>
          <DialogDescription>
            Upload a CSV or Excel file to import multiple students at once.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {uploadStatus === 'idle' && (
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="file">Upload File</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="file"
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  onClick={handleUpload}
                  disabled={!file}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Supported file formats: CSV, Excel (.xlsx, .xls)
              </p>
            </div>
          )}
          
          {uploadStatus === 'uploading' && (
            <div className="flex flex-col items-center py-4">
              <div className="animate-spin mb-2">
                <FileSpreadsheet className="h-8 w-8 text-indigo-600" />
              </div>
              <p className="text-sm text-gray-500">Importing students, please wait...</p>
            </div>
          )}
          
          {uploadStatus === 'error' && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Import Failed</AlertTitle>
              <AlertDescription>
                {errorMessage || "There was an error importing the students."}
              </AlertDescription>
            </Alert>
          )}
          
          {uploadStatus === 'success' && importStats && (
            <div className="space-y-3">
              <Alert className="bg-green-50 border-green-300">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Import Successful</AlertTitle>
                <AlertDescription className="text-green-700">
                  Successfully imported {importStats.imported} of {importStats.total} students.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded bg-green-50 border border-green-100">
                  <p className="text-lg font-semibold text-green-700">{importStats.imported}</p>
                  <p className="text-xs text-green-600">Imported</p>
                </div>
                <div className="p-2 rounded bg-yellow-50 border border-yellow-100">
                  <p className="text-lg font-semibold text-yellow-700">{importStats.skipped}</p>
                  <p className="text-xs text-yellow-600">Skipped</p>
                </div>
                <div className="p-2 rounded bg-red-50 border border-red-100">
                  <p className="text-lg font-semibold text-red-700">{importStats.failed}</p>
                  <p className="text-xs text-red-600">Failed</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="pt-2">
            <h3 className="font-semibold text-sm mb-1">Example Format:</h3>
            <div className="bg-gray-50 p-2 rounded border text-xs overflow-x-auto">
              <pre>firstName,lastName,email,phone,nationality,stage,status,agent,program,university,notes,isHighPriority</pre>
              <pre>John,Smith,john@example.com,+1234567890,British,inquiry,active,Agent Name,Program Name,University Name,Student notes,true</pre>
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
          >
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportStudentsDialog;