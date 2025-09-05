import { type User, type InsertUser, type LabResult, type InsertLabResult, type LabSession, type InsertLabSession } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Lab Sessions
  createLabSession(session: InsertLabSession): Promise<LabSession>;
  getLabSession(id: string): Promise<LabSession | undefined>;
  updateLabSessionStatus(id: string, status: string): Promise<void>;
  deleteLabSession(id: string): Promise<void>;
  
  // Lab Results  
  createLabResult(result: InsertLabResult): Promise<LabResult>;
  getLabResultsBySession(sessionId: string): Promise<LabResult[]>;
  deleteLabResultsBySession(sessionId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private labSessions: Map<string, LabSession>;
  private labResults: Map<string, LabResult>;

  constructor() {
    this.users = new Map();
    this.labSessions = new Map();
    this.labResults = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLabSession(insertSession: InsertLabSession): Promise<LabSession> {
    const id = randomUUID();
    const session: LabSession = {
      ...insertSession,
      id,
      createdAt: new Date(),
    };
    this.labSessions.set(id, session);
    return session;
  }

  async getLabSession(id: string): Promise<LabSession | undefined> {
    return this.labSessions.get(id);
  }

  async updateLabSessionStatus(id: string, status: string): Promise<void> {
    const session = this.labSessions.get(id);
    if (session) {
      session.processingStatus = status;
      this.labSessions.set(id, session);
    }
  }

  async deleteLabSession(id: string): Promise<void> {
    this.labSessions.delete(id);
  }

  async createLabResult(insertResult: InsertLabResult): Promise<LabResult> {
    const id = randomUUID();
    const result: LabResult = {
      ...insertResult,
      id,
      createdAt: new Date(),
    };
    this.labResults.set(id, result);
    return result;
  }

  async getLabResultsBySession(sessionId: string): Promise<LabResult[]> {
    return Array.from(this.labResults.values()).filter(
      (result) => result.sessionId === sessionId,
    );
  }

  async deleteLabResultsBySession(sessionId: string): Promise<void> {
    const toDelete = Array.from(this.labResults.entries())
      .filter(([_, result]) => result.sessionId === sessionId)
      .map(([id]) => id);
    
    toDelete.forEach(id => this.labResults.delete(id));
  }
}

export const storage = new MemStorage();
