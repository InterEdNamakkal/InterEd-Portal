import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  UserPlus, 
  FileUp, 
  Search, 
  Edit, 
  Trash, 
  Mail, 
  User
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { USER_STATUS, SYSTEM_CONFIG_TABS, DEPARTMENTS, ROLES } from "@/lib/constants";

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("users");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">System Configuration</h1>
          <p className="text-muted-foreground">
            Manage system settings, users, roles, and configurations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Search className="h-4 w-4" />
            <span>Search...</span>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-background border-b w-full justify-start rounded-none gap-0 px-0">
          {SYSTEM_CONFIG_TABS.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 px-4 font-medium text-muted-foreground data-[state=active]:text-primary"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1">
              <UserPlus className="h-4 w-4" />
              <span>Add User</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-1">
              <FileUp className="h-4 w-4" />
              <span>Import Users</span>
            </Button>
          </div>
          <div className="flex gap-3">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>NAME</TableHead>
                <TableHead>EMAIL</TableHead>
                <TableHead>ROLE</TableHead>
                <TableHead>DEPARTMENT</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>LAST LOGIN</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar className="h-8 w-8 text-xs bg-blue-100 text-blue-800">
                      <div>{getInitials(user.name)}</div>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      user.status === "Active" 
                        ? "bg-green-50 text-green-800 border-green-100" 
                        : "bg-red-50 text-red-800 border-red-100"
                    }>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Tabs>
    </div>
  );
}

function getInitials(name: string): string {
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

// Mock data
const users = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@intered.com",
    role: "Super Admin",
    department: "IT",
    status: "Active",
    lastLogin: "Mar 31, 2025 (Today)"
  },
  {
    id: 2,
    name: "Anita Desai",
    email: "anita.desai@intered.com",
    role: "Regional Manager",
    department: "Operations",
    status: "Active",
    lastLogin: "Mar 30, 2025"
  },
  {
    id: 3,
    name: "Vikram Mehta",
    email: "vikram.mehta@intered.com",
    role: "Counselor",
    department: "Student Services",
    status: "Active",
    lastLogin: "Mar 31, 2025 (Today)"
  },
  {
    id: 4,
    name: "Priya Singh",
    email: "priya.singh@intered.com",
    role: "Agent Manager",
    department: "Partner Relations",
    status: "Active",
    lastLogin: "Mar 29, 2025"
  },
  {
    id: 5,
    name: "Rajiv Kumar",
    email: "rajiv.kumar@intered.com",
    role: "University Relations",
    department: "Partner Relations",
    status: "Inactive",
    lastLogin: "Mar 15, 2025"
  },
  {
    id: 6,
    name: "Meera Joshi",
    email: "meera.joshi@intered.com",
    role: "Finance Manager",
    department: "Finance",
    status: "Active",
    lastLogin: "Mar 28, 2025"
  },
  {
    id: 7,
    name: "Sanjay Patel",
    email: "sanjay.patel@intered.com",
    role: "Marketing Specialist",
    department: "Marketing",
    status: "Active",
    lastLogin: "Mar 30, 2025"
  }
];