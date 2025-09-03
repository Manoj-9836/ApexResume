import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [sticky, setSticky] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (location.pathname !== '/') {
                setSticky(true);
            } else {
                setSticky(window.scrollY > 45);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    const toggleNavbar = () => {
        setIsNavbarOpen((prev) => !prev);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return (
        <div className="container-xxl position-relative p-0" id="no-print">
            <nav className={`navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0 ${sticky ? 'sticky-top shadow-sm' : ''}`}>
                <Link to="/" className="navbar-brand p-0">
                    <h1 className="m-0 nav-brand">ApexResume</h1>
                </Link>
                <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
                    {isNavbarOpen ? <span className="fa fa-times"></span> : <span className="fa fa-bars"></span>}
                </button>
                <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarCollapse">
                    <div className="navbar-nav mx-auto py-0">
                        <Link to="/" className={`nav-item nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
                        <a href="#OurTeam" className="nav-item nav-link">About</a>
                        <div className={`nav-item dropdown ${isDropdownOpen ? 'show' : ''}`}>
                            <a href="#" className="nav-link dropdown-toggle" onClick={toggleDropdown}>Resume</a>
                            <div className={`dropdown-menu m-0 ${isDropdownOpen ? 'show' : ''}`} style={{ border: 'none' }}>
                                <Link to="/create-resume" className={`dropdown-item ${location.pathname === '/create-resume' ? 'active' : ''}`}>Create Resume</Link>
                                <Link to="/upload-resume" className={`dropdown-item ${location.pathname === '/upload-resume' ? 'active' : ''}`} style={{ borderTop: '1px solid #ccc' }}>Upload Resume</Link>
                            </div>
                        </div>
                        <Link to="/contact" className={`nav-item nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
                    </div>
                    <Link
                        to="/create-resume"
                        className={`btn rounded-pill py-2 px-4 ms-3 d-none d-lg-block ${location.pathname === '/create-resume' ? 'invisible' : '' || location.pathname === '/upload-resume' ? 'invisible' : ''}`}
                    >
                        Get Started
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
