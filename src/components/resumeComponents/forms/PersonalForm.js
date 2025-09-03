import React, { useContext, useState } from 'react';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import ToastNotification from '../../ToastNotification';

const PersonalForm = ({ enableNext }) => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [showToast, setShowToast] = useState(false);

    const handleInputChange = (e) => {
        enableNext(false);
        const { name, value } = e.target;
        setResumeInfo({ ...resumeInfo, [name]: value });
    };

    const onSave = (e) => {
        e.preventDefault();
        enableNext(true);
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 2000);
    };

    return (
        <div className="p-4 shadow-lg rounded mt-4" style={{ borderTop: '5px solid #6222CC' }}>
            <h2 className="fw-bold fs-4">Personal Details</h2>
            <p>Get started with the basic information</p>

            {showToast && (
                <ToastNotification message="Personal details saved successfully!" type="success"
                onClose={() => setShowToast(false)} />
            )}

            <form onSubmit={onSave}>
                <div className="row mt-5 gy-3">
                    <div className="col-md-6">
                        <div className="input-container">
                            <input type="text" id="firstName" defaultValue={resumeInfo?.firstName} name="firstName" required onChange={handleInputChange} />
                            <label htmlFor="firstName" className="label">First Name</label>
                            <div className="underline"></div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input-container">
                            <input type="text" id="lastName" defaultValue={resumeInfo?.lastName} name="lastName" required onChange={handleInputChange} />
                            <label htmlFor="lastName" className="label">Last Name</label>
                            <div className="underline"></div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="input-container">
                            <input type="text" id="jobTitle" defaultValue={resumeInfo?.jobTitle} name="jobTitle" required onChange={handleInputChange} />
                            <label htmlFor="jobTitle" className="label">Job Title</label>
                            <div className="underline"></div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="input-container">
                            <input type="text" id="address" defaultValue={resumeInfo?.address} name="address" required onChange={handleInputChange} />
                            <label htmlFor="address" className="label">Address</label>
                            <div className="underline"></div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="input-container">
                            <input type="text" id="gitHub" defaultValue={resumeInfo?.gitHub} name="gitHub" onChange={handleInputChange} />
                            <label htmlFor="gitHub" className="label">GitHub URL</label>
                            <div className="underline"></div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="input-container">
                            <input type="text" id="linkedIn" defaultValue={resumeInfo?.linkedIn} name="linkedIn" onChange={handleInputChange} />
                            <label htmlFor="linkedIn" className="label">LinkedIn URL</label>
                            <div className="underline"></div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="input-container">
                            <input type="text" id="phone" defaultValue={resumeInfo?.phone} name="phone" required onChange={handleInputChange} />
                            <label htmlFor="phone" className="label">Phone Number</label>
                            <div className="underline"></div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input-container">
                            <input type="email" id="email" defaultValue={resumeInfo?.email} name="email" required onChange={handleInputChange} />
                            <label htmlFor="email" className="label">Email Address</label>
                            <div className="underline"></div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                    <button className="btn save-btn" type="submit">Save</button>
                </div>
            </form>

        </div>
    );
};

export default PersonalForm;
