import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Agent } from "@shared/schema";
import { useLocation } from "wouter";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AssignStudentsDialog from "./AssignStudentsDialog";
import ViewPerformanceDialog from "./ViewPerformanceDialog";
import ManagePartnershipDialog from "./ManagePartnershipDialog";

export default function AgentActions() {
  const { toast } = useToast();
  const [_, navigate] = useLocation();
  
  // Alert dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  
  // Action dialogs state
  const [assignStudentsDialogOpen, setAssignStudentsDialogOpen] = useState(false);
  const [viewPerformanceDialogOpen, setViewPerformanceDialogOpen] = useState(false);
  const [managePartnershipDialogOpen, setManagePartnershipDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  
  const handleViewAgent = (id: number) => {
    navigate(`/agents/${id}`);
  };
  
  const handleEditAgent = (id: number) => {
    navigate(`/agents/edit/${id}`);
  };
  
  const openDeleteDialog = (id: number) => {
    setSelectedAgentId(id);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteAgent = async () => {
    if (!selectedAgentId) return;
    
    try {
      await apiRequest('DELETE', `/api/agents/${selectedAgentId}`);
      
      toast({
        title: "Agent deleted",
        description: "The agent has been successfully deleted."
      });
      
      queryClient.invalidateQueries({ queryKey: ['/api/agents'] });
    } catch (error) {
      toast({
        title: "Error deleting agent",
        description: "There was an error deleting the agent.",
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
    }
  };
  
  const handleMarkAsFeatured = async (id: number, isFeatured: boolean) => {
    try {
      await apiRequest('PATCH', `/api/agents/${id}`, { 
        isFeatured: !isFeatured 
      });
      
      toast({
        title: isFeatured ? "Agent unfeatured" : "Agent featured",
        description: `The agent has been ${isFeatured ? 'removed from' : 'marked as'} featured.`
      });
      
      queryClient.invalidateQueries({ queryKey: ['/api/agents'] });
    } catch (error) {
      toast({
        title: "Error updating agent",
        description: "There was an error updating the agent's featured status.",
        variant: "destructive"
      });
    }
  };
  
  const handleAssignStudents = (agent: Agent) => {
    setSelectedAgent(agent);
    setAssignStudentsDialogOpen(true);
  };
  
  const handleViewPerformance = (agent: Agent) => {
    setSelectedAgent(agent);
    setViewPerformanceDialogOpen(true);
  };
  
  const handleManagePartnership = (agent: Agent) => {
    setSelectedAgent(agent);
    setManagePartnershipDialogOpen(true);
  };
  
  const handleActionSuccess = () => {
    // Refresh agent data
    queryClient.invalidateQueries({ queryKey: ['/api/agents'] });
  };
  
  return (
    <>
      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this agent?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the agent and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAgent} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Render dialogs only if an agent is selected */}
      {selectedAgent && (
        <>
          <AssignStudentsDialog
            agentId={selectedAgent.id}
            agentName={selectedAgent.name}
            open={assignStudentsDialogOpen}
            onOpenChange={setAssignStudentsDialogOpen}
            onSuccess={handleActionSuccess}
          />
          
          <ViewPerformanceDialog
            agent={selectedAgent}
            open={viewPerformanceDialogOpen}
            onOpenChange={setViewPerformanceDialogOpen}
          />
          
          <ManagePartnershipDialog
            agent={selectedAgent}
            open={managePartnershipDialogOpen}
            onOpenChange={setManagePartnershipDialogOpen}
            onSuccess={handleActionSuccess}
          />
        </>
      )}
    </>
  );
}