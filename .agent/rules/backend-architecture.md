---
trigger: always_on
---

# Backend Architecture Guidelines (Express.js)

Dokumen ini mendefinisikan standar arsitektur backend menggunakan Express.js. Struktur ini dirancang untuk skalabilitas, kemudahan pengujian (testability), dan pemisahan logika bisnis dari infrastruktur web.

---

## 1. Struktur Folder Utama (`src`)

Backend harus dipisahkan berdasarkan tanggung jawabnya (Layered Architecture).



```text
src/
├── config/             # Konfigurasi database, env, dan library pihak ketiga
├── controllers/        # Handler untuk request/response (Entry point)
├── services/           # Logika bisnis utama (Core Logic)
├── models/             # Definisi skema data/database (Prisma/Mongoose/TypeORM)
├── routes/             # Definisi endpoint API
├── middlewares/        # Fungsi perantara (Auth, Validation, Logger)
├── utils/              # Fungsi pembantu (Helpers) yang bersifat pure
├── types/              # Definisi TypeScript global
└── app.ts              # Inisialisasi Express app