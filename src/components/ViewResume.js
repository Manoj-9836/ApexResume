import React from 'react';
import { RWebShare } from 'react-web-share';
import { useNavigate } from 'react-router-dom';

const ViewResume = () => {
    const navigate = useNavigate();

    const handleDownload = () => {
        window.postMessage("print-resume", "*");
        // navigate('/Payment');
    };

    return (
        <>
            <div id="no-print">
                <div className="my-5 mx-4 mx-md-5 mx-lg-6">
                    <h2 className="text-center fw-semibold fs-4">
                        Congrats! <br /> Your Ultimate AI-generated Resume is Ready!
                    </h2>
                    <p className="text-center text-secondary">
                        Now you are ready to download your resume and can share a unique resume URL with your friends and family.
                    </p>

                    <div className="d-flex justify-content-between gap-3 my-4">
                        <button className="btn send-message flex-grow-1 py-3" onClick={handleDownload}>
                            Download
                        </button>

                        <RWebShare
                            data={{
                                text: "Hello Everyone! This is my resume.",
                                url: "http://localhost:3000/create-resume",
                                title: "ApexResume",
                            }}
                            onClick={() => console.log("shared successfully!")}
                        >
                            <button className="btn send-message flex-grow-1 py-3" type="submit">
                                Share
                            </button>
                        </RWebShare>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ViewResume;
