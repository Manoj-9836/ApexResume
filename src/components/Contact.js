import React, { useEffect, useState } from 'react'
import Footer from "./Footer";
import { WOW } from "wowjs";
import Spinner from './Spinner';

const Contact = () => {

    useEffect(() => {
        new WOW().init();
        // eslint-disable-next-line
    }, []);

    const [formData, setFormData] = useState({
        Name: "",
        Email: "",
        Subject: "",
        Message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const scriptURL = "https://script.google.com/macros/s/AKfycbykVJYDnblLigmZ2VunDL3G0M9OAdpUbqba6RxZgQVhcDOPZ6_Tv66yWR7d_YQu31yr/exec"; 

        const formDataEncoded = new URLSearchParams(formData).toString();

        try {
            const response = await fetch(scriptURL, {
                method: "POST",
                body: formDataEncoded,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });

            const result = await response.json();

            if (result.result === "success") {
                alert("Message sent successfully!");
                setFormData({ Name: "", Email: "", Message: "" }); 
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to send message!");
        }
    };

    return (
        <>
        <Spinner />
            {/* <div className="container-xxl position-relative p-0">
                <div className="container-xxl py-5 hero-header">
                    <div className="container my-5 py-5 px-lg-5">
                        <div className="row g-5 py-5">
                            <div className="col-12 text-center">
                                <h1 className="text-white animated slideInDown">Contact</h1>
                                <hr className="bg-white mx-auto mt-0" style={{ width: "90px" }} />
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-center">
                                        <li className="breadcrumb-item"><a className="text-white contct-links" href="/">Home</a></li>
                                        <li className="breadcrumb-item text-white active" aria-current="page">Contact</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="container-xxl py-5">
                <div className="container py-5 px-lg-5">
                    <div className="wow fadeInUp" data-wow-delay="0.1s">
                        <p className="section-title text-secondary justify-content-center"><span></span>Contact Us<span></span></p>
                        <h1 className="text-center mb-5">Contact For Any Query</h1>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="wow fadeInUp" data-wow-delay="0.3s">
                                <p className="text-center mb-4">Subscribe to our newsletter for the latest tips on resume building, interview preparation, and job search strategies. Get expert advice straight to your inbox and boost your career growth.<br />Stay ahead of the competition — Join our community today!</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="name" placeholder="Your Name" autocomplete="off" required readOnly name="Name" value={formData.Name} onChange={handleChange} onFocus={(e) => e.target.removeAttribute('readonly')} />
                                                <label for="name">Your Name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="email" className="form-control" id="email" placeholder="Your Email" autocomplete="off" required readOnly name="Email" value={formData.Email} onChange={handleChange} onFocus={(e) => e.target.removeAttribute('readonly')} />
                                                <label for="email">Your Email</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="subject" placeholder="Subject" autocomplete="off" required readOnly name="Subject" value={formData.Subject} onChange={handleChange} onFocus={(e) => e.target.removeAttribute('readonly')} />
                                                <label for="subject">Subject</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea className="form-control" placeholder="Leave a message here" id="message" style={{ height: "150px" }} name="Message" value={formData.Message} onChange={handleChange} autocomplete="off" required ></textarea>
                                                <label for="message">Message</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn send-message w-100 py-3" type="submit">Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Footer Starts --> */}
            <Footer />
            {/* <!-- Footer End --> */}
        </>
    )
}


export default Contact