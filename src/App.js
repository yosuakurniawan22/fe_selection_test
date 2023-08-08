import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';
import AdminPage from './pages/admin/AdminPage';
import CreateEmployeePage from './pages/admin/CreateEmployeePage';
import UpdateEmployeePage from './pages/UpdateEmployeePage';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/createEmployee" element={<CreateEmployeePage />} />

        <Route path='/updateEmployee/:token' element={<UpdateEmployeePage />}/>
        <Route path='/' element={<LandingPage />}/>

        <Route path='/unauthorized' element={<Unauthorized />}/>
        <Route path='/error' element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
