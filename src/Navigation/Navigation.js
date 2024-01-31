import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from '../Pages/Auth/LoginPage/LoginPage';
import SignupPage from "../Pages/Auth/SignupPage/SignupPage";
import HomePage from "../Pages/User/HomePage/HomePage";
import ViewAllTask from "../Pages/Admin/ViewAllTask/ViewAllTask";
import { useState, useEffect } from 'react';
import { auth } from "../FireBase/FireBase";
import { onAuthStateChanged } from "firebase/auth";
import GiveTask from "../Pages/Admin/GiveTask/GiveTask";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ForgetPassword from "../Pages/Auth/ForgetPassword/ForgetPassword";


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

  return (
    <>
      <BrowserRouter>
        <Routes>
          {isAdmin && (
            <>
              <Route path="/viewtask" element={<ViewAllTask admin={isAdmin} user={isUser} />} />
              <Route path="/" element={<ViewAllTask admin={isAdmin} user={isUser} />} />
              <Route path='/home' element={<Dashboard user={isUser} admin={isAdmin} />} />
              <Route path='/assigntask' element={<GiveTask admin={isAdmin} user = {isUser} />} />
              <Route path='*' element={<ViewAllTask admin={isAdmin} user={isUser} />} />

            </>
          )}
          {currentUser && (
            <>
              <Route path="/viewtask" element={<HomePage user={isUser} />} />
              <Route path="/" element={<HomePage user={isUser} />} />
              <Route path="*" element={<HomePage user={isUser} />} />
              <Route path ="/home" element={<Dashboard user={isUser} admin={isAdmin} />}   />
            </>
          )}
          {!isAdmin && !currentUser && (
            <>
              <Route path="/login" element={<LoginPage admin={isAdmin} />} />
              <Route path="/" element={<LoginPage admin={isAdmin} />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path ='/forgetpassword' element={<ForgetPassword/>} /> 
              <Route path="*" element={<LoginPage admin={isAdmin} />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Navigation;