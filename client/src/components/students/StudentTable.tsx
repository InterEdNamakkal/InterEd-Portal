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
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight,
  Search,
  Star
} from "lucide-react";
import { StandardActions } from "@/components/ui/ActionMenu";
import { useLocation } from "wouter";
import type { Student } from "@shared/schema";
import { cn } from "@/lib/utils";

// Stage badge colors
const stageBadgeClasses: Record<string, string> = {
  inquiry: "bg-purple-100 text-purple-800",
  application: "bg-blue-100 text-blue-800",
  offer: "bg-yellow-100 text-yellow-800",
  visa: "bg-green-100 text-green-800",
  pre_departure: "bg-indigo-100 text-indigo-800",
  enrollment: "bg-pink-100 text-pink-800",
  alumni: "bg-gray-100 text-gray-800"
};

// Status badge colors
const statusBadgeClasses: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  on_hold: "bg-yellow-100 text-yellow-800",
  completed: "bg-blue-100 text-blue-800",
  withdrawn: "bg-red-100 text-red-800"
};

interface StudentTableProps {
  students: Student[];
  isLoading: boolean;
  onSearch: (query: string) => void;
  onDeleteStudent?: (id: number) => void;
  onTogglePriority?: (id: number, currentPriority: boolean) => void;
  onAssignAgent?: (student: Student) => void;
  onIssueCard?: (student: Student) => void;
  onScheduleEvent?: (student: Student) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ 
  students, 
  isLoading, 
  onSearch,
  onDeleteStudent,
  onTogglePriority,
  onAssignAgent,
  onIssueCard,
  onScheduleEvent 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [_, navigate] = useLocation();
  
  const pageSize = 10;
  const totalPages = Math.ceil(students.length / pageSize);
  const paginatedStudents = students.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  // Event handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };
  
  const toggleStudentSelection = (id: number) => {
    setSelectedStudents(prev => 
      prev.includes(id) 
        ? prev.filter(studentId => studentId !== id)
        : [...prev, id]
    );
  };
  
  const toggleAllStudents = () => {
    if (selectedStudents.length === paginatedStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(paginatedStudents.map(student => student.id));
    }
  };
  
  // Navigation handlers
  const handleViewStudent = (id: number) => {
    navigate(`/students/${id}`);
  };
  
  const handleEditStudent = (id: number) => {
    navigate(`/students/${id}/edit`);
  };
  
  // Action handlers
  const handleDeleteStudent = (id: number) => {
    if (onDeleteStudent) {
      onDeleteStudent(id);
    } else {
      console.log("Delete student:", id);
    }
  };
  
  const handleTogglePriority = (id: number, currentPriority: boolean) => {
    if (onTogglePriority) {
      onTogglePriority(id, currentPriority);
    } else {
      console.log("Toggle priority:", id, "Current priority:", currentPriority);
    }
  };
  
  // Dialog handlers
  const handleAssignAgent = (student: Student) => {
    if (onAssignAgent) {
      onAssignAgent(student);
    } else {
      console.log("Assign agent to student:", student.id);
    }
  };
  
  const handleIssueCard = (student: Student) => {
    if (onIssueCard) {
      onIssueCard(student);
    } else {
      console.log("Issue card to student:", student.id);
    }
  };
  
  const handleScheduleEvent = (student: Student) => {
    if (onScheduleEvent) {
      onScheduleEvent(student);
    } else {
      console.log("Schedule event with student:", student.id);
    }
  };
  
  return (
    <Card className="shadow-sm">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            className="pl-9 w-full md:w-72"
            placeholder="Search students..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={
                    paginatedStudents.length > 0 && 
                    selectedStudents.length === paginatedStudents.length
                  }
                  onCheckedChange={toggleAllStudents}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Program</TableHead>
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
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8 rounded-full float-right" /></TableCell>
                </TableRow>
              ))
            ) : paginatedStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No students found
                </TableCell>
              </TableRow>
            ) : (
              paginatedStudents.map(student => (
                <TableRow key={student.id} className="group">
                  <TableCell>
                    <Checkbox 
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={() => toggleStudentSelection(student.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {student.isHighPriority && (
                        <Star className="h-4 w-4 text-yellow-500 mr-1 inline-block" />
                      )}
                      {student.firstName} {student.lastName}
                    </div>
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone || '-'}</TableCell>
                  <TableCell>
                    <Badge className={cn("font-normal", stageBadgeClasses[student.stage] || "bg-gray-100 text-gray-800")}>
                      {student.stage.charAt(0).toUpperCase() + student.stage.slice(1).replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("font-normal", statusBadgeClasses[student.status] || "bg-gray-100 text-gray-800")}>
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{student.agent || '-'}</TableCell>
                  <TableCell>{student.program || '-'}</TableCell>
                  <TableCell className="text-right">
                    <StandardActions
                      onView={() => handleViewStudent(student.id)}
                      onEdit={() => handleEditStudent(student.id)}
                      onAddApplication={() => navigate(`/applications/new?studentId=${student.id}`)}
                      onMarkAsPriority={() => handleTogglePriority(student.id, !!student.isHighPriority)}
                      onCallStudent={() => window.open(`tel:${student.phone}`, '_blank')}
                      onEmailStudent={() => window.open(`mailto:${student.email}`, '_blank')}
                      onAssignToAgent={() => handleAssignAgent(student)}
                      onIssueCard={() => handleIssueCard(student)}
                      onScheduleEvent={() => handleScheduleEvent(student)}
                      onDelete={() => handleDeleteStudent(student.id)}
                      disableCallStudent={!student.phone}
                      disableMarkAsPriority={!!student.isHighPriority}
                      className="opacity-0 group-hover:opacity-100"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="flex-1 text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(currentPage * pageSize, students.length)}
            </span>{" "}
            of <span className="font-medium">{students.length}</span> students
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
    </Card>
  );
};

export default StudentTable;