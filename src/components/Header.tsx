import { Search, User, Star, ShoppingBag } from "lucide-react"

export default function Header() {
  return (
    <header className=" bg-blue-600">
      {}
      <div className="flex items-center justify-between px-6 py-4">
        {}
        <div className="w-1/3"></div>

        {}
        <div className="w-1/3 text-center text-white">
          <h1 className="text-2xl font-bold tracking-widest">ONLINESHOP</h1>
        </div>

        {}
        <div className="w-1/3 flex justify-end gap-4 text-white">
          <Search className="w-5 h-5 cursor-pointer" />
          <User className="w-5 h-5 cursor-pointer" />
          <Star className="w-5 h-5 cursor-pointer" />
          <ShoppingBag className="w-5 h-5 cursor-pointer" />
        </div>
      </div>

      {}
      <nav className="flex justify-center gap-8 py-3 text-sm font-medium text-white">
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
    </header>
  )
}
