// src/components/Section.tsx
interface SectionProps {
  image: string
  category: string
  title: string
  buttonText: string
}

export default function Section({ image, category, title, buttonText }: SectionProps) {
  return (
    <section
      className="relative h-[500px] bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
        <h2 className="text-lg font-medium">{category}</h2>
        <h3 className="text-2xl font-bold mt-2">{title}</h3>
        <button className="mt-4 px-6 py-2 bg-white text-black font-medium">
          {buttonText}
        </button>
      </div>
    </section>
  )
}
