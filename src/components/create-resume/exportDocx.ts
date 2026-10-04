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

// Helper to parse **bold** markdown text in bullets
function parseMarkdownText(text: string, size = 22, font = FONT, italics = false): TextRun[] {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.filter(p => p.length > 0).map(part => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return new TextRun({ text: part.slice(2, -2), bold: true, size, font, italics })
    }
    return new TextRun({ text: part, size, font, italics })
  })
}

function sectionHeading(text: string, templateId: string): Paragraph {
  const isC2C = templateId.startsWith('c2c')
  const color = isC2C ? '0277BD' : '000000' // Blue for C2C, Black for modern

  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: color, space: 2 },
    },
    children: [
      new TextRun({ text: text.toUpperCase(), bold: true, size: 24, font: FONT, color: color }),
    ],
  })
}

function bullet(text: string): Paragraph {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 60 },
    children: parseMarkdownText(text),
  })
}

export async function generateResumeDocx(resumeData: ResumeData, profileData: ProfileData, templateId: string): Promise<Blob> {
  const children: Paragraph[] = []
  const isC2C = templateId.startsWith('c2c')

  // Header: name + contact line
  children.push(
    new Paragraph({
      alignment: isC2C ? AlignmentType.LEFT : AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: (profileData.full_name || 'JOHN DOE').toUpperCase(),
          bold: true,
          size: 40,
          font: FONT,
          color: isC2C ? '001A33' : '000000' // Darker blue for name in C2C
        }),
      ],
    })
  )

  const contactParts = [profileData.email, profileData.phone, profileData.location, profileData.linkedin].filter(Boolean)
  if (contactParts.length > 0) {
    if (isC2C) {
      // In C2C, we can just list them comma separated or pipe separated, right-aligned looks better but left aligned is easier to maintain
      children.push(
        new Paragraph({
          alignment: AlignmentType.LEFT,
          spacing: { after: 200 },
          children: [new TextRun({ text: contactParts.join('  |  '), size: 20, font: FONT, color: '555555' })],
        })
      )
    } else {
      children.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: contactParts.join('  |  '), size: 22, font: FONT })],
        })
      )
    }
  }

  // Summary
  if (resumeData.summary?.length > 0) {
    children.push(sectionHeading('Professional Summary', templateId))
    resumeData.summary.forEach((point) => children.push(bullet(point)))
  }

  // Skills
  if (resumeData.skills?.length > 0) {
    children.push(sectionHeading('Technical Skills', templateId))
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
    children.push(sectionHeading('Professional Experience', templateId))
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
    children.push(sectionHeading('Education', templateId))
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
    children.push(sectionHeading('Certifications', templateId))
    resumeData.certifications.forEach((cert) => {
      children.push(bullet(`${cert.name} - ${cert.issuer} (${cert.year})`))
    })
  }

  // Add the top border line for C2C style
  let pageMargin = { top: 720, bottom: 720, left: 720, right: 720 }
  
  const doc = new Document({
    sections: [
      {
        properties: {
          page: { margin: pageMargin },
        },
        children,
      },
    ],
  })

  return Packer.toBlob(doc)
}

export async function downloadResumeDocx(resumeData: ResumeData, profileData: ProfileData, filename = 'Resume.docx', templateId = 'modern') {
  const blob = await generateResumeDocx(resumeData, profileData, templateId)
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
