import React, { useContext } from 'react'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import PersonalDetailPreview from '../../preview/PersonalDetailPreview';
import Summery from '../../preview/Summery';
import Experience from '../../preview/Experience';
import Educational from '../../preview/Educational';
import Skills from '../../preview/Skills';
import ProjectPreview from '../../preview/ProjectPreview';
import CertificatePreview from '../../preview/CertificatePreview';

const TemplateOne = () => {

    // eslint-disable-next-line
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    return (
         <div
            className=" h-100 p-4"
            style={{ borderTop: `5px solid ${resumeInfo?.themeColor}` }}
            id="print-area"
        >
            {/* Personal Details */}
            <PersonalDetailPreview resumeInfo={resumeInfo} />

            {/* Summery */}
            <Summery resumeInfo={resumeInfo} />

            {/* Professional Experience */}
            {!resumeInfo?.disableExperience && <Experience resumeInfo={resumeInfo} />}

            {/* Education */}
            <Educational resumeInfo={resumeInfo} />

            {/* Skills */}
            <Skills resumeInfo={resumeInfo} />

            {/* Projects */}
            <ProjectPreview resumeInfo={resumeInfo} />

            {/* Certifications */}
            <CertificatePreview resumeInfo={resumeInfo} />

        </div>
    )
}

export default TemplateOne