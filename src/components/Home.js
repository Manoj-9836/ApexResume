import React, { useEffect, useState } from "react";
import { WOW } from "wowjs";
import Footer from "./Footer";
import Hero from './Hero';
import Spinner from "./Spinner";
import Akhil from "../img/Team/Akhil.jpeg"
import Manoj from "../img/Team/Manoj.png"
import Sathwik from "../img/Team/Sathwik.jpeg"
import Vivek from "../img/Team/Vivek.jpeg"
import Bhuvana from "../img/Team/Bhuvana.jpeg"
import Pavithra from "../img/Team/Pavithra.jpeg"
import Devi from "../img/Team/Devi prasad.jpeg"

const Home = () => {

    const testimonials = [
        { name: 'B. Akhil', profession: 'Java Developer', image: 'https://github.com/Manoj-9836/images/blob/main/da7ed7b0-5f66-4f97-a610-51100d3b9fd2.jpg?raw=true', review: 'I struggled with resume formatting, but this site solved it in minutes. Amazing experience!' },
        { name: 'B. Devi Prasad', profession: 'Developer', image: 'https://github.com/Manoj-9836/images/blob/main/da7ed7b0-5f66-4f97-a610-51100d3b9fd2.jpg?raw=true', review: 'Amazing experience!' },
        { name: 'Ch. Satwik', profession: 'Programmer', image: 'https://github.com/Manoj-9836/images/blob/main/da7ed7b0-5f66-4f97-a610-51100d3b9fd2.jpg?raw=true', review: 'User-friendly and efficient! My resume got noticed by top recruiters. Highly recommend!.' },
        { name: 'D. Vivek', profession: 'Research Engineer', image: 'https://github.com/Manoj-9836/images/blob/main/da7ed7b0-5f66-4f97-a610-51100d3b9fd2.jpg?raw=true', review: 'The tips and templates made my job application stand out. A game-changer for job seekers!.' },
    ];


    useEffect(() => {
        new WOW().init();

        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        };
        loadScript('lib/owlcarousel/owl.carousel.min.js').then(() => {
            window.$('.testimonial-carousel').owlCarousel({
                loop: true,
                margin: 30,
                nav: true,
                navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>'],
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                smartSpeed: 1000,
                responsive: {
                    0: { items: 1 },
                    600: { items: 1 },
                    1000: { items: 2 }
                }
            });
        });
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Spinner />
            {/* <!-- Hero Start --> */}
            <Hero />
            {/* <!-- Hero End --> */}
            <div className="container-xxl py-5" id="keywords">
                <div className="container py-5 px-lg-5">
                    <div className="row g-4">
                        <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="feature-item bg-light rounded text-center p-4">
                                <i className="fa fa-3x fa-mail-bulk  mb-4"></i>
                                <h5 className="mb-3">Keyword Optimization</h5>
                                <p className="m-0">Our AI-powered tool ensures your resume includes industry-relevant keywords to improve visibility and pass applicant tracking systems.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="feature-item bg-light rounded text-center p-4">
                                <i className="fa fa-3x fa-search mb-4"></i>
                                <h5 className="mb-3">Resume Templates</h5>
                                <p className="m-0">Choose from a variety of ATS-friendly resume templates designed to highlight your skills and experience in a professional format.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="feature-item bg-light rounded text-center p-4">
                                <i className="fa fa-3x fa-laptop-code mb-4"></i>
                                <h5 className="mb-3">AI Resume Builder</h5>
                                <p className="m-0">Enhance your job application with a personalized  resume and boost your chances of getting hired.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Service Start --> */}
            <div className="container-xxl py-5">
                <div className="container py-5 px-lg-5">
                    <div className="wow fadeInUp" data-wow-delay="0.1s">
                        <p className="section-title text-secondary justify-content-center"><span></span>Our Services<span></span></p>
                        <h1 className="text-center mb-5">What Solutions We Provide</h1>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="service-item d-flex flex-column text-center rounded">
                                <div className="service-icon flex-shrink-0">
                                    <i className="fa fa-search fa-2x"></i>
                                </div>
                                <h5 className="mb-3">ATS-Optimized Resume Building</h5>
                                <p className="m-0">Create a professional resume designed to pass through ATS filters, ensuring your application reaches recruiters.</p>
                                <a className="btn btn-square" href="/create-resume"><i className="fa fa-arrow-right"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="service-item d-flex flex-column text-center rounded">
                                <div className="service-icon flex-shrink-0">
                                    <i className="fa fa-laptop-code fa-2x"></i>
                                </div>
                                <h5 className="mb-3">Personalized Resume Templates</h5>
                                <p className="m-0">Choose from a variety of modern, industry-specific templates that highlight your skills and experience.</p>
                                <a className="btn btn-square" href="/create-resume"><i className="fa fa-arrow-right"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-item d-flex flex-column text-center rounded">
                                <div className="service-icon flex-shrink-0">
                                    <i className="fa-regular fa-file-word keyword"></i>
                                </div>
                                <h5 className="mb-3">Keyword Optimization</h5>
                                <p className="m-0">Enhance your resume with relevant keywords tailored to your target job, increasing your chances of getting noticed.</p>
                                <a className="btn btn-square" href="/create-resume"><i className="fa fa-arrow-right"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="service-item d-flex flex-column text-center rounded">
                                <div className="service-icon flex-shrink-0">
                                    <i className="fa fa-mail-bulk fa-2x"></i>
                                </div>
                                <h5 className="mb-3">Cover Letter Builder</h5>
                                <p className="m-0">Craft a compelling cover letter that complements your resume and showcases your motivation and qualifications.</p>
                                <a className="btn btn-square" href="/create-resume"><i className="fa fa-arrow-right"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="service-item d-flex flex-column text-center rounded">
                                <div className="service-icon flex-shrink-0">
                                    <i className="fa fa-thumbs-up fa-2x"></i>
                                </div>
                                <h5 className="mb-3">Job-Specific Suggestions</h5>
                                <p className="m-0">Receive personalized content recommendations and actionable tips to make your resume stand out.</p>
                                <a className="btn btn-square" href="/"><i className="fa fa-arrow-right"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-item d-flex flex-column text-center rounded">
                                <div className="service-icon flex-shrink-0">
                                    <i className="fab fa-android fa-2x"></i>
                                </div>
                                <h5 className="mb-3">Progress Tracking</h5>
                                <p className="m-0">Monitor your resume's effectiveness and make necessary adjustments to maximize your application success.</p>
                                <a className="btn btn-square" href="/"><i className="fa fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Service End --> */}

            {/* <!-- Our Team Start --> */}
            <section id="OurTeam">
                <div className="wow fadeInUp" data-wow-delay="0.1s">
                    <p className="section-title text-secondary justify-content-center"><span></span>Team<span></span></p>
                    <h1 className="text-center mb-5">Our Team Members</h1>
                </div>
                <div className="container">
                    <div className="box wow fadeInUp" data-wow-delay="0.1s">
                        <div className="top-bar"></div>

                        <div className="content">
                            <img src={Akhil} alt="akhil" />
                            <strong>AKHIL</strong>
                            <p>Team Leader</p>
                            <p>akhilbayya111@gmail.com</p>
                        </div>
                        <div className="our-btn">
                            <a href="#" target="_blank"><i className="bi bi-github"></i>Github</a>
                            <a href="#" target="_blank"><i className="bi bi-linkedin"></i>Linkedin</a>
                        </div>
                    </div>
                    <div className="box wow fadeInUp" data-wow-delay="0.2s">
                        <div className="top-bar"></div>

                        <div className="content">
                            <img src={Manoj} alt="manoj" />
                            <strong>MANOJ KUMAR</strong>
                            <p>Coder</p>
                            <p>manojbavisetti75@gmail.com</p>
                        </div>
                        <div className="our-btn">
                            <a href="https://github.com/Manoj-9836" target="_blank"><i className="bi bi-github"></i>Github</a>
                            <a href="https://www.linkedin.com/in/mkmanoj-dev?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank"><i className="bi bi-linkedin"></i>Linkedin</a>
                        </div>
                    </div>
                    <div className="box wow fadeInUp" data-wow-delay="0.3s">
                        <div className="top-bar"></div>

                        <div className="content">
                            <img src={Sathwik} alt="sathwik" />
                            <strong>MOHAN SATHWIK</strong>
                            <p>Criticizer</p>
                            <p>sarhvik0110@gmail.com</p>
                        </div>
                        <div className="our-btn">
                            <a href="https://github.com/LemonHorse88" target="_blank"><i className="bi bi-github"></i>Github</a>
                            <a href="https://www.linkedin.com/in/mohan-sathvik-chokkapu-7373092a3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank"><i className="bi bi-linkedin"></i>Linkedin</a>
                        </div>
                    </div>
                    <div className="box wow fadeInUp" data-wow-delay="0.4s">
                        <div className="top-bar"></div>

                        <div className="content">
                            <img src={Bhuvana} alt="BHUVANA SAI" />
                            <strong>BHUVANA SAI</strong>
                            <p>Coder</p>
                            <p>bhuvanasaichappa22@gmail.com</p>
                        </div>
                        <div className="our-btn">
                            <a href="https://github.com/Bhuvanasai22" target="_blank"><i className="bi bi-github"></i>Github</a>
                            <a href="https://www.linkedin.com/in/bhuvana-sai-chappa-9256882a9/?originalSubdomain=in" target="_blank"><i className="bi bi-linkedin"></i>Linkedin</a>
                        </div>
                    </div>
                    <div className="box wow fadeInUp" data-wow-delay="0.5s">
                        <div className="top-bar"></div>

                        <div className="content">
                            <img src={Pavithra} alt="PAVITHRA" />
                            <strong>PAVITHRA</strong>
                            <p>Academician</p>
                            <p>pavithrachandaka2006@gmail.com</p>
                        </div>
                        <div className="our-btn">
                            <a href="https://github.com/pavithrachandaka" target="_blank"><i className="bi bi-github"></i>Github</a>
                            <a href="https://www.linkedin.com/in/pavithra-chandaka-5123602a4/?originalSubdomain=in" target="_blank"><i className="bi bi-linkedin"></i>Linkedin</a>
                        </div>
                    </div>
                    <div className="box wow fadeInUp" data-wow-delay="0.6s">
                        <div className="top-bar"></div>

                        <div className="content">
                            <img src={Vivek} alt="VIVEK" />
                            <strong>VIVEK</strong>
                            <p>Observer</p>
                            <p>venkatavivek4u@gmail.com</p>
                        </div>
                        <div className="our-btn">
                            <a href="#" target="_blank"><i className="bi bi-github"></i>Github</a>
                            <a href="#" target="_blank"><i className="bi bi-linkedin"></i>Linkedin</a>
                        </div>
                    </div>
                    <div className="box wow fadeInUp" data-wow-delay="0.7s">
                        <div className="top-bar"></div>

                        <div className="content">
                            <img src={Devi} alt="DEVI PRASAD" />
                            <strong>DEVI PRASAD</strong>
                            <p>Observer</p>
                            <p>deviprasad@gmail.com</p>
                        </div>
                        <div className="our-btn">
                            <a href="#" target="_blank"><i className="bi bi-github"></i>Github</a>
                            <a href="#" target="_blank"><i className="bi bi-linkedin"></i>Linkedin</a>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Our Team End --> */}


            {/* <!-- Testimonial Start --> */}
            <div className="container-xxl py-5">
                <div className="container py-5 px-lg-5">
                    <div className="wow fadeInUp" data-wow-delay="0.1s">
                        <p className="section-title text-secondary justify-content-center"><span></span>Testimonials<span></span></p>
                        <h1 className="text-center mb-5">What Our Clients Say!</h1>
                    </div>
                    <div className="owl-carousel testimonial-carousel">
                        {testimonials.map((item, index) => (
                            <div className="testimonial-item bg-light rounded my-4" key={index}>
                                <p className="fs-5"><i className="fa fa-quote-left fa-4x mt-n4 me-3 quites"></i>{item.review}</p>
                                <div className="d-flex align-items-center">
                                    <img className="img-fluid flex-shrink-0 rounded-circle" src={item.image} style={{ width: '65px', height: '65px' }} alt={item.name} />
                                    <div className="ps-4">
                                        <h5 className="mb-1">{item.name}</h5>
                                        <span>{item.profession}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <!-- Testimonial End --> */}

            {/* <!-- Footer Starts --> */}
            <Footer />
            {/* <!-- Footer End --> */}

        </>
    )
}

export default Home