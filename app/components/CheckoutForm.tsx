"use client";
import { useForm } from "react-hook-form";
import { useCartStore } from "../store/useCartStore";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const clearCart = useCartStore((s) => s.clearCart);
  const router = useRouter();

  const paymentMethod = watch("paymentMethod");

  const onSubmit = (data: any) => {
    console.log("ข้อมูลการสั่งซื้อ:", data);
    clearCart();
    router.push("/success"); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-medium">ชื่อ-นามสกุล</label>
        <input
          {...register("fullname", { required: "กรุณากรอกชื่อ-นามสกุล" })}
          className="w-full border rounded-md p-2 mt-1"
        />
        {errors.fullname && <p className="text-red-500 text-sm">{ }</p>}
      </div>

      <div>
        <label className="block font-medium">ที่อยู่</label>
        <textarea
          {...register("address", { required: "กรุณากรอกที่อยู่" })}
          className="w-full border rounded-md p-2 mt-1"
        />
        {errors.address && <p className="text-red-500 text-sm">{ }</p>}
      </div>

      <div>
        <label className="block font-medium">เบอร์โทรศัพท์</label>
        <input
          type="tel"
          {...register("phone", { required: "กรุณากรอกเบอร์โทร", 
            pattern: { value: /^[0-9]{9,10}$/,
              message: "กรุณากรอกเบอร์โทรให้ถูกต้อง (9-10 ตัวเลข)" }
          })}
          className="w-full border rounded-md p-2 mt-1" />
        {errors.phone && <p className="text-red-500 text-sm">{ }</p>}
      </div>

      <div>
        <label className="block font-medium">ช่องทางการชำระเงิน</label>
        <select
          {...register("paymentMethod", { required: "กรุณาเลือกช่องทางการชำระเงิน" })}
          className="w-full border rounded-md p-2 mt-1">
          <option value="">-- กรุณาเลือก --</option>
          <option value="bank">โอนผ่านธนาคาร</option>
          <option value="promptpay">PromptPay</option>
          <option value="credit">เก็บเงินปลายทาง</option>
        </select>
        {errors.paymentMethod && <p className="text-red-500 text-sm">{ }</p>}
      </div>

      {paymentMethod === "bank" && (
        <div className="mt-4 text-center">
          <p className="mb-2 font-medium text-sky-700">สแกน QR เพื่อชำระเงิน</p>
          <img
            src="/images/sample-qr.png" 
            alt="QR Payment"
            className="mx-auto w-40 h-40 border rounded-lg" />
        </div> )}

      {paymentMethod === "promptpay" && (
        <div className="mt-4 text-center">
          <p className="mb-2 font-medium text-sky-700">โอนเงินไปที่หมายเลข PromptPay</p>
              <p className="text-sm text-gray-500 mt-1"> ชื่อบัญชี : นายดวงดี มีชัย</p>
          <p className="text-2xl font-bold text-gray-800 select-all">091-234-5678</p>
        </div> )}

      {paymentMethod !== "credit" && (
        <div>
          <label className="block font-medium">แนบสลิป</label>
          <input
            type="file"
            {...register("slip", { required: paymentMethod !== "credit" })}
            className="w-full border rounded-md p-2 mt-1"
            accept="image/*,application/pdf"/>
          {errors.slip && <p className="text-red-500 text-sm">{ }</p>}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-sky-700 hover:bg-sky-800 text-white py-2 rounded-md transition font-semibold" >
        ยืนยันการสั่งซื้อ
      </button>
    </form>
  );
}
