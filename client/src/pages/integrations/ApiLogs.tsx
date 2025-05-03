import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Download, Eye, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_METHOD_COLORS, API_STATUS_CODES } from "@/lib/constants";

export default function ApiLogs() {
  const [selectedService, setSelectedService] = useState("all");
  const [selectedMethod, setSelectedMethod] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [timeFilter, setTimeFilter] = useState("last_24_hours");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">API Request Logs</h1>
          <p className="text-muted-foreground">
            Monitor and analyze API requests and responses
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Export Logs</span>
          </Button>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Last 24 Hours" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last_hour">Last Hour</SelectItem>
              <SelectItem value="last_24_hours">Last 24 Hours</SelectItem>
              <SelectItem value="last_7_days">Last 7 Days</SelectItem>
              <SelectItem value="last_30_days">Last 30 Days</SelectItem>
              <SelectItem value="custom_range">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <Card className="flex-1 min-w-[200px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6,782</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card className="flex-1 min-w-[200px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.7%</div>
            <p className="text-xs text-muted-foreground">-0.3% from yesterday</p>
          </CardContent>
        </Card>
        <Card className="flex-1 min-w-[200px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247 ms</div>
            <p className="text-xs text-muted-foreground">+15ms from yesterday</p>
          </CardContent>
        </Card>
        <Card className="flex-1 min-w-[200px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.3%</div>
            <p className="text-xs text-muted-foreground">+0.3% from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by service, endpoint, or ID..."
            className="pl-8"
          />
        </div>
        <Select value={selectedService} onValueChange={setSelectedService}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Services" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            <SelectItem value="university">University APIs</SelectItem>
            <SelectItem value="crm">CRM</SelectItem>
            <SelectItem value="payment">Payment</SelectItem>
            <SelectItem value="email">Email</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedMethod} onValueChange={setSelectedMethod}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="All Methods" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
            <SelectItem value="PATCH">PATCH</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="success">Success (2xx)</SelectItem>
            <SelectItem value="client_error">Client Error (4xx)</SelectItem>
            <SelectItem value="server_error">Server Error (5xx)</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="flex items-center gap-1">
          <Filter className="h-4 w-4" />
          <span>More Filters</span>
        </Button>
      </div>

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
              <TableHead>REQUEST ID</TableHead>
              <TableHead className="text-right">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="whitespace-nowrap">{log.timestamp}</TableCell>
                <TableCell>{log.service}</TableCell>
                <TableCell className="font-mono text-xs">
                  <div className="max-w-[180px] truncate">{log.endpoint}</div>
                </TableCell>
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
                <TableCell className="font-mono text-xs">{log.requestId}</TableCell>
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

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">1-20</span> of <span className="font-medium">1,453</span> logs
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

// Helper function for status class
function getStatusClass(status: number): string {
  return status >= 400 
    ? "bg-red-100 text-red-800" 
    : "bg-green-100 text-green-800";
}

// Mock data for API logs
const apiLogs = [
  {
    id: 1,
    timestamp: "Mar 30, 2025 - 16:45:22",
    service: "University of Toronto API",
    endpoint: "/api/programs",
    method: "GET" as const,
    status: 200,
    duration: 356,
    requestId: "req_5f3a2c1d8b7e"
  },
  {
    id: 2,
    timestamp: "Mar 30, 2025 - 16:44:18",
    service: "Salesforce CRM",
    endpoint: "/services/data/v58.0/sobjects/Contact",
    method: "POST" as const,
    status: 201,
    duration: 478,
    requestId: "req_4e9d1b8a7c6f"
  },
  {
    id: 3,
    timestamp: "Mar 30, 2025 - 16:42:55",
    service: "SendGrid Email API",
    endpoint: "/v3/mail/send",
    method: "POST" as const,
    status: 202,
    duration: 215,
    requestId: "req_3d8c7b6a5e4d"
  },
  {
    id: 4,
    timestamp: "Mar 30, 2025 - 16:41:33",
    service: "Stripe Payment Gateway",
    endpoint: "/v1/charges",
    method: "POST" as const,
    status: 200,
    duration: 387,
    requestId: "req_2c7b6a5e4d3c"
  },
  {
    id: 5,
    timestamp: "Mar 30, 2025 - 16:40:12",
    service: "University of Melbourne API",
    endpoint: "/api/applications/status",
    method: "GET" as const,
    status: 404,
    duration: 598,
    requestId: "req_1b6a5e4d3c2b"
  },
  {
    id: 6,
    timestamp: "Mar 30, 2025 - 16:38:45",
    service: "Twilio SMS API",
    endpoint: "/2010-04-01/Accounts/ACXXXX/Messages.json",
    method: "POST" as const,
    status: 201,
    duration: 324,
    requestId: "req_0a5e4d3c2b1a"
  },
  {
    id: 7,
    timestamp: "Mar 30, 2025 - 16:36:22",
    service: "Dropbox API",
    endpoint: "/2/files/upload",
    method: "POST" as const,
    status: 200,
    duration: 542,
    requestId: "req_9z4d3c2b1a0z"
  },
  {
    id: 8,
    timestamp: "Mar 30, 2025 - 16:35:11",
    service: "University of British Columbia API",
    endpoint: "/api/courses/available",
    method: "GET" as const,
    status: 200,
    duration: 278,
    requestId: "req_8y3c2b1a0z9y"
  },
  {
    id: 9,
    timestamp: "Mar 30, 2025 - 16:33:57",
    service: "Salesforce CRM",
    endpoint: "/services/data/v58.0/sobjects/Opportunity",
    method: "PATCH" as const,
    status: 204,
    duration: 387,
    requestId: "req_7x2b1a0z9y8x"
  },
  {
    id: 10,
    timestamp: "Mar 30, 2025 - 16:31:43",
    service: "Hubspot API",
    endpoint: "/crm/v3/objects/contacts",
    method: "GET" as const,
    status: 200,
    duration: 421,
    requestId: "req_6w1a0z9y8x7w"
  }
];