import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';
import AdminPage from './pages/admin/AdminPage';
import CreateEmployeePage from './pages/admin/CreateEmployeePage';
import UpdateEmployeePage from './pages/UpdateEmployeePage';
import LandingPage from './pages/LandingPage';
import AttendanceHistoryPage from './pages/AttendanceHistoryPage';
import AdminRoute from './AdminRoute';
import AuthRoute from './AuthRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
        <Route path="/admin/createEmployee" element={<AdminRoute><CreateEmployeePage /></AdminRoute>} />

        <Route path='/updateEmployee/:token' element={<AuthRoute><UpdateEmployeePage /></AuthRoute>}/>
        <Route path='/' element={<AuthRoute><LandingPage /></AuthRoute>}/>
        <Route path='/attendance-history' element={<AuthRoute><AttendanceHistoryPage /></AuthRoute>}/>

        <Route path='/unauthorized' element={<Unauthorized />}/>
        <Route path='/error' element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
