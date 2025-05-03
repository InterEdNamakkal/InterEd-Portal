import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart } from "@/components/ui/chart";
import { 
  Users, 
  FileText, 
  UserCheck, 
  GraduationCap,
  ArrowUpRight,
  TrendingUp,
  TrendingDown
} from "lucide-react";

// Import the new dashboard components
import RecentApplications from "@/components/dashboard/RecentApplications";
import TopPerformingAgents from "@/components/dashboard/TopPerformingAgents";
import NewAgentsCard from "@/components/dashboard/NewAgentsCard";

const Dashboard = () => {
  const { data: studentCounts = {} } = useQuery<Record<string, number>>({
    queryKey: ['/api/stats/students/stage-counts'],
  });
  
  // Calculate total students
  const totalStudents = Object.values(studentCounts as Record<string, number>).reduce(
    (sum: number, count: number) => sum + count, 
    0
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your InterEd admin dashboard</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 mb-6">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentCounts.application || 0}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">+4</span> new today
            </p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">University Partners</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              Across <span className="font-medium">12</span> countries
            </p>
          </CardContent>
        </Card>
        
        {/* New Agents Card - Using the new component */}
        <div className="col-span-1">
          <NewAgentsCard count={42} trend={-3.1} period="since last month" />
        </div>
      </div>
      
      {/* Recent Applications Table */}
      <div className="mb-6">
        <RecentApplications />
      </div>
      
      {/* Top Performing Agents Table */}
      <div className="mb-6">
        <TopPerformingAgents />
      </div>
      
      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Student Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                  {
                    label: 'Applications',
                    data: [65, 78, 42, 89, 56, 78],
                    backgroundColor: 'hsl(var(--chart-1))',
                  }
                ],
              }}
            />
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Enrollment Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                  {
                    label: 'Enrollments',
                    data: [12, 19, 18, 22, 24, 31],
                    borderColor: 'hsl(var(--chart-2))',
                    backgroundColor: 'transparent',
                  }
                ],
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
