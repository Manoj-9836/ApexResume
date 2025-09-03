import React from 'react'

const Summery = ({ resumeInfo }) => {
    return (
        <>
            <div className="fs-6">
                {resumeInfo?.summery
                    ?.split('. ')
                    .filter(sentence => sentence.trim() !== '')
                    .map((sentence, i) => (
                        <ul>
                        <div key={i}><li> {sentence.trim()}{sentence.endsWith('.') ? '' : '.'}</li></div>
                        </ul>
                    ))}
            </div>
        </>
    )
}

export default Summery
