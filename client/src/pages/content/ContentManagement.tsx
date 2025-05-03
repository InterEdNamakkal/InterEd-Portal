import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, Download, ChevronUp, ChevronDown, FileText, Eye, Edit } from "lucide-react";
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

// Define content interfaces
interface ContentItem {
  id: number;
  title: string;
  type: 'Program' | 'University Info' | 'Email Template' | 'PDF Guide' | 'Infographic' | 'Blog Post';
  lastUpdated: string;
  updatedBy: string;
  status: 'Published' | 'Draft' | 'Review Needed';
  languages: string[];
}

interface ContentUpdate {
  id: number;
  title: string;
  type: string;
  updatedBy: string;
  updateType: 'Updated' | 'Published';
  date: string;
  time: string;
}

// Mock data based on the screenshots
const mockContentItems: ContentItem[] = [
  {
    id: 1,
    title: "University of Toronto - Master of Computer Science",
    type: "Program",
    lastUpdated: "Mar 28, 2025",
    updatedBy: "Priya Singh",
    status: "Published",
    languages: ["English", "French"]
  },
  {
    id: 2,
    title: "Imperial College London - MSc Data Science",
    type: "Program",
    lastUpdated: "Mar 26, 2025",
    updatedBy: "Vikram Shah",
    status: "Published",
    languages: ["English"]
  },
  {
    id: 3,
    title: "University of Melbourne - Campus Life",
    type: "University Info",
    lastUpdated: "Mar 25, 2025",
    updatedBy: "Rahul Sharma",
    status: "Published",
    languages: ["English", "Chinese"]
  },
  {
    id: 4,
    title: "McGill University - PhD Computer Science",
    type: "Program",
    lastUpdated: "Mar 24, 2025",
    updatedBy: "Ananya Patel",
    status: "Draft",
    languages: ["English", "French"]
  },
  {
    id: 5,
    title: "University of British Columbia - Housing Options",
    type: "University Info",
    lastUpdated: "Mar 22, 2025",
    updatedBy: "Vikram Shah",
    status: "Published",
    languages: ["English"]
  },
  {
    id: 6,
    title: "Technical University of Munich - Admission Requirements",
    type: "University Info",
    lastUpdated: "Mar 20, 2025",
    updatedBy: "Rahul Sharma",
    status: "Review Needed",
    languages: ["English", "German"]
  }
];

const mockContentUpdates: ContentUpdate[] = [
  {
    id: 1,
    title: "University of Toronto - Master of Computer Science",
    type: "Program",
    updatedBy: "Priya Singh",
    updateType: "Updated",
    date: "Mar 28, 2025",
    time: "10:22 AM"
  },
  {
    id: 2,
    title: "Study in Canada 2025 Guide",
    type: "PDF Guide",
    updatedBy: "Priya Singh",
    updateType: "Published",
    date: "Mar 28, 2025",
    time: "09:45 AM"
  },
  {
    id: 3,
    title: "Application Confirmation",
    type: "Email Template",
    updatedBy: "Priya Singh",
    updateType: "Updated",
    date: "Mar 27, 2025",
    time: "03:12 PM"
  },
  {
    id: 4,
    title: "UK Student Visa Process",
    type: "Infographic",
    updatedBy: "Vikram Shah",
    updateType: "Published",
    date: "Mar 26, 2025",
    time: "11:37 AM"
  }
];

export default function ContentManagement() {
  const [languageFilter, setLanguageFilter] = useState("all");
  const [contentTypeFilter, setContentTypeFilter] = useState("all");
  
  // Content stats
  const contentStats = {
    totalContentItems: {
      count: 428,
      percentChange: 12
    },
    universityPrograms: {
      count: 256,
      percentChange: 8
    },
    marketingMaterials: {
      count: 112,
      percentChange: 15
    },
    emailTemplates: {
      count: 60,
      percentChange: -5
    }
  };

  // Function to get the appropriate status tag styling
  const getStatusTag = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Review Needed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get icon based on content type
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'Program':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'University Info':
        return <FileText className="h-4 w-4 text-purple-600" />;
      case 'Email Template':
        return <FileText className="h-4 w-4 text-green-600" />;
      case 'PDF Guide':
        return <FileText className="h-4 w-4 text-red-600" />;
      case 'Infographic':
        return <FileText className="h-4 w-4 text-yellow-600" />;
      case 'Blog Post':
        return <FileText className="h-4 w-4 text-indigo-600" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto py-6 px-6 space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Content Management</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search content..." 
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
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Content Items */}
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Total Content Items</div>
            <div className="text-3xl font-bold">{contentStats.totalContentItems.count}</div>
            <div className="flex items-center text-xs text-gray-500">
              vs. last month
              <span className={`ml-2 flex items-center ${contentStats.totalContentItems.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {contentStats.totalContentItems.percentChange >= 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {Math.abs(contentStats.totalContentItems.percentChange)}%
              </span>
            </div>
          </div>
        </div>

        {/* University Programs */}
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">University Programs</div>
            <div className="text-3xl font-bold">{contentStats.universityPrograms.count}</div>
            <div className="flex items-center text-xs text-gray-500">
              vs. last month
              <span className={`ml-2 flex items-center ${contentStats.universityPrograms.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {contentStats.universityPrograms.percentChange >= 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {Math.abs(contentStats.universityPrograms.percentChange)}%
              </span>
            </div>
          </div>
        </div>

        {/* Marketing Materials */}
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Marketing Materials</div>
            <div className="text-3xl font-bold">{contentStats.marketingMaterials.count}</div>
            <div className="flex items-center text-xs text-gray-500">
              vs. last month
              <span className={`ml-2 flex items-center ${contentStats.marketingMaterials.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {contentStats.marketingMaterials.percentChange >= 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {Math.abs(contentStats.marketingMaterials.percentChange)}%
              </span>
            </div>
          </div>
        </div>

        {/* Email Templates */}
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Email Templates</div>
            <div className="text-3xl font-bold">{contentStats.emailTemplates.count}</div>
            <div className="flex items-center text-xs text-gray-500">
              vs. last month
              <span className={`ml-2 flex items-center ${contentStats.emailTemplates.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {contentStats.emailTemplates.percentChange >= 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {Math.abs(contentStats.emailTemplates.percentChange)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Create Content
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

      {/* University & Program Content Section */}
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">University & Program Content</h2>
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
                <TableHead>TITLE</TableHead>
                <TableHead>TYPE</TableHead>
                <TableHead>LAST UPDATED</TableHead>
                <TableHead>UPDATED BY</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>LANGUAGES</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockContentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  </TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
                  <TableCell>{item.updatedBy}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusTag(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {item.languages.map((lang, index) => (
                        <span key={index} className="text-xs bg-gray-100 rounded px-2 py-0.5">
                          {lang}
                        </span>
                      ))}
                    </div>
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
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">Showing 1 to 6 of 256 results</div>
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
              3
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Content Updates */}
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <h2 className="text-xl font-semibold">Recent Content Updates</h2>
        <div className="space-y-4">
          {mockContentUpdates.map((update) => (
            <div key={update.id} className="flex items-start gap-4 p-3 border rounded-lg">
              <div className="mt-1">
                {getContentTypeIcon(update.type)}
              </div>
              <div className="flex-1">
                <div className="font-medium">{update.title}</div>
                <div className="text-xs text-gray-500">
                  {update.updateType === 'Updated' ? 'Updated by' : 'Published by'} {update.updatedBy}
                </div>
                <div className="text-xs text-gray-500 mt-1">{update.type}</div>
              </div>
              <div className="text-right text-xs text-gray-500">
                <div>{update.date}</div>
                <div>{update.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}