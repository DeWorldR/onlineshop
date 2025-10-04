export default function CartSummary({ items }: { items: any[] }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      {items.length === 0 ? (
        <p>ยังไม่มีสินค้าในตะกร้า</p>
      ) : (
        <ul className="divide-y">
          {items.map((item, i) => (
            <li key={i} className="py-2 flex justify-between">
              <span>{item.name}</span>
              <span>{item.price.toLocaleString()} บาท</span>
            </li>
          ))}
        </ul>
      )}
      <hr className="my-4" />
      <p className="text-lg font-semibold text-right">
        รวมทั้งหมด: {total.toLocaleString()} บาท
      </p>
    </div>
  );
}
