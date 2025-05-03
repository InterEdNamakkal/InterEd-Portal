import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Key, 
  RefreshCcw, 
  Copy, 
  FileText, 
  Download, 
  Shield, 
  Globe,
  Lock,
  Info
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Authentication() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">API Authentication</h1>
          <p className="text-muted-foreground">
            Manage API keys, permissions, and security settings
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Button variant="outline" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>Documentation</span>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Generate New Key
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys
              </h2>
              
              <div className="space-y-5">
                {apiKeys.map((key) => (
                  <div key={key.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{key.name}</h3>
                          <Badge variant="outline" className={key.active ? "bg-green-50 text-green-800 border-green-100" : "bg-gray-50 text-gray-800 border-gray-100"}>
                            {key.active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Created: {key.created}</p>
                      </div>
                      <div className="flex items-center">
                        <Switch checked={key.active} />
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <Label htmlFor={`key-${key.id}`} className="text-xs text-muted-foreground">
                        API Key
                      </Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          id={`key-${key.id}`}
                          value={key.value}
                          readOnly
                          className="font-mono text-sm bg-gray-50"
                        />
                        <Button variant="outline" size="icon" className="flex-shrink-0">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center text-sm">
                      <div>
                        <span className="text-muted-foreground">Last used: {key.lastUsed}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 text-blue-600">
                          View Usage
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 flex items-center gap-1">
                          <RefreshCcw className="h-3 w-3" />
                          <span>Rotate</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  IP Whitelisting
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Restrict API access to specific IP addresses for enhanced security
                </p>
                
                <div className="space-y-3">
                  {ipWhitelist.map((ip) => (
                    <div key={ip.id} className="flex justify-between items-center p-2 border rounded-md">
                      <div>
                        <div className="font-mono">{ip.address}</div>
                        <div className="text-xs text-muted-foreground">{ip.description}</div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                      </Button>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  Add IP Address
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Rate Limits
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure throttling and quota settings for API endpoints
                </p>
                
                <div className="space-y-4">
                  {rateLimits.map((limit) => (
                    <div key={limit.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{limit.endpoint}</span>
                        <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-100">
                          {limit.limit} / {limit.period}
                        </Badge>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full">
                        <div 
                          className="h-full bg-blue-500 rounded-full" 
                          style={{ width: `${(limit.used / limit.limit) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Used: {limit.used}</span>
                        <span>Remaining: {limit.limit - limit.used}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  Configure Rate Limits
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5" />
                OAuth Applications
              </h2>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>APPLICATION</TableHead>
                    <TableHead>CLIENT ID</TableHead>
                    <TableHead>REDIRECT URI</TableHead>
                    <TableHead>CREATED</TableHead>
                    <TableHead className="text-right">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {oauthApps.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.name}</TableCell>
                      <TableCell className="font-mono text-xs">{app.clientId}</TableCell>
                      <TableCell className="font-mono text-xs truncate max-w-[200px]">{app.redirectUri}</TableCell>
                      <TableCell>{app.created}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Button variant="outline" className="mt-4">
                Register OAuth Application
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Key className="h-4 w-4 mr-2" />
                  Generate API Key
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Rotate All Keys
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Auth Logs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Authentication Methods</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>API Key Authentication</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      API keys should be included in the request header:
                    </p>
                    <pre className="bg-gray-50 p-2 rounded-md text-xs mt-2 font-mono">
                      {`Authorization: Bearer YOUR_API_KEY`}
                    </pre>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>OAuth 2.0</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      OAuth 2.0 is supported for third-party applications.
                      Supported flows: Authorization Code and Client Credentials.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>HMAC Signatures</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      For webhook payloads, we provide HMAC signatures in the
                      X-Signature header for verification.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Security Recommendations</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Rotate API keys every 90 days</li>
                    <li>• Do not embed API keys in client-side code</li>
                    <li>• Enable IP restrictions for production keys</li>
                    <li>• Monitor API usage regularly for unusual patterns</li>
                    <li>• Implement the principle of least privilege</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Mock data
const apiKeys = [
  {
    id: 1,
    name: "Production API Key",
    value: "inted_prod_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    created: "Jan 15, 2025",
    lastUsed: "Mar 30, 2025 (Today)",
    active: true
  },
  {
    id: 2,
    name: "Development API Key",
    value: "inted_dev_z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4",
    created: "Feb 10, 2025",
    lastUsed: "Mar 28, 2025",
    active: true
  },
  {
    id: 3,
    name: "Testing API Key",
    value: "inted_test_j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6",
    created: "Mar 05, 2025",
    lastUsed: "Mar 25, 2025",
    active: false
  }
];

const ipWhitelist = [
  {
    id: 1,
    address: "192.168.1.100",
    description: "Office IP Address"
  },
  {
    id: 2,
    address: "203.0.113.0/24",
    description: "Development Network"
  },
  {
    id: 3,
    address: "198.51.100.75",
    description: "Remote Worker"
  }
];

const rateLimits = [
  {
    id: 1,
    endpoint: "University API",
    limit: 10000,
    period: "hour",
    used: 6782
  },
  {
    id: 2,
    endpoint: "Email API",
    limit: 5000,
    period: "hour",
    used: 4250
  },
  {
    id: 3,
    endpoint: "Payment API",
    limit: 1000,
    period: "hour",
    used: 97
  }
];

const oauthApps = [
  {
    id: 1,
    name: "Student Portal Integration",
    clientId: "client_a1b2c3d4e5f6g7h8i9j0",
    redirectUri: "https://student.portal.example.com/oauth/callback",
    created: "Feb 15, 2025"
  },
  {
    id: 2,
    name: "Mobile App",
    clientId: "client_k1l2m3n4o5p6q7r8s9t0",
    redirectUri: "com.intered.mobile://oauth/callback",
    created: "Mar 10, 2025"
  }
];