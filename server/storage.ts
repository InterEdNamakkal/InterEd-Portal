import { InsertStudent, InsertUniversity, InsertProgram, InsertAgent, 
        InsertApplication, Student, University, Program, Agent, 
        Application, InsertUser, User, 
        students, universities, programs, agents, applications, users } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Student operations
  getStudents(): Promise<Student[]>;
  getStudentById(id: number): Promise<Student | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;
  updateStudent(id: number, student: Partial<InsertStudent>): Promise<Student | undefined>;
  deleteStudent(id: number): Promise<boolean>;
  getStudentsByFilter(filter: Partial<Student>): Promise<Student[]>;
  getStudentsByStage(stage: string): Promise<Student[]>;
  
  // University operations
  getUniversities(): Promise<University[]>;
  getUniversityById(id: number): Promise<University | undefined>;
  createUniversity(university: InsertUniversity): Promise<University>;
  
  // Program operations
  getPrograms(): Promise<Program[]>;
  getProgramById(id: number): Promise<Program | undefined>;
  createProgram(program: InsertProgram): Promise<Program>;
  
  // Agent operations
  getAgents(): Promise<Agent[]>;
  getAgentById(id: number): Promise<Agent | undefined>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  
  // Application operations
  getApplications(): Promise<Application[]>;
  getApplicationById(id: number): Promise<Application | undefined>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplication(id: number, application: Partial<InsertApplication>): Promise<Application | undefined>;
  deleteApplication(id: number): Promise<boolean>;
  getApplicationsByFilter(filter: Partial<Application>): Promise<Application[]>;
  getApplicationsByStage(stage: string): Promise<Application[]>;
  getApplicationsByStudentId(studentId: number): Promise<Application[]>;
  getApplicationsByUniversityId(universityId: number): Promise<Application[]>;
  getApplicationsByProgramId(programId: number): Promise<Application[]>;
  
  // Stats functions
  getStudentCountByStage(): Promise<Record<string, number>>;
  getApplicationCountByStage(): Promise<Record<string, number>>;
}

export class DatabaseStorage implements IStorage {
  
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getStudents(): Promise<Student[]> {
    return db.select().from(students);
  }

  async getStudentById(id: number): Promise<Student | undefined> {
    const [student] = await db.select().from(students).where(eq(students.id, id));
    return student;
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const [student] = await db.insert(students).values(insertStudent).returning();
    return student;
  }

  async updateStudent(id: number, studentUpdate: Partial<InsertStudent>): Promise<Student | undefined> {
    const [updatedStudent] = await db
      .update(students)
      .set(studentUpdate)
      .where(eq(students.id, id))
      .returning();
    return updatedStudent;
  }

  async deleteStudent(id: number): Promise<boolean> {
    const result = await db.delete(students).where(eq(students.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async getStudentsByFilter(filter: Partial<Student>): Promise<Student[]> {
    // In a real implementation, this would need to build a dynamic query
    // This simplified version just gets all students - would need to be refactored
    return this.getStudents();
  }

  async getStudentsByStage(stage: string): Promise<Student[]> {
    return db.select().from(students).where(eq(students.stage, stage));
  }

  async getUniversities(): Promise<University[]> {
    try {
      console.log('Fetching universities from database...');
      // Explicitly select only the columns we know exist in the database
      const result = await db.select({
        id: universities.id,
        name: universities.name,
        country: universities.country,
        city: universities.city,
        website: universities.website,
        createdAt: universities.createdAt
      }).from(universities);
      
      // Add missing fields to make it compatible with the type
      const completeUniversities = result.map(uni => ({
        ...uni,
        tier: "tier3" as const,
        status: "active" as const,
        province: null,
        logo: null,
        contactName: null,
        contactEmail: null,
        contactPhone: null,
        agreementStatus: null,
        agreementDate: null,
        agreementExpiry: null,
        commissionRate: null,
        notes: null,
        tags: null,
        updatedAt: null
      }));
      
      console.log(`Successfully fetched ${completeUniversities.length} universities`);
      return completeUniversities as University[];
    } catch (error) {
      console.error('Error in getUniversities:', error);
      throw error;
    }
  }

  async getUniversityById(id: number): Promise<University | undefined> {
    if (isNaN(id)) {
      return undefined;
    }
    try {
      const [university] = await db.select({
        id: universities.id,
        name: universities.name,
        country: universities.country,
        city: universities.city,
        website: universities.website,
        createdAt: universities.createdAt
      }).from(universities).where(eq(universities.id, id));
      
      if (!university) return undefined;
      
      // Add missing fields to make it compatible with the type
      const completeUniversity = {
        ...university,
        tier: "tier3" as const,
        status: "active" as const,
        province: null,
        logo: null,
        contactName: null,
        contactEmail: null,
        contactPhone: null,
        agreementStatus: null,
        agreementDate: null,
        agreementExpiry: null,
        commissionRate: null,
        notes: null,
        tags: null,
        updatedAt: null
      };
      
      return completeUniversity as University;
    } catch (error) {
      console.error(`Error in getUniversityById(${id}):`, error);
      throw error;
    }
  }

  async createUniversity(insertUniversity: InsertUniversity): Promise<University> {
    // Ensure insertUniversity is an object, not an array
    const data = { ...insertUniversity };
    const [university] = await db.insert(universities).values(data).returning();
    return university;
  }
  
  async updateUniversity(id: number, universityUpdate: Partial<InsertUniversity>): Promise<University | undefined> {
    if (isNaN(id)) {
      return undefined;
    }
    const [updatedUniversity] = await db
      .update(universities)
      .set(universityUpdate)
      .where(eq(universities.id, id))
      .returning();
    return updatedUniversity;
  }
  
  async deleteUniversity(id: number): Promise<boolean> {
    if (isNaN(id)) {
      return false;
    }
    const result = await db.delete(universities).where(eq(universities.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }
  
  async getProgramsByUniversityId(universityId: number): Promise<Program[]> {
    if (isNaN(universityId)) {
      return [];
    }
    return db.select().from(programs).where(eq(programs.universityId, universityId));
  }

  async getPrograms(): Promise<Program[]> {
    return db.select().from(programs);
  }

  async getProgramById(id: number): Promise<Program | undefined> {
    if (isNaN(id)) {
      return undefined;
    }
    const [program] = await db.select().from(programs).where(eq(programs.id, id));
    return program;
  }

  async createProgram(insertProgram: InsertProgram): Promise<Program> {
    const [program] = await db.insert(programs).values(insertProgram).returning();
    return program;
  }

  async getAgents(): Promise<Agent[]> {
    return db.select().from(agents);
  }

  async getAgentById(id: number): Promise<Agent | undefined> {
    if (isNaN(id)) {
      return undefined;
    }
    const [agent] = await db.select().from(agents).where(eq(agents.id, id));
    return agent;
  }

  async createAgent(insertAgent: InsertAgent): Promise<Agent> {
    const [agent] = await db.insert(agents).values(insertAgent).returning();
    return agent;
  }

  async getApplications(): Promise<Application[]> {
    return db.select().from(applications);
  }

  async getApplicationById(id: number): Promise<Application | undefined> {
    if (isNaN(id)) {
      return undefined;
    }
    const [application] = await db.select().from(applications).where(eq(applications.id, id));
    return application;
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const [application] = await db.insert(applications).values(insertApplication).returning();
    return application;
  }

  async updateApplication(id: number, applicationUpdate: Partial<InsertApplication>): Promise<Application | undefined> {
    const [updatedApplication] = await db
      .update(applications)
      .set(applicationUpdate)
      .where(eq(applications.id, id))
      .returning();
    return updatedApplication;
  }

  async deleteApplication(id: number): Promise<boolean> {
    const result = await db.delete(applications).where(eq(applications.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async getApplicationsByFilter(filter: Partial<Application>): Promise<Application[]> {
    // In a real implementation, this would need to build a dynamic query
    // This simplified version just gets all applications - would need to be refactored
    return this.getApplications();
  }

  async getApplicationsByStage(stage: string): Promise<Application[]> {
    return db.select().from(applications).where(eq(applications.stage, stage));
  }

  async getApplicationsByStudentId(studentId: number): Promise<Application[]> {
    return db.select().from(applications).where(eq(applications.studentId, studentId));
  }

  async getApplicationsByUniversityId(universityId: number): Promise<Application[]> {
    return db.select().from(applications).where(eq(applications.universityId, universityId));
  }

  async getApplicationsByProgramId(programId: number): Promise<Application[]> {
    return db.select().from(applications).where(eq(applications.programId, programId));
  }

  async getStudentCountByStage(): Promise<Record<string, number>> {
    // In a production implementation, this would use SQL count aggregation
    const allStudents = await this.getStudents();
    const counts: Record<string, number> = {};
    
    allStudents.forEach(student => {
      counts[student.stage] = (counts[student.stage] || 0) + 1;
    });
    
    return counts;
  }

  async getApplicationCountByStage(): Promise<Record<string, number>> {
    // In a production implementation, this would use SQL count aggregation
    const allApplications = await this.getApplications();
    const counts: Record<string, number> = {};
    
    allApplications.forEach(application => {
      counts[application.stage] = (counts[application.stage] || 0) + 1;
    });
    
    return counts;
  }
}

export const storage = new DatabaseStorage();