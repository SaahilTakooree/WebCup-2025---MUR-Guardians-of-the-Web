import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AddPost from './AddPost.jsx';
import Login_Signup from './Login-Signup.jsx';
import ForgetPassword from './ForgetPassword.jsx';
import HomePage from './HomePage.jsx'
import Cursor from './Cursor'; 
import GoodbyePage from './GoodbyePage.jsx';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status


  return (
    <>
      <Cursor />
      <Router>
        <Routes>
          {/* If not logged in, always go to Login_Signup */}
          {!isLoggedIn ? (
            <>
              <Route path="/*" element={<Login_Signup setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/forgot-password" element={<ForgetPassword />} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/add-post" element={<AddPost />} />
              <Route path="/forgot-password" element={<ForgetPassword />} />
              <Route path="/goodbye/:id" element={<GoodbyePage />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App