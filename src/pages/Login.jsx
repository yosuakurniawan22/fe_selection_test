import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  };
 
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required('Email is Required'),
    password: Yup.string().required('Password is Required')
  });

  const handleSubmit = async  (values) => {
    try {
      const body = {
        email: values.email,
        password: values.password,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        body
      );

      const token = response.data.token;

      localStorage.setItem('token', token);
      localStorage.setItem('id', response.data.data.id);

      toast.success(response.data.message);

      const decodedToken = jwtDecode(token);

      const isAdmin = decodedToken.userRole === 1;

      if(isAdmin) {
        navigate('/admin');
      } else {
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 xl:p-8 bg-gray-50">
      <div className="w-full lg:w-1/3 bg-white rounded shadow p-4 xl:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-4">
            Log in to your account
        </h1>
        <ToastContainer />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-900">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:outline-none focus:border-blue-500 block w-full p-2.5"
                placeholder="Email address"
              />
              <ErrorMessage
                name="email"
                component="small"
                className="text-red-500 mt-2 text-sm"
              />
            </div>
            
            <div className="mb-4 relative">
              <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900">
                Password:
              </label>
              <Field
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:outline-none focus:border-blue-500 block w-full p-2.5"
                placeholder="Password"
              />
              <span
                className="password-toggle cursor-pointer absolute top-2 right-3"
                onClick={handleTogglePassword}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
              <ErrorMessage
                name="password"
                component="small"
                className="text-red-500 mt-2 text-sm"
              />
            </div>

            <hr className='py-2'/>

            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md text-sm px-5 py-2.5 text-center font-bold  transition-colors ease-in-out duration-300"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
