import React, { useState, useEffect } from "react";
import app from "../../Config/firebaseConfig";
import {
  collection,
  getFirestore,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Updateitms = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // ✅ Check if user is admin

  useEffect(() => {
    const db = getFirestore(app);
    const taskCollection = collection(db, "datsa");

    const unsubscribe = onSnapshot(
      taskCollection,
      (snapshot) => {
        const taskList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          verified: false,
          code: "",
        }));

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

  // ✅ Update Task in Firestore
  const handleUpdate = async (id, updatedLink, updatedEarning) => {
    try {
      const db = getFirestore(app);
      const taskRef = doc(db, "datsa", id);

      await updateDoc(taskRef, {
        LinksValue: updatedLink,
        Earinhg: updatedEarning,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? { ...task, LinksValue: updatedLink, Earinhg: updatedEarning }
            : task
        )
      );

      alert("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task.");
    }
  };

  // ✅ Delete Task from Firestore
  const handleDelete = async (id) => {
    try {
      const db = getFirestore(app);
      const taskRef = doc(db, "datsa", id);

      await deleteDoc(taskRef);

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  };

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
                {isAdmin && <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 text-blue-500 px-4 py-2">
                    <input
                      type="text"
                      value={task.LinksValue}
                      onChange={(e) => handleUpdate(task.id, e.target.value, task.Earinhg)}
                      className="border border-gray-300 px-2 py-1 rounded-md w-full"
                      disabled={!isAdmin}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={task.Earinhg}
                      onChange={(e) => handleUpdate(task.id, task.LinksValue, e.target.value)}
                      className="border border-gray-300 px-2 py-1 rounded-md w-full"
                      disabled={!isAdmin}
                    />
                  </td>
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
                  {isAdmin && (
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleUpdate(task.id, task.LinksValue, task.Earinhg)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600 transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Updateitms;
