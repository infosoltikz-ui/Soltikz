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

export function ModernDarkCoverLetterTemplate({ content, candidateName, email, phone, location, linkedin, companyName, jobTitle }: Props) {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const initials = (candidateName || 'YN').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div
      style={{
        fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
        width: '794px',
        minHeight: '1123px',
        backgroundColor: '#ffffff',
        display: 'flex',
        boxSizing: 'border-box',
      }}
    >
      {/* Left Sidebar */}
      <div style={{
        width: '220px',
        minHeight: '1123px',
        backgroundColor: '#0f172a',
        padding: '48px 24px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}>
        {/* Avatar / Initials */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            fontSize: '24px',
            fontWeight: '800',
            color: '#fff',
          }}>
            {initials}
          </div>
          <h2 style={{ color: '#f8fafc', fontSize: '15px', fontWeight: '700', margin: '0', lineHeight: '1.3' }}>
            {candidateName}
          </h2>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />

        {/* Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ color: '#10b981', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', margin: 0 }}>Contact</p>
          {email && <p style={{ color: '#94a3b8', fontSize: '11px', lineHeight: '1.5', margin: 0, wordBreak: 'break-all' }}>{email}</p>}
          {phone && <p style={{ color: '#94a3b8', fontSize: '11px', lineHeight: '1.5', margin: 0 }}>{phone}</p>}
          {location && <p style={{ color: '#94a3b8', fontSize: '11px', lineHeight: '1.5', margin: 0 }}>{location}</p>}
          {linkedin && <p style={{ color: '#94a3b8', fontSize: '11px', lineHeight: '1.5', margin: 0, wordBreak: 'break-all' }}>{linkedin}</p>}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />

        {/* Date */}
        <div>
          <p style={{ color: '#10b981', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 8px 0' }}>Date</p>
          <p style={{ color: '#94a3b8', fontSize: '11.5px', margin: 0 }}>{today}</p>
        </div>

        {companyName && (
          <div>
            <p style={{ color: '#10b981', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 8px 0' }}>Applying To</p>
            <p style={{ color: '#f8fafc', fontSize: '12px', fontWeight: '600', margin: 0 }}>{companyName}</p>
            {jobTitle && <p style={{ color: '#94a3b8', fontSize: '11px', margin: '4px 0 0 0' }}>{jobTitle}</p>}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '48px 48px 56px 40px' }}>
        {/* Top accent */}
        <div style={{ height: '3px', background: 'linear-gradient(to right, #10b981, #34d399)', borderRadius: '2px', marginBottom: '36px' }} />

        <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.3px' }}>
          Cover Letter
        </h1>
        <p style={{ fontSize: '12.5px', color: '#64748b', margin: '0 0 32px 0', fontWeight: '500' }}>
          {jobTitle ? `For the role of ${jobTitle}` : 'Application Letter'}
          {companyName ? ` at ${companyName}` : ''}
        </p>

        {/* Salutation */}
        <p style={{ fontSize: '14.5px', marginBottom: '20px', fontWeight: '600', color: '#1e293b' }}>{content.salutation}</p>

        {/* Paragraphs */}
        {content.paragraphs.map((para, i) => (
          <p key={i} style={{
            fontSize: '13.5px',
            lineHeight: '1.9',
            marginBottom: '18px',
            color: '#374151',
          }}>
            {para}
          </p>
        ))}

        {/* Signature */}
        <div style={{ marginTop: '36px' }}>
          <p style={{ fontSize: '13.5px', color: '#374151', marginBottom: '4px' }}>{content.sign_off}</p>
          <div style={{ width: '48px', height: '3px', background: 'linear-gradient(to right, #10b981, #34d399)', borderRadius: '2px', margin: '16px 0' }} />
          <p style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0, letterSpacing: '-0.2px' }}>{candidateName}</p>
        </div>
      </div>
    </div>
  )
}
