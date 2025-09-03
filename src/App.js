import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import Contact from './components/Contact';
import CreateResume from './components/CreateResume';
import './App.css';
import ViewResume from './components/ViewResume';
import UploadResume from './components/UploadResume';
import TemplateSelector from './components/resumeComponents/Templates/TemplateSelector';
import Payment from './components/Payment';

function App() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/create-resume" element={<CreateResume />} />
          <Route path="/upload-resume" element={<UploadResume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/view-resume" element={<ViewResume />} />
          <Route path="/templates" element={<TemplateSelector />} />
          <Route path="/Payment" element={<Payment />} />
        </Routes>
      </Router>
      {isVisible && (
        <button className="btn btn-lg btn-secondary btn-lg-square back-to-top" id="no-print" onClick={scrollToTop}>
          <i className="bi bi-arrow-up"></i>
        </button>
      )}
    </div>
  );
}

export default App;
