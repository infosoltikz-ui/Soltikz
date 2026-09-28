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

export function MinimalCoverLetterTemplate({ content, candidateName, email, phone, location, linkedin, companyName, jobTitle }: Props) {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div
      style={{
        fontFamily: '"Inter", "Helvetica Neue", system-ui, sans-serif',
        width: '794px',
        minHeight: '1123px',
        backgroundColor: '#ffffff',
        padding: '0',
        boxSizing: 'border-box',
      }}
    >
      {/* Top gradient bar */}
      <div style={{ height: '6px', background: 'linear-gradient(to right, #7c3aed, #ec4899, #f59e0b)' }} />

      <div style={{ padding: '48px 72px 64px 72px' }}>
        {/* Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px' }}>
          {/* Name */}
          <div>
            <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#111827', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
              {candidateName}
            </h1>
            <div style={{ width: '48px', height: '3px', background: 'linear-gradient(to right, #7c3aed, #ec4899)', borderRadius: '2px' }} />
          </div>
          {/* Contact */}
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {email && <span style={{ fontSize: '11.5px', color: '#6b7280', fontWeight: '500' }}>{email}</span>}
            {phone && <span style={{ fontSize: '11.5px', color: '#6b7280', fontWeight: '500' }}>{phone}</span>}
            {location && <span style={{ fontSize: '11.5px', color: '#6b7280', fontWeight: '500' }}>{location}</span>}
            {linkedin && <span style={{ fontSize: '11.5px', color: '#7c3aed', fontWeight: '600' }}>{linkedin}</span>}
          </div>
        </div>

        {/* Date + Company */}
        <p style={{ fontSize: '12.5px', color: '#9ca3af', marginBottom: '6px', fontWeight: '500' }}>{today}</p>
        {companyName && (
          <div style={{ marginBottom: '36px' }}>
            <p style={{ margin: '0', fontSize: '14px', fontWeight: '700', color: '#111827' }}>{companyName}</p>
            {jobTitle && (
              <p style={{ margin: '4px 0 0 0', fontSize: '12.5px', color: '#7c3aed', fontWeight: '600' }}>
                Re: {jobTitle}
              </p>
            )}
          </div>
        )}

        {/* Thin divider */}
        <div style={{ height: '1px', background: '#f3f4f6', marginBottom: '36px' }} />

        {/* Salutation */}
        <p style={{ fontSize: '15px', marginBottom: '24px', fontWeight: '700', color: '#111827' }}>{content.salutation}</p>

        {/* Paragraphs */}
        {content.paragraphs.map((para, i) => (
          <p key={i} style={{
            fontSize: '13.5px',
            lineHeight: '2',
            marginBottom: '22px',
            color: '#374151',
            letterSpacing: '0.01em',
          }}>
            {para}
          </p>
        ))}

        {/* Closing */}
        <div style={{ marginTop: '40px' }}>
          <p style={{ fontSize: '13.5px', color: '#374151', marginBottom: '8px' }}>{content.sign_off}</p>
          <p style={{ fontSize: '18px', fontWeight: '800', color: '#111827', margin: '20px 0 0 0', letterSpacing: '-0.3px' }}>
            {candidateName}
          </p>
        </div>
      </div>

      {/* Bottom gradient bar */}
      <div style={{ height: '4px', background: 'linear-gradient(to right, #f59e0b, #ec4899, #7c3aed)' }} />
    </div>
  )
}
