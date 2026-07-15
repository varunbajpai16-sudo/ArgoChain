import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Farm Produce", path: "/farm-produce" },
  { name: "Supply Tracking", path: "/supply-tracking" },
  { name: "Smart Contracts", path: "/smart-contracts" },
  { name: "Market Insights", path: "/market-insights" },
  { name: "About", path: "/about" },
];

// Chapters mapped to seconds into the demo video
const CHAPTERS = [
  { time: 0, label: "Farmer onboarding", icon: "🌾", desc: "Registering a first harvest on-chain" },
  { time: 12, label: "Supply tracking", icon: "🚛", desc: "Following a shipment field to market" },
  { time: 24, label: "Smart contracts", icon: "📋", desc: "Payment released on delivery confirmation" },
  { time: 36, label: "Market insights", icon: "📊", desc: "Live pricing feeding buyer decisions" },
];

const TESTIMONIAL = {
  quote: "We used to wait weeks to know if a shipment cleared. Now every buyer sees it the moment it happens.",
  name: "Meera Kulkarni",
  role: "Wheat Farmer, Nashik Cooperative",
  icon: "👩‍🌾",
};

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function AgroChainDemoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const getActiveNav = () => {
    if (location.pathname === "/") return "Home";
    if (location.pathname === "/farm-produce") return "Farm Produce";
    if (location.pathname === "/smart-contracts") return "Smart Contracts";
    if (location.pathname === "/market-insights") return "Market Insights";
    if (location.pathname === "/supply-tracking") return "Supply Tracking";
    return "";
  };

  const handlePlayPause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const jumpToChapter = (idx, time) => {
    setActiveChapter(idx);
    const v = videoRef.current;
    if (v) {
      v.currentTime = time;
      v.play();
      setPlaying(true);
    }
    setMenuOpen(false);
  };

  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f3ec", fontFamily: "'Palatino Linotype', Georgia, serif", color: "#1c1a14" }}>

      <style>{`
        * { box-sizing: border-box; }

        .navbar { padding: 0 2rem; }
        .hamburger-btn { display: none; }
        .mobile-menu-panel { display: none; }
        .get-started-btn .gs-text { display: inline; }
        .get-started-btn .gs-arrow { display: inline; }

        .hero-section { padding: 60px 2rem 40px; }
        .video-section { padding: 0 2rem 60px; }
        .cards-section { padding: 0 2rem 70px; }
        .testimonial-section { padding: 0 2rem 80px; }
        .cta-section { padding: 70px 2rem; }

        .chapter-scrubber { display: flex; }
        .chapter-btn-label { display: flex; }

        @media (max-width: 1024px) {
          .hero-section { padding: 48px 1.5rem 32px; }
          .video-section { padding: 0 1.5rem 48px; }
          .cards-section { padding: 0 1.5rem 56px; }
          .testimonial-section { padding: 0 1.5rem 60px; }
          .cta-section { padding: 56px 1.5rem; }
        }

        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .navbar { padding: 0 1.25rem; height: 60px !important; }
          .mobile-menu-panel.open {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 60px;
            left: 0;
            right: 0;
            background: rgba(255,252,245,0.98);
            border-bottom: 1px solid rgba(180,160,100,0.2);
            box-shadow: 0 10px 24px rgba(0,0,0,0.08);
            z-index: 99;
            padding: 0.5rem 0;
          }
          .mobile-menu-panel button {
            text-align: left;
            padding: 0.85rem 1.5rem !important;
            font-size: 0.95rem !important;
            border-bottom: 1px solid transparent !important;
            width: 100%;
          }
          .get-started-btn { padding: 8px 14px !important; font-size: 0.8rem !important; }
        }

        @media (max-width: 640px) {
          .hero-section { padding: 40px 1.25rem 28px; }
          .hero-badge { font-size: 0.68rem !important; padding: 4px 10px !important; }
          .hero-desc { font-size: 0.95rem !important; }

          .video-section { padding: 0 1rem 40px; }
          .video-caption { font-size: 0.75rem !important; padding: 0 0.5rem; }

          .chapter-scrubber { flex-wrap: wrap; }
          .chapter-scrubber button { flex: 1 1 50%; min-width: 50%; }
          .chapter-btn-label { font-size: 0.76rem !important; }

          .play-btn-circle { width: 60px !important; height: 60px !important; font-size: 1.3rem !important; }
          .video-timestamp { font-size: 0.68rem !important; padding: 3px 8px !important; bottom: 8px !important; right: 10px !important; }

          .cards-section { padding: 0 1.25rem 44px; }
          .cards-section h2 { font-size: 1.35rem !important; margin-bottom: 1.1rem !important; }
          .cards-grid { grid-template-columns: 1fr !important; gap: 0.9rem !important; }

          .testimonial-section { padding: 0 1.25rem 56px; }
          .testimonial-card { padding: 1.6rem !important; }
          .testimonial-quote { font-size: 1rem !important; }

          .cta-section { padding: 48px 1.25rem; }
          .cta-section h2 { font-size: 1.7rem !important; }
          .cta-section p { font-size: 0.92rem !important; }
          .cta-buttons { flex-direction: column; width: 100%; }
          .cta-buttons button { width: 100%; padding: 13px 20px !important; }

          .brand-title { font-size: 1rem !important; }
          .brand-sub { display: none; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className="navbar" style={{
        background: "rgba(255,252,245,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(180,160,100,0.2)",
        position: "sticky", top: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "68px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => goTo("/")}>
          <span style={{ fontSize: "2rem" }}>🌿</span>
          <div>
            <div className="brand-title" style={{ fontWeight: 700, fontSize: "1.1rem", color: "#1a3d1f", letterSpacing: "-0.3px" }}>AgroChain</div>
            <div className="brand-sub" style={{ fontSize: "0.65rem", color: "#6b7c47", letterSpacing: "0.12em", textTransform: "uppercase" }}>Blockchain Supply</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
          {NAV_LINKS.map(link => (
            <button
              key={link.name}
              onClick={() => goTo(link.path)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "0.875rem", fontFamily: "inherit",
                color: link.name === getActiveNav() ? "#1a5c2a" : "#5a5244",
                fontWeight: link.name === getActiveNav() ? 700 : 400,
                borderBottom: link.name === getActiveNav() ? "2px solid #1a5c2a" : "2px solid transparent",
                paddingBottom: "2px", transition: "all 0.2s",
              }}
            >
              {link.name}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button className="get-started-btn" style={{
            background: "linear-gradient(135deg, #1a5c2a, #2d8a45)",
            color: "#fff", border: "none", borderRadius: "8px",
            padding: "10px 22px", fontSize: "0.88rem", fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.02em",
            boxShadow: "0 4px 12px rgba(26,92,42,0.3)", whiteSpace: "nowrap",
          }}
            onClick={() => goTo("/getstarted")}
          >
            <span className="gs-text">Get Started</span> <span className="gs-arrow">→</span>
          </button>

          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              background: "none", border: "1px solid rgba(180,160,100,0.3)", borderRadius: "8px",
              width: "38px", height: "38px", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: "1.1rem", color: "#1a3d1f", flexShrink: 0,
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        <div className={`mobile-menu-panel${menuOpen ? " open" : ""}`}>
          {NAV_LINKS.map(link => (
            <button
              key={link.name}
              onClick={() => goTo(link.path)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "inherit",
                color: link.name === getActiveNav() ? "#1a5c2a" : "#3a3628",
                fontWeight: link.name === getActiveNav() ? 700 : 500,
              }}
            >
              {link.name}
            </button>
          ))}
        </div>
      </nav>

      {/* ── HEADER ── */}
      <section className="hero-section" style={{
        background: "linear-gradient(160deg, #e8f5e2 0%, #fdf6e3 40%, #e6f4f1 100%)",
        textAlign: "center",
      }}>
        <span className="hero-badge" style={{
          display: "inline-block", background: "rgba(26,92,42,0.1)", color: "#1a5c2a",
          fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
          padding: "5px 14px", borderRadius: "20px", marginBottom: "1.2rem",
          border: "1px solid rgba(26,92,42,0.2)",
        }}>▶ Product Walkthrough</span>

        <h1 style={{ fontSize: "clamp(1.7rem, 6vw, 3rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: "0.8rem", color: "#0f2d14" }}>
          See AgroChain <em style={{ color: "#1a5c2a", fontStyle: "italic" }}>in action</em>
        </h1>
        <p className="hero-desc" style={{ fontSize: "1.05rem", color: "#4a5340", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto" }}>
          A four-minute look at how a harvest moves from a farmer's field to a buyer's ledger — tracked, verified, and paid for on-chain.
        </p>
      </section>

      {/* ── VIDEO PLAYER ── */}
      <section className="video-section" style={{ maxWidth: "980px", margin: "0 auto" }}>
        <div style={{
          background: "#0f2d14", borderRadius: "20px", overflow: "hidden",
          boxShadow: "0 20px 60px rgba(15,45,20,0.35)", position: "relative",
        }}>
          <div style={{ position: "relative", aspectRatio: "16/9", background: "#000" }}>
            <video
              ref={videoRef}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              poster=""
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onTimeUpdate={(e) => {
                const t = e.target.currentTime;
                let idx = 0;
                CHAPTERS.forEach((c, i) => { if (t >= c.time) idx = i; });
                setActiveChapter(idx);
              }}
            >
              <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
            </video>

            {!playing && (
              <div
                onClick={handlePlayPause}
                style={{
                  position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(160deg, rgba(15,45,20,0.55), rgba(15,45,20,0.75))",
                  cursor: "pointer",
                }}
              >
                <div className="play-btn-circle" style={{
                  width: "84px", height: "84px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.95)", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.8rem", color: "#1a5c2a", boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                  transition: "transform 0.2s",
                }}>
                  ▶
                </div>
              </div>
            )}

            <div className="video-timestamp" style={{
              position: "absolute", bottom: "14px", right: "18px",
              background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: "0.75rem",
              padding: "4px 10px", borderRadius: "6px", letterSpacing: "0.03em",
            }}>
              4:12
            </div>
          </div>

          {/* Chapter scrubber */}
          <div className="chapter-scrubber" style={{ background: "#123018" }}>
            {CHAPTERS.map((c, i) => (
              <button
                key={c.label}
                onClick={() => jumpToChapter(i, c.time)}
                style={{
                  flex: 1, background: activeChapter === i ? "rgba(255,255,255,0.08)" : "transparent",
                  border: "none", borderTop: activeChapter === i ? "2px solid #4ade80" : "2px solid transparent",
                  padding: "12px 10px", cursor: "pointer", fontFamily: "inherit",
                  textAlign: "left", color: "#fff",
                }}
              >
                <div style={{ fontSize: "0.7rem", color: "#a8d5a2", fontFamily: "monospace", marginBottom: "2px" }}>
                  {formatTime(c.time)}
                </div>
                <div className="chapter-btn-label" style={{ fontSize: "0.82rem", fontWeight: 600, alignItems: "center", gap: "6px" }}>
                  <span>{c.icon}</span>{c.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        <p className="video-caption" style={{ textAlign: "center", color: "#7a7060", fontSize: "0.8rem", marginTop: "0.8rem" }}>
          Currently viewing: <strong style={{ color: "#1a5c2a" }}>{CHAPTERS[activeChapter].desc}</strong>
        </p>
      </section>

      {/* ── WHAT YOU'LL SEE ── */}
      <section className="cards-section" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.7rem", fontWeight: 800, color: "#0f2d14", marginBottom: "1.6rem", textAlign: "center" }}>
          What you'll see in this walkthrough
        </h2>
        <div className="cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "1.2rem" }}>
          {CHAPTERS.map((c, i) => (
            <div key={c.label} onClick={() => jumpToChapter(i, c.time)} style={{
              background: "rgba(255,252,245,0.9)", borderRadius: "16px",
              border: "1.5px solid rgba(134,197,89,0.25)", padding: "1.4rem",
              cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 10px 26px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.6rem" }}>{c.icon}</div>
              <div style={{ fontSize: "0.75rem", color: "#6b7c47", fontFamily: "monospace", marginBottom: "0.3rem" }}>{formatTime(c.time)}</div>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "#0f2d14", marginBottom: "0.3rem" }}>{c.label}</div>
              <div style={{ fontSize: "0.85rem", color: "#5a5244", lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="testimonial-section" style={{ maxWidth: "760px", margin: "0 auto" }}>
        <div className="testimonial-card" style={{
          background: "rgba(255,252,245,0.9)", borderRadius: "20px",
          border: "1px solid rgba(180,160,100,0.2)", padding: "2.4rem",
          textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}>
          <div style={{ fontSize: "2.6rem", marginBottom: "1rem" }}>{TESTIMONIAL.icon}</div>
          <p className="testimonial-quote" style={{ fontSize: "1.15rem", fontStyle: "italic", color: "#1c1a14", lineHeight: 1.7, marginBottom: "1.2rem" }}>
            "{TESTIMONIAL.quote}"
          </p>
          <div style={{ fontWeight: 700, color: "#0f2d14" }}>{TESTIMONIAL.name}</div>
          <div style={{ fontSize: "0.85rem", color: "#6b7c47" }}>{TESTIMONIAL.role}</div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-section" style={{
        background: "linear-gradient(135deg, #1a3d1f, #1a5c2a, #2d8a45)",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "relative", maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff", marginBottom: "1rem" }}>Ready to try it yourself?</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", marginBottom: "2rem", lineHeight: 1.6 }}>
            Set up your first supply chain in minutes — no blockchain experience required.
          </p>
          <div className="cta-buttons" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/getstarted")}
              style={{ background: "#f59e0b", color: "#1c1a14", border: "none", borderRadius: "10px", padding: "14px 36px", fontSize: "1rem", fontWeight: 800, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 6px 20px rgba(245,158,11,0.4)" }}
            >
              🌱 Start for Free
            </button>
            <button
              onClick={() => navigate("/")}
              style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "2px solid rgba(255,255,255,0.3)", borderRadius: "10px", padding: "14px 28px", fontSize: "1rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", backdropFilter: "blur(8px)" }}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0f2d14", color: "rgba(255,255,255,0.6)", padding: "2rem", textAlign: "center", fontSize: "0.85rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "1.4rem" }}>🌿</span>
          <span style={{ color: "#a8d5a2", fontWeight: 700, fontSize: "1rem" }}>AgroChain</span>
        </div>
        <p>© 2026 AgroChain. Empowering agriculture through blockchain transparency.</p>
      </footer>

    </div>
  );
}