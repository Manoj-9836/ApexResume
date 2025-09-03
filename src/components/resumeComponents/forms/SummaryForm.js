import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import ToastNotification from '../../ToastNotification';
const { GoogleGenerativeAI } = require('@google/generative-ai');

const SummaryForm = ({ enableNext }) => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [showToast, setShowToast] = useState(false);
    const [showToast1, setShowToast1] = useState(false);
    const [summery, setSummery] = useState(resumeInfo?.summery || '');
    const [experienceDetails, setExperienceDetails] = useState('');
    const [loading, setLoading] = useState(false);
    const [aiSummery, setAiSummery] = useState([]);

    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: 'application/json',
    };

    useEffect(() => {
        summery && setResumeInfo({ ...resumeInfo, summery });
    }, [summery]);

    const onSave = (e) => {
        e.preventDefault();
        enableNext(true);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    const generateSummaryWithAI = async () => {
        const jobTitle = resumeInfo?.jobTitle || 'Software Engineer';
        const experienceText = experienceDetails || 'No prior experience mentioned.';
        setLoading(true);
        try {
            const chatSession = model.startChat({ generationConfig, history: [] });
            const result = await chatSession.sendMessage(
                `Job Title: ${jobTitle}  
Experience Details: ${experienceText}  

Task: Generate 3 professional resume summaries tailored for different experience levels:  
1. Experienced  
2. Mid-Level  
3. Fresher  

Output Format: JSON array of objects. Each object must contain:  
- "experience_level": one of ["Experienced", "Mid-Level", "Fresher"]  
- "summary": text formatted as multiple bullet points (each point begins on a new line after a period).  

Guidelines:  
- Each summary should have 6–7 bullet points (one sentence per bullet).  
- Use a consistent third-person, formal tone suitable for resumes and ATS parsing.  
- Incorporate **industry-relevant technical keywords** based on the job title and experience (e.g., Java, Spring Boot, React, Node.js, REST APIs, MongoDB, Agile, CI/CD, Git).  
- Include **numeric data or measurable achievements** where applicable (e.g., “Reduced deployment time by 30%” or “Improved query performance by 25%”).  
- Mention certifications, tools, and frameworks where relevant.  
- Avoid vague descriptors like “motivated” or “eager” unless backed by concrete evidence.  
- For Freshers, highlight academic projects, internships, or relevant coursework with quantified results.  
- For Mid-Level and Experienced roles, emphasize professional achievements, leadership, and business impact.  
- Ensure summaries align with the target role and reflect increasing depth of responsibility across experience levels.`
            );
            const responseText = result?.response?.text();
            if (responseText) {
                setAiSummery(JSON.parse(responseText));
            } else {
                setSummery('Failed to generate summary.');
            }
        } catch (error) {
            console.error('Error generating summary:', error);
            alert('Error generating summary. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text).then(() => {
            const updatedSummaries = [...aiSummery];
            updatedSummaries.splice(index, 1);
            setAiSummery(updatedSummaries);
            setShowToast1(true);
        });

        setTimeout(() => {
            setShowToast1(false);
        }, 2000);
    };

    return (
        <div>
            <div className="p-4 shadow-lg rounded mt-4" style={{ borderTop: '5px solid #6222CC' }}>
                <h2 className="fw-bold fs-4">Summary</h2>
                <p>Add a brief summary of your experience and skills</p>

                {showToast1 && (
                    <ToastNotification message="Copied successfully!" onClose={() => setShowToast1(false)} />
                )}

                <div className="mb-3">
                    <label className="form-label">Professional Experience (Optional)</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Mention internships, jobs, or relevant experience here..."
                        value={experienceDetails}
                        onChange={(e) => setExperienceDetails(e.target.value)}
                    ></textarea>
                </div>

                <div className="mb-3 d-flex justify-content-between">
                    <label className="form-label">Professional Summary</label>
                    <button
                        className="btn btn-outline ai-btn btn-sm d-flex align-items-center gap-1"
                        onClick={generateSummaryWithAI}
                        disabled={loading}
                    >
                        {loading ? 'Generating...' : <><i className="bi bi-robot fs-6"></i> Generate with AI</>}
                    </button>
                </div>

                {showToast && (
                    <ToastNotification message="Summary saved successfully!" onClose={() => setShowToast(false)} />
                )}

                <form onSubmit={onSave}>
                    <div className="mb-3">
                        <textarea
                            required
                            name="summary"
                            className="form-control"
                            rows="6"
                            placeholder="Write a brief summary about yourself..."
                            onChange={(e) => setSummery(e.target.value)}
                            value={summery}
                        ></textarea>
                    </div>

                    <div className="d-flex justify-content-end">
                        <button className="btn save-btn" type="submit">Save</button>
                    </div>
                </form>
            </div>

            {aiSummery.length > 0 && (
                <div>
                    <h2 className='fw-bold fs-6 mt-4'>AI Suggestions</h2>
                    {aiSummery.map((item, index) => (
                        <div key={index} className='p-3 mb-3 border rounded shadow-lg' style={{ backgroundColor: '#f8f9fa' }}>
                            <h4 className='fw-bold text-exp'>{item.experience_level}</h4>
                            <p>{item.summary}</p>
                            <button
                                className='btn copy-btn btn-sm'
                                onClick={() => handleCopy(item.summary, index)}
                            >
                                Copy to Clipboard
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SummaryForm;
