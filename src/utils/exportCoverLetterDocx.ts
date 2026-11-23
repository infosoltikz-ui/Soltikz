import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx'
import type { CoverLetterData } from '@/components/create-resume/coverLetterTypes'

interface ExportCoverLetterProps {
  content: CoverLetterData
  candidateName?: string
  email?: string
  phone?: string
  location?: string
  linkedin?: string
  companyName?: string
  jobTitle?: string
  filename?: string
}

export async function exportCoverLetterToDocx({
  content,
  candidateName,
  email,
  phone,
  location,
  linkedin,
  companyName,
  jobTitle,
  filename = 'Cover_Letter',
}: ExportCoverLetterProps) {
  const contactParts = [email, phone, location, linkedin].filter(Boolean)
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const children: Paragraph[] = []

  // 1. Candidate Name (Header)
  if (candidateName) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: candidateName,
            bold: true,
            size: 32, // 16pt
            font: 'Calibri',
            color: '0F2744',
          }),
        ],
      })
    )
  }

  // 2. Contact Line
  if (contactParts.length > 0) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { after: 240 },
        children: [
          new TextRun({
            text: contactParts.join('  |  '),
            size: 19, // 9.5pt
            font: 'Calibri',
            color: '64748B',
          }),
        ],
      })
    )
  }

  // 3. Date
  children.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: today,
          size: 21, // 10.5pt
          font: 'Calibri',
          color: '334155',
        }),
      ],
    })
  )

  // 4. Company & Job Title Info
  if (companyName || jobTitle) {
    const compParts: Paragraph[] = []
    if (jobTitle) {
      compParts.push(
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: `Re: Application for ${jobTitle}`,
              bold: true,
              size: 21,
              font: 'Calibri',
              color: '0F2744',
            }),
          ],
        })
      )
    }
    if (companyName) {
      compParts.push(
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: companyName,
              size: 21,
              font: 'Calibri',
              color: '475569',
            }),
          ],
        })
      )
    }
    children.push(...compParts)
  }

  // 5. Salutation
  if (content.salutation) {
    children.push(
      new Paragraph({
        spacing: { after: 180 },
        children: [
          new TextRun({
            text: content.salutation,
            bold: true,
            size: 22,
            font: 'Calibri',
            color: '1E293B',
          }),
        ],
      })
    )
  }

  // 6. Body Paragraphs
  if (Array.isArray(content.paragraphs)) {
    content.paragraphs.forEach((pText) => {
      children.push(
        new Paragraph({
          spacing: { after: 200, line: 300 }, // 1.25 line spacing
          children: [
            new TextRun({
              text: pText,
              size: 22, // 11pt
              font: 'Calibri',
              color: '334155',
            }),
          ],
        })
      )
    })
  }

  // 7. Sign off & Signature
  children.push(
    new Paragraph({
      spacing: { before: 160, after: 100 },
      children: [
        new TextRun({
          text: content.sign_off || 'Sincerely,',
          size: 22,
          font: 'Calibri',
          color: '1E293B',
        }),
      ],
    })
  )

  if (candidateName) {
    children.push(
      new Paragraph({
        spacing: { after: 60 },
        children: [
          new TextRun({
            text: candidateName,
            bold: true,
            size: 22,
            font: 'Calibri',
            color: '0F2744',
          }),
        ],
      })
    )
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,    // 1 inch
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children,
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename.endsWith('.docx') ? filename : `${filename}.docx`
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}
