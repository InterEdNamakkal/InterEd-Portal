import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Copy, Download, ArrowRight, FileText, Terminal, Code, Database } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_METHOD_COLORS } from "@/lib/constants";

export default function Documentation() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">API Documentation</h1>
          <p className="text-muted-foreground">
            Comprehensive guides and reference materials for all API endpoints
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Download OpenAPI Spec</span>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Get API Keys
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search documentation..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium mb-3">Categories</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`w-full text-left px-3 py-1.5 text-sm rounded-md ${
                        activeCategory === category.id
                          ? "bg-blue-100 text-blue-800 font-medium"
                          : "text-muted-foreground hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">Resources</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-muted-foreground" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Getting Started Guide
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-muted-foreground" size="sm">
                    <Terminal className="h-4 w-4 mr-2" />
                    API Client Libraries
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-muted-foreground" size="sm">
                    <Code className="h-4 w-4 mr-2" />
                    Code Examples
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-muted-foreground" size="sm">
                    <Database className="h-4 w-4 mr-2" />
                    Data Models
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
              <p>
                Our support team is available to help with any API integration questions you might have.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-3 space-y-6">
          <Card className="overflow-hidden">
            <CardHeader className="bg-blue-50 border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>InterEd API v1.0</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Base URL: <code className="font-mono text-xs bg-blue-100 px-1 py-0.5 rounded">https://api.intered.edu/v1</code>
                  </p>
                </div>
                <Select defaultValue="v1.0">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="API Version" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="v1.0">v1.0 (Current)</SelectItem>
                    <SelectItem value="v0.9">v0.9 (Legacy)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <div className="prose max-w-none">
                <p>
                  The InterEd API provides programmatic access to student data, application workflows, 
                  university information, and other resources for educational recruitment. This RESTful 
                  API uses standard HTTP methods and returns JSON responses.
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-2">Authentication</h3>
                <p>
                  All API requests require authentication using API keys. Include your API key in the
                  request header:
                </p>
                <div className="bg-gray-50 p-3 rounded-md font-mono text-sm overflow-x-auto my-3">
                  <pre>Authorization: Bearer YOUR_API_KEY</pre>
                </div>
                
                <h3 className="text-lg font-medium mt-6 mb-2">Rate Limits</h3>
                <p>
                  The API has rate limits to ensure fair usage. Default limits are:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>10,000 requests per hour for University APIs</li>
                  <li>5,000 requests per hour for Email APIs</li>
                  <li>1,000 requests per hour for Payment APIs</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">API Reference</h2>
            <Tabs defaultValue="students" className="w-full">
              <TabsList className="w-full bg-background border-b rounded-none justify-start px-0 mb-4">
                <TabsTrigger value="students" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 font-medium text-muted-foreground data-[state=active]:text-primary">
                  Students
                </TabsTrigger>
                <TabsTrigger value="applications" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 font-medium text-muted-foreground data-[state=active]:text-primary">
                  Applications
                </TabsTrigger>
                <TabsTrigger value="universities" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 font-medium text-muted-foreground data-[state=active]:text-primary">
                  Universities
                </TabsTrigger>
                <TabsTrigger value="programs" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 font-medium text-muted-foreground data-[state=active]:text-primary">
                  Programs
                </TabsTrigger>
                <TabsTrigger value="agents" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 font-medium text-muted-foreground data-[state=active]:text-primary">
                  Agents
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="students" className="space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  {studentEndpoints.map((endpoint) => (
                    <EndpointAccordionItem 
                      key={endpoint.id}
                      endpoint={endpoint}
                    />
                  ))}
                </Accordion>
              </TabsContent>
              
              <TabsContent value="applications" className="space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  {applicationEndpoints.map((endpoint) => (
                    <EndpointAccordionItem 
                      key={endpoint.id}
                      endpoint={endpoint}
                    />
                  ))}
                </Accordion>
              </TabsContent>
              
              <TabsContent value="universities" className="space-y-4">
                <p className="text-muted-foreground text-center py-8">Select a different category to view endpoints.</p>
              </TabsContent>
              
              <TabsContent value="programs" className="space-y-4">
                <p className="text-muted-foreground text-center py-8">Select a different category to view endpoints.</p>
              </TabsContent>
              
              <TabsContent value="agents" className="space-y-4">
                <p className="text-muted-foreground text-center py-8">Select a different category to view endpoints.</p>
              </TabsContent>
            </Tabs>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Example Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Request (JavaScript)</h3>
                  <div className="bg-gray-950 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>{`fetch('https://api.intered.edu/v1/students', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}</pre>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Response</h3>
                  <div className="bg-gray-950 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>{`[
  {
    "id": 1,
    "firstName": "Aditya",
    "lastName": "Patel",
    "email": "aditya.patel@example.com",
    "phone": "+91 98765 43210",
    "status": "active",
    "stage": "application",
    "nationality": "Indian",
    "createdAt": "2025-01-15T10:30:00Z",
    "updatedAt": "2025-03-22T14:15:00Z"
  },
  {
    "id": 2,
    "firstName": "Mei",
    "lastName": "Chen",
    "email": "mei.chen@example.com",
    "phone": "+86 131 2345 6789",
    "status": "active",
    "stage": "visa",
    "nationality": "Chinese",
    "createdAt": "2025-02-10T08:45:00Z",
    "updatedAt": "2025-03-25T11:20:00Z"
  }
]`}</pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface EndpointProps {
  endpoint: {
    id: number;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    path: string;
    description: string;
    parameters?: {
      name: string;
      type: string;
      required: boolean;
      description: string;
    }[];
    responses?: {
      code: number;
      description: string;
    }[];
  };
}

function EndpointAccordionItem({ endpoint }: EndpointProps) {
  return (
    <AccordionItem value={`endpoint-${endpoint.id}`} className="border rounded-md mb-3 overflow-hidden">
      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50">
        <div className="flex items-center gap-3 text-left">
          <Badge variant="outline" className={`${API_METHOD_COLORS[endpoint.method].bgColor} ${API_METHOD_COLORS[endpoint.method].textColor} border-transparent font-mono`}>
            {endpoint.method}
          </Badge>
          <span className="font-mono text-sm">{endpoint.path}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 py-3 border-t bg-gray-50">
        <div className="space-y-4">
          <p className="text-sm">{endpoint.description}</p>
          
          {endpoint.parameters && endpoint.parameters.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Parameters</h4>
              <div className="bg-white border rounded-md overflow-hidden">
                <div className="grid grid-cols-4 gap-4 p-3 border-b bg-gray-50 text-xs font-medium">
                  <div>NAME</div>
                  <div>TYPE</div>
                  <div>REQUIRED</div>
                  <div>DESCRIPTION</div>
                </div>
                {endpoint.parameters.map((param, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 p-3 text-sm border-b last:border-b-0">
                    <div className="font-mono text-xs">{param.name}</div>
                    <div className="font-mono text-xs">{param.type}</div>
                    <div>{param.required ? "Yes" : "No"}</div>
                    <div className="text-xs">{param.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {endpoint.responses && endpoint.responses.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Responses</h4>
              <div className="bg-white border rounded-md overflow-hidden">
                <div className="grid grid-cols-2 gap-4 p-3 border-b bg-gray-50 text-xs font-medium">
                  <div>CODE</div>
                  <div>DESCRIPTION</div>
                </div>
                {endpoint.responses.map((response, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 p-3 text-sm border-b last:border-b-0">
                    <div>
                      <Badge variant="outline" className={response.code >= 400 ? "bg-red-100 text-red-800 border-red-200" : "bg-green-100 text-green-800 border-green-200"}>
                        {response.code}
                      </Badge>
                    </div>
                    <div className="text-xs">{response.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              Try it out <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

// Mock data
const categories = [
  { id: "all", name: "All APIs" },
  { id: "students", name: "Students" },
  { id: "applications", name: "Applications" },
  { id: "universities", name: "Universities" },
  { id: "programs", name: "Programs" },
  { id: "agents", name: "Agents" },
  { id: "payments", name: "Payments" },
  { id: "communication", name: "Communication" },
  { id: "documents", name: "Documents" },
  { id: "webhooks", name: "Webhooks" },
];

const studentEndpoints = [
  {
    id: 1,
    method: "GET" as const,
    path: "/students",
    description: "Returns a list of all students.",
    parameters: [
      {
        name: "status",
        type: "string",
        required: false,
        description: "Filter students by status (active, inactive, etc.)"
      },
      {
        name: "stage",
        type: "string",
        required: false,
        description: "Filter students by stage (inquiry, application, etc.)"
      },
      {
        name: "limit",
        type: "integer",
        required: false,
        description: "Maximum number of records to return (default: 100)"
      },
      {
        name: "offset",
        type: "integer",
        required: false,
        description: "Number of records to skip (default: 0)"
      }
    ],
    responses: [
      {
        code: 200,
        description: "A list of student objects"
      },
      {
        code: 401,
        description: "Authentication error"
      }
    ]
  },
  {
    id: 2,
    method: "GET" as const,
    path: "/students/{id}",
    description: "Returns details for a specific student.",
    parameters: [
      {
        name: "id",
        type: "integer",
        required: true,
        description: "The student ID"
      }
    ],
    responses: [
      {
        code: 200,
        description: "A student object"
      },
      {
        code: 404,
        description: "Student not found"
      },
      {
        code: 401,
        description: "Authentication error"
      }
    ]
  },
  {
    id: 3,
    method: "POST" as const,
    path: "/students",
    description: "Creates a new student record.",
    parameters: [
      {
        name: "firstName",
        type: "string",
        required: true,
        description: "Student's first name"
      },
      {
        name: "lastName",
        type: "string",
        required: true,
        description: "Student's last name"
      },
      {
        name: "email",
        type: "string",
        required: true,
        description: "Student's email address"
      },
      {
        name: "phone",
        type: "string",
        required: false,
        description: "Student's phone number"
      },
      {
        name: "nationality",
        type: "string",
        required: false,
        description: "Student's nationality"
      }
    ],
    responses: [
      {
        code: 201,
        description: "Student created successfully"
      },
      {
        code: 400,
        description: "Invalid request data"
      },
      {
        code: 401,
        description: "Authentication error"
      }
    ]
  },
  {
    id: 4,
    method: "PUT" as const,
    path: "/students/{id}",
    description: "Updates an existing student record.",
    parameters: [
      {
        name: "id",
        type: "integer",
        required: true,
        description: "The student ID"
      },
      {
        name: "firstName",
        type: "string",
        required: false,
        description: "Student's first name"
      },
      {
        name: "lastName",
        type: "string",
        required: false,
        description: "Student's last name"
      },
      {
        name: "email",
        type: "string",
        required: false,
        description: "Student's email address"
      },
      {
        name: "phone",
        type: "string",
        required: false,
        description: "Student's phone number"
      },
      {
        name: "status",
        type: "string",
        required: false,
        description: "Student's status"
      },
      {
        name: "stage",
        type: "string",
        required: false,
        description: "Student's stage"
      }
    ],
    responses: [
      {
        code: 200,
        description: "Student updated successfully"
      },
      {
        code: 400,
        description: "Invalid request data"
      },
      {
        code: 404,
        description: "Student not found"
      },
      {
        code: 401,
        description: "Authentication error"
      }
    ]
  },
  {
    id: 5,
    method: "DELETE" as const,
    path: "/students/{id}",
    description: "Deletes a student record.",
    parameters: [
      {
        name: "id",
        type: "integer",
        required: true,
        description: "The student ID"
      }
    ],
    responses: [
      {
        code: 204,
        description: "Student deleted successfully"
      },
      {
        code: 404,
        description: "Student not found"
      },
      {
        code: 401,
        description: "Authentication error"
      }
    ]
  }
];

const applicationEndpoints = [
  {
    id: 1,
    method: "GET" as const,
    path: "/applications",
    description: "Returns a list of all applications.",
    parameters: [
      {
        name: "stage",
        type: "string",
        required: false,
        description: "Filter applications by stage (document_collection, under_review, etc.)"
      },
      {
        name: "status",
        type: "string",
        required: false,
        description: "Filter applications by status (active, completed, etc.)"
      },
      {
        name: "limit",
        type: "integer",
        required: false,
        description: "Maximum number of records to return (default: 100)"
      },
      {
        name: "offset",
        type: "integer",
        required: false,
        description: "Number of records to skip (default: 0)"
      }
    ],
    responses: [
      {
        code: 200,
        description: "A list of application objects"
      },
      {
        code: 401,
        description: "Authentication error"
      }
    ]
  },
  {
    id: 2,
    method: "GET" as const,
    path: "/applications/{id}",
    description: "Returns details for a specific application.",
    parameters: [
      {
        name: "id",
        type: "integer",
        required: true,
        description: "The application ID"
      }
    ],
    responses: [
      {
        code: 200,
        description: "An application object"
      },
      {
        code: 404,
        description: "Application not found"
      },
      {
        code: 401,
        description: "Authentication error"
      }
    ]
  },
  {
    id: 3,
    method: "POST" as const,
    path: "/applications",
    description: "Creates a new application.",
    parameters: [
      {
        name: "studentId",
        type: "integer",
        required: true,
        description: "ID of the student"
      },
      {
        name: "universityId",
        type: "integer",
        required: true,
        description: "ID of the university"
      },
      {
        name: "programId",
        type: "integer",
        required: true,
        description: "ID of the program"
      },
      {
        name: "intake",
        type: "string",
        required: true,
        description: "Intake period (e.g., 'Fall 2025')"
      }
    ],
    responses: [
      {
        code: 201,
        description: "Application created successfully"
      },
      {
        code: 400,
        description: "Invalid request data"
      },
      {
        code: 401,
        description: "Authentication error"
      }
    ]
  },
  {
    id: 4,
    method: "PUT" as const,
    path: "/applications/{id}",
    description: "Updates an existing application.",
    parameters: [
      {
        name: "id",
        type: "integer",
        required: true,
        description: "The application ID"
      },
      {
        name: "stage",
        type: "string",
        required: false,
        description: "Application stage"
      },
      {
        name: "status",
        type: "string",
        required: false,
        description: "Application status"
      },
      {
        name: "notes",
        type: "string",
        required: false,
        description: "Application notes"
      }
    ],
    responses: [
      {
        code: 200,
        description: "Application updated successfully"
      },
      {
        code: 400,
        description: "Invalid request data"
      },
      {
        code: 404,
        description: "Application not found"
      },
      {
        code: 401,
        description: "Authentication error"
      }
    ]
  }
];