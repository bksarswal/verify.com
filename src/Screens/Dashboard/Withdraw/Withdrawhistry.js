import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, updateDoc, collection, addDoc, query, where, getDocs } from "firebase/firestore";
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
        createdAt: doc.data().createdAt ? new Date(doc.data().createdAt.seconds * 1000).toLocaleString() : "N/A"
      }));
      setWithdrawals(withdrawalsData);
    } catch (error) {
      console.error("Error fetching withdrawal history:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-center">Withdrawal History</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-400">
              <th className="border border-gray-300 p-2">Sr. No</th>
              <th className="border border-gray-300 p-2">Method</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Amount</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.length > 0 ? (
              withdrawals.map((withdrawal, index) => (
                <tr key={withdrawal.id}>
                  <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 p-2 text-center">{withdrawal.method}</td>
                  <td className="border border-gray-300 p-2 text-center">{withdrawal.createdAt}</td>
                  <td className="border border-gray-300 p-2 text-center">₹{withdrawal.amount}</td>
                  <td className="border border-gray-300 p-2 text-center">{withdrawal.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border border-gray-300 p-2 text-center text-gray-500">No withdrawal history found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
