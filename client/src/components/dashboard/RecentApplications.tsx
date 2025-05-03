import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Student } from "@shared/schema";

const statusColors: Record<string, string> = {
  "Offer Received": "bg-green-100 text-green-800 hover:bg-green-200",
  "Under Review": "bg-blue-100 text-blue-800 hover:bg-blue-200",
  "Documents Pending": "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  "Submitted": "bg-blue-100 text-blue-800 hover:bg-blue-200",
  "Interview Scheduled": "bg-purple-100 text-purple-800 hover:bg-purple-200",
};

// Mock data for applications - in a real app, this would come from an API
const recentApplicationsData = [
  {
    id: 1,
    studentName: "Vikram Patel",
    university: "University of Toronto",
    program: "Master of Computer Science",
    status: "Offer Received",
    date: "Mar 25, 2025",
  },
  {
    id: 2,
    studentName: "Ananya Singh",
    university: "University of Melbourne",
    program: "Bachelor of Commerce",
    status: "Under Review",
    date: "Mar 23, 2025",
  },
  {
    id: 3,
    studentName: "Rajiv Kumar",
    university: "Imperial College London",
    program: "MSc Data Science",
    status: "Documents Pending",
    date: "Mar 22, 2025",
  },
  {
    id: 4,
    studentName: "Meera Joshi",
    university: "McGill University",
    program: "PhD Computer Science",
    status: "Submitted",
    date: "Mar 20, 2025",
  },
  {
    id: 5,
    studentName: "Arjun Malhotra",
    university: "University of Sydney",
    program: "Master of Engineering",
    status: "Interview Scheduled",
    date: "Mar 18, 2025",
  },
];

// Generate badges for application status
const ApplicationStatusBadge = ({ status }: { status: string }) => {
  return (
    <Badge 
      className={cn(
        "font-normal",
        statusColors[status] || "bg-gray-100 text-gray-800 hover:bg-gray-200"
      )}
    >
      {status}
    </Badge>
  );
};

const RecentApplications = () => {
  // In a real app, we would fetch applications data from the API
  const { data: students = [] } = useQuery<Student[]>({
    queryKey: ['/api/students'],
  });

  // We'll use the mock data for now, but in a real app we'd transform the API data
  const applications = recentApplicationsData;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Applications</CardTitle>
        <Link href="/applications" className="text-sm text-blue-600 hover:underline flex items-center">
          View All
          <ArrowUpRight className="ml-1 h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-medium text-gray-500">STUDENT</TableHead>
                <TableHead className="text-xs font-medium text-gray-500">UNIVERSITY</TableHead>
                <TableHead className="text-xs font-medium text-gray-500">PROGRAM</TableHead>
                <TableHead className="text-xs font-medium text-gray-500">STATUS</TableHead>
                <TableHead className="text-xs font-medium text-gray-500">DATE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{application.studentName}</TableCell>
                  <TableCell>{application.university}</TableCell>
                  <TableCell>{application.program}</TableCell>
                  <TableCell>
                    <ApplicationStatusBadge status={application.status} />
                  </TableCell>
                  <TableCell>{application.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentApplications;