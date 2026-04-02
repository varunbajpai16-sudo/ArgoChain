import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Farm Produce", path: "/farm-produce" },
  { name: "Supply Tracking", path: "/supply-tracking" },
  { name: "Smart Contracts", path: "/smart-contracts" },
  { name: "Market Insights", path: "/market-insights" },
  { name: "About", path: "/about" },
];

const ROLES = [
  {
    key: "distributor",
    icon: "🚛",
    title: "Distributor",
    tagline: "Move the harvest forward",
    desc: "Manage logistics, coordinate shipments between farms and markets, and track delivery pipelines across regions.",
    perks: ["Real-time GPS tracking", "Route optimization", "Bulk contract management", "Driver coordination"],
    accent: "#059669",
    accentLight: "rgba(5,150,105,0.10)",
    accentBorder: "rgba(5,150,105,0.30)",
    accentChip: "#dcfce7",
    accentChipText: "#166534",
    glow: "rgba(5,150,105,0.18)",
  },
  {
    key: "consumer",
    icon: "🛒",
    title: "Consumer",
    tagline: "Know what you eat",
    desc: "Trace every purchase back to its origin. View farm credentials, quality certifications, and supply chain journeys.",
    perks: ["Full crop traceability", "Farm-to-table journey", "Quality certificates", "Price history & alerts"],
    accent: "#d97706",
    accentLight: "rgba(217,119,6,0.10)",
    accentBorder: "rgba(217,119,6,0.30)",
    accentChip: "#fef3c7",
    accentChipText: "#92400e",
    glow: "rgba(217,119,6,0.15)",
  },
  {
    key: "retailer",
    icon: "🏪",
    title: "Retailer",
    tagline: "Stock smarter, sell better",
    desc: "Access wholesale pricing, manage inventory from multiple farms, and connect directly with distributors and farmers.",
    perks: ["Inventory management", "Direct farm sourcing", "Smart contract billing", "Demand forecasting"],
    accent: "#1a5c2a",
    accentLight: "rgba(26,92,42,0.10)",
    accentBorder: "rgba(26,92,42,0.25)",
    accentChip: "#dcfce7",
    accentChipText: "#14532d",
    glow: "rgba(26,92,42,0.15)",
  },
];

export default function RoleSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const getActiveNav = () => {
    const map = { "/": "Home", "/farm-produce": "Farm Produce", "/smart-contracts": "Smart Contracts", "/market-insights": "Market Insights", "/supply-tracking": "Supply Tracking" };
    return map[location.pathname] || "";
  };

  const handleConfirm = () => {
    if (!selected) return;
    setConfirmed(true);
    setTimeout(() => navigate(`/registration`,{
        state: { role: selected },
    }), 900);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f3ec", fontFamily: "'Palatino Linotype', Georgia, serif", color: "#1c1a14" }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        background: "rgba(255,252,245,0.95)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(180,160,100,0.2)",
        position: "sticky", top: 0, zIndex: 100,
        padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "68px",
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
        }}>Sign In →</button>
      </nav>

      {/* ── HERO BANNER ── */}
      <section style={{
        background: "linear-gradient(160deg, #e8f5e2 0%, #fdf6e3 40%, #e6f4f1 100%)",
        padding: "56px 2rem 48px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(134,197,89,0.12)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(251,191,36,0.10)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <span style={{
            display: "inline-block", background: "rgba(26,92,42,0.1)", color: "#1a5c2a",
            fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
            padding: "5px 14px", borderRadius: "20px", marginBottom: "1.2rem",
            border: "1px solid rgba(26,92,42,0.2)",
          }}>🔗 Step 1 of 2 — Account Setup</span>
          <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1rem", color: "#0f2d14" }}>
            Choose Your{" "}
            <em style={{ color: "#1a5c2a", fontStyle: "italic" }}>Role</em>{" "}on the Chain
          </h1>
          <p style={{ fontSize: "1rem", color: "#4a5340", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto" }}>
            Your role shapes your dashboard, tools, and access. Select who you are in the agricultural supply chain.
          </p>
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

      {/* ── ROLE CARDS ── */}
      <section style={{ padding: "64px 2rem 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.8rem", marginBottom: "3rem" }}>
          {ROLES.map((role, i) => {
            const isSelected = selected === role.key;
            const isHovered = hovered === role.key;
            const isActive = isSelected || isHovered;

            return (
              <div
                key={role.key}
                onClick={() => setSelected(role.key)}
                onMouseEnter={() => setHovered(role.key)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: "rgba(255,252,245,0.9)",
                  borderRadius: "24px",
                  border: isSelected
                    ? `2px solid ${role.accent}`
                    : `1.5px solid ${isHovered ? role.accentBorder : "rgba(180,160,100,0.2)"}`,
                  padding: "2rem",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: isSelected
                    ? `0 12px 40px ${role.glow}, 0 4px 16px rgba(0,0,0,0.06)`
                    : isHovered ? "0 8px 28px rgba(0,0,0,0.08)" : "0 2px 12px rgba(0,0,0,0.04)",
                  transform: isSelected ? "translateY(-8px) scale(1.02)" : isHovered ? "translateY(-4px)" : "none",
                  transition: "all 0.3s cubic-bezier(0.34,1.4,0.64,1)",
                  animation: `fadeUp 0.5s ease ${i * 0.12}s both`,
                }}
              >
                {/* Top accent bar */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "4px",
                  background: isSelected ? `linear-gradient(90deg, ${role.accent}, #f59e0b)` : "transparent",
                  borderRadius: "24px 24px 0 0", transition: "background 0.3s",
                }} />

                {/* Selected checkmark */}
                {isSelected && (
                  <div style={{
                    position: "absolute", top: "1.2rem", right: "1.2rem",
                    background: role.accent, color: "#fff",
                    width: "26px", height: "26px", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.8rem", fontWeight: 900,
                    boxShadow: `0 4px 12px ${role.glow}`,
                  }}>✓</div>
                )}

                {/* Icon box */}
                <div style={{
                  width: "60px", height: "60px", borderRadius: "16px",
                  background: role.accentLight,
                  border: `1.5px solid ${role.accentBorder}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.8rem", marginBottom: "1.2rem",
                  boxShadow: isActive ? `0 4px 16px ${role.glow}` : "none",
                  transition: "box-shadow 0.3s",
                }}>{role.icon}</div>

                {/* Title & chip */}
                <div style={{ marginBottom: "0.8rem" }}>
                  <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0f2d14", margin: "0 0 0.3rem 0" }}>{role.title}</h3>
                  <span style={{
                    display: "inline-block",
                    background: role.accentChip, color: role.accentChipText,
                    fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", padding: "3px 10px", borderRadius: "20px",
                  }}>{role.tagline}</span>
                </div>

                {/* Description */}
                <p style={{ fontSize: "0.9rem", color: "#5a5244", lineHeight: 1.65, marginBottom: "1.4rem" }}>
                  {role.desc}
                </p>

                {/* Perks */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", marginBottom: "1.4rem" }}>
                  {role.perks.map(perk => (
                    <div key={perk} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem" }}>
                      <span style={{ color: role.accent, fontSize: "0.75rem", fontWeight: 700 }}>✦</span>
                      <span style={{ color: "#4a5340" }}>{perk}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom row */}
                <div style={{
                  paddingTop: "1.1rem",
                  borderTop: "1px solid rgba(180,160,100,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <span style={{
                    fontSize: "0.82rem", fontWeight: isSelected ? 700 : 400,
                    color: isSelected ? role.accent : "#9a8f80", transition: "color 0.3s",
                  }}>
                    {isSelected ? "✓ Selected" : "Click to select"}
                  </span>
                  <span style={{
                    color: isActive ? role.accent : "rgba(180,160,100,0.4)",
                    fontSize: "1rem", fontWeight: 700,
                    transform: isActive ? "translateX(4px)" : "none",
                    transition: "all 0.25s", display: "inline-block",
                  }}>→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CONFIRM BUTTON ── */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={handleConfirm}
            disabled={!selected || confirmed}
            style={{
              background: selected ? "linear-gradient(135deg, #1a5c2a, #2d8a45)" : "rgba(180,160,100,0.15)",
              color: selected ? "#fff" : "#b0a080",
              border: "none", borderRadius: "12px",
              padding: "15px 52px", fontSize: "1rem", fontWeight: 700,
              fontFamily: "inherit", letterSpacing: "0.02em",
              cursor: selected ? "pointer" : "not-allowed",
              boxShadow: selected ? "0 8px 28px rgba(26,92,42,0.35)" : "none",
              transition: "all 0.3s cubic-bezier(0.34,1.4,0.64,1)",
              opacity: confirmed ? 0.75 : 1,
            }}
            onMouseEnter={e => { if (selected && !confirmed) { e.currentTarget.style.transform = "translateY(-2px) scale(1.03)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(26,92,42,0.45)"; }}}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = selected ? "0 8px 28px rgba(26,92,42,0.35)" : "none"; }}
          >
            {confirmed
              ? "⏳ Setting up your dashboard…"
              : selected
                ? `Continue as ${ROLES.find(r => r.key === selected)?.title} →`
                : "Select a role to continue"}
          </button>
          {selected && !confirmed && (
            <p style={{ marginTop: "0.9rem", fontSize: "0.8rem", color: "#9a8f80" }}>
              You can switch roles anytime from your profile settings.
            </p>
          )}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{
        background: "linear-gradient(135deg, #1a3d1f, #1a5c2a, #2d8a45)",
        padding: "64px 2rem", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.06 }}>
          <div style={{ position: "absolute", top: "10%", left: "5%", fontSize: "8rem" }}>🌾</div>
          <div style={{ position: "absolute", top: "20%", right: "5%", fontSize: "6rem" }}>🚛</div>
          <div style={{ position: "absolute", bottom: "10%", left: "15%", fontSize: "5rem" }}>📊</div>
        </div>
        <div style={{ position: "relative", maxWidth: "520px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", marginBottom: "0.8rem" }}>Already have an account?</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", marginBottom: "1.8rem", lineHeight: 1.6 }}>Sign in and pick up where you left off on your supply chain dashboard.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
      
            <button style={{
              background: "rgba(255,255,255,0.15)", color: "#fff",
              border: "2px solid rgba(255,255,255,0.3)", borderRadius: "10px",
              padding: "13px 28px", fontSize: "0.95rem", fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit", backdropFilter: "blur(8px)",
            }}>Talk to an Expert</button>
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

      <style>{`
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-33.33%) } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}