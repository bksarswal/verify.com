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
    gender: "",
    dob: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
    if (!formData.gender) newErrors.gender = "*Gender is required";
    if (!formData.dob) newErrors.dob = "*Date of Birth is required";
    if (!formData.termsAccepted) newErrors.termsAccepted = "*You must accept the Terms & Conditions";
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

      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        gender: formData.gender,
        dob: formData.dob,
        uid: user.uid,
        createdAt: new Date(),
      });

      alert("User signed up successfully!");
      navigate("/dashboard");
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
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-black rounded-xl" placeholder="Name" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-black rounded-xl" placeholder="Email" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full px-4 py-2 border border-black rounded-xl" placeholder="Mobile" />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
          </div>
          <div>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2 border border-black rounded-xl">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>
          <div>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-4 py-2 border border-black rounded-xl" />
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
          </div>
          
          <div className="relative">
            <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border border-black rounded-xl" placeholder="Password" />
            <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="relative">
            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2 border border-black rounded-xl" placeholder="Confirm Password" />
            <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <div>
            <label className="flex items-center">
              <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="mr-2" />
              I accept the <a href="/terms" className="text-[#2196F3]">Terms & Conditions</a>
            </label>
            {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>}
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-[#2196F3] text-white py-2 rounded-xl">
            {isSubmitting ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;