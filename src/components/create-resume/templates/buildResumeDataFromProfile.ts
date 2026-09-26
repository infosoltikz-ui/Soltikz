import { sampleProfileData, sampleResumeData, c2cSampleData } from './sampleData'
import { getSummaryArray, ProfileData, ResumeData, ResumeExperience, ResumeEducation, ResumeCertification, ResumeSkillCategory } from './types'

export function buildResumeDataFromProfile(
  userProfile?: any,
  templateId: string = 'modern'
): { profileData: ProfileData; resumeData: ResumeData } {
  const isC2C = templateId === 'c2c' || templateId.startsWith('c2c')
  const defaultResumeData = isC2C ? c2cSampleData : sampleResumeData

  if (!userProfile) {
    return {
      profileData: sampleProfileData,
      resumeData: defaultResumeData
    }
  }

  const master = userProfile.master_resume_data || {}
  const personal = master.personal_info || {}

  // 1. Build Profile Data
  const fullName = userProfile.full_name || 
    `${personal.firstName || ''} ${personal.lastName || ''}`.trim() || 
    personal.fullName || 
    sampleProfileData.full_name

  const email = userProfile.email || personal.email || sampleProfileData.email
  const phone = userProfile.phone || personal.phone || sampleProfileData.phone
  const location = personal.location || userProfile.location || sampleProfileData.location
  const linkedin = personal.linkedin || userProfile.linkedin || sampleProfileData.linkedin

  const profileData: ProfileData = {
    full_name: fullName,
    email,
    phone,
    linkedin,
    location,
    work_authorization: personal.workAuthorization || userProfile.work_authorization || sampleProfileData.work_authorization,
    relocation: personal.relocation || userProfile.relocation || sampleProfileData.relocation,
    availability: personal.availability || userProfile.availability || sampleProfileData.availability,
  }

  // If there's no master resume data at all, return profileData + default template resumeData
  if (!userProfile.master_resume_data && !userProfile.full_name && !userProfile.email) {
    return {
      profileData: sampleProfileData,
      resumeData: defaultResumeData
    }
  }

  // 2. Summary
  let summaryText = personal.summary || master.summary || ''
  let summary: string[] = getSummaryArray(summaryText)

  if (isC2C) {
    let c2cSummary = summary.length > 0 ? [...summary] : []
    let fillIdx = 0
    while (c2cSummary.length < 10) {
      c2cSummary.push(c2cSampleData.summary[fillIdx % c2cSampleData.summary.length])
      fillIdx++
    }
    summary = c2cSummary.slice(0, 10)
  } else if (summary.length === 0) {
    summary = defaultResumeData.summary
  }

  // 3. Employment / Experience
  let experience: ResumeExperience[] = []
  if (Array.isArray(master.employment) && master.employment.length > 0) {
    experience = master.employment.map((emp: any, expIdx: number) => {
      let durationStr = emp.startDate || ''
      if (emp.current) durationStr += ' - Present'
      else if (emp.endDate) durationStr += ` - ${emp.endDate}`
      if (!durationStr) durationStr = emp.duration || ''

      let bulletsArr: string[] = []
      if (Array.isArray(emp.responsibilities)) {
        bulletsArr = emp.responsibilities.filter(Boolean)
      } else if (typeof emp.responsibilities === 'string' && emp.responsibilities.trim()) {
        bulletsArr = emp.responsibilities.split('\n').map((b: string) => b.trim()).filter(Boolean)
      } else if (Array.isArray(emp.bullets)) {
        bulletsArr = emp.bullets.filter(Boolean)
      }

      bulletsArr = bulletsArr.map(b => b.replace(/^[-•*]\s*/, ''))

      const defaultExp = defaultResumeData.experience[expIdx % defaultResumeData.experience.length]
      if (!isC2C && defaultExp) {
        let padIdx = 0
        while (bulletsArr.length < 8 && padIdx < defaultExp.bullets.length) {
          const candidateBullet = defaultExp.bullets[padIdx].replace(/^[-•*]\s*/, '')
          if (!bulletsArr.includes(candidateBullet)) {
            bulletsArr.push(candidateBullet)
          }
          padIdx++
        }
      }

      let envArr: string[] = []
      if (Array.isArray(emp.environment)) {
        envArr = emp.environment.filter(Boolean)
      } else if (typeof emp.environment === 'string' && emp.environment.trim()) {
        envArr = emp.environment.split(',').map((e: string) => e.trim()).filter(Boolean)
      }

      return {
        role: emp.title || emp.role || 'Professional Role',
        company: emp.company || 'Company Name',
        client: emp.client || undefined,
        location: emp.location || undefined,
        duration: durationStr,
        bullets: bulletsArr.length > 0 ? bulletsArr : ['Developed key features and maintained system performance.'],
        environment: envArr.length > 0 ? envArr : undefined
      }
    })
  } else if (Array.isArray(userProfile.experience) && userProfile.experience.length > 0) {
    experience = userProfile.experience.map((emp: any, expIdx: number) => {
      let bulletsArr = Array.isArray(emp.bullets) ? emp.bullets.map((b: string) => b.replace(/^[-•*]\s*/, '')) : []
      const defaultExp = defaultResumeData.experience[expIdx % defaultResumeData.experience.length]
      if (!isC2C && defaultExp) {
        let padIdx = 0
        while (bulletsArr.length < 8 && padIdx < defaultExp.bullets.length) {
          const candidateBullet = defaultExp.bullets[padIdx].replace(/^[-•*]\s*/, '')
          if (!bulletsArr.includes(candidateBullet)) {
            bulletsArr.push(candidateBullet)
          }
          padIdx++
        }
      }
      return {
        ...emp,
        bullets: bulletsArr
      }
    })
  } else {
    experience = defaultResumeData.experience
  }

  // 4. Education
  let education: ResumeEducation[] = []
  if (Array.isArray(master.education) && master.education.length > 0) {
    education = master.education.map((edu: any) => {
      let yearStr = edu.endDate || edu.startDate || edu.year || ''
      if (edu.startDate && edu.endDate) {
        yearStr = `${edu.startDate} - ${edu.endDate}`
      }
      return {
        degree: edu.degree || 'Degree',
        institution: edu.institution || edu.school || 'University / Institution',
        location: edu.location || undefined,
        year: yearStr
      }
    })
  } else if (Array.isArray(userProfile.education) && userProfile.education.length > 0) {
    education = userProfile.education
  } else {
    education = defaultResumeData.education
  }

  // 5. Skills
  let skills: ResumeSkillCategory[] = []
  if (Array.isArray(master.skills) && master.skills.length > 0) {
    skills = master.skills.map((s: any) => {
      if (typeof s === 'string') {
        return { category: 'Core Skills', items: [s] }
      }
      if (s && typeof s === 'object' && Array.isArray(s.items)) {
        return { category: s.category || 'Skills', items: s.items.filter(Boolean) }
      }
      if (s && typeof s === 'object' && s.name) {
        return { category: s.category || 'Skills', items: [s.name] }
      }
      return { category: 'Skills', items: [] }
    }).filter((cat: ResumeSkillCategory) => cat.items.length > 0)
  }

  if (skills.length === 0 && Array.isArray(userProfile.skills) && userProfile.skills.length > 0) {
    skills = userProfile.skills
  }

  if (skills.length === 0) {
    skills = defaultResumeData.skills
  }

  // 6. Certifications
  let certifications: ResumeCertification[] = []
  if (Array.isArray(master.certifications) && master.certifications.length > 0) {
    certifications = master.certifications.map((cert: any) => ({
      name: cert.name || 'Certification',
      issuer: cert.issuer || cert.organization || 'Issuing Body',
      year: cert.issueDate || cert.year || ''
    }))
  } else if (Array.isArray(userProfile.certifications) && userProfile.certifications.length > 0) {
    certifications = userProfile.certifications
  } else {
    certifications = defaultResumeData.certifications
  }

  return {
    profileData,
    resumeData: {
      resume_type: isC2C ? 'c2c' : 'full-time',
      summary,
      skills,
      experience,
      education,
      certifications
    }
  }
}
