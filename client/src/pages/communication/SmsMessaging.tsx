import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MessageSquare, 
  Circle, 
  Edit2,
  Trash,
  Filter,
  User,
  Phone
} from "lucide-react";
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

// Define SMS message interface
interface SmsMessage {
  id: number;
  recipient: {
    name: string;
    phone: string;
  };
  content: string;
  sentAt: string;
  status: 'delivered' | 'failed' | 'pending';
  type: 'individual' | 'bulk' | 'automated';
}

// Mock data for SMS messages
const mockSmsMessages: SmsMessage[] = [
  {
    id: 1,
    recipient: {
      name: "Vikram Patel",
      phone: "+61 412 345 678",
    },
    content: "Your application to University of Toronto has been received. We'll contact you shortly with next steps.",
    sentAt: "Mar 28, 2025 11:30 AM",
    status: 'delivered',
    type: 'individual'
  },
  {
    id: 2,
    recipient: {
      name: "Ananya Singh",
      phone: "+91 98765 43210",
    },
    content: "Reminder: Your Melbourne University documents are due in 3 days. Please submit them through your student portal.",
    sentAt: "Mar 27, 2025 2:15 PM",
    status: 'delivered',
    type: 'automated'
  },
  {
    id: 3,
    recipient: {
      name: "Raj Kumar",
      phone: "+44 7700 900123",
    },
    content: "Your visa appointment has been confirmed for April 5, 2025 at 10:30 AM. Location: UK Visa Application Centre, Delhi.",
    sentAt: "Mar 26, 2025 9:45 AM",
    status: 'delivered',
    type: 'individual'
  },
  {
    id: 4,
    recipient: {
      name: "Liu Wei",
      phone: "+86 123 4567 8901",
    },
    content: "Welcome to InterEd! Your student account has been created. Login details have been sent to your email.",
    sentAt: "Mar 25, 2025 4:20 PM",
    status: 'delivered',
    type: 'automated'
  },
  {
    id: 5,
    recipient: {
      name: "Fatima Al-Zahra",
      phone: "+971 50 123 4567",
    },
    content: "Important update: Your scholarship application has been approved. Please log in to view the details.",
    sentAt: "Mar 25, 2025 11:10 AM",
    status: 'failed',
    type: 'individual'
  }
];

export default function SmsMessaging() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  
  // Get the color for status indicator
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-500';
      case 'failed':
        return 'text-red-500';
      case 'pending':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">SMS Messages</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Send SMS
        </Button>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            By Student
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            Templates
          </Button>
        </div>
        
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Messages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Messages</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="bulk">Bulk</SelectItem>
            <SelectItem value="automated">Automated</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search SMS messages..."
          className="pl-10 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* SMS Messages Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">RECIPIENT</TableHead>
              <TableHead className="w-[150px]">PHONE</TableHead>
              <TableHead>MESSAGE</TableHead>
              <TableHead className="w-[180px]">SENT AT</TableHead>
              <TableHead className="w-[100px]">STATUS</TableHead>
              <TableHead className="w-[100px]">TYPE</TableHead>
              <TableHead className="w-[100px]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockSmsMessages.map((message) => (
              <TableRow key={message.id}>
                <TableCell className="font-medium">{message.recipient.name}</TableCell>
                <TableCell>{message.recipient.phone}</TableCell>
                <TableCell className="max-w-xs truncate">{message.content}</TableCell>
                <TableCell>{message.sentAt}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Circle className={`h-2 w-2 ${getStatusColor(message.status)}`} fill="currentColor" />
                    <span className="capitalize">{message.status}</span>
                  </div>
                </TableCell>
                <TableCell className="capitalize">{message.type}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-700">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-700">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}