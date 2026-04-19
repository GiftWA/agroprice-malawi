"use client";
import { useState } from "react";

export default function Contact() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent]       = useState(false);

  const inputStyle = {
    width: "100%", padding: "11px 14px",
    borderRadius: "8px", border: "1.5px solid #ddd",
    fontSize: "14px", outline: "none",
    boxSizing: "border-box" as const,
    fontFamily: "sans-serif",
  };

  const handleSubmit = () => {
    if (!name || !email || !message) { alert("Please fill in all required fields."); return; }
    setSent(true);
  };

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
          <a href="/about" style={{ color: "#C8E6C9", fontSize: "13px", textDecoration: "none" }}>About</a>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: "#1B5E20", padding: "48px 24px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "32px", fontWeight: 800, margin: "0 0 12px" }}>Contact Us</h1>
        <p style={{ color: "#C8E6C9", fontSize: "16px", maxWidth: "480px", margin: "0 auto" }}>
          Have a question, want to report a price, or interested in partnering with us? We'd love to hear from you.
        </p>
      </div>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

        {/* Contact info */}
        <div>
          {[
            { icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B5E20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            ), label: "Email", value: "giftwasili27@gmail.com" },
            { icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B5E20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ), label: "Location", value: "Zomba, Malawi" },
            { icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B5E20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.48 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            ), label: "Phone", value: "+265 XXX XXX XXX" },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", gap: "14px", alignItems: "flex-start", background: "#fff", borderRadius: "10px", border: "1px solid #dde8dd", padding: "16px", marginBottom: "12px" }}>
              <div style={{ flexShrink: 0, marginTop: "2px" }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: "11px", color: "#888", marginBottom: "2px", fontWeight: 600, textTransform: "uppercase" as const }}>{item.label}</div>
                <div style={{ fontSize: "14px", color: "#333", fontWeight: 500 }}>{item.value}</div>
              </div>
            </div>
          ))}

          <div style={{ background: "#1B5E20", borderRadius: "10px", padding: "20px", marginTop: "8px" }}>
            <div style={{ color: "#FF8F00", fontWeight: 700, fontSize: "15px", marginBottom: "8px" }}>Want to be a market agent?</div>
            <div style={{ color: "#C8E6C9", fontSize: "13px", lineHeight: 1.7 }}>
              If you're at a market and can report prices daily, reach out to us. We're building a network of trusted agents across Malawi.
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #dde8dd", padding: "24px" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
              <div style={{ fontWeight: 700, fontSize: "18px", color: "#1B5E20", marginBottom: "8px" }}>Message sent!</div>
              <div style={{ fontSize: "14px", color: "#555" }}>Thank you for reaching out. We'll get back to you soon.</div>
              <button onClick={() => setSent(false)} style={{ marginTop: "20px", background: "#1B5E20", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 24px", cursor: "pointer", fontSize: "14px" }}>Send another</button>
            </div>
          ) : (
            <>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#1B5E20", margin: "0 0 18px" }}>Send us a message</h2>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ fontSize: "12px", color: "#555", display: "block", marginBottom: "4px", fontWeight: 600 }}>Your name *</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. John Banda" style={inputStyle} />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ fontSize: "12px", color: "#555", display: "block", marginBottom: "4px", fontWeight: 600 }}>Email address *</label>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" type="email" style={inputStyle} />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ fontSize: "12px", color: "#555", display: "block", marginBottom: "4px", fontWeight: 600 }}>Subject</label>
                <select value={subject} onChange={e => setSubject(e.target.value)} style={inputStyle}>
                  <option value="">Select a subject</option>
                  <option>Report a price</option>
                  <option>Become a market agent</option>
                  <option>Partnership enquiry</option>
                  <option>Wrong price reported</option>
                  <option>General question</option>
                </select>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "12px", color: "#555", display: "block", marginBottom: "4px", fontWeight: 600 }}>Message *</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Write your message here..." rows={4} style={{ ...inputStyle, resize: "vertical" as const }} />
              </div>
              <button onClick={handleSubmit} style={{ width: "100%", background: "#1B5E20", color: "#fff", border: "none", borderRadius: "8px", padding: "12px", fontSize: "15px", fontWeight: 700, cursor: "pointer" }}>
                Send message
              </button>
            </>
          )}
        </div>

      </div>

      {/* Footer */}
      <footer style={{ background: "#212121", color: "#aaa", textAlign: "center", padding: "24px", fontSize: "13px" }}>
        © {new Date().getFullYear()} AgroPrice Malawi · Empowering farmers with real market data
      </footer>

    </main>
  );
}