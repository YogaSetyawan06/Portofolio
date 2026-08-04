# Implementation Plan: Scroll-Linked Profile Photo Transition

## Objective
Mengubah foto profil yang saat ini muncul sebagai 2 elemen terpisah (Hero dan About) menjadi **1 elemen foto tunggal** yang berpindah posisi & ukuran secara **mulus terikat pada scroll** (scroll-linked shared element transition) — dari posisi Hero ke posisi About.

## Referensi Video
Video `animasi-referensi-home-to-about-pp.mp4` menunjukkan animasi dengan karakteristik:
- **Feel**: Smooth, responsif, mengikuti scroll secara real-time (bukan animasi berbasis trigger)
- **Timing**: Sedikit spring-like damping agar tidak terasa "kaku" (menggunakan `useSpring` sebagai smoothing layer)
- **Reversible**: Scroll balik ke atas mengembalikan foto ke posisi awal

---

## Perubahan File

### [NEW] `components/shared/ScrollLinkedPhoto.tsx`
Komponen utama yang menangani seluruh animasi scroll-linked.

**Cara kerja:**
1. Merender 1 elemen `<Image>` tunggal yang posisinya dikontrol via `position: fixed` (agar terlepas dari layout flow).
2. Membaca koordinat 2 "slot" placeholder (Hero slot & About slot) via `ref` callback dari parent.
3. Menggunakan Framer Motion `useScroll()` + `useTransform()` + `useSpring()` untuk memetakan `scrollY` ke interpolasi properti CSS:
   - `top` (posisi vertikal relatif viewport)
   - `left` (posisi horizontal relatif viewport)
   - `width` & `height` (ukuran foto)
   - `borderRadius` (dari `14px` di Hero ke `32px` di About)

**Scroll range:**
- `scrollStart = 0` (top of page)
- `scrollEnd = aboutSlotTop - viewportHeight * 0.3` (titik saat About section mulai terlihat sebagian)
- Progress di-clamp antara 0 dan 1.

**Spring config (untuk feel smooth):**
```ts
{ stiffness: 100, damping: 30, mass: 0.5 }
```

**Social icons overlay:**
- Opacity di-interpolate: `useTransform(progress, [0.85, 1], [0, 1])`
- Muncul hanya saat foto hampir mencapai posisi About.

**Stacked cards (yang ada di Hero):**
- Opacity di-interpolate terbalik: `useTransform(progress, [0, 0.3], [1, 0])`
- Fade-out saat foto mulai bergerak dari Hero.

---

### [MODIFY] `components/sections/Hero.tsx`
1. **Hapus** elemen `<Image>` dan dekorasi stacked cards dari JSX.
2. **Ganti** dengan `<div ref={heroSlotRef}>` placeholder yang mempertahankan **dimensi yang sama** (`w-full max-w-md aspect-[4/5]`), tetapi **tidak menampilkan gambar**.
3. **Export** ref callback agar parent bisa membaca posisinya.
4. Placeholder ini **invisible** tapi tetap memakan ruang di layout (agar text konten Hero tetap pada posisinya).

**Pendekatan ref sharing:**
Hero dan About akan meng-accept prop `slotRef: React.RefObject<HTMLDivElement>` yang dipass dari parent (`page.tsx`).

---

### [MODIFY] `components/sections/About.tsx`
1. **Hapus** elemen `<Image>` dari foto profil.
2. **Ganti** dengan `<div ref={aboutSlotRef}>` placeholder dengan dimensi yang sama (`w-full aspect-[4/5] rounded-[32px]`).
3. **Pindahkan** overlay social icons dari About ke `ScrollLinkedPhoto.tsx` agar bisa dikontrol opacity-nya berdasarkan scroll progress.
4. Placeholder ini **invisible** tapi tetap memakan ruang di layout.

---

### [MODIFY] `app/page.tsx`
1. **Import** `ScrollLinkedPhoto` dan render di level top (sejajar dengan `<main>`).
2. **Buat** 2 ref: `heroSlotRef` dan `aboutSlotRef`.
3. **Pass** ref ke Hero dan About sebagai props.
4. **Pass** kedua ref ke `ScrollLinkedPhoto`.
5. Karena page.tsx saat ini adalah **server component**, perlu diubah ke **client component** (`"use client"`), atau lebih baik: buat wrapper client component baru `HomeClient.tsx` yang membungkus semuanya.

**Opsi terbaik:** Buat `components/HomeClient.tsx` sebagai client wrapper:
```tsx
"use client";
import { useRef } from "react";
// ... imports

export default function HomeClient() {
  const heroSlotRef = useRef<HTMLDivElement>(null);
  const aboutSlotRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <ScrollLinkedPhoto heroSlotRef={heroSlotRef} aboutSlotRef={aboutSlotRef} />
      <Navbar />
      <main>
        <Hero slotRef={heroSlotRef} />
        <About slotRef={aboutSlotRef} />
        ...
      </main>
      <Footer />
    </>
  );
}
```

Dan `app/page.tsx` tinggal:
```tsx
import HomeClient from "@/components/HomeClient";
export default function Home() {
  return <HomeClient />;
}
```

---

## Logika Detil ScrollLinkedPhoto

```
┌─────────────────────────────────────────────┐
│  Scroll Progress = 0  (Hero position)       │
│  ┌────────────┐                             │
│  │ Stacked    │  ← Opacity 1               │
│  │ Cards +    │                             │
│  │ Photo      │  ← fixed, coords = heroSlot│
│  │            │                             │
│  └────────────┘                             │
│  Social Icons: Opacity 0                    │
├─────────────────────────────────────────────┤
│  Scroll Progress = 0.5  (mid-transition)    │
│                                             │
│       ┌──────────┐                          │
│       │ Photo    │  ← interpolated pos/size │
│       │          │                          │
│       └──────────┘                          │
│  Stacked Cards: Opacity 0                   │
│  Social Icons: Opacity 0                    │
├─────────────────────────────────────────────┤
│  Scroll Progress = 1  (About position)      │
│  ┌──────────┐                               │
│  │ Photo    │  ← fixed, coords = aboutSlot  │
│  │  [icons] │  ← Social Icons: Opacity 1    │
│  └──────────┘                               │
│  Stacked Cards: Opacity 0                   │
│  Scroll lebih lanjut: foto TIDAK bergerak   │
└─────────────────────────────────────────────┘
```

### Penanganan edge cases:
- **Resize window**: Recalculate slot positions via `ResizeObserver`.
- **Mobile (< lg)**: Di mobile, Hero dan About memiliki layout vertikal (1 kolom). Foto tetap bisa di-animate karena slot positions akan otomatis terhitung berdasarkan layout responsif.
- **SSR**: Komponen `ScrollLinkedPhoto` adalah client-only, koordinat baru dihitung setelah mount.

---

## Verification Plan

### Automated
- Pastikan build tidak error: `npm run build`

### Manual (Browser)
1. Scroll pelan dari Hero ke About — foto harus bergerak smooth mengikuti scroll.
2. Scroll balik ke atas — foto harus kembali ke posisi Hero.
3. Stacked cards harus fade-out saat foto mulai bergerak.
4. Social icons harus fade-in hanya saat foto mencapai posisi About.
5. Setelah foto di posisi About, scroll lebih lanjut ke Experience dst — foto harus tetap diam di About.
6. **Rekam video** pendek prosesnya untuk dibandingkan dengan referensi.
