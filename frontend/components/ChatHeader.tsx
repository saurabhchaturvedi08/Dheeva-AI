'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, ChevronDown, X } from 'lucide-react'
import { FileItem } from './FileItem'

interface ChatHeaderProps {
  selectedFile: any
  files: any[]
  onSelectFile: (file: any) => void
}

export function ChatHeader({ selectedFile, files, onSelectFile }: ChatHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className="bg-white border-b border-slate-200 p-4">
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-slate-900 truncate max-w-xs">
                {selectedFile?.name || 'Select a file'}
              </p>
              <p className="text-sm text-slate-600">
                {selectedFile ? `${selectedFile.size} • ${selectedFile.domain}` : 'Choose a document to chat with'}
              </p>
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${
            isDropdownOpen ? 'rotate-180' : ''
          }`} />
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-20 max-h-80 overflow-y-auto"
              >
                <div className="p-2">
                  <div className="flex items-center justify-between p-3 border-b border-slate-100">
                    <h3 className="font-semibold text-slate-900">Select a File</h3>
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="p-1 hover:bg-slate-100 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2 p-2">
                    {files.map((file) => (
                      <button
                        key={file.id}
                        onClick={() => {
                          onSelectFile(file)
                          setIsDropdownOpen(false)
                        }}
                        className="w-full text-left"
                      >
                        <FileItem file={file} />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}