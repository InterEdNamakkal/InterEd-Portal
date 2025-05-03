import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, Download, FilePlus, Image, FileText, Eye, Edit } from "lucide-react";
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

// Define marketing asset interfaces
interface MarketingAsset {
  id: number;
  title: string;
  type: 'PDF Guide' | 'Infographic' | 'Brochure' | 'Video' | 'Banner' | 'Flyer';
  category: string;
  lastUpdated: string;
  updatedBy: string;
  status: 'Published' | 'Draft' | 'Review Needed';
  languages: string[];
  downloads: number;
}

// Mock data for marketing assets
const mockMarketingAssets: MarketingAsset[] = [
  {
    id: 1,
    title: "Study in Canada 2025 Guide",
    type: "PDF Guide",
    category: "Country Guides",
    lastUpdated: "Mar 28, 2025",
    updatedBy: "Priya Singh",
    status: "Published",
    languages: ["English", "French"],
    downloads: 487
  },
  {
    id: 2,
    title: "UK Student Visa Process",
    type: "Infographic",
    category: "Visa Guides",
    lastUpdated: "Mar 26, 2025",
    updatedBy: "Vikram Shah",
    status: "Published",
    languages: ["English"],
    downloads: 342
  },
  {
    id: 3,
    title: "Top Engineering Programs Worldwide",
    type: "Brochure",
    category: "Program Guides",
    lastUpdated: "Mar 25, 2025",
    updatedBy: "Rahul Sharma",
    status: "Published",
    languages: ["English", "Chinese", "Spanish"],
    downloads: 523
  },
  {
    id: 4,
    title: "Student Life in Australia",
    type: "Video",
    category: "Student Experience",
    lastUpdated: "Mar 24, 2025",
    updatedBy: "Ananya Patel",
    status: "Draft",
    languages: ["English"],
    downloads: 0
  },
  {
    id: 5,
    title: "Scholarship Opportunities 2025",
    type: "PDF Guide",
    category: "Financial Aid",
    lastUpdated: "Mar 22, 2025",
    updatedBy: "Vikram Shah",
    status: "Published",
    languages: ["English", "French", "German"],
    downloads: 728
  },
  {
    id: 6,
    title: "Fall 2025 Application Timeline",
    type: "Infographic",
    category: "Application Process",
    lastUpdated: "Mar 20, 2025",
    updatedBy: "Rahul Sharma",
    status: "Review Needed",
    languages: ["English", "Spanish"],
    downloads: 156
  }
];

// Asset categories for filtering
const assetCategories = [
  "All Categories",
  "Country Guides",
  "Visa Guides",
  "Program Guides",
  "Financial Aid",
  "Student Experience",
  "Application Process"
];

// Asset types for filtering
const assetTypes = [
  "All Types",
  "PDF Guide",
  "Infographic",
  "Brochure",
  "Video",
  "Banner",
  "Flyer"
];

export default function MarketingAssets() {
  const [languageFilter, setLanguageFilter] = useState("all");
  const [assetCategoryFilter, setAssetCategoryFilter] = useState("All Categories");
  const [assetTypeFilter, setAssetTypeFilter] = useState("All Types");
  
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

  // Function to get icon based on asset type
  const getAssetTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF Guide':
        return <FileText className="h-4 w-4 text-red-600" />;
      case 'Infographic':
        return <Image className="h-4 w-4 text-purple-600" />;
      case 'Brochure':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'Video':
        return <FileText className="h-4 w-4 text-green-600" />;
      case 'Banner':
        return <Image className="h-4 w-4 text-yellow-600" />;
      case 'Flyer':
        return <FileText className="h-4 w-4 text-indigo-600" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // Filter assets based on selected filters
  const filteredAssets = mockMarketingAssets.filter(asset => {
    const matchesType = assetTypeFilter === "All Types" || asset.type === assetTypeFilter;
    const matchesCategory = assetCategoryFilter === "All Categories" || asset.category === assetCategoryFilter;
    return matchesType && matchesCategory;
  });

  return (
    <div className="container mx-auto py-6 px-6 space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Marketing Assets</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search assets..." 
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
          <Plus className="mr-2 h-4 w-4" /> Upload Asset
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <FilePlus className="h-4 w-4" />
          Create Asset
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Filter Options */}
      <div className="flex gap-4">
        <Select value={assetTypeFilter} onValueChange={setAssetTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Asset Type" />
          </SelectTrigger>
          <SelectContent>
            {assetTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={assetCategoryFilter} onValueChange={setAssetCategoryFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Asset Category" />
          </SelectTrigger>
          <SelectContent>
            {assetCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Marketing Assets Table */}
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Asset Library</h2>
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
                <TableHead>CATEGORY</TableHead>
                <TableHead>LAST UPDATED</TableHead>
                <TableHead>UPDATED BY</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>LANGUAGES</TableHead>
                <TableHead>DOWNLOADS</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  </TableCell>
                  <TableCell className="font-medium">{asset.title}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {getAssetTypeIcon(asset.type)}
                      <span>{asset.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell>{asset.lastUpdated}</TableCell>
                  <TableCell>{asset.updatedBy}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusTag(asset.status)}`}
                    >
                      {asset.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {asset.languages.map((lang, index) => (
                        <span key={index} className="text-xs bg-gray-100 rounded px-2 py-0.5">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {asset.downloads > 0 ? asset.downloads.toLocaleString() : '-'}
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
          <div className="text-sm text-gray-500">
            Showing 1 to {filteredAssets.length} of {filteredAssets.length} results
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

      {/* Asset Performance Metrics */}
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <h2 className="text-xl font-semibold">Asset Performance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">Most Downloaded</div>
            <div className="text-base font-medium">Scholarship Opportunities 2025</div>
            <div className="text-xs text-green-600 mt-1">728 downloads</div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">Most Shared</div>
            <div className="text-base font-medium">Top Engineering Programs Worldwide</div>
            <div className="text-xs text-green-600 mt-1">214 shares</div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">Most Conversions</div>
            <div className="text-base font-medium">Study in Canada 2025 Guide</div>
            <div className="text-xs text-green-600 mt-1">124 application inquiries</div>
          </div>
        </div>
        
        {/* Simplified chart representation */}
        <div className="h-60 bg-gray-100 rounded flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p>Asset Performance Chart</p>
            <p className="text-xs mt-2">Downloads, shares, and conversions by asset category</p>
          </div>
        </div>
      </div>
    </div>
  );
}