import { useState } from "react";
import {
  Users, Shield, Database, Download, Upload, Clock, Lock, Key, ScrollText,
  Plus, Trash2, Edit3, RefreshCw, CheckCircle, X, AlertTriangle, Eye, EyeOff,
  LogOut, Settings, Search, User, ToggleLeft, ToggleRight, Copy, Server,
  FileText, BarChart3, Save, ChevronDown, Cpu,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type AdminSection = "users" | "roles" | "database" | "import-export" | "retention" | "security" | "api-keys" | "audit";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockUsers = [
  { id: "u001", name: "Mariam K.", email: "mariam@flexiversa.com", role: "Agent", status: "active", lastLogin: "09:14 today", region: "UAE" },
  { id: "u002", name: "Khalid N.", email: "khalid@flexiversa.com", role: "Agent", status: "active", lastLogin: "08:52 today", region: "UAE" },
  { id: "u003", name: "James R.", email: "james@flexiversa.com", role: "Branch Manager", status: "inactive", lastLogin: "Yesterday", region: "UK" },
  { id: "u004", name: "Priya S.", email: "priya@flexiversa.com", role: "Marketing", status: "active", lastLogin: "09:10 today", region: "Australia" },
  { id: "u005", name: "Admin User", email: "admin@flexiversa.com", role: "Admin", status: "active", lastLogin: "09:42 today", region: "UAE" },
  { id: "u006", name: "Tom Walsh", email: "tom@flexiversa.com", role: "Management", status: "active", lastLogin: "08:30 today", region: "UK" },
  { id: "u007", name: "Layla Hassan", email: "layla@flexiversa.com", role: "Agent", status: "suspended", lastLogin: "3 days ago", region: "UAE" },
];

const rolePermissions = [
  { role: "Admin", dashboard: true, crm: true, campaigns: true, templates: true, workflows: true, channels: true, analytics: true, voice: true, systemLayer: true, helpDocs: true, adminSettings: true },
  { role: "Agent", dashboard: true, crm: false, campaigns: false, templates: false, workflows: false, channels: true, analytics: false, voice: false, systemLayer: false, helpDocs: true, adminSettings: false },
  { role: "Branch Manager", dashboard: true, crm: true, campaigns: false, templates: false, workflows: false, channels: true, analytics: true, voice: false, systemLayer: true, helpDocs: true, adminSettings: false },
  { role: "Marketing", dashboard: true, crm: false, campaigns: true, templates: true, workflows: false, channels: false, analytics: true, voice: false, systemLayer: false, helpDocs: true, adminSettings: false },
  { role: "Management", dashboard: true, crm: true, campaigns: true, templates: false, workflows: false, channels: false, analytics: true, voice: false, systemLayer: true, helpDocs: true, adminSettings: false },
];

const permLabels = ["dashboard", "crm", "campaigns", "templates", "workflows", "channels", "analytics", "voice", "systemLayer", "helpDocs", "adminSettings"] as const;
const permDisplayNames: Record<string, string> = {
  dashboard: "Dashboard", crm: "CRM", campaigns: "Campaigns", templates: "Templates",
  workflows: "Workflows", channels: "Channels", analytics: "Analytics", voice: "Voice",
  systemLayer: "System Layer", helpDocs: "Help & Docs", adminSettings: "Admin Settings",
};

const mockApiKeys = [
  { id: "key_001", name: "WhatsApp Cloud API", key: "wa_api_••••••••••••2f3e", created: "2026-03-01", lastUsed: "09:42 today", status: "active", scope: "messaging" },
  { id: "key_002", name: "Zoho CRM Integration", key: "zoho_••••••••••••9x7k", created: "2026-02-15", lastUsed: "09:40 today", status: "active", scope: "crm" },
  { id: "key_003", name: "Salesforce API", key: "sf_••••••••••••••1a2b", created: "2026-01-20", lastUsed: "09:38 today", status: "active", scope: "crm" },
  { id: "key_004", name: "SendGrid Email", key: "sg_••••••••••••••v9k2", created: "2026-03-10", lastUsed: "Yesterday", status: "active", scope: "email" },
  { id: "key_005", name: "Twilio SMS", key: "twilio_••••••••••••m4p1", created: "2026-02-01", lastUsed: "2 days ago", status: "active", scope: "sms" },
  { id: "key_006", name: "Internal Reporting API", key: "int_••••••••••••••r2s9", created: "2026-01-10", lastUsed: "4 days ago", status: "inactive", scope: "internal" },
];

const mockAuditLogs = [
  { id: "aud_1001", user: "Admin User", action: "API Key Rotated", target: "WhatsApp Cloud API", ip: "10.0.1.4", ts: "09:40:12", severity: "high" },
  { id: "aud_1002", user: "Admin User", action: "User Role Changed", target: "James R. → Branch Manager", ip: "10.0.1.4", ts: "09:35:00", severity: "high" },
  { id: "aud_1003", user: "Priya S.", action: "Template Created", target: "Spring Promo 2026", ip: "10.0.3.8", ts: "09:30:15", severity: "low" },
  { id: "aud_1004", user: "Admin User", action: "Data Export Initiated", target: "Lead database (April 2026)", ip: "10.0.1.4", ts: "09:25:00", severity: "high" },
  { id: "aud_1005", user: "System", action: "Session Timeout Applied", target: "Agent user inactive >30 min", ip: "internal", ts: "09:20:00", severity: "medium" },
  { id: "aud_1006", user: "Admin User", action: "2FA Enabled", target: "account: admin@flexiversa.com", ip: "10.0.1.4", ts: "09:10:00", severity: "medium" },
  { id: "aud_1007", user: "Admin User", action: "Password Reset", target: "User: khalid@flexiversa.com", ip: "10.0.1.4", ts: "08:55:00", severity: "high" },
  { id: "aud_1008", user: "System", action: "SLA Breach Detected", target: "LD-4820 / Sarah Thornton (UK)", ip: "internal", ts: "08:41:30", severity: "high" },
  { id: "aud_1009", user: "Mariam K.", action: "Lead Stage Updated", target: "LD-4821 → Contacted", ip: "10.0.2.12", ts: "08:14:22", severity: "low" },
  { id: "aud_1010", user: "Admin User", action: "Routing Rule Modified", target: "UAE Region / Priority 1", ip: "10.0.1.4", ts: "08:10:05", severity: "medium" },
];

// ─── Sensitive Action Types ───────────────────────────────────────────────────

type SensitiveAction = {
  label: string;
  description: string;
  onConfirm: () => void;
};

// ─── Security Verification Modal ─────────────────────────────────────────────

function SecurityModal({
  action,
  onClose,
}: {
  action: SensitiveAction;
  onClose: () => void;
}) {
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    if (code.length < 4) {
      setError("Please enter your verification code (min 4 characters).");
      return;
    }
    setVerified(true);
    setTimeout(() => {
      action.onConfirm();
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" style={{ border: "1px solid #E8EDF5" }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(239,68,68,0.1)" }}>
            <Shield className="w-6 h-6" style={{ color: "#EF4444" }} />
          </div>
          <div>
            <h3 className="font-bold text-base" style={{ color: "#0F172A" }}>Security Verification Required</h3>
            <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>This action requires additional authentication</p>
          </div>
        </div>

        <div className="p-4 rounded-xl mb-5" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <p className="text-sm font-semibold mb-1" style={{ color: "#EF4444" }}>{action.label}</p>
          <p className="text-xs" style={{ color: "#64748B" }}>{action.description}</p>
        </div>

        {verified ? (
          <div className="flex items-center gap-2 p-4 rounded-xl mb-5" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)" }}>
            <CheckCircle className="w-5 h-5" style={{ color: "#10B981" }} />
            <span className="text-sm font-semibold" style={{ color: "#10B981" }}>Identity verified. Executing action...</span>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>
                Enter your current password or 2FA code to confirm
              </label>
              <div className="relative">
                <input
                  type={showCode ? "text" : "password"}
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setError(""); }}
                  placeholder="Enter password / 2FA code"
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: `1px solid ${error ? "#EF4444" : "#E8EDF5"}`, background: "#F8FAFC", color: "#0F172A" }}
                />
                <button
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showCode ? <EyeOff className="w-4 h-4" style={{ color: "#94A3B8" }} /> : <Eye className="w-4 h-4" style={{ color: "#94A3B8" }} />}
                </button>
              </div>
              {error && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{error}</p>}
            </div>
          </div>
        )}

        {!verified && (
          <div className="flex gap-3 mt-6">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-medium" style={{ background: "#F1F5F9", color: "#64748B" }}>
              Cancel
            </button>
            <button
              onClick={handleVerify}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #EF4444, #DC2626)", color: "white" }}
            >
              <Lock className="w-4 h-4" /> Verify & Execute
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SeverityBadge({ severity }: { severity: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    high: { bg: "rgba(239,68,68,0.12)", color: "#EF4444" },
    medium: { bg: "rgba(245,158,11,0.12)", color: "#F59E0B" },
    low: { bg: "rgba(16,185,129,0.12)", color: "#10B981" },
  };
  const s = map[severity] || map.low;
  return (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full capitalize" style={{ background: s.bg, color: s.color }}>
      {severity}
    </span>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!value)} className="flex-shrink-0">
      {value
        ? <ToggleRight className="w-8 h-8" style={{ color: "#00C9B1" }} />
        : <ToggleLeft className="w-8 h-8" style={{ color: "#CBD5E1" }} />}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function AdminSettings() {
  const [activeSection, setActiveSection] = useState<AdminSection>("users");
  const [pendingAction, setPendingAction] = useState<SensitiveAction | null>(null);
  const [userSearch, setUserSearch] = useState("");
  const [auditSearch, setAuditSearch] = useState("");
  const [savedToast, setSavedToast] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Agent", region: "UAE" });

  // Security settings state
  const [security, setSecurity] = useState({
    twoFA: true,
    sessionTimeout: "30",
    autoLock: "15",
    passwordExpiry: "90",
    ipWhitelist: false,
    loginAlerts: true,
    forceLogout: false,
  });

  // Retention state
  const [retention, setRetention] = useState({
    leadData: "365",
    auditLogs: "730",
    conversations: "180",
    campaignData: "365",
    autoDelete: true,
    archiveBeforeDelete: true,
  });

  function toast(msg: string) {
    setSavedToast(msg);
    setTimeout(() => setSavedToast(""), 3000);
  }

  function sensitiveAction(label: string, description: string, onConfirm: () => void) {
    setPendingAction({ label, description, onConfirm });
  }

  const sections: { id: AdminSection; label: string; icon: any }[] = [
    { id: "users", label: "User Management", icon: Users },
    { id: "roles", label: "Role & Access (RBAC)", icon: Shield },
    { id: "database", label: "Database Control", icon: Database },
    { id: "import-export", label: "Import / Export", icon: Download },
    { id: "retention", label: "Data Retention", icon: Clock },
    { id: "security", label: "Session & Security", icon: Lock },
    { id: "api-keys", label: "API Key Management", icon: Key },
    { id: "audit", label: "Audit Logs", icon: ScrollText },
  ];

  const filteredUsers = mockUsers.filter((u) =>
    !userSearch || u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredAudit = mockAuditLogs.filter((l) =>
    !auditSearch || l.action.toLowerCase().includes(auditSearch.toLowerCase()) || l.user.toLowerCase().includes(auditSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="rounded-2xl p-7 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0A1628 0%, #1a1034 60%, #0F2547 100%)", boxShadow: "0 20px 60px rgba(10,22,40,0.35)" }}
      >
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #6366F1, transparent)", transform: "translate(20%, -20%)" }} />
        <div className="relative flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(239,68,68,0.2)", color: "#FCA5A5" }}>
                🔐 High Security Zone
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Admin Settings
            </h1>
            <p className="text-sm" style={{ color: "#94A3B8" }}>
              Enterprise controls · {mockUsers.length} users · Role-based access · Full audit trail
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Active Users", value: mockUsers.filter((u) => u.status === "active").length.toString(), color: "#10B981" },
              { label: "API Keys", value: mockApiKeys.filter((k) => k.status === "active").length.toString(), color: "#00C9B1" },
              { label: "Audit Events", value: mockAuditLogs.length.toString(), color: "#6366F1" },
            ].map((stat) => (
              <div key={stat.label} className="text-center px-4 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.07)" }}>
                <div className="font-bold text-lg" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs" style={{ color: "#64748B" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Layout: Sidebar + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-2xl p-3 h-fit" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#94A3B8" }}>Settings</p>
          <div className="space-y-0.5">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                  style={{
                    background: isActive ? "rgba(99,102,241,0.1)" : "transparent",
                    borderLeft: isActive ? "3px solid #6366F1" : "3px solid transparent",
                  }}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: isActive ? "#6366F1" : "#94A3B8" }} />
                  <span className="text-xs" style={{ color: isActive ? "#0F172A" : "#64748B", fontWeight: isActive ? 600 : 400 }}>
                    {sec.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-3 space-y-4">

          {/* ─── User Management ──────────────────────────────────────────── */}
          {activeSection === "users" && (
            <div className="bg-white rounded-2xl" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="p-5 border-b flex items-center justify-between gap-3 flex-wrap" style={{ borderColor: "#F1F5F9" }}>
                <h3 className="font-bold" style={{ color: "#0F172A" }}>User Management</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ border: "1px solid #E8EDF5", background: "#F8FAFC" }}>
                    <Search className="w-3.5 h-3.5" style={{ color: "#94A3B8" }} />
                    <input
                      placeholder="Search users..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      className="bg-transparent text-xs outline-none"
                      style={{ color: "#0F172A", width: "140px" }}
                    />
                  </div>
                  <button
                    onClick={() => setShowAddUser(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
                    style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", color: "white" }}
                  >
                    <Plus className="w-3.5 h-3.5" /> Add User
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                      {["User", "Role", "Region", "Status", "Last Login", "Actions"].map((h) => (
                        <th key={h} className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style={{ color: "#94A3B8" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50 transition-colors" style={{ borderBottom: "1px solid #F8FAFC" }}>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(99,102,241,0.1)" }}>
                              <User className="w-4 h-4" style={{ color: "#6366F1" }} />
                            </div>
                            <div>
                              <div className="text-sm font-semibold" style={{ color: "#0F172A" }}>{u.name}</div>
                              <div className="text-xs" style={{ color: "#94A3B8" }}>{u.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(99,102,241,0.1)", color: "#6366F1" }}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs" style={{ color: "#64748B" }}>{u.region}</td>
                        <td className="py-3 px-4">
                          <span
                            className="text-xs px-2 py-0.5 rounded-full capitalize"
                            style={{
                              background: u.status === "active" ? "rgba(16,185,129,0.1)" : u.status === "inactive" ? "rgba(100,116,139,0.1)" : "rgba(239,68,68,0.1)",
                              color: u.status === "active" ? "#10B981" : u.status === "inactive" ? "#64748B" : "#EF4444",
                            }}
                          >
                            {u.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs" style={{ color: "#94A3B8" }}>{u.lastLogin}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 rounded-lg hover:bg-slate-100">
                              <Edit3 className="w-3.5 h-3.5" style={{ color: "#6366F1" }} />
                            </button>
                            <button
                              onClick={() => sensitiveAction("Reset Password", `Reset password for ${u.name} (${u.email})`, () => toast(`Password reset email sent to ${u.email}`))}
                              className="p-1.5 rounded-lg hover:bg-slate-100"
                              title="Reset password"
                            >
                              <Key className="w-3.5 h-3.5" style={{ color: "#F59E0B" }} />
                            </button>
                            <button
                              onClick={() => sensitiveAction("Delete User", `Permanently delete user ${u.name}. This action cannot be undone.`, () => toast(`User ${u.name} deleted.`))}
                              className="p-1.5 rounded-lg hover:bg-red-50"
                              title="Delete user"
                            >
                              <Trash2 className="w-3.5 h-3.5" style={{ color: "#EF4444" }} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─── RBAC ────────────────────────────────────────────────────── */}
          {activeSection === "roles" && (
            <div className="bg-white rounded-2xl" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: "#F1F5F9" }}>
                <h3 className="font-bold" style={{ color: "#0F172A" }}>Role-Based Access Control (RBAC)</h3>
                <button
                  onClick={() => sensitiveAction("Modify Role Permissions", "Changes to role permissions affect all users with that role system-wide.", () => toast("Role permissions saved."))}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
                  style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", color: "white" }}
                >
                  <Save className="w-3.5 h-3.5" /> Save Changes
                </button>
              </div>
              <div className="overflow-x-auto p-2">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                      <th className="text-left py-3 px-4 font-semibold" style={{ color: "#94A3B8" }}>Module</th>
                      {rolePermissions.map((r) => (
                        <th key={r.role} className="text-center py-3 px-3 font-semibold" style={{ color: "#94A3B8" }}>{r.role}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {permLabels.map((perm) => (
                      <tr key={perm} className="hover:bg-slate-50 transition-colors" style={{ borderBottom: "1px solid #F8FAFC" }}>
                        <td className="py-3 px-4 font-medium" style={{ color: "#334155" }}>{permDisplayNames[perm]}</td>
                        {rolePermissions.map((r) => (
                          <td key={r.role} className="py-3 px-3 text-center">
                            {(r as any)[perm] ? (
                              <CheckCircle className="w-4 h-4 mx-auto" style={{ color: "#10B981" }} />
                            ) : (
                              <X className="w-4 h-4 mx-auto" style={{ color: "#E2E8F0" }} />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─── Database Control ─────────────────────────────────────────── */}
          {activeSection === "database" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Total Records", value: "2.4M", icon: Database, color: "#6366F1" },
                  { label: "DB Size", value: "48.3 GB", icon: Server, color: "#00C9B1" },
                  { label: "Last Backup", value: "06:00 today", icon: Clock, color: "#10B981" },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="bg-white rounded-2xl p-4" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                          <Icon className="w-4 h-4" style={{ color: stat.color }} />
                        </div>
                      </div>
                      <div className="font-bold text-xl" style={{ color: "#0F172A" }}>{stat.value}</div>
                      <div className="text-xs mt-0.5" style={{ color: "#64748B" }}>{stat.label}</div>
                    </div>
                  );
                })}
              </div>
              <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <h3 className="font-bold text-sm mb-4" style={{ color: "#0F172A" }}>Database Tables</h3>
                <div className="space-y-2">
                  {[
                    { table: "leads", records: "845,230", size: "12.4 GB", lastWrite: "09:42:31" },
                    { table: "conversations", records: "2,184,500", size: "18.7 GB", lastWrite: "09:42:29" },
                    { table: "contacts", records: "684,120", size: "8.2 GB", lastWrite: "09:42:20" },
                    { table: "campaigns", records: "12,840", size: "1.1 GB", lastWrite: "09:38:00" },
                    { table: "audit_logs", records: "4,218,900", size: "6.9 GB", lastWrite: "09:42:31" },
                    { table: "templates", records: "1,248", size: "0.2 GB", lastWrite: "09:30:15" },
                  ].map((t) => (
                    <div key={t.table} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors" style={{ border: "1px solid #F1F5F9" }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(99,102,241,0.1)" }}>
                        <Database className="w-4 h-4" style={{ color: "#6366F1" }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm" style={{ color: "#0F172A" }}>{t.table}</span>
                          <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "#F1F5F9", color: "#64748B" }}>{t.size}</span>
                        </div>
                        <div className="text-xs" style={{ color: "#94A3B8" }}>{t.records} records · Last write: {t.lastWrite}</div>
                      </div>
                      <button
                        onClick={() => sensitiveAction("Database Rollback", `Roll back table "${t.table}" to a previous snapshot. This may cause data loss.`, () => toast(`Rollback initiated for ${t.table}.`))}
                        className="text-xs px-2 py-1 rounded-lg"
                        style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}
                      >
                        Rollback
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-4 pt-4" style={{ borderTop: "1px solid #F1F5F9" }}>
                  <button
                    onClick={() => sensitiveAction("Create Database Backup", "A full database snapshot will be created. This process may take 5–10 minutes.", () => toast("Backup initiated. You will be notified when complete."))}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
                    style={{ background: "rgba(0,201,177,0.1)", color: "#00C9B1" }}
                  >
                    <RefreshCw className="w-4 h-4" /> Create Backup
                  </button>
                  <button
                    onClick={() => sensitiveAction("Restore Database", "Restore the database from the latest backup snapshot. Current data will be overwritten.", () => toast("Restore process started."))}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
                    style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B" }}
                  >
                    <Upload className="w-4 h-4" /> Restore
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ─── Import / Export ──────────────────────────────────────────── */}
          {activeSection === "import-export" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: Download, title: "Export Leads", desc: "Download all lead data as CSV or Excel", label: "Export Leads", color: "#00C9B1", sensitive: true },
                { icon: Download, title: "Export Contacts", desc: "Download all contact records", label: "Export Contacts", color: "#6366F1", sensitive: true },
                { icon: Download, title: "Export Conversations", desc: "Download message history in JSON", label: "Export Conversations", color: "#8B5CF6", sensitive: true },
                { icon: Download, title: "Export Audit Logs", desc: "Download full audit log archive", label: "Export Audit Logs", color: "#F59E0B", sensitive: true },
                { icon: Upload, title: "Import Leads", desc: "Bulk import leads from CSV file", label: "Import Leads", color: "#10B981", sensitive: false },
                { icon: Upload, title: "Import Contacts", desc: "Bulk import contacts from external CRM", label: "Import Contacts", color: "#EC4899", sensitive: false },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${item.color}15` }}>
                        <Icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm" style={{ color: "#0F172A" }}>{item.title}</h4>
                        <p className="text-xs" style={{ color: "#64748B" }}>{item.desc}</p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        item.sensitive
                          ? sensitiveAction(item.label, `You are about to ${item.label.toLowerCase()}. This action is logged.`, () => toast(`${item.label} started. Check your email for the download link.`))
                          : toast(`${item.label} initiated.`)
                      }
                      className="w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                      style={{ background: item.sensitive ? "rgba(239,68,68,0.08)" : `${item.color}15`, color: item.sensitive ? "#EF4444" : item.color, border: `1px solid ${item.sensitive ? "rgba(239,68,68,0.2)" : `${item.color}30`}` }}
                    >
                      {item.sensitive && <Lock className="w-3.5 h-3.5" />}
                      {item.label}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* ─── Data Retention ───────────────────────────────────────────── */}
          {activeSection === "retention" && (
            <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-sm" style={{ color: "#0F172A" }}>Data Retention Policy</h3>
                <button
                  onClick={() => sensitiveAction("Change Data Retention Policy", "Modifying retention policies affects how long data is stored and when it is auto-deleted.", () => toast("Retention policy updated."))}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
                  style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", color: "white" }}
                >
                  <Save className="w-3.5 h-3.5" /> Save Policy
                </button>
              </div>
              <div className="space-y-5">
                {[
                  { key: "leadData", label: "Lead Data Retention", unit: "days" },
                  { key: "auditLogs", label: "Audit Logs Retention", unit: "days" },
                  { key: "conversations", label: "Conversation History", unit: "days" },
                  { key: "campaignData", label: "Campaign Data", unit: "days" },
                ].map((item) => (
                  <div key={item.key}>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium" style={{ color: "#334155" }}>{item.label}</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={(retention as any)[item.key]}
                          onChange={(e) => setRetention({ ...retention, [item.key]: e.target.value })}
                          className="w-20 px-3 py-1.5 rounded-lg text-sm outline-none text-center"
                          style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                        />
                        <span className="text-xs" style={{ color: "#94A3B8" }}>{item.unit}</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full" style={{ background: "#F1F5F9" }}>
                      <div className="h-full rounded-full" style={{ width: `${Math.min((parseInt((retention as any)[item.key]) / 730) * 100, 100)}%`, background: "linear-gradient(90deg, #6366F1, #8B5CF6)" }} />
                    </div>
                  </div>
                ))}
                <div className="pt-4 space-y-3" style={{ borderTop: "1px solid #F1F5F9" }}>
                  {[
                    { key: "autoDelete", label: "Auto-delete expired records", desc: "Records beyond retention period are automatically deleted" },
                    { key: "archiveBeforeDelete", label: "Archive before deletion", desc: "Create compressed archive before permanent deletion" },
                  ].map((toggle) => (
                    <div key={toggle.key} className="flex items-start justify-between gap-4 p-3 rounded-xl" style={{ border: "1px solid #F1F5F9" }}>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#0F172A" }}>{toggle.label}</p>
                        <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>{toggle.desc}</p>
                      </div>
                      <Toggle value={(retention as any)[toggle.key]} onChange={(v) => setRetention({ ...retention, [toggle.key]: v })} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── Security ─────────────────────────────────────────────────── */}
          {activeSection === "security" && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <h3 className="font-bold text-sm mb-5" style={{ color: "#0F172A" }}>Authentication & Session Settings</h3>
                <div className="space-y-4">
                  {/* 2FA */}
                  <div className="flex items-start justify-between gap-4 p-4 rounded-xl" style={{ border: "1px solid #F1F5F9" }}>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>Two-Factor Authentication (2FA)</p>
                      <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>Require 2FA for all admin and sensitive actions</p>
                    </div>
                    <button
                      onClick={() => sensitiveAction("Change 2FA Settings", "Modifying 2FA requirements affects all user authentication flows.", () => { setSecurity({ ...security, twoFA: !security.twoFA }); toast("2FA settings updated."); })}
                    >
                      {security.twoFA ? <ToggleRight className="w-8 h-8" style={{ color: "#00C9B1" }} /> : <ToggleLeft className="w-8 h-8" style={{ color: "#CBD5E1" }} />}
                    </button>
                  </div>

                  {/* Session Timeout */}
                  {[
                    { key: "sessionTimeout", label: "Session Timeout (minutes)", desc: "Auto-logout after period of inactivity", unit: "min" },
                    { key: "autoLock", label: "Screen Auto-Lock (minutes)", desc: "Lock screen after inactivity without logout", unit: "min" },
                    { key: "passwordExpiry", label: "Password Expiry (days)", desc: "Force password reset after set days", unit: "days" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between gap-4 p-4 rounded-xl" style={{ border: "1px solid #F1F5F9" }}>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#0F172A" }}>{item.label}</p>
                        <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>{item.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <input
                          type="number"
                          value={(security as any)[item.key]}
                          onChange={(e) => setSecurity({ ...security, [item.key]: e.target.value })}
                          className="w-20 px-3 py-1.5 rounded-lg text-sm outline-none text-center"
                          style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                        />
                        <span className="text-xs" style={{ color: "#94A3B8" }}>{item.unit}</span>
                      </div>
                    </div>
                  ))}

                  {[
                    { key: "ipWhitelist", label: "IP Whitelist Enforcement", desc: "Restrict access to whitelisted IP addresses only" },
                    { key: "loginAlerts", label: "Login Alerts", desc: "Email alerts for new logins and failed attempts" },
                  ].map((toggle) => (
                    <div key={toggle.key} className="flex items-start justify-between gap-4 p-4 rounded-xl" style={{ border: "1px solid #F1F5F9" }}>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#0F172A" }}>{toggle.label}</p>
                        <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>{toggle.desc}</p>
                      </div>
                      <Toggle value={(security as any)[toggle.key]} onChange={(v) => setSecurity({ ...security, [toggle.key]: v })} />
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-5 pt-4" style={{ borderTop: "1px solid #F1F5F9" }}>
                  <button
                    onClick={() => toast("Security settings saved.")}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                    style={{ background: "linear-gradient(135deg, #00C9B1, #6366F1)", color: "white" }}
                  >
                    <Save className="w-4 h-4" /> Save Settings
                  </button>
                  <button
                    onClick={() => sensitiveAction("Force Logout All Sessions", "All active user sessions will be immediately terminated.", () => toast("All sessions terminated."))}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium"
                    style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.2)" }}
                  >
                    <LogOut className="w-4 h-4" /> Force Logout All
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ─── API Keys ─────────────────────────────────────────────────── */}
          {activeSection === "api-keys" && (
            <div className="bg-white rounded-2xl" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: "#F1F5F9" }}>
                <h3 className="font-bold" style={{ color: "#0F172A" }}>API Key Management</h3>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
                  style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", color: "white" }}
                >
                  <Plus className="w-3.5 h-3.5" /> New API Key
                </button>
              </div>
              <div className="divide-y" style={{ borderColor: "#F8FAFC" }}>
                {mockApiKeys.map((k) => (
                  <div key={k.id} className="p-5 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: k.status === "active" ? "rgba(0,201,177,0.1)" : "rgba(100,116,139,0.1)" }}>
                          <Key className="w-4 h-4" style={{ color: k.status === "active" ? "#00C9B1" : "#94A3B8" }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-semibold" style={{ color: "#0F172A" }}>{k.name}</span>
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{ background: k.status === "active" ? "rgba(16,185,129,0.1)" : "rgba(100,116,139,0.1)", color: k.status === "active" ? "#10B981" : "#64748B" }}
                            >
                              {k.status}
                            </span>
                          </div>
                          <div className="font-mono text-xs mb-1" style={{ color: "#94A3B8" }}>{k.key}</div>
                          <div className="flex items-center gap-3 text-xs" style={{ color: "#94A3B8" }}>
                            <span>Created: {k.created}</span>
                            <span>·</span>
                            <span>Last used: {k.lastUsed}</span>
                            <span>·</span>
                            <span className="capitalize px-1.5 py-0.5 rounded" style={{ background: "#F1F5F9", color: "#64748B" }}>{k.scope}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => sensitiveAction("Rotate API Key", `Rotate key for "${k.name}". The existing key will be revoked immediately.`, () => toast(`API key for "${k.name}" rotated successfully.`))}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                          style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B" }}
                        >
                          <RefreshCw className="w-3 h-3" /> Rotate
                        </button>
                        <button
                          onClick={() => sensitiveAction("Revoke API Key", `Revoke key for "${k.name}". Any integrations using this key will stop working immediately.`, () => toast(`API key for "${k.name}" revoked.`))}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                          style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}
                        >
                          <Trash2 className="w-3 h-3" /> Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── Audit Logs ───────────────────────────────────────────────── */}
          {activeSection === "audit" && (
            <div className="bg-white rounded-2xl" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="p-5 border-b flex items-center justify-between gap-3 flex-wrap" style={{ borderColor: "#F1F5F9" }}>
                <h3 className="font-bold" style={{ color: "#0F172A" }}>Audit Logs — Full System Traceability</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ border: "1px solid #E8EDF5", background: "#F8FAFC" }}>
                    <Search className="w-3.5 h-3.5" style={{ color: "#94A3B8" }} />
                    <input
                      placeholder="Search logs..."
                      value={auditSearch}
                      onChange={(e) => setAuditSearch(e.target.value)}
                      className="bg-transparent text-xs outline-none"
                      style={{ color: "#0F172A", width: "140px" }}
                    />
                  </div>
                  <button
                    onClick={() => sensitiveAction("Export Audit Logs", "Download the full audit log archive as a CSV file.", () => toast("Audit log export started."))}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium"
                    style={{ background: "rgba(99,102,241,0.1)", color: "#6366F1" }}
                  >
                    <Download className="w-3.5 h-3.5" /> Export
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                      {["Audit ID", "User", "Action Performed", "Target", "IP Address", "Timestamp", "Severity"].map((h) => (
                        <th key={h} className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style={{ color: "#94A3B8" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAudit.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50 transition-colors cursor-pointer" style={{ borderBottom: "1px solid #F8FAFC" }}>
                        <td className="py-3 px-4 font-mono text-xs" style={{ color: "#6366F1" }}>{log.id}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(99,102,241,0.1)" }}>
                              {log.user === "System" ? <Cpu className="w-3 h-3" style={{ color: "#6366F1" }} /> : <User className="w-3 h-3" style={{ color: "#6366F1" }} />}
                            </div>
                            <span className="text-xs" style={{ color: "#334155" }}>{log.user}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-xs font-medium" style={{ color: "#0F172A" }}>{log.action}</td>
                        <td className="py-3 px-4 text-xs" style={{ color: "#64748B" }}>{log.target}</td>
                        <td className="py-3 px-4 font-mono text-xs" style={{ color: "#94A3B8" }}>{log.ip}</td>
                        <td className="py-3 px-4 font-mono text-xs" style={{ color: "#94A3B8" }}>{log.ts}</td>
                        <td className="py-3 px-4"><SeverityBadge severity={log.severity} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" style={{ border: "1px solid #E8EDF5" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-base" style={{ color: "#0F172A" }}>Add New User</h3>
              <button onClick={() => setShowAddUser(false)}>
                <X className="w-5 h-5" style={{ color: "#94A3B8" }} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { key: "name", label: "Full Name", placeholder: "John Smith", type: "text" },
                { key: "email", label: "Email Address", placeholder: "john@company.com", type: "email" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>{field.label}</label>
                  <input
                    type={field.type}
                    value={(newUser as any)[field.key]}
                    onChange={(e) => setNewUser({ ...newUser, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                  >
                    {["Admin", "Agent", "Branch Manager", "Marketing", "Management"].map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>Region</label>
                  <select
                    value={newUser.region}
                    onChange={(e) => setNewUser({ ...newUser, region: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                  >
                    {["UAE", "UK", "Australia"].map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddUser(false)} className="flex-1 py-2.5 rounded-xl text-sm" style={{ background: "#F1F5F9", color: "#64748B" }}>Cancel</button>
              <button
                onClick={() => { setShowAddUser(false); toast(`User ${newUser.name || "new user"} added successfully.`); setNewUser({ name: "", email: "", role: "Agent", region: "UAE" }); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", color: "white" }}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Security Verification Modal */}
      {pendingAction && (
        <SecurityModal action={pendingAction} onClose={() => setPendingAction(null)} />
      )}

      {/* Toast */}
      {savedToast && (
        <div
          className="fixed bottom-6 right-6 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl z-50"
          style={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <CheckCircle className="w-4 h-4" style={{ color: "#10B981" }} />
          <span className="text-sm font-medium text-white">{savedToast}</span>
        </div>
      )}
    </div>
  );
}
