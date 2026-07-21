import { ResumeCard, ResumeData } from './ResumeCard'
import { FileText } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Mock Data
const MOCK_RESUMES: ResumeData[] = [
  {
    id: '1',
    name: 'Senior Java Developer',
    type: 'Full-Time',
    company: 'Google',
    role: 'Java Developer',
    template: 'Modern ATS Template',
    atsScore: 94,
    lastUpdated: 'Yesterday',
    status: 'Completed'
  },
  {
    id: '2',
    name: 'Backend Engineer (Contract)',
    type: 'C2C',
    company: 'Meta',
    role: 'Backend Engineer',
    template: 'Tech Professional',
    atsScore: 88,
    lastUpdated: '2 days ago',
    status: 'Completed'
  },
  {
    id: '3',
    name: 'Software Engineer II',
    type: 'Full-Time',
    company: 'Amazon',
    role: 'SDE II',
    template: 'Executive Clean',
    atsScore: 92,
    lastUpdated: 'Last week',
    status: 'Completed'
  },
  {
    id: '4',
    name: 'Contract Developer',
    type: 'C2C',
    company: 'Netflix',
    role: 'Software Developer',
    template: 'Modern ATS Template',
    atsScore: 75,
    lastUpdated: 'Last week',
    status: 'Completed'
  },
  {
    id: '5',
    name: 'Draft Resume',
    type: 'Full-Time',
    company: 'Apple',
    role: 'Frontend Engineer',
    template: 'Creative Minimal',
    atsScore: 45,
    lastUpdated: '2 weeks ago',
    status: 'Draft'
  },
  {
    id: '6',
    name: 'Staff Software Engineer',
    type: 'Full-Time',
    company: 'Microsoft',
    role: 'Staff Engineer',
    template: 'Executive Clean',
    atsScore: 97,
    lastUpdated: '1 month ago',
    status: 'Completed'
  },
]

export function ResumeGrid() {
  const resumes = MOCK_RESUMES

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
        <Button className="h-12 px-8 font-bold text-[14px] rounded-xl">
          Create Your First Resume
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {resumes.map(resume => (
        <ResumeCard key={resume.id} data={resume} />
      ))}
    </div>
  )
}
