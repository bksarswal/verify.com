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
import { FaEdit, FaTrash } from "react-icons/fa";

const Updateitms = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    const db = getFirestore(app);
    const taskCollection = collection(db, "datsa");

    const unsubscribe = onSnapshot(
      taskCollection,
      (snapshot) => {
        const taskList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
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
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">Manage Tasks</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading tasks...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <table className="w-full border border-gray-300 text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border border-gray-300 px-4 py-2">Task</th>
                <th className="border border-gray-300 px-4 py-2">Earning</th>
                {isAdmin && <th className="border border-gray-300 px-4 py-2">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-100">
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
                  {isAdmin && (
                    <td className="border border-gray-300 px-4 py-2 flex space-x-2 justify-center">
                      <button
                        onClick={() => handleUpdate(task.id, task.LinksValue, task.Earinhg)}
                        className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
                      >
                        <FaTrash />
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
