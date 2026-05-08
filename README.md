# MikiJapan Promotion

หน้า Promotion สำหรับขายเสื้อผ้าแบบค้าส่งของ Miki Japan สร้างด้วย Vite, React, TypeScript และ Tailwind CSS โดยยึดธีมจาก `MikiJapan-Register`

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS ผ่าน `@tailwindcss/vite`
- เชื่อม `MikiJapan-Api` เฉพาะ `GET /api/health` สำหรับสถานะ backend

## Run

```bash
npm install
npm run dev
```

เปิดผ่าน `http://localhost:5173` เพื่อให้ตรงกับ CORS origin ที่ `MikiJapan-Api` อนุญาตไว้

## API Config

สร้างไฟล์ `.env` จาก `.env.example` แล้วแก้ base URL ให้ตรงกับ backend:

```bash
VITE_API_BASE_URL=http://localhost:8080/api
```

Promotion ใช้ route จาก `MikiJapan-Api` เฉพาะ route public ที่จำเป็น:

```text
GET /api/health
```

Route อื่นใน API เช่น `/api/auth/register` และ `/api/customers` เป็นของ Register/Admin จึงไม่ถูกเรียกจากหน้า Promotion
