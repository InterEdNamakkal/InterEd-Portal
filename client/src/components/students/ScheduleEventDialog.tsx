import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { format, addHours } from "date-fns";

interface ScheduleEventDialogProps {
  studentId: number;
  studentName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function ScheduleEventDialog({
  studentId,
  studentName,
  open,
  onOpenChange,
  onSuccess,
}: ScheduleEventDialogProps) {
  const [eventType, setEventType] = useState<string>("counseling");
  const [eventTitle, setEventTitle] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [startTime, setStartTime] = useState<string>(
    format(new Date(), "HH:mm")
  );
  const [endTime, setEndTime] = useState<string>(
    format(addHours(new Date(), 1), "HH:mm")
  );
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Generate event title based on type
  const generateEventTitle = () => {
    const types = {
      counseling: "Counseling Session",
      orientation: "Orientation Meeting",
      document: "Document Verification",
      interview: "University Interview",
      workshop: "Workshop Session",
      other: "Student Meeting"
    };
    
    setEventTitle(`${types[eventType as keyof typeof types]} with ${studentName}`);
  };

  // Mutation to schedule an event
  const { mutate: scheduleEvent, isPending } = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/events`, {
        studentId,
        title: eventTitle,
        description: eventDescription,
        eventType,
        eventDate,
        startTime,
        endTime,
        status: "scheduled"
      });
      if (res) {
        return await res.json();
      }
      throw new Error("Failed to schedule event");
    },
    onSuccess: () => {
      toast({
        title: "Event scheduled",
        description: `Event has been scheduled with ${studentName}.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      queryClient.invalidateQueries({ queryKey: ["/api/students"] });
      queryClient.invalidateQueries({ queryKey: [`/api/students/${studentId}`] });
      onOpenChange(false);
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to schedule event",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle) {
      toast({
        title: "Event title required",
        description: "Please enter a title for the event.",
        variant: "destructive",
      });
      return;
    }
    scheduleEvent();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule Event with Student</DialogTitle>
          <DialogDescription>
            Schedule a new event or meeting with {studentName}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="eventType" className="text-right">
                Event Type
              </Label>
              <div className="col-span-3">
                <Select
                  value={eventType}
                  onValueChange={(value) => {
                    setEventType(value);
                    // Update title when type changes
                    if (eventTitle === "" || eventTitle.includes(eventType)) {
                      const types = {
                        counseling: "Counseling Session",
                        orientation: "Orientation Meeting",
                        document: "Document Verification",
                        interview: "University Interview",
                        workshop: "Workshop Session",
                        other: "Student Meeting"
                      };
                      setEventTitle(`${types[value as keyof typeof types]} with ${studentName}`);
                    }
                  }}
                  disabled={isPending}
                >
                  <SelectTrigger id="eventType">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="counseling">Counseling</SelectItem>
                    <SelectItem value="orientation">Orientation</SelectItem>
                    <SelectItem value="document">Document Verification</SelectItem>
                    <SelectItem value="interview">University Interview</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="eventTitle" className="text-right">
                Title
              </Label>
              <div className="col-span-3 flex gap-2">
                <Input
                  id="eventTitle"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  disabled={isPending}
                  placeholder="Event title"
                  className="w-full"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={generateEventTitle}
                  disabled={isPending}
                >
                  Generate
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="eventDescription" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="eventDescription"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Enter event description"
                className="col-span-3"
                rows={3}
                disabled={isPending}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="eventDate" className="text-right">
                Date
              </Label>
              <div className="col-span-3">
                <Input
                  id="eventDate"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  disabled={isPending}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startTime" className="text-right">
                Start Time
              </Label>
              <div className="col-span-3">
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  disabled={isPending}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endTime" className="text-right">
                End Time
              </Label>
              <div className="col-span-3">
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  disabled={isPending}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !eventTitle}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Schedule Event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}