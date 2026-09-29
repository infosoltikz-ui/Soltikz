'use client'

import type { CoverLetterData } from '../coverLetterTypes'

interface Props {
  content: CoverLetterData
  candidateName?: string
  email?: string
  phone?: string
  location?: string
  linkedin?: string
  companyName?: string
  jobTitle?: string
}

export function ClassicCoverLetterTemplate({ content, candidateName, email, phone, location, linkedin, companyName, jobTitle }: Props) {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div
      style={{
        fontFamily: '"Georgia", "Times New Roman", serif',
        width: '100%',
        maxWidth: '794px',
        minHeight: '1123px',
        backgroundColor: '#ffffff',
        color: '#1a1a2e',
        padding: '0',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div style={{ backgroundColor: '#1a237e', padding: '40px 56px 32px 56px' }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#ffffff', letterSpacing: '0.5px' }}>
          {candidateName || 'Your Name'}
        </h1>
        <div style={{ marginTop: '10px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {email && <span style={{ color: '#c5cae9', fontSize: '12.5px' }}>{email}</span>}
          {phone && <span style={{ color: '#c5cae9', fontSize: '12.5px' }}>• {phone}</span>}
          {location && <span style={{ color: '#c5cae9', fontSize: '12.5px' }}>• {location}</span>}
          {linkedin && <span style={{ color: '#c5cae9', fontSize: '12.5px' }}>• {linkedin}</span>}
        </div>
      </div>

      {/* Gold Accent Bar */}
      <div style={{ height: '4px', background: 'linear-gradient(to right, #ffd700, #ffb300)' }} />

      {/* Body */}
      <div style={{ padding: '40px 56px 56px 56px' }}>
        {/* Date + Company */}
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '6px' }}>{today}</p>
        {companyName && (
          <div style={{ marginBottom: '24px' }}>
            <p style={{ margin: '0', fontSize: '13.5px', fontWeight: '700', color: '#1a237e' }}>{companyName}</p>
            {jobTitle && <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', color: '#555' }}>Re: Application for {jobTitle}</p>}
          </div>
        )}

        <div style={{ borderTop: '1px solid #e0e0e0', marginBottom: '28px' }} />

        {/* Salutation */}
        <p style={{ fontSize: '14.5px', marginBottom: '20px', fontWeight: '600', color: '#1a1a2e' }}>{content.salutation}</p>

        {/* Paragraphs */}
        {content.paragraphs.map((para, i) => (
          <p key={i} style={{
            fontSize: '14px',
            lineHeight: '1.85',
            marginBottom: '18px',
            color: '#2d2d2d',
            textAlign: 'justify',
          }}>
            {para}
          </p>
        ))}

        {/* Closing */}
        <div style={{ marginTop: '32px' }}>
          <p style={{ fontSize: '14px', color: '#2d2d2d', marginBottom: '4px' }}>{content.sign_off}</p>
          <p style={{ fontSize: '15px', fontWeight: '700', color: '#1a237e', marginTop: '12px' }}>{candidateName}</p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '2px solid #1a237e', marginLeft: '56px', marginRight: '56px' }}>
        <p style={{ fontSize: '11px', color: '#999', padding: '10px 0', textAlign: 'center' }}>
          {candidateName} • Cover Letter
        </p>
      </div>
    </div>
  )
}
