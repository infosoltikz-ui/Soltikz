import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
} from 'docx'
import type { ResumeData, ProfileData } from './templates/types'

const FONT = 'Calibri'

function sectionHeading(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: '000000', space: 2 },
    },
    children: [
      new TextRun({ text: text.toUpperCase(), bold: true, size: 24, font: FONT }),
    ],
  })
}

function bullet(text: string): Paragraph {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 60 },
    children: [new TextRun({ text, size: 22, font: FONT })],
  })
}

export async function generateResumeDocx(resumeData: ResumeData, profileData: ProfileData): Promise<Blob> {
  const children: Paragraph[] = []

  // Header: name + contact line
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: (profileData.full_name || 'JOHN DOE').toUpperCase(),
          bold: true,
          size: 32,
          font: FONT,
        }),
      ],
    })
  )

  const contactParts = [profileData.email, profileData.phone, profileData.location, profileData.linkedin].filter(Boolean)
  if (contactParts.length > 0) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new TextRun({ text: contactParts.join('  |  '), size: 22, font: FONT })],
      })
    )
  }

  // Summary
  if (resumeData.summary?.length > 0) {
    children.push(sectionHeading('Professional Summary'))
    resumeData.summary.forEach((point) => children.push(bullet(point)))
  }

  // Skills
  if (resumeData.skills?.length > 0) {
    children.push(sectionHeading('Technical Skills'))
    resumeData.skills.forEach((group) => {
      children.push(
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({ text: `${group.category}: `, bold: true, size: 22, font: FONT }),
            new TextRun({ text: group.items.join(', '), size: 22, font: FONT }),
          ],
        })
      )
    })
  }

  // Experience
  if (resumeData.experience?.length > 0) {
    children.push(sectionHeading('Professional Experience'))
    resumeData.experience.forEach((exp) => {
      children.push(
        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({ text: `${exp.role} - ${exp.company}`, bold: true, size: 22, font: FONT }),
            new TextRun({ text: `\t${exp.duration}`, bold: true, size: 22, font: FONT }),
          ],
          tabStops: [{ type: 'right', position: 9000 }],
        })
      )
      if (exp.environment && exp.environment.length > 0) {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({ text: 'Environment: ', bold: true, size: 22, font: FONT }),
              new TextRun({ text: exp.environment.join(', '), italics: true, size: 22, font: FONT }),
            ],
          })
        )
      }
      exp.bullets.forEach((b) => children.push(bullet(b)))
    })
  }

  // Education
  if (resumeData.education?.length > 0) {
    children.push(sectionHeading('Education'))
    resumeData.education.forEach((edu) => {
      children.push(
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({ text: `${edu.degree} - ${edu.institution}`, bold: true, size: 22, font: FONT }),
            new TextRun({ text: `\t${edu.year}`, bold: true, size: 22, font: FONT }),
          ],
          tabStops: [{ type: 'right', position: 9000 }],
        })
      )
    })
  }

  // Certifications
  if (resumeData.certifications?.length > 0) {
    children.push(sectionHeading('Certifications'))
    resumeData.certifications.forEach((cert) => {
      children.push(bullet(`${cert.name} - ${cert.issuer} (${cert.year})`))
    })
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } },
        },
        children,
      },
    ],
  })

  return Packer.toBlob(doc)
}

export async function downloadResumeDocx(resumeData: ResumeData, profileData: ProfileData, filename = 'Resume.docx') {
  const blob = await generateResumeDocx(resumeData, profileData)
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
