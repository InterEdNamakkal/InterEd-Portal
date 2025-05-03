import React from "react";
import { useLocation } from "wouter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { UniversityForm } from "@/components/universities/UniversityForm";

export default function AddUniversity() {
  const [, navigate] = useLocation();

  return (
    <div className="container py-6 px-6">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/universities">Universities</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Add University</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Add University</h1>
        <Button variant="outline" onClick={() => navigate("/universities")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      </div>

      <UniversityForm />
    </div>
  );
}