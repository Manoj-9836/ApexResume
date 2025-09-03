import React from 'react'

const Experience = ({ resumeInfo }) => {
    return (
        <div className='my-6'>
            <h2 className='text-center fw-bold fs-5' style={{ color: resumeInfo?.themeColor }}>Professional Experience</h2>
            <hr className='my-2' style={{ borderTop: `5px solid ${resumeInfo?.themeColor}` }} />
            {resumeInfo?.experience.map((experience, index) => (
                <div key={index} className='my-5'>
                    <h2 className='fs-5 fw-bold' style={{ color: resumeInfo?.themeColor }}>{experience?.title}</h2>
                    <h2 className='fs-6 fw-normal d-flex justify-content-between'>
                        {experience?.companyName}, {experience?.city}, {experience?.state}
                        <span>{experience?.startDate} TO {experience?.currentlyWorking ? 'Present' : experience?.endDate}</span>
                    </h2>

                    <ul className="fs-6 my-2">
                        {experience?.workSummery
                            ?.split('. ')
                            .filter(sentence => sentence.trim() !== '')
                            .map((sentence, i) => (
                                <li key={i}>
                                    {sentence.trim()}{sentence.endsWith('.') ? '' : '.'}
                                </li>
                            ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default Experience
