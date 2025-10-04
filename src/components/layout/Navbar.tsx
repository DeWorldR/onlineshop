"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const headerHeightRef = useRef<number>(64);

  const canPortal = typeof document !== "undefined";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = document.getElementById("site-header");
    headerHeightRef.current = el?.offsetHeight ?? 64;
    const upd = () => {
      const e = document.getElementById("site-header");
      headerHeightRef.current = e?.offsetHeight ?? 64;
    };
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const threshold = 10;
    const handler = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        if (open) setShowNav(true);
        else if (Math.abs(y - lastScrollY.current) > threshold) {
          setShowNav(y < lastScrollY.current);
          lastScrollY.current = y;
        }
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [open]);

  useEffect(() => {
    if (open) setShowNav(true);
  }, [open]);

  return (
    <>
      <nav
        className={`fixed left-0 w-full flex justify-center gap-8 py-3 text-sm font-medium text-white bg-blue-600 transition-transform duration-300 z-40 transform ${showNav ? "translate-y-0" : "-translate-y-full"}`}
        style={{ top: "64px" }}
        aria-hidden={!showNav}
      >
        <button onClick={() => setOpen((s) => !s)} className="px-3">แฟชั่น</button>

        {/* Filter by category */}
        <Link href={`/collection?category=${encodeURIComponent("เสื้อ")}`} className="px-3">เสื้อ</Link>
        <Link href={`/collection?category=${encodeURIComponent("กางเกง")}`} className="px-3">กางเกง</Link>
        <Link href={`/collection?category=${encodeURIComponent("เครื่องประดับ")}`} className="px-3">แหวน/เครื่องประดับ</Link>
        <Link href={`/collection?category=${encodeURIComponent("นาฬิกา")}`} className="px-3">นาฬิกา</Link>
      </nav>

      {open && canPortal && createPortal(
        <>
          <div className="fixed inset-0 z-30 bg-black/40" onClick={() => setOpen(false)} aria-hidden="true" />

          <div className="fixed left-0 right-0 z-40 bg-white shadow-lg" style={{ top: `${headerHeightRef.current}px` }} role="dialog" aria-modal="true">
            <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-4 gap-8 text-sm text-gray-800">
              <div>
                <img src="https://img.activityjapan.com/wi/winter-trip-couple_thumb.jpg" alt="collection" className="w-40 h-40 object-cover border" />
                <p className="mt-3 text-xs text-gray-500">หน้าหลักแฟชั่น</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">แฟชั่นโชว์ล่าสุด</h4>
                <ul className="space-y-2 text-gray-600">
                  {/* ลิงก์ที่เปิดเป็นเซ็ต (collection) */}
                  <li><Link href={`/collection?collection=autumn2025`}>คอลเลคชันฤดูใบไม้ร่วง 2025/26</Link></li>
                  <li><Link href={`/collection?collection=summer2025`}>คอลเลคชันฤดูร้อน</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">สินค้า</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><Link href={`/collection?category=${encodeURIComponent("กระเป๋า")}`}>กระเป๋า</Link></li>
                  <li><Link href={`/collection?category=${encodeURIComponent("รองเท้า")}`}>รองเท้า</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">บริการ</h4>
                <button className="w-full border rounded py-2 text-sm">ค้นหาบูติก</button>
                <button className="w-full border rounded py-2 mt-3 text-sm">การนัดหมาย</button>
              </div>
            </div>
          </div>
        </>, document.body
      )}
    </>
  );
}
