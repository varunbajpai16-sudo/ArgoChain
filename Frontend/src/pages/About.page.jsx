import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#f7f3ec", fontFamily: "'Palatino Linotype', Georgia, serif", color: "#1c1a14" }}>

      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(160deg, #e8f5e2 0%, #fdf6e3 40%, #e6f4f1 100%)",
        padding: "80px 2rem",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: "3rem", fontWeight: 800, color: "#0f2d14" }}>
          About AgroChain 🌿
        </h1>
        <p style={{ maxWidth: "700px", margin: "1rem auto", color: "#4a5340", fontSize: "1.1rem", lineHeight: 1.7 }}>
          AgroChain is revolutionizing agriculture by bringing transparency,
          trust, and efficiency into the supply chain using blockchain technology.
        </p>
      </section>

      {/* ── MISSION & VISION ── */}
      <section style={{ padding: "80px 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>

          <div style={{ background: "#fff", padding: "2rem", borderRadius: "20px", boxShadow: "0 6px 20px rgba(0,0,0,0.05)" }}>
            <h2 style={{ color: "#1a5c2a", fontSize: "1.6rem", fontWeight: 700 }}>🌱 Our Mission</h2>
            <p style={{ marginTop: "1rem", color: "#5a5244", lineHeight: 1.7 }}>
              To empower farmers, distributors, and consumers by providing a secure,
              transparent, and efficient agricultural ecosystem powered by blockchain.
            </p>
          </div>

          <div style={{ background: "#fff", padding: "2rem", borderRadius: "20px", boxShadow: "0 6px 20px rgba(0,0,0,0.05)" }}>
            <h2 style={{ color: "#1a5c2a", fontSize: "1.6rem", fontWeight: 700 }}>🚀 Our Vision</h2>
            <p style={{ marginTop: "1rem", color: "#5a5244", lineHeight: 1.7 }}>
              To become the most trusted digital backbone of agriculture,
              ensuring fair pricing, real-time tracking, and global connectivity.
            </p>
          </div>

        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "80px 2rem", background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#0f2d14" }}>
            How AgroChain Works
          </h2>
          <p style={{ color: "#5a5244", marginBottom: "2.5rem" }}>
            From farm to market — everything tracked and secured.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>

            {[
              { icon: "🌾", title: "Farm Input", desc: "Farmers upload crop data and harvest details." },
              { icon: "📦", title: "Supply Chain", desc: "Shipments are tracked in real-time." },
              { icon: "📋", title: "Smart Contracts", desc: "Automated agreements ensure secure transactions." },
              { icon: "💰", title: "Market Access", desc: "Buyers get transparent pricing and verified products." },
            ].map((item) => (
              <div key={item.title} style={{
                background: "#f7f3ec",
                padding: "1.8rem",
                borderRadius: "18px",
                border: "1px solid rgba(180,160,100,0.2)"
              }}>
                <div style={{ fontSize: "2.5rem" }}>{item.icon}</div>
                <h3 style={{ marginTop: "1rem", fontWeight: 700 }}>{item.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "#5a5244", marginTop: "0.5rem" }}>
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ padding: "80px 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 800, marginBottom: "2rem" }}>
          Our Core Values
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
          {[
            { icon: "🔒", title: "Transparency", desc: "Every transaction is visible and verifiable." },
            { icon: "⚡", title: "Efficiency", desc: "Faster processes with reduced intermediaries." },
            { icon: "🌍", title: "Sustainability", desc: "Supporting eco-friendly agriculture." },
          ].map((v) => (
            <div key={v.title} style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "18px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.05)"
            }}>
              <div style={{ fontSize: "2rem" }}>{v.icon}</div>
              <h3 style={{ marginTop: "1rem" }}>{v.title}</h3>
              <p style={{ color: "#5a5244", fontSize: "0.9rem" }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: "linear-gradient(135deg, #1a3d1f, #2d8a45)",
        padding: "70px 2rem",
        textAlign: "center"
      }}>
        <h2 style={{ color: "#fff", fontSize: "2.2rem", fontWeight: 800 }}>
          Join the Future of Agriculture 🌱
        </h2>
        <p style={{ color: "rgba(255,255,255,0.8)", margin: "1rem 0 2rem" }}>
          Be part of a smarter, transparent farming ecosystem.
        </p>

        <button
          onClick={() => navigate("/getstarted")}
          style={{
            background: "#f59e0b",
            border: "none",
            padding: "14px 30px",
            borderRadius: "10px",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          Get Started →
        </button>
      </section>

    </div>
  );
}