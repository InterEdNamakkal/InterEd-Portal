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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Student } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface AssignStudentsDialogProps {
  agentId: number;
  agentName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function AssignStudentsDialog({
  agentId,
  agentName,
  open,
  onOpenChange,
  onSuccess
}: AssignStudentsDialogProps) {
  const { toast } = useToast();
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch students
  const { data: students = [], isLoading } = useQuery({
    queryKey: ['/api/students'],
    enabled: open,
  });
  
  // Fetch currently assigned students
  const { data: assignedStudents = [], isLoading: isLoadingAssigned } = useQuery({
    queryKey: ['/api/agents', agentId, 'students'],
    enabled: open,
  });
  
  const handleSelectStudent = (studentId: number) => {
    setSelectedStudents(prev => {
      if (prev.includes(studentId)) {
        return prev.filter(id => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await apiRequest('POST', `/api/agents/${agentId}/assign-students`, {
        studentIds: selectedStudents
      });
      
      toast({
        title: "Students assigned",
        description: `${selectedStudents.length} students assigned to ${agentName}`,
      });
      
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Failed to assign students",
        description: "There was an error assigning students to this agent.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Students to Agent</DialogTitle>
          <DialogDescription>
            Select students to assign to {agentName}.
          </DialogDescription>
        </DialogHeader>
        
        {isLoading || isLoadingAssigned ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {students.map((student: Student) => (
                <div key={student.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`student-${student.id}`}
                    checked={selectedStudents.includes(student.id)}
                    onCheckedChange={() => handleSelectStudent(student.id)}
                  />
                  <Label htmlFor={`student-${student.id}`} className="flex-1 cursor-pointer">
                    <div className="font-medium">
                      {student.firstName} {student.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {student.email}
                    </div>
                  </Label>
                </div>
              ))}
              
              {students.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  No students available
                </div>
              )}
            </div>
          </ScrollArea>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting || selectedStudents.length === 0}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Assign Students
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}