import React, { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../../../Config/firebaseConfig';

const UserInfoForm = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    fullName: '',
    phone: '',
    email: '', // Email will be pre-filled from Firebase Auth
    gender: 'male',
    dob: '',
    country: '',
    state: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Sample data for countries and states
  const countries = [
    { name: 'India', states: ['Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu'] },
    { name: 'USA', states: ['California', 'Texas', 'New York', 'Florida'] },
    { name: 'Canada', states: ['Ontario', 'Quebec', 'British Columbia', 'Alberta'] },
    { name: 'Other', states: [] }, // Option for custom input
  ];

  const [states, setStates] = useState([]); // States will be populated based on selected country
  const [isOtherCountry, setIsOtherCountry] = useState(false); // Flag for custom country input
  const [isOtherState, setIsOtherState] = useState(false); // Flag for custom state input

  const auth = getAuth(app);
  const db = getFirestore(app);

  // Fetch user data from Firestore when the component loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, 'users', user.uid); // Use authenticated user's UID
          const docSnap = await getDoc(docRef);

          // Pre-fill email from Firebase Auth
          setUserInfo((prevInfo) => ({
            ...prevInfo,
            email: user.email, // Set email from Firebase Auth
          }));

          if (docSnap.exists()) {
            // If user data exists in Firestore, pre-fill the form
            setUserInfo((prevInfo) => ({
              ...prevInfo,
              ...docSnap.data(), // Merge Firestore data
            }));

            // Set states based on the selected country
            const selectedCountry = countries.find((c) => c.name === docSnap.data().country);
            if (selectedCountry) {
              setStates(selectedCountry.states);
            }
          }
        }
      } catch (err) {
        setError('Failed to fetch user data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData();
      } else {
        setError('User not authenticated.');
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });

    // Update states dropdown when country changes
    if (name === 'country') {
      const selectedCountry = countries.find((c) => c.name === value);
      if (selectedCountry) {
        setStates(selectedCountry.states);
        setIsOtherCountry(value === 'Other'); // Enable custom input for country
        setUserInfo((prevInfo) => ({
          ...prevInfo,
          state: '', // Reset state when country changes
        }));
      }
    }

    // Enable custom input for state if "Other" is selected
    if (name === 'state' && value === 'Other') {
      setIsOtherState(true);
    }
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        await setDoc(docRef, userInfo); // Save user data to Firestore
        setSuccess('User information saved successfully!');
        setIsEditing(false);
      }
    } catch (err) {
      setError('Failed to save user data. Please try again.');
    }
  };

  // Check if all fields are filled
  const isFormValid = () => {
    return (
      userInfo.username.trim() &&
      userInfo.fullName.trim() &&
      userInfo.phone.trim() &&
      userInfo.email.trim() &&
      userInfo.gender.trim() &&
      userInfo.dob.trim() &&
      userInfo.country.trim() &&
      userInfo.state.trim()
    );
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

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
              required
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
              required
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
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="w-1/3 text-gray-700 font-semibold">Email</label>
          <input
            className="w-2/3 p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            name="email"
            value={userInfo.email}
            readOnly // Email field is always read-only
            required
          />
        </div>
        {/* <div className="flex items-center gap-2">
          <label className="w-1/3 text-gray-700 font-semibold">Gender</label>
          <select
            className="w-2/3 p-2 border rounded-lg"
            name="gender"
            value={userInfo.gender}
            onChange={handleChange}
            disabled={!isEditing}
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div> */}
        <div className="flex items-center gap-2">
          <label className="w-1/3 text-gray-700 font-semibold">DOB</label>
          <input
            className="w-2/3 p-2 border rounded-lg"
            name="dob"
            type="date"
            value={userInfo.dob}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <label className="w-1/3 text-gray-700 font-semibold">Country</label>
            <select
              className="w-2/3 p-2 border rounded-lg"
              name="country"
              value={userInfo.country}
              onChange={handleChange}
              disabled={!isEditing}
              required
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {isOtherCountry && (
              <input
                className="w-2/3 p-2 border rounded-lg mt-2"
                type="text"
                placeholder="Enter your country"
                value={userInfo.country}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, country: e.target.value })
                }
                required
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <label className="w-1/3 text-gray-700 font-semibold">State</label>
            <select
              className="w-2/3 p-2 border rounded-lg"
              name="state"
              value={userInfo.state}
              onChange={handleChange}
              disabled={!isEditing || !userInfo.country}
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
            {isOtherState && (
              <input
                className="w-2/3 p-2 border rounded-lg mt-2"
                type="text"
                placeholder="Enter your state"
                value={userInfo.state}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, state: e.target.value })
                }
                required
              />
            )}
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
            className={`w-full bg-blue-500 text-white p-2 rounded-lg ${
              !isFormValid() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleSave}
            disabled={!isFormValid()}
          >
            Save
          </button>
        )}
        {success && <div className="text-center text-green-500">{success}</div>}
      </form>
    </div>
  );
};

export default UserInfoForm;