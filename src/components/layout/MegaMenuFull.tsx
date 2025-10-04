"use client"

import { X } from "lucide-react"
import { useEffect, useRef } from "react"

type MegaMenuProps = {
  open: boolean
  onClose: () => void
}

export default function MegaMenu({ open, onClose }: MegaMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
      setTimeout(() => closeButtonRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    if (open) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-white/95 backdrop-blur-sm"
        onClick={onClose} // click outside จะปิด
      />

      {/* panel */}
      <div className="relative max-w-[1200px] mx-auto mt-6 bg-white shadow-xl rounded-md overflow-hidden">
        <div className="absolute right-4 top-4 z-10">
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6 p-10">
          <div className="col-span-3 flex items-start">
            <img src="/images/menu-left-sample.jpg" alt="collection" className="w-full h-auto rounded border" />
          </div>

          <div className="col-span-6 grid grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-700">แฟชั่นโชว์ล่าสุด</h4>
              <ul className="text-sm space-y-3 text-gray-600">
                <li>คอลเลคชันฤดูใบไม้ร่วง 2025/26</li>
                <li>คอลเลคชันฤดูร้อน</li>
                <li>คอลเลคชันพิเศษ</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-700">สินค้า</h4>
              <ul className="text-sm space-y-3 text-gray-600">
                <li>กระเป๋า</li>
                <li>รองเท้า</li>
                <li>แว่นตา</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-700">แรงบันดาลใจ</h4>
              <ul className="text-sm space-y-3 text-gray-600">
                <li>ชาเลนและการเต้นรำ</li>
                <li>CHANEL กับภาพยนตร์</li>
                <li>พอดแคสต์ CAMBON</li>
              </ul>
            </div>
          </div>

          <div className="col-span-3">
            <h4 className="text-sm font-semibold mb-3 text-gray-700">การบริการ</h4>
            <p className="text-sm text-gray-600 mb-4">
              บริการต่างๆ ที่ช่วยดูแลรักษาผลงานและสินค้าของคุณ พร้อมลิงก์ไปยังหน้าบริการ
            </p>

            <div className="mt-4 space-y-4">
              <a className="block px-4 py-3 border rounded hover:bg-gray-50 text-sm text-gray-700" href="#">ค้นหาบูติก</a>
              <a className="block px-4 py-3 border rounded hover:bg-gray-50 text-sm text-gray-700" href="#">การนัดหมายกับ CHANEL</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
