---
trigger: always_on
---

# Testing & Quality Assurance Rules

Dokumen ini menetapkan prosedur wajib untuk pengujian kode. Pengujian bukan merupakan langkah opsional, melainkan bagian integral dari setiap perubahan kode (*change*).

---

## 1. Mandat Pengujian Otomatis
* **Setiap Perubahan = Unit Test Baru:** Setiap kali ada penambahan fitur, perubahan logika, atau perbaikan bug, Agent **wajib** menyertakan skrip unit test yang relevan dalam file `.test.ts` atau `.spec.ts`.
* **Regresi:** Pastikan perubahan baru tidak merusak fungsionalitas yang sudah ada dengan menjalankan seluruh rangkaian pengujian.

---

## 2. Standar Cakupan (Code Coverage)
* **Ambang Batas Minimum:** Total cakupan kode (*line, branch, and function coverage*) tidak boleh kurang dari **80%**.
* **Target Fungsi Inti:** Untuk fungsi logika bisnis dan *pure functions*, target cakupan adalah **100%**.
* **Kegagalan Testing:** Jika hasil cakupan berada di bawah 80%, perubahan dianggap tidak valid dan harus diperbaiki sebelum di-merge.

---

## 3. Strategi Unit Test (Functional Style)
Sesuai dengan prinsip *Pure Functional Programming*, aturan pengujian adalah sebagai berikut:
* **Black Box Testing:** Uji fungsi berdasarkan Input vs Output. Jangan menguji detail implementasi internal.
* **Mocking Dependencies:** Gunakan *mocking* untuk dependensi eksternal (API call, database, library pihak ketiga) agar test berjalan cepat dan terisolasi.
* **Property-Based Testing:** Jika memungkinkan, uji fungsi dengan berbagai variasi input (termasuk *edge cases* seperti `null`, `undefined`, atau data kosong).

---

## 4. Struktur File & Penamaan
* **Lokasi:** File test harus diletakkan di folder yang sama dengan file sumber atau di dalam folder `__tests__`.
* **Naming:** Menggunakan format `[nama-file].test.ts` atau `[nama-file].spec.ts`.
* **Deskripsi Test:** Gunakan pola `describe-it` yang deskriptif:
  ```javascript
  describe('calculateTax', () => {
    it('should return 10% tax for income under 50k', () => {
      // test logic
    });
  });