// src/components/layout/Navbar.tsx
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
    const updateHeaderHeight = () => {
      const el = document.getElementById("site-header");
      headerHeightRef.current = el?.offsetHeight ?? 64;
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const threshold = 10;
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        if (open) {
          setShowNav(true);
        } else {
          if (Math.abs(currentY - lastScrollY.current) > threshold) {
            if (currentY > lastScrollY.current) setShowNav(false);
            else setShowNav(true);
            lastScrollY.current = currentY;
          }
        }
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  useEffect(() => {
    if (open) setShowNav(true);
  }, [open]);

  return (
    <>
      <nav
        className={`fixed left-0 w-full flex justify-center gap-8 py-3 text-sm font-medium text-white bg-blue-600 transition-transform duration-300 z-40 transform ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ top: "64px" }}
        aria-hidden={!showNav}
      >
        <button onClick={() => setOpen((s) => !s)} className="px-3">
          คอลเลคชัน
        </button>

        {/* ลิงก์ไปยัง collection พร้อม query param cat */}
        <Link href={`/collection?cat=${encodeURIComponent("เสื้อ")}`} className="px-3">เสื้อ</Link>
        <Link href={`/collection?cat=${encodeURIComponent("กางเกง")}`} className="px-3">กางเกง</Link>
        <Link href={`/collection?cat=${encodeURIComponent("เครื่องประดับ")}`} className="px-3">เครื่องประดับ</Link>
        <Link href={`/collection?cat=${encodeURIComponent("นาฬิกา")}`} className="px-3">นาฬิกา</Link>
        <Link href={`/collection`} className="px-3">ทั้งหมด</Link>
      </nav>

      {/* (panel / portal ส่วนที่เปิดเมนู) */}
      {open &&
        canPortal &&
        createPortal(
          <>
            <div className="fixed inset-0 z-30 bg-black/40" onClick={() => setOpen(false)} aria-hidden="true" />
            <div className="fixed left-0 right-0 z-40 bg-white shadow-lg" style={{ top: `${headerHeightRef.current}px` }} role="dialog" aria-modal="true">
              <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-4 gap-8 text-sm text-gray-800">
                <div>
                  <img src="https://img.activityjapan.com/wi/winter-trip-couple_thumb.jpg" alt="collection" className="w-40 h-40 object-cover border" />
                  <p className="mt-3 text-xs text-gray-500">หน้าหลักแฟชั่น</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">คอลเลคชัน</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li><Link href={`/collection?cat=${encodeURIComponent("เสื้อ")}`}>เสื้อ</Link></li>
                    <li><Link href={`/collection?cat=${encodeURIComponent("กางเกง")}`}>กางเกง</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">สินค้า</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li><Link href={`/collection?cat=${encodeURIComponent("เครื่องประดับ")}`}>เครื่องประดับ</Link></li>
                    <li><Link href={`/collection?cat=${encodeURIComponent("นาฬิกา")}`}>นาฬิกา</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">บริการ</h4>
                  <button className="w-full border rounded py-2 text-sm">ค้นหาบูติก</button>
                  <button className="w-full border rounded py-2 mt-3 text-sm">การนัดหมาย</button>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}
