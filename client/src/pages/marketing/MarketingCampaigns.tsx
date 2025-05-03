import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, Download, ChevronUp, ChevronDown, Eye, Edit, Archive } from "lucide-react";
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

// Define campaign type interface
interface Campaign {
  id: number;
  name: string;
  type: string;
  status: 'active' | 'scheduled' | 'draft' | 'ended';
  startDate: string;
  endDate: string;
  audience: string;
  leads: number;
  conversions: number;
  budget: number;
  spent: number;
}

// Mock data based on the screenshots
const mockCampaigns: Campaign[] = [
  {
    id: 1,
    name: "Fall 2025 Application Drive",
    type: "Email Campaign",
    status: "active",
    startDate: "Mar 15, 2025",
    endDate: "Apr 30, 2025",
    audience: "Prospective Students - STEM",
    leads: 856,
    conversions: 72,
    budget: 5000,
    spent: 2450
  },
  {
    id: 2,
    name: "UK Universities Virtual Fair",
    type: "Webinar Series",
    status: "active",
    startDate: "Mar 25, 2025",
    endDate: "Apr 10, 2025",
    audience: "High School Seniors",
    leads: 542,
    conversions: 38,
    budget: 3500,
    spent: 1200
  },
  {
    id: 3,
    name: "Canadian Student Visa Guide",
    type: "Content Marketing",
    status: "active",
    startDate: "Mar 10, 2025",
    endDate: "May 10, 2025",
    audience: "Accepted Students",
    leads: 324,
    conversions: 45,
    budget: 2000,
    spent: 950
  },
  {
    id: 4,
    name: "Scholarship Opportunities 2025",
    type: "Social Media",
    status: "scheduled",
    startDate: "Apr 5, 2025",
    endDate: "May 5, 2025",
    audience: "All Prospects",
    leads: 0,
    conversions: 0,
    budget: 4500,
    spent: 0
  },
  {
    id: 5,
    name: "Study in Australia Webinar",
    type: "Webinar",
    status: "draft",
    startDate: "TBD",
    endDate: "TBD",
    audience: "Undergraduate Prospects",
    leads: 0,
    conversions: 0,
    budget: 2500,
    spent: 0
  },
  {
    id: 6,
    name: "Engineering Programs Showcase",
    type: "Email Campaign",
    status: "ended",
    startDate: "Feb 1, 2025",
    endDate: "Mar 15, 2025",
    audience: "STEM Prospects",
    leads: 736,
    conversions: 82,
    budget: 3800,
    spent: 3800
  }
];

// Mock campaign performance data for the Fall 2025 Application Drive
const campaignPerformanceData = {
  name: "Fall 2025 Application Drive",
  sent: 12500,
  opens: 4875,
  openRate: 39.0,
  clicks: 1625,
  clickRate: 33.3,
  inquiries: 856,
  inquiryRate: 52.7,
  applications: 72,
  applicationRate: 8.4,
  overallConversion: 0.6,
  acquisitionCost: 47.92,
  roi: 165
};

interface Task {
  id: number;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  assignee: string;
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Finalize content for Scholarship campaign",
    dueDate: "Apr 2, 2025",
    priority: "high",
    assignee: "Priya Singh"
  },
  {
    id: 2,
    title: "Schedule social media posts for UK Universities Fair",
    dueDate: "Mar 30, 2025",
    priority: "medium",
    assignee: "Vikram Shah"
  },
  {
    id: 3,
    title: "Review Australian webinar presentation slides",
    dueDate: "Apr 5, 2025",
    priority: "medium",
    assignee: "Rahul Sharma"
  },
  {
    id: 4,
    title: "Prepare email templates for Engineering showcase follow-up",
    dueDate: "Mar 29, 2025",
    priority: "high",
    assignee: "Aditya Patel"
  }
];

export default function MarketingCampaigns() {
  const [timeFilter, setTimeFilter] = useState("last-30-days");
  const [campaignTypeFilter, setCampaignTypeFilter] = useState("all");
  const [selectedCampaign, setSelectedCampaign] = useState<string>("Fall 2025 Application Drive");
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Marketing stats
  const marketingStats = {
    activeCampaigns: {
      count: 12,
      percentChange: 20
    },
    totalLeads: {
      count: 2458,
      percentChange: 15.2
    },
    conversionRate: {
      rate: 8.7,
      percentChange: 2.5
    },
    avgCostPerLead: {
      amount: 42,
      percentChange: -3.8
    }
  };

  // Get active campaigns
  const activeCampaigns = mockCampaigns.filter(campaign => 
    campaign.status === "active" || campaign.status === "scheduled"
  );

  return (
    <div className="container mx-auto py-6 px-6 space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Marketing Campaigns</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search campaigns..." 
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
          <Plus className="mr-2 h-4 w-4" /> Create Campaign
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Active Campaigns */}
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Active Campaigns</div>
            <div className="text-3xl font-bold">{marketingStats.activeCampaigns.count}</div>
            <div className="flex items-center text-xs text-gray-500">
              vs. last month
              <span className={`ml-2 flex items-center ${marketingStats.activeCampaigns.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {marketingStats.activeCampaigns.percentChange >= 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {Math.abs(marketingStats.activeCampaigns.percentChange)}%
              </span>
            </div>
          </div>
        </div>

        {/* Total Leads */}
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Total Leads</div>
            <div className="text-3xl font-bold">{marketingStats.totalLeads.count}</div>
            <div className="flex items-center text-xs text-gray-500">
              vs. last month
              <span className={`ml-2 flex items-center ${marketingStats.totalLeads.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {marketingStats.totalLeads.percentChange >= 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {Math.abs(marketingStats.totalLeads.percentChange)}%
              </span>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Conversion Rate</div>
            <div className="text-3xl font-bold">{marketingStats.conversionRate.rate}%</div>
            <div className="flex items-center text-xs text-gray-500">
              vs. last month
              <span className={`ml-2 flex items-center ${marketingStats.conversionRate.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {marketingStats.conversionRate.percentChange >= 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {Math.abs(marketingStats.conversionRate.percentChange)}%
              </span>
            </div>
          </div>
        </div>

        {/* Avg. Cost per Lead */}
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Avg. Cost per Lead</div>
            <div className="text-3xl font-bold">${marketingStats.avgCostPerLead.amount}</div>
            <div className="flex items-center text-xs text-gray-500">
              vs. last month
              <span className={`ml-2 flex items-center ${marketingStats.avgCostPerLead.percentChange >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                {marketingStats.avgCostPerLead.percentChange >= 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {Math.abs(marketingStats.avgCostPerLead.percentChange)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Campaigns Section */}
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Active Campaigns</h2>
          <Button variant="link" className="text-blue-600 p-0 text-sm">
            View Archive
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </TableHead>
                <TableHead>CAMPAIGN NAME</TableHead>
                <TableHead>TYPE</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>DATES</TableHead>
                <TableHead>AUDIENCE</TableHead>
                <TableHead>LEADS</TableHead>
                <TableHead>BUDGET</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  </TableCell>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>{campaign.type}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${campaign.status === 'active' ? 'bg-green-100 text-green-800' : 
                          campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 
                          campaign.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}`}
                    >
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{campaign.startDate} - {campaign.endDate}</TableCell>
                  <TableCell>{campaign.audience}</TableCell>
                  <TableCell>
                    <div className="text-sm">{campaign.leads}</div>
                    {campaign.leads > 0 && campaign.conversions > 0 && (
                      <div className="text-xs text-green-600">{campaign.conversions} conversions</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{formatCurrency(campaign.budget)}</div>
                    <div className="text-xs text-gray-500">{formatCurrency(campaign.spent)} spent</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">Showing 1 to 6 of 12 campaigns</div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-8">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-8 bg-blue-600 text-white">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Campaign Performance</h2>
          <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select campaign" />
            </SelectTrigger>
            <SelectContent>
              {mockCampaigns.map(campaign => (
                <SelectItem key={campaign.id} value={campaign.name}>
                  {campaign.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">{campaignPerformanceData.name}</h3>
          
          {/* Campaign Funnel Metrics */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Sent</span>
                <span className="font-semibold">{campaignPerformanceData.sent.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "100%" }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Opens</span>
                <span className="font-semibold">{campaignPerformanceData.opens.toLocaleString()} <span className="text-xs text-gray-500">{campaignPerformanceData.openRate}% conversion</span></span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${campaignPerformanceData.openRate}%` }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Clicks</span>
                <span className="font-semibold">{campaignPerformanceData.clicks.toLocaleString()} <span className="text-xs text-gray-500">{campaignPerformanceData.clickRate}% conversion</span></span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${campaignPerformanceData.clickRate}%` }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Inquiries</span>
                <span className="font-semibold">{campaignPerformanceData.inquiries.toLocaleString()} <span className="text-xs text-gray-500">{campaignPerformanceData.inquiryRate}% conversion</span></span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${campaignPerformanceData.inquiryRate}%` }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Applications</span>
                <span className="font-semibold">{campaignPerformanceData.applications} <span className="text-xs text-gray-500">{campaignPerformanceData.applicationRate}% conversion</span></span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${campaignPerformanceData.applicationRate}%` }}></div>
              </div>
            </div>
          </div>

          {/* Summary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div>
              <div className="text-sm text-gray-500">Overall Conversion</div>
              <div className="text-xl font-bold text-blue-600">{campaignPerformanceData.overallConversion}%</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Acquisition Cost</div>
              <div className="text-xl font-bold">${campaignPerformanceData.acquisitionCost}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Campaign ROI</div>
              <div className="text-xl font-bold text-green-600">{campaignPerformanceData.roi}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Upcoming Tasks</h2>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" /> Add New Task
          </Button>
        </div>

        <div className="space-y-4">
          {mockTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-start gap-3">
                <div 
                  className={`h-3 w-3 rounded-full mt-1.5 ${
                    task.priority === 'high' ? 'bg-red-500' : 
                    task.priority === 'medium' ? 'bg-yellow-500' : 
                    'bg-green-500'
                  }`}
                ></div>
                <div>
                  <div className="font-medium">{task.title}</div>
                  <div className="text-xs text-gray-500">Due: {task.dueDate}</div>
                </div>
              </div>
              <div className="text-sm text-blue-600">{task.assignee}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}