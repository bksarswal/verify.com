import React, { useState } from 'react';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import app from '../../../Config/firebaseConfig'; // Adjust the import based on your Firebase setup

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const auth = getAuth(app);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user || !user.email) {
      setError('User not authenticated.');
      return;
    }

    try {
      // Step 1: Reauthenticate the user with their current password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Step 2: Update the password
      await updatePassword(user, newPassword);

      // Clear form and show success message
      setCurrentPassword('');
      setNewPassword('');
      setError('');
      setSuccess('Password changed successfully!');
    } catch (err) {
      console.error(err);
      setError('Failed to change password. Please check your current password and try again.');
      setSuccess('');
    }
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleChangePassword}>
        <div>
          <label className="block mb-1">Current Password</label>
          <input
            className="w-full p-2 border rounded-lg"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">New Password</label>
          <input
            className="w-full p-2 border rounded-lg"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;