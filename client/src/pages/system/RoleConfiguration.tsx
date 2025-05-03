import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Edit, 
  Trash, 
  Plus, 
  Eye, 
  Copy,
  Users,
  Shield
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SYSTEM_CONFIG_TABS } from "@/lib/constants";

export default function RoleConfiguration() {
  const [activeTab, setActiveTab] = useState("roles");

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
              <Plus className="h-4 w-4" />
              <span>Create New Role</span>
            </Button>
          </div>
          <div>
            <Input
              type="search"
              placeholder="Search roles..."
              className="w-[250px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 space-y-4">
            <h2 className="text-lg font-medium">Available Roles</h2>
            {roles.map((role) => (
              <Card 
                key={role.id} 
                className={role.selected ? "border-2 border-blue-500" : ""}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-md">
                        <Shield className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-base">{role.name}</h3>
                        <p className="text-sm text-muted-foreground">{role.usersCount} users</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3 text-sm">
                    <p>{role.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Role Permissions</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Copy className="h-4 w-4" />
                  <span>Duplicate</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>Manage Users</span>
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
              </div>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  Super Admin Permissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Super Admins have full access to all system features and data. This role should be assigned with caution.
                </p>
                
                <div className="space-y-6">
                  {permissionGroups.map((group) => (
                    <div key={group.id} className="space-y-2">
                      <h3 className="text-sm font-medium">{group.name}</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[300px]">PERMISSION</TableHead>
                            <TableHead className="w-[100px] text-center">VIEW</TableHead>
                            <TableHead className="w-[100px] text-center">CREATE</TableHead>
                            <TableHead className="w-[100px] text-center">EDIT</TableHead>
                            <TableHead className="w-[100px] text-center">DELETE</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {group.permissions.map((permission) => (
                            <TableRow key={permission.id}>
                              <TableCell className="font-medium">{permission.name}</TableCell>
                              <TableCell className="text-center">
                                <Checkbox checked={permission.view} />
                              </TableCell>
                              <TableCell className="text-center">
                                <Checkbox checked={permission.create} />
                              </TableCell>
                              <TableCell className="text-center">
                                <Checkbox checked={permission.edit} />
                              </TableCell>
                              <TableCell className="text-center">
                                <Checkbox checked={permission.delete} />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

// Mock data
const roles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full access to all system features and functionality.",
    usersCount: 1,
    selected: true
  },
  {
    id: 2,
    name: "Regional Manager",
    description: "Manage regional operations and staff performance.",
    usersCount: 3,
    selected: false
  },
  {
    id: 3,
    name: "Counselor",
    description: "Work directly with students on applications and admission.",
    usersCount: 12,
    selected: false
  },
  {
    id: 4,
    name: "Agent Manager",
    description: "Oversee agent network, commissions, and performance.",
    usersCount: 5,
    selected: false
  },
  {
    id: 5,
    name: "University Relations",
    description: "Manage university partnerships and agreements.",
    usersCount: 4,
    selected: false
  },
  {
    id: 6,
    name: "Finance Manager",
    description: "Oversee financial operations, invoicing, and payments.",
    usersCount: 2,
    selected: false
  },
  {
    id: 7,
    name: "Marketing Specialist",
    description: "Manage marketing campaigns and content creation.",
    usersCount: 3,
    selected: false
  }
];

const permissionGroups = [
  {
    id: 1,
    name: "Student Management",
    permissions: [
      {
        id: 1,
        name: "Student Records",
        view: true,
        create: true,
        edit: true,
        delete: true
      },
      {
        id: 2,
        name: "Student Applications",
        view: true,
        create: true,
        edit: true,
        delete: true
      },
      {
        id: 3,
        name: "Student Documents",
        view: true,
        create: true,
        edit: true,
        delete: true
      }
    ]
  },
  {
    id: 2,
    name: "University Management",
    permissions: [
      {
        id: 4,
        name: "University Records",
        view: true,
        create: true,
        edit: true,
        delete: true
      },
      {
        id: 5,
        name: "Program Catalog",
        view: true,
        create: true,
        edit: true,
        delete: true
      },
      {
        id: 6,
        name: "Partnership Agreements",
        view: true,
        create: true,
        edit: true,
        delete: true
      }
    ]
  },
  {
    id: 3,
    name: "System Administration",
    permissions: [
      {
        id: 7,
        name: "User Management",
        view: true,
        create: true,
        edit: true,
        delete: true
      },
      {
        id: 8,
        name: "Role Configuration",
        view: true,
        create: true,
        edit: true,
        delete: true
      },
      {
        id: 9,
        name: "System Settings",
        view: true,
        create: true,
        edit: true,
        delete: true
      },
      {
        id: 10,
        name: "Audit Logs",
        view: true,
        create: false,
        edit: false,
        delete: false
      }
    ]
  }
];