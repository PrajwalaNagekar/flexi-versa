import { useState } from "react";
import {
  Link2,
  CheckCircle,
  RefreshCw,
  Database,
  GitBranch,
  AlertCircle,
  Plus,
  Settings,
  Activity,
  ArrowRight,
  Clock,
  Users,
  Zap,
  X,
  Globe,
  Lock,
  Eye,
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

const crmSystems = [
  {
    id: "zoho", name: "Zoho CRM", logo: "Z", logoText: "ZOHO",
    status: "connected", color: "#E8411A",
    gradient: "from-orange-600 to-red-500",
    lastSync: "2 minutes ago", leadsSynced: 45230, contactsSynced: 68900,
    syncFrequency: "Real-time", authMethod: "OAuth 2.0",
    apiEndpoint: "https://crm.zoho.com/crm/v2",
    webhookUrl: "https://api.flexiversa.com/webhook/zoho",
    features: ["Bi-directional sync", "Lead scoring", "Activity logging", "Custom fields"],
    syncHealth: 99.2,
    syncData: [
      { day: "Mon", synced: 1200 }, { day: "Tue", synced: 1450 }, { day: "Wed", synced: 980 },
      { day: "Thu", synced: 1680 }, { day: "Fri", synced: 2100 }, { day: "Sat", synced: 320 }, { day: "Sun", synced: 180 },
    ],
  },
  {
    id: "salesforce", name: "Salesforce CRM", logo: "SF", logoText: "SFORCE",
    status: "connected", color: "#00A1E0",
    gradient: "from-blue-600 to-cyan-500",
    lastSync: "5 minutes ago", leadsSynced: 28940, contactsSynced: 42100,
    syncFrequency: "Every 5 minutes", authMethod: "OAuth 2.0 + JWT",
    apiEndpoint: "https://flexiversa.salesforce.com/services/data/v58.0",
    webhookUrl: "https://api.flexiversa.com/webhook/salesforce",
    features: ["Lead object sync", "Opportunity tracking", "Task automation", "Report builder"],
    syncHealth: 97.8,
    syncData: [
      { day: "Mon", synced: 800 }, { day: "Tue", synced: 950 }, { day: "Wed", synced: 750 },
      { day: "Thu", synced: 1100 }, { day: "Fri", synced: 1380 }, { day: "Sat", synced: 200 }, { day: "Sun", synced: 90 },
    ],
  },
  {
    id: "hubspot", name: "HubSpot CRM", logo: "H", logoText: "HSPOT",
    status: "connected", color: "#FF7A59",
    gradient: "from-orange-500 to-orange-400",
    lastSync: "Just now", leadsSynced: 62450, contactsSynced: 95200,
    syncFrequency: "Real-time (Webhook)", authMethod: "API Key + OAuth",
    apiEndpoint: "https://api.hubapi.com/crm/v3",
    webhookUrl: "https://api.flexiversa.com/webhook/hubspot",
    features: ["Contact lifecycle", "Deal pipeline", "Email tracking", "Chatbot integration"],
    syncHealth: 99.8,
    syncData: [
      { day: "Mon", synced: 1800 }, { day: "Tue", synced: 2200 }, { day: "Wed", synced: 1600 },
      { day: "Thu", synced: 2500 }, { day: "Fri", synced: 3100 }, { day: "Sat", synced: 480 }, { day: "Sun", synced: 260 },
    ],
  },
  {
    id: "pipedrive", name: "Pipedrive CRM", logo: "P", logoText: "PIPED",
    status: "connected", color: "#006CAF",
    gradient: "from-blue-700 to-blue-500",
    lastSync: "12 minutes ago", leadsSynced: 18700, contactsSynced: 29400,
    syncFrequency: "Every 15 minutes", authMethod: "API Token",
    apiEndpoint: "https://api.pipedrive.com/v1",
    webhookUrl: "https://api.flexiversa.com/webhook/pipedrive",
    features: ["Pipeline stages", "Activity sync", "Email integration", "Custom fields"],
    syncHealth: 96.5,
    syncData: [
      { day: "Mon", synced: 500 }, { day: "Tue", synced: 620 }, { day: "Wed", synced: 480 },
      { day: "Thu", synced: 740 }, { day: "Fri", synced: 890 }, { day: "Sat", synced: 120 }, { day: "Sun", synced: 60 },
    ],
  },
  {
    id: "dynamics", name: "MS Dynamics 365", logo: "MS", logoText: "DYNA",
    status: "available", color: "#0078D4",
    gradient: "from-blue-600 to-indigo-500",
    lastSync: "N/A", leadsSynced: 0, contactsSynced: 0,
    syncFrequency: "Configurable", authMethod: "Azure AD OAuth",
    apiEndpoint: "https://org.crm.dynamics.com/api/data/v9.2",
    webhookUrl: "—",
    features: ["Full D365 integration", "Power Automate", "Teams integration", "AI insights"],
    syncHealth: 0,
    syncData: [],
  },
  {
    id: "custom", name: "Custom API / ERP", logo: "⚙", logoText: "CUSTOM",
    status: "available", color: "#7C3AED",
    gradient: "from-violet-600 to-purple-500",
    lastSync: "N/A", leadsSynced: 0, contactsSynced: 0,
    syncFrequency: "Configurable", authMethod: "Bearer Token / API Key",
    apiEndpoint: "Your custom endpoint",
    webhookUrl: "Configurable",
    features: ["REST API support", "GraphQL support", "Custom field mapping", "Batch operations"],
    syncHealth: 0,
    syncData: [],
  },
];

const fieldMappings = [
  { source: "Full Name", destination: "contact_name", type: "String", synced: true, direction: "bi" },
  { source: "Email Address", destination: "email", type: "Email", synced: true, direction: "bi" },
  { source: "Phone Number", destination: "phone", type: "String", synced: true, direction: "bi" },
  { source: "Company Name", destination: "company", type: "String", synced: true, direction: "bi" },
  { source: "Lead Source", destination: "source_channel", type: "Enum", synced: true, direction: "flexi_to_crm" },
  { source: "Lead Score", destination: "lead_score", type: "Number", synced: true, direction: "bi" },
  { source: "Campaign ID", destination: "campaign_ref", type: "String", synced: false, direction: "flexi_to_crm" },
  { source: "WhatsApp Status", destination: "wa_opt_in", type: "Boolean", synced: true, direction: "bi" },
  { source: "Last Interaction", destination: "last_contact_date", type: "DateTime", synced: true, direction: "flexi_to_crm" },
  { source: "Message Count", destination: "total_interactions", type: "Number", synced: false, direction: "flexi_to_crm" },
];

const syncLogs = [
  { id: "sync_001", crm: "HubSpot CRM", timestamp: "2026-04-08 10:26:30", action: "Contact Created", status: "success", records: 28 },
  { id: "sync_002", crm: "Zoho CRM", timestamp: "2026-04-08 10:26:10", action: "Lead Updated", status: "success", records: 12 },
  { id: "sync_003", crm: "Salesforce CRM", timestamp: "2026-04-08 10:25:45", action: "Opportunity Created", status: "success", records: 5 },
  { id: "sync_004", crm: "HubSpot CRM", timestamp: "2026-04-08 10:25:22", action: "Contact Enrichment", status: "success", records: 64 },
  { id: "sync_005", crm: "Zoho CRM", timestamp: "2026-04-08 10:25:00", action: "Lead Assignment", status: "warning", records: 3, note: "1 record had missing phone" },
  { id: "sync_006", crm: "Pipedrive CRM", timestamp: "2026-04-08 10:24:40", action: "Deal Stage Updated", status: "success", records: 8 },
  { id: "sync_007", crm: "Salesforce CRM", timestamp: "2026-04-08 10:24:15", action: "Task Logged", status: "success", records: 45 },
  { id: "sync_008", crm: "Zoho CRM", timestamp: "2026-04-08 10:23:50", action: "Contact Sync", status: "error", records: 0, note: "API rate limit exceeded" },
  { id: "sync_009", crm: "HubSpot CRM", timestamp: "2026-04-08 10:23:25", action: "Form Submission", status: "success", records: 19 },
  { id: "sync_010", crm: "Pipedrive CRM", timestamp: "2026-04-08 10:23:00", action: "Lead Created", status: "success", records: 7 },
];

export function CRMIntegration() {
  const [selectedCRM, setSelectedCRM] = useState(crmSystems[0]);
  const [activeTab, setActiveTab] = useState<"overview" | "mapping" | "logs" | "webhooks">("overview");
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  const connectedCount = crmSystems.filter(c => c.status === "connected").length;
  const totalLeads = crmSystems.reduce((s, c) => s + c.leadsSynced, 0);
  const totalContacts = crmSystems.reduce((s, c) => s + c.contactsSynced, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="rounded-2xl p-7 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A1628 0%, #0A2D3F 60%, #0A1628 100%)",
          boxShadow: "0 20px 60px rgba(10,22,40,0.35)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #0EA5E9, transparent)", transform: "translate(20%, -20%)" }}
        />
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              CRM Integration Hub
            </h1>
            <p className="text-sm" style={{ color: "#94A3B8" }}>
              Connect, sync, and manage leads across all your CRM systems in real-time
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: "#00C9B1" }}>{connectedCount}</div>
              <div className="text-xs" style={{ color: "#94A3B8" }}>Connected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: "#6366F1" }}>{(totalLeads / 1000).toFixed(0)}K</div>
              <div className="text-xs" style={{ color: "#94A3B8" }}>Leads Synced</div>
            </div>
            <button
              onClick={handleSync}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
              {syncing ? "Syncing..." : "Sync All"}
            </button>
          </div>
        </div>
      </div>

      {/* CRM Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {crmSystems.map((crm) => (
          <button
            key={crm.id}
            onClick={() => setSelectedCRM(crm)}
            className="text-left p-4 rounded-2xl transition-all"
            style={{
              background: selectedCRM.id === crm.id ? `${crm.color}15` : "white",
              border: `2px solid ${selectedCRM.id === crm.id ? crm.color : "#E8EDF5"}`,
              boxShadow: selectedCRM.id === crm.id ? `0 8px 25px ${crm.color}25` : "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <div
              className={`w-10 h-10 bg-gradient-to-br ${crm.gradient} rounded-xl flex items-center justify-center mb-3 text-white font-bold text-sm`}
              style={{ boxShadow: selectedCRM.id === crm.id ? `0 4px 12px ${crm.color}40` : "none" }}
            >
              {crm.logo}
            </div>
            <h4 className="text-xs font-bold mb-1 leading-tight" style={{ color: "#0F172A" }}>{crm.name}</h4>
            <div className="flex items-center gap-1">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: crm.status === "connected" ? "#10B981" : "#94A3B8" }}
              />
              <span className="text-xs capitalize" style={{ color: crm.status === "connected" ? "#10B981" : "#94A3B8" }}>
                {crm.status}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Panel */}
        <div
          className="lg:col-span-2 bg-white rounded-2xl overflow-hidden"
          style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          {/* Tabs */}
          <div className="px-6 pt-5 border-b" style={{ borderColor: "#F1F5F9" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${selectedCRM.gradient} rounded-xl flex items-center justify-center text-white font-bold`}
                  style={{ boxShadow: `0 4px 12px ${selectedCRM.color}40` }}
                >
                  {selectedCRM.logo}
                </div>
                <div>
                  <h2 className="font-bold" style={{ color: "#0F172A" }}>{selectedCRM.name}</h2>
                  <p className="text-xs" style={{ color: "#94A3B8" }}>{selectedCRM.syncFrequency} · {selectedCRM.authMethod}</p>
                </div>
              </div>
              {selectedCRM.status === "connected" && (
                <span
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}
                >
                  <CheckCircle className="w-3 h-3" /> Connected
                </span>
              )}
            </div>
            <div className="flex gap-1">
              {[
                { id: "overview", label: "Overview" },
                { id: "mapping", label: "Field Mapping" },
                { id: "logs", label: "Sync Logs" },
                { id: "webhooks", label: "Webhooks" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className="px-4 py-2 text-sm font-medium rounded-t-lg transition-all"
                  style={{
                    background: activeTab === tab.id ? "white" : "transparent",
                    color: activeTab === tab.id ? "#0F172A" : "#94A3B8",
                    borderBottom: activeTab === tab.id ? `2px solid ${selectedCRM.color}` : "2px solid transparent",
                    fontWeight: activeTab === tab.id ? "600" : "400",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Overview */}
            {activeTab === "overview" && (
              <div className="space-y-5">
                {selectedCRM.status === "connected" ? (
                  <>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Leads Synced", val: selectedCRM.leadsSynced.toLocaleString(), icon: Users, color: "#6366F1" },
                        { label: "Contacts Synced", val: selectedCRM.contactsSynced.toLocaleString(), icon: Database, color: "#00C9B1" },
                        { label: "Sync Health", val: `${selectedCRM.syncHealth}%`, icon: Activity, color: "#10B981" },
                      ].map((m) => {
                        const MIcon = m.icon;
                        return (
                          <div key={m.label} className="p-4 rounded-xl text-center" style={{ background: "#F8FAFC", border: "1px solid #E8EDF5" }}>
                            <MIcon className="w-5 h-5 mx-auto mb-2" style={{ color: m.color }} />
                            <div className="font-bold text-lg" style={{ color: "#0F172A" }}>{m.val}</div>
                            <div className="text-xs" style={{ color: "#94A3B8" }}>{m.label}</div>
                          </div>
                        );
                      })}
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-3" style={{ color: "#0F172A" }}>Weekly Sync Activity</h4>
                      <ResponsiveContainer width="100%" height={180}>
                        <LineChart data={selectedCRM.syncData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                          <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
                          <YAxis stroke="#94A3B8" fontSize={11} />
                          <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "10px", fontSize: "12px" }} />
                          <Line type="monotone" dataKey="synced" stroke={selectedCRM.color} strokeWidth={2.5} dot={{ fill: selectedCRM.color, r: 3 }} name="Records Synced" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm" style={{ color: "#0F172A" }}>Integration Details</h4>
                      {[
                        { label: "API Endpoint", val: selectedCRM.apiEndpoint },
                        { label: "Auth Method", val: selectedCRM.authMethod },
                        { label: "Webhook URL", val: selectedCRM.webhookUrl },
                        { label: "Last Sync", val: selectedCRM.lastSync },
                        { label: "Sync Frequency", val: selectedCRM.syncFrequency },
                      ].map((d) => (
                        <div key={d.label} className="flex items-center gap-3 py-2 border-b" style={{ borderColor: "#F8FAFC" }}>
                          <span className="text-xs w-32 flex-shrink-0" style={{ color: "#94A3B8" }}>{d.label}</span>
                          <span className="text-xs font-mono" style={{ color: "#334155" }}>{d.val}</span>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2" style={{ color: "#0F172A" }}>Supported Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCRM.features.map((f) => (
                          <span
                            key={f}
                            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg"
                            style={{ background: `${selectedCRM.color}15`, color: selectedCRM.color }}
                          >
                            <CheckCircle className="w-3 h-3" /> {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    className="rounded-2xl p-8 text-center"
                    style={{ background: `${selectedCRM.color}08`, border: `2px dashed ${selectedCRM.color}30` }}
                  >
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${selectedCRM.gradient} rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4`}
                    >
                      {selectedCRM.logo}
                    </div>
                    <h3 className="font-bold text-xl mb-2" style={{ color: "#0F172A" }}>
                      Connect {selectedCRM.name}
                    </h3>
                    <p className="text-sm mb-6" style={{ color: "#64748B" }}>
                      Sync leads, contacts, and opportunities with {selectedCRM.name} in real-time
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {selectedCRM.features.map((f) => (
                        <span
                          key={f}
                          className="text-xs px-3 py-1.5 rounded-full"
                          style={{ background: `${selectedCRM.color}15`, color: selectedCRM.color }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    <button
                      className="px-8 py-3 rounded-xl font-semibold text-sm text-white"
                      style={{ background: `linear-gradient(135deg, ${selectedCRM.color}, #6366F1)` }}
                    >
                      Configure Integration
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Field Mapping */}
            {activeTab === "mapping" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-sm" style={{ color: "#0F172A" }}>Field Mapping Configuration</h4>
                  <button
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg"
                    style={{ background: `${selectedCRM.color}15`, color: selectedCRM.color }}
                  >
                    <Plus className="w-3 h-3" /> Add Mapping
                  </button>
                </div>
                <div className="space-y-2">
                  {fieldMappings.map((field, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                      style={{ border: "1px solid #F1F5F9" }}
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium" style={{ color: "#0F172A" }}>{field.source}</p>
                        <p className="text-xs" style={{ color: "#94A3B8" }}>Flexi Versa · {field.type}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg" style={{ background: "#F1F5F9", color: "#64748B" }}>
                        {field.direction === "bi" ? "⇄" : "→"}
                        <span>{field.direction === "bi" ? "Bi-directional" : "One-way"}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: "#CBD5E1" }} />
                      <div className="flex-1">
                        <p className="text-sm font-mono" style={{ color: "#0F172A" }}>{field.destination}</p>
                        <p className="text-xs" style={{ color: "#94A3B8" }}>{selectedCRM.name}</p>
                      </div>
                      <div>
                        {field.synced ? (
                          <CheckCircle className="w-5 h-5" style={{ color: "#10B981" }} />
                        ) : (
                          <AlertCircle className="w-5 h-5" style={{ color: "#F59E0B" }} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="mt-5 w-full py-3 rounded-xl text-sm font-semibold"
                  style={{ background: `linear-gradient(135deg, ${selectedCRM.color}, #6366F1)`, color: "white" }}
                >
                  Save Mapping Configuration
                </button>
              </div>
            )}

            {/* Sync Logs */}
            {activeTab === "logs" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-sm" style={{ color: "#0F172A" }}>Recent Sync Activity</h4>
                  <span className="text-xs" style={{ color: "#94A3B8" }}>Last 2 hours</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                        {["Timestamp", "CRM", "Action", "Records", "Status"].map((h) => (
                          <th key={h} className="text-left py-3 px-3 text-xs font-semibold" style={{ color: "#94A3B8" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {syncLogs.map((log) => (
                        <tr key={log.id} className="border-b hover:bg-slate-50 transition-colors" style={{ borderColor: "#F8FAFC" }}>
                          <td className="py-3 px-3 text-xs font-mono" style={{ color: "#64748B" }}>{log.timestamp}</td>
                          <td className="py-3 px-3 text-xs font-semibold" style={{ color: "#334155" }}>{log.crm}</td>
                          <td className="py-3 px-3 text-xs" style={{ color: "#64748B" }}>
                            {log.action}
                            {log.note && <div className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>{log.note}</div>}
                          </td>
                          <td className="py-3 px-3 text-xs font-semibold" style={{ color: "#0F172A" }}>{log.records}</td>
                          <td className="py-3 px-3">
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-semibold"
                              style={{
                                background: log.status === "success" ? "rgba(16,185,129,0.1)" : log.status === "warning" ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)",
                                color: log.status === "success" ? "#10B981" : log.status === "warning" ? "#F59E0B" : "#EF4444",
                              }}
                            >
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Webhooks */}
            {activeTab === "webhooks" && (
              <div className="space-y-4">
                <h4 className="font-semibold text-sm" style={{ color: "#0F172A" }}>Webhook Configuration</h4>
                <div className="p-4 rounded-xl" style={{ background: "#F8FAFC", border: "1px solid #E8EDF5" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold" style={{ color: "#475569" }}>Inbound Webhook URL</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs flex-1 p-2 rounded-lg" style={{ background: "#0F172A", color: "#00C9B1", fontFamily: "monospace" }}>
                      https://api.flexiversa.com/webhook/{selectedCRM.id}
                    </code>
                  </div>
                </div>
                <div className="space-y-3">
                  <h5 className="text-xs font-semibold" style={{ color: "#475569" }}>Subscribed Events</h5>
                  {[
                    { event: "contact.created", enabled: true },
                    { event: "contact.updated", enabled: true },
                    { event: "lead.created", enabled: true },
                    { event: "lead.converted", enabled: true },
                    { event: "deal.closed", enabled: false },
                    { event: "deal.stage_changed", enabled: true },
                    { event: "task.completed", enabled: false },
                  ].map((ev) => (
                    <div key={ev.event} className="flex items-center justify-between p-3 rounded-xl" style={{ border: "1px solid #F1F5F9" }}>
                      <code className="text-xs" style={{ color: "#334155", fontFamily: "monospace" }}>{ev.event}</code>
                      <div
                        className="w-10 h-5 rounded-full relative cursor-pointer transition-colors"
                        style={{ background: ev.enabled ? "#00C9B1" : "#E2E8F0" }}
                      >
                        <div
                          className="w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all"
                          style={{ left: ev.enabled ? "22px" : "2px" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E8EDF5" }}>
            <h4 className="font-bold mb-4" style={{ color: "#0F172A" }}>Integration Summary</h4>
            <div className="space-y-3">
              {crmSystems.filter(c => c.status === "connected").map((crm) => (
                <div key={crm.id} className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 bg-gradient-to-br ${crm.gradient} rounded-lg flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {crm.logo}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-xs font-semibold" style={{ color: "#334155" }}>{crm.name}</span>
                      <span className="text-xs" style={{ color: "#94A3B8" }}>{crm.lastSync}</span>
                    </div>
                    <div className="h-1.5 rounded-full mt-1" style={{ background: "#F1F5F9" }}>
                      <div
                        className="h-1.5 rounded-full"
                        style={{ width: `${crm.syncHealth}%`, background: crm.color }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E8EDF5" }}>
            <h4 className="font-bold mb-4" style={{ color: "#0F172A" }}>Sync Statistics</h4>
            {[
              { label: "Total Leads Synced", val: totalLeads.toLocaleString(), color: "#6366F1" },
              { label: "Total Contacts", val: totalContacts.toLocaleString(), color: "#00C9B1" },
              { label: "Sync Success Rate", val: "98.7%", color: "#10B981" },
              { label: "Avg Sync Latency", val: "1.2s", color: "#F59E0B" },
              { label: "Events/Hour", val: "4,280", color: "#8B5CF6" },
            ].map((s) => (
              <div key={s.label} className="flex justify-between py-2 border-b" style={{ borderColor: "#F8FAFC" }}>
                <span className="text-xs" style={{ color: "#64748B" }}>{s.label}</span>
                <span className="text-xs font-bold" style={{ color: s.color }}>{s.val}</span>
              </div>
            ))}
          </div>

          <div
            className="rounded-2xl p-5"
            style={{ background: "linear-gradient(135deg, rgba(0,201,177,0.1), rgba(99,102,241,0.1))", border: "1px solid rgba(0,201,177,0.2)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4" style={{ color: "#00C9B1" }} />
              <span className="text-sm font-bold" style={{ color: "#0F172A" }}>Pro Tip</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>
              Enable real-time webhook sync for instant lead updates. This reduces latency from 5 minutes to milliseconds for time-sensitive campaigns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
