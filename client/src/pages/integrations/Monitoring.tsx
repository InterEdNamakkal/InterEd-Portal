import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  BarChart3, 
  FileText, 
  RefreshCcw, 
  AlertTriangle
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_MAINTENANCE_IMPACT } from "@/lib/constants";

export default function Monitoring() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">API Monitoring</h1>
          <p className="text-muted-foreground">
            Monitor API performance, health, and upcoming maintenance
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Button variant="outline" className="flex items-center gap-1">
            <RefreshCcw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
          <Select defaultValue="last_24_hours">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Last 24 Hours" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last_hour">Last Hour</SelectItem>
              <SelectItem value="last_24_hours">Last 24 Hours</SelectItem>
              <SelectItem value="last_7_days">Last 7 Days</SelectItem>
              <SelectItem value="last_30_days">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Upcoming Maintenance</h2>
          <div className="space-y-4">
            {maintenanceSchedule.map((item) => (
              <MaintenanceCard 
                key={item.id}
                service={item.service}
                date={item.date}
                time={item.time}
                description={item.description}
                impact={item.impact}
              />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">API Health Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiHealthStatuses.map((status) => (
                  <div key={status.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${status.status === 'Operational' ? 'bg-green-500' : status.status === 'Degraded' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                      <span>{status.service}</span>
                    </div>
                    <Badge className={`${status.status === 'Operational' ? 'bg-green-100 text-green-800' : status.status === 'Degraded' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {status.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">System Status</span>
                  <span className="text-sm font-medium">Operational</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Last Updated</span>
                  <span className="text-sm">Mar 30, 2025 - 17:15:22</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Current Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentUsage.map((usage) => (
                  <div key={usage.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{usage.service}</span>
                      <span className="text-sm font-medium">{usage.current}/{usage.limit} calls</span>
                    </div>
                    <Progress value={(usage.current / usage.limit) * 100} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Reset: {usage.reset}</span>
                      <span>{Math.round((usage.current / usage.limit) * 100)}% used</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">API Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard 
              label="Total API Requests (Today)" 
              value={6782}
              icon={<BarChart3 className="h-5 w-5 text-blue-600" />}
              trend={12}
              trendDirection="up"
            />
            <StatCard 
              label="Success Rate" 
              value="98.7%"
              icon={<BarChart3 className="h-5 w-5 text-green-600" />}
              trend={0.3}
              trendDirection="down"
            />
            <StatCard 
              label="Avg Response Time" 
              value="247 ms"
              icon={<Clock className="h-5 w-5 text-yellow-600" />}
              trend={15}
              trendDirection="up"
            />
            <StatCard 
              label="Error Rate" 
              value="1.3%"
              icon={<AlertTriangle className="h-5 w-5 text-red-600" />}
              trend={0.3}
              trendDirection="up"
            />
          </div>
          
          <div className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Service Performance</h3>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>View Detailed Report</span>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Response Time by Service (ms)</h4>
                {responseTimeByService.map((service) => (
                  <div key={service.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{service.name}</span>
                      <span className="text-sm font-medium">{service.responseTime} ms</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${Math.min((service.responseTime / 1000) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Error Rate by Service (%)</h4>
                {errorRateByService.map((service) => (
                  <div key={service.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{service.name}</span>
                      <span className="text-sm font-medium">{service.errorRate}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${service.errorRate > 5 ? 'bg-red-500' : service.errorRate > 1 ? 'bg-yellow-500' : 'bg-green-500'}`}
                        style={{ width: `${Math.min(service.errorRate * 10, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recent Incidents</h2>
            <Button variant="link">View Incident History</Button>
          </div>
          
          {incidents.length > 0 ? (
            <div className="space-y-4">
              {incidents.map((incident) => (
                <IncidentCard 
                  key={incident.id}
                  title={incident.title}
                  status={incident.status}
                  service={incident.service}
                  date={incident.date}
                  description={incident.description}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No incidents reported in the selected time period.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

interface MaintenanceCardProps {
  service: string;
  date: string;
  time: string;
  description: string;
  impact: "Low Impact" | "Medium Impact" | "High Impact";
}

function MaintenanceCard({
  service,
  date,
  time,
  description,
  impact
}: MaintenanceCardProps) {
  const getImpactClass = () => {
    switch (impact) {
      case "Low Impact":
        return "text-green-800";
      case "Medium Impact":
        return "text-yellow-800";
      case "High Impact":
        return "text-red-800";
      default:
        return "text-gray-800";
    }
  };

  return (
    <div className="flex items-start justify-between border-l-4 border-l-yellow-400 p-4 bg-white rounded-md shadow-sm">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${impact === "Low Impact" ? "bg-green-500" : impact === "Medium Impact" ? "bg-yellow-500" : "bg-red-500"}`}></div>
          <h3 className="font-medium">{service}</h3>
        </div>
        <div className="text-sm mt-2">
          <div>Date: {date}</div>
          <div>Time: {time}</div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </div>
      <div className={`text-sm font-medium ${getImpactClass()}`}>
        {impact}
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend: number;
  trendDirection: "up" | "down";
}

function StatCard({
  label,
  value,
  icon,
  trend,
  trendDirection
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <div className="mt-1 text-2xl font-semibold">{value}</div>
          </div>
          <div className="p-2 bg-gray-50 rounded-lg">
            {icon}
          </div>
        </div>
        <div className="mt-2 flex items-center text-xs">
          <span className={trendDirection === "up" ? (label.includes("Error") ? "text-red-600" : "text-green-600") : (label.includes("Error") ? "text-green-600" : "text-red-600")}>
            {trendDirection === "up" ? "↑" : "↓"} {trend}%
          </span>
          <span className="ml-1 text-muted-foreground">vs. yesterday</span>
        </div>
      </CardContent>
    </Card>
  );
}

interface IncidentCardProps {
  title: string;
  status: "Resolved" | "Investigating" | "Monitoring";
  service: string;
  date: string;
  description: string;
}

function IncidentCard({
  title,
  status,
  service,
  date,
  description
}: IncidentCardProps) {
  const getStatusClass = () => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "Investigating":
        return "bg-red-100 text-red-800";
      case "Monitoring":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{title}</h3>
            <div className="flex gap-3 mt-1">
              <Badge variant="outline" className={getStatusClass()}>
                {status}
              </Badge>
              <span className="text-sm">{service}</span>
              <span className="text-sm text-muted-foreground">{date}</span>
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

// Mock data
const maintenanceSchedule = [
  {
    id: 1,
    service: "Salesforce CRM API",
    date: "Apr 5, 2025",
    time: "2:00 AM - 4:00 AM",
    description: "Scheduled maintenance for the Salesforce Winter '26 release",
    impact: "Medium Impact" as const
  },
  {
    id: 2,
    service: "Stripe API",
    date: "Apr 8, 2025",
    time: "1:00 AM - 2:00 AM",
    description: "Minor updates to the payment processing system",
    impact: "Low Impact" as const
  },
  {
    id: 3,
    service: "SendGrid API",
    date: "Apr 12, 2025",
    time: "3:00 AM - 5:00 AM",
    description: "Email gateway system maintenance and upgrades",
    impact: "Medium Impact" as const
  }
];

const apiHealthStatuses = [
  {
    id: 1,
    service: "University APIs",
    status: "Operational"
  },
  {
    id: 2,
    service: "CRM Integration",
    status: "Operational"
  },
  {
    id: 3,
    service: "Payment Services",
    status: "Operational"
  },
  {
    id: 4,
    service: "Email Services",
    status: "Degraded"
  },
  {
    id: 5,
    service: "Document Services",
    status: "Operational"
  },
  {
    id: 6,
    service: "SMS Gateway",
    status: "Operational"
  }
];

const currentUsage = [
  {
    id: 1,
    service: "University APIs",
    current: 2450,
    limit: 10000,
    reset: "8h 45m"
  },
  {
    id: 2,
    service: "Email API",
    current: 4250,
    limit: 5000,
    reset: "8h 45m"
  },
  {
    id: 3,
    service: "Payment API",
    current: 97,
    limit: 1000,
    reset: "8h 45m"
  },
  {
    id: 4,
    service: "SMS API",
    current: 56,
    limit: 500,
    reset: "8h 45m"
  }
];

const responseTimeByService = [
  {
    id: 1,
    name: "University APIs",
    responseTime: 356
  },
  {
    id: 2,
    name: "CRM Integration",
    responseTime: 478
  },
  {
    id: 3,
    name: "Payment Services",
    responseTime: 387
  },
  {
    id: 4,
    name: "Email Services",
    responseTime: 215
  },
  {
    id: 5,
    name: "Document Services",
    responseTime: 542
  }
];

const errorRateByService = [
  {
    id: 1,
    name: "University APIs",
    errorRate: 0.5
  },
  {
    id: 2,
    name: "CRM Integration",
    errorRate: 0.2
  },
  {
    id: 3,
    name: "Payment Services",
    errorRate: 0.0
  },
  {
    id: 4,
    name: "Email Services",
    errorRate: 2.8
  },
  {
    id: 5,
    name: "Document Services",
    errorRate: 1.1
  }
];

const incidents = [
  {
    id: 1,
    title: "Email Service Degraded Performance",
    status: "Investigating" as const,
    service: "Email API",
    date: "Mar 30, 2025 - 15:22",
    description: "We are investigating reports of delayed email delivery and increased latency in the Email API."
  }
];