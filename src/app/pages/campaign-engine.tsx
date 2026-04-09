import { useState } from "react";
import {
  Megaphone,
  Plus,
  Play,
  Pause,
  Target,
  Calendar,
  TrendingUp,
  Users,
  BarChart3,
  CheckCircle,
  Clock,
  X,
  Edit3,
  Copy,
  Trash2,
  ArrowUp,
  Filter,
  Download,
  DollarSign,
  Activity,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const campaigns = [
  {
    id: "camp_001", name: "Spring Sale 2026", status: "active", channel: "WhatsApp",
    audience: 48000, sent: 45230, delivered: 44820, opened: 32850, clicked: 13140,
    startDate: "2026-04-01", endDate: "2026-04-15", budget: 8500, revenue: 26350, roi: "210%",
    description: "Spring promotion targeting existing customers with 30% discount",
    tags: ["Seasonal", "Discount", "Retention"],
  },
  {
    id: "camp_002", name: "Product Launch Series", status: "active", channel: "Email",
    audience: 62000, sent: 62000, delivered: 61380, opened: 36828, clicked: 14731,
    startDate: "2026-04-05", endDate: "2026-04-25", budget: 12000, revenue: 38400, roi: "220%",
    description: "Multi-email series to launch new enterprise tier features",
    tags: ["Product", "Enterprise", "Launch"],
  },
  {
    id: "camp_003", name: "Flash Sale Q2", status: "scheduled", channel: "SMS",
    audience: 25000, sent: 0, delivered: 0, opened: 0, clicked: 0,
    startDate: "2026-04-12", endDate: "2026-04-13", budget: 4500, revenue: 0, roi: "N/A",
    description: "24-hour flash sale announcement for loyalty customers",
    tags: ["Flash", "Urgency", "SMS"],
  },
  {
    id: "camp_004", name: "VIP Customer Retention", status: "completed", channel: "WhatsApp",
    audience: 12500, sent: 12500, delivered: 12375, opened: 9780, clicked: 4305,
    startDate: "2026-03-20", endDate: "2026-03-31", budget: 6000, revenue: 24600, roi: "310%",
    description: "Exclusive offers for top-tier customers to improve retention",
    tags: ["VIP", "Retention", "Premium"],
  },
  {
    id: "camp_005", name: "Onboarding Drip", status: "active", channel: "WhatsApp",
    audience: 8900, sent: 8900, delivered: 8811, opened: 7048, clicked: 2820,
    startDate: "2026-04-01", endDate: "2026-04-30", budget: 3200, revenue: 12800, roi: "300%",
    description: "Automated 5-touch welcome and onboarding sequence for new users",
    tags: ["Onboarding", "Automation", "New Users"],
  },
  {
    id: "camp_006", name: "Re-engagement Q2", status: "paused", channel: "Email",
    audience: 35000, sent: 18200, delivered: 17836, opened: 8918, clicked: 2675,
    startDate: "2026-04-03", endDate: "2026-04-20", budget: 5500, revenue: 9900, roi: "80%",
    description: "Win-back campaign for contacts inactive for 90+ days",
    tags: ["Re-engagement", "Win-back", "Inactive"],
  },
];

const performanceData = [
  { day: "Day 1", sent: 5800, delivered: 5742, opened: 4122, clicked: 1659 },
  { day: "Day 2", sent: 7200, delivered: 7128, opened: 5133, clicked: 2056 },
  { day: "Day 3", sent: 8400, delivered: 8316, opened: 5990, clicked: 2396 },
  { day: "Day 4", sent: 9100, delivered: 9009, opened: 6487, clicked: 2594 },
  { day: "Day 5", sent: 7600, delivered: 7524, opened: 5417, clicked: 2167 },
  { day: "Day 6", sent: 6200, delivered: 6138, opened: 4419, clicked: 1768 },
  { day: "Day 7", sent: 4930, delivered: 4881, opened: 3513, clicked: 1405 },
];

const channelROI = [
  { name: "WhatsApp", roi: 310, investment: 17700, revenue: 63810 },
  { name: "Email", roi: 220, investment: 17500, revenue: 56000 },
  { name: "SMS", roi: 185, investment: 4500, revenue: 12825 },
  { name: "Voice", roi: 425, investment: 8000, revenue: 42000 },
];

const audienceSegments = [
  { name: "Enterprise", value: 18, color: "#6366F1" },
  { name: "SMB", value: 35, color: "#00C9B1" },
  { name: "Individual", value: 28, color: "#8B5CF6" },
  { name: "Trial Users", value: 19, color: "#F59E0B" },
];

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  active: { bg: "rgba(16,185,129,0.1)", text: "#10B981", dot: "#10B981" },
  scheduled: { bg: "rgba(99,102,241,0.1)", text: "#6366F1", dot: "#6366F1" },
  completed: { bg: "rgba(100,116,139,0.1)", text: "#64748B", dot: "#64748B" },
  paused: { bg: "rgba(245,158,11,0.1)", text: "#F59E0B", dot: "#F59E0B" },
  draft: { bg: "rgba(148,163,184,0.1)", text: "#94A3B8", dot: "#94A3B8" },
};

const channelColors: Record<string, string> = {
  WhatsApp: "#00C9B1",
  SMS: "#8B5CF6",
  Email: "#6366F1",
  Voice: "#F59E0B",
};

export function CampaignEngine() {
  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0]);
  const [activeTab, setActiveTab] = useState<"overview" | "performance" | "audiences">("overview");
  const [showNew, setShowNew] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredCampaigns = filterStatus === "all" ? campaigns : campaigns.filter(c => c.status === filterStatus);

  const totalRevenue = campaigns.reduce((s, c) => s + c.revenue, 0);
  const totalBudget = campaigns.reduce((s, c) => s + c.budget, 0);
  const avgROI = Math.round((totalRevenue / totalBudget - 1) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="rounded-2xl p-7 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A1628 0%, #2D0A2E 50%, #0A1628 100%)",
          boxShadow: "0 20px 60px rgba(10,22,40,0.35)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #EC4899, transparent)", transform: "translate(25%, -25%)" }}
        />
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Campaign Engine
            </h1>
            <p className="text-sm" style={{ color: "#94A3B8" }}>
              Create, automate, and analyze multi-channel broadcast campaigns
            </p>
          </div>
          <button
            onClick={() => setShowNew(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: "linear-gradient(135deg, #EC4899, #8B5CF6)", color: "white", boxShadow: "0 4px 15px rgba(236,72,153,0.4)" }}
          >
            <Plus className="w-4 h-4" /> New Campaign
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Campaigns", val: campaigns.filter(c => c.status === "active").length, icon: Activity, color: "#10B981", bg: "rgba(16,185,129,0.1)" },
          { label: "Total Audience", val: campaigns.reduce((s, c) => s + c.audience, 0).toLocaleString(), icon: Users, color: "#6366F1", bg: "rgba(99,102,241,0.1)" },
          { label: "Msgs Sent (MTD)", val: campaigns.reduce((s, c) => s + c.sent, 0).toLocaleString(), icon: Megaphone, color: "#00C9B1", bg: "rgba(0,201,177,0.1)" },
          { label: `Avg ROI: ${avgROI}%`, val: `$${(totalRevenue / 1000).toFixed(0)}K`, icon: DollarSign, color: "#F59E0B", bg: "rgba(245,158,11,0.1)", sub: "Revenue generated" },
        ].map((kpi) => {
          const KpiIcon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: kpi.bg }}>
                  <KpiIcon className="w-4 h-4" style={{ color: kpi.color }} />
                </div>
                <ArrowUp className="w-4 h-4" style={{ color: "#10B981" }} />
              </div>
              <div className="font-bold text-xl" style={{ color: "#0F172A" }}>{kpi.val}</div>
              <div className="text-xs mt-0.5" style={{ color: "#64748B" }}>{kpi.label}</div>
            </div>
          );
        })}
      </div>

      {/* Filters + Campaign List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign List */}
        <div
          className="lg:col-span-1 bg-white rounded-2xl overflow-hidden"
          style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          <div className="p-4 border-b" style={{ borderColor: "#F1F5F9" }}>
            <h3 className="font-bold mb-3" style={{ color: "#0F172A" }}>All Campaigns</h3>
            <div className="flex flex-wrap gap-1">
              {["all", "active", "scheduled", "paused", "completed"].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all capitalize"
                  style={{
                    background: filterStatus === s ? (statusConfig[s]?.bg || "#0F172A") : "#F8FAFC",
                    color: filterStatus === s ? (statusConfig[s]?.text || "white") : "#64748B",
                    border: `1px solid ${filterStatus === s ? (statusConfig[s]?.text || "#0F172A") + "30" : "transparent"}`,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: "520px" }}>
            {filteredCampaigns.map((camp) => {
              const st = statusConfig[camp.status];
              return (
                <button
                  key={camp.id}
                  onClick={() => setSelectedCampaign(camp)}
                  className="w-full text-left p-4 border-b transition-all hover:bg-slate-50"
                  style={{
                    borderColor: "#F8FAFC",
                    background: selectedCampaign.id === camp.id ? "rgba(236,72,153,0.04)" : "white",
                    borderLeft: selectedCampaign.id === camp.id ? "3px solid #EC4899" : "3px solid transparent",
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate" style={{ color: "#0F172A" }}>{camp.name}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: `${channelColors[camp.channel]}15`, color: channelColors[camp.channel] }}
                        >
                          {camp.channel}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full flex items-center gap-0.5"
                          style={{ background: st.bg, color: st.text }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: st.dot }} />
                          {camp.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-center">
                    {[
                      { label: "Sent", val: (camp.sent / 1000).toFixed(0) + "K" },
                      { label: "Open%", val: camp.sent > 0 ? ((camp.opened / camp.sent) * 100).toFixed(0) + "%" : "—" },
                      { label: "ROI", val: camp.roi },
                    ].map((m) => (
                      <div key={m.label}>
                        <div className="text-xs font-bold" style={{ color: "#0F172A" }}>{m.val}</div>
                        <div className="text-xs" style={{ color: "#94A3B8" }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Campaign Detail */}
        <div className="lg:col-span-2 space-y-4">
          {/* Campaign Header */}
          <div
            className="bg-white rounded-2xl p-5"
            style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h2 className="font-bold text-lg" style={{ color: "#0F172A" }}>{selectedCampaign.name}</h2>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full capitalize"
                    style={{ background: statusConfig[selectedCampaign.status].bg, color: statusConfig[selectedCampaign.status].text }}
                  >
                    {selectedCampaign.status}
                  </span>
                </div>
                <p className="text-sm" style={{ color: "#64748B" }}>{selectedCampaign.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedCampaign.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-lg" style={{ background: "#F1F5F9", color: "#64748B" }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="p-2 rounded-xl transition-all"
                  style={{ background: statusConfig[selectedCampaign.status].bg }}
                >
                  {selectedCampaign.status === "active" ? (
                    <Pause className="w-4 h-4" style={{ color: statusConfig[selectedCampaign.status].text }} />
                  ) : (
                    <Play className="w-4 h-4" style={{ color: statusConfig[selectedCampaign.status].text }} />
                  )}
                </button>
                <button className="p-2 rounded-xl" style={{ background: "#F1F5F9" }}>
                  <Edit3 className="w-4 h-4" style={{ color: "#64748B" }} />
                </button>
                <button className="p-2 rounded-xl" style={{ background: "#F1F5F9" }}>
                  <Copy className="w-4 h-4" style={{ color: "#64748B" }} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Total Audience", val: selectedCampaign.audience.toLocaleString(), color: "#6366F1" },
                { label: "Delivered", val: selectedCampaign.delivered.toLocaleString(), color: "#10B981" },
                { label: "Opened", val: selectedCampaign.opened.toLocaleString(), color: "#00C9B1" },
                { label: "Clicked", val: selectedCampaign.clicked.toLocaleString(), color: "#F59E0B" },
              ].map((m) => (
                <div key={m.label} className="p-3 rounded-xl text-center" style={{ background: "#F8FAFC" }}>
                  <div className="font-bold text-base" style={{ color: m.color }}>{m.val}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>{m.label}</div>
                </div>
              ))}
            </div>

            {selectedCampaign.sent > 0 && (
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1" style={{ color: "#64748B" }}>
                  <span>Campaign Progress</span>
                  <span style={{ fontWeight: "600", color: "#0F172A" }}>
                    {((selectedCampaign.sent / selectedCampaign.audience) * 100).toFixed(1)}% reached
                  </span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${(selectedCampaign.sent / selectedCampaign.audience) * 100}%`,
                      background: `linear-gradient(90deg, ${channelColors[selectedCampaign.channel]}, #6366F1)`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-xl bg-white" style={{ border: "1px solid #E8EDF5" }}>
            {[
              { id: "overview", label: "Overview" },
              { id: "performance", label: "Performance Chart" },
              { id: "audiences", label: "Audience Split" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: activeTab === tab.id ? "linear-gradient(135deg, #EC4899, #8B5CF6)" : "transparent",
                  color: activeTab === tab.id ? "white" : "#64748B",
                  boxShadow: activeTab === tab.id ? "0 2px 8px rgba(236,72,153,0.3)" : "none",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div
            className="bg-white rounded-2xl p-5"
            style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
          >
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm" style={{ color: "#0F172A" }}>Campaign Details</h4>
                  {[
                    { label: "Campaign ID", val: selectedCampaign.id },
                    { label: "Channel", val: selectedCampaign.channel },
                    { label: "Start Date", val: selectedCampaign.startDate },
                    { label: "End Date", val: selectedCampaign.endDate },
                    { label: "Budget", val: `$${selectedCampaign.budget.toLocaleString()}` },
                    { label: "Revenue", val: selectedCampaign.revenue > 0 ? `$${selectedCampaign.revenue.toLocaleString()}` : "Pending" },
                    { label: "ROI", val: selectedCampaign.roi },
                  ].map((d) => (
                    <div key={d.label} className="flex items-center justify-between text-sm">
                      <span style={{ color: "#94A3B8" }}>{d.label}</span>
                      <span className="font-semibold" style={{ color: "#334155" }}>{d.val}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm" style={{ color: "#0F172A" }}>Engagement Rates</h4>
                  {selectedCampaign.sent > 0 ? [
                    { label: "Delivery Rate", val: ((selectedCampaign.delivered / selectedCampaign.sent) * 100).toFixed(1), color: "#10B981" },
                    { label: "Open Rate", val: ((selectedCampaign.opened / selectedCampaign.delivered) * 100).toFixed(1), color: "#00C9B1" },
                    { label: "Click Rate", val: ((selectedCampaign.clicked / selectedCampaign.opened) * 100).toFixed(1), color: "#6366F1" },
                    { label: "Conversion Rate", val: ((selectedCampaign.clicked / selectedCampaign.sent) * 100).toFixed(1), color: "#EC4899" },
                  ].map((r) => (
                    <div key={r.label}>
                      <div className="flex justify-between mb-1 text-xs">
                        <span style={{ color: "#64748B" }}>{r.label}</span>
                        <span className="font-bold" style={{ color: r.color }}>{r.val}%</span>
                      </div>
                      <div className="h-2 rounded-full" style={{ background: "#F1F5F9" }}>
                        <div
                          className="h-2 rounded-full"
                          style={{ width: `${Math.min(parseFloat(r.val), 100)}%`, background: r.color }}
                        />
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8" style={{ color: "#94A3B8" }}>
                      <Clock className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">Campaign not started yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "performance" && (
              <div>
                <h4 className="font-semibold text-sm mb-4" style={{ color: "#0F172A" }}>Daily Performance Breakdown</h4>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
                    <YAxis stroke="#94A3B8" fontSize={11} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "12px", fontSize: "12px" }} />
                    <Legend />
                    <Line type="monotone" dataKey="sent" stroke="#8B5CF6" strokeWidth={2} name="Sent" dot={false} />
                    <Line type="monotone" dataKey="delivered" stroke="#10B981" strokeWidth={2} name="Delivered" dot={false} />
                    <Line type="monotone" dataKey="opened" stroke="#00C9B1" strokeWidth={2} name="Opened" dot={false} />
                    <Line type="monotone" dataKey="clicked" stroke="#F59E0B" strokeWidth={2} name="Clicked" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {activeTab === "audiences" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-sm mb-4" style={{ color: "#0F172A" }}>Audience Segments</h4>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={audienceSegments}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={90}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {audienceSegments.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: "10px", fontSize: "12px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm mb-2" style={{ color: "#0F172A" }}>Channel ROI Comparison</h4>
                  {channelROI.map((ch) => (
                    <div key={ch.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: "#64748B" }}>{ch.name}</span>
                        <span className="font-bold" style={{ color: channelColors[ch.name] }}>{ch.roi}% ROI</span>
                      </div>
                      <div className="h-2.5 rounded-full" style={{ background: "#F1F5F9" }}>
                        <div
                          className="h-2.5 rounded-full"
                          style={{ width: `${Math.min(ch.roi / 5, 100)}%`, background: channelColors[ch.name] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Campaign Modal */}
      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6" style={{ border: "1px solid #E8EDF5" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg" style={{ color: "#0F172A" }}>Create New Campaign</h3>
              <button onClick={() => setShowNew(false)}>
                <X className="w-5 h-5" style={{ color: "#94A3B8" }} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Campaign Name", placeholder: "e.g., Summer Sale 2026", type: "text" },
                { label: "Target Audience", placeholder: "e.g., 15,000 contacts", type: "text" },
                { label: "Budget ($)", placeholder: "e.g., 5000", type: "number" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>Channel</label>
                  <select className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}>
                    {["WhatsApp", "Email", "SMS", "Voice", "Multi-channel"].map(ch => <option key={ch}>{ch}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>Start Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNew(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: "#F1F5F9", color: "#64748B" }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowNew(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: "linear-gradient(135deg, #EC4899, #8B5CF6)", color: "white" }}
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
