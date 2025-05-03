import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { storage } from './storage';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { User } from '@shared/schema';

// Augment Express Request type with user property
declare global {
  namespace Express {
    interface User {
      id: number;
      username: string;
      password: string;
      fullName: string;
      email: string;
      role: string;
      createdAt: Date | null;
    }
  }
}

// Configure Passport to use local strategy
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await storage.getUserByUsername(username);
      
      if (!user) {
        return done(null, false, { message: 'Invalid credentials' });
      }
      
      // Compare provided password with stored hash
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return done(null, false, { message: 'Invalid credentials' });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize user
passport.serializeUser<number>((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await storage.getUser(id);
    done(null, user || undefined);
  } catch (error) {
    done(error);
  }
});

// Middleware to check if user is authenticated
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};

// Middleware to check if user has admin role
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && req.user && req.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ error: 'Forbidden' });
};

export default passport;