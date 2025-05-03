import { useState } from "react";
import { 
  CalendarIcon, 
  DownloadIcon,
  UsersIcon,
  BarChart4Icon,
  UserCheckIcon,
  MessageSquareTextIcon,
  TrendingUpIcon,
  InfoIcon
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { EVENT_TYPES } from "@/lib/constants";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ArcElement,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function EventAnalytics() {
  const [timeframe, setTimeframe] = useState("last_6_months");
  
  // Data for charts
  const monthlyRegistrationsData = {
    labels: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Registrations",
        data: [320, 410, 370, 490, 520, 550],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
    ],
  };
  
  const attendanceRateData = {
    labels: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Attendance Rate (%)",
        data: [72, 78, 75, 82, 80, 85],
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        borderColor: "rgb(34, 197, 94)",
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  };
  
  const eventTypeDistributionData = {
    labels: ["Webinar", "Workshop", "Expo", "Fair", "Seminar", "Open Day"],
    datasets: [
      {
        data: [45, 20, 10, 15, 5, 5],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(34, 197, 94, 0.7)",
          "rgba(168, 85, 247, 0.7)",
          "rgba(234, 179, 8, 0.7)",
          "rgba(236, 72, 153, 0.7)",
          "rgba(249, 115, 22, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Event Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Analyze event performance and attendance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last_3_months">Last 3 Months</SelectItem>
              <SelectItem value="last_6_months">Last 6 Months</SelectItem>
              <SelectItem value="last_12_months">Last 12 Months</SelectItem>
              <SelectItem value="year_to_date">Year to Date</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <DownloadIcon className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard 
          title="Total Events"
          value="32"
          change="+18%"
          trend="up"
          icon={<CalendarIcon className="h-5 w-5" />}
          color="blue"
        />
        <SummaryCard 
          title="Total Registrations"
          value="2,812"
          change="+23%"
          trend="up"
          icon={<UsersIcon className="h-5 w-5" />}
          color="purple"
        />
        <SummaryCard 
          title="Avg. Attendance Rate"
          value="78%"
          change="+5%"
          trend="up"
          icon={<UserCheckIcon className="h-5 w-5" />}
          color="green"
        />
        <SummaryCard 
          title="Avg. Feedback Score"
          value="4.3"
          change="+0.2"
          trend="up"
          icon={<MessageSquareTextIcon className="h-5 w-5" />}
          color="yellow"
        />
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Monthly Registrations</CardTitle>
                <CardDescription>
                  Total event registrations by month
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-80">
                  <Bar 
                    data={monthlyRegistrationsData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Event Type Distribution</CardTitle>
                <CardDescription>
                  Breakdown of events by type
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-80 flex items-center justify-center">
                  <div className="w-2/3">
                    <Doughnut 
                      data={eventTypeDistributionData} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'right',
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Attendance Rate Trend</CardTitle>
              <CardDescription>
                Average attendance rate by month
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-80">
                <Line 
                  data={attendanceRateData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <EventPerformanceCard 
              title="Top Performing Event"
              eventName="Australia Education Expo 2025"
              metrics={[
                { label: "Registrations", value: "342/500" },
                { label: "Registration Rate", value: "68.4%" },
                { label: "Projected Attendance", value: "280+" }
              ]}
              eventType="expo"
              status="upcoming"
            />
            <EventPerformanceCard 
              title="Highest Attended"
              eventName="New Zealand Education Fair"
              metrics={[
                { label: "Attendance", value: "186/218" },
                { label: "Attendance Rate", value: "85.3%" },
                { label: "Feedback Score", value: "4.7/5.0" }
              ]}
              eventType="fair"
              status="completed"
            />
            <EventPerformanceCard 
              title="Highest Rated"
              eventName="New Zealand Education Fair"
              metrics={[
                { label: "Feedback Score", value: "4.7/5.0" },
                { label: "Responses", value: "42" },
                { label: "NPS Score", value: "86" }
              ]}
              eventType="fair"
              status="completed"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="attendance" className="space-y-6">
          <div className="p-12 text-center">
            <BarChart4Icon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium">Attendance Tab Content</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Detailed attendance metrics and analysis would be displayed here.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="feedback" className="space-y-6">
          <div className="p-12 text-center">
            <MessageSquareTextIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium">Feedback Tab Content</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Detailed feedback metrics and analysis would be displayed here.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="conversion" className="space-y-6">
          <div className="p-12 text-center">
            <TrendingUpIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium">Conversion Tab Content</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Event-to-application conversion metrics would be displayed here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface SummaryCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  color: "blue" | "green" | "yellow" | "red" | "purple";
}

function SummaryCard({ title, value, change, trend, icon, color }: SummaryCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
    red: "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
  };

  const trendClasses = {
    up: "text-green-600",
    down: "text-red-600",
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className={`p-2 rounded-full ${colorClasses[color]}`}>
            {icon}
          </div>
        </div>
        <div className={`flex items-center mt-3 text-sm ${trendClasses[trend]}`}>
          {trend === "up" ? "↑" : "↓"} {change}
          <span className="text-muted-foreground ml-1">vs. previous period</span>
        </div>
      </CardContent>
    </Card>
  );
}

interface EventPerformanceCardProps {
  title: string;
  eventName: string;
  metrics: { label: string; value: string }[];
  eventType: string;
  status: "upcoming" | "completed";
}

function EventPerformanceCard({ title, eventName, metrics, eventType, status }: EventPerformanceCardProps) {
  // Find the event type to get the color
  const eventTypeObj = EVENT_TYPES.find(type => type.id === eventType);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <InfoIcon className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-base truncate">{eventName}</p>
            <Badge className={eventTypeObj?.color || "bg-gray-100 text-gray-800"}>
              {eventTypeObj?.label || eventType}
            </Badge>
          </div>
          
          <div className="space-y-2 pt-2">
            {metrics.map((metric, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-sm font-medium">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper component for Badge
function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}