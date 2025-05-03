import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileUp,
  Download,
  Filter,
  CreditCard,
  Users,
  TrendingUp,
  Clock,
  BadgeCheck,
  Wallet
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
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { CARD_STATUS } from "@/lib/constants";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CardsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">InterPro Card Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor student card status, usage, and performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <FileUp className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Download Report</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          title="Total Cards"
          value="1,256"
          change="+12%"
          trend="up"
          icon={<CreditCard className="h-5 w-5" />}
          bgColor="bg-blue-50"
          textColor="text-blue-600"
        />
        <StatCard 
          title="Active Users"
          value="987"
          change="+5%"
          trend="up"
          icon={<Users className="h-5 w-5" />}
          bgColor="bg-green-50"
          textColor="text-green-600"
        />
        <StatCard 
          title="Transactions"
          value="2,345"
          change="+23%"
          trend="up"
          icon={<TrendingUp className="h-5 w-5" />}
          bgColor="bg-purple-50"
          textColor="text-purple-600"
        />
        <StatCard 
          title="Pending Activations"
          value="72"
          change="-8%"
          trend="down"
          icon={<Clock className="h-5 w-5" />}
          bgColor="bg-amber-50"
          textColor="text-amber-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Card Status Distribution</CardTitle>
            <CardDescription>Distribution of student cards by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <div className="h-64 w-64">
                <Doughnut 
                  data={cardStatusData} 
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
            <CardTitle className="text-base font-medium">Card Activations</CardTitle>
            <CardDescription>Monthly card activations over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Line 
                data={cardActivationsData}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Popular Benefits</CardTitle>
            <CardDescription>Most used student card benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Bar 
                data={popularBenefitsData}
                options={{
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                    }
                  },
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
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Recent Transactions</CardTitle>
            <CardDescription>Latest student card transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-md ${transaction.iconBg}`}>
                      {transaction.icon}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{transaction.name}</p>
                      <p className="text-xs text-muted-foreground">{transaction.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{transaction.date}</p>
                    <p className={`text-xs ${transaction.statusColor}`}>{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

function StatCard({ title, value, change, trend, icon, bgColor, textColor }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className={`p-2 rounded-md ${bgColor} ${textColor}`}>
            {icon}
          </div>
        </div>
        <div className="flex items-center gap-1 mt-4">
          <div className={trend === "up" ? "text-green-600" : "text-red-600"}>
            {trend === "up" ? "↑" : "↓"} {change}
          </div>
          <p className="text-xs text-muted-foreground">vs last month</p>
        </div>
      </CardContent>
    </Card>
  );
}

// Chart Data
const cardStatusData = {
  labels: ['Active', 'Inactive', 'Pending', 'Suspended'],
  datasets: [
    {
      data: [65, 15, 12, 8],
      backgroundColor: [
        'rgba(34, 197, 94, 0.7)',  // green
        'rgba(239, 68, 68, 0.7)',   // red
        'rgba(234, 179, 8, 0.7)',   // amber
        'rgba(148, 163, 184, 0.7)', // slate
      ],
      borderColor: [
        'rgb(34, 197, 94)',
        'rgb(239, 68, 68)',
        'rgb(234, 179, 8)',
        'rgb(148, 163, 184)',
      ],
      borderWidth: 1,
    },
  ],
};

const cardActivationsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'New Activations',
      data: [45, 62, 58, 71, 84, 76, 85, 101, 98, 87, 105, 112],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      tension: 0.3,
    },
    {
      label: 'Renewals',
      data: [12, 19, 15, 20, 18, 22, 25, 30, 28, 33, 36, 40],
      borderColor: 'rgb(124, 58, 237)',
      backgroundColor: 'rgba(124, 58, 237, 0.5)',
      tension: 0.3,
    }
  ],
};

const popularBenefitsData = {
  labels: ['Travel Discounts', 'Meal Plans', 'Course Materials', 'Tech Purchases', 'Healthcare', 'Entertainment'],
  datasets: [
    {
      label: 'Usage Count',
      data: [450, 385, 320, 280, 240, 190],
      backgroundColor: 'rgba(59, 130, 246, 0.7)',
    }
  ],
};

// Mock Recent Transactions
const recentTransactions = [
  {
    name: "Campus Meal Plan",
    description: "Food Service Discount",
    date: "Today, 12:30 PM",
    status: "Successful",
    statusColor: "text-green-600",
    icon: <Wallet className="h-4 w-4 text-blue-600" />,
    iconBg: "bg-blue-50"
  },
  {
    name: "Book Store Purchase",
    description: "Academic Materials",
    date: "Today, 10:15 AM",
    status: "Successful",
    statusColor: "text-green-600",
    icon: <Wallet className="h-4 w-4 text-purple-600" />,
    iconBg: "bg-purple-50"
  },
  {
    name: "Transport Pass",
    description: "Public Transit Discount",
    date: "Yesterday, 3:45 PM",
    status: "Successful",
    statusColor: "text-green-600",
    icon: <Wallet className="h-4 w-4 text-green-600" />,
    iconBg: "bg-green-50"
  },
  {
    name: "Card Activation",
    description: "New Student Onboarding",
    date: "Oct 31, 2024",
    status: "Completed",
    statusColor: "text-blue-600",
    icon: <BadgeCheck className="h-4 w-4 text-blue-600" />,
    iconBg: "bg-blue-50"
  },
];