

import React, { useRef, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from '../Config/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const Signup = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const db = getFirestore(app);

  const usernameRef = useRef();
  const firstnameRef = useRef();
  const middlenameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const dobRef = useRef();
  const genderRef = useRef();
  const addressRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  // Fetch countries and states
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then((response) => response.json())
      .then((data) => {
        const countryList = data.data.map((country) => ({
          label: country.name,
          value: country.name,
          states: country.states.map((state) => ({
            label: state.name,
            value: state.name,
          })),
        }));
        setCountries(countryList);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // Handle country selection
  const handleCountryChange = (selected) => {
    setSelectedCountry(selected);
    setStates(selected?.states || []);
    setSelectedState(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      firstname :firstnameRef.current.value,
      middlename:middlenameRef.current.value,
      lastname:lastnameRef.current.value,
      username: usernameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      dob: dobRef.current.value,
      gender: genderRef.current.value,
      address: addressRef.current.value,
      country: selectedCountry?.value || "",
      state: selectedState?.value || "",
      password: passwordRef.current.value
    };

    // Validate form fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = `*${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Save user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        ...formData,
        uid: user.uid,
        createdAt: new Date()
      });

      alert('Signup successful');
      navigate('/signin');
    } catch (error) {
      setErrors({ auth: `*${error.message}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" mt-16 min-h-screen flex items-center  bg-white justify-center py-12 px-4 ">
      <div className="max-w-md w-full rounded-2xl bg-[#9ad6d6] p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <input type="text" ref={firstnameRef} placeholder="Firstname" className="w-full px-4 py-1 border rounded-xl" />
          {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
          <input type="text" ref={middlenameRef} placeholder="Middle Name(optional)" className="w-full px-4 py-1 border rounded-xl" />
          
          <input type="text" ref={lastnameRef} placeholder="Last name" className="w-full px-4 py-1 border rounded-xl" />
          {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
          <input type="text" ref={usernameRef} placeholder="Username" className="w-full px-4 py-1 border rounded-xl" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input type="email" ref={emailRef} placeholder="Email" className="w-full px-4 py-1 border rounded-xl" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input type="text" ref={phoneRef} placeholder="Phone Number" className="w-full px-4 py-1 border rounded-xl" />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

          <input type="date" ref={dobRef} className="w-full px-4 py-1 border rounded-xl" />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}

          <select ref={genderRef} className="w-full px-4 py-1 border rounded-xl">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}

          <input type="text" ref={addressRef} placeholder="Address" className="w-full px-4 py-1 border rounded-xl" />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

          <Select
            options={countries}
            value={selectedCountry}
            onChange={handleCountryChange}
            placeholder="Select Country"
            className="w-full"
          />
          {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}

          <Select
            options={states}
            value={selectedState}
            onChange={setSelectedState}
            placeholder="Select State"
            isDisabled={!selectedCountry}
            className="w-full"
          />
          {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}

          <input type="password" ref={passwordRef} placeholder="Password" className="w-full px-4 py-1 border rounded-xl" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          {errors.auth && <p className="text-red-500 text-sm">{errors.auth}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-1 rounded-xl hover:bg-blue-600 transition"
          >
            {isSubmitting ? 'Signing up...' : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;


