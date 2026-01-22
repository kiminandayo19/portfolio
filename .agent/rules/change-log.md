---
trigger: always_on
---

# Changelog

Dokumen ini mencatat semua perubahan teknis, perbaikan bug, dan penambahan fitur pada proyek. Format pencatatan menggunakan timestamp untuk memastikan urutan perubahan yang akurat.

---

## [2026-01-21 19:55:00]
### Added
- Inisialisasi proyek backend menggunakan Express.js dan TypeScript.
- Integrasi Supabase untuk manajemen konten portfolio secara dinamis.
- Implementasi RESTful API untuk resource: `profiles`, `experiences`, `projects`, dan `skills`.
- Penambahan skema database Supabase (`supabase-schema.sql`) lengkap dengan RLS (Row Level Security).
- Penambahan unit testing menggunakan Jest dengan cakupan >80% pada logika utama.
- Implementasi middleware keamanan (Helmet, CORS) dan validasi request.

---

## [2026-01-21 16:30:45]
### Added
- Membuat file `ui-design.md` sebagai standar desain UI minimalis berbasis MUI.
- Menambahkan konfigurasi palet warna untuk *Light Mode* dan *Dark Mode*.

### Updated
- Memperbarui dokumentasi arsitektur proyek pada file `README.md`.

---

## [2026-01-21 10:15:20]
### Fixed
- Memperbaiki masalah kontras teks pada komponen `Button` saat berada di *Dark Mode*.
- Menangani *layout shifting* pada saat transisi tema warna.

---

## [2026-01-20 14:05:10]
### Added
- Inisialisasi struktur dasar proyek menggunakan Next.js dan Material UI v6.
- Implementasi `ThemeContextProvider` untuk manajemen state *dark mode*.

---

## Aturan Penulisan Log
Untuk menjaga konsistensi, gunakan format berikut saat menambahkan entri baru:

1. **Format Judul:** `## [YYYY-MM-DD HH:mm:ss]`
2. **Kategori Perubahan:**
    - `Added`: Untuk fitur baru.
    - `Updated`: Untuk perubahan pada fitur yang sudah ada.
    - `Fixed`: Untuk perbaikan bug.
    - `Removed`: Untuk fitur yang dihapus.
3. **Deskripsi:** Gunakan kalimat yang singkat, padat, dan jelas (poin-poin).