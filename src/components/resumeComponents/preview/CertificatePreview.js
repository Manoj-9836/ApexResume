import React from 'react'

const CertificatePreview = ({ resumeInfo }) => {
    return (
        <div className='my-4'>
            <h2 className='text-center fw-bold fs-5' style={{ color: resumeInfo?.themeColor }}>Certificates</h2>
            <hr className='my-2' style={{ borderTop: `5px solid ${resumeInfo?.themeColor}` }} />

            <div className="row row-cols-1 row-cols-md-12 g-3 my-4">
                {resumeInfo?.certificates.map((certificate, index) => (
                    <div key={index} className="col p-3">
                        <div className='d-flex justify-content-between'>
                            <h3 className='fs-5 fw-bold' style={{ color: resumeInfo?.themeColor }}>{certificate?.name}</h3>
                            <p className='fs-6 fw-normal' style={{ color: resumeInfo?.themeColor }}>{certificate?.date}</p>
                        </div>
                        <ul className='fs-6 my-2' style={{ color: resumeInfo?.themeColor, listStyleType: 'disc' }}>
                            {certificate?.description
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
        </div>
    )
}

export default CertificatePreview
