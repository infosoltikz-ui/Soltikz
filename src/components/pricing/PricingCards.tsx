"use client";
import { Check, X, User, Rocket, Crown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

const plans = [
  {
    name: 'Basic',
    description: 'Perfect for getting started',
    price: '0',
    icon: <User className="w-6 h-6 text-primary" />,
    iconBg: 'bg-primary/10',
    popular: false,
    buttonText: 'Get Started Free',
    buttonVariant: 'outline' as const,
    buttonColor: 'border-primary text-primary hover:bg-primary/5',
    features: [
      { text: '1 Resume', included: true },
      { text: 'AI Resume Generation (Limited)', included: true },
      { text: 'ATS Score Check (Limited)', included: true },
      { text: '5+ Resume Templates', included: true },
      { text: 'Download in PDF', included: true },
      { text: 'AI Optimization', included: false },
      { text: 'Cover Letter Builder', included: false },
      { text: 'Job Tracker', included: false },
      { text: 'Priority Support', included: false },
    ]
  },
  {
    name: 'Pro',
    description: 'Best for job seekers',
    price: '9.99',
    icon: <Rocket className="w-6 h-6 text-accent" />,
    iconBg: 'bg-accent/10',
    popular: true,
    buttonText: 'Get Started',
    buttonVariant: 'primary' as const,
    buttonColor: 'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/25 border-none',
    features: [
      { text: 'Unlimited Resumes', included: true },
      { text: 'AI Resume Generation', included: true },
      { text: 'ATS Score Check', included: true },
      { text: 'AI Optimization', included: true },
      { text: '25+ Premium Templates', included: true },
      { text: 'Cover Letter Builder', included: true },
      { text: 'Job Tracker', included: true },
      { text: 'Download in PDF & DOCX', included: true },
      { text: 'Priority Support', included: true },
    ]
  },
  {
    name: 'Premium',
    description: 'For serious professionals',
    price: '19.99',
    icon: <Crown className="w-6 h-6 text-primary" />,
    iconBg: 'bg-primary/10',
    popular: false,
    buttonText: 'Get Started',
    buttonVariant: 'outline' as const,
    buttonColor: 'border-primary text-primary hover:bg-primary/5',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'AI Suggestions (Advanced)', included: true },
      { text: 'Real-time Content Analysis', included: true },
      { text: 'Interview Preparation', included: true },
      { text: 'Job Match Recommendations', included: true },
      { text: 'LinkedIn Profile Review', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Early Access to New Features', included: true },
    ]
  }
]

export function PricingCards() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8 max-w-5xl mx-auto items-start">
          
          {plans.map((plan, idx) => (
            <div 
              key={plan.name}
              className={cn(
                "relative bg-white rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-300",
                plan.popular 
                  ? "border-2 border-accent shadow-2xl shadow-accent/10 scale-100 md:scale-105 z-10" 
                  : "border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 mt-0 md:mt-4"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[11px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md z-20 whitespace-nowrap">
                  Most Popular
                </div>
              )}

              <div className={cn("w-14 h-14 rounded-full flex items-center justify-center mb-6", plan.iconBg)}>
                {plan.icon}
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-1">{plan.name}</h3>
              <p className="text-[13px] font-medium text-slate-500 mb-6">{plan.description}</p>

              <div className="mb-8 flex items-baseline justify-center gap-1">
                <span className="text-4xl lg:text-5xl font-black text-slate-900">${plan.price}</span>
                <span className="text-slate-500 font-bold text-sm">/month</span>
              </div>

              <ul className="w-full space-y-4 mb-8 text-left">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="shrink-0 mt-0.5">
                      {feature.included ? (
                        <Check className="w-4 h-4 text-primary" strokeWidth={3} />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-200 flex items-center justify-center">
                          <X className="w-2.5 h-2.5 text-slate-300" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <span className={cn(
                      "text-[13px] font-bold leading-tight",
                      feature.included ? "text-slate-700" : "text-slate-400"
                    )}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="w-full mt-auto pt-4">
                <Button 
                  size="xl" 
                  pill 
                  className={cn("w-full text-[15px] font-bold border-2", plan.buttonColor)}
                >
                  {plan.buttonText}
                </Button>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  )
}
