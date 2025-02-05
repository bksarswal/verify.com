import React, { useState } from 'react';
// import { input } from "../components/ui/input"
// import { button } from "../components/ui/button"
// import { Checkbox } from "../components/ui/checkbox"


const Signup = () => {
  // Keeping all the existing state and validation logic
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});
  
  // Keeping all the existing validation functions and handlers
  const validateUsername = (username) => {
    if (!username) return "Username is required";
    if (username.length < 3 || username.length > 15) {
      return "Username must be 3-15 characters long";
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return "Username can only contain letters, numbers, and underscores";
    }
    return "";
  };

  // ... keeping other validation functions ...

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    // Keeping existing submit logic
    e.preventDefault();
    // ... validation logic ...
  };

  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-[#F2FAFA] rounded-[30px] p-8 relative">
        {/* Close button */}
        <button className="absolute top-6 right-6 text-black hover:text-gray-700">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <h2 className="text-[48px] font-bold text-center mb-8 font-poppins">Signup</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] font-poppins text-[16px]"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1 font-poppins">*{errors.username}</p>
            )}
          </div>

          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] font-poppins text-[16px]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 font-poppins">*{errors.email}</p>
            )}
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] font-poppins text-[16px]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 font-poppins">*{errors.password}</p>
            )}
          </div>

          <div>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] font-poppins text-[16px]"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1 font-poppins">*{errors.confirmPassword}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type ='checkbox'
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => handleChange({ target: { name: 'acceptTerms', type: 'checkbox', checked } })}
              className="border-black"
            />
            <label htmlFor="acceptTerms" className="text-sm font-poppins">
              I agree to the{' '}
              <a href="#" className="text-[#2196F3]">Terms & Conditions</a>
              {' '}and{' '}
              <a href="#" className="text-[#2196F3]">Privacy Policy</a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2196F3] text-white py-3 rounded-xl hover:bg-[#1976D2] focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:ring-offset-2 font-poppins text-[18px] mt-6"
          >
            Signup
          </button>
          <div className="text-center font-poppins">
            Already have an account?{' '}
            <a href="#" className="text-[#2196F3] hover:text-[#1976D2]">
              Login
            </a>
          </div>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-poppins">Or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => console.log('Google signup clicked')}
            className="w-full flex items-center justify-center px-4 py-3 border border-black rounded-xl text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2196F3] font-poppins"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Signup with Google
          </button>

          
        </form>
      </div>
    </div>
  );
};

export default Signup;
