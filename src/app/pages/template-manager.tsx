import { useState } from "react";
import {
  FileText,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Copy,
  Search,
  Edit3,
  Star,
  MessageSquare,
  Mail,
  Phone,
  Globe,
  Trash2,
  MoreHorizontal,
  ArrowRight,
  Download,
  X,
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  channel: string;
  category: string;
  status: string;
  language: string;
  lastModified: string;
  usageCount: number;
  rating: number;
  content: string;
  variables: string[];
  previewType?: "whatsapp" | "email" | "sms";
}

const templates: Template[] = [
  {
    id: "tmpl_001", name: "Welcome Onboarding", channel: "WhatsApp", category: "Onboarding",
    status: "approved", language: "English", lastModified: "2026-04-05", usageCount: 45230,
    rating: 4.8, variables: ["name", "company", "referral_link"],
    content: "Hi {{name}}! 👋\n\nWelcome to *{{company}}*! We're thrilled to have you on board.\n\nYour account is ready. Here's your personalized onboarding link:\n{{referral_link}}\n\nReply *HELP* anytime to reach our support team. 🚀",
    previewType: "whatsapp",
  },
  {
    id: "tmpl_002", name: "Order Confirmation", channel: "WhatsApp", category: "Transactional",
    status: "approved", language: "English", lastModified: "2026-04-03", usageCount: 38920,
    rating: 4.9, variables: ["name", "order_id", "delivery_date", "tracking_link"],
    content: "✅ Order Confirmed!\n\nHi {{name}}, your order *#{{order_id}}* has been confirmed.\n\n📦 Expected delivery: *{{delivery_date}}*\n🔗 Track here: {{tracking_link}}\n\nThank you for shopping with us!",
    previewType: "whatsapp",
  },
  {
    id: "tmpl_003", name: "Payment Reminder", channel: "Email", category: "Finance",
    status: "approved", language: "English", lastModified: "2026-04-01", usageCount: 22100,
    rating: 4.5, variables: ["name", "amount", "due_date", "payment_link"],
    content: "Subject: Payment Reminder — Action Required\n\nDear {{name}},\n\nThis is a reminder that your payment of ${{amount}} is due on {{due_date}}.\n\nPlease complete the payment to avoid service interruption:\n[Pay Now → {{payment_link}}]\n\nIf you've already made the payment, please disregard this email.\n\nBest regards,\nFlexi Versa Finance Team",
    previewType: "email",
  },
  {
    id: "tmpl_004", name: "Flash Sale Alert", channel: "SMS", category: "Promotions",
    status: "pending", language: "English", lastModified: "2026-04-08", usageCount: 0,
    rating: 0, variables: ["name", "discount", "product", "expiry", "link"],
    content: "🔥 FLASH SALE, {{name}}! Get {{discount}}% OFF on {{product}}. Limited time — expires {{expiry}}. Shop now: {{link}}\nReply STOP to unsubscribe.",
    previewType: "sms",
  },
  {
    id: "tmpl_005", name: "Appointment Reminder", channel: "WhatsApp", category: "Scheduling",
    status: "approved", language: "English", lastModified: "2026-03-28", usageCount: 15400,
    rating: 4.7, variables: ["name", "date", "time", "location", "reschedule_link"],
    content: "📅 Appointment Reminder\n\nHi {{name}},\n\nYou have an upcoming appointment:\n🗓 *{{date}}* at *{{time}}*\n📍 {{location}}\n\nReply *CONFIRM* to confirm or visit {{reschedule_link}} to reschedule.",
    previewType: "whatsapp",
  },
  {
    id: "tmpl_006", name: "Lead Qualification", channel: "WhatsApp", category: "Sales",
    status: "approved", language: "English", lastModified: "2026-03-25", usageCount: 28900,
    rating: 4.6, variables: ["name", "company", "product_interest"],
    content: "Hi {{name}} from {{company}}! 👋\n\nThanks for showing interest in *{{product_interest}}*.\n\nTo help us customize the best solution for you, could you answer a few quick questions?\n\n1️⃣ How many users will need access?\n2️⃣ Which channels are most important? (WhatsApp/SMS/Email/Voice)\n\nReply with your answers and we'll get back to you within 2 hours! ⚡",
    previewType: "whatsapp",
  },
  {
    id: "tmpl_007", name: "Product Launch Email", channel: "Email", category: "Marketing",
    status: "approved", language: "English", lastModified: "2026-03-20", usageCount: 34500,
    rating: 4.4, variables: ["name", "product_name", "launch_date", "early_bird_price", "cta_link"],
    content: "Subject: 🚀 Introducing {{product_name}} — Exclusive Early Bird Access\n\nHi {{name}},\n\nWe're launching *{{product_name}}* on {{launch_date}}!\n\nAs one of our valued customers, you get exclusive early bird pricing:\n💰 {{early_bird_price}} (Regular: $299/month)\n\n[Claim Your Spot → {{cta_link}}]\n\nOnly 500 early bird slots available. Don't miss out!",
    previewType: "email",
  },
  {
    id: "tmpl_008", name: "Re-engagement SMS", channel: "SMS", category: "Retention",
    status: "rejected", language: "English", lastModified: "2026-04-02", usageCount: 0,
    rating: 0, variables: ["name", "last_activity", "special_offer"],
    content: "Hi {{name}}! We miss you! You haven't been active since {{last_activity}}. Come back and get {{special_offer}}. Visit us at flexiversa.com",
    previewType: "sms",
  },
  {
    id: "tmpl_009", name: "OTP Verification", channel: "SMS", category: "Authentication",
    status: "approved", language: "English", lastModified: "2026-03-15", usageCount: 125400,
    rating: 4.9, variables: ["otp", "validity"],
    content: "Your Flexi Versa OTP is: {{otp}}\nValid for {{validity}} minutes.\nDo NOT share this code with anyone.",
    previewType: "sms",
  },
  {
    id: "tmpl_010", name: "Support Ticket Update", channel: "WhatsApp", category: "Support",
    status: "approved", language: "English", lastModified: "2026-03-10", usageCount: 18700,
    rating: 4.7, variables: ["name", "ticket_id", "status", "agent_name", "resolution"],
    content: "🎫 Ticket Update\n\nHi {{name}},\n\nYour support ticket *#{{ticket_id}}* has been updated.\n\n📊 Status: *{{status}}*\n👤 Agent: {{agent_name}}\n\n{{resolution}}\n\nReply to this message if you need further assistance.",
    previewType: "whatsapp",
  },
];

const channelIcons: Record<string, any> = {
  WhatsApp: MessageSquare,
  Email: Mail,
  SMS: MessageSquare,
  Voice: Phone,
};

const channelColors: Record<string, { bg: string; text: string; color: string }> = {
  WhatsApp: { bg: "rgba(0,201,177,0.1)", text: "#00C9B1", color: "#00C9B1" },
  Email: { bg: "rgba(99,102,241,0.1)", text: "#6366F1", color: "#6366F1" },
  SMS: { bg: "rgba(139,92,246,0.1)", text: "#8B5CF6", color: "#8B5CF6" },
  Voice: { bg: "rgba(245,158,11,0.1)", text: "#F59E0B", color: "#F59E0B" },
};

const statusConfig: Record<string, { bg: string; text: string; icon: any; label: string }> = {
  approved: { bg: "rgba(16,185,129,0.1)", text: "#10B981", icon: CheckCircle, label: "Approved" },
  pending: { bg: "rgba(245,158,11,0.1)", text: "#F59E0B", icon: Clock, label: "Pending Review" },
  rejected: { bg: "rgba(239,68,68,0.1)", text: "#EF4444", icon: XCircle, label: "Rejected" },
};

export function TemplateManager() {
  const [templateList, setTemplateList] = useState<Template[]>(templates);
  const [selected, setSelected] = useState<Template>(templates[0]);
  const [filter, setFilter] = useState("all");
  const [channelFilter, setChannelFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [newTemplate, setNewTemplate] = useState({ name: "", channel: "WhatsApp", category: "Marketing", content: "" });

  const filtered = templateList.filter((t) => {
    const matchStatus = filter === "all" || t.status === filter;
    const matchChannel = channelFilter === "all" || t.channel === channelFilter;
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchChannel && matchSearch;
  });

  const stats = {
    total: templateList.length,
    approved: templateList.filter((t) => t.status === "approved").length,
    pending: templateList.filter((t) => t.status === "pending").length,
    rejected: templateList.filter((t) => t.status === "rejected").length,
    totalUsage: templateList.reduce((s, t) => s + t.usageCount, 0),
  };

  const handleSaveEdit = () => {
    if (!editingTemplate) return;
    setTemplateList((prev) => prev.map((t) => t.id === editingTemplate.id ? editingTemplate : t));
    setSelected(editingTemplate);
    setEditingTemplate(null);
  };

  const handleDuplicate = (tmpl: Template) => {
    const copy: Template = {
      ...tmpl,
      id: `tmpl_${Date.now()}`,
      name: `${tmpl.name} (Copy)`,
      status: "pending",
      usageCount: 0,
      rating: 0,
      lastModified: new Date().toISOString().split("T")[0],
    };
    setTemplateList((prev) => [...prev, copy]);
  };

  const handleSubmitNew = () => {
    if (!newTemplate.name || !newTemplate.content) return;
    const created: Template = {
      id: `tmpl_${Date.now()}`,
      name: newTemplate.name,
      channel: newTemplate.channel,
      category: newTemplate.category,
      status: "pending",
      language: "English",
      lastModified: new Date().toISOString().split("T")[0],
      usageCount: 0,
      rating: 0,
      content: newTemplate.content,
      variables: [],
      previewType: (newTemplate.channel === "WhatsApp" ? "whatsapp" : newTemplate.channel === "Email" ? "email" : "sms") as any,
    };
    setTemplateList((prev) => [...prev, created]);
    setSelected(created);
    setShowNew(false);
    setNewTemplate({ name: "", channel: "WhatsApp", category: "Marketing", content: "" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="rounded-2xl p-7 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A1628 0%, #2A0E4F 60%, #0A1628 100%)",
          boxShadow: "0 20px 60px rgba(10,22,40,0.35)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #8B5CF6, transparent)", transform: "translate(20%, -20%)" }}
        />
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Template Manager
            </h1>
            <p className="text-sm" style={{ color: "#94A3B8" }}>
              Create, manage, and deploy message templates across all channels
            </p>
          </div>
          <button
            onClick={() => setShowNew(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: "linear-gradient(135deg, #8B5CF6, #6366F1)",
              color: "white",
              boxShadow: "0 4px 15px rgba(139,92,246,0.4)",
            }}
          >
            <Plus className="w-4 h-4" /> New Template
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total", val: stats.total, color: "#6366F1", bg: "rgba(99,102,241,0.1)" },
          { label: "Approved", val: stats.approved, color: "#10B981", bg: "rgba(16,185,129,0.1)" },
          { label: "Pending", val: stats.pending, color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
          { label: "Rejected", val: stats.rejected, color: "#EF4444", bg: "rgba(239,68,68,0.1)" },
          { label: "Total Uses", val: stats.totalUsage.toLocaleString(), color: "#00C9B1", bg: "rgba(0,201,177,0.1)" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4" style={{ border: "1px solid #E8EDF5" }}>
            <div className="font-bold text-xl" style={{ color: s.color }}>{s.val}</div>
            <div className="text-xs mt-0.5" style={{ color: "#64748B" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white flex-1 min-w-48"
          style={{ border: "1px solid #E8EDF5" }}
        >
          <Search className="w-4 h-4" style={{ color: "#94A3B8" }} />
          <input
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none flex-1"
            style={{ color: "#0F172A" }}
          />
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-white" style={{ border: "1px solid #E8EDF5" }}>
          {["all", "approved", "pending", "rejected"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className="px-4 py-1.5 rounded-lg text-xs font-medium transition-all capitalize"
              style={{
                background: filter === s ? "#0F172A" : "transparent",
                color: filter === s ? "white" : "#64748B",
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-white" style={{ border: "1px solid #E8EDF5" }}>
          {["all", "WhatsApp", "Email", "SMS"].map((ch) => (
            <button
              key={ch}
              onClick={() => setChannelFilter(ch)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: channelFilter === ch ? (channelColors[ch]?.color || "#0F172A") : "transparent",
                color: channelFilter === ch ? "white" : "#64748B",
              }}
            >
              {ch}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div
          className="lg:col-span-2 bg-white rounded-2xl overflow-hidden"
          style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          <div className="p-5 border-b" style={{ borderColor: "#F1F5F9" }}>
            <div className="flex items-center justify-between">
              <h3 className="font-bold" style={{ color: "#0F172A" }}>
                Templates <span className="text-sm font-normal" style={{ color: "#94A3B8" }}>({filtered.length})</span>
              </h3>
              <button className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#6366F1" }}>
                <Download className="w-3.5 h-3.5" /> Export All
              </button>
            </div>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: "600px" }}>
            {filtered.map((tmpl) => {
              const ch = channelColors[tmpl.channel];
              const st = statusConfig[tmpl.status];
              const StatusIcon = st.icon;
              const ChIcon = channelIcons[tmpl.channel] || MessageSquare;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => setSelected(tmpl)}
                  className="w-full text-left p-5 border-b transition-all hover:bg-slate-50"
                  style={{
                    borderColor: "#F8FAFC",
                    background: selected.id === tmpl.id ? "rgba(99,102,241,0.04)" : "white",
                    borderLeft: selected.id === tmpl.id ? "3px solid #6366F1" : "3px solid transparent",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: ch.bg }}
                    >
                      <ChIcon className="w-5 h-5" style={{ color: ch.text }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-sm" style={{ color: "#0F172A" }}>{tmpl.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{ background: ch.bg, color: ch.text }}
                            >
                              {tmpl.channel}
                            </span>
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{ background: "#F1F5F9", color: "#64748B" }}
                            >
                              {tmpl.category}
                            </span>
                            <span
                              className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
                              style={{ background: st.bg, color: st.text }}
                            >
                              <StatusIcon className="w-2.5 h-2.5" />
                              {st.label}
                            </span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          {tmpl.rating > 0 && (
                            <div className="flex items-center gap-1 justify-end">
                              <Star className="w-3 h-3" style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                              <span className="text-xs font-semibold" style={{ color: "#F59E0B" }}>{tmpl.rating}</span>
                            </div>
                          )}
                          <div className="text-xs mt-1" style={{ color: "#94A3B8" }}>
                            {tmpl.usageCount.toLocaleString()} uses
                          </div>
                        </div>
                      </div>
                      <p className="text-xs mt-2 line-clamp-2 leading-relaxed" style={{ color: "#64748B" }}>
                        {tmpl.content.split("\n")[0]}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          {/* Preview Panel */}
          <div
            className="bg-white rounded-2xl p-5"
            style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold" style={{ color: "#0F172A" }}>
                Template Preview
              </h3>
              <Eye className="w-4 h-4" style={{ color: "#94A3B8" }} />
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 mb-4">
              {(() => {
                const st = statusConfig[selected.status];
                const StatusIcon = st.icon;
                return (
                  <span
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: st.bg, color: st.text }}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {st.label}
                  </span>
                );
              })()}
              <span
                className="text-xs px-2.5 py-1.5 rounded-full font-medium"
                style={{ background: channelColors[selected.channel]?.bg, color: channelColors[selected.channel]?.text }}
              >
                {selected.channel}
              </span>
            </div>

            {/* WhatsApp Preview */}
            {selected.previewType === "whatsapp" && (
              <div
                className="rounded-2xl overflow-hidden mb-4"
                style={{ background: "#E5DDD5" }}
              >
                {/* Phone header */}
                <div
                  className="px-4 py-3 flex items-center gap-2"
                  style={{ background: "#075E54" }}
                >
                  <div className="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">FV</span>
                  </div>
                  <div>
                    <div className="text-white text-xs font-semibold">Flexi Versa</div>
                    <div className="text-white/70 text-xs">Business Account</div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="bg-white rounded-xl p-3 shadow-sm max-w-xs">
                    <p className="text-sm whitespace-pre-wrap leading-relaxed" style={{ color: "#111B21" }}>
                      {selected.content}
                    </p>
                    <div className="flex items-center justify-end gap-1 mt-1.5">
                      <span className="text-xs" style={{ color: "#667781" }}>10:24 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SMS Preview */}
            {selected.previewType === "sms" && (
              <div className="rounded-2xl overflow-hidden mb-4" style={{ background: "#F1F5F9" }}>
                <div className="px-4 py-2 text-center border-b" style={{ background: "#E2E8F0", borderColor: "#CBD5E1" }}>
                  <span className="text-xs font-semibold" style={{ color: "#64748B" }}>SMS Message</span>
                </div>
                <div className="p-3">
                  <div
                    className="rounded-xl p-3 text-sm whitespace-pre-wrap leading-relaxed"
                    style={{ background: "#E2E8F0", color: "#0F172A" }}
                  >
                    {selected.content}
                  </div>
                </div>
              </div>
            )}

            {/* Email Preview */}
            {selected.previewType === "email" && (
              <div className="rounded-xl overflow-hidden mb-4 border" style={{ borderColor: "#E2E8F0" }}>
                <div className="px-4 py-2" style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                  <div className="text-xs" style={{ color: "#64748B" }}>
                    <span className="font-semibold">To:</span> {selected.variables.includes("name") ? "{{name}}" : "Customer"}
                  </div>
                  <div className="text-xs" style={{ color: "#64748B" }}>
                    <span className="font-semibold">From:</span> noreply@flexiversa.com
                  </div>
                </div>
                <div className="p-3 bg-white">
                  <p className="text-xs whitespace-pre-wrap leading-relaxed" style={{ color: "#334155" }}>
                    {selected.content}
                  </p>
                </div>
              </div>
            )}

            {/* Variables */}
            {selected.variables.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold mb-2" style={{ color: "#475569" }}>Variables</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.variables.map((v) => (
                    <span
                      key={v}
                      className="text-xs px-2.5 py-1 rounded-lg font-mono"
                      style={{ background: "rgba(99,102,241,0.1)", color: "#6366F1" }}
                    >
                      {`{{${v}}}`}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Meta */}
            <div className="space-y-2 text-xs border-t pt-3" style={{ borderColor: "#F1F5F9" }}>
              <div className="flex justify-between">
                <span style={{ color: "#94A3B8" }}>ID</span>
                <span className="font-mono" style={{ color: "#334155" }}>{selected.id}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#94A3B8" }}>Modified</span>
                <span style={{ color: "#334155" }}>{selected.lastModified}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#94A3B8" }}>Usage</span>
                <span style={{ color: "#334155" }}>{selected.usageCount.toLocaleString()}</span>
              </div>
              {selected.rating > 0 && (
                <div className="flex justify-between">
                  <span style={{ color: "#94A3B8" }}>Rating</span>
                  <span style={{ color: "#F59E0B", fontWeight: "600" }}>⭐ {selected.rating}/5</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2 mt-4">
              <button
                onClick={() => setEditingTemplate({ ...selected })}
                className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #8B5CF6, #6366F1)", color: "white" }}
              >
                <Edit3 className="w-4 h-4" /> Edit Template
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleDuplicate(selected)}
                  className="py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5"
                  style={{ background: "#F1F5F9", color: "#64748B" }}
                >
                  <Copy className="w-3.5 h-3.5" /> Duplicate
                </button>
                <button
                  className="py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5"
                  style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Template Modal */}
      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6" style={{ border: "1px solid #E8EDF5" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg" style={{ color: "#0F172A" }}>Create New Template</h3>
              <button onClick={() => setShowNew(false)}>
                <X className="w-5 h-5" style={{ color: "#94A3B8" }} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>Template Name</label>
                <input
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                  placeholder="e.g., Product Announcement"
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>Channel</label>
                  <select
                    value={newTemplate.channel}
                    onChange={(e) => setNewTemplate({ ...newTemplate, channel: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                  >
                    {["WhatsApp", "Email", "SMS", "Voice"].map((ch) => <option key={ch}>{ch}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>Category</label>
                  <select
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                  >
                    {["Marketing", "Transactional", "Onboarding", "Support", "Finance", "Sales", "Authentication"].map((cat) => <option key={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>
                  Content <span style={{ color: "#94A3B8" }}>— Use {"{{variable}}"} for dynamic values</span>
                </label>
                <textarea
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                  placeholder="Hi {{name}}, your message here..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A", minHeight: "120px" }}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowNew(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium" style={{ background: "#F1F5F9", color: "#64748B" }}>
                Cancel
              </button>
              <button
                onClick={handleSubmitNew}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: "linear-gradient(135deg, #8B5CF6, #6366F1)", color: "white" }}
              >
                Submit for Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Template Modal */}
      {editingTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 overflow-y-auto" style={{ border: "1px solid #E8EDF5", maxHeight: "90vh" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg" style={{ color: "#0F172A" }}>Edit Template</h3>
              <button onClick={() => setEditingTemplate(null)}>
                <X className="w-5 h-5" style={{ color: "#94A3B8" }} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>Template Name</label>
                <input
                  value={editingTemplate.name}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>Channel</label>
                  <select
                    value={editingTemplate.channel}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, channel: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                  >
                    {["WhatsApp", "Email", "SMS", "Voice"].map((ch) => <option key={ch}>{ch}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>Category</label>
                  <select
                    value={editingTemplate.category}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                  >
                    {["Marketing", "Transactional", "Onboarding", "Support", "Finance", "Sales", "Authentication"].map((cat) => <option key={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>Status</label>
                  <select
                    value={editingTemplate.status}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, status: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                  >
                    {["approved", "pending", "rejected"].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>
                  Content <span style={{ color: "#94A3B8" }}>— Use {"{{variable}}"} for dynamic values</span>
                </label>
                <textarea
                  value={editingTemplate.content}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, content: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A", minHeight: "160px" }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>
                  Variables <span style={{ color: "#94A3B8" }}>— comma-separated</span>
                </label>
                <input
                  value={editingTemplate.variables.join(", ")}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, variables: e.target.value.split(",").map((v) => v.trim()).filter(Boolean) })}
                  placeholder="name, company, date"
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setEditingTemplate(null)} className="flex-1 py-2.5 rounded-xl text-sm" style={{ background: "#F1F5F9", color: "#64748B" }}>
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: "linear-gradient(135deg, #8B5CF6, #6366F1)", color: "white" }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}