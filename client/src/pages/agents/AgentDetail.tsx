import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Agent } from "@shared/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Loader2, ArrowLeft, Save } from "lucide-react";

// Form schema for agent data
const agentFormSchema = z.object({
  name: z.string().min(2, { message: "Agent name is required" }),
  contactPerson: z.string().min(2, { message: "Contact person is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().min(2, { message: "Country is required" }),
  status: z.enum(["active", "inactive", "pending", "suspended"]),
  commissionRate: z.coerce.number().min(0).max(100),
  isFeatured: z.boolean().default(false),
  notes: z.string().optional(),
  websiteUrl: z.string().optional(),
});

type AgentFormValues = z.infer<typeof agentFormSchema>;

export default function AgentDetail() {
  const { id } = useParams();
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  const isNewAgent = id === "new";
  const [activeTab, setActiveTab] = useState("details");
  
  // Fetch agent data if editing
  const { data: agent, isLoading } = useQuery({
    queryKey: [`/api/agents/${id}`],
    queryFn: async () => {
      if (isNewAgent) return null;
      const response = await apiRequest("GET", `/api/agents/${id}`);
      return await response.json();
    },
    enabled: !isNewAgent,
  });
  
  // Form setup
  const form = useForm<AgentFormValues>({
    resolver: zodResolver(agentFormSchema),
    defaultValues: {
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      status: "active",
      commissionRate: 10,
      isFeatured: false,
      notes: "",
      websiteUrl: "",
    },
  });
  
  // Update form when agent data is loaded
  useEffect(() => {
    if (agent) {
      form.reset({
        name: agent.name || "",
        contactPerson: agent.contactPerson || "",
        email: agent.email || "",
        phone: agent.phone || "",
        address: agent.address || "",
        city: agent.city || "",
        country: agent.country || "",
        status: agent.status as any || "active",
        commissionRate: agent.commissionRate || 10,
        isFeatured: agent.isFeatured || false,
        notes: agent.notes || "",
        websiteUrl: agent.websiteUrl || "",
      });
    }
  }, [agent, form]);
  
  // Create/Update mutation
  const mutation = useMutation({
    mutationFn: async (data: AgentFormValues) => {
      if (isNewAgent) {
        const response = await apiRequest("POST", "/api/agents", data);
        return await response.json();
      } else {
        const response = await apiRequest("PUT", `/api/agents/${id}`, data);
        return await response.json();
      }
    },
    onSuccess: (data) => {
      toast({
        title: isNewAgent ? "Agent created" : "Agent updated",
        description: isNewAgent 
          ? "New agent has been successfully created" 
          : "Agent has been successfully updated",
      });
      
      queryClient.invalidateQueries({ queryKey: ['/api/agents'] });
      
      if (isNewAgent) {
        // Navigate to the new agent's detail page
        navigate(`/agents/${data.id}`);
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: isNewAgent
          ? "Failed to create agent"
          : "Failed to update agent",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: AgentFormValues) => {
    mutation.mutate(data);
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <PageHeader
        title={isNewAgent ? "Add New Agent" : `Agent: ${agent?.name || ""}`}
        description={isNewAgent ? "Create a new recruitment agent" : "View and edit agent details"}
        actions={
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate("/agents")}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Agents
            </Button>
          </div>
        }
      />
      
      {isLoading && !isNewAgent ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="business">Business Info</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Agent Information</CardTitle>
                    <CardDescription>
                      Basic information about the recruitment agent
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Agency Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Global Education Partners" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="contactPerson"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Contact</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. John Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="agent@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. London" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. United Kingdom" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="websiteUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. https://agent.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="business" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Information</CardTitle>
                    <CardDescription>
                      Commission, status, and other business details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="suspended">Suspended</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="commissionRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Commission Rate (%)</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" max="100" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="isFeatured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between space-y-0 rounded-md border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Featured Agent</FormLabel>
                            <FormDescription>
                              Featured agents appear first in the agent directory
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notes" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notes & Additional Information</CardTitle>
                    <CardDescription>
                      Add any additional notes about this agent
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Add any additional information about this agent..."
                              className="min-h-[200px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={mutation.isPending}
                className="flex items-center"
              >
                {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                {isNewAgent ? "Create Agent" : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}