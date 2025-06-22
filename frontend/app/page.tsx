'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FilePlus, 
  FileText, 
  MessageSquare, 
  Search, 
  User,
  Upload,
  Sparkles,
  Brain,
  Shield
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { FileUpload } from '@/components/FileUpload'
import { DomainSelector } from '@/components/DomainSelector'
import { FileItem } from '@/components/FileItem'
import { Navigation } from '@/components/Navigation'
import { MOCK_FILES } from '@/constants/mockData'

export default function HomePage() {
  const [selectedDomain, setSelectedDomain] = useState('general')
  const [files, setFiles] = useState(MOCK_FILES)
  const [showUpload, setShowUpload] = useState(false)

  const handleFileUpload = (uploadedFiles: File[]) => {
    const newFiles = uploadedFiles.map((file, index) => ({
      id: String(Date.now() + index),
      name: file.name,
      type: file.type.includes('pdf') ? 'pdf' : 
            file.type.includes('image') ? 'image' :
            file.type.includes('audio') ? 'audio' :
            file.type.includes('video') ? 'video' : 'pdf',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      domain: selectedDomain,
      uploadDate: new Date().toISOString(),
    }))
    setFiles([...newFiles, ...files])
    setShowUpload(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-yellow-800" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 text-balance">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Dheeva</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 text-balance max-w-3xl mx-auto">
            Your AI-powered document assistant that transforms how you interact with files
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setShowUpload(true)}
              className="btn-primary text-lg px-8 py-4 flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <Upload className="w-5 h-5" />
              Upload Your First File
            </button>
            <Link href="/search" className="btn-secondary text-lg px-8 py-4 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Try AI Search
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          <div className="card text-center group hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Document Analysis</h3>
            <p className="text-slate-600">Upload PDFs, images, audio, or video files and get AI-powered insights instantly.</p>
          </div>
          
          <div className="card text-center group hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Interactive Q&A</h3>
            <p className="text-slate-600">Ask questions about your documents and get detailed, contextual answers.</p>
          </div>
          
          <div className="card text-center group hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Domain Expertise</h3>
            <p className="text-slate-600">Specialized knowledge in legal, medical, academic, and business domains.</p>
          </div>
        </motion.div>

        {/* Domain Selection */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">Select Your Domain</h2>
          <DomainSelector 
            selectedDomain={selectedDomain} 
            onSelectDomain={setSelectedDomain} 
          />
        </motion.div>

        {/* Files Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="card"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold">Your Files</h2>
              <p className="text-slate-600">Manage and interact with your uploaded documents</p>
            </div>
            <button 
              onClick={() => setShowUpload(true)}
              className="btn-primary flex items-center gap-2"
            >
              <FilePlus className="w-4 h-4" />
              Upload File
            </button>
          </div>

          {files.length > 0 ? (
            <div className="grid gap-4">
              {files.slice(0, 6).map((file) => (
                <Link key={file.id} href={`/file/${file.id}`}>
                  <FileItem file={file} />
                </Link>
              ))}
              {files.length > 6 && (
                <div className="text-center pt-4">
                  <Link href="/files" className="text-indigo-600 hover:text-indigo-700 font-medium">
                    View all {files.length} files →
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No files uploaded yet</h3>
              <p className="text-slate-600 mb-6">Upload your first document to get started with AI-powered analysis</p>
              <button 
                onClick={() => setShowUpload(true)}
                className="btn-primary"
              >
                Upload Your First File
              </button>
            </div>
          )}
        </motion.div>
      </main>

      {/* File Upload Modal */}
      {showUpload && (
        <FileUpload 
          onUpload={handleFileUpload}
          onClose={() => setShowUpload(false)}
          selectedDomain={selectedDomain}
        />
      )}
    </div>
  )
}