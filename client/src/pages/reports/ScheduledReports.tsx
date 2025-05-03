import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Edit, Pause, Play } from "lucide-react";

export default function ScheduledReports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Scheduled Reports</h1>
          <p className="text-muted-foreground">
            Manage automated report generation and distribution
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Schedule New
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {scheduledReports.map((report) => (
          <ScheduledReportCard key={report.id} report={report} />
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Export Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium">Email</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Deliver reports directly to recipients' inboxes
              </p>
              <div className="mt-4">
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium">File Storage</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Save reports to a secure cloud storage location
              </p>
              <div className="mt-4">
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium">Webhooks</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Send report data to external systems via API
              </p>
              <div className="mt-4">
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface ScheduledReportProps {
  report: {
    id: number;
    name: string;
    schedule: string;
    nextRun: string;
    status: "Active" | "Paused";
    recipients: number;
  };
}

function ScheduledReportCard({ report }: ScheduledReportProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{report.name}</h3>
              <div className="flex items-center text-muted-foreground mt-1">
                <Clock className="h-4 w-4 mr-2" />
                <span>{report.schedule}</span>
              </div>
              <div className="mt-2">
                <p className="text-sm">Next run: {report.nextRun}</p>
                <p className="text-sm">{report.recipients} recipients</p>
              </div>
            </div>
            <div>
              <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                report.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
              }`}>
                {report.status}
              </span>
            </div>
          </div>
        </div>
        <div className="border-t p-2 flex justify-end gap-2 bg-gray-50">
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button variant="outline" size="sm">
            {report.status === "Active" ? "Pause" : "Resume"}
          </Button>
          <Button variant="outline" size="sm">
            Run Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Mock data for scheduled reports
const scheduledReports = [
  {
    id: 1,
    name: "Weekly Recruitment Summary",
    schedule: "Every Monday, 8:00 AM",
    nextRun: "Apr 1, 2025",
    status: "Active" as const,
    recipients: 8
  },
  {
    id: 2,
    name: "Monthly Agent Performance",
    schedule: "1st of month, 9:00 AM",
    nextRun: "Apr 1, 2025",
    status: "Active" as const,
    recipients: 12
  },
  {
    id: 3,
    name: "Daily Application Status",
    schedule: "Weekdays, 7:00 AM",
    nextRun: "Mar 31, 2025",
    status: "Active" as const,
    recipients: 6
  },
  {
    id: 4,
    name: "Quarterly Business Review",
    schedule: "Last day of quarter, 2:00 PM",
    nextRun: "Jun 30, 2025",
    status: "Active" as const,
    recipients: 15
  }
];