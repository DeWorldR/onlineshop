"use client";

import { useCartStore } from "app/store/useCartStore";
import CheckoutForm from "app/components/CheckoutForm";
import CartSummary from "app/components/CartSummary";

export default function CheckoutPage() {
  const cart = useCartStore((s) => s.cart);

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center">
      <header className="w-full bg-sky-700 text-white py-6 shadow-md mb-8">
        <h1 className="text-2xl font-bold text-center"> ชำระเงิน</h1>
      </header>

      <div className="flex-1 flex items-center justify-center w-full p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">

          <div>
            <h2 className="text-xl font-semibold mb-4 text-sky-800 text-center md:text-left">
             ข้อมูลการจัดส่ง
            </h2>
            <div className="bg-white p-6 rounded-xl shadow">
              <CheckoutForm />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-sky-800 text-center md:text-left">
               สินค้าในตะกร้า
            </h2>
            <div className="bg-white p-6 rounded-xl shadow">
              <CartSummary items={cart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
