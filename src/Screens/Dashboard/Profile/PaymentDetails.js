import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import app from "../../../Config/firebaseConfig";
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app);
const db = getFirestore(app);

const bankSuggestions = ["State Bank of India", "HDFC Bank", "ICICI Bank", "RMGB Bank", "Axis Bank", "Punjab National Bank", "Bank of Baroda"];

const PaymentDetails = () => {
  const [userId, setUserId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [upiId, setUpiId] = useState("");
  const [bankDetails, setBankDetails] = useState({ accountNumber: "", confirmAccountNumber: "", ifsc: "", bankName: "", accountHolder: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [showAccountNumber, setShowAccountNumber] = useState(false);

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
        setBankDetails({
          accountNumber: data.accountNumber || "",
          confirmAccountNumber: "",
          ifsc: data.ifsc || "",
          bankName: data.bankName || "",
          accountHolder: data.accountHolder || "",
        });
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
    }
  };

  const handleSave = async () => {
    if (!userId) return;
    if (bankDetails.accountNumber !== bankDetails.confirmAccountNumber) {
      setError("Account numbers do not match.");
      return;
    }
    try {
      const docRef = doc(db, "users", userId);
      await setDoc(
        docRef,
        paymentMethod === "UPI"
          ? { upiId }
          : { accountNumber: bankDetails.accountNumber, ifsc: bankDetails.ifsc, bankName: bankDetails.bankName, accountHolder: bankDetails.accountHolder },
        { merge: true }
      );
      setIsEditing(false);
      setError("");
    } catch (error) {
      console.error("Error saving payment details:", error);
    }
  };

  return (
    <div className=" max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Payment Details</h2>

      <label className="block mb-1">Payment Method</label>
      <select
        className="w-full p-2 border rounded-lg"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="UPI">UPI</option>
        <option value="Bank">Bank Transfer</option>
      </select>

      {paymentMethod === "UPI" ? (
        <div className="mt-4">
          <label className="block mb-1">UPI ID</label>
          <input
            className="w-full p-2 border rounded-lg"
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
        </div>
      ) : (
        <div className="mt-4">
          <label className="block mb-1">Account Holder Name</label>
          <input
            className="w-full p-2 border rounded-lg"
            type="text"
            value={bankDetails.accountHolder}
            onChange={(e) => setBankDetails({ ...bankDetails, accountHolder: e.target.value })}
          />

          <label className="block mb-1 mt-2">Bank Name</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={bankDetails.bankName}
            onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
          >
            <option value="">Select Bank</option>
            {bankSuggestions.map((bank, index) => (
              <option key={index} value={bank}>{bank}</option>
            ))}
          </select>

          <label className="block mb-1 mt-2">Account Number</label>
          <div className="relative">
            <input
              className="w-full p-2 border rounded-lg"
              type={showAccountNumber ? "text" : "password"}
              value={bankDetails.accountNumber}
              onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setShowAccountNumber(!showAccountNumber)}
            >
              {showAccountNumber ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <label className="block mb-1 mt-2">Confirm Account Number</label>
          <input
            className="w-full p-2 border rounded-lg"
            type={showAccountNumber ? "text" : "password"}
            value={bankDetails.confirmAccountNumber}
            onChange={(e) => setBankDetails({ ...bankDetails, confirmAccountNumber: e.target.value })}
          />

          <label className="block mb-1 mt-2">IFSC Code</label>
          <input
            className="w-full p-2 border rounded-lg"
            type="text"
            value={bankDetails.ifsc}
            onChange={(e) => setBankDetails({ ...bankDetails, ifsc: e.target.value })}
          />
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <button
        className="w-full bg-green-500 text-white p-2 rounded-lg mt-4"
        onClick={handleSave}
      >
        Save Details
      </button>
    </div>
  );
};

export default PaymentDetails;
