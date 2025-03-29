import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import app from "../Config/firebaseConfig";

const Signup = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const db = getFirestore(app);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = {};
    if (!formData.name) newErrors.name = "*Name is required";
    if (!formData.email) newErrors.email = "*Email is required";
    if (!formData.mobile) newErrors.mobile = "*Mobile is required";
    if (!formData.password) newErrors.password = "*Password is required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "*Confirm Password is required";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "*Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        uid: user.uid, // Store UID for reference
        createdAt: new Date(),
      });

      alert("User signed up successfully!");
      navigate("/dashboard"); // Redirect to user info page
    } catch (error) {
      alert(error.message);
      setErrors({ auth: "*An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen mt-14 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full rounded-[30px] bg-[#F2FAFA] px-8 relative">
        <h2 className="text-[36px] font-bold text-center mb-2 font-poppins">Signup</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] font-poppins text-[14px]" placeholder="Name" />
            {errors.name && <p className="text-red-500 text-sm mt-1 font-poppins">{errors.name}</p>}
          </div>
          <div>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] font-poppins text-[14px]" placeholder="Email" />
            {errors.email && <p className="text-red-500 text-sm mt-1 font-poppins">{errors.email}</p>}
          </div>
          <div>
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full px-4 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] font-poppins text-[14px]" placeholder="Mobile" />
            {errors.mobile && <p className="text-red-500 text-sm mt-1 font-poppins">{errors.mobile}</p>}
          </div>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] font-poppins text-[14px]" placeholder="Password" />
            <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
            {errors.password && <p className="text-red-500 text-sm mt-1 font-poppins">{errors.password}</p>}
          </div>
          <div className="relative">
            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] font-poppins text-[14px]" placeholder="Confirm Password" />
            <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1 font-poppins">{errors.confirmPassword}</p>}
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-[#2196F3] text-white py-2 rounded-xl hover:bg-[#1976D2] focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:ring-offset-2 disabled:opacity-50 transition-colors font-poppins text-[18px]">
            {isSubmitting ? "Signing up..." : "Signup"}
          </button>
          <div className="text-center font-poppins">
            Already have an account? <a href="/signin" className="text-[#2196F3] hover:text-[#1976D2]">Signin</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
