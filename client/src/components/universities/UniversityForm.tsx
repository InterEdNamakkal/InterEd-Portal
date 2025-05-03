import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { insertUniversitySchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useUniversityMutations } from "@/hooks/useUniversities";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { COUNTRIES } from "@/lib/constants";
import { University } from "@shared/schema";

// Extended schema with validation
const formSchema = insertUniversitySchema.extend({
  name: z.string().min(1, { message: "University name is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  contactEmail: z.string().email({ message: "Invalid email address" }).optional().nullable(),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().nullable(),
});

type UniversityFormValues = z.infer<typeof formSchema>;

interface UniversityFormProps {
  university?: University;
  isEditing?: boolean;
}

export function UniversityForm({ university, isEditing = false }: UniversityFormProps) {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const { createUniversityMutation, updateUniversityMutation } = useUniversityMutations();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with university data or defaults
  const form = useForm<UniversityFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: university?.name || "",
      country: university?.country || "",
      city: university?.city || "",
      province: university?.province || "",
      tier: university?.tier || "tier3",
      status: university?.status || "active",
      website: university?.website || "",
      logo: university?.logo || "",
      contactName: university?.contactName || "",
      contactEmail: university?.contactEmail || "",
      contactPhone: university?.contactPhone || "",
      agreementStatus: university?.agreementStatus || "none",
      agreementDate: university?.agreementDate ? new Date(university.agreementDate).toISOString().split('T')[0] : "",
      agreementExpiry: university?.agreementExpiry ? new Date(university.agreementExpiry).toISOString().split('T')[0] : "",
      commissionRate: university?.commissionRate || 0,
      notes: university?.notes || "",
      tags: university?.tags || [],
    },
  });

  // Handle form submission
  const onSubmit = async (data: UniversityFormValues) => {
    try {
      setIsSubmitting(true);

      if (isEditing && university) {
        await updateUniversityMutation.mutateAsync({
          id: university.id,
          data,
        });
        toast({
          title: "University updated",
          description: "The university has been updated successfully.",
        });
        navigate(`/universities/${university.id}`);
      } else {
        const newUniversity = await createUniversityMutation.mutateAsync(data);
        toast({
          title: "University created",
          description: "The university has been created successfully.",
        });
        navigate(`/universities/${newUniversity.id}`);
      }
    } catch (error) {
      console.error("Error submitting university form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">University Information</h3>
            
            {/* University Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Harvard University" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {COUNTRIES.map((country) => (
                          <SelectItem key={country.code} value={country.name}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Cambridge" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/Province</FormLabel>
                  <FormControl>
                    <Input placeholder="Massachusetts" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* University Website */}
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.harvard.edu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* University Tier */}
            <FormField
              control={form.control}
              name="tier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University Tier</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tier" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="tier1">Tier 1 (Premium)</SelectItem>
                      <SelectItem value="tier2">Tier 2 (Standard)</SelectItem>
                      <SelectItem value="tier3">Tier 3 (Basic)</SelectItem>
                      <SelectItem value="tier4">Tier 4 (Entry-Level)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Determines the university's ranking and fee structure
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* University Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
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
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium">Contact Information</h3>
            
            {/* Contact Name */}
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Input placeholder="John Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Email */}
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.smith@harvard.edu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Phone */}
            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h3 className="text-lg font-medium pt-2">Agreement Details</h3>

            {/* Agreement Status */}
            <FormField
              control={form.control}
              name="agreementStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agreement Status</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select agreement status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="renewal">Renewal</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Agreement Dates */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="agreementDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agreement Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agreementExpiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Commission Rate */}
            <FormField
              control={form.control}
              name="commissionRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commission Rate (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="15"
                      step="0.1" 
                      {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Percentage of fees received as commission
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Additional information about the university..."
                  className="h-24"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(isEditing ? `/universities/${university?.id}` : "/universities")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="animate-spin mr-2">⋯</span>
                {isEditing ? "Updating..." : "Creating..."}
              </>
            ) : (
              isEditing ? "Update University" : "Create University"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}