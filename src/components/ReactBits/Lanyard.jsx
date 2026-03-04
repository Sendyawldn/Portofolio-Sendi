import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils"; // Impor utilitas yang sudah kita buat

// Komponen Pembantu untuk Logo (diambil dari ReactBits)
const LanyardLogo = ({ src, alt, className }) => (
  <div
    className={cn(
      "w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-lg",
      className,
    )}
  >
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </div>
);

// Komponen Pembantu untuk Link (diambil dari ReactBits)
const LanyardLink = ({ href, children, className }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2",
      className,
    )}
  >
    {children}
  </a>
);

// --- KOMPONEN UTAMA: PREMIUM LANYARD (ADAPTASI DARI REACTBITS) ---
const Lanyard = ({ className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className={cn(
        "relative flex flex-col items-center gap-6 p-8 w-80 max-w-full rounded-[2.5rem]",
        "background:rgba(15,23,42,0.6)",
        "backdrop-filter:blur(12px)",
        "border:2px_solid_rgba(99,102,241,0.2)",
        "box-shadow:0_20px_40px_rgba(0,0,0,0.5)",
        className,
      )}
    >
      {/* Efek Cahaya di Belakang */}
      <div className="absolute inset-0 rounded-[2.5rem] background:radial-gradient(400px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(99,102,241,0.15),transparent_80%)" />

      {/* Bagian Atas Lanyard (Tali) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-20 h-40 background:linear-gradient(to_bottom,transparent,rgba(99,102,241,0.2),rgba(99,102,241,0.6)) rounded-b-2xl border-t-4 border-indigo-500 shadow-lg z-0" />

      {/* Pengait */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 background:#020617 rounded-full border-4 border-indigo-500 z-10 shadow-[0_0_15px_rgba(99,102,241,0.8)] flex items-center justify-center">
        <div className="w-2 h-2 rounded-full background:indigo-500" />
      </div>

      {/* Konten Lanyard */}
      <div className="relative z-10 w-full flex flex-col items-center gap-6 pt-6">
        {/* Logo/Foto Abang */}
        <LanyardLogo
          src="https://via.placeholder.com/150"
          alt="Logo Zen"
          className="shadow-[0_0_20px_rgba(99,102,241,0.5)] border-indigo-500"
        />

        {/* Nama & Role */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            ZEN
          </h1>
          <p className="text-indigo-400 font-mono text-xs mt-2 tracking-widest uppercase">
            STUDENT / DEVELOPER
          </p>
        </div>

        {/* Divider */}
        <div className="h-0.5 w-full bg-indigo-500/30 rounded-full" />

        {/* Detail */}
        <div className="w-full space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 font-medium">Status:</span>
            <span className="text-white font-semibold">PREMIUM</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 font-medium">Tech Stack:</span>
            <span className="text-white font-semibold">REACT / LARAVEL</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 font-medium">Desa:</span>
            <span className="text-white font-semibold">TLAJUNG UDIK</span>
          </div>
        </div>

        {/* Link Sosial */}
        <div className="flex items-center gap-4 mt-4">
          <LanyardLink href="https://github.com/USERNAME_ABANG">
            <i className="fab fa-github"></i> GitHub
          </LanyardLink>
          <LanyardLink href="https://linkedin.com/in/USERNAME_ABANG">
            <i className="fab fa-linkedin"></i> LinkedIn
          </LanyardLink>
        </div>
      </div>
    </motion.div>
  );
};

export default Lanyard;
