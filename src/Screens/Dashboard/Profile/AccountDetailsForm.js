import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../../../Config/firebaseConfig'; // Adjust the import based on your Firebase setup

const AccountDetailsForm = () => {
  const [userEmail, setUserEmail] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, fetch the email and registration date
        setUserEmail(user.email);

        // Fetch the registration date from user metadata
        const creationTime = user.metadata.creationTime;
        if (creationTime) {
          // Convert the creationTime to a date string (YYYY-MM-DD)
          const date = new Date(creationTime).toISOString().split('T')[0];
          setRegistrationDate(date);
        }
      } else {
        // User is signed out
        setUserEmail('');
        setRegistrationDate('');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  return (
    <div>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            type="email"
            value={userEmail}
            disabled
          />
        </div>
        <div>
          <label className="block mb-1">Date of Registration</label>
          <input
            className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            type="date"
            value={registrationDate}
            disabled
          />
        </div>
        <div>
          <label className="block mb-1">Task completed</label>
          <input
            className="w-full p-2 border rounded-lg"
            type="number"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block mb-1">Life time earning</label>
          <input
            className="w-full p-2 border rounded-lg"
            type="number"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block mb-1">Total Withdraw</label>
          <input
            className="w-full p-2 border rounded-lg"
            type="number"
            placeholder="0.00"
          />
        </div>
      </form>
    </div>
  );
};

export default AccountDetailsForm;