import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login_Signup from './Login-Signup.jsx';
import ForgetPassword from './ForgetPassword.jsx';
import Cursor from './Cursor'; 

function App() {

  return (
    <>
      <Cursor />
      <Router>
        <Routes>
          <Route path="/" element={<Login_Signup />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App