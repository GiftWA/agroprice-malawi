"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "agroprice2025") {
      window.location.href = "/admin/dashboard";
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <main style={{
      display: "flex",
      height: "100vh",
      fontFamily: "sans-serif",
      overflow: "hidden",
    }}>

      {/* Left panel — login form */}
      <div style={{
        width: "100%",
        maxWidth: "460px",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "48px 48px",
        zIndex: 2,
      }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "40px" }}>
          <div style={{
            width: "38px", height: "38px", borderRadius: "50%",
            border: "2px solid #FF8F00",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#FF8F00", fontWeight: 800, fontSize: "18px", fontFamily: "serif" }}>A</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: "18px", color: "#1B5E20" }}>
            AgroPrice <span style={{ color: "#FF8F00" }}>Malawi</span>
          </span>
        </div>

        {/* Heading */}
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#1B5E20", margin: "0 0 6px" }}>
          Welcome back
        </h1>
        <p style={{ fontSize: "14px", color: "#888", margin: "0 0 32px" }}>
          Sign in to manage crop prices
        </p>

        {/* Username */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontSize: "13px", fontWeight: 600, color: "#444", display: "block", marginBottom: "6px" }}>
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={e => { setUsername(e.target.value); setError(""); }}
            style={{
              width: "100%", padding: "12px 16px",
              border: "1.5px solid #ddd", borderRadius: "10px",
              fontSize: "14px", outline: "none", boxSizing: "border-box",
              transition: "border 0.2s",
            }}
            onFocus={e => e.target.style.border = "1.5px solid #1B5E20"}
            onBlur={e => e.target.style.border = "1.5px solid #ddd"}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{ fontSize: "13px", fontWeight: 600, color: "#444", display: "block", marginBottom: "6px" }}>
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              style={{
                width: "100%", padding: "12px 44px 12px 16px",
                border: "1.5px solid #ddd", borderRadius: "10px",
                fontSize: "14px", outline: "none", boxSizing: "border-box",
              }}
              onFocus={e => e.target.style.border = "1.5px solid #1B5E20"}
              onBlur={e => e.target.style.border = "1.5px solid #ddd"}
            />
            <span
              onClick={() => setShowPass(!showPass)}
              style={{
                position: "absolute", right: "14px", top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer", fontSize: "16px", color: "#999",
              }}
            >
              {showPass ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "#FFEBEE", color: "#C62828",
            padding: "10px 14px", borderRadius: "8px",
            fontSize: "13px", marginBottom: "16px",
            border: "1px solid #FFCDD2",
          }}>
            {error}
          </div>
        )}

        {/* Login button */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%", padding: "14px",
            background: "#1B5E20", color: "#fff",
            border: "none", borderRadius: "10px",
            fontSize: "15px", fontWeight: 700,
            cursor: "pointer", transition: "background 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#FF8F00")}
          onMouseLeave={e => (e.currentTarget.style.background = "#1B5E20")}
        >
          Sign in
        </button>
        <p style={{ fontSize: "13px", color: "#888", textAlign: "right", marginTop: "-16px", marginBottom: "20px" }}>
  <span
    onClick={() => alert("Contact the site administrator at giftwasili27@gmail.com to reset your password.")}
    style={{ color: "#FF8F00", cursor: "pointer", textDecoration: "underline" }}
  >
    Forgot password?
  </span>
</p>

        <p style={{ fontSize: "12px", color: "#bbb", textAlign: "center", marginTop: "32px" }}>
          © {new Date().getFullYear()}  AgroPrice Malawi Admin Panel ·
        </p>
      </div>

      {/* Right panel — background image */}
      <div style={{
        flex: 1,
        backgroundImage: "url('/admin-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}>
        {/* Dark overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(27,94,32,0.45) 0%, rgba(0,0,0,0.25) 100%)",
        }} />
        {/* Text over image */}
        <div style={{
          position: "absolute", bottom: "48px", left: "48px", right: "48px",
        }}>
          <div style={{
            background: "rgba(255,143,0,0.15)",
            border: "1px solid rgba(255,143,0,0.4)",
            borderRadius: "12px",
            padding: "20px 24px",
            backdropFilter: "blur(8px)",
          }}>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#fff", marginBottom: "6px" }}>
              Empowering Malawian Farmers
            </div>
            <div style={{ fontSize: "14px", color: "#C8E6C9", lineHeight: 1.6 }}>
              Real-time crop prices from 14 markets across Malawi — helping farmers make informed decisions every day.
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}