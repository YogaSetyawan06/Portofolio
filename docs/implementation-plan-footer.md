# Fase 7: Footer Section — Implementation Plan

Membangun Footer baru dengan mengadaptasi referensi desain *launchfolio*, namun tetap menjaga konsistensi dengan *Grayscale Design System* proyek ini (PRD §5).

## Proposed Changes

### 1. Komponen Baru: [NEW] `components/layout/Footer.tsx`

- **Layout & Latar Belakang:**
  - Section paling bawah, `w-full`, dengan *background* gelap (`bg-[#1A1C1C]` alias `--gray-900`).
  - Responsif: Vertikal rata tengah di *mobile*, horizontal sejajar di *desktop*.

- **Heading Utama (2 Baris):**
  - Menggunakan tipografi besar dan tebal.
  - Baris 1: "Let's create" (Warna putih `--white`).
  - Baris 2: "something great together." (Warna abu-abu `--gray-500`).

- **Info Grid (3 Kolom):**
  - **Email:** *Label* teks abu-abu, diikuti dengan tautan email tebal.
  - **Contact:** Tombol "Get in Touch" yang me-reusable `ContactDrawer` (terdapat *state* `isContactOpen` lokal di Footer).
  - **Social:** Deretan *icon* media sosial berwujud bundar (*pill radius*), mengambil data dari `data/socials.ts`.

- **Divider & Menu Row:**
  - Garis pemisah tipis berwarna `--gray-800`.
  - Tautan *Quick Links* (About, Experience, Projects, Skills, Activity) menggunakan fungsi *anchor scroll* dengan kalkulasi *offset* yang sama persis seperti Navbar.
  - *Copyright* text di sudut kanan layar pada *desktop* atau paling bawah pada *mobile*.

- **Elemen Dekoratif "Big Typography":**
  - Teks raksasa bertuliskan **"YOGA"** di ujung paling bawah footer.
  - Memanfaatkan satuan `vw` (`text-[25vw]`) agar ukuran font membesar dinamis dan menabrak (*overflow*) tepi layar secara sengaja.
  - Menerapkan div *overlay gradient* dari transparan ke warna `#1A1C1C` untuk menciptakan efek blur/memudar di bagian atas atau bawah teks tersebut sesuai referensi.

### 2. Update Layout Utama: [MODIFY] `app/layout.tsx` atau `app/page.tsx`
- Mengimpor dan meletakkan `<Footer />` di bagian paling bawah halaman (setelah semua sections selesai).

## Verification Plan

1. **Responsivitas:** Membuka browser pada rasio layar *mobile* untuk memastikan kolom info dan menu bertumpuk secara vertikal (stack) dan teks besar YOGA tidak merusak *horizontal scroll*.
2. **Fungsionalitas Quick Links:** Menekan tombol tautan di Footer dan memastikan layar *scroll* ke atas menuju section yang dituju dengan jarak jeda (*gap*) yang konsisten seperti Navbar.
3. **Fungsionalitas Contact:** Menekan tombol "Get in Touch" dan memastikan fitur *Contact Drawer* dari sisi kanan tetap bisa dipanggil.
4. **Visual Check:** Memastikan desain mematuhi aturan warna *grayscale* tanpa adanya palet warna eksternal.
