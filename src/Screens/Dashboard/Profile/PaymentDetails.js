import React from 'react'

const PaymentDetails = () => {
  return (
    <div><form className=" space-y-4">
    <div>
      <label className="block mb-1">Wallet Balance</label>
      <input className="w-full p-2 border rounded-lg" type="number" placeholder="$0.00" />
    </div>
    <div>
      <label className="block mb-1">Payment Method</label>
      <input className="w-full p-2 border rounded-lg" type="text" placeholder="UPI" />
    </div>
    <div>
      <label className="block mb-1">UPI id</label>
      <input className="w-full p-2 border rounded-lg" type="text" placeholder="earn@upi" />
    </div>
    
     
    <button className="w-full bg-blue-500 text-white p-2 rounded-lg">Update Payment Details</button>
    
  </form></div>
  )
}

export default PaymentDetails