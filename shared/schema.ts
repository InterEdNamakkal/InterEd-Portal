import { pgTable, text, serial, integer, boolean, timestamp, pgEnum, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

// User Model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull().default("staff"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  email: true,
  role: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Student Status Enum
export const studentStatusEnum = pgEnum("student_status", [
  "active",
  "inactive",
  "on_hold",
  "completed",
  "withdrawn",
]);

// Student Stage Enum
export const studentStageEnum = pgEnum("student_stage", [
  "inquiry",
  "application",
  "offer",
  "visa",
  "pre_departure",
  "enrollment",
  "alumni",
]);

// Student Model
export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  status: text("status").notNull().default("active"),
  stage: text("stage").notNull().default("inquiry"),
  program: text("program"),
  university: text("university"),
  agent: text("agent"),
  nationality: text("nationality"),
  notes: text("notes"),
  isHighPriority: boolean("is_high_priority").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type Student = typeof students.$inferSelect;

// University Model
export const universityStatusEnum = pgEnum("university_status", [
  "active", "inactive", "pending"
]);

export const universityTierEnum = pgEnum("university_tier", [
  "tier1", "tier2", "tier3", "tier4"
]);

export const universities = pgTable("universities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  country: text("country").notNull(),
  city: text("city"),
  province: text("province"),
  tier: universityTierEnum("tier").default("tier3"),
  status: universityStatusEnum("status").default("active"),
  website: text("website"),
  logo: text("logo"),
  contactName: text("contact_name"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  agreementStatus: text("agreement_status").default("none"),
  agreementDate: timestamp("agreement_date"),
  agreementExpiry: timestamp("agreement_expiry"),
  commissionRate: doublePrecision("commission_rate"),
  notes: text("notes"),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const insertUniversitySchema = createInsertSchema(universities).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUniversity = z.infer<typeof insertUniversitySchema>;
export type University = typeof universities.$inferSelect;

// Program Model
export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  universityId: integer("university_id").notNull(),
  level: text("level").notNull(),
  duration: text("duration"),
  tuitionFee: text("tuition_fee"),
  startDate: text("start_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProgramSchema = createInsertSchema(programs).omit({
  id: true,
  createdAt: true,
});

export type InsertProgram = z.infer<typeof insertProgramSchema>;
export type Program = typeof programs.$inferSelect;

// Agent Model
export const agents = pgTable("agents", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company"),
  email: text("email").notNull(),
  phone: text("phone"),
  country: text("country"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAgentSchema = createInsertSchema(agents).omit({
  id: true,
  createdAt: true,
});

export type InsertAgent = z.infer<typeof insertAgentSchema>;
export type Agent = typeof agents.$inferSelect;

// Application Stage Enum
export const applicationStageEnum = pgEnum("application_stage", [
  "document_collection",
  "under_review",
  "submitted_to_university",
  "conditional_offer",
  "unconditional_offer",
  "rejected",
]);

// Application Status Enum
export const applicationStatusEnum = pgEnum("application_status", [
  "in_progress",
  "submitted",
  "under_review",
  "accepted",
  "rejected",
  "deferred",
  "withdrawn",
]);

// Application Model
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  universityId: integer("university_id").notNull(),
  programId: integer("program_id").notNull(),
  agentId: integer("agent_id"),
  stage: text("stage").notNull().default("document_collection"),
  status: text("status").notNull().default("in_progress"),
  intakeDate: timestamp("intake_date"),
  applicationDate: timestamp("application_date"),
  decisionDate: timestamp("decision_date"),
  notes: text("notes"),
  isHighPriority: boolean("is_high_priority").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;

// Relationships
export const studentRelations = relations(students, ({ many }) => ({
  applications: many(applications, { relationName: 'student_applications' }),
}));

export const universityRelations = relations(universities, ({ many }) => ({
  programs: many(programs, { relationName: 'university_programs' }),
  applications: many(applications, { relationName: 'university_applications' }),
}));

export const programRelations = relations(programs, ({ one, many }) => ({
  university: one(universities, {
    fields: [programs.universityId],
    references: [universities.id],
    relationName: 'program_university'
  }),
  applications: many(applications, { relationName: 'program_applications' }),
}));

export const agentRelations = relations(agents, ({ many }) => ({
  applications: many(applications, { relationName: 'agent_applications' }),
}));

export const applicationRelations = relations(applications, ({ one }) => ({
  student: one(students, {
    fields: [applications.studentId],
    references: [students.id],
    relationName: 'student_applications'
  }),
  university: one(universities, {
    fields: [applications.universityId],
    references: [universities.id],
    relationName: 'university_applications'
  }),
  program: one(programs, {
    fields: [applications.programId],
    references: [programs.id],
    relationName: 'program_applications'
  }),
  agent: one(agents, {
    fields: [applications.agentId],
    references: [agents.id],
    relationName: 'agent_applications'
  }),
}));
