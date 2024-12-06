import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './ Routes';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
      <div className="d-flex flex-column min-vh-100">
      {/* <div className="container flex-grow-1 mt-5"> */}
        <Header />
        <main className="container mt-3">
          <Routes />
        </main>
        {/* </div> */}
        <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
