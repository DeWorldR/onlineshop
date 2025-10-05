import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Cart from "@/components/cart/Cart";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-16"><Navbar /></div>
      <main className="max-w-6xl mx-auto px-6 py-10">
        <Cart />
      </main>
      <Footer />
    </div>
  );
}
