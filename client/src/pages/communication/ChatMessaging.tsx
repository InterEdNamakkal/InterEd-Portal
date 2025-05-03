import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MessageSquare, 
  User,
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  Circle
} from "lucide-react";

// Define chat interface
interface ChatMessage {
  id: number;
  sender: 'user' | 'student';
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

interface ChatContact {
  id: number;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  status: 'active' | 'inactive' | 'blocked';
}

// Mock data for chat contacts
const mockChatContacts: ChatContact[] = [
  {
    id: 1,
    name: "Vikram Patel",
    lastMessage: "I'll check the program requirements and get back to you.",
    lastMessageTime: "10:45 AM",
    unreadCount: 0,
    isOnline: true,
    status: 'active'
  },
  {
    id: 2,
    name: "Ananya Singh",
    lastMessage: "Thank you for the information about Melbourne University.",
    lastMessageTime: "Yesterday",
    unreadCount: 2,
    isOnline: false,
    status: 'active'
  },
  {
    id: 3,
    name: "Raj Kumar",
    lastMessage: "I'll submit my visa application documents tomorrow.",
    lastMessageTime: "Monday",
    unreadCount: 0,
    isOnline: true,
    status: 'active'
  },
  {
    id: 4,
    name: "Liu Wei",
    lastMessage: "Do you have any scholarships for international students?",
    lastMessageTime: "Aug 15",
    unreadCount: 0,
    isOnline: false,
    status: 'inactive'
  },
  {
    id: 5,
    name: "Fatima Al-Zahra",
    lastMessage: "I'll need help with my accommodation arrangements.",
    lastMessageTime: "Aug 10",
    unreadCount: 0,
    isOnline: false,
    status: 'active'
  }
];

// Mock chat conversation
const mockChatMessages: ChatMessage[] = [
  {
    id: 1,
    sender: 'student',
    content: "Hello, I have a few questions about the University of Toronto's Master of Computer Science program.",
    timestamp: "10:30 AM",
    status: 'read'
  },
  {
    id: 2,
    sender: 'user',
    content: "Hi Vikram, I'd be happy to help. What would you like to know about the program?",
    timestamp: "10:32 AM",
    status: 'read'
  },
  {
    id: 3,
    sender: 'student',
    content: "I'm interested in the application deadlines and required documents for international students.",
    timestamp: "10:35 AM",
    status: 'read'
  },
  {
    id: 4,
    sender: 'user',
    content: "For international students, the application deadline for the Fall 2025 intake is January 15, 2025. You'll need to submit your transcripts, a statement of purpose, two letters of recommendation, and proof of English proficiency (TOEFL or IELTS).",
    timestamp: "10:38 AM",
    status: 'read'
  },
  {
    id: 5,
    sender: 'student',
    content: "Thank you for the information. Do they require GRE scores as well?",
    timestamp: "10:40 AM",
    status: 'read'
  },
  {
    id: 6,
    sender: 'user',
    content: "GRE scores are recommended but not mandatory for the MCS program. However, a strong GRE score can strengthen your application, especially if your academic background needs additional support.",
    timestamp: "10:42 AM",
    status: 'read'
  },
  {
    id: 7,
    sender: 'student',
    content: "That's helpful to know. Is there any specific TOEFL or IELTS score requirement?",
    timestamp: "10:43 AM",
    status: 'read'
  },
  {
    id: 8,
    sender: 'user',
    content: "Yes, for TOEFL you need a minimum score of 93 (IBT), with at least 22 in writing and speaking. For IELTS, you need an overall band of 7.0, with no band below 6.5.",
    timestamp: "10:45 AM",
    status: 'read'
  }
];

export default function ChatMessaging() {
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(mockChatContacts[0]);
  
  const handleSendMessage = () => {
    if (message.trim() === "") return;
    // In a real app, you would add the message to the database or state
    setMessage("");
  };

  return (
    <div className="grid grid-cols-12 gap-4 h-[calc(100vh-200px)] overflow-hidden">
      {/* Contacts Sidebar */}
      <div className="col-span-3 bg-white border rounded-lg overflow-hidden flex flex-col">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search contacts..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {mockChatContacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-3 hover:bg-gray-50 cursor-pointer ${selectedContact?.id === contact.id ? 'bg-blue-50' : ''}`}
              onClick={() => setSelectedContact(contact)}
            >
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                    {contact.name.charAt(0)}
                  </div>
                  {contact.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-center">
                    <div className="font-medium truncate">{contact.name}</div>
                    <div className="text-xs text-gray-500">{contact.lastMessageTime}</div>
                  </div>
                  <div className="text-sm text-gray-500 truncate">{contact.lastMessage}</div>
                </div>
                
                {contact.unreadCount > 0 && (
                  <div className="flex-shrink-0">
                    <div className="w-5 h-5 bg-blue-600 rounded-full text-white text-xs flex items-center justify-center">
                      {contact.unreadCount}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="col-span-9 bg-white border rounded-lg flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-3 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                    {selectedContact.name.charAt(0)}
                  </div>
                  {selectedContact.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <div className="font-medium">{selectedContact.name}</div>
                  <div className="text-xs text-gray-500">
                    {selectedContact.isOnline ? 'Online' : 'Offline'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500 hover:text-gray-700">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500 hover:text-gray-700">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500 hover:text-gray-700">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {mockChatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border text-gray-800'
                      }`}
                    >
                      <div>{msg.content}</div>
                      <div
                        className={`text-xs mt-1 text-right ${
                          msg.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Message Input */}
            <div className="p-3 border-t flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500 hover:text-gray-700">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                className="bg-blue-600 hover:bg-blue-700 h-9 w-9 p-0 flex items-center justify-center"
                onClick={handleSendMessage}
                disabled={message.trim() === ""}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p>Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}