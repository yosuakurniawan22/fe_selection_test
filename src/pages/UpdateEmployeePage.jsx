import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateEmployeePage() {
  const { token } = useParams();
  const [isLinkExpired, setIsLinkExpired] = useState(false);
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    const decodedToken = jwtDecode(token);
    setEmail(decodedToken.email);

    const checkLinkExpiration = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/checkLinkExpired`,
          {
            params: {
              token: token
            }
          }
        );
  
        setIsLinkExpired(response.data.result);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }

    checkLinkExpiration();
  }, [token]);

  const initialValues = {
    fullName: '',
    birthdate: '',
    password: '',
    confirmPassword: '',
  };
 
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"), 
    birthdate: Yup.date().required("Birthdate is required"), 
    password: Yup.string().required("Password is required").matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long and include at least 1 uppercase letter, 1 digit number, and 1 special character."
    ), 
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Password must match'
    ).required('Confirm Password is required'),
  });

  const handleSubmit = async  (values) => {
    try {
      const body = {
        fullName: values.fullName,
        birthdate: values.birthdate,
        password: values.password,
        confirmPassword: values.confirmPassword
      };

      const headers = {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      };

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/auth/updateAccount`,
        body,
        {headers}
      );

      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className='flex justify-center items-center min-h-screen p-4 xl:p-8 bg-gray-50'>
      {isLinkExpired ? (
        <p className='text-gray-400 font-bold text-xl text-center'>Link Expired</p>
      ) : (
        <div className='w-full lg:w-1/3 bg-white rounded shadow p-4 xl:p-8'>
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-4">
              Update Account New Employee
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
                  Email Employee
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:outline-none focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200"
                  placeholder="Email address"
                  value={email}
                  disabled
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="fullName" className="block mb-2 text-sm font-bold text-gray-900">
                  Full Name
                </label>
                <Field
                  type='text'
                  id="fullName"
                  name="fullName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:outline-none focus:border-blue-500 block w-full p-2.5"
                  placeholder="Full Name"
                />

                <ErrorMessage
                  name="fullName"
                  component="small"
                  className="text-red-500 mt-2 text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="birthdate" className="block mb-2 text-sm font-bold text-gray-900">
                  Birthdate
                </label>
                <Field
                  type='date'
                  id="birthdate"
                  name="birthdate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:outline-none focus:border-blue-500 block w-full p-2.5"
                  placeholder="Full Name"
                />

                <ErrorMessage
                  name="birthdate"
                  component="small"
                  className="text-red-500 mt-2 text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900">
                  Password
                </label>
                <Field
                  type='password'
                  id="password"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:outline-none focus:border-blue-500 block w-full p-2.5"
                  placeholder="Password"
                />

                <ErrorMessage
                  name="password"
                  component="small"
                  className="text-red-500 mt-2 text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-bold text-gray-900">
                  Confirm Password
                </label>
                <Field
                  type='password'
                  id="confirmPassword"
                  name="confirmPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:outline-none focus:border-blue-500 block w-full p-2.5"
                  placeholder="Confirm Password"
                />

                <ErrorMessage
                  name="confirmPassword"
                  component="small"
                  className="text-red-500 mt-2 text-sm"
                />
              </div>
              

              <hr className='py-2'/>

              <button
                type="submit"
                className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md text-sm px-5 py-2.5 text-center font-bold  transition-colors ease-in-out duration-300`}
              >
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      )}
    </section>
  )
}
