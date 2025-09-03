import React, { useContext, useEffect, useState } from 'react';
import ToastNotification from '../../ToastNotification';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
const { GoogleGenerativeAI } = require('@google/generative-ai');

const formFeild = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummery: '',
    currentlyWorking: false
};

const Experience = ({ enableNext }) => {
    const [showToast, setShowToast] = useState(false);
    const [showToast1, setShowToast1] = useState(false);
    const [experinceList, setExperinceList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [aiWorkSummaries, setAiWorkSummaries] = useState({});
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [disableExperience, setDisableExperience] = useState(false);

    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    useEffect(() => {
        if (resumeInfo?.experience?.length > 0) {
            setExperinceList(resumeInfo.experience);
            setDisableExperience(false);
        } else {
            setDisableExperience(true);
        }
    }, [resumeInfo?.experience]);

    const toggleDisableExperience = () => {
        setDisableExperience(!disableExperience);
        if (!disableExperience) {
            setExperinceList([]);
        }
    };

    const handleChange = (index, event) => {
        const newEntries = [...experinceList];
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
        setExperinceList(newEntries);
    };

    const AddNewExperience = () => {
        setExperinceList([...experinceList, { ...formFeild }]);
    };

    const RemoveExperience = () => {
        setExperinceList((experinceList) => experinceList.slice(0, -1));
    };

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experience: experinceList,
            disableExperience: disableExperience
        });
    }, [experinceList, disableExperience]);

    const onSave = () => {
        setShowToast1(true);
        enableNext(true);

        setTimeout(() => {
            setShowToast1(false);
        }, 2000);
    };

    // AI Work Summary Generation
    const generateWorkSummaryWithAI = async (index) => {
        const jobTitle = experinceList[index]?.title || 'Software Engineer';
        const companyName = experinceList[index]?.companyName || 'Company';
        const startDate = experinceList[index]?.startDate;
        const endDate = experinceList[index]?.endDate;

        setLoading(true);
        try {
            const chatSession = model.startChat({ history: [] });
            const result = await chatSession.sendMessage(
                `Generate a professional work summary in 2–3 lines for the position "${jobTitle}" at "${companyName}" for the period from ${startDate} to ${endDate}.  

Guidelines:  
- Use a third-person, formal tone (avoid first-person language).  
- Ensure the text is optimized for ATS systems.  
- Incorporate highly relevant keywords for the given job title.  
- Highlight specific technical contributions, quantifiable results, and measurable impact (e.g., “Reduced load time by 20% using optimized React components”).  
- Mention tools, frameworks, or methodologies applied (e.g., Agile, REST APIs, Docker).  
- Emphasize crucial and role-relevant skills.  
- Keep the output concise, clear, and strictly limited to 2–3 lines.  
- Do not use markdown, bullet points, or special characters.  
Ensure the summary is unique and not generic or repetitive.`
            );
            const responseText = result?.response?.text();

            if (responseText) {
                setAiWorkSummaries((prev) => ({ ...prev, [index]: responseText }));
            }
        } catch (error) {
            console.error('Error generating work summary:', error);
            alert('Error generating work summary. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text).then(() => {
            const updatedSummaries = { ...aiWorkSummaries };
            delete updatedSummaries[index];
            setAiWorkSummaries(updatedSummaries);
            setShowToast(true);

            setTimeout(() => {
                setShowToast(false);
            }, 2000);
        });
    };

    return (
        <div>
            <div className="p-4 shadow-lg rounded mt-4" style={{ borderTop: '5px solid #6222CC' }}>
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="fw-bold fs-4">Professional Experience</h2>
                    <div className="toggle-button-cover form-check form-switch">
                        <div id="button-3" className="button r">
                            <input
                                type="checkbox"
                                className="checkbox"
                                id="disableExperience"
                                checked={disableExperience}
                                onChange={toggleDisableExperience} />
                            <div className="knobs"></div>
                            <div className="layer"></div>
                        </div>
                    </div>
                </div>
                <p>Add Your previous Job experience</p>

                {showToast && (
                    <ToastNotification message="Copied successfully!" onClose={() => setShowToast(false)} />
                )}
                {!disableExperience && (
                    <div>
                        {experinceList.map((item, index) => (
                            <div key={index}>
                                <div className="row g-3 border p-3 my-4 rounded">
                                    <div className="col-md-6">
                                        <div className="input-container">
                                            <input type="text" name="title" required onChange={(event) => handleChange(index, event)} defaultValue={item?.title}/>
                                            <label htmlFor="title" className="label">Position Title</label>
                                            <div className="underline"></div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-container">
                                            <input type="text" name="companyName" required onChange={(event) => handleChange(index, event)} defaultValue={item?.companyName}/>
                                            <label htmlFor="companyName" className="label">Company Name</label>
                                            <div className="underline"></div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-container">
                                            <input type="text" name="city" required onChange={(event) => handleChange(index, event)} defaultValue={item?.city} />
                                            <label htmlFor="city" className="label">City</label>
                                            <div className="underline"></div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-container">
                                            <input type="text" name="state" required onChange={(event) => handleChange(index, event)} defaultValue={item?.state} />
                                            <label htmlFor="state" className="label">State</label>
                                            <div className="underline"></div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Start Date</label>
                                        <input type="date" name="startDate" className="form-control" onChange={(event) => handleChange(index, event)} defaultValue={item?.startDate} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">End Date</label>
                                        <input type="date" name="endDate" className="form-control" disabled={item.currentlyWorking} onChange={(event) => handleChange(index, event)} defaultValue={item?.endDate} />
                                    </div>
                                    <div className="col-md-12">
                                        <input type="checkbox"
                                            className="form-check-input mx-2"
                                            id={`currentlyWorking-${index}`}
                                            checked={item.currentlyWorking}
                                            onChange={(e) => handleChange(index, e)}
                                        />
                                        <label htmlFor={`currentlyWorking-${index}`} className="form-check-label">
                                            Currently Working here
                                        </label>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label className="form-label">Work Summary</label>
                                            <button
                                                className="btn ai-btn btn-sm d-flex align-items-center gap-1 my-2"
                                                onClick={() => generateWorkSummaryWithAI(index)}
                                                disabled={loading}
                                            >
                                                {loading ? 'Generating...' : <><i className="bi bi-robot fs-6"></i> Generate with AI</>}
                                            </button>
                                        </div>
                                        <textarea
                                            name="workSummery"
                                            className="form-control"
                                            rows="4"
                                            onChange={(event) => handleChange(index, event)}
                                            defaultValue={item?.workSummery}
                                        ></textarea>
                                        {aiWorkSummaries[index] && (
                                            <div className="mt-2 p-3 border rounded bg-light">
                                                <p>{aiWorkSummaries[index]}</p>
                                                <button
                                                    className="btn copy-btn btn-sm"
                                                    onClick={() => handleCopy(aiWorkSummaries[index], index)}
                                                >
                                                    Copy to Clipboard
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="d-flex justify-content-between">
                    <div className="d-flex gap-2">
                        <button className="btn ai-btn btn-sm" onClick={AddNewExperience}>+ Add More Experience</button>
                        <button className="btn ai-btn btn-sm mx-3" onClick={RemoveExperience}>- Remove</button>
                    </div>
                    <button className="btn save-btn btn-sm" onClick={() => onSave()}>Save</button>
                    {showToast1 && (
                        <ToastNotification message="Work Experience Saved successfully!" onClose={() => setShowToast1(false)} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Experience;
