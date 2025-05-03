import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Loader2, TrendingUp, Users, School, Star } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { Agent } from "@shared/schema";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface ViewPerformanceDialogProps {
  agent: Agent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock data for visualizations
const performanceData = [
  { month: "Jan", students: 4, placements: 2, revenue: 2000 },
  { month: "Feb", students: 6, placements: 3, revenue: 3000 },
  { month: "Mar", students: 8, placements: 5, revenue: 5000 },
  { month: "Apr", students: 10, placements: 7, revenue: 7000 },
  { month: "May", students: 7, placements: 4, revenue: 4000 },
  { month: "Jun", students: 9, placements: 6, revenue: 6000 }
];

const StatCard = ({ title, value, icon, description }: { title: string, value: string | number, icon: React.ReactNode, description?: string }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </CardContent>
  </Card>
);

export default function ViewPerformanceDialog({
  agent,
  open,
  onOpenChange
}: ViewPerformanceDialogProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  // This would normally fetch real performance data
  const { data: performance, isLoading } = useQuery({
    queryKey: ['/api/agents', agent.id, 'performance'],
    enabled: open,
    queryFn: () => performanceData // In a real app, you'd fetch this from the API
  });
  
  const overviewStats = [
    {
      title: "Total Students",
      value: agent.studentsCount || 0,
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      description: "All time"
    },
    {
      title: "Placements",
      value: 28,
      icon: <School className="h-4 w-4 text-muted-foreground" />,
      description: "Successfully placed"
    },
    {
      title: "Total Revenue",
      value: "$27,000",
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
      description: "Commission earned"
    },
    {
      title: "Avg. Satisfaction",
      value: "4.8/5",
      icon: <Star className="h-4 w-4 text-muted-foreground" />,
      description: "From students"
    }
  ];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Agent Performance: {agent.name}</DialogTitle>
          <DialogDescription>
            Performance metrics and analytics for this agent.
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 pt-4">
              <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                {overviewStats.map((stat, i) => (
                  <StatCard key={i} {...stat} />
                ))}
              </div>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Performance Trend</CardTitle>
                  <CardDescription>
                    Students and placements over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={performance}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="students" name="Students" fill="#8884d8" />
                      <Bar dataKey="placements" name="Placements" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="students" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Student Recruitment</CardTitle>
                  <CardDescription>
                    Student recruitment metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={performance}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="students" name="Students" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="revenue" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Generation</CardTitle>
                  <CardDescription>
                    Revenue generated through commissions
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={performance}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" name="Revenue ($)" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
        
        <div className="flex justify-end mt-4">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}