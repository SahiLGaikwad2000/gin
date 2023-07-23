import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
    const initialFormData = {
        username: '',
        email: '',
        password: '',
      };
  const [formData, setFormData] = useState(initialFormData);
  const [isLogin, setIsLogin] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleToggle = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  const handleSubmit = async(e) => {
    e.preventDefault(); 

    
    const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        
    const data = await response.json()
    console.log(data.status)
    if(data.status=='green'){
    toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT, // You can customize the position of the toast
        autoClose: 3000, // Time in milliseconds after which the toast will be automatically closed
        hideProgressBar: false, // Show or hide the progress bar
      });
      setFormData(initialFormData);
    }
    else{
        toast.error(data.message, {
            position: toast.POSITION.TOP_RIGHT, // You can customize the position of the toast
            autoClose: 3000, // Time in milliseconds after which the toast will be automatically closed
            hideProgressBar: false, // Show or hide the progress bar
          });
        }
    // else{
    //     toast.error(data.message, {
    //         position: toast.POSITION.TOP_RIGHT, // You can customize the position of the toast
    //         autoClose: 3000, // Time in milliseconds after which the toast will be automatically closed
    //         hideProgressBar: false, // Show or hide the progress bar
    //       });
    //     }

    // }
    // Here, you can handle form submission logic, e.g., send data to a server.
    // console.log(formData);
  };

  return (
    // <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl text-center mb-6">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (<div>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="User Name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>)}
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
           {!isLogin ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <p>
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button type="button" onClick={handleToggle}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
      </div>
    {/* </div> */}
    <ToastContainer />
    </div>
  );
};

export default Form;
