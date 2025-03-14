import React, { useState, useEffect } from "react";
import app from "../../../Config/firebaseConfig"; // ✅ Firebase Import
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app); // ✅ Firebase Auth Initialize
const db = getFirestore(app); // ✅ Firestore Initialize

const PaymentDetails = () => {
  const [walletBalance] = useState("$1.00"); // Read-only balance
  const [paymentMethod] = useState("UPI"); // Read-only Payment Method
  const [upiId, setUpiId] = useState(""); // Firebase se data ayega
  const [isEditing, setIsEditing] = useState(false); // Edit mode check
  const [userId, setUserId] = useState(null); // ✅ Logged-in User ID
  const [error, setError] = useState(""); // ✅ UPI ID Error Message

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // ✅ Firebase Auth se User ID
        fetchUpiId(user.uid); // ✅ User ki UPI ID Fetch
      }
    });

    return () => unsubscribe(); // Clean up on unmount
  }, []);

  const fetchUpiId = async (uid) => {
    try {
      const docRef = doc(db, "users", uid); // 🔥 Unique User ID
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUpiId(docSnap.data().upiId);
      }
    } catch (error) {
      console.error("Error fetching UPI ID:", error);
    }
  };

  // ✅ Validate UPI ID Before Saving
  const validateUpiId = (id) => {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+$/; // Example: `example@upi`
    if (id.length < 5) return "UPI ID should be at least 5 characters.";
    if (!upiRegex.test(id)) return "Invalid UPI ID format. Example: example@upi";
    return "";
  };

  const handleSave = async () => {
    if (!userId) return; // Agar user login nahi hai, to return

    const validationError = validateUpiId(upiId);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const docRef = doc(db, "users", userId); // 🔥 Firebase me save/update hoga
      await setDoc(docRef, { upiId }, { merge: true }); // Merge use kiya taaki overwrite na ho
      setIsEditing(false);
      setError(""); // ✅ Error Clear
    } catch (error) {
      console.error("Error saving UPI ID:", error);
    }
  };

  return (
    <div>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Wallet Balance</label>
          <input className="w-full p-2 border rounded-lg" type="text" readOnly value={walletBalance} />
        </div>

        <div>
          <label className="block mb-1">Payment Method</label>
          <input className="w-full p-2 border rounded-lg" type="text" readOnly value={paymentMethod} />
        </div>

        <div>
          <label className="block mb-1">UPI ID</label>
          <input
            className="w-full p-2 border rounded-lg"
            type="text"
            value={upiId}
            onChange={(e) => {
              setUpiId(e.target.value);
              setError(""); // ✅ Error Clear While Typing
            }}
            readOnly={!isEditing} // Edit tabhi hoga jab edit mode ON hoga
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>} {/* ✅ Error Message */}
        </div>

        {isEditing ? (
          <button
            className="w-full bg-green-500 text-white p-2 rounded-lg"
            type="button"
            onClick={handleSave}
          >
            Save UPI ID
          </button>
        ) : (
          <button
            className="w-full bg-blue-500 text-white p-2 rounded-lg"
            type="button"
            onClick={() => setIsEditing(true)}
          >
            Edit UPI ID
          </button>
        )}
      </form>
    </div>
  );
};

export default PaymentDetails;
