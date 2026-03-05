import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Lanyard from "./components/ReactBits/Lanyard";
import DecryptedText from "./components/ReactBits/DecryptedText";

gsap.registerPlugin(ScrollTrigger);

function App() {
  // --- REFS BARU ---
  const canvasRef = useRef(null);
  const idCardWrapperRef = useRef(null);
  const idCardContainerRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);

  // State untuk interaksi web
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [typingText, setTypingText] = useState("");

  // Kata-kata untuk efek ngetik
  const words = ["Web Developer", "AI Engineer", "Forex Trader"];

  useEffect(() => {
    // --- L1. LENIS SMOOTH SCROLL ---
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing mulus
      smoothWheel: true,
    });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // --- L2. CUSTOM CURSOR ---
    const handleMouseMove = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      // 1. Tetap update titik kursor lama abang
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${posX}px`;
        cursorDotRef.current.style.top = `${posY}px`;
      }

      // 2. Tetap update lingkaran kursor lama abang
      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.animate(
          { left: `${posX}px`, top: `${posY}px` },
          { duration: 500, fill: "forwards" },
        );
      }

      // 3. Tambahkan ini untuk efek Spotlight Background
      document.documentElement.style.setProperty("--mouse-x", `${posX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${posY}px`);
    };

    // Logic reveal saat scroll
    const reveal = () => {
      const reveals = document.querySelectorAll(".reveal");
      reveals.forEach((r) => {
        const windowHeight = window.innerHeight;
        const elementTop = r.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
          r.classList.add("active");
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", reveal);

    // Jalankan reveal sekali saat pertama load biar konten atas langsung muncul
    reveal();

    // 1. Loading Screen
    const timer = setTimeout(() => setIsLoading(false), 2000);

    // 2. CANVAS PARTICLES (Titik Cahaya Nyambung di Hero)
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    let particles = [];
    let animId;

    if (canvas && ctx) {
      const resize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };
      resize();
      window.addEventListener("resize", resize);

      const count = window.innerWidth < 768 ? 25 : 50;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 2 + 0.5,
          color: ["rgba(0,212,255,", "rgba(139,92,246,", "rgba(99,102,241,"][
            Math.floor(Math.random() * 3)
          ],
        });
      }

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.color + "0.6)";
          ctx.fill();

          if (window.innerWidth >= 768) {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = p.x - particles[j].x,
                dy = p.y - particles[j].y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 110) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = p.color + 0.12 * (1 - dist / 110) + ")";
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          }
        });
        animId = requestAnimationFrame(draw);
      };
      draw();
    }

    // 3. FISIKA ID CARD (SPRING DRAG & FLIP)
    const wrapper = idCardWrapperRef.current;
    const container = idCardContainerRef.current;
    let isFlipped = false;
    let isDragging = false;
    let dragStartX = 0,
      dragStartY = 0;
    let currentX = 0,
      currentY = 0,
      offsetX = 0,
      offsetY = 0;
    let velocityX = 0,
      velocityY = 0,
      rotationAngle = 0,
      angularVelocity = 0;
    let physicsId;

    if (wrapper && container) {
      const handleStart = (e) => {
        isDragging = true;
        const pos = e.touches
          ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
          : { x: e.clientX, y: e.clientY };
        dragStartX = pos.x - offsetX;
        dragStartY = pos.y - offsetY;
        wrapper.style.cursor = "grabbing";
        if (e.cancelable) e.preventDefault();
      };

      const handleMove = (e) => {
        if (!isDragging) return;
        const pos = e.touches
          ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
          : { x: e.clientX, y: e.clientY };
        const deltaX = pos.x - dragStartX;
        const deltaY = pos.y - dragStartY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance > 100) {
          const angle = Math.atan2(deltaY, deltaX);
          offsetX = Math.cos(angle) * 100;
          offsetY = Math.max(0, Math.sin(angle) * 100);
        } else {
          offsetX = deltaX;
          offsetY = Math.max(0, deltaY);
        }
        currentX = offsetX;
        currentY = offsetY;
        rotationAngle = offsetX * 0.2;
      };

      const handleEnd = () => {
        if (!isDragging) return;
        const moveDist = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
        if (moveDist < 5) {
          isFlipped = !isFlipped;
          container.style.transform = isFlipped
            ? "rotateY(180deg)"
            : "rotateY(0deg)";
        }
        isDragging = false;
        wrapper.style.cursor = "grab";
      };

      wrapper.addEventListener("mousedown", handleStart);
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
      wrapper.addEventListener("touchstart", handleStart, { passive: false });
      document.addEventListener("touchmove", handleMove, { passive: false });
      document.addEventListener("touchend", handleEnd);

      const animatePhysics = () => {
        if (!isDragging) {
          velocityX += -currentX * 0.1;
          velocityY += -currentY * 0.1;
          velocityX *= 0.88;
          velocityY *= 0.88;
          currentX += velocityX;
          currentY += velocityY;
          angularVelocity += -rotationAngle * 0.05;
          angularVelocity *= 0.9;
          rotationAngle += angularVelocity;
          offsetX = currentX;
          offsetY = currentY;
          if (Math.abs(velocityX) < 0.01 && Math.abs(velocityY) < 0.01) {
            velocityX = 0;
            velocityY = 0;
          }
        }
        if (wrapper) {
          wrapper.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotationAngle}deg)`;
        }
        physicsId = requestAnimationFrame(animatePhysics);
      };
      animatePhysics();
    }

    // 4. Logic Scroll Progress Bar (Pake GSAP)
    gsap.to("#progress-bar", {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
      },
    });

    // Animasi Cahaya Timeline
    gsap.to("#timeline-glow", {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: "#timeline-container",
        start: "top 50%", // Mulai pas timeline nyampe tengah layar
        end: "bottom 80%", // Berhenti pas bawah timeline lewat
        scrub: 0.5, // Bikin animasinya ngikutin kecepatan scroll (nyala/mati)
      },
    });

    // 5. GSAP Animasi Muncul Perlahan
    const sections = gsap.utils.toArray("section");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // 6. Logic Efek Ngetik (Typing Effect)
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimer;

    const type = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        setTypingText(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypingText(currentWord.substring(0, charIndex + 1));
        charIndex++;
      }
      let typeSpeed = isDeleting ? 50 : 150;
      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }
      typingTimer = setTimeout(type, typeSpeed);
    };
    const startTyping = setTimeout(type, 2100);

    return () => {
      clearTimeout(timer);
      clearTimeout(startTyping);
      clearTimeout(typingTimer);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", reveal);
      lenis.destroy();
      if (animId) cancelAnimationFrame(animId);
      if (physicsId) cancelAnimationFrame(physicsId);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen text-slate-100 font-body relative overflow-hidden">
      {/* CUSTOM CURSOR */}
      <div
        ref={cursorDotRef}
        className="hidden md:block fixed w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[99999] transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(0,212,255,0.8)]"
      ></div>
      <div
        ref={cursorOutlineRef}
        className="hidden md:block fixed w-8 h-8 border border-cyan-400/50 rounded-full pointer-events-none z-[99999] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out"
      ></div>
      {/* --- BACKGROUND KOSMETIK --- */}
      <div className="noise-overlay"></div>
      <div className="bg-grid"></div>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
      </div>

      {/* 1. LOADING SCREEN (PRELOADER SVG BARU) */}
      <div
        className={`fixed inset-0 z-[9999] bg-[#060b18] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${isLoading ? "opacity-100 visible" : "opacity-0 invisible -translate-y-full"}`}
      >
        <div className="relative w-[140px] h-[140px] flex items-center justify-center mb-6">
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 animate-[spin_3s_linear_infinite]"
            viewBox="0 0 140 140"
          >
            <circle
              cx="70"
              cy="70"
              r="58"
              className="stroke-slate-800 opacity-50"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="70"
              cy="70"
              r="58"
              className="stroke-indigo-500"
              strokeWidth="4"
              fill="none"
              strokeDasharray="364.42"
              strokeDashoffset={isLoading ? "100" : "0"}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 2s ease-in-out" }}
            />
          </svg>
          <span className="text-2xl font-bold tracking-widest text-white drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]">
            Zen
          </span>
        </div>
        <div className="font-mono text-indigo-400 text-sm animate-pulse">
          // initializing_portfolio...
        </div>
      </div>

      {/* 2. SCROLL PROGRESS BAR */}
      <div
        id="progress-bar"
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 z-[100] w-0"
      ></div>

      {/* HEADER / NAVBAR */}
      <header className="fixed top-3 left-0 right-0 w-full z-50 flex justify-center px-4">
        <nav className="glass-panel w-full max-w-5xl rounded-full px-6 py-3 flex justify-between items-center">
          <a
            href="#hero"
            className="text-2xl font-bold tracking-tighter text-indigo-400 drop-shadow-md"
          >
            Zen.
          </a>

          <ul className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <li>
              <a href="#about" className="nav-link">
                Tentang
              </a>
            </li>
            <li>
              <a href="#internship" className="nav-link">
                Magang
              </a>
            </li>
            <li>
              <a href="#skills" className="nav-link">
                Skill
              </a>
            </li>
            <li>
              <a href="#experience" className="nav-link">
                Pengalaman
              </a>
            </li>
            <li>
              <a href="#projects" className="nav-link">
                Proyek
              </a>
            </li>
          </ul>
        </nav>
        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden absolute top-[70px] w-[90%] glass-panel rounded-2xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-64 border border-slate-700" : "max-h-0 border-none"}`}
        >
          <ul className="flex flex-col px-4 py-4 space-y-4 text-sm font-medium text-slate-300 text-center">
            <li>
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>
                Tentang
              </a>
            </li>
            <li>
              <a href="#internship" onClick={() => setIsMobileMenuOpen(false)}>
                Magang
              </a>
            </li>
            <li>
              <a href="#skills" onClick={() => setIsMobileMenuOpen(false)}>
                Skill
              </a>
            </li>
            <li>
              <a href="#experience" onClick={() => setIsMobileMenuOpen(false)}>
                Pengalaman
              </a>
            </li>
            <li>
              <a href="#projects" onClick={() => setIsMobileMenuOpen(false)}>
                Proyek
              </a>
            </li>
          </ul>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10">
        {/* HERO SECTION DENGAN CANVAS */}
        <section
          id="hero"
          className="min-h-[100vh] flex items-center justify-center px-4 relative z-10 pt-10"
        >
          {/* Canvas Particles tetap sama */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-60"
          ></canvas>

          {/* ✅ Grid container: kiri konten, kanan lanyard — overflow visible agar kartu bebas */}
          <div
            className="container max-w-7xl mx-auto grid md:grid-cols-2 gap-0 items-center relative z-10"
            style={{ overflow: "visible" }}
          >
            {/* ======== KOLOM KIRI ======== */}
            <div className="space-y-6 py-12">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm">
                <span className="w-2 h-2 rounded-full bg-[#10db77] shadow-[0_0_10px_#10db77] animate-pulse"></span>
                // available_for_internship
              </div>

              {/* Nama — animasi huruf per huruf */}
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-gradient-hero">
                Sendi <br />
                Awaludin
              </h1>

              {/* Typing text */}
              <div className="text-xl font-mono text-gray-400 flex items-center h-8">
                <span className="text-indigo-500 mr-2">&lt;</span>
                <span className="text-white">{typingText}</span>
                <span className="w-0.5 h-6 bg-indigo-500 ml-1 animate-pulse"></span>
                <span className="text-indigo-500 ml-2">/&gt;</span>
              </div>

              <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                Mahasiswa Teknik Informatika asal Gunung Putri yang antusias
                dengan Web Development, AI Engineering, dan eksplorasi pasar
                finansial.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#projects"
                  className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-xl px-8 shadow-[0_4px_15px_rgba(99,102,241,0.4)]"
                >
                  Lihat Proyek
                </a>
                <a
                  href="#contact"
                  className="btn btn-outline border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white rounded-xl px-8"
                >
                  Hubungi Saya
                </a>
              </div>

              {/* Mini Code Window */}
              <div className="glass-panel rounded-lg p-4 font-mono text-sm mt-6 w-fit">
                <div className="flex gap-2 mb-3 border-b border-slate-700/50 pb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-slate-500 text-xs">
                    portfolio.js
                  </span>
                </div>
                <div className="text-slate-300">
                  <span className="text-pink-400">const</span>{" "}
                  <span className="text-blue-400">developer</span> = {"{"}{" "}
                  <br />
                  &nbsp;&nbsp;name:{" "}
                  <span className="text-green-400">"Sendi Awaludin"</span>,
                  <br />
                  &nbsp;&nbsp;nickname:{" "}
                  <span className="text-green-400">"Zen"</span>,<br />
                  &nbsp;&nbsp;focus: [
                  <span className="text-green-400">"Web Dev"</span>,{" "}
                  <span className="text-green-400">"AI"</span>,{" "}
                  <span className="text-green-400">"Forex"</span>],
                  <br />
                  &nbsp;&nbsp;coffee:{" "}
                  <span className="text-green-400">"☕ always"</span>
                  <br />
                  {"}"};
                </div>
              </div>
            </div>

            {/* ======== KOLOM KANAN: LANYARD ======== */}
            <div
              className="hidden md:block"
              style={{
                height: "700px",
                position: "relative",
                overflow: "visible" /* ← INI KUNCINYA */,
                zIndex: 50,
              }}
            >
              <Lanyard gravity={[0, -20, 0]} />
            </div>
          </div>
        </section>

        {/* =========================================================
            SEMUA SECTION ABANG DI BAWAH INI SAMA PERSIS 100%
            (Stats, Marquee, About, Internship, Skills, Exp, Projects, Contact)
            ========================================================= */}

        {/* STATS SECTION */}
        <section id="stats" className="py-16 relative z-10">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel p-6 rounded-2xl text-center hover:border-indigo-500/50 transition">
                <div className="text-4xl md:text-5xl font-bold text-indigo-400 mb-2">
                  5+
                </div>
                <p className="font-bold text-white">Total Proyek</p>
                <p className="text-sm text-slate-400">Web, AI & Trading Bot</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl text-center hover:border-cyan-500/50 transition">
                <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">
                  3+
                </div>
                <p className="font-bold text-white">Sertifikat & Lomba</p>
                <p className="text-sm text-slate-400">GEMASTIK & IT Bootcamp</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl text-center hover:border-teal-500/50 transition">
                <div className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">
                  100%
                </div>
                <p className="font-bold text-white">Semangat Ngulik</p>
                <p className="text-sm text-slate-400">
                  Dari Code hingga Market XAUUSD
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TECH MARQUEE (Teks Berjalan) */}
        {/* TECH MARQUEE (Teks Berjalan) */}
        <div className="w-full overflow-hidden bg-indigo-600/10 border-y border-indigo-500/20 py-3 relative z-10 backdrop-blur-sm">
          {/* Ganti class di bawah ini jadi animate-marquee-nonstop */}
          <div className="flex whitespace-nowrap animate-marquee-nonstop">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center">
                {[
                  "React.js",
                  "Tailwind CSS",
                  "Laravel",
                  "Python",
                  "Machine Learning",
                  "Docker",
                  "Git/GitHub",
                  "Data Mining",
                  "Forex Trading",
                ].map((tech, index) => (
                  <React.Fragment key={index}>
                    <span className="text-indigo-300 font-mono font-semibold text-lg mx-6">
                      {tech}
                    </span>
                    <span className="text-slate-600">/</span>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ABOUT SECTION */}
        <section id="about" className="py-20 px-4 relative z-10">
          <div className="container max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="w-full h-[500px] glass-panel rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
                <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono">
                  [ Gambar Profil Abang Nanti Di Sini ]
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl"></div>
            </div>

            <div className="space-y-6">
              <div className="text-indigo-400 font-mono text-sm">
                // about_me.js
              </div>
              <DecryptedText
                text="Tentang Saya"
                className="text-4xl md:text-5xl font-bold text-white"
              />
              <p className="text-gray-400 leading-relaxed">
                Saya adalah mahasiswa Teknologi Informasi yang berdomisili di
                Gunung Putri. Saya memiliki ketertarikan yang kuat pada
                bagaimana teknologi dan data dapat digabungkan untuk memecahkan
                masalah kompleks dan melihat peluang baru.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Selain membangun aplikasi web yang fungsional, saya sangat
                antusias mengulik dunia *Machine Learning* dan *Data Mining*
                menggunakan berbagai *tools*. Di waktu luang, saya juga aktif
                mempelajari pergerakan pasar finansial (seperti saham, forex,
                dan XAUUSD) serta merawat sepeda fixie kesayangan saya. Saya
                memiliki visi jangka panjang untuk mencapai kebebasan finansial
                dari investasi dan membangun bisnis sendiri.
              </p>
              <button className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-xl px-6 mt-4">
                Unduh CV Saya
              </button>
            </div>
          </div>
        </section>

        {/* INTERNSHIP OBJECTIVES SECTION */}
        <section id="internship" className="py-20 px-4 relative z-10">
          <div className="container max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-indigo-400 font-mono text-sm mb-2">
                // internship_goals.js
              </div>
              <DecryptedText
                text="Tujuan Magang & Keahlian"
                className="text-4xl md:text-5xl font-bold text-white"
              />
            </div>
            <div className="glass-panel rounded-3xl p-8 md:p-12 shadow-xl">
              <p className="text-slate-300 text-lg leading-relaxed mb-8 text-center max-w-3xl mx-auto">
                Sebagai mahasiswa Informatika di Universitas Bina Sarana
                Informatika, saya aktif mencari kesempatan magang untuk
                mengaplikasikan ilmu Web Development dan AI di lingkungan
                industri profesional.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-indigo-900/20 border border-indigo-500/30 text-center hover:bg-indigo-900/40 transition">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Software Engineering
                  </h3>
                  <p className="text-sm text-slate-400">
                    Pengembangan aplikasi modern menggunakan React.js, Tailwind
                    CSS, dan framework backend seperti Laravel atau Node.js.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-cyan-900/20 border border-cyan-500/30 text-center hover:bg-cyan-900/40 transition">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Data & AI Engineering
                  </h3>
                  <p className="text-sm text-slate-400">
                    Analisis data, implementasi model Machine Learning
                    menggunakan Python, dan pemanfaatan Data Mining untuk solusi
                    bisnis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- EXPERIENCE SECTION (PREMIUM GLOWING TIMELINE) --- */}
        <section id="experience" className="py-24 relative px-4 z-10">
          <div className="container max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-20 reveal">
              <div className="text-indigo-400 font-mono text-sm mb-3 tracking-widest">
                // experience.log
              </div>
              <DecryptedText
                text="Pengalaman & Perjalanan"
                className="text-4xl md:text-5xl font-bold text-white"
              />
            </div>

            {/* Timeline Container Baru */}
            <div className="timeline-container">
              {/* Item 1: Magang PT Teng Fei */}
              <div className="relative pl-12 md:pl-0 mb-12 flex flex-col md:flex-row md:justify-between items-center w-full reveal group">
                <div className="timeline-dot group-hover:bg-[#6366f1] group-hover:scale-125"></div>

                {/* Waktu & Posisi (Kiri di Laptop) */}
                <div className="md:w-5/12 text-left md:text-right md:pr-10 w-full mb-4 md:mb-0">
                  <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                    Internship
                  </h3>
                  <p className="text-indigo-400 font-mono text-sm mt-1">
                    Baru-baru ini
                  </p>
                </div>

                {/* Deskripsi Kartu (Kanan di Laptop) */}
                <div className="md:w-5/12 w-full pl-0 md:pl-10">
                  <div className="timeline-card">
                    <h4 className="text-indigo-300 font-medium mb-3">
                      PT Teng Fei Energy Technology
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      Membantu pengelolaan operasional dan mempelajari sistem
                      teknologi perusahaan energi. Berkontribusi dalam pembuatan
                      dokumentasi sejarah perusahaan.
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 2: GEMASTIK UBSI */}
              <div className="relative pl-12 md:pl-0 mb-12 flex flex-col md:flex-row-reverse md:justify-between items-center w-full reveal group">
                <div className="timeline-dot border-[#22d3ee] shadow-[0_0_15px_#22d3ee] group-hover:bg-[#22d3ee] group-hover:scale-125"></div>

                <div className="md:w-5/12 text-left md:pl-10 w-full mb-4 md:mb-0">
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    GEMASTIK 2025
                  </h3>
                  <p className="text-cyan-400 font-mono text-sm mt-1">2025</p>
                </div>

                <div className="md:w-5/12 w-full pr-0 md:pr-10">
                  <div className="timeline-card border-cyan-500/20 hover:border-cyan-400">
                    <h4 className="text-cyan-300 font-medium mb-3">
                      Kolaborasi Tim Kampus UBSI
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      Menyiapkan proposal inovasi proyek untuk kompetisi
                      GEMASTIK 2025. Menggabungkan solusi perangkat lunak dengan
                      kebutuhan industri terkini.
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 3: LPM Tlajung Udik (Tambahan) */}
              <div className="relative pl-12 md:pl-0 flex flex-col md:flex-row md:justify-between items-center w-full reveal group">
                <div className="timeline-dot border-[#10b981] shadow-[0_0_15px_#10b981] group-hover:bg-[#10b981] group-hover:scale-125"></div>

                <div className="md:w-5/12 text-left md:text-right md:pr-10 w-full mb-4 md:mb-0">
                  <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    Anggota LPM
                  </h3>
                  <p className="text-emerald-400 font-mono text-sm mt-1">
                    2024 - Sekarang
                  </p>
                </div>

                <div className="md:w-5/12 w-full pl-0 md:pl-10">
                  <div className="timeline-card border-emerald-500/20 hover:border-emerald-400">
                    <h4 className="text-emerald-300 font-medium mb-3">
                      Desa Tlajung Udik
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      Berkontribusi aktif dalam merencanakan program desa dan
                      menyusun draf proposal kegiatan untuk mendukung
                      pemberdayaan warga lokal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-24 relative px-4 z-10">
          <div className="container max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-16 reveal">
              <div className="text-cyan-400 font-mono text-sm mb-3 tracking-widest">
                // tech_stack.exe
              </div>
              <DecryptedText
                text="Technical Mastery"
                className="text-4xl md:text-5xl font-bold text-white"
              />
            </div>

            {/* --- KUMPULAN ICON 3D (ALA GAMBAR 1) --- */}
            <div className="flex flex-wrap justify-center gap-6 mb-20 reveal">
              {[
                {
                  name: "React.js",
                  icon: "fab fa-react",
                  colorClass: "orb-react",
                },
                {
                  name: "Laravel",
                  icon: "fab fa-laravel",
                  colorClass: "orb-laravel",
                },
                {
                  name: "Tailwind CSS",
                  icon: "fab fa-css3-alt",
                  colorClass: "orb-tailwind",
                },
                {
                  name: "Python",
                  icon: "fab fa-python",
                  colorClass: "orb-python",
                },
                {
                  name: "Machine Learning",
                  icon: "fas fa-brain",
                  colorClass: "orb-ml",
                },
                {
                  name: "Docker",
                  icon: "fab fa-docker",
                  colorClass: "orb-docker",
                },
                {
                  name: "Git/GitHub",
                  icon: "fab fa-github",
                  colorClass: "orb-git",
                },
                {
                  name: "Data Mining",
                  icon: "fas fa-database",
                  colorClass: "orb-data",
                },
              ].map((skill, index) => (
                <div
                  key={index}
                  className="tooltip tooltip-primary tooltip-top cursor-pointer"
                  data-tip={skill.name}
                >
                  <div className={`orb-icon ${skill.colorClass} shadow-lg`}>
                    <i className={skill.icon}></i>
                  </div>
                </div>
              ))}
            </div>

            {/* Tools & Soft Skills (Bagian Bawah Tetap Sama) */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 reveal">
              <div className="glass-panel p-8 rounded-3xl">
                <h4 className="text-white font-bold mb-6 flex items-center">
                  <span className="mr-3">🛠️</span> Ecosystem & Tools
                </h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Git/GitHub",
                    "Docker",
                    "XAUUSD Analysis",
                    "Postman",
                    "Vite",
                  ].map((tool) => (
                    <span
                      key={tool}
                      className="px-4 py-2 bg-indigo-500/5 border border-indigo-500/20 text-indigo-300 text-xs rounded-xl hover:bg-indigo-500/20 transition-colors cursor-pointer"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-8 rounded-3xl">
                <h4 className="text-white font-bold mb-6 flex items-center">
                  <span className="mr-3">🧠</span> Core Strengths
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Problem Solving",
                    "Fast Learner",
                    "Analytical",
                    "Teamwork",
                  ].map((soft) => (
                    <div
                      key={soft}
                      className="text-slate-400 text-sm flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                      {soft}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-20 px-4 relative z-10">
          <div className="container max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-pink-400 font-mono text-sm mb-2">
                // projects.config.js
              </div>
              <DecryptedText
                text="Proyek & Eksperimen"
                className="text-4xl md:text-5xl font-bold text-white"
              />
              <p className="text-slate-400 max-w-2xl mx-auto">
                Koleksi proyek eksperimen dan kompetisi yang mencerminkan
                semangat saya dalam ngulik teknologi baru, dari Web3 hingga
                Machine Learning.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group glass-panel rounded-2xl hover:border-indigo-500/50 overflow-hidden transition-all hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-indigo-900 to-slate-800 flex items-center justify-center border-b border-slate-700/50 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
                  <span className="text-indigo-300 font-mono font-bold text-xl z-10">
                    Web3 & Blockchain
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Decentralized Digital Credential
                  </h3>
                  <p className="text-sm text-slate-400 mb-4 h-20">
                    Platform identitas digital desentralisasi menggunakan
                    Soulbound Tokens (SBTs) di jaringan Polygon. Eksperimen
                    *smart contract* untuk sertifikasi *tamper-proof*.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded">
                      Polygon
                    </span>
                    <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded">
                      Web3
                    </span>
                  </div>
                </div>
              </div>

              <div className="group glass-panel rounded-2xl hover:border-cyan-500/50 overflow-hidden transition-all hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-cyan-900 to-slate-800 flex items-center justify-center border-b border-slate-700/50 relative overflow-hidden">
                  <span className="text-cyan-300 font-mono font-bold text-xl z-10">
                    GEMASTIK 2025
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Proposal Inovasi GEMASTIK
                  </h3>
                  <p className="text-sm text-slate-400 mb-4 h-20">
                    Proyek kolaborasi tim kampus UBSI untuk kompetisi GEMASTIK
                    2025. Menggabungkan solusi perangkat lunak dengan kebutuhan
                    industri terkini.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded">
                      Teamwork
                    </span>
                    <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded">
                      Software Dev
                    </span>
                  </div>
                </div>
              </div>

              <div className="group glass-panel rounded-2xl hover:border-teal-500/50 overflow-hidden transition-all hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-teal-900 to-slate-800 flex items-center justify-center border-b border-slate-700/50 relative overflow-hidden">
                  <span className="text-teal-300 font-mono font-bold text-xl z-10">
                    AI & Finance
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    XAUUSD AI Trading Bot
                  </h3>
                  <p className="text-sm text-slate-400 mb-4 h-20">
                    Riset dan pengembangan bot *trading* otomatis menggunakan
                    analisis *Machine Learning* untuk memprediksi pergerakan
                    pasar emas (XAUUSD).
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-2 py-1 bg-teal-500/10 text-teal-400 text-xs rounded">
                      Python
                    </span>
                    <span className="px-2 py-1 bg-teal-500/10 text-teal-400 text-xs rounded">
                      Data Mining
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 px-4 relative z-10">
          <div className="container max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <div className="text-indigo-400 font-mono text-sm mb-2">
                  // contact.form.js
                </div>
                <DecryptedText
                  text="Hubungi Saya"
                  className="text-4xl md:text-5xl font-bold text-white"
                />
                <p className="text-slate-400 leading-relaxed">
                  Punya pertanyaan, tawaran proyek, atau sekadar ingin diskusi
                  soal Web Dev dan pergerakan market XAUUSD? Jangan ragu untuk
                  menghubungi saya melalui formulir atau detail kontak di bawah
                  ini.
                </p>
              </div>
              <ul className="space-y-4 text-slate-300">
                <li>
                  <a
                    href="mailto:email-abang@gmail.com"
                    className="flex items-center gap-3 hover:text-indigo-400 transition"
                  >
                    ✉️ email-abang@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Sendyawldn/Sendyawaldn"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 hover:text-indigo-400 transition"
                  >
                    💻 github.com/Sendyawldn
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-3">
                    📍 Gunung Putri, Jawa Barat, Indonesia
                  </div>
                </li>
              </ul>
            </div>

            <form
              className="glass-panel rounded-2xl p-8 space-y-6"
              action="https://api.web3forms.com/submit"
              method="POST"
            >
              <input
                type="hidden"
                name="access_key"
                value="YOUR_ACCESS_KEY_HERE"
              />
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-600 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Alamat Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-600 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Pesan Anda
                </label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-600 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition shadow-[0_4px_15px_rgba(99,102,241,0.4)]"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/50 bg-[#060b18]/80 backdrop-blur py-8 text-center relative z-10">
        <p className="text-slate-500 font-mono text-sm">
          &copy; 2026 Sendi Awaludin (Zen). Dibuat menggunakan React, Vite &
          Tailwind CSS.
        </p>
      </footer>
    </div>
  );
}

export default App;
