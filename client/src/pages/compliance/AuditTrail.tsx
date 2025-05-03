import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Eye, FileEdit } from "lucide-react";
import { COMPLIANCE_SEVERITY, COMPLIANCE_STATUS } from "@/lib/constants";

export default function AuditTrail() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Audit Trail</h1>
          <p className="text-muted-foreground">
            Comprehensive tracking of system activities and compliance events
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Export Log
          </Button>
          <Button variant="outline">
            Filter Events
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">ACTION</TableHead>
                <TableHead>USER</TableHead>
                <TableHead>ROLE</TableHead>
                <TableHead>DATE & TIME</TableHead>
                <TableHead>ITEM</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.action}</TableCell>
                  <TableCell>{entry.user}</TableCell>
                  <TableCell>{entry.role}</TableCell>
                  <TableCell>{entry.dateTime}</TableCell>
                  <TableCell>{entry.item}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Compliance Alerts</h2>
        <Button variant="link" className="text-primary">View All</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">ALERT</TableHead>
                <TableHead>TIMESTAMP</TableHead>
                <TableHead>SEVERITY</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complianceAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium">{alert.description}</TableCell>
                  <TableCell>{alert.timestamp}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getSeverityClass(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(alert.status)}`}>
                      {alert.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper function for severity styling
function getSeverityClass(severity: string) {
  switch (severity) {
    case "High":
      return "bg-red-100 text-red-800";
    case "Medium":
      return "bg-yellow-100 text-yellow-800";
    case "Low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Helper function for status styling
function getStatusClass(status: string) {
  switch (status) {
    case "Resolved":
      return "bg-green-100 text-green-800";
    case "Under Review":
      return "bg-blue-100 text-blue-800";
    case "Investigating":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Mock data for audit log entries
const auditLogEntries = [
  {
    id: 1,
    action: "Student data accessed",
    user: "Anjali Mehta",
    role: "Counselor",
    dateTime: "Mar 30, 2025 - 14:32",
    item: "Student #4582"
  },
  {
    id: 2,
    action: "Application status updated",
    user: "Vikram Patel",
    role: "Admin",
    dateTime: "Mar 30, 2025 - 13:15",
    item: "Application #7891"
  },
  {
    id: 3,
    action: "Document deleted",
    user: "Rahul Sharma",
    role: "Super Admin",
    dateTime: "Mar 30, 2025 - 11:47",
    item: "Transcript - Student #3342"
  },
  {
    id: 4,
    action: "Privacy settings modified",
    user: "Deepak Gupta",
    role: "System Admin",
    dateTime: "Mar 29, 2025 - 16:22",
    item: "System Settings"
  },
  {
    id: 5,
    action: "Consent form updated",
    user: "Rahul Sharma",
    role: "Super Admin",
    dateTime: "Mar 29, 2025 - 10:05",
    item: "GDPR Consent Template"
  }
];

// Mock data for compliance alerts
const complianceAlerts = [
  {
    id: 1,
    description: "Document retention policy exception detected",
    timestamp: "Mar 30, 2025 - 09:15",
    severity: "Medium",
    status: "Under Review"
  },
  {
    id: 2,
    description: "Multiple failed login attempts detected",
    timestamp: "Mar 29, 2025 - 22:47",
    severity: "High",
    status: "Resolved"
  },
  {
    id: 3,
    description: "Student data accessed from unusual location",
    timestamp: "Mar 28, 2025 - 14:33",
    severity: "High",
    status: "Investigating"
  },
  {
    id: 4,
    description: "Missing consent record for marketing communications",
    timestamp: "Mar 27, 2025 - 11:20",
    severity: "Low",
    status: "Resolved"
  }
];