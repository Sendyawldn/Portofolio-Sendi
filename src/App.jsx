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
  { id: "about", label: "Tentang Saya" },
  { id: "skills", label: "Skill" },
  { id: "experience", label: "Pengalaman" },
  { id: "projects", label: "Proyek" },
  { id: "certificates", label: "Sertifikat" },
  { id: "contact", label: "Kontak" },
];

const SVG_ICONS = {
  typescript: (
    <svg viewBox="0 0 24 24" style={{ width: 28, height: 28 }}>
      <path
        fill="#007ACC"
        d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"
      />
    </svg>
  ),
  go: (
    <svg viewBox="0 0 24 24" style={{ width: 28, height: 28 }}>
      <path
        fill="#00ADD8"
        d="M1.811 10.231c-.047 0-.058-.023-.035-.059l.246-.315c.023-.035.081-.058.128-.058h4.172c.046 0 .058.035.035.07l-.199.303c-.023.036-.082.07-.117.07zM.047 11.306c-.047 0-.059-.023-.035-.058l.245-.316c.023-.035.082-.058.129-.058h5.328c.047 0 .058.035.035.07l-.093.28c-.023.047-.082.07-.117.07zm2.828 1.075c-.047 0-.059-.035-.035-.07l.163-.292c.023-.035.07-.07.117-.07h2.337c.047 0 .07.035.07.082l-.023.28c0 .047-.047.082-.082.082zm12.129-2.36c-.736.187-1.239.327-1.963.514-.176.046-.187.058-.34-.117-.174-.199-.303-.327-.548-.444-.737-.362-1.45-.257-2.115.175-.795.514-1.204 1.274-1.192 2.22.011.935.654 1.706 1.577 1.835.795.105 1.46-.175 1.987-.77.105-.129.198-.269.315-.432H10.47c-.245 0-.304-.152-.222-.35.152-.362.432-.966.596-1.274a.315.315 0 0 1 .292-.187h4.253c-.023.316-.023.631-.07.947a4.983 4.983 0 0 1-.958 2.29c-.841 1.11-1.94 1.8-3.33 1.986-1.145.152-2.209-.07-3.143-.77-.865-.655-1.356-1.52-1.484-2.595-.152-1.274.222-2.419.993-3.424.83-1.086 1.928-1.776 3.272-2.02 1.098-.2 2.15-.07 3.096.571.62.41 1.063.97 1.356 1.648.07.105.023.164-.117.2zm3.868 6.461c-1.064-.024-2.034-.328-2.852-1.029a3.665 3.665 0 0 1-1.262-2.255c-.21-1.32.152-2.489.947-3.529.853-1.122 1.881-1.706 3.272-1.95 1.192-.21 2.314-.095 3.33.595.923.63 1.496 1.484 1.648 2.605.198 1.578-.257 2.863-1.344 3.962-.771.783-1.718 1.273-2.805 1.495-.315.06-.631.07-.934.106zm2.78-4.72c-.011-.153-.011-.27-.034-.387-.21-1.157-1.274-1.81-2.384-1.554-1.087.245-1.788 1.11-1.847 2.197-.047.959.56 1.926 1.536 2.243.993.328 2.02-.104 2.466-1.075.176-.385.246-.785.262-1.424z"
      />
    </svg>
  ),
  nestjs: (
    <svg viewBox="0 0 24 24" style={{ width: 28, height: 28 }}>
      <path
        fill="#E0234E"
        d="M14.131.047c-.173 0-.334.02-.492.047v.004c.142.03.284.06.417.1 1.71.497 2.516 2.1 3.196 3.598.148.323.295.65.459.965.08.154.166.307.26.453.07.108.143.218.22.32a5.4 5.4 0 0 0 .94 1.051c.35.288.75.525 1.211.656.47.133.98.15 1.506.046a.888.888 0 0 0 .02-.003c.02-.004.04-.008.06-.01.02-.003.04-.006.06-.007.06-.004.12-.003.182.004a.627.627 0 0 1 .12.026.328.328 0 0 1 .119.066.21.21 0 0 1 .057.094.158.158 0 0 1-.014.12.27.27 0 0 1-.08.093 1.4 1.4 0 0 1-.247.14 3.04 3.04 0 0 1-.44.152 5.56 5.56 0 0 1-.62.117 7.39 7.39 0 0 1-.817.055 9.4 9.4 0 0 1-1.031-.041 11.49 11.49 0 0 1-1.258-.21 13.55 13.55 0 0 1-1.498-.493 15.63 15.63 0 0 1-1.751-.864 17.7 17.7 0 0 1-2.017-1.35 19.74 19.74 0 0 1-2.295-2.01 21.8 21.8 0 0 1-2.585-3.357C6.1 2.682 5.8 2.153 5.535 1.63c-.133-.266-.26-.534-.382-.803-.06-.135-.12-.27-.178-.407L4.93.31A10.67 10.67 0 0 0 4.6 0h9.531zm-3.39 11.87c.02 0 .04.002.057.006l.008.002.035.01.003.001a.52.52 0 0 1 .067.026.33.33 0 0 1 .052.033.16.16 0 0 1 .035.042.1.1 0 0 1 .008.052.13.13 0 0 1-.04.083.34.34 0 0 1-.096.065 1.17 1.17 0 0 1-.168.06 2.43 2.43 0 0 1-.241.046 3.6 3.6 0 0 1-.315.021 4.8 4.8 0 0 1-.399-.016 6.14 6.14 0 0 1-.487-.08 7.6 7.6 0 0 1-.578-.19 9.1 9.1 0 0 1-.676-.353 10.6 10.6 0 0 1-.782-.601 12.12 12.12 0 0 1-.893-.972 14.15 14.15 0 0 1-1.007-1.558 16.2 16.2 0 0 1-1.122-2.503C4.72 6.84 4.523 6.1 4.37 5.36c-.077-.37-.143-.742-.198-1.114a10.38 10.38 0 0 1-.095-1.1c0-.18.005-.363.015-.545.01-.17.025-.342.048-.513.01-.08.024-.16.038-.24.013-.066.027-.133.044-.198A2.26 2.26 0 0 1 4.3 1.4c.028-.073.06-.144.097-.214.031-.06.066-.12.104-.178.032-.049.066-.097.103-.143.032-.041.065-.08.1-.119.03-.034.06-.067.092-.098.027-.028.055-.054.084-.079.025-.021.05-.041.077-.06.02-.015.04-.029.062-.042.017-.01.035-.02.053-.028.014-.006.03-.012.045-.017.012-.004.025-.007.038-.009A.267.267 0 0 1 5.4.43a.2.2 0 0 1 .073.013.15.15 0 0 1 .055.038.11.11 0 0 1 .025.059.09.09 0 0 1-.01.062.15.15 0 0 1-.047.053.4.4 0 0 1-.09.044 1.1 1.1 0 0 1-.134.038 2.25 2.25 0 0 1-.183.031 3.6 3.6 0 0 1-.24.02 5.15 5.15 0 0 1-.307.005c-.112 0-.228-.007-.348-.02"
      />
    </svg>
  ),
  nextjs: (
    <svg viewBox="0 0 24 24" style={{ width: 28, height: 28 }}>
      <path
        fill="#ffffff"
        d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.499-.054z"
      />
    </svg>
  ),
  postgresql: (
    <svg viewBox="0 0 24 24" style={{ width: 28, height: 28 }}>
      <path
        fill="#4169E1"
        d="M17.128 0a10.134 10.134 0 0 0-2.755.403 11.34 11.34 0 0 0-.073-.056C12.946.05 11.5 0 10.163 0 7.42 0 4.432.517 2.367 1.876 1.2 2.653.496 3.699.21 4.861c-.474 1.928.244 4.763 1.992 6.602.422.44.895.793 1.413 1.055.13 1.29.652 2.054 1.847 2.614.142.065.29.124.44.179-.318.208-.63.423-.936.623-.652.42-1.25.81-1.74 1.124-.91.585-1.634 1.74-1.752 2.791-.093.828.2 1.599.832 2.17.931.836 2.397 1.068 3.655 1.068.897 0 1.72-.125 2.346-.29l.14-.038c.02.396-.006.764-.063 1.117a.297.297 0 0 0-.006.061c0 .975.224 1.733.667 2.254.437.513 1.071.78 1.837.78.866 0 1.782-.286 2.551-.67.69-.349 1.343-.816 1.885-1.27.016.01.032.021.047.029l.021.012c.584.319 1.22.481 1.784.481.67 0 1.266-.218 1.648-.699.22-.279.35-.618.42-1.002.196-.027.397-.063.6-.111 1.15-.273 2.104-.939 2.485-2.104.14-.426.17-.864.1-1.294.23-.12.444-.26.637-.422 1.12-.93 1.734-2.39 1.395-3.585-.278-1.01-.916-1.538-1.772-1.76a4.034 4.034 0 0 0-.955-.111c-.068 0-.137.004-.206.007a6.263 6.263 0 0 0-.056-.146c-.345-.83-.94-1.338-1.664-1.509a2.834 2.834 0 0 0-.644-.07c-.127 0-.25.01-.369.025l-.006-.012c-.128-.264-.267-.521-.416-.768.097-.048.19-.1.279-.158 1.09-.706 1.707-1.709 1.707-2.79 0-.53-.154-1.072-.45-1.567a3.66 3.66 0 0 0-.044-.07c.044-.077.08-.157.108-.24.162-.46.17-.955.07-1.42C19.9.44 18.67 0 17.128 0z"
      />
    </svg>
  ),
  prisma: (
    <svg viewBox="0 0 24 24" style={{ width: 28, height: 28 }}>
      <path
        fill="#2D3748"
        d="M21.807 18.285L13.553.756a1.324 1.324 0 0 0-1.129-.755 1.322 1.322 0 0 0-1.205.633L2.313 15.321a1.325 1.325 0 0 0 .027 1.442l4.684 6.938c.307.455.838.701 1.38.636l12.086-1.608a1.324 1.324 0 0 0 1.317-1.105 1.326 1.326 0 0 0 0-.339zm-1.886.996-10.952 1.457-4.249-6.295 7.742-12.992z"
      />
    </svg>
  ),
  vercel: (
    <svg viewBox="0 0 24 24" style={{ width: 28, height: 28 }}>
      <path fill="#ffffff" d="M24 22.525H0l12-21.05z" />
    </svg>
  ),
  nginx: (
    <svg viewBox="0 0 24 24" style={{ width: 28, height: 28 }}>
      <path
        fill="#009639"
        d="M12 0L1.605 6v12L12 24l10.395-6V6zm-1.201 16.801c-2.4 0-4.201-1.2-4.201-3.601h2.4c0 .9.6 1.501 1.8 1.501 1.2 0 1.8-.6 1.8-1.801V7.2h2.4v5.7c0 2.4-1.799 3.901-4.199 3.901z"
      />
    </svg>
  ),
};

const SKILLS = [
  // Languages
  // { name: "TypeScript", svgKey: "typescript", color: "#007ACC", bg: "#05101a" },
  { name: "JavaScript", icon: "fab fa-js", color: "#F7DF1E", bg: "#1a1800" },
  // { name: "Go", svgKey: "go", color: "#00ADD8", bg: "#001a1f" },
  { name: "PHP", icon: "fab fa-php", color: "#777BB4", bg: "#0f0e1a" },
  { name: "Python", icon: "fab fa-python", color: "#F7D94C", bg: "#1a1600" },
  { name: "HTML", icon: "fab fa-html5", color: "#E34F26", bg: "#1a0800" },

  // Backend
  // { name: "NestJS", svgKey: "nestjs", color: "#E0234E", bg: "#1a0009" },
  { name: "Laravel", icon: "fab fa-laravel", color: "#FF2D20", bg: "#1a0a09" },
  { name: "Node.js", icon: "fab fa-node-js", color: "#339933", bg: "#071a07" },
  // { name: "Express", icon: "fab fa-node-js", color: "#ffffff", bg: "#101010" },

  // Frontend
  { name: "Next.js", svgKey: "nextjs", color: "#ffffff", bg: "#101010" },
  { name: "React.js", icon: "fab fa-react", color: "#61DAFB", bg: "#0d1b2a" },
  // { name: "Vue.js", icon: "fab fa-vuejs", color: "#4FC08D", bg: "#071a10" },
  {
    name: "Tailwind",
    icon: "fab fa-css3-alt",
    color: "#06B6D4",
    bg: "#061a1e",
  },

  // Database
  // { name: "PostgreSQL", svgKey: "postgresql", color: "#4169E1", bg: "#05081a" },
  { name: "MySQL", icon: "fas fa-database", color: "#4479A1", bg: "#05101a" },
  // { name: "Prisma", svgKey: "prisma", color: "#a0aec0", bg: "#0a0c10" },
  // { name: "MongoDB", icon: "fas fa-leaf", color: "#47A248", bg: "#071a08" },

  // DevOps & Tools
  { name: "Docker", icon: "fab fa-docker", color: "#2496ED", bg: "#051523" },
  { name: "Git", icon: "fab fa-git-alt", color: "#F05032", bg: "#1a0a07" },

  // Cloud
  { name: "Vercel", svgKey: "vercel", color: "#ffffff", bg: "#101010" },
  // { name: "Nginx", svgKey: "nginx", color: "#009639", bg: "#001a0a" },
];

const PROJECTS = [
  {
    title: "JastipKu — Platform Jasa Titip",
    cat: "WEB DEVELOPMENT",
    desc: "Platform peer-to-peer jasa titip yang menghubungkan penitip dan traveler. Fitur autentikasi, manajemen pesanan, sistem pencarian, dan dashboard untuk traveler & customer. Juara 3 IT Bootcamp + HKI.",
    tags: ["Laravel", "Tailwind CSS", "MySQL"],
    icon: "🛍️",
    accent: "#6366f1",
    grad: "linear-gradient(135deg, #1a1340 0%, #0d0825 100%)",
    image: ["/jastipku.png"],
    github: "https://github.com/Sendyawldn/jastipku.git",
  },
  {
    title: "Money Tracking App",
    cat: "MOBILE DEVELOPMENT",
    desc: "Aplikasi Flutter cross-platform untuk mencatat keuangan pribadi. Dilengkapi kalender interaktif, laporan grafik mingguan/bulanan per kategori, autentikasi Firebase dengan Google Sign-In, dan penyimpanan lokal SQLite + Cloud Firestore.",
    tags: ["Flutter", "Firebase", "Dart", "SQLite"],
    icon: "💰",
    accent: "#10b981",
    grad: "linear-gradient(135deg, #051510 0%, #020a08 100%)",
    image: ["/money-tracking.png"],
    github: "https://github.com/Sendyawldn/money-tracking.git",
  },
  {
    title: "Jakarta Scooter Shop — E-Commerce",
    cat: "FULL STACK DEVELOPMENT",
    desc: "Platform e-commerce sparepart Vespa production-ready yang sudah live. Backend NestJS dengan payment gateway Midtrans & Xendit, manajemen pengiriman, integrasi akuntansi Accurate, cloud storage Cloudinary, dan Redis queue. Frontend Next.js dengan admin panel terpisah.",
    tags: ["NestJS", "Next.js", "PostgreSQL", "Prisma", "Redis", "Docker"],
    icon: "🛵",
    accent: "#f59e0b",
    grad: "linear-gradient(135deg, #1a1200 0%, #0a0800 100%)",
    image: ["/vespa.png"],
    github: "https://github.com/Sendyawldn/EcomerceVespa.git",
    demo: "https://jakartascootershop.com/",
  },
  {
    title: "Combro Fishing — Landing Page",
    cat: "WEB DEVELOPMENT",
    desc: "Website profil tempat pemancingan ikan mas Combro Fishing. Menampilkan informasi lokasi, daftar harga kolam, event & kompetisi memancing, serta halaman kontak dengan integrasi WhatsApp langsung. Responsive dan deploy di Vercel.",
    tags: ["HTML", "CSS", "JavaScript"],
    icon: "🎣",
    accent: "#22d3ee",
    grad: "linear-gradient(135deg, #051820 0%, #020c10 100%)",
    image: ["/combrofishing.png"],
    github: "https://github.com/Sendyawldn/Combro-Fishing.git",
    demo: "https://combrofishing.vercel.app/",
  },
  {
    title: "VeritasID — Digital Credential Platform",
    cat: "WEB3 & BLOCKCHAIN",
    desc: "Platform kredensial digital terdesentralisasi berbasis blockchain untuk GEMASTIK 2025. Institusi dapat menerbitkan sertifikat sebagai Soulbound NFT (ERC721) di Polygon. Fitur: Web3Auth login, IPFS metadata storage via Pinata, generate sertifikat otomatis, sistem billing kredit Xendit, 3 role (Holder/Issuer/Admin), dan public verification tanpa login.",
    tags: [
      "Solidity",
      "Polygon",
      "NestJS",
      "Next.js",
      "IPFS",
      "Web3Auth",
      "Docker",
    ],
    icon: "⛓️",
    accent: "#6366f1",
    grad: "linear-gradient(135deg, #1a1340 0%, #0d0825 100%)",
    image: ["/veritasid.png"],
    github: "https://github.com/Sendyawldn/digital-credential-platform.git",
    demo: "https://digital-credential-platform.vercel.app/",
  },
  {
    title: "System Admin Billiard",
    cat: "WEB DEVELOPMENT",
    desc: "Sistem manajemen kasir berbasis web untuk bisnis billiard. Fitur tracking status meja real-time, pencatatan transaksi per sesi, order makanan & minuman, manajemen produk & stok, analytics dashboard dengan grafik penjualan harian/mingguan/bulanan, serta cetak laporan transaksi.",
    tags: ["Laravel", "MySQL", "Tailwind CSS", "Alpine.js"],
    icon: "🎱",
    accent: "#8b5cf6",
    grad: "linear-gradient(135deg, #110a2a 0%, #080514 100%)",
    image: ["/billiard.png"],
    github: "https://github.com/Sendyawldn/billiard.git",
  },
  {
    title: "Kasir D'Krispy — Sistem POS Restoran",
    cat: "WEB DEVELOPMENT",
    desc: "Aplikasi Point of Sale (POS) berbasis web native PHP untuk restoran D'Krispy. Fitur manajemen menu & kategori dengan upload foto, sistem order & item pesanan, proses pembayaran dengan QRIS, laporan keuangan, manajemen user/pelayan, serta dashboard dengan grafik penjualan per menu menggunakan chart interaktif.",
    tags: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    icon: "🍗",
    accent: "#f97316",
    grad: "linear-gradient(135deg, #1a0a00 0%, #0d0500 100%)",
    image: ["/dkrispy.png"],
    github: "https://github.com/Sendyawldn/Kasir-dkrispy.git",
  },
];

const CERTIFICATES = [
  {
    title: "HKI — Aplikasi Jastip Berbasis Web",
    issuer: "Kementerian Hukum RI",
    year: "2025",
    image: "/sertifikat/1.png",
    accent: "#f59e0b",
    icon: "⚖️",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    year: "2025",
    image: "/sertifikat/2.png",
    accent: "#22d3ee",
    icon: "🔐",
  },
  {
    title: "PCAP: Programming Essentials in Python",
    issuer: "OpenEDG Python Institute",
    year: "2024",
    image: "/sertifikat/3.png",
    accent: "#3b82f6",
    icon: "🐍",
  },
  {
    title: "IT Bootcamp — Software Development for Industry",
    issuer:
      "Universitas Bina Sarana Informatika (Fakultas Teknik & Informatika)",
    year: "2025",
    image: "/sertifikat/10.png",
    accent: "#2563eb",
    icon: "💻",
  },
  {
    title: "Mahir Membuat Website dengan Laravel 9",
    issuer: "Coding Studio",
    year: "2025",
    image: "/sertifikat/4.png",
    accent: "#f472b6",
    icon: "🎓",
  },
  {
    title: "Fundamental Front-End Web Development I",
    issuer: "Coding Studio",
    year: "2023",
    image: "/sertifikat/5.png",
    accent: "#06b6d4",
    icon: "💻",
  },
  {
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    year: "2025",
    image: "/sertifikat/6.png",
    accent: "#6366f1",
    icon: "🌐",
  },
  {
    title: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    year: "2025",
    image: "/sertifikat/7.png",
    accent: "#6366f1",
    icon: "⚡",
  },
  {
    title: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    year: "2026",
    image: "/sertifikat/8.png",
    accent: "#10b981",
    icon: "🤖",
  },
  {
    title: "Financial Literacy 101",
    issuer: "Dicoding Indonesia",
    year: "2025",
    image: "/sertifikat/9.png",
    accent: "#8b5cf6",
    icon: "💰",
  },
];

const TIMELINE = [
  {
    title: "Mahasiswa IT",
    company: "Universitas Bina Sarana Informatika (UBSI)",
    period: "2023 – Sekarang",
    desc: "Berfokus pada pengembangan web dan mobile application dengan pendekatan problem solving dan clean code. Terbiasa membangun sistem CRUD, autentikasi, serta perancangan database relational menggunakan Laravel, JavaScript, dan Kotlin.",
    color: "#818cf8",
  },
  {
    title: "Software Developer — Proyek Akademik",
    company: "Universitas Bina Sarana Informatika (UBSI)",
    period: "2023 – Sekarang",
    desc: "Selalu dipercaya memegang peran Software Developer dalam setiap proyek kelompok perkuliahan. Bertanggung jawab penuh dalam mentransformasikan konsep menjadi produk digital, mulai dari perancangan database, integrasi logika bisnis backend menggunakan Laravel, hingga implementasi antarmuka modern yang responsif.",
    color: "#818cf8",
  },
  {
    title: "Juara 3 – IT Bootcamp sebagai Software Developer",
    company: "Universitas Bina Sarana Informatika (UBSI)",
    period: "2025",
    desc: "Mengikuti bootcamp intensif pengembangan perangkat lunak berbasis industri. Mengembangkan website Jasa Titip (Jastip) menggunakan Laravel dengan fitur autentikasi, manajemen produk, sistem pemesanan, dan pengelolaan database terstruktur. Project berhasil meraih Juara 3 dan memperoleh Hak Kekayaan Intelektual (HKI).",
    color: "#f59e0b",
  },
  {
    title: "Frontend Developer – E-Commerce Project",
    company: "Jakarta Scooter Shop",
    period: "2025",
    desc: "Berkontribusi sebagai Frontend Developer dalam pengembangan website e-commerce. Bertanggung jawab pada implementasi tampilan produk, sistem pagination, integrasi API, serta optimalisasi UI agar responsif dan user-friendly. Proyek telah live dan digunakan secara aktif oleh client.",
    color: "#22d3ee",
  },
  {
    title: "GEMASTIK 2025",
    company: "Kolaborasi Tim Kampus UBSI",
    period: "2025",
    desc: "Mengembangkan platform kredensial digital terdesentralisasi menggunakan Soulbound Tokens (SBTs) di jaringan Polygon sebagai inovasi untuk kompetisi GEMASTIK 2025. Sistem memungkinkan penerbitan sertifikat tamper-proof berbasis blockchain yang tidak dapat dipindahtangankan.",
    color: "#22d3ee",
  },
];

const MARQUEE_ITEMS = [
  "TypeScript",
  "JavaScript",
  "Go",
  "PHP",
  "SQL",
  "NestJS",
  "Laravel",
  "Node.js",
  "Express",
  "Next.js",
  "React",
  "Vue.js",
  "TailwindCSS",
  "Shadcn/ui",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Prisma",
  "MongoDB",
  "Docker",
  "Git",
  "Postman",
  "Vercel",
  "Nginx",
  "Web3",
];

function ExpandableDesc({ desc, accent }) {
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      setClamped(
        textRef.current.scrollHeight > textRef.current.clientHeight + 2,
      );
    }
  }, [desc]);

  return (
    <div style={{ position: "relative", marginBottom: 8, flex: 1 }}>
      <div
        ref={textRef}
        style={{
          color: "#475569",
          fontSize: 12,
          lineHeight: 1.7,
          maxHeight: expanded ? 200 : 62,
          overflowY: expanded ? "auto" : "hidden",
          transition: "max-height 0.3s ease",
          cursor: expanded ? "auto" : "pointer",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingRight: expanded ? 4 : 0,
        }}
        onClick={() => !expanded && setExpanded(true)}
      >
        {desc}
      </div>

      {/* Blur fade effect bawah kalau belum expand */}
      {!expanded && clamped && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 32,
            background:
              "linear-gradient(to top, rgba(8,14,35,0.95) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Hint klik */}
      {!expanded && clamped && (
        <div
          style={{
            fontSize: 10,
            color: accent,
            fontFamily: "monospace",
            marginTop: 4,
            cursor: "pointer",
            opacity: 0.7,
          }}
          onClick={() => setExpanded(true)}
        >
          selengkapnya ▾
        </div>
      )}

      {/* Collapse button */}
      {expanded && (
        <div
          style={{
            fontSize: 10,
            color: accent,
            fontFamily: "monospace",
            marginTop: 4,
            cursor: "pointer",
            opacity: 0.7,
          }}
          onClick={() => setExpanded(false)}
        >
          tutup ▴
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState("spinning");
  const [menuOpen, setMenuOpen] = useState(false);
  const [typing, setTyping] = useState("");
  const [activeSection, setActiveSection] = useState("hero");
  const [activeDot, setActiveDot] = useState(0);
  const [activeCertDot, setActiveCertDot] = useState(0);
  const [selectedCert, setSelectedCert] = useState(null);
  const certScrollRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // ── Loading Progress Logic ──
  useEffect(() => {
    // 1. Fase Spinner (Muter) - Cukup 1.5 detik
    if (phase === "spinning") {
      const timer = setTimeout(() => {
        setPhase("welcome");
      }, 1000);
      return () => clearTimeout(timer);
    }

    // 2. Fase Welcome - Tampilkan teks lalu MATIKAN loading
    if (phase === "welcome") {
      const timer = setTimeout(() => {
        setLoading(false); // INI YANG MENGHENTIKAN LOADING
      }, 2500); // Sesuaikan durasi teks welcome di sini
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // ── Typing effect ──
  useEffect(() => {
    const words = [
      "Fullstack Developer",
      "Backend & Frontend Specialist",
      "IT Enthusiast",
      "AI Engineer",
      "Building Scalable web Apps",
      "Always Learning New Tech",
    ];
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
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="global-loader" // Key unik wajib ada
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }} // Efek menghilang halus
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "#020510",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AnimatePresence mode="wait">
              {phase === "spinning" ? (
                <motion.div
                  key="spinner-fase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Spinner SVG */}
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    style={{ animation: "spin 1s linear infinite" }}
                  >
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      stroke="rgba(99, 102, 241, 0.2)"
                      strokeWidth="4"
                    />
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="4"
                      strokeDasharray="31.4 31.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.div>
              ) : (
                // Di dalam AnimatePresence loading screen
                <motion.div
                  key="welcome-fase"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  style={{
                    width: "100%", // Tambahkan lebar penuh
                    padding: "0 20px", // Beri ruang di sisi kiri-kanan agar tidak mentok layar
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <BlurText
                    text="WELCOME TO MY JOURNEY"
                    animateBy="words" // Ubah ke 'words' agar pemotongan kata lebih alami di mobile
                    direction="top"
                    stepDelay={50}
                    style={{
                      fontSize: "clamp(1.2rem, 5vw, 2.5rem)", // Gunakan unit rem agar lebih responsif
                      fontWeight: 800,
                      color: "white",
                      letterSpacing: "0.15em",
                      textAlign: "center",
                      lineHeight: "1.2", // Atur jarak antar baris agar tidak tumpang tindih jika terpaksa turun
                      width: "100%",
                      maxWidth: "800px",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
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
            className="hero-container"
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
              className="hero-text-content"
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
                  text="Mahasiswa Teknik Informatika Semester 6 yang berfokus pada pengembangan web dan teknologi modern. Berpengalaman membangun berbagai aplikasi seperti E-commerce dan platform jasa menggunakan Laravel, JavaScript, dan framework modern lainnya. Terbiasa bekerja dalam tim serta memiliki ketertarikan tinggi untuk terus belajar dan mengembangkan solusi digital yang efisien dan scalable."
                  animateBy="words"
                  direction="bottom"
                  stepDelay={50}
                  duration={0.4}
                  style={{
                    color: "#64748b",
                    fontSize: 15,
                    lineHeight: 1.8,
                    maxWidth: 580, // Sedikit diperlebar agar teks panjang tidak terlalu menumpuk ke bawah
                    textAlign: "justify",
                  }}
                />
              </AnimatedContent>

              {/* CTA Buttons — StarBorder + Magnet (ReactBits) */}
              <AnimatedContent delay={1.2}>
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <Magnet magnetStrength={0.3}>
                    <StarBorder
                      as="a"
                      href="#projects"
                      color="#6366f1"
                      speed="3s"
                    >
                      <i className="fas fa-rocket" style={{ fontSize: 12 }} />{" "}
                      Lihat Karya
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

                  {/* GitHub — Glass + Glow */}
                  <Magnet magnetStrength={0.3}>
                    <a
                      href="https://github.com/Sendyawldn"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 18px",
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.05)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "white",
                        fontSize: 13,
                        fontWeight: 600,
                        textDecoration: "none",
                        boxShadow:
                          "0 0 16px rgba(99,102,241,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(99,102,241,0.15)";
                        e.currentTarget.style.borderColor =
                          "rgba(99,102,241,0.5)";
                        e.currentTarget.style.boxShadow =
                          "0 0 28px rgba(99,102,241,0.5), inset 0 1px 0 rgba(255,255,255,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.05)";
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.12)";
                        e.currentTarget.style.boxShadow =
                          "0 0 16px rgba(99,102,241,0.25), inset 0 1px 0 rgba(255,255,255,0.08)";
                      }}
                    >
                      {/* GitHub SVG */}
                      <svg
                        viewBox="0 0 24 24"
                        fill="white"
                        style={{ width: 16, height: 16, flexShrink: 0 }}
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  </Magnet>
                </div>
              </AnimatedContent>
              {/* STATS — CountUp */}
              <AnimatedContent delay={1.4}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: 12,
                    alignItems: "stretch", // 1. Pastikan grid meregangkan itemnya
                  }}
                >
                  {[
                    {
                      num: 7,
                      suffix: "+",
                      label: "Total Proyek",
                      sub: "Website & Aplikasi Mobile",
                      color: "#818cf8",
                    },
                    {
                      num: 10,
                      suffix: "+",
                      label: "Sertifikat",
                      sub: "HKI & Pelatihan Online",
                      color: "#22d3ee",
                    },
                    {
                      num: 100,
                      suffix: "%",
                      label: "Semangat Ngulik",
                      sub: "Semua teknologi baru",
                      color: "#10b981",
                    },
                  ].map((s, i) => (
                    <AnimatedContent
                      key={i}
                      delay={i * 0.1}
                      threshold={0.2}
                      style={{ height: "100%" }} // 2. Tambahkan height 100% di sini
                    >
                      <TiltedCard
                        rotateAmplitude={8}
                        scaleOnHover={1.03}
                        style={{ height: "100%" }} // 3. Tambahkan height 100% di sini
                      >
                        <div
                          style={{
                            background: "rgba(8,14,35,0.85)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(99,102,241,0.1)",
                            borderRadius: 16,
                            padding: "16px 12px",
                            textAlign: "center",
                            borderTop: `2px solid ${s.color}`,
                            height: "100%", // 4. Pastikan div konten juga 100%
                            display: "flex", // 5. Gunakan flex untuk mengatur posisi konten di dalam
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 28,
                              fontWeight: 900,
                              color: s.color,
                              textShadow: `0 0 20px ${s.color}80`,
                              lineHeight: 1,
                            }}
                          >
                            <CountUp to={s.num} duration={2.5} delay={3} />
                            {s.suffix}
                          </div>
                          <p
                            style={{
                              fontWeight: 700,
                              color: "white",
                              fontSize: 11,
                              marginTop: 6,
                              marginBottom: 0,
                            }}
                          >
                            {s.label}
                          </p>
                          <p
                            style={{
                              color: "#475569",
                              fontSize: 10,
                              marginTop: 3,
                              marginBottom: 0,
                            }}
                          >
                            {s.sub}
                          </p>
                        </div>
                      </TiltedCard>
                    </AnimatedContent>
                  ))}
                </div>
              </AnimatedContent>
            </div>

            {/* Kanan — Lanyard ── */}
            <div
              className="hero-lanyard-content"
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
                    ABOUT_ME.js
                  </span>
                  <SplitText
                    text="Web Development & Software Engineering"
                    className="about-title-text"
                    delay={40}
                    duration={0.5}
                    from={{ opacity: 0, y: 30 }}
                    to={{ opacity: 1, y: 0 }}
                    splitBy="words"
                    textAlign="left"
                    style={{ gap: "0.3em", rowGap: "0.1em" }}
                  />
                </div>
              </AnimatedContent>
              <AnimatedContent delay={0.2}>
                <p style={{ color: "#64748b", lineHeight: 1.8, fontSize: 14 }}>
                  Saya adalah mahasiswa Teknologi Informasi semester 6 di
                  Universitas Bina Sarana Informatika dengan minat yang kuat
                  dalam pengembangan web. Memiliki kemampuan dalam membangun
                  aplikasi web menggunakan HTML, CSS, JavaScript, PHP, dan
                  framework Modern Lainnya. Ketertarikan saya terhadap
                  matematika dan perhitungan logis membantu dalam menulis kode
                  yang efisien, mengoptimalkan algoritma, dan memecahkan masalah
                  teknis dengan pendekatan yang terstruktur. Saya percaya bahwa
                  kombinasi antara kemampuan teknis programming dan analytical
                  thinking yang kuat akan menjadi aset berharga dalam dunia
                  pengembangan web. Sebagai seseorang yang selalu haus akan
                  pengetahuan baru, saya berkomitmen untuk terus belajar
                  teknologi terbaru dan best practices dalam industri. Saya
                  mencari kesempatan magang untuk mengaplikasikan ilmu yang
                  telah dipelajari, mendapatkan pengalaman praktis di dunia
                  profesional, serta berkontribusi dalam tim pengembangan yang
                  dinamis.
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
                      text: "Kab. Bogor, Jawa Barat",
                      color: "#22d3ee",
                    },
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
                  <StarBorder
                    as="a"
                    href="/CV_SENDI AWALUDIN.pdf"
                    download="CV_SENDI AWALUDIN.pdf"
                    color="#6366f1"
                    speed="3s"
                  >
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
                TECH_STACK & TOOLS.EXE
              </span>
              <SplitText
                text="Amunisi Tech"
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
                        {sk.svgKey ? (
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {SVG_ICONS[sk.svgKey]}
                          </div>
                        ) : (
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
                        )}
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
                    Lebih dari Sekedar Code
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
                      name: "Disiplin",
                      icon: "fas fa-medal",
                      color: "#f59e0b",
                      desc: "Konsisten menjalankan rutinitas, target, dan komitmen setiap hari",
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

            {/* Scroll indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginTop: 16,
                marginBottom: -40,
              }}
            >
              <span
                style={{
                  color: "#64748b",
                  fontSize: 11,
                  fontFamily: "monospace",
                }}
              >
                scroll untuk lihat semua
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <i
                  className="fas fa-chevron-down"
                  style={{ color: "#64748b", fontSize: 11 }}
                />
              </motion.div>
            </div>
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
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 100,
                background: "linear-gradient(to top, #020510 10%, transparent)",
                pointerEvents: "none",
              }}
            />
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
              ref={scrollRef}
              className="custom-scroll"
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onScroll={(e) => {
                const el = e.currentTarget;
                const dotIndex = Math.round(el.scrollLeft / 364);
                setActiveDot(Math.min(dotIndex, PROJECTS.length - 1));
              }}
              style={{
                display: "grid",
                gridTemplateRows: "1fr 1fr",
                gridAutoFlow: "column",
                gridAutoColumns: "340px",
                gap: 24,
                overflowX: "auto",
                overflowY: "hidden",
                padding: "20px 10px 40px",
                scrollBehavior: "auto",
                cursor: "grab",
                userSelect: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {PROJECTS.map((p, i) => (
                <div key={i} style={{ width: 340, height: "100%" }}>
                  <AnimatedContent delay={i * 0.12} threshold={0.1}>
                    <TiltedCard
                      rotateAmplitude={10}
                      scaleOnHover={1.04}
                      showGlare
                    >
                      <div
                        onClick={() => {
                          setSelectedProject(p);
                          setCurrentImgIndex(0);
                        }}
                        style={{
                          background: "rgba(8,14,35,0.9)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(99,102,241,0.1)",
                          borderRadius: 20,
                          overflow: "hidden",
                          cursor: "pointer",
                          height: "100%",
                          minHeight: 420, // ← tambah ini
                          display: "flex", // ← tambah ini
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            height: 2,
                            background: `linear-gradient(90deg, ${p.accent}, transparent)`,
                          }}
                        />
                        {p.image ? (
                          <div
                            style={{
                              position: "relative",
                              height: 160,
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={
                                p.image && p.image.length > 0
                                  ? p.image[0]
                                  : p.image
                              }
                              alt={p.title}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                                transition: "transform 0.4s ease",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.transform =
                                  "scale(1.05)")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.transform = "scale(1)")
                              }
                            />
                            {/* Overlay gelap bawah */}
                            <div
                              style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: 60,
                                background:
                                  "linear-gradient(to top, rgba(8,14,35,0.95), transparent)",
                              }}
                            />
                            {/* Badge kategori */}
                            <div
                              style={{
                                position: "absolute",
                                top: 12,
                                left: 12,
                                background: "rgba(8,14,35,0.85)",
                                backdropFilter: "blur(8px)",
                                border: `1px solid ${p.accent}50`,
                                borderRadius: 6,
                                padding: "3px 10px",
                                fontSize: 10,
                                fontFamily: "monospace",
                                color: p.accent,
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                              }}
                            >
                              {p.cat}
                            </div>
                            {/* Icon di pojok kanan */}
                            <div
                              style={{
                                position: "absolute",
                                top: 10,
                                right: 12,
                                fontSize: 22,
                              }}
                            >
                              {p.icon}
                            </div>
                          </div>
                        ) : (
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
                        )}
                        <div
                          style={{
                            padding: "20px 24px 24px",
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                          }}
                        >
                          <h3
                            style={{
                              fontWeight: 800,
                              color: "white",
                              fontSize: 15,
                              marginBottom: 10,
                              flexShrink: 0,
                            }}
                          >
                            {p.title}
                          </h3>

                          {/* Desc dengan expand on click + blur effect */}
                          <ExpandableDesc desc={p.desc} accent={p.accent} />

                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 6,
                              flexShrink: 0,
                              marginTop: "auto",
                              paddingTop: 12,
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

            {/* Dot indicator dinamis */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 8,
                marginTop: 16,
              }}
            >
              {PROJECTS.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: activeDot === i ? 24 : 8,
                    background:
                      activeDot === i ? "#6366f1" : "rgba(99,102,241,0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ height: 8, borderRadius: 999, cursor: "pointer" }}
                  onClick={() => {
                    scrollRef.current.scrollTo({
                      left: i * 364,
                      behavior: "smooth",
                    });
                    setActiveDot(i);
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
    CERTIFICATES
═══════════════════════════════════════ */}
        <section
          id="certificates"
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
                />
                CERTIFICATES.JSON
              </span>
              <SplitText
                text="Sertifikat & Pencapaian"
                className="section-title-text"
                delay={40}
                duration={0.5}
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                splitBy="characters"
                textAlign="center"
              />
            </AnimatedContent>

            {/* Scroll Container */}
            <div
              ref={certScrollRef}
              className="custom-scroll"
              onMouseDown={(e) => {
                const el = certScrollRef.current;
                el.isDown = true;
                el.startX = e.pageX - el.offsetLeft;
                el.scrollLeftStart = el.scrollLeft;
                el.style.cursor = "grabbing";
              }}
              onMouseLeave={() => {
                certScrollRef.current.isDown = false;
                certScrollRef.current.style.cursor = "grab";
              }}
              onMouseUp={() => {
                certScrollRef.current.isDown = false;
                certScrollRef.current.style.cursor = "grab";
              }}
              onMouseMove={(e) => {
                const el = certScrollRef.current;
                if (!el.isDown) return;
                e.preventDefault();
                const x = e.pageX - el.offsetLeft;
                const walk = (x - el.startX) * 2;
                el.scrollLeft = el.scrollLeftStart - walk;
              }}
              onScroll={(e) => {
                const el = e.currentTarget;
                const dotIndex = Math.round(el.scrollLeft / 320);
                setActiveCertDot(Math.min(dotIndex, CERTIFICATES.length - 1));
              }}
              style={{
                display: "flex",
                gap: 24,
                overflowX: "auto",
                overflowY: "hidden",
                padding: "20px 10px 40px",
                scrollBehavior: "auto",
                cursor: "grab",
                userSelect: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {CERTIFICATES.map((cert, i) => (
                <div key={i} style={{ flexShrink: 0, width: 300 }}>
                  <AnimatedContent delay={i * 0.08} threshold={0.1}>
                    <TiltedCard
                      rotateAmplitude={8}
                      scaleOnHover={1.04}
                      showGlare
                    >
                      <div
                        style={{
                          background: "rgba(8,14,35,0.9)",
                          backdropFilter: "blur(20px)",
                          border: `1px solid ${cert.accent}20`,
                          borderRadius: 20,
                          overflow: "hidden",
                          borderTop: `2px solid ${cert.accent}`,
                        }}
                      >
                        {/* Preview Sertifikat */}
                        <div
                          style={{
                            position: "relative",
                            height: 180,
                            overflow: "hidden",
                            background: "#f8fafc",
                            cursor: "pointer",
                          }}
                          onClick={() => setSelectedCert(cert)}
                        >
                          <img
                            src={cert.image}
                            alt={cert.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "top",
                              transition: "transform 0.4s ease",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.transform = "scale(1.05)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.transform = "scale(1)")
                            }
                          />
                          {/* Overlay hover hint */}
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "rgba(0,0,0,0)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "background 0.3s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "rgba(0,0,0,0.4)";
                              e.currentTarget.querySelector(
                                "span",
                              ).style.opacity = "1";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                "rgba(0,0,0,0)";
                              e.currentTarget.querySelector(
                                "span",
                              ).style.opacity = "0";
                            }}
                          >
                            <span
                              style={{
                                opacity: 0,
                                transition: "opacity 0.3s",
                                color: "white",
                                fontSize: 12,
                                fontFamily: "monospace",
                                background: "rgba(0,0,0,0.6)",
                                padding: "6px 14px",
                                borderRadius: 999,
                                border: "1px solid rgba(255,255,255,0.2)",
                              }}
                            >
                              🔍 Lihat Penuh
                            </span>
                          </div>
                          {/* Gradient bawah */}
                          <div
                            style={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: 50,
                              background:
                                "linear-gradient(to top, rgba(8,14,35,0.9), transparent)",
                              pointerEvents: "none",
                            }}
                          />
                        </div>

                        {/* Info */}
                        <div style={{ padding: "16px 20px 20px" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              marginBottom: 8,
                            }}
                          >
                            <span style={{ fontSize: 18 }}>{cert.icon}</span>
                            <span
                              style={{
                                fontSize: 10,
                                fontFamily: "monospace",
                                color: cert.accent,
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                                background: `${cert.accent}15`,
                                padding: "2px 8px",
                                borderRadius: 4,
                                border: `1px solid ${cert.accent}30`,
                              }}
                            >
                              {cert.year}
                            </span>
                          </div>
                          <h3
                            style={{
                              fontWeight: 800,
                              color: "white",
                              fontSize: 13,
                              lineHeight: 1.4,
                              marginBottom: 6,
                            }}
                          >
                            {cert.title}
                          </h3>
                          <p
                            style={{
                              color: "#475569",
                              fontSize: 11,
                              fontFamily: "monospace",
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <span style={{ color: cert.accent }}>◆</span>
                            {cert.issuer}
                          </p>
                        </div>
                      </div>
                    </TiltedCard>
                  </AnimatedContent>
                </div>
              ))}
            </div>

            {/* Dot indicator */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 8,
                marginTop: 16,
              }}
            >
              {CERTIFICATES.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: activeCertDot === i ? 24 : 8,
                    background:
                      activeCertDot === i ? "#6366f1" : "rgba(99,102,241,0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ height: 8, borderRadius: 999, cursor: "pointer" }}
                  onClick={() => {
                    certScrollRef.current.scrollTo({
                      left: i * 324,
                      behavior: "smooth",
                    });
                    setActiveCertDot(i);
                  }}
                />
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
                  Punya ide proyek yang menarik, tawaran kolaborasi, atau
                  sekadar ingin berdiskusi seputar dunia pengembangan web? Saya
                  selalu terbuka untuk obrolan baru. Mari bangun sesuatu yang
                  luar biasa bersama!
                </p>
                {[
                  {
                    icon: "✉️",
                    text: "sendyawaludin4568@gmail.com",
                    href: "mailto:sendyawaludin4568@gmail.com",
                  },
                  {
                    icon: "💻",
                    text: "github.com/Sendyawldn",
                    href: "https://github.com/Sendyawldn",
                  },
                  {
                    icon: "🔗",
                    text: "LinkedIn",
                    href: "https://www.linkedin.com/in/sendi-awaludin-79b373255?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                  },
                  {
                    icon: "📸",
                    text: "Instagram",
                    href: "https://instagram.com/sendyawldn",
                  },
                  {
                    icon: "🎵",
                    text: "TikTok",
                    href: "https://www.tiktok.com/@sendyawldn_?_r=1&_t=ZS-94XmdnbMCEz",
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
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const name = formData.get("name");
                    const email = formData.get("email");
                    const message = formData.get("message");

                    // Format pesan untuk WhatsApp
                    const whatsappText = `Halo Zen, saya *${name}* (${email}).%0A%0A${message}`;

                    // Ganti nomor ini dengan nomor WhatsApp Anda (Gunakan kode negara, misal 62)
                    const phoneNumber = "6285717078003";

                    // Buka link WhatsApp
                    window.open(
                      `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${whatsappText}`,
                      "_blank",
                    );
                  }}
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
                  {[
                    {
                      label: "Nama Lengkap",
                      name: "name",
                      type: "text",
                      placeholder: "Siapa nama Anda?",
                    },
                    {
                      label: "Alamat Email",
                      name: "email",
                      type: "email",
                      placeholder: "nama@email.com",
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
                      placeholder="Halo Zen, saya tertarik untuk bekerja sama mengenai..."
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
                      color="#25D366" // Warna hijau WhatsApp
                      speed="3s"
                      style={{ width: "100%" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                        }}
                      >
                        <i
                          className="fab fa-whatsapp"
                          style={{ fontSize: 16 }}
                        />
                        <span>Kirim ke WhatsApp</span>
                      </div>
                    </StarBorder>
                  </Magnet>
                </form>
              </TiltedCard>
            </AnimatedContent>
          </div>
        </section>
        {/* ── MODAL CERTIFICATE ── */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 1000,
                background: "rgba(2, 5, 16, 0.95)",
                backdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 24px", // Memberi ruang agar tidak mentok layar
                cursor: "zoom-out",
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  maxWidth: "90%", // Membatasi lebar agar tidak memenuhi layar
                  maxHeight: "85vh", // Membatasi tinggi maksimal 85% dari tinggi layar
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                  cursor: "default",
                }}
              >
                {/* Tombol Close */}
                <button
                  onClick={() => setSelectedCert(null)}
                  style={{
                    position: "absolute",
                    top: -45,
                    right: 0,
                    background: "rgba(255,255,255,0.1)",
                    border: "none",
                    color: "white",
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
                  }
                >
                  <i className="fas fa-times" />
                </button>

                {/* Container Gambar dengan batasan scroll jika masih terlalu tinggi */}
                <div
                  style={{
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: 16,
                    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "70vh", // Gambar tidak akan lebih tinggi dari 70% layar
                      objectFit: "contain", // Memastikan gambar tidak terpotong
                      display: "block",
                    }}
                  />
                </div>

                <div
                  style={{
                    marginTop: 20,
                    textAlign: "center",
                    background: "rgba(255,255,255,0.05)",
                    padding: "12px 24px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <h3
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: 800,
                      margin: 0,
                    }}
                  >
                    {selectedCert.title}
                  </h3>
                  <p
                    style={{
                      color: "#94a3b8",
                      fontFamily: "monospace",
                      fontSize: 12,
                      marginTop: 4,
                    }}
                  >
                    {selectedCert.issuer} — {selectedCert.year}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* ── MODAL DETAIL PROJECT ── */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 1100,
                background: "rgba(2, 5, 16, 0.95)",
                backdropFilter: "blur(16px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  maxWidth: 1000,
                  width: "100%",
                  maxHeight: "90vh",
                  background: "#080e23",
                  borderRadius: 24,
                  border: "1px solid rgba(99,102,241,0.2)",
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr", // Desktop: Kiri Gambar, Kanan Info
                  position: "relative",
                }}
                className="project-modal-grid"
              >
                {/* Tombol Close */}
                <button
                  onClick={() => setSelectedProject(null)}
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    zIndex: 10,
                    background: "rgba(0,0,0,0.5)",
                    border: "none",
                    color: "white",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                >
                  <i className="fas fa-times" />
                </button>

                {/* Bagian Kiri: Carousel Gambar */}
                <div
                  style={{
                    position: "relative",
                    background: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <img
                    src={
                      selectedProject.images
                        ? selectedProject.images[currentImgIndex]
                        : selectedProject.image
                    }
                    alt={selectedProject.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />

                  {/* Navigasi Carousel (Muncul jika ada lebih dari 1 gambar) */}
                  {selectedProject.images?.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setCurrentImgIndex((prev) =>
                            prev === 0
                              ? selectedProject.images.length - 1
                              : prev - 1,
                          )
                        }
                        style={{
                          position: "absolute",
                          left: 10,
                          background: "rgba(0,0,0,0.3)",
                          color: "white",
                          border: "none",
                          padding: 10,
                          borderRadius: 8,
                          cursor: "pointer",
                        }}
                      >
                        <i className="fas fa-chevron-left" />
                      </button>
                      <button
                        onClick={() =>
                          setCurrentImgIndex((prev) =>
                            prev === selectedProject.images.length - 1
                              ? 0
                              : prev + 1,
                          )
                        }
                        style={{
                          position: "absolute",
                          right: 10,
                          background: "rgba(0,0,0,0.3)",
                          color: "white",
                          border: "none",
                          padding: 10,
                          borderRadius: 8,
                          cursor: "pointer",
                        }}
                      >
                        <i className="fas fa-chevron-right" />
                      </button>
                    </>
                  )}
                </div>

                {/* Bagian Kanan: Informasi Detail */}
                <div
                  style={{
                    padding: 40,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: selectedProject.accent,
                        fontFamily: "monospace",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {selectedProject.cat}
                    </span>
                    <h2
                      style={{
                        color: "white",
                        fontSize: 28,
                        fontWeight: 900,
                        marginTop: 8,
                      }}
                    >
                      {selectedProject.title}
                    </h2>
                  </div>

                  <p
                    style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.8 }}
                  >
                    {selectedProject.desc}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: `${selectedProject.accent}15`,
                          color: selectedProject.accent,
                          padding: "6px 14px",
                          borderRadius: 8,
                          fontSize: 12,
                          fontFamily: "monospace",
                          border: `1px solid ${selectedProject.accent}30`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: 20,
                      display: "flex",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* Tombol GitHub */}
                    {selectedProject.github && (
                      <div
                        onClick={() =>
                          window.open(selectedProject.github, "_blank")
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <StarBorder color="#ffffff" speed="5s">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "0 4px",
                            }}
                          >
                            <i
                              className="fab fa-github"
                              style={{ fontSize: "18px" }}
                            />
                            <span>GitHub</span>
                          </div>
                        </StarBorder>
                      </div>
                    )}

                    {/* Tombol Live Demo / Hostingan */}
                    {selectedProject.demo && (
                      <div
                        onClick={() =>
                          window.open(selectedProject.demo, "_blank")
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <StarBorder color={selectedProject.accent} speed="3s">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "0 4px",
                            }}
                          >
                            <i className="fas fa-external-link-alt" />
                            <span>Lihat Proyek</span>
                          </div>
                        </StarBorder>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
          style={{
            fontSize: "32px",
            fontWeight: 900,
            letterSpacing: "4px", // Diperlebar agar terlihat mewah
          }}
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
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
        .about-title-text {
          font-size: clamp(22px, 3vw, 38px);
          font-weight: 800;
          line-height: 1.2;
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
        @media (max-width: 850px) {
          .project-modal-grid {
            grid-template-columns: 1fr !important;
            overflow-y: auto !important;
          }
          .project-modal-grid > div:first-child {
            height: 300px !important;
          }
        }
        @media (max-width: 768px) {
          /* Mencegah pemotongan kata di tengah huruf */
          .welcome-fase h1, 
          .welcome-fase span {
            display: inline-block;
            white-space: normal; /* Memungkinkan teks turun ke baris baru dengan rapi */
            word-break: keep-all;
          }
        }
        /* --- TAMBAHKAN DI DALAM TAG <style> DI BAWAH FILE --- */

        @media (max-width: 768px) {
          /* Mengubah grid menjadi flex box agar urutan bisa ditukar */
          .hero-container {
            display: flex !important;
            flex-direction: column !important;
            gap: 20px !important;
          }

          /* Memaksa Lanyard naik ke atas (order -1) */
          .hero-lanyard-content {
            order: -1; 
            height: 400px !important; /* Memperpendek tinggi lanyard di HP agar tidak terlalu jauh scrollnya */
            width: 100% !important;
          }

          /* Mengatur teks agar di bawah lanyard dan rata tengah */
          .hero-text-content {
            order: 1;
            align-items: center !important;
            text-align: center !important;
            padding-bottom: 40px !important;
          }

          /* Membuat nama dan bio juga rata tengah di mobile */
          .hero-name-line {
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  );
}
