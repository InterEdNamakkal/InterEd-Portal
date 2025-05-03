import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest, getQueryFn } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { University } from "@shared/schema";

// Fetch all universities
export function useUniversities() {
  return useQuery<University[]>({
    queryKey: ["/api/universities"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Fetch filtered universities
export function useFilteredUniversities(filter: string) {
  const { data: universities = [], isLoading, error } = useUniversities();
  
  let filteredUniversities = [...universities];
  
  // Apply filters
  if (filter === "active") {
    filteredUniversities = universities.filter((university: University) => university.status === 'active');
  } else if (filter === "inactive") {
    filteredUniversities = universities.filter((university: University) => university.status === 'inactive');
  } else if (filter === "tier1") {
    filteredUniversities = universities.filter((university: University) => university.tier === 'tier1');
  } else if (filter === "tier2") {
    filteredUniversities = universities.filter((university: University) => university.tier === 'tier2');
  } else if (filter === "tier3") {
    filteredUniversities = universities.filter((university: University) => university.tier === 'tier3');
  } else if (filter === "tier4") {
    filteredUniversities = universities.filter((university: University) => university.tier === 'tier4');
  }
  
  return { data: filteredUniversities, isLoading, error };
}

// Fetch a specific university by ID
export function useUniversity(id: number) {
  return useQuery<University>({
    queryKey: ["/api/universities", id],
    queryFn: getQueryFn(),
  });
}

// Fetch programs for a specific university
export function useUniversityPrograms(universityId: number) {
  return useQuery({
    queryKey: ["/api/programs/university", universityId],
    queryFn: getQueryFn(),
  });
}

// Mutations for university data
export function useUniversityMutations() {
  const { toast } = useToast();

  // Create university mutation
  const createUniversityMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/universities", data);
      if (res) return await res.json();
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/universities"] });
    },
    onError: (error: Error) => {
      toast({
        title: "University creation failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update university mutation
  const updateUniversityMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await apiRequest("PUT", `/api/universities/${id}`, data);
      if (res) return await res.json();
      return null;
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["/api/universities"] });
        queryClient.invalidateQueries({ queryKey: ["/api/universities", data.id] });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "University update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete university mutation
  const deleteUniversityMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/universities/${id}`);
      if (res) return await res.json();
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/universities"] });
    },
    onError: (error: Error) => {
      toast({
        title: "University deletion failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    createUniversityMutation,
    updateUniversityMutation,
    deleteUniversityMutation,
  };
}