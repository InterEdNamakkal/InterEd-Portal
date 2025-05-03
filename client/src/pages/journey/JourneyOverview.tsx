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
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Filter,
  FileUp,
  Download,
  Plane,
  MapPin,
  Home,
  BookOpen,
  GraduationCap,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertTriangle,
  MoreHorizontal,
  Edit,
  Eye
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { JOURNEY_STATUS, JOURNEY_STAGES } from "@/lib/constants";

export default function JourneyOverview() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");

  // Filter journeys based on search, status, and stage
  const filteredJourneys = studentJourneys.filter(journey => {
    const matchesSearch = searchTerm === "" || 
      journey.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journey.student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || journey.status === statusFilter;
    const matchesStage = stageFilter === "all" || journey.currentStage === stageFilter;
    
    return matchesSearch && matchesStatus && matchesStage;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Student Journey Overview</h1>
          <p className="text-muted-foreground">
            Track and manage international student journeys from pre-departure to post-study
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <FileUp className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Download Report</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {JOURNEY_STAGES.map((stage, index) => (
          <JourneyStageCard 
            key={stage.id}
            title={stage.label}
            count={stageCountMap[stage.id]}
            icon={getStageIcon(stage.icon)}
            isActive={index === 2} // Setting "Settlement" as active for demo
          />
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-[300px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="not_started">Not Started</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Stages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              {JOURNEY_STAGES.map(stage => (
                <SelectItem key={stage.id} value={stage.id}>
                  {stage.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between">
            <CardTitle>Student Journey Tracker</CardTitle>
            <div className="text-sm text-muted-foreground">
              {filteredJourneys.length} students found
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>STUDENT</TableHead>
                <TableHead>UNIVERSITY</TableHead>
                <TableHead>PROGRAM</TableHead>
                <TableHead>CURRENT STAGE</TableHead>
                <TableHead>PROGRESS</TableHead>
                <TableHead>NEXT MILESTONE</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJourneys.map((journey) => (
                <TableRow key={journey.id} className="group">
                  <TableCell>
                    <Avatar className="h-8 w-8 text-xs bg-blue-100 text-blue-800">
                      <div>{getInitials(journey.student.name)}</div>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{journey.student.name}</div>
                      <div className="text-xs text-muted-foreground">{journey.student.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{journey.university}</TableCell>
                  <TableCell>{journey.program}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStageClassNames(journey.currentStage)}>
                      {JOURNEY_STAGES.find(s => s.id === journey.currentStage)?.label || journey.currentStage}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="w-full space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{journey.progress}%</span>
                      </div>
                      <Progress 
                        value={journey.progress} 
                        className="h-2"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{journey.nextMilestone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {renderStatusBadge(journey.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Journey Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Update Progress</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          <span>Flag Issues</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{filteredJourneys.length}</strong> out of <strong>{studentJourneys.length}</strong> journeys
        </div>
        <div className="flex items-center gap-6">
          <div className="text-sm">
            Page 1 of 1
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface JourneyStageCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  isActive: boolean;
}

function JourneyStageCard({ title, count, icon, isActive }: JourneyStageCardProps) {
  return (
    <Card className={isActive ? "border-blue-500 border-2" : ""}>
      <CardContent className="p-4 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className={`p-2 rounded-md ${isActive ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}>
            {icon}
          </div>
          <div>
            <p className={`font-medium ${isActive ? "text-blue-800" : ""}`}>{title}</p>
            <p className="text-sm text-muted-foreground">{count} students</p>
          </div>
        </div>
        {isActive && (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            Current
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}

function getInitials(name: string): string {
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function getStageIcon(iconName: string): React.ReactNode {
  switch (iconName) {
    case 'Plane':
      return <Plane className="h-4 w-4" />;
    case 'MapPin':
      return <MapPin className="h-4 w-4" />;
    case 'Home':
      return <Home className="h-4 w-4" />;
    case 'BookOpen':
      return <BookOpen className="h-4 w-4" />;
    case 'GraduationCap':
      return <GraduationCap className="h-4 w-4" />;
    default:
      return <ArrowRight className="h-4 w-4" />;
  }
}

function getStageClassNames(stage: string): string {
  switch (stage) {
    case 'pre-departure':
      return 'bg-blue-50 text-blue-800 border-blue-100';
    case 'arrival':
      return 'bg-yellow-50 text-yellow-800 border-yellow-100';
    case 'settlement':
      return 'bg-green-50 text-green-800 border-green-100';
    case 'academic':
      return 'bg-purple-50 text-purple-800 border-purple-100';
    case 'post-study':
      return 'bg-gray-50 text-gray-800 border-gray-100';
    default:
      return 'bg-blue-50 text-blue-800 border-blue-100';
  }
}

function renderStatusBadge(status: string) {
  switch (status) {
    case 'in_progress':
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-100">
          In Progress
        </Badge>
      );
    case 'completed':
      return (
        <Badge variant="outline" className="bg-green-50 text-green-800 border-green-100">
          Completed
        </Badge>
      );
    case 'not_started':
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-800 border-gray-100">
          Not Started
        </Badge>
      );
    case 'overdue':
      return (
        <Badge variant="outline" className="bg-red-50 text-red-800 border-red-100">
          Overdue
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

// Mock data for journey stage counts
const stageCountMap: Record<string, number> = {
  "pre-departure": 34,
  "arrival": 18,
  "settlement": 26,
  "academic": 58,
  "post-study": 12
};

// Mock data for student journeys
const studentJourneys = [
  {
    id: 1,
    student: {
      name: "Aditya Patel",
      email: "a.patel@mail.com"
    },
    university: "University of Melbourne",
    program: "Master of Data Science",
    currentStage: "settlement",
    progress: 65,
    nextMilestone: "Complete local bank setup by Apr 15",
    status: "in_progress"
  },
  {
    id: 2,
    student: {
      name: "Min-Ji Kim",
      email: "minji.k@mail.com"
    },
    university: "University of Sydney",
    program: "Bachelor of Business",
    currentStage: "academic",
    progress: 80,
    nextMilestone: "Mid-term exams on Apr 20",
    status: "in_progress"
  },
  {
    id: 3,
    student: {
      name: "Carlos Rodriguez",
      email: "carlos.r@mail.com"
    },
    university: "RMIT University",
    program: "Bachelor of Engineering",
    currentStage: "pre-departure",
    progress: 35,
    nextMilestone: "Visa application deadline Apr 10",
    status: "overdue"
  },
  {
    id: 4,
    student: {
      name: "Sophia Chang",
      email: "s.chang@mail.com"
    },
    university: "University of Queensland",
    program: "Master of Business Administration",
    currentStage: "arrival",
    progress: 45,
    nextMilestone: "Orientation session on Apr 5",
    status: "in_progress"
  },
  {
    id: 5,
    student: {
      name: "Mohammed Al-Farsi",
      email: "m.alfarsi@mail.com"
    },
    university: "Monash University",
    program: "PhD in Computer Science",
    currentStage: "academic",
    progress: 85,
    nextMilestone: "Research proposal due Apr 30",
    status: "in_progress"
  },
  {
    id: 6,
    student: {
      name: "Elena Petrova",
      email: "elena.p@mail.com"
    },
    university: "Australian National University",
    program: "Master of International Relations",
    currentStage: "settlement",
    progress: 50,
    nextMilestone: "Health insurance setup by Apr 8",
    status: "in_progress"
  },
  {
    id: 7,
    student: {
      name: "Ngan Tran",
      email: "ntran@mail.com"
    },
    university: "University of New South Wales",
    program: "Bachelor of Architecture",
    currentStage: "post-study",
    progress: 100,
    nextMilestone: "Graduate visa application by Apr 20",
    status: "completed"
  },
  {
    id: 8,
    student: {
      name: "Ahmed Hassan",
      email: "a.hassan@mail.com"
    },
    university: "Macquarie University",
    program: "Master of Applied Finance",
    currentStage: "pre-departure",
    progress: 20,
    nextMilestone: "Submit housing preferences by Apr 12",
    status: "not_started"
  }
];