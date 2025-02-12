import React, { useState } from "react";
import app from "../../Config/firebaseConfig";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const AdminHome = () => {
  // const [srNo, setSrNo] = useState("");
  const [name, setName] = useState("");
  const [earning, setearning] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if ( !name || !earning) {
      setMessage("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      const db = getFirestore(app);
      await addDoc(collection(db, "datsa"), {
        // srNo,
        LinksValue: name,
        Earinhg: earning,
        timestamp: new Date(),
      });

      setMessage("Data added successfully!");
      // setSrNo("");
      setName("");
      setearning("");
    } catch (error) {
      setMessage("Error adding data. Please try again.");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Add Links</h2>
        
        {message && (
          <div className={`text-sm text-center mb-3 ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <div>
            <label className="block text-gray-600 text-sm mb-1">Sr. No</label>
            <input
              type="text"
              value={srNo}
              onChange={(e) => setSrNo(e.target.value)}
              placeholder="Enter Sr. No"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          <div>
            <label className="block text-gray-600 text-sm mb-1">Add Link</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Link"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Add Earning</label>
            <input
              type="text"
              value={earning}
              onChange={(e) => setearning(e.target.value)}
              placeholder="Enter Earning"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className={`w-full p-2 rounded-lg text-white font-semibold ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminHome;
