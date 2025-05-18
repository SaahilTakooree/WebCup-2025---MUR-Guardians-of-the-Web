import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AddPost from './AddPost.jsx';
import Login_Signup from './Login-Signup.jsx';
import ForgetPassword from './ForgetPassword.jsx';
import HomePage from './HomePage.jsx'
import Cursor from './Cursor'; 
import GoodbyePage from './GoodbyePage.jsx';

function App() {

  return (
    <>
      <Cursor />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login-signup" element={<Login_Signup />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/goodbye/:id" element={<GoodbyePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App