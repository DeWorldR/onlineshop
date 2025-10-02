import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Section from '@/components/home/Section'
import Navbar from '@/components/layout/Navbar'

export default function Home() {
  return (
    <div>
      {/* Header & Navbar */}
      <Header />
      <Navbar />

      <Section
        image="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
        category="แฟชั่น"
        title="คอลเลคชันฤดูใบไม้ร่วง–ฤดูหนาว 2025/26"
        buttonText="ดูรายละเอียดเพิ่มเติม"
      />

      {/* Footer */}
      <Footer />
    </div>
  )
}
