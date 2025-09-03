import React, { useContext } from 'react';
import { ResumeInfoContext } from '../../../../../context/ResumeInfoContext';
import './TemplateTwo.css';

const TemplateTwo = (showCategory = true) => {
    const { resumeInfo } = useContext(ResumeInfoContext);

    const skillCategories = resumeInfo?.skills || {};
    const themeColor = resumeInfo?.themeColor || '#000';

    const filteredCategories = Object.entries(skillCategories).filter(
        ([_, skills]) => skills && skills.length > 0
    );

    return (
        <div className="resume p-4"
            style={{ borderTop: `5px solid #faa91e` }}
            id="print-area">
            <div className="top">
                <div className="container_top">
                    <h3 className="title">{resumeInfo?.firstName} {resumeInfo?.lastName}</h3>
                    <h6 className="sub_title">{resumeInfo?.jobTitle}</h6>
                </div>
            </div>

            <div className="bottom">
                <div className="container_bottom">
                    <div className="left">
                        <h3>PROFILE</h3>
                        <div className="left_content">
                            <div className="mark">
                                <div className="line" />
                                <div className="line" />
                                <div className="line" />
                            </div>
                            <div className="text">{resumeInfo?.summery
                                ?.split('. ')
                                .filter(sentence => sentence.trim() !== '')
                                .map((sentence, i) => (
                                    <ul>
                                        <div key={i}><li> {sentence.trim()}{sentence.endsWith('.') ? '' : '.'}</li></div>
                                    </ul>
                                ))}</div>
                        </div>

                        <div className="left_content contact">
                            <div className="icons">
                                <i className="fa fa-phone" />
                                <i className="fa fa-envelope" />
                                <i class="bi bi-linkedin"></i>
                                <i class="bi bi-github"></i>
                            </div>
                            <div className="inform">
                                <h6 className="info_title">PHONE</h6>
                                <div className="info_text">(+91){resumeInfo?.phone}</div>
                                <h6 className="info_title">EMAIL</h6>
                                <div className="info_text">{resumeInfo?.email}</div>
                                <h6 className="info_title">LINKEDIN</h6>
                                <div className="info_text">{resumeInfo?.linkedIn}</div>
                                <h6 className="info_title">GITHUB</h6>
                                <div className="info_text">{resumeInfo?.gitHub}</div>
                            </div>
                        </div>

                        
                    </div>

                    <div className="right">
                        <div className="main_title">
                            <div className="mark">
                                <div className="line" />
                                <div className="line" />
                                <div className="line" />
                            </div>
                            <h3>WORK EXPERIENCE</h3>
                        </div>
                        <div className="right_content">
                            {resumeInfo?.experience.map((experience, index) => (
                                <div key={index} className='my-5'>
                                    <h2 className='fs-6 fw-normal d-flex justify-content-between'>
                                        {experience?.companyName}, {experience?.city}, {experience?.state}
                                        <span>{experience?.startDate} TO {experience?.currentlyWorking ? 'Present' : experience?.endDate}</span>
                                    </h2>
                                    <h2 className='fs-5 fw-bold' style={{ color: "#faa91e" }}>{experience?.title}</h2>

                                    <ul className="fs-6 my-2">
                                        {experience?.workSummery
                                            ?.split('. ')
                                            .filter(sentence => sentence.trim() !== '')
                                            .map((sentence, i) => (
                                                <li key={i}>
                                                    {sentence.trim()}{sentence.endsWith('.') ? '' : '.'}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="main_title">
                            <div className="mark">
                                <div className="line" />
                                <div className="line" />
                                <div className="line" />
                            </div>
                            <h3>EDUCATION</h3>
                        </div>
                        <div className="right_content edu">
                            {resumeInfo?.education.map((education, index) => (
                                <div key={index} className='my-5'>
                                    <h2 className='fs-6 fw-normal d-flex justify-content-between'>
                                        {education?.degree} in {education?.major}
                                        <span>{education?.startDate} - {education?.endDate}</span>
                                    </h2>
                                    <h2 className='fs-5 fw-bold' style={{ color: "#faa91e" }}>{education?.universityName}</h2>

                                    <ul className='fs-6 my-2'>
                                        {education?.description
                                            ?.split('. ')
                                            .filter(sentence => sentence.trim() !== '')
                                            .map((sentence, i) => (
                                                <li key={i}>
                                                    {sentence.trim()}{sentence.endsWith('.') ? '' : '.'}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="main_title">
                            <div className="mark">
                                <div className="line" />
                                <div className="line" />
                                <div className="line" />
                            </div>
                            <h3>SKILLS</h3>
                        </div>
                        <div className="right_content skills">
                            {filteredCategories.map(([category, skills]) => (
                                <div key={category} className="d-flex">
                                    {showCategory && (
                                        <div className='fw-bold text-capitalize me-2' style={{ width: '150px', color: themeColor }}>
                                            {category.replace(/([A-Z])/g, ' $1')}:
                                        </div>
                                    )}
                                    <div className="flex-grow-1">
                                        {skills.map((skill, idx) => (
                                            <span key={idx} style={{ color: themeColor }}>
                                                {skill.name}
                                                {idx !== skills.length - 1 && ', '}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateTwo;
