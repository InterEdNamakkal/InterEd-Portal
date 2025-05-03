import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, LayoutGrid, Table as TableIcon } from "lucide-react";
import { useLocation } from "wouter";

import ApplicationTable from "@/components/applications/ApplicationTable";
import { ApplicationActions } from "@/components/applications/ApplicationActions";
import { PageHeader } from "@/components/layout/PageHeader";

export default function ApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
  const [_, navigate] = useLocation();

  // Fetch all applications
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["/api/applications"],
    select: (data) => {
      // Apply search filter if needed
      if (!searchQuery) return data;
      
      const query = searchQuery.toLowerCase();
      return data.filter((app) => {
        return (
          app.studentName?.toLowerCase().includes(query) ||
          app.universityName?.toLowerCase().includes(query) ||
          app.programName?.toLowerCase().includes(query) ||
          app.stage?.toLowerCase().includes(query) ||
          app.status?.toLowerCase().includes(query)
        );
      });
    },
  });

  // Filter applications based on active tab
  const filteredApplications = applications.filter(app => {
    if (activeTab === "all") return true;
    return app.stage === activeTab;
  });

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Applications"
          description="Manage student applications"
        />
        <div className="flex items-center gap-2">
          <div className="flex bg-muted rounded-md p-1 mr-2">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="h-8 w-8 p-0"
              aria-label="Table View"
            >
              <TableIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'cards' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('cards')}
              className="h-8 w-8 p-0"
              aria-label="Card View"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={() => navigate("/applications/new")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="under_review">Under Review</TabsTrigger>
          <TabsTrigger value="offer_received">Offer Received</TabsTrigger>
          <TabsTrigger value="offer_accepted">Offer Accepted</TabsTrigger>
          <TabsTrigger value="visa_application">Visa Application</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <ApplicationActions>
            {({
              handleUploadDocuments,
              handleSendReminder,
              handleScheduleInterview,
              handleMarkAsPriority,
              handleChangeStatus,
              handleDeleteApplication,
            }) => (
              <ApplicationTable
                applications={filteredApplications}
                isLoading={isLoading}
                onSearch={handleSearch}
                onDeleteApplication={handleDeleteApplication}
                onMarkAsPriority={handleMarkAsPriority}
                onUploadDocuments={handleUploadDocuments}
                onSendReminder={handleSendReminder}
                onScheduleInterview={handleScheduleInterview}
                onChangeStatus={handleChangeStatus}
                viewMode={viewMode}
              />
            )}
          </ApplicationActions>
        </TabsContent>
      </Tabs>
    </div>
  );
}