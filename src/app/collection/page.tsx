import ProductList from "../../components/home/ProductList";
import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";


export default function CollectionPage() {
  return (
    <div>
      {/* Header & Navbar */}
      <Header />
      <Navbar />

      <main className="p-10">
        <h1 className="text-2xl font-bold mb-6">
          คอลเลคชันฤดูใบไม้ร่วง–ฤดูหนาว 2025/26
        </h1>
        <ProductList />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
