import { useState } from "react";
import { 
  Search, 
  Filter, 
  Upload, 
  FileText, 
  Image, 
  FileSymlink, 
  Mail,
  Newspaper,
  Layers,
  User,
  Users,
  GraduationCap,
  CreditCard,
  FileCheck,
  LayoutGrid,
  LayoutList,
  Plus,
  FolderPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export default function ContentDocumentManagement() {
  const [activeTab, setActiveTab] = useState("content");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recent");
  
  // Filter items based on search term and current tab
  const filteredItems = items
    .filter(item => {
      if (activeTab === "content") return item.category === "content";
      if (activeTab === "documents") return item.category === "document";
      return true; // "all" tab
    })
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Content & Document Management</h1>
          <p className="text-muted-foreground">
            Manage marketing content, templates, and legal documents
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="default" className="gap-2">
            <Upload className="h-4 w-4" />
            <span>Upload Files</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <FolderPlus className="h-4 w-4" />
            <span>New Folder</span>
          </Button>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files, documents, folders..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className={viewMode === "grid" ? "bg-accent" : ""}
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={viewMode === "list" ? "bg-accent" : ""}
            onClick={() => setViewMode("list")}
          >
            <LayoutList className="h-4 w-4" />
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="type">File Type</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="content">Content Assets</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="all" className="mt-0">
            <h2 className="text-lg font-semibold mb-4">All Content & Documents</h2>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map(item => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredItems.map(item => (
                  <ItemRow key={item.id} item={item} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="content" className="mt-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Content Assets</h2>
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                New Content
              </Button>
            </div>
            
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.filter(item => item.category === "content").map(item => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredItems.filter(item => item.category === "content").map(item => (
                  <ItemRow key={item.id} item={item} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="documents" className="mt-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Documents</h2>
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                New Document
              </Button>
            </div>
            
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.filter(item => item.category === "document").map(item => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredItems.filter(item => item.category === "document").map(item => (
                  <ItemRow key={item.id} item={item} />
                ))}
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

interface Item {
  id: number;
  name: string;
  description: string;
  type: string;
  category: string;
  size?: string;
  lastModified: string;
  icon: JSX.Element;
  tags: string[];
}

interface ItemCardProps {
  item: Item;
}

function ItemCard({ item }: ItemCardProps) {
  // Color mapping for tags
  const tagColors: Record<string, string> = {
    "marketing": "bg-blue-100 text-blue-800",
    "template": "bg-purple-100 text-purple-800",
    "document": "bg-slate-100 text-slate-800",
    "student": "bg-green-100 text-green-800",
    "agent": "bg-amber-100 text-amber-800",
    "university": "bg-indigo-100 text-indigo-800",
    "visa": "bg-pink-100 text-pink-800",
    "contract": "bg-red-100 text-red-800",
    "legal": "bg-gray-100 text-gray-800",
    "blog": "bg-teal-100 text-teal-800",
    "media": "bg-cyan-100 text-cyan-800",
    "email": "bg-violet-100 text-violet-800"
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="p-6 flex items-center justify-center bg-slate-50 h-32">
        {item.icon}
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base font-medium">{item.name}</CardTitle>
        <CardDescription className="text-xs truncate">{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-wrap gap-1 mb-2">
          {item.tags.slice(0, 2).map(tag => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className={`text-xs ${tagColors[tag.toLowerCase()] || "bg-slate-100"}`}
            >
              {tag}
            </Badge>
          ))}
          {item.tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{item.tags.length - 2} more
            </Badge>
          )}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{item.size}</span>
          <span>{item.lastModified}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button variant="ghost" size="sm">
          View
        </Button>
      </CardFooter>
    </Card>
  );
}

function ItemRow({ item }: ItemCardProps) {
  // Color mapping for tags
  const tagColors: Record<string, string> = {
    "marketing": "bg-blue-100 text-blue-800",
    "template": "bg-purple-100 text-purple-800",
    "document": "bg-slate-100 text-slate-800",
    "student": "bg-green-100 text-green-800",
    "agent": "bg-amber-100 text-amber-800",
    "university": "bg-indigo-100 text-indigo-800",
    "visa": "bg-pink-100 text-pink-800",
    "contract": "bg-red-100 text-red-800",
    "legal": "bg-gray-100 text-gray-800",
    "blog": "bg-teal-100 text-teal-800",
    "media": "bg-cyan-100 text-cyan-800",
    "email": "bg-violet-100 text-violet-800"
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              {item.icon}
            </div>
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-xs text-muted-foreground">{item.description}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {item.tags.map(tag => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className={`text-xs ${tagColors[tag.toLowerCase()] || "bg-slate-100"}`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground text-right">
              <div>{item.size}</div>
              <div>{item.lastModified}</div>
            </div>
            <Button variant="ghost" size="sm">
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Sample content and document items
const items: Item[] = [
  {
    id: 1,
    name: "University Brochure Template",
    description: "Template for creating university marketing brochures",
    type: "template",
    category: "content",
    size: "2.4 MB",
    lastModified: "Mar 15, 2025",
    icon: <FileSymlink className="h-8 w-8 text-purple-500" />,
    tags: ["Marketing", "Template", "University"]
  },
  {
    id: 2,
    name: "Student Visa Application Guide",
    description: "Comprehensive guide for student visa applications",
    type: "document",
    category: "document",
    size: "1.2 MB",
    lastModified: "Apr 02, 2025",
    icon: <FileText className="h-8 w-8 text-blue-500" />,
    tags: ["Document", "Visa", "Student"]
  },
  {
    id: 3,
    name: "Email Template - Welcome",
    description: "Welcome email template for new students",
    type: "template",
    category: "content",
    size: "8 KB",
    lastModified: "Apr 10, 2025",
    icon: <Mail className="h-8 w-8 text-violet-500" />,
    tags: ["Email", "Template", "Marketing"]
  },
  {
    id: 4,
    name: "Agent Agreement Contract",
    description: "Legal contract for agent partnerships",
    type: "document",
    category: "document",
    size: "450 KB",
    lastModified: "Mar 28, 2025",
    icon: <FileCheck className="h-8 w-8 text-red-500" />,
    tags: ["Legal", "Contract", "Agent"]
  },
  {
    id: 5,
    name: "Campus Photo Gallery",
    description: "High resolution campus photos for marketing materials",
    type: "media",
    category: "content",
    size: "15.8 MB",
    lastModified: "Apr 05, 2025",
    icon: <Image className="h-8 w-8 text-cyan-500" />,
    tags: ["Media", "Marketing", "University"]
  },
  {
    id: 6,
    name: "Student Success Stories",
    description: "Blog posts featuring student success stories",
    type: "blog",
    category: "content",
    size: "320 KB",
    lastModified: "Apr 12, 2025",
    icon: <Newspaper className="h-8 w-8 text-teal-500" />,
    tags: ["Blog", "Marketing", "Student"]
  },
  {
    id: 7,
    name: "Student ID Card Template",
    description: "Template for student identification cards",
    type: "template",
    category: "content",
    size: "1.5 MB",
    lastModified: "Mar 20, 2025",
    icon: <Layers className="h-8 w-8 text-amber-500" />,
    tags: ["Template", "Student"]
  },
  {
    id: 8,
    name: "Data Protection Policy",
    description: "Legal document outlining data protection practices",
    type: "document",
    category: "document",
    size: "625 KB",
    lastModified: "Mar 15, 2025",
    icon: <FileCheck className="h-8 w-8 text-gray-500" />,
    tags: ["Legal", "Document", "Policy"]
  },
  {
    id: 9,
    name: "Student Housing Contract",
    description: "Legal agreement for student accommodation",
    type: "document",
    category: "document",
    size: "380 KB",
    lastModified: "Apr 08, 2025",
    icon: <FileCheck className="h-8 w-8 text-red-500" />,
    tags: ["Legal", "Contract", "Student"]
  },
  {
    id: 10,
    name: "University Program Catalog",
    description: "Comprehensive list of university programs and courses",
    type: "document",
    category: "document",
    size: "4.2 MB",
    lastModified: "Apr 01, 2025",
    icon: <FileText className="h-8 w-8 text-indigo-500" />,
    tags: ["Document", "University", "Academic"]
  },
  {
    id: 11,
    name: "Agent Training Materials",
    description: "Training resources for recruitment agents",
    type: "document",
    category: "document",
    size: "2.8 MB",
    lastModified: "Mar 25, 2025",
    icon: <FileText className="h-8 w-8 text-amber-500" />,
    tags: ["Document", "Agent", "Training"]
  },
  {
    id: 12,
    name: "Social Media Graphics Pack",
    description: "Ready-to-use graphics for social media marketing",
    type: "media",
    category: "content",
    size: "8.5 MB",
    lastModified: "Apr 15, 2025",
    icon: <Image className="h-8 w-8 text-blue-500" />,
    tags: ["Media", "Marketing", "Social"]
  }
];