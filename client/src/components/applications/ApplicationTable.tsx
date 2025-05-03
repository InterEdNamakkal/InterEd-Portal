import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight,
  Search,
  Star,
  FileSymlink,
  Mail,
  Calendar,
  User,
  School,
  GraduationCap,
  CalendarDays,
  Clock,
  AlertCircle
} from "lucide-react";
import { StandardActions } from "@/components/ui/ActionMenu";
import { useLocation } from "wouter";
import type { Application } from "@shared/schema";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Application stage badge colors
const stageBadgeClasses: Record<string, string> = {
  submitted: "bg-blue-100 text-blue-800",
  under_review: "bg-purple-100 text-purple-800",
  documents_required: "bg-yellow-100 text-yellow-800",
  offer_received: "bg-green-100 text-green-800",
  offer_accepted: "bg-emerald-100 text-emerald-800",
  visa_application: "bg-indigo-100 text-indigo-800",
  visa_approved: "bg-teal-100 text-teal-800",
  rejected: "bg-red-100 text-red-800",
  withdrawn: "bg-gray-100 text-gray-800"
};

// Application status badge colors
const statusBadgeClasses: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-blue-100 text-blue-800",
  rejected: "bg-red-100 text-red-800",
  withdrawn: "bg-gray-100 text-gray-800",
  deferred: "bg-purple-100 text-purple-800"
};

interface ApplicationTableProps {
  applications: Application[];
  isLoading: boolean;
  onSearch: (query: string) => void;
  onDeleteApplication?: (id: number) => void;
  onMarkAsPriority?: (id: number, currentPriority: boolean) => void;
  onUploadDocuments?: (application: Application) => void;
  onSendReminder?: (application: Application) => void;
  onScheduleInterview?: (application: Application) => void;
  onChangeStatus?: (id: number, newStatus: string) => void;
  viewMode?: 'table' | 'cards';
}

const ApplicationTable: React.FC<ApplicationTableProps> = ({ 
  applications, 
  isLoading, 
  onSearch,
  onDeleteApplication,
  onMarkAsPriority,
  onUploadDocuments,
  onSendReminder,
  onScheduleInterview,
  onChangeStatus,
  viewMode: propViewMode
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplications, setSelectedApplications] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [_, navigate] = useLocation();
  
  const pageSize = 10;
  const totalPages = Math.ceil(applications.length / pageSize);
  const paginatedApplications = applications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  // Event handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };
  
  const toggleApplicationSelection = (id: number) => {
    setSelectedApplications(prev => 
      prev.includes(id) 
        ? prev.filter(appId => appId !== id)
        : [...prev, id]
    );
  };
  
  const toggleAllApplications = () => {
    if (selectedApplications.length === paginatedApplications.length) {
      setSelectedApplications([]);
    } else {
      setSelectedApplications(paginatedApplications.map(app => app.id));
    }
  };
  
  // Navigation handlers
  const handleViewApplication = (id: number) => {
    navigate(`/applications/${id}`);
  };
  
  const handleEditApplication = (id: number) => {
    navigate(`/applications/${id}/edit`);
  };
  
  // Action handlers
  const handleDeleteApplication = (id: number) => {
    if (onDeleteApplication) {
      onDeleteApplication(id);
    } else {
      console.log("Delete application:", id);
    }
  };
  
  const handleMarkAsPriority = (id: number, currentPriority: boolean) => {
    if (onMarkAsPriority) {
      onMarkAsPriority(id, currentPriority);
    } else {
      console.log("Toggle priority:", id, "Current priority:", currentPriority);
    }
  };
  
  // Special action handlers
  const handleUploadDocuments = (application: Application) => {
    if (onUploadDocuments) {
      onUploadDocuments(application);
    } else {
      console.log("Upload documents for application:", application.id);
    }
  };
  
  const handleSendReminder = (application: Application) => {
    if (onSendReminder) {
      onSendReminder(application);
    } else {
      console.log("Send reminder for application:", application.id);
    }
  };
  
  const handleScheduleInterview = (application: Application) => {
    if (onScheduleInterview) {
      onScheduleInterview(application);
    } else {
      console.log("Schedule interview for application:", application.id);
    }
  };

  const formatStatusLabel = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  
  const [localViewMode, setLocalViewMode] = useState<'table' | 'cards'>(propViewMode || 'cards');
  
  // Use the prop value if provided, otherwise use local state
  const viewMode = propViewMode || localViewMode;
  
  // Helper function to format date for display
  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return '-';
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString();
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle>Applications</CardTitle>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-9 w-full"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className={viewMode === 'table' ? 'p-0' : 'pt-0'}>
        {viewMode === 'table' ? (
          // Table View
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox 
                      checked={
                        paginatedApplications.length > 0 && 
                        selectedApplications.length === paginatedApplications.length
                      }
                      onCheckedChange={toggleAllApplications}
                    />
                  </TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>University</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  // Loading skeletons
                  Array(5).fill(0).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-8 rounded-full float-right" /></TableCell>
                    </TableRow>
                  ))
                ) : paginatedApplications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No applications found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedApplications.map(application => (
                    <TableRow key={application.id} className="group">
                      <TableCell>
                        <Checkbox 
                          checked={selectedApplications.includes(application.id)}
                          onCheckedChange={() => toggleApplicationSelection(application.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {application.isHighPriority && (
                            <Star className="h-4 w-4 text-yellow-500 mr-1 inline-block" />
                          )}
                          {`Student #${application.studentId}`}
                        </div>
                      </TableCell>
                      <TableCell>{`University #${application.universityId}`}</TableCell>
                      <TableCell>{`Program #${application.programId}`}</TableCell>
                      <TableCell>
                        <Badge className={cn("font-normal", stageBadgeClasses[application.stage] || "bg-gray-100 text-gray-800")}>
                          {formatStatusLabel(application.stage)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("font-normal", statusBadgeClasses[application.status] || "bg-gray-100 text-gray-800")}>
                          {formatStatusLabel(application.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {formatDate(application.applicationDeadline)}
                      </TableCell>
                      <TableCell>
                        {formatDate(application.updatedAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <StandardActions
                          onView={() => handleViewApplication(application.id)}
                          onEdit={() => handleEditApplication(application.id)}
                          onMarkAsPriority={() => handleMarkAsPriority(application.id, !!application.isHighPriority)}
                          onDelete={() => handleDeleteApplication(application.id)}
                          customActions={[
                            { 
                              id: 'upload-documents',
                              label: "Upload Documents", 
                              icon: FileSymlink, 
                              onClick: () => handleUploadDocuments(application)
                            },
                            { 
                              id: 'send-reminder',
                              label: "Send Reminder", 
                              icon: Mail, 
                              onClick: () => handleSendReminder(application)
                            },
                            { 
                              id: 'schedule-interview',
                              label: "Schedule Interview", 
                              icon: Calendar, 
                              onClick: () => handleScheduleInterview(application)
                            }
                          ]}
                          disableMarkAsPriority={false}
                          className="opacity-100"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          // Card View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              // Loading skeletons for cards
              Array(6).fill(0).map((_, i) => (
                <Card key={i} className="border shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-6 w-40" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                  </CardFooter>
                </Card>
              ))
            ) : paginatedApplications.length === 0 ? (
              <div className="col-span-full text-center py-12">
                No applications found
              </div>
            ) : (
              paginatedApplications.map(application => (
                <Card key={application.id} className="relative overflow-hidden border group hover:shadow-md transition-shadow">
                  {application.isHighPriority && (
                    <div className="absolute top-0 right-0">
                      <div className="w-16 h-16 overflow-hidden">
                        <div className="absolute transform rotate-45 bg-yellow-500 text-white text-xs font-semibold py-1 right-[-35px] top-[15px] w-[170px] text-center">
                          Priority
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-md flex items-center">
                          Application #{application.id}
                        </CardTitle>
                        <CardDescription>
                          Submitted: {formatDate(application.createdAt)}
                        </CardDescription>
                      </div>
                      <StandardActions
                        onView={() => handleViewApplication(application.id)}
                        onEdit={() => handleEditApplication(application.id)}
                        onMarkAsPriority={() => handleMarkAsPriority(application.id, !!application.isHighPriority)}
                        onDelete={() => handleDeleteApplication(application.id)}
                        customActions={[
                          { 
                            id: 'upload-documents',
                            label: "Upload Documents", 
                            icon: FileSymlink, 
                            onClick: () => handleUploadDocuments(application)
                          },
                          { 
                            id: 'send-reminder',
                            label: "Send Reminder", 
                            icon: Mail, 
                            onClick: () => handleSendReminder(application)
                          },
                          { 
                            id: 'schedule-interview',
                            label: "Schedule Interview", 
                            icon: Calendar, 
                            onClick: () => handleScheduleInterview(application)
                          }
                        ]}
                        disableMarkAsPriority={false}
                        className="opacity-100"
                      />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>Student #{application.studentId}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <School className="h-4 w-4 text-muted-foreground" />
                        <span>University #{application.universityId}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <span>Program #{application.programId}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span>Deadline: {formatDate(application.applicationDeadline)}</span>
                      </div>
                    </div>
                    
                    {application.notes && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        <p className="truncate">{application.notes}</p>
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter className="pt-0 flex justify-between items-center">
                    <Badge className={cn("font-normal", stageBadgeClasses[application.stage] || "bg-gray-100 text-gray-800")}>
                      {formatStatusLabel(application.stage)}
                    </Badge>
                    <Badge className={cn("font-normal", statusBadgeClasses[application.status] || "bg-gray-100 text-gray-800")}>
                      {formatStatusLabel(application.status)}
                    </Badge>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className={cn(
            "flex items-center justify-between py-3", 
            viewMode === 'table' ? "px-4 border-t" : "mt-4"
          )}>
            <div className="flex-1 text-sm text-gray-700">
              Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(currentPage * pageSize, applications.length)}
              </span>{" "}
              of <span className="font-medium">{applications.length}</span> applications
            </div>
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="outline"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationTable;