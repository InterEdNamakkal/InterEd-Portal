import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, X, Eye } from "lucide-react";

export default function PendingApprovals() {
  const [activeTab, setActiveTab] = React.useState("all");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pending Approvals</h1>
          <p className="text-muted-foreground">
            Manage approval requests for compliance-sensitive operations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Batch Process
          </Button>
          <Button variant="outline">
            Filter Requests
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Requests ({pendingApprovals.length})</TabsTrigger>
          <TabsTrigger value="data">Data Requests (2)</TabsTrigger>
          <TabsTrigger value="policy">Policy Exceptions (1)</TabsTrigger>
          <TabsTrigger value="access">Access Requests (1)</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="space-y-4">
            {pendingApprovals.map((approval) => (
              <ApprovalCard key={approval.id} approval={approval} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="data" className="space-y-6">
          <div className="space-y-4">
            {pendingApprovals
              .filter(a => a.type === 'GDPR' || a.type === 'Internal')
              .map((approval) => (
                <ApprovalCard key={approval.id} approval={approval} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="policy" className="space-y-6">
          <div className="space-y-4">
            {pendingApprovals
              .filter(a => a.type === 'Policy')
              .map((approval) => (
                <ApprovalCard key={approval.id} approval={approval} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="access" className="space-y-6">
          <div className="space-y-4">
            {pendingApprovals
              .filter(a => a.type === 'Compliance')
              .map((approval) => (
                <ApprovalCard key={approval.id} approval={approval} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Upcoming Compliance Tasks</h2>
          <Button variant="link" className="text-primary">View All</Button>
        </div>
        <div className="space-y-4">
          {upcomingTasks.map((task) => (
            <Card key={task.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className={`w-2 self-stretch mr-4 ${getTaskPriorityColor(task.priority)}`}></div>
                  <div className="flex-1">
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Due: {task.dueDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ApprovalCardProps {
  approval: {
    id: number;
    title: string;
    requestedBy: string;
    date: string;
    type: string;
  };
}

function ApprovalCard({ approval }: ApprovalCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-start p-4">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{approval.title}</h3>
                <div className="text-sm text-muted-foreground mt-1">
                  <p>Requested by: {approval.requestedBy}</p>
                  <p>Date: {approval.date}</p>
                </div>
              </div>
              <div className="text-sm font-medium">
                <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                  {approval.type}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t p-2 flex justify-end gap-2 bg-gray-50">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Check className="h-4 w-4 text-green-600" />
            Approve
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <X className="h-4 w-4 text-red-600" />
            Deny
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            Review
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function getTaskPriorityColor(priority: string) {
  switch (priority) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-yellow-500";
    default:
      return "bg-blue-500";
  }
}

// Mock data for pending approvals
const pendingApprovals = [
  {
    id: 1,
    title: "Data export request",
    requestedBy: "Neeta Joshi",
    date: "Mar 30, 2025",
    type: "GDPR"
  },
  {
    id: 2,
    title: "Access to visa compliance data",
    requestedBy: "Vikram Patel",
    date: "Mar 29, 2025",
    type: "Internal"
  },
  {
    id: 3,
    title: "Agent verification approval",
    requestedBy: "Deepak Gupta",
    date: "Mar 28, 2025",
    type: "Compliance"
  },
  {
    id: 4,
    title: "Document retention exception",
    requestedBy: "Anjali Mehta",
    date: "Mar 26, 2025",
    type: "Policy"
  }
];

// Mock data for upcoming tasks
const upcomingTasks = [
  {
    id: 1,
    title: "Quarterly compliance report submission",
    dueDate: "Apr 15, 2025",
    priority: "high"
  },
  {
    id: 2,
    title: "GDPR training for new staff members",
    dueDate: "Apr 10, 2025",
    priority: "medium"
  },
  {
    id: 3,
    title: "Review agent verification procedures",
    dueDate: "Apr 8, 2025",
    priority: "medium"
  },
  {
    id: 4,
    title: "Update visa compliance documentation",
    dueDate: "Apr 5, 2025",
    priority: "high"
  }
];