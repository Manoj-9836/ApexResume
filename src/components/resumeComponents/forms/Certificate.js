import React, { useContext, useEffect, useState } from 'react';
import ToastNotification from '../../ToastNotification';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
const { GoogleGenerativeAI } = require('@google/generative-ai');

const Certificate = ({ enableNext }) => {
    const [showToast, setShowToast] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [certificatesList, setCertificatesList] = useState([
        {
            name: '',
            issuedBy: '',
            date: '',
            description: ''
        }
    ]);
    const [loading, setLoading] = useState(false);
    const [aiDescriptions, setAiDescriptions] = useState({});

    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const handleChange = (index, name, value) => {
        const newEntries = [...certificatesList];
        newEntries[index][name] = value;
        setCertificatesList(newEntries);
    };

    const addNewCertificate = () => {
        setCertificatesList([...certificatesList, {
            name: '',
            issuedBy: '',
            date: '',
            description: ''
        }]);
    };

    const removeCertificate = () => {
        setCertificatesList(certificatesList.slice(0, -1));
    };

    useEffect(() => {
        setResumeInfo(prev => ({
            ...prev,
            certificates: certificatesList
        }));
    }, [certificatesList]);

    const onSave = () => {
        setShowToast(true);
        enableNext(true);
        setTimeout(() => {
            setShowToast(false);
        }, 2000);
    };

    const generateDescriptionWithAI = async (index) => {
        const certName = certificatesList[index]?.name || 'Certification';
        const issuedBy = certificatesList[index]?.issuedBy || 'Organization';
        const date = certificatesList[index]?.date || 'recently';

        setLoading(true);
        try {
            const chatSession = model.startChat({ history: [] });
            const result = await chatSession.sendMessage(
                `Generate a brief and professional description for the certification "${certName}" issued by "${issuedBy}" on "${date}".  

Guidelines:  
- Use a third-person, formal tone.  
- Highlight the certification’s relevance, industry credibility, and career impact.  
- Keep the description concise (1–2 lines).  
- Avoid first-person language, markdown, bullet points, or special characters.  
- Ensure the text is optimized for ATS and resume screening systems.  `
            );
            const responseText = result?.response?.text();

            if (responseText) {
                setAiDescriptions(prev => ({ ...prev, [index]: responseText }));
            }
        } catch (error) {
            console.error('Error generating description:', error);
            alert('Error generating description. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text).then(() => {
            const updatedDescriptions = { ...aiDescriptions };
            delete updatedDescriptions[index];
            setAiDescriptions(updatedDescriptions);
            setShowToast(true);

            setTimeout(() => {
                setShowToast(false);
            }, 2000);
        });
    };

    return (
        <div>
            <div className="p-4 shadow-lg rounded mt-4" style={{ borderTop: '5px solid #6222CC' }}>
                <h2 className="fw-bold fs-4">Certificates</h2>
                <p>Add Your Certifications here</p>

                <div>
                    {certificatesList.map((item, index) => (
                        <div key={index} className='d-flex flex-column row g-3 border p-3 my-4 rounded'>
                            <div className="input-container">
                                <input type="text" name="name" required value={item.name}
                                    onChange={(e) => handleChange(index, 'name', e.target.value)} />
                                <label className="label">Certificate Name</label>
                                <div className="underline"></div>
                            </div>
                            <div className="input-container">
                                <input type="text" name="issuedBy" required value={item.issuedBy}
                                    onChange={(e) => handleChange(index, 'issuedBy', e.target.value)} />
                                <label className="label">Issued By</label>
                                <div className="underline"></div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Issue Date</label>
                                <input type="date" name="date" required value={item.date} className="form-control"
                                    onChange={(e) => handleChange(index, 'date', e.target.value)} />
                            </div>
                            <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label className="form-label">Certificate Description</label>
                                    <button className="btn ai-btn btn-sm d-flex align-items-center gap-1 my-2"
                                        onClick={() => generateDescriptionWithAI(index)}
                                        disabled={loading}>
                                        {loading ? 'Generating...' : <><i className="bi bi-robot fs-6"></i> Generate with AI</>}
                                    </button>
                                </div>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows="4"
                                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                                    value={item.description}
                                ></textarea>
                                {aiDescriptions[index] && (
                                    <div className="mt-2 p-3 border rounded bg-light">
                                        <p>{aiDescriptions[index]}</p>
                                        <button
                                            className="btn copy-btn btn-sm"
                                            onClick={() => handleCopy(aiDescriptions[index], index)}
                                        >
                                            Copy to Clipboard
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-between">
                    <div className="d-flex gap-2">
                        <button className="btn ai-btn btn-sm" onClick={addNewCertificate}>+ Add More Certificates</button>
                        <button className="btn ai-btn btn-sm mx-3" onClick={removeCertificate}>- Remove</button>
                    </div>
                    <button className="btn save-btn btn-sm" onClick={() => onSave()}>Save</button>
                    {showToast && (
                        <ToastNotification message="Certificates Saved successfully!" onClose={() => setShowToast(false)} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Certificate;