import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, Download, Mail, FileText, Eye, Edit, Copy } from "lucide-react";
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

// Define email template interfaces
interface EmailTemplate {
  id: number;
  name: string;
  subject: string;
  type: 'Transactional' | 'Marketing' | 'Notification';
  category: string;
  lastUpdated: string;
  updatedBy: string;
  status: 'Active' | 'Draft' | 'Inactive';
  languages: string[];
  openRate?: number;
  clickRate?: number;
}

// Mock data for email templates
const mockEmailTemplates: EmailTemplate[] = [
  {
    id: 1,
    name: "Application Confirmation",
    subject: "Your application has been received",
    type: "Transactional",
    category: "Applications",
    lastUpdated: "Mar 27, 2025",
    updatedBy: "Priya Singh",
    status: "Active",
    languages: ["English", "French"],
    openRate: 86.5,
    clickRate: 42.3
  },
  {
    id: 2,
    name: "Program Recommendation",
    subject: "Programs that match your interests",
    type: "Marketing",
    category: "Recommendations",
    lastUpdated: "Mar 25, 2025",
    updatedBy: "Vikram Shah",
    status: "Active",
    languages: ["English"],
    openRate: 68.2,
    clickRate: 24.7
  },
  {
    id: 3,
    name: "Document Submission Reminder",
    subject: "Action required: Submit your documents",
    type: "Notification",
    category: "Applications",
    lastUpdated: "Mar 24, 2025",
    updatedBy: "Rahul Sharma",
    status: "Active",
    languages: ["English", "Chinese", "French"],
    openRate: 72.1,
    clickRate: 38.6
  },
  {
    id: 4,
    name: "Scholarship Notification",
    subject: "Scholarship application update",
    type: "Notification",
    category: "Financial Aid",
    lastUpdated: "Mar 22, 2025",
    updatedBy: "Ananya Patel",
    status: "Draft",
    languages: ["English"],
    openRate: 0,
    clickRate: 0
  },
  {
    id: 5,
    name: "Welcome Email",
    subject: "Welcome to InterEd!",
    type: "Transactional",
    category: "Onboarding",
    lastUpdated: "Mar 20, 2025",
    updatedBy: "Vikram Shah",
    status: "Active",
    languages: ["English", "French", "German"],
    openRate: 91.5,
    clickRate: 67.3
  },
  {
    id: 6,
    name: "Monthly Newsletter",
    subject: "Your monthly education update",
    type: "Marketing",
    category: "Newsletters",
    lastUpdated: "Mar 18, 2025",
    updatedBy: "Rahul Sharma",
    status: "Inactive",
    languages: ["English", "Spanish"],
    openRate: 45.8,
    clickRate: 21.2
  }
];

// Template categories for filtering
const emailCategories = [
  "All Categories",
  "Applications",
  "Recommendations",
  "Financial Aid",
  "Onboarding",
  "Newsletters",
  "Visa Process",
  "University Updates"
];

// Template types for filtering
const emailTypes = [
  "All Types",
  "Transactional",
  "Marketing",
  "Notification"
];

export default function EmailTemplates() {
  const [languageFilter, setLanguageFilter] = useState("all");
  const [emailCategoryFilter, setEmailCategoryFilter] = useState("All Categories");
  const [emailTypeFilter, setEmailTypeFilter] = useState("All Types");
  
  // Function to get the appropriate status tag styling
  const getStatusTag = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter templates based on selected filters
  const filteredTemplates = mockEmailTemplates.filter(template => {
    const matchesType = emailTypeFilter === "All Types" || template.type === emailTypeFilter;
    const matchesCategory = emailCategoryFilter === "All Categories" || template.category === emailCategoryFilter;
    return matchesType && matchesCategory;
  });

  return (
    <div className="container mx-auto py-6 px-6 space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Email Templates</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search templates..." 
              className="pl-10 w-[250px]"
            />
          </div>
          <Select value={languageFilter} onValueChange={setLanguageFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Languages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Create Template
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Send Test Email
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Filter Options */}
      <div className="flex gap-4">
        <Select value={emailTypeFilter} onValueChange={setEmailTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Email Type" />
          </SelectTrigger>
          <SelectContent>
            {emailTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={emailCategoryFilter} onValueChange={setEmailCategoryFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Email Category" />
          </SelectTrigger>
          <SelectContent>
            {emailCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Email Templates Table */}
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Email Template Library</h2>
          <Button variant="link" className="text-blue-600 p-0 text-sm">
            Manage Categories
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </TableHead>
                <TableHead>NAME</TableHead>
                <TableHead>SUBJECT</TableHead>
                <TableHead>TYPE</TableHead>
                <TableHead>CATEGORY</TableHead>
                <TableHead>LAST UPDATED</TableHead>
                <TableHead>UPDATED BY</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>LANGUAGES</TableHead>
                <TableHead>PERFORMANCE</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemplates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  </TableCell>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>{template.subject}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${template.type === 'Transactional' ? 'bg-blue-100 text-blue-800' : 
                          template.type === 'Marketing' ? 'bg-purple-100 text-purple-800' : 
                          'bg-indigo-100 text-indigo-800'}`}
                    >
                      {template.type}
                    </span>
                  </TableCell>
                  <TableCell>{template.category}</TableCell>
                  <TableCell>{template.lastUpdated}</TableCell>
                  <TableCell>{template.updatedBy}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusTag(template.status)}`}
                    >
                      {template.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {template.languages.map((lang, index) => (
                        <span key={index} className="text-xs bg-gray-100 rounded px-2 py-0.5">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {template.openRate ? (
                      <div className="text-xs">
                        <div>{template.openRate}% open</div>
                        <div>{template.clickRate}% click</div>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">Not sent</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 1 to {filteredTemplates.length} of {filteredTemplates.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-8">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-8 bg-blue-600 text-white">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Template Performance Metrics */}
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <h2 className="text-xl font-semibold">Template Performance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">Best Open Rate</div>
            <div className="text-base font-medium">Welcome Email</div>
            <div className="text-xs text-green-600 mt-1">91.5% open rate</div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">Best Click Rate</div>
            <div className="text-base font-medium">Welcome Email</div>
            <div className="text-xs text-green-600 mt-1">67.3% click rate</div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">Most Used Template</div>
            <div className="text-base font-medium">Application Confirmation</div>
            <div className="text-xs text-green-600 mt-1">1,247 sends this month</div>
          </div>
        </div>
        
        {/* Simplified chart representation */}
        <div className="h-60 bg-gray-100 rounded flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p>Email Template Performance Chart</p>
            <p className="text-xs mt-2">Open rates and click rates by template type</p>
          </div>
        </div>
      </div>
    </div>
  );
}