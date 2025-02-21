import React from 'react'

const ChangePasswordForm = () => {
  return (
    <div><form className="space-y-4">
    <div>
      <label className="block mb-1">Current Password</label>
      <input className="w-full p-2 border rounded-lg" type="password" />
    </div>
    <div>
      <label className="block mb-1">New Password</label>
      <input className="w-full p-2 border rounded-lg" type="password" />
    </div>
    <button className="w-full bg-blue-500 text-white p-2 rounded-lg">Change Password</button>
  </form></div>
  )
}

export default ChangePasswordForm