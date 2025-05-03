import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  UserPlus, 
  Edit, 
  Trash,
  ChevronRight
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

// Define staff member interface
interface StaffMember {
  id: number;
  name: string;
  initials: string;
  email: string;
  role: string;
  department: string;
  location: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  performanceScore: number;
  avatarColor?: string;
}

// Mock data for staff members
const mockStaffMembers: StaffMember[] = [
  {
    id: 1,
    name: "Anita Desai",
    initials: "AD",
    email: "anita.desai@intered.com",
    role: "Regional Manager",
    department: "Operations",
    location: "Chennai",
    status: "Active",
    performanceScore: 92,
    avatarColor: "bg-red-100"
  },
  {
    id: 2,
    name: "Vikram Mehta",
    initials: "VM",
    email: "vikram.mehta@intered.com",
    role: "Counselor",
    department: "Student Services",
    location: "Mumbai",
    status: "Active",
    performanceScore: 88,
    avatarColor: "bg-blue-100"
  },
  {
    id: 3,
    name: "Priya Singh",
    initials: "PS",
    email: "priya.singh@intered.com",
    role: "Agent Manager",
    department: "Partner Relations",
    location: "Delhi",
    status: "Active",
    performanceScore: 95,
    avatarColor: "bg-purple-100"
  },
  {
    id: 4,
    name: "Rajiv Kumar",
    initials: "RK",
    email: "rajiv.kumar@intered.com",
    role: "University Relations",
    department: "Partner Relations",
    location: "Bangalore",
    status: "On Leave",
    performanceScore: 84,
    avatarColor: "bg-gray-100"
  },
  {
    id: 5,
    name: "Meera Joshi",
    initials: "MJ",
    email: "meera.joshi@intered.com",
    role: "Finance Manager",
    department: "Finance",
    location: "Chennai",
    status: "Active",
    performanceScore: 90,
    avatarColor: "bg-yellow-100"
  },
  {
    id: 6,
    name: "Sanjay Patel",
    initials: "SP",
    email: "sanjay.patel@intered.com",
    role: "Marketing Specialist",
    department: "Marketing",
    location: "Mumbai",
    status: "Active",
    performanceScore: 87,
    avatarColor: "bg-green-100"
  },
  {
    id: 7,
    name: "Deepa Verma",
    initials: "DV",
    email: "deepa.verma@intered.com",
    role: "Counselor",
    department: "Student Services",
    location: "Delhi",
    status: "Active",
    performanceScore: 89,
    avatarColor: "bg-pink-100"
  }
];

// Departments for filtering
const departments = [
  "All Departments",
  "Operations",
  "Student Services",
  "Partner Relations",
  "Finance",
  "Marketing",
  "IT",
  "HR"
];

// Roles for filtering
const roles = [
  "All Roles",
  "Regional Manager",
  "Counselor",
  "Agent Manager",
  "University Relations",
  "Finance Manager",
  "Marketing Specialist"
];

// Status options for filtering
const statusOptions = [
  "All Status",
  "Active",
  "On Leave",
  "Inactive"
];

// Time periods for filtering
const timePeriods = [
  "Last 30 Days",
  "Last 90 Days",
  "Last 6 Months",
  "Last Year",
  "All Time"
];

export default function StaffManagement() {
  const [activeTab, setActiveTab] = useState("directory");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("Last 30 Days");
  
  // Filter staff members based on filters
  const filteredStaffMembers = mockStaffMembers.filter(member => {
    // Filter by search query
    if (searchQuery && !member.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !member.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by department
    if (selectedDepartment !== "All Departments" && member.department !== selectedDepartment) {
      return false;
    }
    
    // Filter by role
    if (selectedRole !== "All Roles" && member.role !== selectedRole) {
      return false;
    }
    
    // Filter by status
    if (selectedStatus !== "All Status" && member.status !== selectedStatus) {
      return false;
    }
    
    return true;
  });
  
  // Get color for status tag
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get color for performance progress bar
  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="container mx-auto py-6 px-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Staff Management</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search staff..." 
              className="pl-10 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <div className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center -mt-1 -mr-1">
              3
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="directory" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-6 bg-transparent border-b w-full flex justify-start space-x-8 rounded-none">
          <TabsTrigger 
            value="directory" 
            className={`rounded-none border-b-2 px-4 py-2 ${activeTab === 'directory' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
          >
            Staff Directory
          </TabsTrigger>
          <TabsTrigger 
            value="performance" 
            className={`rounded-none border-b-2 px-4 py-2 ${activeTab === 'performance' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
          >
            Performance Metrics
          </TabsTrigger>
          <TabsTrigger 
            value="tasks" 
            className={`rounded-none border-b-2 px-4 py-2 ${activeTab === 'tasks' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
          >
            Task Management
          </TabsTrigger>
          <TabsTrigger 
            value="training" 
            className={`rounded-none border-b-2 px-4 py-2 ${activeTab === 'training' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
          >
            Training Management
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="directory" className="m-0">
          <div className="flex justify-between items-center mb-4">
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Add Staff Member
            </Button>
            
            <div className="flex gap-2">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(department => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(status => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedTimePeriod} onValueChange={setSelectedTimePeriod}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  {timePeriods.map(period => (
                    <SelectItem key={period} value={period}>
                      {period}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Staff Directory Table */}
          <div className="bg-white rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">NAME</TableHead>
                  <TableHead>ROLE</TableHead>
                  <TableHead>DEPARTMENT</TableHead>
                  <TableHead>LOCATION</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>PERFORMANCE</TableHead>
                  <TableHead className="text-right">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaffMembers.map(member => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${member.avatarColor || 'bg-gray-100'} flex items-center justify-center text-blue-600`}>
                          {member.initials}
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>{member.department}</TableCell>
                    <TableCell>{member.location}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="w-24">
                        <Progress 
                          value={member.performanceScore} 
                          className={`h-2 ${getPerformanceColor(member.performanceScore)}`} 
                        />
                        <div className="text-xs text-right mt-1">
                          {member.performanceScore}%
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="m-0">
          <div className="bg-white rounded-lg border p-6 flex items-center justify-center h-64">
            <div className="text-center text-gray-500">
              <p className="text-lg font-medium mb-2">Performance Metrics Content</p>
              <p className="text-sm">This section will display staff performance metrics, KPIs, and analytics.</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="tasks" className="m-0">
          <div className="bg-white rounded-lg border p-6 flex items-center justify-center h-64">
            <div className="text-center text-gray-500">
              <p className="text-lg font-medium mb-2">Task Management Content</p>
              <p className="text-sm">This section will display task assignments, deadlines, and progress tracking.</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="training" className="m-0">
          <div className="bg-white rounded-lg border p-6 flex items-center justify-center h-64">
            <div className="text-center text-gray-500">
              <p className="text-lg font-medium mb-2">Training Management Content</p>
              <p className="text-sm">This section will display training programs, completion status, and certifications.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}