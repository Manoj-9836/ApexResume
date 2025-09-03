import React from 'react'
import TemplateOne from './Templates/TemplateFolder/TemplateOne'
import TemplateTwo from '../resumeComponents/Templates/TemplateFolder/templateTwo/TemplateTwo'

const ResumePreview = ({ template }) => {

    return (
        <>
            {template === "template1" && <TemplateOne />}
            {template === "template2" && <TemplateTwo />}
        </>
    )
}

export default ResumePreview