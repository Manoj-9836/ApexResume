import React, { useEffect, useRef } from "react";
import { WOW } from "wowjs";
import aboutImage from '../img/about.png';

const About = () => {

    const skillsRef = useRef([]);

    useEffect(() => {
        new WOW().init();
    
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector(".progress-bar");
                    if (progressBar) {
                        progressBar.style.width = progressBar.getAttribute("aria-valuenow") + "%";
                    }
                }
            });
        }, { threshold: 0.8 });
    
        // Add delay to ensure refs are populated
        setTimeout(() => {
            skillsRef.current.forEach((skill) => {
                if (skill) observer.observe(skill);
            });
        }, 100); // 100ms delay
    
        return () => observer.disconnect();
    }, []);
    

    return (
        <>
            {/* <!-- About Start --> */}
            <div className="container-xxl py-5" id="aboutContainer">
                <div className="container py-5 px-lg-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6">
                            <p className="section-title text-secondary">About Us<span></span></p>
                            <h1 className="mb-5">#1 Resume Builder with AI Expertise</h1>
                            <p className="mb-4">
                                We help job seekers craft professional, ATS-optimized resumes that stand out. With a decade of experience, our platform ensures your resume meets industry standards, passes applicant tracking systems, and increases your chances of landing your dream job.
                            </p>

                            {[
                                { title: "Keyword Optimization", value: 85, color: "bg-primary" },
                                { title: "Resume Templates", value: 90, color: "bg-secondary" },
                                { title: "Cover Letter Builder", value: 95, color: "bg-dark" }
                            ].map((skill, index) => (
                                <div className="skill mb-4" key={index} ref={(el) => (skillsRef.current[index] = el)}>
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">{skill.title}</p> - 
                                        <p className="mb-2">{skill.value}%</p>
                                    </div>
                                    <div className="progress">
                                        <div
                                            className={`progress-bar ${skill.color}`}
                                            role="progressbar"
                                            aria-valuenow={skill.value}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            style={{ width: "0%" }}
                                        ></div>
                                    </div>
                                </div>
                            ))}

                            <a href="/create-resume" className="btn py-sm-3 px-sm-5 rounded-pill mt-3 read-more">Get Started</a>
                        </div>
                        <div className="col-lg-6">
                            <img className="img-fluid" src={aboutImage} alt="About Us" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- About End --> */}
        </>
    )
}

export default About