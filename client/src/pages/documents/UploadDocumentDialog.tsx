import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Upload,
  X,
  File,
  Check
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define schema for document upload
const uploadDocumentSchema = z.object({
  name: z.string().min(1, { message: "Document name is required" }),
  category: z.string().min(1, { message: "Please select a category" }),
  tags: z.string().optional(),
});

type UploadDocumentValues = z.infer<typeof uploadDocumentSchema>;

interface UploadDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Document categories
const documentCategories = [
  { id: "student", name: "Student Documents" },
  { id: "agent", name: "Agent Documents" },
  { id: "university", name: "University Documents" },
  { id: "visa", name: "Visa Documents" },
  { id: "contracts", name: "Contracts" },
  { id: "templates", name: "Document Templates" },
  { id: "other", name: "Other" },
];

export default function UploadDocumentDialog({
  open,
  onOpenChange,
}: UploadDocumentDialogProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<UploadDocumentValues>({
    resolver: zodResolver(uploadDocumentSchema),
    defaultValues: {
      name: "",
      category: "",
      tags: "",
    },
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      setFiles(prev => [...prev, ...newFiles]);
      
      // Initialize upload progress for each file
      const newProgress: {[key: string]: number} = {};
      newFiles.forEach(file => {
        newProgress[file.name] = 0;
      });
      setUploadProgress(prev => ({ ...prev, ...newProgress }));
    }
  };
  
  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(file => file.name !== fileName));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
  };
  
  const simulateUpload = () => {
    setUploading(true);
    
    // Simulate upload progress for each file
    files.forEach(file => {
      let progress = 0;
      const intervalId = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: Math.floor(progress),
        }));
        
        if (progress === 100) {
          clearInterval(intervalId);
          
          // Check if all files are uploaded
          const allUploaded = Object.values(uploadProgress).every(p => p === 100);
          if (allUploaded) {
            setTimeout(() => {
              setUploading(false);
              onOpenChange(false);
              setFiles([]);
              setUploadProgress({});
            }, 500);
          }
        }
      }, 300);
    });
  };
  
  const onSubmit = (data: UploadDocumentValues) => {
    if (files.length === 0) {
      // Show error message when no files selected
      return;
    }
    
    simulateUpload();
  };
  
  // Calculate total size of files
  const getTotalSize = () => {
    return files.reduce((total, file) => total + file.size, 0);
  };
  
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Get appropriate icon for file type
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <File className="h-5 w-5 text-red-500" />;
      case 'doc':
      case 'docx':
        return <File className="h-5 w-5 text-blue-500" />;
      case 'xls':
      case 'xlsx':
        return <File className="h-5 w-5 text-green-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <File className="h-5 w-5 text-purple-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Documents</DialogTitle>
          <DialogDescription>
            Upload documents to the system. Supported formats include PDF, DOCX, XLSX, JPG, and PNG.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
              />
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 text-center">
                <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PDF, DOCX, XLSX, JPG, PNG (Max 10MB per file)
              </p>
            </div>
            
            {files.length > 0 && (
              <div className="border rounded-md">
                <div className="p-3 bg-gray-50 border-b flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {files.length} {files.length === 1 ? 'file' : 'files'} ({formatFileSize(getTotalSize())})
                  </span>
                </div>
                <div className="max-h-[200px] overflow-y-auto">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center p-3 border-b last:border-0">
                      <div className="flex-shrink-0 mr-3">
                        {getFileIcon(file.name)}
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="text-sm font-medium truncate">{file.name}</div>
                        <div className="text-xs text-gray-500">{formatFileSize(file.size)}</div>
                        
                        {uploading && uploadProgress[file.name] !== undefined && (
                          <div className="mt-1">
                            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-600 rounded-full" 
                                style={{ width: `${uploadProgress[file.name]}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5 text-right">
                              {uploadProgress[file.name] === 100 ? (
                                <span className="text-green-500 flex items-center justify-end text-xs">
                                  <Check className="h-3 w-3 mr-1" /> Complete
                                </span>
                              ) : (
                                `${uploadProgress[file.name]}%`
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="ml-2 h-7 w-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(file.name);
                        }}
                        disabled={uploading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Category</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value} 
                    disabled={uploading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {documentCategories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter tags separated by commas" 
                      {...field} 
                      disabled={uploading}
                    />
                  </FormControl>
                  <FormDescription>
                    Tags help categorize documents for easier searching
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={uploading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={files.length === 0 || uploading}
                className={uploading ? 'opacity-70 cursor-not-allowed' : ''}
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}