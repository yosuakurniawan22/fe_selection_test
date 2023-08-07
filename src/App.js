import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
    
        <Route path='/unauthorized' element={<Unauthorized />}/>
        <Route path='/error' element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
