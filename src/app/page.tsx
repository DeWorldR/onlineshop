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
        image="https://s.isanook.com/me/0/ud/13/69685/uniqlo.jpg?ip/crop/w670h402/q80/jpg"
        category="แฟชั่น"
        title="คอลเลคชันฤดูใบไม้ร่วง–ฤดูหนาว 2025/26"
        buttonText="เพิ่มเติม"
      />
      <Section
        image="https://cdn.pixabay.com/photo/2014/06/16/23/39/black-370118_640.png"
        category="-"
        title="หมด"
        buttonText="-"
      />
      
    </div>
  )
}
