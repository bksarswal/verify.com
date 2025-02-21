import React, { useState, useEffect } from 'react';

import { getFirestore,doc,setDoc ,getDoc} from 'firebase/firestore';
import app from '../../../Config/firebaseConfig';

const UserInfoForm = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    fullName: '',
    phone: '',
    email: '',
    gender: 'male',
    dob: '',
    country: '',
    state: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  

  useEffect(() => {
    const fetchUserData = async () => {
        const db = getFirestore(app)
      const docRef = doc(db, 'users', 'user1'); // Change user1 to dynamic user ID
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserInfo(docSnap.data());
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const db = getFirestore(app)
    const docRef = doc(db, 'users', 'user1');
    await setDoc(docRef, userInfo);
    setIsEditing(false);
  };

  return (
    <div>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <label className="w-1/3 text-gray-700 font-semibold">Username</label>
            <input
              className="w-2/3 p-2 border rounded-lg"
              name="username"
              value={userInfo.username}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="w-1/3 text-gray-700 font-semibold">Full Name</label>
            <input
              className="w-2/3 p-2 border rounded-lg"
              name="fullName"
              value={userInfo.fullName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label className="w-1/3 text-gray-700 font-semibold">Phone No.</label>
          <input
            className="w-2/3 p-2 border rounded-lg"
            name="phone"
            value={userInfo.phone}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="w-1/3 text-gray-700 font-semibold">Email</label>
          <input
            className="w-2/3 p-2 border rounded-lg"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="w-1/3 text-gray-700 font-semibold">Gender</label>
          <select
            className="w-2/3 p-2 border rounded-lg"
            name="gender"
            value={userInfo.gender}
            onChange={handleChange}
            disabled={!isEditing}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="w-1/3 text-gray-700 font-semibold">DOB</label>
          <input
            className="w-2/3 p-2 border rounded-lg"
            name="dob"
            value={userInfo.dob}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <label className="w-1/3 text-gray-700 font-semibold">Country</label>
            <input
              className="w-2/3 p-2 border rounded-lg"
              name="country"
              value={userInfo.country}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="w-1/3 text-gray-700 font-semibold">State</label>
            <input
              className="w-2/3 p-2 border rounded-lg"
              name="state"
              value={userInfo.state}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        {!isEditing ? (
          <button
            type="button"
            className="w-full bg-gray-500 text-white p-2 rounded-lg"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        ) : (
          <button
            type="button"
            className="w-full bg-blue-500 text-white p-2 rounded-lg"
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </form>
    </div>
  );
};

export default UserInfoForm;