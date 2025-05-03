import React, { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useUniversity, useUniversityPrograms } from "@/hooks/useUniversities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useToast } from "@/hooks/use-toast";
import { UniversityForm } from "@/components/universities/UniversityForm";
import {
  ArrowLeft,
  Edit,
  Globe,
  Mail,
  MapPin,
  Phone,
  School,
  AlertTriangle,
  Calendar,
  Clock,
  Percent,
  Building,
  Bookmark,
  FileText,
  FileSpreadsheet,
  PieChart,
  Users,
  BarChart2,
} from "lucide-react";

export default function UniversityDetail() {
  const [, params] = useRoute("/universities/:id");
  const [, params2] = useRoute("/universities/:id/edit");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Get university ID either from view or edit route
  const universityId = params?.id || params2?.id;
  
  // Fetch university data
  const { data: university, isLoading, error } = useUniversity(Number(universityId));
  
  // Fetch university programs
  const { data: programs = [] } = useUniversityPrograms(Number(universityId));

  // Check if we're on the edit path
  useEffect(() => {
    if (params2?.id) {
      setIsEditMode(true);
    }
  }, [params2]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load university details.",
      });
    }
  }, [error, toast]);

  // Format tier display
  const formatTier = (tier: string | undefined) => {
    switch (tier) {
      case 'tier1':
        return 'Tier 1';
      case 'tier2':
        return 'Tier 2';
      case 'tier3':
        return 'Tier 3';
      case 'tier4':
        return 'Tier 4';
      default:
        return 'Not Assigned';
    }
  };

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string | undefined) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'inactive':
        return 'bg-red-500';
      case 'pending':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get agreement status badge color
  const getAgreementStatusBadgeColor = (status: string | undefined) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'expired':
        return 'bg-red-500';
      case 'renewal':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Calculate days until expiry
  const getDaysUntilExpiry = (expiryDate: string | null) => {
    if (!expiryDate) return null;
    
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  if (isLoading) {
    return (
      <div className="container py-6 px-6">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="container py-6 px-6">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>University not found.</AlertDescription>
        </Alert>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate("/universities")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Universities
        </Button>
      </div>
    );
  }

  // If in edit mode, render the form
  if (isEditMode) {
    return (
      <div className="container py-6 px-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/universities">Universities</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/universities/${university.id}`}>
                {university.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Edit</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Edit University</h1>
          <Button variant="outline" onClick={() => navigate(`/universities/${university.id}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </div>

        <UniversityForm university={university} isEditing={true} />
      </div>
    );
  }

  // Days until expiry
  const daysUntilExpiry = getDaysUntilExpiry(university.agreementExpiry as string);
  
  return (
    <div className="container py-6 px-6">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/universities">Universities</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{university.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{university.name}</h1>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={() => navigate("/universities")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={() => navigate(`/universities/${university.id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-3">
          <Badge className={getStatusBadgeColor(university.status)} variant="secondary">
            {university.status || "Unknown Status"}
          </Badge>
          <Badge variant="outline">{formatTier(university.tier)}</Badge>
          {university.agreementStatus && university.agreementStatus !== "none" && (
            <Badge className={getAgreementStatusBadgeColor(university.agreementStatus)} variant="secondary">
              Agreement: {university.agreementStatus}
            </Badge>
          )}
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="programs">Programs ({programs.length})</TabsTrigger>
          <TabsTrigger value="agreements">Agreement</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basic Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">University Name</dt>
                    <dd className="mt-1 flex items-center">
                      <School className="mr-2 h-4 w-4 text-gray-400" />
                      {university.name}
                    </dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Location</dt>
                    <dd className="mt-1 flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                      {university.city ? `${university.city}, ` : ""}
                      {university.province ? `${university.province}, ` : ""}
                      {university.country || "Unknown"}
                    </dd>
                  </div>
                  
                  {university.website && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Website</dt>
                      <dd className="mt-1">
                        <a
                          href={university.website.startsWith("http") ? university.website : `https://${university.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:underline"
                        >
                          <Globe className="mr-2 h-4 w-4" />
                          {university.website}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>

            {/* Contact Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  {university.contactName && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Contact Person</dt>
                      <dd className="mt-1 flex items-center">
                        <Users className="mr-2 h-4 w-4 text-gray-400" />
                        {university.contactName}
                      </dd>
                    </div>
                  )}
                  
                  {university.contactEmail && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1">
                        <a
                          href={`mailto:${university.contactEmail}`}
                          className="flex items-center text-blue-600 hover:underline"
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          {university.contactEmail}
                        </a>
                      </dd>
                    </div>
                  )}
                  
                  {university.contactPhone && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Phone</dt>
                      <dd className="mt-1">
                        <a
                          href={`tel:${university.contactPhone}`}
                          className="flex items-center text-blue-600 hover:underline"
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          {university.contactPhone}
                        </a>
                      </dd>
                    </div>
                  )}

                  {!university.contactName && !university.contactEmail && !university.contactPhone && (
                    <div className="text-gray-500 italic">
                      No contact information available
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>

            {/* Agreement Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Agreement Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="mt-1">
                      <Badge className={getAgreementStatusBadgeColor(university.agreementStatus)}>
                        {university.agreementStatus || "None"}
                      </Badge>
                    </dd>
                  </div>
                  
                  {university.agreementDate && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                      <dd className="mt-1 flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                        {formatDate(university.agreementDate as string)}
                      </dd>
                    </div>
                  )}
                  
                  {university.agreementExpiry && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Expiry Date</dt>
                      <dd className="mt-1 flex flex-col">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-gray-400" />
                          {formatDate(university.agreementExpiry as string)}
                        </div>
                        
                        {daysUntilExpiry !== null && (
                          <div className={`text-sm mt-1 ${daysUntilExpiry < 30 ? 'text-red-500' : 'text-green-500'}`}>
                            {daysUntilExpiry < 0 
                              ? `Expired ${Math.abs(daysUntilExpiry)} days ago` 
                              : `${daysUntilExpiry} days remaining`}
                          </div>
                        )}
                      </dd>
                    </div>
                  )}
                  
                  {university.commissionRate !== null && university.commissionRate !== undefined && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Commission Rate</dt>
                      <dd className="mt-1 flex items-center">
                        <Percent className="mr-2 h-4 w-4 text-gray-400" />
                        {university.commissionRate}%
                      </dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>
          </div>

          {/* Notes Section */}
          {university.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{university.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Program Count Card */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Programs</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/universities/${university.id}/programs`)}
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {programs.length === 0 ? (
                <div className="text-center py-6">
                  <Building className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No Programs</h3>
                  <p className="mt-1 text-sm text-gray-500">No programs available for this university.</p>
                  <div className="mt-6">
                    <Button onClick={() => navigate(`/universities/${university.id}/programs/add`)}>
                      Add Program
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {programs.slice(0, 5).map((program: any) => (
                    <div 
                      key={program.id} 
                      className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate(`/universities/${university.id}/programs/${program.id}`)}
                    >
                      <div className="flex items-center">
                        <Bookmark className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <h4 className="text-sm font-medium">{program.name}</h4>
                          <p className="text-xs text-gray-500">{program.degreeType} • {program.duration}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{program.status}</Badge>
                    </div>
                  ))}
                  {programs.length > 5 && (
                    <Button 
                      variant="link" 
                      onClick={() => setActiveTab("programs")}
                      className="w-full text-blue-600"
                    >
                      View {programs.length - 5} more programs
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Programs ({programs.length})</CardTitle>
                <Button onClick={() => navigate(`/universities/${university.id}/programs/add`)}>
                  Add Program
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {programs.length === 0 ? (
                <div className="text-center py-10">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No Programs</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating a new program.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {programs.map((program: any) => (
                    <div
                      key={program.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate(`/universities/${university.id}/programs/${program.id}`)}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{program.name}</h3>
                        <Badge variant="outline">{program.degreeType}</Badge>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 mr-2" />
                          {program.duration || "Duration not specified"}
                        </div>
                        <div className="flex items-center mt-1">
                          <FileSpreadsheet className="h-4 w-4 mr-2" />
                          {program.applicationItems ? `${program.applicationItems.length} required items` : "No application items"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agreements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agreement Details</CardTitle>
            </CardHeader>
            <CardContent>
              {university.agreementStatus === "none" || !university.agreementStatus ? (
                <div className="text-center py-10">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No Agreement</h3>
                  <p className="mt-1 text-sm text-gray-500">There is no agreement in place with this university.</p>
                  <div className="mt-6">
                    <Button onClick={() => navigate(`/universities/${university.id}/edit`)}>
                      Add Agreement
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-500">Status</h3>
                      <div className="mt-2">
                        <Badge className={getAgreementStatusBadgeColor(university.agreementStatus)}>
                          {university.agreementStatus}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
                      <div className="mt-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {formatDate(university.agreementDate as string)}
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-500">Expiry Date</h3>
                      <div className="mt-2 flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        {formatDate(university.agreementExpiry as string)}
                      </div>
                      {daysUntilExpiry !== null && (
                        <div className={`text-sm mt-2 ${daysUntilExpiry < 30 ? 'text-red-500' : 'text-green-500'}`}>
                          {daysUntilExpiry < 0 
                            ? `Expired ${Math.abs(daysUntilExpiry)} days ago` 
                            : `${daysUntilExpiry} days remaining`}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500">Commission Details</h3>
                    <div className="mt-2 flex items-center">
                      <Percent className="h-4 w-4 mr-2 text-gray-400" />
                      Commission Rate: {university.commissionRate || 0}%
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500">Agreement Actions</h3>
                    <div className="mt-4 flex gap-4">
                      <Button variant="outline" onClick={() => navigate(`/universities/${university.id}/agreements/view`)}>
                        View Document
                      </Button>
                      <Button variant="outline" onClick={() => navigate(`/universities/${university.id}/agreements/renew`)}>
                        Renew Agreement
                      </Button>
                      <Button variant="outline" onClick={() => navigate(`/universities/${university.id}/edit`)}>
                        Edit Details
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>University Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <PieChart className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Analytics Coming Soon</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Student enrollment data, application success rates, and revenue metrics will be available here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}