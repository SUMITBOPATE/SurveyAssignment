import React, { useState ,useEffect} from 'react';
import * as Yup from "yup";
function Inputfields() {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     password: '',
//     confirmPassword: '',
//     age: '',
//     gender: '',
//     interests: [],
//     birthDate: '',
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       interests: checked
//         ? [...prevState.interests, name]
//         : prevState.interests.filter(interest => interest !== name)
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log(formData);
//   };
const [formData, setFormData] = useState({
    surveyorName: "",
    zoneNo: "",
    wardNo: "",
    address:"",
    streetName: "",
    conditionofManhole: "",
  inwardLevel: "",
    topLevel: "",
    remark: "",
    // interests: [],
    typeofPipe:"",
    birthDate: "",
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is Required"),
    lastName: Yup.string().required("Last Name is Required"),
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid email format"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone Number must be 10 digits")
      .required(),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    age: Yup.number()
      .typeError("Age must be a number")
      .min(18, "You must be at least 18 years old")
      .max(100, "You cannot be older than 100 years")
      .required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    interests: Yup.array()
      .min(1, "Select at least one interest")
      .required("Select at least one interest"),
    birthDate: Yup.date().required("Date of birth is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

   

    try {
      await validationSchema.validate(formData, {abortEarly: false});
      console.log("Form Submitted", formData);
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCheckboxChange = (e) => {
    const {name, checked} = e.target;
    let updatedInterests = [...formData.interests];
    if (checked) {
      updatedInterests.push(name);
    } else {
      updatedInterests = updatedInterests.filter(
        (interest) => interest !== name
      );
    }

    setFormData({
      ...formData,
      interests: updatedInterests,
    });
  };


  //for address
  const getUserLocationAndAddress = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Use Google Maps Geocoding API to get the address
          const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`);
          const data = await response.json();
          if (data.results && data.results.length >  0) {
            const address = data.results[0].formatted_address;
            setFormData(prevState => ({
              ...prevState,
              address: address,
            }));
          }
        },
        (error) => {
          console.error('Error getting user location', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  // Call the function to get user's location and address when the component mounts
  useEffect(() => {
    getUserLocationAndAddress();
  }, []);





  return (
    <>
    <div className="w-full max-w-full  text-start bg-purple-600 font-medium text-white p-4 m-2">
        Survey Application</div>
        <div className='font-bold text-center'>   Storm Water Assessment Form</div>
    <form className="form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
        
        </label> */}
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 font-medium text-gray-900  bg-neutral-300 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder="Surveyor Name"
          onChange={handleChange}
        />
        {errors.firstName && <div className="text-red-500 text-xs italic">{errors.firstName}</div>}
      </div>
      <div className="mb-4">
        {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
          Gender:
        </label> */}
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Zone No</option>
          <option value="male">Option1</option>
          <option value="female">Option2</option>
          <option value="other">Option3</option>
        </select>
        {errors.gender && <div className="text-red-500 text-xs italic">{errors.gender}</div>}
      </div>
      {/* Repeat for each input field */}
      <div className="mb-4">
        {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
          Last Name:
        </label> */}
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="lastName"
          value={formData.lastName}
          placeholder="Ward No"
          onChange={handleChange}
        />
        {errors.lastName && <div className="text-red-500 text-xs italic">{errors.lastName}</div>}
      </div>
      {/* ... Repeat for each input field */}

<div className='mb-4'>
<input
      type="text"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      name="address"
      value={formData.address}
      placeholder="Address"
      readOnly // Make the address field read-only so the user can't modify it
    />
</div>
      <div className="mb-4">
      
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="lastName"
          value={formData.streetName}
          placeholder="Ward No"
          onChange={handleChange}
        />
        {errors.lastName && <div className="text-red-500 text-xs italic">{errors.lastName}</div>}
      </div>
      <div className="mb-4">
        {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email:
        </label> */}
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your email"
          onChange={handleChange}
        />
        {errors.email && <div className="text-red-500 text-xs italic">{errors.email}</div>}
      </div>
      {/* ... Repeat for each input field */}
      <div className="mb-4">
        {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
          Phone Number:
        </label> */}
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          placeholder="Enter your phone number"
          onChange={handleChange}
        />
        {errors.phoneNumber && <div className="text-red-500 text-xs italic">{errors.phoneNumber}</div>}
      </div>
      {/* ... Repeat for each input field */}
      <div className="mb-4">
        {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password:
        </label> */}
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          name="password"
          value={formData.password}
          placeholder="Enter your password"
          onChange={handleChange}
        />
        {errors.password && <div className="text-red-500 text-xs italic">{errors.password}</div>}
      </div>
      {/* ... Repeat for each input field */}
      <div className="mb-4">
        {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
          Confirm Password:
        </label> */}
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          placeholder="Confirm your password"
          onChange={handleChange}
        />
        {errors.confirmPassword && <div className="text-red-500 text-xs italic">{errors.confirmPassword}</div>}
      </div>
      {/* ... Repeat for each input field */}
      <div className="mb-4">
        {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
          Age:
        </label> */}
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          name="age"
          value={formData.age}
          placeholder="Enter your age"
          onChange={handleChange}
        />
        {errors.age && <div className="text-red-500 text-xs italic">{errors.age}</div>}
      </div>
      {/* ... Repeat for each input field */}
      <div className="mb-4">
        {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
          Gender:
        </label> */}
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Condition of Manhole</option>
          <option value="male">Option1</option>
          <option value="female">Option2</option>
          <option value="other">Option3</option>
        </select>
        {errors.gender && <div className="text-red-500 text-xs italic">{errors.gender}</div>}
      </div>
      {/* ... Repeat for each input field */}
    
      {/* ... Repeat for each input field */}
      <div className="mb-4">
        {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birthDate">
          Date of Birth:
        </label> */}
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="date"
          name="birthDate"
          value={formData.birthDate}
          placeholder= "dob"
          onChange={handleChange}
          />
          {errors.birthDate && <div className="error">{errors.birthDate}</div>}
        </div>
        <button type="submit">Submit</button>
      </form>
      </>
       );
    };
    
    export default Inputfields;