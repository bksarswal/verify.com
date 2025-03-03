import React from 'react'
import TawkToChat from './chatsport'
 import { Navigate } from 'react-router-dom'


const SupportSection = () => {

  const navigate = Navigate("")
  return (
    <div> <div className="space-y-4">
    <h3 className="text-lg font-semibold">Need Help?</h3>
    <p>If you have any questions or issues, please contact our support team.</p>
    <button className="bg-blue-500 text-white p-2 rounded-lg" onclick={()=>navigate("/suport")}>Contact Support</button>
  </div>
  <TawkToChat/>
 
  </div>
  )
}

export default SupportSection