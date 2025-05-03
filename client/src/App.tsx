import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import LoginPage from "@/pages/auth/Login";
import AuthPage from "@/pages/auth/AuthPage";
import NotFound from "@/pages/not-found";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import StudentManagement from "@/pages/students/StudentManagement";
import StudentDetail from "@/pages/students/StudentDetail";
import ApplicationProcessing from "@/pages/applications/ApplicationProcessing";
import ApplicationsPage from "@/pages/applications/ApplicationsPage";
import AgentManagement from "@/pages/agents/AgentManagement";
import AgentsPage from "@/pages/agents/AgentsPage";
import AgentDetail from "@/pages/agents/AgentDetail";
import UniversityManagement from "@/pages/universities/UniversityManagement";
import UniversityDetail from "@/pages/universities/UniversityDetail";
import AddUniversity from "@/pages/universities/AddUniversity";
import ProgramCatalog from "@/pages/universities/ProgramCatalog";
import AgreementManagement from "@/pages/universities/AgreementManagement";
import FinancialManagement from "@/pages/finance/FinancialManagement";
import RevenueTracking from "@/pages/finance/RevenueTracking";
import Invoices from "@/pages/finance/Invoices";
import CommissionProcessing from "@/pages/finance/CommissionProcessing";
import MarketingCampaigns from "@/pages/marketing/MarketingCampaigns";
import EmailMarketing from "@/pages/marketing/EmailMarketing";
import SocialMedia from "@/pages/marketing/SocialMedia";
import ContentManagement from "@/pages/content/ContentManagement";
import UniversityContent from "@/pages/content/UniversityContent";
import MarketingAssets from "@/pages/content/MarketingAssets";
import EmailTemplates from "@/pages/content/EmailTemplates";
import CommunicationCenter from "@/pages/communication/CommunicationCenter";
import EmailMessaging from "@/pages/communication/EmailMessaging";
import SmsMessaging from "@/pages/communication/SmsMessaging";
import ChatMessaging from "@/pages/communication/ChatMessaging";
import CommunicationAnalytics from "@/pages/communication/CommunicationAnalytics";
import DocumentManagement from "@/pages/documents/DocumentManagement";
import StaffManagement from "@/pages/staff/StaffManagement";
import StaffDirectory from "@/pages/staff/StaffDirectory";
import StaffPerformanceMetrics from "@/pages/staff/PerformanceMetrics";
import ComplianceManagement from "@/pages/compliance/ComplianceManagement";
import AuditTrail from "@/pages/compliance/AuditTrail";
import PendingApprovals from "@/pages/compliance/PendingApprovals";
import ReportsManagement from "@/pages/reports/ReportsManagement";
import ScheduledReports from "@/pages/reports/ScheduledReports";
import IntegrationManagement from "@/pages/integrations/IntegrationManagement";
import ApiLogs from "@/pages/integrations/ApiLogs";
import Authentication from "@/pages/integrations/Authentication";
import Monitoring from "@/pages/integrations/Monitoring";
import Documentation from "@/pages/integrations/Documentation";
import UserManagement from "@/pages/system/UserManagement";
import RoleConfiguration from "@/pages/system/RoleConfiguration";
import JourneyOverview from "@/pages/journey/JourneyOverview";
import PreDeparture from "@/pages/journey/PreDeparture";
import CardsDashboard from "@/pages/cards/CardsDashboard";
import CardManagement from "@/pages/cards/CardManagement";
import CardBenefits from "@/pages/cards/CardBenefits";
import CardTransactions from "@/pages/cards/CardTransactions";
import CardAnalytics from "@/pages/cards/CardAnalytics";
import EventsPage from "@/pages/events/EventsPage";
import UpcomingEvents from "@/pages/events/UpcomingEvents";
import PastEvents from "@/pages/events/PastEvents";
import EventAnalytics from "@/pages/events/EventAnalytics";
import ContentDocumentManagement from "@/pages/documents/ContentDocumentManagement";

function Router() {
  return (
    <Switch>
      {/* Auth Routes */}
      <Route path="/login" component={LoginPage} />
      <Route path="/auth" component={AuthPage} />
      
      {/* Protected Dashboard Route */}
      <Route path="/" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <Dashboard />
          </AppLayout>
        </ProtectedRoute>
      )} />
      
      {/* Student Routes */}
      <Route path="/students" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <StudentManagement />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/students/all" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <StudentManagement filter="all" />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/students/prospective" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <StudentManagement filter="prospective" />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/students/current" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <StudentManagement filter="current" />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/students/alumni" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <StudentManagement filter="alumni" />
          </AppLayout>
        </ProtectedRoute>
      )} />
      
      {/* Student Detail Route */}
      <Route path="/students/:id" component={({ params }) => (
        <ProtectedRoute>
          <AppLayout>
            <StudentDetail />
          </AppLayout>
        </ProtectedRoute>
      )} />
      
      {/* Student Edit Route */}
      <Route path="/students/:id/edit" component={({ params }) => (
        <ProtectedRoute>
          <AppLayout>
            <StudentDetail />
          </AppLayout>
        </ProtectedRoute>
      )} />
      
      {/* Student Assignment Route */}
      <Route path="/students/:id/assign-agent" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <StudentDetail action="assign-agent" />
          </AppLayout>
        </ProtectedRoute>
      )} />
      
      {/* Student Card Issuance Route */}
      <Route path="/students/:id/issue-card" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <StudentDetail action="issue-card" />
          </AppLayout>
        </ProtectedRoute>
      )} />
      
      {/* Student Schedule Event Route */}
      <Route path="/students/:id/schedule-event" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <StudentDetail action="schedule-event" />
          </AppLayout>
        </ProtectedRoute>
      )} />
      
      {/* Application Routes */}
      <Route path="/applications" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <ApplicationProcessing />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/applications/all" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <ApplicationProcessing filter="all" />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/applications/new" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <ApplicationProcessing filter="new" />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/applications/under-review" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <ApplicationProcessing filter="under_review" />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/applications/accepted" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <ApplicationProcessing filter="accepted" />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/applications/rejected" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <ApplicationProcessing filter="rejected" />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/applications/:stage" component={({ params }) => (
        <ProtectedRoute>
          <AppLayout>
            <ApplicationProcessing filter={params.stage} />
          </AppLayout>
        </ProtectedRoute>
      )} />
      
      {/* Agent Routes */}
      <Route path="/agents" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <AgentsPage />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/agents/all" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <AgentsPage />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/agents/new" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <AgentDetail />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/agents/:id" component={({ params }) => (
        <ProtectedRoute>
          <AppLayout>
            <AgentDetail />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/agents/:id/edit" component={({ params }) => (
        <ProtectedRoute>
          <AppLayout>
            <AgentDetail />
          </AppLayout>
        </ProtectedRoute>
      )} />
      
      {/* University Routes */}
      <Route path="/universities" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <UniversityManagement />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/universities/all" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <UniversityManagement />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/universities/add" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <AddUniversity />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/universities/:id" component={({ params }) => (
        <ProtectedRoute>
          <AppLayout>
            <UniversityDetail />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/universities/:id/edit" component={({ params }) => (
        <ProtectedRoute>
          <AppLayout>
            <UniversityDetail />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/universities/programs" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <ProgramCatalog />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/universities/agreements" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <AgreementManagement />
          </AppLayout>
        </ProtectedRoute>
      )} />
      
      {/* Finance Routes */}
      <Route path="/finance" component={() => (
        <AppLayout>
          <FinancialManagement />
        </AppLayout>
      )} />
      <Route path="/finance/revenue" component={() => (
        <AppLayout>
          <RevenueTracking />
        </AppLayout>
      )} />
      <Route path="/finance/invoices" component={() => (
        <AppLayout>
          <Invoices />
        </AppLayout>
      )} />
      <Route path="/finance/commissions" component={() => (
        <AppLayout>
          <CommissionProcessing />
        </AppLayout>
      )} />
      
      {/* Marketing Routes */}
      <Route path="/marketing" component={() => (
        <AppLayout>
          <MarketingCampaigns />
        </AppLayout>
      )} />
      <Route path="/marketing/campaigns" component={() => (
        <AppLayout>
          <MarketingCampaigns />
        </AppLayout>
      )} />
      <Route path="/marketing/email" component={() => (
        <AppLayout>
          <EmailMarketing />
        </AppLayout>
      )} />
      <Route path="/marketing/social" component={() => (
        <AppLayout>
          <SocialMedia />
        </AppLayout>
      )} />
      
      {/* Content & Document Management Routes */}
      <Route path="/content" component={() => (
        <AppLayout>
          <ContentManagement />
        </AppLayout>
      )} />
      <Route path="/content/documents" component={() => (
        <AppLayout>
          <ContentManagement />
        </AppLayout>
      )} />
      <Route path="/content/resources" component={() => (
        <AppLayout>
          <UniversityContent />
        </AppLayout>
      )} />
      <Route path="/content/knowledge-base" component={() => (
        <AppLayout>
          <MarketingAssets />
        </AppLayout>
      )} />
      
      {/* Communication Center Routes */}
      <Route path="/communication" component={() => (
        <AppLayout>
          <CommunicationCenter />
        </AppLayout>
      )} />
      <Route path="/communication/email" component={() => (
        <AppLayout>
          <EmailMessaging />
        </AppLayout>
      )} />
      <Route path="/communication/sms" component={() => (
        <AppLayout>
          <SmsMessaging />
        </AppLayout>
      )} />
      <Route path="/communication/chat" component={() => (
        <AppLayout>
          <ChatMessaging />
        </AppLayout>
      )} />
      <Route path="/communication/analytics" component={() => (
        <AppLayout>
          <CommunicationAnalytics />
        </AppLayout>
      )} />
      
      {/* Content & Document Management Routes */}
      <Route path="/documents" component={() => (
        <AppLayout>
          <ContentDocumentManagement />
        </AppLayout>
      )} />
      <Route path="/documents/:section" component={({ params }) => (
        <AppLayout>
          <ContentDocumentManagement />
        </AppLayout>
      )} />
      
      {/* Staff Management Routes */}
      <Route path="/staff" component={() => (
        <AppLayout>
          <StaffManagement />
        </AppLayout>
      )} />
      <Route path="/staff/directory" component={() => (
        <AppLayout>
          <StaffDirectory />
        </AppLayout>
      )} />
      <Route path="/staff/performance" component={() => (
        <AppLayout>
          <StaffPerformanceMetrics />
        </AppLayout>
      )} />
      
      {/* Compliance and Risk Management Routes */}
      <Route path="/compliance" component={() => (
        <AppLayout>
          <ComplianceManagement />
        </AppLayout>
      )} />
      <Route path="/compliance/regulatory" component={() => (
        <AppLayout>
          <ComplianceManagement />
        </AppLayout>
      )} />
      <Route path="/compliance/data-protection" component={() => (
        <AppLayout>
          <ComplianceManagement />
        </AppLayout>
      )} />
      <Route path="/compliance/risk" component={() => (
        <AppLayout>
          <ComplianceManagement />
        </AppLayout>
      )} />
      <Route path="/compliance/audit" component={() => (
        <AppLayout>
          <AuditTrail />
        </AppLayout>
      )} />
      <Route path="/compliance/approvals" component={() => (
        <AppLayout>
          <PendingApprovals />
        </AppLayout>
      )} />
      
      {/* Reports and Analytics Routes */}
      <Route path="/reports" component={() => (
        <AppLayout>
          <ReportsManagement />
        </AppLayout>
      )} />
      <Route path="/reports/standard" component={() => (
        <AppLayout>
          <ReportsManagement />
        </AppLayout>
      )} />
      <Route path="/reports/custom" component={() => (
        <AppLayout>
          <ReportsManagement />
        </AppLayout>
      )} />
      <Route path="/reports/scheduled" component={() => (
        <AppLayout>
          <ScheduledReports />
        </AppLayout>
      )} />
      <Route path="/reports/dashboards" component={() => (
        <AppLayout>
          <ReportsManagement />
        </AppLayout>
      )} />
      <Route path="/reports/kpi" component={() => (
        <AppLayout>
          <ReportsManagement />
        </AppLayout>
      )} />
      
      {/* API and Integration Management Routes */}
      <Route path="/integrations" component={() => (
        <AppLayout>
          <IntegrationManagement />
        </AppLayout>
      )} />
      <Route path="/integrations/active" component={() => (
        <AppLayout>
          <IntegrationManagement />
        </AppLayout>
      )} />
      <Route path="/integrations/available" component={() => (
        <AppLayout>
          <IntegrationManagement />
        </AppLayout>
      )} />
      <Route path="/integrations/api" component={() => (
        <AppLayout>
          <ApiLogs />
        </AppLayout>
      )} />
      <Route path="/integrations/logs" component={() => (
        <AppLayout>
          <ApiLogs />
        </AppLayout>
      )} />
      <Route path="/integrations/documentation" component={() => (
        <AppLayout>
          <Documentation />
        </AppLayout>
      )} />
      
      {/* InterBridge Student Card Routes */}
      <Route path="/cards" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <CardsDashboard />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/cards/dashboard" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <CardsDashboard />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/cards/management" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <CardManagement />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/cards/benefits" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <CardBenefits />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/cards/transactions" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <CardTransactions />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/cards/analytics" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <CardAnalytics />
          </AppLayout>
        </ProtectedRoute>
      )} />
      
      {/* InterBridge Journey Routes */}
      <Route path="/journey" component={() => (
        <AppLayout>
          <JourneyOverview />
        </AppLayout>
      )} />
      <Route path="/journey/overview" component={() => (
        <AppLayout>
          <JourneyOverview />
        </AppLayout>
      )} />
      <Route path="/journey/pre-departure" component={() => (
        <AppLayout>
          <PreDeparture />
        </AppLayout>
      )} />
      
      {/* Events & Webinars Routes */}
      <Route path="/events" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <EventsPage />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/events/upcoming" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <UpcomingEvents />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/events/past" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <PastEvents />
          </AppLayout>
        </ProtectedRoute>
      )} />
      <Route path="/events/analytics" component={() => (
        <ProtectedRoute>
          <AppLayout>
            <EventAnalytics />
          </AppLayout>
        </ProtectedRoute>
      )} />
      
      {/* System Configuration Routes */}
      <Route path="/settings" component={() => (
        <AppLayout>
          <UserManagement />
        </AppLayout>
      )} />
      <Route path="/settings/users" component={() => (
        <AppLayout>
          <UserManagement />
        </AppLayout>
      )} />
      <Route path="/settings/roles" component={() => (
        <AppLayout>
          <RoleConfiguration />
        </AppLayout>
      )} />
      <Route path="/settings/permissions" component={() => (
        <AppLayout>
          <UserManagement />
        </AppLayout>
      )} />
      <Route path="/settings/notifications" component={() => (
        <AppLayout>
          <UserManagement />
        </AppLayout>
      )} />
      <Route path="/settings/branding" component={() => (
        <AppLayout>
          <UserManagement />
        </AppLayout>
      )} />
      <Route path="/settings/workflows" component={() => (
        <AppLayout>
          <UserManagement />
        </AppLayout>
      )} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
