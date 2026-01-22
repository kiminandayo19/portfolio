---
trigger: always_on
---

# Code Style & Engineering Rules

Dokumen ini mendefinisikan standar penulisan kode dengan fokus utama pada efisiensi (DRY) dan paradigma **Pure Functional Programming**. Agent harus mematuhi aturan ini dalam setiap saran atau penulisan kode.

---

## 1. Prinsip DRY (Don't Repeat Yourself)
* **Abstraksi Logika:** Jika sebuah logika digunakan lebih dari dua kali, pindahkan ke dalam fungsi utilitas atau *custom hooks* yang dapat digunakan kembali.
* **Single Source of Truth:** Gunakan konstanta atau file konfigurasi untuk nilai yang digunakan di berbagai tempat (misalnya: warna, endpoint API, atau pesan error).
* **Modularitas:** Pecah komponen besar menjadi sub-komponen kecil yang independen.

---

## 2. Pure Functional Programming Style
Untuk menjaga prediktabilitas dan memudahkan testing, ikuti aturan fungsional berikut:

### Immutability (Ketidakkekalan)
* Dilarang melakukan mutasi variabel (`let`). Gunakan `const` untuk semua deklarasi.
* Gunakan *spread operator* (`...`) atau metode non-mutating untuk mengubah data (misal: `map`, `filter`, `reduce` daripada `push` atau `splice`).
* Data input (arguments) tidak boleh diubah di dalam fungsi.

### Pure Functions
* **No Side Effects:** Fungsi hanya boleh bergantung pada argumen yang diberikan. Jangan mengakses variabel global atau melakukan I/O di dalam fungsi logika inti.
* **Deterministik:** Input yang sama harus selalu menghasilkan output yang sama.

### Declarative vs Imperative
* Hindari penggunaan *loop* manual seperti `for` atau `while`.
* Gunakan metode array fungsional:
    * Gunakan `.map()` untuk transformasi data.
    * Gunakan `.filter()` untuk penyaringan.
    * Gunakan `.reduce()` untuk akumulasi nilai.

---

## 3. Struktur Fungsi & Penamaan
* **Single Responsibility:** Satu fungsi hanya boleh melakukan satu hal dengan sangat baik.
* **Arrow Functions:** Gunakan sintaks *arrow function* `const action = (params) => { ... }` untuk konsistensi.
* **Naming:**
    * Fungsi: Gunakan kata kerja (misal: `calculateTotal`, `fetchUserData`).
    * Boolean: Gunakan prefix `is`, `has`, atau `should` (misal: `isLoading`, `hasError`).

---

## 4. Penanganan Data & State
* **Optional Chaining:** Selalu gunakan `?.` untuk mengakses properti objek yang mungkin *null* atau *undefined*.
* **Nullish Coalescing:** Gunakan `??` daripada `||` untuk memberikan nilai default guna menghindari bug pada nilai `0` atau `false`.
* **Composition:** Gabungkan fungsi-fungsi kecil untuk membangun logika yang lebih kompleks (Function Composition).

---

## 5. Implementasi Contoh (TS/JS)

**❌ Buruk (Imperative & Mutating):**
```javascript
let total = 0;
for (let i = 0; i < items.length; i++) {
  if (items[i].price > 10) {
    total = total + items[i].price;
  }
}