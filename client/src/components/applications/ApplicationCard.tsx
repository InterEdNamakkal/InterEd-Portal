import { useState } from "react";
import { FileSymlink } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StandardActions } from "@/components/ui/ActionMenu";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";

export interface ApplicationCardProps {
  id: number;
  student: {
    firstName: string;
    lastName: string;
    email: string;
  };
  university: string;
  program: string;
  status: string;
  deadline: string;
}

export default function ApplicationCard({
  id,
  student,
  university,
  program,
  status,
  deadline,
}: ApplicationCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "submitted":
        return "bg-indigo-100 text-indigo-800";
      case "under_review":
        return "bg-purple-100 text-purple-800";
      case "accepted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "deferred":
        return "bg-amber-100 text-amber-800";
      case "withdrawn":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatStatusLabel = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        setIsDeleting(true);
        await apiRequest(`/api/applications/${id}`, {
          method: "DELETE",
        });
        
        // Invalidate applications cache to refresh the list
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
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-2 flex flex-row justify-between items-start">
        <div>
          <CardTitle className="text-lg font-semibold mb-1">
            {student.firstName} {student.lastName}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{student.email}</p>
        </div>
        <StandardActions
          onEdit={() => {
            toast({
              title: "Edit Application",
              description: `Editing application for ${student.firstName} ${student.lastName}`,
            });
          }}
          onDelete={handleDelete}
          disableDelete={isDeleting}
        />
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <div className="space-y-1">
          <p className="text-sm font-medium">University</p>
          <p className="text-sm text-muted-foreground">{university || "Not specified"}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Program</p>
          <p className="text-sm text-muted-foreground">{program || "Not specified"}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Deadline</p>
          <p className="text-sm text-muted-foreground">{deadline}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4">
        <Badge className={getStatusBadgeColor(status)}>
          {formatStatusLabel(status)}
        </Badge>
        <Button variant="ghost" size="sm" className="px-2">
          <FileSymlink className="h-4 w-4 mr-1" />
          <span>Documents</span>
        </Button>
      </CardFooter>
    </Card>
  );
}