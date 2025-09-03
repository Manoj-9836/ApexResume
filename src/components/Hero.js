import React from 'react';
import heroImage from '../img/hero.png';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <>
            <div className="container-xxl hero-header">
                <div className="container px-lg-5">
                    <div className="row g-5 align-items-end">
                        <div className="col-lg-6 text-center text-lg-start hero-text">
                            <h1 className="text-white mb-4 animated slideInDown">Your Smart Resume Builder for Career Success</h1>
                            <p className="text-white pb-3 fs-5 animated slideInDown">Looking to create a resume that stands out?<br /> Our AI-powered, ATS-friendly resume builder helps you craft professional resumes that pass applicant tracking systems and impress recruiters.</p>
                            <a href="#keywords" className="btn btn-secondary read-more py-sm-3 px-sm-5 rounded-pill me-3 animated slideInLeft">Read More</a>
                            <Link to="/contact" className="btn btn-light py-sm-3 px-sm-5 rounded-pill animated slideInRight">Contact Us</Link>
                        </div>
                        <div className="col-lg-6 text-center text-lg-start">
                            <img className="img-fluid animated zoomIn" src={heroImage} alt="Hero" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero