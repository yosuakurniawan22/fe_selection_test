import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

export default function LandingPage() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Convert to 12-hour format
  
      const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
      const formattedDate = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
  
      setCurrentTime(formattedTime);
      setCurrentDate(formattedDate);
    };
  
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
  
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const fetchAttendanceByDate = async () => {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      };

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/attendance/${formattedDate}`, 
          {headers}
        );

        setAttendanceData(response.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchAttendanceByDate();
  }, []);

  const handleClockIn = async () => {
    try {
      const token = localStorage.getItem('token');

      const headers = {
        'Authorization': `Bearer ${token}`, 
      };

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/attendance/clockIn`,
        {},
        { headers }
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const handleClockOut = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`, 
      };

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/attendance/clockOut`,
        {},
        { headers }
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  
  return (
    <section className="flex justify-center items-center min-h-screen p-4 xl:p-8 bg-gray-50">
       <ToastContainer />
      <div className='w-full lg:w-1/2'> 
        <div className="bg-white rounded shadow p-4 xl:p-8">
          <h1 className='text-center font-bold text-2xl'>
            Live Attendance
          </h1>

          <hr className='my-4' />

          <div className='flex flex-col gap-2 text-center'>
            <p className='text-xl font-semibold'>{currentTime}</p>
            <p className='text-sm text-gray-400 font-bold'>{currentDate}</p>
          </div>

          <hr className='my-4' />

          <div className='flex flex-col gap-2 text-center'>
            <p className='text-sm text-gray-400 font-bold'>Schedule {attendanceData.logDate}</p>
            <p className='text-lg font-semibold'>
            {attendanceData.shift && attendanceData.shift.toUpperCase()}
            </p>
            <p className='text-xl font-semibold'>{attendanceData.scheduleIn} - {attendanceData.scheduleOut}</p>
          </div>

          <hr className='my-4' />

          <div className='flex gap-4'>
            <button type='button' className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md text-sm px-5 py-2.5 text-center font-bold  transition-colors ease-in-out duration-300" onClick={handleClockIn}>
              Clock In
            </button>

            <button type='button' className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-md text-sm px-5 py-2.5 text-center font-bold  transition-colors ease-in-out duration-300" onClick={handleClockOut}>
              Clock Out
            </button>
          </div>
        </div>
        <div className='text-center'>
          <Link to={'/attendance-history'} className='my-5 inline-block underline w-full text-blue-600 hover:text-blue-700 transition-colors duration-200 ease-in-out'>
            Show Attendance History
          </Link>
        </div>
      </div>
    </section>
  )
}
