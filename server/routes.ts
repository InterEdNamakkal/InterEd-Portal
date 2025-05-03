import express, { type Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import passport from './auth';
import { isAuthenticated, isAdmin } from './auth';
import { storage } from "./storage";
import { 
  insertStudentSchema, 
  insertUserSchema,
  insertApplicationSchema,
  insertUniversitySchema
} from "@shared/schema";
import { z } from "zod";
import bcrypt from 'bcryptjs';

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth Routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const validatedData = insertUserSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid user data", 
          errors: validatedData.error.issues 
        });
      }
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(validatedData.data.username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(validatedData.data.password, salt);
      
      // Create new user with hashed password
      const userData = { 
        ...validatedData.data,
        password: hashedPassword
      };
      
      const newUser = await storage.createUser(userData);
      
      // Return user data without password
      const userResponse = { ...newUser, password: undefined };
      return res.status(201).json(userResponse);
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({ message: "Failed to register user" });
    }
  });

  app.post("/api/auth/login", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: Error, user: any, info: any) => {
      if (err) {
        return next(err);
      }
      
      if (!user) {
        return res.status(401).json({ message: info?.message || "Invalid credentials" });
      }
      
      req.logIn(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }
        
        // Return user data without password
        const userResponse = { ...user, password: undefined };
        return res.status(200).json(userResponse);
      });
    })(req, res, next);
  });
  
  app.get("/api/auth/logout", (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" });
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
  
  app.get("/api/auth/current-user", (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    // Return user data without sensitive info
    const user = req.user as any;
    const userResponse = { ...user, password: undefined };
    return res.status(200).json(userResponse);
  });

  // Student Routes
  app.get("/api/students", async (_req: Request, res: Response) => {
    try {
      const students = await storage.getStudents();
      return res.status(200).json(students);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch students" });
    }
  });

  app.get("/api/students/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid student ID" });
      }

      const student = await storage.getStudentById(id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      // Enrich with more detailed information for related entities
      if (student.agent && !isNaN(Number(student.agent))) {
        const agent = await storage.getAgentById(Number(student.agent));
        if (agent) {
          student.agent = agent.name;
        }
      }

      if (student.university && !isNaN(Number(student.university))) {
        const university = await storage.getUniversityById(Number(student.university));
        if (university) {
          student.university = university.name;
        }
      }

      if (student.program && !isNaN(Number(student.program))) {
        const program = await storage.getProgramById(Number(student.program));
        if (program) {
          student.program = program.name;
        }
      }

      return res.status(200).json(student);
    } catch (error) {
      console.error("Error fetching student:", error);
      return res.status(500).json({ message: "Failed to fetch student" });
    }
  });

  app.post("/api/students", async (req: Request, res: Response) => {
    try {
      // Process form data to match schema expectations
      const formData = {...req.body};
      
      // Convert "none" values to null for relational fields
      if (formData.agent === "none") formData.agent = null;
      if (formData.program === "none") formData.program = null;
      if (formData.university === "none") formData.university = null;

      // Handle numeric IDs if needed
      if (formData.agent && formData.agent !== "none") {
        formData.agent = Number(formData.agent);
      }
      
      if (formData.program && formData.program !== "none") {
        formData.program = Number(formData.program);
      }
      
      if (formData.university && formData.university !== "none") {
        formData.university = Number(formData.university);
      }
      
      // Validate the processed data
      const validatedData = insertStudentSchema.safeParse(formData);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid student data", 
          errors: validatedData.error.issues 
        });
      }

      const newStudent = await storage.createStudent(validatedData.data);
      return res.status(201).json(newStudent);
    } catch (error) {
      console.error("Error creating student:", error);
      return res.status(500).json({ message: "Failed to create student" });
    }
  });

  app.put("/api/students/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid student ID" });
      }

      // Process form data to match schema expectations
      const formData = {...req.body};
      
      // Convert "none" values to null for relational fields
      if (formData.agent === "none") formData.agent = null;
      if (formData.program === "none") formData.program = null;
      if (formData.university === "none") formData.university = null;

      // Handle numeric IDs if needed
      if (formData.agent && formData.agent !== "none") {
        formData.agent = Number(formData.agent);
      }
      
      if (formData.program && formData.program !== "none") {
        formData.program = Number(formData.program);
      }
      
      if (formData.university && formData.university !== "none") {
        formData.university = Number(formData.university);
      }

      const validatedData = insertStudentSchema.partial().safeParse(formData);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid student data", 
          errors: validatedData.error.issues 
        });
      }

      const updatedStudent = await storage.updateStudent(id, validatedData.data);
      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }

      return res.status(200).json(updatedStudent);
    } catch (error) {
      console.error("Error updating student:", error);
      return res.status(500).json({ message: "Failed to update student" });
    }
  });

  app.delete("/api/students/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid student ID" });
      }

      const success = await storage.deleteStudent(id);
      if (!success) {
        return res.status(404).json({ message: "Student not found" });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete student" });
    }
  });

  app.get("/api/students/filter/stage/:stage", async (req: Request, res: Response) => {
    try {
      const { stage } = req.params;
      const students = await storage.getStudentsByStage(stage);
      return res.status(200).json(students);
    } catch (error) {
      return res.status(500).json({ message: "Failed to filter students" });
    }
  });

  // University Routes
  app.get("/api/universities", async (_req: Request, res: Response) => {
    try {
      const universities = await storage.getUniversities();
      return res.status(200).json(universities);
    } catch (error) {
      console.error("Error fetching universities:", error);
      return res.status(500).json({ message: "Failed to fetch universities" });
    }
  });

  app.get("/api/universities/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid university ID" });
      }

      const university = await storage.getUniversityById(id);
      if (!university) {
        return res.status(404).json({ message: "University not found" });
      }
      
      return res.status(200).json(university);
    } catch (error) {
      console.error("Error fetching university:", error);
      return res.status(500).json({ message: "Failed to fetch university" });
    }
  });

  app.post("/api/universities", async (req: Request, res: Response) => {
    try {
      // Parse the request body using the schema
      const parseResult = insertUniversitySchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid university data", errors: parseResult.error.format() });
      }

      const university = await storage.createUniversity(parseResult.data);
      return res.status(201).json(university);
    } catch (error) {
      console.error("Error creating university:", error);
      return res.status(500).json({ message: "Failed to create university" });
    }
  });

  app.put("/api/universities/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid university ID" });
      }

      // Ensure the university exists
      const university = await storage.getUniversityById(id);
      if (!university) {
        return res.status(404).json({ message: "University not found" });
      }

      // Validate partial update data
      const updateData = req.body;
      const updatedUniversity = await storage.updateUniversity(id, updateData);
      
      if (!updatedUniversity) {
        return res.status(404).json({ message: "University not found" });
      }
      
      return res.status(200).json(updatedUniversity);
    } catch (error) {
      console.error("Error updating university:", error);
      return res.status(500).json({ message: "Failed to update university" });
    }
  });

  app.delete("/api/universities/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid university ID" });
      }

      const deleted = await storage.deleteUniversity(id);
      if (!deleted) {
        return res.status(404).json({ message: "University not found" });
      }

      return res.status(200).json({ message: "University deleted successfully" });
    } catch (error) {
      console.error("Error deleting university:", error);
      return res.status(500).json({ message: "Failed to delete university" });
    }
  });
  
  app.get("/api/programs/university/:universityId", async (req: Request, res: Response) => {
    try {
      const universityId = parseInt(req.params.universityId);
      if (isNaN(universityId)) {
        return res.status(400).json({ message: "Invalid university ID" });
      }
      
      const programs = await storage.getProgramsByUniversityId(universityId);
      return res.status(200).json(programs);
    } catch (error) {
      console.error("Error fetching university programs:", error);
      return res.status(500).json({ message: "Failed to fetch university programs" });
    }
  });

  // Program Routes
  app.get("/api/programs", async (_req: Request, res: Response) => {
    try {
      const programs = await storage.getPrograms();
      return res.status(200).json(programs);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch programs" });
    }
  });

  // Agent Routes
  app.get("/api/agents", async (_req: Request, res: Response) => {
    try {
      const agents = await storage.getAgents();
      return res.status(200).json(agents);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch agents" });
    }
  });

  // Stats Routes
  app.get("/api/stats/students/stage-counts", async (_req: Request, res: Response) => {
    try {
      const counts = await storage.getStudentCountByStage();
      return res.status(200).json(counts);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch student stats" });
    }
  });
  
  // Application Routes
  app.get("/api/applications", async (_req: Request, res: Response) => {
    try {
      const applications = await storage.getApplications();
      return res.status(200).json(applications);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch applications" });
    }
  });
  
  app.get("/api/applications/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid application ID" });
      }
      
      const application = await storage.getApplicationById(id);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      
      return res.status(200).json(application);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch application" });
    }
  });
  
  app.post("/api/applications", async (req: Request, res: Response) => {
    try {
      // Process form data to match schema expectations
      const formData = {...req.body};
      
      // Convert strings to numbers where needed
      if (formData.studentId) formData.studentId = Number(formData.studentId);
      if (formData.universityId) formData.universityId = Number(formData.universityId);
      if (formData.programId) formData.programId = Number(formData.programId);
      if (formData.agentId) formData.agentId = Number(formData.agentId);
      
      // Convert "none" values to null for optional fields
      Object.keys(formData).forEach(key => {
        if (formData[key] === "none") formData[key] = null;
      });
      
      const validatedData = insertApplicationSchema.safeParse(formData);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid application data", 
          errors: validatedData.error.issues 
        });
      }
      
      const newApplication = await storage.createApplication(validatedData.data);
      return res.status(201).json(newApplication);
    } catch (error) {
      console.error("Error creating application:", error);
      return res.status(500).json({ message: "Failed to create application" });
    }
  });
  
  app.put("/api/applications/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid application ID" });
      }
      
      // Process form data to match schema expectations
      const formData = {...req.body};
      
      // Convert strings to numbers where needed
      if (formData.studentId) formData.studentId = Number(formData.studentId);
      if (formData.universityId) formData.universityId = Number(formData.universityId);
      if (formData.programId) formData.programId = Number(formData.programId);
      if (formData.agentId) formData.agentId = Number(formData.agentId);
      
      // Convert "none" values to null for optional fields
      Object.keys(formData).forEach(key => {
        if (formData[key] === "none") formData[key] = null;
      });
      
      const validatedData = insertApplicationSchema.partial().safeParse(formData);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid application data", 
          errors: validatedData.error.issues 
        });
      }
      
      const updatedApplication = await storage.updateApplication(id, validatedData.data);
      if (!updatedApplication) {
        return res.status(404).json({ message: "Application not found" });
      }
      
      return res.status(200).json(updatedApplication);
    } catch (error) {
      console.error("Error updating application:", error);
      return res.status(500).json({ message: "Failed to update application" });
    }
  });
  
  app.delete("/api/applications/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid application ID" });
      }
      
      const success = await storage.deleteApplication(id);
      if (!success) {
        return res.status(404).json({ message: "Application not found" });
      }
      
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete application" });
    }
  });
  
  app.get("/api/applications/filter/stage/:stage", async (req: Request, res: Response) => {
    try {
      const { stage } = req.params;
      const applications = await storage.getApplicationsByStage(stage);
      return res.status(200).json(applications);
    } catch (error) {
      return res.status(500).json({ message: "Failed to filter applications" });
    }
  });
  
  app.get("/api/applications/student/:studentId", async (req: Request, res: Response) => {
    try {
      const studentId = parseInt(req.params.studentId);
      if (isNaN(studentId)) {
        return res.status(400).json({ message: "Invalid student ID" });
      }
      
      const applications = await storage.getApplicationsByStudentId(studentId);
      
      // Enrich applications with university and program names
      const enrichedApplications = await Promise.all(applications.map(async (app) => {
        const universityName = app.universityId ? 
          (await storage.getUniversityById(app.universityId))?.name : null;
        
        const programName = app.programId ?
          (await storage.getProgramById(app.programId))?.name : null;
        
        return {
          ...app,
          universityName,
          programName
        };
      }));
      
      return res.status(200).json(enrichedApplications);
    } catch (error) {
      console.error("Error fetching student applications:", error);
      return res.status(500).json({ message: "Failed to fetch student applications" });
    }
  });
  
  app.get("/api/applications/university/:universityId", async (req: Request, res: Response) => {
    try {
      const universityId = parseInt(req.params.universityId);
      if (isNaN(universityId)) {
        return res.status(400).json({ message: "Invalid university ID" });
      }
      
      const applications = await storage.getApplicationsByUniversityId(universityId);
      return res.status(200).json(applications);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch university applications" });
    }
  });
  
  app.get("/api/applications/program/:programId", async (req: Request, res: Response) => {
    try {
      const programId = parseInt(req.params.programId);
      if (isNaN(programId)) {
        return res.status(400).json({ message: "Invalid program ID" });
      }
      
      const applications = await storage.getApplicationsByProgramId(programId);
      return res.status(200).json(applications);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch program applications" });
    }
  });
  
  app.get("/api/stats/applications/stage-counts", async (_req: Request, res: Response) => {
    try {
      const counts = await storage.getApplicationCountByStage();
      return res.status(200).json(counts);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch application stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
