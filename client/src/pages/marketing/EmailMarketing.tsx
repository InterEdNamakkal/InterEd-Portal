import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, Download, Eye, Edit, Trash2, ChevronUp, ChevronDown } from "lucide-react";
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

interface EmailTemplate {
  id: number;
  name: string;
  subject: string;
  type: string;
  lastUsed: string;
  openRate: number;
  clickRate: number;
}

interface EmailCampaign {
  id: number;
  name: string;
  subject: string;
  status: 'sent' | 'scheduled' | 'draft';
  sentDate: string;
  audience: string;
  recipients: number;
  openRate: number;
  clickRate: number;
}

// Mock data
const emailTemplates: EmailTemplate[] = [
  {
    id: 1,
    name: "Application Confirmation",
    subject: "Your application has been received",
    type: "Transactional",
    lastUsed: "Mar 28, 2025",
    openRate: 86.5,
    clickRate: 42.3
  },
  {
    id: 2,
    name: "Program Recommendation",
    subject: "Programs that match your interests",
    type: "Marketing",
    lastUsed: "Mar 25, 2025",
    openRate: 68.2,
    clickRate: 24.7
  },
  {
    id: 3,
    name: "Scholarship Notification",
    subject: "You may qualify for these scholarships",
    type: "Marketing",
    lastUsed: "Mar 20, 2025",
    openRate: 72.1,
    clickRate: 38.6
  },
  {
    id: 4,
    name: "Application Deadline Reminder",
    subject: "Important deadline approaching",
    type: "Transactional",
    lastUsed: "Mar 15, 2025",
    openRate: 78.9,
    clickRate: 31.4
  }
];

const emailCampaigns: EmailCampaign[] = [
  {
    id: 1,
    name: "Fall 2025 Application Drive",
    subject: "Don't miss out on applying for Fall 2025",
    status: "sent",
    sentDate: "Mar 15, 2025",
    audience: "Prospective Students - STEM",
    recipients: 12500,
    openRate: 39.0,
    clickRate: 13.0
  },
  {
    id: 2,
    name: "Engineering Programs Showcase",
    subject: "Discover top engineering programs worldwide",
    status: "sent",
    sentDate: "Mar 1, 2025",
    audience: "STEM Prospects",
    recipients: 8750,
    openRate: 42.3,
    clickRate: 15.8
  },
  {
    id: 3,
    name: "Visa Application Guide",
    subject: "Step-by-step guide to your student visa",
    status: "scheduled",
    sentDate: "Apr 5, 2025",
    audience: "Accepted Students",
    recipients: 2450,
    openRate: 0,
    clickRate: 0
  },
  {
    id: 4,
    name: "Scholarship Opportunities 2025",
    subject: "Financial aid options for your studies",
    status: "draft",
    sentDate: "TBD",
    audience: "All Prospects",
    recipients: 0,
    openRate: 0,
    clickRate: 0
  }
];

export default function EmailMarketing() {
  const [timeFilter, setTimeFilter] = useState("last-30-days");
  const [templateTypeFilter, setTemplateTypeFilter] = useState("all");
  const [campaignStatusFilter, setCampaignStatusFilter] = useState("all");

  // Email marketing stats
  const emailStats = {
    totalEmails: {
      count: 54250,
      percentChange: 12.3
    },
    avgOpenRate: {
      rate: 38.6,
      percentChange: 3.2
    },
    avgClickRate: {
      rate: 14.2,
      percentChange: 2.1
    },
    unsubscribeRate: {
      rate: 0.8,
      percentChange: -0.3
    }
  };

  return (
    <div className="container mx-auto py-6 px-6 space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Email Marketing</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search emails..." 
              className="pl-10 w-[250px]"
            />
          </div>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-90-days">Last 90 Days</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Create Email Campaign
        </Button>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" /> New Template
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Emails Sent */}
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Total Emails Sent</div>
            <div className="text-3xl font-bold">{emailStats.totalEmails.count.toLocaleString()}</div>
            <div className="flex items-center text-xs text-gray-500">
              vs. last month
              <span className={`ml-2 flex items-center ${emailStats.totalEmails.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {emailStats.totalEmails.percentChange >= 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {Math.abs(emailStats.totalEmails.percentChange)}%
              </span>
            </div>
          </div>
        </div>

        {/* Avg. Open Rate */}
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Avg. Open Rate</div>
            <div className="text-3xl font-bold">{emailStats.avgOpenRate.rate}%</div>
            <div className="flex items-center text-xs text-gray-500">
              vs. last month
              <span className={`ml-2 flex items-center ${emailStats.avgOpenRate.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {emailStats.avgOpenRate.percentChange >= 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {Math.abs(emailStats.avgOpenRate.percentChange)}%
              </span>
            </div>
          </div>
        </div>

        {/* Avg. Click Rate */}
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Avg. Click Rate</div>
            <div className="text-3xl font-bold">{emailStats.avgClickRate.rate}%</div>
            <div className="flex items-center text-xs text-gray-500">
              vs. last month
              <span className={`ml-2 flex items-center ${emailStats.avgClickRate.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {emailStats.avgClickRate.percentChange >= 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {Math.abs(emailStats.avgClickRate.percentChange)}%
              </span>
            </div>
          </div>
        </div>

        {/* Unsubscribe Rate */}
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Unsubscribe Rate</div>
            <div className="text-3xl font-bold">{emailStats.unsubscribeRate.rate}%</div>
            <div className="flex items-center text-xs text-gray-500">
              vs. last month
              <span className={`ml-2 flex items-center ${emailStats.unsubscribeRate.percentChange >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                {emailStats.unsubscribeRate.percentChange >= 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {Math.abs(emailStats.unsubscribeRate.percentChange)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Email Campaigns Section */}
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Email Campaigns</h2>
          <div className="flex gap-2">
            <Button variant="link" className="text-blue-600 p-0 text-sm">
              View All
            </Button>
            <Select value={campaignStatusFilter} onValueChange={setCampaignStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campaigns</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
                <TableHead>STATUS</TableHead>
                <TableHead>DATE</TableHead>
                <TableHead>AUDIENCE</TableHead>
                <TableHead>RECIPIENTS</TableHead>
                <TableHead>OPEN RATE</TableHead>
                <TableHead>CLICK RATE</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emailCampaigns
                .filter(campaign => campaignStatusFilter === "all" || campaign.status === campaignStatusFilter)
                .map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  </TableCell>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>{campaign.subject}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${campaign.status === 'sent' ? 'bg-green-100 text-green-800' : 
                          campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'}`}
                    >
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{campaign.sentDate}</TableCell>
                  <TableCell>{campaign.audience}</TableCell>
                  <TableCell>{campaign.recipients > 0 ? campaign.recipients.toLocaleString() : '-'}</TableCell>
                  <TableCell>{campaign.openRate > 0 ? `${campaign.openRate}%` : '-'}</TableCell>
                  <TableCell>{campaign.clickRate > 0 ? `${campaign.clickRate}%` : '-'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Email Templates Section */}
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Email Templates</h2>
          <div className="flex gap-2">
            <Button variant="link" className="text-blue-600 p-0 text-sm">
              View All
            </Button>
            <Select value={templateTypeFilter} onValueChange={setTemplateTypeFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="transactional">Transactional</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </TableHead>
                <TableHead>TEMPLATE NAME</TableHead>
                <TableHead>SUBJECT</TableHead>
                <TableHead>TYPE</TableHead>
                <TableHead>LAST USED</TableHead>
                <TableHead>OPEN RATE</TableHead>
                <TableHead>CLICK RATE</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emailTemplates
                .filter(template => templateTypeFilter === "all" || template.type.toLowerCase() === templateTypeFilter)
                .map((template) => (
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
                          'bg-purple-100 text-purple-800'}`}
                    >
                      {template.type}
                    </span>
                  </TableCell>
                  <TableCell>{template.lastUsed}</TableCell>
                  <TableCell>{template.openRate}%</TableCell>
                  <TableCell>{template.clickRate}%</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Email Performance Metrics */}
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <h2 className="text-xl font-semibold">Email Performance Trends</h2>
        
        {/* Simplified chart representation */}
        <div className="h-60 bg-gray-100 rounded flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p>Email Performance Chart</p>
            <p className="text-xs mt-2">Showing open rates, click rates, and unsubscribe trends</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-gray-500 mb-1">Best Performing Subject Line</div>
            <div className="text-base font-medium">"Last chance to apply for Fall 2025"</div>
            <div className="text-xs text-green-600 mt-1">52.7% open rate</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Best Day To Send</div>
            <div className="text-base font-medium">Tuesday</div>
            <div className="text-xs text-green-600 mt-1">43.2% average open rate</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Best Time To Send</div>
            <div className="text-base font-medium">10:00 AM - 12:00 PM</div>
            <div className="text-xs text-green-600 mt-1">46.8% average open rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}