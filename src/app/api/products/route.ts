// src/app/api/products/route.ts
import { NextResponse } from "next/server";

const products = [
  {
    id: "p1",
    title: "เสื้อเชิ้ตคลาสสิก",
    price: 1290,
    image: "/images/product-shirt.jpg",
    description: "เสื้อเชิ้ตผ้าคอตตอน ตัดเย็บเรียบหรู"
  },
  {
    id: "p2",
    title: "กางเกงชิโน่",
    price: 1690,
    image: "/images/product-pants.jpg",
    description: "กางเกงชิโน่สวมสบาย แต่งตะเข็บเรียบ"
  },
  {
    id: "p3",
    title: "นาฬิกา Minimal",
    price: 5990,
    image: "/images/product-watch.jpg",
    description: "นาฬิกาโทนดำ-เงิน หน้าปัดเรียบ"
  }
];

export async function GET() {
  return NextResponse.json(products);
}
