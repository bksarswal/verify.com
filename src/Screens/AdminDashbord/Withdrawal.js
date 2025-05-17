import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import app from "../../Config/firebaseConfig";

const db = getFirestore(app);

export default function AdminWithdrawalPanel() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWithdrawals = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "withdrawals"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWithdrawals(data);
    } catch (err) {
      console.error("Error fetching withdrawals:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    const confirm = window.confirm(`Are you sure you want to mark this request as ${newStatus}?`);
    if (!confirm) return;

    try {
      await updateDoc(doc(db, "withdrawals", id), {
        status: newStatus,
        paidAt: newStatus === "Paid" ? new Date() : null,
      });
      fetchWithdrawals();
    } catch (err) {
      console.error("Error updating withdrawal status:", err);
    }
  };

  return (
    <div className="p-6 mt-24 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Admin Withdrawal Panel</h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading withdrawals...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3 border">User ID</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Method</th>
                <th className="p-3 border">Account</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Requested At</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((item) => (
                <tr key={item.id} className="text-center hover:bg-gray-50">
                  <td className="p-2 border">{item.userId}</td>
                  <td className="p-2 border text-green-600 font-semibold">₹{item.amount}</td>
                  <td className="p-2 border">{item.method}</td>
                  <td className="p-2 border">{item.account}</td>
                  <td className={`p-2 border font-semibold ${item.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>{item.status}</td>
                  <td className="p-2 border">{new Date(item.createdAt?.seconds * 1000).toLocaleString()}</td>
                  <td className="p-2 border space-x-2">
                    {item.status === "Pending" ? (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(item.id, "Paid")}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Mark as Paid
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(item.id, "Rejected")}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-400 italic">No action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
