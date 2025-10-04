"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exist = users.find((u) => u.email === form.email);
    if (exist) {
      alert("อีเมลนี้มีผู้ใช้งานแล้ว!");
      return;
    }
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    alert("สมัครสมาชิกสำเร็จ! โปรดเข้าสู่ระบบ");
    router.push("/signin");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          สมัครสมาชิกใหม่
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อผู้ใช้
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              อีเมล
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              รหัสผ่าน
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              บทบาท
            </label>
            <select
              name="role"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="buyer">ผู้ซื้อ</option>
              <option value="seller">ผู้ขาย</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            สมัครสมาชิก
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          มีบัญชีอยู่แล้ว?{" "}
          <a href="/signin" className="text-blue-600 hover:underline">
            เข้าสู่ระบบ
          </a>
        </p>
      </div>
    </div>
  );
}
