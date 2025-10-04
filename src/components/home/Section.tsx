// Very Compact: ขนาดหัวข้อเล็กลงมาก เหมาะถ้ารู้สึกว่าเดิมยังใหญ่เกิน
import Link from "next/link";

interface SectionProps {
  image: string
  category: string
  title: string
  buttonText: string

}

export default function Section({ image, category, title, buttonText }: SectionProps) {
  return (
    <section
      aria-label={title}
      className="relative min-h-[50vh] md:min-h-[60vh] lg:min-h-[65vh] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/30 to-transparent" />

      <div className="absolute left-1/2 bottom-16 md:bottom-18 transform -translate-x-1/2 z-10 px-6 w-full">
        <div className="mx-auto max-w-lg md:max-w-xl text-center">
          <p className="text-xs uppercase tracking-widest text-gray-200">{category}</p>

          {/* Very compact sizes */}
          <h2 className="mt-2 font-bold text-white drop-shadow-md tracking-tight leading-snug text-xl md:text-2xl lg:text-3xl">
            <span className="block break-words whitespace-normal">{title}</span>
          </h2>

        {/* แตมแก้ปุ่มตรงนี้ */}
          <div className="mt-5">
            <Link
              href="/collection"
              className="inline-block bg-white text-black font-semibold px-5 py-2 rounded shadow hover:shadow-lg transition text-sm">
              {buttonText}
            </Link>
          </div>

        </div>
      </div>

      <span className="sr-only">{title}</span>
    </section>
  )
}
