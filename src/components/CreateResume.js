import React, { useEffect, useState, useRef } from "react";
import FormSection from "./resumeComponents/FormSection";
import ResumePreview from "./resumeComponents/ResumePreview";
import Spinner from "./Spinner";
import { ResumeInfoContext } from "../context/ResumeInfoContext";
import { useTemplate } from "../context/TemplateContext";
import dummy from "../data/dummy";

const CreateResume = () => {
    const [resumeInfo, setResumeInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const resumeRef = useRef();
    const { selectedTemplate } = useTemplate();

    useEffect(() => {
        setTimeout(() => {
            setResumeInfo(dummy);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        const handlePrintRequest = (event) => {
            if (event.data === "print-resume") {
                handlePrint();
            }
        };
        window.addEventListener("message", handlePrintRequest);

        return () => {
            window.removeEventListener("message", handlePrintRequest);
        };
    }, []);

    const handlePrint = () => {
        const printContent = resumeRef.current.innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload();
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            {/* <div className="container-xxl position-relative p-0" id="no-print">
                <div className="container-xxl py-5 hero-header">
                    <div className="container my-5 py-5 px-lg-5">
                        <div className="row g-5 py-5">
                            <div className="col-12 text-center">
                                <h1 className="text-white animated slideInDown">Create Your Resume</h1>
                                <hr className="bg-white mx-auto mt-0" style={{ width: "90px" }} />
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-center">
                                        <li className="breadcrumb-item">
                                            <a className="text-white contct-links" href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item text-white active" aria-current="page">
                                            Create-Resume
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="py-5 px-lg-5 my-5">
                <div className="wow fadeInUp" data-wow-delay="0.1s" id="no-print">
                    <p className="section-title text-secondary justify-content-center">
                        <span></span>Create Resume<span></span>
                    </p>
                    <h1 className="text-center mb-5">Create Your Resume</h1>
                </div>

                <div className="container row justify-content-center" id="no-print">
                    <div className="col-lg-8">
                        <div className="wow fadeInUp" data-wow-delay="0.3s">
                            <p className="text-center mb-4">
                                Ready to create a professional resume that stands out? Fill in your details using our simple form, and
                                watch your resume come to life in real-time on the preview panel. Customize sections, edit content, and
                                build a resume tailored to your career goals. Get started now and make a lasting impression!
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row mt-4 d-flex flex-column flex-lg-row px-3 px-md-5" id="print-wrapper">
                    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
                        {/* Form Section */}
                        <div className="col-lg-4 col-12 mb-4 mb-lg-0" id="no-print">
                            <FormSection />
                        </div>

                        {/* Preview Section */}
                        <div className="col-lg-8 col-12 border-start bg-light overflow-auto my-5 d-none d-lg-block" ref={resumeRef} id="resume-preview">
                            <ResumePreview template={selectedTemplate}/>
                        </div>
                    </ResumeInfoContext.Provider>
                </div>
            </div>
        </>
    );
};

export default CreateResume;
