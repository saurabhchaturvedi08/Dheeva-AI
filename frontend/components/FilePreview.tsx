'use client'

import { FileText, FileImage, FileAudio, FileVideo, Download, ExternalLink } from 'lucide-react'

interface FilePreviewProps {
  file: {
    id: string
    name: string
    type: string
    size: string
  }
}

export function FilePreview({ file }: FilePreviewProps) {
  const renderPreview = () => {
    switch (file.type) {
      case 'image':
        return (
          <div className="h-full bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-blue-200 rounded-2xl flex items-center justify-center mb-4">
              <FileImage className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-blue-900 mb-2">Image Preview</h3>
            <p className="text-sm text-blue-700 text-center px-4">
              In a real implementation, the actual image would be displayed here
            </p>
          </div>
        )
      case 'pdf':
        return (
          <div className="h-full bg-gradient-to-br from-red-50 to-red-100 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-red-200 rounded-2xl flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-semibold text-red-900 mb-2">PDF Document</h3>
            <p className="text-sm text-red-700 text-center px-4">
              PDF viewer would be integrated here for document preview
            </p>
          </div>
        )
      case 'audio':
        return (
          <div className="h-full bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-green-200 rounded-2xl flex items-center justify-center mb-4">
              <FileAudio className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-green-900 mb-2">Audio File</h3>
            <p className="text-sm text-green-700 text-center px-4">
              Audio player with waveform visualization would appear here
            </p>
          </div>
        )
      case 'video':
        return (
          <div className="h-full bg-gradient-to-br from-yellow-50 to-yellow-100 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-yellow-200 rounded-2xl flex items-center justify-center mb-4">
              <FileVideo className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-yellow-900 mb-2">Video File</h3>
            <p className="text-sm text-yellow-700 text-center px-4">
              Video player with controls would be embedded here
            </p>
          </div>
        )
      default:
        return (
          <div className="h-full bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">File Preview</h3>
            <p className="text-sm text-slate-700 text-center px-4">
              Preview not available for this file type
            </p>
          </div>
        )
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Preview Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-slate-900 truncate" title={file.name}>
            {file.name}
          </h3>
          <p className="text-sm text-slate-600">{file.size}</p>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Download">
            <Download className="w-4 h-4 text-slate-600" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Open in new tab">
            <ExternalLink className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>
      
      {/* Preview Content */}
      <div className="flex-1">
        {renderPreview()}
      </div>
    </div>
  )
}