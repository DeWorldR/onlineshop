"use client";
import { useRouter } from "next/navigation";

export default function SelectRolePage() {
  const router = useRouter();

  const handleSelect = (role) => {
    router.push(`/signin?role=${role}`);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-yellow-100 to-white">
      <h1 className="text-3xl font-bold text-yellow-700 mb-8">
        เลือกบทบาทของคุณ
      </h1>
      <div className="flex flex-col sm:flex-row gap-6">
        <button
          onClick={() => handleSelect("buyer")}
          className="px-8 py-4 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-all font-semibold shadow-md"
        >
          🛍️ ฉันเป็นผู้ซื้อ
        </button>
        <button
          onClick={() => handleSelect("seller")}
          className="px-8 py-4 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-all font-semibold shadow-md"
        >
          💼 ฉันเป็นผู้ขาย
        </button>
      </div>
    </div>
  );
}
