import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResetPassword(){

    const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = '*Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = '*Please enter a valid email address.';
    }

   

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setErrors({
        auth: '*Invalid email address or password'
      });
    } catch (error) {
      setErrors({
        auth: '*An error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
 
  navigate('/verifyotp')

  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <div className="min-h-screen  mt-16 flex items-center justify-center bg-[#F2FAFA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full  rounded-[30px] bg-[#F2FAFA] p-8 relative">
        {/* Close button */}
        <button className="absolute top-6 right-6 text-black hover:text-gray-700">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <h2 className="text-[48px] font-bold text-center mb-8 font-poppins">Reset Password</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] font-poppins text-[16px]"
              placeholder=" enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 font-poppins">{errors.email}</p>
            )}
          </div>

         

        

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2196F3] text-white py-3 rounded-xl hover:bg-[#1976D2] focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:ring-offset-2 disabled:opacity-50 transition-colors font-poppins text-[18px]"
          >
            {isSubmitting ? 'Otp Sending...' : 'Send Otp'}
          </button>
          <div className="text-center font-poppins">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="text-[#2196F3] hover:text-[#1976D2]">
              Signup
            </a>
          </div>
         < div className="text-center font-poppins">
            Already have an account?{' '}
            <a href="/signin" className="text-[#2196F3] hover:text-[#1976D2]">
              Signin
            </a>
          </div>

         

          
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

