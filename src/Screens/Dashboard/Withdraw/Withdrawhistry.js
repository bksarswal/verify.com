import { useState } from "react";

export default function WithdrawalHistory() {
  const [withdrawals, setWithdrawals] = useState([
    { id: 1, method: "UPI", date: "2025-03-04 10:30 AM", amount: 1000 },
    { id: 2, method: "Bank", date: "2025-03-03 02:15 PM", amount: 2000 },
  ]);

  return (
    <div className="flex flex-col items-center justify-center  w-full bg-gray-100  ">
    
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-400">
              <th className="border border-gray-300 p-2">Sr. No</th>
              <th className="border border-gray-300 p-2">Method</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((withdrawal) => (
              <tr key={withdrawal.id}>
                <td className="border border-gray-300 p-2 text-center">{withdrawal.id}</td>
                <td className="border border-gray-300 p-2 text-center">{withdrawal.method}</td>
                <td className="border border-gray-300 p-2 text-center">{withdrawal.date}</td>
                <td className="border border-gray-300 p-2 text-center">₹{withdrawal.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
