import { useState } from "react";
import { 
  CalendarIcon, 
  VideoIcon, 
  SearchIcon, 
  PlusIcon,
  ExternalLinkIcon,
  EditIcon,
  Share2Icon,
  ArrowUpIcon,
  MapPinIcon,
  UsersIcon,
  ClockIcon
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { EVENT_TYPES } from "@/lib/constants";

export default function UpcomingEvents() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter events
  const upcomingEvents = events
    .filter(event => event.status === "upcoming")
    .filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Upcoming Events</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track upcoming events and webinars
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-60">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-9 pr-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="default" className="gap-2">
            <PlusIcon className="h-4 w-4" />
            Create Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map(event => (
            <UpcomingEventCard key={event.id} event={event} />
          ))
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center p-12 text-center">
              <div>
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium">No upcoming events</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  There are no upcoming events scheduled. Click "Create Event" to add a new event.
                </p>
                <Button variant="default" className="mt-6 gap-2">
                  <PlusIcon className="h-4 w-4" />
                  Create Event
                </Button>
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
  description?: string;
  image?: string;
}

interface EventCardProps {
  event: Event;
}

function UpcomingEventCard({ event }: EventCardProps) {
  // Find the event type to get the color
  const eventType = EVENT_TYPES.find(type => type.id === event.type);
  
  const registrationParts = event.registrations.split('/');
  const registeredCount = parseInt(registrationParts[0]);
  const totalSlots = parseInt(registrationParts[1]);
  const registrationPercentage = (registeredCount / totalSlots) * 100;
  
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
                  <Badge className="ml-3 bg-blue-100 text-blue-800">
                    {eventType?.label || event.type}
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
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>
            
            {event.description && (
              <p className="mt-4 text-sm text-gray-600">
                {event.description}
              </p>
            )}
            
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <UsersIcon className="h-4 w-4 mr-2 text-gray-600" />
                  <span className="text-sm">{event.registrations} registrations</span>
                </div>
                <span className="text-sm text-blue-600 font-medium">
                  {registrationPercentage.toFixed(0)}% capacity
                </span>
              </div>
              
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div 
                  className="h-full bg-blue-500 rounded-full" 
                  style={{ width: `${registrationPercentage}%` }}
                ></div>
              </div>
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
    registrations: "187/200"
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
    registrations: "112/150"
  }
];