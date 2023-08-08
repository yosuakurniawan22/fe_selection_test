import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

export default function AttendanceHistoryPage() {
  const currentDate = new Date().toISOString().split('T')[0].substring(0, 7);

  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    const fetchAttendanceHistory = async (page) => {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      };

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/attendance/history`, 
          {
            headers,
            params: {
              monthAndYear: selectedDate,
              page: page,
              pageSize: 10
            }
          }
        );

        setAttendanceData(response.data.data.attendanceLogs);
        setTotalPages(response.data.data.totalPages);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchAttendanceHistory(currentPage);
  }, [selectedDate, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedDate(e.target.value);
    setCurrentPage(1);
  };

  return (
    <section className="p-4 xl:p-8">
      <ToastContainer />
      
      <h1 className='font-bold text-4xl'>Attendance History</h1>
      
      <div className='flex gap-4'>
        <div>
            <input type="month" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-4" pattern="\d{4}-\d{2}" placeholder="YYYY-MM"  value={selectedDate}
            onChange={handleMonthChange} />
        </div>
      </div>
      
      <div class="relative overflow-x-auto my-5">
          <table class="w-full text-sm text-left text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                      <th scope="col" class="px-6 py-3">
                          Date
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Shift
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Schedule in
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Schedule out
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Clock in
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Clock out
                      </th>
                  </tr>
              </thead>
              <tbody>
                {attendanceData.map((data) => (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={data.id}>
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {data.logDate}
                      </th>
                      <td class="px-6 py-4">
                        <p
                          className={`px-2 py-1 rounded text-white inline-block font-medium text-xs ${
                            data.shift === 'work' ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        >
                          {data.shift.toUpperCase()}
                        </p>
                      </td>
                      <td class="px-6 py-4">
                        {data.scheduleIn}
                      </td>
                      <td class="px-6 py-4">
                        {data.scheduleOut}
                      </td>
                      <td class="px-6 py-4">
                        {data.clockInTime ? data.clockInTime : '-'}
                      </td>
                      <td class="px-6 py-4">
                        {data.clockOutTime ? data.clockOutTime : '-'}
                      </td>
                  </tr>
                ))}
              </tbody>
          </table>
      </div>

      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md text-sm px-5 py-2.5 text-center font-bold  transition-colors ease-in-out duration-300"
        >
          Prev
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md text-sm px-5 py-2.5 text-center font-bold  transition-colors ease-in-out duration-300"
        >
          Next
        </button>
      </div>
    </section>
  )
}
