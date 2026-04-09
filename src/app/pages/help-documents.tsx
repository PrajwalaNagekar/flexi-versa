import { useState } from "react";
import {
  BookOpen, Search, Download, Eye, FileText, HelpCircle, Settings,
  Database, Link2, AlertTriangle, Users, Zap, Filter, Tag,
  CheckCircle, Clock, X, Plus, Send, Paperclip, ChevronRight,
  ExternalLink, Star, Ticket,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Doc {
  id: string;
  title: string;
  category: string;
  type: "PDF" | "DOC" | "MD" | "VIDEO";
  size: string;
  date: string;
  description: string;
  tags: string[];
  featured?: boolean;
}

interface TicketType {
  id: string;
  title: string;
  category: string;
  priority: string;
  status: "Open" | "In Progress" | "Closed";
  created: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const categories = [
  { id: "all", label: "All Documents", icon: BookOpen, count: 42 },
  { id: "business", label: "Business Documents", icon: FileText, count: 6 },
  { id: "technical", label: "Technical Documentation", icon: Settings, count: 8 },
  { id: "crm", label: "CRM Integration Guides", icon: Link2, count: 5 },
  { id: "api", label: "API Documentation", icon: Zap, count: 7 },
  { id: "database", label: "Database Documentation", icon: Database, count: 4 },
  { id: "troubleshooting", label: "Troubleshooting Guides", icon: AlertTriangle, count: 5 },
  { id: "sops", label: "SOPs", icon: CheckCircle, count: 4 },
  { id: "faqs", label: "FAQs", icon: HelpCircle, count: 3 },
  { id: "limitations", label: "System Limitations", icon: AlertTriangle, count: 2 },
  { id: "onboarding", label: "Onboarding Guides", icon: Users, count: 4 },
];

const documents: Doc[] = [
  // Business
  { id: "d001", title: "Flexi Versa 1 — Business Overview", category: "business", type: "PDF", size: "2.4 MB", date: "2026-04-01", description: "Full business context, value proposition, and product positioning for Flexi Versa 1 C-PaaS platform.", tags: ["overview", "business", "strategy"], featured: true },
  { id: "d002", title: "Enterprise Contract & SLA Terms", category: "business", type: "DOC", size: "1.1 MB", date: "2026-03-20", description: "Standard enterprise contract terms, SLA commitments, uptime guarantees, and penalty clauses.", tags: ["contract", "SLA", "legal"] },
  { id: "d003", title: "Pricing & Licensing Model", category: "business", type: "PDF", size: "0.8 MB", date: "2026-03-15", description: "Tiered pricing structure, volume discounts, add-on modules, and licensing agreements.", tags: ["pricing", "licensing"] },
  { id: "d004", title: "Flyworld ERP Portal — Scope Document", category: "business", type: "DOC", size: "3.2 MB", date: "2026-04-05", description: "Detailed scope of the Flyworld ERP portal implementation, including module coverage and delivery timelines.", tags: ["flyworld", "erp", "scope"], featured: true },
  { id: "d005", title: "Data Privacy & Compliance Policy", category: "business", type: "PDF", size: "1.6 MB", date: "2026-02-28", description: "GDPR, PDPA, and regional compliance policies applicable to UAE, UK, and Australia operations.", tags: ["privacy", "compliance", "GDPR"] },
  { id: "d006", title: "ROI & Business Case Template", category: "business", type: "DOC", size: "0.9 MB", date: "2026-03-10", description: "Pre-built ROI calculator and business case template for enterprise clients.", tags: ["ROI", "business case"] },

  // Technical
  { id: "d007", title: "Platform Architecture Overview", category: "technical", type: "PDF", size: "4.1 MB", date: "2026-04-02", description: "System architecture, microservices topology, cloud infrastructure, and scaling design.", tags: ["architecture", "microservices"], featured: true },
  { id: "d008", title: "Deployment & Infrastructure Guide", category: "technical", type: "DOC", size: "2.8 MB", date: "2026-03-25", description: "Step-by-step deployment guide for production and staging environments on AWS/GCP.", tags: ["deployment", "infrastructure"] },
  { id: "d009", title: "Security Architecture & Hardening", category: "technical", type: "PDF", size: "3.0 MB", date: "2026-03-18", description: "Security framework, encryption standards, access controls, and penetration testing results.", tags: ["security", "encryption"] },
  { id: "d010", title: "WhatsApp Business API — Technical Setup", category: "technical", type: "MD", size: "0.5 MB", date: "2026-04-08", description: "Complete technical setup for WhatsApp Cloud API including WABA configuration, webhooks, and template registration.", tags: ["WhatsApp", "API", "setup"] },

  // CRM
  { id: "d011", title: "Zoho CRM Integration Guide", category: "crm", type: "PDF", size: "1.8 MB", date: "2026-03-30", description: "Complete Zoho CRM integration guide including OAuth setup, field mapping, and sync configuration.", tags: ["Zoho", "CRM", "integration"], featured: true },
  { id: "d012", title: "Salesforce Integration Guide", category: "crm", type: "PDF", size: "2.1 MB", date: "2026-03-22", description: "Salesforce API integration, JWT authentication, SOQL queries, and webhook setup.", tags: ["Salesforce", "CRM"] },
  { id: "d013", title: "HubSpot Integration Guide", category: "crm", type: "PDF", size: "1.5 MB", date: "2026-03-15", description: "HubSpot CRM API connection, contact lifecycle sync, and deal pipeline integration.", tags: ["HubSpot", "CRM"] },
  { id: "d014", title: "Custom CRM / ERP Integration", category: "crm", type: "MD", size: "0.7 MB", date: "2026-04-06", description: "REST API integration framework for connecting custom CRM or ERP systems to Flexi Versa.", tags: ["custom", "ERP", "REST"] },

  // API
  { id: "d015", title: "REST API Reference v2.1", category: "api", type: "MD", size: "1.2 MB", date: "2026-04-09", description: "Complete REST API reference with endpoints, authentication, rate limits, and response schemas.", tags: ["REST", "API", "reference"], featured: true },
  { id: "d016", title: "Webhook Events Catalogue", category: "api", type: "MD", size: "0.6 MB", date: "2026-04-07", description: "All webhook events, payload structures, retry logic, and signature verification.", tags: ["webhooks", "events"] },
  { id: "d017", title: "API Authentication & Security", category: "api", type: "PDF", size: "0.9 MB", date: "2026-03-28", description: "OAuth 2.0, API key management, JWT tokens, and IP whitelisting guide.", tags: ["authentication", "security"] },

  // Database
  { id: "d018", title: "Database Schema Documentation", category: "database", type: "PDF", size: "3.4 MB", date: "2026-04-03", description: "Full database schema, ER diagrams, indexing strategy, and data model reference.", tags: ["schema", "database", "ERD"], featured: true },
  { id: "d019", title: "Data Migration Guide", category: "database", type: "DOC", size: "1.7 MB", date: "2026-03-20", description: "Step-by-step guide for migrating legacy data into Flexi Versa with validation and rollback procedures.", tags: ["migration", "data"] },
  { id: "d020", title: "Backup & Recovery Procedures", category: "database", type: "PDF", size: "1.1 MB", date: "2026-03-10", description: "Database backup schedules, recovery point objectives, and disaster recovery procedures.", tags: ["backup", "recovery"] },

  // Troubleshooting
  { id: "d021", title: "Common Issues & Resolutions", category: "troubleshooting", type: "MD", size: "0.4 MB", date: "2026-04-08", description: "Most common platform issues with step-by-step resolution guides and workarounds.", tags: ["issues", "fixes"], featured: true },
  { id: "d022", title: "WhatsApp API Errors Reference", category: "troubleshooting", type: "MD", size: "0.3 MB", date: "2026-04-01", description: "WhatsApp API error codes, causes, and resolutions including rate limiting and template rejection.", tags: ["WhatsApp", "errors"] },
  { id: "d023", title: "CRM Sync Failure Diagnostics", category: "troubleshooting", type: "PDF", size: "0.8 MB", date: "2026-03-25", description: "Diagnostic flowchart for CRM sync failures including logs interpretation and retry strategies.", tags: ["CRM", "sync", "errors"] },

  // SOPs
  { id: "d024", title: "Agent Onboarding SOP", category: "sops", type: "PDF", size: "1.3 MB", date: "2026-04-05", description: "Standard operating procedure for onboarding new agents onto the Flexi Versa platform.", tags: ["agent", "onboarding", "SOP"] },
  { id: "d025", title: "Lead Management SOP", category: "sops", type: "PDF", size: "1.0 MB", date: "2026-03-28", description: "Step-by-step SOP for lead intake, qualification, assignment, and conversion tracking.", tags: ["leads", "SOP"] },
  { id: "d026", title: "Campaign Execution SOP", category: "sops", type: "DOC", size: "0.9 MB", date: "2026-03-20", description: "Campaign planning, launch, monitoring, and reporting standard operating procedures.", tags: ["campaign", "SOP"] },

  // FAQs
  { id: "d027", title: "General Platform FAQs", category: "faqs", type: "MD", size: "0.2 MB", date: "2026-04-09", description: "Frequently asked questions about the Flexi Versa platform, features, and capabilities.", tags: ["FAQ", "general"] },
  { id: "d028", title: "Billing & Account FAQs", category: "faqs", type: "MD", size: "0.1 MB", date: "2026-04-01", description: "Common questions about billing, invoices, plan upgrades, and account management.", tags: ["billing", "FAQ"] },

  // Limitations
  { id: "d029", title: "Platform Limitations & Known Issues", category: "limitations", type: "MD", size: "0.3 MB", date: "2026-04-09", description: "Known limitations of the platform, unsupported features, and planned roadmap items.", tags: ["limitations", "known issues"] },

  // Onboarding
  { id: "d030", title: "Admin Onboarding Guide", category: "onboarding", type: "PDF", size: "2.2 MB", date: "2026-04-06", description: "Complete admin onboarding guide covering system setup, user management, and initial configuration.", tags: ["admin", "onboarding"], featured: true },
  { id: "d031", title: "Agent Quick Start Guide", category: "onboarding", type: "PDF", size: "1.0 MB", date: "2026-04-04", description: "Quick start guide for agents covering the conversation panel, lead handling, and key workflows.", tags: ["agent", "quick start"] },
];

const myTickets: TicketType[] = [
  { id: "TKT-2048", title: "WhatsApp template stuck in pending", category: "Technical", priority: "High", status: "In Progress", created: "2026-04-08 10:15" },
  { id: "TKT-2041", title: "CRM sync delay for Zoho leads", category: "Integration", priority: "Critical", status: "Open", created: "2026-04-07 14:30" },
  { id: "TKT-2038", title: "SLA timer not resetting after agent response", category: "Bug", priority: "Medium", status: "Closed", created: "2026-04-06 09:45" },
];

const typeColors: Record<string, { bg: string; text: string }> = {
  PDF: { bg: "rgba(239,68,68,0.1)", text: "#EF4444" },
  DOC: { bg: "rgba(59,130,246,0.1)", text: "#3B82F6" },
  MD: { bg: "rgba(99,102,241,0.1)", text: "#6366F1" },
  VIDEO: { bg: "rgba(245,158,11,0.1)", text: "#F59E0B" },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export function HelpDocuments() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(documents[0]);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketSubmitted, setTicketSubmitted] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"docs" | "tickets">("docs");

  const [ticket, setTicket] = useState({
    title: "", category: "Technical", priority: "Medium",
    description: "", module: "Dashboard", attachment: "",
  });

  const filtered = documents.filter((doc) => {
    const matchCat = activeCategory === "all" || doc.category === activeCategory;
    const matchSearch = !search || doc.title.toLowerCase().includes(search.toLowerCase()) || doc.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featured = documents.filter((d) => d.featured);

  const handleTicketSubmit = () => {
    if (!ticket.title || !ticket.description) return;
    const id = `TKT-${2049 + Math.floor(Math.random() * 10)}`;
    setTicketSubmitted(id);
    setTicket({ title: "", category: "Technical", priority: "Medium", description: "", module: "Dashboard", attachment: "" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="rounded-2xl p-7 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A1628 0%, #1a0a3c 60%, #0A1628 100%)",
          boxShadow: "0 20px 60px rgba(10,22,40,0.35)",
        }}
      >
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #8B5CF6, transparent)", transform: "translate(20%, -20%)" }} />
        <div className="relative flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Help & Documents
            </h1>
            <p className="text-sm" style={{ color: "#94A3B8" }}>
              Documentation centre · {documents.length} documents · Raise support tickets
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setActiveSection("docs")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
              style={{ background: activeSection === "docs" ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.08)", color: "white", border: activeSection === "docs" ? "1px solid rgba(139,92,246,0.5)" : "1px solid rgba(255,255,255,0.15)" }}
            >
              <BookOpen className="w-4 h-4" /> Documents
            </button>
            <button
              onClick={() => setActiveSection("tickets")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
              style={{ background: activeSection === "tickets" ? "rgba(0,201,177,0.3)" : "rgba(255,255,255,0.08)", color: "white", border: activeSection === "tickets" ? "1px solid rgba(0,201,177,0.5)" : "1px solid rgba(255,255,255,0.15)" }}
            >
              <Ticket className="w-4 h-4" /> My Tickets ({myTickets.length})
            </button>
            <button
              onClick={() => setShowTicketForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: "linear-gradient(135deg, #8B5CF6, #6366F1)", color: "white", boxShadow: "0 4px 15px rgba(139,92,246,0.4)" }}
            >
              <Plus className="w-4 h-4" /> Raise Ticket
            </button>
          </div>
        </div>
      </div>

      {/* Tickets Section */}
      {activeSection === "tickets" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold" style={{ color: "#0F172A" }}>My Support Tickets</h2>
            <button
              onClick={() => setShowTicketForm(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
              style={{ background: "linear-gradient(135deg, #8B5CF6, #6366F1)", color: "white" }}
            >
              <Plus className="w-4 h-4" /> New Ticket
            </button>
          </div>
          <div className="space-y-3">
            {myTickets.map((t) => {
              const statusColors: Record<string, { bg: string; text: string }> = {
                "Open": { bg: "rgba(239,68,68,0.1)", text: "#EF4444" },
                "In Progress": { bg: "rgba(245,158,11,0.1)", text: "#F59E0B" },
                "Closed": { bg: "rgba(16,185,129,0.1)", text: "#10B981" },
              };
              const priorityColors: Record<string, string> = { Critical: "#EF4444", High: "#F59E0B", Medium: "#6366F1", Low: "#10B981" };
              const sc = statusColors[t.status];
              return (
                <div key={t.id} className="bg-white rounded-2xl p-5 flex items-center gap-4" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(99,102,241,0.1)" }}>
                    <Ticket className="w-5 h-5" style={{ color: "#6366F1" }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-semibold" style={{ color: "#6366F1" }}>{t.id}</span>
                      <span className="text-sm font-semibold" style={{ color: "#0F172A" }}>{t.title}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs" style={{ color: "#94A3B8" }}>{t.category}</span>
                      <span className="text-xs" style={{ color: "#94A3B8" }}>·</span>
                      <span className="text-xs font-semibold" style={{ color: priorityColors[t.priority] }}>{t.priority}</span>
                      <span className="text-xs" style={{ color: "#94A3B8" }}>·</span>
                      <span className="text-xs" style={{ color: "#94A3B8" }}>{t.created}</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: sc.bg, color: sc.text }}>
                    {t.status}
                  </span>
                </div>
              );
            })}
          </div>
          {myTickets.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center" style={{ border: "1px solid #E8EDF5" }}>
              <Ticket className="w-10 h-10 mx-auto mb-3" style={{ color: "#CBD5E1" }} />
              <p className="font-semibold" style={{ color: "#0F172A" }}>No tickets yet</p>
              <p className="text-xs mt-1" style={{ color: "#94A3B8" }}>Raise a ticket if you need support</p>
            </div>
          )}
        </div>
      )}

      {/* Documents Section */}
      {activeSection === "docs" && (
        <>
          {/* Search */}
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white flex-1"
              style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
            >
              <Search className="w-4 h-4 flex-shrink-0" style={{ color: "#94A3B8" }} />
              <input
                placeholder="Search documents, guides, FAQs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-sm outline-none flex-1"
                style={{ color: "#0F172A" }}
              />
              {search && (
                <button onClick={() => setSearch("")}>
                  <X className="w-4 h-4" style={{ color: "#94A3B8" }} />
                </button>
              )}
            </div>
            <button
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-white"
              style={{ border: "1px solid #E8EDF5" }}
            >
              <Filter className="w-4 h-4" style={{ color: "#94A3B8" }} />
              Filter
            </button>
          </div>

          {/* Featured */}
          {!search && activeCategory === "all" && (
            <div>
              <h3 className="font-bold text-sm mb-3" style={{ color: "#0F172A" }}>Featured Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featured.slice(0, 3).map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className="text-left p-4 rounded-2xl bg-white hover:shadow-md transition-all"
                    style={{ border: `2px solid ${selectedDoc?.id === doc.id ? "#8B5CF6" : "#E8EDF5"}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(139,92,246,0.1)" }}>
                        <Star className="w-4 h-4" style={{ color: "#8B5CF6" }} />
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: typeColors[doc.type].bg, color: typeColors[doc.type].text }}>
                        {doc.type}
                      </span>
                    </div>
                    <h4 className="font-semibold text-sm" style={{ color: "#0F172A" }}>{doc.title}</h4>
                    <p className="text-xs mt-1 line-clamp-2" style={{ color: "#64748B" }}>{doc.description}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-xs" style={{ color: "#94A3B8" }}>{doc.date}</span>
                      <span className="text-xs" style={{ color: "#94A3B8" }}>· {doc.size}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Category Sidebar */}
            <div className="bg-white rounded-2xl p-4" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", height: "fit-content" }}>
              <h3 className="font-bold text-sm mb-3" style={{ color: "#0F172A" }}>Categories</h3>
              <div className="space-y-0.5">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all"
                      style={{
                        background: isActive ? "rgba(139,92,246,0.1)" : "transparent",
                        borderLeft: isActive ? "3px solid #8B5CF6" : "3px solid transparent",
                      }}
                    >
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: isActive ? "#8B5CF6" : "#94A3B8" }} />
                      <span className="text-xs flex-1" style={{ color: isActive ? "#0F172A" : "#64748B", fontWeight: isActive ? 600 : 400 }}>
                        {cat.label}
                      </span>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: isActive ? "rgba(139,92,246,0.2)" : "#F1F5F9", color: isActive ? "#8B5CF6" : "#94A3B8", fontSize: "10px" }}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Document List */}
            <div className="lg:col-span-2 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold" style={{ color: "#334155" }}>{filtered.length} documents</span>
                <span className="text-xs" style={{ color: "#94A3B8" }}>
                  {activeCategory !== "all" ? categories.find((c) => c.id === activeCategory)?.label : "All Categories"}
                </span>
              </div>
              {filtered.length === 0 && (
                <div className="bg-white rounded-2xl p-10 text-center" style={{ border: "1px solid #E8EDF5" }}>
                  <Search className="w-10 h-10 mx-auto mb-3" style={{ color: "#CBD5E1" }} />
                  <p className="font-semibold" style={{ color: "#0F172A" }}>No documents found</p>
                  <p className="text-xs mt-1" style={{ color: "#94A3B8" }}>Try adjusting your search or category filter</p>
                </div>
              )}
              {filtered.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className="w-full text-left bg-white rounded-xl p-4 hover:shadow-md transition-all"
                  style={{
                    border: `1px solid ${selectedDoc?.id === doc.id ? "#8B5CF6" : "#E8EDF5"}`,
                    background: selectedDoc?.id === doc.id ? "rgba(139,92,246,0.03)" : "white",
                    borderLeft: selectedDoc?.id === doc.id ? "3px solid #8B5CF6" : "3px solid transparent",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: typeColors[doc.type].bg }}>
                      <FileText className="w-4 h-4" style={{ color: typeColors[doc.type].text }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-semibold text-sm" style={{ color: "#0F172A" }}>{doc.title}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded font-semibold" style={{ background: typeColors[doc.type].bg, color: typeColors[doc.type].text }}>
                          {doc.type}
                        </span>
                        {doc.featured && <Star className="w-3 h-3" style={{ color: "#F59E0B" }} />}
                      </div>
                      <p className="text-xs line-clamp-1" style={{ color: "#64748B" }}>{doc.description}</p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        {doc.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs px-1.5 py-0.5 rounded" style={{ background: "#F1F5F9", color: "#64748B" }}>#{tag}</span>
                        ))}
                        <span className="text-xs ml-auto" style={{ color: "#94A3B8" }}>{doc.size} · {doc.date}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Document Preview */}
            {selectedDoc && (
              <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", height: "fit-content" }}>
                <div className="p-4 border-b" style={{ borderColor: "#F1F5F9" }}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: typeColors[selectedDoc.type].bg }}>
                        <FileText className="w-4 h-4" style={{ color: typeColors[selectedDoc.type].text }} />
                      </div>
                      <span className="font-bold text-xs" style={{ color: "#0F172A" }}>Preview</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded font-semibold" style={{ background: typeColors[selectedDoc.type].bg, color: typeColors[selectedDoc.type].text }}>
                      {selectedDoc.type}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm mb-2" style={{ color: "#0F172A" }}>{selectedDoc.title}</h3>
                  <p className="text-xs mb-4 leading-relaxed" style={{ color: "#64748B" }}>{selectedDoc.description}</p>

                  {/* Mock preview content */}
                  <div className="rounded-xl p-3 mb-4" style={{ background: "#F8FAFC", border: "1px solid #E8EDF5" }}>
                    <div className="text-xs font-mono space-y-1.5" style={{ color: "#334155" }}>
                      <div className="font-bold" style={{ color: "#0F172A" }}>Table of Contents</div>
                      {["1. Overview", "2. Prerequisites", "3. Step-by-step Guide", "4. Configuration", "5. Troubleshooting"].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 hover:text-violet-600 cursor-pointer transition-colors">
                          <ChevronRight className="w-3 h-3" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {selectedDoc.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(139,92,246,0.1)", color: "#8B5CF6" }}>
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="space-y-1.5 text-xs border-t pt-3 mb-4" style={{ borderColor: "#F1F5F9" }}>
                    <div className="flex justify-between">
                      <span style={{ color: "#94A3B8" }}>File size</span>
                      <span style={{ color: "#334155" }}>{selectedDoc.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "#94A3B8" }}>Last updated</span>
                      <span style={{ color: "#334155" }}>{selectedDoc.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "#94A3B8" }}>Category</span>
                      <span style={{ color: "#8B5CF6", textTransform: "capitalize" }}>{selectedDoc.category}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <button
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold"
                      style={{ background: "linear-gradient(135deg, #8B5CF6, #6366F1)", color: "white" }}
                    >
                      <Eye className="w-4 h-4" /> Open Full Document
                    </button>
                    <button
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium"
                      style={{ background: "#F1F5F9", color: "#64748B" }}
                    >
                      <Download className="w-4 h-4" /> Download {selectedDoc.type}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Raise Ticket Modal */}
      {showTicketForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg" style={{ border: "1px solid #E8EDF5" }}>
            <div className="px-6 py-5 border-b flex items-center justify-between" style={{ borderColor: "#F1F5F9" }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(139,92,246,0.1)" }}>
                  <Ticket className="w-5 h-5" style={{ color: "#8B5CF6" }} />
                </div>
                <div>
                  <h3 className="font-bold" style={{ color: "#0F172A" }}>Raise Support Ticket</h3>
                  <p className="text-xs" style={{ color: "#94A3B8" }}>Our team will respond within 4 business hours</p>
                </div>
              </div>
              <button onClick={() => { setShowTicketForm(false); setTicketSubmitted(null); }}>
                <X className="w-5 h-5" style={{ color: "#94A3B8" }} />
              </button>
            </div>

            {ticketSubmitted ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(16,185,129,0.1)" }}>
                  <CheckCircle className="w-8 h-8" style={{ color: "#10B981" }} />
                </div>
                <h4 className="font-bold text-xl mb-2" style={{ color: "#0F172A" }}>Ticket Created!</h4>
                <p className="text-sm mb-3" style={{ color: "#64748B" }}>Your support request has been submitted successfully.</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-4" style={{ background: "rgba(99,102,241,0.1)" }}>
                  <span className="font-mono font-bold" style={{ color: "#6366F1" }}>{ticketSubmitted}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>Open</span>
                </div>
                <p className="text-xs" style={{ color: "#94A3B8" }}>You can track your ticket status in the My Tickets section.</p>
                <button
                  onClick={() => { setShowTicketForm(false); setTicketSubmitted(null); setActiveSection("tickets"); }}
                  className="mt-4 px-6 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ background: "linear-gradient(135deg, #8B5CF6, #6366F1)", color: "white" }}
                >
                  View My Tickets
                </button>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>Issue Title *</label>
                  <input
                    value={ticket.title}
                    onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
                    placeholder="Briefly describe your issue..."
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>Category</label>
                    <select
                      value={ticket.category}
                      onChange={(e) => setTicket({ ...ticket, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                    >
                      {["Technical", "Integration", "Bug", "Feature Request", "Billing", "Other"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>Priority</label>
                    <select
                      value={ticket.priority}
                      onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                    >
                      {["Critical", "High", "Medium", "Low"].map((p) => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>Module Affected</label>
                  <select
                    value={ticket.module}
                    onChange={(e) => setTicket({ ...ticket, module: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                  >
                    {["Dashboard", "Workflow Builder", "Communication Engine", "Channel Manager", "Template Manager", "Campaign Engine", "CRM Integration", "Analytics", "Voice Solutions", "System Layer", "Admin Settings", "Other"].map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>Description *</label>
                  <textarea
                    value={ticket.description}
                    onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
                    placeholder="Describe your issue in detail. Include steps to reproduce, error messages, and expected behavior..."
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                    style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>Attachment (optional)</label>
                  <div
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
                    style={{ border: "2px dashed #E8EDF5" }}
                  >
                    <Paperclip className="w-4 h-4" style={{ color: "#94A3B8" }} />
                    <span className="text-sm" style={{ color: "#94A3B8" }}>Click to attach screenshot or log file</span>
                  </div>
                </div>
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => setShowTicketForm(false)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium"
                    style={{ background: "#F1F5F9", color: "#64748B" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleTicketSubmit}
                    disabled={!ticket.title || !ticket.description}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50"
                    style={{ background: "linear-gradient(135deg, #8B5CF6, #6366F1)", color: "white" }}
                  >
                    <Send className="w-4 h-4" /> Submit Ticket
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
