import React, { useState } from 'react'
import PersonalForm from './forms/PersonalForm'
import SummaryForm from './forms/SummaryForm';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import ViewResume from '../ViewResume';
import Projects from './forms/Projects';
import Certificate from './forms/Certificate';
import TemplateSelector from './Templates/TemplateSelector';
import { useNavigate } from "react-router-dom";

const FormSection = () => {

    const navigate = useNavigate();

    // eslint-disable-next-line
    const [activeForm, setActiveForm] = useState(1);
    const [enableNext, setEnableNext] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState('template1');
    const [showTemplates, setShowTemplates] = useState(false);

    return (
        <div id="no-print">

            <div className="d-flex justify-content-between align-items-center">
                {/* Template Selection Button */}
                <button
                    className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
                    onClick={() => navigate("/templates")}
                >
                    <i className="bi bi-grid"></i> Choose Template
                </button>

                <div className='d-flex gap-2'>
                    {/* Left Button with Icon */}
                    {activeForm > 1 && <button className="btn prev-btn btn-sm d-flex align-items-center gap-2"
                        onClick={() => setActiveForm(activeForm - 1)} >
                        <i className="bi bi-arrow-left"></i>
                    </button>}

                    {/* Right Button with Icon */}
                    {activeForm < 8 && <button className="btn next-btn btn-sm d-flex align-items-center gap-2" disabled={!enableNext} onClick={() => setActiveForm(activeForm + 1)}>
                        Next <i className="fa-solid fa-arrow-right"></i>
                    </button>}
                </div>
            </div>

            {/* Personals Details */}
            {activeForm === 1 ? <PersonalForm enableNext={(v) => setEnableNext(v)} /> : null}

            {/* Summery */}
            {activeForm === 2 ? <SummaryForm enableNext={(v) => setEnableNext(v)} /> : null}

            {/* Professional Experience */}
            {activeForm === 3 ? <Experience enableNext={(v) => setEnableNext(v)} /> : null}

            {/* Education */}
            {activeForm === 4 ? <Education enableNext={(v) => setEnableNext(v)} /> : null}

            {/* Skills */}
            {activeForm === 5 ? <Skills enableNext={(v) => setEnableNext(v)} /> : null}

            {/* Projects */}
            {activeForm === 6 ? <Projects enableNext={(v) => setEnableNext(v)} /> : null}

            {/* Certificates */}
            {activeForm === 7 ? <Certificate enableNext={(v) => setEnableNext(v)} /> : null}

            {activeForm === 8 ? <ViewResume /> : null}

            {showTemplates && (
                <TemplateSelector
                    onClose={() => setShowTemplates(false)}
                    onSelect={(template) => {
                        setSelectedTemplate(template);
                        setShowTemplates(false);
                    }}
                />
            )}
        </div>
    )
}

export default FormSection