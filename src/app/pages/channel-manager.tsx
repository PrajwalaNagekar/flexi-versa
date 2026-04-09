import { useState } from "react";
import {
  MessageSquare,
  Mail,
  Phone,
  CheckCircle,
  Settings,
  Key,
  Link as LinkIcon,
  BarChart3,
  Clock,
  AlertTriangle,
  RefreshCw,
  Globe,
  Shield,
  Zap,
  TrendingUp,
  Activity,
  Plus,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const channels = [
  {
    id: "whatsapp",
    name: "WhatsApp Business API",
    provider: "Meta / 360Dialog",
    icon: MessageSquare,
    status: "active",
    color: "#00C9B1",
    gradient: "from-teal-500 to-cyan-500",
    config: {
      "Phone Number": "+971 50 123 4567",
      "WABA ID": "waba_289340123",
      "API Key": "wab_api_••••••••2f3e",
      "Webhook URL": "https://api.flexiversa.com/webhook/wa",
      "Daily Limit": "10,000 messages",
      "Template Limit": "250 templates",
    },
    metrics: { delivery: 99.1, uptime: 99.9, latency: "142ms", msgToday: 14250, msgMonth: 384000 },
    hourly: [
      { h: "06", v: 1200 }, { h: "07", v: 2100 }, { h: "08", v: 4200 }, { h: "09", v: 5800 },
      { h: "10", v: 7200 }, { h: "11", v: 8900 }, { h: "12", v: 9400 }, { h: "13", v: 8800 },
    ],
  },
  {
    id: "sms",
    name: "SMS Gateway",
    provider: "Twilio / AWS SNS",
    icon: MessageSquare,
    status: "active",
    color: "#6366F1",
    gradient: "from-indigo-500 to-violet-500",
    config: {
      "Provider": "Twilio",
      "Sender ID": "FLEXIVERSA",
      "Account SID": "AC••••••••••••••••d2b1",
      "Auth Token": "auth_••••••••••••••••9f3c",
      "Monthly Limit": "500,000 SMS",
      "Country Coverage": "190+ countries",
    },
    metrics: { delivery: 97.8, uptime: 99.5, latency: "210ms", msgToday: 8900, msgMonth: 240000 },
    hourly: [
      { h: "06", v: 800 }, { h: "07", v: 1400 }, { h: "08", v: 2800 }, { h: "09", v: 3900 },
      { h: "10", v: 5100 }, { h: "11", v: 6200 }, { h: "12", v: 6800 }, { h: "13", v: 5900 },
    ],
  },
  {
    id: "email",
    name: "Email SMTP / API",
    provider: "SendGrid / Mailgun",
    icon: Mail,
    status: "active",
    color: "#8B5CF6",
    gradient: "from-violet-500 to-purple-500",
    config: {
      "Provider": "SendGrid",
      "From Email": "noreply@flexiversa.com",
      "From Name": "Flexi Versa Platform",
      "API Key": "SG.••••••••••••••••v9k2",
      "Monthly Limit": "1,000,000 emails",
      "Bounce Rate": "0.8%",
    },
    metrics: { delivery: 98.2, uptime: 99.8, latency: "88ms", msgToday: 22000, msgMonth: 620000 },
    hourly: [
      { h: "06", v: 2100 }, { h: "07", v: 3200 }, { h: "08", v: 5400 }, { h: "09", v: 7800 },
      { h: "10", v: 9200 }, { h: "11", v: 10400 }, { h: "12", v: 11200 }, { h: "13", v: 10100 },
    ],
  },
  {
    id: "voice",
    name: "Voice Call API",
    provider: "Twilio + ElevenLabs AI",
    icon: Phone,
    status: "active",
    color: "#F59E0B",
    gradient: "from-amber-500 to-orange-500",
    config: {
      "Provider": "Twilio Voice + ElevenLabs",
      "Phone Number": "+971 4 123 4567",
      "Voice Model": "eleven_multilingual_v2",
      "Auth Token": "voice_••••••••••••••••k7p1",
      "Monthly Minutes": "50,000 minutes",
      "AI Voice": "Rachel (Female, EN)",
    },
    metrics: { delivery: 95.4, uptime: 98.9, latency: "320ms", msgToday: 1240, msgMonth: 38000 },
    hourly: [
      { h: "06", v: 60 }, { h: "07", v: 95 }, { h: "08", v: 180 }, { h: "09", v: 240 },
      { h: "10", v: 310 }, { h: "11", v: 380 }, { h: "12", v: 420 }, { h: "13", v: 390 },
    ],
  },
  {
    id: "rcs",
    name: "RCS Business Messaging",
    provider: "Google RBM / Jibe",
    icon: MessageSquare,
    status: "beta",
    color: "#EC4899",
    gradient: "from-pink-500 to-rose-500",
    config: {
      "Provider": "Google RBM",
      "Agent ID": "rcs_agent_••••••••",
      "Status": "Beta Testing",
      "Coverage": "India, Japan, UK (Growing)",
      "Rich Features": "Cards, Carousels, Buttons",
      "Monthly Limit": "50,000 messages",
    },
    metrics: { delivery: 94.2, uptime: 97.5, latency: "175ms", msgToday: 420, msgMonth: 12000 },
    hourly: [
      { h: "06", v: 20 }, { h: "07", v: 35 }, { h: "08", v: 60 }, { h: "09", v: 80 },
      { h: "10", v: 100 }, { h: "11", v: 120 }, { h: "12", v: 130 }, { h: "13", v: 115 },
    ],
  },
];

const statusBadge: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: "rgba(16,185,129,0.1)", text: "#10B981", label: "Active" },
  beta: { bg: "rgba(245,158,11,0.1)", text: "#F59E0B", label: "Beta" },
  inactive: { bg: "rgba(100,116,139,0.1)", text: "#64748B", label: "Inactive" },
};

export function ChannelManager() {
  const [selected, setSelected] = useState(channels[0]);
  const [showApiKey, setShowApiKey] = useState(false);
  const [activeTab, setActiveTab] = useState<"config" | "metrics" | "logs">("config");
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleTest = () => {
    setTestResult("testing");
    setTimeout(() => {
      setTestResult("success");
      setTimeout(() => setTestResult(null), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="rounded-2xl p-7 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A1628 0%, #003D35 60%, #0A1628 100%)",
          boxShadow: "0 20px 60px rgba(10,22,40,0.35)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #00C9B1, transparent)", transform: "translate(20%, -20%)" }}
        />
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Channel Manager
            </h1>
            <p className="text-sm" style={{ color: "#94A3B8" }}>
              Configure, monitor, and manage all communication channels
            </p>
          </div>
          <div className="flex gap-3 text-center">
            {[
              { label: "Active", count: channels.filter(c => c.status === "active").length, color: "#10B981" },
              { label: "Beta", count: channels.filter(c => c.status === "beta").length, color: "#F59E0B" },
              { label: "Total Msg", count: "66.8K", color: "#00C9B1" },
            ].map((s) => (
              <div key={s.label} className="text-center px-3">
                <div className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</div>
                <div className="text-xs" style={{ color: "#94A3B8" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Channel Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {channels.map((ch) => {
          const Icon = ch.icon;
          const badge = statusBadge[ch.status];
          return (
            <button
              key={ch.id}
              onClick={() => setSelected(ch)}
              className="text-left p-4 rounded-2xl transition-all"
              style={{
                background: selected.id === ch.id ? `linear-gradient(135deg, ${ch.color}20, ${ch.color}10)` : "white",
                border: `2px solid ${selected.id === ch.id ? ch.color : "#E8EDF5"}`,
                boxShadow: selected.id === ch.id ? `0 8px 25px ${ch.color}25` : "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className={`w-10 h-10 bg-gradient-to-br ${ch.gradient} rounded-xl flex items-center justify-center mb-3`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-xs font-bold mb-1" style={{ color: "#0F172A", lineHeight: "1.3" }}>{ch.name}</h4>
              <p className="text-xs mb-2" style={{ color: "#94A3B8" }}>{ch.provider.split(" / ")[0]}</p>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ background: badge.bg, color: badge.text }}
              >
                {badge.label}
              </span>
            </button>
          );
        })}
        {/* Add Channel */}
        <button
          className="p-4 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all hover:border-teal-400 hover:bg-teal-50"
          style={{ border: "2px dashed #E2E8F0" }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#F8FAFC" }}>
            <Plus className="w-5 h-5" style={{ color: "#94A3B8" }} />
          </div>
          <span className="text-xs" style={{ color: "#94A3B8" }}>Add Channel</span>
        </button>
      </div>

      {/* Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Config */}
        <div
          className="lg:col-span-2 bg-white rounded-2xl"
          style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          {/* Tabs */}
          <div className="px-6 pt-6 flex items-center justify-between">
            <div className="flex gap-1 p-1 rounded-xl" style={{ background: "#F8FAFC" }}>
              {[
                { id: "config", label: "Configuration", icon: Settings },
                { id: "metrics", label: "Metrics", icon: BarChart3 },
                { id: "logs", label: "Event Logs", icon: Activity },
              ].map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all"
                    style={{
                      background: activeTab === tab.id ? "white" : "transparent",
                      color: activeTab === tab.id ? "#0F172A" : "#94A3B8",
                      boxShadow: activeTab === tab.id ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                    }}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: selected.status === "active" ? "#10B981" : "#F59E0B" }}
              />
              <span className="text-xs font-semibold" style={{ color: selected.status === "active" ? "#10B981" : "#F59E0B" }}>
                {statusBadge[selected.status].label}
              </span>
            </div>
          </div>

          <div className="p-6">
            {/* Channel Header */}
            <div className="flex items-center gap-4 mb-6 pb-5 border-b" style={{ borderColor: "#F1F5F9" }}>
              <div
                className={`w-14 h-14 bg-gradient-to-br ${selected.gradient} rounded-2xl flex items-center justify-center`}
                style={{ boxShadow: `0 8px 20px ${selected.color}40` }}
              >
                <selected.icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl" style={{ color: "#0F172A" }}>{selected.name}</h2>
                <p className="text-sm" style={{ color: "#64748B" }}>{selected.provider}</p>
              </div>
            </div>

            {/* Config Tab */}
            {activeTab === "config" && (
              <div className="space-y-4">
                {Object.entries(selected.config).map(([key, value]) => {
                  const isSecret = key.toLowerCase().includes("key") || key.toLowerCase().includes("token") || key.toLowerCase().includes("sid");
                  return (
                    <div key={key} className="flex items-center gap-4">
                      <label className="text-xs font-semibold w-40 flex-shrink-0" style={{ color: "#64748B" }}>
                        {key}
                      </label>
                      <div className="flex-1 relative">
                        <input
                          type={isSecret && !showApiKey ? "password" : "text"}
                          defaultValue={value}
                          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                          style={{
                            background: "#F8FAFC",
                            border: "1px solid #E8EDF5",
                            color: "#0F172A",
                            fontFamily: isSecret ? "monospace" : "inherit",
                          }}
                        />
                        {isSecret && (
                          <button
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold"
                            style={{ color: selected.color }}
                          >
                            {showApiKey ? "Hide" : "Show"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: "#F1F5F9" }}>
                  <button
                    onClick={handleTest}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{ background: `${selected.color}15`, color: selected.color, border: `1px solid ${selected.color}30` }}
                  >
                    <RefreshCw className={`w-4 h-4 ${testResult === "testing" ? "animate-spin" : ""}`} />
                    {testResult === "testing" ? "Testing..." : testResult === "success" ? "✓ Connected!" : "Test Connection"}
                  </button>
                  <button
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium"
                    style={{ background: "#F1F5F9", color: "#64748B" }}
                  >
                    <Key className="w-4 h-4" />
                    Rotate API Key
                  </button>
                  <button
                    className="flex-1 px-5 py-2.5 rounded-xl text-sm font-semibold"
                    style={{
                      background: `linear-gradient(135deg, ${selected.color}, #6366F1)`,
                      color: "white",
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Metrics Tab */}
            {activeTab === "metrics" && (
              <div>
                <div className="grid grid-cols-2 gap-4 mb-5">
                  {[
                    { label: "Delivery Rate", val: `${selected.metrics.delivery}%`, icon: CheckCircle, color: "#10B981" },
                    { label: "Uptime", val: `${selected.metrics.uptime}%`, icon: Shield, color: "#00C9B1" },
                    { label: "Avg Latency", val: selected.metrics.latency, icon: Clock, color: "#6366F1" },
                    { label: "Messages Today", val: selected.metrics.msgToday.toLocaleString(), icon: TrendingUp, color: "#F59E0B" },
                  ].map((m) => {
                    const MIcon = m.icon;
                    return (
                      <div key={m.label} className="p-4 rounded-xl" style={{ background: "#F8FAFC", border: "1px solid #E8EDF5" }}>
                        <div className="flex items-center gap-2 mb-1">
                          <MIcon className="w-4 h-4" style={{ color: m.color }} />
                          <span className="text-xs" style={{ color: "#64748B" }}>{m.label}</span>
                        </div>
                        <div className="font-bold text-xl" style={{ color: "#0F172A" }}>{m.val}</div>
                      </div>
                    );
                  })}
                </div>
                <h4 className="font-semibold text-sm mb-3" style={{ color: "#0F172A" }}>Hourly Message Volume (Today)</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={selected.hourly}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="h" stroke="#94A3B8" fontSize={11} />
                    <YAxis stroke="#94A3B8" fontSize={11} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "10px", fontSize: "12px" }} />
                    <Line type="monotone" dataKey="v" stroke={selected.color} strokeWidth={2.5} dot={{ fill: selected.color, r: 3 }} name="Messages" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Logs Tab */}
            {activeTab === "logs" && (
              <div className="space-y-2">
                {[
                  { time: "10:26:45", event: "Message delivered", status: "success", detail: "+971501234567 | tmpl_welcome_v3" },
                  { time: "10:26:30", event: "Webhook received", status: "success", detail: "User replied YES" },
                  { time: "10:25:55", event: "Template approved", status: "success", detail: "spring_sale_2026 approved by Meta" },
                  { time: "10:24:20", event: "Rate limit warning", status: "warning", detail: "80% of daily quota consumed" },
                  { time: "10:23:10", event: "Message delivered", status: "success", detail: "+971559876543 | tmpl_order_confirm" },
                  { time: "10:22:05", event: "API auth refreshed", status: "info", detail: "OAuth token renewed" },
                  { time: "10:20:55", event: "Delivery failed", status: "error", detail: "+9715XXXXXXXX | Invalid number" },
                  { time: "10:19:40", event: "Message delivered", status: "success", detail: "+971504567890 | tmpl_payment_rem" },
                ].map((log, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        background: log.status === "success" ? "#10B981" : log.status === "warning" ? "#F59E0B" : log.status === "error" ? "#EF4444" : "#6366F1",
                      }}
                    />
                    <span className="text-xs font-mono w-16 flex-shrink-0" style={{ color: "#94A3B8" }}>{log.time}</span>
                    <span className="text-xs font-medium flex-1" style={{ color: "#334155" }}>{log.event}</span>
                    <span className="text-xs" style={{ color: "#94A3B8" }}>{log.detail}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Status + Usage */}
        <div className="space-y-4">
          <div
            className="bg-white rounded-2xl p-5"
            style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
          >
            <h4 className="font-bold mb-4" style={{ color: "#0F172A" }}>Channel Health</h4>
            <div className="space-y-4">
              {[
                { label: "Uptime", val: selected.metrics.uptime, color: selected.color },
                { label: "Delivery Rate", val: selected.metrics.delivery, color: "#10B981" },
                { label: "Throughput", val: 78, color: "#6366F1" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: "#64748B" }}>{m.label}</span>
                    <span className="text-xs font-bold" style={{ color: "#0F172A" }}>{m.val}%</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "#F1F5F9" }}>
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ width: `${m.val}%`, background: m.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="bg-white rounded-2xl p-5"
            style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
          >
            <h4 className="font-bold mb-4" style={{ color: "#0F172A" }}>Monthly Usage</h4>
            {[
              { label: "Messages Sent", used: selected.metrics.msgMonth, limit: 1000000, color: selected.color },
              { label: "API Calls", used: Math.round(selected.metrics.msgMonth * 1.8), limit: 2000000, color: "#6366F1" },
            ].map((u) => {
              const pct = Math.min((u.used / u.limit) * 100, 100);
              return (
                <div key={u.label} className="mb-4 last:mb-0">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs" style={{ color: "#64748B" }}>{u.label}</span>
                    <span className="text-xs font-semibold" style={{ color: "#0F172A" }}>
                      {(u.used / 1000).toFixed(0)}K / {(u.limit / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full" style={{ background: "#F1F5F9" }}>
                    <div
                      className="h-2.5 rounded-full transition-all"
                      style={{ width: `${pct}%`, background: pct > 80 ? "#EF4444" : u.color }}
                    />
                  </div>
                  <div className="text-xs mt-0.5 text-right" style={{ color: "#94A3B8" }}>
                    {pct.toFixed(1)}% used
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="rounded-2xl p-5"
            style={{
              background: `linear-gradient(135deg, ${selected.color}15, ${selected.color}08)`,
              border: `1px solid ${selected.color}30`,
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${selected.color}25` }}
              >
                <CheckCircle className="w-5 h-5" style={{ color: selected.color }} />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "#0F172A" }}>All Systems Normal</p>
                <p className="text-xs" style={{ color: "#64748B" }}>Last check: 30 seconds ago</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {["API Endpoint", "Webhook", "Template Engine", "Rate Limiter"].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "#64748B" }}>{item}</span>
                  <span className="text-xs font-semibold" style={{ color: "#10B981" }}>✓ Online</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
