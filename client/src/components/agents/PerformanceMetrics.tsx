import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TIME_FILTER_OPTIONS } from "@/lib/constants";

// Sample performance data - in a real app, this would come from API
const performanceData = [
  { name: "Jan", students: 12, applications: 23, placements: 8, revenue: 32000 },
  { name: "Feb", students: 19, applications: 28, placements: 12, revenue: 47000 },
  { name: "Mar", students: 16, applications: 30, placements: 15, revenue: 53000 },
  { name: "Apr", students: 23, applications: 36, placements: 18, revenue: 61000 },
  { name: "May", students: 18, applications: 32, placements: 14, revenue: 49000 },
  { name: "Jun", students: 25, applications: 40, placements: 22, revenue: 72000 },
];

// Sample tier performance data
const tierPerformanceData = [
  { name: "Platinum", students: 65, applications: 102, placements: 58, revenue: 245000 },
  { name: "Gold", students: 48, applications: 76, placements: 35, revenue: 169000 },
  { name: "Silver", students: 32, applications: 59, placements: 22, revenue: 98000 },
  { name: "Bronze", students: 21, applications: 37, placements: 12, revenue: 65000 },
];

export default function PerformanceMetrics() {
  const { toast } = useToast();
  
  // Fetch agents data
  const { data: agents, isLoading, error } = useQuery({
    queryKey: ["/api/agents"],
    retry: 1,
  });

  if (error) {
    toast({
      variant: "destructive",
      title: "Error fetching agents",
      description: "There was a problem loading agent data.",
    });
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Performance Metrics</h1>
        <Select defaultValue="last_30_days">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            {TIME_FILTER_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">113</div>
            <p className="text-xs text-green-600">+8.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">189</div>
            <p className="text-xs text-green-600">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Successful Placements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-green-600">+5.9% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$577,000</div>
            <p className="text-xs text-green-600">+9.8% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={performanceData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="students" name="Students" fill="#8884d8" />
                <Bar yAxisId="left" dataKey="applications" name="Applications" fill="#82ca9d" />
                <Bar yAxisId="left" dataKey="placements" name="Placements" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Performance by Tier */}
      <Card>
        <CardHeader>
          <CardTitle>Performance by Agent Tier</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={tierPerformanceData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" name="Students" fill="#8884d8" />
                <Bar dataKey="applications" name="Applications" fill="#82ca9d" />
                <Bar dataKey="placements" name="Placements" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}