import React, { useState, useEffect } from "react";
import app from "../../Config/firebaseConfig";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";

const DashboardHome = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const db = getFirestore(app);
    const taskCollection = collection(db, "datsa"); // Ensure collection name is correct

    const unsubscribe = onSnapshot(
      taskCollection,
      (snapshot) => {
        const taskList = snapshot.docs.map((doc) => {
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

  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-16 min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-xl overflow-hidden">
          <h2 className="text-2xl font-semibold text-center py-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            Task Verification
          </h2>

          {loading ? (
            <p className="text-center text-gray-500 py-6">Loading tasks...</p>
          ) : error ? (
            <p className="text-center text-red-500 py-6">{error}</p>
          ) : (
            <>
              <div className="overflow-x-auto p-4">
                <table className="min-w-full bg-white border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Sr. No</th>
                      <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Task</th>
                      <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Earning</th>
                      <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Enter Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTasks.map((task, index) => (
                      <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">{indexOfFirstTask + index + 1}</td>
                        <td className="border border-gray-200 px-4 py-3 text-sm text-blue-500 max-w-[150px] truncate">
                          {task.LinksValue}
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">{task.Earinhg}</td>
                        <td className="border border-gray-200 px-4 py-3 text-sm">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={task.code}
                              onChange={(e) => handleCodeChange(task.id, e.target.value)}
                              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                task.verified ? "border-green-500 bg-green-50" : "border-gray-300"
                              }`}
                              placeholder="Enter code"
                              disabled={task.verified}
                            />
                            {task.verified ? (
                              <span className="text-green-600 font-semibold">Verified</span>
                            ) : (
                              <button
                                onClick={() => handleVerify(task.id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm whitespace-nowrap"
                              >
                                Verify
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center py-6 bg-gray-50">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="mx-1 px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: Math.ceil(tasks.length / itemsPerPage) }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`mx-1 px-4 py-2 rounded-md text-sm font-medium ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(tasks.length / itemsPerPage)}
                  className="mx-1 px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;