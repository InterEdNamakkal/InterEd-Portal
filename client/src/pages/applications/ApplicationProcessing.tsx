import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, FileText, SquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { APPLICATION_STAGES } from "@/lib/constants";
import { type Application } from "@shared/schema";
import ApplicationCard from "@/components/applications/ApplicationCard";
import NewApplicationDialog from "@/components/applications/NewApplicationDialog";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

interface ApplicationProcessingProps {
  filter?: string;
}

export default function ApplicationProcessing({ filter }: ApplicationProcessingProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [filterValue, setFilterValue] = useState("all-time");
  const [searchQuery, setSearchQuery] = useState("");

  // Define application stages based on the mockup
  const stages = [
    { id: "document_collection", label: "Document Collection", count: 0 },
    { id: "under_review", label: "Under Review", count: 0 },
    { id: "submitted_to_university", label: "Submitted to University", count: 0 },
    { id: "conditional_offer", label: "Conditional Offer", count: 0 },
    { id: "unconditional_offer", label: "Unconditional Offer", count: 0 },
    { id: "rejected", label: "Rejected", count: 0 }
  ];

  // Define tabs based on the mockup
  const tabs = [
    { id: "all", label: "All Applications" },
    { id: "recent", label: "Recent" },
    { id: "pending_review", label: "Pending Review" },
    { id: "submitted_to_university", label: "Submitted to University" },
    { id: "offers", label: "Offers" }
  ];

  // Fetch all applications
  const { data: applications, isLoading, error } = useQuery({
    queryKey: ["/api/applications"],
    retry: 1,
  });

  if (error) {
    toast({
      variant: "destructive",
      title: "Error fetching applications",
      description: "There was a problem loading application data.",
    });
  }

  // Count applications by stage
  const updateStageCounts = () => {
    if (!applications || !Array.isArray(applications)) return stages;
    
    return stages.map(stage => ({
      ...stage,
      count: applications.filter(app => app.stage === stage.id).length
    }));
  };

  const stagesWithCounts = updateStageCounts();

  // Filter applications based on active tab
  const getFilteredApplications = () => {
    if (!applications || !Array.isArray(applications)) return [];
    
    const activeTab = tabs[activeTabIndex];
    let filtered = [...applications];
    
    // Apply tab filter
    if (activeTab.id !== "all") {
      if (activeTab.id === "offers") {
        filtered = filtered.filter(app => 
          app.stage === "conditional_offer" || app.stage === "unconditional_offer"
        );
      } else if (activeTab.id === "recent") {
        // Sort by most recent applications first
        filtered = filtered.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        }).slice(0, 10); // Show only the 10 most recent applications
      } else {
        filtered = filtered.filter(app => app.stage === activeTab.id);
      }
    }
    
    // Apply search filter if present
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(app => 
        app.stage.toLowerCase().includes(query) || 
        app.status.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const filteredApplications = getFilteredApplications();

  // Get student name from ID
  const { data: students } = useQuery({
    queryKey: ["/api/students"],
    retry: 1,
  });

  // Get university name from ID
  const { data: universities } = useQuery({
    queryKey: ["/api/universities"],
    retry: 1,
  });

  // Get program name from ID
  const { data: programs } = useQuery({
    queryKey: ["/api/programs"],
    retry: 1,
  });

  // Get agent name from ID
  const { data: agents } = useQuery({
    queryKey: ["/api/agents"],
    retry: 1,
  });

  // Helper function to get entity name by ID
  const getStudentById = (id: number) => {
    if (!students || !Array.isArray(students)) return null;
    return students.find(student => student.id === id);
  };

  const getUniversityById = (id: number) => {
    if (!universities || !Array.isArray(universities)) return null;
    return universities.find(university => university.id === id);
  };

  const getProgramById = (id: number) => {
    if (!programs || !Array.isArray(programs)) return null;
    return programs.find(program => program.id === id);
  };

  const getAgentById = (id: number) => {
    if (!agents || !Array.isArray(agents)) return null;
    return agents.find(agent => agent.id === id);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Application Processing</h1>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search applications..." 
              className="pl-9 w-[240px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select
            value={filterValue}
            onValueChange={setFilterValue}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-time">All Time</SelectItem>
              <SelectItem value="last-week">Last Week</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex gap-3">
        <Button 
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <FileText size={16} />
          New Application
        </Button>
        
        <Button 
          variant="outline"
          className="flex items-center gap-2"
        >
          <FileText size={16} />
          Application Templates
        </Button>
        
        <Button 
          variant="outline"
          className="flex items-center gap-2"
        >
          <Filter size={16} />
          Filters
        </Button>
      </div>
      
      {/* Stage cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stagesWithCounts.map((stage, index) => (
          <Card 
            key={stage.id} 
            className={`p-4 text-center ${index % 2 === 0 ? 'bg-blue-50' : 'bg-indigo-50'}`}
          >
            <div className="font-bold text-xl">{stage.count}</div>
            <div className="text-sm mt-1">{stage.label}</div>
          </Card>
        ))}
      </div>
      
      {/* Tabs for filtering applications */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              className={`py-2 px-1 text-sm font-medium ${
                activeTabIndex === index
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTabIndex(index)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Applications table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                <Checkbox />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                University
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Program
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stage
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deadline
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Agent
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-4" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-10 w-40" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-40" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-40" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-6 w-24" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-32" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-24" />
                  </td>
                </tr>
              ))
            ) : filteredApplications.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  No applications found. Create a new application to get started.
                </td>
              </tr>
            ) : (
              filteredApplications.map((application) => {
                const student = getStudentById(application.studentId);
                const university = getUniversityById(application.universityId);
                const program = getProgramById(application.programId);
                const agent = application.agentId ? getAgentById(application.agentId) : null;
                
                const statusColors: Record<string, string> = {
                  "in_progress": "bg-blue-100 text-blue-800",
                  "submitted": "bg-indigo-100 text-indigo-800",
                  "under_review": "bg-purple-100 text-purple-800",
                  "accepted": "bg-green-100 text-green-800",
                  "rejected": "bg-red-100 text-red-800",
                  "deferred": "bg-amber-100 text-amber-800",
                  "withdrawn": "bg-gray-100 text-gray-800",
                };
                
                const formatDate = (dateString: string | null | undefined) => {
                  if (!dateString) return "N/A";
                  const date = new Date(dateString);
                  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                };
                
                const formatStatus = (status: string) => {
                  return status
                    .split("_")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                };
                
                return (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Checkbox />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3">
                          <div className="bg-gray-200 h-full w-full flex items-center justify-center text-gray-600 font-medium">
                            {student ? student.firstName.charAt(0) + student.lastName.charAt(0) : "?"}
                          </div>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student ? `${student.firstName} ${student.lastName}` : "Unknown Student"}</div>
                          <div className="text-xs text-gray-500">{student ? student.email : ""}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {university ? university.name : "Unknown University"}
                    </td>
                    <td className="px-6 py-4">
                      {program ? program.name : "Unknown Program"}
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={statusColors[application.status] || "bg-gray-100 text-gray-800"}>
                        {formatStatus(application.status)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {formatStatus(application.stage)}
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(application.applicationDate)}
                    </td>
                    <td className="px-6 py-4">
                      {agent ? agent.name : "Direct"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <NewApplicationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}