'use client'

import { useState, useEffect } from 'react'
import { FileText, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ResumeCard } from './ResumeCard'
import { createClient } from '@/utils/supabase/client'
import { formatDistanceToNow } from 'date-fns'

export function ResumeGrid() {
  const [resumes, setResumes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchResumes = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // Fetch resumes with their ATS score and JD details
    const { data, error } = await supabase
      .from('resumes_v2')
      .select(`
        *,
        ats_analyses ( overall_score ),
        parsed_job_descriptions ( company_name, job_title )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
    } else {
      setResumes(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchResumes()
  }, [])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    const supabase = createClient()
    await supabase.from('resumes_v2').delete().eq('id', id);
    fetchResumes(); // Refresh
  }

  if (loading) {
    return (
      <div className="flex justify-center p-24">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (resumes.length === 0) {
    return (
      <div className="bg-[#FAFAF8] rounded-2xl border border-dashed border-slate-300 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
          <FileText className="w-10 h-10 text-primary" strokeWidth={2} />
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2">No resumes created yet</h3>
        <p className="text-[14px] text-slate-500 max-w-[300px] mb-8">
          Get started by building your first ATS-optimized resume using our AI tools.
        </p>
        <Button className="h-12 px-8 font-bold text-[14px] rounded-xl" onClick={() => window.location.href = '/dashboard/create'}>
          Create Your First Resume
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {resumes.map(resume => {
        const atsScore = resume.ats_analyses?.[0]?.overall_score || 0;
        const jd = resume.parsed_job_descriptions;
        
        return (
          <ResumeCard 
            key={resume.id} 
            data={{
              id: resume.id,
              name: resume.title,
              type: resume.resume_type as 'Full-Time' | 'C2C',
              company: jd?.company_name || 'N/A',
              role: jd?.job_title || 'N/A',
              template: 'Modern ATS Template',
              atsScore: atsScore,
              lastUpdated: formatDistanceToNow(new Date(resume.updated_at), { addSuffix: true }),
              status: resume.status as 'Completed' | 'Draft'
            }}
            onDelete={() => handleDelete(resume.id)}
          />
        )
      })}
    </div>
  )
}
