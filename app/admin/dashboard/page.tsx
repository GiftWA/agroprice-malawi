"use client";
import { cropNameChi } from "@/app/page";
import { useState } from "react";
import { prices as initialPrices, crops, markets } from "@/data/prices";

const C = { green: "#1B5E20", amber: "#FF8F00", dark: "#212121", bg: "#F1F8E9" };

export default function AdminDashboard() {
  const [priceList, setPriceList]     = useState(initialPrices);
  const [crop, setCrop]               = useState("");
  const [market, setMarket]           = useState("");
  const [price, setPrice]             = useState("");
  const [unit, setUnit]               = useState("MWK/kg");
  const [trend, setTrend]             = useState("stable");
  const [search, setSearch]           = useState("");
  const [successMsg, setSuccessMsg]   = useState("");
  const [editId, setEditId]           = useState<number|null>(null);

  const today = new Date().toISOString().split("T")[0];

  const inputStyle = {
    padding: "9px 12px", borderRadius: "8px",
    border: "1.5px solid #ddd", fontSize: "14px",
    outline: "none", background: "#fff", width: "100%",
    boxSizing: "border-box" as const,
  };

  const handleSubmit = () => {
    if (!crop || !market || !price) {
      alert("Please fill in all fields.");
      return;
    }
    if (editId !== null) {
      setPriceList(prev => prev.map(p =>
        p.id === editId
          ? { ...p, crop, market, price: Number(price), unit, trend, updated: today }
          : p
      ));
      setSuccessMsg(`✓ Price for ${crop} in ${market} updated!`);
      setEditId(null);
    } else {
      const newEntry = {
        id: Date.now(),
        crop, market,
        price: Number(price),
        unit, trend,
        updated: today,
      };
      setPriceList(prev => [newEntry, ...prev]);
      setSuccessMsg(`✓ Price for ${crop} in ${market} added!`);
    }
    setCrop(""); setMarket(""); setPrice(""); setUnit("MWK/kg"); setTrend("stable");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleEdit = (item: typeof initialPrices[0]) => {
    setEditId(item.id);
    setCrop(item.crop);
    setMarket(item.market);
    setPrice(String(item.price));
    setUnit(item.unit);
    setTrend(item.trend);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this price entry?")) {
      setPriceList(prev => prev.filter(p => p.id !== id));
    }
  };

  const filtered = priceList.filter(p =>
    p.crop.toLowerCase().includes(search.toLowerCase()) ||
    p.market.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main style={{ background: C.bg, minHeight: "100vh", fontFamily: "sans-serif" }}>

      {/* Topbar */}
      <nav style={{
        background: C.green, padding: "0 24px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", height: "58px",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            border: "2px solid #FF8F00",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#FF8F00", fontWeight: 800, fontSize: "15px", fontFamily: "serif" }}>A</span>
          </div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "16px" }}>
            AgroPrice <span style={{ color: C.amber }}>Admin</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <a href="/" target="_blank" style={{
            color: "#C8E6C9", fontSize: "13px", textDecoration: "none",
          }}>View live site →</a>
          <a href="/admin" style={{
            background: "rgba(255,255,255,0.15)",
            color: "#fff", fontSize: "13px",
            padding: "6px 14px", borderRadius: "6px",
            textDecoration: "none",
          }}>Sign out</a>
        </div>
      </nav>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "28px 24px" }}>

        {/* Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "12px", marginBottom: "28px",
        }}>
          {[
            { label: "Total prices", value: priceList.length },
            { label: "Crops tracked", value: new Set(priceList.map(p => p.crop)).size },
            { label: "Markets", value: new Set(priceList.map(p => p.market)).size },
            { label: "Last updated", value: today },
          ].map(s => (
            <div key={s.label} style={{
              background: "#fff", borderRadius: "10px",
              border: "1px solid #dde8dd",
              padding: "14px 16px",
            }}>
              <div style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>{s.label}</div>
              <div style={{ fontSize: "20px", fontWeight: 800, color: C.green }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Add / Edit form */}
        <div style={{
          background: "#fff", borderRadius: "12px",
          border: "1px solid #dde8dd",
          padding: "24px", marginBottom: "24px",
        }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: C.green, margin: "0 0 18px" }}>
            {editId !== null ? "✏️ Edit price entry" : "➕ Add new price"}
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "12px", marginBottom: "14px",
          }}>
            <div>
              <label style={{ fontSize: "12px", color: "#555", display: "block", marginBottom: "4px" }}>Crop</label>
              <select value={crop} onChange={e => setCrop(e.target.value)} style={inputStyle}>
                <option value="">Select crop</option>
                {crops.map(c => <option key={c} value={c}>{c} / {cropNameChi[c] || c}</option>)}
                <option value="__new__">+ Add new crop</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#555", display: "block", marginBottom: "4px" }}>Market</label>
              <select value={market} onChange={e => setMarket(e.target.value)} style={inputStyle}>
                <option value="">Select market</option>
                {markets.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#555", display: "block", marginBottom: "4px" }}>Price (MWK)</label>
              <input
                type="number" placeholder="e.g. 1200"
                value={price} onChange={e => setPrice(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#555", display: "block", marginBottom: "4px" }}>Unit</label>
              <select value={unit} onChange={e => setUnit(e.target.value)} style={inputStyle}>
                <option value="MWK/kg">MWK/kg</option>
                <option value="MWK/bag">MWK/bag</option>
                <option value="MWK/basin (5L)">MWK/basin (5L)</option>
                <option value="MWK/piece">MWK/piece</option>
                <option value="MWK/bunch">MWK/bunch</option>
                <option value="MWK/bundle">MWK/bundle</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#555", display: "block", marginBottom: "4px" }}>Trend</label>
              <select value={trend} onChange={e => setTrend(e.target.value)} style={inputStyle}>
                <option value="up">↑ Up</option>
                <option value="stable">→ Stable</option>
                <option value="down">↓ Down</option>
              </select>
            </div>
          </div>

          {successMsg && (
            <div style={{
              background: "#E8F5E9", color: "#2E7D32",
              padding: "10px 14px", borderRadius: "8px",
              fontSize: "13px", marginBottom: "12px",
              border: "1px solid #C8E6C9",
            }}>
              {successMsg}
            </div>
          )}

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={handleSubmit} style={{
              background: C.green, color: "#fff",
              border: "none", borderRadius: "8px",
              padding: "10px 24px", fontSize: "14px",
              fontWeight: 700, cursor: "pointer",
            }}>
              {editId !== null ? "Update price" : "Add price"}
            </button>
            {editId !== null && (
              <button onClick={() => {
                setEditId(null);
                setCrop(""); setMarket(""); setPrice("");
              }} style={{
                background: "#f5f5f5", color: "#555",
                border: "1px solid #ddd", borderRadius: "8px",
                padding: "10px 20px", fontSize: "14px",
                cursor: "pointer",
              }}>
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Price table */}
        <div style={{
          background: "#fff", borderRadius: "12px",
          border: "1px solid #dde8dd", overflow: "hidden",
        }}>
          <div style={{
            padding: "16px 20px",
            borderBottom: "1px solid #f0f0f0",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: C.dark, margin: 0 }}>
              All prices ({filtered.length})
            </h2>
            <input
              type="text" placeholder="Search..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ ...inputStyle, width: "200px" }}
            />
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#F9FBF9" }}>
                  {["Crop", "Market", "Price", "Unit", "Trend", "Updated", "Actions"].map(h => (
                    <th key={h} style={{
                      padding: "10px 16px", textAlign: "left",
                      fontWeight: 600, color: "#555",
                      borderBottom: "1px solid #f0f0f0",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, i) => (
                  <tr key={item.id} style={{ background: i % 2 === 0 ? "#fff" : "#FAFFF9" }}>
                    <td style={{ padding: "10px 16px", fontWeight: 600, color: C.green }}>{item.crop}</td>
                    <td style={{ padding: "10px 16px", color: "#555" }}>{item.market}</td>
                    <td style={{ padding: "10px 16px", fontWeight: 700 }}>MWK {item.price.toLocaleString()}</td>
                    <td style={{ padding: "10px 16px", color: "#888" }}>{item.unit}</td>
                    <td style={{ padding: "10px 16px" }}>
                      <span style={{
                        color: item.trend === "up" ? "#C62828" : item.trend === "down" ? "#1565C0" : "#555",
                        fontWeight: 600,
                      }}>
                        {item.trend === "up" ? "↑ Up" : item.trend === "down" ? "↓ Down" : "→ Stable"}
                      </span>
                    </td>
                    <td style={{ padding: "10px 16px", color: "#888" }}>{item.updated}</td>
                    <td style={{ padding: "10px 16px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => handleEdit(item)} style={{
                          background: "#E8F5E9", color: C.green,
                          border: "none", borderRadius: "6px",
                          padding: "4px 10px", fontSize: "12px",
                          cursor: "pointer", fontWeight: 600,
                        }}>Edit</button>
                        <button onClick={() => handleDelete(item.id)} style={{
                          background: "#FFEBEE", color: "#C62828",
                          border: "none", borderRadius: "6px",
                          padding: "4px 10px", fontSize: "12px",
                          cursor: "pointer", fontWeight: 600,
                        }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}