import React from 'react';

const Skills = ({ resumeInfo, showCategory = true }) => {
    const skillCategories = resumeInfo?.skills || {};
    const themeColor = resumeInfo?.themeColor || '#000';

    // Filter out empty categories
    const filteredCategories = Object.entries(skillCategories).filter(
        ([_, skills]) => skills && skills.length > 0
    );

    return (
        <div className='my-4'>
            <h2 className='text-center fw-bold fs-5' style={{ color: themeColor }}>Skills</h2>
            <hr className='my-2' style={{ borderTop: `5px solid ${themeColor}` }} />

            <div className="d-flex flex-column gap-2">
                {filteredCategories.map(([category, skills]) => (
                    <div key={category} className="d-flex">
                        {showCategory && (
                            <div className='fw-bold text-capitalize me-2' style={{ width: '150px', color: themeColor }}>
                                {category.replace(/([A-Z])/g, ' $1')}:
                            </div>
                        )}
                        <div className="flex-grow-1">
                            {skills.map((skill, idx) => (
                                <span key={idx} style={{ color: themeColor }}>
                                    {skill.name}
                                    {idx !== skills.length - 1 && ', '}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
