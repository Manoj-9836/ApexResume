import React from 'react'

const ProjectPreview = ({ resumeInfo }) => {
    return (
        <div className='my-4'>
            <h2 className='text-center fw-bold fs-5' style={{ color: resumeInfo?.themeColor }}>Projects</h2>
            <hr className='my-2' style={{ borderTop: `5px solid ${resumeInfo?.themeColor}` }} />

            <div className="row row-cols-1 row-cols-md-12 g-3 my-4">
                {resumeInfo?.projects.map((project, index) => (
                    <div key={index} className="col p-3">
                        <ul>
                            <li>
                                <h3 className='fs-5 fw-bold' style={{ color: resumeInfo?.themeColor }}>
                                    {project?.name}
                                </h3>
                            </li>
                            <p className="fs-6 fw-normal text-decoration-none" style={{ color: resumeInfo?.themeColor }}>
                                View Project : {project?.link}
                            </p>
                            <div className='fs-6 my-2' style={{ color: resumeInfo?.themeColor }}>
                                {project?.description
                                    ?.split('. ')
                                    .filter(sentence => sentence.trim() !== '')
                                    .map((sentence, i) => (
                                        <ul style={{ listStyleType: 'disc' }}>
                                            <li key={i}>
                                                {sentence.trim()}{sentence.endsWith('.') ? '' : ''}
                                            </li>
                                    </ul>
                                    ))}
                            </div>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectPreview
