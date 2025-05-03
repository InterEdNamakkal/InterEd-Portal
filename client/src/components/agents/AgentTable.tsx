import { useState } from "react";
import { Pencil, ChevronLeft, ChevronRight, Search, Star, Phone, Mail, Calendar, FileText, Trash2, Eye, Users, BarChart, Building, GlobeIcon } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter,
  CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StandardActions } from "@/components/ui/ActionMenu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Agent } from "@shared/schema";
import { format } from "date-fns";

interface AgentTableProps {
  agents: Agent[];
  isLoading: boolean;
  onSearch: (query: string) => void;
  onDeleteAgent?: (id: number) => void;
  onMarkAsFeatured?: (id: number, isFeatured: boolean) => void;
  onAssignStudents?: (agent: Agent) => void;
  onViewPerformance?: (agent: Agent) => void;
  onManagePartnership?: (agent: Agent) => void;
}

const AgentTable = ({
  agents,
  isLoading,
  onSearch,
  onDeleteAgent,
  onMarkAsFeatured,
  onAssignStudents,
  onViewPerformance,
  onManagePartnership
}: AgentTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(agents.length / pageSize);
  
  // Format agent status with proper casing
  const formatStatus = (status: string | null) => {
    if (!status) return '';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  // Status badge colors
  const statusBadgeClasses: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
    suspended: "bg-red-100 text-red-800"
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleViewAgent = (id: number) => {
    // Navigate to agent details
    console.log(`View agent ${id}`);
  };

  const handleEditAgent = (id: number) => {
    // Navigate to edit agent
    console.log(`Edit agent ${id}`);
  };

  const handleDeleteAgent = (id: number) => {
    if (onDeleteAgent) {
      onDeleteAgent(id);
    }
  };

  const handleMarkAsFeatured = (id: number, isFeatured: boolean) => {
    if (onMarkAsFeatured) {
      onMarkAsFeatured(id, isFeatured);
    }
  };

  const handleAssignStudents = (agent: Agent) => {
    if (onAssignStudents) {
      onAssignStudents(agent);
    }
  };

  const handleViewPerformance = (agent: Agent) => {
    if (onViewPerformance) {
      onViewPerformance(agent);
    }
  };

  const handleManagePartnership = (agent: Agent) => {
    if (onManagePartnership) {
      onManagePartnership(agent);
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const visibleAgents = agents.slice(startIndex, startIndex + pageSize);

  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle>Agents</CardTitle>
          <div className="flex gap-2">
            <Button 
              variant={viewMode === 'table' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('table')}
              className="h-8 px-2 text-xs"
            >
              Table View
            </Button>
            <Button 
              variant={viewMode === 'cards' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('cards')}
              className="h-8 px-2 text-xs"
            >
              Card View
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search agents..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button variant="outline" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </CardHeader>

      <CardContent className={viewMode === 'table' ? 'p-0' : 'pt-0'}>
        {viewMode === 'table' ? (
          // Table View
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent Name</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Commission Rate</TableHead>
                  <TableHead>Students Count</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      Loading agents...
                    </TableCell>
                  </TableRow>
                ) : visibleAgents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      No agents found. Try adjusting your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  visibleAgents.map((agent) => (
                    <TableRow key={agent.id} className="group">
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {agent.isFeatured && (
                            <Star className="h-4 w-4 text-yellow-500 mr-1 inline-block" />
                          )}
                          {agent.name}
                        </div>
                      </TableCell>
                      <TableCell>{agent.contactPerson}</TableCell>
                      <TableCell>{agent.email}</TableCell>
                      <TableCell>{agent.phone}</TableCell>
                      <TableCell>{agent.country}</TableCell>
                      <TableCell>
                        <Badge className={cn("font-normal", statusBadgeClasses[agent.status || ""] || "bg-gray-100 text-gray-800")}>
                          {formatStatus(agent.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>{agent.commissionRate}%</TableCell>
                      <TableCell>{agent.studentsCount || 0}</TableCell>
                      <TableCell className="text-right">
                        <StandardActions
                          onView={() => handleViewAgent(agent.id)}
                          onEdit={() => handleEditAgent(agent.id)}
                          onMarkAsPriority={() => handleMarkAsFeatured(agent.id, !!agent.isFeatured)}
                          onDelete={() => handleDeleteAgent(agent.id)}
                          customActions={[
                            { 
                              id: 'assign-students',
                              label: "Assign Students", 
                              icon: Users, 
                              onClick: () => handleAssignStudents(agent)
                            },
                            { 
                              id: 'view-performance',
                              label: "View Performance", 
                              icon: BarChart, 
                              onClick: () => handleViewPerformance(agent)
                            },
                            { 
                              id: 'manage-partnership',
                              label: "Manage Partnership", 
                              icon: Building, 
                              onClick: () => handleManagePartnership(agent)
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
              <div className="col-span-full text-center py-12">
                Loading agents...
              </div>
            ) : visibleAgents.length === 0 ? (
              <div className="col-span-full text-center py-12">
                No agents found. Try adjusting your search.
              </div>
            ) : (
              visibleAgents.map((agent) => (
                <Card key={agent.id} className="relative overflow-hidden border group hover:shadow-md transition-shadow">
                  {agent.isFeatured && (
                    <div className="absolute top-0 right-0">
                      <div className="w-16 h-16 overflow-hidden">
                        <div className="absolute transform rotate-45 bg-yellow-500 text-white text-xs font-semibold py-1 right-[-35px] top-[15px] w-[170px] text-center">
                          Featured
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-md flex items-center">
                          {agent.name}
                        </CardTitle>
                        <CardDescription>
                          {agent.contactPerson || "No contact person specified"}
                        </CardDescription>
                      </div>
                      <StandardActions
                        onView={() => handleViewAgent(agent.id)}
                        onEdit={() => handleEditAgent(agent.id)}
                        onMarkAsPriority={() => handleMarkAsFeatured(agent.id, !!agent.isFeatured)}
                        onDelete={() => handleDeleteAgent(agent.id)}
                        customActions={[
                          { 
                            id: 'assign-students',
                            label: "Assign Students", 
                            icon: Users, 
                            onClick: () => handleAssignStudents(agent)
                          },
                          { 
                            id: 'view-performance',
                            label: "View Performance", 
                            icon: BarChart, 
                            onClick: () => handleViewPerformance(agent)
                          },
                          { 
                            id: 'manage-partnership',
                            label: "Manage Partnership", 
                            icon: Building, 
                            onClick: () => handleManagePartnership(agent)
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
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{agent.email || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{agent.phone || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GlobeIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{agent.country || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{agent.studentsCount || 0} Students</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-0 flex justify-between items-center">
                    <Badge className={cn("font-normal", statusBadgeClasses[agent.status || ""] || "bg-gray-100 text-gray-800")}>
                      {formatStatus(agent.status)}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      {agent.commissionRate || 0}% Commission
                    </div>
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
                {Math.min(currentPage * pageSize, agents.length)}
              </span>{" "}
              of <span className="font-medium">{agents.length}</span> agents
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

export default AgentTable;