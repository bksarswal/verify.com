import React from 'react'

const AccountDetailsForm = () => {
  return (
    <div><form className=" space-y-4">
    <div>
      <label className="block mb-1">Username</label>
      <input className="w-full p-2 border rounded-lg" placeholder="johndoe123" />
    </div>
    <div>
      <label className="block mb-1">Phone Number</label>
      <input className="w-full p-2 border rounded-lg" type="tel" placeholder="+1 (555) 123-4567" />
    </div>
    <button className="w-full bg-blue-500 text-white p-2 rounded-lg">Update Account Details</button>
  </form></div>
  )
}

export default AccountDetailsForm