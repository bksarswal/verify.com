import { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../../Config/firebaseConfig";

const auth = getAuth(app);
const db = getFirestore(app);

export default function WithdrawalHistory() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchWithdrawals(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchWithdrawals = async (uid) => {
    try {
      const q = query(collection(db, "withdrawals"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      const withdrawalsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt
          ? new Date(doc.data().createdAt.seconds * 1000).toLocaleString()
          : "N/A",
      }));
      setWithdrawals(withdrawalsData);
    } catch (error) {
      console.error("Error fetching withdrawal history:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100 px-4 py-10">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">
          Withdrawal History
        </h2>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm sm:text-base">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <th className="border border-gray-300 px-3 py-2">Sr. No</th>
                <th className="border border-gray-300 px-3 py-2">Method</th>
                <th className="border border-gray-300 px-3 py-2">Date</th>
                <th className="border border-gray-300 px-3 py-2">Amount</th>
                <th className="border border-gray-300 px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.length > 0 ? (
                withdrawals.map((withdrawal, index) => (
                  <tr
                    key={withdrawal.id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      {withdrawal.method}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      {withdrawal.createdAt}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      ₹{withdrawal.amount}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-white text-xs font-medium ${
                          withdrawal.status === "Pending"
                            ? "bg-yellow-500"
                            : withdrawal.status === "Approved"
                            ? "bg-green-600"
                            : "bg-red-500"
                        }`}
                      >
                        {withdrawal.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="border border-gray-300 px-4 py-4 text-center text-gray-500"
                  >
                    No withdrawal history found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {withdrawals.length > 0 ? (
            withdrawals.map((withdrawal, index) => (
              <div
                key={withdrawal.id}
                className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm"
              >
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Sr. No:</strong> {index + 1}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Method:</strong> {withdrawal.method}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Date:</strong> {withdrawal.createdAt}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Amount:</strong> ₹{withdrawal.amount}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs font-medium ${
                      withdrawal.status === "Pending"
                        ? "bg-yellow-500"
                        : withdrawal.status === "Approved"
                        ? "bg-green-600"
                        : "bg-red-500"
                    }`}
                  >
                    {withdrawal.status}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No withdrawal history found</p>
          )}
        </div>
      </div>
    </div>
  );
}
