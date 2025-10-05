type ProductProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  material: string;
  onClick: (product: {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    material: string;
  }) => void;
};

export default function ProductCard({ id, name, price, image, description, material, onClick }: ProductProps) {
  return (
    <article
      onClick={() => onClick({ id, name, price, image, description, material })}
      className="flex flex-col rounded-lg bg-white shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
    >
      {/* รูปสินค้า */}
      <div className="w-full h-60 bg-gray-100">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>

      {/* ข้อมูลสินค้า */}
      <div className="p-4">
        <h3 className="text-sm md:text-base font-medium line-clamp-2">{name}</h3>
        <p className="mt-2 text-gray-800 font-semibold text-base md:text-lg">
          {price.toLocaleString()} ฿
        </p>
      </div>
    </article>
  );
}
