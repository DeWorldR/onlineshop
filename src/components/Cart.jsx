import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../cart'

export default function Cart(){
  const { cart, update, remove, clear } = useCart()
  const navigate = useNavigate()
  const total = cart.reduce((s,i)=> s + i.price * i.quantity, 0)
  if(cart.length===0) return <div className="bg-white p-6 rounded shadow"><h2 className="text-xl">ตะกร้าว่าง</h2><p className="mt-2"><Link to='/shop' className="text-indigo-600">ไปเลือกสินค้า</Link></p></div>
  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">ตะกร้าของคุณ</h2>
      <div className="space-y-3">
        {cart.map(it=> (
          <div key={it.id} className="flex items-center justify-between p-3 border rounded">
            <div className="flex items-center gap-3">
              <img src={it.image} className="w-20 h-20 object-contain" alt="img"/>
              <div>
                <div className="font-semibold">{it.title}</div>
                <div className="text-sm text-gray-500">฿{it.price} x {it.quantity}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" min="1" value={it.quantity} onChange={(e)=> update(it.id, Math.max(1, Number(e.target.value)||1)) } className="w-20 border p-1 rounded"/>
              <button onClick={()=>remove(it.id)} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="font-bold">รวมทั้งหมด: ฿{total}</div>
        <div className="flex gap-2">
          <button onClick={()=>{ clear(); navigate('/shop') }} className="px-4 py-2 bg-gray-200 rounded">Clear</button>
          <button onClick={()=>navigate('/checkout')} className="px-4 py-2 bg-indigo-600 text-white rounded">Checkout</button>
        </div>
      </div>
    </div>
  )
}
