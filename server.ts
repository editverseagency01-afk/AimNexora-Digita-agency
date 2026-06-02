import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

// In-memory data store for lead management (CRM simulation)
const leads: any[] = [
  {
    id: "lead-1",
    name: "Vikram Malhotra",
    businessName: "Aura Aesthetics",
    email: "vikram@auramy.com",
    phone: "+91 98765 43210",
    serviceNeeded: "SEO & Growth Plan",
    budget: "$5,000 - $10,000/mo",
    message: "We need help dominating local search and organic lead collection for our wellness clinics.",
    createdAt: new Date(Date.now() - 86450000).toISOString(),
    status: "New",
    source: "Web Form"
  },
  {
    id: "lead-2",
    name: "Sarah Chen",
    businessName: "NovaSaaS Pro",
    email: "sarah@novasaas.io",
    phone: "+1 (555) 349-1209",
    serviceNeeded: "PPC Advertising",
    budget: "$10,000 - $25,000/mo",
    message: "Scaling up our Google and Meta Ads campaigns. Looking for premium ROI efficiency.",
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    status: "In Progress",
    source: "Cal.com"
  },
  {
    id: "lead-3",
    name: "Eduardo Santos",
    businessName: "Velo Bikes Co.",
    email: "eduardo@velobikes.com",
    phone: "+1 (555) 712-4012",
    serviceNeeded: "Web Design & Development",
    budget: "$25,000 - $50,000",
    message: "Need a high-fidelity custom headless commerce website with next-level animations.",
    createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    status: "Contacted",
    source: "WhatsApp"
  }
];

const subscribers: any[] = [
  { email: "marketing@brandx.com", subscribedAt: new Date(Date.now() - 86400000 * 2).toISOString() },
  { email: "ceo@techhive.dev", subscribedAt: new Date(Date.now() - 86400000).toISOString() }
];

// Initialize Gemini Client
const geminiApiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (geminiApiKey) {
  ai = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("⚠️ GEMINI_API_KEY is not defined in the environment. Running AI Chat in fallback mode.");
}

// Global counters for analytics dashboard
const pageViews = {
  total: 12489,
  leadsConverted: 432,
  activeCampaigns: 18,
  roiAverage: "320%"
};

// API Endpoints

// 1. Gemini AI Chatbot proxy endpoint
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages array." });
  }

  // Fallback if no Gemini API Key is configured
  if (!ai) {
    const lastUserMsg = messages[messages.length - 1]?.content || "";
    return res.json({
      role: "assistant",
      content: `[Demo Mode / No API Key found in settings secrets] Thank you for asking about AimNexora Digital! You said: "${lastUserMsg}". We are a premium digital marketing agency driven by data, UI excellence, and ROI. To activate full AI smart strategic responses, please make sure GEMINI_API_KEY is saved in the Secrets config.`
    });
  }

  try {
    const formattedPrompt = `You are NexoraAI, the elite, high-energy digital marketing strategist for AimNexora Digital.
AimNexora Digital is a premier enterprise-grade digital marketing agency.
Tagline: "Accelerating Growth Through Digital Excellence"
Brand colors/attributes: Luxury dark futuristic UI, Deep Black, Primary Blue, Teal accents, Glassmorphism.
Services we offer: SEO (Technical, Local, Off-Page, On-Page), PPC Ads (Google, Meta, LinkedIn, YouTube, Display), Social Media Marketing, Content Marketing, Email Marketing/Automation, Web Design & Dev, Video Marketing (Reels, Shorts), Branding, Analytics/Tracking, and B2B Lead Gen.

Your job is to:
1. Provide authoritative, highly professional, insightful marketing suggestions and answers.
2. Maintain a premium, confident, bold, luxury-agency style.
3. Gently guide the user to fill out our lead capture form or book an audit if they express interest.
4. Keep responses punchy, concise, and beautifully formatted in markdown.

Conversation history:
${messages.map((m: any) => `${m.role === 'user' ? 'Client' : 'NexoraAI'}: ${m.content}`).join("\n")}

Respond to the latest Client prompt with an outstanding strategic piece of advice, agency pitch, or response. Ensure your response is strictly written as NexoraAI.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedPrompt,
      config: {
        temperature: 0.7,
        systemInstruction: "You are NexoraAI, active, expert, luxury-minded marketing chief of staff for AimNexora Digital."
      }
    });

    const reply = response.text || "I am currently analyzing your goals. How can we elevate your brand today?";
    res.json({
      role: "assistant",
      content: reply
    });
  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    res.status(500).json({ error: "Unable to process message right now. Please try again." });
  }
});

// 2. Lead collection endpoint
app.post("/api/leads", (req, res) => {
  const { name, businessName, email, phone, serviceNeeded, budget, message, source } = req.body;

  if (!name || !email || !serviceNeeded) {
    return res.status(400).json({ error: "Missing required fields (Name, Email, Service Needed)" });
  }

  const newLead = {
    id: `lead-${Date.now()}`,
    name,
    businessName: businessName || "Undisclosed",
    email,
    phone: phone || "Not Provided",
    serviceNeeded,
    budget: budget || "Custom Scope",
    message: message || "Interested in elevating digital performance.",
    createdAt: new Date().toISOString(),
    status: "New",
    source: source || "Web Form"
  };

  leads.unshift(newLead);
  pageViews.leadsConverted += 1;

  res.status(201).json({
    success: true,
    message: "Thank you! AimNexora's chief strategist will contact you within 2 business hours. Check your inbox for confirmation.",
    lead: newLead
  });
});

// 3. Get leads (Admin / CRM view)
app.get("/api/leads", (req, res) => {
  res.json(leads);
});

// 4. Update lead status
app.patch("/api/leads/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const leadIndex = leads.findIndex(l => l.id === id);
  if (leadIndex === -1) {
    return res.status(404).json({ error: "Lead not found" });
  }

  leads[leadIndex].status = status;
  res.json({ success: true, lead: leads[leadIndex] });
});

// 5. Subscribe to newsletter
app.post("/api/newsletter", (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Please enter a valid business email." });
  }

  const exists = subscribers.some(s => s.email === email);
  if (exists) {
    return res.json({ success: true, message: "You are already subscribed to Nexora Insights." });
  }

  subscribers.unshift({ email, subscribedAt: new Date().toISOString() });
  res.json({ success: true, message: "Welcome to Nexora Insights. Elevating newsletter strategy starting today!" });
});

// 6. Get newsletters (Admin view)
app.get("/api/newsletter", (req, res) => {
  res.json(subscribers);
});

// 7. Get dashboard metrics
app.get("/api/analytics", (req, res) => {
  res.json({
    pageViews,
    recentLeads: leads.slice(0, 5),
    subscribersCount: subscribers.length
  });
});

// Vite Integration Setup & Server Start
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Mount Vite middleware in development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 AimNexora Digital full stack server running on http://localhost:${PORT}`);
  });
}

startServer();
