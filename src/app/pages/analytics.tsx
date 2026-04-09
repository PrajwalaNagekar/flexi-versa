import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  ArrowUp,
  Filter,
  DollarSign,
  Users,
  MessageSquare,
  Target,
  RefreshCw,
  Eye,
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  ScatterChart,
  Scatter,
} from "recharts";

const kpiCards = [
  { label: "Total Messages", val: "2.4M", sub: "This month", change: "+18.5%", color: "#00C9B1", bg: "rgba(0,201,177,0.1)", icon: MessageSquare },
  { label: "Delivery Rate", val: "99.1%", sub: "Avg across channels", change: "+0.8%", color: "#10B981", bg: "rgba(16,185,129,0.1)", icon: Target },
  { label: "Response Rate", val: "67.4%", sub: "Avg engagement", change: "+5.1%", color: "#6366F1", bg: "rgba(99,102,241,0.1)", icon: TrendingUp },
  { label: "Conversion Rate", val: "28.5%", sub: "Lead to customer", change: "+3.7%", color: "#8B5CF6", bg: "rgba(139,92,246,0.1)", icon: Users },
  { label: "Avg ROI", val: "287%", sub: "Across campaigns", change: "+12.4%", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", icon: DollarSign },
  { label: "Revenue Attr.", val: "$1.87M", sub: "Attributed to comms", change: "+31.4%", color: "#EC4899", bg: "rgba(236,72,153,0.1)", icon: DollarSign },
];

const monthlyVolume = [
  { month: "Oct", wa: 320000, sms: 180000, email: 240000, voice: 45000 },
  { month: "Nov", wa: 380000, sms: 210000, email: 280000, voice: 52000 },
  { month: "Dec", wa: 450000, sms: 250000, email: 340000, voice: 63000 },
  { month: "Jan", wa: 390000, sms: 220000, email: 295000, voice: 55000 },
  { month: "Feb", wa: 420000, sms: 238000, email: 315000, voice: 59000 },
  { month: "Mar", wa: 485000, sms: 270000, email: 365000, voice: 68000 },
  { month: "Apr", wa: 520000, sms: 290000, email: 390000, voice: 75000 },
];

const responseRates = [
  { day: "Mon", whatsapp: 78, sms: 45, email: 28, voice: 65 },
  { day: "Tue", whatsapp: 82, sms: 48, email: 31, voice: 68 },
  { day: "Wed", whatsapp: 85, sms: 52, email: 34, voice: 72 },
  { day: "Thu", whatsapp: 88, sms: 55, email: 37, voice: 75 },
  { day: "Fri", whatsapp: 90, sms: 58, email: 40, voice: 78 },
  { day: "Sat", whatsapp: 75, sms: 42, email: 25, voice: 60 },
  { day: "Sun", whatsapp: 72, sms: 40, email: 23, voice: 58 },
];

const funnelData = [
  { stage: "Leads Captured", value: 125000, pct: 100, color: "#6366F1" },
  { stage: "Contacted", value: 106250, pct: 85, color: "#00C9B1" },
  { stage: "Engaged", value: 77500, pct: 62, color: "#8B5CF6" },
  { stage: "Qualified", value: 45000, pct: 36, color: "#F59E0B" },
  { stage: "Converted", value: 35625, pct: 28.5, color: "#10B981" },
];

const campaignROI = [
  { campaign: "Spring Sale", investment: 8500, revenue: 26350, roi: 210 },
  { campaign: "Product Launch", investment: 12000, revenue: 38400, roi: 220 },
  { campaign: "VIP Retention", investment: 6000, revenue: 24600, roi: 310 },
  { campaign: "Onboarding", investment: 3200, revenue: 12800, roi: 300 },
  { campaign: "Re-engagement", investment: 5500, revenue: 9900, roi: 80 },
];

const channelPerf = [
  { channel: "WhatsApp", engagement: 85, delivery: 99, conversion: 29, satisfaction: 92, roi: 87 },
  { channel: "SMS", engagement: 55, delivery: 98, conversion: 18, satisfaction: 75, roi: 68 },
  { channel: "Email", engagement: 40, delivery: 98, conversion: 14, satisfaction: 70, roi: 62 },
  { channel: "Voice", engagement: 72, delivery: 95, conversion: 38, satisfaction: 88, roi: 90 },
];

const leadSources = [
  { name: "WhatsApp Ads", value: 38000, color: "#00C9B1" },
  { name: "Website Forms", value: 28500, color: "#6366F1" },
  { name: "Social Media", value: 24200, color: "#8B5CF6" },
  { name: "QR Codes", value: 18700, color: "#F59E0B" },
  { name: "Email", value: 12400, color: "#EC4899" },
  { name: "Referrals", value: 8200, color: "#10B981" },
];

const hourlyHeatmap = [
  { hour: "06-09", Mon: 42, Tue: 38, Wed: 45, Thu: 51, Fri: 48, Sat: 22, Sun: 18 },
  { hour: "09-12", Mon: 78, Tue: 82, Wed: 85, Thu: 90, Fri: 88, Sat: 35, Sun: 28 },
  { hour: "12-15", Mon: 65, Tue: 70, Wed: 68, Thu: 75, Fri: 72, Sat: 42, Sun: 35 },
  { hour: "15-18", Mon: 55, Tue: 60, Wed: 62, Thu: 68, Fri: 65, Sat: 38, Sun: 30 },
  { hour: "18-21", Mon: 48, Tue: 52, Wed: 50, Thu: 55, Fri: 60, Sat: 45, Sun: 40 },
  { hour: "21-24", Mon: 28, Tue: 30, Wed: 28, Thu: 32, Fri: 38, Sat: 25, Sun: 20 },
];

const timeRanges = ["Last 7 days", "Last 30 days", "Last 90 days", "This Year", "Custom"];

export function Analytics() {
  const [timeRange, setTimeRange] = useState("Last 30 days");
  const [activeSection, setActiveSection] = useState("all");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="rounded-2xl p-7 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A1628 0%, #0D1440 50%, #0A1628 100%)",
          boxShadow: "0 20px 60px rgba(10,22,40,0.35)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #6366F1, transparent)", transform: "translate(25%, -25%)" }}
        />
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Analytics Hub
            </h1>
            <p className="text-sm" style={{ color: "#94A3B8" }}>
              Comprehensive platform insights, KPIs, and performance intelligence
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium outline-none"
              style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              {timeRanges.map((r) => <option key={r} value={r} style={{ background: "#0A1628" }}>{r}</option>)}
            </select>
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: "linear-gradient(135deg, #00C9B1, #6366F1)", color: "white", boxShadow: "0 4px 15px rgba(0,201,177,0.3)" }}
            >
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiCards.map((kpi) => {
          const KpiIcon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="bg-white rounded-2xl p-4 transition-all hover:shadow-lg cursor-pointer"
              style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: kpi.bg }}>
                  <KpiIcon className="w-4 h-4" style={{ color: kpi.color }} />
                </div>
                <span
                  className="text-xs font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-0.5"
                  style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}
                >
                  <ArrowUp className="w-2.5 h-2.5" />
                  {kpi.change}
                </span>
              </div>
              <div className="font-bold text-lg" style={{ color: kpi.color }}>{kpi.val}</div>
              <div className="text-xs" style={{ color: "#0F172A", fontWeight: "500" }}>{kpi.label}</div>
              <div className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>{kpi.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Volume Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className="lg:col-span-2 bg-white rounded-2xl p-6"
          style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold" style={{ color: "#0F172A" }}>Multi-Channel Volume Trends</h3>
              <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>Monthly message volume by channel (Oct 2025 - Apr 2026)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyVolume}>
              <defs>
                {[
                  { id: "wa", color: "#00C9B1" },
                  { id: "sms", color: "#6366F1" },
                  { id: "email", color: "#8B5CF6" },
                ].map((g) => (
                  <linearGradient key={g.id} id={`ga_${g.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={g.color} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={g.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "12px", fontSize: "12px" }}
                formatter={(v: any) => [`${(v/1000).toFixed(0)}K`, ""]}
              />
              <Legend />
              <Area type="monotone" dataKey="wa" stroke="#00C9B1" fill="url(#ga_wa)" strokeWidth={2} name="WhatsApp" />
              <Area type="monotone" dataKey="sms" stroke="#6366F1" fill="url(#ga_sms)" strokeWidth={2} name="SMS" />
              <Area type="monotone" dataKey="email" stroke="#8B5CF6" fill="url(#ga_email)" strokeWidth={2} name="Email" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Sources Donut */}
        <div
          className="bg-white rounded-2xl p-6"
          style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          <h3 className="font-bold mb-1" style={{ color: "#0F172A" }}>Lead Sources</h3>
          <p className="text-xs mb-4" style={{ color: "#64748B" }}>Where your leads come from</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={leadSources}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {leadSources.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "10px", fontSize: "12px" }}
                formatter={(v: any) => [(v/1000).toFixed(0) + "K leads", ""]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-3">
            {leadSources.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-xs" style={{ color: "#64748B" }}>{s.name}</span>
                </div>
                <span className="text-xs font-semibold" style={{ color: "#0F172A" }}>{(s.value/1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Response Rates + Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Rates */}
        <div
          className="bg-white rounded-2xl p-6"
          style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          <h3 className="font-bold mb-1" style={{ color: "#0F172A" }}>Channel Response Rates (%)</h3>
          <p className="text-xs mb-4" style={{ color: "#64748B" }}>Weekly average by channel</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={responseRates}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={11} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "12px", fontSize: "12px" }} />
              <Legend />
              <Line type="monotone" dataKey="whatsapp" stroke="#00C9B1" strokeWidth={2.5} name="WhatsApp" dot={false} />
              <Line type="monotone" dataKey="sms" stroke="#6366F1" strokeWidth={2.5} name="SMS" dot={false} />
              <Line type="monotone" dataKey="email" stroke="#8B5CF6" strokeWidth={2.5} name="Email" dot={false} />
              <Line type="monotone" dataKey="voice" stroke="#F59E0B" strokeWidth={2.5} name="Voice" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Funnel */}
        <div
          className="bg-white rounded-2xl p-6"
          style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          <h3 className="font-bold mb-1" style={{ color: "#0F172A" }}>Conversion Funnel</h3>
          <p className="text-xs mb-5" style={{ color: "#64748B" }}>Lead-to-customer pipeline performance</p>
          <div className="space-y-3">
            {funnelData.map((stage, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-xs w-28 flex-shrink-0 text-right" style={{ color: "#64748B" }}>
                  {stage.stage}
                </div>
                <div className="flex-1 h-8 rounded-xl overflow-hidden relative" style={{ background: "#F8FAFC" }}>
                  <div
                    className="h-full rounded-xl flex items-center justify-end pr-3 transition-all"
                    style={{ width: `${stage.pct}%`, background: stage.color }}
                  >
                    <span className="text-white text-xs font-bold">{stage.pct.toFixed(0)}%</span>
                  </div>
                </div>
                <div className="text-xs font-bold w-16 text-right" style={{ color: "#0F172A" }}>
                  {(stage.value / 1000).toFixed(0)}K
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t" style={{ borderColor: "#F1F5F9" }}>
            <div className="flex justify-between">
              <span className="text-xs" style={{ color: "#64748B" }}>Overall Conversion Rate</span>
              <span className="text-sm font-bold" style={{ color: "#10B981" }}>28.5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Campaign ROI + Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign ROI */}
        <div
          className="bg-white rounded-2xl p-6"
          style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          <h3 className="font-bold mb-1" style={{ color: "#0F172A" }}>Campaign ROI Comparison</h3>
          <p className="text-xs mb-4" style={{ color: "#64748B" }}>Revenue vs Investment by campaign</p>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={campaignROI}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="campaign" stroke="#94A3B8" fontSize={10} />
              <YAxis yAxisId="left" stroke="#94A3B8" fontSize={11} />
              <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" fontSize={11} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "12px", fontSize: "12px" }} />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" fill="#00C9B1" radius={[4, 4, 0, 0]} name="Revenue ($)" />
              <Bar yAxisId="left" dataKey="investment" fill="#E2E8F0" radius={[4, 4, 0, 0]} name="Investment ($)" />
              <Line yAxisId="right" type="monotone" dataKey="roi" stroke="#F59E0B" strokeWidth={2.5} dot={{ fill: "#F59E0B", r: 4 }} name="ROI %" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Radar: Channel Performance */}
        <div
          className="bg-white rounded-2xl p-6"
          style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          <h3 className="font-bold mb-1" style={{ color: "#0F172A" }}>Channel Performance Radar</h3>
          <p className="text-xs mb-4" style={{ color: "#64748B" }}>Multi-dimensional performance by channel</p>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={channelPerf}>
              <PolarGrid stroke="#E8EDF5" />
              <PolarAngleAxis dataKey="channel" stroke="#94A3B8" fontSize={11} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#94A3B8" fontSize={10} />
              <Radar name="Engagement" dataKey="engagement" stroke="#00C9B1" fill="#00C9B1" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="Delivery" dataKey="delivery" stroke="#6366F1" fill="#6366F1" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="ROI Index" dataKey="roi" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.2} strokeWidth={2} />
              <Legend />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "12px", fontSize: "12px" }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Heatmap (simplified bar chart) */}
      <div
        className="bg-white rounded-2xl p-6"
        style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold" style={{ color: "#0F172A" }}>Optimal Send Time Heatmap</h3>
            <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>Message open rates by day and hour block (higher % = better time)</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-2 px-3 text-xs" style={{ color: "#94A3B8", width: "80px" }}>Time</th>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <th key={d} className="text-center py-2 px-2 text-xs font-semibold" style={{ color: "#475569" }}>{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hourlyHeatmap.map((row) => (
                <tr key={row.hour}>
                  <td className="py-1.5 px-3 text-xs" style={{ color: "#94A3B8" }}>{row.hour}</td>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => {
                    const val = row[d as keyof typeof row] as number;
                    const intensity = val / 100;
                    return (
                      <td key={d} className="py-1.5 px-2 text-center">
                        <div
                          className="h-9 rounded-lg flex items-center justify-center mx-auto text-xs font-semibold cursor-pointer hover:scale-105 transition-transform"
                          style={{
                            background: `rgba(0,201,177,${0.1 + intensity * 0.8})`,
                            color: intensity > 0.6 ? "white" : "#334155",
                            width: "44px",
                          }}
                          title={`${d} ${row.hour}: ${val}%`}
                        >
                          {val}%
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-2 mt-3 justify-end">
          <span className="text-xs" style={{ color: "#94A3B8" }}>Low</span>
          {[0.1, 0.3, 0.5, 0.7, 0.9].map((v, i) => (
            <div key={i} className="w-6 h-4 rounded" style={{ background: `rgba(0,201,177,${v})` }} />
          ))}
          <span className="text-xs" style={{ color: "#94A3B8" }}>High</span>
        </div>
      </div>

      {/* Performance Table */}
      <div
        className="bg-white rounded-2xl p-6"
        style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold" style={{ color: "#0F172A" }}>Channel Performance Breakdown</h3>
            <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>Detailed metrics per channel for {timeRange}</p>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#6366F1" }}>
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                {["Channel", "Messages Sent", "Delivered", "Opened", "Clicked", "Conv. Rate", "Avg ROI"].map((h) => (
                  <th key={h} className="text-left py-3 px-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "#94A3B8" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { ch: "WhatsApp", color: "#00C9B1", sent: 520000, del: 515280, open: 438488, click: 131546, conv: 25.3, roi: 287 },
                { ch: "Email", color: "#6366F1", sent: 390000, del: 382200, open: 152880, click: 45864, conv: 11.8, roi: 195 },
                { ch: "SMS", color: "#8B5CF6", sent: 290000, del: 281300, open: 168780, click: 42195, conv: 14.5, roi: 220 },
                { ch: "Voice", color: "#F59E0B", sent: 75000, del: 71250, open: 51300, click: 19494, conv: 26.0, roi: 425 },
              ].map((row) => (
                <tr key={row.ch} className="border-b hover:bg-slate-50 transition-colors" style={{ borderColor: "#F8FAFC" }}>
                  <td className="py-3 px-3">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: `${row.color}15`, color: row.color }}
                    >
                      {row.ch}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-sm" style={{ color: "#334155" }}>{row.sent.toLocaleString()}</td>
                  <td className="py-3 px-3 text-sm" style={{ color: "#334155" }}>{row.del.toLocaleString()}</td>
                  <td className="py-3 px-3 text-sm" style={{ color: "#334155" }}>{row.open.toLocaleString()}</td>
                  <td className="py-3 px-3 text-sm" style={{ color: "#334155" }}>{row.click.toLocaleString()}</td>
                  <td className="py-3 px-3">
                    <span className="text-sm font-bold" style={{ color: row.color }}>{row.conv}%</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-sm font-bold" style={{ color: "#10B981" }}>{row.roi}%</span>
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
