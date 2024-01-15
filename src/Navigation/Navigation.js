import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from '../Pages/Auth/LoginPage/LoginPage';
import SignupPage from "../Pages/Auth/SignupPage/SignupPage";
import HomePage from "../Pages/User/HomePage/HomePage";
import AdminDashboard from "../Pages/Admin/AdminDashboard/AdminDashboard";
import { useState, useEffect } from 'react';
import { auth } from "../FireBase/FireBase";
import { onAuthStateChanged } from "firebase/auth";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import GiveTask from "../Pages/Admin/GiveTask/GiveTask";
import AdminHomePage from "../Pages/Admin/AdminHomePage/AdminHomePage";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const isAdmin = currentUser?.email === 'umairkhalil024@gmail.com';

  const isUser = currentUser;
  // console.log(currentUser);
  // console.log(isUser); 

  return (
    // {console.log(currentUser)}
    <>
      <BrowserRouter>
        { /* <Navbar admin={isAdmin} isUser = {isUser} /> */}
       
        <Routes>
          {isAdmin && (
            <>
              <Route path="/admin" element={<AdminDashboard admin={isAdmin} user={isUser} />} />
              <Route path="/" element={<AdminDashboard admin={isAdmin} user={isUser} />} />
              <Route path='/home' element={<AdminHomePage user={isUser}  admin = {isAdmin} />} />
              <Route path = '/assigntask' element={<GiveTask/>} /> 
              <Route path = '*' element={<AdminDashboard/>} /> 

            </>
          )}
          {currentUser && (
            <>
              <Route path="/home" element={<HomePage currentUser={isUser} />} />
              <Route path="/" element={<HomePage currentUser={isUser} />} />
              <Route path="*" element={<ErrorPage />} />

            </>
          )}
          {!isAdmin && !currentUser && (
            <>
              <Route path="/login" element={<LoginPage admin={isAdmin} />} />
              <Route path="/" element={<LoginPage admin={isAdmin} />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="*" element={<LoginPage admin={isAdmin} />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Navigation;