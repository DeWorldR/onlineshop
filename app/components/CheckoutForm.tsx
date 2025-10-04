"use client";
import { useForm, Controller } from "react-hook-form";
import { useCartStore } from "../store/useCartStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const clearCart = useCartStore((s) => s.clearCart);
  const router = useRouter();

  // watch ช่องทางการชำระเงิน
  const paymentMethod = watch("paymentMethod");

  const onSubmit = (data: any) => {
    console.log("ข้อมูลการสั่งซื้อ:", data);
    clearCart();
    router.push("/success");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* ชื่อ-นามสกุล */}
      <div>
        <label className="block font-medium">ชื่อ-นามสกุล</label>
        <input
          {...register("fullname", { required: "กรุณากรอกชื่อ-นามสกุล" })}
          className="w-full border rounded-md p-2 mt-1"
        />
        {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
      </div>

      {/* ที่อยู่ */}
      <div>
        <label className="block font-medium">ที่อยู่</label>
        <textarea
          {...register("address", { required: "กรุณากรอกที่อยู่" })}
          className="w-full border rounded-md p-2 mt-1"
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
      </div>

     <div>
          <label className="block font-medium">เบอร์โทรศัพท์</label>
          <input
            type="tel"
            {...register("phone", { 
              required: "กรุณากรอกเบอร์โทร",
              pattern: {
                value: /^[0-9]{9,10}$/,
                message: "กรุณากรอกเบอร์โทรให้ถูกต้อง (9-10 ตัวเลข)"
              }
            })}
            className="w-full border rounded-md p-2 mt-1"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>
      {/* ช่องทางการชำระเงิน */}
      <div>
        <label className="block font-medium">ช่องทางการชำระเงิน</label>
        <select
          {...register("paymentMethod", { required: "กรุณาเลือกช่องทางการชำระเงิน" })}
          className="w-full border rounded-md p-2 mt-1"
        >
          <option value="">-- กรุณาเลือก --</option>
          <option value="bank">โอนผ่านธนาคาร</option>
          <option value="promptpay">PromptPay</option>
          <option value="credit">เก็บเงินปลายทาง</option>
        </select>
        {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod.message}</p>}
      </div>

      {/* แสดง QR code เมื่อเลือกโอนหรือ PromptPay */}
      {paymentMethod === "bank" || paymentMethod === "promptpay" ? (
        <div className="mt-4 text-center">
          <p className="mb-2 font-medium text-sky-700">สแกน QR เพื่อชำระเงิน</p>
          <img
            src="/images/sample-qr.png" 
            alt="QR Payment"
            className="mx-auto w-40 h-40 border rounded-lg"
          />
        </div>
      ) : null}

      {/* แนบสลิป */}
{paymentMethod !== "credit" && (  // ถ้าไม่ใช่เก็บเงินปลายทาง ถึงแสดงช่องนี้
  <div>
    <label className="block font-medium">แนบสลิป</label>
    <input
      type="file"
      {...register("slip", { 
        required: paymentMethod !== "credit" ? "กรุณาแนบสลิปการชำระเงิน" : false
      })}
      className="w-full border rounded-md p-2 mt-1"
      accept="image/*,application/pdf"
    />
    {errors.slip && <p className="text-red-500 text-sm">{errors.slip.message}</p>}
  </div>
)}


      {/* ปุ่มยืนยัน */}
      <button
        type="submit"
        className="w-full bg-sky-700 hover:bg-sky-800 text-white py-2 rounded-md transition font-semibold"
      >
        ยืนยันการสั่งซื้อ
      </button>
    </form>
  );
}
