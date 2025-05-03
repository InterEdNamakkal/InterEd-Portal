import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileUp,
  Download,
  Filter,
  Calendar,
  TrendingUp,
  Users,
  Tag,
  RefreshCcw,
  Repeat,
  Clock,
  UserPlus
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale
} from 'chart.js';
import { Bar, Doughnut, Line, Radar } from 'react-chartjs-2';
import { TIME_FILTER_OPTIONS } from "@/lib/constants";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

export default function CardAnalytics() {
  const [timeFilter, setTimeFilter] = useState("last_30_days");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Card Analytics</h1>
          <p className="text-muted-foreground">
            Analysis and insights from InterPro student card usage
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Date Range</span>
          </Button>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              {TIME_FILTER_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-1">
            <FileUp className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard 
          title="Card Activations"
          value="127"
          change="+18%"
          trend="up"
          description="New cards this month"
          icon={<UserPlus className="h-5 w-5" />}
          bgColor="bg-blue-50"
          textColor="text-blue-600"
        />
        <MetricCard 
          title="Active Cards"
          value="987"
          change="+5.2%"
          trend="up"
          description="Currently in use"
          icon={<Users className="h-5 w-5" />}
          bgColor="bg-green-50"
          textColor="text-green-600"
        />
        <MetricCard 
          title="Benefit Usage"
          value="4,328"
          change="+23.5%"
          trend="up"
          description="Uses this month"
          icon={<Tag className="h-5 w-5" />}
          bgColor="bg-purple-50"
          textColor="text-purple-600"
        />
        <MetricCard 
          title="Renewal Rate"
          value="92.4%"
          change="+3.2%"
          trend="up"
          description="Card renewals"
          icon={<RefreshCcw className="h-5 w-5" />}
          bgColor="bg-amber-50"
          textColor="text-amber-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Card Activations & Renewals</CardTitle>
            <CardDescription>Monthly trend of new and renewed cards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Line 
                data={activationsReNewalsData}
                options={{
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                    }
                  },
                  plugins: {
                    legend: {
                      position: 'bottom',
                    }
                  },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Popular Benefits Usage</CardTitle>
            <CardDescription>Most frequently used card benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Bar 
                data={benefitsUsageData}
                options={{
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                    }
                  },
                  indexAxis: 'y',
                  plugins: {
                    legend: {
                      display: false,
                    }
                  },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Cards by Plan Type</CardTitle>
            <CardDescription>Distribution of active cards by plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <div className="h-56 w-56">
                <Doughnut 
                  data={cardsByPlanData} 
                  options={{
                    plugins: {
                      legend: {
                        position: 'bottom',
                      }
                    },
                    cutout: '65%',
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">User Engagement Score</CardTitle>
            <CardDescription>Key metrics of student engagement with cards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <div className="h-56 w-56">
                <Radar 
                  data={userEngagementData}
                  options={{
                    scales: {
                      r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                          stepSize: 20
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        position: 'bottom',
                      }
                    },
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Key Performance Indicators</CardTitle>
            <CardDescription>Core metrics for student card program</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 pt-3">
              <KpiItem 
                label="Card Adoption Rate" 
                value={78}
                description="Students with active cards" 
                changePercent={5.2}
              />
              <KpiItem 
                label="Average Benefits Used/Month" 
                value={65}
                description="Per active card" 
                changePercent={12.3}
              />
              <KpiItem 
                label="Retention Rate (Annual)" 
                value={92}
                description="Renewed cards" 
                changePercent={3.1}
              />
              <KpiItem 
                label="Student Satisfaction" 
                value={87}
                description="Based on feedback" 
                changePercent={6.8}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Usage Trends by Category</CardTitle>
          <CardDescription>Monthly benefit usage by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <Line 
              data={usageTrendsByCategoryData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                  }
                },
                plugins: {
                  legend: {
                    position: 'bottom',
                  }
                },
                maintainAspectRatio: false,
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

function MetricCard({ 
  title, 
  value, 
  change, 
  trend, 
  description, 
  icon, 
  bgColor, 
  textColor 
}: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className={`p-2 rounded-md ${bgColor} ${textColor}`}>
            {icon}
          </div>
        </div>
        <div className="flex items-center gap-1 mt-4">
          <div className={trend === "up" ? "text-green-600" : "text-red-600"}>
            {trend === "up" ? "↑" : "↓"} {change}
          </div>
          <p className="text-xs text-muted-foreground">vs previous period</p>
        </div>
      </CardContent>
    </Card>
  );
}

interface KpiItemProps {
  label: string;
  value: number;
  description: string;
  changePercent: number;
}

function KpiItem({ label, value, description, changePercent }: KpiItemProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">{label}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="text-sm">
          <span className="font-bold">{value}%</span>
          <span className="ml-2 text-green-600">↑ {changePercent}%</span>
        </div>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 rounded-full" 
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}

// Chart Data
const activationsReNewalsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'New Activations',
      data: [65, 78, 91, 84, 76, 85, 101, 98, 87, 105, 112, 127],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      tension: 0.3,
    },
    {
      label: 'Renewals',
      data: [25, 38, 42, 56, 51, 48, 64, 72, 68, 75, 82, 91],
      borderColor: 'rgb(124, 58, 237)',
      backgroundColor: 'rgba(124, 58, 237, 0.5)',
      tension: 0.3,
    }
  ],
};

const benefitsUsageData = {
  labels: ['Dining Discounts', 'Transportation', 'Academic Resources', 'Tech Purchases', 'Accommodation', 'Wellness & Fitness', 'Entertainment'],
  datasets: [
    {
      label: 'Usage Count',
      data: [873, 564, 452, 398, 325, 287, 214],
      backgroundColor: 'rgba(59, 130, 246, 0.7)',
    }
  ],
};

const cardsByPlanData = {
  labels: ['Premium', 'Standard', 'Basic'],
  datasets: [
    {
      data: [35, 55, 10],
      backgroundColor: [
        'rgba(124, 58, 237, 0.7)',  // purple
        'rgba(59, 130, 246, 0.7)',   // blue
        'rgba(234, 179, 8, 0.7)',   // amber
      ],
      borderColor: [
        'rgb(124, 58, 237)',
        'rgb(59, 130, 246)',
        'rgb(234, 179, 8)',
      ],
      borderWidth: 1,
    },
  ],
};

const userEngagementData = {
  labels: ['Usage Frequency', 'Benefit Variety', 'On-Campus Use', 'Off-Campus Use', 'Mobile App Usage', 'Support Engagement'],
  datasets: [
    {
      label: 'Current Period',
      data: [85, 72, 90, 68, 78, 65],
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: 'rgb(59, 130, 246)',
      pointBackgroundColor: 'rgb(59, 130, 246)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(59, 130, 246)'
    },
    {
      label: 'Previous Period',
      data: [72, 65, 83, 59, 65, 58],
      backgroundColor: 'rgba(124, 58, 237, 0.2)',
      borderColor: 'rgb(124, 58, 237)',
      pointBackgroundColor: 'rgb(124, 58, 237)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(124, 58, 237)'
    }
  ]
};

const usageTrendsByCategoryData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Dining & Food',
      data: [345, 378, 392, 421, 445, 478, 502, 534, 567, 612, 645, 682],
      borderColor: 'rgb(245, 158, 11)',
      backgroundColor: 'rgba(245, 158, 11, 0.5)',
      tension: 0.3,
    },
    {
      label: 'Transportation',
      data: [245, 256, 267, 278, 301, 312, 325, 337, 348, 362, 376, 392],
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.5)',
      tension: 0.3,
    },
    {
      label: 'Academic',
      data: [156, 198, 222, 178, 201, 187, 301, 315, 298, 324, 356, 382],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      tension: 0.3,
    },
    {
      label: 'Retail & Shopping',
      data: [98, 112, 125, 145, 156, 167, 187, 198, 223, 245, 267, 287],
      borderColor: 'rgb(124, 58, 237)',
      backgroundColor: 'rgba(124, 58, 237, 0.5)',
      tension: 0.3,
    }
  ],
};