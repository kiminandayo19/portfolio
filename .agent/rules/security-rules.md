---
trigger: always_on
---

# Security & Vulnerability Checklist

Dokumen ini berisi pedoman wajib untuk memastikan keamanan aplikasi. Agent harus melakukan audit keamanan mandiri terhadap setiap kode yang dihasilkan berdasarkan checklist ini.

---

## 1. Validasi & Sanitasi Data (Input/Output)
* **Sanitize Everything:** Semua input dari user (form, query params, URL) harus dianggap berbahaya. Gunakan library sanitasi untuk mencegah **XSS (Cross-Site Scripting)**.
* **Tipe Data Statis:** Gunakan TypeScript untuk memastikan tipe data yang masuk sesuai dengan ekspektasi.
* **Prepared Statements:** Gunakan ORM/Query Builder yang mendukung *parameterized queries* untuk mencegah **SQL Injection**.
* **Output Encoding:** Pastikan data yang dirender ke DOM telah di-encode dengan benar.

---

## 2. Otentikasi & Otorisasi
* **Broken Access Control:** Selalu verifikasi hak akses di sisi server (Server-side), jangan hanya mengandalkan penyembunyian elemen di UI.
* **JWT & Session:**
    * Simpan token sensitif di `httpOnly` dan `secure` cookies.
    * Hindari menyimpan data sensitif (seperti role atau email) di dalam `localStorage`.
* **Least Privilege:** Berikan hak akses seminimal mungkin yang dibutuhkan oleh sebuah fungsi atau user.

---

## 3. Manajemen Rahasia (Secrets)
* **No Hardcoded Secrets:** Dilarang keras menuliskan API Key, Password, atau Database URL langsung di dalam kode.
* **Environment Variables:** Gunakan file `.env` yang terdaftar di `.gitignore`.
* **Validation:** Pastikan ada pengecekan jika environment variable yang dibutuhkan tidak tersedia saat runtime.

---

## 4. Keamanan Komunikasi & Browser
* **CORS Policy:** Atur kebijakan CORS secara spesifik. Hindari penggunaan wildcard (`*`) di lingkungan produksi.
* **Security Headers:** Implementasikan header keamanan minimal:
    * `Content-Security-Policy` (CSP)
    * `Strict-Transport-Security` (HSTS)
    * `X-Content-Type-Options: nosniff`
* **Secure Transfers:** Pastikan semua endpoint menggunakan HTTPS.

---

## 5. Dependency Management
* **Vulnerability Scanning:** Selalu cek dependensi menggunakan `npm audit` atau `snyk`.
* **Minimal Dependencies:** Jangan menambahkan library pihak ketiga jika logika bisa dibuat secara sederhana dengan kode internal (prinsip DRY + Minimalist).

---

## 6. Penanganan Error & Logging
* **Safe Error Messages:** Jangan menampilkan *stack trace* atau detail error sistem (seperti struktur database) kepada user di frontend.
* **Generic Messages:** Gunakan pesan error umum seperti "Terjadi kesalahan pada sistem, silakan coba lagi nanti."
* **Server Logging:** Catat aktivitas mencurigakan (seperti kegagalan login beruntun) di sisi server untuk audit.

---

## 7. Checklist Review Agent (Security Audit)
Sebelum menyerahkan kode, Agent harus menjawab:
1. [ ] Apakah ada input user yang langsung dimasukkan ke dalam query atau DOM?
2. [ ] Apakah ada rahasia (secrets) yang terekspos dalam kode?
3. [ ] Apakah fungsi ini memerlukan pengecekan otentikasi/otorisasi tambahan?
4. [ ] Apakah komunikasi data sudah menggunakan protokol yang aman (HTTPS/Secure Cookies)?
5. [ ] Apakah pesan error membocorkan informasi teknis tentang server?

---

## 8. Contoh Implementasi Aman (Next.js/Node.js)

**❌ Buruk (Terekspos & SQL Injection):**
```javascript
const query = `SELECT * FROM users WHERE id = ${req.query.id}`;
const apiKey = "12345-SECRET-KEY"; // Hardcoded