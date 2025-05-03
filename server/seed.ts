import { db } from './db';
import { 
  users, insertUserSchema, 
  students, insertStudentSchema, studentStatusEnum, studentStageEnum,
  universities, insertUniversitySchema,
  programs, insertProgramSchema,
  agents, insertAgentSchema,
  applications, insertApplicationSchema, applicationStageEnum, applicationStatusEnum
} from '@shared/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

async function seed() {
  console.log('Starting database seeding...');
  
  try {
    // Check if admin user exists
    const existingUsers = await db.select().from(users);
    if (existingUsers.length === 0) {
      console.log('Creating admin user...');
      
      // Create admin user
      const password = 'admin123'; // in production, use a more secure password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const adminUser = {
        username: 'admin',
        password: hashedPassword,
        fullName: 'Admin User',
        email: 'admin@intered.com',
        role: 'admin'
      };
      
      // Validate with schema
      insertUserSchema.parse(adminUser);
      
      // Insert admin user
      await db.insert(users).values(adminUser);
      console.log('Admin user created successfully!');
      
      // Create staff user
      const staffUser = {
        username: 'staff',
        password: await bcrypt.hash('staff123', salt),
        fullName: 'Staff User',
        email: 'staff@intered.com',
        role: 'staff'
      };
      
      // Validate with schema
      insertUserSchema.parse(staffUser);
      
      // Insert staff user
      await db.insert(users).values(staffUser);
      console.log('Staff user created successfully!');
    } else {
      console.log('Users already exist, skipping user creation.');
    }
    
    // Add universities data
    const existingUniversities = await db.select().from(universities);
    if (existingUniversities.length === 0) {
      console.log('Creating sample universities...');
      
      const universityData = [
        {
          name: 'University of Oxford',
          country: 'United Kingdom',
          city: 'Oxford',
          website: 'https://www.ox.ac.uk',
          tier: 'Tier 1',
          agreementStatus: 'Active',
          contactEmail: 'admissions@ox.ac.uk',
          contactPhone: '+44-1865-270000',
          notes: 'One of the oldest and most prestigious universities in the world.'
        },
        {
          name: 'Harvard University',
          country: 'United States',
          city: 'Cambridge',
          website: 'https://www.harvard.edu',
          tier: 'Tier 1',
          agreementStatus: 'Active',
          contactEmail: 'admissions@harvard.edu',
          contactPhone: '+1-617-495-1551',
          notes: 'Ivy League research university established in 1636.'
        },
        {
          name: 'Tokyo University',
          country: 'Japan',
          city: 'Tokyo',
          website: 'https://www.u-tokyo.ac.jp/en/',
          tier: 'Tier 1',
          agreementStatus: 'Pending',
          contactEmail: 'admission@adm.u-tokyo.ac.jp',
          contactPhone: '+81-3-3812-2111',
          notes: 'Japan\'s most prestigious university and one of Asia\'s finest institutions.'
        },
        {
          name: 'University of Toronto',
          country: 'Canada',
          city: 'Toronto',
          website: 'https://www.utoronto.ca',
          tier: 'Tier 1',
          agreementStatus: 'Active',
          contactEmail: 'admissions@utoronto.ca',
          contactPhone: '+1-416-978-2190',
          notes: 'Top-ranked university in Canada known for research and innovation.'
        },
        {
          name: 'University of Melbourne',
          country: 'Australia',
          city: 'Melbourne',
          website: 'https://www.unimelb.edu.au',
          tier: 'Tier 2',
          agreementStatus: 'Active',
          contactEmail: 'admissions@unimelb.edu.au',
          contactPhone: '+61-3-9035-5511',
          notes: 'Australia\'s leading university and a vibrant center for research.'
        }
      ];
      
      for (const university of universityData) {
        insertUniversitySchema.parse(university);
        await db.insert(universities).values(university);
      }
      
      console.log('Sample universities created successfully!');
    } else {
      console.log('Universities already exist, skipping creation.');
    }
    
    // Add programs data
    const existingPrograms = await db.select().from(programs);
    if (existingPrograms.length === 0) {
      console.log('Creating sample programs...');
      
      // Get university IDs
      const universityEntries = await db.select().from(universities);
      
      if (universityEntries.length > 0) {
        const programData = [
          {
            name: 'Computer Science BSc',
            level: 'Bachelor',
            duration: '3 years',
            tuitionFee: '40000',
            universityId: universityEntries[0].id, // Oxford
            startDate: '2025-09-15'
          },
          {
            name: 'Business Administration MBA',
            level: 'Master',
            duration: '2 years',
            tuitionFee: '70000',
            universityId: universityEntries[1].id, // Harvard
            startDate: '2025-09-01'
          },
          {
            name: 'International Relations MA',
            level: 'Master',
            duration: '1 year',
            tuitionFee: '35000',
            universityId: universityEntries[3].id, // Toronto
            startDate: '2025-09-05'
          },
          {
            name: 'Medicine MBBS',
            level: 'Bachelor',
            duration: '5 years',
            tuitionFee: '45000',
            universityId: universityEntries[4].id, // Melbourne
            startDate: '2025-08-10'
          },
          {
            name: 'Engineering PhD',
            level: 'Doctorate',
            duration: '4 years',
            tuitionFee: '30000',
            universityId: universityEntries[2].id, // Tokyo
            startDate: '2025-10-01'
          }
        ];
        
        for (const program of programData) {
          insertProgramSchema.parse(program);
          await db.insert(programs).values(program);
        }
        
        console.log('Sample programs created successfully!');
      } else {
        console.log('No universities found, skipping program creation.');
      }
    } else {
      console.log('Programs already exist, skipping creation.');
    }
    
    // Add agents data
    const existingAgents = await db.select().from(agents);
    if (existingAgents.length === 0) {
      console.log('Creating sample agents...');
      
      const agentData = [
        {
          name: 'Global Education Partners',
          company: 'Global Education Ltd',
          country: 'United Kingdom',
          email: 'contact@globaledu.com',
          phone: '+44-20-7123-4567',
          status: 'active',
          notes: 'Strong presence in UK and Europe. Specializes in elite university placements.'
        },
        {
          name: 'American Collegiate Network',
          company: 'ACN Inc.',
          country: 'United States',
          email: 'info@acnusa.com',
          phone: '+1-212-555-7890',
          status: 'active',
          notes: 'Leading US agency with excellent track record for Ivy League placements.'
        },
        {
          name: 'Asia Pacific Education',
          company: 'Asia Pacific Education Pte Ltd',
          country: 'Singapore',
          email: 'contact@apeduc.sg',
          phone: '+65-6123-4567',
          status: 'active',
          notes: 'Specializes in placements throughout Asia, Australia, and New Zealand.'
        },
        {
          name: 'Canadian Study Connections',
          company: 'Canadian Study Connections Ltd',
          country: 'Canada',
          email: 'info@canstudyconnect.ca',
          phone: '+1-416-555-1234',
          status: 'active',
          notes: 'Focused on Canadian university placements, especially in business programs.'
        },
        {
          name: 'European Education Consultants',
          company: 'EuroEdu GmbH',
          country: 'Germany',
          email: 'contact@eeduconsult.eu',
          phone: '+49-30-9876-5432',
          status: 'active',
          notes: 'New partnership being evaluated. Strong presence across European markets.'
        }
      ];
      
      for (const agent of agentData) {
        insertAgentSchema.parse(agent);
        await db.insert(agents).values(agent);
      }
      
      console.log('Sample agents created successfully!');
    } else {
      console.log('Agents already exist, skipping creation.');
    }
    
    // Add students data
    const existingStudents = await db.select().from(students);
    if (existingStudents.length === 0) {
      console.log('Creating sample students...');
      
      // Get agent IDs
      const agentEntries = await db.select().from(agents);
      
      if (agentEntries.length > 0) {
        const studentData = [
          {
            firstName: 'John',
            lastName: 'Smith',
            email: 'john.smith@example.com',
            phone: '+44-7123-456789',
            nationality: 'British',
            agent: 'Global Education Partners',
            stage: 'inquiry',
            status: 'active',
            program: 'Computer Science BSc',
            university: 'University of Oxford',
            isHighPriority: true,
            notes: 'Excellent academic record. Interested in Computer Science programs in the UK.'
          },
          {
            firstName: 'Emma',
            lastName: 'Johnson',
            email: 'emma.johnson@example.com',
            phone: '+1-212-555-1234',
            nationality: 'American',
            agent: 'American Collegiate Network',
            stage: 'application',
            status: 'active',
            program: 'Business Administration MBA',
            university: 'Harvard University',
            isHighPriority: false,
            notes: 'Seeking MBA programs. Has work experience in finance.'
          },
          {
            firstName: 'Hiroshi',
            lastName: 'Tanaka',
            email: 'hiroshi.tanaka@example.com',
            phone: '+81-3-1234-5678',
            nationality: 'Japanese',
            agent: 'Asia Pacific Education',
            stage: 'offer',
            status: 'active',
            program: 'Engineering PhD',
            university: 'Tokyo University',
            isHighPriority: false,
            notes: 'PhD candidate in Engineering. Excellent research background.'
          },
          {
            firstName: 'Sophie',
            lastName: 'Chen',
            email: 'sophie.chen@example.com',
            phone: '+65-9123-4567',
            nationality: 'Singaporean',
            agent: 'Asia Pacific Education',
            stage: 'visa',
            status: 'active',
            program: 'Medicine MBBS',
            university: 'University of Melbourne',
            isHighPriority: true,
            notes: 'Scholarship recipient. Interested in Medicine.'
          },
          {
            firstName: 'Michael',
            lastName: 'Davis',
            email: 'michael.davis@example.com',
            phone: '+1-416-123-4567',
            nationality: 'Canadian',
            agent: 'Canadian Study Connections',
            stage: 'enrollment',
            status: 'active',
            program: 'International Relations MA',
            university: 'University of Toronto',
            isHighPriority: false,
            notes: 'Currently studying International Relations. Excellent academic standing.'
          },
          {
            firstName: 'Maria',
            lastName: 'González',
            email: 'maria.gonzalez@example.com',
            phone: '+34-91-234-5678',
            nationality: 'Spanish',
            agent: 'European Education Consultants',
            stage: 'alumni',
            status: 'inactive',
            program: 'International Relations MA',
            university: 'University of Toronto',
            isHighPriority: false,
            notes: 'Completed International Relations program. Now working in diplomacy.'
          }
        ];
        
        for (const student of studentData) {
          insertStudentSchema.parse(student);
          await db.insert(students).values(student);
        }
        
        console.log('Sample students created successfully!');
      } else {
        console.log('No agents found, skipping student creation.');
      }
    } else {
      console.log('Students already exist, skipping creation.');
    }
    
    // Add applications data
    const existingApplications = await db.select().from(applications);
    if (existingApplications.length === 0) {
      console.log('Creating sample applications...');
      
      // Get student IDs
      const studentEntries = await db.select().from(students);
      
      // Get program IDs
      const programEntries = await db.select().from(programs);
      
      if (studentEntries.length > 0 && programEntries.length > 0) {
        const applicationData = [
          {
            studentId: studentEntries[0].id,
            universityId: programEntries[0].universityId, 
            programId: programEntries[0].id,
            agentId: 1,
            stage: 'document_collection',
            status: 'in_progress',
            applicationDate: new Date('2024-12-10'),
            decisionDate: null,
            isHighPriority: true,
            notes: 'Application complete. Strong candidate for Computer Science program.'
          },
          {
            studentId: studentEntries[1].id,
            universityId: programEntries[1].universityId,
            programId: programEntries[1].id,
            agentId: 2,
            stage: 'under_review',
            status: 'submitted',
            applicationDate: new Date('2024-11-15'),
            decisionDate: null,
            isHighPriority: false,
            notes: 'GMAT score exceptional. Work experience very relevant to program.'
          },
          {
            studentId: studentEntries[2].id,
            universityId: programEntries[4].universityId,
            programId: programEntries[4].id,
            agentId: 3,
            stage: 'conditional_offer',
            status: 'accepted',
            applicationDate: new Date('2024-09-20'),
            decisionDate: new Date('2024-12-01'),
            isHighPriority: false,
            notes: 'Accepted with full scholarship. Research proposal highly praised.'
          },
          {
            studentId: studentEntries[3].id,
            universityId: programEntries[3].universityId,
            programId: programEntries[3].id,
            agentId: 3,
            stage: 'conditional_offer',
            status: 'accepted',
            applicationDate: new Date('2024-10-05'),
            decisionDate: new Date('2024-12-05'),
            isHighPriority: true,
            notes: 'Conditional acceptance pending final high school results.'
          },
          {
            studentId: studentEntries[4].id,
            universityId: programEntries[2].universityId,
            programId: programEntries[2].id,
            agentId: 4,
            stage: 'unconditional_offer',
            status: 'accepted',
            applicationDate: new Date('2023-11-10'),
            intakeDate: new Date('2024-01-15'),
            decisionDate: new Date('2024-01-05'),
            isHighPriority: false,
            notes: 'Currently in second semester. Performing excellently.'
          },
          {
            studentId: studentEntries[5].id,
            universityId: programEntries[2].universityId,
            programId: programEntries[2].id,
            agentId: 5,
            stage: 'unconditional_offer',
            status: 'accepted',
            applicationDate: new Date('2022-10-12'),
            decisionDate: new Date('2022-12-10'),
            intakeDate: new Date('2023-01-15'),
            isHighPriority: false,
            notes: 'Graduated with honors. Excellent thesis work.'
          }
        ];
        
        for (const application of applicationData) {
          insertApplicationSchema.parse(application);
          await db.insert(applications).values(application);
        }
        
        console.log('Sample applications created successfully!');
      } else {
        console.log('No students or programs found, skipping application creation.');
      }
    } else {
      console.log('Applications already exist, skipping creation.');
    }
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

seed();