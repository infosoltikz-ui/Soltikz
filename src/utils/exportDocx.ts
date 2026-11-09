import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  AlignmentType, 
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType,
  TabStopType,
  TabStopPosition,
  Tab
} from 'docx'
import type { ResumeData, ProfileData, ResumeSkillCategory } from '@/components/create-resume/templates/types'

// Helper to sanitize hex color (e.g., '#0F2744' -> '0F2744')
function cleanHex(color?: string, fallback = '0F2744'): string {
  if (!color) return fallback
  const hex = color.replace(/^#/, '').trim()
  return hex.length === 6 ? hex : fallback
}

// Helper to parse **bold** text into Word TextRuns
function parseWordRuns(
  text: string, 
  fontSize = 20, 
  textColor = '334155', 
  boldColor = '0F172A', 
  isItalic = false
): TextRun[] {
  if (!text) return []
  const clean = text.replace(/^[-•*]\s*/, '')
  const parts = clean.split(/(\*\*.*?\*\*)/g)

  return parts.filter(Boolean).map(part => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2).trim()
      return new TextRun({
        text: boldText,
        bold: true,
        size: fontSize,
        italics: isItalic,
        color: boldColor,
        font: 'Calibri'
      })
    }
    return new TextRun({
      text: part,
      size: fontSize,
      italics: isItalic,
      color: textColor,
      font: 'Calibri'
    })
  })
}

// Borderless cell definition helper
const NO_BORDERS = {
  top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
}

export async function exportToDocx(
  resumeData: ResumeData, 
  profileData: Partial<ProfileData>, 
  filename: string,
  templateId = 'classic',
  themeColor = '#0F2744'
): Promise<void> {
  const primaryColor = cleanHex(themeColor, '0F2744')
  const candidateName = (profileData.full_name || 'Candidate Name').trim()
  const isC2C = String(templateId).startsWith('c2c') || resumeData.resume_type === 'c2c'
  const isBanner = templateId.includes('banner')
  const isCertified = templateId.includes('certified')
  const isModern = templateId.includes('modern')
  const isSidebar = templateId.includes('sidebar')

  // Build clean contact items
  const contactItems: string[] = []
  if (profileData.location) contactItems.push(profileData.location)
  if (profileData.email) contactItems.push(profileData.email)
  if (profileData.phone) contactItems.push(profileData.phone)
  if (profileData.linkedin) contactItems.push(profileData.linkedin.replace(/^https?:\/\/(www\.)?/, ''))

  const paragraphsOrTables: (Paragraph | Table)[] = []

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. TEMPLATE-SPECIFIC HEADER DESIGN
  // ─────────────────────────────────────────────────────────────────────────────
  if (isBanner) {
    // ── BANNER TEMPLATE: Full-Width Colored Shaded Table Header ──
    const bannerCells = [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 180, after: 60 },
        children: [
          new TextRun({
            text: candidateName.toUpperCase(),
            bold: true,
            size: 38, // 19pt
            color: 'FFFFFF', // Pure White on colored banner
            font: 'Calibri',
          }),
        ],
      }),
    ]

    if (contactItems.length > 0) {
      bannerCells.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 180 },
          children: [
            new TextRun({
              text: contactItems.join('   •   '),
              size: 19, // 9.5pt
              color: 'E2E8F0', // Soft Light Slate
              font: 'Calibri',
            }),
          ],
        })
      )
    }

    paragraphsOrTables.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 100, type: WidthType.PERCENTAGE },
                shading: { fill: primaryColor, type: ShadingType.CLEAR },
                margins: { top: 200, bottom: 200, left: 240, right: 240 },
                borders: NO_BORDERS,
                children: bannerCells,
              }),
            ],
          }),
        ],
      })
    )

    // Breathing space after banner
    paragraphsOrTables.push(new Paragraph({ spacing: { before: 100, after: 0 } }))

  } else if (isCertified) {
    // ── CERTIFIED TECH TEMPLATE: 2-Column Split Header with Badges ──
    const leftHeaderChildren: Paragraph[] = [
      new Paragraph({
        spacing: { before: 0, after: 40 },
        children: [
          new TextRun({
            text: candidateName.toUpperCase(),
            bold: true,
            size: 34,
            color: '0F172A',
            font: 'Calibri',
          }),
        ],
      }),
    ]

    if (contactItems.length > 0) {
      leftHeaderChildren.push(
        new Paragraph({
          spacing: { before: 0, after: 0 },
          children: [
            new TextRun({
              text: contactItems.join('  •  '),
              size: 18,
              color: '475569',
              font: 'Calibri',
            }),
          ],
        })
      )
    }

    const rightBadgeChildren: Paragraph[] = []
    if (resumeData.certifications && resumeData.certifications.length > 0) {
      resumeData.certifications.slice(0, 2).forEach(cert => {
        rightBadgeChildren.push(
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { before: 20, after: 20 },
            children: [
              new TextRun({
                text: `✓ ${cert.name.toUpperCase()}`,
                bold: true,
                size: 17,
                color: primaryColor,
                font: 'Calibri',
              }),
            ],
          })
        )
      })
    }

    paragraphsOrTables.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 65, type: WidthType.PERCENTAGE },
                borders: NO_BORDERS,
                children: leftHeaderChildren,
              }),
              new TableCell({
                width: { size: 35, type: WidthType.PERCENTAGE },
                borders: NO_BORDERS,
                children: rightBadgeChildren.length > 0 ? rightBadgeChildren : [new Paragraph({})],
              }),
            ],
          }),
        ],
      })
    )

    // Solid accent rule below split header
    paragraphsOrTables.push(
      new Paragraph({
        spacing: { before: 80, after: 140 },
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 12, color: primaryColor },
        },
      })
    )

  } else {
    // ── CLASSIC / MODERN / SIDEBAR: Centered Title with Divider ──
    paragraphsOrTables.push(
      new Paragraph({
        alignment: isSidebar ? AlignmentType.LEFT : AlignmentType.CENTER,
        spacing: { before: 0, after: 60 },
        children: [
          new TextRun({
            text: candidateName.toUpperCase(),
            bold: true,
            size: 36, // 18pt
            color: isModern || isSidebar ? primaryColor : '0F172A',
            font: 'Calibri',
          }),
        ],
      })
    )

    if (contactItems.length > 0) {
      paragraphsOrTables.push(
        new Paragraph({
          alignment: isSidebar ? AlignmentType.LEFT : AlignmentType.CENTER,
          spacing: { before: 0, after: 120 },
          children: [
            new TextRun({
              text: contactItems.join('   •   '),
              size: 19,
              color: '475569',
              font: 'Calibri',
            }),
          ],
        })
      )
    }

    // Elegant divider rule
    paragraphsOrTables.push(
      new Paragraph({
        spacing: { before: 40, after: 120 },
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 8, color: isModern ? primaryColor : 'CBD5E1' },
        },
      })
    )
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // HELPER: Section Header with Template Styling
  // ─────────────────────────────────────────────────────────────────────────────
  const createSectionHeader = (title: string): Paragraph => {
    return new Paragraph({
      spacing: { before: 200, after: 90 },
      border: {
        bottom: {
          color: primaryColor,
          space: 4,
          style: BorderStyle.SINGLE,
          size: 12,
        },
      },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 21, // 10.5pt
          color: primaryColor,
          font: 'Calibri',
        }),
      ],
    })
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. PROFESSIONAL SUMMARY
  // ─────────────────────────────────────────────────────────────────────────────
  if (resumeData.summary && resumeData.summary.length > 0) {
    paragraphsOrTables.push(createSectionHeader('Professional Summary'))

    if (isC2C) {
      // C2C summary is rendered as individual bullet points
      for (const bullet of resumeData.summary) {
        paragraphsOrTables.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 40, after: 40 },
            children: parseWordRuns(bullet, 20),
          })
        )
      }
    } else {
      // Full-Time summary is a single flowing prose paragraph
      const summaryText = Array.isArray(resumeData.summary) 
        ? resumeData.summary.join(' ') 
        : String(resumeData.summary)

      paragraphsOrTables.push(
        new Paragraph({
          spacing: { before: 60, after: 100 },
          children: parseWordRuns(summaryText, 20),
        })
      )
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. TECHNICAL SKILLS: 2-COLUMN TABLE MATRIX
  // ─────────────────────────────────────────────────────────────────────────────
  if (resumeData.skills && resumeData.skills.length > 0) {
    paragraphsOrTables.push(createSectionHeader('Technical Skills'))

    const validSkills = resumeData.skills.filter(s => s && s.category && s.items && s.items.length > 0)
    
    // Split into 2 columns for a clean modern dual-column matrix
    const midPoint = Math.ceil(validSkills.length / 2)
    const leftSkills = validSkills.slice(0, midPoint)
    const rightSkills = validSkills.slice(midPoint)

    const maxRows = Math.max(leftSkills.length, rightSkills.length)
    const skillRows: TableRow[] = []

    for (let r = 0; r < maxRows; r++) {
      const leftCat: ResumeSkillCategory | undefined = leftSkills[r]
      const rightCat: ResumeSkillCategory | undefined = rightSkills[r]

      const leftParas: Paragraph[] = leftCat ? [
        new Paragraph({
          spacing: { before: 30, after: 30 },
          children: [
            new TextRun({
              text: `${leftCat.category}: `,
              bold: true,
              size: 19,
              color: '0F172A',
              font: 'Calibri',
            }),
            new TextRun({
              text: leftCat.items.join(', '),
              size: 19,
              color: '334155',
              font: 'Calibri',
            }),
          ],
        }),
      ] : [new Paragraph({})]

      const rightParas: Paragraph[] = rightCat ? [
        new Paragraph({
          spacing: { before: 30, after: 30 },
          children: [
            new TextRun({
              text: `${rightCat.category}: `,
              bold: true,
              size: 19,
              color: '0F172A',
              font: 'Calibri',
            }),
            new TextRun({
              text: rightCat.items.join(', '),
              size: 19,
              color: '334155',
              font: 'Calibri',
            }),
          ],
        }),
      ] : [new Paragraph({})]

      skillRows.push(
        new TableRow({
          children: [
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              borders: NO_BORDERS,
              margins: { left: 0, right: 120, top: 20, bottom: 20 },
              children: leftParas,
            }),
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              borders: NO_BORDERS,
              margins: { left: 120, right: 0, top: 20, bottom: 20 },
              children: rightParas,
            }),
          ],
        })
      )
    }

    if (skillRows.length > 0) {
      paragraphsOrTables.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: skillRows,
        })
      )
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. PROFESSIONAL EXPERIENCE
  // ─────────────────────────────────────────────────────────────────────────────
  if (resumeData.experience && resumeData.experience.length > 0) {
    paragraphsOrTables.push(createSectionHeader('Professional Experience'))

    for (const exp of resumeData.experience) {
      // Role & Duration on same line with right-aligned TabStop
      paragraphsOrTables.push(
        new Paragraph({
          spacing: { before: 140, after: 20 },
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: TabStopPosition.MAX,
            },
          ],
          children: [
            new TextRun({
              text: exp.role || 'Role Title',
              bold: true,
              size: 21, // 10.5pt
              color: '0F172A',
              font: 'Calibri',
            }),
            new TextRun({
              children: [new Tab(), exp.duration || ''],
              bold: true,
              size: 19,
              color: primaryColor,
              font: 'Calibri',
            }),
          ],
        })
      )

      // Company and Location
      const companyLine = [exp.company, exp.location].filter(Boolean).join(' — ')
      if (companyLine) {
        paragraphsOrTables.push(
          new Paragraph({
            spacing: { before: 0, after: 50 },
            children: [
              new TextRun({
                text: companyLine,
                italics: true,
                size: 19,
                color: '475569',
                font: 'Calibri',
              }),
            ],
          })
        )
      }

      // C2C Environment list
      if (exp.environment && exp.environment.length > 0) {
        paragraphsOrTables.push(
          new Paragraph({
            spacing: { before: 20, after: 40 },
            children: [
              new TextRun({
                text: 'Environment: ',
                bold: true,
                size: 18,
                color: '0F172A',
                font: 'Calibri',
              }),
              new TextRun({
                text: exp.environment.join(', '),
                size: 18,
                italics: true,
                color: '475569',
                font: 'Calibri',
              }),
            ],
          })
        )
      }

      // 2-Line Bullets with Bold Target Keywords
      if (exp.bullets && exp.bullets.length > 0) {
        for (const bullet of exp.bullets) {
          paragraphsOrTables.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { before: 35, after: 35 },
              children: parseWordRuns(bullet, 20),
            })
          )
        }
      }
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. EDUCATION
  // ─────────────────────────────────────────────────────────────────────────────
  if (resumeData.education && resumeData.education.length > 0) {
    paragraphsOrTables.push(createSectionHeader('Education'))

    for (const edu of resumeData.education) {
      paragraphsOrTables.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: TabStopPosition.MAX,
            },
          ],
          children: [
            new TextRun({
              text: [edu.degree, edu.major].filter(Boolean).join(' in '),
              bold: true,
              size: 20,
              color: '0F172A',
              font: 'Calibri',
            }),
            new TextRun({
              children: [new Tab(), edu.year || ''],
              size: 19,
              color: '475569',
              font: 'Calibri',
            }),
          ],
        })
      )

      const institutionLine = [edu.institution, edu.location].filter(Boolean).join(' — ')
      if (institutionLine) {
        paragraphsOrTables.push(
          new Paragraph({
            spacing: { before: 0, after: 50 },
            children: [
              new TextRun({
                text: institutionLine,
                italics: true,
                size: 19,
                color: '475569',
                font: 'Calibri',
              }),
            ],
          })
        )
      }
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. CERTIFICATIONS
  // ─────────────────────────────────────────────────────────────────────────────
  if (resumeData.certifications && resumeData.certifications.length > 0) {
    paragraphsOrTables.push(createSectionHeader('Certifications'))

    for (const cert of resumeData.certifications) {
      paragraphsOrTables.push(
        new Paragraph({
          spacing: { before: 35, after: 35 },
          bullet: { level: 0 },
          children: [
            new TextRun({
              text: cert.name,
              bold: true,
              size: 20,
              color: '0F172A',
              font: 'Calibri',
            }),
            new TextRun({
              text: [cert.issuer ? ` (${cert.issuer})` : '', cert.year ? ` — ${cert.year}` : ''].join(''),
              size: 19,
              color: '475569',
              font: 'Calibri',
            }),
          ],
        })
      )
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // BUILD DOCUMENT AND DOWNLOAD
  // ─────────────────────────────────────────────────────────────────────────────
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1080,    // 0.75 in
              right: 1080,  // 0.75 in
              bottom: 1080, // 0.75 in
              left: 1080,   // 0.75 in
            },
          },
        },
        children: paragraphsOrTables,
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
