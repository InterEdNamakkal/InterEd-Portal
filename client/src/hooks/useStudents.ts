import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Student, InsertStudent } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// Hook to fetch all students
export function useStudents() {
  const { data: students = [], isLoading, error } = useQuery<Student[]>({
    queryKey: ['/api/students'],
  });
  
  return { students, isLoading, error };
}

// Hook to fetch a single student by ID
export function useStudent(id: number | string) {
  const { data: student, isLoading, error } = useQuery<Student>({
    queryKey: ['/api/students', id],
    enabled: !!id, // Only run query if id is provided
  });
  
  return { student, isLoading, error };
}

// Hook to create, update and delete students
export function useStudentMutations() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // Create a new student
  const createStudent = useMutation<Student, Error, InsertStudent>({
    mutationFn: async (student: InsertStudent) => {
      const response = await apiRequest('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });
      const data = await response.json();
      return data as Student;
    },
    onSuccess: () => {
      toast({
        title: 'Student Created',
        description: 'Student was created successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/students'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats/students/stage-counts'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create student',
        variant: 'destructive',
      });
    },
  });
  
  // Update an existing student
  const updateStudent = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertStudent> }) => {
      const response = await apiRequest(`/api/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result as Student;
    },
    onSuccess: (updatedStudent) => {
      toast({
        title: 'Student Updated',
        description: 'Student was updated successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/students'] });
      queryClient.invalidateQueries({ queryKey: ['/api/students', updatedStudent.id] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats/students/stage-counts'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update student',
        variant: 'destructive',
      });
    },
  });
  
  // Delete a student
  const deleteStudent = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest(`/api/students/${id}`, {
        method: 'DELETE',
      });
      return id;
    },
    onSuccess: (id) => {
      toast({
        title: 'Student Deleted',
        description: 'Student was deleted successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/students'] });
      queryClient.invalidateQueries({ queryKey: ['/api/students', id] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats/students/stage-counts'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete student',
        variant: 'destructive',
      });
    },
  });
  
  // Toggle student priority status
  const toggleStudentPriority = useMutation({
    mutationFn: async ({ id, isHighPriority }: { id: number; isHighPriority: boolean }) => {
      const response = await apiRequest(`/api/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isHighPriority }),
      });
      const result = await response.json();
      return result as Student;
    },
    onSuccess: (updatedStudent) => {
      toast({
        title: updatedStudent.isHighPriority ? 'Marked as Priority' : 'Priority Removed',
        description: `Student ${updatedStudent.firstName} ${updatedStudent.lastName} was ${updatedStudent.isHighPriority ? 'marked as priority' : 'removed from priority'}`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/students'] });
      queryClient.invalidateQueries({ queryKey: ['/api/students', updatedStudent.id] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update student priority',
        variant: 'destructive',
      });
    },
  });
  
  return { createStudent, updateStudent, deleteStudent, toggleStudentPriority };
}

// Hook to get filtered students based on a filter criteria
export function useFilteredStudents(filter: string) {
  const { students, isLoading, error } = useStudents();
  
  let filteredStudents: Student[] = [...students];
  
  // Apply filter
  if (filter === 'active') {
    filteredStudents = students.filter((student: Student) => student.status === 'active');
  } else if (filter === 'inactive') {
    filteredStudents = students.filter((student: Student) => student.status === 'inactive');
  } else if (filter === 'recently_added') {
    filteredStudents = [...students].sort((a: Student, b: Student) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });
  } else if (filter === 'high_priority') {
    filteredStudents = students.filter((student: Student) => student.isHighPriority);
  } else if (filter === 'inquiry') {
    filteredStudents = students.filter((student: Student) => 
      student.stage === 'inquiry'
    );
  } else if (filter === 'prospective') {
    filteredStudents = students.filter((student: Student) => 
      ['inquiry', 'application', 'offer', 'visa'].includes(student.stage)
    );
  } else if (filter === 'current') {
    filteredStudents = students.filter((student: Student) => 
      student.stage === 'enrollment'
    );
  } else if (filter === 'alumni') {
    filteredStudents = students.filter((student: Student) => student.stage === 'alumni');
  }
  
  return { students: filteredStudents, isLoading, error };
}