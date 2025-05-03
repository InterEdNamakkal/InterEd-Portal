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
import { Loader2, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ScheduleInterviewDialogProps {
  applicationId: number;
  studentName: string;
  universityName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function ScheduleInterviewDialog({
  applicationId,
  studentName,
  universityName,
  open,
  onOpenChange,
  onSuccess
}: ScheduleInterviewDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [interviewDate, setInterviewDate] = useState<string>("");
  const [interviewTime, setInterviewTime] = useState<string>("");
  const [duration, setDuration] = useState<string>("30");
  const [interviewType, setInterviewType] = useState<string>("online");
  const [interviewLink, setInterviewLink] = useState<string>("");
  const [interviewLocation, setInterviewLocation] = useState<string>("");
  const { toast } = useToast();

  const handleSchedule = async () => {
    if (!interviewDate) {
      setError("Please select an interview date");
      return;
    }

    if (!interviewTime) {
      setError("Please select an interview time");
      return;
    }

    if (interviewType === "online" && !interviewLink) {
      setError("Please provide a meeting link for the online interview");
      return;
    }

    if (interviewType === "in_person" && !interviewLocation) {
      setError("Please provide a location for the in-person interview");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // API successful
      toast({
        title: "Interview scheduled",
        description: `Interview for ${studentName} has been scheduled on ${interviewDate} at ${interviewTime}.`,
      });

      if (onSuccess) {
        onSuccess();
      }

      // Reset form and close dialog
      resetForm();
      onOpenChange(false);
    } catch (err) {
      console.error("Error scheduling interview:", err);
      setError("Failed to schedule interview. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setInterviewDate("");
    setInterviewTime("");
    setDuration("30");
    setInterviewType("online");
    setInterviewLink("");
    setInterviewLocation("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Schedule Interview</DialogTitle>
          <DialogDescription>
            Schedule an interview for {studentName}'s application to {universityName}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {error && (
            <div className="text-sm font-medium text-red-500 dark:text-red-900">
              {error}
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="interviewDate" className="text-right">
              Date
            </Label>
            <Input
              id="interviewDate"
              type="date"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="interviewTime" className="text-right">
              Time
            </Label>
            <Input
              id="interviewTime"
              type="time"
              value={interviewTime}
              onChange={(e) => setInterviewTime(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duration
            </Label>
            <Select
              value={duration}
              onValueChange={setDuration}
            >
              <SelectTrigger id="duration" className="col-span-3">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="90">1.5 hours</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Interview Type</Label>
            <RadioGroup 
              value={interviewType} 
              onValueChange={setInterviewType}
              className="col-span-3 space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="online" id="online" />
                <Label htmlFor="online">Online</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in_person" id="in_person" />
                <Label htmlFor="in_person">In Person</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="phone" />
                <Label htmlFor="phone">Phone</Label>
              </div>
            </RadioGroup>
          </div>

          {interviewType === "online" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="interviewLink" className="text-right">
                Meeting Link
              </Label>
              <Input
                id="interviewLink"
                placeholder="https://zoom.us/j/123456789"
                value={interviewLink}
                onChange={(e) => setInterviewLink(e.target.value)}
                className="col-span-3"
              />
            </div>
          )}

          {interviewType === "in_person" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="interviewLocation" className="text-right">
                Location
              </Label>
              <Input
                id="interviewLocation"
                placeholder="Room 101, Main Building"
                value={interviewLocation}
                onChange={(e) => setInterviewLocation(e.target.value)}
                className="col-span-3"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSchedule} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scheduling...
              </>
            ) : (
              <>
                <Calendar className="mr-2 h-4 w-4" /> Schedule
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}