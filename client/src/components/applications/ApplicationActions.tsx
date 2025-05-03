import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Application } from "@shared/schema";
import { useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import UploadDocumentsDialog from "./UploadDocumentsDialog";
import SendReminderDialog from "./SendReminderDialog";
import ScheduleInterviewDialog from "./ScheduleInterviewDialog";

interface ApplicationActionsProps {
  children: (handlers: {
    handleUploadDocuments: (application: Application) => void;
    handleSendReminder: (application: Application) => void;
    handleScheduleInterview: (application: Application) => void;
    handleMarkAsPriority: (id: number, currentPriority: boolean) => void;
    handleChangeStatus: (id: number, newStatus: string) => void;
    handleDeleteApplication: (id: number) => void;
  }) => React.ReactNode;
}

/**
 * This component provides action handlers and manages dialogs for application-related actions.
 * It uses a render prop pattern to provide handlers to its children.
 */
export function ApplicationActions({ children }: ApplicationActionsProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Dialog states
  const [uploadDocsDialogOpen, setUploadDocsDialogOpen] = useState(false);
  const [sendReminderDialogOpen, setSendReminderDialogOpen] = useState(false);
  const [scheduleInterviewDialogOpen, setScheduleInterviewDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  // Action handlers
  const handleUploadDocuments = (application: Application) => {
    setSelectedApplication(application);
    setUploadDocsDialogOpen(true);
  };

  const handleSendReminder = (application: Application) => {
    setSelectedApplication(application);
    setSendReminderDialogOpen(true);
  };

  const handleScheduleInterview = (application: Application) => {
    setSelectedApplication(application);
    setScheduleInterviewDialogOpen(true);
  };

  const handleMarkAsPriority = async (id: number, currentPriority: boolean) => {
    try {
      // Make API call to update priority
      await apiRequest(`/api/applications/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isPriority: !currentPriority }),
      });

      // Invalidate cache to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });

      toast({
        title: currentPriority ? "Priority removed" : "Marked as priority",
        description: `Application has been ${
          currentPriority ? "removed from" : "marked as"
        } priority.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update priority",
        description: "There was a problem updating the application priority.",
      });
    }
  };

  const handleChangeStatus = async (id: number, newStatus: string) => {
    try {
      // Make API call to update status
      await apiRequest(`/api/applications/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });

      // Invalidate cache to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });

      toast({
        title: "Status updated",
        description: `Application status has been updated to ${newStatus}.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update status",
        description: "There was a problem updating the application status.",
      });
    }
  };

  const handleDeleteApplication = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        // Make API call to delete application
        await apiRequest(`/api/applications/${id}`, {
          method: "DELETE",
        });

        // Invalidate cache to refresh data
        queryClient.invalidateQueries({ queryKey: ["/api/applications"] });

        toast({
          title: "Application deleted",
          description: "The application has been successfully deleted.",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to delete application",
          description: "There was a problem deleting the application.",
        });
      }
    }
  };

  // Handle successful action completion
  const handleActionSuccess = () => {
    // Refresh applications data
    queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
  };

  return (
    <>
      {children({
        handleUploadDocuments,
        handleSendReminder,
        handleScheduleInterview,
        handleMarkAsPriority,
        handleChangeStatus,
        handleDeleteApplication,
      })}

      {/* Render dialogs only if an application is selected */}
      {selectedApplication && (
        <>
          <UploadDocumentsDialog
            applicationId={selectedApplication.id}
            studentName={`Student #${selectedApplication.studentId}`}
            open={uploadDocsDialogOpen}
            onOpenChange={setUploadDocsDialogOpen}
            onSuccess={handleActionSuccess}
          />

          <SendReminderDialog
            applicationId={selectedApplication.id}
            studentName={`Student #${selectedApplication.studentId}`}
            studentEmail="student@example.com"
            open={sendReminderDialogOpen}
            onOpenChange={setSendReminderDialogOpen}
            onSuccess={handleActionSuccess}
          />

          <ScheduleInterviewDialog
            applicationId={selectedApplication.id}
            studentName={`Student #${selectedApplication.studentId}`}
            universityName={`University #${selectedApplication.universityId}`}
            open={scheduleInterviewDialogOpen}
            onOpenChange={setScheduleInterviewDialogOpen}
            onSuccess={handleActionSuccess}
          />
        </>
      )}
    </>
  );
}