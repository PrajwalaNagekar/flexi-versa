import { useState } from "react";
import {
  Phone,
  PhoneCall,
  PhoneOff,
  PhoneIncoming,
  Mic,
  Volume2,
  Settings,
  Play,
  Pause,
  Plus,
  Clock,
  CheckCircle,
  Users,
  BarChart3,
  Activity,
  ArrowUp,
  Voicemail,
  Radio,
  Cpu,
  Globe,
  Download,
  Filter,
  Star,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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

const callLogs = [
  { id: "call_001", contact: "Riya Sharma", phone: "+971 50 123 4567", type: "outbound", duration: "4:23", status: "answered", time: "10:26 AM", sentiment: "positive", agent: "AI Voice Bot", outcome: "Demo Scheduled" },
  { id: "call_002", contact: "Ahmed Al-Rashid", phone: "+971 55 987 6543", type: "outbound", duration: "2:15", status: "answered", time: "10:18 AM", sentiment: "neutral", agent: "Sarah (Human)", outcome: "Follow-up Required" },
  { id: "call_003", contact: "Priya Menon", phone: "+971 52 345 6789", type: "inbound", duration: "6:45", status: "answered", time: "10:05 AM", sentiment: "positive", agent: "AI Voice Bot", outcome: "Converted" },
  { id: "call_004", contact: "Khalid Ibrahim", phone: "+971 56 789 0123", type: "outbound", duration: "0:30", status: "voicemail", time: "9:52 AM", sentiment: "—", agent: "AI Voice Bot", outcome: "Voicemail Left" },
  { id: "call_005", contact: "Sara Al-Zaabi", phone: "+971 50 234 5678", type: "outbound", duration: "8:12", status: "answered", time: "9:45 AM", sentiment: "positive", agent: "Mohammed (Human)", outcome: "Deal Closed" },
  { id: "call_006", contact: "Mohammed Tariq", phone: "+971 55 456 7890", type: "inbound", duration: "3:20", status: "answered", time: "9:30 AM", sentiment: "negative", agent: "AI Voice Bot", outcome: "Escalated" },
  { id: "call_007", contact: "Fatima Hassan", phone: "+971 52 567 8901", type: "outbound", duration: "—", status: "no-answer", time: "9:15 AM", sentiment: "—", agent: "AI Voice Bot", outcome: "Retry Scheduled" },
  { id: "call_008", contact: "Omar Khoury", phone: "+971 56 678 9012", type: "outbound", duration: "5:33", status: "answered", time: "9:00 AM", sentiment: "positive", agent: "AI Voice Bot", outcome: "Trial Started" },
];

const callMetrics = [
  { hour: "06", calls: 12, answered: 8, avg_dur: 2.1 },
  { hour: "07", calls: 28, answered: 22, avg_dur: 3.4 },
  { hour: "08", calls: 65, answered: 58, avg_dur: 4.2 },
  { hour: "09", calls: 120, answered: 108, avg_dur: 5.1 },
  { hour: "10", calls: 145, answered: 131, avg_dur: 4.8 },
  { hour: "11", calls: 138, answered: 124, avg_dur: 5.3 },
  { hour: "12", calls: 95, answered: 85, avg_dur: 3.9 },
  { hour: "13", calls: 110, answered: 99, avg_dur: 4.5 },
];

const voiceKPIs = [
  { label: "Calls Today", val: "1,248", change: "+12%", color: "#00C9B1", icon: PhoneCall },
  { label: "Avg Duration", val: "4m 32s", change: "+8%", color: "#6366F1", icon: Clock },
  { label: "Answer Rate", val: "87.4%", change: "+3.2%", color: "#10B981", icon: CheckCircle },
  { label: "AI Call Share", val: "73%", change: "+15%", color: "#F59E0B", icon: Cpu },
];

const ivrNodes = [
  { id: "ivr1", label: "Welcome Greeting", type: "greeting", action: "Play: 'Thank you for calling Flexi Versa...'" },
  { id: "ivr2", label: "Main Menu", type: "menu", action: "Press 1: Sales, 2: Support, 3: Billing, 0: Agent" },
  { id: "ivr3", label: "Sales Route", type: "route", action: "Connect to: AI Sales Bot → Human (if busy)" },
  { id: "ivr4", label: "Support Route", type: "route", action: "Connect to: AI Support Bot → Ticket System" },
  { id: "ivr5", label: "Billing Route", type: "route", action: "Connect to: Billing AI → Human Agent" },
];

const aiVoiceScripts = [
  { id: "scr1", name: "Sales Pitch v3", lang: "English", calls: 12450, conversion: "23.4%", status: "active" },
  { id: "scr2", name: "Support Triage", lang: "English + Arabic", calls: 8920, conversion: "N/A", status: "active" },
  { id: "scr3", name: "Follow-up Reminder", lang: "English", calls: 5430, conversion: "18.2%", status: "active" },
  { id: "scr4", name: "Payment Recovery", lang: "English", calls: 3200, conversion: "31.5%", status: "active" },
  { id: "scr5", name: "Survey Collection", lang: "Multi-lingual", calls: 2100, conversion: "N/A", status: "draft" },
];

const sentimentDist = [
  { name: "Positive", value: 58, color: "#10B981" },
  { name: "Neutral", value: 27, color: "#F59E0B" },
  { name: "Negative", value: 15, color: "#EF4444" },
];

const statusConfig: Record<string, { bg: string; text: string }> = {
  answered: { bg: "rgba(16,185,129,0.1)", text: "#10B981" },
  voicemail: { bg: "rgba(245,158,11,0.1)", text: "#F59E0B" },
  "no-answer": { bg: "rgba(239,68,68,0.1)", text: "#EF4444" },
  missed: { bg: "rgba(239,68,68,0.1)", text: "#EF4444" },
};

export function VoiceSolutions() {
  const [activeTab, setActiveTab] = useState<"logs" | "ivr" | "ai" | "analytics">("logs");
  const [callType, setCallType] = useState("all");

  const filteredCalls = callType === "all" ? callLogs : callLogs.filter(c => c.type === callType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="rounded-2xl p-7 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A1628 0%, #1A0A00 50%, #0A1628 100%)",
          boxShadow: "0 20px 60px rgba(10,22,40,0.35)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #F59E0B, transparent)", transform: "translate(25%, -25%)" }}
        />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"
                style={{ background: "rgba(245,158,11,0.2)", color: "#F59E0B" }}
              >
                <Cpu className="w-3 h-3" />
                AI-Powered Voice · ElevenLabs + Twilio
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Voice Solutions
            </h1>
            <p className="text-sm" style={{ color: "#94A3B8" }}>
              AI-driven voice calls, IVR automation, and real-time conversation analytics
            </p>
          </div>
          <div className="flex gap-4 text-center">
            {[
              { label: "Live Calls", val: "7", color: "#10B981" },
              { label: "Today", val: "1,248", color: "#00C9B1" },
              { label: "AI Rate", val: "73%", color: "#F59E0B" },
            ].map((s) => (
              <div key={s.label} className="text-center px-4">
                <div className="text-2xl font-bold" style={{ color: s.color }}>{s.val}</div>
                <div className="text-xs" style={{ color: "#94A3B8" }}>{s.label}</div>
              </div>
            ))}
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: "linear-gradient(135deg, #F59E0B, #EC4899)", color: "white", boxShadow: "0 4px 15px rgba(245,158,11,0.4)" }}
            >
              <PhoneCall className="w-4 h-4" /> New Call
            </button>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {voiceKPIs.map((kpi) => {
          const KpiIcon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="bg-white rounded-2xl p-5"
              style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${kpi.color}15` }}>
                  <KpiIcon className="w-4 h-4" style={{ color: kpi.color }} />
                </div>
                <span className="text-xs font-semibold flex items-center gap-0.5" style={{ color: "#10B981" }}>
                  <ArrowUp className="w-3 h-3" />{kpi.change}
                </span>
              </div>
              <div className="font-bold text-xl" style={{ color: kpi.color }}>{kpi.val}</div>
              <div className="text-xs mt-0.5" style={{ color: "#64748B" }}>{kpi.label}</div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { id: "logs", label: "Call Logs", icon: Phone },
          { id: "ivr", label: "IVR Builder", icon: Radio },
          { id: "ai", label: "AI Scripts", icon: Cpu },
          { id: "analytics", label: "Analytics", icon: BarChart3 },
        ].map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                background: activeTab === tab.id ? "linear-gradient(135deg, #F59E0B, #EC4899)" : "white",
                color: activeTab === tab.id ? "white" : "#64748B",
                border: "1px solid #E8EDF5",
                boxShadow: activeTab === tab.id ? "0 4px 15px rgba(245,158,11,0.3)" : "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <TabIcon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Call Logs */}
      {activeTab === "logs" && (
        <div className="space-y-4">
          <div
            className="bg-white rounded-2xl overflow-hidden"
            style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
          >
            <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: "#F1F5F9" }}>
              <h3 className="font-bold" style={{ color: "#0F172A" }}>Recent Call Logs</h3>
              <div className="flex gap-2">
                {["all", "outbound", "inbound"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setCallType(t)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize"
                    style={{
                      background: callType === t ? "#0F172A" : "#F8FAFC",
                      color: callType === t ? "white" : "#64748B",
                    }}
                  >
                    {t}
                  </button>
                ))}
                <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg" style={{ background: "#F8FAFC", color: "#64748B" }}>
                  <Download className="w-3.5 h-3.5" /> Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                    {["Contact", "Phone", "Type", "Duration", "Status", "Time", "Agent", "Sentiment", "Outcome"].map((h) => (
                      <th key={h} className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "#94A3B8" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredCalls.map((call) => {
                    const st = statusConfig[call.status];
                    return (
                      <tr key={call.id} className="border-b hover:bg-slate-50 transition-colors" style={{ borderColor: "#F8FAFC" }}>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                              style={{ background: call.type === "inbound" ? "#00C9B1" : "#6366F1" }}
                            >
                              {call.contact.split(" ").map(n => n[0]).join("").slice(0, 2)}
                            </div>
                            <span className="text-sm font-medium" style={{ color: "#0F172A" }}>{call.contact}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-xs font-mono" style={{ color: "#64748B" }}>{call.phone}</td>
                        <td className="py-3 px-4">
                          <span
                            className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full w-fit"
                            style={{
                              background: call.type === "inbound" ? "rgba(0,201,177,0.1)" : "rgba(99,102,241,0.1)",
                              color: call.type === "inbound" ? "#00C9B1" : "#6366F1",
                            }}
                          >
                            {call.type === "inbound" ? <PhoneIncoming className="w-3 h-3" /> : <PhoneCall className="w-3 h-3" />}
                            {call.type}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm" style={{ color: "#334155" }}>{call.duration}</td>
                        <td className="py-3 px-4">
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-semibold"
                            style={{ background: st?.bg, color: st?.text }}
                          >
                            {call.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs" style={{ color: "#94A3B8" }}>{call.time}</td>
                        <td className="py-3 px-4">
                          <span
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              background: call.agent === "AI Voice Bot" ? "rgba(245,158,11,0.1)" : "rgba(99,102,241,0.1)",
                              color: call.agent === "AI Voice Bot" ? "#F59E0B" : "#6366F1",
                            }}
                          >
                            {call.agent}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {call.sentiment !== "—" && (
                            <span
                              className="text-xs"
                              style={{
                                color: call.sentiment === "positive" ? "#10B981" : call.sentiment === "negative" ? "#EF4444" : "#F59E0B",
                              }}
                            >
                              {call.sentiment === "positive" ? "😊" : call.sentiment === "negative" ? "😞" : "😐"} {call.sentiment}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-xs" style={{ color: "#64748B" }}>{call.outcome}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* IVR Builder */}
      {activeTab === "ivr" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            className="bg-white rounded-2xl p-6"
            style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold" style={{ color: "#0F172A" }}>IVR Flow Builder</h3>
              <button
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
                style={{ background: "linear-gradient(135deg, #F59E0B, #EC4899)", color: "white" }}
              >
                <Plus className="w-3.5 h-3.5" /> Add Node
              </button>
            </div>
            <div className="relative">
              {ivrNodes.map((node, i) => {
                const colors: Record<string, string> = { greeting: "#00C9B1", menu: "#6366F1", route: "#F59E0B", action: "#EC4899" };
                const nodeColor = colors[node.type] || "#64748B";
                return (
                  <div key={node.id} className="relative">
                    <div
                      className="flex items-start gap-3 p-4 rounded-xl mb-2 group hover:shadow-sm transition-all cursor-pointer"
                      style={{
                        border: `1px solid ${nodeColor}30`,
                        background: `${nodeColor}08`,
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `${nodeColor}20` }}
                      >
                        {node.type === "greeting" ? <Volume2 className="w-4 h-4" style={{ color: nodeColor }} /> :
                          node.type === "menu" ? <Radio className="w-4 h-4" style={{ color: nodeColor }} /> :
                            <Phone className="w-4 h-4" style={{ color: nodeColor }} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm" style={{ color: "#0F172A" }}>{node.label}</span>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full capitalize"
                            style={{ background: `${nodeColor}15`, color: nodeColor }}
                          >
                            {node.type}
                          </span>
                        </div>
                        <p className="text-xs" style={{ color: "#64748B" }}>{node.action}</p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 rounded" style={{ background: "#F8FAFC" }}>
                          <Settings className="w-3.5 h-3.5" style={{ color: "#94A3B8" }} />
                        </button>
                      </div>
                    </div>
                    {i < ivrNodes.length - 1 && (
                      <div className="flex items-center gap-2 mb-2 ml-7">
                        <div className="w-0.5 h-4" style={{ background: "#CBD5E1" }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <button
              className="w-full py-3 rounded-xl text-sm font-semibold mt-4"
              style={{ background: "linear-gradient(135deg, #F59E0B, #EC4899)", color: "white" }}
            >
              Save IVR Flow
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E8EDF5" }}>
              <h4 className="font-bold mb-4" style={{ color: "#0F172A" }}>IVR Statistics</h4>
              {[
                { label: "Calls handled by IVR", val: "73%", color: "#F59E0B" },
                { label: "Avg IVR containment", val: "61%", color: "#10B981" },
                { label: "Menu completion rate", val: "84%", color: "#6366F1" },
                { label: "Drop-off rate", val: "12%", color: "#EF4444" },
                { label: "Escalation to human", val: "27%", color: "#8B5CF6" },
              ].map((s) => (
                <div key={s.label} className="flex justify-between py-2 border-b last:border-0" style={{ borderColor: "#F8FAFC" }}>
                  <span className="text-sm" style={{ color: "#64748B" }}>{s.label}</span>
                  <span className="text-sm font-bold" style={{ color: s.color }}>{s.val}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E8EDF5" }}>
              <h4 className="font-bold mb-3" style={{ color: "#0F172A" }}>Voice Provider Setup</h4>
              <div className="space-y-3">
                {[
                  { name: "Twilio Voice", status: "active", latency: "245ms", calls: "1,248 today" },
                  { name: "ElevenLabs AI", status: "active", latency: "180ms", calls: "912 AI calls" },
                  { name: "AWS Polly", status: "standby", latency: "—", calls: "Fallback" },
                ].map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ border: "1px solid #F1F5F9", background: "#FAFBFC" }}
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: p.status === "active" ? "#10B981" : "#94A3B8" }}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>{p.name}</p>
                      <p className="text-xs" style={{ color: "#94A3B8" }}>{p.latency} · {p.calls}</p>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full capitalize"
                      style={{
                        background: p.status === "active" ? "rgba(16,185,129,0.1)" : "rgba(148,163,184,0.1)",
                        color: p.status === "active" ? "#10B981" : "#94A3B8",
                      }}
                    >
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Scripts */}
      {activeTab === "ai" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            className="lg:col-span-2 bg-white rounded-2xl overflow-hidden"
            style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
          >
            <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: "#F1F5F9" }}>
              <h3 className="font-bold" style={{ color: "#0F172A" }}>AI Voice Scripts</h3>
              <button
                className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl"
                style={{ background: "linear-gradient(135deg, #F59E0B, #EC4899)", color: "white" }}
              >
                <Plus className="w-4 h-4" /> New Script
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                    {["Script Name", "Language", "Total Calls", "Conversion", "Status", "Actions"].map((h) => (
                      <th key={h} className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "#94A3B8" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {aiVoiceScripts.map((script) => (
                    <tr key={script.id} className="border-b hover:bg-slate-50 transition-colors" style={{ borderColor: "#F8FAFC" }}>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(245,158,11,0.1)" }}>
                            <Mic className="w-3.5 h-3.5" style={{ color: "#F59E0B" }} />
                          </div>
                          <span className="text-sm font-medium" style={{ color: "#0F172A" }}>{script.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm" style={{ color: "#64748B" }}>{script.lang}</td>
                      <td className="py-3 px-4 text-sm font-semibold" style={{ color: "#334155" }}>{script.calls.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        {script.conversion !== "N/A" ? (
                          <span className="text-sm font-bold" style={{ color: "#10B981" }}>{script.conversion}</span>
                        ) : (
                          <span className="text-sm" style={{ color: "#94A3B8" }}>N/A</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full capitalize"
                          style={{
                            background: script.status === "active" ? "rgba(16,185,129,0.1)" : "rgba(148,163,184,0.1)",
                            color: script.status === "active" ? "#10B981" : "#94A3B8",
                          }}
                        >
                          {script.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1">
                          <button className="p-1.5 rounded-lg" style={{ background: "#F8FAFC" }}>
                            <Play className="w-3.5 h-3.5" style={{ color: "#10B981" }} />
                          </button>
                          <button className="p-1.5 rounded-lg" style={{ background: "#F8FAFC" }}>
                            <Settings className="w-3.5 h-3.5" style={{ color: "#94A3B8" }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E8EDF5" }}>
              <h4 className="font-bold mb-4" style={{ color: "#0F172A" }}>Call Sentiment</h4>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={sentimentDist} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                    {sentimentDist.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "10px", fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
              {sentimentDist.map((s) => (
                <div key={s.name} className="flex justify-between py-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                    <span className="text-xs" style={{ color: "#64748B" }}>{s.name}</span>
                  </div>
                  <span className="text-xs font-bold" style={{ color: s.color }}>{s.value}%</span>
                </div>
              ))}
            </div>
            <div
              className="rounded-2xl p-5"
              style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.1), rgba(236,72,153,0.1))", border: "1px solid rgba(245,158,11,0.2)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-4 h-4" style={{ color: "#F59E0B" }} />
                <span className="font-semibold text-sm" style={{ color: "#0F172A" }}>AI Voice Engine</span>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { label: "Voice Model", val: "ElevenLabs Rachel" },
                  { label: "Language", val: "EN, AR, FR, ES" },
                  { label: "Avg Response", val: "180ms" },
                  { label: "CSAT Score", val: "4.6 / 5.0" },
                ].map((d) => (
                  <div key={d.label} className="flex justify-between">
                    <span style={{ color: "#94A3B8" }}>{d.label}</span>
                    <span className="font-semibold" style={{ color: "#334155" }}>{d.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #E8EDF5" }}>
            <h3 className="font-bold mb-1" style={{ color: "#0F172A" }}>Hourly Call Volume</h3>
            <p className="text-xs mb-4" style={{ color: "#64748B" }}>Total vs Answered calls by hour (today)</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={callMetrics} barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="hour" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "12px", fontSize: "12px" }} />
                <Legend />
                <Bar dataKey="calls" fill="#E8EDF5" radius={[4, 4, 0, 0]} name="Total Calls" />
                <Bar dataKey="answered" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Answered" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #E8EDF5" }}>
            <h3 className="font-bold mb-1" style={{ color: "#0F172A" }}>Avg Call Duration</h3>
            <p className="text-xs mb-4" style={{ color: "#64748B" }}>Average call duration by hour (minutes)</p>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={callMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="hour" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "12px", fontSize: "12px" }} formatter={(v: any) => [`${v} min`, "Duration"]} />
                <Line type="monotone" dataKey="avg_dur" stroke="#EC4899" strokeWidth={2.5} dot={{ fill: "#EC4899", r: 4 }} name="Avg Duration (min)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div
            className="lg:col-span-2 bg-white rounded-2xl p-6"
            style={{ border: "1px solid #E8EDF5" }}
          >
            <h3 className="font-bold mb-4" style={{ color: "#0F172A" }}>Voice Performance Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Calls (Month)", val: "38,450", color: "#F59E0B" },
                { label: "AI Handled", val: "28,068 (73%)", color: "#00C9B1" },
                { label: "Human Escalations", val: "10,382 (27%)", color: "#6366F1" },
                { label: "Avg Handle Time", val: "4m 32s", color: "#EC4899" },
                { label: "First Call Resolution", val: "71%", color: "#10B981" },
                { label: "Customer Satisfaction", val: "4.6 / 5.0", color: "#F59E0B" },
                { label: "Cost per Call (AI)", val: "$0.08", color: "#00C9B1" },
                { label: "Cost per Call (Human)", val: "$2.40", color: "#EF4444" },
              ].map((m) => (
                <div key={m.label} className="p-4 rounded-xl" style={{ background: "#F8FAFC", border: "1px solid #E8EDF5" }}>
                  <div className="font-bold text-lg" style={{ color: m.color }}>{m.val}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#64748B" }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
