import React, { useState, useEffect } from "react";
// import app from "../../../Config/firebaseConfig";
// import { getFirestore, collection, onSnapshot } from "firebase/firestore";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dummy Data Setup (simulate Firebase fetch delay)
    const timeout = setTimeout(() => {
      const dummyHistory = [
        {
          id: "1",
          LinksValue: "https://example.com/task1",
          Earning: 5,
          verifiedAt: "2025-04-18 10:00 AM",
        },
        {
          id: "2",
          LinksValue: "https://example.com/task2",
          Earning: 7,
          verifiedAt: "2025-04-18 11:30 AM",
        },
        {
          id: "3",
          LinksValue: "https://example.com/task3",
          Earning: 10,
          verifiedAt: "2025-04-17 08:45 PM",
        },
      ];

      setHistory(dummyHistory);
      setLoading(false);
    }, 1500); // simulate 1.5s delay

    return () => clearTimeout(timeout);

    // Firebase Code (Commented for dummy use)
    /*
    const db = getFirestore(app);
    const historyCollection = collection(db, "history");

    const unsubscribe = onSnapshot(historyCollection, (snapshot) => {
      const historyList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistory(historyList);
      setLoading(false);
    });

    return () => unsubscribe();
    */
  }, []);

  return (
    <div className="mt-16 min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <h2 className="text-2xl font-bold text-center py-6 bg-gradient-to-r from-green-500 to-teal-500 text-white">
            Task Verification History
          </h2>

          {loading ? (
            <p className="text-center py-8 text-gray-500">Loading history...</p>
          ) : history.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No history found.</p>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Task Link</th>
                      <th className="px-4 py-3">Earning</th>
                      <th className="px-4 py-3">Verified At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((item, index) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3 text-sm">{index + 1}</td>
                        <td className="px-4 py-3 text-blue-600 break-words max-w-[350px]">
                          <a
                            href={item.LinksValue}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            {item.LinksValue}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-sm">₹{item.Earning}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {item.verifiedAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden p-4 space-y-4">
                {history.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white shadow rounded-lg p-4 border"
                  >
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>#{index + 1}</strong>
                    </p>
                    <p className="text-blue-600 break-words mb-2">
                      <a
                        href={item.LinksValue}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {item.LinksValue}
                      </a>
                    </p>
                    <p className="text-sm text-gray-800 mb-1">
                      Earning: ₹{item.Earning}
                    </p>
                    <p className="text-sm text-gray-500">
                      Verified at: {item.verifiedAt}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
