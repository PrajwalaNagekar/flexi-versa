import { useState, useEffect, useRef } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bell,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Cloud,
  Database,
  Eye,
  Filter,
  Globe,
  Info,
  Link2,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Play,
  RefreshCw,
  RotateCcw,
  Search,
  Server,
  Shield,
  ShieldCheck,
  Terminal,
  TrendingUp,
  User,
  Users,
  Webhook,
  Wifi,
  WifiOff,
  X,
  Zap,
  XCircle,
  AlertCircle,
  TimerIcon,
  BarChart3,
  Map,
  GitBranch,
  Cpu,
  Lock,
  Settings,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const apiLogs = [
  { id: "req_8af3c2", method: "POST", endpoint: "/v1/whatsapp/send", status: 200, latency: 142, channel: "WhatsApp", ts: "09:42:31", payload: "lead_id=4821" },
  { id: "req_7b12d9", method: "POST", endpoint: "/v1/crm/lead/update", status: 200, latency: 87, channel: "CRM", ts: "09:42:28", payload: "stage=qualified" },
  { id: "req_3e99fa", method: "GET", endpoint: "/v1/email/status/msg_2291", status: 200, latency: 56, channel: "Email", ts: "09:42:25", payload: "" },
  { id: "req_5c41bb", method: "POST", endpoint: "/v1/voice/dial", status: 503, latency: 2100, channel: "Voice", ts: "09:42:20", payload: "number=+971501234" },
  { id: "req_2d88e1", method: "POST", endpoint: "/v1/whatsapp/send", status: 200, latency: 128, channel: "WhatsApp", ts: "09:42:15", payload: "lead_id=4820" },
  { id: "req_9f30ac", method: "PUT", endpoint: "/v1/crm/contact/88231", status: 429, latency: 1800, channel: "CRM", ts: "09:42:10", payload: "rate_limited" },
  { id: "req_6a77d2", method: "POST", endpoint: "/v1/sms/send", status: 200, latency: 204, channel: "SMS", ts: "09:42:05", payload: "lead_id=4819" },
  { id: "req_1b55f0", method: "POST", endpoint: "/v1/email/send", status: 200, latency: 310, channel: "Email", ts: "09:41:58", payload: "campaign=spring_q2" },
];

const webhookLogs = [
  { id: "wh_91a3c", event: "lead.created", source: "Landing Page", status: "delivered", ts: "09:42:29", retry: 0, duration: 84 },
  { id: "wh_72d1f", event: "message.delivered", source: "WhatsApp Cloud", status: "delivered", ts: "09:42:22", retry: 0, duration: 52 },
  { id: "wh_43e8b", event: "crm.sync.failed", source: "Zoho CRM", status: "failed", ts: "09:42:18", retry: 2, duration: 5010 },
  { id: "wh_20c5a", event: "call.completed", source: "Twilio Voice", status: "delivered", ts: "09:42:12", retry: 0, duration: 141 },
  { id: "wh_87f2d", event: "message.read", source: "WhatsApp Cloud", status: "delivered", ts: "09:42:08", retry: 0, duration: 67 },
  { id: "wh_55b9e", event: "lead.assigned", source: "Routing Engine", status: "pending", ts: "09:42:02", retry: 1, duration: 2200 },
];

const messageLifecycle = [
  { id: "msg_A4421", contact: "Ahmed Al-Rashid", channel: "WhatsApp", stage: "delivered", attempts: 1, ts: "09:42:30", leadId: "4821" },
  { id: "msg_A4420", contact: "Sarah Thornton", channel: "Email", stage: "sent", attempts: 1, ts: "09:42:24", leadId: "4820" },
  { id: "msg_A4419", contact: "James Cooper", channel: "SMS", stage: "failed", attempts: 3, ts: "09:42:19", leadId: "4819" },
  { id: "msg_A4418", contact: "Fatima Al-Zaabi", channel: "WhatsApp", stage: "retry", attempts: 2, ts: "09:42:12", leadId: "4818" },
  { id: "msg_A4417", contact: "David Walsh", channel: "Voice", stage: "delivered", attempts: 1, ts: "09:42:05", leadId: "4817" },
  { id: "msg_A4416", contact: "Priya Nair", channel: "Email", stage: "delivered", attempts: 1, ts: "09:41:58", leadId: "4816" },
];

const retryQueue = [
  { id: "retry_001", type: "CRM Sync", target: "Zoho Lead #4819", reason: "Timeout", attempts: 2, maxAttempts: 5, nextRetry: "00:42", status: "queued" },
  { id: "retry_002", type: "WhatsApp Send", target: "Lead #4815", reason: "Rate limit", attempts: 1, maxAttempts: 5, nextRetry: "01:20", status: "queued" },
  { id: "retry_003", type: "Webhook Delivery", target: "CRM callback #wh_43e8b", reason: "503 error", attempts: 3, maxAttempts: 5, nextRetry: "03:00", status: "retrying" },
];

const integrationHealth = [
  { name: "Zoho CRM", status: "degraded", latency: 340, syncRate: 87, lastSync: "3 min ago", errors: 4, uptime: "99.1%" },
  { name: "Salesforce", status: "healthy", latency: 112, syncRate: 99, lastSync: "1 min ago", errors: 0, uptime: "99.9%" },
  { name: "HubSpot", status: "healthy", latency: 98, syncRate: 100, lastSync: "45 sec ago", errors: 0, uptime: "100%" },
  { name: "WhatsApp API", status: "healthy", latency: 134, syncRate: 100, lastSync: "12 sec ago", errors: 0, uptime: "100%" },
  { name: "Twilio Voice", status: "down", latency: 9999, syncRate: 0, lastSync: "18 min ago", errors: 12, uptime: "94.3%" },
  { name: "SendGrid Email", status: "healthy", latency: 205, syncRate: 99, lastSync: "2 min ago", errors: 1, uptime: "99.7%" },
];

const latencyHistory = [
  { t: "09:35", zoho: 280, salesforce: 95, hubspot: 88, wa: 121 },
  { t: "09:36", zoho: 310, salesforce: 100, hubspot: 92, wa: 125 },
  { t: "09:37", zoho: 295, salesforce: 98, hubspot: 89, wa: 120 },
  { t: "09:38", zoho: 320, salesforce: 108, hubspot: 95, wa: 128 },
  { t: "09:39", zoho: 350, salesforce: 105, hubspot: 91, wa: 130 },
  { t: "09:40", zoho: 330, salesforce: 110, hubspot: 93, wa: 135 },
  { t: "09:41", zoho: 340, salesforce: 112, hubspot: 98, wa: 134 },
];

const leads = [
  {
    id: "LD-4821",
    name: "Ahmed Al-Rashid",
    source: "Facebook Ad",
    region: "UAE",
    agent: "Mariam K.",
    stage: "contacted",
    slaStatus: "ok",
    journey: [
      { stage: "Created", ts: "09:10:02", actor: "System", note: "Lead captured via FB Ad", done: true },
      { stage: "Qualified", ts: "09:11:30", actor: "Auto-Router", note: "Score 82/100 — High priority", done: true },
      { stage: "Assigned", ts: "09:12:05", actor: "System", note: "Assigned to Mariam K.", done: true },
      { stage: "Contacted", ts: "09:14:22", actor: "Mariam K.", note: "WhatsApp message sent ✓", done: true, channel: "WhatsApp" },
      { stage: "Follow-up", ts: "--:--:--", actor: "--", note: "Scheduled for 10:00", done: false },
      { stage: "Converted", ts: "--:--:--", actor: "--", note: "", done: false },
    ],
  },
  {
    id: "LD-4820",
    name: "Sarah Thornton",
    source: "Google Ads",
    region: "UK",
    agent: "James R.",
    stage: "assigned",
    slaStatus: "breach",
    journey: [
      { stage: "Created", ts: "08:50:12", actor: "System", note: "Lead captured via Google Ads", done: true },
      { stage: "Qualified", ts: "08:51:00", actor: "Auto-Router", note: "Score 74/100", done: true },
      { stage: "Assigned", ts: "08:52:30", actor: "System", note: "Assigned to James R.", done: true },
      { stage: "Contacted", ts: "--:--:--", actor: "--", note: "⚠ SLA breach: 48 min overdue", done: false, breach: true },
      { stage: "Follow-up", ts: "--:--:--", actor: "--", note: "", done: false },
      { stage: "Converted", ts: "--:--:--", actor: "--", note: "", done: false },
    ],
  },
];

const alerts = [
  { id: "alrt_001", severity: "critical", title: "Twilio Voice Gateway Down", description: "12 failed calls in last 18 minutes. Fallback SMS triggered.", module: "Voice Solutions", ts: "09:42:01", action: "View Logs", icon: WifiOff },
  { id: "alrt_002", severity: "critical", title: "SLA Breach: Lead LD-4820", description: "Sarah Thornton (UK) uncontacted for 48 minutes. Assigned to James R.", module: "Lead Management", ts: "09:41:30", action: "Assign Now", icon: Clock },
  { id: "alrt_003", severity: "warning", title: "Zoho CRM Sync Degraded", description: "4 failed sync attempts. Avg latency 340ms. Auto-retry enabled.", module: "CRM Integration", ts: "09:40:15", action: "Retry Sync", icon: AlertTriangle },
  { id: "alrt_004", severity: "warning", title: "Rate Limit Hit: Zoho API", description: "29 requests throttled in last 5 minutes. Queue building up.", module: "CRM Integration", ts: "09:39:50", action: "View Queue", icon: Database },
  { id: "alrt_005", severity: "warning", title: "Agent Inactive: James R.", description: "No activity for 52 minutes. 3 leads uncontacted.", module: "Agent Management", ts: "09:38:00", action: "Send Alert", icon: Users },
  { id: "alrt_006", severity: "info", title: "Campaign 'Spring Q2' Below Target", description: "Open rate 12.4% vs 18% target. Consider A/B variant.", module: "Campaign Engine", ts: "09:35:00", action: "View Campaign", icon: BarChart3 },
  { id: "alrt_007", severity: "info", title: "8 Unassigned Leads Detected", description: "Leads from AU region have no agent assignment. Routing rule gap.", module: "Lead Management", ts: "09:30:00", action: "Auto-Assign", icon: Users },
];

const regions = ["UAE", "UK", "Australia"] as const;
type Region = typeof regions[number];

const regionData: Record<Region, {
  leads: number; convRate: string; avgResponse: string; agents: number;
  tz: string; topChannel: string; slaBreaches: number; revenue: string;
  performance: Array<{ month: string; leads: number; conv: number }>;
}> = {
  UAE: {
    leads: 18420, convRate: "24.3%", avgResponse: "4.2 min", agents: 28,
    tz: "GST+4 (Dubai)", topChannel: "WhatsApp", slaBreaches: 3, revenue: "$842K",
    performance: [
      { month: "Jan", leads: 3200, conv: 780 }, { month: "Feb", leads: 3800, conv: 920 },
      { month: "Mar", leads: 4100, conv: 1010 }, { month: "Apr", leads: 4200, conv: 1024 },
    ],
  },
  UK: {
    leads: 12310, convRate: "19.8%", avgResponse: "6.1 min", agents: 18,
    tz: "BST+1 (London)", topChannel: "Email", slaBreaches: 7, revenue: "$510K",
    performance: [
      { month: "Jan", leads: 2400, conv: 480 }, { month: "Feb", leads: 2700, conv: 540 },
      { month: "Mar", leads: 3200, conv: 635 }, { month: "Apr", leads: 3100, conv: 614 },
    ],
  },
  Australia: {
    leads: 8750, convRate: "21.1%", avgResponse: "5.8 min", agents: 14,
    tz: "AEST+10 (Sydney)", topChannel: "SMS", slaBreaches: 2, revenue: "$297K",
    performance: [
      { month: "Jan", leads: 1800, conv: 380 }, { month: "Feb", leads: 2100, conv: 443 },
      { month: "Mar", leads: 2300, conv: 485 }, { month: "Apr", leads: 2400, conv: 506 },
    ],
  },
};

const routingRules: Record<Region, string[]> = {
  UAE: ["Route to AE team (9am–9pm GST)", "WhatsApp-first channel priority", "Arabic language templates", "24h SLA target"],
  UK: ["Route to UK team (8am–6pm BST)", "Email-first for B2B leads", "English templates", "12h SLA target"],
  Australia: ["Route to AU team (8am–5pm AEST)", "SMS-first for mobile leads", "AEST-aware scheduling", "8h SLA target"],
};

const slaAgents = [
  { name: "Mariam K.", leads: 34, responded: 33, avgTime: "3.8 min", breaches: 1, score: 97 },
  { name: "Khalid N.", leads: 28, responded: 27, avgTime: "5.1 min", breaches: 2, score: 93 },
  { name: "James R.", leads: 22, responded: 19, avgTime: "12.4 min", breaches: 7, score: 68 },
  { name: "Priya S.", leads: 31, responded: 31, avgTime: "2.9 min", breaches: 0, score: 100 },
  { name: "Tom Walsh", leads: 19, responded: 18, avgTime: "7.2 min", breaches: 3, score: 84 },
];

const auditLogs = [
  { id: "aud_1001", user: "Admin User", action: "Rotated API Key", target: "WhatsApp Cloud API", ip: "10.0.1.4", ts: "09:40:12", severity: "high" },
  { id: "aud_1002", user: "Mariam K.", action: "Lead Stage Updated", target: "LD-4821 → Contacted", ip: "10.0.2.12", ts: "09:14:22", severity: "low" },
  { id: "aud_1003", user: "Admin User", action: "Routing Rule Modified", target: "UAE Region / Priority 1", ip: "10.0.1.4", ts: "09:10:05", severity: "medium" },
  { id: "aud_1004", user: "System", action: "Auto-Retry Triggered", target: "CRM Sync Retry #3", ip: "internal", ts: "09:42:18", severity: "low" },
  { id: "aud_1005", user: "Admin User", action: "Template Approved", target: "Spring Promo 2026 (WA)", ip: "10.0.1.4", ts: "09:08:31", severity: "low" },
  { id: "aud_1006", user: "Campaign Mgr", action: "Campaign Launched", target: "Spring Q2 — 28,500 contacts", ip: "10.0.3.8", ts: "08:59:00", severity: "medium" },
  { id: "aud_1007", user: "System", action: "SLA Breach Detected", target: "LD-4820 (Sarah Thornton / UK)", ip: "internal", ts: "09:41:30", severity: "high" },
];

const integrationBadges = [
  { name: "WhatsApp Cloud API", type: "Active", verified: true, color: "#00C9B1" },
  { name: "Zoho CRM", type: "Degraded", verified: true, color: "#F59E0B" },
  { name: "Salesforce", type: "Active", verified: true, color: "#00C9B1" },
  { name: "HubSpot", type: "Active", verified: true, color: "#00C9B1" },
  { name: "SendGrid Email", type: "Active", verified: true, color: "#00C9B1" },
  { name: "Twilio Voice", type: "Offline", verified: false, color: "#EF4444" },
  { name: "Twilio SMS", type: "Active", verified: true, color: "#00C9B1" },
  { name: "Google Ads", type: "Active", verified: true, color: "#00C9B1" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    healthy: "#10B981", degraded: "#F59E0B", down: "#EF4444",
    delivered: "#10B981", failed: "#EF4444", sent: "#3B82F6",
    retry: "#F59E0B", pending: "#94A3B8",
  };
  const pulse = status === "healthy" || status === "delivered";
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${pulse ? "animate-pulse" : ""}`}
      style={{ background: colors[status] || "#94A3B8" }}
    />
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    critical: { bg: "rgba(239,68,68,0.12)", color: "#EF4444" },
    warning: { bg: "rgba(245,158,11,0.12)", color: "#F59E0B" },
    info: { bg: "rgba(99,102,241,0.12)", color: "#6366F1" },
    high: { bg: "rgba(239,68,68,0.12)", color: "#EF4444" },
    medium: { bg: "rgba(245,158,11,0.12)", color: "#F59E0B" },
    low: { bg: "rgba(16,185,129,0.12)", color: "#10B981" },
  };
  const s = map[severity] || map.info;
  return (
    <span
      className="text-xs font-semibold px-2 py-0.5 rounded-full capitalize"
      style={{ background: s.bg, color: s.color }}
    >
      {severity}
    </span>
  );
}

function ChannelIcon({ channel }: { channel: string }) {
  const icons: Record<string, React.ReactNode> = {
    WhatsApp: <MessageSquare className="w-3.5 h-3.5" />,
    Email: <Mail className="w-3.5 h-3.5" />,
    SMS: <Zap className="w-3.5 h-3.5" />,
    Voice: <Phone className="w-3.5 h-3.5" />,
    CRM: <Link2 className="w-3.5 h-3.5" />,
  };
  const colors: Record<string, string> = {
    WhatsApp: "#00C9B1", Email: "#8B5CF6", SMS: "#6366F1", Voice: "#F59E0B", CRM: "#EC4899",
  };
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
      style={{ background: `${colors[channel] || "#94A3B8"}20`, color: colors[channel] || "#94A3B8" }}
    >
      {icons[channel]}
      {channel}
    </span>
  );
}

// ─── Tab: Communication Engine ───────────────────────────────────────────────
function CommEngineTab() {
  const [logFilter, setLogFilter] = useState("All");
  const [logCount, setLogCount] = useState(apiLogs.length);
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTicker((p) => p + 1), 3000);
    return () => clearInterval(t);
  }, []);

  const channels = ["All", "WhatsApp", "CRM", "Email", "Voice", "SMS"];
  const filtered = logFilter === "All" ? apiLogs : apiLogs.filter((l) => l.channel === logFilter);

  return (
    <div className="space-y-6">
      {/* Live channel status */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name: "WhatsApp", requests: 1248 + ticker, errors: 0, latency: 134, status: "healthy" },
          { name: "Email", requests: 432 + Math.floor(ticker / 3), errors: 1, latency: 205, status: "healthy" },
          { name: "SMS", requests: 891 + Math.floor(ticker / 2), errors: 3, latency: 204, status: "healthy" },
          { name: "Voice", requests: 143, errors: 12, latency: 9999, status: "down" },
        ].map((ch) => (
          <div
            key={ch.name}
            className="bg-white rounded-2xl p-4"
            style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <ChannelIcon channel={ch.name} />
              <div className="flex items-center gap-1.5">
                <StatusDot status={ch.status} />
                <span className="text-xs" style={{ color: ch.status === "down" ? "#EF4444" : "#10B981" }}>
                  {ch.status === "down" ? "OFFLINE" : "LIVE"}
                </span>
              </div>
            </div>
            <div className="font-bold text-xl" style={{ color: "#0F172A" }}>{ch.requests.toLocaleString()}</div>
            <div className="text-xs mt-0.5" style={{ color: "#64748B" }}>Requests today</div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs" style={{ color: ch.errors > 0 ? "#EF4444" : "#10B981" }}>
                {ch.errors} errors
              </span>
              <span className="text-xs" style={{ color: ch.latency > 1000 ? "#EF4444" : "#64748B" }}>
                {ch.latency > 1000 ? "Timeout" : `${ch.latency}ms`}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Request Log */}
        <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" style={{ color: "#00C9B1" }} />
              <span className="font-bold text-sm" style={{ color: "#0F172A" }}>API Request Logs</span>
              <span
                className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                Live
              </span>
            </div>
            <div className="flex gap-1">
              {channels.map((c) => (
                <button
                  key={c}
                  onClick={() => setLogFilter(c)}
                  className="text-xs px-2 py-0.5 rounded-full transition-all"
                  style={{
                    background: logFilter === c ? "#00C9B1" : "#F1F5F9",
                    color: logFilter === c ? "white" : "#64748B",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                  {["ID", "Method", "Endpoint", "Status", "Latency", "Time"].map((h) => (
                    <th key={h} className="text-left py-2 px-2 font-semibold uppercase tracking-wide" style={{ color: "#94A3B8", fontSize: "10px" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors" style={{ borderBottom: "1px solid #F8FAFC" }}>
                    <td className="py-2 px-2 font-mono" style={{ color: "#6366F1" }}>{log.id}</td>
                    <td className="py-2 px-2">
                      <span className="font-semibold" style={{ color: log.method === "POST" ? "#00C9B1" : log.method === "PUT" ? "#F59E0B" : "#3B82F6" }}>
                        {log.method}
                      </span>
                    </td>
                    <td className="py-2 px-2 font-mono" style={{ color: "#334155", maxWidth: "140px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {log.endpoint}
                    </td>
                    <td className="py-2 px-2">
                      <span
                        className="px-1.5 py-0.5 rounded font-semibold"
                        style={{
                          background: log.status === 200 ? "rgba(16,185,129,0.1)" : log.status === 429 ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)",
                          color: log.status === 200 ? "#10B981" : log.status === 429 ? "#F59E0B" : "#EF4444",
                        }}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="py-2 px-2" style={{ color: log.latency > 1000 ? "#EF4444" : "#64748B" }}>
                      {log.latency > 1000 ? `${(log.latency / 1000).toFixed(1)}s` : `${log.latency}ms`}
                    </td>
                    <td className="py-2 px-2 font-mono" style={{ color: "#94A3B8" }}>{log.ts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Webhook Triggers */}
        <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Webhook className="w-4 h-4" style={{ color: "#8B5CF6" }} />
              <span className="font-bold text-sm" style={{ color: "#0F172A" }}>Webhook Triggers & Responses</span>
            </div>
          </div>
          <div className="space-y-2">
            {webhookLogs.map((wh) => (
              <div
                key={wh.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                style={{ border: "1px solid #F1F5F9" }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: wh.status === "delivered" ? "rgba(16,185,129,0.1)" : wh.status === "failed" ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)",
                  }}
                >
                  {wh.status === "delivered" ? <CheckCircle className="w-3.5 h-3.5" style={{ color: "#10B981" }} /> :
                   wh.status === "failed" ? <XCircle className="w-3.5 h-3.5" style={{ color: "#EF4444" }} /> :
                   <Loader2 className="w-3.5 h-3.5 animate-spin" style={{ color: "#F59E0B" }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold" style={{ color: "#0F172A" }}>{wh.event}</span>
                    <span className="text-xs font-mono" style={{ color: "#94A3B8" }}>{wh.ts}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs" style={{ color: "#64748B" }}>{wh.source}</span>
                    <span className="text-xs font-mono" style={{ color: "#94A3B8" }}>
                      {wh.duration > 1000 ? `${(wh.duration / 1000).toFixed(1)}s` : `${wh.duration}ms`}
                    </span>
                    {wh.retry > 0 && (
                      <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B" }}>
                        {wh.retry} retries
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Message Delivery Lifecycle + Retry Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Message Lifecycle */}
        <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4" style={{ color: "#EC4899" }} />
            <span className="font-bold text-sm" style={{ color: "#0F172A" }}>Message Delivery Lifecycle</span>
          </div>
          <div className="space-y-2">
            {messageLifecycle.map((msg) => (
              <div
                key={msg.id}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ border: "1px solid #F1F5F9", background: msg.stage === "failed" ? "rgba(239,68,68,0.03)" : msg.stage === "retry" ? "rgba(245,158,11,0.03)" : "white" }}
              >
                <div className="flex-shrink-0">
                  <StatusDot status={msg.stage} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold" style={{ color: "#0F172A" }}>{msg.contact}</span>
                    <ChannelIcon channel={msg.channel} />
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-xs" style={{ color: "#94A3B8" }}>{msg.id}</span>
                    <span
                      className="text-xs font-semibold px-1.5 py-0.5 rounded capitalize"
                      style={{
                        background: msg.stage === "delivered" ? "rgba(16,185,129,0.1)" :
                                    msg.stage === "failed" ? "rgba(239,68,68,0.1)" :
                                    msg.stage === "retry" ? "rgba(245,158,11,0.1)" :
                                    "rgba(59,130,246,0.1)",
                        color: msg.stage === "delivered" ? "#10B981" :
                               msg.stage === "failed" ? "#EF4444" :
                               msg.stage === "retry" ? "#F59E0B" :
                               "#3B82F6",
                      }}
                    >
                      {msg.stage}
                    </span>
                    {msg.attempts > 1 && (
                      <span className="text-xs" style={{ color: "#94A3B8" }}>Attempt {msg.attempts}</span>
                    )}
                  </div>
                </div>
                <span className="text-xs font-mono flex-shrink-0" style={{ color: "#94A3B8" }}>{msg.ts}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Retry Queue */}
        <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4" style={{ color: "#F59E0B" }} />
              <span className="font-bold text-sm" style={{ color: "#0F172A" }}>Retry Queue</span>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>
                {retryQueue.length} pending
              </span>
            </div>
            <button
              className="text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1"
              style={{ background: "rgba(0,201,177,0.1)", color: "#00C9B1" }}
            >
              <RefreshCw className="w-3 h-3" /> Retry All
            </button>
          </div>
          <div className="space-y-3">
            {retryQueue.map((r) => (
              <div key={r.id} className="p-4 rounded-xl" style={{ border: "1px solid #FEF3C7", background: "rgba(245,158,11,0.03)" }}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-xs font-semibold" style={{ color: "#0F172A" }}>{r.type}</span>
                    <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>{r.target}</p>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full capitalize"
                    style={{ background: r.status === "retrying" ? "rgba(245,158,11,0.15)" : "rgba(99,102,241,0.12)", color: r.status === "retrying" ? "#F59E0B" : "#6366F1" }}
                  >
                    {r.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: "#94A3B8" }}>Reason: <span style={{ color: "#EF4444" }}>{r.reason}</span></span>
                  <span style={{ color: "#94A3B8" }}>Attempts: {r.attempts}/{r.maxAttempts}</span>
                  <span style={{ color: "#94A3B8" }}>Next: <span style={{ color: "#F59E0B", fontWeight: 600 }}>{r.nextRetry}</span></span>
                </div>
                <div className="mt-2 h-1.5 rounded-full" style={{ background: "#F1F5F9" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(r.attempts / r.maxAttempts) * 100}%`, background: "linear-gradient(90deg, #F59E0B, #EF4444)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Integration Health ─────────────────────────────────────────────────
function IntegrationHealthTab() {
  const [ticker, setTicker] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTicker((p) => p + 1), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-6">
      {/* Integration cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrationHealth.map((intg) => (
          <div
            key={intg.name}
            className="bg-white rounded-2xl p-5"
            style={{
              border: `1px solid ${intg.status === "down" ? "rgba(239,68,68,0.3)" : intg.status === "degraded" ? "rgba(245,158,11,0.3)" : "#E8EDF5"}`,
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: intg.status === "healthy" ? "rgba(16,185,129,0.1)" :
                                intg.status === "degraded" ? "rgba(245,158,11,0.1)" :
                                "rgba(239,68,68,0.1)",
                  }}
                >
                  <Server className="w-4 h-4"
                    style={{ color: intg.status === "healthy" ? "#10B981" : intg.status === "degraded" ? "#F59E0B" : "#EF4444" }}
                  />
                </div>
                <span className="text-sm font-semibold" style={{ color: "#0F172A" }}>{intg.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <StatusDot status={intg.status} />
                <span className="text-xs font-semibold capitalize"
                  style={{ color: intg.status === "healthy" ? "#10B981" : intg.status === "degraded" ? "#F59E0B" : "#EF4444" }}
                >
                  {intg.status}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center mb-3">
              <div>
                <div className="text-sm font-bold" style={{ color: intg.latency > 1000 ? "#EF4444" : "#0F172A" }}>
                  {intg.latency > 1000 ? "N/A" : `${intg.latency}ms`}
                </div>
                <div className="text-xs" style={{ color: "#94A3B8" }}>Latency</div>
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: intg.syncRate < 90 ? "#EF4444" : "#10B981" }}>
                  {intg.syncRate}%
                </div>
                <div className="text-xs" style={{ color: "#94A3B8" }}>Sync Rate</div>
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: "#0F172A" }}>{intg.uptime}</div>
                <div className="text-xs" style={{ color: "#94A3B8" }}>Uptime</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span style={{ color: "#94A3B8" }}>Last sync: <span style={{ color: "#334155" }}>{intg.lastSync}</span></span>
              <span style={{ color: intg.errors > 0 ? "#EF4444" : "#10B981" }}>
                {intg.errors} errors
              </span>
            </div>
            {intg.errors > 0 && (
              <button
                className="mt-3 w-full text-xs py-1.5 rounded-lg font-medium flex items-center justify-center gap-1"
                style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}
              >
                <RotateCcw className="w-3 h-3" /> Retry Sync
              </button>
            )}
          </div>
        ))}
      </div>

      {/* API Latency Chart */}
      <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-sm" style={{ color: "#0F172A" }}>API Latency Trends (Last 7 minutes)</h3>
            <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>Response time in milliseconds per integration</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Live
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={latencyHistory} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="t" stroke="#94A3B8" fontSize={10} tickLine={false} />
            <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} unit="ms" />
            <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "10px", fontSize: "11px" }} />
            <Line type="monotone" dataKey="zoho" stroke="#F59E0B" strokeWidth={2} dot={false} name="Zoho CRM" />
            <Line type="monotone" dataKey="salesforce" stroke="#00C9B1" strokeWidth={2} dot={false} name="Salesforce" />
            <Line type="monotone" dataKey="hubspot" stroke="#6366F1" strokeWidth={2} dot={false} name="HubSpot" />
            <Line type="monotone" dataKey="wa" stroke="#EC4899" strokeWidth={2} dot={false} name="WhatsApp API" />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-4 mt-3">
          {[{ name: "Zoho CRM", color: "#F59E0B" }, { name: "Salesforce", color: "#00C9B1" }, { name: "HubSpot", color: "#6366F1" }, { name: "WhatsApp API", color: "#EC4899" }].map((l) => (
            <div key={l.name} className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 rounded" style={{ background: l.color }} />
              <span className="text-xs" style={{ color: "#64748B" }}>{l.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Webhook activity + Error logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <h3 className="font-bold text-sm mb-4" style={{ color: "#0F172A" }}>Webhook Activity Log</h3>
          <div className="space-y-2 text-xs" style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace" }}>
            {[
              { ts: "09:42:29", msg: "[INFO] lead.created → CRM callback → 200 OK (84ms)", color: "#10B981" },
              { ts: "09:42:22", msg: "[INFO] message.delivered → WhatsApp Cloud → 200 OK (52ms)", color: "#10B981" },
              { ts: "09:42:18", msg: "[ERROR] crm.sync.failed → Zoho → 503 Service Unavailable (5010ms)", color: "#EF4444" },
              { ts: "09:42:12", msg: "[INFO] call.completed → Twilio → 200 OK (141ms)", color: "#10B981" },
              { ts: "09:42:08", msg: "[INFO] message.read → WhatsApp Cloud → 200 OK (67ms)", color: "#10B981" },
              { ts: "09:42:02", msg: "[WARN] lead.assigned → Routing Engine → timeout (2200ms) retrying...", color: "#F59E0B" },
              { ts: "09:41:55", msg: "[INFO] email.sent → SendGrid → 200 OK (310ms)", color: "#10B981" },
              { ts: "09:41:48", msg: "[WARN] crm.sync → Zoho → 429 Rate Limited (1800ms)", color: "#F59E0B" },
            ].map((log, i) => (
              <div key={i} className="flex gap-2 py-1" style={{ borderBottom: "1px solid #F8FAFC" }}>
                <span style={{ color: "#94A3B8", flexShrink: 0 }}>{log.ts}</span>
                <span style={{ color: log.color }}>{log.msg}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <h3 className="font-bold text-sm mb-4" style={{ color: "#0F172A" }}>System Health Indicators</h3>
          <div className="space-y-3">
            {[
              { label: "Overall System Uptime", value: 99.4, color: "#10B981" },
              { label: "API Gateway Health", value: 99.1, color: "#10B981" },
              { label: "CRM Sync Success Rate", value: 87.3, color: "#F59E0B" },
              { label: "Message Delivery Rate", value: 99.1, color: "#10B981" },
              { label: "Voice Channel Health", value: 62.0, color: "#EF4444" },
              { label: "Webhook Delivery Rate", value: 96.8, color: "#10B981" },
            ].map((h) => (
              <div key={h.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs" style={{ color: "#475569" }}>{h.label}</span>
                  <span className="text-xs font-bold" style={{ color: h.color }}>{h.value}%</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: "#F1F5F9" }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${h.value}%`, background: h.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Lead Lifecycle ─────────────────────────────────────────────────────
function LeadLifecycleTab() {
  const [selected, setSelected] = useState(0);
  const lead = leads[selected];

  return (
    <div className="space-y-6">
      {/* Lead selector */}
      <div className="flex gap-3 flex-wrap">
        {leads.map((l, i) => (
          <button
            key={l.id}
            onClick={() => setSelected(i)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all"
            style={{
              background: selected === i ? "linear-gradient(135deg, rgba(0,201,177,0.15), rgba(0,163,224,0.15))" : "white",
              border: selected === i ? "1px solid rgba(0,201,177,0.4)" : "1px solid #E8EDF5",
            }}
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(99,102,241,0.1)" }}>
              <User className="w-3.5 h-3.5" style={{ color: "#6366F1" }} />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold" style={{ color: "#0F172A" }}>{l.name}</div>
              <div className="text-xs" style={{ color: "#64748B" }}>{l.id} · {l.region}</div>
            </div>
            {l.slaStatus === "breach" && (
              <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: "rgba(239,68,68,0.12)", color: "#EF4444" }}>SLA ⚠</span>
            )}
          </button>
        ))}
      </div>

      {/* Lead info */}
      <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-bold text-base" style={{ color: "#0F172A" }}>{lead.name}</h3>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-xs" style={{ color: "#64748B" }}>ID: <span className="font-mono" style={{ color: "#6366F1" }}>{lead.id}</span></span>
              <span className="text-xs" style={{ color: "#64748B" }}>Source: {lead.source}</span>
              <span className="text-xs" style={{ color: "#64748B" }}>Agent: {lead.agent}</span>
              <span className="text-xs" style={{ color: "#64748B" }}>Region: {lead.region}</span>
            </div>
          </div>
          {lead.slaStatus === "breach" && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <AlertTriangle className="w-4 h-4" style={{ color: "#EF4444" }} />
              <span className="text-xs font-semibold" style={{ color: "#EF4444" }}>SLA Breach — 48 min overdue</span>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connector line */}
          <div
            className="absolute top-5 left-5 right-5 h-0.5 z-0"
            style={{ background: "linear-gradient(90deg, #00C9B1, #E2E8F0 60%)" }}
          />
          <div className="flex items-start justify-between relative z-10 overflow-x-auto pb-2">
            {lead.journey.map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-2" style={{ minWidth: "100px" }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all"
                  style={{
                    background: step.done ? (step.breach ? "#EF4444" : "#00C9B1") : "white",
                    borderColor: step.done ? (step.breach ? "#EF4444" : "#00C9B1") : "#E2E8F0",
                    boxShadow: step.done ? `0 0 12px ${step.breach ? "rgba(239,68,68,0.3)" : "rgba(0,201,177,0.3)"}` : "none",
                  }}
                >
                  {step.done && !step.breach ? <CheckCircle className="w-4 h-4 text-white" /> :
                   step.breach ? <AlertTriangle className="w-4 h-4 text-white" /> :
                   <Clock className="w-4 h-4" style={{ color: "#CBD5E1" }} />}
                </div>
                <div className="text-center">
                  <div className="text-xs font-semibold" style={{ color: step.done ? (step.breach ? "#EF4444" : "#0F172A") : "#94A3B8" }}>
                    {step.stage}
                  </div>
                  <div className="text-xs font-mono mt-0.5" style={{ color: "#94A3B8" }}>{step.ts}</div>
                  <div className="text-xs mt-1 text-center" style={{ color: "#64748B", maxWidth: "90px" }}>{step.note}</div>
                  {step.actor && step.actor !== "--" && (
                    <div className="text-xs mt-0.5 px-1.5 py-0.5 rounded" style={{ background: "rgba(99,102,241,0.1)", color: "#6366F1" }}>
                      {step.actor}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Communication history */}
        <div className="mt-6 pt-5" style={{ borderTop: "1px solid #F1F5F9" }}>
          <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#94A3B8" }}>Inline Communication History</h4>
          <div className="space-y-2">
            {[
              { type: "WhatsApp", dir: "out", msg: "Hello Ahmed! Thank you for your interest in Flyworld services...", ts: "09:14:22", status: "delivered" },
              { type: "Email", dir: "out", msg: "Welcome to Flyworld — Your consultation details are attached", ts: "09:16:45", status: "delivered" },
              { type: "System", dir: "in", msg: "Lead score updated to 82/100 — qualified for premium package", ts: "09:17:10", status: "info" },
            ].map((comm, i) => (
              <div key={i} className={`flex gap-3 ${comm.dir === "out" ? "flex-row" : "flex-row-reverse"}`} style={{ maxWidth: "100%" }}>
                <div
                  className="p-3 rounded-xl text-xs flex-1"
                  style={{
                    background: comm.dir === "out" ? "rgba(0,201,177,0.08)" : "#F8FAFC",
                    border: "1px solid " + (comm.dir === "out" ? "rgba(0,201,177,0.2)" : "#E8EDF5"),
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <ChannelIcon channel={comm.type} />
                    <span className="font-mono" style={{ color: "#94A3B8" }}>{comm.ts}</span>
                  </div>
                  <p style={{ color: "#334155" }}>{comm.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Real-Time Alerts ───────────────────────────────────────────────────
function AlertsTab() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [filter, setFilter] = useState("all");

  const visible = alerts
    .filter((a) => !dismissed.includes(a.id))
    .filter((a) => filter === "all" || a.severity === filter);

  return (
    <div className="space-y-6">
      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Critical", count: alerts.filter((a) => a.severity === "critical").length, color: "#EF4444", bg: "rgba(239,68,68,0.08)", icon: XCircle },
          { label: "Warning", count: alerts.filter((a) => a.severity === "warning").length, color: "#F59E0B", bg: "rgba(245,158,11,0.08)", icon: AlertTriangle },
          { label: "Info", count: alerts.filter((a) => a.severity === "info").length, color: "#6366F1", bg: "rgba(99,102,241,0.08)", icon: Info },
        ].map(({ label, count, color, bg, icon: Icon }) => (
          <div
            key={label}
            onClick={() => setFilter(filter === label.toLowerCase() ? "all" : label.toLowerCase())}
            className="bg-white rounded-2xl p-4 cursor-pointer transition-all hover:shadow-md"
            style={{ border: `1px solid ${filter === label.toLowerCase() ? color : "#E8EDF5"}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <span className="text-sm font-semibold" style={{ color: "#0F172A" }}>{label}</span>
            </div>
            <div className="text-2xl font-bold" style={{ color }}>{count}</div>
            <div className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>Active alerts</div>
          </div>
        ))}
      </div>

      {/* Alerts list */}
      <div className="space-y-3">
        {visible.map((alert) => {
          const Icon = alert.icon;
          const colors: Record<string, { border: string; bg: string; icon: string; badge: { bg: string; color: string } }> = {
            critical: { border: "rgba(239,68,68,0.3)", bg: "rgba(239,68,68,0.03)", icon: "#EF4444", badge: { bg: "rgba(239,68,68,0.12)", color: "#EF4444" } },
            warning: { border: "rgba(245,158,11,0.3)", bg: "rgba(245,158,11,0.03)", icon: "#F59E0B", badge: { bg: "rgba(245,158,11,0.12)", color: "#F59E0B" } },
            info: { border: "rgba(99,102,241,0.3)", bg: "rgba(99,102,241,0.03)", icon: "#6366F1", badge: { bg: "rgba(99,102,241,0.12)", color: "#6366F1" } },
          };
          const c = colors[alert.severity];
          return (
            <div
              key={alert.id}
              className="bg-white rounded-2xl p-4 flex items-start gap-4 transition-all hover:shadow-md"
              style={{ border: `1px solid ${c.border}`, background: c.bg }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: c.badge.bg }}
              >
                <Icon className="w-5 h-5" style={{ color: c.icon }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start gap-2 mb-1">
                  <span className="text-sm font-semibold" style={{ color: "#0F172A" }}>{alert.title}</span>
                  <SeverityBadge severity={alert.severity} />
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(100,116,139,0.1)", color: "#64748B" }}>
                    {alert.module}
                  </span>
                </div>
                <p className="text-xs" style={{ color: "#64748B" }}>{alert.description}</p>
                <p className="text-xs mt-1 font-mono" style={{ color: "#94A3B8" }}>{alert.ts}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-all"
                  style={{ background: c.badge.bg, color: c.icon }}
                >
                  {alert.action}
                </button>
                <button
                  onClick={() => setDismissed((p) => [...p, alert.id])}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-slate-100"
                >
                  <X className="w-3.5 h-3.5" style={{ color: "#94A3B8" }} />
                </button>
              </div>
            </div>
          );
        })}
        {visible.length === 0 && (
          <div className="bg-white rounded-2xl p-10 text-center" style={{ border: "1px solid #E8EDF5" }}>
            <CheckCircle className="w-10 h-10 mx-auto mb-3" style={{ color: "#10B981" }} />
            <p className="font-semibold" style={{ color: "#0F172A" }}>No active alerts</p>
            <p className="text-xs mt-1" style={{ color: "#94A3B8" }}>All systems operating normally</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tab: Multi-Region ───────────────────────────────────────────────────────
function MultiRegionTab() {
  const [region, setRegion] = useState<Region>("UAE");
  const data = regionData[region];
  const rules = routingRules[region];

  return (
    <div className="space-y-6">
      {/* Region selector */}
      <div className="flex items-center gap-3 flex-wrap">
        {regions.map((r) => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all"
            style={{
              background: region === r ? "linear-gradient(135deg, #00C9B1, #00A3E0)" : "white",
              color: region === r ? "white" : "#334155",
              border: region === r ? "none" : "1px solid #E8EDF5",
              boxShadow: region === r ? "0 4px 15px rgba(0,201,177,0.3)" : "0 2px 6px rgba(0,0,0,0.04)",
            }}
          >
            <Globe className="w-4 h-4" />
            {r}
          </button>
        ))}
        <div
          className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs"
          style={{ background: "rgba(99,102,241,0.1)", color: "#6366F1" }}
        >
          <Clock className="w-3.5 h-3.5" />
          {data.tz}
        </div>
      </div>

      {/* Region KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Leads", value: data.leads.toLocaleString(), icon: Users, color: "#00C9B1" },
          { label: "Conv. Rate", value: data.convRate, icon: TrendingUp, color: "#10B981" },
          { label: "Avg Response", value: data.avgResponse, icon: Clock, color: data.slaBreaches > 5 ? "#EF4444" : "#F59E0B" },
          { label: "SLA Breaches", value: data.slaBreaches.toString(), icon: AlertTriangle, color: data.slaBreaches > 5 ? "#EF4444" : "#F59E0B" },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-white rounded-2xl p-4" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${kpi.color}18` }}>
                  <Icon className="w-4 h-4" style={{ color: kpi.color }} />
                </div>
              </div>
              <div className="text-xl font-bold" style={{ color: "#0F172A" }}>{kpi.value}</div>
              <div className="text-xs mt-0.5" style={{ color: "#64748B" }}>{kpi.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance chart */}
        <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <h3 className="font-bold text-sm mb-1" style={{ color: "#0F172A" }}>{region} — Leads vs Conversions</h3>
          <p className="text-xs mb-4" style={{ color: "#64748B" }}>Monthly performance</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.performance} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "10px", fontSize: "11px" }} />
              <Bar dataKey="leads" fill="#E2E8F0" radius={[4, 4, 0, 0]} name="Leads" />
              <Bar dataKey="conv" fill="#00C9B1" radius={[4, 4, 0, 0]} name="Conversions" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Routing rules */}
        <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <h3 className="font-bold text-sm mb-4" style={{ color: "#0F172A" }}>Active Routing Rules — {region}</h3>
          <div className="space-y-2">
            {rules.map((rule, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "rgba(0,201,177,0.05)", border: "1px solid rgba(0,201,177,0.15)" }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#00C9B1", fontSize: "10px", color: "white", fontWeight: 700 }}>
                  {i + 1}
                </div>
                <span className="text-xs" style={{ color: "#334155" }}>{rule}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between p-3 rounded-xl" style={{ background: "#F8FAFC", border: "1px solid #E8EDF5" }}>
            <span className="text-xs" style={{ color: "#64748B" }}>Revenue attributed</span>
            <span className="text-sm font-bold" style={{ color: "#10B981" }}>{data.revenue}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: SLA & Performance ──────────────────────────────────────────────────
function SLATab() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((p) => p + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const slaTimers = [
    { id: "LD-4820", name: "Sarah Thornton", elapsed: 2880 + tick, target: 720, breach: true },
    { id: "LD-4822", name: "Omar Al-Hamdan", elapsed: 180 + tick, target: 720, breach: false },
    { id: "LD-4823", name: "Lucy Park", elapsed: 600 + tick, target: 720, breach: false },
  ];

  function fmt(sec: number) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  }

  return (
    <div className="space-y-6">
      {/* SLA Timers */}
      <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-2 mb-5">
          <TimerIcon className="w-4 h-4" style={{ color: "#EF4444" }} />
          <h3 className="font-bold text-sm" style={{ color: "#0F172A" }}>Live SLA Timers</h3>
          <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Live
          </span>
        </div>
        <div className="space-y-4">
          {slaTimers.map((sla) => {
            const pct = Math.min((sla.elapsed / sla.target) * 100, 100);
            return (
              <div key={sla.id} className="p-4 rounded-xl" style={{ border: `1px solid ${sla.breach ? "rgba(239,68,68,0.3)" : "#E8EDF5"}`, background: sla.breach ? "rgba(239,68,68,0.03)" : "white" }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs" style={{ color: "#6366F1" }}>{sla.id}</span>
                    <span className="text-sm font-semibold" style={{ color: "#0F172A" }}>{sla.name}</span>
                    {sla.breach && <SeverityBadge severity="critical" />}
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-sm" style={{ color: sla.breach ? "#EF4444" : "#F59E0B" }}>
                      {fmt(sla.elapsed)}
                    </div>
                    <div className="text-xs" style={{ color: "#94A3B8" }}>SLA target: {fmt(sla.target)}</div>
                  </div>
                </div>
                <div className="h-2.5 rounded-full" style={{ background: "#F1F5F9" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${pct}%`,
                      background: sla.breach ? "linear-gradient(90deg, #F59E0B, #EF4444)" : "linear-gradient(90deg, #10B981, #00C9B1)",
                    }}
                  />
                </div>
                {sla.breach && (
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs" style={{ color: "#EF4444" }}>⚠ Breached by {fmt(sla.elapsed - sla.target)}</span>
                    <button className="text-xs px-3 py-1 rounded-lg font-medium" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>
                      Escalate Now
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Agent performance */}
      <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <h3 className="font-bold text-sm mb-5" style={{ color: "#0F172A" }}>Agent Performance Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                {["Agent", "Leads", "Responded", "Avg Time", "SLA Breaches", "Score"].map((h) => (
                  <th key={h} className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "#94A3B8", fontSize: "10px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slaAgents.sort((a, b) => b.score - a.score).map((agent) => (
                <tr key={agent.name} className="hover:bg-slate-50 transition-colors" style={{ borderBottom: "1px solid #F8FAFC" }}>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(99,102,241,0.1)" }}>
                        <User className="w-3.5 h-3.5" style={{ color: "#6366F1" }} />
                      </div>
                      <span className="text-sm font-medium" style={{ color: "#0F172A" }}>{agent.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-sm" style={{ color: "#334155" }}>{agent.leads}</td>
                  <td className="py-3 px-3 text-sm" style={{ color: "#334155" }}>{agent.responded}</td>
                  <td className="py-3 px-3">
                    <span className="text-sm" style={{ color: parseFloat(agent.avgTime) > 10 ? "#EF4444" : "#334155" }}>
                      {agent.avgTime}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: agent.breaches === 0 ? "rgba(16,185,129,0.1)" : agent.breaches > 4 ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)",
                        color: agent.breaches === 0 ? "#10B981" : agent.breaches > 4 ? "#EF4444" : "#F59E0B",
                      }}
                    >
                      {agent.breaches}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full" style={{ background: "#F1F5F9", minWidth: "60px" }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${agent.score}%`,
                            background: agent.score >= 90 ? "#10B981" : agent.score >= 75 ? "#F59E0B" : "#EF4444",
                          }}
                        />
                      </div>
                      <span className="text-xs font-bold" style={{ color: agent.score >= 90 ? "#10B981" : agent.score >= 75 ? "#F59E0B" : "#EF4444" }}>
                        {agent.score}
                      </span>
                    </div>
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

// ─── Tab: System Transparency ────────────────────────────────────────────────
function TransparencyTab() {
  return (
    <div className="space-y-6">
      {/* Integration status badges */}
      <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <h3 className="font-bold text-sm mb-4" style={{ color: "#0F172A" }}>Integration Status Badges</h3>
        <div className="flex flex-wrap gap-3">
          {integrationBadges.map((badge) => (
            <div
              key={badge.name}
              className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ border: `1px solid ${badge.color}30`, background: `${badge.color}08` }}
            >
              {badge.verified ? <ShieldCheck className="w-3.5 h-3.5" style={{ color: badge.color }} /> : <XCircle className="w-3.5 h-3.5" style={{ color: badge.color }} />}
              <div>
                <div className="text-xs font-semibold" style={{ color: "#0F172A" }}>{badge.name}</div>
                <div className="text-xs" style={{ color: badge.color }}>{badge.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit log */}
      <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" style={{ color: "#6366F1" }} />
            <h3 className="font-bold text-sm" style={{ color: "#0F172A" }}>Audit Log — Full Traceability</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: "#F8FAFC", border: "1px solid #E8EDF5" }}>
              <Search className="w-3 h-3" style={{ color: "#94A3B8" }} />
              <input placeholder="Search logs..." className="bg-transparent text-xs outline-none" style={{ color: "#334155", width: "140px" }} />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ background: "rgba(99,102,241,0.1)", color: "#6366F1" }}>
              <Filter className="w-3 h-3" /> Filter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                {["Audit ID", "User", "Action", "Target", "IP Address", "Time", "Severity"].map((h) => (
                  <th key={h} className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "#94A3B8", fontSize: "10px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors cursor-pointer" style={{ borderBottom: "1px solid #F8FAFC" }}>
                  <td className="py-3 px-3 font-mono text-xs" style={{ color: "#6366F1" }}>{log.id}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: "rgba(99,102,241,0.1)" }}>
                        {log.user === "System" ? <Cpu className="w-3 h-3" style={{ color: "#6366F1" }} /> : <User className="w-3 h-3" style={{ color: "#6366F1" }} />}
                      </div>
                      <span className="text-xs" style={{ color: "#334155" }}>{log.user}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-xs font-medium" style={{ color: "#0F172A" }}>{log.action}</td>
                  <td className="py-3 px-3 text-xs" style={{ color: "#64748B" }}>{log.target}</td>
                  <td className="py-3 px-3 font-mono text-xs" style={{ color: "#94A3B8" }}>{log.ip}</td>
                  <td className="py-3 px-3 font-mono text-xs" style={{ color: "#94A3B8" }}>{log.ts}</td>
                  <td className="py-3 px-3"><SeverityBadge severity={log.severity} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Data Flow Visualization ────────────────────────────────────────────
function DataFlowTab() {
  const [activeFlow, setActiveFlow] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [animStep, setAnimStep] = useState(-1);

  const flowSteps = [
    { id: 0, label: "Lead Source", sub: "Facebook / Google / Website", color: "#6366F1", icon: Globe, x: 60, y: 120 },
    { id: 1, label: "WhatsApp API", sub: "Inbound trigger", color: "#00C9B1", icon: MessageSquare, x: 220, y: 60 },
    { id: 2, label: "Lead Capture", sub: "Auto-qualify + score", color: "#00A3E0", icon: Zap, x: 380, y: 120 },
    { id: 3, label: "CRM Sync", sub: "Zoho / SF / HubSpot", color: "#EC4899", icon: Link2, x: 540, y: 60 },
    { id: 4, label: "Agent Assign", sub: "Routing engine", color: "#F59E0B", icon: Users, x: 700, y: 120 },
    { id: 5, label: "Follow-up", sub: "WA + Email + SMS", color: "#8B5CF6", icon: RefreshCw, x: 540, y: 180 },
    { id: 6, label: "Conversion", sub: "Closed deal", color: "#10B981", icon: CheckCircle, x: 700, y: 220 },
  ];

  const connections = [
    [0, 1], [0, 2], [1, 2], [2, 3], [2, 4], [3, 4], [4, 5], [4, 6], [5, 6],
  ];

  function startAnimation() {
    setAnimating(true);
    setAnimStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setAnimStep(step);
      if (step >= flowSteps.length - 1) {
        clearInterval(interval);
        setTimeout(() => { setAnimating(false); setAnimStep(-1); }, 1000);
      }
    }, 700);
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-sm" style={{ color: "#0F172A" }}>Data Flow Architecture</h3>
            <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
              Source → WhatsApp → Lead Capture → CRM → Follow-up → Conversion
            </p>
          </div>
          <button
            onClick={startAnimation}
            disabled={animating}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: animating ? "rgba(0,201,177,0.1)" : "linear-gradient(135deg, #00C9B1, #00A3E0)",
              color: animating ? "#00C9B1" : "white",
            }}
          >
            {animating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            {animating ? "Simulating..." : "Simulate Flow"}
          </button>
        </div>

        {/* SVG Flow Diagram */}
        <div className="overflow-x-auto">
          <svg width="780" height="300" style={{ minWidth: "780px" }}>
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#CBD5E1" />
              </marker>
              <marker id="arrow-active" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#00C9B1" />
              </marker>
              {flowSteps.map((node) => (
                <radialGradient key={`grad-${node.id}`} id={`nodeGrad-${node.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={node.color} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={node.color} stopOpacity={0.08} />
                </radialGradient>
              ))}
            </defs>

            {/* Connections */}
            {connections.map(([from, to], i) => {
              const src = flowSteps[from];
              const tgt = flowSteps[to];
              const isActive = animStep >= to;
              return (
                <line
                  key={i}
                  x1={src.x + 45} y1={src.y + 30}
                  x2={tgt.x + 45} y2={tgt.y + 30}
                  stroke={isActive ? "#00C9B1" : "#E2E8F0"}
                  strokeWidth={isActive ? 2 : 1.5}
                  strokeDasharray={isActive ? "none" : "5,4"}
                  markerEnd={isActive ? "url(#arrow-active)" : "url(#arrow)"}
                  style={{ transition: "stroke 0.4s" }}
                />
              );
            })}

            {/* Nodes */}
            {flowSteps.map((node) => {
              const Icon = node.icon;
              const isActive = animStep >= node.id;
              const isCurrent = animStep === node.id;
              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveFlow(activeFlow === node.id ? null : node.id)}
                >
                  <rect
                    width="90" height="60" rx="12"
                    fill={isActive ? `url(#nodeGrad-${node.id})` : "white"}
                    stroke={isActive ? node.color : "#E2E8F0"}
                    strokeWidth={isCurrent ? 2.5 : 1.5}
                    style={{
                      filter: isCurrent ? `drop-shadow(0 0 8px ${node.color}60)` : "none",
                      transition: "all 0.4s",
                    }}
                  />
                  <text x="45" y="22" textAnchor="middle" fontSize="10" fontWeight="600"
                    fill={isActive ? node.color : "#94A3B8"}
                    style={{ transition: "fill 0.4s" }}
                  >
                    {node.label}
                  </text>
                  <text x="45" y="38" textAnchor="middle" fontSize="8.5"
                    fill={isActive ? "#334155" : "#CBD5E1"}
                    style={{ transition: "fill 0.4s" }}
                  >
                    {node.sub.length > 16 ? node.sub.slice(0, 16) + "…" : node.sub}
                  </text>
                  {isCurrent && (
                    <circle cx="80" cy="10" r="5" fill="#00C9B1">
                      <animate attributeName="opacity" values="1;0;1" dur="0.8s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {isActive && !isCurrent && (
                    <circle cx="80" cy="10" r="4" fill="#10B981" />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4" style={{ borderTop: "1px solid #F1F5F9" }}>
          {flowSteps.map((node) => (
            <div key={node.id} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded" style={{ background: node.color }} />
              <span className="text-xs" style={{ color: "#64748B" }}>{node.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Flow breakdown cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Inbound Flow", desc: "Lead sources → trigger → capture", steps: ["Website form submitted", "WhatsApp opt-in triggered", "Lead score calculated", "Lead record created in system"], color: "#6366F1" },
          { title: "Processing Flow", desc: "Routing → CRM → assignment", steps: ["Lead qualified by AI router", "CRM record synced (Zoho/SF)", "Agent assigned based on region", "SLA timer started"], color: "#00C9B1" },
          { title: "Outbound Flow", desc: "Contact → follow-up → convert", steps: ["WhatsApp intro message sent", "Email follow-up scheduled", "Agent contacts lead", "Status updated to Converted"], color: "#10B981" },
        ].map((flow) => (
          <div key={flow.title} className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-8 rounded-full" style={{ background: flow.color }} />
              <div>
                <h4 className="font-bold text-sm" style={{ color: "#0F172A" }}>{flow.title}</h4>
                <p className="text-xs" style={{ color: "#64748B" }}>{flow.desc}</p>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              {flow.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-white" style={{ background: flow.color, fontSize: "9px" }}>
                    {i + 1}
                  </div>
                  <span className="text-xs" style={{ color: "#334155" }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

const tabs = [
  { id: "comm-engine", label: "Comm Engine", icon: Terminal, shortLabel: "Comm" },
  { id: "integration-health", label: "Integration Health", icon: Server, shortLabel: "Integrations" },
  { id: "lead-lifecycle", label: "Lead Lifecycle", icon: GitBranch, shortLabel: "Lifecycle" },
  { id: "alerts", label: "Real-Time Alerts", icon: Bell, shortLabel: "Alerts" },
  { id: "multi-region", label: "Multi-Region", icon: Map, shortLabel: "Regions" },
  { id: "sla", label: "SLA & Performance", icon: TimerIcon, shortLabel: "SLA" },
  { id: "transparency", label: "Transparency", icon: Eye, shortLabel: "Audit" },
  { id: "data-flow", label: "Data Flow", icon: Activity, shortLabel: "Flow" },
];

export function SystemLayer() {
  const [activeTab, setActiveTab] = useState("comm-engine");

  return (
    <div className="space-y-5">
      {/* Header */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A1628 0%, #0D1F3C 40%, #1a0a3c 80%, #0F2547 100%)",
          boxShadow: "0 20px 60px rgba(10,22,40,0.4)",
        }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #6366F1, transparent)", transform: "translate(30%, -30%)" }} />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(99,102,241,0.25)", color: "#A78BFA" }}>
                ● C-PaaS System Layer
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Advanced System Visibility
            </h1>
            <p className="text-sm" style={{ color: "#94A3B8" }}>
              Live operational transparency · Integration health · Data flows · SLA monitoring
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "APIs Live", value: "7/8", color: "#10B981" },
              { label: "Active Alerts", value: String(alerts.length), color: "#EF4444" },
              { label: "Uptime", value: "99.4%", color: "#00C9B1" },
            ].map((stat) => (
              <div key={stat.label} className="text-center px-4 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.07)" }}>
                <div className="font-bold text-lg" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs" style={{ color: "#64748B" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl p-1.5 flex gap-1 flex-wrap" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all flex-1"
              style={{
                background: isActive ? "linear-gradient(135deg, rgba(0,201,177,0.15), rgba(99,102,241,0.15))" : "transparent",
                color: isActive ? "#0F172A" : "#94A3B8",
                border: isActive ? "1px solid rgba(0,201,177,0.25)" : "1px solid transparent",
                minWidth: "80px",
                justifyContent: "center",
              }}
            >
              <Icon className="w-3.5 h-3.5" style={{ color: isActive ? "#00C9B1" : "#94A3B8" }} />
              <span className="hidden sm:inline">{tab.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {activeTab === "comm-engine" && <CommEngineTab />}
      {activeTab === "integration-health" && <IntegrationHealthTab />}
      {activeTab === "lead-lifecycle" && <LeadLifecycleTab />}
      {activeTab === "alerts" && <AlertsTab />}
      {activeTab === "multi-region" && <MultiRegionTab />}
      {activeTab === "sla" && <SLATab />}
      {activeTab === "transparency" && <TransparencyTab />}
      {activeTab === "data-flow" && <DataFlowTab />}
    </div>
  );
}
