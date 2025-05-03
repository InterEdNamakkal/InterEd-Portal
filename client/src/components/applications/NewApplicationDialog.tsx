import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// Create a schema for the application form
const newApplicationSchema = z.object({
  studentId: z.string().min(1, { message: "Student is required" }),
  universityId: z.string().min(1, { message: "University is required" }),
  programId: z.string().min(1, { message: "Program is required" }),
  agentId: z.string().optional(),
  stage: z.string().min(1, { message: "Stage is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  intakeDate: z.date().optional().nullable(),
  applicationDate: z.date().optional().nullable(),
  decisionDate: z.date().optional().nullable(),
  notes: z.string().optional(),
  isHighPriority: z.boolean().default(false),
});

type NewApplicationValues = z.infer<typeof newApplicationSchema>;

interface NewApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NewApplicationDialog({
  open,
  onOpenChange,
}: NewApplicationDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Fetch students, universities, programs, and agents for the dropdown
  const { data: students, isLoading: isLoadingStudents } = useQuery({
    queryKey: ["/api/students"],
    retry: 1,
  });

  const { data: universities, isLoading: isLoadingUniversities } = useQuery({
    queryKey: ["/api/universities"],
    retry: 1,
  });

  const { data: programs, isLoading: isLoadingPrograms } = useQuery({
    queryKey: ["/api/programs"],
    retry: 1,
  });

  const { data: agents, isLoading: isLoadingAgents } = useQuery({
    queryKey: ["/api/agents"],
    retry: 1,
  });

  const isLoading = isLoadingStudents || isLoadingUniversities || isLoadingPrograms || isLoadingAgents;

  // Define form with default values
  const form = useForm<NewApplicationValues>({
    resolver: zodResolver(newApplicationSchema),
    defaultValues: {
      studentId: "",
      universityId: "",
      programId: "",
      agentId: "",
      stage: "document_collection", // Default stage
      status: "in_progress", // Default status
      intakeDate: null,
      applicationDate: null,
      decisionDate: null,
      notes: "",
      isHighPriority: false,
    },
  });

  const onSubmit = async (values: NewApplicationValues) => {
    try {
      setIsSubmitting(true);

      // Convert IDs from string to number
      const formattedValues = {
        ...values,
        studentId: parseInt(values.studentId),
        universityId: parseInt(values.universityId),
        programId: parseInt(values.programId),
        agentId: values.agentId === "direct" ? null : (values.agentId ? parseInt(values.agentId) : null),
      };

      // Send data to the server
      await apiRequest("/api/applications", {
        method: "POST",
        body: JSON.stringify(formattedValues),
      });

      // Show success toast
      toast({
        title: "Application created",
        description: "The new application has been successfully created.",
      });

      // Invalidate applications cache to refresh the list
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });

      // Reset form and close dialog
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create application",
        description: "There was a problem creating the application. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Application</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new student application.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Student Selection */}
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student*</FormLabel>
                  <Select
                    disabled={isLoading || isSubmitting}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a student" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingStudents ? (
                        <div className="flex items-center justify-center p-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="ml-2">Loading...</span>
                        </div>
                      ) : students && Array.isArray(students) && students.length > 0 ? (
                        students.map((student: any) => (
                          <SelectItem key={student.id} value={student.id.toString()}>
                            {student.firstName} {student.lastName}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="text-center p-2 text-sm text-muted-foreground">
                          No students found
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* University Selection */}
            <FormField
              control={form.control}
              name="universityId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University*</FormLabel>
                  <Select
                    disabled={isLoading || isSubmitting}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a university" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingUniversities ? (
                        <div className="flex items-center justify-center p-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="ml-2">Loading...</span>
                        </div>
                      ) : universities && Array.isArray(universities) && universities.length > 0 ? (
                        universities.map((university: any) => (
                          <SelectItem key={university.id} value={university.id.toString()}>
                            {university.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="text-center p-2 text-sm text-muted-foreground">
                          No universities found
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Program Selection */}
            <FormField
              control={form.control}
              name="programId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program*</FormLabel>
                  <Select
                    disabled={isLoading || isSubmitting}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a program" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingPrograms ? (
                        <div className="flex items-center justify-center p-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="ml-2">Loading...</span>
                        </div>
                      ) : programs && Array.isArray(programs) && programs.length > 0 ? (
                        programs.map((program: any) => (
                          <SelectItem key={program.id} value={program.id.toString()}>
                            {program.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="text-center p-2 text-sm text-muted-foreground">
                          No programs found
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Agent Selection (Optional) */}
            <FormField
              control={form.control}
              name="agentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent (Optional)</FormLabel>
                  <Select
                    disabled={isLoading || isSubmitting}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an agent" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="direct">No Agent (Direct Application)</SelectItem>
                      {isLoadingAgents ? (
                        <div className="flex items-center justify-center p-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="ml-2">Loading...</span>
                        </div>
                      ) : agents && Array.isArray(agents) && agents.length > 0 ? (
                        agents.map((agent: any) => (
                          <SelectItem key={agent.id} value={agent.id.toString()}>
                            {agent.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="text-center p-2 text-sm text-muted-foreground">
                          No agents found
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Application Stage */}
            <FormField
              control={form.control}
              name="stage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stage*</FormLabel>
                  <Select
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="document_collection">Document Collection</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="submitted_to_university">Submitted to University</SelectItem>
                      <SelectItem value="conditional_offer">Conditional Offer</SelectItem>
                      <SelectItem value="unconditional_offer">Unconditional Offer</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Application Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status*</FormLabel>
                  <Select
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="submitted">Submitted</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="deferred">Deferred</SelectItem>
                      <SelectItem value="withdrawn">Withdrawn</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Intake Date */}
            <FormField
              control={form.control}
              name="intakeDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Intake Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={isSubmitting}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Application Date */}
            <FormField
              control={form.control}
              name="applicationDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Application Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={isSubmitting}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter any additional notes about the application"
                      className="resize-none"
                      rows={3}
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* High Priority */}
            <FormField
              control={form.control}
              name="isHighPriority"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>High Priority</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Mark this application as high priority
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || isLoading}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Application
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}