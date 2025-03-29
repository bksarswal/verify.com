import React, { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../../../Config/firebaseConfig';

const UserInfoForm = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    mobile: '',
    email: '',
    dob: '',
    country: '',
    state: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then((response) => response.json())
      .then((data) => {
        const countryList = data.data.map((country) => ({
          name: country.name,
          states: country.states.map((state) => state.name),
        }));
        setCountries(countryList);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          setUserInfo((prevInfo) => ({ ...prevInfo, email: user.email }));

          if (docSnap.exists()) {
            setUserInfo((prevInfo) => ({ ...prevInfo, ...docSnap.data() }));
            const selectedCountry = countries.find((c) => c.name === docSnap.data().country);
            if (selectedCountry) {
              setStates(selectedCountry.states);
            }
          }
        } catch (err) {
          setError('Failed to fetch user data.');
        } finally {
          setIsLoading(false);
        }
      } else {
        setError('User not authenticated.');
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [db, countries]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => {
      const updatedInfo = { ...prevInfo, [name]: value };
      setIsEditing(true);
      return updatedInfo;
    });

    if (name === 'country') {
      const selectedCountry = countries.find((c) => c.name === value);
      setStates(selectedCountry ? selectedCountry.states : []);
      setUserInfo((prevInfo) => ({ ...prevInfo, country: value, state: '' }));
    }
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, userInfo, { merge: true });

      setSuccess('User information saved successfully!');
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to save user data.');
    }
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div>
      <form className="space-y-4">
        <input
          name="name"
          value={userInfo.name} // Fixed 'username' to 'name'
          onChange={handleChange}
          disabled={!isEditing}
          required
          placeholder="Username"
          className="w-full p-2 border rounded-lg"
        />
        <input
          name="mobile"
          value={userInfo.mobile}
          onChange={handleChange}
          disabled={!isEditing}
          required
          placeholder="Mobile No."
          className="w-full p-2 border rounded-lg"
        />
        <input
          name="email"
          value={userInfo.email}
          readOnly
          required
          className="w-full p-2 border rounded-lg bg-gray-100"
        />
        <input
          name="dob"
          type="date"
          value={userInfo.dob}
          onChange={handleChange}
          disabled={!isEditing}
          required
          className="w-full p-2 border rounded-lg"
        />
        <select
          name="country"
          value={userInfo.country}
          onChange={handleChange}
          disabled={!isEditing}
          required
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <select
          name="state"
          value={userInfo.state}
          onChange={handleChange}
          disabled={!isEditing || !userInfo.country}
          required
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
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
        {success && <div className="text-center text-green-500">{success}</div>}
      </form>
    </div>
  );
};

export default UserInfoForm;
