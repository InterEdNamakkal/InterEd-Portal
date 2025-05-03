import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  ArrowUp, 
  ArrowDown, 
  BarChart,
  LineChart,
  Download,
  FileText
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { TIME_FILTER_OPTIONS } from "@/lib/constants";

// Define performance metrics interfaces
interface PerformanceMetric {
  id: number;
  name: string;
  role: string;
  department: string;
  location: string;
  overallScore: number;
  metrics: {
    taskCompletion: number;
    studentConversions: number;
    deadlineAdherence: number;
    teamContribution: number;
    clientSatisfaction: number;
  };
  history: {
    month: string;
    score: number;
  }[];
}

// Mock data for performance metrics
const mockPerformanceData: PerformanceMetric[] = [
  {
    id: 1,
    name: "Anita Desai",
    role: "Regional Manager",
    department: "Operations",
    location: "Chennai",
    overallScore: 92,
    metrics: {
      taskCompletion: 95,
      studentConversions: 88,
      deadlineAdherence: 94,
      teamContribution: 90,
      clientSatisfaction: 93
    },
    history: [
      { month: "Jan", score: 88 },
      { month: "Feb", score: 90 },
      { month: "Mar", score: 89 },
      { month: "Apr", score: 91 },
      { month: "May", score: 92 }
    ]
  },
  {
    id: 2,
    name: "Vikram Mehta",
    role: "Counselor",
    department: "Student Services",
    location: "Mumbai",
    overallScore: 88,
    metrics: {
      taskCompletion: 86,
      studentConversions: 92,
      deadlineAdherence: 85,
      teamContribution: 88,
      clientSatisfaction: 89
    },
    history: [
      { month: "Jan", score: 83 },
      { month: "Feb", score: 85 },
      { month: "Mar", score: 87 },
      { month: "Apr", score: 86 },
      { month: "May", score: 88 }
    ]
  },
  {
    id: 3,
    name: "Priya Singh",
    role: "Agent Manager",
    department: "Partner Relations",
    location: "Delhi",
    overallScore: 95,
    metrics: {
      taskCompletion: 97,
      studentConversions: 96,
      deadlineAdherence: 92,
      teamContribution: 94,
      clientSatisfaction: 96
    },
    history: [
      { month: "Jan", score: 93 },
      { month: "Feb", score: 92 },
      { month: "Mar", score: 94 },
      { month: "Apr", score: 95 },
      { month: "May", score: 95 }
    ]
  },
  {
    id: 4,
    name: "Rajiv Kumar",
    role: "University Relations",
    department: "Partner Relations",
    location: "Bangalore",
    overallScore: 84,
    metrics: {
      taskCompletion: 82,
      studentConversions: 80,
      deadlineAdherence: 88,
      teamContribution: 86,
      clientSatisfaction: 84
    },
    history: [
      { month: "Jan", score: 85 },
      { month: "Feb", score: 83 },
      { month: "Mar", score: 82 },
      { month: "Apr", score: 84 },
      { month: "May", score: 84 }
    ]
  },
  {
    id: 5,
    name: "Meera Joshi",
    role: "Finance Manager",
    department: "Finance",
    location: "Chennai",
    overallScore: 90,
    metrics: {
      taskCompletion: 91,
      studentConversions: 85,
      deadlineAdherence: 93,
      teamContribution: 89,
      clientSatisfaction: 92
    },
    history: [
      { month: "Jan", score: 87 },
      { month: "Feb", score: 89 },
      { month: "Mar", score: 88 },
      { month: "Apr", score: 90 },
      { month: "May", score: 90 }
    ]
  }
];

// Team performance over time
const teamPerformanceData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May"],
  scores: [86, 87, 88, 89, 90]
};

// Department performance
const departmentPerformanceData = [
  { name: "Student Services", score: 89 },
  { name: "Partner Relations", score: 92 },
  { name: "Operations", score: 90 },
  { name: "Finance", score: 88 },
  { name: "Marketing", score: 86 }
];

export default function PerformanceMetrics() {
  const [timeFilter, setTimeFilter] = useState("last_30_days");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  
  // Function to get the appropriate color for scores
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="container mx-auto py-6 px-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Staff Performance Metrics</h1>
        
        <div className="flex items-center gap-3">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              {TIME_FILTER_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Overall Team Performance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90%</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              3.2% vs. last month
            </div>
            <Progress value={90} className="h-2 mt-3 bg-green-500" />
          </CardContent>
        </Card>
        
        {/* Top Performer */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Top Performer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Priya Singh</div>
            <div className="text-sm text-gray-500">Agent Manager</div>
            <div className="flex items-center mt-2">
              <div className="text-green-500 font-bold mr-2">95%</div>
              <Progress value={95} className="h-2 flex-1 bg-green-500" />
            </div>
          </CardContent>
        </Card>
        
        {/* Most Improved */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Most Improved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Vikram Mehta</div>
            <div className="text-sm text-gray-500">Counselor</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              5.8% improvement
            </div>
          </CardContent>
        </Card>
        
        {/* Needs Attention */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Needs Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Rajiv Kumar</div>
            <div className="text-sm text-gray-500">University Relations</div>
            <div className="flex items-center text-xs text-red-500 mt-1">
              <ArrowDown className="h-3 w-3 mr-1" />
              1.2% decline
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Performance Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Team Performance Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Team Performance Trend</CardTitle>
            <CardDescription>Average performance score over the last 5 months</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center text-gray-500">
              <LineChart className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="mb-1">Performance Trend Chart</p>
              <p className="text-xs text-gray-400">
                Steady improvement from {teamPerformanceData.scores[0]}% to {teamPerformanceData.scores[teamPerformanceData.scores.length - 1]}%
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Department Performance Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Average performance by department</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {departmentPerformanceData.map((dept, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{dept.name}</span>
                    <span className="font-medium">{dept.score}%</span>
                  </div>
                  <Progress value={dept.score} className={`h-2 ${getScoreColor(dept.score)}`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Individual Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Individual Performance Breakdown</CardTitle>
          <CardDescription>Detailed metrics for each staff member</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockPerformanceData.map((staff) => (
              <div key={staff.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-lg">{staff.name}</h3>
                    <p className="text-sm text-gray-500">{staff.role} • {staff.department}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-xl">{staff.overallScore}%</div>
                    <p className="text-xs text-gray-500">Overall Score</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Task Completion</span>
                        <span>{staff.metrics.taskCompletion}%</span>
                      </div>
                      <Progress value={staff.metrics.taskCompletion} className={`h-2 ${getScoreColor(staff.metrics.taskCompletion)}`} />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Student Conversions</span>
                        <span>{staff.metrics.studentConversions}%</span>
                      </div>
                      <Progress value={staff.metrics.studentConversions} className={`h-2 ${getScoreColor(staff.metrics.studentConversions)}`} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Deadline Adherence</span>
                        <span>{staff.metrics.deadlineAdherence}%</span>
                      </div>
                      <Progress value={staff.metrics.deadlineAdherence} className={`h-2 ${getScoreColor(staff.metrics.deadlineAdherence)}`} />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Team Contribution</span>
                        <span>{staff.metrics.teamContribution}%</span>
                      </div>
                      <Progress value={staff.metrics.teamContribution} className={`h-2 ${getScoreColor(staff.metrics.teamContribution)}`} />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Client Satisfaction</span>
                      <span>{staff.metrics.clientSatisfaction}%</span>
                    </div>
                    <Progress value={staff.metrics.clientSatisfaction} className={`h-2 ${getScoreColor(staff.metrics.clientSatisfaction)}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}