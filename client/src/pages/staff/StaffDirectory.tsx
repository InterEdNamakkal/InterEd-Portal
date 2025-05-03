import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  UserPlus, 
  Edit, 
  Trash,
  Filter,
  Download,
  Mail,
  Phone
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
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import AddStaffDialog from "./AddStaffDialog";

// Define staff member interface
interface StaffMember {
  id: number;
  name: string;
  initials: string;
  email: string;
  phone?: string;
  role: string;
  department: string;
  location: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  performanceScore: number;
  avatarColor?: string;
  joinDate?: string;
  reportsTo?: string;
}

// Mock data for staff members
const mockStaffMembers: StaffMember[] = [
  {
    id: 1,
    name: "Anita Desai",
    initials: "AD",
    email: "anita.desai@intered.com",
    phone: "+91 98765 43210",
    role: "Regional Manager",
    department: "Operations",
    location: "Chennai",
    status: "Active",
    performanceScore: 92,
    avatarColor: "bg-red-100",
    joinDate: "2020-03-15",
    reportsTo: "Rahul Sharma"
  },
  {
    id: 2,
    name: "Vikram Mehta",
    initials: "VM",
    email: "vikram.mehta@intered.com",
    phone: "+91 87654 32109",
    role: "Counselor",
    department: "Student Services",
    location: "Mumbai",
    status: "Active",
    performanceScore: 88,
    avatarColor: "bg-blue-100",
    joinDate: "2021-07-10",
    reportsTo: "Anita Desai"
  },
  {
    id: 3,
    name: "Priya Singh",
    initials: "PS",
    email: "priya.singh@intered.com",
    phone: "+91 76543 21098",
    role: "Agent Manager",
    department: "Partner Relations",
    location: "Delhi",
    status: "Active",
    performanceScore: 95,
    avatarColor: "bg-purple-100",
    joinDate: "2019-11-05",
    reportsTo: "Rahul Sharma"
  },
  {
    id: 4,
    name: "Rajiv Kumar",
    initials: "RK",
    email: "rajiv.kumar@intered.com",
    phone: "+91 65432 10987",
    role: "University Relations",
    department: "Partner Relations",
    location: "Bangalore",
    status: "On Leave",
    performanceScore: 84,
    avatarColor: "bg-gray-100",
    joinDate: "2022-01-20",
    reportsTo: "Priya Singh"
  },
  {
    id: 5,
    name: "Meera Joshi",
    initials: "MJ",
    email: "meera.joshi@intered.com",
    phone: "+91 54321 09876",
    role: "Finance Manager",
    department: "Finance",
    location: "Chennai",
    status: "Active",
    performanceScore: 90,
    avatarColor: "bg-yellow-100",
    joinDate: "2020-08-12",
    reportsTo: "Rahul Sharma"
  },
  {
    id: 6,
    name: "Sanjay Patel",
    initials: "SP",
    email: "sanjay.patel@intered.com",
    phone: "+91 43210 98765",
    role: "Marketing Specialist",
    department: "Marketing",
    location: "Mumbai",
    status: "Active",
    performanceScore: 87,
    avatarColor: "bg-green-100",
    joinDate: "2021-03-25",
    reportsTo: "Anita Desai"
  },
  {
    id: 7,
    name: "Deepa Verma",
    initials: "DV",
    email: "deepa.verma@intered.com",
    phone: "+91 32109 87654",
    role: "Counselor",
    department: "Student Services",
    location: "Delhi",
    status: "Active",
    performanceScore: 89,
    avatarColor: "bg-pink-100",
    joinDate: "2021-09-15",
    reportsTo: "Vikram Mehta"
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

// View options
const viewOptions = ["Table", "Cards", "Organization"];

export default function StaffDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [viewMode, setViewMode] = useState("Table");
  const [isAddStaffDialogOpen, setIsAddStaffDialogOpen] = useState(false);
  
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          onClick={() => setIsAddStaffDialogOpen(true)}
        >
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
          
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              {viewOptions.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {viewMode === "Table" ? (
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
      ) : viewMode === "Cards" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaffMembers.map(member => (
            <Card key={member.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-full ${member.avatarColor || 'bg-gray-100'} flex items-center justify-center text-blue-600 text-xl`}>
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{member.name}</h3>
                    <p className="text-gray-500">{member.role}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(member.status)} mt-1 inline-block`}>
                      {member.status}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{member.email}</span>
                  </div>
                  {member.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{member.phone}</span>
                    </div>
                  )}
                  <div className="text-sm">
                    <span className="text-gray-500">Department:</span> {member.department}
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Location:</span> {member.location}
                  </div>
                  {member.reportsTo && (
                    <div className="text-sm">
                      <span className="text-gray-500">Reports to:</span> {member.reportsTo}
                    </div>
                  )}
                </div>
                
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Performance Score</span>
                    <span className="font-medium">{member.performanceScore}%</span>
                  </div>
                  <Progress 
                    value={member.performanceScore} 
                    className={`h-2 ${getPerformanceColor(member.performanceScore)}`} 
                  />
                </div>
                
                <div className="flex justify-between pt-2 border-t">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50">
                    <Trash className="h-3 w-3" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border p-6 flex items-center justify-center h-64">
          <div className="text-center text-gray-500">
            <p className="text-lg font-medium mb-2">Organization Chart View</p>
            <p className="text-sm">This view will display the organizational hierarchy.</p>
          </div>
        </div>
      )}
      
      <AddStaffDialog 
        open={isAddStaffDialogOpen} 
        onOpenChange={setIsAddStaffDialogOpen} 
      />
    </div>
  );
}