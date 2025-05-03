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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SendReminderDialogProps {
  applicationId: number;
  studentName: string;
  studentEmail: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function SendReminderDialog({
  applicationId,
  studentName,
  studentEmail,
  open,
  onOpenChange,
  onSuccess
}: SendReminderDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reminderType, setReminderType] = useState<string>("document_submission");
  const [message, setMessage] = useState<string>("");
  const { toast } = useToast();

  const reminderTemplates = {
    document_submission: `Dear ${studentName},\n\nThis is a friendly reminder that we are still waiting for some required documents for your application. Please submit them at your earliest convenience.\n\nBest regards,\nInterEd Team`,
    interview: `Dear ${studentName},\n\nThis is a reminder about your upcoming interview. Please ensure you have completed all the necessary preparations.\n\nBest regards,\nInterEd Team`,
    application_deadline: `Dear ${studentName},\n\nThis is a friendly reminder that the application deadline for your selected program is approaching. Please ensure all requirements are met before the deadline.\n\nBest regards,\nInterEd Team`,
    payment: `Dear ${studentName},\n\nThis is a reminder about the pending payment for your application. Please complete the payment to proceed with the application process.\n\nBest regards,\nInterEd Team`
  };

  const handleReminderTypeChange = (value: string) => {
    setReminderType(value);
    setMessage(reminderTemplates[value as keyof typeof reminderTemplates] || "");
  };

  const handleSendReminder = async () => {
    if (!message.trim()) {
      setError("Please enter a message");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // API successful
      toast({
        title: "Reminder sent",
        description: `Reminder email has been sent to ${studentName} (${studentEmail}).`,
      });

      if (onSuccess) {
        onSuccess();
      }

      // Reset form and close dialog
      setMessage("");
      onOpenChange(false);
    } catch (err) {
      console.error("Error sending reminder:", err);
      setError("Failed to send reminder. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Send Reminder</DialogTitle>
          <DialogDescription>
            Send a reminder email to {studentName} ({studentEmail})
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {error && (
            <div className="text-sm font-medium text-red-500 dark:text-red-900">
              {error}
            </div>
          )}

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Reminder Type</Label>
            <RadioGroup 
              value={reminderType} 
              onValueChange={handleReminderTypeChange}
              className="col-span-3 space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="document_submission" id="document_submission" />
                <Label htmlFor="document_submission">Document Submission</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="interview" id="interview" />
                <Label htmlFor="interview">Interview</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="application_deadline" id="application_deadline" />
                <Label htmlFor="application_deadline">Application Deadline</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="payment" id="payment" />
                <Label htmlFor="payment">Payment</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="message" className="text-right pt-2">
              Message
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="col-span-3"
              rows={8}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSendReminder} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" /> Send Reminder
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}