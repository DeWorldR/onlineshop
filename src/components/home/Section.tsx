// src/components/home/Section.tsx
import Link from "next/link";

interface SectionProps {
  image: string;
  category?: string;
  title: string;
  buttonText?: string;
}

export default function Section({
  image,
  category = "แฟชั่น",
  title,
  buttonText = "ดูคอลเลคชัน",
}: SectionProps) {
  return (
    <section aria-label={title} className="relative w-full">
      {/* container ความสูง responsive — ปรับค่า h-* ตามต้องการ */}
      <div className="relative w-full overflow-hidden">
        <div className="h-48 sm:h-64 md:h-72 lg:h-80 xl:h-[420px] relative">
          {/* ใช้ <img> เพื่อให้ object-fit ทำงาน (สมส่วนกว่า background-image) */}
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ transform: "scale(1.02)" }}
          />

          {/* overlay เพื่อให้ข้อความอ่านง่าย */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

          {/* content ตรงกลางล่าง */}
          <div className="absolute left-1/2 bottom-6 transform -translate-x-1/2 z-10 px-4 w-full max-w-3xl text-center">
            <p className="text-xs uppercase tracking-widest text-gray-200">{category}</p>

            <h2 className="mt-2 font-bold text-white tracking-tight leading-snug text-lg sm:text-2xl md:text-3xl">
              <span className="block break-words whitespace-normal">{title}</span>
            </h2>

            <div className="mt-4">
              <Link
                href="/collection"
                className="inline-block bg-white text-black font-semibold px-4 py-2 rounded shadow hover:shadow-lg transition text-sm"
              >
                {buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
