import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUp, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadDocumentsDialogProps {
  applicationId: number;
  studentName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function UploadDocumentsDialog({
  applicationId,
  studentName,
  open,
  onOpenChange,
  onSuccess
}: UploadDocumentsDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<string>("");
  const { toast } = useToast();

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload");
      return;
    }

    if (!documentType) {
      setError("Please specify the document type");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // In a real implementation, you would create a FormData object and upload the file
      // const formData = new FormData();
      // formData.append('file', selectedFile);
      // formData.append('documentType', documentType);
      // formData.append('applicationId', applicationId.toString());

      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // API successful
      toast({
        title: "Document uploaded",
        description: `${documentType} for ${studentName} has been uploaded successfully.`,
      });

      if (onSuccess) {
        onSuccess();
      }

      // Reset form and close dialog
      setSelectedFile(null);
      setDocumentType("");
      onOpenChange(false);
    } catch (err) {
      console.error("Error uploading document:", err);
      setError("Failed to upload document. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Upload documents for {studentName}'s application.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {error && (
            <div className="text-sm font-medium text-red-500 dark:text-red-900">
              {error}
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="documentType" className="text-right">
              Document Type
            </Label>
            <Input
              id="documentType"
              placeholder="e.g. Passport, Transcript"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="document" className="text-right">
              File
            </Label>
            <div className="col-span-3">
              <Input
                id="document"
                type="file"
                onChange={handleFileChange}
                className="col-span-3"
              />
              {selectedFile && (
                <p className="text-xs text-muted-foreground mt-1">
                  Selected file: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                </p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <FileUp className="mr-2 h-4 w-4" /> Upload
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}