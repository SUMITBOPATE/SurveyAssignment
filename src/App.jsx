
import MainBlock from './MainBlock'
import './index.css'
import Inputfields from "./Components/Inputfields"
import Form from './Form'
import { useState } from 'react'
function App() {
  
const [formData,setFormData]=useState({});

const handleFormSubmit = (data) => {
  setFormData(data);
};


  return (
    <>
      <div>
      <div className="w-full max-w-full  text-start bg-purple-600 font-medium text-white p-4 m-2">
        Survey Application</div>
        <div className='font-bold text-center'>   Storm Water Assessment Form</div>
        <Form  onSubmit={handleFormSubmit}/>


        {/* <Inputfields/> */}
        {/* <MainBlock/> */}
      </div>
    </>
  )
}

export default App
