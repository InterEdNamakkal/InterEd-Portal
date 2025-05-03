import { useState } from "react";
import { 
  CalendarIcon, 
  VideoIcon, 
  LayoutGridIcon, 
  LayoutListIcon, 
  SearchIcon, 
  DownloadIcon,
  PlusIcon,
  ExternalLinkIcon,
  EditIcon,
  Share2Icon,
  ArrowUpIcon,
  ArrowDownIcon,
  MapPinIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { EVENT_TABS, EVENT_TYPES, EVENT_STATUS } from "@/lib/constants";

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Filter events based on active tab
  const filteredEvents = events
    .filter(event => {
      if (activeTab === "upcoming") return event.status === "upcoming";
      if (activeTab === "past") return event.status === "completed";
      return true; // "all" tab
    })
    .filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Group events by their type
  const eventsByType = EVENT_TYPES.map(type => ({
    ...type,
    count: events.filter(e => e.type === type.id).length
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Events & Webinars</h1>
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

      <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
        <div className="flex justify-between">
          <TabsList>
            {EVENT_TABS.map(tab => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1" onClick={() => setViewMode("grid")}>
              <LayoutGridIcon className={viewMode === "grid" ? "h-4 w-4 text-primary" : "h-4 w-4"} />
            </Button>
            <Button variant="outline" size="sm" className="gap-1" onClick={() => setViewMode("list")}>
              <LayoutListIcon className={viewMode === "list" ? "h-4 w-4 text-primary" : "h-4 w-4"} />
            </Button>
            <div className="ml-2">
              <Button variant="outline" size="sm" className="gap-1">
                <span>Sort By: Date</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Events</p>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold">6</p>
                  <div className="flex items-center gap-1 ml-2">
                    <span className="text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded flex items-center">
                      <ArrowUpIcon className="h-3 w-3 mr-1" />15%
                    </span>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Registrations</p>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold">805</p>
                  <div className="flex items-center gap-1 ml-2">
                    <span className="text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded flex items-center">
                      <ArrowUpIcon className="h-3 w-3 mr-1" />23%
                    </span>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Upcoming Events</p>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold">4</p>
                  <div className="ml-2">
                    <span className="text-xs text-muted-foreground">Next: Apr 15, 2025</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <TabsContent value="all" className="space-y-4">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map(event => (
                <EventListItem key={event.id} event={event} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-4">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredEvents.filter(e => e.status === "upcoming").map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEvents.filter(e => e.status === "upcoming").map(event => (
                <EventListItem key={event.id} event={event} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredEvents.filter(e => e.status === "completed").map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEvents.filter(e => e.status === "completed").map(event => (
                <EventListItem key={event.id} event={event} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
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
  image?: string;
}

interface EventCardProps {
  event: Event;
}

function EventCard({ event }: EventCardProps) {
  // Find the event type to get the color
  const eventType = EVENT_TYPES.find(type => type.id === event.type);
  
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 bg-gray-200">
        <Badge 
          className={`absolute top-3 left-3 ${eventType?.color || 'bg-gray-100 text-gray-800'}`}
        >
          {eventType?.label || event.type}
        </Badge>
        
        {event.status === "completed" && (
          <Badge className="absolute top-3 right-3 bg-gray-100 text-gray-800">
            Completed
          </Badge>
        )}
        
        <div className="h-full flex items-center justify-center">
          {event.type === "webinar" ? (
            <VideoIcon className="h-12 w-12 text-gray-400" />
          ) : (
            <CalendarIcon className="h-12 w-12 text-gray-400" />
          )}
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{event.title}</h3>
        
        <div className="mt-2 space-y-1 text-sm">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="h-4 w-4 mr-2 text-gray-500" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-xs text-gray-600">
            {event.registrations} registrations
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <EditIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ExternalLinkIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Share2Icon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EventListItem({ event }: EventCardProps) {
  // Find the event type to get the color
  const eventType = EVENT_TYPES.find(type => type.id === event.type);
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-md ${eventType?.color || 'bg-gray-100'}`}>
              {event.type === "webinar" ? (
                <VideoIcon className="h-5 w-5" />
              ) : (
                <CalendarIcon className="h-5 w-5" />
              )}
            </div>
            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <CalendarIcon className="h-3 w-3 mr-1" />
                <span>{event.date} • {event.startTime} - {event.endTime}</span>
                <span className="mx-2">|</span>
                <MapPinIcon className="h-3 w-3 mr-1" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              {event.registrations} registrations
            </div>
            {event.status === "completed" ? (
              <Badge className="bg-gray-100 text-gray-800">
                Completed
              </Badge>
            ) : (
              <Badge className="bg-blue-100 text-blue-800">
                Upcoming
              </Badge>
            )}
            <div className="flex">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <EditIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ExternalLinkIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share2Icon className="h-4 w-4" />
              </Button>
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
    registrations: "176/250 registrations"
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
    registrations: "42/50 registrations"
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
    registrations: "342/500 registrations"
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
    registrations: "187/200 registrations"
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
    registrations: "28/40 registrations"
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
    registrations: "112/150 registrations"
  }
];