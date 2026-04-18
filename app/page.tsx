"use client";
import { useState, useMemo } from "react";
import { prices, crops, markets } from "@/data/prices";

const C = {
  green: "#1B5E20", amber: "#FF8F00",
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
    hero: "Dziwani Mtengo Musanagulitse!",
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

const cropImages: Record<string, string> = {
  "Maize":        "/crop-maize.jpg",
  "Beans":        "/crop-beans.jpg",
  "Groundnuts":   "/crop-groundnuts.jpg",
  "Tomatoes":     "/crop-tomatoes.jpg",
  "Soya beans":   "/crop-soya.jpg",
  "Pigeon peas":  "/crop-pigeonpeas.jpg",
  "Rice":         "/crop-rice.jpg",
  "Cassava":      "/crop-cassava.jpg",
  "Irish potato": "/crop-irishpotato.jpg",
  "Onions":       "/crop-onions.jpg",
  "Sugarcane":    "/crop-sugarcane.jpg",
  "Pawpaw":       "/crop-pawpaw.jpg",
  "Apples":       "/crop-apples.jpg",
  "Sunflower":    "/crop-sunflower.jpg",
  "Avocado":      "/crop-avocado.jpg",
  "Bananas":      "/crop-bananas.jpg",
  "Cabbage":      "/crop-cabbage.jpg",
  "Sweet potato": "/crop-sweetpotato.jpg",
};

const cropEmoji: Record<string, string> = {
  "Maize": "🌽", "Beans": "🫘", "Groundnuts": "🥜", "Tomatoes": "🍅",
  "Soya beans": "🌿", "Pigeon peas": "🌱", "Rice": "🍚", "Cassava": "🟤",
  "Irish potato": "🥔", "Onions": "🧅", "Sugarcane": "🎋", "Pawpaw": "🍈",
  "Apples": "🍎", "Sunflower": "🌻", "Avocado": "🥑", "Bananas": "🍌",
  "Cabbage": "🥬", "Sweet potato": "🍠",
};

const cropBg: Record<string, string> = {
  "Maize":        "linear-gradient(135deg, #FFF9C4, #F9A825)",
  "Beans":        "linear-gradient(135deg, #D7CCC8, #8D6E63)",
  "Groundnuts":   "linear-gradient(135deg, #FFE0B2, #EF6C00)",
  "Tomatoes":     "linear-gradient(135deg, #FFCDD2, #E53935)",
  "Soya beans":   "linear-gradient(135deg, #DCEDC8, #558B2F)",
  "Pigeon peas":  "linear-gradient(135deg, #F0F4C3, #9E9D24)",
  "Rice":         "linear-gradient(135deg, #F5F5F5, #BDBDBD)",
  "Cassava":      "linear-gradient(135deg, #FFF3E0, #BF360C)",
  "Irish potato": "linear-gradient(135deg, #FFF8E1, #F57F17)",
  "Onions":       "linear-gradient(135deg, #FCE4EC, #AD1457)",
  "Sugarcane":    "linear-gradient(135deg, #E8F5E9, #2E7D32)",
  "Pawpaw":       "linear-gradient(135deg, #FFF9C4, #F57F17)",
  "Apples":       "linear-gradient(135deg, #FFEBEE, #C62828)",
  "Sunflower":    "linear-gradient(135deg, #FFFDE7, #F9A825)",
  "Avocado":      "linear-gradient(135deg, #F1F8E9, #33691E)",
  "Bananas":      "linear-gradient(135deg, #FFFDE7, #F9A825)",
  "Cabbage":      "linear-gradient(135deg, #E8F5E9, #2E7D32)",
  "Sweet potato": "linear-gradient(135deg, #FFF3E0, #E65100)",
};

export const cropNameChi: Record<string, string> = {
  "Maize": "Chimanga", "Beans": "Nyemba", "Groundnuts": "Mtedza",
  "Tomatoes": "Matimati", "Soya beans": "Soya", "Pigeon peas": "Nandolo",
  "Rice": "Mpunga", "Cassava": "Chinangwa", "Irish potato": "Mbatata",
  "Onions": "Anyezi", "Sugarcane": "Miwa", "Pawpaw": "Mapapazi",
  "Apples": "Mapulo", "Sunflower": "Sunfulo", "Avocado": "Avokado",
  "Bananas": "Nthochi", "Cabbage": "Kabichi", "Sweet potato": "Mbatata Zofiira",
};

const trendIcon = (trend: string) => {
  if (trend === "up")   return { symbol: "↑", color: "#C62828" };
  if (trend === "down") return { symbol: "↓", color: "#1565C0" };
  return                       { symbol: "→", color: "#777" };
};

export default function Home() {
  const [lang, setLang]                     = useState<"en"|"chi">("en");
  const [selectedCrop, setSelectedCrop]     = useState("All");
  const [selectedMarket, setSelectedMarket] = useState("All");
  const [search, setSearch]                 = useState("");

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

  const cropLabel = (crop: string) =>
    lang === "chi" ? (cropNameChi[crop] || crop) : crop;

  return (
    <main style={{ background: C.bg, minHeight: "100vh", fontFamily: "sans-serif" }}>

      <style>{`
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 16px;
        }
        .filters-row { display: flex; flex-wrap: wrap; gap: 12px; }
        .nav-subtitle { display: block; }
        @media (max-width: 600px) {
          .cards-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
          .filters-row { flex-direction: column; }
          .filters-row input, .filters-row select, .filters-row button {
            width: 100% !important; font-size: 16px !important; padding: 12px !important;
          }
          .hero-title { font-size: 22px !important; }
          .hero-sub { font-size: 13px !important; }
          .card-price { font-size: 18px !important; }
          .nav-subtitle { display: none; }
          .stat-value { font-size: 20px !important; }
        }
        @media (max-width: 380px) {
          .cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Navbar */}
      <nav style={{
        background: C.green, padding: "0 16px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", height: "60px",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%",
            border: "2px solid #FF8F00", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#FF8F00", fontWeight: 800, fontSize: "18px", fontFamily: "serif" }}>A</span>
          </div>
          <span style={{ color: C.white, fontWeight: 700, fontSize: "17px" }}>
            AgroPrice <span style={{ color: C.amber }}>Malawi</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="nav-subtitle" style={{
            background: C.amber, color: C.dark,
            fontSize: "11px", fontWeight: 600,
            padding: "4px 10px", borderRadius: "20px",
          }}>
            {t.updatedDaily}
          </span>
          <button
            onClick={() => setLang(lang === "en" ? "chi" : "en")}
            style={{
              background: lang === "chi" ? C.amber : "rgba(255,255,255,0.15)",
              color: lang === "chi" ? C.dark : C.white,
              border: "1.5px solid rgba(255,255,255,0.4)",
              borderRadius: "20px", padding: "6px 14px",
              fontSize: "13px", fontWeight: 700, cursor: "pointer",
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
        position: "relative", padding: "48px 20px 56px", textAlign: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(27,94,32,0.55) 0%, rgba(0,0,0,0.40) 100%)",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-block", background: C.amber, color: C.dark,
            fontSize: "11px", fontWeight: 700, padding: "4px 14px",
            borderRadius: "20px", marginBottom: "12px",
          }}>
            🇲🇼 {t.tagline}
          </div>
          <h1 className="hero-title" style={{ color: C.white, fontSize: "28px", fontWeight: 800, margin: "0 0 10px", lineHeight: 1.2 }}>
            {t.hero}
          </h1>
          <p className="hero-sub" style={{ color: "#C8E6C9", fontSize: "15px", margin: "0 auto", maxWidth: "480px", lineHeight: 1.6 }}>
            {t.sub}
          </p>
        </div>
      </div>

      {/* Stat bar */}
      <div style={{
        background: C.dark, padding: "12px 20px",
        display: "flex", justifyContent: "center", gap: "28px", flexWrap: "wrap",
      }}>
        {[
          { label: t.markets, value: markets.length },
          { label: t.cropsTracked, value: crops.length },
          { label: t.entries, value: prices.length },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div className="stat-value" style={{ color: C.amber, fontWeight: 700, fontSize: "22px" }}>{stat.value}</div>
            <div style={{ color: "#aaa", fontSize: "11px" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ background: C.white, borderBottom: "1px solid #ddd", padding: "14px 16px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div className="filters-row">
            <input
              type="text" placeholder={t.searchPlaceholder}
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ ...sel, flex: 1, minWidth: "160px" }}
            />
            <select value={selectedCrop} onChange={e => setSelectedCrop(e.target.value)} style={sel}>
              <option value="All">{t.allCrops}</option>
              {crops.map(c => (
                <option key={c} value={c}>{cropEmoji[c] || "🌿"} {cropLabel(c)}</option>
              ))}
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
      </div>

      {/* Count */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "12px 16px 4px", fontSize: "13px", color: "#555" }}>
        {t.showing} <strong>{filtered.length}</strong> {filtered.length !== 1 ? t.prices : t.price}
      </div>

      {/* Cards */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "8px 16px 48px" }}>
        {filtered.length === 0
          ? <div style={{ textAlign: "center", padding: "48px", color: "#888" }}>{t.noResults}</div>
          : <div className="cards-grid">
              {filtered.map(item => {
                const trend = trendIcon(item.trend);
                return (
                  <div key={item.id} style={{
                    background: C.white, borderRadius: "12px",
                    border: "1px solid #dde8dd", overflow: "hidden",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.07)",
                  }}>

                    {/* Crop visual */}
                    <div style={{
                      position: "relative", height: "110px", overflow: "hidden",
                      background: cropBg[item.crop] || "linear-gradient(135deg, #E8F5E9, #C8E6C9)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontSize: "64px", lineHeight: 1, position: "absolute", zIndex: 1 }}>
                        {cropEmoji[item.crop] || "🌿"}
                      </span>
                      <img
                        src={cropImages[item.crop]}
                        alt={item.crop}
                        style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, zIndex: 2 }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                      <span style={{
                        position: "absolute", top: "6px", right: "6px", zIndex: 3,
                        background: C.amber, color: C.dark,
                        fontSize: "9px", fontWeight: 700,
                        padding: "2px 7px", borderRadius: "20px",
                      }}>
                        {item.unit}
                      </span>
                    </div>

                    {/* Card header */}
                    <div style={{
                      background: C.green, padding: "7px 12px",
                      display: "flex", alignItems: "center", gap: "5px",
                    }}>
                      <span style={{ fontSize: "13px" }}>{cropEmoji[item.crop] || "🌿"}</span>
                      <span style={{ color: C.white, fontWeight: 700, fontSize: "13px" }}>
                        {cropLabel(item.crop)}
                      </span>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: "12px" }}>
                      <div className="card-price" style={{ fontSize: "20px", fontWeight: 800, color: C.green, marginBottom: "4px" }}>
                        MWK {item.price.toLocaleString()}
                        <span style={{ fontSize: "15px", marginLeft: "4px", color: trend.color }}>{trend.symbol}</span>
                      </div>
                      <div style={{ fontSize: "12px", color: "#555", marginBottom: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
                        <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 0C2.24 0 0 2.24 0 5C0 8.75 5 13 5 13C5 13 10 8.75 10 5C10 2.24 7.76 0 5 0ZM5 6.5C4.17 6.5 3.5 5.83 3.5 5C3.5 4.17 4.17 3.5 5 3.5C5.83 3.5 6.5 4.17 6.5 5C6.5 5.83 5.83 6.5 5 6.5Z" fill="#1B5E20"/>
                        </svg>
                        <span>{item.market}</span>
                      </div>
                      <div style={{ fontSize: "10px", color: "#999", borderTop: "1px solid #f0f0f0", paddingTop: "6px" }}>
                        {t.updatedLabel} {item.updated}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
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