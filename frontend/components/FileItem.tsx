'use client'

import { motion } from 'framer-motion'
import { FileText, FileImage, FileAudio, FileVideo, Calendar, HardDrive } from 'lucide-react'

type FileType = 'pdf' | 'image' | 'audio' | 'video'

interface FileItemProps {
  file: {
    id: string
    name: string
    type: FileType
    size: string
    domain: string
    uploadDate: string
  }
  viewMode?: 'grid' | 'list'
}

export function FileItem({ file, viewMode = 'list' }: FileItemProps) {
  const getFileIcon = () => {
    switch (file.type) {
      case 'pdf':
        return <FileText className="w-6 h-6 text-red-500" />
      case 'image':
        return <FileImage className="w-6 h-6 text-blue-500" />
      case 'audio':
        return <FileAudio className="w-6 h-6 text-green-500" />
      case 'video':
        return <FileVideo className="w-6 h-6 text-yellow-500" />
      default:
        return <FileText className="w-6 h-6 text-slate-500" />
    }
  }

  const getFileTypeColor = () => {
    switch (file.type) {
      case 'pdf':
        return 'bg-red-50 border-red-100'
      case 'image':
        return 'bg-blue-50 border-blue-100'
      case 'audio':
        return 'bg-green-50 border-green-100'
      case 'video':
        return 'bg-yellow-50 border-yellow-100'
      default:
        return 'bg-slate-50 border-slate-100'
    }
  }

  const getDomainBadgeColor = () => {
    switch (file.domain) {
      case 'legal':
        return 'bg-red-100 text-red-700'
      case 'medical':
        return 'bg-green-100 text-green-700'
      case 'academic':
        return 'bg-blue-100 text-blue-700'
      case 'business':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-indigo-100 text-indigo-700'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    })
  }

  if (viewMode === 'grid') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
      >
        <div className={`w-16 h-16 rounded-2xl border-2 ${getFileTypeColor()} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          {getFileIcon()}
        </div>
        
        <h3 className="font-semibold text-slate-900 mb-2 truncate" title={file.name}>
          {file.name}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
          <HardDrive className="w-4 h-4" />
          <span>{file.size}</span>
          <span>•</span>
          <Calendar className="w-4 h-4" />
          <span>{formatDate(file.uploadDate)}</span>
        </div>
        
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDomainBadgeColor()}`}>
          {file.domain}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl border-2 ${getFileTypeColor()} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          {getFileIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 truncate mb-1" title={file.name}>
            {file.name}
          </h3>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <HardDrive className="w-3 h-3" />
              <span>{file.size}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(file.uploadDate)}</span>
            </div>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDomainBadgeColor()}`}>
          {file.domain}
        </div>
      </div>
    </motion.div>
  )
}