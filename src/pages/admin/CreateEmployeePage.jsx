import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiLoader4Line } from 'react-icons/ri';

export default function CreateEmployeePage() {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    email: '',
    basicSalary: 0,
    FE_URL: '',
  };
 
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required('Email is Required'),
    basicSalary: Yup.number().required('Basic Salary is Required').moreThan(0, 'Basic Salary must be more than 0'),
  });

  const handleSubmit = async  (values) => {
    try {
      setIsLoading(true);

      const body = {
        email: values.email,
        monthlySalary: parseFloat(values.basicSalary),
        FE_URL: "http://localhost:3000"
      };

      const token = localStorage.getItem('token');

      const headers = {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/createEmployee`,
        body,
        {headers}
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className="flex justify-center items-center min-h-screen p-4 xl:p-8 bg-gray-50">
        <div className="w-full lg:w-1/3">
          <Link to={'/admin'} className='inline-block my-4 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-md text-sm px-5 py-2.5 text-center font-bold transition-colors ease-in-out duration-300'>
            Back
          </Link>

          <div className='bg-white rounded shadow p-4 xl:p-8'>

            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-4">
                Create New Employee
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
                    Basic Salary
                  </label>
                  <Field
                    type='number'
                    id="basicSalary"
                    name="basicSalary"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:outline-none focus:border-blue-500 block w-full p-2.5"
                    placeholder="Basic Salary"
                  />

                  <ErrorMessage
                    name="basicSalary"
                    component="small"
                    className="text-red-500 mt-2 text-sm"
                  />
                </div>

                <hr className='py-2'/>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md text-sm px-5 py-2.5 text-center font-bold  transition-colors ease-in-out duration-300 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <RiLoader4Line className="animate-spin mr-2" />
                      Submitting...
                    </span>
                  ) : (
                    'Submit'
                  )}
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </section>
  )
}
