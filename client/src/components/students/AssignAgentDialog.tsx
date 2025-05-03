import { useState } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface AssignAgentDialogProps {
  studentId: number;
  studentName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function AssignAgentDialog({
  studentId,
  studentName,
  open,
  onOpenChange,
  onSuccess,
}: AssignAgentDialogProps) {
  const [selectedAgentId, setSelectedAgentId] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch agents
  const { data: agents, isLoading: isLoadingAgents } = useQuery({
    queryKey: ["/api/agents"],
    enabled: open, // Only fetch when dialog is open
  });

  // Mutation to assign agent to student
  const { mutate: assignAgent, isPending } = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("PUT", `/api/students/${studentId}`, {
        agentId: parseInt(selectedAgentId),
      });
      if (res) {
        return await res.json();
      }
      throw new Error("Failed to assign agent");
    },
    onSuccess: () => {
      toast({
        title: "Agent assigned",
        description: `Student "${studentName}" has been assigned to the selected agent.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/students"] });
      queryClient.invalidateQueries({ queryKey: [`/api/students/${studentId}`] });
      onOpenChange(false);
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to assign agent",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAgentId) {
      toast({
        title: "Please select an agent",
        description: "You must select an agent to assign to this student.",
        variant: "destructive",
      });
      return;
    }
    assignAgent();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Agent to Student</DialogTitle>
          <DialogDescription>
            Select an agent to assign to {studentName}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="agent" className="text-right">
                Agent
              </Label>
              <div className="col-span-3">
                <Select
                  value={selectedAgentId}
                  onValueChange={setSelectedAgentId}
                  disabled={isLoadingAgents || isPending}
                >
                  <SelectTrigger id="agent">
                    <SelectValue placeholder="Select an agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingAgents ? (
                      <div className="flex items-center justify-center py-2">
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      </div>
                    ) : (
                      agents?.map((agent: any) => (
                        <SelectItem key={agent.id} value={agent.id.toString()}>
                          {agent.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !selectedAgentId}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Assign
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}