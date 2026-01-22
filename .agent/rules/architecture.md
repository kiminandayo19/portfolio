---
trigger: always_on
---

# Software Architecture & Folder Structure Guidelines

Dokumen ini mendefinisikan standar arsitektur untuk proyek Next.js 16. Tujuannya adalah untuk menjaga keteraturan kode, skalabilitas, dan pemisahan tanggung jawab yang jelas antar lapisan aplikasi.

---

## 1. Struktur Folder Utama (`src`)

Semua kode sumber aplikasi berada di dalam folder `src/` untuk memisahkan konfigurasi root dengan logika aplikasi.



```text
src/
├── app/                # Next.js 16 App Router (Routes, Pages, Layouts)
├── components/         # UI Components (Atomic Design Methodology)
│   ├── atoms/          # Komponen terkecil dan paling dasar
│   ├── molecules/      # Gabungan beberapa atoms
│   └── organisms/      # Komponen kompleks yang lebih besar
├── lib/                # Shared utilities, helpers, dan konfigurasi library
├── services/           # Lapisan komunikasi API (API Client/Fetching)
├── hooks/              # Custom React Hooks
├── types/              # Definisi TypeScript (Interfaces/Types)
└── assets/             # Static assets (Icons, Images, Styles)