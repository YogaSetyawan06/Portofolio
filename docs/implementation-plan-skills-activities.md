# Fase 5: Skills & Activities — Implementation Plan

Membangun section Skills dan Activities di halaman utama mengikuti desain monochrome/grayscale sesuai dengan spesifikasi PRD §7.6 dan §7.7.

## Status Saat Ini
- Dependencies: `lucide-react` tersedia, tapi belum ada library khusus untuk logo tech stack (seperti React, Next.js, dll).
- Data model `Skill` di `types/index.ts` perlu disederhanakan kategorinya menjadi `"technical" | "soft"` dan ditambah properti `icon`.
- Data model `Activity` perlu diupdate format `description` menjadi array of strings untuk bullet points, dan penambahan `gallery`.
- Komponen `Skills.tsx` dan `Activities.tsx` masih berupa placeholder.

## Proposed Changes

### 1. Dependencies Setup
- Install `react-icons` untuk mendapatkan akses ke logo asli tech stack (dari bundle `react-icons/si` atau `react-icons/fa`).

### 2. Update Data & Types
- Update `Skill` dan `Activity` interface di `types/index.ts`.
- Sesuaikan `data/skills.ts` dan `data/activities.ts` dengan struktur data baru.

### 3. Komponen Skills (§7.6)
- **Layout:** Split 2 kolom (`grid-cols-1 md:grid-cols-2`).
- **Kiri (Technical Skills):** Grid bento/mini-cards untuk logo tech stack. Desain card putih kecil, rounded, dengan `box-shadow` halus.
- **Kanan (Soft Skills):** List vertikal dengan bullet point ikon bulat hitam.

### 4. Komponen Activities (§7.7)
- **Layout:** Daftar vertikal accordion.
- **Interaksi:** Hover memunculkan highlight abu-abu, klik akan membuka deskripsi & galeri dengan animasi mulus (`Framer Motion`).
- **Konten Terbuka:** List description dan grid Galeri (3-4 kolom).

### 5. Integrasi ke Halaman Utama
- Panggil `<Skills />` dan `<Activities />` di `app/page.tsx`.

## Verification Plan
1. Verifikasi grid ikon tech stack dan list soft skills.
2. Test interaksi expand/collapse accordion Activities.
3. Verifikasi foto galeri render dengan rapi.
4. Uji responsivitas ke ukuran mobile (stack layout & penyesuaian kolom grid galeri).
