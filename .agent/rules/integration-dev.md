---
trigger: always_on
---

# Integration & Server Actions Guidelines

Dokumen ini mendefinisikan standar prosedur untuk melakukan integrasi API antara Frontend (Next.js 16) dan Backend (Express.js). Fokus utama adalah memastikan keamanan data dengan membatasi akses API langsung dari sisi client.

---

## 1. Prinsip Utama: Mandatory Server Actions
Demi alasan keamanan dan performa, seluruh interaksi yang melibatkan pemanggilan API ke Backend Express **wajib** menggunakan **Next.js Server Actions**.

* **No Client-Side Fetching:** Dilarang menggunakan `fetch` atau `axios` di dalam Client Components (direktif `'use client'`) untuk menembak endpoint backend secara langsung.
* **Encapsulation:** Endpoint backend, API Key, dan logika autentikasi tidak boleh terekspos ke browser. Semuanya harus terisolasi di sisi server (Server-to-Server communication).
* **Security:** Server Actions secara otomatis dilindungi dari serangan CSRF oleh Next.js dan memungkinkan manipulasi `cookies` secara aman di sisi server.

---

## 2. Alur Integrasi Data

Data mengalir melalui hirarki berikut:
**UI (Client)** → **Server Action** → **Service Layer (API Hit)** → **Backend (Express)**

1.  **UI Component:** Mengirimkan data via `Form Action` atau `useTransition`.
2.  **Server Action:** Menerima input, melakukan validasi awal, dan memanggil fungsi di layer service.
3.  **Service Layer (`src/services/`):** Melakukan `fetch` sesungguhnya ke server Express menggunakan kredensial yang aman.

---

## 3. Standar Implementasi

### A. Direktif & Penempatan
Setiap fungsi integrasi harus berada dalam file yang dideklarasikan dengan `'use server'` di bagian paling atas.

### B. Validasi Input (Mandatori)
Sebelum data dikirim ke Backend, Server Action wajib melakukan validasi menggunakan library **Zod** untuk mencegah pengiriman data sampah atau berbahaya.

### C. Error Handling
Server Actions tidak boleh membiarkan error sistem (seperti 500 Internal Server Error dari backend) terekspos langsung ke UI. Gunakan blok `try-catch` dan kembalikan pesan yang ramah pengguna.

---

## 4. Contoh Pola Integrasi

### Layer Service (`src/services/api-service.ts`)
Fungsi ini hanya berjalan di sisi server.
```typescript
export const fetchBackend = async (endpoint: string, options: RequestInit) => {
  const response = await fetch(`${process.env.BACKEND_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      // Token diambil dari cookies server-side
      'Authorization': `Bearer ${process.env.INTERNAL_API_TOKEN}`,
    },
  });
  
  if (!response.ok) throw new Error('Backend Integration Error');
  return response.json();
};