import { useState } from "react";
import {
  MessageSquare,
  Mail,
  Phone,
  Send,
  Search,
  Filter,
  ChevronDown,
  Clock,
  CheckCheck,
  Check,
  Star,
  MoreHorizontal,
  Plus,
  Paperclip,
  Smile,
  Image,
  FileText,
  Radio,
  Users,
  Zap,
  ArrowRight,
} from "lucide-react";

const conversations = [
  {
    id: "conv1", name: "Riya Sharma", phone: "+971 50 123 4567", channel: "WhatsApp",
    lastMsg: "Yes, I'd like to know more about the Enterprise plan", time: "2m", unread: 2,
    status: "active", avatar: "RS", avatarColor: "#00C9B1", tag: "Hot Lead",
    messages: [
      { id: 1, from: "contact", text: "Hi there! I saw your WhatsApp campaign", time: "10:20 AM", status: "read" },
      { id: 2, from: "agent", text: "Hello Riya! Thanks for reaching out. How can we help you today? 😊", time: "10:21 AM", status: "delivered" },
      { id: 3, from: "contact", text: "I'm interested in your C-PaaS platform for my company", time: "10:23 AM", status: "read" },
      { id: 4, from: "agent", text: "Great! We offer enterprise-grade messaging APIs with WhatsApp, SMS, Email & Voice. Which channels are you looking to integrate?", time: "10:24 AM", status: "delivered" },
      { id: 5, from: "contact", text: "Yes, I'd like to know more about the Enterprise plan", time: "10:26 AM", status: "read" },
    ]
  },
  {
    id: "conv2", name: "Ahmed Al-Rashid", phone: "+971 55 987 6543", channel: "WhatsApp",
    lastMsg: "Can you share the pricing for 50k messages/month?", time: "15m", unread: 1,
    status: "active", avatar: "AA", avatarColor: "#6366F1", tag: "Enterprise",
    messages: [
      { id: 1, from: "contact", text: "Hello, I need bulk messaging for my retail chain", time: "9:45 AM", status: "read" },
      { id: 2, from: "agent", text: "Hi Ahmed! We'd be happy to help. What's your monthly volume?", time: "9:47 AM", status: "delivered" },
      { id: 3, from: "contact", text: "About 50,000 messages/month across WhatsApp and SMS", time: "9:50 AM", status: "read" },
      { id: 4, from: "contact", text: "Can you share the pricing for 50k messages/month?", time: "9:52 AM", status: "read" },
    ]
  },
  {
    id: "conv3", name: "Priya Menon", phone: "priya.menon@techcorp.ae", channel: "Email",
    lastMsg: "Sent the demo request confirmation", time: "1h", unread: 0,
    status: "resolved", avatar: "PM", avatarColor: "#8B5CF6", tag: "Demo Request",
    messages: [
      { id: 1, from: "contact", text: "I'd like to schedule a product demo for our team of 200 users", time: "8:30 AM", status: "read" },
      { id: 2, from: "agent", text: "Absolutely! We can schedule a 45-minute demo this week. What timezone are you in?", time: "8:35 AM", status: "delivered" },
      { id: 3, from: "agent", text: "Sent the demo request confirmation", time: "8:45 AM", status: "delivered" },
    ]
  },
  {
    id: "conv4", name: "Khalid Ibrahim", phone: "+971 52 456 7890", channel: "SMS",
    lastMsg: "STOP", time: "2h", unread: 0,
    status: "opted-out", avatar: "KI", avatarColor: "#F59E0B", tag: "Unsubscribed",
    messages: [
      { id: 1, from: "agent", text: "Hi Khalid! Special offer just for you: 30% off on annual plans. Reply YES to claim.", time: "7:00 AM", status: "delivered" },
      { id: 2, from: "contact", text: "STOP", time: "7:15 AM", status: "read" },
    ]
  },
  {
    id: "conv5", name: "Sara Al-Zaabi", phone: "+971 56 321 0987", channel: "Voice",
    lastMsg: "Call completed — 4m 23s · Recording available", time: "3h", unread: 0,
    status: "resolved", avatar: "SZ", avatarColor: "#EC4899", tag: "Support",
    messages: [
      { id: 1, from: "agent", text: "📞 Outbound call initiated", time: "6:00 AM", status: "delivered" },
      { id: 2, from: "agent", text: "Call completed — 4m 23s · Recording available", time: "6:04 AM", status: "delivered" },
    ]
  },
  {
    id: "conv6", name: "Mohammed Tariq", phone: "+971 50 999 8877", channel: "WhatsApp",
    lastMsg: "Thanks! Will review the proposal and get back", time: "4h", unread: 0,
    status: "pending", avatar: "MT", avatarColor: "#10B981", tag: "Proposal Sent",
    messages: [
      { id: 1, from: "agent", text: "Hi Mohammed! Here's the detailed proposal for your review 📄", time: "5:00 AM", status: "delivered" },
      { id: 2, from: "contact", text: "Thanks! Will review the proposal and get back", time: "5:30 AM", status: "read" },
    ]
  },
];

const channelColors: Record<string, { bg: string; text: string; icon: any }> = {
  WhatsApp: { bg: "rgba(0,201,177,0.1)", text: "#00C9B1", icon: MessageSquare },
  Email: { bg: "rgba(99,102,241,0.1)", text: "#6366F1", icon: Mail },
  SMS: { bg: "rgba(139,92,246,0.1)", text: "#8B5CF6", icon: MessageSquare },
  Voice: { bg: "rgba(245,158,11,0.1)", text: "#F59E0B", icon: Phone },
};

const statusColors: Record<string, { bg: string; text: string }> = {
  active: { bg: "rgba(16,185,129,0.1)", text: "#10B981" },
  resolved: { bg: "rgba(100,116,139,0.1)", text: "#64748B" },
  pending: { bg: "rgba(245,158,11,0.1)", text: "#F59E0B" },
  "opted-out": { bg: "rgba(239,68,68,0.1)", text: "#EF4444" },
};

const broadcastTemplates = [
  { id: "bt1", name: "Welcome Onboarding", channel: "WhatsApp", preview: "Hi {{name}}! 👋 Welcome to..." },
  { id: "bt2", name: "Spring Sale Alert", channel: "SMS", preview: "🔥 FLASH SALE! Get {{discount}}% off..." },
  { id: "bt3", name: "Product Launch", channel: "Email", preview: "Introducing our latest innovation..." },
  { id: "bt4", name: "Payment Reminder", channel: "WhatsApp", preview: "Hi {{name}}, your payment of..." },
];

export function CommunicationEngine() {
  const [selectedConv, setSelectedConv] = useState(conversations[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"inbox" | "broadcast" | "api">("inbox");
  const [msgInput, setMsgInput] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("WhatsApp");
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [broadcastAudience, setBroadcastAudience] = useState("All Contacts");
  const [sent, setSent] = useState(false);

  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastMsg.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMsg = () => {
    if (!msgInput.trim()) return;
    setMsgInput("");
  };

  const handleBroadcast = () => {
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setBroadcastMsg("");
  };

  const ChannelIcon = channelColors[selectedConv.channel]?.icon || MessageSquare;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="rounded-2xl p-7 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A1628 0%, #0F2547 50%, #0A3340 100%)",
          boxShadow: "0 20px 60px rgba(10,22,40,0.35)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #00C9B1, transparent)", transform: "translate(25%, -25%)" }}
        />
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Communication Engine
            </h1>
            <p className="text-sm" style={{ color: "#94A3B8" }}>
              Unified multi-channel inbox · {conversations.filter((c) => c.unread > 0).length} unread conversations
            </p>
          </div>
          <div className="flex gap-4 text-center">
            {[
              { label: "Open", val: conversations.filter(c => c.status === "active").length, color: "#00C9B1" },
              { label: "Pending", val: conversations.filter(c => c.status === "pending").length, color: "#F59E0B" },
              { label: "Resolved", val: conversations.filter(c => c.status === "resolved").length, color: "#10B981" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold" style={{ color: s.color }}>{s.val}</div>
                <div className="text-xs" style={{ color: "#94A3B8" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { id: "inbox", label: "Unified Inbox", icon: MessageSquare },
          { id: "broadcast", label: "Broadcast", icon: Radio },
          { id: "api", label: "API Logs", icon: Zap },
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

      {/* Inbox Tab */}
      {activeTab === "inbox" && (
        <div
          className="bg-white rounded-2xl overflow-hidden"
          style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", height: "660px" }}
        >
          <div className="flex h-full">
            {/* Conversation List */}
            <div className="w-80 flex-shrink-0 border-r flex flex-col" style={{ borderColor: "#F1F5F9" }}>
              <div className="p-4 border-b" style={{ borderColor: "#F1F5F9" }}>
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: "#F8FAFC", border: "1px solid #E8EDF5" }}
                >
                  <Search className="w-4 h-4" style={{ color: "#94A3B8" }} />
                  <input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-sm outline-none flex-1"
                    style={{ color: "#0F172A" }}
                  />
                </div>
                <div className="flex gap-1.5 mt-3">
                  {["All", "WA", "SMS", "Email"].map((f) => (
                    <button
                      key={f}
                      className="flex-1 py-1 rounded-lg text-xs font-medium transition-all"
                      style={{ background: f === "All" ? "#0F172A" : "#F1F5F9", color: f === "All" ? "white" : "#64748B" }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {filtered.map((conv) => {
                  const CIcon = channelColors[conv.channel]?.icon || MessageSquare;
                  return (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConv(conv)}
                      className="w-full text-left p-4 border-b transition-all hover:bg-slate-50"
                      style={{
                        borderColor: "#F8FAFC",
                        background: selectedConv.id === conv.id ? "rgba(0,201,177,0.05)" : "white",
                        borderLeft: selectedConv.id === conv.id ? "3px solid #00C9B1" : "3px solid transparent",
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                            style={{ background: conv.avatarColor }}
                          >
                            {conv.avatar}
                          </div>
                          <div
                            className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-md flex items-center justify-center"
                            style={{ background: channelColors[conv.channel]?.bg, border: "1px solid white" }}
                          >
                            <CIcon className="w-2.5 h-2.5" style={{ color: channelColors[conv.channel]?.text }} />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold truncate" style={{ color: "#0F172A" }}>{conv.name}</span>
                            <span className="text-xs flex-shrink-0 ml-1" style={{ color: "#94A3B8" }}>{conv.time}</span>
                          </div>
                          <p className="text-xs truncate mt-0.5" style={{ color: "#64748B" }}>{conv.lastMsg}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <span
                              className="text-xs px-1.5 py-0.5 rounded"
                              style={{ background: channelColors[conv.channel]?.bg, color: channelColors[conv.channel]?.text, fontSize: "10px" }}
                            >
                              {conv.channel}
                            </span>
                            {conv.tag && (
                              <span
                                className="text-xs px-1.5 py-0.5 rounded"
                                style={{ background: "#F1F5F9", color: "#64748B", fontSize: "10px" }}
                              >
                                {conv.tag}
                              </span>
                            )}
                          </div>
                        </div>
                        {conv.unread > 0 && (
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0"
                            style={{ background: "#00C9B1", fontSize: "10px", fontWeight: "700" }}
                          >
                            {conv.unread}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div
                className="p-4 border-b flex items-center justify-between"
                style={{ borderColor: "#F1F5F9" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: selectedConv.avatarColor }}
                  >
                    {selectedConv.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold" style={{ color: "#0F172A" }}>{selectedConv.name}</span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: statusColors[selectedConv.status]?.bg,
                          color: statusColors[selectedConv.status]?.text,
                        }}
                      >
                        {selectedConv.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <ChannelIcon className="w-3 h-3" style={{ color: channelColors[selectedConv.channel]?.text }} />
                      <span className="text-xs" style={{ color: "#94A3B8" }}>{selectedConv.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{ background: "rgba(0,201,177,0.1)", color: "#00C9B1" }}
                  >
                    + Assign
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}
                  >
                    ✓ Resolve
                  </button>
                  <button className="p-1.5 rounded-lg" style={{ background: "#F1F5F9" }}>
                    <MoreHorizontal className="w-4 h-4" style={{ color: "#94A3B8" }} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ background: "#FAFBFD" }}>
                {selectedConv.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.from === "agent" ? "justify-end" : "justify-start"}`}>
                    {msg.from === "contact" && (
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 mt-1"
                        style={{ background: selectedConv.avatarColor }}
                      >
                        {selectedConv.avatar[0]}
                      </div>
                    )}
                    <div style={{ maxWidth: "70%" }}>
                      <div
                        className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                        style={{
                          background: msg.from === "agent"
                            ? "linear-gradient(135deg, #00C9B1, #00A3E0)"
                            : "white",
                          color: msg.from === "agent" ? "white" : "#334155",
                          border: msg.from === "contact" ? "1px solid #E8EDF5" : "none",
                          borderRadius: msg.from === "agent" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                        }}
                      >
                        {msg.text}
                      </div>
                      <div className={`flex items-center gap-1 mt-1 ${msg.from === "agent" ? "justify-end" : ""}`}>
                        <span className="text-xs" style={{ color: "#94A3B8" }}>{msg.time}</span>
                        {msg.from === "agent" && (
                          <CheckCheck className="w-3 h-3" style={{ color: msg.status === "read" ? "#00C9B1" : "#94A3B8" }} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t" style={{ borderColor: "#F1F5F9" }}>
                <div
                  className="flex items-end gap-2 p-3 rounded-2xl"
                  style={{ border: "1px solid #E8EDF5", background: "white" }}
                >
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                      <Paperclip className="w-4 h-4" style={{ color: "#94A3B8" }} />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                      <Image className="w-4 h-4" style={{ color: "#94A3B8" }} />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                      <FileText className="w-4 h-4" style={{ color: "#94A3B8" }} />
                    </button>
                  </div>
                  <textarea
                    value={msgInput}
                    onChange={(e) => setMsgInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMsg(); } }}
                    placeholder={`Type a message via ${selectedConv.channel}...`}
                    className="flex-1 outline-none resize-none text-sm leading-relaxed"
                    style={{ color: "#0F172A", minHeight: "36px", maxHeight: "100px" }}
                    rows={1}
                  />
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                      <Smile className="w-4 h-4" style={{ color: "#94A3B8" }} />
                    </button>
                    <button
                      onClick={handleSendMsg}
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                      style={{
                        background: msgInput.trim() ? "linear-gradient(135deg, #00C9B1, #00A3E0)" : "#F1F5F9",
                        boxShadow: msgInput.trim() ? "0 4px 12px rgba(0,201,177,0.4)" : "none",
                      }}
                    >
                      <Send className="w-4 h-4" style={{ color: msgInput.trim() ? "white" : "#94A3B8" }} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 px-1">
                  <div className="flex gap-2">
                    {["Template", "AI Assist", "Quick Reply"].map((action) => (
                      <button
                        key={action}
                        className="text-xs px-2.5 py-1 rounded-lg transition-all"
                        style={{ background: "#F8FAFC", color: "#64748B", border: "1px solid #E8EDF5" }}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                  <span className="text-xs" style={{ color: "#94A3B8" }}>
                    {msgInput.length}/1024
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Contact Info */}
            <div
              className="w-64 flex-shrink-0 border-l flex flex-col overflow-y-auto"
              style={{ borderColor: "#F1F5F9" }}
            >
              <div className="p-4 text-center border-b" style={{ borderColor: "#F1F5F9" }}>
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-3"
                  style={{ background: selectedConv.avatarColor }}
                >
                  {selectedConv.avatar}
                </div>
                <h4 className="font-bold" style={{ color: "#0F172A" }}>{selectedConv.name}</h4>
                <p className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>{selectedConv.phone}</p>
                <div className="flex gap-1.5 justify-center mt-2">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: channelColors[selectedConv.channel]?.bg, color: channelColors[selectedConv.channel]?.text }}
                  >
                    {selectedConv.channel}
                  </span>
                  {selectedConv.tag && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: "#F1F5F9", color: "#64748B" }}
                    >
                      {selectedConv.tag}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#94A3B8" }}>Contact Details</h5>
                  <div className="space-y-2">
                    {[
                      { label: "Lead Score", value: "87/100" },
                      { label: "Interactions", value: "14" },
                      { label: "Last Seen", value: "2m ago" },
                      { label: "Source", value: "WhatsApp Ad" },
                      { label: "CRM Status", value: "Qualified" },
                    ].map((detail) => (
                      <div key={detail.label} className="flex items-center justify-between">
                        <span className="text-xs" style={{ color: "#94A3B8" }}>{detail.label}</span>
                        <span className="text-xs font-semibold" style={{ color: "#334155" }}>{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#94A3B8" }}>Quick Actions</h5>
                  <div className="space-y-2">
                    {["Add to Campaign", "Create Ticket", "Schedule Follow-up", "Update CRM"].map((action) => (
                      <button
                        key={action}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all hover:bg-slate-50"
                        style={{ border: "1px solid #E8EDF5", color: "#334155" }}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Broadcast Tab */}
      {activeTab === "broadcast" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            className="lg:col-span-2 bg-white rounded-2xl p-6"
            style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
          >
            <h3 className="font-bold text-lg mb-1" style={{ color: "#0F172A" }}>Create Broadcast</h3>
            <p className="text-sm mb-6" style={{ color: "#64748B" }}>Send a message to a segment of your audience</p>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#475569" }}>Channel</label>
                <div className="flex gap-2">
                  {["WhatsApp", "SMS", "Email", "Voice"].map((ch) => (
                    <button
                      key={ch}
                      onClick={() => setSelectedChannel(ch)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
                      style={{
                        background: selectedChannel === ch ? channelColors[ch]?.bg : "#F8FAFC",
                        color: selectedChannel === ch ? channelColors[ch]?.text : "#64748B",
                        border: `1px solid ${selectedChannel === ch ? channelColors[ch]?.text + "40" : "#E8EDF5"}`,
                      }}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#475569" }}>Select Template</label>
                <select
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                >
                  <option>Choose a template...</option>
                  {broadcastTemplates.filter(t => t.channel === selectedChannel).map(t => (
                    <option key={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#475569" }}>Target Audience</label>
                <select
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A" }}
                  value={broadcastAudience}
                  onChange={(e) => setBroadcastAudience(e.target.value)}
                >
                  <option>All Contacts (847,320)</option>
                  <option>Hot Leads (12,450)</option>
                  <option>Enterprise Tier (3,200)</option>
                  <option>Inactive 90d (45,000)</option>
                  <option>Custom Segment...</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#475569" }}>Message Content</label>
                <textarea
                  value={broadcastMsg}
                  onChange={(e) => setBroadcastMsg(e.target.value)}
                  placeholder="Type your message or select a template above..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ border: "1px solid #E8EDF5", background: "#F8FAFC", color: "#0F172A", minHeight: "120px" }}
                />
              </div>
              <div className="flex gap-3">
                <button
                  className="flex-1 py-3 rounded-xl text-sm font-medium"
                  style={{ background: "#F1F5F9", color: "#64748B" }}
                >
                  Schedule
                </button>
                <button
                  onClick={handleBroadcast}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #00C9B1, #6366F1)",
                    color: "white",
                    boxShadow: "0 4px 15px rgba(0,201,177,0.4)",
                  }}
                >
                  <Send className="w-4 h-4" />
                  {sent ? "✓ Sent!" : "Send Broadcast"}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div
              className="bg-white rounded-2xl p-5"
              style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
            >
              <h4 className="font-bold mb-4" style={{ color: "#0F172A" }}>Broadcast Stats</h4>
              {[
                { label: "Sent Today", val: "24,500", color: "#6366F1" },
                { label: "Delivered", val: "24,280", color: "#10B981" },
                { label: "Opened", val: "17,320", color: "#00C9B1" },
                { label: "Clicked", val: "6,840", color: "#F59E0B" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: "#F1F5F9" }}>
                  <span className="text-sm" style={{ color: "#64748B" }}>{s.label}</span>
                  <span className="font-bold text-sm" style={{ color: s.color }}>{s.val}</span>
                </div>
              ))}
            </div>
            <div
              className="bg-white rounded-2xl p-5"
              style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
            >
              <h4 className="font-bold mb-3" style={{ color: "#0F172A" }}>Recent Broadcasts</h4>
              <div className="space-y-3">
                {["Spring Flash Sale", "New Feature Alert", "Weekly Digest"].map((b, i) => (
                  <div key={b} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#334155" }}>{b}</p>
                      <p className="text-xs" style={{ color: "#94A3B8" }}>{["2h ago", "Yesterday", "3 days ago"][i]}</p>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}
                    >
                      Sent
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API Logs Tab */}
      {activeTab === "api" && (
        <div
          className="bg-white rounded-2xl p-6"
          style={{ border: "1px solid #E8EDF5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          <h3 className="font-bold text-lg mb-5" style={{ color: "#0F172A" }}>API Request Logs</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                  {["Timestamp", "Method", "Endpoint", "Channel", "Status", "Latency"].map((h) => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "#94A3B8" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { time: "10:26:45", method: "POST", endpoint: "/v1/messages/send", channel: "WhatsApp", status: 200, latency: "142ms" },
                  { time: "10:26:42", method: "GET", endpoint: "/v1/templates/list", channel: "Email", status: 200, latency: "88ms" },
                  { time: "10:26:38", method: "POST", endpoint: "/v1/sms/bulk", channel: "SMS", status: 200, latency: "210ms" },
                  { time: "10:26:30", method: "POST", endpoint: "/v1/voice/call", channel: "Voice", status: 200, latency: "320ms" },
                  { time: "10:26:22", method: "PUT", endpoint: "/v1/contact/update", channel: "CRM", status: 200, latency: "95ms" },
                  { time: "10:26:10", method: "POST", endpoint: "/v1/campaign/trigger", channel: "WhatsApp", status: 201, latency: "175ms" },
                  { time: "10:25:55", method: "GET", endpoint: "/v1/analytics/stats", channel: "API", status: 200, latency: "67ms" },
                  { time: "10:25:40", method: "POST", endpoint: "/v1/messages/send", channel: "Email", status: 422, latency: "201ms" },
                ].map((log, i) => (
                  <tr key={i} className="border-b hover:bg-slate-50 transition-colors" style={{ borderColor: "#F8FAFC" }}>
                    <td className="py-3 px-4 text-xs font-mono" style={{ color: "#64748B" }}>{log.time}</td>
                    <td className="py-3 px-4">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded"
                        style={{
                          background: log.method === "POST" ? "rgba(99,102,241,0.1)" : log.method === "GET" ? "rgba(0,201,177,0.1)" : "rgba(245,158,11,0.1)",
                          color: log.method === "POST" ? "#6366F1" : log.method === "GET" ? "#00C9B1" : "#F59E0B",
                        }}
                      >
                        {log.method}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs font-mono" style={{ color: "#334155" }}>{log.endpoint}</td>
                    <td className="py-3 px-4 text-xs" style={{ color: "#64748B" }}>{log.channel}</td>
                    <td className="py-3 px-4">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded"
                        style={{
                          background: log.status < 300 ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                          color: log.status < 300 ? "#10B981" : "#EF4444",
                        }}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs font-mono" style={{ color: "#64748B" }}>{log.latency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
