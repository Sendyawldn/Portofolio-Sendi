import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// ── ReactBits Components ──
import Aurora from "./components/ReactBits/Aurora";
import SplashCursor from "./components/ReactBits/SplashCursor";
import SplitText from "./components/ReactBits/SplitText";
import BlurText from "./components/ReactBits/BlurText";
import ShinyText from "./components/ReactBits/ShinyText";
import CountUp from "./components/ReactBits/CountUp";
import AnimatedContent from "./components/ReactBits/AnimatedContent";
import Magnet from "./components/ReactBits/Magnet";
import TiltedCard from "./components/ReactBits/TiltedCard";
import StarBorder from "./components/ReactBits/StarBorder";
import CircularText from "./components/ReactBits/CircularText";
import Lanyard from "./components/ReactBits/Lanyard";
import imgProfil from "./assets/profile-sendi.webp"; // <--- Sesuaikan nama filenya

// ── Data ──
const NAV_LINKS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "Tentang" },
  { id: "skills", label: "Skill" },
  { id: "experience", label: "Pengalaman" },
  { id: "projects", label: "Proyek" },
  { id: "contact", label: "Kontak" },
];

const SKILLS = [
  { name: "React.js", icon: "fab fa-react", color: "#61DAFB", bg: "#0d1b2a" },
  { name: "Laravel", icon: "fab fa-laravel", color: "#FF2D20", bg: "#1a0a09" },
  {
    name: "Tailwind",
    icon: "fab fa-css3-alt",
    color: "#06B6D4",
    bg: "#061a1e",
  },
  { name: "Python", icon: "fab fa-python", color: "#F7D94C", bg: "#1a1600" },
  { name: "ML / AI", icon: "fas fa-brain", color: "#A78BFA", bg: "#130d1f" },
  { name: "Docker", icon: "fab fa-docker", color: "#2496ED", bg: "#051523" },
  {
    name: "Git/GitHub",
    icon: "fab fa-github",
    color: "#ffffff",
    bg: "#101010",
  },
  {
    name: "Database",
    icon: "fas fa-database",
    color: "#10B981",
    bg: "#071510",
  },
];

const PROJECTS = [
  {
    title: "Decentralized Digital Credential",
    cat: "Web3 & Blockchain",
    desc: "Platform identitas digital desentralisasi menggunakan Soulbound Tokens (SBTs) di jaringan Polygon. Smart contract untuk sertifikasi tamper-proof.",
    tags: ["Polygon", "Web3", "Solidity"],
    icon: "⛓️",
    accent: "#6366f1",
    grad: "linear-gradient(135deg, #1a1340 0%, #0d0825 100%)",
  },
  {
    title: "Proposal Inovasi GEMASTIK",
    cat: "GEMASTIK 2025",
    desc: "Proyek kolaborasi tim kampus UBSI untuk kompetisi GEMASTIK 2025, menggabungkan solusi perangkat lunak dengan kebutuhan industri.",
    tags: ["Teamwork", "Software Dev", "Innovation"],
    icon: "🏆",
    accent: "#22d3ee",
    grad: "linear-gradient(135deg, #051820 0%, #020c10 100%)",
  },
  {
    title: "XAUUSD AI Trading Bot",
    cat: "AI & Finance",
    desc: "Riset dan pengembangan bot trading otomatis menggunakan Machine Learning untuk memprediksi pergerakan pasar emas (XAUUSD).",
    tags: ["Python", "ML", "Finance"],
    icon: "📈",
    accent: "#10b981",
    grad: "linear-gradient(135deg, #051510 0%, #020a08 100%)",
  },
  {
    title: "Sistem Informasi Desa Tlajung Udik",
    cat: "WEB DEVELOPMENT",
    desc: "Platform digital terintegrasi untuk mendigitalkan administrasi desa, transparansi program kerja LPM, dan portal informasi warga.",
    icon: "🏘️",
    accent: "#10b981" /* Emerald Green */,
    grad: "linear-gradient(180deg, rgba(16,185,129,0.1), transparent)",
    tags: ["Laravel", "Tailwind CSS", "MySQL"],
  },
  {
    title: "XAUUSD & Crypto Tracker Dashboard",
    cat: "DATA VISUALIZATION",
    desc: "Aplikasi web responsif untuk memantau pergerakan harga emas (XAUUSD) dan aset kripto secara real-time menggunakan integrasi Public API.",
    icon: "📈",
    accent: "#f59e0b" /* Amber Gold */,
    grad: "linear-gradient(180deg, rgba(245,158,11,0.1), transparent)",
    tags: ["React.js", "REST API", "Chart.js"],
  },
];

const TIMELINE = [
  {
    title: "Internship",
    company: "PT Teng Fei Energy Technology",
    period: "Baru-baru ini",
    desc: "Membantu pengelolaan operasional dan mempelajari sistem teknologi perusahaan energi. Berkontribusi dalam pembuatan dokumentasi sejarah perusahaan.",
    color: "#6366f1",
  },
  {
    title: "GEMASTIK 2025",
    company: "Kolaborasi Tim Kampus UBSI",
    period: "2025",
    desc: "Menyiapkan proposal inovasi proyek untuk kompetisi GEMASTIK 2025, menggabungkan solusi perangkat lunak dengan kebutuhan industri terkini.",
    color: "#22d3ee",
  },
  {
    title: "Anggota LPM Desa",
    company: "Desa Tlajung Udik",
    period: "2024 – Sekarang",
    desc: "Berkontribusi aktif dalam merencanakan program desa dan menyusun draf proposal kegiatan untuk mendukung pemberdayaan warga lokal.",
    color: "#10b981",
  },
  {
    title: "Freelance Web Developer",
    company: "Klien UMKM Lokal",
    period: "2023 – 2024",
    desc: "Membangun website company profile yang responsif dan merancang antarmuka sistem kasir sederhana untuk membantu proses digitalisasi bisnis kecil.",
    color: "#f59e0b", // Amber / Kuning
  },
  {
    title: "Peserta IT Bootcamp",
    company: "Frontend & Web3 Development",
    period: "2023",
    desc: "Mengikuti pelatihan intensif pengembangan web modern menggunakan React, Tailwind CSS, serta pengenalan dasar-dasar ekosistem Web3 dan Blockchain.",
    color: "#ec4899", // Pink
  },
];

const MARQUEE_ITEMS = [
  "React.js",
  "Tailwind CSS",
  "Laravel",
  "Python",
  "Machine Learning",
  "Docker",
  "Git/GitHub",
  "Data Mining",
  "Forex Trading",
  "AI Engineering",
  "Web3",
  "Next.js",
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [typing, setTyping] = useState("");
  const [activeSection, setActiveSection] = useState("hero");

  // ── Loading ──
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(t);
  }, []);

  // ── Typing effect ──
  useEffect(() => {
    const words = ["Web Developer", "AI Engineer", "Forex Trader"];
    let wi = 0,
      ci = 0,
      del = false;
    let timer;
    const tick = () => {
      const w = words[wi];
      setTyping(del ? w.slice(0, ci - 1) : w.slice(0, ci + 1));
      del ? ci-- : ci++;
      let speed = del ? 50 : 120;
      if (!del && ci === w.length) {
        speed = 2200;
        del = true;
      } else if (del && ci === 0) {
        del = false;
        wi = (wi + 1) % words.length;
        speed = 400;
      }
      timer = setTimeout(tick, speed);
    };
    const start = setTimeout(tick, 2500);
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, []);

  // ── Scroll spy ──
  useEffect(() => {
    const onScroll = () => {
      const sections = NAV_LINKS.map((l) =>
        document.getElementById(l.id),
      ).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].getBoundingClientRect().top <= 100) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Smooth scroll ──
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // Ref untuk menangkap elemen pembungkus proyek
  const scrollRef = React.useRef(null);

  // Logic untuk Drag-to-Scroll
  const handleMouseDown = (e) => {
    const slider = scrollRef.current;
    slider.isDown = true;
    slider.classList.add("active");
    slider.startX = e.pageX - slider.offsetLeft;
    slider.scrollLeftStart = slider.scrollLeft;
    slider.style.cursor = "grabbing"; // Ubah kursor jadi tangan mengepal
  };

  const handleMouseLeave = () => {
    const slider = scrollRef.current;
    slider.isDown = false;
    slider.style.cursor = "grab";
  };

  const handleMouseUp = () => {
    const slider = scrollRef.current;
    slider.isDown = false;
    slider.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    const slider = scrollRef.current;
    if (!slider.isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - slider.startX) * 2; // Kecepatan geser (angka 2 bisa diubah)
    slider.scrollLeft = slider.scrollLeftStart - walk;
  };

  return (
    <div
      style={{
        backgroundColor: "#020510",
        minHeight: "100vh",
        color: "#e2e8f0",
        fontFamily: "'Syne','Inter',sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* ── SplashCursor (ReactBits) ── */}
      <SplashCursor color="99, 102, 241" />

      {/* ── Loading Screen ── */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "#020510",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
            }}
          >
            <svg style={{ width: 96, height: 96 }} viewBox="0 0 96 96">
              <circle
                cx="48"
                cy="48"
                r="42"
                fill="none"
                stroke="rgba(99,102,241,0.1)"
                strokeWidth="2"
              />
              <motion.circle
                cx="48"
                cy="48"
                r="42"
                fill="none"
                stroke="url(#lg)"
                strokeWidth="2"
                strokeDasharray="264"
                strokeLinecap="round"
                animate={{ strokeDashoffset: [264, 0, 264] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <defs>
                <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
            <ShinyText
              text="MEMUAT PORTOFOLIO..."
              speed={2}
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                fontFamily: "monospace",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Progress Bar ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          zIndex: 100,
        }}
      >
        <motion.div
          style={{
            height: "100%",
            background: "linear-gradient(90deg,#6366f1,#22d3ee,#f472b6)",
            transformOrigin: "left",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
        />
      </div>

      {/* ═══════════ NAVBAR ═══════════ */}
      <header
        style={{
          position: "fixed",
          top: 16,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
          padding: "0 16px",
        }}
      >
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: loading ? 2.5 : 0.3, duration: 0.6 }}
          style={{
            width: "100%",
            maxWidth: 900,
            background: "rgba(2,5,16,0.85)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(99,102,241,0.15)",
            borderRadius: 20,
            padding: "12px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: -1,
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg,#818cf8,#22d3ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ZEN
            </span>
            <span style={{ color: "#bf00f0" }}>.</span>
          </button>

          {/* Links */}
          <ul
            style={{
              display: "flex",
              gap: 28,
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="hidden-mobile"
          >
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => scrollTo(l.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    color: activeSection === l.id ? "#818cf8" : "#64748b",
                    transition: "color 0.3s",
                    position: "relative",
                    padding: "4px 0",
                  }}
                >
                  {l.label}
                  {activeSection === l.id && (
                    <motion.div
                      layoutId="nav-indicator"
                      style={{
                        position: "absolute",
                        bottom: -4,
                        left: 0,
                        right: 0,
                        height: 1,
                        background: "linear-gradient(90deg,#6366f1,#22d3ee)",
                        boxShadow: "0 0 8px #6366f1",
                      }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "#64748b",
              cursor: "pointer",
              fontSize: 18,
            }}
            className="show-mobile"
          >
            <i className={menuOpen ? "fas fa-times" : "fas fa-bars"} />
          </button>
        </motion.nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                position: "absolute",
                top: 70,
                width: "90%",
                maxWidth: 400,
                background: "rgba(2,5,16,0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              {NAV_LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(l.id)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: "14px 24px",
                    color: "#94a3b8",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: 14,
                    borderBottom: "1px solid rgba(99,102,241,0.05)",
                  }}
                >
                  {l.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ═══════════════════════════════════════
            HERO — Aurora + SplitText + Lanyard
        ═══════════════════════════════════════ */}
        <section
          id="hero"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            position: "relative",
            overflow: "visible",
            padding: "80px 24px 0",
          }}
        >
          {/* Aurora Background (ReactBits) */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <Aurora
              colorStops={["#1a0a40", "#6366f1", "#0a2040"]}
              amplitude={0.8}
              speed={0.4}
              blend={0.4}
            />
          </div>

          {/* Grid overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              pointerEvents: "none",
              backgroundImage:
                "linear-gradient(rgba(99,102,241,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.04) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div
            style={{
              maxWidth: 1280,
              width: "100%",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0,
              alignItems: "center",
              position: "relative",
              zIndex: 10,
              overflow: "visible",
            }}
          >
            {/* Kiri */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                paddingBottom: 48,
              }}
            >
              {/* Badge — Modern Status Pill */}
              <AnimatedContent delay={0.1}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "6px 16px",
                    borderRadius: 999,
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(12px)",
                    width: "fit-content",
                  }}
                >
                  {/* Titik hijau dengan soft pulse */}
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#10db77",
                        zIndex: 2,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        background: "rgba(16,219,119,0.3)",
                        animation: "pulse 2s infinite",
                      }}
                    />
                  </div>

                  {/* Teks rapi non-monospace */}
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#e2e8f0",
                      letterSpacing: "0.03em",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Open to Internship
                  </span>
                </div>
              </AnimatedContent>

              {/* Nama — Animasi Custom Framer Motion */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span className="hero-name-line">Sendi</span>
                <span className="hero-name-line">Awaludin</span>
              </motion.div>

              {/* Typing role */}
              <AnimatedContent delay={0.8}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "monospace",
                    fontSize: 18,
                    height: 32,
                  }}
                >
                  <span style={{ color: "#6366f1" }}>&lt;</span>
                  <span style={{ color: "white" }}>{typing}</span>
                  <span
                    style={{
                      width: 2,
                      height: 22,
                      background: "#6366f1",
                      animation: "pulse 1s infinite",
                    }}
                  />
                  <span style={{ color: "#6366f1" }}>/&gt;</span>
                </div>
              </AnimatedContent>

              {/* Desc — BlurText (ReactBits) */}
              <AnimatedContent delay={1.0}>
                <BlurText
                  text="Mahasiswa Teknik Informatika asal Gunung Putri yang antusias dengan Web Development, AI Engineering, dan eksplorasi pasar finansial."
                  animateBy="words"
                  direction="bottom"
                  stepDelay={60}
                  duration={0.5}
                  style={{
                    color: "#64748b",
                    fontSize: 15,
                    lineHeight: 1.7,
                    maxWidth: 480,
                  }}
                />
              </AnimatedContent>

              {/* CTA Buttons — StarBorder + Magnet (ReactBits) */}
              <AnimatedContent delay={1.2}>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <Magnet magnetStrength={0.3}>
                    <StarBorder
                      as="a"
                      href="#projects"
                      color="#6366f1"
                      speed="3s"
                    >
                      <i className="fas fa-rocket" style={{ fontSize: 12 }} />{" "}
                      Lihat Proyek
                    </StarBorder>
                  </Magnet>
                  <Magnet magnetStrength={0.3}>
                    <StarBorder
                      as="a"
                      href="#contact"
                      color="#22d3ee"
                      speed="4s"
                    >
                      <i
                        className="fas fa-paper-plane"
                        style={{ fontSize: 12 }}
                      />{" "}
                      Hubungi Saya
                    </StarBorder>
                  </Magnet>
                </div>
              </AnimatedContent>

              {/* Holographic Status Badge */}
              <AnimatedContent delay={1.4}>
                <div
                  style={{
                    background: "rgba(8,14,35,0.6)",
                    backdropFilter: "blur(24px)",
                    border: "1px solid rgba(99,102,241,0.2)",
                    borderRadius: 16,
                    padding: "20px",
                    width: "fit-content",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  {/* Efek Cahaya Latar */}
                  <div
                    style={{
                      position: "absolute",
                      top: -20,
                      left: -20,
                      width: 80,
                      height: 80,
                      background: "rgba(34,211,238,0.2)",
                      filter: "blur(30px)",
                      borderRadius: "50%",
                    }}
                  />

                  {/* Avatar / Ikon Identitas */}
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #6366f1, #22d3ee)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      color: "white",
                      boxShadow: "0 8px 16px rgba(99,102,241,0.3)",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    <i className="fas fa-user-astronaut"></i>
                  </div>

                  {/* Teks Status */}
                  <div style={{ position: "relative", zIndex: 2 }}>
                    <h4
                      style={{
                        color: "white",
                        fontSize: 14,
                        fontWeight: 700,
                        margin: "0 0 4px 0",
                      }}
                    >
                      Sendi Awaludin
                    </h4>
                    <p
                      style={{
                        color: "#94a3b8",
                        fontSize: 12,
                        margin: 0,
                        fontFamily: "monospace",
                      }}
                    >
                      <span style={{ color: "#22d3ee" }}>Exploring:</span> Web3
                      & AI
                    </p>
                    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                      <span
                        style={{
                          fontSize: 10,
                          padding: "2px 8px",
                          borderRadius: 12,
                          background: "rgba(16,185,129,0.1)",
                          color: "#10b981",
                          border: "1px solid rgba(16,185,129,0.2)",
                        }}
                      >
                        Available for work
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedContent>
            </div>

            {/* Kanan — Lanyard ── */}
            <div
              style={{
                height: 700,
                position: "relative",
                overflow: "visible",
                zIndex: 50,
              }}
            >
              <Lanyard gravity={[0, -20, 0]} />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            STATS — CountUp (ReactBits)
        ═══════════════════════════════════════ */}
        <section
          id="stats"
          style={{ padding: "60px 24px", position: "relative", zIndex: 10 }}
        >
          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 24,
            }}
          >
            {[
              {
                num: 5,
                suffix: "+",
                label: "Total Proyek",
                sub: "Web, AI & Trading Bot",
                color: "#818cf8",
              },
              {
                num: 3,
                suffix: "+",
                label: "Sertifikat & Lomba",
                sub: "GEMASTIK & IT Bootcamp",
                color: "#22d3ee",
              },
              {
                num: 100,
                suffix: "%",
                label: "Semangat Ngulik",
                sub: "Dari Code hingga XAUUSD",
                color: "#10b981",
              },
            ].map((s, i) => (
              <AnimatedContent key={i} delay={i * 0.1} threshold={0.2}>
                <TiltedCard rotateAmplitude={8} scaleOnHover={1.03}>
                  <div
                    style={{
                      background: "rgba(8,14,35,0.85)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(99,102,241,0.1)",
                      borderRadius: 20,
                      padding: "32px 24px",
                      textAlign: "center",
                      borderTop: `2px solid ${s.color}`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 52,
                        fontWeight: 900,
                        color: s.color,
                        textShadow: `0 0 30px ${s.color}80`,
                        lineHeight: 1,
                      }}
                    >
                      <CountUp to={s.num} duration={2.5} />
                      {s.suffix}
                    </div>
                    <p
                      style={{
                        fontWeight: 700,
                        color: "white",
                        fontSize: 13,
                        marginTop: 8,
                      }}
                    >
                      {s.label}
                    </p>
                    <p style={{ color: "#475569", fontSize: 11, marginTop: 4 }}>
                      {s.sub}
                    </p>
                  </div>
                </TiltedCard>
              </AnimatedContent>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════
            MARQUEE — InfiniteScroll teknik
        ═══════════════════════════════════════ */}
        <div
          style={{
            overflow: "hidden",
            padding: "16px 0",
            background: "rgba(99,102,241,0.05)",
            borderTop: "1px solid rgba(99,102,241,0.1)",
            borderBottom: "1px solid rgba(99,102,241,0.1)",
          }}
        >
          <motion.div
            style={{ display: "flex", width: "max-content" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#6366f1",
                    padding: "0 28px",
                    whiteSpace: "nowrap",
                    transition: "color 0.3s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#22d3ee")}
                  onMouseLeave={(e) => (e.target.style.color = "#6366f1")}
                >
                  {item}
                </span>
                <span style={{ color: "#1e293b" }}>◆</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════
            ABOUT
        ═══════════════════════════════════════ */}
        <section
          id="about"
          style={{ padding: "100px 24px", position: "relative", zIndex: 10 }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            {/* Kiri: foto placeholder */}
            <AnimatedContent direction="horizontal" distance={-60}>
              <TiltedCard rotateAmplitude={6} scaleOnHover={1.02}>
                <div
                  style={{
                    background: "rgba(8,14,35,0.85)",
                    border: "1px solid rgba(99,102,241,0.1)",
                    borderRadius: 24,
                    height: 460,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Foto Asli */}
                  <img
                    src={imgProfil}
                    alt="Sendi Awaludin"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      inset: 0,
                    }}
                  />

                  {/* Efek gelap di bagian bawah foto agar menyatu */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, #020510, transparent 40%)",
                    }}
                  />

                  {/* Badge floating */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 24,
                      right: 24,
                      background: "rgba(8,14,35,0.9)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(34,211,238,0.3)",
                      borderRadius: 12,
                      padding: "8px 16px",
                      fontFamily: "monospace",
                      fontSize: 11,
                    }}
                  >
                    <span style={{ color: "#475569" }}>status: </span>
                    <span style={{ color: "#22d3ee" }}>available ✓</span>
                  </div>
                </div>
              </TiltedCard>
            </AnimatedContent>

            {/* Kanan: teks */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <AnimatedContent delay={0.1}>
                <div>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 11,
                      color: "#6366f1",
                      letterSpacing: "0.15em",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 24,
                        height: 1,
                        background: "#6366f1",
                      }}
                    />{" "}
                    ABOUT_ME.JS
                  </span>
                  <SplitText
                    text="Tentang Saya"
                    className="section-title-text"
                    delay={40}
                    duration={0.5}
                    from={{ opacity: 0, y: 30 }}
                    to={{ opacity: 1, y: 0 }}
                    splitBy="characters"
                    textAlign="left"
                  />
                </div>
              </AnimatedContent>
              <AnimatedContent delay={0.2}>
                <p style={{ color: "#64748b", lineHeight: 1.8, fontSize: 14 }}>
                  Saya adalah mahasiswa Teknologi Informasi di Gunung Putri.
                  Ketertarikan saya pada teknologi dan data mendorong saya untuk
                  menggabungkan keduanya dalam memecahkan masalah kompleks.
                </p>
                <p
                  style={{
                    color: "#64748b",
                    lineHeight: 1.8,
                    fontSize: 14,
                    marginTop: 12,
                  }}
                >
                  Selain membangun aplikasi web modern, saya antusias mengulik{" "}
                  <span style={{ color: "#818cf8" }}>Machine Learning</span> dan{" "}
                  <span style={{ color: "#22d3ee" }}>Data Mining</span>. Di
                  waktu luang saya aktif mempelajari pergerakan pasar XAUUSD.
                </p>
              </AnimatedContent>
              {/* Quick Facts / Latar Belakang */}
              <AnimatedContent delay={0.3}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                    marginTop: 8,
                  }}
                >
                  {[
                    { icon: "🎓", text: "Mahasiswa IT UBSI", color: "#6366f1" },
                    {
                      icon: "📍",
                      text: "Gunung Putri, Jawa Barat",
                      color: "#22d3ee",
                    },
                    { icon: "📈", text: "XAUUSD Analyst", color: "#f59e0b" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "6px 14px",
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 600,
                        background: `rgba(255,255,255,0.03)`,
                        border: `1px solid ${item.color}40`,
                        color: "#e2e8f0",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      <span style={{ fontSize: 14 }}>{item.icon}</span>
                      <span style={{ color: item.color }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </AnimatedContent>
              <AnimatedContent delay={0.4}>
                <Magnet magnetStrength={0.25}>
                  <StarBorder as="a" href="#" color="#6366f1" speed="3s">
                    <i className="fas fa-download" style={{ fontSize: 11 }} />{" "}
                    Unduh CV
                  </StarBorder>
                </Magnet>
              </AnimatedContent>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SKILLS — Magnet orbs (ReactBits)
        ═══════════════════════════════════════ */}
        <section
          id="skills"
          style={{ padding: "100px 24px", position: "relative", zIndex: 10 }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <AnimatedContent className="text-center-block">
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  color: "#6366f1",
                  letterSpacing: "0.15em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 24,
                    height: 1,
                    background: "#6366f1",
                  }}
                />{" "}
                TECH_STACK.EXE
              </span>
              <SplitText
                text="Technical Mastery"
                className="section-title-text"
                style={{ textAlign: "center" }}
                delay={40}
                duration={0.5}
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                splitBy="characters"
                textAlign="center"
              />
            </AnimatedContent>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 24,
                marginTop: 48,
                marginBottom: 48,
              }}
            >
              {SKILLS.map((sk, i) => (
                <AnimatedContent key={i} delay={i * 0.07} threshold={0.1}>
                  <Magnet magnetStrength={0.4} padding={30}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 10,
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          width: 72,
                          height: 72,
                          borderRadius: "50%",
                          background: sk.bg,
                          border: `1px solid ${sk.color}30`,
                          transition: "all 0.3s",
                          boxShadow: `0 8px 24px ${sk.color}40`,
                          position: "relative",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = `0 12px 36px ${sk.color}70`;
                          e.currentTarget.style.transform =
                            "translateY(-6px) scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = `0 8px 24px ${sk.color}40`;
                          e.currentTarget.style.transform = "";
                        }}
                      >
                        <i
                          className={sk.icon}
                          style={{
                            fontSize: 28,
                            color: sk.color,
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          color: "#475569",
                          fontFamily: "monospace",
                        }}
                      >
                        {sk.name}
                      </span>
                    </div>
                  </Magnet>
                </AnimatedContent>
              ))}
              {/* Pembungkus Soft Skills - Jarak Didekatkan & Garis Dihapus */}
              <div style={{ marginTop: 24 }}>
                <AnimatedContent className="text-center-block">
                  <h3
                    style={{
                      color: "white",
                      fontSize: 28,
                      fontWeight: 800,
                      textAlign: "center",
                      marginBottom: 32 /* Jarak bawah judul juga dirapatkan */,
                    }}
                  >
                    Soft Skills
                  </h3>
                </AnimatedContent>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 20,
                  }}
                >
                  {[
                    {
                      name: "Kepemimpinan",
                      icon: "fas fa-users-cog",
                      color: "#f59e0b",
                      desc: "Pengalaman memimpin organisasi & masyarakat desa",
                    },
                    {
                      name: "Komunikasi",
                      icon: "fas fa-comments",
                      color: "#3b82f6",
                      desc: "Penyusunan draf proposal & presentasi ide program",
                    },
                    {
                      name: "Manajemen Waktu",
                      icon: "fas fa-clock",
                      color: "#8b5cf6",
                      desc: "Disiplin tinggi mengatur jadwal, rutinitas & pola hidup",
                    },
                    {
                      name: "Kerja Sama Tim",
                      icon: "fas fa-hands-helping",
                      color: "#10b981",
                      desc: "Kolaborasi efektif dalam proyek kelompok & organisasi",
                    },
                    {
                      name: "Problem Solving",
                      icon: "fas fa-lightbulb",
                      color: "#eab308",
                      desc: "Pendekatan logis untuk mencari solusi sistem & algoritma",
                    },
                  ].map((skill, i) => (
                    <AnimatedContent
                      key={`soft-${i}`}
                      delay={i * 0.1}
                      threshold={0.1}
                    >
                      <div
                        style={{
                          background: "rgba(15, 23, 42, 0.6)",
                          backdropFilter: "blur(12px)",
                          border: `1px solid ${skill.color}30`,
                          borderRadius: 16,
                          padding: "20px 24px",
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                          width: 310,
                          transition: "all 0.3s",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-4px)";
                          e.currentTarget.style.borderColor = skill.color;
                          e.currentTarget.style.boxShadow = `0 8px 24px ${skill.color}40`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.borderColor = `${skill.color}30`;
                          e.currentTarget.style.boxShadow =
                            "0 4px 12px rgba(0,0,0,0.2)";
                        }}
                      >
                        <div
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 12,
                            background: `${skill.color}15`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: skill.color,
                            fontSize: 20,
                            flexShrink: 0,
                          }}
                        >
                          <i className={skill.icon} />
                        </div>
                        <div>
                          <h4
                            style={{
                              color: "white",
                              fontSize: 15,
                              fontWeight: 700,
                              margin: "0 0 4px 0",
                            }}
                          >
                            {skill.name}
                          </h4>
                          <p
                            style={{
                              color: "#94a3b8",
                              fontSize: 12,
                              margin: 0,
                              lineHeight: 1.4,
                            }}
                          >
                            {skill.desc}
                          </p>
                        </div>
                      </div>
                    </AnimatedContent>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            EXPERIENCE — AnimatedContent timeline
        ═══════════════════════════════════════ */}
        <section
          id="experience"
          style={{ padding: "50px 24px", position: "relative", zIndex: 10 }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <AnimatedContent style={{ textAlign: "center", marginBottom: 64 }}>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  color: "#6366f1",
                  letterSpacing: "0.15em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 24,
                    height: 1,
                    background: "#6366f1",
                  }}
                />{" "}
                EXPERIENCE.LOG
              </span>
              <SplitText
                text="Perjalanan Karir"
                className="section-title-text"
                delay={40}
                duration={0.5}
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                splitBy="characters"
                textAlign="center"
              />
            </AnimatedContent>

            <div
              className="custom-scroll"
              style={{
                marginTop: 60,
                maxHeight: 560 /* Tinggi maksimal, pas untuk menampilkan ~3 kartu */,
                overflowY:
                  "auto" /* Memunculkan scroll ke bawah jika item lebih dari 3 */,
                overflowX: "hidden",
                paddingRight: 16 /* Memberi jarak agar kartu tidak menabrak scrollbar */,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              <div style={{ position: "relative", paddingLeft: 32 }}>
                {/* Timeline line */}
                <div
                  style={{
                    position: "absolute",
                    left: 8,
                    top: 0,
                    bottom: 0,
                    width: 1,
                    background:
                      "linear-gradient(to bottom, transparent, #6366f1, #22d3ee, transparent)",
                    boxShadow: "0 0 10px rgba(99,102,241,0.4)",
                  }}
                />

                {TIMELINE.map((item, i) => (
                  <AnimatedContent
                    key={i}
                    delay={i * 0.15}
                    direction="horizontal"
                    distance={40}
                  >
                    <div style={{ position: "relative", marginBottom: 40 }}>
                      {/* Dot */}
                      <div
                        style={{
                          position: "absolute",
                          left: -28,
                          top: 24,
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          background: "#020510",
                          border: `2px solid ${item.color}`,
                          boxShadow: `0 0 16px ${item.color}80`,
                          transition: "transform 0.3s",
                        }}
                      />
                      <TiltedCard rotateAmplitude={4} scaleOnHover={1.02}>
                        <div
                          style={{
                            background: "rgba(8,14,35,0.85)",
                            backdropFilter: "blur(20px)",
                            border: `1px solid ${item.color}20`,
                            borderLeft: `3px solid ${item.color}`,
                            borderRadius: 16,
                            padding: "20px 24px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              marginBottom: 8,
                            }}
                          >
                            <h3
                              style={{
                                fontWeight: 800,
                                color: "white",
                                fontSize: 17,
                                margin: 0,
                              }}
                            >
                              {item.title}
                            </h3>
                            <span
                              style={{
                                fontSize: 11,
                                fontFamily: "monospace",
                                color: item.color,
                                background: `${item.color}15`,
                                padding: "2px 10px",
                                borderRadius: 999,
                                border: `1px solid ${item.color}30`,
                                whiteSpace: "nowrap",
                                marginLeft: 8,
                              }}
                            >
                              {item.period}
                            </span>
                          </div>
                          <p
                            style={{
                              color: item.color,
                              fontSize: 12,
                              fontWeight: 600,
                              marginBottom: 8,
                              margin: "0 0 8px",
                            }}
                          >
                            {item.company}
                          </p>
                          <p
                            style={{
                              color: "#64748b",
                              fontSize: 13,
                              lineHeight: 1.7,
                              margin: 0,
                            }}
                          >
                            {item.desc}
                          </p>
                        </div>
                      </TiltedCard>
                    </div>
                  </AnimatedContent>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            PROJECTS — TiltedCard (ReactBits)
        ═══════════════════════════════════════ */}
        <section
          id="projects"
          style={{ padding: "100px 24px", position: "relative", zIndex: 10 }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <AnimatedContent style={{ textAlign: "center", marginBottom: 64 }}>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  color: "#6366f1",
                  letterSpacing: "0.15em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 24,
                    height: 1,
                    background: "#6366f1",
                  }}
                />{" "}
                PROJECTS.CONFIG.JS
              </span>
              <SplitText
                text="Proyek & Eksperimen"
                className="section-title-text"
                delay={40}
                duration={0.5}
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                splitBy="characters"
                textAlign="center"
              />
            </AnimatedContent>

            <div
              ref={scrollRef} // <--- Pasang Ref di sini
              className="custom-scroll"
              onMouseDown={handleMouseDown} // <--- Event klik ditekan
              onMouseLeave={handleMouseLeave} // <--- Event kursor keluar area
              onMouseUp={handleMouseUp} // <--- Event klik dilepas
              onMouseMove={handleMouseMove} // <--- Event kursor digeser
              style={{
                display: "flex",
                gap: 24,
                overflowX: "auto",
                overflowY: "hidden",
                padding: "20px 10px 40px",
                scrollBehavior: "auto", // Ubah ke 'auto' agar tarikan terasa instan/real-time
                scrollSnapType: "none", // Matikan sementara snap agar tarikan tidak kaku
                cursor: "grab", // Kursor jadi bentuk tangan mengajak narik
                userSelect: "none", // Agar teks tidak ikut terblok saat ditarik
                WebkitOverflowScrolling: "touch",
              }}
            >
              {PROJECTS.map((p, i) => (
                <div
                  key={i}
                  style={{ flex: "0 0 340px", scrollSnapAlign: "start" }}
                >
                  <AnimatedContent delay={i * 0.12} threshold={0.1}>
                    <TiltedCard
                      rotateAmplitude={10}
                      scaleOnHover={1.04}
                      showGlare
                    >
                      <div
                        style={{
                          background: "rgba(8,14,35,0.9)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(99,102,241,0.1)",
                          borderRadius: 20,
                          overflow: "hidden",
                          cursor: "pointer",
                          height: "100%" /* Pastikan tinggi kartu seragam */,
                        }}
                      >
                        {/* Top accent */}
                        <div
                          style={{
                            height: 2,
                            background: `linear-gradient(90deg, ${p.accent}, transparent)`,
                          }}
                        />
                        {/* Header */}
                        <div
                          style={{
                            padding: "28px 24px 20px",
                            background: p.grad,
                          }}
                        >
                          <div style={{ fontSize: 36, marginBottom: 8 }}>
                            {p.icon}
                          </div>
                          <span
                            style={{
                              fontSize: 10,
                              fontFamily: "monospace",
                              color: p.accent,
                              fontWeight: 700,
                              letterSpacing: "0.1em",
                            }}
                          >
                            {p.cat}
                          </span>
                        </div>
                        {/* Body */}
                        <div style={{ padding: "20px 24px 24px" }}>
                          <h3
                            style={{
                              fontWeight: 800,
                              color: "white",
                              fontSize: 15,
                              marginBottom: 10,
                            }}
                          >
                            {p.title}
                          </h3>
                          <p
                            style={{
                              color: "#475569",
                              fontSize: 12,
                              lineHeight: 1.7,
                              marginBottom: 16,
                              minHeight: 56,
                            }}
                          >
                            {p.desc}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 6,
                            }}
                          >
                            {p.tags.map((tag) => (
                              <span
                                key={tag}
                                style={{
                                  padding: "3px 10px",
                                  borderRadius: 6,
                                  fontSize: 10,
                                  fontFamily: "monospace",
                                  background: `${p.accent}15`,
                                  color: p.accent,
                                  border: `1px solid ${p.accent}30`,
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TiltedCard>
                  </AnimatedContent>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            CONTACT
        ═══════════════════════════════════════ */}
        <section
          id="contact"
          style={{ padding: "100px 24px", position: "relative", zIndex: 10 }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
            }}
          >
            {/* Kiri */}
            <AnimatedContent direction="horizontal" distance={-60}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 11,
                      color: "#6366f1",
                      letterSpacing: "0.15em",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 24,
                        height: 1,
                        background: "#6366f1",
                      }}
                    />{" "}
                    CONTACT.FORM.JS
                  </span>
                  <SplitText
                    text="Mari Terhubung"
                    className="section-title-text"
                    delay={40}
                    duration={0.5}
                    from={{ opacity: 0, y: 30 }}
                    to={{ opacity: 1, y: 0 }}
                    splitBy="characters"
                    textAlign="left"
                  />
                </div>
                <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.8 }}>
                  Punya pertanyaan, tawaran proyek, atau sekadar ingin diskusi
                  soal Web Dev dan market XAUUSD? Jangan ragu untuk menghubungi!
                </p>
                {[
                  {
                    icon: "✉️",
                    text: "sendiawaludin@gmail.com",
                    href: "mailto:sendiawaludin@gmail.com",
                  },
                  {
                    icon: "💻",
                    text: "github.com/Sendyawldn",
                    href: "https://github.com/Sendyawldn",
                  },
                  { icon: "📍", text: "Gunung Putri, Jawa Barat" },
                ].map((c, i) =>
                  c.href ? (
                    <a
                      key={i}
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        color: "#64748b",
                        textDecoration: "none",
                        fontSize: 13,
                        transition: "all 0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#818cf8")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#64748b")
                      }
                    >
                      {c.icon} {c.text}
                    </a>
                  ) : (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        color: "#64748b",
                        fontSize: 13,
                      }}
                    >
                      {c.icon} {c.text}
                    </div>
                  ),
                )}

                {/* CircularText */}
                <div style={{ marginTop: 16 }}>
                  <CircularText
                    text="LET'S WORK TOGETHER • GET IN TOUCH • "
                    spinDuration={18}
                    radius={55}
                    fontSize={10}
                    className="circular-text-contact"
                  />
                </div>
              </div>
            </AnimatedContent>

            {/* Kanan: form */}
            <AnimatedContent direction="horizontal" distance={60} delay={0.1}>
              <TiltedCard rotateAmplitude={3} showGlare>
                <form
                  action="https://api.web3forms.com/submit"
                  method="POST"
                  style={{
                    background: "rgba(8,14,35,0.9)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(99,102,241,0.15)",
                    borderRadius: 20,
                    padding: "36px 32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  <input
                    type="hidden"
                    name="access_key"
                    value="YOUR_ACCESS_KEY"
                  />
                  {[
                    {
                      label: "Nama Lengkap",
                      name: "name",
                      type: "text",
                      placeholder: "Masukkan nama lengkap...",
                    },
                    {
                      label: "Alamat Email",
                      name: "email",
                      type: "email",
                      placeholder: "Masukkan email...",
                    },
                  ].map((f) => (
                    <div key={f.name}>
                      <label
                        style={{
                          display: "block",
                          fontSize: 11,
                          fontFamily: "monospace",
                          color: "#6366f1",
                          marginBottom: 8,
                        }}
                      >
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        name={f.name}
                        required
                        placeholder={f.placeholder}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          background: "rgba(2,5,16,0.8)",
                          border: "1px solid rgba(99,102,241,0.15)",
                          borderRadius: 10,
                          color: "white",
                          fontSize: 13,
                          outline: "none",
                          transition: "border-color 0.3s, box-shadow 0.3s",
                          boxSizing: "border-box",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#6366f1";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(99,102,241,0.15)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(99,102,241,0.15)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  ))}
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 11,
                        fontFamily: "monospace",
                        color: "#6366f1",
                        marginBottom: 8,
                      }}
                    >
                      Pesan Anda
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Halo Zen, saya ingin..."
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        background: "rgba(2,5,16,0.8)",
                        border: "1px solid rgba(99,102,241,0.15)",
                        borderRadius: 10,
                        color: "white",
                        fontSize: 13,
                        outline: "none",
                        resize: "vertical",
                        transition: "border-color 0.3s, box-shadow 0.3s",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#6366f1";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(99,102,241,0.15)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(99,102,241,0.15)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <Magnet magnetStrength={0.2}>
                    <StarBorder
                      as="button"
                      type="submit"
                      color="#6366f1"
                      speed="3s"
                      style={{ width: "100%" }}
                    >
                      <i
                        className="fas fa-paper-plane"
                        style={{ fontSize: 11 }}
                      />{" "}
                      Kirim Pesan
                    </StarBorder>
                  </Magnet>
                </form>
              </TiltedCard>
            </AnimatedContent>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid rgba(99,102,241,0.1)",
          background: "rgba(2,5,16,0.9)",
          padding: "32px 24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 12,
          position: "relative",
          zIndex: 10,
        }}
      >
        <ShinyText
          text="ZEN."
          speed={4}
          style={{ fontSize: 24, fontWeight: 900, letterSpacing: 1 }}
        />
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "#1e293b",
            margin: 0,
          }}
        >
          © 2026 <span style={{ color: "#6366f1" }}>Sendi Awaludin</span> —
          Built with React + ReactBits
        </p>
      </footer>

      {/* ── Inline global CSS ── */}
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        .hero-name-line {
          font-size: clamp(48px, 8vw, 88px);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -2px;
          background: linear-gradient(135deg, #ffffff 0%, #818cf8 40%, #22d3ee 80%, #ffffff 100%);
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shineText 8s linear infinite;
        }
          /* ── Invisible Scroll untuk Timeline ── */
        .custom-scroll {
          -ms-overflow-style: none;  /* Sembunyikan di Internet Explorer / Edge */
          scrollbar-width: none;  /* Sembunyikan di Firefox */
        }
        .custom-scroll::-webkit-scrollbar {
          display: none; /* Sembunyikan di Chrome, Safari, dan Opera */
        }
        @keyframes shineText { to { background-position: 300% center; } }
        .section-title-text {
          font-size: clamp(28px, 4vw, 52px);
          font-weight: 800;
          line-height: 1.1;
          background: linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .circular-text-contact { color: #475569; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          section > div { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}
