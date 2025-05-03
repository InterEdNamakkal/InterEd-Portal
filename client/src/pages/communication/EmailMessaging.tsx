import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Mail, 
  Search, 
  Star, 
  Circle, 
  Edit2,
  Trash,
  Archive,
  AlertCircle,
  Filter
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define message interface
interface Message {
  id: number;
  sender: {
    name: string;
    email: string;
  };
  subject: string;
  preview: string;
  date: string;
  time: string;
  isStarred: boolean;
  status: 'read' | 'unread' | 'archived';
  priority: 'high' | 'medium' | 'low' | 'none';
  hasAttachment: boolean;
}

// Mock data for messages
const mockMessages: Message[] = [
  {
    id: 1,
    sender: {
      name: "Vikram Patel",
      email: "vikram.patel@example.com",
    },
    subject: "Questions about University of Toronto program",
    preview: "Hello, I have a few questions regarding the application process for the Master of Computer Science program...",
    date: "Mar 28, 2025",
    time: "11:45 AM",
    isStarred: true,
    status: 'unread',
    priority: 'none',
    hasAttachment: false
  },
  {
    id: 2,
    sender: {
      name: "Ananya Singh",
      email: "ananya.singh@example.com",
    },
    subject: "Document submission for Melbourne University",
    preview: "I've attached my academic transcripts and language proficiency certificates as requested. Please let me know...",
    date: "Mar 27, 2025",
    time: "3:22 PM",
    isStarred: false,
    status: 'read',
    priority: 'high',
    hasAttachment: true
  },
  {
    id: 3,
    sender: {
      name: "Global Education Pvt Ltd",
      email: "referrals@globaledu.com",
    },
    subject: "New student referrals - Batch April 2025",
    preview: "Please find attached the details of 15 new students we're referring for the upcoming intake. All students are...",
    date: "Mar 26, 2025",
    time: "9:10 AM",
    isStarred: true,
    status: 'read',
    priority: 'medium',
    hasAttachment: true
  },
  {
    id: 4,
    sender: {
      name: "Dr. Michael Johnson",
      email: "m.johnson@unimelb.edu.au",
    },
    subject: "Updated admission requirements - Fall 2025",
    preview: "The Faculty of Computer Science has updated its admission requirements for international students. The new...",
    date: "Mar 25, 2025",
    time: "4:55 PM",
    isStarred: false,
    status: 'read',
    priority: 'high',
    hasAttachment: false
  },
  {
    id: 5,
    sender: {
      name: "Rajiv Kumar",
      email: "rajiv.kumar@example.com",
    },
    subject: "Visa application status",
    preview: "I submitted my visa application last week and was wondering if there's any update or additional documents...",
    date: "Mar 25, 2025",
    time: "1:30 PM",
    isStarred: false,
    status: 'read',
    priority: 'high',
    hasAttachment: false
  }
];

export default function EmailMessaging() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  
  // Get the color for priority indicators
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-orange-500';
      case 'low':
        return 'text-blue-500';
      default:
        return 'text-transparent';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Email Messages</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Compose Email
        </Button>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Trash className="h-4 w-4" />
            Delete
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Archive className="h-4 w-4" />
            Archive
          </Button>
        </div>
        
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Emails" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Emails</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="starred">Starred</SelectItem>
            <SelectItem value="important">Important</SelectItem>
            <SelectItem value="with-attachments">With Attachments</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search messages..."
          className="pl-10 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Email List */}
      <div className="bg-white rounded-lg border">
        {/* Email Messages */}
        <div className="divide-y">
          {mockMessages.map((message) => (
            <div 
              key={message.id} 
              className={`px-4 py-3 hover:bg-gray-50 cursor-pointer flex ${message.status === 'unread' ? 'bg-blue-50' : ''}`}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="flex-shrink-0 mt-1">
                  <Circle className={`h-3 w-3 ${getPriorityColor(message.priority)}`} fill="currentColor" />
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-gray-900">{message.sender.name}</div>
                    <div className="text-xs text-gray-500 whitespace-nowrap">{message.date} {message.time}</div>
                  </div>
                  
                  <div className="font-medium text-gray-800">{message.subject}</div>
                  <div className="text-sm text-gray-500 line-clamp-1">{message.preview}</div>
                </div>
                
                <div className="flex-shrink-0 ml-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-700">
                    {message.isStarred ? (
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ) : (
                      <Star className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-700">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}