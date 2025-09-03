import React, { useContext, useEffect, useState } from 'react';
import ToastNotification from '../../ToastNotification';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';

const Education = ({ enableNext }) => {
    const [showToast, setShowToast] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    const [EducationDetails, setEducationDetails] = useState([
        {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            currentlyWorking: false,
            description: ''
        }
    ]);

    const handleChange = (index, event) => {
        const newEntries = [...EducationDetails];
        const { name, value, type, checked } = event.target;

        if (type === "checkbox") {
            newEntries[index]["currentlyWorking"] = checked;
            if (checked) {
                newEntries[index]["endDate"] = "Present";
            } else {
                newEntries[index]["endDate"] = "";
            }
        } else {
            newEntries[index][name] = value;
        }

        setEducationDetails(newEntries);
    };

    const AddNewEducation = () => {
        setEducationDetails([...EducationDetails, {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            currentlyWorking: false,
            description: ''
        }]);
    };

    const RemoveEducation = () => {
        setEducationDetails(EducationDetails.slice(0, -1));
    };

    const onSave = () => {
        setShowToast(true);
        enableNext(true);

        setTimeout(() => {
            setShowToast(false);
        }, 2000);
    };

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            education: EducationDetails
        })
    }, [EducationDetails]);

    return (
        <div>
            <div className="p-4 shadow-lg rounded mt-4" style={{ borderTop: '5px solid #6222CC' }}>
                <h2 className="fw-bold fs-4">Education</h2>
                <p>Add Your Educational Details here</p>

                <div>
                    {EducationDetails.map((item, index) => (
                        <div key={index} className='row g-3 border p-3 my-4 rounded'>
                            <div className="col-md-12">
                                <div className="input-container">
                                    <input type="text" name="universityName" required value={item.universityName} onChange={(e) => handleChange(index, e)} />
                                    <label htmlFor="universityName" className="label">University Name</label>
                                    <div className="underline"></div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="input-container">
                                    <input type="text" name="degree" required value={item.degree} onChange={(e) => handleChange(index, e)} />
                                    <label htmlFor="degree" className="label">Course</label>
                                    <div className="underline"></div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="input-container">
                                    <input type="text" name="major" required value={item.major} onChange={(e) => handleChange(index, e)} />
                                    <label htmlFor="major" className="label">Major</label>
                                    <div className="underline"></div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <label className='form-label'>Start Date</label>
                                <input name='startDate' type="date" className="form-control"
                                    value={item.startDate} onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div className='col-md-6'>
                                <label className='form-label'>End Date</label>
                                <input name='endDate' type="date" className="form-control"
                                    value={item.currentlyWorking ? "Present" : item.endDate}
                                    onChange={(e) => handleChange(index, e)}
                                    disabled={item.currentlyWorking}
                                />
                            </div>
                            <div className="col-md-12">
                                <input type="checkbox"
                                    className="form-check-input mx-2"
                                    id={`currentlyWorking-${index}`}
                                    checked={item.currentlyWorking}
                                    onChange={(e) => handleChange(index, e)}
                                />
                                <label htmlFor={`currentlyWorking-${index}`} className="form-check-label">
                                    Currently studying here
                                </label>
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>Description</label>
                                <textarea name="description" className="form-control" rows="4"
                                    value={item.description} onChange={(e) => handleChange(index, e)}></textarea>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-between">
                    <div className="d-flex gap-2">
                        <button className="btn ai-btn btn-sm" onClick={AddNewEducation}>+ Add More Education</button>
                        <button className="btn ai-btn btn-sm mx-3" onClick={RemoveEducation}>- Remove</button>
                    </div>
                    <button className="btn save-btn btn-sm" onClick={() => onSave()}>Save</button>
                    {showToast && (
                        <ToastNotification message="Educational Details Saved successfully!" onClose={() => setShowToast(false)} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Education;
