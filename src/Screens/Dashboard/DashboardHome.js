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
    const taskCollection = collection(db, "datsa");

    const unsubscribe = onSnapshot(
      taskCollection,
      (snapshot) => {
        // Dummy Data for testing purposes (commenting out Firebase fetch)
        const dummyData = [
          {
            id: "1",
            LinksValue: "https://example.com/task1",
            Earinhg: 100,
            verified: false,
            code: "",
            verificationCode: "1234", // Add a unique verification code
          },
          {
            id: "2",
            LinksValue: "https://example.com/task2",
            Earinhg: 200,
            verified: false,
            code: "",
            verificationCode: "5678", // Another verification code
          },
          {
            id: "3",
            LinksValue: "https://example.com/task3",
            Earinhg: 150,
            verified: false,
            code: "",
            verificationCode: "91011", // Another verification code
          },
          // Add more dummy tasks here
        ];

        // Setting dummy data to state instead of Firebase data
        setTasks(dummyData);
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
        task.id === id
          ? { ...task, verified: task.code === task.verificationCode }
          : task
      )
    );
  };

  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / itemsPerPage);

  return (
    <div className="mt-16 min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <h2 className="text-2xl font-bold text-center py-6 bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
            Task Verification Dashboard
          </h2>

          {loading ? (
            <p className="text-center py-8 text-gray-500">Loading tasks...</p>
          ) : error ? (
            <p className="text-center py-8 text-red-500">{error}</p>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full table-auto border-t border-gray-200">
                  <thead>
                    <tr className="bg-gray-50 text-left text-sm font-medium text-gray-700">
                      <th className="px-4 py-3">Sr. No</th>
                      <th className="px-4 py-3">Task URL</th>
                      <th className="px-4 py-3">Earning</th>
                      <th className="px-4 py-3">Enter Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTasks.map((task, index) => (
                      <tr
                        key={task.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3 text-sm">
                          {indexOfFirstTask + index + 1}
                        </td>
                        <td className="px-4 py-3 text-blue-600 break-words max-w-[300px]">
                          <a
                            href={task.LinksValue}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            {task.LinksValue}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          ₹{task.Earinhg}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={task.code}
                              onChange={(e) =>
                                handleCodeChange(task.id, e.target.value)
                              }
                              className={`border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 text-sm ${
                                task.verified
                                  ? "border-green-500 bg-green-50"
                                  : "border-gray-300"
                              }`}
                              placeholder="Enter code"
                              disabled={task.verified}
                            />
                            {task.verified ? (
                              <span className="text-green-600 font-semibold">
                                Verified
                              </span>
                            ) : (
                              <button
                                onClick={() => handleVerify(task.id)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
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

              {/* Mobile View */}
              <div className="md:hidden space-y-4 p-4">
                {currentTasks.map((task, index) => (
                  <div
                    key={task.id}
                    className="bg-white shadow rounded-lg p-4 border"
                  >
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>#{indexOfFirstTask + index + 1}</strong>
                    </p>
                    <p className="text-blue-600 break-words mb-2">
                      <a
                        href={task.LinksValue}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {task.LinksValue}
                      </a>
                    </p>
                    <p className="text-sm text-gray-800 mb-2">
                      Earning: ₹{task.Earinhg}
                    </p>
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={task.code}
                        onChange={(e) =>
                          handleCodeChange(task.id, e.target.value)
                        }
                        className={`border rounded-md px-3 py-2 text-sm ${
                          task.verified
                            ? "border-green-500 bg-green-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter code"
                        disabled={task.verified}
                      />
                      {task.verified ? (
                        <span className="text-green-600 font-semibold">
                          Verified
                        </span>
                      ) : (
                        <button
                          onClick={() => handleVerify(task.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                        >
                          Verify
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center gap-2 py-6 bg-gray-50 flex-wrap">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-md text-sm ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      prev < totalPages ? prev + 1 : prev
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
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
   