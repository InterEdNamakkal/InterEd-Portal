import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Eye, RefreshCw, Download, FilterX, ArrowUpRight, Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import { COMPLIANCE_TABS } from "@/lib/constants";

export default function ComplianceManagement() {
  const [activeTab, setActiveTab] = useState("regulatory");
  const [timeFilter, setTimeFilter] = useState("last_30_days");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Compliance and Risk Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage regulatory compliance, data privacy, and risk assessment
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Last 30 Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last_7_days">Last 7 Days</SelectItem>
              <SelectItem value="last_30_days">Last 30 Days</SelectItem>
              <SelectItem value="last_90_days">Last 90 Days</SelectItem>
              <SelectItem value="last_year">Last Year</SelectItem>
              <SelectItem value="all_time">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-background border-b w-full justify-start rounded-none gap-6 px-1">
          {COMPLIANCE_TABS.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 font-medium text-muted-foreground data-[state=active]:text-primary"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="regulatory" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <ComplianceCard 
              icon={<ShieldCheck className="h-8 w-8 text-emerald-500" />} 
              title="Regulatory Compliance" 
              description="Track and manage compliance with educational regulations"
              progress={98}
              lastUpdated="Mar 28, 2025"
              status="Compliant"
              statusColor="text-green-600"
            />
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-4">Key Regulatory Requirements</h2>
              <div className="divide-y">
                {regulatoryRequirements.map((req) => (
                  <div key={req.id} className="py-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{req.name}</p>
                      <p className="text-sm text-muted-foreground">{req.description}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(req.status)}`}>
                        {req.status}
                      </span>
                      <Button variant="ghost" size="icon" className="ml-2">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="data-protection" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <ComplianceCard 
              icon={<Shield className="h-8 w-8 text-blue-500" />} 
              title="Data Protection" 
              description="GDPR, CCPA, and other privacy law compliance tools"
              progress={100}
              lastUpdated="Mar 25, 2025"
              status="Compliant"
              statusColor="text-green-600"
            />
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-4">Data Protection Measures</h2>
              <div className="divide-y">
                {dataProtectionMeasures.map((measure) => (
                  <div key={measure.id} className="py-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{measure.name}</p>
                      <p className="text-sm text-muted-foreground">{measure.description}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(measure.status)}`}>
                        {measure.status}
                      </span>
                      <Button variant="ghost" size="icon" className="ml-2">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <ComplianceCard 
              icon={<ShieldAlert className="h-8 w-8 text-yellow-500" />} 
              title="Risk Assessment" 
              description="Identify and mitigate potential compliance issues"
              progress={85}
              lastUpdated="Mar 26, 2025"
              status="Attention Needed"
              statusColor="text-yellow-600"
            />
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-4">Risk Assessment Areas</h2>
              <div className="divide-y">
                {riskAssessmentAreas.map((area) => (
                  <div key={area.id} className="py-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{area.name}</p>
                      <p className="text-sm text-muted-foreground">{area.description}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${getRiskLevelClass(area.riskLevel)}`}>
                        {area.riskLevel}
                      </span>
                      <Button variant="ghost" size="icon" className="ml-2">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="document-retention" className="mt-6 space-y-6">
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium">Document Retention Policy</h3>
            <p className="text-muted-foreground mt-2">This section manages your document retention policies</p>
          </div>
        </TabsContent>
        
        <TabsContent value="consent" className="mt-6 space-y-6">
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium">Consent Management</h3>
            <p className="text-muted-foreground mt-2">Manage consent forms and privacy notices</p>
          </div>
        </TabsContent>
        
        <TabsContent value="audit" className="mt-6 space-y-6">
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium">Audit Trail</h3>
            <p className="text-muted-foreground mt-2">View audit logs and compliance tracking history</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ComplianceCard({ 
  icon, 
  title, 
  description, 
  progress, 
  lastUpdated,
  status,
  statusColor
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  progress: number;
  lastUpdated: string;
  status: string;
  statusColor: string;
}) {
  return (
    <Card className="border-l-4 border-l-green-500">
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
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Compliance Rate</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last updated: {lastUpdated}</span>
          <span className={`font-medium ${statusColor}`}>{status}</span>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function for status styling
function getStatusClass(status: string) {
  switch (status) {
    case "Compliant":
      return "bg-green-100 text-green-800";
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Needs Attention":
      return "bg-yellow-100 text-yellow-800";
    case "Non-Compliant":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Helper function for risk level styling
function getRiskLevelClass(level: string) {
  switch (level) {
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

// Mock data for regulatory requirements
const regulatoryRequirements = [
  {
    id: 1,
    name: "Educational Licenses",
    description: "Valid licenses for educational services in all operating regions",
    status: "Compliant",
    lastUpdated: "Mar 15, 2025"
  },
  {
    id: 2,
    name: "Student Visa Regulations",
    description: "Compliance with international student visa processing requirements",
    status: "Compliant",
    lastUpdated: "Mar 20, 2025"
  },
  {
    id: 3,
    name: "Financial Aid Compliance",
    description: "Adherence to financial aid and scholarship regulations",
    status: "Compliant",
    lastUpdated: "Mar 18, 2025"
  },
  {
    id: 4,
    name: "Agent Certification",
    description: "Certification and training of recruitment agents",
    status: "In Progress",
    lastUpdated: "Mar 25, 2025"
  },
  {
    id: 5,
    name: "Anti-Discrimination Policies",
    description: "Policies ensuring non-discriminatory practices in recruitment",
    status: "Compliant",
    lastUpdated: "Mar 10, 2025"
  }
];

// Mock data for data protection measures
const dataProtectionMeasures = [
  {
    id: 1,
    name: "GDPR Compliance",
    description: "Data processing and storage compliant with EU regulations",
    status: "Compliant",
    lastUpdated: "Mar 22, 2025"
  },
  {
    id: 2,
    name: "CCPA Compliance",
    description: "Data handling practices compliant with California regulations",
    status: "Compliant",
    lastUpdated: "Mar 20, 2025"
  },
  {
    id: 3,
    name: "Data Encryption",
    description: "End-to-end encryption for sensitive student information",
    status: "Compliant",
    lastUpdated: "Mar 15, 2025"
  },
  {
    id: 4,
    name: "Consent Management",
    description: "System for tracking and managing user consent for data processing",
    status: "Compliant",
    lastUpdated: "Mar 25, 2025"
  },
  {
    id: 5,
    name: "Data Retention Policies",
    description: "Policies for retention and deletion of personal data",
    status: "Compliant",
    lastUpdated: "Mar 18, 2025"
  }
];

// Mock data for risk assessment areas
const riskAssessmentAreas = [
  {
    id: 1,
    name: "Document Verification",
    description: "Verification process for student academic documents",
    riskLevel: "Low",
    lastUpdated: "Mar 20, 2025"
  },
  {
    id: 2,
    name: "Agent Fraud Prevention",
    description: "Measures to prevent fraudulent agent activities",
    riskLevel: "Medium",
    lastUpdated: "Mar 15, 2025"
  },
  {
    id: 3,
    name: "Data Breach Prevention",
    description: "Security measures to prevent unauthorized data access",
    riskLevel: "Low",
    lastUpdated: "Mar 22, 2025"
  },
  {
    id: 4,
    name: "Visa Application Accuracy",
    description: "Verification of visa application information accuracy",
    riskLevel: "Medium",
    lastUpdated: "Mar 18, 2025"
  },
  {
    id: 5,
    name: "Financial Transaction Security",
    description: "Security of student payments and financial transactions",
    riskLevel: "High",
    lastUpdated: "Mar 25, 2025"
  }
];