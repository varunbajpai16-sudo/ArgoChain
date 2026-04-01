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


const STATS = [
  { icon: "🌻", label: "Harvested Crops", value: "125", unit: "Tons", color: "#d97706" },
  { icon: "🚛", label: "In Transit", value: "58", unit: "Shipments", color: "#059669" },
  { icon: "💰", label: "Market Price", value: "$1.25", unit: "/ kg", color: "#ca8a04" },
  { icon: "🌾", label: "Farmers Onboarded", value: "3,420", unit: "Active", color: "#16a34a" },
];

const FEATURES = [
  {
    icon: "🌾",
    title: "Farm Produce",
    desc: "Track fresh produce from farm to table with full traceability and quality assurance.",
    bg: "rgba(251,191,36,0.10)",
    border: "rgba(251,191,36,0.3)",
    accent: "#d97706",
  },
  {
    icon: "🚛",
    title: "Supply Tracking",
    desc: "Real-time shipment monitoring with GPS-enabled blockchain records for every delivery.",
    bg: "rgba(16,185,129,0.10)",
    border: "rgba(16,185,129,0.3)",
    accent: "#059669",
    featured: true,
  },
  {
    icon: "📋",
    title: "Smart Contracts",
    desc: "Automate payments and agreements between farmers, distributors, and buyers securely.",
    bg: "rgba(59,130,246,0.10)",
    border: "rgba(59,130,246,0.3)",
    accent: "#2563eb",
  },
  {
    icon: "📊",
    title: "Market Insights",
    desc: "Live pricing data, demand forecasts, and analytics to maximize your crop value.",
    bg: "rgba(249,115,22,0.10)",
    border: "rgba(249,115,22,0.3)",
    accent: "#ea580c",
  },
];

const TRANSACTIONS = [
  { id: "#TXN7845", type: "Sale of Wheat", amount: "₹ 50,000", status: "Completed", icon: "🌽", time: "2h ago" },
  { id: "#TXN7844", type: "Rice Delivery", amount: "₹ 32,500", status: "In Transit", icon: "🌾", time: "5h ago" },
  { id: "#TXN7843", type: "Corn Export", amount: "₹ 88,200", status: "Completed", icon: "🌽", time: "1d ago" },
];

const CONTRACTS = [
  { name: "Grain Sale Contract", party: "AgriCorp Ltd.", status: "Verified & Secure", value: "₹1,20,000", icon: "🛡️" },
  { name: "Rice Export Agreement", party: "Global Traders", status: "Pending Signature", value: "₹85,000", icon: "📝" },
];

export default function AgriWebHomePage() {
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f7f3ec", fontFamily: "'Palatino Linotype', Georgia, serif", color: "#1c1a14" }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        background: "rgba(255,252,245,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(180,160,100,0.2)",
        position: "sticky", top: 0, zIndex: 100,
        padding: "0 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "68px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "2rem" }}>🌿</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#1a3d1f", letterSpacing: "-0.3px" }}>AgroChain</div>
            <div style={{ fontSize: "0.65rem", color: "#6b7c47", letterSpacing: "0.12em", textTransform: "uppercase" }}>Blockchain Supply</div>
          </div>
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
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

        <button style={{
          background: "linear-gradient(135deg, #1a5c2a, #2d8a45)",
          color: "#fff", border: "none", borderRadius: "8px",
          padding: "10px 22px", fontSize: "0.88rem", fontWeight: 600,
          cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.02em",
          boxShadow: "0 4px 12px rgba(26,92,42,0.3)",
          transition: "transform 0.15s, box-shadow 0.15s",
        }}
          onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 6px 18px rgba(26,92,42,0.4)"; }}
          onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 4px 12px rgba(26,92,42,0.3)"; }}
        >
          Get Started →
        </button>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(160deg, #e8f5e2 0%, #fdf6e3 40%, #e6f4f1 100%)",
        padding: "80px 2rem 60px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(134,197,89,0.12)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(251,191,36,0.10)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>

          {/* Left text */}
          <div>
            <span style={{
              display: "inline-block", background: "rgba(26,92,42,0.1)", color: "#1a5c2a",
              fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
              padding: "5px 14px", borderRadius: "20px", marginBottom: "1.2rem",
              border: "1px solid rgba(26,92,42,0.2)",
            }}>🔗 Blockchain Powered Agriculture</span>

            <h1 style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.5rem", color: "#0f2d14" }}>
              Empowering the{" "}
              <em style={{ color: "#1a5c2a", fontStyle: "italic" }}>Future</em>
              <br />of{" "}
              <span style={{ position: "relative", display: "inline-block" }}>
                Agriculture
                <span style={{ position: "absolute", bottom: "-4px", left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, #f59e0b, #22c55e)", borderRadius: "2px" }} />
              </span>
            </h1>

            <p style={{ fontSize: "1.05rem", color: "#4a5340", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "480px" }}>
              A transparent, tamper-proof supply chain connecting farmers, distributors, and buyers — powered by blockchain smart contracts and real-time tracking.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button style={{
                background: "linear-gradient(135deg, #1a5c2a, #2d8a45)", color: "#fff",
                border: "none", borderRadius: "10px", padding: "14px 32px",
                fontSize: "1rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                boxShadow: "0 6px 20px rgba(26,92,42,0.35)",
                transition: "transform 0.2s",
              }}>🚀 Get Started Free</button>
              <button style={{
                background: "transparent", color: "#1a5c2a",
                border: "2px solid rgba(26,92,42,0.3)", borderRadius: "10px", padding: "14px 28px",
                fontSize: "1rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                transition: "background 0.2s",
              }}>▶ Watch Demo</button>
            </div>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
              {[["3,400+", "Farmers"], ["58", "Live Shipments"], ["99.9%", "Uptime"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1a5c2a" }}>{val}</div>
                  <div style={{ fontSize: "0.78rem", color: "#6b7c47", letterSpacing: "0.05em" }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Farm illustration panel */}
          <div style={{
            background: "rgba(255,252,245,0.7)", borderRadius: "24px",
            border: "1px solid rgba(134,197,89,0.3)",
            padding: "2rem", position: "relative", overflow: "hidden",
            boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
          }}>
            {/* Farm scene */}
            <div style={{ borderRadius: "16px", overflow: "hidden", background: "linear-gradient(180deg, #87ceeb 0%, #b8e4f7 30%, #c8e6a0 60%, #8bc34a 100%)", height: "220px", position: "relative", marginBottom: "1.5rem" }}>
              <div style={{ position: "absolute", fontSize: "3.5rem", bottom: "20px", left: "16px" }}>🚛</div>
              <div style={{ position: "absolute", fontSize: "2.5rem", bottom: "16px", left: "50%", transform: "translateX(-50%)" }}>🚜</div>
              <div style={{ position: "absolute", fontSize: "4.5rem", bottom: "8px", right: "16px" }}>👨‍🌾</div>
              <div style={{ position: "absolute", fontSize: "1.8rem", bottom: "20px", right: "90px" }}>🐄</div>
              <div style={{ position: "absolute", fontSize: "1.5rem", top: "20px", left: "40%" }}>🚁</div>
              <div style={{ position: "absolute", fontSize: "2rem", top: "24px", right: "30px" }}>🌬️</div>
              <div style={{ position: "absolute", fontSize: "1.4rem", bottom: "22px", left: "110px" }}>🧺</div>
              {/* Blockchain nodes overlay */}
              <div style={{ position: "absolute", top: "10px", left: "10px", display: "flex", gap: "6px" }}>
                {["#f59e0b","#22c55e","#3b82f6"].map((c,i) => (
                  <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c, opacity: 0.85 }} />
                ))}
              </div>
            </div>

            {/* Live stat chips */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {STATS.map(s => (
                <div key={s.label} style={{
                  background: "rgba(255,255,255,0.8)", borderRadius: "12px",
                  padding: "10px 14px", border: "1px solid rgba(180,160,100,0.15)",
                  display: "flex", alignItems: "center", gap: "10px",
                }}>
                  <span style={{ fontSize: "1.4rem" }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: "1rem", fontWeight: 800, color: s.color }}>{s.value} <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "#888" }}>{s.unit}</span></div>
                    <div style={{ fontSize: "0.7rem", color: "#7a7060" }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE TICKER ── */}
      <div style={{ background: "#1a3d1f", color: "#a8d5a2", padding: "10px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: "3rem", animation: "ticker 18s linear infinite", whiteSpace: "nowrap", fontSize: "0.82rem", letterSpacing: "0.05em" }}>
          {[...Array(3)].flatMap(() => ["🌾 Wheat — ₹2,280/qtl  ▲1.2%", "🌽 Maize — ₹1,850/qtl  ▲0.8%", "🍚 Rice — ₹3,100/qtl  ▼0.3%", "🧅 Onion — ₹1,200/qtl  ▲3.1%", "🍅 Tomato — ₹890/qtl  ▲5.4%", "🫛 Soybean — ₹4,600/qtl  ▼0.6%"]).map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-33.33%) } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
      `}</style>

      {/* ── FEATURES ── */}
      <section style={{ padding: "80px 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f2d14", marginBottom: "0.6rem" }}>Everything You Need</h2>
          <p style={{ color: "#5a5244", fontSize: "1rem", maxWidth: "520px", margin: "0 auto" }}>From seed to shelf — manage your entire agricultural supply chain in one unified platform.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{
              background: f.featured ? "linear-gradient(135deg, #1a5c2a, #2d8a45)" : `rgba(255,252,245,0.9)`,
              borderRadius: "20px",
              border: f.featured ? "none" : `1.5px solid ${f.border}`,
              padding: "2rem",
              boxShadow: f.featured ? "0 12px 40px rgba(26,92,42,0.3)" : "0 2px 12px rgba(0,0,0,0.04)",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
              transform: f.featured ? "translateY(-6px)" : "none",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = f.featured ? "0 16px 48px rgba(26,92,42,0.4)" : "0 8px 30px rgba(0,0,0,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = f.featured ? "translateY(-6px)" : "none"; e.currentTarget.style.boxShadow = f.featured ? "0 12px 40px rgba(26,92,42,0.3)" : "0 2px 12px rgba(0,0,0,0.04)"; }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{f.icon}</div>
              {f.featured && <span style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: "0.7rem", padding: "3px 10px", borderRadius: "20px", marginBottom: "0.6rem", letterSpacing: "0.1em" }}>MOST USED</span>}
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.6rem", color: f.featured ? "#fff" : "#0f2d14" }}>{f.title}</h3>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: f.featured ? "rgba(255,255,255,0.85)" : "#5a5244" }}>{f.desc}</p>
              <div style={{ marginTop: "1.2rem", fontSize: "0.85rem", fontWeight: 600, color: f.featured ? "#a8f0b0" : f.accent }}>
                Explore →
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DASHBOARD SECTION ── */}
      <section style={{ padding: "0 2rem 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#0f2d14" }}>Live Dashboard</h2>
          <p style={{ color: "#5a5244" }}>Real-time supply chain data, refreshed every 30 seconds.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem" }}>

          {/* Map Card */}
          <div style={{ gridColumn: "1 / 3", background: "rgba(255,252,245,0.9)", borderRadius: "20px", border: "1px solid rgba(180,160,100,0.2)", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <div style={{ padding: "1.4rem 1.6rem", borderBottom: "1px solid rgba(180,160,100,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "#0f2d14" }}>Supply Route Map</div>
                <div style={{ fontSize: "0.8rem", color: "#6b7c47" }}>58 active shipments en route</div>
              </div>
              <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: "0.75rem", fontWeight: 700, padding: "4px 12px", borderRadius: "20px" }}>● LIVE</span>
            </div>
            {/* SVG Map */}
            <div style={{ background: "linear-gradient(160deg, #e0f2fe, #dcfce7)", padding: "1.5rem", position: "relative", height: "260px" }}>
              <svg viewBox="0 0 600 220" style={{ width: "100%", height: "100%" }}>
                {/* Roads */}
                <path d="M40 160 Q120 100 200 130 Q300 160 400 100 Q480 60 560 80" stroke="#94a3b8" strokeWidth="3" fill="none" strokeDasharray="6,4" strokeLinecap="round" />
                <path d="M60 60 Q160 100 260 70 Q360 45 460 90 Q510 110 560 150" stroke="#94a3b8" strokeWidth="2.5" fill="none" strokeDasharray="5,4" strokeLinecap="round" />
                {/* Active route */}
                <path d="M80 150 Q200 100 340 120 Q430 130 520 90" stroke="#22c55e" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.8" />
                {/* Location pins */}
                {[[80,150],[200,110],[340,120],[520,92]].map(([x,y],i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r="10" fill="#22c55e" opacity="0.2" />
                    <circle cx={x} cy={y} r="5" fill={i===0?"#f59e0b":i===3?"#ef4444":"#22c55e"} />
                  </g>
                ))}
                {/* Truck on route */}
                <text x="290" y="108" fontSize="22" textAnchor="middle">🚛</text>
                <text x="80" y="148" fontSize="16" textAnchor="middle">🏚️</text>
                <text x="520" y="90" fontSize="16" textAnchor="middle">🏪</text>
              </svg>
              <div style={{ position: "absolute", bottom: "1rem", left: "1.5rem", background: "rgba(26,92,42,0.9)", color: "#fff", fontSize: "0.8rem", fontWeight: 600, padding: "6px 16px", borderRadius: "20px" }}>
                ↑ En Route to Market — ETA 2h 15m
              </div>
            </div>
          </div>

          {/* Stats Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {STATS.map(s => (
              <div key={s.label} style={{
                background: "rgba(255,252,245,0.9)", borderRadius: "16px",
                border: "1px solid rgba(180,160,100,0.2)", padding: "1.2rem 1.4rem",
                display: "flex", alignItems: "center", gap: "1rem",
                boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
              }}>
                <span style={{ fontSize: "2rem" }}>{s.icon}</span>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: s.color }}>{s.value} <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#888" }}>{s.unit}</span></div>
                  <div style={{ fontSize: "0.78rem", color: "#7a7060" }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Transactions */}
          <div style={{ background: "rgba(255,252,245,0.9)", borderRadius: "20px", border: "1px solid rgba(180,160,100,0.2)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", overflow: "hidden" }}>
            <div style={{ padding: "1.2rem 1.4rem", borderBottom: "1px solid rgba(180,160,100,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "#0f2d14" }}>Recent Transactions</div>
              <button style={{ background: "none", border: "none", color: "#1a5c2a", fontSize: "0.82rem", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>View all →</button>
            </div>
            <div style={{ padding: "0.5rem 0" }}>
              {TRANSACTIONS.map(tx => (
                <div key={tx.id} style={{ padding: "0.9rem 1.4rem", display: "flex", alignItems: "center", gap: "0.9rem", borderBottom: "0.5px solid rgba(180,160,100,0.1)" }}>
                  <span style={{ fontSize: "1.8rem" }}>{tx.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.75rem", color: "#888", fontFamily: "monospace" }}>{tx.id}</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1c1a14" }}>{tx.type}</div>
                    <div style={{ fontSize: "0.75rem", color: "#888" }}>{tx.time}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1a3d1f" }}>{tx.amount}</div>
                    <span style={{
                      display: "inline-block", fontSize: "0.7rem", fontWeight: 700, padding: "2px 10px", borderRadius: "20px",
                      background: tx.status === "Completed" ? "#dcfce7" : "#fef9c3",
                      color: tx.status === "Completed" ? "#16a34a" : "#a16207",
                    }}>{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Smart Contracts */}
          <div style={{ background: "rgba(255,252,245,0.9)", borderRadius: "20px", border: "1px solid rgba(180,160,100,0.2)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", overflow: "hidden" }}>
            <div style={{ padding: "1.2rem 1.4rem", borderBottom: "1px solid rgba(180,160,100,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "#0f2d14" }}>Smart Contracts</div>
              <button style={{ background: "none", border: "none", color: "#1a5c2a", fontSize: "0.82rem", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>Manage →</button>
            </div>
            <div style={{ padding: "1rem 1.4rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {CONTRACTS.map(c => (
                <div key={c.name} style={{ background: "rgba(240,250,240,0.8)", borderRadius: "14px", padding: "1rem 1.2rem", border: "1px solid rgba(134,197,89,0.2)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f2d14" }}>{c.name}</div>
                      <div style={{ fontSize: "0.78rem", color: "#6b7c47" }}>{c.party}</div>
                    </div>
                    <span style={{ fontSize: "1.8rem" }}>{c.icon}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.78rem", color: c.status.includes("Verified") ? "#16a34a" : "#a16207", fontWeight: 600 }}>
                      {c.status.includes("Verified") ? "✅" : "⏳"} {c.status}
                    </span>
                    <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "#1a3d1f" }}>{c.value}</span>
                  </div>
                  <button style={{
                    width: "100%", marginTop: "0.8rem",
                    background: "linear-gradient(135deg, #1a5c2a, #2d8a45)", color: "#fff",
                    border: "none", borderRadius: "8px", padding: "8px",
                    fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                  }}>View Details</button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{
        background: "linear-gradient(135deg, #1a3d1f, #1a5c2a, #2d8a45)",
        padding: "80px 2rem", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.06 }}>
          <div style={{ position: "absolute", top: "10%", left: "5%", fontSize: "8rem" }}>🌾</div>
          <div style={{ position: "absolute", top: "20%", right: "5%", fontSize: "6rem" }}>🚛</div>
          <div style={{ position: "absolute", bottom: "10%", left: "15%", fontSize: "5rem" }}>📊</div>
        </div>
        <div style={{ position: "relative", maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#fff", marginBottom: "1rem" }}>Ready to Transform Your Farm?</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", marginBottom: "2rem", lineHeight: 1.6 }}>Join thousands of farmers already using AgriChain to get better prices, faster payments, and full supply chain visibility.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{ background: "#f59e0b", color: "#1c1a14", border: "none", borderRadius: "10px", padding: "14px 36px", fontSize: "1rem", fontWeight: 800, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 6px 20px rgba(245,158,11,0.4)" }}>
              🌱 Start for Free
            </button>
            <button style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "2px solid rgba(255,255,255,0.3)", borderRadius: "10px", padding: "14px 28px", fontSize: "1rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", backdropFilter: "blur(8px)" }}>
              Talk to an Expert
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0f2d14", color: "rgba(255,255,255,0.6)", padding: "2rem", textAlign: "center", fontSize: "0.85rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "1.4rem" }}>🌿</span>
          <span style={{ color: "#a8d5a2", fontWeight: 700, fontSize: "1rem" }}>AgriChain</span>
        </div>
        <p>© 2026 AgriChain. Empowering agriculture through blockchain transparency.</p>
      </footer>

    </div>
  );
}