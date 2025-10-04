export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-50 text-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-600 mb-4">สั่งซื้อสำเร็จ</h1>
        <p className="text-gray-700 mb-6">
          ขอบคุณสำหรับการสั่งซื้อ ระบบได้รับข้อมูลเรียบร้อยแล้ว
        </p>
        <a  href="/"
          className="inline-block bg-sky-700 hover:bg-sky-800 text-white px-4 py-2 rounded-md">
          กลับไปหน้าแรก
        </a>
      </div>
    </div>
  );
}
