
# Changelog

Dokumen ini mencatat semua perubahan teknis, perbaikan bug, dan penambahan fitur pada proyek. Format pencatatan menggunakan timestamp untuk memastikan urutan perubahan yang akurat.

---
## [2026-01-22 10:30:00]
### Added
- **Documentation**: Generated comprehensive `README.md` in the root directory covering the Portfolio Website, CMS, and Backend API ecosystem.

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

## [2026-01-21 19:55:00]
### Added
- Inisialisasi proyek CMS Next.js.
- Integrasi Backend API Service.
- UI Profile, Experience, Project, Skills.

## [2026-01-22 03:00:00]
### Added
- **Portfolio CMS**:
    - Initial release of Content Management System for Portfolio.
    - Built with **Next.js 16**, **Material UI v6**, and **TypeScript**.
    - **Features**:
        - Profile Management (View & Edit).
        - Experience Management (List, Create, Edit).
        - Project Management (List, Create, Edit).
        - Skills Management (List, Create, Edit).
    - **Architecture**:
        - Server Actions for secure backend communication.
        - Zod Validation for all forms.
        - Unit Tests for API Service (>80% coverage).
    - **UI**: Supports Dark Mode and Responsive Layout.

## [2026-01-21 21:20:00]
### Added
- **UI Enhancements**:
    - Implementasi **Smooth Scrolling** global untuk navigasi internal.
    - Penambahan animasi hover dan tap pada button Navbar dan Hero menggunakan **Framer Motion**.
    - Implementasi komponen **ScrollToTop** (Floating Action Button) pada pojok kanan bawah.
    - Perbaikan **Hydration Mismatch error** pada `ThemeRegistry` untuk mendukung render Next.js 16 yang lebih stabil.


## [2026-01-21 20:30:00]
### Added
- **Integrasi API Backend**:
    - Implementasi `api-service.ts` untuk komunikasi Server-to-Server yang aman.
    - Implementasi `portfolio-service.ts` untuk fetching data profil, pengalaman, proyek, dan skill.
    - Implementasi **Next.js Server Actions** di `portfolio-actions.ts` sebagai bridge keamanan.
    - Refaktor komponen `HeroSection`, `ExperienceSection`, `ProjectsSection`, dan `SkillsSection` untuk menerima data dinamis melalui props.
    - Penambahan file `.env.example` sebagai referensi konfigurasi backend.
    - TypeScript types untuk response backend di `src/types/backend.ts`.
    - Penambahan script seeding di `src/seed/seed.ts` untuk migrasi data awal ke Supabase.


## [2026-01-21 18:50:00]
### Added
- **Mobile Responsiveness**:
    - **Navbar**: Added hamburger menu with slide-in drawer for mobile.
    - **Hero Section**: Buttons stack vertically and become full-width on mobile.
    - **Experience**: Timeline dots/lines hidden on mobile for cleaner look.
    - **All Sections**: Already use MUI Grid with responsive breakpoints.

## [2026-01-21 18:45:00]
### Added
- **Scroll Animations**: Added `FadeIn` animations to all major sections.

## [2026-01-21 17:52:00]
### Updated
- **Skills/Contact Sections**: Redesigned with macOS "Tahoe" style.

## [2026-01-21 17:48:30]
### Updated
- **Project Cards**: Redesigned with "Tahoe" style.

## [2026-01-21 17:45:10]
### Updated
- **ThemeRegistry**: Added automatic dark mode detection.

## [2026-01-21 17:42:00]
### Added
- **Portfolio Website**: Initial release.
