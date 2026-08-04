# Implementation Plan: Project Detail Page Redesign + Global Decorative Lines

## Tujuan
1. Redesign halaman `/projects/[slug]` mengikuti wireframe referensi
2. Refaktor garis dekoratif vertikal & horizontal menjadi global dan reusable

---

## 1. Data Model Updates

### [MODIFY] `types/index.ts`
Tambah field baru ke interface `Project`:
```typescript
export interface Project {
  // ... existing fields
  githubUrl: string;
  websiteUrl?: string;       // optional
  techStack: string[];        // nama tech → di-resolve ke icon dari skills mapping
}
```

### [MODIFY] `data/projects.ts`
Update setiap proyek dengan field baru:
- `githubUrl`: placeholder `"https://github.com/yogasetyawan"` (user akan isi nanti)
- `websiteUrl`: `undefined` kecuali proyek yang sudah punya
- `techStack`: array nama teknologi yang match dengan `data/skills.ts` icon mapping

---

## 2. Shared Icon Resolver

### [NEW] `utils/iconResolver.ts`
Fungsi helper yang me-resolve string nama teknologi ke React component icon.
Reuse mapping yang sama persis dengan `data/skills.ts` (Si prefix → react-icons/si, Lucide prefix → lucide-react).

Alur: `techStack string → cari di flat skills map → ambil icon string → resolve ke component`.

Ini menghindari duplikasi definisi icon — satu sumber data (`data/skills.ts`) untuk semua.

---

## 3. Reusable SectionDivider Component

### [NEW] `components/shared/SectionDivider.tsx`
Komponen reusable garis horizontal tipis yang saat ini didefinisikan inline di `HomeClient.tsx`:
```tsx
export function SectionDivider() {
  return (
    <div className="w-full max-w-[1080px] mx-auto px-6 md:px-8 lg:px-[44px]">
      <div className="w-full h-px bg-gray-300" />
    </div>
  );
}
```
Dipakai di: homepage (antar section), project detail (antar card), dan listing page.

### [MODIFY] `components/HomeClient.tsx`
- Hapus definisi `SectionDivider` inline, import dari `components/shared/SectionDivider`

---

## 4. Global Vertical Lines

### Strategi
Pindahkan garis vertikal dari `HomeClient.tsx` (yang hanya berlaku di homepage) ke **`app/layout.tsx`** agar otomatis tampil di semua route.

### [MODIFY] `app/layout.tsx`
Tambahkan 2 `<div>` garis vertikal sebagai direct children `<body>`:
```tsx
<body className="font-body">
  {/* Global decorative vertical lines */}
  <div
    className="fixed inset-y-0 w-px bg-gray-300 pointer-events-none z-10 hidden lg:block"
    style={{ left: "calc(50% - 540px)" }}
  />
  <div
    className="fixed inset-y-0 w-px bg-gray-300 pointer-events-none z-10 hidden lg:block"
    style={{ left: "calc(50% + 540px)" }}
  />
  {children}
</body>
```

> [!IMPORTANT]
> Menggunakan `fixed` (bukan `absolute`) agar garis tetap terlihat saat scroll di semua halaman. `z-10` memastikan di atas konten tapi di bawah Navbar (`z-50`) dan drawer.

### [MODIFY] `components/HomeClient.tsx`
- **Hapus** definisi garis vertikal dari sini (sudah dipindah ke layout)
- **Hapus** `overflow-hidden` dari `<main>` (yang sebelumnya diperlukan untuk absolute lines, tidak perlu lagi untuk fixed global lines)

---

## 5. Project Detail Page Redesign

### [MODIFY] `app/projects/[slug]/ProjectDetailContent.tsx`
Redesign total mengikuti wireframe:

**Layout baru (vertikal, atas ke bawah):**
1. **Back link**: `← back to project`
2. **Judul**: heading besar (`text-4xl md:text-5xl`)
3. **Summary**: teks abu-abu di bawah judul
4. **Image Carousel**: 
   - Area gambar besar rounded
   - Tombol `<` dan `>` di kedua sisi (Framer Motion `AnimatePresence` untuk slide + fade transition)
   - Sembunyikan tombol jika `gallery` kosong atau 1 gambar (tampilkan thumbnail saja)
   - Indicator dots di bawah untuk posisi slide
5. **Info Cards** (vertikal, full-width, dipisahkan `SectionDivider`):
   - **Problem card**: bg-gray-100, rounded-card, padding
   - **Solution card**: sama
   - **Tech Stack card**: grid ikon (reuse styling Skills section — card putih, rounded, shadow, hover raise)
   - **Result card**: 2 tombol pill-shaped

**Tombol Result — keputusan UX fallback:**

> [!NOTE]
> **Pendekatan yang dipilih:** Jika `websiteUrl` tidak ada, tombol kedua berubah label menjadi **"View Source"** (tetap arah ke GitHub, ikon tetap). Alasan:
> - Lebih jujur secara UX (user tahu apa yang akan mereka buka)
> - Tidak ada tombol yang mengarah ke URL yang sama dengan label berbeda (membingungkan)
> - Jika `websiteUrl` ada: tombol "View on GitHub" + "Visit Website" (dua link berbeda)
> - Jika `websiteUrl` tidak ada: hanya tampilkan 1 tombol "View on GitHub" saja (menghindari redundansi)

---

## 6. Projects Listing Page — Horizontal Lines

### [MODIFY] `app/projects/page.tsx`
**Keputusan:** Tidak menambahkan garis horizontal di listing `/projects` — alasannya:
- Grid 2 kolom dengan `gap-12` sudah memberikan pemisahan visual yang cukup
- Menambahkan garis horizontal antar baris di grid 2 kolom akan terlihat berlebihan dan mengganggu flow card
- Garis vertikal global sudah cukup membingkai konten

---

## 7. Verification Plan

1. Buka halaman detail proyek → cek layout vertikal (back link, title, summary, carousel, cards)
2. Coba slide gambar carousel (jika gallery ada isi)
3. Hover semua tombol (GitHub, Visit Website, navigation arrows)
4. Cek halaman `/projects` → garis vertikal tampil
5. Cek homepage → garis vertikal + horizontal tetap konsisten
6. Screenshot semua halaman
