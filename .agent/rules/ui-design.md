---
trigger: always_on
---

# UI Design Guidelines (Minimalist & Modern)

Dokumen ini berisi aturan desain untuk pengembangan antarmuka pengguna yang bersih, modern, dan fungsional menggunakan **Material UI (MUI)** dengan dukungan **Dark Mode**.

---

## 1. Prinsip Utama
* **Minimalis:** Hilangkan elemen yang tidak perlu. Prioritaskan *whitespace* untuk fokus konten.
* **Modern:** Gunakan sudut tumpul (*border-radius* tinggi) dan bayangan (*shadow*) yang sangat halus.
* **Konsistensi:** Semua komponen harus mengikuti skala jarak dan warna yang telah ditentukan.

---

## 2. Sistem Warna (MUI Palette)

| Elemen | Light Mode (Default) | Dark Mode |
| :--- | :--- | :--- |
| **Primary** | `#007FFF` (Vibrant Blue) | `#3399FF` (Soft Blue) |
| **Background** | `#F3F6F9` (Light Grey) | `#0A1929` (Deep Navy) |
| **Paper/Card** | `#FFFFFF` (White) | `#001E3C` (Dark Blue) |
| **Text Primary** | `#1A2027` (Dark Grey) | `#FFFFFF` (White) |
| **Divider** | `#E7EBF0` | `rgba(255, 255, 255, 0.12)` |

---

## 3. Tipografi
* **Font Family:** `Inter`, `Roboto`, atau `Public Sans`.
* **Ukuran:**
    * `h1` - `h3`: Bold, kerning -0.02em (untuk kesan modern).
    * `body1`: 1rem (16px) untuk teks utama.
    * `button`: 0.875rem, semibold, `text-transform: none`.

---

## 4. Komponen MUI Customization

### Button
* **Border Radius:** `8px` atau `10px`.
* **Shadow:** Gunakan `box-shadow: none` secara default, dan `box-shadow` halus hanya pada *hover state*.
* **Variant:** Gunakan `contained` untuk aksi utama dan `outlined` untuk aksi sekunder.

### Cards
* **Border:** `1px solid` (Light Mode) atau `transparent` dengan elevasi rendah (Dark Mode).
* **Padding:** Standar `24px` (spacing 3).

### Inputs
* **Variant:** `outlined`.
* **Style:** Berikan warna latar belakang sedikit berbeda dari `paper` untuk memperjelas area input.

---

## 5. Spacing & Layout
* **Grid System:** Gunakan 8pt grid system (MUI default spacing).
    * Padding kecil: `8px` (spacing 1)
    * Padding standar: `16px` (spacing 2)
    * Padding besar: `24px` (spacing 3)
* **Max Width:** Batasi container pada `lg` (1200px) untuk menjaga keterbacaan.

---

## 6. Implementasi Dark Mode (MUI Snippet)

```javascript
const themeOptions = {
  palette: {
    mode: 'dark', // switch dinamik
    primary: { main: '#3399FF' },
    background: {
      default: '#0A1929',
      paper: '#001E3C',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
};