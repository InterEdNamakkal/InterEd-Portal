import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Filter,
  FileUp,
  Plus,
  MoreHorizontal,
  Percent,
  Tag,
  ShoppingBag,
  Bookmark,
  Coffee,
  BookOpen,
  Smartphone,
  Train,
  Home,
  Utensils,
  Briefcase,
  Activity,
  Edit,
  Trash,
  EyeIcon,
  ArrowUpRight
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CardBenefits() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Filter benefits based on search term and category
  const filteredBenefits = benefits.filter(benefit => {
    const matchesSearch = searchTerm === "" || 
      benefit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      benefit.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || benefit.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Card Benefits Management</h1>
          <p className="text-muted-foreground">
            Manage student card benefits, discounts, and special offers
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <FileUp className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>Add New Benefit</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BenefitSummaryCard 
          title="Active Benefits"
          value={benefits.filter(b => b.status === "active").length.toString()}
          icon={<Tag className="h-5 w-5" />}
          bgColor="bg-blue-50"
          textColor="text-blue-600"
        />
        <BenefitSummaryCard 
          title="Total Usage"
          value="2,845"
          icon={<Percent className="h-5 w-5" />}
          bgColor="bg-green-50"
          textColor="text-green-600"
        />
        <BenefitSummaryCard 
          title="Partner Vendors"
          value="36"
          icon={<ShoppingBag className="h-5 w-5" />}
          bgColor="bg-purple-50"
          textColor="text-purple-600"
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-[300px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search benefits"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="dining">Dining</SelectItem>
              <SelectItem value="retail">Retail & Shopping</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="transportation">Transportation</SelectItem>
              <SelectItem value="accommodation">Accommodation</SelectItem>
              <SelectItem value="wellness">Wellness</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredBenefits.map((benefit) => (
          <BenefitCard key={benefit.id} benefit={benefit} />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{filteredBenefits.length}</strong> out of <strong>{benefits.length}</strong> benefits
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
}

interface BenefitSummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

function BenefitSummaryCard({ title, value, icon, bgColor, textColor }: BenefitSummaryCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className={`p-2 rounded-md ${bgColor} ${textColor}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface Benefit {
  id: number;
  name: string;
  description: string;
  discount: string;
  category: string;
  partner: string;
  iconBg: string;
  icon: React.ReactNode;
  status: string;
  usage: number;
  endDate: string;
}

function BenefitCard({ benefit }: { benefit: Benefit }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-md ${benefit.iconBg}`}>
              {benefit.icon}
            </div>
            <div>
              <CardTitle className="text-base">{benefit.name}</CardTitle>
              <CardDescription className="text-xs mt-1">{benefit.partner}</CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Benefit Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <EyeIcon className="mr-2 h-4 w-4" />
                <span>View Details</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit Benefit</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArrowUpRight className="mr-2 h-4 w-4" />
                <span>Visit Partner Site</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete Benefit</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-3">{benefit.description}</p>
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">{benefit.discount}</div>
          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-100">
            {benefit.category}
          </Badge>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Usage</span>
            <span className="font-medium">{benefit.usage}%</span>
          </div>
          <Progress value={benefit.usage} className="h-1" />
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-3">
        <div className="flex justify-between items-center w-full">
          <Badge variant="outline" className={benefit.status === "active" ? "bg-green-50 text-green-800 border-green-100" : "bg-red-50 text-red-800 border-red-100"}>
            {benefit.status === "active" ? "Active" : "Inactive"}
          </Badge>
          <span className="text-xs text-muted-foreground">Expires: {benefit.endDate}</span>
        </div>
      </CardFooter>
    </Card>
  );
}

// Mock data for benefits
const benefits: Benefit[] = [
  {
    id: 1,
    name: "Campus Café Discount",
    description: "20% off at all campus cafeterias and coffee shops",
    discount: "20% Off",
    category: "dining",
    partner: "University Food Services",
    iconBg: "bg-amber-50",
    icon: <Coffee className="h-4 w-4 text-amber-600" />,
    status: "active",
    usage: 78,
    endDate: "Dec 31, 2025"
  },
  {
    id: 2,
    name: "Textbook Savings",
    description: "15% discount on all textbooks and academic materials",
    discount: "15% Off",
    category: "academic",
    partner: "University Bookstore",
    iconBg: "bg-blue-50",
    icon: <BookOpen className="h-4 w-4 text-blue-600" />,
    status: "active",
    usage: 65,
    endDate: "Aug 31, 2025"
  },
  {
    id: 3,
    name: "Tech Gadget Deals",
    description: "Special student pricing on laptops, tablets and accessories",
    discount: "Up to 25% Off",
    category: "technology",
    partner: "TechWorld",
    iconBg: "bg-purple-50",
    icon: <Smartphone className="h-4 w-4 text-purple-600" />,
    status: "active",
    usage: 42,
    endDate: "Jun 30, 2025"
  },
  {
    id: 4,
    name: "Public Transport Pass",
    description: "50% discount on monthly public transportation passes",
    discount: "50% Off",
    category: "transportation",
    partner: "City Transit Authority",
    iconBg: "bg-green-50",
    icon: <Train className="h-4 w-4 text-green-600" />,
    status: "active",
    usage: 91,
    endDate: "Dec 31, 2025"
  },
  {
    id: 5,
    name: "Student Housing Discount",
    description: "No deposit required for student apartment rentals",
    discount: "No Deposit",
    category: "accommodation",
    partner: "University Housing Partners",
    iconBg: "bg-red-50",
    icon: <Home className="h-4 w-4 text-red-600" />,
    status: "active",
    usage: 33,
    endDate: "Jul 31, 2025"
  },
  {
    id: 6,
    name: "Food Delivery Service",
    description: "Free delivery on orders over $15 from participating restaurants",
    discount: "Free Delivery",
    category: "dining",
    partner: "FoodDash",
    iconBg: "bg-orange-50",
    icon: <Utensils className="h-4 w-4 text-orange-600" />,
    status: "active",
    usage: 58,
    endDate: "Sep 30, 2025"
  },
  {
    id: 7,
    name: "Career Services Premium",
    description: "Free access to premium job search tools and resume reviews",
    discount: "100% Off",
    category: "academic",
    partner: "CareerBoost",
    iconBg: "bg-indigo-50",
    icon: <Briefcase className="h-4 w-4 text-indigo-600" />,
    status: "inactive",
    usage: 12,
    endDate: "Mar 15, 2025"
  },
  {
    id: 8,
    name: "Fitness Center Membership",
    description: "25% off monthly gym membership at CampusFit locations",
    discount: "25% Off",
    category: "wellness",
    partner: "CampusFit Gyms",
    iconBg: "bg-pink-50",
    icon: <Activity className="h-4 w-4 text-pink-600" />,
    status: "active",
    usage: 45,
    endDate: "Dec 31, 2025"
  },
  {
    id: 9,
    name: "Campus Store Discount",
    description: "10% off all merchandise and clothing at the campus store",
    discount: "10% Off",
    category: "retail",
    partner: "University Brand Store",
    iconBg: "bg-yellow-50",
    icon: <ShoppingBag className="h-4 w-4 text-yellow-600" />,
    status: "active",
    usage: 70,
    endDate: "Dec 31, 2025"
  }
];