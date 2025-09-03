import React, { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import mammoth from 'mammoth';
import Footer from './Footer';
const { GoogleGenerativeAI } = require('@google/generative-ai');

//worker for pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.0.375/pdf.min.mjs`;

const API_KEY = process.env.REACT_APP_API_KEY;

const UploadResume = () => {
    const [resumeFile, setResumeFile] = useState(null);
    const [jobRole, setJobRole] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isScoreHigh, setIsScoreHigh] = useState(null);


    const genAI = React.useMemo(() => new GoogleGenerativeAI(API_KEY), []);
    const model = React.useMemo(() => genAI.getGenerativeModel({ model: 'gemini-2.0-flash' }), [genAI]);

    const handleModalClose = () => setShowModal(false);

    const handleFileChange = (event) => {
        setResumeFile(event.target.files[0]);
        setAnalysisResult(null); // Clear previous results
        setError(''); // Clear previous errors
    };

    // Helper function to extract text from PDF
    const extractTextFromPdf = async (file) => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = async (event) => {
                try {
                    const typedArray = new Uint8Array(event.target.result);
                    const pdf = await pdfjsLib.getDocument(typedArray).promise;
                    let textContent = '';
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const text = await page.getTextContent();
                        textContent += text.items.map(item => item.str).join(' ') + '\n';
                    }
                    resolve(textContent);
                } catch (err) {
                    console.error("Error reading PDF:", err);
                    reject("Could not read text from PDF file.");
                }
            };
            reader.onerror = (err) => {
                console.error("FileReader error:", err);
                reject("Error reading file.");
            };
            reader.readAsArrayBuffer(file);
        });
    };

    // Helper function to extract text from DOCX
    const extractTextFromDocx = async (file) => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = async (event) => {
                try {
                    const arrayBuffer = event.target.result;
                    const result = await mammoth.extractRawText({ arrayBuffer });
                    resolve(result.value);
                } catch (err) {
                    console.error("Error reading DOCX:", err);
                    reject("Could not read text from DOCX file. Ensure it's a .docx file (not .doc).");
                }
            };
            reader.onerror = (err) => {
                console.error("FileReader error:", err);
                reject("Error reading file.");
            };
            reader.readAsArrayBuffer(file);
        });
    };

    const extractTextFromTxt = async (file) => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = (event) => {
                resolve(event.target.result);
            };
            reader.onerror = (err) => {
                console.error("FileReader error:", err);
                reject("Error reading file.");
            };
            reader.readAsText(file);
        });
    };


    const handleUpload = async () => {
        if (!resumeFile || !jobRole) {
            setError('Please upload a resume file and enter a job role.');
            return;
        }

        setLoading(true);
        setError('');
        setAnalysisResult(null);
        let resumeText = '';

        try {
            // Determine file type and extract text
            const fileType = resumeFile.type;
            const fileName = resumeFile.name.toLowerCase();

            console.log("File Type:", fileType);
            console.log("File Name:", fileName);


            if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
                console.log("Attempting PDF extraction...");
                resumeText = await extractTextFromPdf(resumeFile);
            } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileName.endsWith('.docx')) {
                console.log("Attempting DOCX extraction...");
                resumeText = await extractTextFromDocx(resumeFile);
            } else if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
                console.log("Attempting TXT extraction...");
                resumeText = await extractTextFromTxt(resumeFile);
            } else {
                throw new Error('Unsupported file type. Please upload PDF, DOCX, or TXT.');
            }

            if (!resumeText || resumeText.trim().length === 0) {
                throw new Error('Could not extract text from the file. It might be empty, image-based, or corrupted.');
            }

            console.log("Extracted Text Length:", resumeText.length);

            // --- Call Google Generative AI ---
            console.log("Sending text to Gemini...");
            const chatSession = model.startChat({ history: [] });
            const prompt = `
You are an advanced Applicant Tracking System (ATS) and intelligent job recommendation engine trained to evaluate resumes with high accuracy based on a specific job role.
Analyze the resume content below with respect to the target job role: "${jobRole}".
Instructions (strictly follow):
Extract only relevant skills that are clearly stated or strongly implied in the resume and are applicable to the target job role.
Recommend 3–5 alternative job titles or roles that the candidate is realistically qualified for, based solely on actual experience and skills mentioned in the resume.
Suggest 3–5 additional high-impact skills/tools that, if learned, would significantly boost the candidate’s eligibility for "${jobRole}" or similar roles.
Identify 3–5 minimum required skills/tools that are missing from the resume but are essential to meet basic eligibility for "${jobRole}".
Assign an ATS Compatibility Score (0–100) that quantifies how well the resume matches the target job role.
Provide a brief explanation of the score—highlighting strengths, gaps, and alignment with the job role.
Output Format:
Return a valid JSON object only (no markdown, no headings, no extra text) in the following structure:
{
  "skills": ["Skill 1", "Skill 2", ...],
  "jobSuggestions": ["Suggested Role 1", "Suggested Role 2", ...],
  "extraSkillsToLearn": ["Skill to Learn 1", "Skill to Learn 2", ...],
  "minimumSkillsToLearn": ["Skill to Learn 1", "Skill to Learn 2", ...],
  "atsScore": <score_number>,
  "atsScoreExplanation": "<Brief explanation>"
}
Resume Content:
--- START RESUME ---
${resumeText}
--- END RESUME ---
`;

            const result = await chatSession.sendMessage(prompt);

            let responseText = result?.response?.text();
            console.log("Raw AI Response:", responseText);

            if (!responseText) {
                throw new Error('Received empty response from AI.');
            }

            responseText = responseText.replace(/^```json\s*|```\s*$/g, '').trim();

            const jsonStart = responseText.indexOf('{');
            const jsonEnd = responseText.lastIndexOf('}');
            if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
                responseText = responseText.substring(jsonStart, jsonEnd + 1);
            } else {
                throw new Error('AI response does not contain valid JSON structure.');
            }


            console.log("Cleaned AI Response:", responseText);
            const json = JSON.parse(responseText);
            setAnalysisResult(json);

        } catch (error) {
            console.error('Error during processing:', error);
            setError(`Analysis failed: ${error.message || 'Please try again.'}`);
            setAnalysisResult(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!analysisResult?.atsScore && analysisResult?.atsScore !== 0) return;

        const high = Number(analysisResult.atsScore) >= 75;
        setIsScoreHigh(high);
        setShowModal(true);
    }, [analysisResult]);

    useEffect(() => {
        if (showModal && isScoreHigh && window.confetti) {
            const duration = 4000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            const interval = setInterval(() => {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) {
                    clearInterval(interval);
                    return;
                }
                const particleCount = Math.floor(50 * (timeLeft / duration));
                window.confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
                    colors: ['#bb0000', '#ffffff', '#00cc66', '#3366ff', '#ffcc00'],
                });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [showModal, isScoreHigh]);

    return (
        <>
            {/* <div className="container-xxl position-relative p-0" id="no-print">
                <div className="container-xxl py-5 hero-header">
                    <div className="container my-5 py-5 px-lg-5">
                        <div className="row g-5 py-5">
                            <div className="col-12 text-center">
                                <h1 className="text-white animated slideInDown">Upload Your Resume</h1>
                                <hr className="bg-white mx-auto mt-0" style={{ width: "90px" }} />
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-center">
                                        <li className="breadcrumb-item">
                                            <a className="text-white contct-links" href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item text-white active" aria-current="page">
                                            Upload-Resume
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className='container-xxl py-5 my-5'>
                <div className="wow fadeInUp" data-wow-delay="0.1s" id="no-print">
                    <p className="section-title text-secondary justify-content-center">
                        <span></span>Upload Resume<span></span>
                    </p>
                    <h1 className="text-center mb-5">Upload Your Resume for Smart Job Suggestions</h1>
                </div>
                <div className="row justify-content-center" id="no-print">
                    <div className="col-lg-8">
                        <div className="wow fadeInUp" data-wow-delay="0.3s">
                            <p className="text-center mb-4">
                                Get personalized job recommendations based on the skills in your resume. Our AI analyzes your
                                resume to match you with relevant roles and industries. It also highlights missing or in-demand skills to boost
                                your career growth. Upload your resume now and discover where you stand!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Upload & Analysis Section --- */}
            <div className='container my-5'>
                <div className="p-4 shadow-lg rounded row g-4" style={{ borderTop: '5px solid #6222CC' }}>

                    <div className='col-lg-4 col-12'>
                        <h2 className="fw-bold fs-4 mb-3">Upload for Analysis</h2>
                        <p>Get skills analysis, job suggestions, and an ATS score for your desired role.</p>

                        <div className="mb-3">
                            <label htmlFor="jobRoleInput" className="form-label">Desired Job Role</label>
                            <input
                                id="jobRoleInput"
                                type="text"
                                className="form-control"
                                placeholder="e.g., Frontend Developer"
                                value={jobRole}
                                onChange={(e) => setJobRole(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="resumeFileInput" className="form-label">Resume File (we recommend .word file)</label>
                            <input
                                id="resumeFileInput"
                                type="file"
                                accept=".pdf,.docx,.txt"
                                className="form-control"
                                onChange={handleFileChange}
                            />
                            <div className="form-text">Accepts DOCX, TXT files.</div>
                        </div>

                        <button className="btn next-btn w-100 mb-5" onClick={handleUpload} disabled={loading || !resumeFile || !jobRole}>
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Analyzing...
                                </>
                            ) : 'Upload & Analyze'}
                        </button>

                        {error && <div className="alert alert-danger mt-3">{error}</div>}

                        {!loading && analysisResult && !error && (
                            <div className="mb-3 p-3 border rounded bg-light">
                                <strong>Minimum Skills required for {jobRole}</strong>
                                {Array.isArray(analysisResult.minimumSkillsToLearn) && analysisResult.minimumSkillsToLearn.length > 0 ? (
                                    <ul className="list-unstyled mb-0">
                                        {analysisResult.minimumSkillsToLearn.map((skill, idx) => (
                                            <li key={idx}><a href='https://roadmap.sh/' target='_blank' style={{ color: "black" }}><i className="bi bi-lightbulb me-2"></i>{skill}</a></li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-muted fst-italic mb-0">No specific skill recommendations based on the analysis.</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className='col-lg-8 col-12'>
                        {loading && !analysisResult && (
                            <div className="d-flex justify-content-center align-items-center h-100">
                                <div className="spinner-border" style={{ color: ' #6222CC' }} role="status">
                                    <span className="visually-hidden">Loading Analysis...</span>
                                </div>
                                <span className='ms-2'>Fetching analysis from AI...</span>
                            </div>
                        )}

                        {analysisResult && !loading && (
                            <div>
                                <h3 className="mb-3 fw-bold">Analysis Results</h3>

                                {/* ATS Score Section (Prominent) */}
                                <div className="mb-4 p-3 border rounded text-white" style={{ backgroundColor: '#6222CC' }}>
                                    <h4 className="fw-bold mb-1">
                                        Estimated ATS Score for '{jobRole}':
                                    </h4>
                                    <p className='fs-2 fw-bold mb-1'>
                                        {typeof analysisResult.atsScore === 'number' ? `${analysisResult.atsScore} / 100` : 'N/A'}
                                    </p>
                                    {analysisResult.atsScoreExplanation && <p className="mb-0 fst-italic">{analysisResult.atsScoreExplanation}</p>}

                                </div>


                                {/* Skills Section */}
                                <div className="mb-3 p-3 border rounded bg-light">
                                    <strong>Extracted Skills:</strong>
                                    {Array.isArray(analysisResult.skills) && analysisResult.skills.length > 0 ? (
                                        <ul className="list-inline mb-0">
                                            {analysisResult.skills.map((skill, idx) => (
                                                <li key={idx} className="list-inline-item bg-secondary text-white px-2 py-1 rounded me-1 mb-1">{skill}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-muted fst-italic mb-0">No specific skills matching the job role were detected in the resume.</p>
                                    )}
                                </div>

                                <div className="mb-3 p-3 border rounded" style={{ backgroundColor: '#6222CC', color: 'white' }}>
                                    <strong>Suggested Job Roles:</strong>
                                    {Array.isArray(analysisResult.jobSuggestions) && analysisResult.jobSuggestions.length > 0 ? (
                                        <ul className="list-unstyled mb-0">
                                            {analysisResult.jobSuggestions.map((job, idx) => (
                                                <li key={idx}><i className="bi bi-briefcase me-2"></i>{job}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-muted fst-italic mb-0">No alternative job suggestions based on the resume content.</p>
                                    )}
                                </div>

                                {/* Extra Skills to Learn Section */}
                                <div className="mb-3 p-3 border rounded bg-light">
                                    <strong>Recommended Skills to Learn:</strong>
                                    {Array.isArray(analysisResult.extraSkillsToLearn) && analysisResult.extraSkillsToLearn.length > 0 ? (
                                        <ul className="list-unstyled mb-0">
                                            {analysisResult.extraSkillsToLearn.map((skill, idx) => (
                                                <li key={idx}><a href='https://roadmap.sh/' target='_blank' style={{ color: "black" }}><i className="bi bi-lightbulb me-2"></i>{skill}</a></li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-muted fst-italic mb-0">No specific skill recommendations based on the analysis.</p>
                                    )}
                                </div>

                            </div>
                        )}
                        {!loading && !analysisResult && !error && (
                            <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                                <p>Upload your resume and enter a job role to see the analysis here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div
                className={`modal fade ${showModal ? 'show d-block animate__animated animate__fadeInDown' : ''}`}
                tabIndex="-1"
                role="dialog"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                onClick={handleModalClose}
            >
                <div className='modal-dialog modal-dialog-centered' role='document' onClick={(e) => e.stopPropagation()}>
                    <div className='modal-content text-center p-4'>
                        {/* Header with Icon & Close button */}
                        <div className='position-relative mb-3'>
                            {isScoreHigh ? (
                                <i className='bi bi-check-circle-fill fs-1 text-success' />
                            ) : (
                                <i className='bi bi-x-circle-fill fs-1 text-danger' />
                            )}

                            <button
                                type='button'
                                className='btn-close position-absolute top-0 end-0 me-2 mt-2'
                                aria-label='Close'
                                onClick={handleModalClose}
                            />
                        </div>

                        {/* Body Message */}
                        {isScoreHigh ? (
                            <>
                                <h4 className='fw-bold'>Great job! 🎉</h4>
                                <p className='mb-0'>
                                    Your resume scored <strong>{analysisResult?.atsScore ?? '--'}/100</strong>. You’re highly compatible for{' '}
                                    <em>{jobRole}</em>. Keep up the momentum and apply with confidence. 🚀
                                </p>
                            </>
                        ) : (
                            <>
                                <h4 className='fw-bold'>ATS Score Needs Work</h4>
                                <p className='mb-0'>
                                    Your resume scored <strong>{analysisResult?.atsScore ?? '--'}/100</strong>, which is a low ATS score.
                                    <br />• <strong>Create</strong> a fresh, ATS‑optimized resume in our builder.
                                    <br />• If you already built with us, <strong>upgrade</strong> the skills listed under “Recommended Skills to Learn”.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default UploadResume;
