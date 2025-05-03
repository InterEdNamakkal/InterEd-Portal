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
import { ArrowUpRight } from "lucide-react";
import type { Agent } from "@shared/schema";

// Mock data for top agents - in a real app, this would come from an API
const topAgentsData = [
  {
    id: 1,
    name: "Global Educator",
    location: "New Delhi, India",
    applications: 42,
    conversions: "68%",
    revenue: "$84,500"
  },
  {
    id: 2,
    name: "Study Abroad Experts",
    location: "Mumbai, India",
    applications: 36,
    conversions: "72%",
    revenue: "$78,200"
  },
  {
    id: 3,
    name: "Future Connect",
    location: "Bangalore, India",
    applications: 29,
    conversions: "65%",
    revenue: "$62,800"
  },
  {
    id: 4,
    name: "Maple Education",
    location: "Toronto, Canada",
    applications: 24,
    conversions: "79%",
    revenue: "$58,400"
  },
  {
    id: 5,
    name: "Pathway International",
    location: "Sydney, Australia",
    applications: 21,
    conversions: "62%",
    revenue: "$45,900"
  }
];

const TopPerformingAgents = () => {
  // In a real app, we would fetch agents data from the API
  const { data: agents = [] } = useQuery<Agent[]>({
    queryKey: ['/api/agents'],
  });

  // We'll use the mock data for now, but in a real app we'd transform the API data
  const topAgents = topAgentsData;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Top Performing Agents</CardTitle>
        <Link href="/agents" className="text-sm text-blue-600 hover:underline flex items-center">
          View All
          <ArrowUpRight className="ml-1 h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-medium text-gray-500">AGENT</TableHead>
                <TableHead className="text-xs font-medium text-gray-500">LOCATION</TableHead>
                <TableHead className="text-xs font-medium text-gray-500">APPLICATIONS</TableHead>
                <TableHead className="text-xs font-medium text-gray-500">CONVERSIONS</TableHead>
                <TableHead className="text-xs font-medium text-gray-500">REVENUE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topAgents.map((agent) => (
                <TableRow key={agent.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>{agent.location}</TableCell>
                  <TableCell>{agent.applications}</TableCell>
                  <TableCell>{agent.conversions}</TableCell>
                  <TableCell>{agent.revenue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPerformingAgents;