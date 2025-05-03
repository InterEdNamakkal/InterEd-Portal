import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Upload, 
  FolderPlus, 
  FileText, 
  Filter,
  Download,
  Share,
  Grid,
  List,
  Star,
  Clock,
  Users,
  File
} from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define document interfaces
interface Document {
  id: number;
  name: string;
  type: string;
  category: string;
  size: string;
  lastUpdated: string;
  uploadedBy: string;
  tags: string[];
  isFavorite: boolean;
  fileExtension: string;
}

// Mock data for documents
const mockDocuments: Document[] = [
  {
    id: 1,
    name: "University of Toronto Agreement.pdf",
    type: "pdf",
    category: "University Documents",
    size: "2.3 MB",
    lastUpdated: "Mar 28, 2025",
    uploadedBy: "Rahul Sharma",
    tags: ["Agreement", "Toronto"],
    isFavorite: true,
    fileExtension: "pdf"
  },
  {
    id: 2,
    name: "Student Application Form Template.docx",
    type: "docx",
    category: "Student Documents",
    size: "458 KB",
    lastUpdated: "Mar 25, 2025",
    uploadedBy: "Priya Singh",
    tags: ["Template", "Application"],
    isFavorite: false,
    fileExtension: "docx"
  },
  {
    id: 3,
    name: "Vikram Patel Passport.jpg",
    type: "image",
    category: "Student Documents",
    size: "1.2 MB",
    lastUpdated: "Mar 24, 2025",
    uploadedBy: "Vikram Patel",
    tags: ["Passport", "Student ID"],
    isFavorite: true,
    fileExtension: "jpg"
  },
  {
    id: 4,
    name: "Global Education Agency Contract.pdf",
    type: "pdf",
    category: "Agent Documents",
    size: "3.7 MB",
    lastUpdated: "Mar 22, 2025",
    uploadedBy: "Rahul Sharma",
    tags: ["Contract", "Agency"],
    isFavorite: false,
    fileExtension: "pdf"
  },
  {
    id: 5,
    name: "Application Statistics Q1 2025.xlsx",
    type: "excel",
    category: "Reports",
    size: "1.8 MB",
    lastUpdated: "Mar 18, 2025",
    uploadedBy: "Priya Singh",
    tags: ["Report", "Statistics"],
    isFavorite: false,
    fileExtension: "xlsx"
  },
  {
    id: 6,
    name: "Canada Student Visa Guidelines.pdf",
    type: "pdf",
    category: "Visa Documents",
    size: "5.1 MB",
    lastUpdated: "Mar 20, 2025",
    uploadedBy: "Ananya Patel",
    tags: ["Visa", "Guidelines"],
    isFavorite: true,
    fileExtension: "pdf"
  }
];

// Document categories with counts
const documentCategories = [
  { id: "all", name: "All Documents", count: 245 },
  { id: "student", name: "Student Documents", count: 127 },
  { id: "agent", name: "Agent Documents", count: 43 },
  { id: "university", name: "University Documents", count: 52 },
  { id: "visa", name: "Visa Documents", count: 78 },
  { id: "contracts", name: "Contracts", count: 31 },
  { id: "templates", name: "Document Templates", count: 19 }
];

// Quick filters
const quickFilters = [
  { id: "favorites", name: "Favorites", count: 12, icon: Star },
  { id: "recent", name: "Recent", count: 24, icon: Clock },
  { id: "shared", name: "Shared with Me", count: 8, icon: Users }
];

export default function DocumentManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Get color for document type
  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'bg-red-100 text-red-800';
      case 'docx':
      case 'doc':
        return 'bg-blue-100 text-blue-800';
      case 'xlsx':
      case 'xls':
        return 'bg-green-100 text-green-800';
      case 'image':
      case 'jpg':
      case 'png':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get icon for document type
  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <File className="h-8 w-8 text-red-500" />;
      case 'docx':
      case 'doc':
        return <File className="h-8 w-8 text-blue-500" />;
      case 'xlsx':
      case 'xls':
        return <File className="h-8 w-8 text-green-500" />;
      case 'image':
      case 'jpg':
      case 'png':
        return <File className="h-8 w-8 text-purple-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };
  
  // Filter documents based on selected category
  const filteredDocuments = mockDocuments.filter(doc => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "favorites") return doc.isFavorite;
    
    // Map category IDs to actual category names for comparison
    const categoryMap: {[key: string]: string} = {
      "student": "Student Documents",
      "agent": "Agent Documents",
      "university": "University Documents",
      "visa": "Visa Documents",
      "contracts": "Contracts",
      "templates": "Document Templates"
    };
    
    return doc.category === categoryMap[selectedCategory];
  });
  
  return (
    <div className="container mx-auto py-6 px-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Document Management</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search documents..." 
              className="pl-10 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <div className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center -mt-1 -mr-1">
              3
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <FileText className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Documents
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FolderPlus className="h-4 w-4" />
            New Folder
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            OCR Scan
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === "grid" ? "default" : "ghost"} 
            size="icon" 
            className="h-9 w-9"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-5 w-5" />
          </Button>
          <Button 
            variant={viewMode === "list" ? "default" : "ghost"} 
            size="icon" 
            className="h-9 w-9"
            onClick={() => setViewMode("list")}
          >
            <List className="h-5 w-5" />
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex gap-6">
        {/* Left Sidebar - Categories */}
        <div className="w-72 flex-shrink-0">
          <div className="bg-white rounded-lg border p-4 mb-6">
            <h2 className="font-medium text-lg mb-4">Categories</h2>
            <div className="space-y-2">
              {documentCategories.map(category => (
                <div 
                  key={category.id}
                  className={`px-3 py-2 rounded-md flex justify-between items-center cursor-pointer ${
                    selectedCategory === category.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span>{category.name}</span>
                  <span className="text-sm bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                    {category.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Quick Filters */}
          <div className="bg-white rounded-lg border p-4">
            <h2 className="font-medium text-lg mb-4">Quick Filters</h2>
            <div className="space-y-2">
              {quickFilters.map(filter => {
                const FilterIcon = filter.icon;
                return (
                  <div 
                    key={filter.id}
                    className={`px-3 py-2 rounded-md flex justify-between items-center cursor-pointer ${
                      selectedCategory === filter.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedCategory(filter.id)}
                  >
                    <div className="flex items-center gap-2">
                      <FilterIcon className="h-4 w-4" />
                      <span>{filter.name}</span>
                    </div>
                    <span className="text-sm bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                      {filter.count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Right Content Area - Documents */}
        <div className="flex-1">
          <div className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">All Documents</h2>
              <div className="text-sm text-gray-500">{filteredDocuments.length} documents</div>
            </div>
            
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocuments.map(doc => (
                  <Card key={doc.id} className="overflow-hidden border hover:shadow-md transition-shadow">
                    <div className="bg-gray-50 p-4 flex items-center justify-center border-b">
                      {getDocumentTypeIcon(doc.type)}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium line-clamp-2 flex-1">{doc.name}</div>
                        {doc.isFavorite && <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 flex-shrink-0 ml-2" />}
                      </div>
                      <div className="text-sm text-gray-500 mb-2">{doc.size} • {doc.lastUpdated}</div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {doc.tags.map((tag, index) => (
                          <span key={index} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Download</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Share className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Share</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Star className={`h-4 w-4 ${doc.isFavorite ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{doc.isFavorite ? 'Remove from favorites' : 'Add to favorites'}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="divide-y">
                {filteredDocuments.map(doc => (
                  <div key={doc.id} className="py-3 px-2 flex items-center hover:bg-gray-50 rounded-md">
                    <div className="mr-4">
                      {getDocumentTypeIcon(doc.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <div className="font-medium truncate mr-2">{doc.name}</div>
                        {doc.isFavorite && <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 flex-shrink-0" />}
                      </div>
                      <div className="text-sm text-gray-500">{doc.size} • {doc.lastUpdated}</div>
                    </div>
                    <div className="flex flex-wrap gap-1 px-4 max-w-[200px]">
                      {doc.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 ml-auto">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}