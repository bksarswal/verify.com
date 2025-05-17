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
    <div className="p-6 mt-24 min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700 ">
        Admin Withdrawal Panel
      </h1>

      {loading ? (
        <p className="text-center text-gray-600 text-lg">Loading withdrawals...</p>
      ) : withdrawals.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No withdrawal requests found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-lg shadow-xl bg-white">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-blue-600 text-white">
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
                  <tr key={item.id} className="text-center hover:bg-gray-100 transition duration-200">
                    <td className="p-3 border">{item.userId}</td>
                    <td className="p-3 border text-green-700 font-semibold">₹{item.amount}</td>
                    <td className="p-3 border">{item.method}</td>
                    <td className="p-3 border">{item.account}</td>
                    <td className="p-3 border">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${
                          item.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3 border">
                      {item.createdAt?.seconds
                        ? new Date(item.createdAt.seconds * 1000).toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="p-3 border space-x-2">
                      {item.status === "Pending" ? (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(item.id, "Paid")}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg"
                          >
                            Mark Paid
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(item.id, "Rejected")}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
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

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {withdrawals.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 shadow-md border"
              >
                <div className="text-sm">
                  <p><strong>User ID:</strong> {item.userId}</p>
                  <p className="text-green-700 font-semibold"><strong className="text-black font-bold">Amount:</strong>{item.amount}₹</p>
                  <p><strong>Method:</strong> {item.method}</p>
                  <p><strong>Account:</strong> {item.account}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        item.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </p>
                  <p><strong>Requested:</strong>{" "}
                    {item.createdAt?.seconds
                      ? new Date(item.createdAt.seconds * 1000).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
                {item.status === "Pending" && (
                  <div className="mt-3 flex space-x-2">
                    <button
                      onClick={() => handleStatusUpdate(item.id, "Paid")}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1 rounded"
                    >
                      Mark Paid
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(item.id, "Rejected")}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 rounded"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
