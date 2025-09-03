// utils/generateDocx.js
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export const generateDocx = (resumeInfo) => {
    if (!resumeInfo) return;

    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: resumeInfo.personalDetails?.fullName || "Full Name",
                                bold: true,
                                size: 32,
                            }),
                        ],
                    }),
                    new Paragraph(""),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: resumeInfo.personalDetails?.email || "Email",
                            }),
                        ],
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: resumeInfo.personalDetails?.phone || "Phone",
                            }),
                        ],
                    }),

                    new Paragraph(""),

                    ...(resumeInfo.education || []).map((edu) =>
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `${edu.degree} from ${edu.institution} (${edu.year})`,
                                    italics: true,
                                }),
                            ],
                        })
                    ),

                    new Paragraph(""),

                    ...(resumeInfo.projects || []).map((proj) =>
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `${proj.name}: ${proj.description}`,
                                }),
                            ],
                        })
                    ),
                ],
            },
        ],
    });

    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "Resume.docx");
    });
};
