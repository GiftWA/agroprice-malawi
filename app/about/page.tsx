export default function About() {
  return (
    <main style={{ fontFamily: "sans-serif", background: "#F1F8E9", minHeight: "100vh" }}>

      {/* Navbar */}
      <nav style={{ background: "#1B5E20", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px", position: "sticky", top: 0, zIndex: 100 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "2px solid #FF8F00", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#FF8F00", fontWeight: 800, fontSize: "18px", fontFamily: "serif" }}>A</span>
          </div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "17px" }}>AgroPrice <span style={{ color: "#FF8F00" }}>Malawi</span></span>
        </a>
        <div style={{ display: "flex", gap: "16px" }}>
          <a href="/" style={{ color: "#C8E6C9", fontSize: "13px", textDecoration: "none" }}>Home</a>
          <a href="/contact" style={{ color: "#C8E6C9", fontSize: "13px", textDecoration: "none" }}>Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: "#1B5E20", padding: "48px 24px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "32px", fontWeight: 800, margin: "0 0 12px" }}>About AgroPrice Malawi</h1>
        <p style={{ color: "#C8E6C9", fontSize: "16px", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
          Empowering Malawian farmers with real-time market price data so they never sell at a loss again.
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px" }}>

        {/* Mission */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #dde8dd", padding: "28px", marginBottom: "20px" }}>
          <h2 style={{ color: "#1B5E20", fontSize: "20px", fontWeight: 700, margin: "0 0 12px" }}>Our mission</h2>
          <p style={{ color: "#444", fontSize: "15px", lineHeight: 1.8, margin: 0 }}>
            Millions of Malawian farmers work hard every growing season, only to sell their crops at low prices because they don't know what buyers are paying in other markets. AgroPrice Malawi exists to change that. We collect real crop prices from markets across all regions of Malawi and make them freely available to every farmer — whether they're in Chitipa, Chikhwawa, Karonga or Zomba.
          </p>
        </div>

        {/* What we do */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #dde8dd", padding: "28px", marginBottom: "20px" }}>
          <h2 style={{ color: "#1B5E20", fontSize: "20px", fontWeight: 700, margin: "0 0 16px" }}>What we do</h2>
          {[
            { icon: "📊", title: "Daily price tracking", desc: "We track prices for 18+ crops across 14+ markets in Malawi, updated every day." },
            { icon: "🌍", title: "Available in Chichewa", desc: "Our platform supports both English and Chichewa so every farmer can use it comfortably." },
            { icon: "📱", title: "Works on any phone", desc: "Designed to work on low-end Android phones with slow internet connections." },
            { icon: "🆓", title: "Completely free", desc: "AgroPrice Malawi is free to use for all farmers, traders, and market agents." },
          ].map(item => (
            <div key={item.title} style={{ display: "flex", gap: "14px", marginBottom: "16px" }}>
              <span style={{ fontSize: "24px", flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "15px", color: "#1B5E20", marginBottom: "2px" }}>{item.title}</div>
                <div style={{ fontSize: "14px", color: "#555", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Built by */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #dde8dd", padding: "28px", marginBottom: "20px" }}>
          <h2 style={{ color: "#1B5E20", fontSize: "20px", fontWeight: 700, margin: "0 0 12px" }}>Built in Malawi</h2>
          <p style={{ color: "#444", fontSize: "15px", lineHeight: 1.8, margin: 0 }}>
            AgroPrice Malawi was built by a Computer Science student at the University of Malawi (UNIMA) with a passion for using technology to solve real problems faced by Malawian communities. This platform is the beginning of a larger vision to bring digital tools to Malawi's agricultural sector.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px", marginBottom: "20px" }}>
          {[
            { value: "18+", label: "Crops tracked" },
            { value: "14+", label: "Markets covered" },
            { value: "98+", label: "Price entries" },
            { value: "Free", label: "Always" },
          ].map(s => (
            <div key={s.label} style={{ background: "#1B5E20", borderRadius: "10px", padding: "20px", textAlign: "center" }}>
              <div style={{ color: "#FF8F00", fontWeight: 800, fontSize: "26px" }}>{s.value}</div>
              <div style={{ color: "#C8E6C9", fontSize: "12px", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <a href="/" style={{ display: "inline-block", background: "#1B5E20", color: "#fff", padding: "12px 32px", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "15px" }}>
            View crop prices →
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: "#212121", color: "#aaa", textAlign: "center", padding: "24px", fontSize: "13px" }}>
        © {new Date().getFullYear()} AgroPrice Malawi · Empowering farmers with real market data
      </footer>

    </main>
  );
}