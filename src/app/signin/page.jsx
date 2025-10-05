"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    })
    setLoading(false)

    if (result?.error) {
      alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง ❌")
    } else {
      router.push("/profile")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md transform transition-all hover:scale-[1.02]">
        {/* โลโก้ */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-md">
              💼
            </div>
          </div>
          <h2 className="text-3xl font-bold text-blue-700 mb-2">เข้าสู่ระบบ</h2>
          <p className="text-gray-500 text-sm">เข้าสู่บัญชีผู้ซื้อหรือผู้ขายของคุณ</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อผู้ใช้หรืออีเมล
            </label>
            <input
              type="text"
              placeholder="เช่น seller123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              รหัสผ่าน
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-medium transition-all ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-md"
            }`}
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        {/* ลิงก์สมัครสมาชิก */}
        <p className="text-center text-gray-600 text-sm mt-6">
          ยังไม่มีบัญชี?{" "}
          <a
            href="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            สมัครสมาชิก
          </a>
        </p>
      </div>
    </div>
  )
}
