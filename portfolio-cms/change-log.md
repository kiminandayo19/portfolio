# Changelog

Dokumen ini mencatat semua perubahan teknis, perbaikan bug, dan penambahan fitur pada proyek. Format pencatatan menggunakan timestamp untuk memastikan urutan perubahan yang akurat.

---

## [2026-01-22 01:30:00]
### Fixed
- **Link Component Deprecation**: Mengganti implementasi `Link` dengan properti `legacyBehavior` yang menyebabkan warning dengan komponen wrapper global `LinkButton`.
- **Server Component Serialization**: Memperbaiki error serialisasi fungsi saat passing `component={Link}` dari Server Component ke Client Component (MUI Button).
- **MUI Grid v6 Compatibility**: Memperbarui semua penggunaan `Grid` agar menggunakan props `size` untuk kompatibilitas.
- **Form Control Types**: Memperbaiki inferensi tipe `useFieldArray` dengan casting explicit.

### Added
- **LinkButton Component**: `src/components/common/LinkButton.tsx` sebagai solusi standar untuk navigasi client-side di dalam komponen MUI.
- **Delete Feature**: Menambahkan tombol hapus (DeleteButton) dengan dialog konfirmasi pada halaman Experiences dan Projects.
- **UI Redesign**: Menghadirkan tampilan baru yang modern dengan font `Inter`, tata letak "Floating Sidebar", dan elemen "Glassmorphism" pada Header dan Kartu.
- **Dashboard Widget**: Menambahkan banner selamat datang dan ringkasan statistik (Overview) pada dashboard.

---

## [2026-01-21 19:55:00]
### Added
- Inisialisasi proyek CMS Next.js.
- Integrasi Backend API Service.
- UI Profile, Experience, Project, Skills.
