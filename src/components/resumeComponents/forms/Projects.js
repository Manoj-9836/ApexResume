import React, { useContext, useEffect, useState } from 'react';
import ToastNotification from '../../ToastNotification';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
const { GoogleGenerativeAI } = require('@google/generative-ai');

const initialProject = {
    name: '',
    link: '',
    technologies: '',
    description: ''
};

const Projects = ({ enableNext }) => {
    const [showToast, setShowToast] = useState(false);
    const [showToast1, setShowToast1] = useState(false);
    const [projectsList, setProjectsList] = useState([initialProject]);
    const [loading, setLoading] = useState(false);
    const [aiProjectSummaries, setAiProjectSummaries] = useState({});
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const handleChange = (index, name, value) => {
        const newEntries = [...projectsList];
        newEntries[index][name] = value;
        setProjectsList(newEntries);
    };

    const addNewProject = () => {
        setProjectsList([...projectsList, { ...initialProject }]);
    };

    const removeProject = () => {
        setProjectsList(projectsList.slice(0, -1));
    };

    useEffect(() => {
        setResumeInfo(prev => ({
            ...prev,
            projects: projectsList
        }));
    }, [projectsList]);

    const onSave = () => {
        setShowToast1(true);
        enableNext(true);
        setTimeout(() => {
            setShowToast1(false);
        }, 2000);
    };

    // AI Project Description Generation
    const generateProjectSummaryWithAI = async (index) => {
        const projectName = projectsList[index]?.name || 'Project';
        const technologies = projectsList[index]?.technologies || 'various technologies';

        setLoading(true);
        try {
            const chatSession = model.startChat({ history: [] });
            const result = await chatSession.sendMessage(
                `Generate a professional project summary in 2–3 lines for the project titled "${projectName}" using technologies: ${technologies}.  

Guidelines:  
- Write in a third-person, formal tone without first-person language.  
- Do not use markdown, bullet points, or asterisks.  
- Naturally mention all relevant technologies within the summary.  
- Highlight specific contributions, technical implementations, and measurable outcomes (e.g., “Improved page load speed by 30% using lazy loading in React”).  
- Keep the summary concise, impactful, and optimized for ATS and resume screening systems.  
- Ensure the output is strictly 2–3 lines.`
            );
            const responseText = result?.response?.text();

            if (responseText) {
                setAiProjectSummaries((prev) => ({ ...prev, [index]: responseText }));
            }
        } catch (error) {
            console.error('Error generating project summary:', error);
            alert('Error generating project summary. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text).then(() => {
            const updatedSummaries = { ...aiProjectSummaries };
            delete updatedSummaries[index];
            setAiProjectSummaries(updatedSummaries);
            setShowToast(true);

            setTimeout(() => {
                setShowToast(false);
            }, 2000);
        });
    };

    return (
        <div>
            <div className="p-4 shadow-lg rounded mt-4" style={{ borderTop: '5px solid #6222CC' }}>
                <h2 className="fw-bold fs-4">Projects</h2>
                <p>Add Your Projects here</p>

                {showToast && (
                    <ToastNotification message="Copied successfully!" onClose={() => setShowToast(false)} />
                )}
                <div>
                    {projectsList.map((item, index) => (
                        <div key={index} className='row g-3 border p-3 my-4 rounded'>
                            <div className="input-container">
                                <input type="text" name="name" required value={item.name}
                                    onChange={(e) => handleChange(index, 'name', e.target.value)} />
                                <label className="label">Project Name</label>
                                <div className="underline"></div>
                            </div>
                            <div className="input-container">
                                <input type="text" name="link" required value={item.link}
                                    onChange={(e) => handleChange(index, 'link', e.target.value)} />
                                <label className="label">Project Link</label>
                                <div className="underline"></div>
                            </div>
                            <div className="input-container">
                                <input type="text" name="technologies" required value={item.technologies}
                                    onChange={(e) => handleChange(index, 'technologies', e.target.value)} />
                                <label className="label">Technologies Used (comma separated)</label>
                                <div className="underline"></div>
                            </div>
                            <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label className="form-label">Project Summary</label>
                                    <button
                                        className="btn ai-btn btn-sm d-flex align-items-center gap-1 my-2"
                                        onClick={() => generateProjectSummaryWithAI(index)}
                                        disabled={loading}
                                    >
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
                                {aiProjectSummaries[index] && (
                                    <div className="mt-2 p-3 border rounded bg-light">
                                        <p>{aiProjectSummaries[index]}</p>
                                        <button
                                            className="btn copy-btn btn-sm"
                                            onClick={() => handleCopy(aiProjectSummaries[index], index)}
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
                        <button className="btn ai-btn btn-sm" onClick={addNewProject}>+ Add More Projects</button>
                        <button className="btn ai-btn btn-sm mx-3" onClick={removeProject}>- Remove</button>
                    </div>
                    <button className="btn save-btn btn-sm" onClick={() => onSave()}>Save</button>
                    {showToast1 && (
                        <ToastNotification message="Projects Saved successfully!" onClose={() => setShowToast1(false)} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Projects;
