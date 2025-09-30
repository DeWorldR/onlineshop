"use client"

import { useEffect, useState, useRef } from "react"

export default function Navbar() {
  const [showNav, setShowNav] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setShowNav(false) // scroll ลง → ซ่อน
      } else {
        setShowNav(true) // scroll ขึ้น → โชว์
      }
      lastScrollY.current = window.scrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-16 left-0 w-full flex justify-center gap-8 py-3 text-sm font-medium text-white bg-blue-600 transition-transform duration-300 z-40 ${
        showNav ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <a href="#">เสื้อ</a>
      <a href="#">กางเกง</a>
      <a href="#">เข็มขัด</a>
      <a href="#">แหวน</a>
      <a href="#">นาฬิกา</a>
      <a href="#">แว่นตา</a>
      <a href="#">น้ำหอม</a>
      <a href="#">เมคอัพ</a>
      <a href="#">สกินแคร์</a>
    </nav>
  )
}
