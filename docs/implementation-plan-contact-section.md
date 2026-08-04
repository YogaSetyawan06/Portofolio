# Fase 6: Contact Section — Implementation Plan

Membangun fitur Contact berupa *Drawer* interaktif dari sisi kanan layar untuk mengirimkan pesan (terintegrasi dengan EmailJS), sesuai PRD §7.8.

## Status Saat Ini
- Tombol "Contact" di Navbar saat ini hanya berupa *anchor link* `#contact`.
- Dependencies `react-hook-form`, `zod`, dan `@hookform/resolvers` sudah terinstal.
- `emailjs-com` atau `@emailjs/browser` belum terinstal.

## Proposed Changes

### 1. Dependencies Setup
- Install `@emailjs/browser` dan `lucide-react` (untuk toast ikonik) jika belum ada.

### 2. Komponen UI & Interaksi
- **ContactDrawer.tsx:** Panel *Drawer* melayang dari sisi kanan (`fixed right-0`). Menggunakan `AnimatePresence` dan `motion.div` untuk *slide-in/out* dan *fade-in/out* overlay. 
- **Form (RHF + Zod):** Validasi Zod schema untuk required, minimum karakter, dan regex email. Menampilkan pesan error merah *inline*.
- **Logika Submit & EmailJS:** Mengambil kredensial dari `process.env.NEXT_PUBLIC_EMAILJS_...`. Jika kredensial kosong, sistem menggunakan *fallback* berupa simulasi sukses.
- **Navbar.tsx:** Menambahkan *state* `isContactOpen` untuk memicu Drawer.

### 3. Environment Variables
- Membuat file `.env.local` berisi checklist kredensial EmailJS untuk diisi nanti.

## Verification Plan
1. Buka drawer dan tes penutupan via tombol "X" dan klik di overlay area luar.
2. Submit form kosong: Verifikasi error validasi Zod bekerja.
3. Submit email salah: Verifikasi regex bekerja.
4. Submit form valid dengan kredensial kosong: Verifikasi *fallback* berjalan lancar.
