import React, { useState, useEffect } from "react";
import app from "../../Config/firebaseConfig";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";

const DashboardHome = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const db = getFirestore(app);
    const taskCollection = collection(db, "datsa"); // 👈 Ensure collection name is correct

    const unsubscribe = onSnapshot(
      taskCollection,
      (snapshot) => {
        console.log("Fetching Firestore Data..."); // Debugging log
        const taskList = snapshot.docs.map((doc) => {
          console.log("Firestore Doc:", doc.data()); // Debugging log
          return {
            id: doc.id,
            ...doc.data(),
            verified: false,
            code: "",
          };
        });

        setTasks(taskList);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching tasks:", error);
        setError("Failed to load tasks. Please try again.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleCodeChange = (id, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, code: value } : task
      )
    );
  };

  const handleVerify = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, verified: task.code === "1234" } : task
      )
    );
  };

  // ✅ Field names fix kiye hain
  const offlineTasks = [
    { id: "offline1", LinksValue: "http://example1.com", Earinhg: "$3.00", code: "", verified: false },
    { id: "offline2", LinksValue: "http://example2.com", Earinhg: "$4.00", code: "", verified: false },
    { id: "offline3", LinksValue: "http://example3.com", Earinhg: "$6.00", code: "", verified: false },
    { id: "offline4", LinksValue: "http://example4.com", Earinhg: "$7.00", code: "", verified: false },
    { id: "offline5", LinksValue: "http://example5.com", Earinhg: "$8.00", code: "", verified: false },
  ];

  return (
    <div className="min-h-screen mt-24 bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Task Verification</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading tasks...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 shadow-md">
                <th className="border border-gray-300 px-4 py-2 text-left">Sr. No</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Task</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Earning</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Enter Code</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* ✅ Offline + Firestore Tasks Merge */}
              {[...offlineTasks, ...tasks].map((task, index) => (
                <tr key={task.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 text-blue-500 px-4 py-2">{task.LinksValue}</td>
                  <td className="border border-gray-300 px-4 py-2">{task.Earinhg}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={task.code}
                      onChange={(e) => handleCodeChange(task.id, e.target.value)}
                      className={`w-full border rounded-md px-2 py-1 focus:outline-none ${
                        task.verified ? "border-green-500" : "border-gray-300"
                      }`}
                      placeholder="Enter code"
                      disabled={task.verified}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {task.verified ? (
                      <span className="text-green-600 font-bold">Verified</span>
                    ) : (
                      <button
                        onClick={() => handleVerify(task.id)}
                        className="bg-blue-500 text-white text-center px-4 py-2 rounded-md hover:bg-blue-600 transition"
                      >
                        Verify
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
