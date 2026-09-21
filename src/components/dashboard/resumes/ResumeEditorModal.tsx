'use client'

import React, { useEffect, useState, useRef } from 'react'
import {
  X,
  Save,
  Download,
  FileText,
  Type,
  Palette,
  Layout,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Check,
  Loader2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Eye,
  Sliders,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  CaseSensitive,
  Mail,
  Phone,
  MapPin,
  Globe,
  Layers,
  CheckCircle2,
  Copy,
  Edit3,
  RotateCcw,
  Sparkle,
  HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/utils/supabase/client'
import { exportToPdf } from '@/utils/exportPdf'
import { getTemplateById, RESUME_TEMPLATES } from '@/components/create-resume/templates/registry'
import { downloadResumeDocx } from '@/components/create-resume/exportDocx'
import { ResumeRow } from './ResumeGrid'
import { SectionStyleConfig } from '@/components/create-resume/templates/types'
import { toast } from 'react-hot-toast'
import { cn } from '@/utils/cn'

interface ResumeEditorModalProps {
  resume: ResumeRow | null
  onClose: () => void
  onSaved?: () => void
}

type EditorTab = 'style' | 'personal' | 'summary' | 'skills' | 'experience' | 'education' | 'certifications'

const FONT_MODELS = [
  { id: 'calibri', name: 'Calibri', family: 'Calibri, Arial, sans-serif', category: 'Sans-Serif (Standard)', preview: 'Modern & Clean ATS Standard' },
  { id: 'inter', name: 'Inter', family: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', category: 'Modern Sans', preview: 'High-Tech & Contemporary' },
  { id: 'roboto', name: 'Roboto', family: 'Roboto, "Helvetica Neue", Arial, sans-serif', category: 'Tech Sans', preview: 'Crisp & Highly Readable' },
  { id: 'arial', name: 'Arial', family: 'Arial, Helvetica, sans-serif', category: 'Standard ATS', preview: 'Universal Compatibility' },
  { id: 'times', name: 'Times New Roman', family: '"Times New Roman", Times, serif', category: 'Classic Serif', preview: 'Formal & Traditional' },
  { id: 'garamond', name: 'EB Garamond', family: '"EB Garamond", Garamond, Georgia, serif', category: 'Executive Serif', preview: 'Distinguished & Elegant' },
  { id: 'georgia', name: 'Georgia', family: 'Georgia, serif', category: 'Warm Serif', preview: 'Sophisticated Editorial' },
  { id: 'outfit', name: 'Outfit', family: 'Outfit, -apple-system, sans-serif', category: 'Modern Geometric', preview: 'Bold & Striking' },
  { id: 'jakarta', name: 'Plus Jakarta Sans', family: '"Plus Jakarta Sans", sans-serif', category: 'Premium Sans', preview: 'Polished Startup Style' },
  { id: 'trebuchet', name: 'Trebuchet MS', family: '"Trebuchet MS", "Lucida Grande", sans-serif', category: 'Humanist Sans', preview: 'Vibrant & Structured' },
]

const COLOR_PALETTES = [
  { name: 'Emerald Green', hex: '#2E8B57', description: 'Tech & Growth' },
  { name: 'Executive Navy', hex: '#1E3A8A', description: 'Corporate & Finance' },
  { name: 'Midnight Slate', hex: '#0F172A', description: 'Modern Dark' },
  { name: 'Royal Indigo', hex: '#4338CA', description: 'Engineering & Innovation' },
  { name: 'Crimson Burgundy', hex: '#991B1B', description: 'Executive Leadership' },
  { name: 'Modern Teal', hex: '#0D9488', description: 'Creative & Product' },
  { name: 'Deep Purple', hex: '#6D28D9', description: 'Design & Analytics' },
  { name: 'Warm Amber', hex: '#D97706', description: 'Energetic & Impactful' },
  { name: 'Classic Charcoal', hex: '#374151', description: 'Neutral Professional' },
  { name: 'Pure ATS Black', hex: '#000000', description: 'Strict ATS Standard' },
]

const FONT_SIZES = ['8pt', '8.5pt', '9pt', '9.5pt', '10pt', '10.5pt', '11pt', '12pt', '14pt', '18pt', '22pt']

const SECTION_LABELS: Record<string, { title: string; tab: EditorTab; icon: any }> = {
  header: { title: 'Header & Contact Information', tab: 'personal', icon: User },
  summary: { title: 'Professional Summary', tab: 'summary', icon: AlignLeft },
  skills: { title: 'Technical Skills Matrix', tab: 'skills', icon: Sparkles },
  experience: { title: 'Work Experience & Roles', tab: 'experience', icon: Briefcase },
  education: { title: 'Education & Academics', tab: 'education', icon: GraduationCap },
  certifications: { title: 'Certifications & Credentials', tab: 'certifications', icon: Award },
}

export function ResumeEditorModal({ resume, onClose, onSaved }: ResumeEditorModalProps) {
  const [activeTab, setActiveTab] = useState<EditorTab>('style')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isDownloadingDocx, setIsDownloadingDocx] = useState(false)

  // Styling state
  const [selectedTemplateId, setSelectedTemplateId] = useState('modern')
  const [selectedFontFamily, setSelectedFontFamily] = useState('Calibri, Arial, sans-serif')
  const [themeColor, setThemeColor] = useState('#2E8B57')
  const [customColor, setCustomColor] = useState('#2E8B57')

  // Section-specific style customization
  const [selectedSectionKey, setSelectedSectionKey] = useState<string | null>(null)
  const [sectionStyles, setSectionStyles] = useState<Record<string, SectionStyleConfig>>({})

  // Resume Content state
  const [profileData, setProfileData] = useState<any>({
    full_name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    work_authorization: '',
    relocation: '',
    availability: '',
  })

  const [resumeData, setResumeData] = useState<any>({
    summary: [],
    skills: [],
    experience: [],
    education: [],
    certifications: [],
  })

  const [resumeTitle, setResumeTitle] = useState('')
  const [atsScore, setAtsScore] = useState<number>(0)
  
  const isC2C = String((resume as any)?.type || (resume as any)?.resume_type || '').toLowerCase().includes('c2c')

  // Zoom & scaling
  const [zoom, setZoom] = useState(1)
  const [autoScale, setAutoScale] = useState(0.72)
  const printRef = useRef<HTMLDivElement>(null)
  const previewContainerRef = useRef<HTMLDivElement>(null)

  const [isExportingPdf, setIsExportingPdf] = useState(false)

  const handlePrint = async () => {
    if (!printRef.current) {
      toast.error('No resume data available to export.')
      return
    }
    setIsExportingPdf(true)
    const toastId = toast.loading('Generating PDF...')
    try {
      const fileName = `${(profileData?.full_name || 'Resume').replace(/\s+/g, '_')}_Tailored_Resume.pdf`
      await exportToPdf(printRef.current, fileName)
      toast.success('PDF downloaded successfully!', { id: toastId })
    } catch (error) {
      console.error('PDF export failed:', error)
      toast.error('Failed to generate PDF. Please try again.', { id: toastId })
    } finally {
      setIsExportingPdf(false)
    }
  }

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedSectionKey) {
          setSelectedSectionKey(null)
        } else {
          onClose()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, selectedSectionKey])

  // Fetch initial data
  useEffect(() => {
    if (!resume) return
    let isMounted = true
    setLoading(true)

    async function loadData() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        // 1. Fetch user profile
        let userProfile: any = {
          full_name: 'Balaji Rockzzz',
          email: '',
          phone: '',
          location: '',
          linkedin: '',
        }

        if (user) {
          const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single()
          if (prof) {
            const pInfo = prof.master_resume_data?.personal_info || {}
            const fullName = prof.full_name || `${pInfo.firstName || ''} ${pInfo.lastName || ''}`.trim() || pInfo.fullName || 'Balaji Rockzzz'
            userProfile = {
              ...prof,
              full_name: fullName,
              email: prof.email || pInfo.email || '',
              phone: prof.phone || pInfo.phone || '',
              location: pInfo.location || prof.location || '',
              linkedin: pInfo.linkedin || prof.linkedin || '',
              work_authorization: pInfo.workAuthorization || pInfo.work_authorization || '',
              relocation: pInfo.relocation || '',
              availability: pInfo.availability || ''
            }
          }
        }

        // 2. Fetch sections for this resume
        const { data: sections } = await supabase
          .from('resume_sections')
          .select('section_type, content')
          .eq('resume_id', resume!.id)

        const reconstructed: any = {
          summary: [],
          skills: [],
          experience: [],
          education: [],
          certifications: []
        }

        if (sections && sections.length > 0) {
          sections.forEach((sec: any) => {
            const key = sec.section_type.toLowerCase()
            reconstructed[key] = sec.content
          })
        }

        // 3. Extract ATS Score
        let score = Array.isArray(resume!.ats_analyses)
          ? resume!.ats_analyses[0]?.overall_score
          : (resume!.ats_analyses as any)?.overall_score

        if (!score || score <= 0) {
          // No ATS score yet - show 0 so UI displays "Analyzing..."
          score = 0
        }

        const initialTemplate = (resume as any).templateId || (resume as any).template_id || (isC2C ? 'c2c-modern' : 'modern')
        const initialColor = (resume as any).theme_color || '#2E8B57'
        const initialFont = (resume as any).font_family || 'Calibri, Arial, sans-serif'
        const initialSectionStyles = (resume as any).section_styles || {}

        if (isMounted) {
          setProfileData(userProfile)
          setResumeData(reconstructed)
          setResumeTitle(resume!.title || 'Tailored Resume')
          setSelectedTemplateId(initialTemplate)
          setThemeColor(initialColor)
          setCustomColor(initialColor)
          setSelectedFontFamily(initialFont)
          setSectionStyles(initialSectionStyles)
          setAtsScore(score)
          setLoading(false)
        }
      } catch (err) {
        console.error('Failed to load resume for editor:', err)
        if (isMounted) setLoading(false)
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [resume])

  // Compute container scale for preview canvas
  useEffect(() => {
    if (!resume) return
    const updateScale = () => {
      if (previewContainerRef.current) {
        const availableWidth = previewContainerRef.current.clientWidth - 48
        if (availableWidth > 0) {
          const scale = Math.min(1, Math.max(0.35, Number((availableWidth / 814).toFixed(2))))
          setAutoScale(scale)
        }
      }
    }
    const timeoutId = setTimeout(updateScale, 80)
    window.addEventListener('resize', updateScale)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', updateScale)
    }
  }, [resume, loading, activeTab])

  // Save changes to Supabase
  const handleSaveChanges = async () => {
    if (!resume) return
    setSaving(true)
    try {
      const supabase = createClient()

      // 1. Delete existing sections and insert updated ones
      const sectionsToSave = [
        { resume_id: resume.id, section_type: 'Summary', content: resumeData.summary },
        { resume_id: resume.id, section_type: 'Skills', content: resumeData.skills },
        { resume_id: resume.id, section_type: 'Experience', content: resumeData.experience },
        { resume_id: resume.id, section_type: 'Education', content: resumeData.education },
        { resume_id: resume.id, section_type: 'Certifications', content: resumeData.certifications }
      ]

      await supabase.from('resume_sections').delete().eq('resume_id', resume.id)
      const { error: insertErr } = await supabase.from('resume_sections').insert(sectionsToSave)
      if (insertErr) throw insertErr

      // 2. Update resume metadata — including template, theme color, font, and section styles
      // These are saved so the exact edited state is preserved for preview and download
      const { error: updateErr } = await supabase
        .from('resumes_v2')
        .update({
          title: resumeTitle.trim() || resume.title,
          template_id: selectedTemplateId,
          theme_color: themeColor,
          font_family: selectedFontFamily,
          section_styles: Object.keys(sectionStyles).length > 0 ? sectionStyles : null,
          updated_at: new Date().toISOString()
        })
        .eq('id', resume.id)

      if (updateErr) throw updateErr

      toast.success('Resume saved successfully!')
      onSaved?.()
    } catch (err: any) {
      console.error('Save failed:', err)
      toast.error(err.message || 'Failed to save resume changes')
    } finally {
      setSaving(false)
    }
  }

  const handleDownloadDocx = async () => {
    if (!resumeData) return
    setIsDownloadingDocx(true)
    try {
      const fileName = `${(profileData?.full_name || 'Resume').replace(/\s+/g, '_')}_Resume.docx`
      await downloadResumeDocx(resumeData, profileData, fileName)
      toast.success('Word document downloaded!')
    } catch (err) {
      console.error('Docx export error:', err)
      toast.error('Failed to export DOCX')
    } finally {
      setIsDownloadingDocx(false)
    }
  }

  // Floating Section Style Helpers
  const currentSectionStyle: SectionStyleConfig = selectedSectionKey
    ? sectionStyles[selectedSectionKey] || {}
    : {}

  const updateSelectedSectionStyle = (patch: Partial<SectionStyleConfig>) => {
    if (!selectedSectionKey) return
    setSectionStyles(prev => ({
      ...prev,
      [selectedSectionKey]: {
        ...(prev[selectedSectionKey] || {}),
        ...patch
      }
    }))
  }

  const handleApplyStyleToAll = () => {
    if (!selectedSectionKey) return
    const current = sectionStyles[selectedSectionKey] || {}
    if (current.fontFamily) setSelectedFontFamily(current.fontFamily)
    if (current.color) setThemeColor(current.color)

    const allKeys = ['header', 'summary', 'skills', 'experience', 'education', 'certifications']
    const updated: Record<string, SectionStyleConfig> = {}
    allKeys.forEach(k => {
      updated[k] = { ...current }
    })
    setSectionStyles(updated)
    toast.success('Applied typography and color style across all sections!')
  }

  const handleResetSectionStyle = () => {
    if (!selectedSectionKey) return
    setSectionStyles(prev => {
      const copy = { ...prev }
      delete copy[selectedSectionKey]
      return copy
    })
    toast.success('Reset section style to template default')
  }

  if (!resume) return null

  const template = getTemplateById(selectedTemplateId)
  const TemplateComponent = template.component

  const effectiveScale = Number((autoScale * zoom).toFixed(2))
  const horizontalMargin = (794 * effectiveScale - 794) / 2

  // Summary helper text
  const summaryText = Array.isArray(resumeData.summary)
    ? resumeData.summary.join('\n\n')
    : typeof resumeData.summary === 'string'
    ? resumeData.summary
    : ''

  const handleSummaryChange = (val: string) => {
    const lines = val.split('\n').map(s => s.trim()).filter(Boolean)
    setResumeData((prev: any) => ({
      ...prev,
      summary: lines.length > 0 ? lines : [val]
    }))
  }

  // Skills helpers
  const handleAddSkillCategory = () => {
    setResumeData((prev: any) => ({
      ...prev,
      skills: [...(prev.skills || []), { category: 'New Category', items: ['Skill 1', 'Skill 2'] }]
    }))
  }

  const handleUpdateSkillCategoryName = (catIndex: number, newName: string) => {
    const updated = [...(resumeData.skills || [])]
    if (updated[catIndex]) {
      updated[catIndex] = { ...updated[catIndex], category: newName }
      setResumeData((prev: any) => ({ ...prev, skills: updated }))
    }
  }

  const handleUpdateSkillItems = (catIndex: number, itemsString: string) => {
    const updated = [...(resumeData.skills || [])]
    if (updated[catIndex]) {
      const items = itemsString.split(',').map(s => s.trim()).filter(Boolean)
      updated[catIndex] = { ...updated[catIndex], items }
      setResumeData((prev: any) => ({ ...prev, skills: updated }))
    }
  }

  const handleDeleteSkillCategory = (catIndex: number) => {
    const updated = [...(resumeData.skills || [])].filter((_, i) => i !== catIndex)
    setResumeData((prev: any) => ({ ...prev, skills: updated }))
  }

  // Experience helpers
  const handleAddExperience = () => {
    const newExp = {
      role: 'Software Engineer',
      company: 'Company Name',
      location: 'City, State',
      duration: '2022 - Present',
      environment: ['React', 'TypeScript', 'Node.js'],
      bullets: [
        'Engineered scalable full-stack features boosting application responsiveness by 30%.',
        'Collaborated with cross-functional teams to deliver enterprise features on schedule.'
      ]
    }
    setResumeData((prev: any) => ({
      ...prev,
      experience: [newExp, ...(prev.experience || [])]
    }))
  }

  const handleUpdateExperience = (index: number, field: string, value: any) => {
    const updated = [...(resumeData.experience || [])]
    if (updated[index]) {
      updated[index] = { ...updated[index], [field]: value }
      setResumeData((prev: any) => ({ ...prev, experience: updated }))
    }
  }

  const handleDeleteExperience = (index: number) => {
    const updated = [...(resumeData.experience || [])].filter((_, i) => i !== index)
    setResumeData((prev: any) => ({ ...prev, experience: updated }))
  }

  const handleAddBullet = (expIndex: number) => {
    const updated = [...(resumeData.experience || [])]
    if (updated[expIndex]) {
      const bullets = [...(updated[expIndex].bullets || []), 'Led key initiative improving system reliability and performance.']
      updated[expIndex] = { ...updated[expIndex], bullets }
      setResumeData((prev: any) => ({ ...prev, experience: updated }))
    }
  }

  const handleUpdateBullet = (expIndex: number, bulletIndex: number, text: string) => {
    const updated = [...(resumeData.experience || [])]
    if (updated[expIndex]) {
      const bullets = [...(updated[expIndex].bullets || [])]
      bullets[bulletIndex] = text
      updated[expIndex] = { ...updated[expIndex], bullets }
      setResumeData((prev: any) => ({ ...prev, experience: updated }))
    }
  }

  const handleDeleteBullet = (expIndex: number, bulletIndex: number) => {
    const updated = [...(resumeData.experience || [])]
    if (updated[expIndex]) {
      const bullets = [...(updated[expIndex].bullets || [])].filter((_, i) => i !== bulletIndex)
      updated[expIndex] = { ...updated[expIndex], bullets }
      setResumeData((prev: any) => ({ ...prev, experience: updated }))
    }
  }

  // Education helpers
  const handleAddEducation = () => {
    const newEdu = {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University Name',
      location: 'City, State',
      year: '2020'
    }
    setResumeData((prev: any) => ({
      ...prev,
      education: [...(prev.education || []), newEdu]
    }))
  }

  const handleUpdateEducation = (index: number, field: string, value: string) => {
    const updated = [...(resumeData.education || [])]
    if (updated[index]) {
      updated[index] = { ...updated[index], [field]: value }
      setResumeData((prev: any) => ({ ...prev, education: updated }))
    }
  }

  const handleDeleteEducation = (index: number) => {
    const updated = [...(resumeData.education || [])].filter((_, i) => i !== index)
    setResumeData((prev: any) => ({ ...prev, education: updated }))
  }

  // Certifications helpers
  const handleAddCert = () => {
    const newCert = {
      name: 'AWS Certified Solutions Architect - Associate',
      issuer: 'Amazon Web Services (AWS)',
      year: '2024'
    }
    setResumeData((prev: any) => ({
      ...prev,
      certifications: [...(prev.certifications || []), newCert]
    }))
  }

  const handleUpdateCert = (index: number, field: string, value: string) => {
    const updated = [...(resumeData.certifications || [])]
    if (updated[index]) {
      updated[index] = { ...updated[index], [field]: value }
      setResumeData((prev: any) => ({ ...prev, certifications: updated }))
    }
  }

  const handleDeleteCert = (index: number) => {
    const updated = [...(resumeData.certifications || [])].filter((_, i) => i !== index)
    setResumeData((prev: any) => ({ ...prev, certifications: updated }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-[1580px] h-[95vh] max-h-[1020px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header / Action Toolbar */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center shrink-0 shadow-xs">
              <Sliders className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                  className="text-[16px] font-black text-slate-900 dark:text-slate-100 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-primary focus:outline-hidden px-1 py-0.5 rounded transition-all max-w-[320px] truncate"
                  title="Click to rename resume"
                  placeholder="Resume Title"
                />
                <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 px-2 py-0.5 rounded-md text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {atsScore > 0 ? `${atsScore}% ATS Match` : 'Analyzing...'}
                </span>
              </div>
              <p className="text-[11.5px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1.5 mt-0.5">
                <span>In-Place Resume Studio</span>
                <span>•</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{template.name}</span>
                <span>•</span>
                <span>{FONT_MODELS.find(f => f.family === selectedFontFamily)?.name || 'Custom Font'}</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Download Word DOCX */}
            <Button
              onClick={handleDownloadDocx}
              disabled={isDownloadingDocx || loading}
              variant="outline"
              className="h-9 px-3.5 rounded-xl border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 text-[12px] font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              {isDownloadingDocx ? <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" /> : <FileText className="w-3.5 h-3.5 text-slate-500" />}
              <span className="hidden md:inline">Word</span>
            </Button>

            {/* Download PDF */}
            <Button
              onClick={handlePrint}
              disabled={isExportingPdf || isDownloadingDocx}
              className="gap-2 h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
            >
              {isExportingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span className="hidden sm:inline">Download PDF</span>
            </Button>

            {/* Save Changes Button */}
            <Button
              onClick={handleSaveChanges}
              disabled={saving || loading}
              className="h-9 px-4.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </Button>

            {/* Close */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1 cursor-pointer"
              title="Close Editor (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Split Layout: Left Controls + Right Live Canvas */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* LEFT PANEL: Navigation Tabs + Interactive Section Editors */}
          <div className="w-full lg:w-[46%] xl:w-[42%] flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
            {/* Tab Navigation Pill Bar */}
            <div className="px-4 py-2.5 bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setActiveTab('style')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[12px] font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer",
                  activeTab === 'style'
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700"
                )}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Style & Fonts</span>
              </button>

              <button
                onClick={() => setActiveTab('personal')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[12px] font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer",
                  activeTab === 'personal'
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700"
                )}
              >
                <User className="w-3.5 h-3.5" />
                <span>Contact Info</span>
              </button>

              <button
                onClick={() => setActiveTab('summary')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[12px] font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer",
                  activeTab === 'summary'
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700"
                )}
              >
                <AlignLeft className="w-3.5 h-3.5" />
                <span>Summary</span>
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[12px] font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer",
                  activeTab === 'skills'
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700"
                )}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Skills</span>
              </button>

              <button
                onClick={() => setActiveTab('experience')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[12px] font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer",
                  activeTab === 'experience'
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700"
                )}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Experience</span>
              </button>

              <button
                onClick={() => setActiveTab('education')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[12px] font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer",
                  activeTab === 'education'
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700"
                )}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Education</span>
              </button>

              <button
                onClick={() => setActiveTab('certifications')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[12px] font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer",
                  activeTab === 'certifications'
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700"
                )}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Certs</span>
              </button>
            </div>

            {/* Tab Body Content */}
            <div className="flex-1 p-5 overflow-y-auto space-y-6 scrollbar-thin">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[350px] text-slate-500 gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                  <p className="text-[13px] font-semibold">Loading resume details...</p>
                </div>
              ) : activeTab === 'style' ? (
                /* ================= STYLE & TYPOGRAPHY ================= */
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* TEMPLATE SELECTION */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[13px] font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                        <Layout className="w-4 h-4 text-emerald-600" />
                        <span>Resume Template</span>
                      </label>
                      <span className="text-[11px] font-medium text-slate-500">Change your layout instantly</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {RESUME_TEMPLATES.filter(t => 
                        isC2C ? t.id.startsWith('c2c') : !t.id.startsWith('c2c')
                      ).map((template) => {
                        const isSelected = selectedTemplateId === template.id
                        return (
                          <div
                            key={template.id}
                            onClick={() => setSelectedTemplateId(template.id)}
                            className={cn(
                              "p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between",
                              isSelected
                                ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-600 ring-2 ring-emerald-500/20"
                                : "bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                            )}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[13px] font-bold text-slate-900 dark:text-slate-100">
                                {template.name}
                              </span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 font-black" />}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                              {template.description}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* FONT MODEL / FAMILY */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[13px] font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                        <Type className="w-4 h-4 text-emerald-600" />
                        <span>Font Model & Family</span>
                      </label>
                      <span className="text-[11px] font-medium text-slate-500">Applies across entire resume</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {FONT_MODELS.map((font) => {
                        const isSelected = selectedFontFamily === font.family
                        return (
                          <div
                            key={font.id}
                            onClick={() => setSelectedFontFamily(font.family)}
                            className={cn(
                              "p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between",
                              isSelected
                                ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-600 ring-2 ring-emerald-500/20"
                                : "bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                            )}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[13px] font-bold text-slate-900 dark:text-slate-100" style={{ fontFamily: font.family }}>
                                {font.name}
                              </span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 font-black" />}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate" style={{ fontFamily: font.family }}>
                              {font.preview}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* FONT & THEME ACCENT COLOR */}
                  <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <label className="text-[13px] font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                        <Palette className="w-4 h-4 text-emerald-600" />
                        <span>Font / Theme Accent Colour</span>
                      </label>
                      <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400">{themeColor}</span>
                    </div>

                    {/* Color Swatch Grid */}
                    <div className="grid grid-cols-5 gap-2.5">
                      {COLOR_PALETTES.map((color) => {
                        const isSelected = themeColor.toLowerCase() === color.hex.toLowerCase()
                        return (
                          <button
                            key={color.hex}
                            type="button"
                            onClick={() => {
                              setThemeColor(color.hex)
                              setCustomColor(color.hex)
                            }}
                            className={cn(
                              "h-11 rounded-xl flex items-center justify-center relative transition-all group cursor-pointer shadow-2xs",
                              isSelected ? "ring-2 ring-offset-2 ring-emerald-500 scale-105" : "hover:scale-102"
                            )}
                            style={{ backgroundColor: color.hex }}
                            title={`${color.name} (${color.description})`}
                          >
                            {isSelected && <Check className="w-4 h-4 text-white drop-shadow-md font-black" />}
                          </button>
                        )
                      })}
                    </div>

                    {/* Custom Hex Color Picker */}
                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700">
                      <input
                        type="color"
                        value={customColor}
                        onChange={(e) => {
                          setCustomColor(e.target.value)
                          setThemeColor(e.target.value)
                        }}
                        className="w-8 h-8 rounded-lg border-0 cursor-pointer bg-transparent"
                        title="Choose custom color"
                      />
                      <div className="flex-1">
                        <div className="text-[12px] font-bold text-slate-800 dark:text-slate-200">Custom Accent Color</div>
                        <div className="text-[10.5px] text-slate-500">Pick any custom HEX branding color</div>
                      </div>
                      <input
                        type="text"
                        value={themeColor}
                        onChange={(e) => {
                          setThemeColor(e.target.value)
                          setCustomColor(e.target.value)
                        }}
                        className="w-24 px-2.5 py-1 text-[12px] font-mono font-bold uppercase bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-center"
                        maxLength={7}
                      />
                    </div>
                  </div>

                  {/* TEMPLATE SELECTOR */}
                  <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <label className="text-[13px] font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                        <Layout className="w-4 h-4 text-emerald-600" />
                        <span>Resume Layout Template</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {RESUME_TEMPLATES.map((tmpl) => {
                        const isSelected = selectedTemplateId === tmpl.id
                        return (
                          <div
                            key={tmpl.id}
                            onClick={async () => {
                              setSelectedTemplateId(tmpl.id)
                              // Save to DB
                              if (resume?.id) {
                                const client = createClient()
                                await client.from('resumes_v2').update({ template_id: tmpl.id }).eq('id', resume.id)
                              }
                            }}
                            className={cn(
                              "p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between",
                              isSelected
                                ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-600 ring-2 ring-emerald-500/20"
                                : "bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                            )}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[12.5px] font-bold text-slate-900 dark:text-slate-100">{tmpl.name}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 font-black" />}
                            </div>
                            <p className="text-[10.5px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                              {tmpl.description}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ) : activeTab === 'personal' ? (
                /* ================= CONTACT INFO ================= */
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="text-[13px] font-bold text-slate-900 dark:text-slate-100 mb-1">
                    Contact & Personal Information
                  </div>

                  <div>
                    <label className="block text-[11.5px] font-bold text-slate-600 dark:text-slate-400 mb-1">Full Candidate Name</label>
                    <input
                      type="text"
                      value={profileData.full_name || ''}
                      onChange={(e) => setProfileData((p: any) => ({ ...p, full_name: e.target.value }))}
                      className="w-full px-3 py-2 text-[13px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-primary focus:outline-hidden"
                      placeholder="e.g. Balaji Rockzzz"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11.5px] font-bold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>Email Address</span>
                      </label>
                      <input
                        type="email"
                        value={profileData.email || ''}
                        onChange={(e) => setProfileData((p: any) => ({ ...p, email: e.target.value }))}
                        className="w-full px-3 py-2 text-[13px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-primary focus:outline-hidden"
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[11.5px] font-bold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>Phone Number</span>
                      </label>
                      <input
                        type="tel"
                        value={profileData.phone || ''}
                        onChange={(e) => setProfileData((p: any) => ({ ...p, phone: e.target.value }))}
                        className="w-full px-3 py-2 text-[13px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-primary focus:outline-hidden"
                        placeholder="+1 (555) 019-2834"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11.5px] font-bold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>Location (City, State)</span>
                      </label>
                      <input
                        type="text"
                        value={profileData.location || ''}
                        onChange={(e) => setProfileData((p: any) => ({ ...p, location: e.target.value }))}
                        className="w-full px-3 py-2 text-[13px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-primary focus:outline-hidden"
                        placeholder="Austin, TX"
                      />
                    </div>
                    <div>
                      <label className="block text-[11.5px] font-bold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5 text-slate-400" />
                        <span>LinkedIn Profile URL</span>
                      </label>
                      <input
                        type="text"
                        value={profileData.linkedin || ''}
                        onChange={(e) => setProfileData((p: any) => ({ ...p, linkedin: e.target.value }))}
                        className="w-full px-3 py-2 text-[13px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-primary focus:outline-hidden"
                        placeholder="linkedin.com/in/balajirockzzz"
                      />
                    </div>
                  </div>

                  {/* C2C / Contractor specifics if needed */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Work Auth</label>
                      <input
                        type="text"
                        value={profileData.work_authorization || ''}
                        onChange={(e) => setProfileData((p: any) => ({ ...p, work_authorization: e.target.value }))}
                        className="w-full px-2.5 py-1.5 text-[12px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                        placeholder="US Citizen / Green Card"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Relocation</label>
                      <input
                        type="text"
                        value={profileData.relocation || ''}
                        onChange={(e) => setProfileData((p: any) => ({ ...p, relocation: e.target.value }))}
                        className="w-full px-2.5 py-1.5 text-[12px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                        placeholder="Open / Remote"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Availability</label>
                      <input
                        type="text"
                        value={profileData.availability || ''}
                        onChange={(e) => setProfileData((p: any) => ({ ...p, availability: e.target.value }))}
                        className="w-full px-2.5 py-1.5 text-[12px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                        placeholder="Immediate / 2 Weeks"
                      />
                    </div>
                  </div>
                </div>
              ) : activeTab === 'summary' ? (
                /* ================= SUMMARY ================= */
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[13px] font-bold text-slate-900 dark:text-slate-100">Professional Summary</h4>
                      <p className="text-[11px] text-slate-500">Edit summary paragraph or separate into bullet points</p>
                    </div>
                  </div>

                  <textarea
                    rows={8}
                    value={summaryText}
                    onChange={(e) => handleSummaryChange(e.target.value)}
                    className="w-full p-3.5 text-[13px] leading-relaxed bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-primary focus:outline-hidden font-sans"
                    placeholder="Enter an impactful executive summary highlighting your core expertise, years of experience, and signature technical achievements..."
                  />

                  <div className="p-3 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 rounded-xl text-[12px] text-emerald-800 dark:text-emerald-300">
                    💡 <strong>Pro-Tip:</strong> Use bolding with double asterisks like <code className="bg-white/80 px-1 py-0.5 rounded font-mono text-[11px]">**React & TypeScript**</code> to emphasize high-impact keywords.
                  </div>
                </div>
              ) : activeTab === 'skills' ? (
                /* ================= SKILLS ================= */
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[13px] font-bold text-slate-900 dark:text-slate-100">Skills Matrix</h4>
                      <p className="text-[11px] text-slate-500">Organize skills by category (comma-separated items)</p>
                    </div>
                    <Button
                      onClick={handleAddSkillCategory}
                      size="sm"
                      className="h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11.5px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Category</span>
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {(resumeData.skills || []).map((skillGroup: any, idx: number) => (
                      <div key={idx} className="p-3.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={skillGroup.category || ''}
                            onChange={(e) => handleUpdateSkillCategoryName(idx, e.target.value)}
                            className="font-bold text-[13px] text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-lg focus:border-primary focus:outline-hidden w-full max-w-[240px]"
                            placeholder="Category Name (e.g. Frontend)"
                          />
                          <button
                            onClick={() => handleDeleteSkillCategory(idx)}
                            className="text-slate-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                            title="Delete Category"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div>
                          <input
                            type="text"
                            value={Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items || ''}
                            onChange={(e) => handleUpdateSkillItems(idx, e.target.value)}
                            className="w-full text-[12.5px] text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg focus:border-primary focus:outline-hidden"
                            placeholder="React, Next.js, TypeScript, TailwindCSS (comma-separated)"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : activeTab === 'experience' ? (
                /* ================= EXPERIENCE ================= */
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[13px] font-bold text-slate-900 dark:text-slate-100">Work Experience</h4>
                      <p className="text-[11px] text-slate-500">Roles, company details, and achievement bullets</p>
                    </div>
                    <Button
                      onClick={handleAddExperience}
                      size="sm"
                      className="h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11.5px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Role</span>
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {(resumeData.experience || []).map((exp: any, expIdx: number) => (
                      <div key={expIdx} className="p-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3">
                        <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-2.5">
                          <span className="text-[12px] font-black uppercase text-emerald-700 dark:text-emerald-400">
                            Role #{expIdx + 1}
                          </span>
                          <button
                            onClick={() => handleDeleteExperience(expIdx)}
                            className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                            title="Delete this role"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Job Title</label>
                            <input
                              type="text"
                              value={exp.role || ''}
                              onChange={(e) => handleUpdateExperience(expIdx, 'role', e.target.value)}
                              className="w-full px-2.5 py-1.5 text-[12.5px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                              placeholder="Senior Software Engineer"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Company Name</label>
                            <input
                              type="text"
                              value={exp.company || ''}
                              onChange={(e) => handleUpdateExperience(expIdx, 'company', e.target.value)}
                              className="w-full px-2.5 py-1.5 text-[12.5px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                              placeholder="Tech Innovators Inc."
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Location</label>
                            <input
                              type="text"
                              value={exp.location || ''}
                              onChange={(e) => handleUpdateExperience(expIdx, 'location', e.target.value)}
                              className="w-full px-2.5 py-1.5 text-[12.5px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                              placeholder="San Francisco, CA"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Duration</label>
                            <input
                              type="text"
                              value={exp.duration || ''}
                              onChange={(e) => handleUpdateExperience(expIdx, 'duration', e.target.value)}
                              className="w-full px-2.5 py-1.5 text-[12.5px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                              placeholder="03/2021 – Present"
                            />
                          </div>
                        </div>

                        {/* Bullets List */}
                        <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-slate-700">
                          <div className="flex items-center justify-between">
                            <span className="text-[11.5px] font-bold text-slate-700 dark:text-slate-300">Bullet Points</span>
                            <button
                              onClick={() => handleAddBullet(expIdx)}
                              className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Bullet</span>
                            </button>
                          </div>

                          {(exp.bullets || []).map((bullet: string, bIdx: number) => (
                            <div key={bIdx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 shrink-0" />
                              <textarea
                                rows={2}
                                value={bullet}
                                onChange={(e) => handleUpdateBullet(expIdx, bIdx, e.target.value)}
                                className="flex-1 p-2 text-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:border-primary focus:outline-hidden"
                              />
                              <button
                                onClick={() => handleDeleteBullet(expIdx, bIdx)}
                                className="text-slate-400 hover:text-red-500 p-1 transition-colors cursor-pointer mt-1"
                                title="Remove bullet"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : activeTab === 'education' ? (
                /* ================= EDUCATION ================= */
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[13px] font-bold text-slate-900 dark:text-slate-100">Education</h4>
                      <p className="text-[11px] text-slate-500">Degrees, academic institutions, and graduation years</p>
                    </div>
                    <Button
                      onClick={handleAddEducation}
                      size="sm"
                      className="h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11.5px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Degree</span>
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {(resumeData.education || []).map((edu: any, idx: number) => (
                      <div key={idx} className="p-3.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={edu.degree || ''}
                            onChange={(e) => handleUpdateEducation(idx, 'degree', e.target.value)}
                            className="font-bold text-[13px] text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-lg focus:border-primary focus:outline-hidden w-full max-w-[280px]"
                            placeholder="Bachelor of Science in Computer Science"
                          />
                          <button
                            onClick={() => handleDeleteEducation(idx)}
                            className="text-slate-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                            title="Delete Entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={edu.institution || ''}
                            onChange={(e) => handleUpdateEducation(idx, 'institution', e.target.value)}
                            className="text-[12.5px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 rounded-lg focus:border-primary focus:outline-hidden"
                            placeholder="University / College Name"
                          />
                          <input
                            type="text"
                            value={edu.year || ''}
                            onChange={(e) => handleUpdateEducation(idx, 'year', e.target.value)}
                            className="text-[12.5px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 rounded-lg focus:border-primary focus:outline-hidden"
                            placeholder="Graduation Year (e.g. 2020)"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* ================= CERTIFICATIONS ================= */
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[13px] font-bold text-slate-900 dark:text-slate-100">Certifications & Licenses</h4>
                      <p className="text-[11px] text-slate-500">Industry credentials, certifications, and issuing organizations</p>
                    </div>
                    <Button
                      onClick={handleAddCert}
                      size="sm"
                      className="h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11.5px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Credential</span>
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {(resumeData.certifications || []).map((cert: any, idx: number) => (
                      <div key={idx} className="p-3.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={cert.name || ''}
                            onChange={(e) => handleUpdateCert(idx, 'name', e.target.value)}
                            className="font-bold text-[13px] text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-lg focus:border-primary focus:outline-hidden w-full max-w-[280px]"
                            placeholder="Certification Name"
                          />
                          <button
                            onClick={() => handleDeleteCert(idx)}
                            className="text-slate-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                            title="Delete Certification"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={cert.issuer || ''}
                            onChange={(e) => handleUpdateCert(idx, 'issuer', e.target.value)}
                            className="text-[12.5px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 rounded-lg focus:border-primary focus:outline-hidden"
                            placeholder="Issuer (e.g. AWS, Google Cloud)"
                          />
                          <input
                            type="text"
                            value={cert.year || ''}
                            onChange={(e) => handleUpdateCert(idx, 'year', e.target.value)}
                            className="text-[12.5px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 rounded-lg focus:border-primary focus:outline-hidden"
                            placeholder="Year (e.g. 2024)"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: Live Interactive Document Canvas with Contextual Section Inspector */}
          <div className="w-full lg:w-[54%] xl:w-[58%] bg-slate-200/90 dark:bg-slate-950 flex flex-col overflow-hidden relative">
            {/* Live Canvas Top Bar */}
            <div className="px-4 py-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 z-10 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="text-[11.5px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  Live Preview
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/80">
                  <Sparkle className="w-3 h-3 text-emerald-500" />
                  Click any section on resume to customize font & color
                </span>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs">
                <button
                  onClick={() => setZoom(z => Math.max(Number((z - 0.1).toFixed(1)), 0.5))}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoom(1)}
                  className="px-2 py-0.5 text-[11px] font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
                  title="Reset Zoom"
                >
                  {zoom === 1 ? 'Fit' : `${Math.round(zoom * 100)}%`}
                </button>
                <button
                  onClick={() => setZoom(z => Math.min(Number((z + 0.1).toFixed(1)), 1.5))}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* FLOATING CONTEXTUAL SECTION FORMATTING POPUP / INSPECTOR */}
            {selectedSectionKey && (
              <div className="absolute top-12 left-4 right-4 z-30 animate-in slide-in-from-top-3 fade-in duration-200">
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border-2 border-emerald-500 shadow-2xl p-3.5 space-y-3 ring-4 ring-emerald-500/10">
                  {/* Top Bar of Floating Popup */}
                  <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                      <span className="text-[12px] font-black text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                        Formatting Section: {SECTION_LABELS[selectedSectionKey]?.title || selectedSectionKey}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Jump to Edit Text in Tab */}
                      {SECTION_LABELS[selectedSectionKey]?.tab && (
                        <button
                          onClick={() => {
                            setActiveTab(SECTION_LABELS[selectedSectionKey].tab)
                            toast.success(`Switched tab to edit ${SECTION_LABELS[selectedSectionKey].title}`)
                          }}
                          className="px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit Text Content</span>
                        </button>
                      )}

                      <button
                        onClick={handleApplyStyleToAll}
                        className="px-2 py-1 text-[11px] font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
                        title="Apply this section's font and color to all sections"
                      >
                        Apply to All
                      </button>

                      <button
                        onClick={handleResetSectionStyle}
                        className="p-1 text-slate-400 hover:text-slate-700 rounded-md transition-colors cursor-pointer"
                        title="Reset to Template Default"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setSelectedSectionKey(null)}
                        className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 flex items-center justify-center cursor-pointer ml-1"
                        title="Close Popup (Esc)"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Formatting Controls Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-center">
                    {/* 1. Font Model / Family */}
                    <div>
                      <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Font Model
                      </label>
                      <select
                        value={currentSectionStyle.fontFamily || selectedFontFamily}
                        onChange={(e) => updateSelectedSectionStyle({ fontFamily: e.target.value })}
                        className="w-full text-[12px] font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 focus:border-emerald-500 focus:outline-hidden cursor-pointer"
                      >
                        {FONT_MODELS.map(f => (
                          <option key={f.id} value={f.family}>
                            {f.name} ({f.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 2. Font Size */}
                    <div>
                      <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Font Size
                      </label>
                      <div className="flex items-center gap-1">
                        <select
                          value={currentSectionStyle.fontSize || '9.5pt'}
                          onChange={(e) => updateSelectedSectionStyle({ fontSize: e.target.value })}
                          className="w-full text-[12px] font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 focus:border-emerald-500 focus:outline-hidden cursor-pointer"
                        >
                          {FONT_SIZES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* 3. Font Style Toggles (Bold, Italic, Underline, Uppercase) */}
                    <div>
                      <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Font Style
                      </label>
                      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                        <button
                          type="button"
                          onClick={() => updateSelectedSectionStyle({
                            fontWeight: currentSectionStyle.fontWeight === 'bold' ? 'normal' : 'bold'
                          })}
                          className={cn(
                            "flex-1 py-1 rounded text-[11px] font-black flex items-center justify-center transition-colors cursor-pointer",
                            currentSectionStyle.fontWeight === 'bold'
                              ? "bg-emerald-600 text-white shadow-2xs"
                              : "text-slate-700 hover:bg-white dark:hover:bg-slate-700"
                          )}
                          title="Toggle Bold"
                        >
                          <Bold className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => updateSelectedSectionStyle({
                            fontStyle: currentSectionStyle.fontStyle === 'italic' ? 'normal' : 'italic'
                          })}
                          className={cn(
                            "flex-1 py-1 rounded text-[11px] font-black flex items-center justify-center transition-colors cursor-pointer",
                            currentSectionStyle.fontStyle === 'italic'
                              ? "bg-emerald-600 text-white shadow-2xs"
                              : "text-slate-700 hover:bg-white dark:hover:bg-slate-700"
                          )}
                          title="Toggle Italic"
                        >
                          <Italic className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => updateSelectedSectionStyle({
                            textDecoration: currentSectionStyle.textDecoration === 'underline' ? 'none' : 'underline'
                          })}
                          className={cn(
                            "flex-1 py-1 rounded text-[11px] font-black flex items-center justify-center transition-colors cursor-pointer",
                            currentSectionStyle.textDecoration === 'underline'
                              ? "bg-emerald-600 text-white shadow-2xs"
                              : "text-slate-700 hover:bg-white dark:hover:bg-slate-700"
                          )}
                          title="Toggle Underline"
                        >
                          <Underline className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => updateSelectedSectionStyle({
                            textTransform: currentSectionStyle.textTransform === 'uppercase' ? 'none' : 'uppercase'
                          })}
                          className={cn(
                            "flex-1 py-1 rounded text-[11px] font-black flex items-center justify-center transition-colors cursor-pointer",
                            currentSectionStyle.textTransform === 'uppercase'
                              ? "bg-emerald-600 text-white shadow-2xs"
                              : "text-slate-700 hover:bg-white dark:hover:bg-slate-700"
                          )}
                          title="Toggle Uppercase"
                        >
                          <CaseSensitive className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* 4. Font / Accent Color */}
                    <div>
                      <label className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Section Color
                      </label>
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
                          {COLOR_PALETTES.slice(0, 5).map(c => (
                            <button
                              key={c.hex}
                              type="button"
                              onClick={() => updateSelectedSectionStyle({ color: c.hex })}
                              className={cn(
                                "w-6 h-6 rounded-full shrink-0 transition-transform cursor-pointer border border-white shadow-xs",
                                (currentSectionStyle.color || themeColor).toLowerCase() === c.hex.toLowerCase()
                                  ? "ring-2 ring-emerald-500 scale-110"
                                  : "hover:scale-105 opacity-90 hover:opacity-100"
                              )}
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                        </div>

                        {/* Custom Color Input */}
                        <input
                          type="color"
                          value={currentSectionStyle.color || themeColor}
                          onChange={(e) => updateSelectedSectionStyle({ color: e.target.value })}
                          className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent shrink-0"
                          title="Pick custom color"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Canvas Scroll Area */}
            <div
              ref={previewContainerRef}
              className="flex-1 p-4 sm:p-6 overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start scrollbar-thin shadow-inner"
            >
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-slate-500 gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                  <p className="text-[13px] font-semibold">Rendering live preview document...</p>
                </div>
              ) : (
                <div className="flex justify-center transition-all duration-150 py-2 w-full">
                  <div
                    style={{
                      transform: `scale(${effectiveScale})`,
                      transformOrigin: 'top center',
                      width: '794px',
                      marginLeft: `${horizontalMargin}px`,
                      marginRight: `${horizontalMargin}px`,
                    }}
                  >
                    <TemplateComponent
                      resumeData={resumeData}
                      profileData={profileData}
                      themeColor={themeColor}
                      fontFamily={selectedFontFamily}
                      sectionStyles={sectionStyles}
                      activeSectionKey={selectedSectionKey}
                      onSelectSection={(key) => setSelectedSectionKey(key)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Hidden Print Reference */}
            {resumeData && (
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-99999px',
                  top: 0,
                  width: '794px',
                  opacity: 0,
                  pointerEvents: 'none',
                  zIndex: -9999
                }}
              >
                <div ref={printRef}>
                  <TemplateComponent
                    resumeData={resumeData}
                    profileData={profileData}
                    themeColor={themeColor}
                    fontFamily={selectedFontFamily}
                    sectionStyles={sectionStyles}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
