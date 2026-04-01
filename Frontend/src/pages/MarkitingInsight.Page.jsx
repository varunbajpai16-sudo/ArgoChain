import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Farm Produce", path: "/farm-produce" },
  { name: "Supply Tracking", path: "/supply-tracking" },
  { name: "Smart Contracts", path: "/smart-contracts" },
  { name: "Market Insights", path: "/market-insights" },
  { name: "About", path: "/about" },
];

// ── Data ──────────────────────────────────────────────────────────────────────

const CROPS = [
  { id: "wheat",   icon: "🌾", name: "Wheat",    price: 2280, prev: 2253, unit: "qtl", trend: [2100,2180,2200,2160,2220,2253,2280], demand: 82, region: "Punjab" },
  { id: "rice",    icon: "🍚", name: "Rice",     price: 3100, prev: 3110, unit: "qtl", trend: [3050,3080,3120,3090,3110,3110,3100], demand: 91, region: "West Bengal" },
  { id: "maize",   icon: "🌽", name: "Maize",    price: 1850, prev: 1835, unit: "qtl", trend: [1750,1780,1800,1820,1835,1840,1850], demand: 67, region: "Karnataka" },
  { id: "onion",   icon: "🧅", name: "Onion",    price: 1200, prev: 1164, unit: "qtl", trend: [900,1000,1080,1120,1164,1180,1200], demand: 74, region: "Maharashtra" },
  { id: "tomato",  icon: "🍅", name: "Tomato",   price: 890,  prev: 845,  unit: "qtl", trend: [700,740,780,820,845,870,890],       demand: 88, region: "Andhra Pradesh" },
  { id: "soybean", icon: "🫛", name: "Soybean",  price: 4600, prev: 4628, unit: "qtl", trend: [4700,4680,4650,4640,4628,4620,4600], demand: 55, region: "Madhya Pradesh" },
  { id: "cotton",  icon: "🌸", name: "Cotton",   price: 6800, prev: 6720, unit: "qtl", trend: [6400,6500,6580,6640,6720,6760,6800], demand: 60, region: "Gujarat" },
  { id: "sugar",   icon: "🍬", name: "Sugarcane",price: 315,  prev: 310,  unit: "qtl", trend: [300,304,307,308,310,312,315],       demand: 78, region: "Uttar Pradesh" },
];

const ALERTS = [
  { icon: "📈", type: "Opportunity", msg: "Tomato prices up 5.4% — consider early harvest sales in AP mandis.", color: "#16a34a", bg: "#dcfce7" },
  { icon: "⚠️", type: "Advisory",   msg: "Excess rainfall forecast next week may affect Wheat supply in Punjab.", color: "#a16207", bg: "#fef9c3" },
  { icon: "🚨", type: "Alert",      msg: "Soybean futures declining — consider hedging via Smart Contracts.", color: "#dc2626", bg: "#fee2e2" },
  { icon: "💡", type: "Insight",    msg: "Cotton demand from textile exporters surging — lock in prices now.", color: "#2563eb", bg: "#dbeafe" },
];

const REGIONS = [
  { name: "North India",  crops: ["Wheat", "Rice", "Onion"],    change: "+2.1%",  color: "#16a34a" },
  { name: "South India",  crops: ["Tomato", "Maize", "Rice"],   change: "+4.2%",  color: "#059669" },
  { name: "West India",   crops: ["Cotton", "Onion", "Wheat"],  change: "+1.8%",  color: "#ca8a04" },
  { name: "East India",   crops: ["Rice", "Maize", "Jute"],     change: "-0.5%",  color: "#dc2626" },
  { name: "Central India",crops: ["Soybean", "Wheat", "Maize"],change: "-0.3%",  color: "#a16207" },
];

const FORECAST = [
  { month: "Apr", wheat: 2310, rice: 3080, maize: 1870 },
  { month: "May", wheat: 2290, rice: 3050, maize: 1900 },
  { month: "Jun", wheat: 2350, rice: 2980, maize: 1940 },
  { month: "Jul", wheat: 2400, rice: 2920, maize: 1960 },
  { month: "Aug", wheat: 2380, rice: 2890, maize: 1920 },
  { month: "Sep", wheat: 2420, rice: 2950, maize: 1950 },
];

// ── Mini Sparkline ────────────────────────────────────────────────────────────
function Sparkline({ data, color, up }) {
  const min = Math.min(...data), max = Math.max(...data);
  const w = 80, h = 32;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min + 1)) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts.split(" ").pop().split(",")[0]} cy={pts.split(" ").pop().split(",")[1]} r="3" fill={color} />
    </svg>
  );
}

// ── Forecast Bar Chart ────────────────────────────────────────────────────────
function ForecastChart({ data }) {
  const crops = ["wheat", "rice", "maize"];
  const colors = ["#d97706", "#16a34a", "#f59e0b"];
  const max = Math.max(...data.flatMap(d => crops.map(c => d[c])));
  return (
    <div style={{ padding: "1.5rem" }}>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.8rem" }}>
        {crops.map((c, i) => (
          <span key={c} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.75rem", color: "#5a5244" }}>
            <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 2, background: colors[i] }} />
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", gap: "0.7rem", alignItems: "flex-end", height: "120px" }}>
        {data.map((d, gi) => (
          <div key={d.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
            <div style={{ display: "flex", gap: "2px", alignItems: "flex-end", height: "100px" }}>
              {crops.map((c, ci) => (
                <div key={c} style={{
                  width: "10px", height: `${(d[c] / max) * 100}px`,
                  background: colors[ci], borderRadius: "3px 3px 0 0",
                  transition: "height 0.6s ease",
                  opacity: 0.85,
                }} />
              ))}
            </div>
            <div style={{ fontSize: "0.65rem", color: "#7a7060", fontWeight: 600 }}>{d.month}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Demand Gauge ─────────────────────────────────────────────────────────────
function DemandGauge({ value }) {
  const color = value > 80 ? "#16a34a" : value > 60 ? "#ca8a04" : "#dc2626";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <div style={{ flex: 1, height: "6px", background: "#e5e7eb", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 3, transition: "width 1s ease" }} />
      </div>
      <span style={{ fontSize: "0.7rem", fontWeight: 700, color, minWidth: "28px" }}>{value}%</span>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function MarketInsightsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState("wheat");
  const [sortBy, setSortBy] = useState("price");
  const [filter, setFilter] = useState("all");
  const [tick, setTick] = useState(0);
  const [animIn, setAnimIn] = useState(false);

  const getActiveNav = () => {
    const found = NAV_LINKS.find(l => l.path === location.pathname);
    return found ? found.name : "";
  };

  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setAnimIn(false);
    const t = setTimeout(() => setAnimIn(true), 50);
    return () => clearTimeout(t);
  }, [selected]);

  const selectedCrop = CROPS.find(c => c.id === selected);
  const priceDiff = selectedCrop.price - selectedCrop.prev;
  const pricePct = ((priceDiff / selectedCrop.prev) * 100).toFixed(1);
  const isUp = priceDiff >= 0;

  const filteredCrops = filter === "all" ? CROPS
    : filter === "up" ? CROPS.filter(c => c.price >= c.prev)
    : CROPS.filter(c => c.price < c.prev);

  const sortedCrops = [...filteredCrops].sort((a, b) =>
    sortBy === "price" ? b.price - a.price
    : sortBy === "demand" ? b.demand - a.demand
    : b.price - b.prev - (a.price - a.prev)
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f7f3ec", fontFamily: "'Palatino Linotype', Georgia, serif", color: "#1c1a14" }}>

      <style>{`
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-33.33%) } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px) } to { opacity:1; transform:translateY(0) } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        .crop-row:hover { background: rgba(26,92,42,0.06) !important; cursor: pointer; }
        .nav-btn:hover { color: #1a5c2a !important; }
        .filter-btn:hover { background: rgba(26,92,42,0.08) !important; }
        .region-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important; }
      `}</style>

      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <nav style={{
        background: "rgba(255,252,245,0.95)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(180,160,100,0.2)",
        position: "sticky", top: 0, zIndex: 100,
        padding: "0 2rem", display: "flex", alignItems: "center",
        justifyContent: "space-between", height: "68px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "2rem" }}>🌿</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#1a3d1f", letterSpacing: "-0.3px" }}>AgroChain</div>
            <div style={{ fontSize: "0.65rem", color: "#6b7c47", letterSpacing: "0.12em", textTransform: "uppercase" }}>Blockchain Supply</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {NAV_LINKS.map(link => (
            <button key={link.name} className="nav-btn" onClick={() => navigate(link.path)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: "0.875rem", fontFamily: "inherit",
              color: link.name === getActiveNav() ? "#1a5c2a" : "#5a5244",
              fontWeight: link.name === getActiveNav() ? 700 : 400,
              borderBottom: link.name === getActiveNav() ? "2px solid #1a5c2a" : "2px solid transparent",
              paddingBottom: "2px", transition: "all 0.2s",
            }}>{link.name}</button>
          ))}
        </div>
        <button style={{
          background: "linear-gradient(135deg, #1a5c2a, #2d8a45)", color: "#fff",
          border: "none", borderRadius: "8px", padding: "10px 22px",
          fontSize: "0.88rem", fontWeight: 600, cursor: "pointer",
          fontFamily: "inherit", letterSpacing: "0.02em",
          boxShadow: "0 4px 12px rgba(26,92,42,0.3)",
        }}>Get Started →</button>
      </nav>

      {/* ── LIVE TICKER ─────────────────────────────────────── */}
      <div style={{ background: "#1a3d1f", color: "#a8d5a2", padding: "10px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: "3rem", animation: "ticker 20s linear infinite", whiteSpace: "nowrap", fontSize: "0.82rem", letterSpacing: "0.05em" }}>
          {[...Array(3)].flatMap(() => CROPS.map(c => {
            const up = c.price >= c.prev;
            return `${c.icon} ${c.name} — ₹${c.price.toLocaleString()}/${c.unit}  ${up ? "▲" : "▼"}${Math.abs(((c.price - c.prev) / c.prev * 100)).toFixed(1)}%`;
          })).map((item, i) => <span key={i}>{item} &nbsp;&nbsp;&nbsp;</span>)}
        </div>
      </div>

      {/* ── HERO HEADER ────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(160deg, #e8f5e2 0%, #fdf6e3 50%, #e6f4f1 100%)",
        padding: "60px 2rem 48px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "360px", height: "360px", borderRadius: "50%", background: "rgba(134,197,89,0.1)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <span style={{
            display: "inline-block", background: "rgba(26,92,42,0.1)", color: "#1a5c2a",
            fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
            padding: "5px 14px", borderRadius: "20px", marginBottom: "1rem",
            border: "1px solid rgba(26,92,42,0.2)",
          }}>📊 Live Market Insights</span>
          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)", fontWeight: 800, color: "#0f2d14", marginBottom: "0.6rem", lineHeight: 1.1 }}>
            Agri <em style={{ color: "#1a5c2a" }}>Market</em> Intelligence
          </h1>
          <p style={{ color: "#4a5340", fontSize: "1rem", maxWidth: "560px", lineHeight: 1.7 }}>
            Real-time price discovery, demand forecasts, and regional market analytics — to maximize your crop's value before it leaves the farm.
          </p>
          {/* KPI row */}
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "2rem", flexWrap: "wrap" }}>
            {[["8", "Crops Tracked"], ["28", "State Mandis"], ["₹2.4Cr", "Daily Volume"], ["99.9%", "Data Accuracy"]].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1a5c2a" }}>{v}</div>
                <div style={{ fontSize: "0.75rem", color: "#6b7c47" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALERTS BAR ─────────────────────────────────────── */}
      <section style={{ padding: "24px 2rem 0", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0.8rem" }}>
          {ALERTS.map((a, i) => (
            <div key={i} style={{
              background: a.bg, borderRadius: "12px", padding: "0.8rem 1.1rem",
              border: `1px solid ${a.color}33`, display: "flex", gap: "0.7rem", alignItems: "flex-start",
              animation: `fadeUp 0.5s ease ${i * 0.08}s both`,
            }}>
              <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>{a.icon}</span>
              <div>
                <div style={{ fontSize: "0.68rem", fontWeight: 700, color: a.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>{a.type}</div>
                <div style={{ fontSize: "0.82rem", color: "#1c1a14", lineHeight: 1.5 }}>{a.msg}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MAIN CONTENT ───────────────────────────────────── */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 2rem 80px", display: "grid", gridTemplateColumns: "1fr 380px", gap: "1.8rem", alignItems: "start" }}>

        {/* LEFT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>

          {/* ── Crop Price Table ── */}
          <div style={{ background: "rgba(255,252,245,0.95)", borderRadius: "20px", border: "1px solid rgba(180,160,100,0.2)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", overflow: "hidden" }}>
            <div style={{ padding: "1.3rem 1.6rem", borderBottom: "1px solid rgba(180,160,100,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.8rem" }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#0f2d14" }}>Live Crop Prices</div>
                <div style={{ fontSize: "0.78rem", color: "#6b7c47" }}>Updated every 30 seconds · All prices in ₹/quintal</div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                {/* Filter */}
                {[["all","All"],["up","▲ Rising"],["down","▼ Falling"]].map(([val, lbl]) => (
                  <button key={val} className="filter-btn" onClick={() => setFilter(val)} style={{
                    background: filter === val ? "#1a5c2a" : "transparent",
                    color: filter === val ? "#fff" : "#5a5244",
                    border: "1px solid", borderColor: filter === val ? "#1a5c2a" : "rgba(180,160,100,0.3)",
                    borderRadius: "20px", padding: "4px 12px", fontSize: "0.75rem",
                    fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                  }}>{lbl}</button>
                ))}
                {/* Sort */}
                <select onChange={e => setSortBy(e.target.value)} value={sortBy} style={{
                  background: "rgba(255,252,245,0.9)", border: "1px solid rgba(180,160,100,0.3)",
                  borderRadius: "8px", padding: "4px 8px", fontSize: "0.75rem", color: "#5a5244",
                  fontFamily: "inherit", cursor: "pointer",
                }}>
                  <option value="price">Sort: Price</option>
                  <option value="demand">Sort: Demand</option>
                  <option value="change">Sort: Change</option>
                </select>
              </div>
            </div>

            <div>
              {/* Table header */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 80px", padding: "0.6rem 1.6rem", background: "rgba(240,235,220,0.5)", fontSize: "0.7rem", fontWeight: 700, color: "#7a7060", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                <div>Crop</div><div>Price</div><div>Change</div><div>Demand</div><div>7-Day</div>
              </div>
              {sortedCrops.map((c, i) => {
                const diff = c.price - c.prev;
                const pct = ((diff / c.prev) * 100).toFixed(1);
                const up = diff >= 0;
                return (
                  <div key={c.id} className="crop-row" onClick={() => setSelected(c.id)} style={{
                    display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 80px",
                    padding: "0.85rem 1.6rem", alignItems: "center",
                    borderBottom: "0.5px solid rgba(180,160,100,0.12)",
                    background: selected === c.id ? "rgba(26,92,42,0.06)" : "transparent",
                    transition: "background 0.2s",
                    animation: `fadeUp 0.4s ease ${i * 0.05}s both`,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                      <span style={{ fontSize: "1.4rem" }}>{c.icon}</span>
                      <div>
                        <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f2d14" }}>{c.name}</div>
                        <div style={{ fontSize: "0.7rem", color: "#7a7060" }}>{c.region}</div>
                      </div>
                      {selected === c.id && <span style={{ fontSize: "0.65rem", background: "#1a5c2a", color: "#fff", padding: "2px 8px", borderRadius: "10px", fontWeight: 700 }}>SELECTED</span>}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#0f2d14" }}>₹{c.price.toLocaleString()}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: up ? "#16a34a" : "#dc2626" }}>{up ? "▲" : "▼"} {Math.abs(pct)}%</span>
                    </div>
                    <DemandGauge value={c.demand} />
                    <Sparkline data={c.trend} color={up ? "#16a34a" : "#dc2626"} up={up} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── 6-Month Forecast ── */}
          <div style={{ background: "rgba(255,252,245,0.95)", borderRadius: "20px", border: "1px solid rgba(180,160,100,0.2)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", overflow: "hidden" }}>
            <div style={{ padding: "1.3rem 1.6rem", borderBottom: "1px solid rgba(180,160,100,0.15)" }}>
              <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#0f2d14" }}>6-Month Price Forecast</div>
              <div style={{ fontSize: "0.78rem", color: "#6b7c47" }}>AI-powered prediction for Wheat, Rice & Maize</div>
            </div>
            <ForecastChart data={FORECAST} />
          </div>

          {/* ── Regional Performance ── */}
          <div style={{ background: "rgba(255,252,245,0.95)", borderRadius: "20px", border: "1px solid rgba(180,160,100,0.2)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", overflow: "hidden" }}>
            <div style={{ padding: "1.3rem 1.6rem", borderBottom: "1px solid rgba(180,160,100,0.15)" }}>
              <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#0f2d14" }}>Regional Market Performance</div>
              <div style={{ fontSize: "0.78rem", color: "#6b7c47" }}>Zone-wise price movement this week</div>
            </div>
            <div style={{ padding: "1.4rem 1.6rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
              {REGIONS.map(r => (
                <div key={r.name} className="region-card" style={{
                  background: "rgba(240,250,240,0.7)", borderRadius: "14px",
                  padding: "1rem 1.1rem", border: "1px solid rgba(134,197,89,0.2)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0f2d14" }}>{r.name}</div>
                    <span style={{ fontSize: "0.78rem", fontWeight: 800, color: r.color }}>{r.change}</span>
                  </div>
                  <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                    {r.crops.map(crop => (
                      <span key={crop} style={{ fontSize: "0.65rem", background: "rgba(26,92,42,0.1)", color: "#1a5c2a", padding: "2px 8px", borderRadius: "10px", fontWeight: 600 }}>{crop}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — Detail Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem", position: "sticky", top: "84px" }}>

          {/* ── Selected Crop Detail ── */}
          <div key={selected} style={{
            background: "linear-gradient(160deg, #1a3d1f, #1a5c2a, #2d8a45)",
            borderRadius: "20px", padding: "1.8rem", color: "#fff",
            boxShadow: "0 12px 40px rgba(26,92,42,0.3)",
            animation: animIn ? "fadeUp 0.4s ease" : "none",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.2rem" }}>
              <div>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>Selected Crop</div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "2.2rem" }}>{selectedCrop.icon}</span>
                  <span style={{ fontSize: "1.5rem", fontWeight: 800 }}>{selectedCrop.name}</span>
                </div>
              </div>
              <span style={{
                background: isUp ? "rgba(134,239,172,0.2)" : "rgba(252,165,165,0.2)",
                color: isUp ? "#86efac" : "#fca5a5",
                fontSize: "0.78rem", fontWeight: 700, padding: "5px 12px", borderRadius: "20px",
                border: `1px solid ${isUp ? "rgba(134,239,172,0.3)" : "rgba(252,165,165,0.3)"}`,
              }}>{isUp ? "▲" : "▼"} {Math.abs(pricePct)}%</span>
            </div>
            <div style={{ fontSize: "2.8rem", fontWeight: 900, letterSpacing: "-1px", marginBottom: "0.3rem" }}>
              ₹{selectedCrop.price.toLocaleString()}
              <span style={{ fontSize: "1rem", fontWeight: 500, color: "rgba(255,255,255,0.6)", marginLeft: "6px" }}>/{selectedCrop.unit}</span>
            </div>
            <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", marginBottom: "1.4rem" }}>
              Prev: ₹{selectedCrop.prev.toLocaleString()} &nbsp;·&nbsp; {isUp ? "+" : ""}{priceDiff} today
            </div>
            {/* Demand bar */}
            <div style={{ marginBottom: "1.2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "rgba(255,255,255,0.7)", marginBottom: "6px" }}>
                <span>Market Demand</span><span style={{ fontWeight: 700 }}>{selectedCrop.demand}%</span>
              </div>
              <div style={{ height: "8px", background: "rgba(255,255,255,0.15)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: `${selectedCrop.demand}%`, height: "100%", background: "linear-gradient(90deg, #a8f0b0, #22c55e)", borderRadius: "4px", transition: "width 1s ease" }} />
              </div>
            </div>
            {/* Tags */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "1.4rem" }}>
              <span style={{ fontSize: "0.72rem", background: "rgba(255,255,255,0.15)", color: "#fff", padding: "4px 10px", borderRadius: "10px" }}>📍 {selectedCrop.region}</span>
              <span style={{ fontSize: "0.72rem", background: "rgba(255,255,255,0.15)", color: "#fff", padding: "4px 10px", borderRadius: "10px" }}>
                {selectedCrop.demand > 80 ? "🔥 High Demand" : selectedCrop.demand > 60 ? "✅ Stable" : "⚠️ Low Demand"}
              </span>
            </div>
            {/* Sparkline in panel */}
            <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1rem", marginBottom: "1.4rem" }}>
              <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.6)", marginBottom: "8px", fontWeight: 600 }}>7-Day Trend</div>
              <Sparkline data={selectedCrop.trend} color={isUp ? "#86efac" : "#fca5a5"} up={isUp} />
            </div>
            <button style={{
              width: "100%", background: "#f59e0b", color: "#1c1a14",
              border: "none", borderRadius: "10px", padding: "12px",
              fontSize: "0.9rem", fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
              boxShadow: "0 4px 16px rgba(245,158,11,0.35)",
            }}>📋 Create Smart Contract →</button>
          </div>

          {/* ── Quick Stats ── */}
          <div style={{ background: "rgba(255,252,245,0.95)", borderRadius: "20px", border: "1px solid rgba(180,160,100,0.2)", padding: "1.4rem", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#0f2d14", marginBottom: "1rem" }}>Today's Market Summary</div>
            {[
              ["🌾 Best Performer", "Tomato +5.4%", "#16a34a"],
              ["📉 Biggest Drop", "Soybean -0.6%", "#dc2626"],
              ["🔥 Highest Demand", "Rice — 91%", "#ca8a04"],
              ["📦 Total Volume", "₹2.4 Crore", "#2563eb"],
            ].map(([lbl, val, col]) => (
              <div key={lbl} style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "0.5px solid rgba(180,160,100,0.15)", alignItems: "center" }}>
                <span style={{ fontSize: "0.82rem", color: "#5a5244" }}>{lbl}</span>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: col }}>{val}</span>
              </div>
            ))}
          </div>

          {/* ── AI Recommendation ── */}
          <div style={{
            background: "rgba(253,246,227,0.95)", borderRadius: "20px",
            border: "1px solid rgba(245,158,11,0.25)", padding: "1.4rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "0.8rem" }}>
              <span style={{ fontSize: "1.4rem" }}>🤖</span>
              <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#0f2d14" }}>AI Recommendation</div>
              <span style={{ marginLeft: "auto", fontSize: "0.65rem", background: "#fef9c3", color: "#a16207", padding: "2px 8px", borderRadius: "10px", fontWeight: 700, border: "1px solid #fde68a", animation: "pulse 2s infinite" }}>LIVE</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#4a5340", lineHeight: 1.7, marginBottom: "1rem" }}>
              Based on current mandi prices and forecast models, <strong>Tomato</strong> and <strong>Cotton</strong> show strong upward momentum. Consider locking in contracts for the next 30 days via AgroChain Smart Contracts.
            </p>
            <button onClick={() => navigate("/smart-contracts")} style={{
              width: "100%", background: "linear-gradient(135deg, #1a5c2a, #2d8a45)", color: "#fff",
              border: "none", borderRadius: "10px", padding: "10px",
              fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
            }}>View Smart Contracts →</button>
          </div>
        </div>
      </main>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(135deg, #1a3d1f, #1a5c2a, #2d8a45)",
        padding: "64px 2rem", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "relative", maxWidth: "540px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff", marginBottom: "0.8rem" }}>Get Price Alerts on Your Crops</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.98rem", marginBottom: "1.8rem", lineHeight: 1.6 }}>
            Subscribe to instant mandi price alerts and never miss a market opportunity.
          </p>
          <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{ background: "#f59e0b", color: "#1c1a14", border: "none", borderRadius: "10px", padding: "13px 32px", fontSize: "0.95rem", fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
              🔔 Enable Alerts
            </button>
            <button style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "2px solid rgba(255,255,255,0.3)", borderRadius: "10px", padding: "13px 26px", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              Download Report
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
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