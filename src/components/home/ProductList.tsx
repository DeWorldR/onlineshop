"use client"; // ต้องมี เพราะใช้ useState

import { useState } from "react";
import ProductCard from "./ProductCard";

const products = [
  { 
    id: "shirt-black", 
    name: "เสื้อยืด-สีดำ", 
    price: 499, 
    image: "/products/shirt.jpg",
    description: "เสื้อยืดผ้าฝ้ายเนื้อนุ่ม ระบายอากาศได้ดี เหมาะกับทุกโอกาส",
    material: "ผ้าฝ้าย 100%"
  },
  { 
    id: "polo", 
    name: "เสื้อโปโล", 
    price: 499, 
    image: "/products/เสื้อโปโล.jpg",
    description: "เสื้อโปโลคอตั้ง ดีไซน์คลาสสิค ใส่ทำงานหรือเที่ยวก็ได้",
    material: "ผ้า Cotton ผสม Polyester"
  },
  { 
    id: "jeans", 
    name: "กางเกงยีนส์", 
    price: 799, 
    image: "/products/jeans.jpg",
    description: "กางเกงยีนส์ทรงตรง สวมใส่สบาย แมทช์ง่าย",
    material: "Denim 100%"
  },
  { 
    id: "cargo", 
    name: "กางเกงคาร์โก้", 
    price: 699, 
    image: "/products/กางเกงคาร์โก้.jpg",
    description: "กางเกงคาร์โก้ทรงหลวม มีกระเป๋าข้าง ดีไซน์เท่",
    material: "ผ้า Twill"
  },
  { 
    id: "belt", 
    name: "เข็มขัดหนัง", 
    price: 199, 
    image: "/products/leather belt.jpg",
    description: "เข็มขัดหนังแท้ หัวโลหะ แข็งแรงทนทาน",
    material: "หนังแท้"
  },
  { 
    id: "ring", 
    name: "แหวนเงิน", 
    price: 199, 
    image: "/products/ring.jpg",
    description: "แหวนเงินแท้ ดีไซน์มินิมอล สวมใส่ได้ทุกวัน",
    material: "เงิน 92.5%"
  },
  { 
    id: "watch", 
    name: "นาฬิกา", 
    price: 399, 
    image: "/products/watch.webp",
    description: "นาฬิกาข้อมือสายสแตนเลส กันน้ำได้ในระดับเบื้องต้น",
    material: "สแตนเลส"
  },
];

export default function ProductList() {
  const [selectedProduct, setSelectedProduct] = useState<null | typeof products[0]>(null);

  return (
    <section className="py-6">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} onClick={setSelectedProduct} />
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-3xl w-full relative shadow-xl">
            {/* ปุ่มปิด */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* รูปสินค้า */}
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-80 object-cover rounded"
              />

              {/* รายละเอียดสินค้า */}
              <div>
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <p className="mt-2 text-xl font-semibold text-gray-800">
                  {selectedProduct.price.toLocaleString()} ฿
                </p>

                <p className="mt-4 text-gray-700 leading-relaxed">
                  {selectedProduct.description}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  วัสดุ: {selectedProduct.material}
                </p>

                <button className="mt-6 w-full md:w-auto rounded-md bg-blue-600 px-6 py-3 text-white text-lg hover:bg-blue-700 transition">
                  เพิ่มลงตะกร้า
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
