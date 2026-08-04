# Fase 9: Global Layout, Typography & Font Pairing

Perombakan global yang menyentuh **semua section** dari Hero sampai Footer untuk menyeragamkan container, menambah garis dekoratif, menerapkan fluid typography, dan mengganti font pairing.

## Scope Audit — Container Width Saat Ini

| Section | Wrapper saat ini | Max-width |
|---------|-----------------|-----------|
| Hero | `max-w-7xl mx-auto` + `px-6 md:px-12 lg:px-20 xl:px-28` | 1280px |
| About | `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8` | 1152px |
| Experience | `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8` | 1152px |
| Projects | `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8` | 1152px |
| Skills | `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8` | 1152px |
| Activities | `max-w-4xl mx-auto px-4 sm:px-6 lg:px-8` | 896px |
| Footer | `max-w-5xl mx-auto px-4 sm:px-6 lg:px-8` | 1024px |

Semua akan diseragamkan ke **max-width: 1080px** dengan **padding horizontal 44px** sesuai referensi.

## Changes

1. **Container Reusable**: Buat `components/shared/Container.tsx` (max-w-[1080px], px-[44px]).
2. **Migrasi Container**: Ganti wrapper di Hero, About, Experience, Projects, Skills, Activities, Footer, dan /projects/page.tsx.
3. **Garis Vertikal Dekoratif**: Dua elemen fixed di page.tsx, tampil di lg+.
4. **Fluid Typography**: Tambah clamp() font sizes di tailwind.config.js, migrasi semua heading.
5. **Font Pairing**: Plus Jakarta Sans (heading) + Inter (body) via next/font/google.

## Verification Plan
- Screenshot full-page untuk cek konsistensi garis dan container alignment.
- Test responsif mobile dan tablet.
