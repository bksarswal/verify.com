import React from 'react'

const AccountDetailsForm = () => {
  return (
    <div><form className=" space-y-4">
    <div>
      <label className="block mb-1">Date of Registraction</label>
      <input className="w-full p-2 border rounded-lg" type="date" placeholder="01/03/2025" />
    </div>
    <div>
      <label className="block mb-1">Task completed</label>
      <input className="w-full p-2 border rounded-lg" type="number" placeholder="0" />
    </div>
    <div>
      <label className="block mb-1">Life time earning</label>
      <input className="w-full p-2 border rounded-lg" type="number" placeholder="0.00" />
    </div>
    <div>
      <label className="block mb-1">Total Withdraw</label>
      <input className="w-full p-2 border rounded-lg" type="number" placeholder="0.00" />
    </div>
    
    
  </form></div>
  )
}

export default AccountDetailsForm