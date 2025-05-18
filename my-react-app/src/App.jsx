import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AddPost from './AddPost.jsx';
import Login_Signup from './Login-Signup.jsx';
import ForgetPassword from './ForgetPassword.jsx';
import GoodbyeForm from './GoodbyeForm.jsx';
import Cursor from './Cursor'; 
import Header from './Header.jsx';  
import GoodbyePage from './GoodbyePage.jsx';
import Homepage from './HomePage.jsx';

function App() {
  return (
    <>
      <Cursor />
      <Router>
        {/* <Header />          <-- Add Header here, visible on all pages */}
        <Routes>
          <Route path="/homepage" element={<AddPost />} />
          <Route path="/login-signup" element={<Homepage />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/login" element={<Login_Signup />} />
          <Route path="/goodbyeform" element={<GoodbyeForm />} />
          <Route path="/goodbye/:id" element={<GoodbyePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
