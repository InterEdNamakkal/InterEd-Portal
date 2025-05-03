import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Agent } from "@shared/schema";
import { PageHeader } from "@/components/layout/PageHeader";
import AgentTable from "@/components/agents/AgentTable";
import AgentActions from "@/components/agents/AgentActions";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pie, PieChart, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { PlusCircle, Users, Building } from "lucide-react";

const statusColors = {
  active: "#4CAF50",
  inactive: "#9E9E9E",
  pending: "#FFC107",
  suspended: "#F44336"
};

export default function AgentsPage() {
  const [activeTab, setActiveTab] = useState("list");
  const [_, navigate] = useLocation();
  
  // Fetch agents data
  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['/api/agents'],
  });
  
  // Handler for searching agents
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Implement search functionality
  };
  
  // Handle various agent actions
  const handleDeleteAgent = (id: number) => {
    console.log("Delete agent:", id);
    // Implemented via AgentActions
  };
  
  const handleMarkAsFeatured = (id: number, isFeatured: boolean) => {
    console.log("Mark agent as featured:", id, isFeatured);
    // Implemented via AgentActions
  };
  
  const handleAssignStudents = (agent: Agent) => {
    console.log("Assign students to agent:", agent.id);
    // Implemented via AgentActions
  };
  
  const handleViewPerformance = (agent: Agent) => {
    console.log("View agent performance:", agent.id);
    // Implemented via AgentActions
  };
  
  const handleManagePartnership = (agent: Agent) => {
    console.log("Manage agent partnership:", agent.id);
    // Implemented via AgentActions
  };
  
  // Prepare data for status distribution chart
  const getStatusDistribution = () => {
    const statusCount: Record<string, number> = {};
    
    agents.forEach((agent: Agent) => {
      const status = agent.status || 'unknown';
      statusCount[status] = (statusCount[status] || 0) + 1;
    });
    
    return Object.entries(statusCount).map(([name, value]) => ({
      name,
      value
    }));
  };
  
  // Prepare data for country distribution chart
  const getCountryDistribution = () => {
    const countryCount: Record<string, number> = {};
    
    agents.forEach((agent: Agent) => {
      const country = agent.country || 'unknown';
      countryCount[country] = (countryCount[country] || 0) + 1;
    });
    
    return Object.entries(countryCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Top 5 countries
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <PageHeader 
        title="Agent Management"
        description="Manage recruitment agents and partnerships"
        actions={
          <Button onClick={() => navigate("/agents/new")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Agent
          </Button>
        }
      />
      
      <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Agent List
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center">
            <Building className="mr-2 h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <AgentTable 
            agents={agents}
            isLoading={isLoading}
            onSearch={handleSearch}
            onDeleteAgent={handleDeleteAgent}
            onMarkAsFeatured={handleMarkAsFeatured}
            onAssignStudents={handleAssignStudents}
            onViewPerformance={handleViewPerformance}
            onManagePartnership={handleManagePartnership}
          />
          
          <AgentActions />
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Agent Status Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getStatusDistribution()}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {getStatusDistribution().map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={statusColors[entry.name as keyof typeof statusColors] || "#999"} 
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Top Countries</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getCountryDistribution()}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {getCountryDistribution().map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={`hsl(${index * 45}, 70%, 60%)`} 
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}