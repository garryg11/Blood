import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLabSessionSchema, insertLabResultSchema, manualLabEntrySchema } from "@shared/schema";
import { randomUUID } from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Create a new lab session
  app.post("/api/lab-sessions", async (req, res) => {
    try {
      const sessionData = insertLabSessionSchema.parse(req.body);
      const session = await storage.createLabSession(sessionData);
      res.json(session);
    } catch (error) {
      res.status(400).json({ message: "Invalid session data", error });
    }
  });

  // Get lab session by ID
  app.get("/api/lab-sessions/:id", async (req, res) => {
    try {
      const session = await storage.getLabSession(req.params.id);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Failed to get session", error });
    }
  });

  // Update lab session status
  app.patch("/api/lab-sessions/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      await storage.updateLabSessionStatus(req.params.id, status);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to update session status", error });
    }
  });

  // Delete lab session and all related results
  app.delete("/api/lab-sessions/:id", async (req, res) => {
    try {
      await storage.deleteLabResultsBySession(req.params.id);
      await storage.deleteLabSession(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete session", error });
    }
  });

  // Add manual lab entry
  app.post("/api/lab-sessions/:sessionId/manual-entry", async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      const entryData = manualLabEntrySchema.parse(req.body);
      
      // Simulate processing the manual entry into a lab result
      const value = parseFloat(entryData.value);
      if (isNaN(value)) {
        return res.status(400).json({ message: "Invalid numeric value" });
      }

      // Mock interpretation logic - in real app this would be more sophisticated
      let interpretation = 'normal';
      let explanation = `Your ${entryData.testName} level appears to be within normal range.`;
      let meaning = 'This value suggests normal function for this test.';
      let isUrgent = 'false';

      // Simple mock rules for demonstration
      if (entryData.testName.toLowerCase().includes('cholesterol')) {
        if (value > 200) {
          interpretation = 'high';
          explanation = `Your cholesterol level is elevated and may increase cardiovascular risk.`;
          meaning = 'Cholesterol levels above 200 mg/dL are considered high and may require lifestyle changes or medication.';
        } else if (value > 180) {
          interpretation = 'borderline-high';
          explanation = `Your cholesterol level is in the borderline high range.`;
          meaning = 'Consider dietary changes and exercise to help improve cholesterol levels.';
        }
      } else if (entryData.testName.toLowerCase().includes('glucose')) {
        if (value > 200) {
          interpretation = 'high';
          explanation = `Your blood glucose level is significantly elevated and may indicate diabetes.`;
          meaning = 'Glucose levels above 200 mg/dL may indicate diabetes and require immediate medical attention.';
          isUrgent = 'true';
        } else if (value > 100) {
          interpretation = 'borderline-high';
          explanation = `Your blood glucose level is elevated and may indicate prediabetes.`;
          meaning = 'Consider lifestyle changes to help manage blood sugar levels.';
        }
      }

      const labResult = await storage.createLabResult({
        sessionId,
        testName: entryData.testName,
        value,
        unit: entryData.unit,
        normalRangeText: interpretation === 'normal' ? 'Within normal range' : 'Above normal range',
        interpretation,
        explanation,
        meaning,
        isUrgent,
      });

      res.json(labResult);
    } catch (error) {
      res.status(400).json({ message: "Invalid entry data", error });
    }
  });

  // Get lab results for a session
  app.get("/api/lab-sessions/:sessionId/results", async (req, res) => {
    try {
      const results = await storage.getLabResultsBySession(req.params.sessionId);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to get lab results", error });
    }
  });

  // Simulate file upload processing
  app.post("/api/lab-sessions/:sessionId/upload", async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      
      // Update session status to processing
      await storage.updateLabSessionStatus(sessionId, 'processing');
      
      // Simulate processing delay
      setTimeout(async () => {
        try {
          // Mock extracted lab results - in real app this would use OCR
          const mockResults = [
            {
              sessionId,
              testName: 'Total Cholesterol',
              value: 185,
              unit: 'mg/dL',
              normalRangeText: '< 200 mg/dL',
              interpretation: 'normal',
              explanation: 'Your cholesterol level is within the normal range. This indicates good cardiovascular health when combined with other factors.',
              meaning: 'Cholesterol levels below 200 mg/dL are considered desirable and associated with lower risk of heart disease.',
              isUrgent: 'false',
            },
            {
              sessionId,
              testName: 'LDL Cholesterol',
              value: 145,
              unit: 'mg/dL',
              normalRangeText: '< 100 mg/dL',
              interpretation: 'borderline-high',
              explanation: 'Your LDL cholesterol is in the borderline high range. This may increase cardiovascular risk over time.',
              meaning: 'LDL levels between 130-159 mg/dL are borderline high. Dietary changes and exercise may help improve these levels.',
              isUrgent: 'false',
            }
          ];

          // Create the mock results
          for (const resultData of mockResults) {
            await storage.createLabResult(resultData);
          }

          // Update session status to completed
          await storage.updateLabSessionStatus(sessionId, 'completed');
        } catch (error) {
          await storage.updateLabSessionStatus(sessionId, 'failed');
        }
      }, 2000);

      res.json({ success: true, message: 'Processing started' });
    } catch (error) {
      res.status(500).json({ message: "Failed to process upload", error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
