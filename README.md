# Online Shop

เว็บหน้าร้านค้าออนไลน์ มีระบบสมาชิกและตะกร้าสินค้า

**Tech:** Next.js (App Router) · React · TypeScript · Tailwind CSS · NextAuth · Lucide Icons

## ฟีเจอร์
- หน้าแรก หน้าร้าน และหน้าคอลเลกชัน พร้อมเมนูแบบ Mega Menu
- สมัครสมาชิก / เข้าสู่ระบบด้วย NextAuth (Credentials) และมีหน้าโปรไฟล์
- ตะกร้าสินค้า จัดการสถานะด้วย React Context
- เพิ่มสินค้าของตัวเองผ่านฟอร์ม
- มี API route ใน Next.js (`/api/products`) ส่งข้อมูลสินค้าตัวอย่าง

## รันในเครื่อง
```bash
npm install
npm run dev   # http://localhost:3000
```
