# Fase 4: Projects Section — Implementation Plan

Membangun section Projects grid di halaman utama + halaman detail dinamis `/projects/[slug]`, mengikuti design system grayscale/monochrome yang sudah diterapkan di section sebelumnya.

## Status Saat Ini

| Item | Status |
|---|---|
| `types/index.ts` — `Project` interface | ✅ Sudah ada, sesuai PRD |
| `data/projects.ts` — 4 proyek dummy | ✅ Sudah ada, perlu tambah field `summary` untuk ringkasan kartu |
| `components/sections/Projects.tsx` | ⬜ Placeholder, perlu dibangun |
| `app/projects/[slug]/page.tsx` | ⬜ Placeholder, perlu dibangun |
| `public/images/projects/` | ⬜ Hanya `.gitkeep`, perlu thumbnail |

## Proposed Changes

### 1. Data & Types
- Tambah field `summary: string` ke `Project` interface
- Tambah field `summary` ke setiap proyek di `data/projects.ts`

### 2. Thumbnail Images
- Generate 4 placeholder thumbnail images (visual abstrak/gradient)
- Simpan di `public/images/projects/`

### 3. Projects Grid Section (Halaman Utama)
- Rewrite `components/sections/Projects.tsx`
- Grid `1 → 2 kolom`, kartu putih rounded shadow, thumbnail + judul + summary + role badge
- Hover: subtle scale + shadow lift, Link ke `/projects/${slug}`
- Animasi masuk: staggered fade-up per kartu

### 4. Project Detail Page
- Rewrite `app/projects/[slug]/page.tsx`
- Data lookup + `notFound()`, `generateMetadata()`, `generateStaticParams()`
- Tombol Back, thumbnail hero, grid 2×2 info cards (Problem, Solution, Role, Result)
- Animasi fade-in staggered

### 5. Page Transition
- Animasi entrance pada halaman detail (fade-up + stagger) — pragmatis tanpa complex page transition wrapper

## File Summary

| File | Action |
|---|---|
| `types/index.ts` | MODIFY — tambah `summary` |
| `data/projects.ts` | MODIFY — tambah `summary` per proyek |
| `components/sections/Projects.tsx` | REWRITE — grid kartu proyek |
| `app/page.tsx` | MODIFY — import `<Projects />` |
| `app/projects/[slug]/page.tsx` | REWRITE — halaman detail |
| `public/images/projects/*.jpg` | NEW — 4 placeholder thumbnails |

## Verification
1. Grid tampil 2 kolom di desktop, 1 kolom di mobile
2. Klik kartu → navigasi ke `/projects/[slug]` dengan konten lengkap
3. Tombol Back berfungsi
4. Screenshot kedua halaman
