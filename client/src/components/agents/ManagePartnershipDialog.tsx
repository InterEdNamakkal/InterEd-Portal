import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, FileText } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Agent } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { format } from "date-fns";
import { DatePicker } from "@/components/ui/date-picker";

interface ManagePartnershipDialogProps {
  agent: Agent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const partnershipSchema = z.object({
  commissionRate: z.coerce.number().min(0).max(100),
  contractStartDate: z.date(),
  contractEndDate: z.date(),
  agreementTerms: z.string().min(10),
  isExclusive: z.boolean().default(false),
  notes: z.string().optional()
});

type PartnershipFormValues = z.infer<typeof partnershipSchema>;

export default function ManagePartnershipDialog({
  agent,
  open,
  onOpenChange,
  onSuccess
}: ManagePartnershipDialogProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDocumentsUploading, setIsDocumentsUploading] = useState(false);
  
  // Mock documents for display
  const documents = [
    { id: 1, name: "Partnership Agreement.pdf", type: "Contract", date: "2023-10-15" },
    { id: 2, name: "Commission Structure.docx", type: "Financial", date: "2023-10-15" }
  ];
  
  const form = useForm<PartnershipFormValues>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: {
      commissionRate: agent.commissionRate || 0,
      contractStartDate: new Date(),
      contractEndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      agreementTerms: "Standard agency agreement terms covering student recruitment and placement services.",
      isExclusive: false,
      notes: ""
    }
  });
  
  const handleSubmit = async (data: PartnershipFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest('PUT', `/api/agents/${agent.id}/partnership`, data);
      
      toast({
        title: "Partnership updated",
        description: "Agent partnership details have been successfully updated.",
      });
      
      queryClient.invalidateQueries({ queryKey: ['/api/agents'] });
      if (onSuccess) onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error updating partnership",
        description: "There was an error updating the partnership details.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleUploadDocument = () => {
    setIsDocumentsUploading(true);
    // Simulate document upload process
    setTimeout(() => {
      setIsDocumentsUploading(false);
      toast({
        title: "Document uploaded",
        description: "Your document has been successfully uploaded.",
      });
    }, 1500);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Manage Partnership: {agent.name}</DialogTitle>
          <DialogDescription>
            Update partnership details, manage contracts, and upload documents.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="details" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Partnership Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4 pt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="commissionRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Commission Rate (%)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="isExclusive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-y-0 rounded-md border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Exclusive Partnership</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contractStartDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contract Start Date</FormLabel>
                        <DatePicker 
                          date={field.value} 
                          setDate={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contractEndDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contract End Date</FormLabel>
                        <DatePicker 
                          date={field.value} 
                          setDate={field.onChange} 
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="agreementTerms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agreement Terms</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter partnership agreement terms"
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any additional notes about this partnership"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Partnership Details
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-4 pt-4">
            <div className="flex justify-end">
              <Button 
                onClick={handleUploadDocument} 
                disabled={isDocumentsUploading}
              >
                {isDocumentsUploading ? 
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 
                  <Upload className="mr-2 h-4 w-4" />
                }
                Upload Document
              </Button>
            </div>
            
            <div className="border rounded-md">
              {documents.length > 0 ? (
                <div className="divide-y">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-blue-500" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.type} • Uploaded on {doc.date}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  No documents uploaded yet
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}