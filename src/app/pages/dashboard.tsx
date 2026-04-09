import { useState } from "react";
import { useNavigate } from "react-router";
import {
  TrendingUp,
  Users,
  MessageSquare,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Activity,
  Zap,
  Globe,
  Phone,
  Mail,
  Star,
  MoreHorizontal,
  RefreshCw,
  Target,
  DollarSign,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const kpiData = [
  {
    label: "Total Messages",
    value: "2.4M",
    sub: "This month",
    change: "+18.5%",
    trend: "up",
    icon: MessageSquare,
    color: "#00C9B1",
    bg: "rgba(0,201,177,0.1)",
    sparkline: [40, 55, 48, 70, 63, 80, 72, 95, 88, 110, 102, 124],
  },
  {
    label: "Active Workflows",
    value: "143",
    sub: "Running now",
    change: "+12.2%",
    trend: "up",
    icon: Zap,
    color: "#6366F1",
    bg: "rgba(99,102,241,0.1)",
    sparkline: [20, 28, 25, 35, 32, 40, 38, 45, 43, 50, 48, 56],
  },
  {
    label: "Delivery Rate",
    value: "99.1%",
    sub: "Across channels",
    change: "+0.8%",
    trend: "up",
    icon: CheckCircle,
    color: "#10B981",
    bg: "rgba(16,185,129,0.1)",
    sparkline: [96, 97, 97, 98, 97, 98, 99, 98, 99, 99, 99, 99],
  },
  {
    label: "Avg Response Time",
    value: "0.8s",
    sub: "API latency",
    change: "-22.4%",
    trend: "down",
    icon: Clock,
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
    sparkline: [3.2, 2.8, 2.5, 2.1, 1.9, 1.6, 1.4, 1.2, 1.0, 0.9, 0.85, 0.8],
  },
  {
    label: "Revenue Generated",
    value: "$1.87M",
    sub: "Attributed",
    change: "+31.4%",
    trend: "up",
    icon: DollarSign,
    color: "#EC4899",
    bg: "rgba(236,72,153,0.1)",
    sparkline: [85, 90, 95, 110, 120, 130, 145, 155, 165, 175, 185, 187],
  },
  {
    label: "Active Contacts",
    value: "847K",
    sub: "In database",
    change: "+9.3%",
    trend: "up",
    icon: Users,
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.1)",
    sparkline: [650, 670, 690, 710, 720, 730, 750, 770, 790, 810, 830, 847],
  },
];

const messageData = [
  { name: "1 Apr", whatsapp: 42000, sms: 24000, email: 18000, voice: 6000 },
  { name: "2 Apr", whatsapp: 38000, sms: 19000, email: 22000, voice: 8000 },
  { name: "3 Apr", whatsapp: 51000, sms: 31000, email: 28000, voice: 12000 },
  { name: "4 Apr", whatsapp: 47000, sms: 28000, email: 24000, voice: 9000 },
  { name: "5 Apr", whatsapp: 63000, sms: 38000, email: 32000, voice: 14000 },
  { name: "6 Apr", whatsapp: 58000, sms: 35000, email: 29000, voice: 11000 },
  { name: "7 Apr", whatsapp: 72000, sms: 44000, email: 38000, voice: 16000 },
];

const channelDist = [
  { name: "WhatsApp", value: 48, color: "#00C9B1" },
  { name: "SMS", value: 22, color: "#6366F1" },
  { name: "Email", value: 19, color: "#8B5CF6" },
  { name: "Voice", value: 11, color: "#F59E0B" },
];

const conversionFunnel = [
  { stage: "Leads Captured", value: 45000, pct: 100 },
  { stage: "Contacted", value: 38250, pct: 85 },
  { stage: "Engaged", value: 27900, pct: 62 },
  { stage: "Qualified", value: 16200, pct: 36 },
  { stage: "Converted", value: 9450, pct: 21 },
];

const recentActivity = [
  { type: "success", icon: CheckCircle, msg: "Workflow 'Lead Nurture Pro' executed — 3,421 messages sent", time: "2m ago", color: "#10B981" },
  { type: "info", icon: MessageSquare, msg: "New WhatsApp template 'Spring Promo 2026' approved by Meta", time: "18m ago", color: "#3B82F6" },
  { type: "warning", icon: AlertTriangle, msg: "SMS gateway Twilio showing elevated latency (320ms avg)", time: "1h ago", color: "#F59E0B" },
  { type: "success", icon: RefreshCw, msg: "CRM sync completed — 5,234 leads refreshed from Zoho + HubSpot", time: "2h ago", color: "#10B981" },
  { type: "info", icon: Target, msg: "Campaign 'Flash Sale Q2' reached 95% audience coverage", time: "3h ago", color: "#6366F1" },
  { type: "success", icon: ShieldCheck, msg: "API health check passed — all endpoints responding normally", time: "4h ago", color: "#10B981" },
];

const topCampaigns = [
  { name: "Spring Sale 2026", channel: "WhatsApp", sent: 45230, roi: "312%", status: "active" },
  { name: "Product Launch Series", channel: "Email", sent: 28500, roi: "245%", status: "active" },
  { name: "Re-engagement Q2", channel: "SMS", sent: 18900, roi: "189%", status: "active" },
  { name: "VIP Customer Drive", channel: "Voice", sent: 8200, roi: "425%", status: "completed" },
  { name: "Onboarding Flow", channel: "WhatsApp", sent: 12400, roi: "280%", status: "active" },
];

const hourlyActivity = [
  { hour: "00", msgs: 1200 }, { hour: "02", msgs: 800 }, { hour: "04", msgs: 600 },
  { hour: "06", msgs: 1100 }, { hour: "08", msgs: 4200 }, { hour: "10", msgs: 7800 },
  { hour: "12", msgs: 9200 }, { hour: "14", msgs: 8900 }, { hour: "16", msgs: 7600 },
  { hour: "18", msgs: 6100 }, { hour: "20", msgs: 4800 }, { hour: "22", msgs: 2900 },
];

const channelColor: Record<string, string> = {
  WhatsApp: "#00C9B1", SMS: "#6366F1", Email: "#8B5CF6", Voice: "#F59E0B"
};

const COLORS = { up: "#10B981", down: "#EF4444" };

// ─── route map for KPI cards ─────────────────────────────────────────────────
const kpiRoutes: Record<string, string> = {
  "Total Messages": "/communication-engine",
  "Active Workflows": "/workflow-builder",
  "Delivery Rate": "/analytics",
  "Avg Response Time": "/system-layer",
  "Revenue Generated": "/analytics",
  "Active Contacts": "/crm-integration",
};

export function Dashboard() {
  const [timeRange, setTimeRange] = useState("7d");
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div
        className="rounded-2xl p-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A1628 0%, #0D1F3C 40%, #0F2547 70%, #00433B 100%)",
          boxShadow: "0 20px 60px rgba(10,22,40,0.4)",
        }}
      >
        {/* Decorative orbs */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #00C9B1, transparent)", transform: "translate(30%, -30%)" }}
        />
        <div
          className="absolute bottom-0 left-1/2 w-64 h-64 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #6366F1, transparent)" }}
        />

        <div className="relative flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: "rgba(0,201,177,0.2)", color: "#00C9B1" }}
              >
                ● Live Dashboard
              </div>
            </div>
            <h1
              className="text-3xl font-bold text-white mb-1"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Good morning, Welcome Back!
            </h1>
            <p className="text-sm" style={{ color: "#94A3B8" }}>
              Your C-PaaS platform processed <span style={{ color: "#00C9B1", fontWeight: "600" }}>2.4 million messages</span> this month — 18.5% above target 🚀
            </p>
          </div>
          <div className="flex gap-2">
            {["24h", "7d", "30d", "90d"].map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: timeRange === r ? "#00C9B1" : "rgba(255,255,255,0.1)",
                  color: timeRange === r ? "white" : "#94A3B8",
                  border: timeRange === r ? "none" : "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiData.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div
              key={i}
              onClick={() => navigate(kpiRoutes[kpi.label] || "/")}
              className="rounded-2xl p-4 bg-white transition-all hover:shadow-lg cursor-pointer hover:-translate-y-0.5"
              style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: kpi.bg }}
                >
                  <Icon className="w-4 h-4" style={{ color: kpi.color }} />
                </div>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5"
                  style={{
                    background: kpi.trend === "up" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                    color: kpi.trend === "up" ? "#10B981" : "#EF4444",
                  }}
                >
                  {kpi.trend === "up" ? <ArrowUp className="w-2.5 h-2.5" /> : <ArrowDown className="w-2.5 h-2.5" />}
                  {kpi.change}
                </span>
              </div>
              <div className="font-bold text-xl" style={{ color: "#0F172A" }}>{kpi.value}</div>
              <div className="text-xs mt-0.5" style={{ color: "#64748B" }}>{kpi.label}</div>
              <div className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>{kpi.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message Volume */}
        <div
          className="lg:col-span-2 bg-white rounded-2xl p-6"
          style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-base" style={{ color: "#0F172A" }}>
                Message Volume Trends
              </h3>
              <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
                Multi-channel message delivery (Last 7 days)
              </p>
            </div>
            <button className="p-2 rounded-lg" style={{ background: "#F8FAFC" }}>
              <MoreHorizontal className="w-4 h-4" style={{ color: "#94A3B8" }} />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={messageData} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
              <defs>
                {[
                  { id: "wa", color: "#00C9B1" },
                  { id: "sms", color: "#6366F1" },
                  { id: "email", color: "#8B5CF6" },
                ].map((g) => (
                  <linearGradient key={g.id} id={`grad_${g.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={g.color} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={g.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "12px", fontSize: "12px" }}
              />
              <Legend />
              <Area type="monotone" dataKey="whatsapp" stroke="#00C9B1" fill="url(#grad_wa)" strokeWidth={2} name="WhatsApp" />
              <Area type="monotone" dataKey="sms" stroke="#6366F1" fill="url(#grad_sms)" strokeWidth={2} name="SMS" />
              <Area type="monotone" dataKey="email" stroke="#8B5CF6" fill="url(#grad_email)" strokeWidth={2} name="Email" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Channel Distribution */}
        <div
          className="bg-white rounded-2xl p-6"
          style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          <h3 className="font-bold text-base mb-1" style={{ color: "#0F172A" }}>
            Channel Distribution
          </h3>
          <p className="text-xs mb-4" style={{ color: "#64748B" }}>Volume share by channel</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={channelDist}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                paddingAngle={3}
              >
                {channelDist.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "10px", fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {channelDist.map((ch) => (
              <div key={ch.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: ch.color }} />
                  <span className="text-xs" style={{ color: "#475569" }}>{ch.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-1.5 rounded-full"
                    style={{ width: `${ch.value}px`, background: ch.color, maxWidth: "80px" }}
                  />
                  <span className="text-xs font-semibold" style={{ color: "#0F172A" }}>
                    {ch.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hourly Activity */}
        <div
          className="bg-white rounded-2xl p-6"
          style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          <h3 className="font-bold text-base mb-1" style={{ color: "#0F172A" }}>
            Hourly Activity
          </h3>
          <p className="text-xs mb-4" style={{ color: "#64748B" }}>Message volume by hour (today)</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={hourlyActivity} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="hour" stroke="#94A3B8" fontSize={10} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "10px", fontSize: "12px" }}
                formatter={(v: any) => [v.toLocaleString(), "Messages"]}
              />
              <Bar dataKey="msgs" radius={[4, 4, 0, 0]}>
                {hourlyActivity.map((_, i) => (
                  <Cell
                    key={i}
                    fill={i >= 4 && i <= 8 ? "#00C9B1" : "#E2E8F0"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Funnel */}
        <div
          className="bg-white rounded-2xl p-6"
          style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          <h3 className="font-bold text-base mb-1" style={{ color: "#0F172A" }}>
            Conversion Funnel
          </h3>
          <p className="text-xs mb-4" style={{ color: "#64748B" }}>Lead-to-customer pipeline</p>
          <div className="space-y-3">
            {conversionFunnel.map((stage, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs" style={{ color: "#475569" }}>{stage.stage}</span>
                  <span className="text-xs font-semibold" style={{ color: "#0F172A" }}>
                    {stage.value.toLocaleString()} <span style={{ color: "#94A3B8" }}>({stage.pct}%)</span>
                  </span>
                </div>
                <div className="h-6 rounded-lg overflow-hidden" style={{ background: "#F1F5F9" }}>
                  <div
                    className="h-full rounded-lg transition-all"
                    style={{
                      width: `${stage.pct}%`,
                      background: `linear-gradient(90deg, #00C9B1, #6366F1)`,
                      opacity: 1 - i * 0.12,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div
          className="bg-white rounded-2xl p-6"
          style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base" style={{ color: "#0F172A" }}>
              Live Activity
            </h3>
            <div
              className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs"
              style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </div>
          </div>
          <div className="space-y-3 overflow-y-auto" style={{ maxHeight: "280px" }}>
            {recentActivity.map((act, i) => {
              const Icon = act.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${act.color}15` }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: act.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs leading-relaxed" style={{ color: "#334155" }}>{act.msg}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>{act.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Campaigns Table */}
      <div
        className="bg-white rounded-2xl p-6"
        style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-base" style={{ color: "#0F172A" }}>
              Top Performing Campaigns
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
              Ranked by ROI and engagement metrics
            </p>
          </div>
          <button
            onClick={() => navigate("/campaign-engine")}
            className="text-xs font-semibold px-4 py-2 rounded-lg transition-all"
            style={{ background: "rgba(0,201,177,0.1)", color: "#00C9B1" }}
          >
            View All Campaigns
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                {["Campaign", "Channel", "Messages Sent", "ROI", "Status"].map((h) => (
                  <th
                    key={h}
                    className="text-left py-3 px-3 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#94A3B8" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topCampaigns.map((c, i) => (
                <tr
                  key={i}
                  onClick={() => navigate("/campaign-engine")}
                  className="transition-colors hover:bg-slate-50 cursor-pointer"
                  style={{ borderBottom: "1px solid #F8FAFC" }}
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <Star className="w-3.5 h-3.5" style={{ color: "#F59E0B" }} />
                      <span className="text-sm font-medium" style={{ color: "#0F172A" }}>{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: `${channelColor[c.channel]}20`,
                        color: channelColor[c.channel],
                      }}
                    >
                      {c.channel}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-sm" style={{ color: "#334155" }}>
                    {c.sent.toLocaleString()}
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-sm font-bold" style={{ color: "#10B981" }}>
                      {c.roi}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full capitalize"
                      style={{
                        background: c.status === "active" ? "rgba(16,185,129,0.1)" : "rgba(100,116,139,0.1)",
                        color: c.status === "active" ? "#10B981" : "#64748B",
                      }}
                    >
                      {c.status === "active" ? "● " : ""}
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}