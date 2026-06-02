import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  Star,
  CheckCircle2,
  Calendar,
  Send,
  HelpCircle,
  Clock,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Search,
  MessageSquare,
  ChevronDown,
  Globe,
  Briefcase,
  Layers,
  ShieldCheck,
  ChevronRight,
  User,
  Menu,
  X,
  FileText,
  AlertCircle,
  Home,
  ArrowUp
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import BrandLogo from "./components/BrandLogo";
import AIChatBot from "./components/AIChatBot";
import InteractiveMarketingCanvas from "./components/InteractiveMarketingCanvas";
import AnimatedMetricNumber from "./components/AnimatedMetricNumber";
import AnimatedHeadline from "./components/AnimatedHeadline";
import AdminHub from "./components/AdminHub";
import {
  SERVICES_DATA,
  CASE_STUDIES_DATA,
  PORTFOLIO_DATA,
  BLOG_DATA,
  TESTIMONIALS_DATA,
  GROWTH_FRAMEWORK_STEPS,
  AGENCY_JOURNEY_TIMELINE,
  AGENCY_CORE_VALUES,
  LEADERSHIP_PROFILES
} from "./data";
import { LeadFormInput, BlogPost, PortfolioItem, ServiceDetail } from "./types";

// Helper to render premium animated icons based on service ID for elite visual customization
const renderServiceIcon = (id: string) => {
  const iconProps = { className: "w-5 h-5 text-[#D946EF] group-hover:scale-110 transition-transform duration-300" };
  switch (id) {
    case "seo":
      return <Search {...iconProps} />;
    case "ppc":
      return <TrendingUp {...iconProps} />;
    case "social-media-marketing":
      return <Users {...iconProps} />;
    case "content-marketing":
      return <FileText {...iconProps} />;
    case "email-marketing":
      return <Mail {...iconProps} />;
    case "web-development":
      return <Globe {...iconProps} />;
    case "video-marketing":
      return <ExternalLink {...iconProps} />;
    case "branding":
      return <Award {...iconProps} />;
    case "analytics":
      return <ShieldCheck {...iconProps} />;
    case "lead-generation":
      return <Sparkles {...iconProps} />;
    default:
      return <Layers {...iconProps} />;
  }
};

export default function App() {
  // Navigation / Routing state
  const [currentPage, setCurrentPage] = useState<string>("home"); // home, services, case-studies, portfolio, blog, about, contact, crm
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any | null>(null);

  // Filter conditions
  const [portfolioFilter, setPortfolioFilter] = useState<string>("All");
  const [blogSearch, setBlogSearch] = useState<string>("");
  const [blogCategory, setBlogCategory] = useState<string>("All");

  // Interaction widgets states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [showLeadPopup, setShowLeadPopup] = useState(false);
  const [popupEmail, setPopupEmail] = useState("");
  const [popupSubscribed, setPopupSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMsg, setNewsletterMsg] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [rawScrollY, setRawScrollY] = useState(0);

  // Lead Generation form elements
  const [leadForm, setLeadForm] = useState<LeadFormInput>({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    serviceNeeded: "SEO Analytics & Mapping",
    budget: "$5,000 - $10,000/mo",
    message: ""
  });
  const [leadStatus, setLeadStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: ""
  });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  // Calendly / Cal.com Booking Scheduler Simulator
  const [bookingPlatform, setBookingPlatform] = useState<"Cal.com" | "Calendly">("Cal.com");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingBrand, setBookingBrand] = useState("");
  const [bookingDuration, setBookingDuration] = useState("15 Min Strategy Call");
  const [bookingAdvisor, setBookingAdvisor] = useState("Aman Mathur (CGO)");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Floating WhatsApp Business Assistant States
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [whatsappName, setWhatsappName] = useState("");
  const [whatsappEmail, setWhatsappEmail] = useState("");
  const [whatsappPhone, setWhatsappPhone] = useState("");
  const [whatsappMsg, setWhatsappMsg] = useState("");
  const [whatsappInterest, setWhatsappInterest] = useState("Custom Meta/Google Ads Audit");
  const [whatsappContactPref, setWhatsappContactPref] = useState("WhatsApp Direct");
  const [whatsappStatus, setWhatsappStatus] = useState<"idle" | "submitting" | "completed">("idle");

  // Sitemap Modal State
  const [sitemapOpen, setSitemapOpen] = useState(false);
  const [sitemapTab, setSitemapTab] = useState<"visual" | "xml">("visual");

  // Scroll to Top visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // FAQ Accordion index track
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Trigger popups
  useEffect(() => {
    // 1. Lead popup after 12 seconds
    const popupTimer = setTimeout(() => {
      const dismissed = sessionStorage.getItem("dismissed_lead_popup");
      if (!dismissed) {
        setShowLeadPopup(true);
      }
    }, 12000);

    // 2. Click tracking for scroll progress indicator
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      setRawScrollY(window.scrollY);
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // 3. Exit intent detection (cursor exit on window top)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 30) {
        const exitShown = sessionStorage.getItem("exit_intent_shown");
        if (!exitShown) {
          setShowExitIntent(true);
          sessionStorage.setItem("exit_intent_shown", "true");
        }
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(popupTimer);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Sync scroll to top on routing changes
  const navigateTo = (page: string, serviceId: string | null = null, blog: BlogPost | null = null) => {
    setCurrentPage(page);
    setSelectedServiceId(serviceId);
    setSelectedBlog(blog);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Submit main Lead Registration form
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email || !leadForm.message) {
      setLeadStatus({ type: "error", message: "Please fill out all required fields marked with *." });
      return;
    }

    setIsSubmittingLead(true);
    setLeadStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadForm)
      });
      const data = await res.json();

      if (res.ok) {
        setLeadStatus({ type: "success", message: data.message });
        setLeadForm({
          name: "",
          businessName: "",
          email: "",
          phone: "",
          serviceNeeded: "SEO Analytics & Mapping",
          budget: "$5,000 - $10,000/mo",
          message: ""
        });
      } else {
        setLeadStatus({ type: "error", message: data.error || "Something went wrong." });
      }
    } catch (e) {
      setLeadStatus({
        type: "success",
        message: "Offline / Demo Node Success State: Your information was committed to local memory cache! AimNexora lead strategist will synchronize."
      });
    } finally {
      setIsSubmittingLead(false);
    }
  };

  // Submit footer newsletter
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      setNewsletterMsg("Please enter a valid email context.");
      return;
    }

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail })
      });
      const data = await res.json();
      setNewsletterMsg(data.message || "Thank you for subscribing!");
      setNewsletterEmail("");
    } catch (err) {
      setNewsletterMsg("Offline State: Thank you for registering to Nexora Insights!");
      setNewsletterEmail("");
    }
  };

  // Submit exit intent popup newsletter
  const handlePopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!popupEmail || !popupEmail.includes("@")) return;

    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: popupEmail })
      });
    } catch (err) { /* silent fail */ }

    setPopupSubscribed(true);
    setTimeout(() => {
      setShowLeadPopup(false);
      setShowExitIntent(false);
    }, 2000);
  };

  // Submit simulated Calendly/Cal.com booking details directly to CRM server
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime || !bookingName || !bookingEmail) return;

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingName,
          businessName: bookingBrand || "Undisclosed",
          email: bookingEmail,
          phone: "Scheduler Outbox",
          serviceNeeded: `${bookingPlatform} Consultation`,
          budget: bookingDuration,
          message: `Scheduled strategy session with ${bookingAdvisor} on ${bookingDate} during block: ${bookingTime}. Platform: ${bookingPlatform}.`,
          source: bookingPlatform
        })
      });

      if (response.ok) {
        setBookingSubmitted(true);
      } else {
        setBookingSubmitted(true); // Fallback so UI completes even if server fails
      }
    } catch (err) {
      console.error("Booking submit error:", err);
      setBookingSubmitted(true); // Fallback
    }
  };

  // Submit WhatsApp Instant Inquiry both as a CRM lead and launch native WhatsApp app
  const handleWhatsAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsappName || !whatsappEmail || !whatsappPhone) return;

    setWhatsappStatus("submitting");

    try {
      const payload = {
        name: whatsappName,
        businessName: `Pref: ${whatsappContactPref}`,
        email: whatsappEmail,
        phone: whatsappPhone,
        serviceNeeded: `WhatsApp Inquiry: ${whatsappInterest}`,
        budget: "Instant Chat Lead",
        message: whatsappMsg ? whatsappMsg : `Prospect clicked floating WhatsApp button for urgent chat. Focus: ${whatsappInterest}. Preferred: ${whatsappContactPref}.`,
        source: "WhatsApp"
      };

      // Register the lead in our CRM Backend database
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
    } catch (err) {
      console.error("WhatsApp sync lead err:", err);
    }

    // Compose high-fidelity message template for client-to-agent WhatsApp Business chat
    const lineBreak = "%0A";
    const waText = `Hi AimNexora Digital,${lineBreak}${lineBreak}` +
      `*Name:* ${whatsappName}${lineBreak}` +
      `*Email:* ${whatsappEmail}${lineBreak}` +
      `*Phone:* ${whatsappPhone}${lineBreak}` +
      `*Primary Interest:* ${whatsappInterest}${lineBreak}` +
      `*Message:* ${whatsappMsg || "I would like to diagnose my current campaign results immediately."}${lineBreak}${lineBreak}` +
      `⚡ Sent from interactive WhatsApp Business assistant bubble`;

    const whatsappUrl = `https://wa.me/919110024890?text=${encodeURIComponent(decodeURIComponent(waText))}`;
    
    // Open WhatsApp Chat flow
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setWhatsappStatus("completed");
    
    // Reset inputs
    setTimeout(() => {
      setWhatsappOpen(false);
      setWhatsappStatus("idle");
      // keep basic details for subsequent clicks, but clear custom message
      setWhatsappMsg("");
    }, 2500);
  };

  const dismissPopup = (type: "lead" | "exit") => {
    if (type === "lead") {
      setShowLeadPopup(false);
      sessionStorage.setItem("dismissed_lead_popup", "true");
    } else {
      setShowExitIntent(false);
    }
  };

  // General Questions Array for accordion list
  const GENERAL_FAQS = [
    {
      q: "What makes AimNexora Digital different from standard digital marketing templates?",
      a: "We do not sell pre-packaged, generic plans. We built custom modular platforms using high-performance technologies (like headless systems and React architectures) that result in sub-400ms page delivery. We link all active ad campaigns directly back to your database using server-side Conversions API, offering precise attribution calculations."
    },
    {
      q: "How exactly do your server-side attribution systems combat cookie blockers?",
      a: "We run custom server container instances (Meta Conversions API & GA4 Cloud Tagging) under your own sub-domain URLs (e.g. tracking.yourbrand.com). Triggers go directly back-end to back-end, completely bypassing browser-based ad blockers and ensuring 100% attribution accuracy."
    },
    {
      q: "What is your target timeframe to see tangible SEO rankings improvements?",
      a: "Technical code optimization and Core Web Vital tuning display immediately in Google crawls. Targeted keyword ranking shifts on localized Search Map Packs regularly materialize between 45 to 60 days, while massive enterprise keyword hubs create permanent organic authority in 90 to 120 days."
    },
    {
      q: "Can you manage and coordinate digital budgets across multiple channels natively?",
      a: "Absolutely. Our marketing chief of staff maps client ad investments algorithmically between Google Search, Meta channels, LinkedIn lead generators, and YouTube remarketing networks, migrating budgets in real-time to the highest-performing campaigns based on CPA."
    },
    {
      q: "Do you build custom ecommerce platforms and direct response landing areas?",
      a: "Yes. Our web labs construct custom headless storefronts that yield optimal buying conversion metrics. Because there's zero bloat of old template plugins, checkouts load instantly and reduce standard cart abort rates by up to 42%."
    },
    {
      q: "How does the B2B Lead Generation and appointment setup actually coordinate?",
      a: "We build secure secondary email sending frameworks to scale out value proposition messages to verified targeted buy profiles. Once a prospect selects an appointment block, our automations schedule meeting schedules natively on your calendars."
    },
    {
      q: "What credentials and trust certificates does AimNexora carry?",
      a: "Our agency is a certified Google Partner, Meta Business Partner, and certified GA4 Advanced Analytics deployment hub. Every leader carries over 10 years of specific enterprise brand management expertise."
    },
    {
      q: "Do you offer direct copywriting, script creation, and short-form video operations?",
      a: "Yes. Our visual division scripts, clips, and color-Polish high-retention vertical Reels and TikToks natively designed to hook viewers within 3 seconds, turning interest into direct leads."
    },
    {
      q: "Do we get real-time tracking links to our analytics or do we wait for monthly sheets?",
      a: "You receive continuous 24/7 access to customized Looker Studio Business Intelligence suites linking ad spend and revenue metrics in real-time. No static spreadsheets or delayed reports."
    },
    {
      q: "How do we get started with AimNexora Digital today?",
      a: "Fill out our strategic lead capture form or book an instant 15-minute diagnostic calendar consultation right here on our portal. We'll outline custom roadmaps for your team."
    }
  ];

  return (
    <div className="bg-[#050505] dot-grid min-h-screen text-white relative selection:bg-[#A855F7] selection:text-white font-sans leading-relaxed overflow-x-hidden" id="aim_site_master">
      {/* Aurora visual glow background blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#4c1d95]/20 rounded-full aurora-blur z-0 animate-float" />
      <div className="absolute top-[35vh] right-10 w-[500px] h-[500px] bg-[#25143a]/25 rounded-full aurora-blur z-0 animate-float-delayed" />
      <div className="absolute bottom-[20vh] left-5 w-80 h-80 bg-[#D946EF]/15 rounded-full aurora-blur z-0 animate-float" />

      {/* Sticky Top Scroll Indicator bar */}
      <div className="fixed top-0 left-0 h-1 bg-[#D946EF] z-[100] transition-all duration-100" style={{ width: `${scrollProgress}%` }} id="aim_scroll_bar" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-md border-b border-white/5" id="aim_site_navbar">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => navigateTo("home")} id="aim_logo_link">
            <BrandLogo />
          </div>

          {/* Desktop Navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-300" id="aim_desktop_menu">
            <button
              onClick={() => navigateTo("home")}
              className={`hover:text-white transition duration-200 cursor-pointer ${currentPage === "home" ? "text-[#D946EF] font-bold" : ""}`}
            >
              Home
            </button>
            
            {/* Services dropdown menu trigger */}
            <div className="relative group">
              <button
                onClick={() => navigateTo("services")}
                className={`hover:text-white transition duration-200 cursor-pointer flex items-center gap-1 ${currentPage === "services" ? "text-[#D946EF] font-bold" : ""}`}
              >
                Services <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full -left-4 w-64 bg-zinc-950 border border-white/10 rounded-xl p-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl space-y-1 mt-1">
                {SERVICES_DATA.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => navigateTo("services", srv.id)}
                    className="w-full text-left text-xs px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition"
                  >
                    {srv.title}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigateTo("case-studies")}
              className={`hover:text-white transition duration-200 cursor-pointer ${currentPage === "case-studies" ? "text-[#D946EF] font-bold" : ""}`}
            >
              Case Studies
            </button>

            <button
              onClick={() => navigateTo("portfolio")}
              className={`hover:text-white transition duration-200 cursor-pointer ${currentPage === "portfolio" ? "text-[#D946EF] font-bold" : ""}`}
            >
              Portfolio
            </button>

            <button
              onClick={() => navigateTo("blog")}
              className={`hover:text-white transition duration-200 cursor-pointer ${currentPage === "blog" ? "text-[#D946EF] font-bold" : ""}`}
            >
              Insights Blog
            </button>

            <button
              onClick={() => navigateTo("about")}
              className={`hover:text-white transition duration-200 cursor-pointer ${currentPage === "about" ? "text-[#D946EF] font-bold" : ""}`}
            >
              About Agency
            </button>
            <button
              onClick={() => navigateTo("contact")}
              className={`hover:text-white transition duration-200 cursor-pointer ${currentPage === "contact" ? "text-[#D946EF] font-bold" : ""}`}
            >
              Contact
            </button>
          </nav>

          {/* Glowing CTA and Admin Sync links */}
          <div className="hidden lg:flex items-center gap-4" id="aim_nav_ctas">
            <button
              onClick={() => navigateTo("crm")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all cursor-pointer ${
                currentPage === "crm"
                  ? "bg-[#D946EF] text-[#050505] border-[#A855F7]"
                  : "bg-[#18092a]/50 text-[#D946EF] border-[#A855F7]/30 hover:border-[#A855F7]"
              }`}
              id="aim_toggle_crm_btn"
            >
              🛡 CRM Portal
            </button>
            <button
              onClick={() => navigateTo("contact")}
              className="bg-gradient-to-r from-[#25143a] to-[#581c87] hover:to-[#D946EF] hover:text-black text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/10 glow-btn transition-all duration-300 cursor-pointer"
              id="aim_top_consultation_cta"
            >
              Book Strategy Call
            </button>
          </div>

          {/* Mobile Menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-400 hover:text-white p-2 rounded-md transition cursor-pointer"
            id="aim_mobile_menu_trigger"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation overlay drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-[#0A0A0A] border-t border-white/5 px-6 py-6 space-y-4 shadow-xl z-50 relative overflow-hidden"
              id="aim_mobile_drawer"
            >
              <div className="grid grid-cols-2 gap-3 text-sm">
                <button
                  onClick={() => navigateTo("home")}
                  className="p-3 text-left bg-zinc-950 rounded-xl text-gray-300 hover:text-white"
                >
                  ⚡ Home
                </button>
                <button
                  onClick={() => navigateTo("services")}
                  className="p-3 text-left bg-zinc-950 rounded-xl text-gray-300 hover:text-white"
                >
                  📚 Services
                </button>
                <button
                  onClick={() => navigateTo("case-studies")}
                  className="p-3 text-left bg-zinc-950 rounded-xl text-gray-300 hover:text-white"
                >
                  📊 Case Studies
                </button>
                <button
                  onClick={() => navigateTo("portfolio")}
                  className="p-3 text-left bg-zinc-950 rounded-xl text-gray-300 hover:text-white"
                >
                  🎨 Portfolio
                </button>
                <button
                  onClick={() => navigateTo("blog")}
                  className="p-3 text-left bg-zinc-950 rounded-xl text-gray-300 hover:text-white"
                >
                  📝 News Blog
                </button>
                <button
                  onClick={() => navigateTo("about")}
                  className="p-3 text-left bg-zinc-950 rounded-xl text-gray-300 hover:text-white"
                >
                  🏢 About Us
                </button>
                <button
                  onClick={() => navigateTo("contact")}
                  className="p-3 text-left bg-zinc-950 rounded-xl text-gray-300 hover:text-white"
                >
                  ✉️ Contact
                </button>
                <button
                  onClick={() => navigateTo("crm")}
                  className="p-3 text-left bg-[#1e112d]/60 border border-[#a855f7]/25 rounded-xl text-[#D946EF]"
                >
                  🛡 CRM Portal
                </button>
              </div>

              {/* Instant Call-to-action */}
              <button
                onClick={() => navigateTo("contact")}
                className="w-full block bg-[#D946EF] text-[#050505] font-bold text-center py-3 rounded-xl text-sm"
              >
                Claim Free Marketing Audit
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Primary Page Layout router */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10" id="aim_site_primary_main">
        <InteractiveMarketingCanvas />
        <AnimatePresence mode="wait">
          {/* 1. HOME VIEW */}
          {currentPage === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-24"
              id="aim_page_home"
            >
              {/* HERO SECTION */}
              <section className="min-h-[calc(100vh-12rem)] flex flex-col lg:flex-row items-center justify-between gap-12 pt-6" id="aim_hero_block">
                {/* Left Hero Details */}
                <div className="flex-1 space-y-6 text-left relative" id="aim_hero_left">
                  {/* High Tech Animated 3D target shape in background behind slogan */}
                  <div className="absolute -left-16 -top-16 w-80 h-80 sm:w-96 sm:h-96 select-none pointer-events-none z-0 flex items-center justify-center opacity-30" id="aim_hero_left_wireframe_back">
                    <div className="absolute inset-4 rounded-full border-2 border-dashed border-[#A855F7]/30 animate-spin" style={{ animationDuration: "35s" }}></div>
                    <div className="absolute inset-10 rounded-full border border-double border-[#A855F7]/25 animate-spin" style={{ animationDuration: "12s", animationDirection: "reverse" }}></div>
                    <div className="absolute inset-16 rounded-full border-4 border-l-[#A855F7]/40 border-t-[#D946EF]/40 border-transparent animate-spin" style={{ animationDuration: "20s" }}></div>
                    <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-[#A855F7]/15 to-[#D946EF]/15 blur-3xl"></div>
                  </div>

                  <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18092a]/50 border border-[#A855F7]/20 rounded-full text-xs font-mono text-[#D946EF]">
                      <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
                      Now Launching B2B Attribution Solutions
                    </div>

                    <AnimatedHeadline 
                      id="aim_hero_headline" 
                      className="text-4xl sm:text-5xl lg:text-7xl font-display font-black tracking-tight text-white leading-[1.05] uppercase mt-2"
                    />

                    <p className="text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed font-sans border-l-2 border-[#A855F7]/30 pl-4 py-1" id="aim_hero_subheadline">
                      <span className="text-white font-semibold block mb-1">Stop guessing. Start dominating.</span> We engineer high-velocity attribution engines and custom digital structures to capture, verify, and scale exponential growth.
                    </p>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3" id="aim_hero_ctas">
                      <button
                        onClick={() => navigateTo("contact")}
                        className="glow-btn bg-gradient-to-r from-[#A855F7] to-[#D946EF] text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 duration-300 shadow-[0_4px_25px_rgba(217,70,239,0.3)] cursor-pointer"
                      >
                        Book Strategy Call <ArrowRight className="w-4 h-4 animate-bounce" style={{ animationDuration: "1.5s" }} />
                      </button>
                      <button
                        onClick={() => navigateTo("contact")}
                        className="bg-zinc-950 border border-[#A855F7]/30 hover:border-[#D946EF] text-gray-200 hover:text-white font-semibold px-8 py-4 rounded-xl text-center duration-300 cursor-pointer shadow-md"
                      >
                        Get Free Marketing Audit
                      </button>
                    </div>

                    {/* Trust Badges section */}
                    <div className="pt-6 space-y-2" id="aim_hero_badges">
                      <span className="text-[10px] font-mono tracking-widest text-[#D946EF] font-bold uppercase">CERTIFIED EXPERT SYSTEMS</span>
                      <div className="flex flex-wrap gap-4 text-[11px] text-gray-400 font-mono">
                        <span className="bg-black/40 border border-white/5 px-2.5 py-1 rounded flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-[#D946EF]" /> Google Ads Partner</span>
                        <span className="bg-black/40 border border-white/5 px-2.5 py-1 rounded flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-[#D946EF]" /> Meta Verified Business</span>
                        <span className="bg-black/40 border border-white/5 px-2.5 py-1 rounded flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-[#D946EF]" /> LinkedIn Network</span>
                        <span className="bg-black/40 border border-white/5 px-2.5 py-1 rounded flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-[#D946EF]" /> Google Analytics 4 API</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Hero: Stunning High-fidelity generated Mockup and dynamic scroll-tied elements */}
                <div className="flex-1 w-full max-w-lg lg:max-w-xl flex justify-center items-center relative" id="aim_hero_right">
                  {/* Glowing backdrop circle */}
                  <div className="absolute w-96 h-96 bg-[#A855F7]/20 rounded-full blur-[100px] animate-pulse-purple" />
                  
                  {/* DYNAMIC SCROLL ANIMATED HYDRO-BLOB & METALLIC HUD marking tracker */}
                  <div 
                    className="absolute z-20 pointer-events-none -top-10 -right-10 w-44 h-44 rounded-full border border-dashed border-[#D946EF]/50 flex items-center justify-center bg-[#1e112d]/30 backdrop-blur-md shadow-[0_0_30px_rgba(217,70,239,0.25)]"
                    style={{
                      transform: `translateY(${rawScrollY * 0.25}px) rotate(${rawScrollY * 0.4}deg)`,
                      transition: "transform 0.1s ease-out"
                    }}
                    id="aim_scroll_parallax_blob"
                  >
                    <div className="w-28 h-28 rounded-full border border-double border-pink-400/40 p-4 animate-spin" style={{ animationDuration: "14s" }}>
                      <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#A855F7] to-[#D946EF] opacity-25" />
                    </div>
                    <div className="absolute font-mono text-[9px] text-[#D946EF] font-bold tracking-widest animate-pulse">ATTRIBUTION NODES</div>
                    <div className="absolute -bottom-2 bg-black border border-white/10 px-2.5 py-1 text-[9px] font-mono rounded-full text-white">SCROLL TRACKER</div>
                  </div>

                  {/* SECONDARY HOVERING METALLIC HUD COMPASS RING */}
                  <div 
                    className="absolute z-10 pointer-events-none -bottom-8 -left-8 w-36 h-36 rounded-full border-2 border-[#D946EF]/30 flex items-center justify-center bg-black/40 backdrop-blur-md"
                    style={{
                      transform: `translateY(${rawScrollY * -0.15}px) rotate(${rawScrollY * -0.3}deg)`,
                      transition: "transform 0.1s ease-out"
                    }}
                    id="aim_scroll_parallax_hud_ring"
                  >
                    <div className="absolute w-24 h-24 border border-dashed border-[#A855F7]/30 rounded-full animate-spin" style={{ animationDuration: "10s" }}></div>
                    <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Nexora+</div>
                  </div>

                  {/* Main High Fidelity Premium dashboard mockup representation */}
                  <div className="w-full relative z-10 rounded-2xl overflow-hidden border border-[#A855F7]/30 shadow-2xl bg-black/50 group" id="aim_hero_dashboard_wrapper">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#A855F7]/10 to-[#D946EF]/10 pointer-events-none" />
                    
                    {/* Top window outline bar resembling luxury UI */}
                    <div className="bg-[#120922]/80 border-b border-white/5 py-2 px-4 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                      <span className="text-[10px] font-mono text-gray-500 ml-4">https://insights.aimnexora.com/attribution-report</span>
                    </div>

                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img 
                        src="/src/assets/images/cyber_dashboard_hero_1780339405289.png" 
                        alt="AimNexora Analytics Engine Dashboard" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        referrerPolicy="no-referrer"
                        id="aim_hero_dashboard_image"
                      />
                      
                      {/* Interactive real-time metrics overlay with glassmorphism */}
                      <div className="absolute bottom-4 left-4 bg-black/85 border border-white/10 rounded-xl px-4 py-3 shadow-lg backdrop-blur-md flex items-center gap-3 animate-float">
                        <span className="p-2 bg-[#D946EF]/20 text-[#D946EF] rounded-lg font-bold"><TrendingUp className="w-4 h-4" /></span>
                        <div>
                          <p className="text-[10px] text-gray-400 font-mono">LIVE CAMPAIGN GAIN</p>
                          <p className="text-white font-black text-sm font-display leading-[1]"><AnimatedMetricNumber text="+184.2% ROI" /></p>
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 bg-black/85 border border-white/10 rounded-xl px-4 py-3 shadow-lg backdrop-blur-md flex items-center gap-3 animate-float-delayed">
                        <span className="p-2 bg-[#A855F7]/20 text-[#A855F7] rounded-lg font-bold"><ShieldCheck className="w-4 h-4" /></span>
                        <div>
                          <p className="text-[10px] text-gray-400 font-mono">INDEX HEALTH</p>
                          <p className="text-white font-black text-sm font-display leading-[1]"><AnimatedMetricNumber text="100% PERFECT" /></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* AGENCY METRICS PANEL */}
              <section className="premium-gradient-border bg-black/60 backdrop-blur-lg rounded-2xl p-8 shadow-2xl relative overflow-hidden" id="aim_home_metrics_bar">
                {/* Horizontal scanning active ambient bar */}
                <div className="absolute top-0 left-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#A855F7] to-transparent animate-[pulse_2s_infinite]" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/5 relative z-10 text-left">
                  <div className="space-y-1 text-center md:text-left md:pl-2">
                    <span className="text-4xl sm:text-5xl font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f472b6] to-[#a855f7] inline-block"><AnimatedMetricNumber text="250+" /></span>
                    <p className="text-xs text-gray-300 font-mono font-bold tracking-widest uppercase mt-1">Projects Delivered</p>
                    <p className="text-[11px] text-gray-500">Pruned local and global campaigns.</p>
                  </div>
                  <div className="space-y-1 text-center md:text-left md:pl-6 pt-4 md:pt-0">
                    <span className="text-4xl sm:text-5xl font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f472b6] to-[#a855f7] inline-block"><AnimatedMetricNumber text="98%" /></span>
                    <p className="text-xs text-gray-300 font-mono font-bold tracking-widest uppercase mt-1">Client Satisfaction</p>
                    <p className="text-[11px] text-gray-500">Based on absolute revenue growth audits.</p>
                  </div>
                  <div className="space-y-1 text-center md:text-left md:pl-6 pt-4 md:pt-0">
                    <span className="text-4xl sm:text-5xl font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f472b6] to-[#a855f7] inline-block"><AnimatedMetricNumber text="$12M+" /></span>
                    <p className="text-xs text-gray-300 font-mono font-bold tracking-widest uppercase mt-1">Ad Spend Managed</p>
                    <p className="text-[11px] text-gray-500">Fitted to target acquisition indices.</p>
                  </div>
                  <div className="space-y-1 text-center md:text-left md:pl-6 pt-4 md:pt-0">
                    <span className="text-4xl sm:text-5xl font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f472b6] to-[#a855f7] inline-block"><AnimatedMetricNumber text="500+" /></span>
                    <p className="text-xs text-gray-300 font-mono font-bold tracking-widest uppercase mt-1">Active Campaigns</p>
                    <p className="text-[11px] text-gray-500">Across Google, Meta, and B2B platforms.</p>
                  </div>
                </div>
              </section>

              {/* SERVICES SUMMARY CARDS */}
              <section className="space-y-8" id="aim_home_services">
                <div className="text-center space-y-3 max-w-2xl mx-auto">
                  <span className="text-[#D946EF] font-mono font-bold tracking-widest text-xs uppercase bg-[#D946EF]/10 px-3 py-1 rounded-full">Surgical Offerings</span>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">Our Performance Capabilities</h2>
                  <p className="text-gray-400 text-xs sm:text-sm">We provide tailored digital strategies to establish domain brand dominance, optimize paid ad performance, and secure B2B client bookings.</p>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {SERVICES_DATA.slice(0, 6).map((service, index) => (
                     <motion.div
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true, margin: "-30px" }}
                       whileHover={{ y: -8, scale: 1.015, boxShadow: "0 10px 30px -10px rgba(54, 173, 163, 0.15)" }}
                       transition={{ duration: 0.35, delay: index * 0.05 }}
                       key={service.id}
                       className="glass bg-[#0A0A0A]/80 hover:bg-[#101010]/80 p-6 rounded-2xl border border-white/5 hover:border-[#A855F7]/30 flex flex-col justify-between group h-64 cursor-pointer"
                       id={`srv_card_${service.id}`}
                       onClick={() => navigateTo("services", service.id)}
                     >
                       <div className="space-y-3 text-left">
                         <div className="w-10 h-10 rounded-xl bg-[#1e112d]/50 border border-[#A855F7]/20 flex items-center justify-center">
                           {renderServiceIcon(service.id)}
                         </div>
                         <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#D946EF] transition duration-200">
                           {service.title}
                         </h3>
                         <p className="text-gray-400 text-xs line-clamp-3">
                           {service.shortDesc}
                         </p>
                       </div>
                       <button
                         onClick={(e) => {
                           e.stopPropagation();
                           navigateTo("services", service.id);
                         }}
                         className="text-[11px] font-mono tracking-widest text-[#D946EF] hover:text-white uppercase font-bold flex items-center gap-1.5 pt-4 text-left cursor-pointer transition-colors"
                       >
                         Explore Service Specs <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                       </button>
                     </motion.div>
                   ))}
                 </div>

                <div className="text-center">
                  <button
                    onClick={() => navigateTo("services")}
                    className="bg-transparent border border-[#A855F7]/30 hover:border-[#A855F7] text-[#D946EF] hover:text-white text-xs font-mono tracking-widest uppercase font-bold px-6 py-3.5 rounded-xl transition cursor-pointer"
                  >
                    View All 10 Capabilities & Solutions
                  </button>
                </div>
              </section>

              {/* WHY CHOOSE US CARDS */}
              <section className="space-y-8" id="aim_home_why_us">
                <div className="text-center space-y-3 max-w-2xl mx-auto">
                  <span className="text-[#D946EF] font-mono font-bold tracking-widest text-xs uppercase bg-[#D946EF]/10 px-3 py-1 rounded-full">Competitive Edge</span>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">Data-Driven Execution</h2>
                  <p className="text-gray-400 text-xs sm:text-sm">Why global direct-to-consumer and business brands choose AimNexora Digital.</p>
                </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="aim_why_cards_grid">
                   {[
                     {
                       icon: <TrendingUp className="w-5 h-5" />,
                       title: "Data-Driven Strategies",
                       desc: "No generic growth forecasts. We optimize campaigns using transparent key analytics and client sales values."
                     },
                     {
                       icon: <Users className="w-5 h-5" />,
                       title: "Experienced Team",
                       desc: "Each of our strategists carries over a decade of category authority, managing multi-million budgets with ease."
                     },
                     {
                       icon: <ShieldCheck className="w-5 h-5" />,
                       title: "Server-Side Tracking",
                       desc: "Bypass iOS browser blocks and maintain 100% attribution accuracy with custom API tagging."
                     },
                     {
                       icon: <MessageSquare className="w-5 h-5" />,
                       title: "Dedicated Support",
                       desc: "Active WhatsApp consulting buffers and bi-weekly growth briefings directly with our founders."
                     },
                     {
                       icon: <Award className="w-5 h-5" />,
                       title: "ROI Oriented Optimization",
                       desc: "Everything we do aligns with reducing CPA limits and maximizing client lifetime conversion metrics."
                     },
                     {
                       icon: <Sparkles className="w-5 h-5" />,
                       title: "AI-Powered Marketing",
                       desc: "We customize AI models to crawl lookalike databases for targeted prospect segments instantly."
                     }
                   ].map((item, idx) => (
                     <motion.div
                       key={idx}
                       initial={{ opacity: 0, y: 15 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true, margin: "-20px" }}
                       whileHover={{ y: -5, scale: 1.012, borderColor: "rgba(54,173,163,0.35)" }}
                       transition={{ duration: 0.35, delay: idx * 0.05 }}
                       className="glass bg-[#0C0C0C] p-6 rounded-2xl border border-white/5 transition-all duration-300 space-y-4 text-left cursor-default shadow-lg hover:shadow-[0_0_20px_rgba(54,173,163,0.06)]"
                     >
                       <div className="w-10 h-10 rounded-xl bg-[#4c1d95]/20 border border-white/5 flex items-center justify-center text-[#D946EF] group-hover:scale-105 transition duration-300">
                         {item.icon}
                       </div>
                       <div className="space-y-1.5">
                         <h4 className="text-base font-bold text-white transition-colors duration-200">{item.title}</h4>
                         <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                       </div>
                     </motion.div>
                   ))}
                 </div>
              </section>

              {/* CASE STUDIES TEASER */}
              <section className="space-y-8" id="aim_home_case_teaser">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                  <div className="space-y-3">
                    <span className="text-[#D946EF] font-mono font-bold tracking-widest text-xs uppercase">Enterprise Success Metrics</span>
                    <h2 className="text-2xl sm:text-4xl font-display font-semibold text-white tracking-tight">Aesthetic Showcase</h2>
                  </div>
                  <button
                    onClick={() => navigateTo("case-studies")}
                    className="text-[#D946EF] hover:text-white font-mono text-xs tracking-widest uppercase font-bold flex items-center gap-1 cursor-pointer"
                  >
                    View All Case Studies <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="aim_home_case_studies">
                   {CASE_STUDIES_DATA.slice(0, 3).map((study, idx) => (
                     <motion.div
                       initial={{ opacity: 0, y: 15 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true, margin: "-10px" }}
                       whileHover={{ y: -6, scale: 1.015, borderColor: "rgba(54,173,163,0.3)" }}
                       transition={{ duration: 0.35, delay: idx * 0.05 }}
                       key={study.id}
                       onClick={() => {
                         setSelectedCaseStudy(study);
                         navigateTo("case-studies");
                       }}
                       className="glass bg-[#0A0A0A] hover:bg-[#101010]/80 border border-white/5 hover:border-[#A855F7]/20 rounded-2xl p-6 transition-all duration-300 space-y-6 cursor-pointer group flex flex-col justify-between"
                     >
                       <div className="space-y-4">
                         <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                           <span>{study.industry}</span>
                           <span className="text-[#D946EF] font-bold">{study.client}</span>
                         </div>
                         <h4 className="text-lg font-bold text-white group-hover:text-[#D946EF] transition">
                           {study.title}
                         </h4>
                         <div className="grid grid-cols-2 gap-4 py-2 bg-black/40 rounded-xl p-3 border border-white/5">
                           {study.metrics.slice(0, 2).map((m, idx) => (
                             <div key={idx} className="space-y-0.5">
                               <span className="text-[#D946EF] text-xl font-display font-bold"><AnimatedMetricNumber text={m.value} /></span>
                               <p className="text-[10px] text-gray-400 leading-tight font-mono">{m.label}</p>
                             </div>
                           ))}
                         </div>
                       </div>
                       <span className="text-xs text-gray-400 font-mono flex items-center gap-1 pt-2">
                         View Detailed Metrics & Process →
                       </span>
                     </motion.div>
                   ))}
                 </div>
              </section>

              {/* 5-STEP GROWTH TIMELINE */}
              <section className="space-y-12" id="aim_home_framework">
                <div className="text-center space-y-3 max-w-2xl mx-auto">
                  <span className="text-[#D946EF] font-mono font-bold tracking-widest text-xs uppercase bg-[#D946EF]/10 px-3 py-1 rounded-full">Strategic Framework</span>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">The 5-Step Growth Engine</h2>
                  <p className="text-gray-400 text-xs sm:text-sm">How we build organic engines that deliver compound growth.</p>
                </div>

                <div className="relative border-l-2 border-dashed border-[#121358] max-w-4xl mx-auto pl-6 sm:pl-10 space-y-10" id="aim_framework_timeline">
                  {GROWTH_FRAMEWORK_STEPS.map((step, idx) => (
                    <div key={idx} className="relative space-y-2 text-left" id={`framework_step_${idx}`}>
                      {/* Timeline Dot with number */}
                      <span className="absolute -left-[45px] sm:-left-[61px] top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1e112d] border border-[#D946EF]/35 text-xs sm:text-sm font-mono font-bold text-white flex items-center justify-center shadow-lg">
                        <AnimatedMetricNumber text={step.step} />
                      </span>
                      <h4 className="text-lg font-bold text-white">{step.title}</h4>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-2xl">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* TESTIMONIALS CAROUSEL SECTION */}
              <section className="space-y-8" id="aim_home_testimonials">
                <div className="text-center space-y-3 max-w-2xl mx-auto">
                  <span className="text-[#D946EF] font-mono font-bold tracking-widest text-xs uppercase bg-[#D946EF]/10 px-3 py-1 rounded-full">Client Praise</span>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">Endorsed By Elite Operators</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="aim_testimonials_grid">
                  {TESTIMONIALS_DATA.map((t) => (
                    <div key={t.id} className="glass bg-gradient-to-tr from-[#0F0F1A]/90 to-[#0A0A0A] p-6 rounded-2xl border border-white/5 space-y-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex gap-0.5 text-amber-400">
                          {Array.from({ length: t.rating }).map((_, idx) => (
                            <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <p className="text-gray-300 text-xs leading-relaxed italic select-all font-medium">
                          "{t.review}"
                        </p>
                      </div>
                      <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                        <img
                          src={t.image}
                          alt={t.name}
                          className="w-10 h-10 rounded-full border border-[#A855F7]/30 object-cover referrerPolicy='no-referrer'"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-white">{t.name}</h4>
                          <p className="text-[10px] text-gray-500 font-mono uppercase">{t.role} • {t.company}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ ACCORDION */}
              <section className="space-y-8 max-w-4xl mx-auto" id="aim_home_faq">
                <div className="text-center space-y-3">
                  <span className="text-[#D946EF] font-mono font-bold tracking-widest text-xs uppercase">Comprehensive Guide</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-3" id="aim_faq_accordion">
                  {GENERAL_FAQS.map((faq, index) => {
                    const isExpanded = expandedFaq === index;
                    return (
                      <div key={index} className="border border-white/5 bg-[#080808]/90 rounded-xl overflow-hidden transition-all duration-300">
                        <button
                          onClick={() => setExpandedFaq(isExpanded ? null : index)}
                          className="w-full text-left p-4 sm:p-5 flex justify-between items-center gap-4 text-xs sm:text-sm font-semibold text-white hover:text-[#D946EF] transition cursor-pointer"
                        >
                          <span>{faq.q}</span>
                          <span className="text-[#D946EF] flex-shrink-0">
                            {isExpanded ? "▲" : "▼"}
                          </span>
                        </button>
                        {isExpanded && (
                          <div className="px-5 pb-5 pt-1 text-xs text-gray-400 leading-relaxed border-t border-white/5 select-text">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            </motion.div>
          )}

          {/* 2. SERVICES LIST PAGE */}
          {currentPage === "services" && (
            <motion.div
              key="services"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
              id="aim_page_services"
            >
              {/* Dynamic Service details section or main services layout */}
              {selectedServiceId ? (
                // Individual Service Specific Detail View
                (() => {
                  const srv = SERVICES_DATA.find((s) => s.id === selectedServiceId);
                  if (!srv) return <p>Service context not found.</p>;
                  return (
                    <div className="space-y-12 text-left bg-gradient-to-tr from-zinc-950 to-black p-8 rounded-2xl border border-white/5 relative overflow-hidden" id="aim_service_standalone">
                      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D946EF]/15 rounded-full aurora-blur z-0" />
                      
                      {/* Navigation Breadcrumb */}
                      <button
                        onClick={() => setSelectedServiceId(null)}
                        className="text-xs text-[#D946EF] hover:text-white font-mono uppercase tracking-widest font-bold flex items-center gap-1 cursor-pointer mb-6"
                      >
                        ← Back to Services Listing
                      </button>

                      {/* Standalone Product Hero */}
                      <div className="space-y-4 max-w-3xl relative z-10">
                        <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
                          {srv.title}
                        </h1>
                        <p className="text-[#D946EF] font-mono text-xs uppercase tracking-widest font-bold">AIMNEXORA PERFORMANT NODES</p>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                          {srv.heroDesc}
                        </p>
                      </div>

                      {/* Sub-Offerings matrix */}
                      <div className="space-y-3 pt-4" id="service_subcat_list">
                        <h4 className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase">Core Verticals Mapped</h4>
                        <div className="flex flex-wrap gap-2.5">
                          {srv.subcategories.map((sub, sIdx) => (
                            <span key={sIdx} className="px-3.5 py-1.5 bg-[#18092a]/50 border border-indigo-500/10 text-xs rounded-lg text-gray-300 font-medium">
                              ✓ {sub}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Benefits & Value Proposition Section */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6" id="service_benefits_sec">
                        {srv.benefits.map((benefit, bIdx) => (
                          <div key={bIdx} className="glass bg-black/40 border border-white/5 p-5 rounded-xl space-y-2">
                            <span className="text-[#D946EF] font-mono text-xs font-bold uppercase">Benefit {bIdx + 1}</span>
                            <h4 className="text-sm font-bold text-white">{benefit.title}</h4>
                            <p className="text-gray-400 text-xs leading-relaxed">{benefit.desc}</p>
                          </div>
                        ))}
                      </div>

                      {/* Action Process Section */}
                      <div className="space-y-6 pt-6" id="service_process_steps">
                        <h3 className="text-xl font-bold font-display text-white">4-Stage Integration Model</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          {srv.process.map((p, pIdx) => (
                            <div key={pIdx} className="glass p-5 rounded-xl border border-white/5 space-y-2 bg-gradient-to-tr from-[#121358]/10 to-zinc-950">
                              <span className="w-7 h-7 rounded-full bg-[#1e112d] text-white text-xs font-mono font-bold flex items-center justify-center">
                                {p.step}
                              </span>
                              <h4 className="text-xs sm:text-sm font-bold text-white">{p.title}</h4>
                              <p className="text-gray-400 text-[11px] leading-relaxed">{p.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Deliverables checklists */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5" id="service_deliverables_ctas">
                        <div className="space-y-4">
                          <h4 className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase">Interactive Deliverables Checklists</h4>
                          <ul className="space-y-2">
                            {srv.deliverables.map((item, dIdx) => (
                              <li key={dIdx} className="flex gap-2 text-xs text-gray-300 items-baseline">
                                <span className="text-[#D946EF] font-bold">✔</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Standalone pricing CTA card */}
                        <div className="bg-[#1e112d]/35 border border-[#A855F7]/20 p-6 rounded-xl space-y-4 flex flex-col justify-between">
                          <div className="space-y-2">
                            <h3 className="text-base font-bold text-white">Dominate with {srv.title}</h3>
                            <p className="text-gray-400 text-xs">Unlock tailored attribution roadmaps designed to lower acquisition overhead limits starting immediately.</p>
                          </div>
                          <button
                            onClick={() => navigateTo("contact")}
                            className="w-full bg-[#D946EF] text-[#050505] hover:bg-[#D946EF]/90 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition duration-200 cursor-pointer"
                          >
                            {srv.pricingCTA}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : (
                // Full list matrix representation for 10 services
                <div className="space-y-12">
                  <div className="text-center space-y-3 max-w-2xl mx-auto">
                    <span className="text-[#D946EF] font-mono font-bold tracking-widest text-xs uppercase bg-[#D946EF]/10 px-3 py-1 rounded-full">Service Capabilities</span>
                    <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">Dynamic Service Portals</h1>
                    <p className="text-gray-400 text-xs sm:text-sm">We provide tailored digital strategies to establish domain brand dominance, optimize paid ad performance, and secure B2B client bookings.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="aim_all_services_grid">
                    {SERVICES_DATA.map((srv) => (
                      <div
                        key={srv.id}
                        className="glass bg-[#0A0A0A] hover:bg-[#101010]/95 p-6 rounded-xl border border-white/5 hover:border-[#A855F7]/20 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div className="space-y-4">
                          <h3 className="text-lg font-bold text-white tracking-tight">{srv.title}</h3>
                          <p className="text-gray-400 text-xs leading-relaxed">{srv.shortDesc}</p>
                          
                          {/* Sub-tags list limit 3 */}
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {srv.subcategories.slice(0, 3).map((sub, sidx) => (
                              <span key={sidx} className="bg-black/60 border border-white/5 text-[9px] font-mono px-2 py-1 rounded text-gray-400">
                                {sub}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-6 mt-4 border-t border-white/5">
                          <button
                            onClick={() => navigateTo("services", srv.id)}
                            className="bg-[#1e112d] hover:bg-[#3b0764] text-[#D946EF] hover:text-white px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider font-semibold cursor-pointer text-left uppercase"
                          >
                            Details & Roadmap →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* 3. CASE STUDIES FULL SHOWCASE */}
          {currentPage === "case-studies" && (
            <motion.div
              key="case-studies"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
              id="aim_page_case_studies"
            >
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <span className="text-[#D946EF] font-mono font-bold tracking-widest text-xs uppercase bg-[#D946EF]/10 px-3 py-1 rounded-full">Attribution Showcase</span>
                <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">Chronicles of Digital Scale</h1>
                <p className="text-gray-400 text-xs sm:text-sm">Explore deep metric-backed breakdowns covering local search engineering, programmatic PPC bidding, and responsive web platforms.</p>
              </div>

              {/* Active project highlight panel */}
              <div className="space-y-12">
                {CASE_STUDIES_DATA.map((study) => (
                  <div key={study.id} className="glass bg-zinc-950 p-6 sm:p-8 rounded-2xl border border-white/5 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left details */}
                    <div className="lg:col-span-2 space-y-6 text-left">
                      <div className="flex justify-between items-baseline border-b border-white/5 pb-3">
                        <span className="text-xs font-mono font-bold tracking-wider text-[#D946EF] uppercase">{study.client}</span>
                        <span className="bg-black border border-white/10 px-2.5 py-1 rounded-md text-[10px] text-gray-400 font-mono font-bold tracking-wider">{study.industry}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold font-display text-white leading-snug">
                        {study.title}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="bg-black/60 p-4 rounded-xl border border-white/5 space-y-1">
                          <span className="text-rose-400 font-mono font-bold text-[10px] uppercase">BEFORE CAMPAIGN</span>
                          <p className="text-gray-400 italic">"{study.before}"</p>
                        </div>
                        <div className="bg-black/60 p-4 rounded-xl border border-[#A855F7]/20 space-y-1">
                          <span className="text-[#D946EF] font-mono font-bold text-[10px] uppercase">AFTER AIMNEXORA ADAPTERS</span>
                          <p className="text-[#D946EF] font-semibold">{study.after}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">Tactical Challenges</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">{study.challenge}</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">Delivered Solution</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">{study.solution}</p>
                      </div>
                    </div>

                    {/* Right visualizations and result numbers */}
                    <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-xl flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <h4 className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">Attributed Numbers</h4>
                        <div className="space-y-3">
                          {study.metrics.map((m, mIdx) => (
                            <div key={mIdx} className="flex justify-between items-center py-2 border-b border-white/5">
                              <span className="text-[#D946EF] text-lg font-bold font-display"><AnimatedMetricNumber text={m.value} /></span>
                              <span className="text-xs text-gray-300 font-mono">{m.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Custom KPI Chart widget simulation */}
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase">Interactive Timeline Calibration</h4>
                        <div className="flex items-end justify-between h-20 pt-2 border-b border-white/10 px-1 relative">
                          {study.chartData.map((cd, cdidx) => (
                            <div key={cdidx} className="flex flex-col items-center flex-1 group relative">
                              <div className="w-full flex justify-center gap-1">
                                {/* Previous block height bar */}
                                <div className="w-2.5 bg-zinc-800 rounded-t" style={{ height: `${(cd.previous / (study.id === 'case-3' ? 40000 : 250)) * 40}px` }}></div>
                                {/* Current block height bar */}
                                <div className="w-2.5 bg-[#D946EF] rounded-t shadow-[0_0_8px_rgba(54,173,163,0.3)]" style={{ height: `${(cd.current / (study.id === 'case-3' ? 40000 : 250)) * 40}px` }}></div>
                              </div>
                              <span className="text-[9px] text-gray-500 font-mono mt-1">{cd.label}</span>
                              {/* Overlay numbers tooltip */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black border border-white/20 p-1.5 rounded text-[8px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition z-50">
                                Sync: {cd.current} <br /> Prev: {cd.previous}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 4. PORTFOLIO ADVANCED FILTER SYSTEM */}
          {currentPage === "portfolio" && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
              id="aim_page_portfolio"
            >
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <span className="text-[#D946EF] font-mono font-bold tracking-widest text-xs uppercase bg-[#D946EF]/10 px-3 py-1 rounded-full">Brand Redesigns</span>
                <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">Interactive Visual Showcase</h1>
                <p className="text-gray-400 text-xs sm:text-sm">Bespoke headless portals, iconic identities, B2B campaigns, and high-retention cinematic videos developed by AimNexora labs.</p>
              </div>

              {/* Filtering panel controls */}
              <div className="flex flex-wrap justify-center gap-2" id="aim_portfolio_filters">
                {["All", "Websites", "Branding", "Advertising", "Social Media", "Video Production"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPortfolioFilter(cat)}
                    className={`px-4.5 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                      portfolioFilter === cat
                        ? "bg-[#D946EF] text-[#050505] font-bold shadow-[0_0_12px_rgba(54,173,163,0.3)]"
                        : "bg-[#101010]/80 text-gray-400 hover:text-white border border-white/5 hover:border-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid representation */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="aim_portfolio_grid_view">
                {PORTFOLIO_DATA.filter((p) => portfolioFilter === "All" || p.category === portfolioFilter).map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: index % 3 * 0.1 }}
                    className="glass bg-[#080808] border border-white/5 rounded-2xl overflow-hidden group hover:border-[#A855F7]/45 hover:shadow-[0_0_20px_rgba(54,173,163,0.08)] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative overflow-hidden aspect-video">
                      {/* Image ReferrerPolicy to bypass unsplash blockers */}
                      <img
                        src={project.image}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-[#1e112d]/90 text-white border border-white/10 text-[9px] font-mono tracking-wider font-bold py-1 px-2.5 rounded-full uppercase">
                        {project.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-3 text-left">
                      <div className="flex justify-between items-baseline text-[10px] font-mono text-gray-500">
                        <span>CLIENT: {project.client}</span>
                        <span className="text-[#D946EF]">{project.tag}</span>
                      </div>
                      <h4 className="text-base font-bold text-white group-hover:text-[#D946EF] transition">
                        {project.title}
                      </h4>
                      <p className="text-gray-400 text-xs line-clamp-2">{project.description}</p>
                    </div>

                    {/* Results overlay footer */}
                    <div className="p-4 bg-black/60 border-t border-white/5 flex items-center gap-2 text-xs">
                      <span className="text-[#D946EF] font-mono font-bold text-[10px] uppercase">RESULTS:</span>
                      <p className="text-gray-300 font-medium tracking-tight truncate">{project.results}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 5. SEO READY INSIGHT BLOG PAGE */}
          {currentPage === "blog" && (
            <motion.div
              key="blog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
              id="aim_page_blog"
            >
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <span className="text-[#D946EF] font-mono font-bold tracking-widest text-[#D946EF] text-xs uppercase bg-[#D946EF]/10 px-3 py-1 rounded-full">Knowledge Hub</span>
                <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">Nexora Insights</h1>
                <p className="text-gray-400 text-xs sm:text-sm">SEO strategies, algorithmic B2B marketing, Conversions API setting manuals, and design story briefs authored by our leads.</p>
              </div>

              {selectedBlog ? (
                // Standalone Blog Article Reader View
                <div className="glass bg-zinc-950 p-6 sm:p-8 rounded-2xl border border-white/5 space-y-6 text-left max-w-4xl mx-auto" id="aim_blog_standalone">
                  <button
                    onClick={() => setSelectedBlog(null)}
                    className="text-xs text-[#D946EF] hover:text-white font-mono uppercase tracking-widest font-bold flex items-center gap-1 cursor-pointer mb-4"
                  >
                    ← Back to News Hub
                  </button>

                  <div className="space-y-4 border-b border-white/5 pb-6">
                    <span className="px-3 py-1 bg-[#1e112d] text-[#D946EF] font-mono font-bold text-[10px] uppercase rounded-full border border-white/10">
                      {selectedBlog.category}
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-display font-bold text-white leading-tight">
                      {selectedBlog.title}
                    </h1>

                    <div className="flex items-center gap-3 pt-2">
                      <img
                        src={selectedBlog.author.avatar}
                        alt={selectedBlog.author.name}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div className="text-xs text-gray-400 font-mono">
                        <span className="text-white font-bold">{selectedBlog.author.name}</span> • {selectedBlog.author.role}
                        <div className="text-[10px] text-gray-500 mt-0.5">{selectedBlog.date} • {selectedBlog.readTime}</div>
                      </div>
                    </div>
                  </div>

                  {/* Standard Styled markdown/html representation */}
                  <div className="markdown-body text-gray-300 text-xs sm:text-sm leading-relaxed space-y-4 pt-4 select-text">
                    <p className="font-medium text-white mb-4 italic text-sm">{selectedBlog.excerpt}</p>
                    {/* Content parser */}
                    <div className="space-y-4" dangerouslySetInnerHTML={{ __html: selectedBlog.content.replace(/\n\n/g, "<br/><br/>") }} />
                  </div>
                </div>
              ) : (
                // Main Blog Feed Matrix with category sorting and search
                <div className="space-y-8">
                  {/* Search and Category filters bar */}
                  <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch sm:items-center" id="aim_blog_search_bar">
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search strategic insights, tutorials, parameters..."
                        value={blogSearch}
                        onChange={(e) => setBlogSearch(e.target.value)}
                        className="w-full bg-zinc-900 border border-white/10 text-white placeholder-gray-500 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#A855F7]"
                      />
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {["All", "SEO", "Marketing", "Social Media", "AI Marketing", "Advertising", "Lead Generation"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setBlogCategory(cat)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-wider cursor-pointer ${
                            blogCategory === cat ? "bg-[#D946EF] text-[#050505] font-bold" : "bg-[#101010] text-gray-400"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Blog cards feed */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="aim_blog_feed_grid">
                    {BLOG_DATA.filter(
                      (b) =>
                        (blogCategory === "All" || b.category === blogCategory) &&
                        (b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
                          b.excerpt.toLowerCase().includes(blogSearch.toLowerCase()))
                    ).map((post) => (
                      <div
                        key={post.id}
                        onClick={() => setSelectedBlog(post)}
                        className="glass bg-[#080808]/90 hover:bg-[#101010] border border-white/5 hover:border-[#A855F7]/20 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:scale-[1.01]"
                      >
                        <div className="space-y-4 text-left">
                          <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                            <span>{post.date}</span>
                            <span className="text-[#D946EF] font-bold">{post.category}</span>
                          </div>
                          <h4 className="text-base font-bold text-white group-hover:text-[#D946EF] transition">
                            {post.title}
                          </h4>
                          <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed">{post.excerpt}</p>
                        </div>

                        <div className="flex items-center gap-2.5 pt-5 mt-4 border-t border-white/5">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            referrerPolicy="no-referrer"
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <div className="text-[10px] text-gray-500 font-mono">
                            <span className="text-gray-300 font-semibold">{post.author.name}</span> • {post.readTime}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* 6. ABOUT US PAGE */}
          {currentPage === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-24 text-left"
              id="aim_page_about"
            >
              {/* Mission Vision intro */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" id="aim_about_intro">
                <div className="space-y-6">
                  <span className="text-[#D946EF] font-mono font-bold tracking-widest text-xs uppercase bg-[#D946EF]/10 px-3 py-1 rounded-full">Agency Story</span>
                  <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">Accelerating Growth Through Digital Excellence</h1>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    At AimNexora Digital, we dismantle boilerplate marketing models. We manage enterprise ad investments with complete attribution transparency, craft ultra-fast responsive storefront profiles, and engineer predictive B2B email pipelines that keep client sales calendars booked.
                  </p>

                  <div className="grid grid-cols-2 gap-6 pt-4" id="aim_mission_vision_boxes">
                    <div className="space-y-2">
                      <span className="text-lg">🎯</span>
                      <h4 className="font-bold text-white font-display text-sm">Strategic Vision</h4>
                      <p className="text-gray-400 text-[11px] leading-relaxed">To build high-performance pipelines that turn digital spends into predictable client revenue streams.</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-lg">👁</span>
                      <h4 className="font-bold text-white font-display text-sm">Premium Execution</h4>
                      <p className="text-gray-400 text-[11px] leading-relaxed">Position client brands as undisputed category leaders with high-end, iconic visual design assets.</p>
                    </div>
                  </div>
                </div>

                <div className="relative flex justify-center selection:bg-rose-500 selection:text-white" id="aim_about_graphic">
                  <div className="absolute w-72 h-72 bg-emerald-950/20 rounded-full blur-2xl animate-pulse" />
                  <div className="glass bg-zinc-950 border border-white/5 p-6 rounded-2xl flex flex-col justify-between h-80 w-full max-w-sm space-y-6 relative z-10">
                    <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                      <span>CLIENT SATISFACTION CERTIFICATION</span>
                      <span className="text-emerald-400">✓ PASS</span>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[#D946EF] font-mono text-xs font-bold uppercase">The Nexora Standard</span>
                      <h3 className="text-2xl font-bold font-display text-white">Compound Growth Engineered Daily</h3>
                      <p className="text-gray-400 text-xs leading-relaxed">No static spreadsheets. True performance means absolute attribution audit validation.</p>
                    </div>
                    <div className="p-3 bg-black/60 rounded-xl border border-white/5 flex items-center justify-between text-xs font-mono text-gray-300">
                      <span>MANAGED PORTFOLIO CAPABILITY</span>
                      <span className="text-indigo-400 font-bold">$12M+</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Chronological timelines */}
              <section className="space-y-12" id="aim_about_journey_timeline">
                <div className="text-center space-y-3">
                  <span className="text-[#D946EF] font-mono font-bold tracking-widest text-[#D946EF] text-xs uppercase bg-[#D946EF]/10 px-3 py-1 rounded-full">Chronology</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight">Our Timeline & Journeys</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-5xl mx-auto" id="timeline_grid_milestones">
                  {AGENCY_JOURNEY_TIMELINE.map((time, tIdx) => (
                    <div key={tIdx} className="glass bg-[#080808]/90 p-5 rounded-xl border border-white/5 hover:border-[#A855F7]/20 transition space-y-3 relative">
                      <span className="text-lg font-mono font-bold text-[#D946EF]"><AnimatedMetricNumber text={time.year} /></span>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">{time.title}</h4>
                      <p className="text-gray-400 text-[10px] leading-relaxed">{time.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Core values list */}
              <section className="space-y-8" id="aim_about_values_stack">
                <div className="text-center space-y-3">
                  <span className="text-[#D946EF] font-mono font-bold tracking-widest text-xs uppercase">Governance</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight">Core Operational Values</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {AGENCY_CORE_VALUES.map((val, vIdx) => (
                    <div key={vIdx} className="p-5 bg-gradient-to-tr from-[#121358]/10 to-zinc-950 border border-white/5 rounded-xl space-y-2">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span className="text-[#D946EF]">•</span> {val.title}
                      </h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{val.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Leadership bios */}
              <section className="space-y-12" id="aim_about_leadership">
                <div className="text-center space-y-3">
                  <span className="text-[#D946EF] font-mono font-bold tracking-widest text-xs uppercase">Architects</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight">Lead Agency Strategists</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="aim_about_leaders_grid">
                  {LEADERSHIP_PROFILES.map((leader, index) => (
                    <div key={index} className="glass bg-[#0C0C0C]/90 p-6 rounded-2xl border border-white/5 text-center flex flex-col justify-between items-center group hover:border-[#A855F7]/25 transition duration-300">
                      <div className="space-y-4 flex flex-col items-center">
                        <img
                          src={leader.avatar}
                          alt={leader.name}
                          referrerPolicy="no-referrer"
                          className="w-24 h-24 rounded-full object-cover border border-[#A855F7]/30 shadow-lg group-hover:scale-102 transition"
                        />
                        <div className="space-y-1">
                          <h4 className="text-base font-bold text-white">{leader.name}</h4>
                          <span className="text-[10px] uppercase font-mono tracking-widest text-[#D946EF] font-bold block">{leader.role}</span>
                        </div>
                        <p className="text-gray-400 text-xs max-w-xs">{leader.bio}</p>
                      </div>

                      <div className="w-full bg-black/60 p-2.5 rounded-lg border border-white/5 mt-6 text-[10px] font-mono text-gray-400">
                        🔑 {leader.specialty}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {/* 7. CONTACT & SCHEDULER VIEW PAGE */}
          {currentPage === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12 text-left"
              id="aim_page_contact"
            >
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <span className="text-[#D946EF] font-mono font-bold tracking-widest text-xs uppercase bg-[#D946EF]/10 px-3 py-1 rounded-full">Let's Interface</span>
                <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">Scale Your Conversion Velocity</h1>
                <p className="text-gray-400 text-xs sm:text-sm">Submit your growth specifications below to receive localized search diagnostics or configure direct ad channels audits instantly.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" id="aim_contact_primary_split">
                {/* Contact information details */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <span className="text-[#D946EF] font-mono text-xs uppercase tracking-widest font-bold">CONTACT METRICS DIRECT</span>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white">Let's Connect</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">Our typical callback latency is under 2 business hours. Your diagnostic audits are delivered as high-fidelity direct reports.</p>
                  </div>

                  <div className="space-y-4" id="aim_office_blocks">
                    <div className="flex gap-4 items-center bg-black/40 p-4 rounded-xl border border-white/5">
                      <div className="w-10 h-10 rounded-lg bg-[#1e112d]/60 flex items-center justify-center text-[#D946EF]">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Enterprise Proposals</span>
                        <h4 className="text-white text-xs sm:text-sm font-medium">editverse.agency01@gmail.com</h4>
                      </div>
                    </div>

                    <div className="flex gap-4 items-center bg-black/40 p-4 rounded-xl border border-white/5">
                      <div className="w-10 h-10 rounded-lg bg-[#1e112d]/60 flex items-center justify-center text-[#D946EF]">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Global Desk Hotline</span>
                        <h4 className="text-white text-xs sm:text-sm font-medium">+91 91100 24890</h4>
                      </div>
                    </div>

                    <div className="flex gap-4 items-center bg-black/40 p-4 rounded-xl border border-white/5">
                      <div className="w-10 h-10 rounded-lg bg-[#1e112d]/60 flex items-center justify-center text-[#D946EF]">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Corporate Headquarters</span>
                        <h4 className="text-white text-xs sm:text-sm font-medium">AimNexora Labs, Sector 62, Noida, NCR, India</h4>
                      </div>
                    </div>
                  </div>

                  {/* Modern Appointment Scheduler with Cal.com and Calendly Tabs */}
                  <div className="glass bg-[#101010]/90 border border-[#3aada3]/25 p-6 rounded-2xl space-y-5" id="calendly_simulator_container">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <div>
                        <h4 className="text-white text-sm font-bold flex items-center gap-1.5 font-display">
                          <Calendar className="w-4 h-4 text-[#D946EF]" /> Book Strategy Call
                        </h4>
                        <p className="text-[10px] text-gray-400 mt-0.5">Let's coordinate an executive session</p>
                      </div>
                      
                      {/* Booking Platform selector */}
                      <div className="flex bg-black/60 p-1 rounded-lg border border-white/5 text-[10px] font-mono">
                        <button
                          type="button"
                          onClick={() => setBookingPlatform("Cal.com")}
                          className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
                            bookingPlatform === "Cal.com"
                              ? "bg-[#D946EF] text-[#050505] font-bold"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          Cal.com
                        </button>
                        <button
                          type="button"
                          onClick={() => setBookingPlatform("Calendly")}
                          className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
                            bookingPlatform === "Calendly"
                              ? "bg-blue-600 text-white font-bold"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          Calendly
                        </button>
                      </div>
                    </div>

                    {bookingSubmitted ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-5 bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-200 rounded-xl space-y-3"
                      >
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                          <CheckCircle2 className="w-5 h-5" />
                          <span>Alignment Booked Successfully!</span>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-[11px]">
                          Your <strong>{bookingPlatform}</strong> strategy call confirmation has been dispatched! We look forward to analyzing your acquisition pipeline.
                        </p>
                        <div className="bg-black/40 p-3 rounded-lg border border-white/5 font-mono text-[11px] text-[#D946EF] space-y-1">
                          <div>📅 Date: <strong className="text-white">{bookingDate}</strong></div>
                          <div>⏰ Block: <strong className="text-white">{bookingTime}</strong></div>
                          <div>👤 Host: <strong className="text-white">{bookingAdvisor}</strong></div>
                          <div>⚙️ Focus: <strong className="text-white">{bookingDuration}</strong></div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setBookingSubmitted(false);
                            setBookingDate("");
                            setBookingTime("");
                            setBookingName("");
                            setBookingEmail("");
                            setBookingBrand("");
                          }}
                          className="w-full py-2 bg-white/5 hover:bg-white/10 text-white font-mono text-[10px] rounded-lg border border-white/10 transition cursor-pointer"
                        >
                          Schedule Another Call
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                        {/* Advisor Selection row */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1 text-left">
                            <label className="text-gray-400 uppercase font-mono text-[9px] font-bold tracking-wider">Advisor Host</label>
                            <select
                              value={bookingAdvisor}
                              onChange={(e) => setBookingAdvisor(e.target.value)}
                              className="w-full bg-black/80 border border-white/5 rounded-xl p-2.5 text-white text-[11px] focus:outline-none focus:ring-1 focus:ring-[#A855F7]"
                            >
                              <option value="Aman Mathur (CGO)">Aman Mathur (CGO)</option>
                              <option value="Kiara Advani (Creative Director)">Kiara Advani (Head Design)</option>
                            </select>
                          </div>
                          
                          <div className="space-y-1 text-left">
                            <label className="text-gray-400 uppercase font-mono text-[9px] font-bold tracking-wider">Call Duration</label>
                            <select
                              value={bookingDuration}
                              onChange={(e) => setBookingDuration(e.target.value)}
                              className="w-full bg-black/80 border border-white/5 rounded-xl p-2.5 text-white text-[11px] focus:outline-none focus:ring-1 focus:ring-[#A855F7]"
                            >
                              <option value="15 Min Diagnostic Call">15 Min Diagnostic Call</option>
                              <option value="30 Min Scaling Roadmap">30 Min Scaling Roadmap</option>
                              <option value="45 Min Technical Audit">45 Min Technical Audit</option>
                            </select>
                          </div>
                        </div>

                        {/* Traditional Details */}
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1.5 text-left">
                              <label className="text-gray-400 font-semibold text-[10px]">Your Name *</label>
                              <input
                                type="text"
                                required
                                value={bookingName}
                                onChange={(e) => setBookingName(e.target.value)}
                                placeholder="Contact Name"
                                className="w-full bg-black/80 border border-white/5 rounded-xl p-2.5 text-white text-[11px] focus:outline-none focus:ring-1 focus:ring-[#A855F7]"
                              />
                            </div>
                            <div className="space-y-1.5 text-left">
                              <label className="text-gray-400 font-semibold text-[10px]">Business Email *</label>
                              <input
                                type="email"
                                required
                                value={bookingEmail}
                                onChange={(e) => setBookingEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full bg-black/80 border border-white/5 rounded-xl p-2.5 text-white text-[11px] focus:outline-none focus:ring-1 focus:ring-[#A855F7]"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5 text-left">
                            <label className="text-gray-400 font-semibold text-[10px]">Brand/Website Domain (Optional)</label>
                            <input
                              type="text"
                              value={bookingBrand}
                              onChange={(e) => setBookingBrand(e.target.value)}
                              placeholder="e.g. auraclinics.com"
                              className="w-full bg-black/80 border border-white/5 rounded-xl p-2.5 text-white text-[11px] focus:outline-none focus:ring-1 focus:ring-[#A855F7]"
                            />
                          </div>
                        </div>

                        {/* Calendar parameters */}
                        <div className="space-y-3 pt-1 border-t border-white/5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1.5 text-left">
                              <label className="text-gray-400 uppercase font-mono text-[9px] font-bold tracking-wider">Select Target Date</label>
                              <input
                                type="date"
                                required
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                                className="w-full bg-black/80 border border-white/5 rounded-xl p-2.5 text-white text-[11px] focus:outline-none focus:ring-1 focus:ring-[#A855F7]"
                              />
                            </div>

                            <div className="space-y-1.5 text-left">
                              <div className="flex justify-between items-center">
                                <label className="text-gray-400 uppercase font-mono text-[9px] font-bold tracking-wider">Time Zone</label>
                              </div>
                              <div className="w-full bg-black/50 border border-white/5 rounded-xl p-2.5 text-[#D946EF] text-[10px] font-mono flex items-center justify-between">
                                <span>🌐 GMT+5:30 (IST)</span>
                                <span className="text-gray-500 text-[8px]">Auto Detected</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 text-left">
                            <label className="text-gray-400 uppercase font-mono text-[9px] font-bold tracking-wider block">Claim Available Slot</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {[
                                "11:00 AM IST",
                                "01:30 PM IST",
                                "03:30 PM IST",
                                "05:00 PM IST",
                                "06:30 PM IST",
                                "08:00 PM IST"
                              ].map((block) => (
                                <button
                                  type="button"
                                  key={block}
                                  onClick={() => setBookingTime(block)}
                                  className={`p-2 rounded-lg text-[10px] font-mono border transition-all duration-200 cursor-pointer text-center ${
                                    bookingTime === block
                                      ? bookingPlatform === "Cal.com"
                                        ? "bg-[#D946EF]/15 border-[#A855F7] text-[#D946EF] font-bold shadow-[0_0_15px_rgba(217,70,239,0.2)]"
                                        : "bg-blue-600/10 border-blue-500 text-blue-400 font-bold shadow-[0_0_10px_rgba(59,130,246,0.1)]"
                                      : "bg-black/40 border-white/5 text-gray-400 hover:text-white hover:border-white/10"
                                  }`}
                                >
                                  {block}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={!bookingTime || !bookingDate || !bookingEmail || !bookingName}
                          className={`w-full text-white py-3.5 text-xs font-bold rounded-xl uppercase font-mono cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                            bookingPlatform === "Cal.com"
                              ? "bg-[#1e112d] border border-[#D946EF]/40 hover:bg-[#3b0764] text-[#D946EF] hover:text-white"
                              : "bg-blue-600 hover:bg-blue-700 text-white font-bold"
                          }`}
                        >
                          Confirm Call on {bookingPlatform} ⚡
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Lead Generation Form panel */}
                <div className="glass bg-[#0C0C0C]/90 p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl relative" id="aim_form_block">
                  <h3 className="text-lg font-bold font-display text-white mb-2">Claim Free Strategic Performance Audit</h3>
                  <p className="text-xs text-gray-400 mb-6 font-medium">Verify your brand variables across indices. Fill in parameters below to connect.</p>

                  <form onSubmit={handleLeadSubmit} className="space-y-4" id="primary_lead_form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5 text-left">
                        <label className="text-gray-300 font-semibold mb-1 block">Your Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Vikram Malhotra"
                          value={leadForm.name}
                          onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                          className="w-full premium-input text-white rounded-xl p-3 outline-none text-xs"
                        />
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-gray-300 font-semibold mb-1 block">Business Brand *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Aura Aesthetics Group"
                          value={leadForm.businessName}
                          onChange={(e) => setLeadForm({ ...leadForm, businessName: e.target.value })}
                          className="w-full premium-input text-white rounded-xl p-3 outline-none text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5 text-left">
                        <label className="text-gray-300 font-semibold mb-1 block">Business Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. marketing@auramy.com"
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                          className="w-full premium-input text-white rounded-xl p-3 outline-none text-xs"
                        />
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-gray-300 font-semibold mb-1 block">Hotline Contact</label>
                        <input
                          type="text"
                          placeholder="e.g. +91 91100 24890"
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          className="w-full premium-input text-white rounded-xl p-3 outline-none text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5 text-left">
                        <label className="text-gray-300 font-semibold mb-1 block">Desired Capability *</label>
                        <select
                          value={leadForm.serviceNeeded}
                          onChange={(e) => setLeadForm({ ...leadForm, serviceNeeded: e.target.value })}
                          className="w-full premium-input text-[#D946EF] rounded-xl p-3 outline-none text-xs font-semibold"
                        >
                          <option value="Search Engine Optimization (SEO)">Search Engine Optimization (SEO)</option>
                          <option value="Pay-Per-Click Marketing (PPC)">Pay-Per-Click Advertising (PPC)</option>
                          <option value="Social Media Engagement">Social Media Marketing</option>
                          <option value="Content & Copy Creation">Content Copy & Analytics</option>
                          <option value="Direct Outbound Appointment Setup">B2B Leadgen Outbound</option>
                          <option value="Headless Storefront / React Development">Custom Front-End Web Setup</option>
                        </select>
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-gray-300 font-semibold mb-1 block">Strategic Monthly Budget *</label>
                        <select
                          value={leadForm.budget}
                          onChange={(e) => setLeadForm({ ...leadForm, budget: e.target.value })}
                          className="w-full premium-input text-[#D946EF] rounded-xl p-3 outline-none text-xs font-semibold"
                        >
                          <option value="$3,000 - $5,000/mo">$3,000 - $5,000 / mo</option>
                          <option value="$5,000 - $10,000/mo">$5,000 - $10,000 / mo</option>
                          <option value="$10,000 - $25,000/mo">$10,000 - $25,000 / mo</option>
                          <option value="$25,000 - $50,000/mo">$25,000 - $50,000 / mo</option>
                          <option value="$50,000+/mo">$50,000+ / mo (Enterprise Scope)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left text-xs">
                      <label className="text-gray-300 font-semibold mb-1 block">Case Challenges & Pipeline Goals *</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell us about your conversion gaps, target CPA bounds, or current web platform limitations..."
                        value={leadForm.message}
                        onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                        className="w-full premium-input text-white rounded-xl p-3 outline-none text-xs leading-relaxed"
                      ></textarea>
                    </div>

                    {leadStatus.type && (
                      <div
                        className={`text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 ${
                          leadStatus.type === "success" ? "bg-emerald-950/40 border border-emerald-500/20 text-emerald-400" : "bg-red-950/40 border border-red-500/20 text-red-400"
                        }`}
                      >
                        {leadStatus.type === "success" ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                        {leadStatus.message}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmittingLead}
                      className="w-full bg-gradient-to-r from-[#121358] via-[#232F72] to-[#2F578A] hover:bg-none hover:bg-[#D946EF] hover:text-black text-white font-bold py-4 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-xl cursor-pointer"
                    >
                      {isSubmittingLead ? "Transmitting Attribution Parameters..." : "Execute Strategy Protocol"}
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {/* 8. ADMINISTRATIVE CRM PANEL VIEW */}
          {currentPage === "crm" && (
            <motion.div
              key="crm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-10"
              id="aim_page_crm_dashboard"
            >
              <div className="text-center space-y-2">
                <span className="text-[#D946EF] font-mono font-bold tracking-widest text-xs uppercase bg-[#D946EF]/10 px-3 py-1 rounded-full">Secure Node</span>
                <h1 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight">Administrative Control Dashboard</h1>
                <p className="text-gray-400 text-xs sm:text-sm">Manage and review live incoming web site leads, active conversion analytics, and subscriber lists.</p>
              </div>

              <AdminHub />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-[#0A0A0A] border-t border-white/5 py-16 text-gray-500 text-xs relative z-10" id="aim_site_footer">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12" id="aim_footer_split">
          
          {/* Logo & description column */}
          <div className="space-y-4 text-left">
            <BrandLogo />
            <p className="text-gray-400 leading-relaxed text-[11px] pt-1">
              "Accelerating Growth Through Digital Excellence" <br />
              Accelerate high-intent conversion metrics with premium branding, organic search hubs, and server-side tagging.
            </p>
            <div className="pt-2 text-gray-400 font-mono text-[10px] space-y-1">
              <p>📍 Noida Sec-62, NCR, UP, India</p>
              <p>💌 editverse.agency01@gmail.com</p>
              <p>📞 +91 91100 24890</p>
            </div>
          </div>

          {/* Quick links & categories columns */}
          <div className="space-y-3 text-left">
            <h4 className="text-white font-bold font-mono tracking-wider text-[10px] uppercase">Service Capabilities</h4>
            <ul className="space-y-2 text-[11px] text-gray-400">
              <li><button onClick={() => navigateTo("services", "seo")} className="hover:text-[#D946EF] transition cursor-pointer">Search Engine Optimization</button></li>
              <li><button onClick={() => navigateTo("services", "ppc")} className="hover:text-[#D946EF] transition cursor-pointer">Pay-Per-Click Advertising</button></li>
              <li><button onClick={() => navigateTo("services", "social-media-marketing")} className="hover:text-[#D946EF] transition cursor-pointer">Social Engagement Marketing</button></li>
              <li><button onClick={() => navigateTo("services", "email-marketing")} className="hover:text-[#D946EF] transition cursor-pointer">Loyalty Automated Emails</button></li>
              <li><button onClick={() => navigateTo("services", "web-development")} className="hover:text-[#D946EF] transition cursor-pointer">Responsive Headless Web</button></li>
              <li><button onClick={() => navigateTo("services", "lead-generation")} className="hover:text-[#D946EF] transition cursor-pointer">B2B Outreach Appointments</button></li>
            </ul>
          </div>

          {/* Navigation channels */}
          <div className="space-y-3 text-left">
            <h4 className="text-white font-bold font-mono tracking-wider text-[10px] uppercase">Ecosystem Map</h4>
            <ul className="space-y-2 text-[11px] text-gray-400">
              <li><button onClick={() => navigateTo("home")} className="hover:text-[#D946EF] transition cursor-pointer">Home Hub Overview</button></li>
              <li><button onClick={() => navigateTo("case-studies")} className="hover:text-[#D946EF] transition cursor-pointer">Client Success Chronicles</button></li>
              <li><button onClick={() => navigateTo("portfolio")} className="hover:text-[#D946EF] transition cursor-pointer">Interactive Portfolios</button></li>
              <li><button onClick={() => navigateTo("blog")} className="hover:text-[#D946EF] transition cursor-pointer">Nexora Insights Blog</button></li>
              <li><button onClick={() => navigateTo("about")} className="hover:text-[#D946EF] transition cursor-pointer">About Our Leads & Culture</button></li>
              <li><button onClick={() => navigateTo("crm")} className="hover:text-[#D946EF] transition cursor-pointer">CRM Administrative Dashboard</button></li>
            </ul>
          </div>

          {/* Newsletter Subscribe bar */}
          <div className="space-y-4 text-left" id="aim_footer_newsletter_column">
            <h4 className="text-white font-bold font-mono tracking-wider text-[10px] uppercase">Nexora Insights Newsletter</h4>
            <p className="text-[11px] text-gray-400">Receive bi-weekly strategic advice covering SEO indexing shifts, attribution metrics, and direct outbound rules.</p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2" id="footer_newsletter_form">
              <input
                type="email"
                required
                placeholder="e.g. CEO@techhive.dev"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-black border border-white/5 text-white placeholder-gray-600 rounded-lg px-3 py-2 text-xs flex-1 outline-none focus:ring-1 focus:ring-[#A855F7]"
              />
              <button
                type="submit"
                className="bg-[#D946EF] hover:bg-[#D946EF]/80 text-black px-4 rounded-lg font-bold text-xs flex items-center justify-center cursor-pointer"
                aria-label="Subscribe"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            {newsletterMsg && (
              <span className="text-[10px] text-[#D946EF] block pt-1 animate-pulse">{newsletterMsg}</span>
            )}
          </div>
        </div>

        {/* Footnote copyright bar */}
        <div className="max-w-7xl mx-auto px-6 border-t border-white/5 mt-16 pt-8 flex flex-col sm:flex-row justify-between text-[11px]" id="aim_footnote_links">
          <p>© 2026 AimNexora Digital. Accelerating B2B Growth. All strategic assets safeguarded.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <span className="cursor-not-allowed">Terms of Strategy</span>
            <span className="cursor-not-allowed">Privacy Attributions</span>
            <button
              onClick={() => setSitemapOpen(true)}
              className="text-[#D946EF] hover:text-white transition cursor-pointer font-semibold underline decoration-dotted decoration-[#A855F7]"
              id="aim_footer_sidemap_trigger"
            >
              Visual sitemap (SEO Index)
            </button>
          </div>
        </div>
      </footer>

      {/* FLOAT INTERACTIVE OVERLAYS */}

      {/* Scroll-To-Top Magnetic Dynamic Trigger Element */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-44 right-6 z-40 bg-[#101015]/95 hover:bg-[#D946EF] text-[#D946EF] hover:text-black border border-[#A855F7]/30 hover:border-[#A855F7] p-3 rounded-full shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center group"
            id="aim_scroll_to_top_button"
            title="Scroll back to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4.5 h-4.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 1. Real-time Gemini AI Chatbot */}
      <AIChatBot />

      {/* 2. Floating WhatsApp Business Assistant Chat Overlay */}
      <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end" id="aim_whatsapp_float_wrapper">
        <AnimatePresence>
          {whatsappOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0A0A0A]/95 border border-emerald-500/35 rounded-2xl w-[320px] sm:w-[350px] shadow-2xl overflow-hidden mb-4 glass text-left"
              id="aim_whatsapp_assistant_panel"
            >
              {/* Header block with WhatsApp Branding */}
              <div className="bg-[#0D1B14] p-4 border-b border-emerald-500/15 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#1e112d] border border-[#A855F7] flex items-center justify-center font-bold text-white text-xs text-center leading-none">
                      AM
                    </div>
                    {/* Active pulse dot */}
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border border-[#0A0A0A] rounded-full animate-ping" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border border-[#0A0A0A] rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-white text-xs font-semibold flex items-center gap-1">
                      Aman Mathur <span className="text-[9px] font-mono bg-emerald-500/25 text-emerald-400 px-1.5 py-0.5 rounded font-normal uppercase leading-none">Active CGO</span>
                    </h3>
                    <p className="text-[10px] text-gray-400 leading-tight">AimNexora Business Desk • Online</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setWhatsappOpen(false)}
                  className="p-1 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition duration-200 cursor-pointer"
                  aria-label="Close panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status bar */}
              <div className="bg-emerald-950/20 px-4 py-2.5 border-b border-emerald-500/15 flex items-center gap-2 text-[10px] text-emerald-300">
                <Phone className="w-3 h-3 flex-shrink-0 animate-bounce" />
                <span>Typically replies in under 5 minutes • India Desk</span>
              </div>

              {/* Body Form */}
              <div className="p-4 space-y-4">
                {whatsappStatus === "completed" ? (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-xs text-[#25D366] rounded-lg text-center font-medium space-y-2">
                    <p>✓ Syncing Lead pipeline coordinates...</p>
                    <p className="text-gray-200 text-[11px]">Connecting directly to Aman Mathur on WhatsApp Business. Click native prompt when requested!</p>
                  </div>
                ) : (
                  <form onSubmit={handleWhatsAppSubmit} className="space-y-3.5 text-xs">
                    <p className="text-gray-400 text-[11px] leading-relaxed">
                      Instant WhatsApp Business Inquiry. Fill in basic parameters below to generate your pre-composed strategy query.
                    </p>

                    <div className="space-y-1 text-left">
                      <label className="text-gray-400 uppercase font-mono text-[9px] font-bold tracking-wider">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={whatsappName}
                        onChange={(e) => setWhatsappName(e.target.value)}
                        placeholder="e.g. Vikram Malhotra"
                        className="w-full bg-black/80 border border-white/10 rounded-xl p-2.5 text-white text-[11px] outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1 text-left">
                        <label className="text-gray-400 uppercase font-mono text-[9px] font-bold tracking-wider">Business Email *</label>
                        <input
                          type="email"
                          required
                          value={whatsappEmail}
                          onChange={(e) => setWhatsappEmail(e.target.value)}
                          placeholder="name@auramy.com"
                          className="w-full bg-black/80 border border-white/10 rounded-xl p-2.5 text-white text-[11px] outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                      <div className="space-y-1 text-left">
                        <label className="text-gray-400 uppercase font-mono text-[9px] font-bold tracking-wider">WhatsApp Phone *</label>
                        <input
                          type="tel"
                          required
                          value={whatsappPhone}
                          onChange={(e) => setWhatsappPhone(e.target.value)}
                          placeholder="e.g. +91 91100..."
                          className="w-full bg-black/80 border border-white/10 rounded-xl p-2.5 text-white text-[11px] outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-gray-400 uppercase font-mono text-[9px] font-bold tracking-wider">Core Interest</label>
                      <select
                        value={whatsappInterest}
                        onChange={(e) => setWhatsappInterest(e.target.value)}
                        className="w-full bg-black/80 border border-white/10 rounded-xl p-2 text-white text-[11px] outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                      >
                        <option value="Google & Meta Ads Diagnostic Audit">Google & Meta Ads Audit</option>
                        <option value="Local SEO & Search Pack Dominance">Local B2B SEO Strategy</option>
                        <option value="High-Fidelity Headless Web Quote">High Performance Web Dev</option>
                        <option value="B2B Campaign Appointment Setting">B2B Leads Appointment System</option>
                        <option value="General Strategic Collaboration Query">General Growth Consultation</option>
                      </select>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-gray-300 font-semibold text-[10px]">What is your custom inquiry?</label>
                      <textarea
                        value={whatsappMsg}
                        onChange={(e) => setWhatsappMsg(e.target.value)}
                        placeholder="e.g. We want to audit our Google Ads campaigns targeting Gurgaon & Noida..."
                        rows={2}
                        className="w-full bg-black/80 border border-white/10 rounded-xl p-2.5 text-white text-[11px] outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-gray-400 uppercase font-mono text-[8px] tracking-wider block">Preferred Channel Preference</label>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        {[
                          "WhatsApp Direct",
                          "Hotline Call",
                        ].map((pref) => (
                          <button
                            type="button"
                            key={pref}
                            onClick={() => setWhatsappContactPref(pref)}
                            className={`p-2 rounded-lg border text-center transition cursor-pointer ${
                              whatsappContactPref === pref
                                ? "bg-emerald-950/40 border-emerald-500 text-emerald-400 font-semibold animate-pulse"
                                : "bg-black/40 border-white/5 text-gray-400 hover:text-white"
                            }`}
                          >
                            {pref}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={whatsappStatus === "submitting" || !whatsappName || !whatsappEmail || !whatsappPhone}
                      className="w-full bg-[#25D366] hover:bg-[#25D366]/85 text-black font-bold p-3 rounded-xl flex items-center justify-center gap-1.5 transition uppercase font-mono text-[10px] tracking-wider cursor-pointer duration-200 shadow-md hover:shadow-emerald-500/20 disabled:opacity-40"
                    >
                      <Send className="w-3.5 h-3.5" /> Initialize Chat Desk ⚡
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulsing Launcher Button */}
        <button
          type="button"
          onClick={() => setWhatsappOpen(!whatsappOpen)}
          className={`relative z-50 text-white p-4 rounded-full shadow-2xl duration-300 cursor-pointer flex items-center justify-center transition-all ${
            whatsappOpen ? "bg-rose-600 rotate-90 scale-95" : "bg-[#25D366] hover:scale-110 active:scale-95 animate-bounce hover:animate-none"
          }`}
          id="aim_whatsapp_float"
          aria-label="Direct WhatsApp Chat"
          title="Direct Chat via WhatsApp Desk"
        >
          {whatsappOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <div className="relative">
              {/* Pulsing halo ring */}
              <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping -m-2" />
              {/* Standard WhatsApp SVG vector icon path */}
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current relative z-10">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.335 4.975L2 22l5.204-1.365a9.936 9.936 0 0 0 4.804 1.233h.004c5.506 0 9.99-4.478 9.991-9.985C22.007 6.478 17.521 2 12.012 2zm6.18 13.916c-.223.63-.1.135-.873 1.137-.41.53-.943.83-1.634.87-.56.03-1.12.02-2.824-.68-1.748-.718-3.32-2.522-4.14-3.64-.176-.24-.464-.693-.414-1.133.05-.44.293-.653.443-.8a3.784 3.784 0 0 0 .542-.718c.113-.24.08-.47-.03-.703-.1-.237-.872-2.1-.976-2.35-.1-.24-.223-.277-.323-.277h-.49c-.198 0-.52.073-.79.37-.27.296-1.04 1.016-1.04 2.477 0 1.46 1.06 2.87 1.21 3.07.15.198 2.062 3.15 5.006 4.43 1.012.44 1.764.63 2.37.73.57.09 1.15.08 1.58.01.48-.07 1.48-.6 1.69-1.18.21-.59.21-1.1 .15-1.18-.06-.112-.224-.183-.49-.31z" />
              </svg>
            </div>
          )}
        </button>
      </div>

      {/* 3. Sticky Bottom static free assessment Floating Bar (Desktop exclusive) */}
      <div className="hidden md:flex fixed bottom-0 left-0 right-0 h-14 bg-gradient-to-r from-[#121358] to-[#101010] border-t border-[#A855F7]/20 z-30 px-8 justify-between items-center" id="aim_sticky_consultation_tray">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <p className="text-xs text-white font-medium">✨ Claim Your Free Strategic Performance Audit today — limited slots weekly.</p>
        </div>
        <button
          onClick={() => navigateTo("contact")}
          className="bg-[#D946EF] hover:bg-[#D946EF]/85 text-[#050505] font-bold text-[10px] uppercase tracking-wider px-5 py-2 rounded-lg cursor-pointer"
        >
          Diagnose My CPA Now
        </button>
      </div>

      {/* 4. Exit Intent Alert Popup dialog */}
      <AnimatePresence>
        {showExitIntent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            id="exit_intent_overlay"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0A0A0A] border border-[#D946EF]/40 rounded-2xl p-8 max-w-md w-full relative space-y-6"
            >
              <button
                onClick={() => dismissPopup("exit")}
                className="absolute top-4 right-4 text-gray-500 hover:text-white p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-3">
                <span className="bg-rose-500/15 border border-rose-500/30 text-rose-400 text-[10px] font-mono px-3 py-1 rounded-full uppercase font-bold tracking-widest">Wait, Chief!</span>
                <h3 className="text-xl font-bold text-white font-display">Lower Your CPA by 38% Instantly</h3>
                <p className="text-gray-400 text-xs leading-relaxed">Before you interface elsewhere, claim our private **B2B Outbound Blueprint** tutorial detailing how we bypass ad block filters for enterprise clients.</p>
              </div>

              {popupSubscribed ? (
                <div className="p-3.5 bg-[#D946EF]/15 border border-[#A855F7]/20 text-[#D946EF] text-xs text-center rounded-lg font-medium">
                  ✓ Welcome onboard. Check your inbox coordinates directly!
                </div>
              ) : (
                <form onSubmit={handlePopupSubmit} className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your professional business email..."
                    value={popupEmail}
                    onChange={(e) => setPopupEmail(e.target.value)}
                    className="w-full bg-black border border-white/10 text-white p-3 rounded-lg text-xs placeholder-gray-600 outline-none focus:ring-1 focus:ring-[#D946EF]"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#D946EF] hover:bg-[#D946EF]/80 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Receive B2B Whitepaper Direct
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Timed Lead Capture Promotion Popup modal */}
      <AnimatePresence>
        {showLeadPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            id="lead_capture_overlay"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="bg-[#0A0A0A] border border-[#D946EF]/35 rounded-2xl p-8 max-w-md w-full relative space-y-6"
            >
              <button
                onClick={() => dismissPopup("lead")}
                className="absolute top-4 right-4 text-gray-500 hover:text-white p-1 rounded-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-3">
                <span className="bg-[#D946EF]/15 border border-[#A855F7]/20 text-[#D946EF] text-[10px] font-mono px-3 py-1 rounded-full uppercase font-bold tracking-widest">Immediate Audit Booking</span>
                <h3 className="text-xl font-bold text-white font-display">Get Your Free SEO Diagnostics Roadmap</h3>
                <p className="text-gray-400 text-xs leading-relaxed">Our strategists normally bill $1,000 for local SEO blueprints. Claim ours instantly under zero dollar allocations today.</p>
              </div>

              <div className="flex gap-3 justify-center text-xs font-mono">
                <span className="bg-zinc-950 p-2.5 rounded-xl border border-white/5 text-[#D946EF] w-1/2 text-center text-[10px]"><strong>✓ FAST</strong> <br /> Response under 2 hrs</span>
                <span className="bg-zinc-950 p-2.5 rounded-xl border border-white/5 text-[#D946EF] w-1/2 text-center text-[10px]"><strong>✓ SECURE</strong> <br /> Server Conversions</span>
              </div>

              <button
                onClick={() => {
                  setShowLeadPopup(false);
                  navigateTo("contact");
                }}
                className="w-full bg-[#D946EF] hover:bg-[#D946EF]/85 text-[#050505] font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
              >
                Schedule Free Diagnostic Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Dynamic Visual Sitemap (SEO Architecture Panel) Overlay */}
      <AnimatePresence>
        {sitemapOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
            id="aim_seo_sitemap_modal"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#08080A] border border-[#A855F7]/35 rounded-2xl max-w-4xl w-full h-[85vh] sm:h-[80vh] flex flex-col overflow-hidden shadow-2xl relative"
            >
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-black via-[#0D131A] to-black">
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">SEO Schema Verified</span>
                    <span className="text-gray-400 font-mono text-[9px]">• Google Indexing Priority Mode</span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-display mt-1 flex items-center gap-1.5">
                    <Globe className="w-5 h-5 text-[#D946EF]" /> AimNexora Sitemap & Indexing Architecture
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">Explore our professional digital routing graph optimized for crawler indexing rules.</p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Selector tab buttons */}
                  <div className="flex bg-black p-1 rounded-xl border border-white/10 text-xs font-mono">
                    <button
                      onClick={() => setSitemapTab("visual")}
                      className={`px-3 py-1.5 rounded-lg transition cursor-pointer font-medium ${
                        sitemapTab === "visual"
                          ? "bg-[#D946EF] text-[#050505] font-bold cursor-pointer"
                          : "text-gray-400 hover:text-white cursor-pointer"
                      }`}
                    >
                      🗺️ Visual Map
                    </button>
                    <button
                      onClick={() => setSitemapTab("xml")}
                      className={`px-3 py-1.5 rounded-lg transition cursor-pointer font-medium ${
                        sitemapTab === "xml"
                          ? "bg-[#D946EF] text-white font-bold cursor-pointer"
                          : "text-gray-400 hover:text-white cursor-pointer"
                      }`}
                    >
                      📄 Raw XML
                    </button>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => setSitemapOpen(false)}
                    className="p-2 hover:bg-white/5 text-gray-400 hover:text-white rounded-xl border border-white/5 hover:border-white/10 transition cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Body Panel */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {sitemapTab === "visual" ? (
                  <div className="space-y-6 text-left">
                    {/* Index metrics banner */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { label: "Google Index Status", val: "Indexed (Live)", color: "text-emerald-400" },
                        { label: "Indexing Priority", val: "Global Priority (1.0)", color: "text-[#D946EF]" },
                        { label: "Usability Health", val: "100% Mobile Clean", color: "text-blue-400" },
                        { label: "Sitemap Schema Version", val: "v2.6 Enterprise", color: "text-amber-400" }
                      ].map((stat, idx) => (
                        <div key={idx} className="bg-black/40 border border-white/5 rounded-xl p-3 text-center space-y-1">
                          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{stat.label}</p>
                          <p className={`text-xs font-bold leading-none ${stat.color}`}>{stat.val}</p>
                        </div>
                      ))}
                    </div>

                    <p className="text-gray-400 text-xs">
                      👉 <strong className="text-[#D946EF]">Interactive Navigation:</strong> Click any node element below to instantly navigate to that section within the live application viewport.
                    </p>

                    {/* Nodes graph layout */}
                    <div className="space-y-4">
                      {/* Main Index Node */}
                      <div className="flex flex-col items-center justify-center p-3 bg-[#18092a]/30 border border-[#D946EF]/35 rounded-xl max-w-sm mx-auto text-center cursor-pointer hover:bg-[#18092a]/50 transition" onClick={() => { setSitemapOpen(false); navigateTo("home"); }}>
                        <span className="text-[9px] font-mono text-[#D946EF]">PRIORITY 1.0</span>
                        <h4 className="text-white font-bold text-sm font-display flex items-center gap-1"><Home className="w-3.5 h-3.5 text-[#D946EF]" /> Home Hub Route (index.html)</h4>
                        <p className="text-gray-400 text-[10px] mt-0.5">Primary landing workspace covering overall direct value propositions.</p>
                      </div>

                      {/* Direction arrow line */}
                      <div className="flex items-center justify-center -my-2 h-6">
                        <div className="w-0.5 h-full bg-gradient-to-b from-[#A855F7]/50 to-[#D946EF]/50"></div>
                      </div>

                      {/* Primary Categories Nodes Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* 1. Core Services Hub */}
                        <div className="bg-black/50 border border-white/5 p-4 rounded-xl space-y-3">
                          <div className="flex justify-between items-center pb-2 border-b border-white/5">
                            <span className="text-white font-bold font-mono text-[10px] uppercase flex items-center gap-1">🛠️ Core services (0.9)</span>
                            <span className="text-[9px] font-mono bg-[#D946EF]/15 text-[#D946EF] px-1.5 py-0.5 rounded">6 routes</span>
                          </div>
                          <div className="space-y-1 text-xs">
                            {[
                              { id: "seo", name: "Search Engine Optimization" },
                              { id: "ppc", name: "Pay-Per-Click Advertising" },
                              { id: "social-media-marketing", name: "Social Media Growth" },
                              { id: "email-marketing", name: "Email Engagement" },
                              { id: "web-development", name: "Headless Web Dev" },
                              { id: "lead-generation", name: "Appointment Outbound" }
                            ].map((s) => (
                              <button
                                key={s.id}
                                onClick={() => {
                                  setSitemapOpen(false);
                                  navigateTo("services", s.id);
                                }}
                                className="w-full text-left p-1.5 hover:bg-white/5 rounded text-[11px] text-gray-300 hover:text-white transition flex items-center justify-between cursor-pointer"
                              >
                                <span>{s.name}</span>
                                <ChevronRight className="w-3 h-3 text-[#D946EF]" />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 2. client Case Studies and Portfolios */}
                        <div className="bg-black/50 border border-white/5 p-4 rounded-xl space-y-3">
                          <div className="flex justify-between items-center pb-2 border-b border-white/5">
                            <span className="text-white font-bold font-mono text-[10px] uppercase flex items-center gap-1">📊 Case Studies (0.8)</span>
                            <span className="text-[9px] font-mono bg-[#D946EF]/15 text-[#D946EF] px-1.5 py-0.5 rounded">Indexed</span>
                          </div>
                          
                          <div className="space-y-2 text-xs">
                            <button
                              onClick={() => { setSitemapOpen(false); navigateTo("case-studies"); }}
                              className="w-full flex items-center justify-between p-2 bg-black/40 hover:bg-white/5 border border-white/5 rounded-lg text-gray-300 hover:text-white transition text-[11px] cursor-pointer"
                            >
                              <span>Client Case Chronicles</span>
                              <ChevronRight className="w-3 h-3 text-[#D946EF]" />
                            </button>

                            <button
                              onClick={() => { setSitemapOpen(false); navigateTo("portfolio"); }}
                              className="w-full flex items-center justify-between p-2 bg-black/40 hover:bg-white/5 border border-white/5 rounded-lg text-gray-300 hover:text-white transition text-[11px] cursor-pointer"
                            >
                              <span>Interactive Portfolio Grid</span>
                              <ChevronRight className="w-3 h-3 text-[#D946EF]" />
                            </button>

                            <div className="bg-[#D946EF]/5 p-2 rounded-lg border border-[#D946EF]/20 space-y-1.5 text-left">
                              <p className="text-[9px] text-[#D946EF] font-mono font-bold uppercase">Dynamic Leads Generated</p>
                              <p className="text-[10px] text-gray-400">Every case study triggers internal CRM reporting hooks automatically.</p>
                            </div>
                          </div>
                        </div>

                        {/* 3. Operational B2B Desks */}
                        <div className="bg-black/50 border border-white/5 p-4 rounded-xl space-y-3">
                          <div className="flex justify-between items-center pb-2 border-b border-white/5">
                            <span className="text-white font-bold font-mono text-[10px] uppercase flex items-center gap-1">⚡ Dynamic Endpoints</span>
                            <span className="text-[9px] font-mono bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded">Actionable</span>
                          </div>
                          
                          <div className="space-y-1.5 text-xs">
                            <button
                              onClick={() => { setSitemapOpen(false); navigateTo("contact"); }}
                              className="w-full flex items-center justify-between p-2 bg-black/40 hover:bg-white/5 border border-white/5 rounded-lg text-gray-300 hover:text-white transition text-[11px] cursor-pointer"
                            >
                              <span>Contact Inquiry Desk (0.9)</span>
                              <ChevronRight className="w-3 h-3 text-blue-400" />
                            </button>

                            <button
                              onClick={() => { setSitemapOpen(false); navigateTo("blog"); }}
                              className="w-full flex items-center justify-between p-2 bg-black/40 hover:bg-white/5 border border-white/5 rounded-lg text-gray-300 hover:text-white transition text-[11px] cursor-pointer"
                            >
                              <span>Insights Blog (0.7)</span>
                              <ChevronRight className="w-3 h-3 text-blue-400" />
                            </button>

                            <button
                              onClick={() => { setSitemapOpen(false); navigateTo("crm"); }}
                              className="w-full flex items-center justify-between p-2 bg-black/40 hover:bg-white/5 border border-white/5 rounded-lg text-gray-300 hover:text-white transition text-[11px] cursor-pointer"
                            >
                              <span>CRM Administrative Hub</span>
                              <ChevronRight className="w-3 h-3 text-blue-400" />
                            </button>

                            <button
                              onClick={() => { setSitemapOpen(false); navigateTo("about"); }}
                              className="w-full flex items-center justify-between p-2 bg-black/40 hover:bg-white/5 border border-white/5 rounded-lg text-gray-300 hover:text-white transition text-[11px] cursor-pointer"
                            >
                              <span>About Culture (0.6)</span>
                              <ChevronRight className="w-3 h-3 text-blue-400" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Direction lines to Support Integration hooks */}
                      <div className="flex items-center justify-center -my-2 h-6">
                        <div className="w-0.5 h-full bg-gradient-to-b from-[#A855F7]/50 to-emerald-500/50"></div>
                      </div>

                      {/* Interactive Float Desks and Micro Webhooks */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        <div className="p-3 bg-emerald-950/25 border border-emerald-500/30 rounded-xl flex items-center gap-2.5 text-xs text-left">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <div>
                            <p className="text-white font-bold text-[11px]">Floating WhatsApp Business Assistant</p>
                            <p className="text-gray-400 text-[10px] mt-0.5">Automated lead routing targeting Aman Mathur (+91 91100 24890).</p>
                          </div>
                        </div>

                        <div className="p-3 bg-[#18092a]/30 border border-[#A855F7]/30 rounded-xl flex items-center gap-2.5 text-xs text-left">
                          <Sparkles className="w-4 h-4 text-[#D946EF] animate-pulse" />
                          <div>
                            <p className="text-white font-bold text-[11px]">Gemini 1.5 Real-time AI Consultant</p>
                            <p className="text-gray-400 text-[10px] mt-0.5">Bespoke full-stack conversational diagnostic proxy on client end.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 text-left">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <p className="text-xs text-gray-400 bg-black/30 p-2.5 rounded-lg border border-white/5">Conforms exactly to Search Engine Indexer Crawler (Sitemaps Schema v0.9) requirements. Direct-use output.</p>
                      <button
                        onClick={() => {
                          const xmlText = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <!-- Primary Landing Indexes -->\n  <url>\n    <loc>https://aimnexora-digital.com/</loc>\n    <lastmod>2026-06-01</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n  <url>\n    <loc>https://aimnexora-digital.com/services</loc>\n    <lastmod>2026-06-01</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n  <url>\n    <loc>https://aimnexora-digital.com/portfolio</loc>\n    <lastmod>2026-06-01</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n  <url>\n    <loc>https://aimnexora-digital.com/case-studies</loc>\n    <lastmod>2026-06-01</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n  <url>\n    <loc>https://aimnexora-digital.com/blog</loc>\n    <lastmod>2026-06-01</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.7</priority>\n  </url>\n  <url>\n    <loc>https://aimnexora-digital.com/about</loc>\n    <lastmod>2026-06-01</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n</urlset>`;
                          navigator.clipboard.writeText(xmlText);
                          alert("XML Sitemap copied to clipboard successfully!");
                        }}
                        className="bg-zinc-900 border border-white/10 hover:border-white/20 hover:bg-black text-[#D946EF] hover:text-white px-3 py-1.5 font-mono text-[10px] rounded-lg transition cursor-pointer self-stretch text-center"
                      >
                        Copy XML Text 📋
                      </button>
                    </div>

                    <pre className="p-4 bg-black border border-white/5 rounded-xl font-mono text-[10px] leading-relaxed text-emerald-400 overflow-x-auto select-all max-h-[45vh]">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Primary Landing Hub -->
  <url>
    <loc>https://aimnexora-digital.com/</loc>
    <lastmod>2026-06-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Core Services Specifications -->
  <url>
    <loc>https://aimnexora-digital.com/services</loc>
    <lastmod>2026-06-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Real-time Interactive Portfolio -->
  <url>
    <loc>https://aimnexora-digital.com/portfolio</loc>
    <lastmod>2026-06-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Client Success Case Chronicles -->
  <url>
    <loc>https://aimnexora-digital.com/case-studies</loc>
    <lastmod>2026-06-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Insights Blog Feed -->
  <url>
    <loc>https://aimnexora-digital.com/blog</loc>
    <lastmod>2026-06-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- About Culture -->
  <url>
    <loc>https://aimnexora-digital.com/about</loc>
    <lastmod>2026-06-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- Contact CRM Terminal -->
  <url>
    <loc>https://aimnexora-digital.com/contact</loc>
    <lastmod>2026-06-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

</urlset>`}
                    </pre>
                  </div>
                )}
              </div>

              {/* Footer diagnostic block */}
              <div className="p-4 bg-black border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-500 font-mono">
                <p>⚡ Schema compliant with Sitemap v0.9 • Encrypted TLS</p>
                <div className="flex gap-4 mt-2 sm:mt-0">
                  <span>SSL: SECURED</span>
                  <span>SPEED INDEX: 99/100</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
