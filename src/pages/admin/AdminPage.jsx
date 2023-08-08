import React from 'react';
import { AiOutlineUserAdd, AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';

export default function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');

    navigate('/login');
  }
  
  return (
    <section className="flex justify-center items-center min-h-screen p-4 xl:p-8 bg-gray-50">
      <div className='grid grid-cols-1 md:grid-cols-2 w-full md:w-1/2 gap-4'>
        <Link to="/admin/createEmployee">
          <div className="w-full bg-white rounded shadow p-4 xl:p-8 h-full border-2 border-blue-400 cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out">
            <AiOutlineUserAdd  className='text-4xl text-blue-800 mx-auto'/>

            <h2 className='mt-4 font-bold text-xl text-blue-800 text-center'>Create New Employee</h2>
          </div>
        </Link>

        <div className="w-full bg-white rounded shadow p-4 xl:p-8 h-full border-2 border-red-400 cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out" onClick={handleLogout}>
          <AiOutlineLogout className='text-4xl text-red-800 mx-auto'/>

          <h2 className='mt-4 font-bold text-xl text-red-800 text-center'>Logout</h2>
        </div>
      </div>
    </section>
  )
}
