import React, { useState } from "react";
import { University } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { useUniversityMutations } from "@/hooks/useUniversities";
import { 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Eye, 
  School, 
  Mail, 
  Globe, 
  Phone, 
  MapPin 
} from "lucide-react";

interface UniversityTableProps {
  universities: University[];
}

export function UniversityTable({ universities }: UniversityTableProps) {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { deleteUniversityMutation } = useUniversityMutations();
  
  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'tier1':
        return 'bg-purple-500';
      case 'tier2':
        return 'bg-blue-500';
      case 'tier3':
        return 'bg-gray-500';
      case 'tier4':
        return 'bg-slate-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusBadgeColor = (status: string) => {
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

  const formatTierLabel = (tier: string) => {
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
        return tier;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUniversityMutation.mutateAsync(id);
      toast({
        title: "University deleted",
        description: "The university has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete university.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {universities.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No universities found.
              </TableCell>
            </TableRow>
          ) : (
            universities.map((university) => (
              <TableRow key={university.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <School className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div>{university.name}</div>
                      {university.website && (
                        <a 
                          href={university.website.startsWith('http') ? university.website : `https://${university.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:underline flex items-center"
                        >
                          <Globe className="h-3 w-3 mr-1" />
                          {university.website}
                        </a>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      {university.city && university.country ? (
                        <span>{university.city}, {university.country}</span>
                      ) : (
                        <span>{university.country || 'Unknown location'}</span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`${getTierBadgeColor(university.tier || 'tier3')}`}>
                    {formatTierLabel(university.tier || 'tier3')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={`${getStatusBadgeColor(university.status || 'inactive')}`}>
                    {university.status || 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {university.contactName && (
                      <div className="text-sm">{university.contactName}</div>
                    )}
                    {university.contactEmail && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Mail className="h-3 w-3 mr-1" />
                        {university.contactEmail}
                      </div>
                    )}
                    {university.contactPhone && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Phone className="h-3 w-3 mr-1" />
                        {university.contactPhone}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem 
                        onClick={() => setLocation(`/universities/${university.id}`)}
                        className="cursor-pointer"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setLocation(`/universities/${university.id}/edit`)}
                        className="cursor-pointer"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setLocation(`/universities/${university.id}/programs`)}
                        className="cursor-pointer"
                      >
                        <School className="h-4 w-4 mr-2" />
                        View programs
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleDelete(university.id)}
                        className="cursor-pointer text-red-600 focus:text-red-700"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}