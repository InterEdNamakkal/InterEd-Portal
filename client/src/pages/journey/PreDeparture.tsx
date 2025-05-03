import React, { useState } from "react";
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
  CardFooter
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  FileUp,
  Plane,
  FileText,
  User,
  School,
  CreditCard,
  Calendar,
  Map,
  Upload,
  Package,
  Home,
  Briefcase,
  Phone,
  Wifi,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  MoreHorizontal,
  PlusCircle
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function PreDeparture() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<StudentPreDeparture | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  // Filter students based on search term and status
  const filteredStudents = studentPreDepartures.filter(student => {
    const matchesSearch = searchTerm === "" || 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    
    const matchesTab = activeTab === "all" || 
      (activeTab === "visa" && student.visaStatus !== "approved") ||
      (activeTab === "accom" && student.accommodationStatus !== "confirmed") ||
      (activeTab === "travel" && student.travelStatus !== "booked") ||
      (activeTab === "docs" && student.documentsStatus !== "complete") ||
      (activeTab === "finance" && student.financeStatus !== "verified");
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pre-Departure Management</h1>
          <p className="text-muted-foreground">
            Manage student visa applications, travel arrangements, and pre-departure planning
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <FileUp className="h-4 w-4" />
            <span>Export List</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatusSummaryCard 
          title="Visa Applications"
          count={statusCounts.visa.pending}
          total={statusCounts.visa.total}
          completedCount={statusCounts.visa.approved}
          icon={<FileText className="h-5 w-5" />}
          bgColor="bg-blue-50"
          textColor="text-blue-600"
        />
        <StatusSummaryCard 
          title="Accommodation"
          count={statusCounts.accommodation.pending}
          total={statusCounts.accommodation.total}
          completedCount={statusCounts.accommodation.confirmed}
          icon={<Home className="h-5 w-5" />}
          bgColor="bg-purple-50"
          textColor="text-purple-600"
        />
        <StatusSummaryCard 
          title="Travel Bookings"
          count={statusCounts.travel.pending}
          total={statusCounts.travel.total}
          completedCount={statusCounts.travel.booked}
          icon={<Plane className="h-5 w-5" />}
          bgColor="bg-green-50"
          textColor="text-green-600"
        />
        <StatusSummaryCard 
          title="Documents"
          count={statusCounts.documents.pending}
          total={statusCounts.documents.total}
          completedCount={statusCounts.documents.complete}
          icon={<FileText className="h-5 w-5" />}
          bgColor="bg-amber-50"
          textColor="text-amber-600"
        />
        <StatusSummaryCard 
          title="Finance Verification"
          count={statusCounts.finance.pending}
          total={statusCounts.finance.total}
          completedCount={statusCounts.finance.verified}
          icon={<CreditCard className="h-5 w-5" />}
          bgColor="bg-red-50"
          textColor="text-red-600"
        />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-fit">
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="visa">Visa</TabsTrigger>
              <TabsTrigger value="accom">Accommodation</TabsTrigger>
              <TabsTrigger value="travel">Travel</TabsTrigger>
              <TabsTrigger value="docs">Documents</TabsTrigger>
              <TabsTrigger value="finance">Finance</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex gap-3">
            <div className="relative w-[300px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="on_track">On Track</SelectItem>
                <SelectItem value="at_risk">At Risk</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle>Pre-Departure Students</CardTitle>
                <CardDescription>
                  Students preparing for departure
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <div className="max-h-[600px] overflow-y-auto">
                  {filteredStudents.map((student) => (
                    <div 
                      key={student.id}
                      className={`px-4 py-3 border-b hover:bg-slate-50 cursor-pointer flex justify-between items-center ${selectedStudent?.id === student.id ? 'bg-slate-100' : ''}`}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 text-xs bg-blue-100 text-blue-800">
                          <div>{getInitials(student.name)}</div>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-xs text-muted-foreground">{student.university}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        {renderStatusBadge(student.status)}
                        <div className="text-xs text-muted-foreground mt-1">
                          Departure: {student.departureDate}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            {selectedStudent ? (
              <StudentDetail student={selectedStudent} />
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center p-10">
                  <User className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Student Selected</h3>
                  <p className="text-muted-foreground mb-6">
                    Please select a student from the list to view their pre-departure details.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatusSummaryCardProps {
  title: string;
  count: number;
  total: number;
  completedCount: number;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

function StatusSummaryCard({ 
  title, 
  count, 
  total,
  completedCount,
  icon, 
  bgColor, 
  textColor 
}: StatusSummaryCardProps) {
  const percentage = Math.round((completedCount / total) * 100);
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{count}</p>
            <p className="text-xs text-muted-foreground mt-1">pending</p>
          </div>
          <div className={`p-2 rounded-md ${bgColor} ${textColor}`}>
            {icon}
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-1" />
        </div>
      </CardContent>
    </Card>
  );
}

interface StudentPreDeparture {
  id: number;
  name: string;
  email: string;
  university: string;
  program: string;
  departureDate: string;
  arrivalDate: string;
  originCity: string;
  destinationCity: string;
  status: string;
  visaStatus: string;
  visaApplicationDate: string;
  visaExpiryDate: string;
  accommodationStatus: string;
  accommodationType: string;
  accommodationAddress: string;
  travelStatus: string;
  airline: string;
  flightNumber: string;
  documentsStatus: string;
  financeStatus: string;
  checklist: {
    category: string;
    items: {
      id: number;
      name: string;
      status: string;
      dueDate: string;
    }[];
  }[];
}

function StudentDetail({ student }: { student: StudentPreDeparture }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{student.name}</CardTitle>
            <CardDescription>
              {student.university} | {student.program}
            </CardDescription>
          </div>
          <Badge variant="outline" className={
            student.status === "on_track" 
              ? "bg-green-50 text-green-800 border-green-100" 
              : student.status === "at_risk"
                ? "bg-yellow-50 text-yellow-800 border-yellow-100"
                : "bg-red-50 text-red-800 border-red-100"
          }>
            {student.status === "on_track" 
              ? "On Track" 
              : student.status === "at_risk"
                ? "At Risk"
                : "Delayed"
            }
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Travel Information</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Departure:</span>
                </div>
                <div>{student.departureDate}</div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Arrival:</span>
                </div>
                <div>{student.arrivalDate}</div>
                
                <div className="flex items-center gap-2">
                  <Map className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">From:</span>
                </div>
                <div>{student.originCity}</div>
                
                <div className="flex items-center gap-2">
                  <Map className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">To:</span>
                </div>
                <div>{student.destinationCity}</div>
                
                <div className="flex items-center gap-2">
                  <Plane className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Airline:</span>
                </div>
                <div>{student.airline || "Not booked"}</div>
                
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Flight:</span>
                </div>
                <div>{student.flightNumber || "Not assigned"}</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Visa & Documentation</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Visa Status:</span>
                </div>
                <div>
                  <Badge variant="outline" className={
                    student.visaStatus === "approved" 
                      ? "bg-green-50 text-green-800 border-green-100" 
                      : student.visaStatus === "pending"
                        ? "bg-yellow-50 text-yellow-800 border-yellow-100"
                        : "bg-red-50 text-red-800 border-red-100"
                  }>
                    {capitalizeFirstLetter(student.visaStatus)}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Application Date:</span>
                </div>
                <div>{student.visaApplicationDate}</div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Visa Expiry:</span>
                </div>
                <div>{student.visaExpiryDate || "N/A"}</div>
                
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Documents:</span>
                </div>
                <div>
                  <Badge variant="outline" className={
                    student.documentsStatus === "complete" 
                      ? "bg-green-50 text-green-800 border-green-100" 
                      : student.documentsStatus === "partial"
                        ? "bg-yellow-50 text-yellow-800 border-yellow-100"
                        : "bg-red-50 text-red-800 border-red-100"
                  }>
                    {capitalizeFirstLetter(student.documentsStatus)}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Finance:</span>
                </div>
                <div>
                  <Badge variant="outline" className={
                    student.financeStatus === "verified" 
                      ? "bg-green-50 text-green-800 border-green-100" 
                      : student.financeStatus === "pending"
                        ? "bg-yellow-50 text-yellow-800 border-yellow-100"
                        : "bg-red-50 text-red-800 border-red-100"
                  }>
                    {capitalizeFirstLetter(student.financeStatus)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Pre-Departure Checklist</h3>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                <span>Add Task</span>
              </Button>
            </div>
            
            <Accordion type="multiple" className="w-full">
              {student.checklist.map((category) => (
                <AccordionItem key={category.category} value={category.category}>
                  <AccordionTrigger className="text-sm font-medium">
                    {category.category}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {category.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-2 hover:bg-slate-50 rounded-md">
                          <div className="flex items-center gap-3">
                            <div className={
                              item.status === "completed" 
                                ? "text-green-600" 
                                : item.status === "in_progress"
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }>
                              {item.status === "completed" 
                                ? <CheckCircle2 className="h-5 w-5" /> 
                                : item.status === "in_progress"
                                  ? <Clock className="h-5 w-5" />
                                  : <AlertCircle className="h-5 w-5" />
                              }
                            </div>
                            <div>
                              <div className="text-sm font-medium">{item.name}</div>
                              <div className="text-xs text-muted-foreground">Due: {item.dueDate}</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Edit Details</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Send Reminder</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function getInitials(name: string): string {
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderStatusBadge(status: string) {
  switch (status) {
    case 'on_track':
      return (
        <Badge variant="outline" className="bg-green-50 text-green-800 border-green-100">
          On Track
        </Badge>
      );
    case 'at_risk':
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-100">
          At Risk
        </Badge>
      );
    case 'delayed':
      return (
        <Badge variant="outline" className="bg-red-50 text-red-800 border-red-100">
          Delayed
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-100">
          {status}
        </Badge>
      );
  }
}

// Mock data for status counts
const statusCounts = {
  visa: {
    pending: 12,
    total: 48,
    approved: 28
  },
  accommodation: {
    pending: 18,
    total: 48,
    confirmed: 24
  },
  travel: {
    pending: 15,
    total: 48,
    booked: 30
  },
  documents: {
    pending: 8,
    total: 48,
    complete: 35
  },
  finance: {
    pending: 10,
    total: 48,
    verified: 32
  }
};

// Mock data for student pre-departures
const studentPreDepartures: StudentPreDeparture[] = [
  {
    id: 1,
    name: "Aditya Patel",
    email: "a.patel@mail.com",
    university: "University of Melbourne",
    program: "Master of Data Science",
    departureDate: "Apr 15, 2025",
    arrivalDate: "Apr 16, 2025",
    originCity: "Mumbai, India",
    destinationCity: "Melbourne, Australia",
    status: "on_track",
    visaStatus: "approved",
    visaApplicationDate: "Jan 15, 2025",
    visaExpiryDate: "Jan 15, 2030",
    accommodationStatus: "confirmed",
    accommodationType: "University Housing",
    accommodationAddress: "123 Student Village, Melbourne",
    travelStatus: "booked",
    airline: "Qantas Airways",
    flightNumber: "QF9",
    documentsStatus: "complete",
    financeStatus: "verified",
    checklist: [
      {
        category: "Documentation",
        items: [
          {
            id: 1,
            name: "Passport validity check",
            status: "completed",
            dueDate: "Jan 10, 2025"
          },
          {
            id: 2,
            name: "Visa application",
            status: "completed",
            dueDate: "Jan 20, 2025"
          },
          {
            id: 3,
            name: "University acceptance letter",
            status: "completed",
            dueDate: "Feb 5, 2025"
          }
        ]
      },
      {
        category: "Travel Arrangements",
        items: [
          {
            id: 4,
            name: "Flight booking",
            status: "completed",
            dueDate: "Mar 1, 2025"
          },
          {
            id: 5,
            name: "Travel insurance",
            status: "completed",
            dueDate: "Mar 15, 2025"
          },
          {
            id: 6,
            name: "Airport pickup confirmation",
            status: "in_progress",
            dueDate: "Apr 1, 2025"
          }
        ]
      },
      {
        category: "Finances",
        items: [
          {
            id: 7,
            name: "Tuition payment",
            status: "completed",
            dueDate: "Feb 28, 2025"
          },
          {
            id: 8,
            name: "Open foreign bank account",
            status: "in_progress",
            dueDate: "Apr 5, 2025"
          },
          {
            id: 9,
            name: "Setup travel money card",
            status: "not_started",
            dueDate: "Apr 10, 2025"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Min-Ji Kim",
    email: "minji.k@mail.com",
    university: "University of Sydney",
    program: "Bachelor of Business",
    departureDate: "Apr 20, 2025",
    arrivalDate: "Apr 21, 2025",
    originCity: "Seoul, South Korea",
    destinationCity: "Sydney, Australia",
    status: "at_risk",
    visaStatus: "pending",
    visaApplicationDate: "Feb 10, 2025",
    visaExpiryDate: "",
    accommodationStatus: "confirmed",
    accommodationType: "Private Rental",
    accommodationAddress: "45 College Street, Sydney",
    travelStatus: "booked",
    airline: "Korean Air",
    flightNumber: "KE121",
    documentsStatus: "partial",
    financeStatus: "verified",
    checklist: [
      {
        category: "Documentation",
        items: [
          {
            id: 1,
            name: "Passport validity check",
            status: "completed",
            dueDate: "Jan 15, 2025"
          },
          {
            id: 2,
            name: "Visa application",
            status: "in_progress",
            dueDate: "Feb 15, 2025"
          },
          {
            id: 3,
            name: "University acceptance letter",
            status: "completed",
            dueDate: "Jan 30, 2025"
          }
        ]
      },
      {
        category: "Travel Arrangements",
        items: [
          {
            id: 4,
            name: "Flight booking",
            status: "completed",
            dueDate: "Mar 5, 2025"
          },
          {
            id: 5,
            name: "Travel insurance",
            status: "not_started",
            dueDate: "Apr 1, 2025"
          },
          {
            id: 6,
            name: "Airport pickup confirmation",
            status: "not_started",
            dueDate: "Apr 10, 2025"
          }
        ]
      },
      {
        category: "Finances",
        items: [
          {
            id: 7,
            name: "Tuition payment",
            status: "completed",
            dueDate: "Mar 1, 2025"
          },
          {
            id: 8,
            name: "Open foreign bank account",
            status: "not_started",
            dueDate: "Apr 15, 2025"
          },
          {
            id: 9,
            name: "Setup travel money card",
            status: "completed",
            dueDate: "Mar 20, 2025"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Carlos Rodriguez",
    email: "carlos.r@mail.com",
    university: "RMIT University",
    program: "Bachelor of Engineering",
    departureDate: "Apr 18, 2025",
    arrivalDate: "Apr 19, 2025",
    originCity: "Bogotá, Colombia",
    destinationCity: "Melbourne, Australia",
    status: "delayed",
    visaStatus: "pending",
    visaApplicationDate: "Jan 28, 2025",
    visaExpiryDate: "",
    accommodationStatus: "pending",
    accommodationType: "Homestay",
    accommodationAddress: "",
    travelStatus: "pending",
    airline: "",
    flightNumber: "",
    documentsStatus: "partial",
    financeStatus: "pending",
    checklist: [
      {
        category: "Documentation",
        items: [
          {
            id: 1,
            name: "Passport validity check",
            status: "completed",
            dueDate: "Jan 5, 2025"
          },
          {
            id: 2,
            name: "Visa application",
            status: "in_progress",
            dueDate: "Feb 1, 2025"
          },
          {
            id: 3,
            name: "University acceptance letter",
            status: "completed",
            dueDate: "Jan 15, 2025"
          }
        ]
      },
      {
        category: "Travel Arrangements",
        items: [
          {
            id: 4,
            name: "Flight booking",
            status: "not_started",
            dueDate: "Mar 10, 2025"
          },
          {
            id: 5,
            name: "Travel insurance",
            status: "not_started",
            dueDate: "Mar 25, 2025"
          },
          {
            id: 6,
            name: "Airport pickup confirmation",
            status: "not_started",
            dueDate: "Apr 5, 2025"
          }
        ]
      },
      {
        category: "Finances",
        items: [
          {
            id: 7,
            name: "Tuition payment",
            status: "in_progress",
            dueDate: "Feb 28, 2025"
          },
          {
            id: 8,
            name: "Open foreign bank account",
            status: "not_started",
            dueDate: "Apr 10, 2025"
          },
          {
            id: 9,
            name: "Setup travel money card",
            status: "not_started",
            dueDate: "Apr 15, 2025"
          }
        ]
      }
    ]
  }
];