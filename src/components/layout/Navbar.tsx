"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const headerHeightRef = useRef<number>(64); // fallback 64px (h-16)

  // SSR guard
  const canPortal = typeof document !== "undefined";

  // คำนวณ header height (หา element id="site-header") และอัปเดต on resize
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateHeaderHeight = () => {
      const el = document.getElementById("site-header");
      headerHeightRef.current = el?.offsetHeight ?? 64;
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  // Scroll handler — ใช้ requestAnimationFrame เพื่อไม่ให้เกิด reflow เยอะ
  useEffect(() => {
    if (typeof window === "undefined") return;

    const threshold = 10; // เลื่อนน้อยกว่า threshold จะไม่เปลี่ยนสถานะ (ป้องกัน jitter)
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        // ถ้าเมนูเปิด ไม่ซ่อน
        if (open) {
          setShowNav(true);
        } else {
          if (Math.abs(currentY - lastScrollY.current) > threshold) {
            if (currentY > lastScrollY.current) {
              // scroll ลง -> ซ่อน
              setShowNav(false);
            } else {
              // scroll ขึ้น -> โผล่
              setShowNav(true);
            }
            lastScrollY.current = currentY;
          }
        }
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  // ถ้าเปิด panel ให้แน่ใจว่า nav โชว์อยู่
  useEffect(() => {
    if (open) setShowNav(true);
  }, [open]);

  return (
    <>
      {/* Navbar bar (fixed below header) */}
      <nav
        className={`fixed left-0 w-full flex justify-center gap-8 py-3 text-sm font-medium text-white bg-blue-600 transition-transform duration-300 z-40 transform ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ top: "64px" }} // ถ้า header สูงคงที่ ใช้ 64px; ถ้า header เป็น dynamic ให้เอา inline style อีกรูปแบบ
        aria-hidden={!showNav}
      >
        <button onClick={() => setOpen((s) => !s)} className="px-3">
          แฟชั่น
        </button>
        <Link href="#" className="px-3">
          เสื้อ
        </Link>
        <Link href="#" className="px-3">
          กางเกง
        </Link>
        <Link href="#" className="px-3">
          แหวน
        </Link>
        <Link href="#" className="px-3">
          นาฬิกา
        </Link>
      </nav>

      {/* portal: backdrop + panel (render to body to avoid stacking-context problems) */}
      {open &&
        canPortal &&
        createPortal(
          <>
            {/* backdrop (ใต้ panel) */}
            <div
              className="fixed inset-0 z-30 bg-black/40"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* panel (อยู่ใต้ header เพราะ top = headerHeight) */}
            <div
              className="fixed left-0 right-0 z-40 bg-white shadow-lg"
              style={{ top: `${headerHeightRef.current}px` }}
              role="dialog"
              aria-modal="true"
            >
              <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-4 gap-8 text-sm text-gray-800">
                <div>
                  <img
                    src="https://img.activityjapan.com/wi/winter-trip-couple_thumb.jpg"
                    alt="collection"
                    className="w-40 h-40 object-cover border"
                  />
                  <p className="mt-3 text-xs text-gray-500">หน้าหลักแฟชั่น</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">แฟชั่นโชว์ล่าสุด</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>คอลเลคชันฤดูใบไม้ร่วง 2025/26</li>
                    <li>คอลเลคชันฤดูร้อน</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">สินค้า</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>กระเป๋า</li>
                    <li>รองเท้า</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">บริการ</h4>
                  <button className="w-full border rounded py-2 text-sm">
                    ค้นหาบูติก
                  </button>
                  <button className="w-full border rounded py-2 mt-3 text-sm">
                    การนัดหมาย
                  </button>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}
