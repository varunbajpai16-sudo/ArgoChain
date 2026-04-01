import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Farm Produce", path: "/farm-produce" },
  { name: "Supply Tracking", path: "/supply-tracking" },
  { name: "Smart Contracts", path: "/smart-contracts" },
  { name: "Market Insights", path: "/market-insights" },
  { name: "About", path: "/about" },
];

const CATEGORIES = [
  { id: "all", label: "All Produce", icon: "🌿" },
  { id: "grains", label: "Grains & Cereals", icon: "🌾" },
  { id: "vegetables", label: "Vegetables", icon: "🥦" },
  { id: "fruits", label: "Fruits", icon: "🍎" },
  { id: "pulses", label: "Pulses & Legumes", icon: "🫘" },
  { id: "spices", label: "Spices", icon: "🌶️" },
];

const PRODUCE = [
  {
    id: 1, name: "Basmati Rice", category: "grains", icon: "🍚",
    farmer: "Rajesh Kumar", location: "Punjab, India", grade: "A+",
    price: "₹3,200", unit: "/ qtl", available: "48 Tons",
    harvest: "Oct 2025", blockchain: "0x4f2a…c81d",
    certified: true, organic: true,
    tags: ["Premium", "Export Quality"],
    color: "#f59e0b", bg: "rgba(251,191,36,0.08)",
  },
  {
    id: 2, name: "Wheat (HD-2967)", category: "grains", icon: "🌾",
    farmer: "Suresh Patel", location: "Madhya Pradesh", grade: "A",
    price: "₹2,280", unit: "/ qtl", available: "125 Tons",
    harvest: "Apr 2025", blockchain: "0x7e1b…a39c",
    certified: true, organic: false,
    tags: ["High Yield", "Government MSP"],
    color: "#d97706", bg: "rgba(217,119,6,0.08)",
  },
  {
    id: 3, name: "Fresh Tomatoes", category: "vegetables", icon: "🍅",
    farmer: "Anita Sharma", location: "Maharashtra", grade: "A",
    price: "₹890", unit: "/ qtl", available: "12 Tons",
    harvest: "Mar 2026", blockchain: "0x9c3d…f72e",
    certified: true, organic: true,
    tags: ["Organic", "Fresh Harvest"],
    color: "#ef4444", bg: "rgba(239,68,68,0.08)",
  },
  {
    id: 4, name: "Green Chillies", category: "spices", icon: "🌶️",
    farmer: "Venkat Rao", location: "Andhra Pradesh", grade: "A+",
    price: "₹1,450", unit: "/ qtl", available: "8 Tons",
    harvest: "Feb 2026", blockchain: "0x2a8c…d41f",
    certified: false, organic: false,
    tags: ["Spicy Grade", "Export Ready"],
    color: "#16a34a", bg: "rgba(22,163,74,0.08)",
  },
  {
    id: 5, name: "Alphonso Mangoes", category: "fruits", icon: "🥭",
    farmer: "Priya Desai", location: "Ratnagiri, MH", grade: "GI",
    price: "₹12,000", unit: "/ qtl", available: "3.5 Tons",
    harvest: "May 2026", blockchain: "0xb17e…2c90",
    certified: true, organic: true,
    tags: ["GI Tagged", "Premium Export"],
    color: "#f97316", bg: "rgba(249,115,22,0.08)",
  },
  {
    id: 6, name: "Toor Dal (Arhar)", category: "pulses", icon: "🫘",
    farmer: "Mohan Lal", location: "Karnataka", grade: "A",
    price: "₹6,800", unit: "/ qtl", available: "22 Tons",
    harvest: "Dec 2025", blockchain: "0x5f3a…8b1c",
    certified: true, organic: false,
    tags: ["Protein Rich", "MSP Price"],
    color: "#ca8a04", bg: "rgba(202,138,4,0.08)",
  },
  {
    id: 7, name: "Baby Spinach", category: "vegetables", icon: "🥬",
    farmer: "Kavitha Nair", location: "Kerala", grade: "A+",
    price: "₹2,100", unit: "/ qtl", available: "4 Tons",
    harvest: "Mar 2026", blockchain: "0xe82b…c45a",
    certified: true, organic: true,
    tags: ["Organic", "Cold Chain"],
    color: "#22c55e", bg: "rgba(34,197,94,0.08)",
  },
  {
    id: 8, name: "Turmeric (Salem)", category: "spices", icon: "🌿",
    farmer: "Duraisamy K.", location: "Tamil Nadu", grade: "A+",
    price: "₹8,500", unit: "/ qtl", available: "15 Tons",
    harvest: "Jan 2026", blockchain: "0x3d9f…741b",
    certified: true, organic: true,
    tags: ["High Curcumin", "Export Grade"],
    color: "#eab308", bg: "rgba(234,179,8,0.08)",
  },
  {
    id: 9, name: "Pomegranate", category: "fruits", icon: "🍑",
    farmer: "Balraj Singh", location: "Solapur, MH", grade: "A",
    price: "₹9,200", unit: "/ qtl", available: "6 Tons",
    harvest: "Apr 2026", blockchain: "0x6c2e…b83d",
    certified: false, organic: false,
    tags: ["Superfood", "Market Ready"],
    color: "#db2777", bg: "rgba(219,39,119,0.08)",
  },
];

const STATS = [
  { icon: "🌾", label: "Total Produce Listed", value: "4,820", unit: "Tons" },
  { icon: "👨‍🌾", label: "Verified Farmers", value: "3,420", unit: "Active" },
  { icon: "✅", label: "Blockchain Verified", value: "100%", unit: "Records" },
  { icon: "🌱", label: "Organic Certified", value: "62%", unit: "of Stock" },
];

const SORT_OPTIONS = ["Newest First", "Price: Low to High", "Price: High to Low", "Available Qty"];

// ─── Component ───────────────────────────────────────────────────────────────

export default function FarmProducePage() {
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
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Newest First");
  const [selectedProduce, setSelectedProduce] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const filtered = PRODUCE.filter(p => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.farmer.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f7f3ec", fontFamily: "'Palatino Linotype', Georgia, serif", color: "#1c1a14" }}>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        @keyframes shimmer { 0%,100%{opacity:1} 50%{opacity:0.6} }
        .produce-card { animation: fadeUp 0.4s ease both; }
        .produce-card:hover .card-inner { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.12) !important; }
        .card-inner { transition: transform 0.25s, box-shadow 0.25s; }
        .cat-btn:hover { background: rgba(26,92,42,0.08) !important; }
        .overlay { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:200; display:flex; align-items:center; justify-content:center; padding:1rem; animation: fadeUp 0.2s ease; }
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
            <button key={link}
             onClick={() => navigate(link.path)}
             style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: "0.875rem", fontFamily: "inherit",
              color: link.name === getActiveNav() ? "#1a5c2a" : "#5a5244",
              fontWeight: link.name === getActiveNav() ? 700 : 400,
              borderBottom: link.name === getActiveNav() ? "2px solid #1a5c2a" : "2px solid transparent",
              paddingBottom: "2px", transition: "all 0.2s",
            }}>{link.name}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
          {cartCount > 0 && (
            <div style={{ position: "relative", cursor: "pointer" }}>
              <span style={{ fontSize: "1.4rem" }}>🛒</span>
              <span style={{ position: "absolute", top: "-6px", right: "-6px", background: "#ef4444", color: "#fff", fontSize: "0.65rem", fontWeight: 800, borderRadius: "50%", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>
            </div>
          )}
          <button style={{
            background: "linear-gradient(135deg, #1a5c2a, #2d8a45)", color: "#fff",
            border: "none", borderRadius: "8px", padding: "10px 22px",
            fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            boxShadow: "0 4px 12px rgba(26,92,42,0.3)",
          }}>List Your Produce</button>
        </div>
      </nav>

      {/* ── HERO BANNER ── */}
      <section style={{
        background: "linear-gradient(135deg, #0f2d14 0%, #1a5c2a 50%, #2d6e3a 100%)",
        padding: "64px 2.5rem 56px", position: "relative", overflow: "hidden",
      }}>
        {/* Decorative bg text */}
        <div style={{ position: "absolute", top: "-20px", right: "5%", fontSize: "14rem", opacity: 0.04, lineHeight: 1, userSelect: "none" }}>🌾</div>
        <div style={{ position: "absolute", bottom: "-30px", left: "2%", fontSize: "10rem", opacity: 0.04, lineHeight: 1, userSelect: "none" }}>🍎</div>

        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", marginBottom: "1.2rem", letterSpacing: "0.04em" }}>
            Home &nbsp;›&nbsp; <span style={{ color: "#a8f0b0" }}>Farm Produce</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "2rem", alignItems: "flex-end" }}>
            <div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(168,240,176,0.15)", color: "#a8f0b0", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "20px", border: "1px solid rgba(168,240,176,0.25)", marginBottom: "1rem" }}>
                🔗 Blockchain Verified Listings
              </span>
              <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: "0.8rem" }}>
                Fresh from the Farm,<br />
                <em style={{ color: "#86efac", fontStyle: "italic" }}>Traced on the Chain</em>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "1.02rem", maxWidth: "520px", lineHeight: 1.65 }}>
                Browse certified farm produce directly from verified farmers. Every listing is immutably recorded on-chain — guaranteed origin, quality, and fair pricing.
              </p>
            </div>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", minWidth: "340px" }}>
              {STATS.map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: "16px", padding: "1rem 1.2rem", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(6px)" }}>
                  <div style={{ fontSize: "1.6rem", marginBottom: "4px" }}>{s.icon}</div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff" }}>{s.value} <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>{s.unit}</span></div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.6)", letterSpacing: "0.03em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SEARCH + FILTER BAR ── */}
      <div style={{ background: "rgba(255,252,245,0.98)", borderBottom: "1px solid rgba(180,160,100,0.15)", padding: "1rem 2.5rem", position: "sticky", top: "68px", zIndex: 90, boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          {/* Search */}
          <div style={{ flex: 1, minWidth: "220px", position: "relative" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "1rem", opacity: 0.5 }}>🔍</span>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search produce, farmer, location…"
              style={{
                width: "100%", padding: "10px 14px 10px 38px", border: "1.5px solid rgba(180,160,100,0.3)",
                borderRadius: "10px", fontSize: "0.9rem", fontFamily: "inherit",
                background: "#faf7f0", color: "#1c1a14", outline: "none",
                boxSizing: "border-box", transition: "border-color 0.2s",
              }}
            />
          </div>

          {/* Sort */}
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
            padding: "10px 14px", border: "1.5px solid rgba(180,160,100,0.3)", borderRadius: "10px",
            fontSize: "0.875rem", fontFamily: "inherit", background: "#faf7f0", color: "#1c1a14", cursor: "pointer",
          }}>
            {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>

          {/* Organic toggle */}
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.875rem", color: "#3a5c2a", fontWeight: 600, whiteSpace: "nowrap" }}>
            <div style={{ width: "36px", height: "20px", background: "#22c55e", borderRadius: "20px", position: "relative" }}>
              <div style={{ width: "14px", height: "14px", background: "#fff", borderRadius: "50%", position: "absolute", top: "3px", right: "3px" }} />
            </div>
            Organic Only
          </label>

          <div style={{ fontSize: "0.82rem", color: "#888", whiteSpace: "nowrap" }}>
            {filtered.length} listings found
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 2.5rem", display: "grid", gridTemplateColumns: "220px 1fr", gap: "2rem", alignItems: "start" }}>

        {/* ── SIDEBAR: Categories ── */}
        <aside style={{ position: "sticky", top: "140px" }}>
          <div style={{ background: "rgba(255,252,245,0.9)", borderRadius: "18px", border: "1px solid rgba(180,160,100,0.2)", padding: "1.2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", marginBottom: "0.8rem", paddingLeft: "4px" }}>Categories</div>
            {CATEGORIES.map(cat => (
              <button key={cat.id} className="cat-btn" onClick={() => setActiveCategory(cat.id)} style={{
                width: "100%", display: "flex", alignItems: "center", gap: "10px",
                padding: "10px 12px", borderRadius: "10px", border: "none", cursor: "pointer",
                fontFamily: "inherit", fontSize: "0.875rem", textAlign: "left",
                background: activeCategory === cat.id ? "rgba(26,92,42,0.1)" : "transparent",
                color: activeCategory === cat.id ? "#1a5c2a" : "#4a4030",
                fontWeight: activeCategory === cat.id ? 700 : 400,
                transition: "background 0.2s",
                borderLeft: activeCategory === cat.id ? "3px solid #1a5c2a" : "3px solid transparent",
                marginBottom: "2px",
              }}>
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: "#aaa" }}>
                  {cat.id === "all" ? PRODUCE.length : PRODUCE.filter(p => p.category === cat.id).length}
                </span>
              </button>
            ))}
          </div>

          {/* Blockchain trust card */}
          <div style={{ background: "linear-gradient(135deg, #0f2d14, #1a5c2a)", borderRadius: "18px", padding: "1.4rem", marginTop: "1.2rem", color: "#fff" }}>
            <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>🔗</div>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.4rem" }}>Blockchain Verified</div>
            <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.5, marginBottom: "1rem" }}>Every listing is cryptographically signed and stored on an immutable ledger. Zero fraud, zero tampering.</div>
            <button style={{ width: "100%", background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "8px", padding: "8px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              Verify a Record →
            </button>
          </div>
        </aside>

        {/* ── PRODUCE GRID ── */}
        <div>
          {/* Category heading */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.4rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f2d14" }}>
              {CATEGORIES.find(c => c.id === activeCategory)?.icon}{" "}
              {CATEGORIES.find(c => c.id === activeCategory)?.label}
            </h2>
            <div style={{ display: "flex", gap: "6px" }}>
              {["grid", "list"].map(v => (
                <button key={v} style={{ padding: "6px 10px", borderRadius: "8px", border: "1.5px solid rgba(180,160,100,0.3)", background: v === "grid" ? "#1a5c2a" : "transparent", color: v === "grid" ? "#fff" : "#888", cursor: "pointer", fontSize: "0.82rem", fontFamily: "inherit" }}>
                  {v === "grid" ? "⊞ Grid" : "≡ List"}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.4rem" }}>
            {filtered.map((p, i) => (
              <div key={p.id} className="produce-card" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="card-inner" style={{
                  background: "rgba(255,252,245,0.95)", borderRadius: "20px",
                  border: `1.5px solid ${p.color}28`,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)", overflow: "hidden",
                }}>
                  {/* Card Header */}
                  <div style={{ background: p.bg, padding: "1.4rem 1.4rem 1rem", position: "relative" }}>
                    {/* Badges */}
                    <div style={{ position: "absolute", top: "12px", right: "12px", display: "flex", gap: "4px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                      {p.organic && <span style={{ background: "#dcfce7", color: "#15803d", fontSize: "0.65rem", fontWeight: 700, padding: "2px 8px", borderRadius: "20px" }}>🌱 Organic</span>}
                      {p.certified && <span style={{ background: "#dbeafe", color: "#1d4ed8", fontSize: "0.65rem", fontWeight: 700, padding: "2px 8px", borderRadius: "20px" }}>✅ Certified</span>}
                    </div>

                    <div style={{ fontSize: "3.2rem", marginBottom: "0.6rem" }}>{p.icon}</div>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f2d14", marginBottom: "2px" }}>{p.name}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", color: "#6b7c47" }}>
                      <span>📍 {p.location}</span>
                      <span style={{ opacity: 0.4 }}>•</span>
                      <span>👨‍🌾 {p.farmer}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: "1rem 1.4rem" }}>
                    {/* Price + Grade row */}
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "0.8rem" }}>
                      <div>
                        <span style={{ fontSize: "1.6rem", fontWeight: 800, color: p.color }}>{p.price}</span>
                        <span style={{ fontSize: "0.8rem", color: "#888", marginLeft: "4px" }}>{p.unit}</span>
                      </div>
                      <div style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}40`, fontSize: "0.78rem", fontWeight: 700, padding: "4px 12px", borderRadius: "20px" }}>
                        Grade {p.grade}
                      </div>
                    </div>

                    {/* Info rows */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginBottom: "1rem" }}>
                      {[["📦 Available", p.available], ["🗓 Harvest", p.harvest]].map(([k, v]) => (
                        <div key={k} style={{ background: "rgba(240,237,228,0.6)", borderRadius: "8px", padding: "6px 10px" }}>
                          <div style={{ fontSize: "0.68rem", color: "#888", marginBottom: "1px" }}>{k}</div>
                          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1c1a14" }}>{v}</div>
                        </div>
                      ))}
                    </div>

                    {/* Blockchain hash */}
                    <div style={{ background: "rgba(15,45,20,0.05)", borderRadius: "8px", padding: "6px 10px", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "0.75rem" }}>🔗</span>
                      <span style={{ fontSize: "0.7rem", fontFamily: "monospace", color: "#1a5c2a" }}>{p.blockchain}</span>
                      <span style={{ marginLeft: "auto", fontSize: "0.65rem", color: "#16a34a", fontWeight: 700 }}>VERIFIED</span>
                    </div>

                    {/* Tags */}
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "1rem" }}>
                      {p.tags.map(t => (
                        <span key={t} style={{ background: "rgba(180,160,100,0.12)", color: "#6b5c3a", fontSize: "0.7rem", padding: "3px 9px", borderRadius: "20px", border: "1px solid rgba(180,160,100,0.2)" }}>{t}</span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      <button onClick={() => setSelectedProduce(p)} style={{
                        padding: "9px", background: "transparent", border: `1.5px solid ${p.color}50`,
                        borderRadius: "10px", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer",
                        fontFamily: "inherit", color: p.color, transition: "background 0.2s",
                      }}>View Details</button>
                      <button onClick={() => setCartCount(c => c + 1)} style={{
                        padding: "9px", background: `linear-gradient(135deg, ${p.color}, ${p.color}cc)`,
                        border: "none", borderRadius: "10px", fontSize: "0.82rem", fontWeight: 700,
                        cursor: "pointer", fontFamily: "inherit", color: "#fff",
                        boxShadow: `0 4px 12px ${p.color}44`,
                      }}>🛒 Add to Order</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "5rem 2rem", color: "#aaa" }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🌿</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>No produce found</div>
              <div style={{ fontSize: "0.9rem", marginTop: "0.4rem" }}>Try a different category or search term.</div>
            </div>
          )}
        </div>
      </div>

      {/* ── DETAIL MODAL ── */}
      {selectedProduce && (
        <div className="overlay" onClick={() => setSelectedProduce(null)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "#fffdf6", borderRadius: "24px", maxWidth: "600px", width: "100%",
            maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
          }}>
            {/* Modal header */}
            <div style={{ background: selectedProduce.bg, padding: "2rem 2rem 1.4rem", position: "relative", borderRadius: "24px 24px 0 0" }}>
              <button onClick={() => setSelectedProduce(null)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(0,0,0,0.08)", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              <div style={{ fontSize: "4rem", marginBottom: "0.6rem" }}>{selectedProduce.icon}</div>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f2d14", marginBottom: "0.3rem" }}>{selectedProduce.name}</h2>
              <div style={{ fontSize: "0.88rem", color: "#6b7c47" }}>📍 {selectedProduce.location} &nbsp;•&nbsp; 👨‍🌾 {selectedProduce.farmer}</div>
            </div>

            <div style={{ padding: "1.6rem 2rem" }}>
              {/* Price + Grade */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.4rem", padding: "1rem 1.2rem", background: "rgba(240,237,228,0.5)", borderRadius: "14px" }}>
                <div>
                  <div style={{ fontSize: "0.72rem", color: "#888", marginBottom: "2px" }}>Market Price</div>
                  <span style={{ fontSize: "2rem", fontWeight: 800, color: selectedProduce.color }}>{selectedProduce.price}</span>
                  <span style={{ color: "#888", marginLeft: "4px" }}>{selectedProduce.unit}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.72rem", color: "#888", marginBottom: "2px" }}>Grade</div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: selectedProduce.color }}>Grade {selectedProduce.grade}</div>
                </div>
              </div>

              {/* Details grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "1.4rem" }}>
                {[["📦 Available Quantity", selectedProduce.available], ["🗓 Harvest Date", selectedProduce.harvest], ["🌱 Organic", selectedProduce.organic ? "Yes – Certified" : "No"], ["✅ Certified", selectedProduce.certified ? "Govt. Certified" : "Not Certified"]].map(([k, v]) => (
                  <div key={k} style={{ background: "rgba(240,237,228,0.5)", borderRadius: "12px", padding: "10px 14px" }}>
                    <div style={{ fontSize: "0.72rem", color: "#888", marginBottom: "3px" }}>{k}</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1c1a14" }}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Blockchain verification */}
              <div style={{ background: "linear-gradient(135deg, #0f2d14, #1a5c2a)", borderRadius: "14px", padding: "1.2rem 1.4rem", marginBottom: "1.4rem", color: "#fff" }}>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.6)", marginBottom: "4px", letterSpacing: "0.08em", textTransform: "uppercase" }}>🔗 Blockchain Record</div>
                <div style={{ fontFamily: "monospace", fontSize: "0.92rem", color: "#86efac", wordBreak: "break-all", marginBottom: "8px" }}>{selectedProduce.blockchain.replace("…", "a8f3e92bc71d")}</div>
                <div style={{ display: "flex", gap: "12px", fontSize: "0.78rem", color: "rgba(255,255,255,0.7)" }}>
                  <span>✅ Immutable Record</span>
                  <span>🕐 Timestamped</span>
                  <span>🔒 Tamper-Proof</span>
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "1.4rem" }}>
                {selectedProduce.tags.map(t => (
                  <span key={t} style={{ background: `${selectedProduce.color}14`, color: selectedProduce.color, border: `1px solid ${selectedProduce.color}40`, fontSize: "0.8rem", padding: "4px 12px", borderRadius: "20px", fontWeight: 600 }}>{t}</span>
                ))}
              </div>

              {/* CTA */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <button style={{ padding: "13px", background: "transparent", border: "2px solid rgba(26,92,42,0.3)", borderRadius: "12px", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", color: "#1a5c2a" }}>
                  📜 Request Contract
                </button>
                <button onClick={() => { setCartCount(c => c + 1); setSelectedProduce(null); }} style={{
                  padding: "13px", background: "linear-gradient(135deg, #1a5c2a, #2d8a45)", border: "none",
                  borderRadius: "12px", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                  color: "#fff", boxShadow: "0 6px 20px rgba(26,92,42,0.35)",
                }}>
                  🛒 Place Order
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