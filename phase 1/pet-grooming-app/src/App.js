import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Grooming from './pages/Grooming';
import DayCamp from './pages/DayCamp';
import OurGroomers from './pages/OurGroomers';
import Training from './pages/Training';
import LocationPopup from "./pages/LocationPopup";
import ServicePackages from "./pages/ServicePackage";

function App() {
  const [showPopup, setShowPopup] = useState(true);

  const handlePopupChoice = (choice) => {
    setShowPopup(false);
    localStorage.setItem('locationAccess', choice);
  };

  return (
    <Router>
      <div>
        <Header />
        {showPopup && <LocationPopup onChoice={handlePopupChoice} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/grooming" element={<Grooming />} />
          <Route path="/daycamp" element={<DayCamp />} />
          <Route path="/ourgroomers" element={<OurGroomers />} />
          <Route path="/training" element={<Training />} />
          <Route path="/service-packages" element={<ServicePackages />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
