// Form.jsx
import React, { useState } from 'react';
import FormField from './FormField';
import * as Yup from "yup";
function Form({ onSubmit }) {
  const [formData, setFormData] = useState({
    surveyorName: "",
    zoneNo: [],
    wardNo: "",
    address:"",
    streetName: "",
    conditionofManhole: "",
  inwardLevel: "",
    topLevel: "",
    remark: "",
    typeofPipe:"",
    birthDate: "",
    // ... other form fields
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // ... validation logic
  //   onSubmit(formData); // Call the onSubmit callback with the form data
  // };
  const validationSchema = Yup.object({
    surveyorName: Yup.string().required("Surveyor Name is Required"),
    
   
 
  
    gender: Yup.string().required("Gender is required"),
    zoneNo: Yup.array()
      .min(1, "Select at Zone No")
      .required("Select at least Zone No"),
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
  return (
  <form className="form bg-white shadow-md rounded px-2 pt-2 pb-4 mb-2"  onSubmit={handleSubmit}>
     <FormField
        name="surveyorName"
        label="Surveyor Name"
        type="text"
        value={formData.surveyorName}
        onChange={handleChange}
        error={errors.surveyorName}
      />
      <FormField
  name="zoneNo"
  label="zoneNo"
  type="select"
  value={formData.zoneNo}
  onChange={handleChange}
  error={errors.zoneNo}
  options={[
    { value: 'zoneNo', label: 'Select Zone' },
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]}
/>
   
      <FormField
        name="wardNo"
        label="Ward No"
        type="text"
        value={formData.wardNo}
        onChange={handleChange}
        error={errors.wardNo}
      />
      <FormField
        name="address"
        label="Address"
        type="text"
        value={formData.address}
        onChange={handleChange}
        error={errors.address}
      />
      <FormField
        name="streetName"
        label="Street Name"
        type="text"
        value={formData.streetName}
        onChange={handleChange}
        error={errors.streetName}
      />
      <FormField
        name="conditionofManhole"
        label="Condition of Manhole"
        type="text"
        value={formData.conditionofManhole}
        onChange={handleChange}
        error={errors.conditionofManhole}
      />
      <FormField
        name="inwardLevel"
        label="Inward Level"
        type="text"
        value={formData.inwardLevel}
        onChange={handleChange}
        error={errors.inwardLevel}
      />
      <FormField
        name="topLevel"
        label="Top Level"
        type="text"
        value={formData.topLevel}
        onChange={handleChange}
        error={errors.topLevel}
      />
      <FormField
        name="remark"
        label="Remark"
        type="text"
        value={formData.remark}
        onChange={handleChange}
        error={errors.remark}
      />
      <FormField
        name="typeofPipe"
        label="Type of Pipe"
        type="text"
        value={formData.typeofPipe}
        onChange={handleChange}
        error={errors.typeofPipe}
      />
      <FormField
        name="birthDate"
        label="Birth Date"
        type="date"
        value={formData.birthDate}
        onChange={handleChange}
        error={errors.birthDate}
      />
      <button  className="bg-purple-600 w-full px-2 pt-2  pb-4 mb-4 " type="submit">Submit Survey</button>
    </form>
  );
}

export default Form;