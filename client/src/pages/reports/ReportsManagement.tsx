import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Filter, BarChart3, RefreshCcw, FileText, FileDown, Download, Sparkles } from "lucide-react";
import { REPORT_TABS, REPORT_CATEGORIES, REPORT_FORMATS } from "@/lib/constants";

export default function ReportsManagement() {
  const [activeTab, setActiveTab] = useState("standard");
  const [timeFilter, setTimeFilter] = useState("last_30_days");
  const [category, setCategory] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Business Intelligence and Reporting</h1>
          <p className="text-muted-foreground">
            Access insights, analytics, and customizable reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            Filter
          </Button>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Last 30 Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last_7_days">Last 7 Days</SelectItem>
              <SelectItem value="last_30_days">Last 30 Days</SelectItem>
              <SelectItem value="last_90_days">Last 90 Days</SelectItem>
              <SelectItem value="last_year">Last Year</SelectItem>
              <SelectItem value="all_time">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Create Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-background border-b w-full justify-start rounded-none gap-6 px-1">
          {REPORT_TABS.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 font-medium text-muted-foreground data-[state=active]:text-primary"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="standard" className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Input className="w-[300px]" placeholder="Search reports..." />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {REPORT_CATEGORIES.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <ReportCard 
              icon={<FileText className="h-8 w-8 text-blue-500" />} 
              title="Standard Reports" 
              description="Pre-configured reports for common business needs"
              availableReports={24}
              lastRun="Mar 30, 2025"
              progressValue={100}
            />
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-medium">Most Popular Reports</h2>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">REPORT NAME</TableHead>
                    <TableHead>CATEGORY</TableHead>
                    <TableHead>LAST RUN</TableHead>
                    <TableHead>FORMAT</TableHead>
                    <TableHead>RUN COUNT</TableHead>
                    <TableHead className="text-right">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {popularReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>{report.category}</TableCell>
                      <TableCell>{report.lastRun}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getFormatClass(report.format)}`}>
                          {report.format}
                        </span>
                      </TableCell>
                      <TableCell>{report.runCount}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <RefreshCcw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="custom" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <ReportCard 
              icon={<Sparkles className="h-8 w-8 text-purple-500" />} 
              title="Custom Report Builder" 
              description="Create tailored reports with drag-and-drop interface"
              availableReports={12}
              lastRun="Mar 28, 2025"
              progressValue={50}
            />
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <ReportCard 
              icon={<BarChart3 className="h-8 w-8 text-green-500" />} 
              title="Scheduled Reporting" 
              description="Automated generation and distribution of reports"
              availableReports={8}
              lastRun="Mar 29, 2025"
              progressValue={36}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="dashboards" className="mt-6 space-y-6">
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium">Interactive Dashboards</h3>
            <p className="text-muted-foreground mt-2">Access interactive visualizations and dashboards</p>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6 space-y-6">
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium">Advanced Analytics</h3>
            <p className="text-muted-foreground mt-2">Explore data with advanced analytical tools</p>
          </div>
        </TabsContent>
        
        <TabsContent value="kpi" className="mt-6 space-y-6">
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium">KPI Monitoring</h3>
            <p className="text-muted-foreground mt-2">Track performance against key business metrics</p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recently Run Reports</h2>
          <Button variant="link" className="text-primary">View All</Button>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">REPORT NAME</TableHead>
                <TableHead>RUN BY</TableHead>
                <TableHead>DATE & TIME</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentlyRunReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.runBy}</TableCell>
                  <TableCell>{report.dateTime}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      {report.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <FileDown className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Key Performance Indicators</h2>
          <Button variant="link" className="text-primary">View All</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KpiCard 
            title="Total Applications" 
            value={876} 
            trend={11}
            previousValue={789}
            trendDirection="up"
          />
          <KpiCard 
            title="Conversion Rate" 
            value={18.4} 
            unit="%"
            trend={13.6}
            previousValue={16.2}
            trendDirection="up"
          />
          <KpiCard 
            title="Avg. Processing Time" 
            value={4.2} 
            unit=" days"
            trend={27.6}
            previousValue={5.8}
            trendDirection="down"
          />
        </div>
      </div>
    </div>
  );
}

function ReportCard({ 
  icon, 
  title, 
  description, 
  availableReports,
  lastRun,
  progressValue
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  availableReports: number;
  lastRun: string;
  progressValue: number;
}) {
  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex-shrink-0">
              {icon}
            </div>
            <div>
              <h3 className="font-medium text-lg">{title}</h3>
              <p className="text-muted-foreground text-sm">{description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Available Reports</span>
            <span className="text-sm font-medium">{availableReports}</span>
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last run: {lastRun}</span>
          <span className="font-medium text-green-600">Available</span>
        </div>
      </CardContent>
    </Card>
  );
}

function KpiCard({
  title,
  value,
  unit = "",
  trend,
  previousValue,
  trendDirection
}: {
  title: string;
  value: number;
  unit?: string;
  trend: number;
  previousValue: number;
  trendDirection: "up" | "down";
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-base font-medium text-muted-foreground">{title}</h3>
        <div className="mt-2 flex items-baseline">
          <div className="text-3xl font-semibold">{value}{unit}</div>
          <div className={`ml-2 flex items-center text-sm ${trendDirection === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            <span>{trendDirection === 'up' ? '↑' : '↓'} {trend}%</span>
          </div>
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          vs. previous period: {previousValue}{unit}
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function for format styling
function getFormatClass(format: string) {
  switch (format) {
    case "Excel":
      return "bg-green-100 text-green-800";
    case "PDF":
      return "bg-red-100 text-red-800";
    case "Dashboard":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Mock data for popular reports
const popularReports = [
  {
    id: 1,
    name: "Student Recruitment Funnel",
    category: "Recruitment",
    lastRun: "Mar 30, 2025",
    format: "Dashboard",
    runCount: 128
  },
  {
    id: 2,
    name: "Agent Performance Summary",
    category: "Agent Management",
    lastRun: "Mar 29, 2025",
    format: "Excel",
    runCount: 96
  },
  {
    id: 3,
    name: "Application Conversion Rate",
    category: "Applications",
    lastRun: "Mar 28, 2025",
    format: "PDF",
    runCount: 87
  },
  {
    id: 4,
    name: "Visa Success by Country",
    category: "Compliance",
    lastRun: "Mar 27, 2025",
    format: "Dashboard",
    runCount: 73
  },
  {
    id: 5,
    name: "Revenue Forecast Q2 2025",
    category: "Finance",
    lastRun: "Mar 26, 2025",
    format: "Excel",
    runCount: 65
  }
];

// Mock data for recently run reports
const recentlyRunReports = [
  {
    id: 1,
    name: "Student Acquisition Cost",
    runBy: "Rahul Sharma",
    dateTime: "Mar 30, 2025 - 15:42",
    status: "Completed"
  },
  {
    id: 2,
    name: "Weekly Application Pipeline",
    runBy: "Anjali Mehta",
    dateTime: "Mar 30, 2025 - 11:18",
    status: "Completed"
  },
  {
    id: 3,
    name: "Partner University Performance",
    runBy: "Vikram Patel",
    dateTime: "Mar 29, 2025 - 16:35",
    status: "Completed"
  },
  {
    id: 4,
    name: "Marketing Campaign ROI",
    runBy: "Deepak Gupta",
    dateTime: "Mar 29, 2025 - 14:22",
    status: "Completed"
  },
  {
    id: 5,
    name: "Q1 Financial Summary",
    runBy: "Meera Joshi",
    dateTime: "Mar 28, 2025 - 09:07",
    status: "Completed"
  }
];