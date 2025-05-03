import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Filter, DollarSign, Users, FileText, BarChart2 } from "lucide-react";
import { StandardActions } from "@/components/ui/ActionMenu";
import type { Agent } from "@shared/schema";

interface AgentTier {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
  count: number;
}

interface AgreementStatus {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
  count: number;
}

export default function AgentDirectory() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all-agents");
  
  // Fetch agents data
  const { data: agents, isLoading, error } = useQuery<Agent[]>({
    queryKey: ["/api/agents"],
    retry: 1,
  });

  if (error) {
    console.error("Error fetching agents:", error);
    toast({
      variant: "destructive",
      title: "Error fetching agents",
      description: "There was a problem loading agent data.",
    });
  }
  
  // For debugging
  console.log("Agents data:", agents);

  // Agent tiers exactly as in the mockup
  const agentTiers: AgentTier[] = [
    { id: "platinum", name: "Platinum", bgColor: "bg-blue-50", textColor: "text-blue-800", count: 1 },
    { id: "gold", name: "Gold", bgColor: "bg-yellow-50", textColor: "text-yellow-800", count: 2 },
    { id: "silver", name: "Silver", bgColor: "bg-gray-50", textColor: "text-gray-800", count: 2 },
    { id: "bronze", name: "Bronze", bgColor: "bg-amber-50", textColor: "text-amber-800", count: 1 }
  ];

  // Agreement status exactly as in the mockup
  const agreementStatuses: AgreementStatus[] = [
    { id: "valid", name: "Valid", bgColor: "bg-green-50", textColor: "text-green-800", count: 4 },
    { id: "expiring-soon", name: "Expiring Soon", bgColor: "bg-yellow-50", textColor: "text-yellow-800", count: 0 },
    { id: "expired", name: "Expired", bgColor: "bg-red-50", textColor: "text-red-800", count: 1 },
    { id: "pending", name: "Pending", bgColor: "bg-blue-50", textColor: "text-blue-800", count: 1 }
  ];

  // Handle tab click
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // Filter agents based on active tab
  const filteredAgents = () => {
    if (!agents || !Array.isArray(agents)) return [];
    
    switch (activeTab) {
      case "active":
        return agents.filter(agent => agent.status === "active");
      case "inactive":
        return agents.filter(agent => agent.status === "inactive");
      case "pending-approval":
        return agents.filter(agent => agent.status === "pending");
      case "top-performers":
        // In a real app, we'd have a way to determine top performers
        return agents.slice(0, 5); // Just showing first 5 for mock purposes
      default:
        return agents;
    }
  };

  // Format revenue - in a real app this would come from actual agent data
  const formatRevenue = (agent: any) => {
    // Mock revenue calculation - would be real in production
    const baseValue = agent.id * 15000 + 20000;
    return `$${baseValue.toLocaleString()}`;
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Agent Directory</h1>
          <p className="text-gray-500 text-sm">Manage all recruitment agents and their performance</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Add New Agent
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center space-x-4">
            <div className="p-2 rounded-lg bg-blue-100">
              <Users className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Agents</p>
              <h3 className="text-2xl font-bold">{agents && Array.isArray(agents) ? agents.length : 0}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center space-x-4">
            <div className="p-2 rounded-lg bg-green-100">
              <Users className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Agents</p>
              <h3 className="text-2xl font-bold">
                {agents && Array.isArray(agents) ? agents.filter(a => a.status === "active").length : 0}
              </h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center space-x-4">
            <div className="p-2 rounded-lg bg-purple-100">
              <FileText className="h-6 w-6 text-purple-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Applications</p>
              <h3 className="text-2xl font-bold">189</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center space-x-4">
            <div className="p-2 rounded-lg bg-amber-100">
              <DollarSign className="h-6 w-6 text-amber-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold">$952,850</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Tiers - Matching the mockup layout */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Agent Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Platinum Tier */}
          <div className="bg-blue-50 rounded-lg p-5 relative">
            <div className="absolute top-4 left-4 bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              1
            </div>
            <div className="flex justify-end">
              <div className="text-right">
                <div className="text-sm font-medium">Platinum</div>
                <div className="text-xs text-gray-500">1 agent</div>
              </div>
            </div>
          </div>

          {/* Gold Tier */}
          <div className="bg-yellow-50 rounded-lg p-5 relative">
            <div className="absolute top-4 left-4 bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              2
            </div>
            <div className="flex justify-end">
              <div className="text-right">
                <div className="text-sm font-medium">Gold</div>
                <div className="text-xs text-gray-500">2 agents</div>
              </div>
            </div>
          </div>

          {/* Silver Tier */}
          <div className="bg-gray-50 rounded-lg p-5 relative">
            <div className="absolute top-4 left-4 bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              2
            </div>
            <div className="flex justify-end">
              <div className="text-right">
                <div className="text-sm font-medium">Silver</div>
                <div className="text-xs text-gray-500">2 agents</div>
              </div>
            </div>
          </div>

          {/* Bronze Tier */}
          <div className="bg-amber-50 rounded-lg p-5 relative">
            <div className="absolute top-4 left-4 bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              1
            </div>
            <div className="flex justify-end">
              <div className="text-right">
                <div className="text-sm font-medium">Bronze</div>
                <div className="text-xs text-gray-500">1 agent</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agreement Status - Matching the mockup layout */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Agreement Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Valid Agreements */}
          <div className="bg-green-50 rounded-lg p-5 relative">
            <div className="absolute top-4 left-4 bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              4
            </div>
            <div className="flex justify-end">
              <div className="text-right">
                <div className="text-sm font-medium">Valid</div>
                <div className="text-xs text-gray-500">4 agreements</div>
              </div>
            </div>
          </div>

          {/* Expiring Soon Agreements */}
          <div className="bg-yellow-50 rounded-lg p-5 relative">
            <div className="absolute top-4 left-4 bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              0
            </div>
            <div className="flex justify-end">
              <div className="text-right">
                <div className="text-sm font-medium">Expiring Soon</div>
                <div className="text-xs text-gray-500">0 agreements</div>
              </div>
            </div>
          </div>

          {/* Expired Agreements */}
          <div className="bg-red-50 rounded-lg p-5 relative">
            <div className="absolute top-4 left-4 bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              1
            </div>
            <div className="flex justify-end">
              <div className="text-right">
                <div className="text-sm font-medium">Expired</div>
                <div className="text-xs text-gray-500">1 agreement</div>
              </div>
            </div>
          </div>

          {/* Pending Agreements */}
          <div className="bg-blue-50 rounded-lg p-5 relative">
            <div className="absolute top-4 left-4 bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              1
            </div>
            <div className="flex justify-end">
              <div className="text-right">
                <div className="text-sm font-medium">Pending</div>
                <div className="text-xs text-gray-500">1 agreement</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expiring Agreements Link */}
      <div className="text-right">
        <Link href="/agents/agreements/expiring">
          <Button variant="link" className="text-blue-600 p-0 text-sm">
            View Expiring Agreements
          </Button>
        </Link>
      </div>

      {/* Agent Data Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Search agents..." 
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>

          {/* Bottom Tabs - Exactly as in mockup */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                className={`py-2 px-1 text-sm font-medium ${
                  activeTab === "all-agents"
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => handleTabClick("all-agents")}
              >
                All Agents
              </button>
              <button
                className={`py-2 px-1 text-sm font-medium ${
                  activeTab === "active"
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => handleTabClick("active")}
              >
                Active
              </button>
              <button
                className={`py-2 px-1 text-sm font-medium ${
                  activeTab === "inactive"
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => handleTabClick("inactive")}
              >
                Inactive
              </button>
              <button
                className={`py-2 px-1 text-sm font-medium ${
                  activeTab === "pending-approval"
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => handleTabClick("pending-approval")}
              >
                Pending Approval
              </button>
              <button
                className={`py-2 px-1 text-sm font-medium ${
                  activeTab === "top-performers"
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => handleTabClick("top-performers")}
              >
                Top Performers
              </button>
            </nav>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">AGENT</TableHead>
                <TableHead className="font-medium">LOCATION</TableHead>
                <TableHead className="font-medium">STATUS</TableHead>
                <TableHead className="font-medium">STUDENTS</TableHead>
                <TableHead className="font-medium">APPLICATIONS</TableHead>
                <TableHead className="font-medium">CONVERSION RATE</TableHead>
                <TableHead className="font-medium">REVENUE</TableHead>
                <TableHead className="font-medium text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">Loading agent data...</TableCell>
                </TableRow>
              ) : !agents || !Array.isArray(agents) || agents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">No agents found.</TableCell>
                </TableRow>
              ) : (
                filteredAgents().map((agent: any) => (
                  <TableRow key={agent.id} className="group">
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{agent.name}</span>
                        <span className="text-xs text-gray-500">{agent.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {agent.country || "Unknown"}
                      {agent.company && <span className="text-xs text-gray-500 block">{agent.company}</span>}
                    </TableCell>
                    <TableCell>
                      {agent.status ? (
                        <Badge
                          variant="outline"
                          className={`
                            ${agent.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                            ${agent.status === 'inactive' ? 'bg-red-100 text-red-800 border-red-200' : ''}
                            ${agent.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : ''}
                          `}
                        >
                          {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                          Unknown
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{Math.floor(Math.random() * 20) + 5}</TableCell>
                    <TableCell>{Math.floor(Math.random() * 30) + 10}</TableCell>
                    <TableCell>{(Math.random() * 0.4 + 0.5).toLocaleString(undefined, {style: 'percent'})}</TableCell>
                    <TableCell className="font-medium">{formatRevenue(agent)}</TableCell>
                    <TableCell className="text-right">
                      <StandardActions
                        onEdit={() => {
                          toast({
                            title: "Edit Agent",
                            description: `Editing agent: ${agent.name}`,
                          });
                        }}
                        onActivate={
                          agent.status && agent.status !== 'active' 
                            ? () => {
                                toast({
                                  title: "Activate Agent",
                                  description: `Agent ${agent.name} has been activated`,
                                });
                              }
                            : undefined
                        }
                        onSuspend={
                          agent.status === 'active'
                            ? () => {
                                toast({
                                  title: "Suspend Agent",
                                  description: `Agent ${agent.name} has been suspended`,
                                  variant: "destructive",
                                });
                              }
                            : undefined
                        }
                        onDelete={() => {
                          toast({
                            title: "Delete Agent",
                            description: `Agent ${agent.name} has been deleted`,
                            variant: "destructive",
                          });
                        }}
                        className="opacity-0 group-hover:opacity-100"
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}