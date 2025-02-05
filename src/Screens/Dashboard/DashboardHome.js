import React, { useState } from "react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, taskName: "Click Here to Verify Task ", earning: "$5.00", code: "", verified: false },
    { id: 1, taskName: "Click Here to Verify Task ", earning: "$5.00", code: "", verified: false },
    { id: 1, taskName: "Click Here to Verify Task ", earning: "$5.00", code: "", verified: false },
    { id: 1, taskName: "Click Here to Verify Task ", earning: "$5.00", code: "", verified: false },
    { id: 1, taskName: "Click Here to Verify Task ", earning: "$5.00", code: "", verified: false },
    { id: 1, taskName: "Click Here to Verify Task ", earning: "$5.00", code: "", verified: false },
    { id: 1, taskName: "Click Here to Verify Task ", earning: "$5.00", code: "", verified: false },
    { id: 1, taskName: "Click Here to Verify Task ", earning: "$5.00", code: "", verified: false },
    { id: 1, taskName: "Click Here to Verify Task ", earning: "$5.00", code: "", verified: false },
    { id: 1, taskName: "Click Here to Verify Task ", earning: "$5.00", code: "", verified: false },
 
  
  ]);

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
          ? {
              ...task,
              verified: task.code === "1234", // Replace "1234" with your desired OTP for validation
            }
          : task
      )
    );
  };

  return (
    <div className="min-h-screen mt-24  bg-gray-100 py-8">
      <div className="max-w-7xl  mx-auto bg-white shadow-lg rounded-xl p-6">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr
              className="bg-gray-200 shadow-md"
              style={{
                boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)", // Subtle shadow
              }}
            >
              <th className="border border-gray-300 px-4 py-2 text-left">Sr. No</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Tasks</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Earning</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Enter Code</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{task.id}</td>
                <td className="border border-gray-300 text-blue-500 px-4 py-2">{task.taskName}</td>
                <td className="border border-gray-300 px-4 py-2">{task.earning}</td>
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
      </div>
    </div>
  );
};

export default Dashboard;
