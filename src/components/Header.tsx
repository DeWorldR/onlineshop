import { Search, User, Star, ShoppingBag } from "lucide-react"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-blue-600 text-white z-50 shadow">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left */}
        <div className="w-1/3"></div>

        {/* Center */}
        <div className="w-1/3 text-center">
          <h1 className="text-2xl font-bold tracking-widest">ONLINESHOP</h1>
        </div>

        {/* Right */}
        <div className="w-1/3 flex justify-end gap-4">
          <Search className="w-5 h-5 cursor-pointer" />
          <User className="w-5 h-5 cursor-pointer" />
          <Star className="w-5 h-5 cursor-pointer" />
          <ShoppingBag className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
    </header>
  )
}
