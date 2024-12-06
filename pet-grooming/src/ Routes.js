import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/ Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProfileOwner from './pages/ProfileOwner';
import ProfileGroomer from './pages/ProfileGroomer';
// import { useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom'; // Import Navigate for redirection
import About from './components/About';
import Editprofile from './pages/Editprofile';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile-owner/:userId" element={<ProfileOwner />} />

        {/* <Route path="/profile-groomer" element={<ProfileGroomer />} /> */}
        <Route path="/profile-groomer/:id" element={<ProfileGroomer />} />


        {/* <Route path="/add-pet-details/:ownerId" component={AddPetDetails} />
        <Route path="/book-appointment" element={<BookAppointment />} /> */}
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/about" element={<About/>}/>
      <Route path="editprofile/:id" element={<Editprofile/>}/>
    </Routes>
  );
};

export default AppRoutes;
