'use client'

import { motion } from 'framer-motion'
import { BookOpen, Scale, Stethoscope, GraduationCap, Briefcase } from 'lucide-react'

interface DomainSelectorProps {
  selectedDomain: string
  onSelectDomain: (domain: string) => void
}

export function DomainSelector({ selectedDomain, onSelectDomain }: DomainSelectorProps) {
  const domains = [
    { id: 'general', name: 'General', icon: BookOpen, color: 'indigo' },
    { id: 'legal', name: 'Legal', icon: Scale, color: 'red' },
    { id: 'medical', name: 'Medical', icon: Stethoscope, color: 'green' },
    { id: 'academic', name: 'Academic', icon: GraduationCap, color: 'blue' },
    { id: 'business', name: 'Business', icon: Briefcase, color: 'yellow' },
  ]

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors = {
      indigo: {
        bg: isSelected ? 'bg-indigo-100 border-indigo-200' : 'bg-slate-50 hover:bg-indigo-50 border-slate-200',
        icon: isSelected ? 'bg-indigo-200 text-indigo-700' : 'bg-indigo-100 text-indigo-600',
        text: isSelected ? 'text-indigo-700 font-semibold' : 'text-slate-700'
      },
      red: {
        bg: isSelected ? 'bg-red-100 border-red-200' : 'bg-slate-50 hover:bg-red-50 border-slate-200',
        icon: isSelected ? 'bg-red-200 text-red-700' : 'bg-red-100 text-red-600',
        text: isSelected ? 'text-red-700 font-semibold' : 'text-slate-700'
      },
      green: {
        bg: isSelected ? 'bg-green-100 border-green-200' : 'bg-slate-50 hover:bg-green-50 border-slate-200',
        icon: isSelected ? 'bg-green-200 text-green-700' : 'bg-green-100 text-green-600',
        text: isSelected ? 'text-green-700 font-semibold' : 'text-slate-700'
      },
      blue: {
        bg: isSelected ? 'bg-blue-100 border-blue-200' : 'bg-slate-50 hover:bg-blue-50 border-slate-200',
        icon: isSelected ? 'bg-blue-200 text-blue-700' : 'bg-blue-100 text-blue-600',
        text: isSelected ? 'text-blue-700 font-semibold' : 'text-slate-700'
      },
      yellow: {
        bg: isSelected ? 'bg-yellow-100 border-yellow-200' : 'bg-slate-50 hover:bg-yellow-50 border-slate-200',
        icon: isSelected ? 'bg-yellow-200 text-yellow-700' : 'bg-yellow-100 text-yellow-600',
        text: isSelected ? 'text-yellow-700 font-semibold' : 'text-slate-700'
      }
    }
    return colors[color as keyof typeof colors]
  }

  return (
    <div className="flex flex-wrap gap-3">
      {domains.map((domain) => {
        const isSelected = selectedDomain === domain.id
        const colorClasses = getColorClasses(domain.color, isSelected)
        
        return (
          <motion.button
            key={domain.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectDomain(domain.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${colorClasses.bg}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${colorClasses.icon}`}>
              <domain.icon className="w-4 h-4" />
            </div>
            <span className={`font-medium transition-colors ${colorClasses.text}`}>
              {domain.name}
            </span>
            {isSelected && (
              <motion.div
                layoutId="selectedDomain"
                className="w-2 h-2 bg-current rounded-full"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}