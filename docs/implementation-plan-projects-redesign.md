# Fase 8: Projects Redesign & Listing Page

Sesuai dengan arahan Anda untuk merombak total tampilan section *Projects* dan mengimplementasikan sistem *routing* halaman tambahan, saya telah menyiapkan rencana implementasi teknis berikut.

## User Review Required

- **Struktur Data Terkini**: Saat ini `data/projects.ts` hanya berisi **4 project**. Karena homepage diset untuk menampilkan maksimal 4 project, maka di homepage dan halaman `/projects` akan tampil jumlah yang sama untuk saat ini. Sistem ini sudah *future-proof*, jika Anda menambah project ke-5, otomatis homepage hanya menampilkan 4 terbaru, dan halaman `/projects` akan menampilkan semuanya. Apakah jumlah 4 ini sudah sesuai untuk permulaan?
- **Komponen Reusable**: Untuk menghindari duplikasi kode antara homepage dan halaman `/projects`, saya akan mengekstrak rancangan *card* ke dalam komponen terpisah bernama `ProjectCard.tsx` di folder `components/ui/`. 

## Proposed Changes

### UI Components

Akan ada modifikasi besar pada desain kartu dan komponen baru untuk *listing*.

#### [NEW] `components/ui/ProjectCard.tsx`
- Menghapus efek `glassmorphism`, `border`, dan bayangan. 
- Menambahkan *thumbnail* ukuran penuh yang memiliki *border-radius* 16px dengan efek *zoom* (`scale-105`) lembut saat *hover*.
- Konten teks diatur `flex justify-between` (Nama/Role di kiri, "View Project" di kanan).
- Mengimplementasikan efek dua panah diagonal (`ArrowUpRight` dari Lucide) yang saling bergantian masuk dan keluar *frame* (*slide-up-right*) secara mulus memanfaatkan `group-hover` dan manipulasi translasi posisi.

#### [MODIFY] `components/sections/Projects.tsx`
- Mengimpor dan memanggil komponen `ProjectCard.tsx`.
- Membatasi render *loop* menjadi maksimal 4 *item* (`projects.slice(0,4)`).
- Mengubah *grid* menjadi 2 kolom di *desktop* (`md:grid-cols-2`).
- Menambahkan tombol/teks bergaris bawah "View all my projects" di bagian terbawah yang memiliki animasi garis muncul (*opacity*) saat di- *hover*, yang membidik jalur `/projects`.

### App Routing (Halaman Baru)

Pembuatan halaman arsip untuk seluruh koleksi proyek Anda.

#### [NEW] `app/projects/page.tsx`
- Membuat halaman baru yang me-render seluruh *array* dari `data/projects.ts` tanpa batasan jumlah.
- Menggunakan komponen `ProjectCard.tsx` yang sama dan menggunakan *layout grid 2 kolom* yang identik dengan beranda untuk menjaga konsistensi.

## Verification Plan

### Manual Verification
- Meluncurkan *Browser Subagent* untuk memeriksa beranda (harus hanya menampilkan grid 2x2 dan tautan "View all my projects").
- *Browser Subagent* menekan tautan "View all" menuju `/projects` dan menangkap layar dari halaman arsip proyek.
- Memeriksa fungsionalitas dan kelancaran animasi panah *diagonal* dan *hover state* pada gambar.
