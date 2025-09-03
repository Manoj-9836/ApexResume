import React, { useContext, useEffect, useState } from 'react';
import ToastNotification from '../../ToastNotification';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';

const Skills = ({ enableNext }) => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [showToast, setShowToast] = useState(false);

    const categories = [
        'languages',
        'frameworks',
        'mobile',
        'databases',
        'backend',
        'cloudTools',
        'others'
    ];

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const [skillsByCategory, setSkillsByCategory] = useState({
        languages: [],
        frameworks: [],
        mobile: [],
        databases: [],
        backend: [],
        cloudTools: [],
        others: []
    });

    const handleChange = (category, index, name, value) => {
        const updatedSkills = [...skillsByCategory[category]];
        updatedSkills[index][name] = value;
        setSkillsByCategory(prev => ({
            ...prev,
            [category]: updatedSkills
        }));
    };

    const AddNewSkill = () => {
        setSkillsByCategory(prev => ({
            ...prev,
            [selectedCategory]: [
                ...(prev[selectedCategory] || []),
                { name: '', rating: 0 }
            ]
        }));
    };

    const RemoveSkill = () => {
        setSkillsByCategory(prev => ({
            ...prev,
            [selectedCategory]: prev[selectedCategory].slice(0, -1)
        }));
    };

    const onSave = () => {
        setResumeInfo(prev => ({
            ...prev,
            skills: skillsByCategory
        }));
        setShowToast(true);
        enableNext(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    useEffect(() => {
        if (resumeInfo?.skills) {
            setSkillsByCategory(resumeInfo.skills);
        }
    }, []);

    return (
        <div>
            <div className="p-4 shadow-lg rounded mt-4" style={{ borderTop: '5px solid #6222CC' }}>
                <h2 className="fw-bold fs-4">Skills</h2>
                <p>Add your categorized skills</p>
                <p
                    style={{
                        border: '1px solid #f5c6cb',
                        color: '#cc0000',
                        fontSize: '12px',
                        borderRadius: '5px',
                        padding: '6px 10px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                >
                    <i className="fas fa-exclamation-circle" style={{ color: '#cc0000' }}></i>
                    Please edit the template skills
                </p>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Select Category:</label>
                    <select
                        className="form-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map((cat, idx) => (
                            <option key={idx} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {Object.entries(skillsByCategory).map(([category, skills]) =>
                    skills.length > 0 && (
                        <div key={category} className="mb-4">
                            <h5 className="fw-bold mt-3">{category}</h5>
                            {skills.map((item, index) => (
                                <div className="d-flex justify-content-between row g-3 border p-3 my-2 rounded" key={index}>
                                    <div className="col-md-6">
                                        <div className="input-container">
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={item.name}
                                                onChange={(e) => handleChange(category, index, 'name', e.target.value)}
                                            />
                                            <label className="label">Skill Name</label>
                                            <div className="underline"></div>
                                        </div>
                                    </div>
                                    <Rating
                                        style={{ maxWidth: 120 }}
                                        value={item.rating}
                                        onChange={(v) => handleChange(category, index, 'rating', v)}
                                    />
                                </div>
                            ))}
                        </div>
                    )
                )}

                <div className="d-flex justify-content-between">
                    <div className="d-flex gap-4">
                        <button className="btn ai-btn btn-sm" onClick={AddNewSkill}>
                            + Add Skill to {selectedCategory}
                        </button>
                        <button className="btn ai-btn btn-sm" onClick={RemoveSkill}>
                            - Remove from {selectedCategory}
                        </button>
                    </div>
                    {showToast && (
                        <ToastNotification
                            message="Skills Saved successfully!"
                            onClose={() => setShowToast(false)}
                        />
                    )}
                </div>

                <div className="d-flex justify-content-end mt-4 mx-3">
                    <button className="btn save-btn btn-sm" onClick={onSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Skills;
