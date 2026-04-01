import { useState, useEffect, useRef } from "react";
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


const SHIPMENTS = [
  {
    id: "SHP-2041", produce: "Basmati Rice", icon: "🍚", farmer: "Rajesh Kumar",
    origin: "Amritsar, Punjab", destination: "Mumbai Wholesale Market",
    status: "In Transit", statusColor: "#f59e0b", statusBg: "#fef9c3",
    weight: "48 Tons", vehicle: "TN-09-AB-4421", driver: "Arjun Singh",
    departed: "Mar 28, 2026", eta: "Apr 02, 2026", progress: 68,
    temp: "22°C", humidity: "54%", blockchain: "0x4f2a…c81d",
    checkpoints: [
      { name: "Amritsar Farm Gate", time: "Mar 28, 08:00", done: true, icon: "🏚️" },
      { name: "Ludhiana Checkpoint", time: "Mar 28, 14:30", done: true, icon: "🔍" },
      { name: "Delhi Distribution Hub", time: "Mar 29, 06:00", done: true, icon: "🏭" },
      { name: "Nagpur Transit Point", time: "Mar 30, 20:00", done: false, icon: "🛣️" },
      { name: "Mumbai Wholesale Market", time: "Apr 02, 10:00", done: false, icon: "🏪" },
    ],
    color: "#f59e0b",
  },
  {
    id: "SHP-2040", produce: "Wheat (HD-2967)", icon: "🌾", farmer: "Suresh Patel",
    origin: "Bhopal, MP", destination: "Delhi Flour Mills",
    status: "Delivered", statusColor: "#16a34a", statusBg: "#dcfce7",
    weight: "125 Tons", vehicle: "MP-04-GH-7890", driver: "Ramesh Yadav",
    departed: "Mar 20, 2026", eta: "Mar 25, 2026", progress: 100,
    temp: "24°C", humidity: "48%", blockchain: "0x7e1b…a39c",
    checkpoints: [
      { name: "Bhopal Farm Gate", time: "Mar 20, 07:00", done: true, icon: "🏚️" },
      { name: "Gwalior Checkpoint", time: "Mar 21, 09:00", done: true, icon: "🔍" },
      { name: "Agra Transit Point", time: "Mar 22, 17:00", done: true, icon: "🛣️" },
      { name: "Delhi Distribution Hub", time: "Mar 24, 05:00", done: true, icon: "🏭" },
      { name: "Delhi Flour Mills", time: "Mar 25, 11:00", done: true, icon: "🏪" },
    ],
    color: "#16a34a",
  },
  {
    id: "SHP-2039", produce: "Fresh Tomatoes", icon: "🍅", farmer: "Anita Sharma",
    origin: "Nashik, Maharashtra", destination: "Pune Retail Chain",
    status: "At Hub", statusColor: "#3b82f6", statusBg: "#dbeafe",
    weight: "12 Tons", vehicle: "MH-12-CD-3345", driver: "Vikram More",
    departed: "Mar 31, 2026", eta: "Apr 01, 2026", progress: 42,
    temp: "14°C", humidity: "72%", blockchain: "0x9c3d…f72e",
    checkpoints: [
      { name: "Nashik Farm Gate", time: "Mar 31, 06:00", done: true, icon: "🏚️" },
      { name: "Nashik Cold Hub", time: "Mar 31, 08:30", done: true, icon: "❄️" },
      { name: "Pune Distribution Hub", time: "Apr 01, 02:00", done: false, icon: "🏭" },
      { name: "Pune Retail Chain", time: "Apr 01, 10:00", done: false, icon: "🛒" },
    ],
    color: "#3b82f6",
  },
  {
    id: "SHP-2038", produce: "Alphonso Mangoes", icon: "🥭", farmer: "Priya Desai",
    origin: "Ratnagiri, MH", destination: "Export Terminal, Mumbai",
    status: "Delayed", statusColor: "#ef4444", statusBg: "#fee2e2",
    weight: "3.5 Tons", vehicle: "MH-08-EF-1123", driver: "Santosh Patil",
    departed: "Mar 29, 2026", eta: "Apr 03, 2026", progress: 25,
    temp: "12°C", humidity: "65%", blockchain: "0xb17e…2c90",
    checkpoints: [
      { name: "Ratnagiri Farm Gate", time: "Mar 29, 07:00", done: true, icon: "🏚️" },
      { name: "Ratnagiri Cold Store", time: "Mar 29, 09:00", done: true, icon: "❄️" },
      { name: "Pune Transit Hub", time: "Mar 31, 14:00", done: false, icon: "🛣️" },
      { name: "Mumbai Cold Chain", time: "Apr 02, 08:00", done: false, icon: "❄️" },
      { name: "Export Terminal", time: "Apr 03, 06:00", done: false, icon: "✈️" },
    ],
    color: "#ef4444",
  },
  {
    id: "SHP-2037", produce: "Toor Dal", icon: "🫘", farmer: "Mohan Lal",
    origin: "Gulbarga, Karnataka", destination: "Hyderabad Wholesale",
    status: "In Transit", statusColor: "#f59e0b", statusBg: "#fef9c3",
    weight: "22 Tons", vehicle: "KA-32-PQ-5567", driver: "Nagaraj B.",
    departed: "Mar 30, 2026", eta: "Apr 02, 2026", progress: 55,
    temp: "26°C", humidity: "50%", blockchain: "0x5f3a…8b1c",
    checkpoints: [
      { name: "Gulbarga Farm Gate", time: "Mar 30, 06:00", done: true, icon: "🏚️" },
      { name: "Bidar Checkpoint", time: "Mar 30, 11:00", done: true, icon: "🔍" },
      { name: "Nizamabad Hub", time: "Mar 31, 18:00", done: true, icon: "🏭" },
      { name: "Hyderabad Wholesale", time: "Apr 02, 09:00", done: false, icon: "🏪" },
    ],
    color: "#ca8a04",
  },
  {
    id: "SHP-2036", produce: "Green Chillies", icon: "🌶️", farmer: "Venkat Rao",
    origin: "Guntur, AP", destination: "Chennai Spice Market",
    status: "Delivered", statusColor: "#16a34a", statusBg: "#dcfce7",
    weight: "8 Tons", vehicle: "AP-07-RS-8823", driver: "Subramaniam K.",
    departed: "Mar 26, 2026", eta: "Mar 28, 2026", progress: 100,
    temp: "20°C", humidity: "58%", blockchain: "0x2a8c…d41f",
    checkpoints: [
      { name: "Guntur Farm Gate", time: "Mar 26, 05:00", done: true, icon: "🏚️" },
      { name: "Nellore Checkpoint", time: "Mar 26, 14:00", done: true, icon: "🔍" },
      { name: "Chennai Entry Point", time: "Mar 27, 22:00", done: true, icon: "🛣️" },
      { name: "Chennai Spice Market", time: "Mar 28, 08:00", done: true, icon: "🌶️" },
    ],
    color: "#16a34a",
  },
];

const STATUS_FILTERS = ["All", "In Transit", "Delivered", "At Hub", "Delayed"];

const STATS = [
  { icon: "🚛", label: "Active Shipments", value: "58", color: "#f59e0b" },
  { icon: "✅", label: "Delivered Today", value: "12", color: "#16a34a" },
  { icon: "⚠️", label: "Delayed", value: "3", color: "#ef4444" },
  { icon: "📦", label: "Total Weight", value: "840T", color: "#3b82f6" },
];

function ProgressBar({ value, color }) {
  return (
    <div style={{ background: "rgba(0,0,0,0.08)", borderRadius: "99px", height: "8px", overflow: "hidden" }}>
      <div style={{
        width: `${value}%`, height: "100%",
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        borderRadius: "99px", transition: "width 0.8s ease",
        boxShadow: `0 0 8px ${color}66`,
      }} />
    </div>
  );
}

function StatusBadge({ status, color, bg }) {
  const icons = { "In Transit": "🚛", "Delivered": "✅", "At Hub": "🏭", "Delayed": "⚠️" };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: bg, color, fontSize: "0.75rem", fontWeight: 700, padding: "4px 12px", borderRadius: "20px" }}>
      {icons[status]} {status}
    </span>
  );
}

export default function SupplyTrackingPage() {
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
  const [selected, setSelected] = useState(SHIPMENTS[0]);
  const [liveTime, setLiveTime] = useState(new Date());
  const [mapTick, setMapTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => { setLiveTime(new Date()); setMapTick(n => (n + 1) % 100); }, 2000);
    return () => clearInterval(t);
  }, []);

  const filtered = SHIPMENTS.filter(s => {
    const matchStatus = statusFilter === "All" || s.status === statusFilter;
    const matchSearch = s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.produce.toLowerCase().includes(search.toLowerCase()) ||
      s.origin.toLowerCase().includes(search.toLowerCase()) ||
      s.destination.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const truckX = 80 + (mapTick / 100) * (selected.progress / 100) * 380;
  const truckY = 120 + Math.sin((mapTick / 100) * Math.PI * 2) * 18;

  return (
    <div style={{ minHeight: "100vh", background: "#f7f3ec", fontFamily: "'Palatino Linotype', Georgia, serif", color: "#1c1a14" }}>

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:0.6} }
        @keyframes moveRight { from{transform:translateX(-4px)} to{transform:translateX(4px)} }
        .ship-row:hover { background: rgba(26,92,42,0.05) !important; cursor:pointer; }
        .ship-row { transition: background 0.15s; }
        .stat-card { animation: fadeUp 0.4s ease both; }
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
            <div style={{ fontSize: "0.62rem", color: "#6b7c47", letterSpacing: "0.14em", textTransform: "uppercase" }}>Blockchain Supply</div>
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
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", animation: "pulse 1.5s infinite" }} />
            <span style={{ color: "#4ade80", fontSize: "0.78rem", fontWeight: 600 }}>LIVE</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem" }}>{liveTime.toLocaleTimeString()}</span>
          </div>
          <button style={{
            background: "linear-gradient(135deg, #1a5c2a, #2d8a45)", color: "#fff",
            border: "none", borderRadius: "8px", padding: "9px 20px",
            fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          }}>+ New Shipment</button>
        </div>
      </nav>

      {/* ── TOP STATS ── */}
      <div style={{background: "linear-gradient(135deg, #0f2d14 0%, #1a5c2a 50%, #2d6e3a 100%)", padding: "2rem 2.5rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.6rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ fontSize: "0.72rem", color: "#4ade80", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.4rem" }}>🚛 Real-time Tracking</div>
              <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", margin: 0 }}>Supply Chain Monitor</h1>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.88rem", margin: "4px 0 0" }}>Track every shipment from farm to market — blockchain-verified, tamper-proof.</p>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {STATUS_FILTERS.map(f => (
                <button key={f} onClick={() => setStatusFilter(f)} style={{
                  padding: "8px 16px", borderRadius: "20px", border: "1px solid",
                  borderColor: statusFilter === f ? "#4ade80" : "rgba(255,255,255,0.15)",
                  background: statusFilter === f ? "rgba(74,222,128,0.15)" : "transparent",
                  color: statusFilter === f ? "#4ade80" : "rgba(255,255,255,0.55)",
                  fontSize: "0.82rem", fontWeight: statusFilter === f ? 700 : 400,
                  cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                }}>{f}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
            {STATS.map((s, i) => (
              <div key={s.label} className="stat-card" style={{ animationDelay: `${i * 0.08}s`, background: "rgba(255,255,255,0.06)", borderRadius: "16px", padding: "1.2rem 1.4rem", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "6px" }}>{s.icon}</div>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "1.6rem 2.5rem", display: "grid", gridTemplateColumns: "380px 1fr", gap: "1.6rem", alignItems: "start" }}>

        {/* ── LEFT: Shipment List ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Search */}
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", opacity: 0.45, fontSize: "1rem" }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search ID, produce, route…"
              style={{ width: "100%", padding: "10px 14px 10px 38px", border: "1.5px solid rgba(180,160,100,0.25)", borderRadius: "10px", fontSize: "0.875rem", fontFamily: "inherit", background: "#fff", color: "#1c1a14", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ fontSize: "0.75rem", color: "#888", fontWeight: 600 }}>{filtered.length} shipments</div>

          {filtered.map(s => (
            <div key={s.id} className="ship-row" onClick={() => setSelected(s)} style={{
              background: selected?.id === s.id ? "rgba(255,252,245,1)" : "rgba(255,252,245,0.85)",
              borderRadius: "16px",
              border: selected?.id === s.id ? `2px solid ${s.color}80` : "1.5px solid rgba(180,160,100,0.18)",
              padding: "1rem 1.2rem",
              boxShadow: selected?.id === s.id ? `0 4px 24px ${s.color}22` : "0 2px 10px rgba(0,0,0,0.04)",
              transition: "all 0.2s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.7rem" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ fontSize: "2rem" }}>{s.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f2d14" }}>{s.produce}</div>
                    <div style={{ fontSize: "0.72rem", color: "#888", fontFamily: "monospace" }}>{s.id}</div>
                  </div>
                </div>
                <StatusBadge status={s.status} color={s.statusColor} bg={s.statusBg} />
              </div>
              <div style={{ fontSize: "0.78rem", color: "#5a5244", marginBottom: "0.7rem", display: "flex", gap: "4px", alignItems: "center" }}>
                <span>📍 {s.origin}</span> <span style={{ opacity: 0.4 }}>→</span> <span>🏪 {s.destination}</span>
              </div>
              <ProgressBar value={s.progress} color={s.color} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px", fontSize: "0.7rem", color: "#aaa" }}>
                <span>{s.progress}% complete</span>
                <span>ETA: {s.eta}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── RIGHT: Detail Panel ── */}
        {selected && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", animation: "fadeUp 0.3s ease" }}>

            {/* ── MAP CARD ── */}
            <div style={{ background: "#fff", borderRadius: "20px", border: "1.5px solid rgba(180,160,100,0.2)", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <div style={{ padding: "1.2rem 1.6rem", borderBottom: "1px solid rgba(180,160,100,0.12)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "#0f2d14" }}>{selected.id} — Route Map</div>
                  <div style={{ fontSize: "0.78rem", color: "#6b7c47" }}>{selected.origin} → {selected.destination}</div>
                </div>
                <StatusBadge status={selected.status} color={selected.statusColor} bg={selected.statusBg} />
              </div>

              {/* SVG Map */}
              <div style={{ background: "linear-gradient(160deg, #e0f2fe 0%, #d1fae5 50%, #fef3c7 100%)", padding: "1.4rem", position: "relative" }}>
                <svg viewBox="0 0 560 180" style={{ width: "100%", height: "180px" }}>
                  {/* Grid lines */}
                  {[40, 80, 120, 160].map(y => <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="rgba(0,0,0,0.04)" strokeWidth="1" />)}
                  {[80, 160, 240, 320, 400, 480].map(x => <line key={x} x1={x} y1="0" x2={x} y2="180" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />)}

                  {/* Road base */}
                  <path d="M60 130 Q140 90 220 110 Q300 130 380 90 Q450 60 500 80" stroke="#cbd5e1" strokeWidth="12" fill="none" strokeLinecap="round" />
                  {/* Road surface */}
                  <path d="M60 130 Q140 90 220 110 Q300 130 380 90 Q450 60 500 80" stroke="#e2e8f0" strokeWidth="8" fill="none" strokeLinecap="round" />
                  {/* Road dashes */}
                  <path d="M60 130 Q140 90 220 110 Q300 130 380 90 Q450 60 500 80" stroke="#fff" strokeWidth="2" fill="none" strokeDasharray="14,10" strokeLinecap="round" />

                  {/* Progress overlay */}
                  <path d="M60 130 Q140 90 220 110 Q300 130 380 90 Q450 60 500 80" stroke={selected.color} strokeWidth="4" fill="none" strokeLinecap="round"
                    strokeDasharray={`${selected.progress * 5.2} 520`} opacity="0.85" />

                  {/* Water */}
                  <ellipse cx="420" cy="155" rx="60" ry="18" fill="#bae6fd" opacity="0.5" />
                  <ellipse cx="160" cy="165" rx="40" ry="12" fill="#bae6fd" opacity="0.4" />

                  {/* Trees */}
                  {[[90, 55], [180, 65], [340, 55], [470, 95]].map(([x, y], i) => (
                    <g key={i}>
                      <circle cx={x} cy={y} r="10" fill="#4ade80" opacity="0.5" />
                      <rect x={x - 2} y={y + 8} width="4" height="8" fill="#a16207" opacity="0.4" />
                    </g>
                  ))}

                  {/* Checkpoint pins */}
                  {selected.checkpoints.map((cp, i) => {
                    const progress = i / (selected.checkpoints.length - 1);
                    const x = 60 + progress * 440;
                    const pathY = 130 - Math.sin(progress * Math.PI) * 50 + Math.sin(progress * Math.PI * 2) * 15;
                    return (
                      <g key={i}>
                        <circle cx={x} cy={pathY} r="10" fill={cp.done ? selected.color : "#e2e8f0"} opacity="0.3" />
                        <circle cx={x} cy={pathY} r="5" fill={cp.done ? selected.color : "#94a3b8"} />
                        {cp.done && <circle cx={x} cy={pathY} r="8" fill="none" stroke={selected.color} strokeWidth="1.5" opacity="0.4" />}
                        <text x={x} y={pathY - 14} textAnchor="middle" fontSize="11">{cp.icon}</text>
                      </g>
                    );
                  })}

                  {/* Animated truck */}
                  {selected.status !== "Delivered" && (
                    <g style={{ animation: "moveRight 1s ease-in-out infinite alternate" }}>
                      <text
                        x={60 + (selected.progress / 100) * 440}
                        y={130 - Math.sin((selected.progress / 100) * Math.PI) * 50 + Math.sin((selected.progress / 100) * Math.PI * 2) * 15 - 16}
                        textAnchor="middle" fontSize="22"
                      >🚛</text>
                    </g>
                  )}
                  {selected.status === "Delivered" && (
                    <text x="498" y="62" textAnchor="middle" fontSize="22">✅</text>
                  )}
                </svg>

                {/* Map legend */}
                <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", fontSize: "0.72rem", color: "#6b7280" }}>
                  <span>🏚️ Origin</span>
                  <span style={{ color: selected.color }}>● Active Route</span>
                  <span>⚪ Upcoming</span>
                  <span>🏪 Destination</span>
                </div>
              </div>
            </div>

            {/* ── INFO GRID ── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>

              {/* Shipment Details */}
              <div style={{ background: "#fff", borderRadius: "20px", border: "1.5px solid rgba(180,160,100,0.18)", padding: "1.4rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f2d14", marginBottom: "1rem", paddingBottom: "0.7rem", borderBottom: "1px solid rgba(180,160,100,0.12)" }}>📋 Shipment Details</div>
                {[
                  ["Produce", `${selected.icon} ${selected.produce}`],
                  ["Farmer", `👨‍🌾 ${selected.farmer}`],
                  ["Weight", `📦 ${selected.weight}`],
                  ["Vehicle", `🚛 ${selected.vehicle}`],
                  ["Driver", `👤 ${selected.driver}`],
                  ["Departed", `📅 ${selected.departed}`],
                  ["ETA", `🕐 ${selected.eta}`],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "0.5px solid rgba(180,160,100,0.08)", fontSize: "0.85rem" }}>
                    <span style={{ color: "#888" }}>{k}</span>
                    <span style={{ fontWeight: 600, color: "#1c1a14", textAlign: "right", maxWidth: "60%" }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Right column */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                {/* Live Conditions */}
                <div style={{ background: "#fff", borderRadius: "20px", border: "1.5px solid rgba(180,160,100,0.18)", padding: "1.4rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f2d14", marginBottom: "1rem", paddingBottom: "0.7rem", borderBottom: "1px solid rgba(180,160,100,0.12)" }}>🌡️ Live Conditions</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    {[["🌡️", "Temperature", selected.temp, "#ef4444"], ["💧", "Humidity", selected.humidity, "#3b82f6"],
                      ["📶", "GPS Signal", "Strong", "#16a34a"], ["🔋", "Tracker", "98%", "#f59e0b"]].map(([ic, label, val, col]) => (
                      <div key={label} style={{ background: "rgba(240,244,248,0.7)", borderRadius: "12px", padding: "10px 12px", textAlign: "center" }}>
                        <div style={{ fontSize: "1.4rem", marginBottom: "3px" }}>{ic}</div>
                        <div style={{ fontSize: "1rem", fontWeight: 800, color: col }}>{val}</div>
                        <div style={{ fontSize: "0.68rem", color: "#888" }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Blockchain */}
                <div style={{ background: "linear-gradient(135deg, #0a1912, #0f2d14)", borderRadius: "20px", padding: "1.4rem", color: "#fff" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#86efac", marginBottom: "0.8rem" }}>🔗 Blockchain Record</div>
                  <div style={{ fontFamily: "monospace", fontSize: "0.82rem", color: "#4ade80", marginBottom: "10px", wordBreak: "break-all", background: "rgba(74,222,128,0.08)", padding: "8px 10px", borderRadius: "8px" }}>
                    {selected.blockchain.replace("…", "9f3e2bc781d4a")}
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {["✅ Immutable", "🕐 Timestamped", "🔒 Signed"].map(t => (
                      <span key={t} style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.07)", padding: "3px 9px", borderRadius: "20px" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── CHECKPOINTS TIMELINE ── */}
            <div style={{ background: "#fff", borderRadius: "20px", border: "1.5px solid rgba(180,160,100,0.18)", padding: "1.6rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "#0f2d14", marginBottom: "1.4rem" }}>📍 Checkpoint Timeline</div>
              <div style={{ position: "relative" }}>
                {/* Vertical line */}
                <div style={{ position: "absolute", left: "19px", top: "10px", bottom: "10px", width: "2px", background: "rgba(180,160,100,0.15)", borderRadius: "2px" }} />
                {selected.checkpoints.map((cp, i) => (
                  <div key={i} style={{ display: "flex", gap: "1.2rem", alignItems: "flex-start", marginBottom: i < selected.checkpoints.length - 1 ? "1.2rem" : 0, position: "relative" }}>
                    {/* Node */}
                    <div style={{
                      width: "38px", height: "38px", borderRadius: "50%", flexShrink: 0, zIndex: 1,
                      background: cp.done ? `linear-gradient(135deg, ${selected.color}, ${selected.color}cc)` : "#f1f5f9",
                      border: cp.done ? `2px solid ${selected.color}` : "2px solid #e2e8f0",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem",
                      boxShadow: cp.done ? `0 0 12px ${selected.color}44` : "none",
                    }}>
                      <span>{cp.done ? "✓" : cp.icon}</span>
                    </div>
                    {/* Content */}
                    <div style={{ flex: 1, paddingTop: "6px" }}>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem", color: cp.done ? "#0f2d14" : "#9ca3af" }}>{cp.name}</div>
                      <div style={{ fontSize: "0.78rem", color: cp.done ? "#6b7c47" : "#c4c9d1", marginTop: "2px" }}>
                        {cp.done ? "✅ " : "⏳ "}{cp.time}
                      </div>
                    </div>
                    {i === selected.checkpoints.findIndex(c => !c.done) - 1 && (
                      <span style={{ fontSize: "0.7rem", background: `${selected.color}18`, color: selected.color, fontWeight: 700, padding: "3px 10px", borderRadius: "20px", alignSelf: "center" }}>CURRENT</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── ACTIONS ── */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
              {[
                { label: "📄 View Contract", color: "#1a5c2a", outline: true },
                { label: "📞 Contact Driver", color: "#3b82f6", outline: true },
                { label: "⚠️ Report Issue", color: "#ef4444", outline: true },
                { label: "📤 Share Tracking", color: "#f59e0b", outline: false, bg: "linear-gradient(135deg,#f59e0b,#d97706)" },
              ].map(btn => (
                <button key={btn.label} style={{
                  padding: "12px 8px", borderRadius: "12px", fontSize: "0.82rem", fontWeight: 700,
                  cursor: "pointer", fontFamily: "inherit", transition: "transform 0.15s",
                  background: btn.bg || "transparent",
                  border: btn.outline ? `1.5px solid ${btn.color}50` : "none",
                  color: btn.bg ? "#fff" : btn.color,
                  boxShadow: btn.bg ? "0 4px 14px rgba(245,158,11,0.3)" : "none",
                }}>
                  {btn.label}
                </button>
              ))}
            </div>

          </div>
        )}
      </div>

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