import { useState } from "react";
import { 
  CalendarIcon, 
  VideoIcon, 
  SearchIcon, 
  PlusIcon,
  DownloadIcon,
  BarChart4Icon,
  MapPinIcon,
  UsersIcon,
  ClockIcon
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EVENT_TYPES } from "@/lib/constants";

export default function PastEvents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  
  // Filter events
  const pastEvents = events
    .filter(event => event.status === "completed")
    .filter(event => typeFilter === "all" || event.type === typeFilter)
    .filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Past Events</h1>
          <p className="text-muted-foreground mt-1">
            View records and performance metrics of past events
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-60">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search past events..."
              className="pl-9 pr-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <DownloadIcon className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Event Types</SelectItem>
            {EVENT_TYPES.map(type => (
              <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select defaultValue="recent">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="registrations-high">Highest Registrations</SelectItem>
            <SelectItem value="registrations-low">Lowest Registrations</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {pastEvents.length > 0 ? (
          pastEvents.map(event => (
            <PastEventCard key={event.id} event={event} />
          ))
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center p-12 text-center">
              <div>
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium">No past events found</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  There are no past events matching your search criteria. Try adjusting your filters.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

interface Event {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  type: string;
  status: string;
  registrations: string;
  attendance?: string;
  feedback?: string;
  description?: string;
  image?: string;
}

interface EventCardProps {
  event: Event;
}

function PastEventCard({ event }: EventCardProps) {
  // Find the event type to get the color
  const eventType = EVENT_TYPES.find(type => type.id === event.type);
  
  const registrationParts = event.registrations.split('/');
  const registeredCount = parseInt(registrationParts[0]);
  const totalSlots = parseInt(registrationParts[1]);
  const registrationPercentage = (registeredCount / totalSlots) * 100;
  
  // Calculate attendance percentage if available
  let attendancePercentage = 0;
  if (event.attendance) {
    const [attended, registered] = event.attendance.split('/').map(Number);
    attendancePercentage = (attended / registered) * 100;
  }
  
  // Format feedback as a number if available
  const feedbackRating = event.feedback ? parseFloat(event.feedback).toFixed(1) : null;
  
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row md:items-start">
          <div className={`flex-shrink-0 p-4 rounded-lg ${eventType?.color || 'bg-gray-100'}`}>
            {event.type === "webinar" ? (
              <VideoIcon className="h-6 w-6" />
            ) : (
              <CalendarIcon className="h-6 w-6" />
            )}
          </div>

          <div className="flex-grow mt-4 md:mt-0 md:ml-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center">
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <Badge className="ml-3 bg-gray-100 text-gray-800">
                    Completed
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    <span>{event.startTime} - {event.endTime}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 md:mt-0">
                <Badge className={`${eventType?.color || 'bg-gray-100'}`}>
                  {eventType?.label || event.type}
                </Badge>
                <Button variant="outline" size="sm" className="gap-1">
                  <BarChart4Icon className="h-4 w-4" />
                  Analytics
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
              <div>
                <p className="text-sm text-gray-500 mb-1">Registrations</p>
                <p className="font-semibold">{event.registrations}</p>
                <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${registrationPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{registrationPercentage.toFixed(0)}% of capacity</p>
              </div>
              
              {event.attendance && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Attendance</p>
                  <p className="font-semibold">{event.attendance}</p>
                  <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${attendancePercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{attendancePercentage.toFixed(0)}% attendance rate</p>
                </div>
              )}
              
              {feedbackRating && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Feedback Rating</p>
                  <div className="flex items-center">
                    <p className="font-semibold">{feedbackRating}</p>
                    <p className="text-xs text-gray-500 ml-1">/5.0</p>
                  </div>
                  <div className="flex items-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div 
                        key={star}
                        className={`w-6 h-2 mr-1 rounded-sm ${
                          star <= Math.round(parseFloat(feedbackRating)) 
                            ? 'bg-yellow-400' 
                            : 'bg-gray-200'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Based on {Math.floor(Math.random() * 50) + 20} responses</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Mock event data
const events: Event[] = [
  {
    id: 1,
    title: "Study in Canada - Virtual Fair",
    date: "Apr 15, 2025",
    startTime: "10:00 AM",
    endTime: "2:00 PM",
    location: "Virtual (Zoom)",
    type: "webinar",
    status: "upcoming",
    registrations: "176/250",
    description: "Connect with top Canadian universities and colleges. Learn about programs, scholarships, and the application process directly from university representatives."
  },
  {
    id: 2,
    title: "UK University Application Workshop",
    date: "Apr 20, 2025",
    startTime: "2:00 PM",
    endTime: "4:00 PM",
    location: "InterEd Chennai Office",
    type: "workshop",
    status: "upcoming",
    registrations: "42/50",
    description: "Hands-on workshop to help students complete their UCAS applications with guidance from UK university admission experts."
  },
  {
    id: 3,
    title: "Australia Education Expo 2025",
    date: "May 5-6, 2025",
    startTime: "10:00 AM",
    endTime: "6:00 PM",
    location: "Taj Coromandel, Chennai",
    type: "expo",
    status: "upcoming",
    registrations: "342/500",
    description: "Two-day education expo featuring over 30 Australian universities and colleges. Meet representatives, attend seminars, and get on-spot admissions."
  },
  {
    id: 4,
    title: "US Admission Process Webinar",
    date: "Mar 25, 2025",
    startTime: "3:00 PM",
    endTime: "4:30 PM",
    location: "Virtual (Zoom)",
    type: "webinar",
    status: "completed",
    registrations: "187/200",
    attendance: "152/187",
    feedback: "4.5"
  },
  {
    id: 5,
    title: "Scholarship Opportunities in Europe",
    date: "May 15, 2025",
    startTime: "11:00 AM",
    endTime: "1:00 PM",
    location: "InterEd Mumbai Office",
    type: "seminar",
    status: "upcoming",
    registrations: "28/40",
    description: "Learn about various scholarship opportunities available for studying in European countries including Germany, France, Italy, and Spain."
  },
  {
    id: 6,
    title: "Graduate Programs Info Session",
    date: "Mar 10, 2025",
    startTime: "5:00 PM",
    endTime: "7:00 PM",
    location: "Virtual (Microsoft Teams)",
    type: "webinar",
    status: "completed",
    registrations: "112/150",
    attendance: "92/112",
    feedback: "4.2"
  },
  {
    id: 7,
    title: "New Zealand Education Fair",
    date: "Feb 28, 2025",
    startTime: "11:00 AM",
    endTime: "5:00 PM",
    location: "Hotel Leela Palace, Bangalore",
    type: "fair",
    status: "completed",
    registrations: "218/250",
    attendance: "186/218",
    feedback: "4.7"
  },
  {
    id: 8,
    title: "STEM Programs in Germany",
    date: "Feb 15, 2025",
    startTime: "3:00 PM",
    endTime: "4:30 PM",
    location: "Virtual (Zoom)",
    type: "webinar",
    status: "completed",
    registrations: "95/100",
    attendance: "71/95",
    feedback: "3.9"
  }
];