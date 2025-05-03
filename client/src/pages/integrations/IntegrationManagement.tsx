import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Home, 
  Activity, 
  RefreshCcw, 
  Eye, 
  FileText, 
  Trash, 
  Building, 
  Phone, 
  Calendar, 
  FileCheck, 
  BarChart3,
  MessageSquare,
  Clock
} from "lucide-react";
import { INTEGRATION_TABS, INTEGRATION_CATEGORIES, API_STATUS_CODES, API_METHOD_COLORS, API_MAINTENANCE_IMPACT } from "@/lib/constants";

export default function IntegrationManagement() {
  const [activeTab, setActiveTab] = useState("connections");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [timeFilter, setTimeFilter] = useState("last_30_days");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">API and Integration Management</h1>
          <p className="text-muted-foreground">
            Manage external connections and service integrations
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search"
              placeholder="Search integrations..." 
              className="w-[260px] pl-8"
            />
          </div>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Last 30 Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last_7_days">Last 7 Days</SelectItem>
              <SelectItem value="last_30_days">Last 30 Days</SelectItem>
              <SelectItem value="last_90_days">Last 90 Days</SelectItem>
              <SelectItem value="all_time">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-blue-600 hover:bg-blue-700">
            + Add Integration
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-background border-b w-full justify-start rounded-none gap-6 px-1">
          {INTEGRATION_TABS.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 font-medium text-muted-foreground data-[state=active]:text-primary"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex gap-2 mt-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {INTEGRATION_CATEGORIES.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="connections" className="space-y-4 mt-2">
          {integrations.map((integration) => (
            <IntegrationCard 
              key={integration.id}
              icon={integration.icon}
              title={integration.title}
              description={integration.description}
              integrationCount={integration.integrationCount}
              lastSynced={integration.lastSynced}
              status={integration.status}
            />
          ))}
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Active Integrations</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>INTEGRATION</TableHead>
                    <TableHead>CATEGORY</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead>REQUESTS TODAY</TableHead>
                    <TableHead>LAST SYNCED</TableHead>
                    <TableHead className="text-right">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeIntegrations.map((integration) => (
                    <TableRow key={integration.id}>
                      <TableCell className="font-medium">{integration.name}</TableCell>
                      <TableCell>{integration.category}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-800 border-green-100">
                          {integration.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{integration.requestsToday.toLocaleString()}</TableCell>
                      <TableCell>{integration.lastSynced}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <RefreshCcw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4 mt-2">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Webhook Events</h2>
              <Button size="sm">+ Add Webhook</Button>
            </div>
            <div className="space-y-4">
              {webhooks.map((webhook) => (
                <WebhookCard 
                  key={webhook.id}
                  name={webhook.name}
                  endpoint={webhook.endpoint}
                  description={webhook.description}
                  services={webhook.services}
                  lastTriggered={webhook.lastTriggered}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4 mt-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recent API Request Logs</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>TIMESTAMP</TableHead>
                    <TableHead>SERVICE</TableHead>
                    <TableHead>ENDPOINT</TableHead>
                    <TableHead>METHOD</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead>DURATION</TableHead>
                    <TableHead className="text-right">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="whitespace-nowrap">{log.timestamp}</TableCell>
                      <TableCell>{log.service}</TableCell>
                      <TableCell className="font-mono text-xs">{log.endpoint}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${API_METHOD_COLORS[log.method].bgColor} ${API_METHOD_COLORS[log.method].textColor} border-transparent`}>
                          {log.method}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getStatusClass(log.status)} border-transparent`}>
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.duration} ms</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="auth" className="space-y-6 mt-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">API Authentication</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AuthOptionCard 
                title="API Keys"
                description="Manage and rotate API keys for application access"
                icon={<FileText className="h-5 w-5" />}
              />
              <AuthOptionCard 
                title="OAuth Settings"
                description="Configure OAuth providers and client credentials"
                icon={<FileCheck className="h-5 w-5" />}
              />
              <AuthOptionCard 
                title="Endpoint Permissions"
                description="Set granular access controls for API endpoints"
                icon={<Activity className="h-5 w-5" />}
              />
              <AuthOptionCard 
                title="Webhook Secrets"
                description="Secure webhook payloads with HMAC signatures"
                icon={<FileCheck className="h-5 w-5" />}
              />
              <AuthOptionCard 
                title="IP Whitelisting"
                description="Restrict API access to approved IP addresses"
                icon={<Home className="h-5 w-5" />}
              />
              <AuthOptionCard 
                title="Rate Limits"
                description="Configure throttling and quota settings"
                icon={<Activity className="h-5 w-5" />}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6 mt-2">
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
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">API Statistics</h2>
              <div className="space-y-4">
                <StatCard 
                  label="Total API Requests (Today)"
                  value={6782}
                  progressValue={85}
                  progressColor="bg-blue-500"
                />
                <StatCard 
                  label="Success Rate"
                  value={98.7}
                  unit="%"
                  progressValue={98.7}
                  progressColor="bg-green-500"
                />
                <StatCard 
                  label="Average Response Time"
                  value={247}
                  unit="ms"
                  progressValue={60}
                  progressColor="bg-blue-500"
                />
                <StatCard 
                  label="Error Rate"
                  value={1.3}
                  unit="%"
                  progressValue={1.3}
                  progressColor="bg-red-500"
                />
                <div className="flex justify-center mt-2">
                  <Button variant="outline" className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>View Detailed Analytics</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="docs" className="space-y-6 mt-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">API Documentation</h2>
            <p className="text-muted-foreground">
              Access comprehensive documentation for all available APIs and integration points
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <DocCard 
                title="Student API"
                description="Student data access and management endpoints"
                icon={<FileText className="h-5 w-5" />}
              />
              <DocCard 
                title="Application API"
                description="Application workflow and document endpoints"
                icon={<FileText className="h-5 w-5" />}
              />
              <DocCard 
                title="Webhook Documentation"
                description="Webhook event types and payload schemas"
                icon={<FileText className="h-5 w-5" />}
              />
              <DocCard 
                title="Authentication Guide"
                description="API key and OAuth authentication flows"
                icon={<FileText className="h-5 w-5" />}
              />
              <DocCard 
                title="Integration SDK"
                description="Client libraries and integration tools"
                icon={<FileText className="h-5 w-5" />}
              />
              <DocCard 
                title="Error Handling"
                description="Error codes and troubleshooting guides"
                icon={<FileText className="h-5 w-5" />}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface IntegrationCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  integrationCount: number;
  lastSynced: string;
  status: "Active" | "Inactive" | "Error";
}

function IntegrationCard({
  icon,
  title,
  description,
  integrationCount,
  lastSynced,
  status
}: IntegrationCardProps) {
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
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Integrations</span>
            <span className="text-sm font-medium">{integrationCount}</span>
          </div>
          <Progress value={getProgressValue(integrationCount)} className="h-2" />
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last synced: {lastSynced}</span>
          <Badge variant="outline" className={getStatusBadgeClass(status)}>
            {status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

interface WebhookCardProps {
  name: string;
  endpoint: string;
  description: string;
  services: number;
  lastTriggered: string;
}

function WebhookCard({
  name,
  endpoint,
  description,
  services,
  lastTriggered
}: WebhookCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium text-base">{name}</h3>
            <div className="text-xs font-mono mt-1 text-muted-foreground">{endpoint}</div>
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
            <div className="mt-3 text-sm">
              <span>Implemented by: {services} services</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <FileText className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          Last triggered: {lastTriggered}
        </div>
      </CardContent>
    </Card>
  );
}

interface AuthOptionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function AuthOptionCard({ title, description, icon }: AuthOptionCardProps) {
  return (
    <Card className="hover:border-blue-300 cursor-pointer transition-colors">
      <CardContent className="p-5">
        <div className="flex gap-3 items-start">
          <div className="p-2 bg-blue-50 rounded-lg">
            {icon}
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface DocCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function DocCard({ title, description, icon }: DocCardProps) {
  return (
    <Card className="hover:border-blue-300 cursor-pointer transition-colors">
      <CardContent className="p-5">
        <div className="flex gap-3 items-start">
          <div className="p-2 bg-gray-50 rounded-lg">
            {icon}
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
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
  value: number;
  unit?: string;
  progressValue: number;
  progressColor: string;
}

function StatCard({
  label,
  value,
  unit = "",
  progressValue,
  progressColor
}: StatCardProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-bold">{value}{unit}</span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${progressColor} rounded-full`} 
          style={{ width: `${progressValue}%` }}
        ></div>
      </div>
    </div>
  );
}

// Helper functions
function getProgressValue(count: number): number {
  if (count >= 10) return 100;
  return count * 10;
}

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case "Active":
      return "bg-green-50 text-green-800 border-green-100";
    case "Inactive":
      return "bg-gray-50 text-gray-800 border-gray-100";
    case "Error":
      return "bg-red-50 text-red-800 border-red-100";
    default:
      return "bg-gray-50 text-gray-800 border-gray-100";
  }
}

function getStatusClass(status: number): string {
  return status >= 400 
    ? "bg-red-100 text-red-800" 
    : "bg-green-100 text-green-800";
}

// Mock data
const integrations = [
  {
    id: 1,
    icon: <Building className="h-8 w-8 text-blue-500" />,
    title: "University API Connections",
    description: "Direct integration with partner institutions",
    integrationCount: 12,
    lastSynced: "Mar 30, 2025",
    status: "Active" as const
  },
  {
    id: 2,
    icon: <MessageSquare className="h-8 w-8 text-purple-500" />,
    title: "CRM Synchronization",
    description: "Bidirectional data flow with external CRM systems",
    integrationCount: 2,
    lastSynced: "Mar 29, 2025",
    status: "Active" as const
  },
  {
    id: 3,
    icon: <FileCheck className="h-8 w-8 text-green-500" />,
    title: "Payment Gateway Integration",
    description: "Secure processing of financial transactions",
    integrationCount: 3,
    lastSynced: "Mar 29, 2025",
    status: "Active" as const
  },
  {
    id: 4,
    icon: <MessageSquare className="h-8 w-8 text-blue-500" />,
    title: "Email Service Provider",
    description: "Bulk email campaign management",
    integrationCount: 1,
    lastSynced: "Mar 28, 2025",
    status: "Active" as const
  },
  {
    id: 5,
    icon: <Phone className="h-8 w-8 text-green-500" />,
    title: "SMS Gateway Connection",
    description: "Mobile messaging capabilities",
    integrationCount: 1,
    lastSynced: "Mar 27, 2025",
    status: "Active" as const
  },
  {
    id: 6,
    icon: <Calendar className="h-8 w-8 text-blue-500" />,
    title: "Calendar System Integration",
    description: "Appointment and event synchronization",
    integrationCount: 1,
    lastSynced: "Mar 25, 2025",
    status: "Active" as const
  },
  {
    id: 7,
    icon: <FileCheck className="h-8 w-8 text-yellow-500" />,
    title: "Document Verification Services",
    description: "Third-party credential authentication",
    integrationCount: 2,
    lastSynced: "Mar 24, 2025",
    status: "Active" as const
  },
  {
    id: 8,
    icon: <MessageSquare className="h-8 w-8 text-blue-500" />,
    title: "Social Media Integration",
    description: "Campaign publication and monitoring",
    integrationCount: 3,
    lastSynced: "Mar 26, 2025",
    status: "Active" as const
  },
  {
    id: 9,
    icon: <BarChart3 className="h-8 w-8 text-purple-500" />,
    title: "Analytics Platform Connection",
    description: "Advanced data analysis tools",
    integrationCount: 1,
    lastSynced: "Mar 28, 2025",
    status: "Active" as const
  }
];

const activeIntegrations = [
  {
    id: 1,
    name: "University of Toronto API",
    category: "University API",
    status: "Active",
    requestsToday: 245,
    lastSynced: "Mar 30, 2025 - 15:42"
  },
  {
    id: 2,
    name: "Salesforce CRM",
    category: "CRM",
    status: "Active",
    requestsToday: 1872,
    lastSynced: "Mar 30, 2025 - 14:18"
  },
  {
    id: 3,
    name: "Stripe Payment Gateway",
    category: "Payment",
    status: "Active",
    requestsToday: 97,
    lastSynced: "Mar 30, 2025 - 15:22"
  },
  {
    id: 4,
    name: "SendGrid Email API",
    category: "Email",
    status: "Active",
    requestsToday: 4250,
    lastSynced: "Mar 30, 2025 - 13:07"
  }
];

const webhooks = [
  {
    id: 1,
    name: "New Student Registration",
    endpoint: "/webhooks/student-registration",
    description: "Triggered when a new student registers",
    services: 3,
    lastTriggered: "Mar 30, 2025 - 16:22"
  },
  {
    id: 2,
    name: "Application Status Changed",
    endpoint: "/webhooks/application-status",
    description: "Triggered when an application status changes",
    services: 5,
    lastTriggered: "Mar 30, 2025 - 15:47"
  }
];

const apiLogs = [
  {
    id: 1,
    timestamp: "Mar 30, 2025 - 16:45:22",
    service: "University of Toronto API",
    endpoint: "/api/programs",
    method: "GET" as const,
    status: 200,
    duration: 356
  },
  {
    id: 2,
    timestamp: "Mar 30, 2025 - 16:44:18",
    service: "Salesforce CRM",
    endpoint: "/services/data/v58.0/sobjects/Contact",
    method: "POST" as const,
    status: 201,
    duration: 478
  },
  {
    id: 3,
    timestamp: "Mar 30, 2025 - 16:42:55",
    service: "SendGrid Email API",
    endpoint: "/v3/mail/send",
    method: "POST" as const,
    status: 202,
    duration: 215
  },
  {
    id: 4,
    timestamp: "Mar 30, 2025 - 16:41:33",
    service: "Stripe Payment Gateway",
    endpoint: "/v1/charges",
    method: "POST" as const,
    status: 200,
    duration: 387
  },
  {
    id: 5,
    timestamp: "Mar 30, 2025 - 16:40:12",
    service: "University of Melbourne API",
    endpoint: "/api/applications/status",
    method: "GET" as const,
    status: 404,
    duration: 598
  }
];

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