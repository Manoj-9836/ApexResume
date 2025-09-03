import React from 'react';

const PersonalDetailPreview = ({ resumeInfo }) => {
    return (
        <div>
            {/* Name Section */}
            <h2 className="fw-bold text-center display-7"
                style={{ color: resumeInfo?.themeColor }}
            >
                {resumeInfo?.firstName} {resumeInfo?.lastName}
            </h2>

            {/* Job Title Section */}
            <h2 className="text-center fs-6  fw-normal">{resumeInfo?.jobTitle}</h2>

            {/* Address Section */}
            <h2 className="text-center fs-6"
                style={{ color: resumeInfo?.themeColor }}
            >
                {resumeInfo?.address}
            </h2>

            {/* Phone Number and Email Section */}
            <div className="d-flex justify-content-between mt-3">
                <h6 className="fw-normal fs-6" style={{ color: resumeInfo?.themeColor }}>
                    (+91){resumeInfo?.phone}
                </h6>

                <a
                    href={resumeInfo?.linkedIn}
                    className="fw-normal fs-6 text-decoration-none"
                    style={{ color: resumeInfo?.themeColor }}
                    target="_blank"
                    rel="noreferrer"
                >
                   <i class="bi bi-linkedin"></i> LinkedIn
                </a>

                <a
                    href={resumeInfo?.gitHub}
                    className="fw-normal fs-6 text-decoration-none"
                    style={{ color: resumeInfo?.themeColor }}
                    target="_blank"
                    rel="noreferrer"
                >
                   <i class="bi bi-github"></i> GitHub
                </a>


                <h6 className="fw-normal fs-6" style={{ color: resumeInfo?.themeColor }}>
                    {resumeInfo?.email}
                </h6>
            </div>
            <hr className='my-2' style={{ borderTop: `5px solid ${resumeInfo?.themeColor}` }} />
        </div>
    );
};

export default PersonalDetailPreview;
