import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ChevronLeft, 
  FileEdit,
  Star,
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  FileText,
  School,
  Clock,
  UserCog,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Student } from "@shared/schema";
// Import the EditStudentDialog component
import EditStudentDialog from "@/components/students/EditStudentDialog";

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

const StudentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [_, navigate] = useLocation();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  const { data: student, isLoading, error } = useQuery<Student>({
    queryKey: [`/api/students/${id}`],
    enabled: !!id,
  });
  
  // Get applications for this student
  const { data: applications = [] } = useQuery<any[]>({
    queryKey: [`/api/applications/student/${id}`],
    enabled: !!id,
  });
  
  // Navigate back to the students list if there's an error
  useEffect(() => {
    if (error) {
      navigate('/students');
    }
  }, [error, navigate]);
  
  if (isLoading) {
    return (
      <div className="px-6 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Skeleton className="h-8 w-48" />
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-36" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Skeleton className="h-32 w-32 rounded-full" />
                <Skeleton className="h-6 w-36" />
                <Skeleton className="h-5 w-24" />
              </div>
              <div className="col-span-2 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!student) {
    return null;
  }
  
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };
  
  const formatDate = (date: string | Date | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/students')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Student Profile</h1>
        </div>
        <Button onClick={() => setShowEditDialog(true)}>
          <FileEdit className="h-4 w-4 mr-2" />
          Edit Student
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Student Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Avatar className="h-32 w-32 border-2 border-gray-200">
                <AvatarFallback className="text-2xl">
                  {getInitials(student.firstName, student.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-bold">
                  {student.isHighPriority && (
                    <Star className="h-5 w-5 text-yellow-500 inline-block mr-1" />
                  )}
                  {student.firstName} {student.lastName}
                </h2>
                <p className="text-gray-500">{student.nationality || 'Nationality not specified'}</p>
              </div>
              <div className="flex space-x-2">
                <Badge className={cn(stageBadgeClasses[student.stage] || "bg-gray-100 text-gray-800")}>
                  {student.stage.charAt(0).toUpperCase() + student.stage.slice(1).replace('_', ' ')}
                </Badge>
                <Badge className={cn(statusBadgeClasses[student.status] || "bg-gray-100 text-gray-800")}>
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </Badge>
              </div>
            </div>
            
            <div className="col-span-2">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">Email:</span>
                        <span>{student.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">Phone:</span>
                        <span>{student.phone || 'Not provided'}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-700">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">Nationality:</span>
                        <span>{student.nationality || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">Created:</span>
                        <span>{formatDate(student.createdAt)}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-gray-700">
                        <UserCog className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">Agent:</span>
                        <span>{student.agent || 'No agent assigned'}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-700">
                        <School className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">University:</span>
                        <span>{student.university || 'No university assigned'}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-700">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">Program:</span>
                        <span>{student.program || 'No program assigned'}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">Last Updated:</span>
                        <span>{formatDate(student.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {student.notes && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2">Notes</h3>
                      <p className="text-gray-700 whitespace-pre-line border p-4 rounded-md bg-gray-50">
                        {student.notes}
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="applications">
                  {applications.length === 0 ? (
                    <div className="text-center p-6 border rounded-md bg-gray-50">
                      <h3 className="text-lg font-semibold text-gray-700">No Applications</h3>
                      <p className="text-gray-500 mt-1">This student hasn't submitted any applications yet.</p>
                      <Button className="mt-4" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Create Application
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {applications.map((application: any) => (
                        <Card key={application.id} className="overflow-hidden">
                          <div className="flex items-center justify-between p-4 border-b">
                            <div>
                              <h3 className="font-semibold">{application.universityName || 'University'}</h3>
                              <p className="text-sm text-gray-500">{application.programName || 'Program'}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={cn(
                                application.stage === 'accepted' ? 'bg-green-100 text-green-800' :
                                application.stage === 'rejected' ? 'bg-red-100 text-red-800' :
                                application.stage === 'submitted' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              )}>
                                {application.stage?.charAt(0).toUpperCase() + application.stage?.slice(1).replace('_', ' ')}
                              </Badge>
                              <Button size="sm" variant="ghost">
                                <ArrowUpRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between text-sm">
                              <div>
                                <span className="text-gray-500">Submitted:</span>
                                <span className="ml-2">{formatDate(application.submittedAt)}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Last Updated:</span>
                                <span className="ml-2">{formatDate(application.updatedAt)}</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="documents">
                  <div className="text-center p-6 border rounded-md bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-700">No Documents</h3>
                    <p className="text-gray-500 mt-1">There are no documents uploaded for this student.</p>
                    <Button className="mt-4" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="notes">
                  <div className="text-center p-6 border rounded-md bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-700">Notes & Communications</h3>
                    <p className="text-gray-500 mt-1">No communication history for this student.</p>
                    <Button className="mt-4" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Add Note
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Edit Student Dialog */}
      <EditStudentDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        student={student}
      />
    </div>
  );
};

export default StudentDetail;