"use client";
import { useState, useMemo } from "react";
import { prices, crops, markets } from "@/data/prices";

const C = {
  green: "#1B5E20", greenLight: "#2E7D32", amber: "#FF8F00",
  amberLight: "#FFF8E1", white: "#FFFFFF", dark: "#212121", bg: "#F1F8E9",
};

const T = {
  en: {
    tagline: "MALAWI MARKET PRICES",
    hero: "Know the price before you sell",
    sub: "Real crop prices from markets across Malawi — so farmers never sell at a loss again",
    markets: "Markets", cropsTracked: "Crops tracked", entries: "Price entries",
    searchPlaceholder: "🔍  Search crop or market...",
    allCrops: "All crops", allMarkets: "All markets", clear: "✕ Clear",
    showing: "Showing", prices: "prices", price: "price",
    updatedLabel: "Updated:", noResults: "No prices found for that filter.",
    updatedDaily: "Updated daily",
    footerTagline: "Empowering farmers with real market data across Malawi",
    langBtn: "Chi 🇲🇼",
  },
  chi: {
    tagline: "MITENGO YA MSIKA WA MALAWI",
    hero: "Dziwa mtengo usanagulitse!",
    sub: "Mitengo yeniyeni ya mbewu kuchokera ku misika ya M'malawi — kuti alimi asagulitse moluza kapena mokwera kwambiri!",
    markets: "Misika", cropsTracked: "Mbewu zotsatidwa", entries: "Mitengo yonse",
    searchPlaceholder: "🔍  Sakani mbewu kapena msika...",
    allCrops: "Mbewu zonse", allMarkets: "Misika yonse", clear: "✕ Chotsani",
    showing: "Akuwonetsa", prices: "mitengo", price: "mtengo",
    updatedLabel: "Yosintha:", noResults: "Palibe mitengo yopezeka.",
    updatedDaily: "Yosintha tsiku ndi tsiku",
    footerTagline: "Kulimbikitsa alimi ndi deta ya msika wa Malawi",
    langBtn: "EN 🇬🇧",
  },
};

const cropIcons: Record<string, string> = {
  "Maize": "🌽", "Beans": "🫘", "Groundnuts": "🥜", "Tomatoes": "🍅",
  "Soya beans": "🌿", "Pigeon peas": "🌱", "Rice": "🍚", "Cassava": "🟤",
  "Irish potato": "🥔", "Onions": "🧅", "Sugarcane": "🎋", "Pawpaw": "🍈",
  "Apples": "🍎", "Sunflower": "🌻", "Avocado": "🥑", "Bananas": "🍌",
};

const trendIcon = (trend: string) => {
  if (trend === "up")   return { symbol: "↑", color: "#C62828" };
  if (trend === "down") return { symbol: "↓", color: "#1565C0" };
  return                       { symbol: "→", color: "#777" };
};

export default function Home() {
  const [lang, setLang]               = useState<"en"|"chi">("en");
  const [selectedCrop, setSelectedCrop]     = useState("All");
  const [selectedMarket, setSelectedMarket] = useState("All");
  const [search, setSearch]           = useState("");

  const t = T[lang];

  const filtered = useMemo(() => prices.filter(p => {
    const matchCrop   = selectedCrop   === "All" || p.crop   === selectedCrop;
    const matchMarket = selectedMarket === "All" || p.market === selectedMarket;
    const matchSearch = p.crop.toLowerCase().includes(search.toLowerCase()) ||
                        p.market.toLowerCase().includes(search.toLowerCase());
    return matchCrop && matchMarket && matchSearch;
  }), [selectedCrop, selectedMarket, search]);

  const sel: React.CSSProperties = {
    padding: "8px 12px", borderRadius: "8px",
    border: `1.5px solid ${C.green}`,
    background: C.white, color: C.dark,
    fontSize: "14px", outline: "none", cursor: "pointer",
  };

  return (
    <main style={{ background: C.bg, minHeight: "100vh", fontFamily: "sans-serif" }}>

      {/* Navbar */}
      <nav style={{
        background: C.green, padding: "0 24px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", height: "60px",
        position: "sticky", top: 0, zIndex: 100,
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
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{
            background: C.amber, color: C.dark,
            fontSize: "11px", fontWeight: 600,
            padding: "4px 10px", borderRadius: "20px",
          }}>
            {t.updatedDaily}
          </span>
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "chi" : "en")}
            style={{
              background: lang === "chi" ? C.amber : "rgba(255,255,255,0.15)",
              color: lang === "chi" ? C.dark : C.white,
              border: "1.5px solid rgba(255,255,255,0.4)",
              borderRadius: "20px", padding: "5px 12px",
              fontSize: "12px", fontWeight: 700,
              cursor: "pointer", transition: "all 0.2s",
            }}
          >
            {t.langBtn}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        backgroundImage: "url('/backgroundLakeMalawi.jpg')",
        backgroundSize: "cover", backgroundPosition: "center 40%",
        position: "relative", padding: "64px 24px 72px", textAlign: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(27,94,32,0.55) 0%, rgba(0,0,0,0.40) 100%)",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-block", background: C.amber, color: C.dark,
            fontSize: "12px", fontWeight: 700, padding: "4px 14px",
            borderRadius: "20px", marginBottom: "14px", letterSpacing: "0.5px",
          }}>
            🇲🇼 {t.tagline}
          </div>
          <h1 style={{ color: C.white, fontSize: "30px", fontWeight: 800, margin: "0 0 10px", lineHeight: 1.2 }}>
            {t.hero}
          </h1>
          <p style={{ color: "#C8E6C9", fontSize: "16px", margin: "0 auto", maxWidth: "480px", lineHeight: 1.6 }}>
            {t.sub}
          </p>
        </div>
      </div>

      {/* Stat bar */}
      <div style={{
        background: C.dark, padding: "10px 24px",
        display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap",
      }}>
        {[
          { label: t.markets, value: markets.length },
          { label: t.cropsTracked, value: crops.length },
          { label: t.entries, value: prices.length },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div style={{ color: C.amber, fontWeight: 700, fontSize: "18px" }}>{stat.value}</div>
            <div style={{ color: "#aaa", fontSize: "11px" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ background: C.white, borderBottom: "1px solid #ddd", padding: "16px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "12px" }}>
          <input
            type="text" placeholder={t.searchPlaceholder}
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ ...sel, flex: 1, minWidth: "180px" }}
          />
          <select value={selectedCrop} onChange={e => setSelectedCrop(e.target.value)} style={sel}>
            <option value="All">{t.allCrops}</option>
            {crops.map(c => <option key={c} value={c}>{cropIcons[c] || "🌿"} {c}</option>)}
          </select>
          <select value={selectedMarket} onChange={e => setSelectedMarket(e.target.value)} style={sel}>
            <option value="All">{t.allMarkets}</option>
            {markets.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          {(selectedCrop !== "All" || selectedMarket !== "All" || search) && (
            <button
              onClick={() => { setSelectedCrop("All"); setSelectedMarket("All"); setSearch(""); }}
              style={{ ...sel, background: C.amberLight, border: `1.5px solid ${C.amber}` }}
            >
              {t.clear}
            </button>
          )}
        </div>
      </div>

      {/* Count */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "14px 24px 4px", fontSize: "13px", color: "#555" }}>
        {t.showing} <strong>{filtered.length}</strong> {filtered.length !== 1 ? t.prices : t.price}
      </div>

      {/* Cards */}
      <div style={{
        maxWidth: "900px", margin: "0 auto", padding: "8px 24px 48px",
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px",
      }}>
        {filtered.length === 0
          ? <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "48px", color: "#888" }}>{t.noResults}</div>
          : filtered.map(item => {
              const trend = trendIcon(item.trend);
              return (
                <div key={item.id} style={{
                  background: C.white, borderRadius: "12px",
                  border: "1px solid #dde8dd", overflow: "hidden",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.07)",
                  transition: "transform 0.15s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <div style={{
                    background: C.green, padding: "10px 16px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <span style={{ color: C.white, fontWeight: 700, fontSize: "15px" }}>
                      {cropIcons[item.crop] || "🌿"} {item.crop}
                    </span>
                    <span style={{
                      background: C.amber, color: C.dark,
                      fontSize: "10px", fontWeight: 700,
                      padding: "3px 8px", borderRadius: "20px",
                    }}>
                      {item.unit}
                    </span>
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <div style={{ fontSize: "22px", fontWeight: 800, color: C.green, marginBottom: "6px" }}>
                      MWK {item.price.toLocaleString()}
                      <span style={{ fontSize: "17px", marginLeft: "6px", color: trend.color }}>{trend.symbol}</span>
                    </div>
                    <div style={{ fontSize: "13px", color: "#555", marginBottom: "10px" }}>📍 {item.market}</div>
                    <div style={{ fontSize: "11px", color: "#999", borderTop: "1px solid #f0f0f0", paddingTop: "8px" }}>
                      {t.updatedLabel} {item.updated}
                    </div>
                  </div>
                </div>
              );
            })
        }
      </div>

      {/* Footer */}
      <footer style={{
        background: C.dark, color: "#aaa",
        textAlign: "center", padding: "24px", fontSize: "13px", lineHeight: 2,
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
        {t.footerTagline}
        <div style={{ marginTop: "8px", fontSize: "11px" }}>© {new Date().getFullYear()} AgroPrice Malawi</div>
      </footer>

    </main>
  );
}