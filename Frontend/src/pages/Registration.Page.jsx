import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";

const ROLES = [
  { key: "distributor", icon: "🚛", label: "Distributor", desc: "Bulk supplier & logistics" },
  { key: "retailer",    icon: "🏪", label: "Retailer",    desc: "Local shop & reseller" },
  { key: "consumer",   icon: "🛒", label: "Consumer",    desc: "Buy fresh produce" },
];

const PREFILL = {
  distributor: {
    name: "Rajesh Sharma", email: "distributor@agrochain.com", phone: "9876543210",
    password: "Dist@123", location: "Meerut, UP",
    businessName: "Sharma Agro Supply", gstNumber: "09ABCDE1234F1Z5",
    address: "Transport Nagar, Meerut", distributionType: "Wholesale",
  },
  retailer: {
    name: "Amit Verma", email: "retailer@agrochain.com", phone: "9123456780",
    password: "Retail@123", location: "Meerut, UP",
    shopName: "Verma Fresh Store", gstNumber: "09FGHIJ5678K1Z2",
    shopAddress: "Shastri Nagar, Meerut", shopType: "Kirana",
  },
  consumer: {
    name: "Neha Singh", email: "consumer@agrochain.com", phone: "9988776655",
    password: "User@123", address: "Jagriti Vihar, Meerut",
    preferredProducts: ["Fruits", "Vegetables"],
  },
};

const PRODUCT_OPTIONS = ["Fruits", "Vegetables", "Grains", "Dairy", "Spices", "Pulses"];

function getStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  const widths  = ["15%", "35%", "60%", "80%", "100%"];
  const colors  = ["#dc2626", "#ea580c", "#ca8a04", "#d97706", "#16a34a"];
  return { width: widths[score], color: colors[score] };
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(location.state?.role || "distributor");
  const [form, setForm] = useState(PREFILL[location.state?.role || "distributor"]);
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const switchRole = (r) => {
    setRole(r);
    setForm(PREFILL[r]);
    setSuccess(false);
  };
  console.log("Location state:", location.state);

  const currentRole = ROLES.find(r => r.key === role);
console.log("Current role:", currentRole, "Form data:", form);
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const toggleProduct = (p) => {
    const cur = form.preferredProducts || [];
    set("preferredProducts", cur.includes(p) ? cur.filter(x => x !== p) : [...cur, p]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) return alert("Please accept the Terms of Service.");
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1800);
  };

  const strength = getStrength(form.password || "");

  const successMessages = {
    distributor: `Welcome, ${form.name}! Your distributor account is ready. You can now manage wholesale shipments, track logistics, and create smart contracts on AgroChain.`,
    retailer:    `Welcome, ${form.name}! Your retailer account is live. Start sourcing fresh produce directly from verified farmers and distributors.`,
    consumer:    `Welcome, ${form.name}! Browse fresh produce from local farms and get them delivered to your address.`,
  };

  // ── Styles ──────────────────────────────────────────────────────────────────
  const S = {
    page: { minHeight: "100vh", background: "linear-gradient(160deg,#e8f5e2 0%,#fdf6e3 40%,#e6f4f1 100%)", padding: "2rem 1rem 4rem", fontFamily: "'Palatino Linotype',Georgia,serif", color: "#1c1a14" },
    header: { textAlign: "center", marginBottom: "2rem" },
    brand: { display: "inline-flex", alignItems: "center", gap: 8, marginBottom: "1.2rem" },
    brandName: { fontWeight: 700, fontSize: "1.2rem", color: "#1a3d1f" },
    brandSub: { fontSize: "0.62rem", color: "#6b7c47", letterSpacing: "0.12em", textTransform: "uppercase" },
    title: { fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 800, color: "#0f2d14", marginBottom: "0.4rem" },
    subtitle: { fontSize: "0.95rem", color: "#4a5340" },
    tabs: { display: "flex", gap: "0.75rem", justifyContent: "center", marginBottom: "2rem", flexWrap: "wrap" },
    tab: (active) => ({
      display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
      padding: "1rem 1.4rem", minWidth: 130,
      background: active ? "rgba(26,92,42,0.07)" : "rgba(255,252,245,0.85)",
      border: `2px solid ${active ? "#1a5c2a" : "rgba(180,160,100,0.25)"}`,
      borderRadius: 16, cursor: "pointer", fontFamily: "inherit",
      boxShadow: active ? "0 4px 16px rgba(26,92,42,0.18)" : "none",
      transition: "all 0.2s",
    }),
    tabIcon: { fontSize: "1.7rem" },
    tabLabel: (active) => ({ fontSize: "0.85rem", fontWeight: 700, color: active ? "#1a5c2a" : "#1c1a14" }),
    tabDesc: { fontSize: "0.7rem", color: "#6b7c47", textAlign: "center" },
    card: { background: "rgba(255,252,245,0.95)", borderRadius: 24, border: "1px solid rgba(134,197,89,0.3)", boxShadow: "0 12px 40px rgba(0,0,0,0.08)", padding: "2.5rem", maxWidth: 640, margin: "0 auto" },
    sectionTitle: { fontSize: "0.72rem", fontWeight: 700, color: "#6b7c47", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "1.2rem", marginTop: "1.8rem", paddingBottom: "0.4rem", borderBottom: "1px solid rgba(180,160,100,0.2)" },
    grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" },
    group: (full) => ({ display: "flex", flexDirection: "column", gap: 5, gridColumn: full ? "1 / -1" : undefined }),
    label: { fontSize: "0.8rem", fontWeight: 600, color: "#3a3028" },
    inputWrap: { position: "relative" },
    inputIcon: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: "0.95rem", pointerEvents: "none" },
    input: { width: "100%", padding: "10px 14px", border: "1.5px solid rgba(180,160,100,0.35)", borderRadius: 10, fontFamily: "inherit", fontSize: "0.88rem", color: "#1c1a14", background: "rgba(255,255,255,0.8)", outline: "none" },
    inputPadL: { paddingLeft: 38 },
    inputMono: { fontFamily: "monospace", fontSize: "0.82rem" },
    select: { width: "100%", padding: "10px 36px 10px 14px", border: "1.5px solid rgba(180,160,100,0.35)", borderRadius: 10, fontFamily: "inherit", fontSize: "0.88rem", color: "#1c1a14", background: "rgba(255,255,255,0.8)", outline: "none", appearance: "none", cursor: "pointer" },
    pwWrap: { position: "relative" },
    pwToggle: { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "0.8rem", color: "#6b7c47", fontFamily: "inherit" },
    strengthBar: (s) => ({ height: 3, borderRadius: 2, marginTop: 5, width: s.width, background: s.color, transition: "all 0.3s" }),
    chipsWrap: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 },
    chip: (active) => ({
      display: "flex", alignItems: "center", gap: 6, padding: "6px 14px",
      border: `1.5px solid ${active ? "#1a5c2a" : "rgba(180,160,100,0.3)"}`,
      borderRadius: 20, cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit",
      color: active ? "#1a5c2a" : "#3a3028",
      background: active ? "rgba(26,92,42,0.07)" : "rgba(255,255,255,0.7)",
      fontWeight: active ? 600 : 400, transition: "all 0.15s",
    }),
    agreeRow: { display: "flex", alignItems: "flex-start", gap: 10, marginTop: "1.5rem" },
    agreeLabel: { fontSize: "0.82rem", color: "#4a5340", lineHeight: 1.5, cursor: "pointer" },
    submitBtn: { width: "100%", marginTop: "1.5rem", padding: 15, background: "linear-gradient(135deg,#1a5c2a,#2d8a45)", color: "#fff", border: "none", borderRadius: 12, fontSize: "1rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 6px 20px rgba(26,92,42,0.3)" },
    loginLink: { textAlign: "center", marginTop: "1.2rem", fontSize: "0.85rem", color: "#6b7c47" },
    badgeRow: { display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "1.5rem", flexWrap: "wrap" },
    badge: { fontSize: "0.72rem", color: "#6b7c47" },
    successWrap: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "3rem 1rem" },
    successTitle: { fontSize: "1.6rem", fontWeight: 800, color: "#0f2d14", marginBottom: "0.5rem" },
    successMsg: { color: "#4a5340", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: 360, marginBottom: "1.5rem" },
    btnRow: { display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" },
    primaryBtn: { padding: "12px 28px", background: "linear-gradient(135deg,#1a5c2a,#2d8a45)", color: "#fff", border: "none", borderRadius: 10, fontFamily: "inherit", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer" },
    outlineBtn: { padding: "12px 20px", background: "transparent", color: "#1a5c2a", border: "2px solid rgba(26,92,42,0.3)", borderRadius: 10, fontFamily: "inherit", fontSize: "0.9rem", cursor: "pointer" },
    req: { color: "#dc2626", marginLeft: 2 },
  };

  // ── Input helpers ────────────────────────────────────────────────────────────
  const Field = ({ label, required, icon, id, type = "text", value, onChange, style }) => (
    <div style={S.group(false)}>
      <label style={S.label}>{label}{required && <span style={S.req}>*</span>}</label>
      <div style={S.inputWrap}>
        {icon && <span style={S.inputIcon}>{icon}</span>}
        <input
          id={id} type={type} value={value}
          onChange={e => onChange(e.target.value)}
          style={{ ...S.input, ...(icon ? S.inputPadL : {}), ...style }}
        />
      </div>
    </div>
  );

  const FullField = ({ label, required, icon, type = "text", value, onChange, style }) => (
    <div style={S.group(true)}>
      <label style={S.label}>{label}{required && <span style={S.req}>*</span>}</label>
      <div style={S.inputWrap}>
        {icon && <span style={S.inputIcon}>{icon}</span>}
        <input
          type={type} value={value}
          onChange={e => onChange(e.target.value)}
          style={{ ...S.input, ...(icon ? S.inputPadL : {}), ...style }}
        />
      </div>
    </div>
  );

  const SelectField = ({ label, required, value, onChange, options }) => (
    <div style={S.group(false)}>
      <label style={S.label}>{label}{required && <span style={S.req}>*</span>}</label>
      <select value={value} onChange={e => onChange(e.target.value)} style={S.select}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  // ── Success screen ───────────────────────────────────────────────────────────
  if (success) {
    return (
      <div style={S.page}>
        <div style={S.card}>
          <div style={S.successWrap}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✅</div>
            <h2 style={S.successTitle}>Account Created!</h2>
            <p style={S.successMsg}>{successMessages[role]}</p>
            <div style={S.btnRow}>
              <button style={S.primaryBtn} onClick={() => navigate("/")}>Go to Dashboard →</button>
              <button style={S.outlineBtn} onClick={() => setSuccess(false)}>Register another</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main render ──────────────────────────────────────────────────────────────
  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.header}>
        <div style={S.brand}>
          <span style={{ fontSize: "2rem" }}>🌿</span>
          <div>
            <div style={S.brandName}>AgroChain</div>
            <div style={S.brandSub}>Blockchain Supply</div>
          </div>
        </div>
        <h1 style={S.title}>Create Your Account</h1>
        <p style={S.subtitle}>Join 3,400+ farmers and businesses on the trusted supply chain network</p>
      </div>

      {/* Role tabs */}
<div style={S.tabs}>
  {currentRole && (
    <button
      key={currentRole.key}
      style={S.tab(true)}
      onClick={() => switchRole(currentRole.key)}
    >
      <span style={S.tabIcon}>{currentRole.icon}</span>
      <span style={S.tabLabel(true)}>{currentRole.label}</span>
      <span style={S.tabDesc}>{currentRole.desc}</span>
    </button>
  )}
</div>

      {/* Form card */}
      <div style={S.card}>
        <form onSubmit={handleSubmit}>

          {/* ── DISTRIBUTOR ── */}
          {role === "distributor" && (
            <>
              <div style={S.sectionTitle}>🧑 Personal Information</div>
              <div style={S.grid}>
                <Field label="Full Name" required icon="👤" value={form.name || ""} onChange={v => set("name", v)} />
                <Field label="Phone Number" required icon="📱" type="tel" value={form.phone || ""} onChange={v => set("phone", v)} />
                <FullField label="Email Address" required icon="✉️" type="email" value={form.email || ""} onChange={v => set("email", v)} />

                {/* Password */}
                <div style={S.group(false)}>
                  <label style={S.label}>Password <span style={S.req}>*</span></label>
                  <div style={S.pwWrap}>
                    <input
                      type={showPw ? "text" : "password"} value={form.password || ""}
                      onChange={e => set("password", e.target.value)}
                      style={S.input}
                    />
                    <button type="button" style={S.pwToggle} onClick={() => setShowPw(p => !p)}>
                      {showPw ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div style={S.strengthBar(strength)} />
                </div>

                <Field label="Location" icon="📍" value={form.location || ""} onChange={v => set("location", v)} />
              </div>

              <div style={S.sectionTitle}>🏢 Business Information</div>
              <div style={S.grid}>
                <FullField label="Business Name" required icon="🏬" value={form.businessName || ""} onChange={v => set("businessName", v)} />
                <Field label="GST Number" required value={form.gstNumber || ""} onChange={v => set("gstNumber", v)} style={S.inputMono} />
                <SelectField label="Distribution Type" value={form.distributionType || "Wholesale"} onChange={v => set("distributionType", v)} options={["Wholesale", "Retail", "Cold Chain", "Export/Import"]} />
                <FullField label="Business Address" required icon="🏘️" value={form.address || ""} onChange={v => set("address", v)} />
              </div>
            </>
          )}

          {/* ── RETAILER ── */}
          {role === "retailer" && (
            <>
              <div style={S.sectionTitle}>🧑 Personal Information</div>
              <div style={S.grid}>
                <Field label="Full Name" required icon="👤" value={form.name || ""} onChange={v => set("name", v)} />
                <Field label="Phone Number" required icon="📱" type="tel" value={form.phone || ""} onChange={v => set("phone", v)} />
                <FullField label="Email Address" required icon="✉️" type="email" value={form.email || ""} onChange={v => set("email", v)} />

                <div style={S.group(false)}>
                  <label style={S.label}>Password <span style={S.req}>*</span></label>
                  <div style={S.pwWrap}>
                    <input
                      type={showPw ? "text" : "password"} value={form.password || ""}
                      onChange={e => set("password", e.target.value)}
                      style={S.input}
                    />
                    <button type="button" style={S.pwToggle} onClick={() => setShowPw(p => !p)}>
                      {showPw ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div style={S.strengthBar(strength)} />
                </div>

                <Field label="Location" icon="📍" value={form.location || ""} onChange={v => set("location", v)} />
              </div>

              <div style={S.sectionTitle}>🏪 Shop Information</div>
              <div style={S.grid}>
                <FullField label="Shop Name" required icon="🏬" value={form.shopName || ""} onChange={v => set("shopName", v)} />
                <Field label="GST Number" required value={form.gstNumber || ""} onChange={v => set("gstNumber", v)} style={S.inputMono} />
                <SelectField label="Shop Type" value={form.shopType || "Kirana"} onChange={v => set("shopType", v)} options={["Kirana", "Supermarket", "Organic Store", "Online Retailer"]} />
                <FullField label="Shop Address" required icon="🏘️" value={form.shopAddress || ""} onChange={v => set("shopAddress", v)} />
              </div>
            </>
          )}

          {/* ── CONSUMER ── */}
          {role === "consumer" && (
            <>
              <div style={S.sectionTitle}>🧑 Personal Information</div>
              <div style={S.grid}>
                <Field label="Full Name" required icon="👤" value={form.name || ""} onChange={v => set("name", v)} />
                <Field label="Phone Number" required icon="📱" type="tel" value={form.phone || ""} onChange={v => set("phone", v)} />
                <FullField label="Email Address" required icon="✉️" type="email" value={form.email || ""} onChange={v => set("email", v)} />

                <div style={S.group(false)}>
                  <label style={S.label}>Password <span style={S.req}>*</span></label>
                  <div style={S.pwWrap}>
                    <input
                      type={showPw ? "text" : "password"} value={form.password || ""}
                      onChange={e => set("password", e.target.value)}
                      style={S.input}
                    />
                    <button type="button" style={S.pwToggle} onClick={() => setShowPw(p => !p)}>
                      {showPw ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div style={S.strengthBar(strength)} />
                </div>

                <FullField label="Delivery Address" icon="📍" value={form.address || ""} onChange={v => set("address", v)} />
              </div>

              <div style={S.sectionTitle}>🛒 Preferred Products</div>
              <div style={{ ...S.group(true), gridColumn: "1 / -1" }}>
                <label style={S.label}>Select categories you're interested in</label>
                <div style={S.chipsWrap}>
                  {PRODUCT_OPTIONS.map(p => {
                    const active = (form.preferredProducts || []).includes(p);
                    return (
                      <button key={p} type="button" style={S.chip(active)} onClick={() => toggleProduct(p)}>
                        {active ? "✓" : "+"} {p}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Agree */}
          <div style={S.agreeRow}>
            <input type="checkbox" id="agree" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ marginTop: 2, accentColor: "#1a5c2a", flexShrink: 0 }} />
            <label htmlFor="agree" style={S.agreeLabel}>
              I agree to AgroChain's <a href="#" style={{ color: "#1a5c2a" }}>Terms of Service</a> and <a href="#" style={{ color: "#1a5c2a" }}>Privacy Policy</a>. I understand my data will be secured on the blockchain network.
            </label>
          </div>

          <button type="submit" style={S.submitBtn} disabled={loading}>
            {loading ? "⏳ Creating account..." : "🌱 Create Account"}
          </button>
        </form>

        <p style={S.loginLink}>
          Already have an account? <a href="#" style={{ color: "#1a5c2a", fontWeight: 600, textDecoration: "none" }} onClick={() => navigate("/login")}>Sign in →</a>
        </p>

        <div style={S.badgeRow}>
          <span style={S.badge}>🔒 SSL Secured</span>
          <span style={S.badge}>⛓️ Blockchain Verified</span>
          <span style={S.badge}>🇮🇳 GSTIN Compliant</span>
        </div>
      </div>
    </div>
  );
}