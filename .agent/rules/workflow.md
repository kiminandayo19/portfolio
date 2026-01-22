---
trigger: always_on
---

# Developer Workflow & SOP

Dokumen ini mendefinisikan alur kerja standar (Standard Operating Procedure) yang wajib diikuti untuk setiap tugas, mulai dari perencanaan hingga penyelesaian (finalization).

---

## Ringkasan Alur Kerja
1. **Analyze:** Memahami kebutuhan & aturan keamanan.
2. **Develop:** Coding dengan prinsip DRY & Functional.
3. **Validate:** Membuat unit test & cek coverage (>80%).
4. **Security Audit:** Cek checklist keamanan.
5. **Document:** Mencatat perubahan di `change-log.md`.

---

## Fase 1: Perencanaan & Analisis
Sebelum menulis kode, lakukan langkah berikut:
- Baca instruksi user dengan teliti.
- Identifikasi apakah perubahan ini berdampak pada UI (cek `ui-design.md`).
- Tentukan fungsi-fungsi murni (*pure functions*) yang perlu dibuat.
- Identifikasi potensi celah keamanan pada fitur baru (cek `security-rules.md`).

## Fase 2: Pengembangan (Development)
Saat menulis kode, patuhi aturan `code-style.md`:
- Gunakan **Functional Programming** (Immutability, No Side Effects).
- Terapkan prinsip **DRY**. Jangan ada kode redundan.
- Jika membuat UI: Pastikan berbasis **MUI**, minimalis, dan mendukung **Dark Mode**.
- Gunakan variabel lingkungan (env) untuk data sensitif.

## Fase 3: Pengujian (Testing)
Setelah kode ditulis, wajib mengikuti `testing-rules.md`:
1. Buat file `.test.ts` atau `.spec.ts`.
2. Tulis test case untuk *happy path* dan *edge cases*.
3. Jalankan test runner.
4. **Penting:** Pastikan *Code Coverage* mencapai minimal **80%**. Jika belum, tambahkan test case hingga mencapai target.

## Fase 4: Audit Keamanan (Security Check)
Lakukan pemeriksaan mandiri berdasarkan `security-rules.md`:
- Apakah ada input yang belum disanitasi?
- Apakah ada rahasia yang ter-hardcode?
- Apakah otentikasi sudah diterapkan pada level server?
- Apakah pesan error sudah aman (tidak membocorkan info sistem)?

## Fase 5: Dokumentasi & Penyerahan
Setelah semua verifikasi selesai:
1. Buka `change-log.md`.
2. Tambahkan entri baru dengan **Timestamp** saat ini (Format: `[YYYY-MM-DD HH:mm:ss]`).
3. Kategorikan perubahan (`Added`, `Updated`, `Fixed`, atau `Removed`).
4. Berikan ringkasan singkat hasil test (misal: "Tests passed with 85% coverage").

---

## Checklist Penyelesaian (Internal)
Agent dilarang memberikan hasil sebelum semua poin ini tercentang:
- [ ] Kode mengikuti paradigma fungsional murni.
- [ ] Tidak ada duplikasi kode (DRY).
- [ ] Unit test sudah dibuat dan coverage > 80%.
- [ ] Audit keamanan telah dilakukan.
- [ ] UI konsisten dengan standar minimalis modern MUI.
- [ ] `change-log.md` telah diperbarui dengan timestamp.

---

## Contoh Eksekusi Tugas
**User:** "Tambahkan fungsi hitung diskon dan tampilkan di UI."

**Alur Agent:**
1. Rancang fungsi `calculateDiscount` sebagai *pure function*.
2. Buat komponen UI menggunakan MUI `Typography` dan `Box` yang rapi.
3. Tulis `discount.test.ts` untuk menguji berbagai nominal.
4. Pastikan tidak ada celah keamanan pada input angka.
5. Update `change-log.md` dengan timestamp.
6. Berikan kode + test + log kepada user.