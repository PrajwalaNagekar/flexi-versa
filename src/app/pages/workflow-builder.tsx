import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Play,
  Mail,
  MessageSquare,
  Phone,
  Database,
  Plus,
  Save,
  Eye,
  Trash2,
  Settings,
  Zap,
  Clock,
  CheckCircle,
  Filter,
  GitBranch,
  RefreshCw,
  Users,
  Star,
  Copy,
  MoreHorizontal,
  ChevronRight,
  AlertTriangle,
  X,
  ArrowRight,
} from "lucide-react";

interface WorkflowNode {
  id: string;
  type: "trigger" | "action" | "condition" | "delay";
  label: string;
  icon: any;
  color: string;
  borderColor: string;
  x: number;
  y: number;
  config?: Record<string, string>;
}

const toolboxConfig = [
  {
    group: "Triggers",
    icon: Zap,
    color: "#F59E0B",
    items: [
      { type: "trigger", label: "Message Received", icon: MessageSquare, color: "from-teal-500 to-cyan-500", borderColor: "#00C9B1", config: { channel: "WhatsApp", keyword: "START" } },
      { type: "trigger", label: "Form Submitted", icon: CheckCircle, color: "from-green-500 to-emerald-500", borderColor: "#10B981", config: { formId: "lead_capture_v2" } },
      { type: "trigger", label: "CRM Event", icon: Database, color: "from-purple-500 to-violet-500", borderColor: "#8B5CF6", config: { event: "lead_created", crm: "Zoho CRM" } },
      { type: "trigger", label: "Scheduled Time", icon: Clock, color: "from-orange-500 to-amber-500", borderColor: "#F59E0B", config: { schedule: "Daily 9:00 AM" } },
      { type: "trigger", label: "API Webhook", icon: RefreshCw, color: "from-rose-500 to-pink-500", borderColor: "#EC4899", config: { endpoint: "/webhook/trigger" } },
    ],
  },
  {
    group: "Actions",
    icon: Play,
    color: "#6366F1",
    items: [
      { type: "action", label: "Send WhatsApp", icon: MessageSquare, color: "from-teal-600 to-green-500", borderColor: "#00C9B1", config: { template: "welcome_msg_v3", channel: "WhatsApp" } },
      { type: "action", label: "Send Email", icon: Mail, color: "from-blue-600 to-blue-400", borderColor: "#3B82F6", config: { template: "email_nurture_01", from: "noreply@flexiversa.com" } },
      { type: "action", label: "Send SMS", icon: MessageSquare, color: "from-indigo-600 to-indigo-400", borderColor: "#6366F1", config: { template: "sms_flash_promo", sender: "FLEXIV" } },
      { type: "action", label: "Trigger Call", icon: Phone, color: "from-rose-600 to-rose-400", borderColor: "#F43F5E", config: { script: "sales_pitch_v2", ai: "enabled" } },
      { type: "action", label: "Update CRM", icon: Database, color: "from-violet-600 to-violet-400", borderColor: "#7C3AED", config: { action: "update_lead_status", value: "contacted" } },
      { type: "action", label: "Tag Contact", icon: Star, color: "from-yellow-500 to-orange-500", borderColor: "#F59E0B", config: { tag: "high_value", list: "VIP Customers" } },
      { type: "action", label: "Assign Agent", icon: Users, color: "from-sky-600 to-sky-400", borderColor: "#0EA5E9", config: { agent: "Sales Team A", priority: "high" } },
    ],
  },
  {
    group: "Logic",
    icon: GitBranch,
    color: "#10B981",
    items: [
      { type: "condition", label: "If / Else Branch", icon: Filter, color: "from-yellow-500 to-orange-500", borderColor: "#F59E0B", config: { condition: "engagement_score > 50" } },
      { type: "delay", label: "Wait / Delay", icon: Clock, color: "from-slate-500 to-slate-400", borderColor: "#64748B", config: { duration: "2 hours" } },
      { type: "condition", label: "A/B Test Split", icon: GitBranch, color: "from-pink-500 to-rose-500", borderColor: "#EC4899", config: { split: "50/50", variants: "A, B" } },
    ],
  },
];

const prebuiltWorkflows = [
  { id: "pw1", name: "Lead Nurture Pro", nodes: 8, conversions: "32%", category: "Sales" },
  { id: "pw2", name: "Onboarding Sequence", nodes: 12, conversions: "78%", category: "Customer Success" },
  { id: "pw3", name: "Re-engagement Campaign", nodes: 6, conversions: "24%", category: "Retention" },
  { id: "pw4", name: "Abandoned Cart Recovery", nodes: 5, conversions: "41%", category: "E-commerce" },
  { id: "pw5", name: "VIP Customer Flow", nodes: 9, conversions: "65%", category: "Sales" },
];

const existingWorkflows = [
  { id: "wf1", name: "Spring Sale Trigger", status: "active", runs: 45230, lastRun: "2m ago", nodes: 6 },
  { id: "wf2", name: "Welcome Onboarding", status: "active", runs: 128900, lastRun: "10s ago", nodes: 8 },
  { id: "wf3", name: "Payment Reminder", status: "paused", runs: 23100, lastRun: "2h ago", nodes: 4 },
  { id: "wf4", name: "Lead Score Routing", status: "active", runs: 67800, lastRun: "1m ago", nodes: 10 },
  { id: "wf5", name: "Re-engage Cold Leads", status: "draft", runs: 0, lastRun: "—", nodes: 5 },
];

// ─── Toolbox Item ─────────────────────────────────────────────────────────────

function ToolboxItem({ item }: { item: any }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "workflow-node",
    item: { ...item },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));
  const Icon = item.icon;
  return (
    <div
      ref={drag}
      className={`p-2.5 rounded-xl cursor-move transition-all ${isDragging ? "opacity-40 scale-95" : "opacity-100 hover:shadow-md"}`}
      style={{
        background: "white",
        border: `1px solid ${isDragging ? item.borderColor : "#E8EDF5"}`,
        boxShadow: isDragging ? `0 0 0 2px ${item.borderColor}40` : "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex items-center gap-2">
        <div className={`w-7 h-7 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-xs font-medium" style={{ color: "#334155" }}>{item.label}</span>
      </div>
    </div>
  );
}

// ─── Node Card ────────────────────────────────────────────────────────────────

function NodeCard({
  node, onDelete, onConfigure, simStatus,
}: {
  node: WorkflowNode;
  onDelete: (id: string) => void;
  onConfigure: (node: WorkflowNode) => void;
  simStatus: "idle" | "running" | "success" | "failed";
}) {
  const Icon = node.icon;
  const borderColor = simStatus === "success" ? "#10B981" : simStatus === "failed" ? "#EF4444" : node.borderColor;
  const headerBg = simStatus === "success" ? "rgba(16,185,129,0.15)" : simStatus === "failed" ? "rgba(239,68,68,0.15)" : `${node.borderColor}15`;

  return (
    <div
      className="absolute bg-white rounded-xl border-2 group cursor-pointer hover:shadow-xl transition-all"
      style={{
        left: node.x,
        top: node.y,
        minWidth: "200px",
        borderColor,
        boxShadow: simStatus === "running"
          ? `0 0 0 3px ${node.borderColor}, 0 0 20px ${node.borderColor}80`
          : simStatus === "success"
          ? "0 0 0 3px #10B981, 0 0 16px rgba(16,185,129,0.4)"
          : `0 4px 20px rgba(0,0,0,0.08)`,
        transition: "all 0.3s ease",
      }}
    >
      <div className="px-3 py-2 rounded-t-xl flex items-center justify-between" style={{ background: headerBg }}>
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 bg-gradient-to-br ${node.color} rounded-md flex items-center justify-center`}>
            <Icon className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs font-semibold capitalize" style={{ color: borderColor }}>{node.type}</span>
          {simStatus === "running" && <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />}
          {simStatus === "success" && <CheckCircle className="w-3.5 h-3.5" style={{ color: "#10B981" }} />}
          {simStatus === "failed" && <AlertTriangle className="w-3.5 h-3.5" style={{ color: "#EF4444" }} />}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onConfigure(node)} className="p-1 rounded hover:bg-white/50">
            <Settings className="w-3 h-3" style={{ color: "#64748B" }} />
          </button>
          <button onClick={() => onDelete(node.id)} className="p-1 rounded hover:bg-red-50">
            <Trash2 className="w-3 h-3" style={{ color: "#EF4444" }} />
          </button>
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>{node.label}</p>
        {node.config && (
          <div className="mt-2 space-y-0.5">
            {Object.entries(node.config).slice(0, 2).map(([k, v]) => (
              <div key={k} className="flex gap-1 text-xs">
                <span style={{ color: "#94A3B8" }}>{k}:</span>
                <span className="truncate font-mono" style={{ color: "#475569", maxWidth: "120px" }}>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center pb-1">
        <div className="w-2 h-2 rounded-full" style={{ background: borderColor }} />
      </div>
    </div>
  );
}

// ─── Canvas ───────────────────────────────────────────────────────────────────

function Canvas({
  nodes, onAddNode, onDeleteNode, onConfigureNode, simulatingNodeId, simulatedNodeIds,
}: {
  nodes: WorkflowNode[];
  onAddNode: (node: WorkflowNode) => void;
  onDeleteNode: (id: string) => void;
  onConfigureNode: (node: WorkflowNode) => void;
  simulatingNodeId: string | null;
  simulatedNodeIds: string[];
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "workflow-node",
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset();
      const dropTarget = document.getElementById("canvas-area");
      if (offset && dropTarget) {
        const rect = dropTarget.getBoundingClientRect();
        const newNode: WorkflowNode = {
          id: Date.now().toString(),
          type: item.type,
          label: item.label,
          icon: item.icon,
          color: item.color,
          borderColor: item.borderColor,
          x: Math.max(20, offset.x - rect.left - 100),
          y: Math.max(20, offset.y - rect.top - 40),
          config: item.config,
        };
        onAddNode(newNode);
      }
    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  }));

  return (
    <div
      id="canvas-area"
      ref={drop}
      className="relative overflow-auto rounded-xl transition-all"
      style={{
        height: "560px",
        background: isOver ? "rgba(0,201,177,0.03)" : "#FAFBFC",
        border: `2px dashed ${isOver ? "#00C9B1" : "#E2E8F0"}`,
        backgroundImage: `radial-gradient(circle, ${isOver ? "#00C9B1" : "#CBD5E1"} 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    >
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: "rgba(0,201,177,0.1)" }}>
            <Zap className="w-10 h-10" style={{ color: "#00C9B1", opacity: 0.5 }} />
          </div>
          <div className="text-center">
            <p className="font-semibold" style={{ color: "#475569" }}>Drag nodes to build your workflow</p>
            <p className="text-sm mt-1" style={{ color: "#94A3B8" }}>Start with a trigger, then add actions and conditions</p>
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: "#94A3B8" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#E8EDF5" }}>
              <Zap className="w-4 h-4" style={{ color: "#F59E0B" }} />
            </div>
            <ChevronRight className="w-3 h-3" />
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#E8EDF5" }}>
              <Filter className="w-4 h-4" style={{ color: "#6366F1" }} />
            </div>
            <ChevronRight className="w-3 h-3" />
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#E8EDF5" }}>
              <MessageSquare className="w-4 h-4" style={{ color: "#00C9B1" }} />
            </div>
          </div>
        </div>
      )}
      {/* Connection lines */}
      <svg className="absolute inset-0 pointer-events-none" style={{ width: "100%", height: "100%" }}>
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#00C9B1" />
          </marker>
          <marker id="arrowhead-done" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#10B981" />
          </marker>
        </defs>
        {nodes.map((node, i) => {
          if (i === nodes.length - 1) return null;
          const next = nodes[i + 1];
          const x1 = node.x + 100;
          const y1 = node.y + 90;
          const x2 = next.x + 100;
          const y2 = next.y;
          const isDone = simulatedNodeIds.includes(node.id) && simulatedNodeIds.includes(next.id);
          return (
            <g key={`line-${node.id}`}>
              <path
                d={`M ${x1} ${y1} C ${x1} ${y1 + 30}, ${x2} ${y2 - 30}, ${x2} ${y2}`}
                fill="none"
                stroke={isDone ? "#10B981" : "#00C9B1"}
                strokeWidth={isDone ? 2.5 : 2}
                strokeDasharray={isDone ? "none" : "5,4"}
                opacity={isDone ? 1 : 0.6}
                markerEnd={isDone ? "url(#arrowhead-done)" : "url(#arrowhead)"}
                style={{ transition: "all 0.4s" }}
              />
            </g>
          );
        })}
      </svg>
      {nodes.map((node) => {
        let simStatus: "idle" | "running" | "success" | "failed" = "idle";
        if (simulatingNodeId === node.id) simStatus = "running";
        else if (simulatedNodeIds.includes(node.id)) simStatus = "success";
        return (
          <NodeCard
            key={node.id}
            node={node}
            onDelete={onDeleteNode}
            onConfigure={onConfigureNode}
            simStatus={simStatus}
          />
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function nowTS() {
  return new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function generateSimLog(node: WorkflowNode, step: number): string {
  const typeMap: Record<string, string> = {
    trigger: `[TRIGGER] "${node.label}" activated — condition met`,
    condition: `[CONDITION] Evaluating "${node.config?.condition || "rule"}" → PASSED ✓`,
    action: `[ACTION] Executing "${node.label}" — ${Object.values(node.config || {})[0] || "processing"} ✓`,
    delay: `[DELAY] Waiting ${node.config?.duration || "delay"} before next step`,
  };
  return typeMap[node.type] || `[STEP ${step + 1}] "${node.label}" processed ✓`;
}

export function WorkflowBuilder() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [workflowName, setWorkflowName] = useState("New Workflow");
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"build" | "templates" | "saved">("build");
  const [configNode, setConfigNode] = useState<WorkflowNode | null>(null);
  const [savedMsg, setSavedMsg] = useState("");

  // Simulation state
  const [simRunning, setSimRunning] = useState(false);
  const [simulatedNodeIds, setSimulatedNodeIds] = useState<string[]>([]);
  const [simulatingNodeId, setSimulatingNodeId] = useState<string | null>(null);
  const [simLogs, setSimLogs] = useState<{ ts: string; msg: string; type: "info" | "success" | "warning" | "error" }[]>([]);
  const [simComplete, setSimComplete] = useState<"success" | null>(null);

  const handleAddNode = (node: WorkflowNode) => setNodes((prev) => [...prev, node]);
  const handleDeleteNode = (id: string) => setNodes((prev) => prev.filter((n) => n.id !== id));

  const handleSave = () => {
    setSavedMsg("Workflow saved successfully!");
    setTimeout(() => setSavedMsg(""), 3000);
  };

  const resetSim = () => {
    setSimRunning(false);
    setSimulatedNodeIds([]);
    setSimulatingNodeId(null);
    setSimLogs([]);
    setSimComplete(null);
  };

  const handleSimulate = () => {
    if (nodes.length === 0) {
      setSimLogs([{ ts: nowTS(), msg: "⚠ No nodes on canvas. Add at least one node to simulate.", type: "warning" }]);
      return;
    }
    resetSim();
    setSimRunning(true);
    const startLog = { ts: nowTS(), msg: `▶ Simulation started for workflow "${workflowName}" · ${nodes.length} nodes`, type: "info" as const };
    setSimLogs([startLog]);

    let step = 0;
    const execNext = () => {
      if (step >= nodes.length) {
        setSimulatingNodeId(null);
        setSimRunning(false);
        setSimComplete("success");
        setSimLogs((prev) => [
          ...prev,
          { ts: nowTS(), msg: `✅ Simulation complete — all ${nodes.length} nodes executed successfully.`, type: "success" },
        ]);
        return;
      }
      const node = nodes[step];
      setSimulatingNodeId(node.id);
      setSimLogs((prev) => [...prev, { ts: nowTS(), msg: generateSimLog(node, step), type: "success" }]);
      setTimeout(() => {
        setSimulatedNodeIds((prev) => [...prev, node.id]);
        step++;
        setTimeout(execNext, 400);
      }, 900);
    };
    setTimeout(execNext, 600);
  };

  const loadTemplate = (name: string) => {
    const templateNodes: WorkflowNode[] = [
      { id: "t1", type: "trigger", label: "Message Received", icon: MessageSquare, color: "from-teal-500 to-cyan-500", borderColor: "#00C9B1", x: 30, y: 30, config: { channel: "WhatsApp", keyword: "START" } },
      { id: "t2", type: "condition", label: "If / Else Branch", icon: Filter, color: "from-yellow-500 to-orange-500", borderColor: "#F59E0B", x: 260, y: 30, config: { condition: "lead_score > 40" } },
      { id: "t3", type: "action", label: "Send WhatsApp", icon: MessageSquare, color: "from-teal-600 to-green-500", borderColor: "#00C9B1", x: 490, y: 30, config: { template: "high_value_pitch", channel: "WhatsApp" } },
      { id: "t4", type: "delay", label: "Wait / Delay", icon: Clock, color: "from-slate-500 to-slate-400", borderColor: "#64748B", x: 30, y: 200, config: { duration: "24 hours" } },
      { id: "t5", type: "action", label: "Update CRM", icon: Database, color: "from-violet-600 to-violet-400", borderColor: "#7C3AED", x: 260, y: 200, config: { action: "update_lead_status", value: "nurturing" } },
    ];
    setNodes(templateNodes);
    setWorkflowName(name);
    resetSim();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {/* Header */}
        <div
          className="rounded-2xl p-7 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0A1628 0%, #1a0533 60%, #0F2547 100%)", boxShadow: "0 20px 60px rgba(10,22,40,0.35)" }}
        >
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #6366F1, transparent)", transform: "translate(20%, -20%)" }} />
          <div className="relative flex items-center justify-between gap-4 flex-wrap">
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  autoFocus
                  className="text-2xl font-bold bg-white/10 text-white px-4 py-2 rounded-xl outline-none border-2 border-white/30 w-full"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                />
              ) : (
                <h1
                  className="text-2xl font-bold text-white cursor-pointer hover:text-teal-300 transition-colors mb-1"
                  onClick={() => setIsEditing(true)}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {workflowName} ✏️
                </h1>
              )}
              <p className="text-sm" style={{ color: "#94A3B8" }}>
                Visual workflow automation builder · {nodes.length} nodes configured
              </p>
            </div>
            <div className="flex gap-2 flex-wrap justify-end">
              <button
                onClick={() => { setNodes([]); resetSim(); }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: "rgba(239,68,68,0.15)", color: "#FCA5A5", border: "1px solid rgba(239,68,68,0.3)" }}
              >
                <Trash2 className="w-4 h-4" /> Clear
              </button>
              {/* Simulate Button */}
              <button
                onClick={simRunning ? undefined : (simComplete ? resetSim : handleSimulate)}
                disabled={simRunning}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: simRunning ? "rgba(245,158,11,0.2)" : simComplete ? "rgba(16,185,129,0.2)" : "rgba(99,102,241,0.2)",
                  color: simRunning ? "#F59E0B" : simComplete ? "#10B981" : "#A78BFA",
                  border: simRunning ? "1px solid rgba(245,158,11,0.3)" : simComplete ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(99,102,241,0.3)",
                  cursor: simRunning ? "not-allowed" : "pointer",
                }}
              >
                {simRunning ? (
                  <><RefreshCw className="w-4 h-4 animate-spin" /> Simulating...</>
                ) : simComplete ? (
                  <><CheckCircle className="w-4 h-4" /> Reset Sim</>
                ) : (
                  <><Play className="w-4 h-4" /> Simulate</>
                )}
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: "rgba(255,255,255,0.1)", color: "#E2E8F0", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <Eye className="w-4 h-4" /> Preview
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: "linear-gradient(135deg, #00C9B1, #00A3E0)", color: "white", boxShadow: "0 4px 15px rgba(0,201,177,0.4)" }}
              >
                <Save className="w-4 h-4" /> Save Workflow
              </button>
            </div>
          </div>
          {savedMsg && (
            <div className="absolute bottom-4 right-4 px-4 py-2 rounded-lg text-sm font-medium" style={{ background: "#10B981", color: "white" }}>
              ✓ {savedMsg}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {[
            { id: "build", label: "Build Workflow", icon: Zap },
            { id: "templates", label: "Template Library", icon: Copy },
            { id: "saved", label: "Saved Workflows", icon: Star },
          ].map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: activeTab === tab.id ? "linear-gradient(135deg, #00C9B1, #6366F1)" : "white",
                  color: activeTab === tab.id ? "white" : "#64748B",
                  border: "1px solid #E8EDF5",
                  boxShadow: activeTab === tab.id ? "0 4px 15px rgba(0,201,177,0.3)" : "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                <TabIcon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Build Tab */}
        {activeTab === "build" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Toolbox */}
            <div className="lg:col-span-1 space-y-4">
              {toolboxConfig.map((group) => {
                const GroupIcon = group.icon;
                return (
                  <div key={group.group} className="bg-white rounded-2xl p-4" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${group.color}20` }}>
                        <GroupIcon className="w-3.5 h-3.5" style={{ color: group.color }} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#475569" }}>{group.group}</span>
                    </div>
                    <div className="space-y-1.5">
                      {group.items.map((item, idx) => <ToolboxItem key={idx} item={item} />)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Canvas + Sim Logs */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-bold" style={{ color: "#0F172A" }}>Workflow Canvas</h3>
                    <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(0,201,177,0.1)", color: "#00C9B1" }}>
                      {nodes.length} nodes
                    </span>
                    {simRunning && (
                      <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full" style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B" }}>
                        <RefreshCw className="w-3 h-3 animate-spin" /> Simulating...
                      </span>
                    )}
                    {simComplete && (
                      <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>
                        <CheckCircle className="w-3 h-3" /> Simulation Complete
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: "#94A3B8" }}>
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Auto-connect enabled
                  </div>
                </div>
                <Canvas
                  nodes={nodes}
                  onAddNode={handleAddNode}
                  onDeleteNode={handleDeleteNode}
                  onConfigureNode={setConfigNode}
                  simulatingNodeId={simulatingNodeId}
                  simulatedNodeIds={simulatedNodeIds}
                />
              </div>

              {/* Simulation Execution Logs */}
              {simLogs.length > 0 && (
                <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" style={{ color: "#6366F1" }} />
                      <span className="font-bold text-sm" style={{ color: "#0F172A" }}>Simulation Execution Log</span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(99,102,241,0.1)", color: "#6366F1" }}>
                        {simLogs.length} events
                      </span>
                    </div>
                    <button onClick={resetSim} className="text-xs font-medium" style={{ color: "#94A3B8" }}>Clear</button>
                  </div>
                  <div
                    className="rounded-xl p-4 space-y-2 overflow-y-auto"
                    style={{ background: "#0A1628", maxHeight: "220px", fontFamily: "'JetBrains Mono', 'Courier New', monospace" }}
                  >
                    {simLogs.map((log, i) => (
                      <div key={i} className="flex gap-3 text-xs">
                        <span style={{ color: "#475569", flexShrink: 0 }}>{log.ts}</span>
                        <span style={{
                          color: log.type === "success" ? "#10B981"
                            : log.type === "warning" ? "#F59E0B"
                            : log.type === "error" ? "#EF4444"
                            : "#94A3B8",
                        }}>
                          {log.msg}
                        </span>
                      </div>
                    ))}
                    {simRunning && (
                      <div className="flex gap-3 text-xs">
                        <span style={{ color: "#475569" }}>{nowTS()}</span>
                        <span style={{ color: "#F59E0B" }}>
                          ⟳ Processing next node...
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Node Stats */}
              {nodes.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "Triggers", count: nodes.filter((n) => n.type === "trigger").length, color: "#F59E0B", icon: Zap },
                    { label: "Actions", count: nodes.filter((n) => n.type === "action").length, color: "#6366F1", icon: Play },
                    { label: "Conditions", count: nodes.filter((n) => n.type === "condition").length, color: "#EC4899", icon: Filter },
                    { label: "Delays", count: nodes.filter((n) => n.type === "delay").length, color: "#64748B", icon: Clock },
                  ].map((stat) => {
                    const StatIcon = stat.icon;
                    return (
                      <div key={stat.label} className="bg-white rounded-xl p-4 text-center" style={{ border: "1px solid #E8EDF5" }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ background: `${stat.color}15` }}>
                          <StatIcon className="w-4 h-4" style={{ color: stat.color }} />
                        </div>
                        <div className="font-bold text-xl" style={{ color: "#0F172A" }}>{stat.count}</div>
                        <div className="text-xs" style={{ color: "#94A3B8" }}>{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === "templates" && (
          <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <h3 className="font-bold text-lg mb-1" style={{ color: "#0F172A" }}>Pre-built Workflow Templates</h3>
            <p className="text-sm mb-5" style={{ color: "#64748B" }}>Load a proven automation template and customize it for your needs</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {prebuiltWorkflows.map((wf) => (
                <div key={wf.id} className="rounded-xl p-5 hover:shadow-md transition-all" style={{ border: "1px solid #E8EDF5", background: "#FAFBFC" }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="px-2 py-1 rounded-lg text-xs font-semibold" style={{ background: "rgba(99,102,241,0.1)", color: "#6366F1" }}>
                      {wf.category}
                    </div>
                    <span className="text-xs" style={{ color: "#94A3B8" }}>{wf.nodes} nodes</span>
                  </div>
                  <h4 className="font-bold mb-1" style={{ color: "#0F172A" }}>{wf.name}</h4>
                  <div className="flex items-center gap-1 mb-4">
                    <span className="text-xs" style={{ color: "#94A3B8" }}>Avg conversion:</span>
                    <span className="text-xs font-bold" style={{ color: "#10B981" }}>{wf.conversions}</span>
                  </div>
                  <button
                    onClick={() => { loadTemplate(wf.name); setActiveTab("build"); }}
                    className="w-full py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
                    style={{ background: "linear-gradient(135deg, #00C9B1, #6366F1)", color: "white" }}
                  >
                    <Plus className="w-4 h-4" /> Use Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Saved Tab */}
        {activeTab === "saved" && (
          <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-lg" style={{ color: "#0F172A" }}>Saved Workflows</h3>
                <p className="text-sm" style={{ color: "#64748B" }}>All your automation workflows in one place</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: "linear-gradient(135deg, #00C9B1, #6366F1)", color: "white" }}>
                <Plus className="w-4 h-4" /> New Workflow
              </button>
            </div>
            <div className="space-y-3">
              {existingWorkflows.map((wf) => (
                <div key={wf.id} className="flex items-center gap-4 p-4 rounded-xl hover:shadow-sm transition-all" style={{ border: "1px solid #E8EDF5", background: "#FAFBFC" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: wf.status === "active" ? "rgba(0,201,177,0.1)" : wf.status === "paused" ? "rgba(245,158,11,0.1)" : "rgba(100,116,139,0.1)" }}
                  >
                    <Zap className="w-5 h-5" style={{ color: wf.status === "active" ? "#00C9B1" : wf.status === "paused" ? "#F59E0B" : "#94A3B8" }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm" style={{ color: "#0F172A" }}>{wf.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{
                        background: wf.status === "active" ? "rgba(16,185,129,0.1)" : wf.status === "paused" ? "rgba(245,158,11,0.1)" : "#F1F5F9",
                        color: wf.status === "active" ? "#10B981" : wf.status === "paused" ? "#F59E0B" : "#94A3B8",
                      }}>
                        {wf.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs" style={{ color: "#94A3B8" }}>
                      <span>{wf.nodes} nodes</span>
                      <span>·</span>
                      <span>{wf.runs.toLocaleString()} runs</span>
                      <span>·</span>
                      <span>Last: {wf.lastRun}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { loadTemplate(wf.name); setActiveTab("build"); }}
                      className="text-xs px-3 py-1.5 rounded-lg font-medium"
                      style={{ background: "rgba(0,201,177,0.1)", color: "#00C9B1" }}
                    >
                      Open
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-slate-100">
                      <MoreHorizontal className="w-4 h-4" style={{ color: "#94A3B8" }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Node Configure Panel */}
        {configNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" style={{ border: "1px solid #E8EDF5" }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold" style={{ color: "#0F172A" }}>Configure: {configNode.label}</h3>
                <button onClick={() => setConfigNode(null)}>
                  <X className="w-5 h-5" style={{ color: "#94A3B8" }} />
                </button>
              </div>
              <div className="space-y-3">
                {Object.entries(configNode.config || {}).map(([key, val]) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>{key}</label>
                    <input
                      defaultValue={val}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setConfigNode(null)} className="flex-1 py-2.5 rounded-xl text-sm" style={{ background: "#F1F5F9", color: "#64748B" }}>Cancel</button>
                <button
                  onClick={() => { setSavedMsg("Node configuration saved!"); setConfigNode(null); setTimeout(() => setSavedMsg(""), 2000); }}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ background: "linear-gradient(135deg, #00C9B1, #6366F1)", color: "white" }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
}
