"use client";
import { useState, useMemo } from "react";
import { prices, crops, markets } from "@/data/prices";

const C = {
  green:      "#1B5E20",
  greenLight: "#2E7D32",
  amber:      "#FF8F00",
  amberLight: "#FFF8E1",
  white:      "#FFFFFF",
  dark:       "#212121",
  bg:         "#F1F8E9",
};

const trendIcon = (trend: string) => {
  if (trend === "up")   return { symbol: "↑", color: "#C62828" };
  if (trend === "down") return { symbol: "↓", color: "#1565C0" };
  return                       { symbol: "→", color: "#777" };
};

export default function Home() {
  const [selectedCrop,   setSelectedCrop]   = useState("All");
  const [selectedMarket, setSelectedMarket] = useState("All");
  const [search,         setSearch]         = useState("");

  const filtered = useMemo(() => prices.filter(p => {
    const matchCrop   = selectedCrop   === "All" || p.crop   === selectedCrop;
    const matchMarket = selectedMarket === "All" || p.market === selectedMarket;
    const matchSearch = p.crop.toLowerCase().includes(search.toLowerCase()) ||
                        p.market.toLowerCase().includes(search.toLowerCase());
    return matchCrop && matchMarket && matchSearch;
  }), [selectedCrop, selectedMarket, search]);

  const sel: React.CSSProperties = {
    padding: "8px 12px",
    borderRadius: "8px",
    border: `1.5px solid ${C.green}`,
    background: C.white,
    color: C.dark,
    fontSize: "14px",
    outline: "none",
    cursor: "pointer",
  };

  return (
    <main style={{ background: C.bg, minHeight: "100vh", fontFamily: "sans-serif" }}>

      {/* Navbar */}
      <nav style={{
        background: C.green,
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "60px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
        width: "36px", height: "36px", borderRadius: "50%",
        border: "2px solid #FF8F00",
        display: "flex", alignItems: "center", justifyContent: "center",
}}>
      <span style={{ color: "#FF8F00", fontWeight: 800, fontSize: "18px", fontFamily: "serif" }}>A</span>
</div>
          <span style={{ color: C.white, fontWeight: 700, fontSize: "19px", letterSpacing: "0.3px" }}>
            AgroPrice <span style={{ color: C.amber }}>Malawi</span>
          </span>
        </div>
        <span style={{
          background: C.amber,
          color: C.dark,
          fontSize: "11px",
          fontWeight: 600,
          padding: "4px 10px",
          borderRadius: "20px",
        }}>
          Updated daily
        </span>
      </nav>

      {/* Hero with background image */}
      <div style={{
        backgroundImage: "url('/backgroundLakeMalawi.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
        position: "relative",
        padding: "64px 24px 72px",
        textAlign: "center",
      }}>
        {/* Dark overlay so text is readable */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(27,94,32,0.55) 0%, rgba(0,0,0,0.40) 100%)",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-block",
            background: C.amber,
            color: C.dark,
            fontSize: "12px",
            fontWeight: 700,
            padding: "4px 14px",
            borderRadius: "20px",
            marginBottom: "14px",
            letterSpacing: "0.5px",
          }}>
            🇲🇼 MALAWI MARKET PRICES
          </div>
          <h1 style={{ color: C.white, fontSize: "30px", fontWeight: 800, margin: "0 0 10px", lineHeight: 1.2 }}>
            Know the price before you sell
          </h1>
          <p style={{ color: "#C8E6C9", fontSize: "16px", margin: "0 auto", maxWidth: "480px", lineHeight: 1.6 }}>
            Real crop prices from markets across Malawi — so farmers never sell at a loss again
          </p>
        </div>
      </div>

      {/* Stat bar */}
      <div style={{
        background: C.dark,
        padding: "10px 24px",
        display: "flex",
        justifyContent: "center",
        gap: "32px",
        flexWrap: "wrap",
      }}>
        {[
          { label: "Markets", value: markets.length },
          { label: "Crops tracked", value: crops.length },
          { label: "Price entries", value: prices.length },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div style={{ color: C.amber, fontWeight: 700, fontSize: "18px" }}>{stat.value}</div>
            <div style={{ color: "#aaa", fontSize: "11px" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ background: C.white, borderBottom: "1px solid #ddd", padding: "16px 24px" }}>
        <div style={{
          maxWidth: "900px", margin: "0 auto",
          display: "flex", flexWrap: "wrap", gap: "12px",
        }}>
          <input
            type="text"
            placeholder="🔍  Search crop or market..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ ...sel, flex: 1, minWidth: "180px" }}
          />
          <select value={selectedCrop} onChange={e => setSelectedCrop(e.target.value)} style={sel}>
            <option value="All">All crops</option>
            {crops.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={selectedMarket} onChange={e => setSelectedMarket(e.target.value)} style={sel}>
            <option value="All">All markets</option>
            {markets.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          {(selectedCrop !== "All" || selectedMarket !== "All" || search) && (
            <button
              onClick={() => { setSelectedCrop("All"); setSelectedMarket("All"); setSearch(""); }}
              style={{ ...sel, background: C.amberLight, border: `1.5px solid ${C.amber}` }}
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "14px 24px 4px", fontSize: "13px", color: "#555" }}>
        Showing <strong>{filtered.length}</strong> price{filtered.length !== 1 ? "s" : ""}
      </div>

      {/* Price cards */}
      <div style={{
        maxWidth: "900px", margin: "0 auto",
        padding: "8px 24px 48px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "16px",
      }}>
        {filtered.length === 0
          ? (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "48px", color: "#888" }}>
              No prices found for that filter.
            </div>
          )
          : filtered.map(item => {
              const trend = trendIcon(item.trend);
              return (
                <div key={item.id} style={{
                  background: C.white,
                  borderRadius: "12px",
                  border: "1px solid #dde8dd",
                  overflow: "hidden",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.07)",
                  transition: "transform 0.15s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  {/* Card header */}
                  <div style={{
                    background: C.green,
                    padding: "10px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <span style={{ color: C.white, fontWeight: 700, fontSize: "15px" }}>{item.crop}</span>
                    <span style={{
                      background: C.amber,
                      color: C.dark,
                      fontSize: "10px",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: "20px",
                    }}>
                      {item.unit}
                    </span>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: "14px 16px" }}>
                    <div style={{ fontSize: "22px", fontWeight: 800, color: C.green, marginBottom: "6px" }}>
                      MWK {item.price.toLocaleString()}
                      <span style={{ fontSize: "17px", marginLeft: "6px", color: trend.color }}>
                        {trend.symbol}
                      </span>
                    </div>
                    <div style={{ fontSize: "13px", color: "#555", marginBottom: "10px" }}>
                      📍 {item.market}
                    </div>
                    <div style={{
                      fontSize: "11px", color: "#999",
                      borderTop: "1px solid #f0f0f0",
                      paddingTop: "8px",
                    }}>
                      Updated: {item.updated}
                    </div>
                  </div>
                </div>
              );
            })
        }
      </div>

      {/* Footer */}
      <footer style={{
        background: C.dark,
        color: "#aaa",
        textAlign: "center",
        padding: "24px",
        fontSize: "13px",
        lineHeight: 2,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "4px" }}>
  <div style={{
    width: "28px", height: "28px", borderRadius: "50%",
    border: "2px solid #FF8F00",
    display: "flex", alignItems: "center", justifyContent: "center",
  }}>
    <span style={{ color: "#FF8F00", fontWeight: 800, fontSize: "14px", fontFamily: "serif" }}>A</span>
  </div>
  <span style={{ color: C.white, fontWeight: 700, fontSize: "15px" }}>
    AgroPrice <span style={{ color: C.amber }}>Malawi</span>
  </span>
</div>
        Empowering farmers with real market data across Malawi
        <div style={{ marginTop: "8px", fontSize: "11px" }}>AgroPrice Malawi © {new Date().getFullYear()} </div>
      </footer>

    </main>
  );
}