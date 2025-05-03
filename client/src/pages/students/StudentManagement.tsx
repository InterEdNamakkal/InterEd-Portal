import { useState } from "react";
import { useFilteredStudents, useStudentMutations } from "@/hooks/useStudents";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import StudentTable from "@/components/students/StudentTable";
import StudentFilters from "@/components/students/StudentFilters";
import StudentJourneyPipeline from "@/components/students/StudentJourneyPipeline";
import AddStudentDialog from "@/components/students/AddStudentDialog";
import ImportStudentsDialog from "@/components/students/ImportStudentsDialog";

interface StudentManagementProps {
  filter?: string;
}

const StudentManagement: React.FC<StudentManagementProps> = ({ filter }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  
  const { students, isLoading, error } = useFilteredStudents(selectedFilter);
  const { deleteStudent, toggleStudentPriority } = useStudentMutations();
  const { toast } = useToast();
  
  // Filter students by search query
  const filteredStudents = searchQuery
    ? students.filter(student => 
        `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : students;
  
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };
  
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleExportStudents = () => {
    toast({
      title: "Export Started",
      description: "Your student data export is being prepared",
    });
    
    // In a real application, this would trigger an API call to export the data
    setTimeout(() => {
      // Simulate export completion
      toast({
        title: "Export Complete",
        description: "Your student data has been exported successfully",
      });
    }, 2000);
  };
  
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Student Management</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleExportStudents}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowImportDialog(true)}
          >
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button onClick={() => setShowAddDialog(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>
      
      {/* Journey Pipeline */}
      <StudentJourneyPipeline />
      
      {/* Main Content */}
      <Card className="shadow-sm">
        <CardHeader className="px-6">
          <CardTitle>Students</CardTitle>
        </CardHeader>
        <CardContent className="px-6">
          <StudentFilters 
            selectedFilter={selectedFilter} 
            onFilterChange={handleFilterChange} 
          />
          
          <StudentTable 
            students={filteredStudents} 
            isLoading={isLoading} 
            onSearch={handleSearchChange}
            onDeleteStudent={(id) => deleteStudent.mutate(id)}
            onTogglePriority={(id, currentPriority) => 
              toggleStudentPriority.mutate({ id, isHighPriority: !currentPriority })
            }
          />
        </CardContent>
      </Card>
      
      {/* Dialogs */}
      <AddStudentDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog} 
      />
      
      <ImportStudentsDialog 
        open={showImportDialog} 
        onOpenChange={setShowImportDialog} 
      />
    </div>
  );
};

export default StudentManagement;