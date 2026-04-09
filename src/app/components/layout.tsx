import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Workflow,
  Radio,
  LayoutGrid,
  FileText,
  Megaphone,
  Link2,
  BarChart3,
  Phone,
  Menu,
  X,
  Zap,
  Bell,
  Search,
  ChevronRight,
  ChevronLeft,
  Settings,
  User,
  HelpCircle,
  Globe,
  Layers,
  BookOpen,
  Shield,
  LogOut,
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  RefreshCw,
  Target,
} from "lucide-react";
import { useState } from "react";
import { useRole, roleNavPermissions, roleColors, UserRole } from "../contexts/RoleContext";

// ─── All navigation items ────────────────────────────────────────────────────

const allNavItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard, badge: null, group: "main" },
  { path: "/system-layer", label: "System Layer", icon: Layers, badge: null, group: "main" },
  { path: "/workflow-builder", label: "Workflow Builder", icon: Workflow, badge: "43", group: "main" },
  { path: "/communication-engine", label: "Comm Engine", icon: Radio, badge: "12", group: "main" },
  { path: "/channel-manager", label: "Channel Manager", icon: LayoutGrid, badge: null, group: "main" },
  { path: "/template-manager", label: "Template Manager", icon: FileText, badge: "3", group: "main" },
  { path: "/campaign-engine", label: "Campaign Engine", icon: Megaphone, badge: null, group: "main" },
  { path: "/crm-integration", label: "CRM Integration", icon: Link2, badge: null, group: "main" },
  { path: "/analytics", label: "Analytics", icon: BarChart3, badge: null, group: "main" },
  { path: "/voice-solutions", label: "Voice Solutions", icon: Phone, badge: "7", group: "main" },
  { path: "/help-documents", label: "Help & Documents", icon: BookOpen, badge: null, group: "support" },
  { path: "/admin-settings", label: "Admin Settings", icon: Shield, badge: null, group: "admin" },
];

const roles: UserRole[] = ["Admin", "Agent", "Branch Manager", "Marketing", "Management"];

const notifications = [
  { id: 1, msg: "Campaign 'Spring Sale' is live", time: "2m ago", type: "success" },
  { id: 2, msg: "New WhatsApp template approved", time: "15m ago", type: "info" },
  { id: 3, msg: "SMS gateway delays detected", time: "1h ago", type: "warning" },
  { id: 4, msg: "CRM sync: 1,234 leads updated", time: "2h ago", type: "success" },
];

// ─── Layout ──────────────────────────────────────────────────────────────────

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole } = useRole();

  // Sidebar state: collapsed = icon-only on desktop; mobileOpen = overlay on mobile
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Filter nav items based on role
  const permissions = roleNavPermissions[role];
  const visibleNavItems = allNavItems.filter((item) => {
    if (permissions.includes("all")) return true;
    return permissions.includes(item.path);
  });

  const mainItems = visibleNavItems.filter((i) => i.group === "main");
  const supportItems = visibleNavItems.filter((i) => i.group === "support");
  const adminItems = visibleNavItems.filter((i) => i.group === "admin");

  const currentPage = allNavItems.find(
    (item) =>
      location.pathname === item.path ||
      (item.path !== "/" && location.pathname.startsWith(item.path))
  );

  const rc = roleColors[role];

  // Desktop sidebar width
  const desktopSidebarWidth = sidebarCollapsed ? 64 : 256;

  const NavItem = ({ item }: { item: typeof allNavItems[0] }) => {
    const Icon = item.icon;
    const isActive =
      location.pathname === item.path ||
      (item.path !== "/" && location.pathname.startsWith(item.path));

    return (
      <Link
        key={item.path}
        to={item.path}
        onClick={() => setSidebarMobileOpen(false)}
        title={sidebarCollapsed ? item.label : undefined}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative"
        style={{
          background: isActive
            ? "linear-gradient(135deg, rgba(0,201,177,0.2) 0%, rgba(0,163,224,0.2) 100%)"
            : "transparent",
          borderLeft: isActive ? "3px solid #00C9B1" : "3px solid transparent",
          justifyContent: sidebarCollapsed ? "center" : "flex-start",
        }}
      >
        <Icon
          className="w-4 h-4 flex-shrink-0"
          style={{ color: isActive ? "#00C9B1" : "#475569" }}
        />
        {!sidebarCollapsed && (
          <>
            <span
              className="text-sm flex-1"
              style={{
                color: isActive ? "#E2E8F0" : "#94A3B8",
                fontWeight: isActive ? "600" : "400",
              }}
            >
              {item.label}
            </span>
            {item.badge && (
              <span
                className="text-xs px-1.5 py-0.5 rounded-full"
                style={{
                  background: isActive ? "#00C9B1" : "rgba(100,116,139,0.3)",
                  color: isActive ? "white" : "#94A3B8",
                  fontSize: "10px",
                  fontWeight: "600",
                }}
              >
                {item.badge}
              </span>
            )}
            {isActive && (
              <ChevronRight className="w-3 h-3" style={{ color: "#00C9B1" }} />
            )}
          </>
        )}
        {/* Tooltip for collapsed mode */}
        {sidebarCollapsed && (
          <div
            className="absolute left-full ml-2 px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: "#0A1628", color: "#E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}
          >
            {item.label}
          </div>
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F0F4FA", fontFamily: "'Inter', sans-serif" }}>

      {/* Mobile overlay backdrop */}
      {sidebarMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 overflow-hidden
          ${sidebarMobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 lg:translate-x-0"}
          ${!sidebarMobileOpen ? (sidebarCollapsed ? "lg:w-16" : "lg:w-64") : ""}
        `}
        style={{
          background: "linear-gradient(180deg, #0A1628 0%, #0D1F3C 50%, #0F2547 100%)",
          boxShadow: "4px 0 24px rgba(0,0,0,0.3)",
        }}
      >
        <div className="h-full flex flex-col" style={{ width: sidebarCollapsed ? "64px" : "256px" }}>

          {/* Logo + Collapse Toggle */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between flex-shrink-0">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #00C9B1 0%, #00A3E0 100%)",
                    boxShadow: "0 4px 15px rgba(0,201,177,0.4)",
                  }}
                >
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-white font-bold text-sm leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Flexi Versa <span style={{ color: "#00C9B1" }}>1</span>
                  </div>
                  <div className="text-xs" style={{ color: "#475569", fontSize: "9px" }}>C-PaaS Enterprise Platform</div>
                </div>
              </div>
            )}
            {sidebarCollapsed && (
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto"
                style={{ background: "linear-gradient(135deg, #00C9B1 0%, #00A3E0 100%)" }}
              >
                <Zap className="w-4 h-4 text-white" />
              </div>
            )}
            {/* Collapse/expand button — only visible on desktop */}
            {!sidebarCollapsed && (
              <button
                onClick={() => setSidebarCollapsed(true)}
                className="hidden lg:flex w-7 h-7 rounded-lg items-center justify-center transition-colors hover:bg-white/10 flex-shrink-0"
                title="Collapse sidebar"
              >
                <ChevronLeft className="w-4 h-4" style={{ color: "#475569" }} />
              </button>
            )}
            {sidebarCollapsed && (
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="hidden lg:flex w-full items-center justify-center py-1 transition-colors hover:bg-white/10"
                title="Expand sidebar"
                style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
              >
              </button>
            )}
          </div>

          {/* Expand button when collapsed */}
          {sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="hidden lg:flex mx-auto mt-2 w-9 h-7 rounded-lg items-center justify-center transition-colors hover:bg-white/10 flex-shrink-0"
              title="Expand sidebar"
            >
              <ChevronRight className="w-4 h-4" style={{ color: "#475569" }} />
            </button>
          )}

          {/* Search — only when expanded */}
          {!sidebarCollapsed && (
            <div className="px-4 py-3 flex-shrink-0">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.07)" }}>
                <Search className="w-4 h-4" style={{ color: "#64748B" }} />
                <input
                  placeholder="Search..."
                  className="bg-transparent text-sm outline-none flex-1"
                  style={{ color: "#94A3B8", fontFamily: "'Inter', sans-serif" }}
                />
              </div>
            </div>
          )}

          {/* Role Switcher — only when expanded */}
          {!sidebarCollapsed && (
            <div className="px-4 pb-2 flex-shrink-0">
              <div className="relative">
                <button
                  onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all"
                  style={{ background: rc.bg, border: `1px solid ${rc.border}` }}
                >
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5" style={{ color: rc.text }} />
                    <span className="text-xs font-semibold" style={{ color: rc.text }}>{role}</span>
                  </div>
                  <ChevronDown
                    className="w-3 h-3 transition-transform"
                    style={{ color: rc.text, transform: showRoleSwitcher ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                {showRoleSwitcher && (
                  <div
                    className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden z-50"
                    style={{ background: "#0A1628", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}
                  >
                    {roles.map((r) => {
                      const rc2 = roleColors[r];
                      return (
                        <button
                          key={r}
                          onClick={() => { setRole(r); setShowRoleSwitcher(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2.5 transition-colors hover:bg-white/5 text-left"
                        >
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: rc2.text }} />
                          <span className="text-xs" style={{ color: r === role ? rc2.text : "#94A3B8", fontWeight: r === role ? "600" : "400" }}>
                            {r}
                          </span>
                          {r === role && <CheckCircle className="w-3 h-3 ml-auto" style={{ color: rc2.text }} />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Role icon when collapsed */}
          {sidebarCollapsed && (
            <div className="px-2 py-2 flex-shrink-0">
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="w-full flex items-center justify-center py-1.5 rounded-xl transition-all"
                style={{ background: rc.bg, border: `1px solid ${rc.border}` }}
                title={`Role: ${role}`}
              >
                <User className="w-3.5 h-3.5" style={{ color: rc.text }} />
              </button>
            </div>
          )}

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-2 space-y-0.5 py-2">
            {/* Main Menu */}
            {mainItems.length > 0 && (
              <>
                {!sidebarCollapsed && (
                  <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ color: "#334155" }}>
                    Main Menu
                  </p>
                )}
                {sidebarCollapsed && <div className="h-2" />}
                {mainItems.map((item) => <NavItem key={item.path} item={item} />)}
              </>
            )}

            {/* Support */}
            {supportItems.length > 0 && (
              <>
                {!sidebarCollapsed && (
                  <p className="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: "#334155" }}>
                    Support
                  </p>
                )}
                {sidebarCollapsed && <div className="h-3" />}
                {supportItems.map((item) => <NavItem key={item.path} item={item} />)}
              </>
            )}

            {/* Admin */}
            {adminItems.length > 0 && (
              <>
                {!sidebarCollapsed && (
                  <p className="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: "#334155" }}>
                    Admin
                  </p>
                )}
                {sidebarCollapsed && <div className="h-3" />}
                {adminItems.map((item) => <NavItem key={item.path} item={item} />)}
              </>
            )}
          </nav>

          {/* Bottom Section */}
          <div className="border-t border-white/10 flex-shrink-0" style={{ padding: sidebarCollapsed ? "8px 8px" : "12px 16px" }}>
            {/* System Status */}
            {!sidebarCollapsed && (
              <div
                className="rounded-xl p-3 mb-3"
                style={{ background: "rgba(0,201,177,0.1)", border: "1px solid rgba(0,201,177,0.2)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold" style={{ color: "#00C9B1" }}>
                    All Systems Operational
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-center">
                  {[{ label: "API", val: "99.9%" }, { label: "WA", val: "100%" }, { label: "SMS", val: "98.5%" }].map((s) => (
                    <div key={s.label}>
                      <div className="text-xs" style={{ color: "#00C9B1", fontWeight: "700" }}>{s.val}</div>
                      <div className="text-xs" style={{ color: "#475569" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* User info */}
            {!sidebarCollapsed ? (
              <div className="flex items-center gap-3 px-2 mb-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                >
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">Admin User</div>
                  <div className="text-xs truncate" style={{ color: "#475569" }}>admin@flexiversa.com</div>
                </div>
                <button onClick={() => navigate("/admin-settings")}>
                  <Settings className="w-4 h-4 flex-shrink-0" style={{ color: "#475569" }} />
                </button>
              </div>
            ) : (
              <div className="flex justify-center mb-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                >
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            )}

            {/* Secure Logout */}
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl transition-all hover:bg-red-900/20"
              style={{ border: "1px solid rgba(239,68,68,0.2)", justifyContent: sidebarCollapsed ? "center" : "flex-start" }}
              title={sidebarCollapsed ? "Secure Logout" : undefined}
            >
              <LogOut className="w-4 h-4 flex-shrink-0" style={{ color: "#EF4444" }} />
              {!sidebarCollapsed && (
                <span className="text-xs font-semibold" style={{ color: "#EF4444" }}>Secure Logout</span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setSidebarMobileOpen(!sidebarMobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg shadow-lg text-white"
        style={{ background: "linear-gradient(135deg, #00C9B1, #00A3E0)" }}
      >
        {sidebarMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Main Content */}
      <div
        className="transition-all duration-300 min-h-screen"
        style={{ marginLeft: `${desktopSidebarWidth}px` }}
      >
        {/* Top Bar */}
        <header
          className="sticky top-0 z-30 px-6 py-3 flex items-center justify-between border-b"
          style={{
            background: "rgba(240,244,250,0.95)",
            backdropFilter: "blur(12px)",
            borderColor: "rgba(203,213,225,0.5)",
          }}
        >
          <div className="flex items-center gap-3">
            {/* Breadcrumb */}
            <div>
              <h2
                className="font-bold text-base"
                style={{ color: "#0F172A", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {currentPage?.label || "Dashboard"}
              </h2>
              <div className="flex items-center gap-1 text-xs" style={{ color: "#64748B" }}>
                <span>Flexi Versa 1</span>
                <ChevronRight className="w-3 h-3" />
                <span style={{ color: "#00C9B1" }}>{currentPage?.label || "Dashboard"}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Role badge */}
            <div
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: rc.bg, color: rc.text, border: `1px solid ${rc.border}` }}
            >
              <User className="w-3 h-3" />
              {role}
            </div>

            {/* Date pill */}
            <div
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1" }}
            >
              <Globe className="w-3 h-3" />
              April 9, 2026 · GST+4
            </div>

            {/* Help */}
            <button
              onClick={() => navigate("/help-documents")}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-slate-100"
              style={{ background: "white", border: "1px solid #E2E8F0" }}
              title="Help & Documents"
            >
              <HelpCircle className="w-4 h-4" style={{ color: "#94A3B8" }} />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotif(!showNotif)}
                className="w-8 h-8 rounded-lg flex items-center justify-center relative transition-colors"
                style={{ background: "white", border: "1px solid #E2E8F0" }}
              >
                <Bell className="w-4 h-4" style={{ color: "#94A3B8" }} />
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white flex items-center justify-center"
                  style={{ background: "#EF4444", fontSize: "9px", fontWeight: "700" }}
                >
                  4
                </span>
              </button>
              {showNotif && (
                <div
                  className="absolute right-0 top-10 w-80 rounded-2xl shadow-2xl overflow-hidden z-50"
                  style={{ background: "white", border: "1px solid #E2E8F0" }}
                >
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-sm" style={{ color: "#0F172A" }}>Notifications</span>
                    <button onClick={() => setShowNotif(false)} className="text-xs" style={{ color: "#00C9B1" }}>
                      Mark all read
                    </button>
                  </div>
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="px-4 py-3 border-b border-slate-50 flex items-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: n.type === "success" ? "#10B981" : n.type === "warning" ? "#F59E0B" : "#3B82F6" }}
                      />
                      <div>
                        <p className="text-xs" style={{ color: "#334155" }}>{n.msg}</p>
                        <p className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>{n.time}</p>
                      </div>
                    </div>
                  ))}
                  <div
                    className="px-4 py-3 text-center cursor-pointer hover:bg-slate-50"
                    onClick={() => { setShowNotif(false); navigate("/system-layer"); }}
                  >
                    <span className="text-xs font-semibold" style={{ color: "#00C9B1" }}>View All Alerts →</span>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar */}
            <button
              onClick={() => navigate("/admin-settings")}
              className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 2px 8px rgba(99,102,241,0.4)" }}
            >
              <span className="text-white text-xs font-bold">AU</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" style={{ border: "1px solid #E8EDF5" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
                <LogOut className="w-5 h-5" style={{ color: "#EF4444" }} />
              </div>
              <div>
                <h3 className="font-bold" style={{ color: "#0F172A" }}>Secure Logout</h3>
                <p className="text-xs" style={{ color: "#64748B" }}>All sessions will be terminated</p>
              </div>
            </div>
            <p className="text-sm mb-6" style={{ color: "#475569" }}>
              Are you sure you want to log out? Your current session data will be saved.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: "#F1F5F9", color: "#64748B" }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: "linear-gradient(135deg, #EF4444, #DC2626)", color: "white" }}
              >
                Logout Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
