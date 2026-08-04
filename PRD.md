# PRD — Portfolio Website Yoga Setyawan
---

## 1. Ringkasan Proyek

Membangun website portofolio personal one-page (dengan satu halaman detail dinamis untuk studi kasus proyek) bergaya minimalis monochrome/grayscale. Website ini menjadi pusat personal branding untuk menampilkan pengalaman kerja, proyek, skill teknis, dan aktivitas profesional.

## 2. Tujuan & Sasaran

| Aspek | Detail |
|---|---|
| Tujuan utama | Platform personal branding untuk menampilkan karya, keterampilan, dan pengalaman secara profesional |
| Target audiens | Rekruter, HRD, calon klien bisnis, sesama profesional industri |
| Metrik keberhasilan | Bounce rate rendah, durasi kunjungan meningkat, jumlah pesan masuk via form kontak |

## 3. Tech Stack

| Layer | Teknologi | Catatan |
|---|---|---|
| Framework | Next.js 14+ (App Router) + TypeScript | standar industri, mendukung route dinamis untuk detail proyek |
| Styling | Tailwind CSS | cocok dipadukan dengan token grayscale kustom |
| Animasi | Framer Motion | wajib untuk navbar "Dynamic Island", accordion, transisi halaman |
| Primitive UI | shadcn/ui (Accordion, Sheet/Drawer, Dialog, Button) | dikustom total mengikuti design system di bawah, bukan dipakai default |
| Referensi komponen visual | 21st.dev/community/components | dipakai sebagai referensi pola UI, bukan copy‑paste mentah — adaptasi ke Tailwind + Framer Motion |
| Ikon | lucide-react | untuk chevron, X, ikon tech stack |
| Form & validasi | React Hook Form + Zod | validasi required + format email real-time |
| Pengiriman email | EmailJS (utama) atau Formspree (alternatif) | client-side, tanpa perlu backend/server sendiri |
| Font | Inter atau Plus Jakarta Sans via `next/font` | sans-serif modern |
| Deployment | Vercel | cocok native dengan Next.js |

## 4. Struktur Folder

```
portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  # single page: hero, about, experience, projects, skills, activity
│   ├── globals.css                # design tokens (CSS variables)
│   └── projects/
│       └── [slug]/page.tsx        # halaman detail studi kasus proyek
├── components/
│   ├── layout/
│   │   └── Navbar.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Activities.tsx
│   │   └── Contact.tsx
│   ├── ui/                        # primitive hasil kustomisasi shadcn (button, badge, sheet, accordion)
│   └── shared/                    # SectionHeading, AnimatedDot, dll.
├── data/
│   ├── experience.ts
│   ├── projects.ts
│   ├── skills.ts
│   └── activities.ts
├── lib/
│   └── utils.ts
├── public/
│   └── images/
├── types/
│   └── index.ts
└── .env.local                     # kunci EmailJS (jangan hardcode)
```

## 5. Design System

### 5.1 Palet Grayscale
Diambil langsung dari referensi `referensi-palet-grayscale.png`:

| Token | Hex | Penggunaan |
|---|---|---|
| `--black` | `#000000` | heading utama, tombol primer, teks navbar |
| `--gray-900` | `#1A1C1C` | teks alternatif gelap, footer bg |
| `--gray-800` | `#454747` | border tegas, ikon sekunder |
| `--gray-700` | `#5D5F5F` | teks deskripsi alternatif |
| `--gray-600` | `#767777` | placeholder, teks tersier |
| `--gray-500` | `#909191` | disabled state |
| `--gray-400` | `#AAABAB` | border tipis, divider accordion |
| `--gray-300` | `#C6C6C7` | background hover ringan |
| `--gray-100` | `#F0F1F1` | background sekunder (card, section alt) |
| `--white` | `#FFFFFF` | background utama |

Ditambah dua warna teks eksplisit sesuai brief:
- Heading: `#000000` (hitam pekat)
- Deskripsi/body: `#333333` (abu gelap, override khusus untuk keterbacaan paragraf)

### 5.2 Warna Aksen
- Hijau status "available": `#22C55E` (Tailwind `green-500`) — dot 8px, boleh diberi `pulsing animation` (scale/opacity loop).

### 5.3 Tipografi
- Font: Inter / Plus Jakarta Sans, sans-serif.
- H1/Hero heading: 48–64px, Bold/Extra Bold, line-height rapat (~1.05–1.1).
- Body/deskripsi: 16–18px, Regular, warna `#333333`.

### 5.4 Token Lain
- Radius pill: `99px` (navbar, badge, tombol CTA).
- Radius card: `12–16px`.
- Shadow halus: `0 4px 20px rgba(0,0,0,0.06)` untuk card skill/project.
- Glassmorphism navbar: `background: rgba(255,255,255,0.7); backdrop-filter: blur(12px);`

## 6. Sitemap

Single-page scroll di `/` dengan anchor section: `#about #experience #projects #skills #activity`, ditambah route dinamis `/projects/[slug]` untuk detail studi kasus.

## 7. Spesifikasi Fitur per Section

### 7.1 Navbar — Floating "Dynamic Island"
**Visual:** floating, pill-shaped, glassmorphism (`rgba(255,255,255,0.7)`, `blur(12px)`, `border-radius: 99px`).

**Isi (state expanded):** avatar bulat (foto profil) + "Yoga Setyawan" → About, Experience, Projects, Skills, Activity → tombol CTA "Contact" (nested pill, hitam solid `#000` teks putih) yang membuka drawer kontak.

**State machine:**
- **Scroll down** melewati threshold tertentu → navbar **shrink**: semua link & CTA disembunyikan, muncul 3 titik "buffering dots" (diameter 4px, abu gelap) di sebelah kanan logo, animasi staggered (opacity 0.3 → 1 bergantian, loop).
- **Hover** ke area navbar/dots saat shrink → navbar expand kembali otomatis.
- **Mouse leave** saat masih scroll-down → shrink kembali.
- **Scroll up** → navbar selalu kembali expand penuh, terlepas dari posisi hover.

**Animasi:** Framer Motion `layout` prop untuk transisi ukuran, `transition={{ type: "spring", stiffness: 300, damping: 30 }}`.

### 7.2 Hero / Beranda
Grid 2 kolom (kiri: teks, kanan: foto). Kiri berisi:
1. Badge pill kecil "Available for August '25" + dot hijau (statis atau pulsing).
2. Salam perkenalan + profesi (headline besar 48–64px).
3. Deskripsi ringkas (body text).
4. CTA: **View Projects** (primary, solid hitam) + **Get CV** (secondary, outline/underline).

Kanan: foto profil dalam wadah visual (bisa stacked-card style seperti referensi jika ingin menonjolkan beberapa visual proyek, opsional).

### 7.3 About
Bio latar belakang profesional + unique selling point (paragraf, teks kiri). Di kanan: card "spoiler" ringkas berisi cuplikan angka/statistik dari Experience, Projects, dan Activity (mis. jumlah tahun pengalaman, jumlah proyek, jumlah sertifikasi) sebagai preview yang mengarahkan user scroll ke section terkait.

### 7.4 Experience
Layout 2 kolom borderless (grid/flex, tanpa garis pembatas):
- Kolom kiri: nama perusahaan (bold) + baris kecil di bawahnya berisi kepanjangan nama perusahaan.
- Kolom kanan: job title, rentang tanggal, deskripsi tugas (left-aligned).
- Setiap baris pengalaman diberi vertical padding/margin konsisten.
- Urutan: descending berdasarkan tanggal mulai (terbaru di atas).

### 7.5 Projects
Grid kartu proyek. Klik kartu → halaman detail (`/projects/[slug]`) menampilkan: **Problem, Solution, Peran, Hasil**.

### 7.6 Skills
Split layout 2 kolom:
- Kiri: heading "Technical Skills" + grid ikon tech stack, tiap ikon dibungkus card mini persegi putih, rounded corner, `box-shadow` halus.
- Kanan: list keahlian (soft skill/kompetensi) vertikal, tiap item diberi bullet ikon lingkaran hitam kecil.

### 7.7 Activities
Accordion vertikal, tiap baris dipisah `border-bottom` abu tipis (`--gray-400`).

**Baris tertutup:** judul aktivitas (teks gelap) + detail peran di kiri, chevron-down di kanan.
**Interaksi:**
- Hover baris → background `--gray-100`.
- Saat terbuka (aktif) → warna judul sedikit lebih tegas/kontras (focus color).
- Klik → expand/collapse halus (Framer Motion `AnimatePresence` + auto height).

**Konten terbuka:** bullet point deskripsi + galeri foto/sertifikat, grid max **3–4 gambar per baris**, `object-fit: cover`, aspect ratio persegi panjang seragam, rounded corner.

### 7.8 Contact
Tombol Contact di navbar → membuka **drawer/sheet** dari sisi kanan layar (background putih murni), konten utama di belakang jadi blur/dark overlay.

**Form "Request a quote":** Nama (input teks), Email (input teks), Message (textarea) → tombol submit "Send Message" (hitam solid, full width).

**Penutupan drawer:** ikon X pojok kanan atas, atau klik area overlay di luar panel.

**Validasi:**
- Nama, Email, Message wajib diisi (required) — dicek saat submit.
- Format email divalidasi real-time (regex standar `@` + domain valid), pesan error merah muncul inline.

**Setelah submit sukses:**
- Toast/modal konfirmasi "Pesan diterima, akan segera dibalas".
- Form otomatis reset ke kosong.
- Data (nama, email, pesan) dikirim real-time ke email pribadi via **EmailJS** (atau Formspree sebagai alternatif) — kunci API disimpan di `.env.local`, tidak di-hardcode di kode.

**Acceptance criteria:**
- [ ] Tidak bisa submit jika ada field kosong atau email tidak valid.
- [ ] Email benar-benar terkirim ke inbox pemilik saat form disubmit.
- [ ] Drawer bisa ditutup dengan 2 cara (X dan klik luar).

## 8. Responsivitas

Mobile-first. Breakpoint acuan Tailwind: `sm 640px`, `md 768px`, `lg 1024px`, `xl 1280px`.

| Section | Perilaku di mobile |
|---|---|
| Navbar | tetap floating pill, link disembunyikan ke dalam buffering dots jika ruang tak cukup |
| Hero | grid 2 kolom → stack 1 kolom (teks di atas, foto di bawah) |
| Experience | 2 kolom → stack, nama perusahaan tetap di atas job title |
| Skills | split layout → stack vertikal |
| Activities gallery | grid 3–4 kolom → 2 kolom di mobile |
| Contact drawer | lebar drawer menyesuaikan hingga hampir full-width di mobile |

## 9. Referensi Komponen

| Section | Kata kunci pencarian di 21st.dev |
|---|---|
| Navbar | "floating navbar", "pill navbar", "dynamic island navbar" |
| Hero | "split hero", "hero with stacked image cards" |
| Contact | "drawer form", "slide-over contact form" |
| Activities | "accordion list", "expandable list item" |
| Skills | "bento skill grid", "icon card grid" |
| Projects | "project grid card", "case study card" |

## 10. Rencana Eksekusi Bertahap

1. **Setup**: scaffold Next.js + TS + Tailwind, tanam design token (warna, radius, shadow) di `globals.css`, siapkan struktur folder.
2. **Navbar + Hero**: bangun state machine scroll + animasi Framer Motion, uji di browser.
3. **About + Experience**: layout 2 kolom, data statis dari `data/experience.ts`.
4. **Projects**: grid + halaman detail dinamis.
5. **Skills + Activities**: split layout, accordion + galeri.
6. **Contact**: drawer, validasi form, integrasi EmailJS.
7. **QA responsif & animasi**: uji di breakpoint mobile/tablet/desktop, cek transisi halus.
8. **Deploy**: siapkan build untuk Vercel.
