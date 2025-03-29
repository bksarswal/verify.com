import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../../Config/firebaseConfig";
import WithdrawalHistory from "./Withdrawhistry";

const auth = getAuth(app);
const db = getFirestore(app);

export default function WithdrawalPage() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("UPI");
  const [upiId, setUpiId] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [bankAccounts, setBankAccounts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [totalBalance, setTotalBalance] = useState(5000);
  const [availableBalance, setAvailableBalance] = useState(3000);
  const minWithdrawal = 500;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchPaymentDetails(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchPaymentDetails = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUpiId(data.upiId || "");
        setTotalBalance(data.totalBalance || 5000);
        setAvailableBalance(data.availableBalance || 3000);
        if (data.accountNumber && data.ifsc) {
          setBankAccounts([{ accountNumber: data.accountNumber, ifsc: data.ifsc, bankName: data.bankName }]);
          setBankAccount(data.accountNumber);
        }
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
    }
  };

  const handleWithdraw = async () => {
    if (!amount || amount < minWithdrawal) {
      alert(`Minimum withdrawal amount is ₹${minWithdrawal}`);
      return;
    }
    if (amount > availableBalance) {
      alert("Insufficient available balance");
      return;
    }
    const selectedAccount = method === "UPI" ? upiId : bankAccount;
    if (!selectedAccount) {
      alert("Please select a valid payment method");
      return;
    }
    const confirmWithdrawal = window.confirm(
      `Confirm withdrawal request:\nAmount: ₹${amount}\nMethod: ${method}\nAccount: ${selectedAccount}`
    );
    if (confirmWithdrawal) {
      try {
        await addDoc(collection(db, "withdrawals"), {
          userId,
          amount: parseFloat(amount),
          method,
          account: selectedAccount,
          status: "Pending",
          createdAt: new Date(),
        });

        const newTotalBalance = totalBalance - amount;
        const newAvailableBalance = availableBalance - amount;

        await updateDoc(doc(db, "users", userId), {
          totalBalance: newTotalBalance,
          availableBalance: newAvailableBalance,
        });

        setTotalBalance(newTotalBalance);
        setAvailableBalance(newAvailableBalance);
        setAmount("");
        alert("Withdrawal request submitted successfully!");
      } catch (error) {
        console.error("Error processing withdrawal:", error);
      }
    }
  };

  return (
    <div className="mt-24 flex flex-col items-center justify-center min-h-screen w-full bg-gray-100">
      <h1 className="mb-4 text-lg font-bold text-red-600">NOTE: Withdrawal limit is ₹500</h1>

      <div className="flex flex-col md:flex-row w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <div className="w-full md:w-1/3 p-4 bg-blue-50 rounded-lg border border-gray-300 shadow-md text-center">
          <p className="text-lg font-semibold text-gray-700">Total Balance:</p>
          <p className="text-2xl font-bold text-blue-700">₹{totalBalance}
          </p>
          <p className="text-lg font-semibold text-gray-700 mt-2">Available for Withdrawal:</p>
          <p className="text-2xl font-bold text-green-600">₹{availableBalance}
          </p>
        </div>

        <div className="w-full md:w-2/3 md:pl-6 mt-4 md:mt-0">
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input type="number" placeholder="Enter amount (Min ₹500)" value={amount} onChange={(e) => setAmount(e.target.value)} className="mb-4 w-full p-2 border rounded" />

          <label className="block text-sm font-medium text-gray-700">Payment Method</label>
          <select value={method} onChange={(e) => { setMethod(e.target.value); }} className="mb-4 w-full p-2 border rounded">
            <option value="UPI">UPI</option>
            <option value="Bank">Bank</option>
          </select>

          {method === "UPI" ? (
            <>
              <label className="block text-sm font-medium text-gray-700">UPI ID</label>
              {upiId ? (
                <input type="text" value={upiId} readOnly className="mb-4 w-full p-2 border rounded bg-gray-100" />
              ) : (
                <button className="mb-4 w-full p-2 border rounded bg-blue-500 text-white" onClick={() => window.location.href = '/add-payment'}>Add UPI</button>
              )}
            </>
          ) : (
            <>
              <label className="block text-sm font-medium text-gray-700">Select Bank Account</label>
              {bankAccounts.length > 0 ? (
                <select value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} className="mb-4 w-full p-2 border rounded">
                  {bankAccounts.map((acc, index) => (
                    <option key={index} value={acc.accountNumber}>{`${acc.bankName} - ${acc.accountNumber} (${acc.ifsc})`}</option>
                  ))}
                </select>
              ) : (
                <button className="mb-4 w-full p-2 border rounded bg-blue-500 text-white" onClick={() => window.location.href = '/add-payment'}>Add Bank Account</button>
              )}
            </>
          )}

          <button onClick={handleWithdraw} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition" disabled={!amount || (!upiId && method === "UPI") || (!bankAccount && method === "Bank")}>
            Withdraw
          </button>
        </div>
      </div>
      <WithdrawalHistory />
    </div>
  );
}
