import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, real, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const labResults = pgTable("lab_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  testName: text("test_name").notNull(),
  value: real("value").notNull(),
  unit: text("unit").notNull(),
  normalRangeMin: real("normal_range_min"),
  normalRangeMax: real("normal_range_max"),
  normalRangeText: text("normal_range_text"),
  interpretation: text("interpretation").notNull(), // 'normal', 'high', 'low', 'borderline-high', 'borderline-low'
  explanation: text("explanation").notNull(),
  meaning: text("meaning").notNull(),
  isUrgent: text("is_urgent").notNull().default('false'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const labSessions = pgTable("lab_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  filename: text("filename"),
  fileType: text("file_type"),
  language: text("language").notNull().default('en'),
  processingStatus: text("processing_status").notNull().default('pending'), // 'pending', 'processing', 'completed', 'failed'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLabResultSchema = createInsertSchema(labResults).omit({
  id: true,
  createdAt: true,
});

export const insertLabSessionSchema = createInsertSchema(labSessions).omit({
  id: true,
  createdAt: true,
});

export const manualLabEntrySchema = z.object({
  testName: z.string().min(1, "Test name is required"),
  value: z.string().min(1, "Value is required"),
  unit: z.string().min(1, "Unit is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type LabResult = typeof labResults.$inferSelect;
export type InsertLabResult = z.infer<typeof insertLabResultSchema>;
export type LabSession = typeof labSessions.$inferSelect;
export type InsertLabSession = z.infer<typeof insertLabSessionSchema>;
export type ManualLabEntry = z.infer<typeof manualLabEntrySchema>;
