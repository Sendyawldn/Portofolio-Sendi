# Portofolio Sendi

Website portofolio personal berbasis **React + Vite** untuk menampilkan profil, skill, pengalaman, proyek, sertifikat, dan kontak.

## ✨ Fitur Utama

- Landing page interaktif dengan animasi modern.
- Section profil singkat, skill stack, dan pengalaman.
- Showcase proyek lengkap dengan link GitHub/demo.
- Galeri sertifikat.
- Komponen visual custom (ReactBits) seperti Aurora, SplitText, TiltedCard, Lanyard, dan lainnya.

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite 7
- **Styling/UI:** Tailwind CSS 4, DaisyUI, custom CSS
- **Animation & Interaction:** Motion, Framer Motion, GSAP, React Spring
- **3D/Visual:** Three.js, React Three Fiber, Drei, Rapier
- **Utilities:** clsx, tailwind-merge

## 📁 Struktur Project (ringkas)

```bash
.
├── public/                 # Asset publik (gambar proyek, sertifikat, CV, dll)
├── src/
│   ├── assets/             # Asset internal React
│   ├── components/
│   │   └── ReactBits/      # Komponen UI/animasi reusable
│   ├── App.jsx             # Halaman utama portofolio
│   ├── index.css           # Global styles
│   └── main.jsx            # Entry point aplikasi
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## 🚀 Menjalankan Secara Lokal

### 1) Prasyarat

- Node.js 20+ (disarankan LTS)
- npm

### 2) Install dependency

```bash
npm install
```

### 3) Jalankan mode development

```bash
npm run dev
```

Aplikasi akan berjalan di: `http://localhost:5173`

## 🧪 Script NPM

```bash
npm run dev      # Menjalankan Vite dev server
npm run build    # Build production
npm run preview  # Preview hasil build
npm run lint     # Linting dengan ESLint
```

## 🐳 Menjalankan dengan Docker

### Build & run via Docker Compose

```bash
docker compose up --build
```

Aplikasi dapat diakses di: `http://localhost:5173`

> Konfigurasi Docker sudah mengekspose port `5173` dan menjalankan Vite dengan `--host 0.0.0.0` agar dapat diakses dari host.

## 📦 Build Production

```bash
npm run build
```

Output build akan tersedia di folder `dist/`.

## 🙌 Catatan

Jika ingin menyesuaikan isi portofolio (proyek/skill/sertifikat), edit data utama di:

- `src/App.jsx`

---
Dibuat oleh **Sendi Awaludin**.
