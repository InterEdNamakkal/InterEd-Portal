import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  MessageSquare, 
  Search, 
  Star, 
  Circle, 
  Edit2, 
  Calendar,
  BarChart
} from "lucide-react";

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
    priority: 'none'
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
    priority: 'high'
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
    priority: 'medium'
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
    priority: 'high'
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
    priority: 'high'
  }
];

export default function CommunicationCenter() {
  const [activeTab, setActiveTab] = useState("email");
  const [activeMenuItem, setActiveMenuItem] = useState("inbox");
  const [searchQuery, setSearchQuery] = useState("");
  
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
    <div className="container mx-auto py-4 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Communication Center</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search communications..."
              className="pl-10 w-[250px]"
            />
          </div>
          <div className="relative">
            <div className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center -mt-1 -mr-1">
              3
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Mail className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Communication Type Tabs */}
      <Tabs defaultValue="email" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-6 bg-transparent space-x-2">
          <TabsTrigger 
            value="email" 
            className={`rounded-md flex items-center gap-2 px-4 py-2 ${activeTab === 'email' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
          >
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger 
            value="sms"
            className={`rounded-md flex items-center gap-2 px-4 py-2 ${activeTab === 'sms' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
          >
            <MessageSquare className="h-4 w-4" />
            SMS
          </TabsTrigger>
          <TabsTrigger 
            value="chat"
            className={`rounded-md flex items-center gap-2 px-4 py-2 ${activeTab === 'chat' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
          >
            <MessageSquare className="h-4 w-4" />
            Chat
          </TabsTrigger>
        </TabsList>
        
        <div className="flex gap-6">
          <div className="w-full">
            <TabsContent value="email" className="m-0">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Email Messages</h2>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Compose Email
                </Button>
              </div>
              
              {/* Categories/Filter Tabs */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-8 text-sm">
                  <button 
                    className={`px-4 py-2 font-medium ${activeMenuItem === 'inbox' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveMenuItem('inbox')}
                  >
                    Inbox
                  </button>
                  <button 
                    className={`px-4 py-2 font-medium ${activeMenuItem === 'templates' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveMenuItem('templates')}
                  >
                    Templates
                  </button>
                  <button 
                    className={`px-4 py-2 font-medium ${activeMenuItem === 'scheduled' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveMenuItem('scheduled')}
                  >
                    Scheduled
                  </button>
                  <button 
                    className={`px-4 py-2 font-medium ${activeMenuItem === 'bulk' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveMenuItem('bulk')}
                  >
                    Bulk Messaging
                  </button>
                  <button 
                    className={`px-4 py-2 font-medium ${activeMenuItem === 'analytics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveMenuItem('analytics')}
                  >
                    Analytics
                  </button>
                </div>
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
                <div className="flex justify-between items-center px-3 py-2 border-b">
                  <select className="text-sm bg-transparent border-0">
                    <option>All Emails</option>
                    <option>Unread</option>
                    <option>Starred</option>
                    <option>Sent</option>
                    <option>Drafts</option>
                  </select>
                </div>
                
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
            </TabsContent>
            
            <TabsContent value="sms" className="m-0">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">SMS Messages</h2>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Send SMS
                </Button>
              </div>
              
              <div className="h-60 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center">
                  <p className="mb-2 text-gray-500">SMS Module Content</p>
                  <p className="text-sm text-gray-400">Coming soon</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="chat" className="m-0">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">Live Chat</h2>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Start Chat
                </Button>
              </div>
              
              <div className="h-60 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center">
                  <p className="mb-2 text-gray-500">Chat Module Content</p>
                  <p className="text-sm text-gray-400">Coming soon</p>
                </div>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}