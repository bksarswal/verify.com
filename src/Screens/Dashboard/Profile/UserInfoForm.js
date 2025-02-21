import React from 'react'

const UserInfoForm = () => {
  return (
    <div>
        
        <form className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center gap-2">
        <label className="w-1/3 text-gray-700 font-semibold">Username</label>
        <input className="w-2/3 p-2 border rounded-lg" placeholder="john0799" />
      </div>
      <div className="flex items-center gap-2">
        <label className="w-1/3 text-gray-700 font-semibold">Full Name</label>
        <input className="w-2/3 p-2 border rounded-lg" placeholder="John Smith" />
      </div>
    </div>
    <div className="flex items-center gap-2">
      <label className="w-1/3 text-gray-700 font-semibold">Phone No.</label>
      <input className="w-2/3 p-2 border rounded-lg" type="tel" placeholder="+910000000." />
    </div>
    <div className="flex items-center gap-2">
      <label className="w-1/3 text-gray-700 font-semibold">Email</label>
      <input className="w-2/3 p-2 border rounded-lg" type="email" placeholder="john.doe@example.com" />
    </div>
    <div className="flex items-center gap-2">
      <label className="w-1/3 text-gray-700 font-semibold">Gender</label>
      <select className="w-2/3 p-2 border rounded-lg">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
    <div className="flex items-center gap-2">
      <label className="w-1/3 text-gray-700 font-semibold">DOB</label>
      <input className="w-2/3 p-2 border rounded-lg" placeholder="DOB" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center gap-2">
        <label className="w-1/3 text-gray-700 font-semibold">Country</label>
        <input className="w-2/3 p-2 border rounded-lg" placeholder="Country" />
      </div>
      <div className="flex items-center gap-2">
        <label className="w-1/3 text-gray-700 font-semibold">State</label>
        <input className="w-2/3 p-2 border rounded-lg" placeholder="State" />
      </div>
    </div>
    <button className="w-full bg-blue-500 text-white p-2 rounded-lg">Update Information</button>
  </form>
  </div>
  )
}

export default UserInfoForm