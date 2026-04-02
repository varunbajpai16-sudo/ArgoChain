import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Farm Produce", path: "/farm-produce" },
  { name: "Supply Tracking", path: "/supply-tracking" },
  { name: "Smart Contracts", path: "/smart-contracts" },
  { name: "Market Insights", path: "/market-insights" },
  { name: "About", path: "/about" },
];

const CONTRACTS = [
  {
    id: "AGC-SC-4821",
    title: "Grain Sale Contract",
    type: "Sale Agreement",
    icon: "🌾",
    buyer: "AgriCorp Ltd.",
    buyerAvatar: "AC",
    seller: "Rajesh Kumar",
    sellerAvatar: "RK",
    produce: "Basmati Rice – 48 Tons",
    value: "₹1,53,600",
    status: "Active",
    statusColor: "#16a34a",
    statusBg: "#dcfce7",
    created: "Mar 15, 2026",
    expiry: "Apr 15, 2026",
    progress: 68,
    milestones: [
      { label: "Contract Signed", done: true, date: "Mar 15" },
      { label: "Produce Dispatched", done: true, date: "Mar 28" },
      { label: "Quality Verified", done: true, date: "Mar 29" },
      { label: "In Transit", done: false, date: "Apr 01" },
      { label: "Payment Released", done: false, date: "Apr 02" },
    ],
    blockchain: "0x4f2ae8c81d9b3f72",
    autoPayment: true,
    dispute: false,
    color: "#16a34a",
    terms: ["Full payment on delivery", "Quality grade A+ required", "Cold chain maintained", "Insurance covered by buyer"],
  },
  {
    id: "AGC-SC-4820",
    title: "Rice Export Agreement",
    type: "Export Contract",
    icon: "🍚",
    buyer: "Global Traders Pvt.",
    buyerAvatar: "GT",
    seller: "Suresh Patel",
    sellerAvatar: "SP",
    produce: "Wheat HD-2967 – 125 Tons",
    value: "₹2,85,000",
    status: "Pending Signature",
    statusColor: "#f59e0b",
    statusBg: "#fef9c3",
    created: "Mar 29, 2026",
    expiry: "May 01, 2026",
    progress: 20,
    milestones: [
      { label: "Draft Created", done: true, date: "Mar 29" },
      { label: "Buyer Review", done: true, date: "Mar 30" },
      { label: "Seller Signature", done: false, date: "Pending" },
      { label: "Produce Dispatch", done: false, date: "Apr 05" },
      { label: "Payment Released", done: false, date: "Apr 10" },
    ],
    blockchain: "0x7e1ba39cf0d82b41",
    autoPayment: true,
    dispute: false,
    color: "#f59e0b",
    terms: ["50% advance on signing", "Phytosanitary certificate required", "FOB Mumbai port", "Delivery within 7 days"],
  },
  {
    id: "AGC-SC-4819",
    title: "Mango Export Deal",
    type: "Export Contract",
    icon: "🥭",
    buyer: "FreshMart Europe",
    buyerAvatar: "FE",
    seller: "Priya Desai",
    sellerAvatar: "PD",
    produce: "Alphonso Mangoes – 3.5 Tons",
    value: "₹4,20,000",
    status: "Disputed",
    statusColor: "#ef4444",
    statusBg: "#fee2e2",
    created: "Mar 10, 2026",
    expiry: "Apr 05, 2026",
    progress: 55,
    milestones: [
      { label: "Contract Signed", done: true, date: "Mar 10" },
      { label: "Produce Dispatched", done: true, date: "Mar 29" },
      { label: "Quality Dispute Filed", done: true, date: "Mar 31" },
      { label: "Arbitration Review", done: false, date: "Apr 03" },
      { label: "Resolution & Payment", done: false, date: "Apr 05" },
    ],
    blockchain: "0xb17e2c908f3a1d56",
    autoPayment: false,
    dispute: true,
    color: "#ef4444",
    terms: ["GI certified produce only", "Brix level ≥ 18", "Cold chain at 12°C", "Payment within 48h of delivery"],
  },
  {
    id: "AGC-SC-4818",
    title: "Toor Dal Supply",
    type: "Supply Agreement",
    icon: "🫘",
    buyer: "Hyderabad Wholesale",
    buyerAvatar: "HW",
    seller: "Mohan Lal",
    sellerAvatar: "ML",
    produce: "Toor Dal – 22 Tons",
    value: "₹1,49,600",
    status: "Completed",
    statusColor: "#6366f1",
    statusBg: "#ede9fe",
    created: "Mar 01, 2026",
    expiry: "Mar 30, 2026",
    progress: 100,
    milestones: [
      { label: "Contract Signed", done: true, date: "Mar 01" },
      { label: "Produce Dispatched", done: true, date: "Mar 15" },
      { label: "Quality Verified", done: true, date: "Mar 20" },
      { label: "Delivered", done: true, date: "Mar 25" },
      { label: "Payment Released", done: true, date: "Mar 26" },
    ],
    blockchain: "0x5f3a8b1cd4e92f07",
    autoPayment: true,
    dispute: false,
    color: "#6366f1",
    terms: ["Net-7 payment terms", "Grade A produce", "Bulk delivery accepted", "MSP price guaranteed"],
  },
  {
    id: "AGC-SC-4817",
    title: "Spice Export Contract",
    type: "Export Contract",
    icon: "🌶️",
    buyer: "Chennai Spice Co.",
    buyerAvatar: "CS",
    seller: "Venkat Rao",
    sellerAvatar: "VR",
    produce: "Green Chillies – 8 Tons",
    value: "₹1,16,000",
    status: "Completed",
    statusColor: "#6366f1",
    statusBg: "#ede9fe",
    created: "Feb 20, 2026",
    expiry: "Mar 28, 2026",
    progress: 100,
    milestones: [
      { label: "Contract Signed", done: true, date: "Feb 20" },
      { label: "Produce Dispatched", done: true, date: "Mar 26" },
      { label: "Quality Verified", done: true, date: "Mar 27" },
      { label: "Delivered", done: true, date: "Mar 28" },
      { label: "Payment Released", done: true, date: "Mar 28" },
    ],
    blockchain: "0x2a8cd41fb83e5c90",
    autoPayment: true,
    dispute: false,
    color: "#6366f1",
    terms: ["Same-day payment on delivery", "Spicy grade A+", "Moisture < 8%", "Packed in 25kg bags"],
  },
];

const STATUS_FILTERS = ["All", "Active", "Pending Signature", "Completed", "Disputed"];

const STATS = [
  { icon: "📜", label: "Total Contracts", value: "142", color: "#6366f1" },
  { icon: "✅", label: "Active", value: "38", color: "#16a34a" },
  { icon: "⏳", label: "Pending", value: "12", color: "#f59e0b" },
  { icon: "⚠️", label: "Disputed", value: "3", color: "#ef4444" },
  { icon: "💰", label: "Total Value Locked", value: "₹4.8Cr", color: "#3b82f6" },
];

function Avatar({ initials, color }) {
  return (
    <div style={{
      width: "36px", height: "36px", borderRadius: "50%",
      background: `${color}22`, border: `2px solid ${color}55`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "0.72rem", fontWeight: 800, color, flexShrink: 0,
    }}>{initials}</div>
  );
}

function StatusBadge({ status, color, bg }) {
  const icons = { "Active": "●", "Pending Signature": "⏳", "Completed": "✓", "Disputed": "⚠️" };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: bg, color, fontSize: "0.72rem", fontWeight: 700, padding: "4px 11px", borderRadius: "20px" }}>
      {icons[status]} {status}
    </span>
  );
}

function ProgressBar({ value, color }) {
  return (
    <div style={{ background: "rgba(0,0,0,0.06)", borderRadius: "99px", height: "6px", overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: `linear-gradient(90deg,${color},${color}bb)`, borderRadius: "99px", transition: "width 0.8s ease" }} />
    </div>
  );
}

export default function SmartContractsPage() {
     const navigate = useNavigate();
  const location = useLocation();
  const getActiveNav = () => {
  if (location.pathname === "/") return "Home";
  if (location.pathname === "/farm-produce") return "Farm Produce";
  if (location.pathname === "/smart-contracts") return "Smart Contracts";
  if (location.pathname === "/market-insights") return "Market Insights";
  if (location.pathname === "/supply-tracking") return "Supply Tracking";
  return "";
  };
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(CONTRACTS[0]);
  const [showCreate, setShowCreate] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [signAnim, setSignAnim] = useState(false);

  const filtered = CONTRACTS.filter(c => {
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.buyer.toLowerCase().includes(search.toLowerCase()) ||
      c.seller.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f7f3ec", fontFamily: "'Palatino Linotype', Georgia, serif", color: "#1c1a14" }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes signPulse { 0%{box-shadow:0 0 0 0 rgba(99,102,241,0.5)} 100%{box-shadow:0 0 0 20px rgba(99,102,241,0)} }
        .contract-row:hover { background: rgba(99,102,241,0.06) !important; cursor:pointer; }
        .contract-row { transition: background 0.15s; }
        .tab-btn:hover { background: rgba(99,102,241,0.07) !important; }
        .action-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .action-btn { transition: opacity 0.15s, transform 0.15s; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        background: "rgba(255,252,245,0.96)", backdropFilter: "blur(12px)",
       borderBottom: "1px solid rgba(180,160,100,0.2)",
        position: "sticky", top: 0, zIndex: 100,
        padding: "0 2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "2rem" }}>🌿</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#1a3d1f", letterSpacing: "-0.3px" }}>AgroChain</div>
            <div style={{ fontSize: "0.62rem", color: "#1a3d1f", letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.7 }}>Blockchain Supply</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1.8rem", alignItems: "center" }}>
          {NAV_LINKS.map(link => (
            <button
              key={link}
              onClick={() => navigate(link.path)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontFamily: "inherit",
                color: link.name === getActiveNav() ? "#1a5c2a" : "#5a5244",
                fontWeight: link.name === getActiveNav() ? 700 : 400,
                borderBottom:
                  link.name === getActiveNav()
                    ? "2px solid #1a5c2a"
                    : "2px solid transparent",
                paddingBottom: "2px",
                transition: "all 0.2s",
              }}
            >
              {link.name}
            </button>
          ))}
        </div>
        <button onClick={() => setShowCreate(true)} style={{
           background: "linear-gradient(135deg, #1a5c2a, #2d8a45)", color: "#fff",
          border: "none", borderRadius: "8px", padding: "10px 22px",
          fontSize: "0.875rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
        }}>✦ New Contract</button>
      </nav>

      {/* ── HERO ── */}
      <div style={{
          background: "linear-gradient(135deg, #0f2d14 0%, #1a5c2a 50%, #2d6e3a 100%)",
        padding: "3rem 2.5rem 2.4rem", position: "relative", overflow: "hidden",
      }}>
        {/* Decorative orbs */}
        <div style={{ position: "absolute", top: "-60px", right: "8%", width: "280px", height: "280px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-40px", left: "3%", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Floating shield */}
        <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", fontSize: "8rem", opacity: 0.07, animation: "float 4s ease-in-out infinite", pointerEvents: "none" }}>🛡️</div>

        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem" }}>
            <div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px",background: "rgba(168,240,176,0.15)", color: "#a8f0b0", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "20px", border: "1px solid rgba(165,180,252,0.2)", marginBottom: "1rem" }}>
                🔗 On-Chain Agreements
              </span>
              <h1 style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: "0.7rem" }}>
                Smart Contracts<br />
                <em style={{ color: "#86efac", fontStyle: "italic" }}>Verified & Secure</em>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.98rem", maxWidth: "500px", lineHeight: 1.65 }}>
                Automate payments, enforce delivery terms, and resolve disputes — all governed by immutable blockchain logic.
              </p>
            </div>
            {/* Stats row */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {STATS.map((s, i) => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.06)", borderRadius: "14px", padding: "1rem 1.2rem", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center", minWidth: "90px", animation: `fadeUp 0.4s ease ${i * 0.07}s both` }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "4px" }}>{s.icon}</div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.45)", marginTop: "2px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FILTER BAR ── */}
      <div style={{ background: "rgba(255,255,255,0.97)", borderBottom: "1px solid rgba(99,102,241,0.1)", padding: "0.9rem 2.5rem", position: "sticky", top: "68px", zIndex: 90, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "220px", position: "relative" }}>
            <span style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", opacity: 0.4, fontSize: "0.95rem" }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search contracts, parties, ID…"
              style={{ width: "100%", padding: "9px 14px 9px 36px", border: "1.5px solid rgba(99,102,241,0.2)", borderRadius: "10px", fontSize: "0.875rem", fontFamily: "inherit", background: "#faf9ff", outline: "none", boxSizing: "border-box", color: "#1c1a14" }} />
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {STATUS_FILTERS.map(f => (
              <button key={f} onClick={() => setStatusFilter(f)} style={{
                padding: "8px 16px", borderRadius: "20px",
                border: `1.5px solid ${statusFilter === f ? "#6366f1" : "rgba(99,102,241,0.15)"}`,
                background: statusFilter === f ? "rgba(99,102,241,0.1)" : "transparent",
                color: statusFilter === f ? "#4f46e5" : "#6b7280",
                fontSize: "0.82rem", fontWeight: statusFilter === f ? 700 : 400,
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
              }}>{f}</button>
            ))}
          </div>
          <div style={{ fontSize: "0.78rem", color: "#888", whiteSpace: "nowrap" }}>{filtered.length} contracts</div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "1.8rem 2.5rem", display: "grid", gridTemplateColumns: "400px 1fr", gap: "1.6rem", alignItems: "start" }}>

        {/* ── LEFT: Contract List ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {filtered.map((c, i) => (
            <div key={c.id} className="contract-row" onClick={() => { setSelected(c); setActiveTab("overview"); }} style={{
              background: selected?.id === c.id ? "#fff" : "rgba(255,255,255,0.85)",
              borderRadius: "18px",
              border: selected?.id === c.id ? `2px solid ${c.color}60` : "1.5px solid rgba(99,102,241,0.1)",
              padding: "1.2rem 1.4rem",
              boxShadow: selected?.id === c.id ? `0 6px 28px ${c.color}1a` : "0 2px 8px rgba(0,0,0,0.04)",
              transition: "all 0.2s",
              animation: `fadeUp 0.4s ease ${i * 0.06}s both`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.8rem" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "2rem" }}>{c.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1c1a14" }}>{c.title}</div>
                    <div style={{ fontSize: "0.7rem", color: "#888", fontFamily: "monospace", marginTop: "1px" }}>{c.id}</div>
                    <div style={{ fontSize: "0.75rem", color: "#5a5244", marginTop: "3px" }}>{c.produce}</div>
                  </div>
                </div>
                <StatusBadge status={c.status} color={c.statusColor} bg={c.statusBg} />
              </div>

              {/* Parties */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.8rem" }}>
                <Avatar initials={c.sellerAvatar} color={c.color} />
                <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${c.color}60, transparent)` }} />
                <span style={{ fontSize: "0.7rem", color: "#888", whiteSpace: "nowrap" }}>⇄</span>
                <div style={{ flex: 1, height: "1px", background: `linear-gradient(270deg, ${c.color}60, transparent)` }} />
                <Avatar initials={c.buyerAvatar} color={c.color} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#888", marginBottom: "0.8rem" }}>
                <span>{c.seller}</span>
                <span>{c.buyer}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                <span style={{ fontSize: "1.05rem", fontWeight: 800, color: c.color }}>{c.value}</span>
                <span style={{ fontSize: "0.72rem", color: "#888" }}>Expires {c.expiry}</span>
              </div>
              <ProgressBar value={c.progress} color={c.color} />
              <div style={{ fontSize: "0.68rem", color: "#aaa", marginTop: "4px", textAlign: "right" }}>{c.progress}% fulfilled</div>
            </div>
          ))}
        </div>

        {/* ── RIGHT: Detail Panel ── */}
        {selected && (
          <div key={selected.id} style={{ display: "flex", flexDirection: "column", gap: "1.2rem", animation: "fadeUp 0.3s ease" }}>

            {/* Detail Header Card */}
            <div style={{ background: "#fff", borderRadius: "22px", border: `1.5px solid ${selected.color}30`, overflow: "hidden", boxShadow: `0 6px 32px ${selected.color}12` }}>
              {/* Top ribbon */}
              <div style={{ background: `linear-gradient(135deg, ${selected.color}18, ${selected.color}08)`, padding: "1.6rem 2rem", borderBottom: `1px solid ${selected.color}18` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "3rem" }}>{selected.icon}</span>
                    <div>
                      <div style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#888", marginBottom: "2px" }}>{selected.id}</div>
                      <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f0a23", marginBottom: "4px" }}>{selected.title}</h2>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                        <StatusBadge status={selected.status} color={selected.statusColor} bg={selected.statusBg} />
                        <span style={{ fontSize: "0.72rem", background: "rgba(99,102,241,0.1)", color: "#4f46e5", padding: "3px 10px", borderRadius: "20px" }}>{selected.type}</span>
                        {selected.autoPayment && <span style={{ fontSize: "0.72rem", background: "#d1fae5", color: "#065f46", padding: "3px 10px", borderRadius: "20px" }}>⚡ Auto-Pay</span>}
                        {selected.dispute && <span style={{ fontSize: "0.72rem", background: "#fee2e2", color: "#991b1b", padding: "3px 10px", borderRadius: "20px" }}>⚠️ In Dispute</span>}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.72rem", color: "#888", marginBottom: "2px" }}>Contract Value</div>
                    <div style={{ fontSize: "2.2rem", fontWeight: 800, color: selected.color }}>{selected.value}</div>
                    <div style={{ fontSize: "0.75rem", color: "#888" }}>{selected.produce}</div>
                  </div>
                </div>

                {/* Parties row */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1.4rem", padding: "1rem 1.2rem", background: "rgba(255,255,255,0.7)", borderRadius: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Avatar initials={selected.sellerAvatar} color={selected.color} />
                    <div>
                      <div style={{ fontSize: "0.68rem", color: "#888" }}>Seller</div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1c1a14" }}>{selected.seller}</div>
                    </div>
                  </div>
                  <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "4px" }}>
                    <div style={{ flex: 1, height: "2px", background: `linear-gradient(90deg, ${selected.color}60, ${selected.color}20)` }} />
                    <span style={{ fontSize: "1.2rem" }}>🤝</span>
                    <div style={{ flex: 1, height: "2px", background: `linear-gradient(270deg, ${selected.color}60, ${selected.color}20)` }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.68rem", color: "#888" }}>Buyer</div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1c1a14" }}>{selected.buyer}</div>
                    </div>
                    <Avatar initials={selected.buyerAvatar} color={selected.color} />
                  </div>
                </div>
              </div>

              {/* Progress bar full-width */}
              <div style={{ padding: "1rem 2rem", borderBottom: `1px solid ${selected.color}12` }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "#888", marginBottom: "6px" }}>
                  <span>Contract fulfillment</span>
                  <span style={{ fontWeight: 700, color: selected.color }}>{selected.progress}%</span>
                </div>
                <div style={{ background: "rgba(0,0,0,0.05)", borderRadius: "99px", height: "10px", overflow: "hidden" }}>
                  <div style={{ width: `${selected.progress}%`, height: "100%", background: `linear-gradient(90deg,${selected.color},${selected.color}aa)`, borderRadius: "99px", transition: "width 0.8s" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "#aaa", marginTop: "4px" }}>
                  <span>Created {selected.created}</span>
                  <span>Expires {selected.expiry}</span>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", borderBottom: `1px solid ${selected.color}12`, padding: "0 1.4rem" }}>
                {["overview", "milestones", "terms", "blockchain"].map(tab => (
                  <button key={tab} className="tab-btn" onClick={() => setActiveTab(tab)} style={{
                    padding: "0.9rem 1.2rem", background: "none", border: "none", cursor: "pointer",
                    fontFamily: "inherit", fontSize: "0.85rem", fontWeight: activeTab === tab ? 700 : 400,
                    color: activeTab === tab ? selected.color : "#888",
                    borderBottom: activeTab === tab ? `2px solid ${selected.color}` : "2px solid transparent",
                    marginBottom: "-1px", textTransform: "capitalize", transition: "color 0.2s",
                  }}>{tab}</button>
                ))}
              </div>

              {/* Tab Content */}
              <div style={{ padding: "1.6rem 2rem" }}>

                {activeTab === "overview" && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    {[["📦 Produce", selected.produce], ["📅 Created", selected.created],
                      ["⏰ Expiry", selected.expiry], ["⚡ Auto-Payment", selected.autoPayment ? "Enabled" : "Disabled"],
                      ["🌾 Seller", selected.seller], ["🏢 Buyer", selected.buyer]].map(([k, v]) => (
                      <div key={k} style={{ background: "rgba(240,238,255,0.5)", borderRadius: "12px", padding: "10px 14px" }}>
                        <div style={{ fontSize: "0.68rem", color: "#888", marginBottom: "3px" }}>{k}</div>
                        <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1c1a14" }}>{v}</div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "milestones" && (
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: "17px", top: "8px", bottom: "8px", width: "2px", background: `${selected.color}20`, borderRadius: "2px" }} />
                    {selected.milestones.map((m, i) => (
                      <div key={i} style={{ display: "flex", gap: "1.2rem", alignItems: "flex-start", marginBottom: i < selected.milestones.length - 1 ? "1.2rem" : 0 }}>
                        <div style={{
                          width: "34px", height: "34px", borderRadius: "50%", flexShrink: 0, zIndex: 1,
                          background: m.done ? `linear-gradient(135deg,${selected.color},${selected.color}aa)` : "#f1f5f9",
                          border: `2px solid ${m.done ? selected.color : "#e2e8f0"}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "0.9rem", fontWeight: 700, color: m.done ? "#fff" : "#94a3b8",
                          boxShadow: m.done ? `0 0 10px ${selected.color}44` : "none",
                        }}>{m.done ? "✓" : i + 1}</div>
                        <div style={{ paddingTop: "5px", flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: "0.9rem", color: m.done ? "#1c1a14" : "#94a3b8" }}>{m.label}</div>
                          <div style={{ fontSize: "0.75rem", color: m.done ? "#6b7c47" : "#c4cad4", marginTop: "1px" }}>{m.done ? "✅ " : "⏳ "}{m.date}</div>
                        </div>
                        {i === selected.milestones.findIndex(x => !x.done) && (
                          <span style={{ fontSize: "0.68rem", background: `${selected.color}18`, color: selected.color, fontWeight: 700, padding: "3px 10px", borderRadius: "20px", alignSelf: "center", whiteSpace: "nowrap" }}>NEXT</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "terms" && (
                  <div>
                    <div style={{ fontSize: "0.82rem", color: "#888", marginBottom: "1rem" }}>Legally binding terms encoded on-chain. Cannot be altered after signing.</div>
                    {selected.terms.map((t, i) => (
                      <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "10px 0", borderBottom: i < selected.terms.length - 1 ? "0.5px solid rgba(99,102,241,0.1)" : "none" }}>
                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: `${selected.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 800, color: selected.color, flexShrink: 0 }}>{i + 1}</div>
                        <div style={{ fontSize: "0.9rem", color: "#1c1a14", lineHeight: 1.5, paddingTop: "2px" }}>{t}</div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "blockchain" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ background: "linear-gradient(135deg, #0f0a23, #1e1245)", borderRadius: "14px", padding: "1.4rem" }}>
                      <div style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: "#818cf8", textTransform: "uppercase", marginBottom: "6px" }}>Transaction Hash</div>
                      <div style={{ fontFamily: "monospace", fontSize: "0.9rem", color: "#a5b4fc", wordBreak: "break-all", background: "rgba(165,180,252,0.08)", padding: "10px 12px", borderRadius: "8px" }}>
                        {selected.blockchain}3a7f2e91c0b4d682
                      </div>
                    </div>
                    {[["Block Number", "#18,402,771"], ["Network", "AgriChain Mainnet"], ["Gas Used", "0.0012 AGC"], ["Confirmations", "1,204"], ["Timestamp", selected.created + " 09:42:17 UTC"]].map(([k, v]) => (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 4px", borderBottom: "0.5px solid rgba(99,102,241,0.1)", fontSize: "0.85rem" }}>
                        <span style={{ color: "#888" }}>{k}</span>
                        <span style={{ fontWeight: 700, color: "#4f46e5", fontFamily: "monospace" }}>{v}</span>
                      </div>
                    ))}
                    <div style={{ display: "flex", gap: "8px", marginTop: "0.4rem" }}>
                      {["✅ Immutable", "🔒 Signed", "🌐 Public Record", "⏱ Timestamped"].map(t => (
                        <span key={t} style={{ fontSize: "0.7rem", background: "rgba(99,102,241,0.08)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 10px", borderRadius: "20px" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
              {[
                { label: "📥 Download PDF", bg: "transparent", border: "rgba(99,102,241,0.25)", color: "#4f46e5" },
                { label: "✍️ Sign Contract", bg: "linear-gradient(135deg,#4f46e5,#7c3aed)", border: "none", color: "#fff", shadow: "0 4px 16px rgba(99,102,241,0.35)" },
                { label: "💬 Message Party", bg: "transparent", border: "rgba(99,102,241,0.25)", color: "#4f46e5" },
                { label: selected.dispute ? "🧑‍⚖️ Arbitration" : "⚠️ Raise Dispute", bg: "transparent", border: "rgba(239,68,68,0.3)", color: "#ef4444" },
              ].map(btn => (
                <button key={btn.label} className="action-btn" style={{
                  padding: "13px 8px", borderRadius: "12px", fontSize: "0.82rem", fontWeight: 700,
                  cursor: "pointer", fontFamily: "inherit",
                  background: btn.bg, border: `1.5px solid ${btn.border || "transparent"}`,
                  color: btn.color, boxShadow: btn.shadow || "none",
                }}>{btn.label}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── CREATE CONTRACT MODAL ── */}
      {showCreate && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", backdropFilter: "blur(4px)", animation: "fadeUp 0.2s ease" }}
          onClick={() => setShowCreate(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: "24px", maxWidth: "540px", width: "100%", boxShadow: "0 24px 80px rgba(0,0,0,0.3)", overflow: "hidden" }}>
            {/* Modal header */}
            <div style={{ background: "linear-gradient(135deg, #1e1245, #2d1b69)", padding: "1.6rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ color: "#a5b4fc", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "3px" }}>✦ Deploy New Contract</div>
                <h3 style={{ color: "#fff", fontSize: "1.3rem", fontWeight: 800 }}>Create Smart Contract</h3>
              </div>
              <button onClick={() => setShowCreate(false)} style={{ background: "rgba(255,255,255,0.12)", border: "none", borderRadius: "50%", width: "34px", height: "34px", cursor: "pointer", color: "#fff", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>

            <div style={{ padding: "1.8rem 2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[["Contract Title", "e.g. Wheat Supply Agreement"], ["Produce & Quantity", "e.g. Basmati Rice – 50 Tons"], ["Buyer Name / Company", "e.g. AgriCorp Ltd."], ["Contract Value (₹)", "e.g. 1,50,000"], ["Expiry Date", ""]].map(([label, ph], i) => (
                <div key={label}>
                  <label style={{ fontSize: "0.78rem", color: "#6b7280", fontWeight: 600, display: "block", marginBottom: "5px" }}>{label}</label>
                  <input type={label.includes("Date") ? "date" : "text"} placeholder={ph} style={{ width: "100%", padding: "10px 14px", border: "1.5px solid rgba(99,102,241,0.2)", borderRadius: "10px", fontSize: "0.9rem", fontFamily: "inherit", outline: "none", background: "#faf9ff", boxSizing: "border-box", color: "#1c1a14" }} />
                </div>
              ))}

              <div>
                <label style={{ fontSize: "0.78rem", color: "#6b7280", fontWeight: 600, display: "block", marginBottom: "5px" }}>Contract Terms</label>
                <textarea rows={3} placeholder="Enter terms separated by new lines…" style={{ width: "100%", padding: "10px 14px", border: "1.5px solid rgba(99,102,241,0.2)", borderRadius: "10px", fontSize: "0.875rem", fontFamily: "inherit", outline: "none", background: "#faf9ff", boxSizing: "border-box", resize: "vertical", color: "#1c1a14" }} />
              </div>

              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "0.875rem", color: "#4f46e5", fontWeight: 600 }}>
                <div style={{ width: "38px", height: "22px", background: "#6366f1", borderRadius: "20px", position: "relative" }}>
                  <div style={{ width: "16px", height: "16px", background: "#fff", borderRadius: "50%", position: "absolute", top: "3px", right: "3px" }} />
                </div>
                Enable Auto-Payment on Delivery
              </label>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "0.4rem" }}>
                <button onClick={() => setShowCreate(false)} style={{ padding: "13px", background: "transparent", border: "1.5px solid rgba(99,102,241,0.25)", borderRadius: "12px", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", color: "#6366f1" }}>Cancel</button>
                <button onClick={() => setShowCreate(false)} style={{ padding: "13px", background: "linear-gradient(135deg,#4f46e5,#7c3aed)", border: "none", borderRadius: "12px", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", color: "#fff", boxShadow: "0 4px 16px rgba(99,102,241,0.35)" }}>
                  🚀 Deploy on Chain
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0f2d14", color: "rgba(255,255,255,0.55)", padding: "2rem", textAlign: "center", fontSize: "0.85rem", marginTop: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "0.4rem" }}>
          <span style={{ fontSize: "1.4rem" }}>🌿</span>
          <span style={{ color: "#a8d5a2", fontWeight: 700, fontSize: "1rem" }}>AgriChain</span>
        </div>
        <p>© 2026 AgriChain. Empowering agriculture through blockchain transparency.</p>
      </footer>
    </div>
  );
}