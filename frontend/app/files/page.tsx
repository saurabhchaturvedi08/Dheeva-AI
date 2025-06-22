'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List, Upload } from 'lucide-react'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { FileItem } from '@/components/FileItem'
import { FileUpload } from '@/components/FileUpload'
import { MOCK_FILES } from '@/constants/mockData'

export default function FilesPage() {
  const [files, setFiles] = useState(MOCK_FILES)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDomain, setSelectedDomain] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [showUpload, setShowUpload] = useState(false)

  const domains = ['all', 'general', 'legal', 'medical', 'academic', 'business']

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDomain = selectedDomain === 'all' || file.domain === selectedDomain
    return matchesSearch && matchesDomain
  })

  const handleFileUpload = (uploadedFiles: File[]) => {
    const newFiles = uploadedFiles.map((file, index) => ({
      id: String(Date.now() + index),
      name: file.name,
      type: file.type.includes('pdf') ? 'pdf' : 
            file.type.includes('image') ? 'image' :
            file.type.includes('audio') ? 'audio' :
            file.type.includes('video') ? 'video' : 'pdf',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      domain: 'general',
      uploadDate: new Date().toISOString(),
    }))
    setFiles([...newFiles, ...files])
    setShowUpload(false)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Your Files</h1>
            <p className="text-slate-600">Manage and interact with your uploaded documents</p>
          </div>
          <button 
            onClick={() => setShowUpload(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload Files
          </button>
        </div>

        {/* Filters and Search */}
        <div className="card mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            
            {/* Domain Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-400" />
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
              >
                {domains.map(domain => (
                  <option key={domain} value={domain}>
                    {domain === 'all' ? 'All Domains' : domain.charAt(0).toUpperCase() + domain.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* View Mode */}
            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-slate-200'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-slate-200'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Files Grid/List */}
        {filteredFiles.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
            }
          >
            {filteredFiles.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/file/${file.id}`}>
                  <FileItem file={file} viewMode={viewMode} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {searchQuery || selectedDomain !== 'all' ? 'No files found' : 'No files uploaded yet'}
            </h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              {searchQuery || selectedDomain !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Upload your first document to get started with AI-powered analysis'
              }
            </p>
            {!searchQuery && selectedDomain === 'all' && (
              <button 
                onClick={() => setShowUpload(true)}
                className="btn-primary"
              >
                Upload Your First File
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* File Upload Modal */}
      {showUpload && (
        <FileUpload 
          onUpload={handleFileUpload}
          onClose={() => setShowUpload(false)}
          selectedDomain="general"
        />
      )}
    </div>
  )
}