'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Share2, ArrowUp, Eye, EyeOff } from 'lucide-react'
import { Navigation } from '@/components/Navigation'
import { ChatBubble } from '@/components/ChatBubble'
import { FilePreview } from '@/components/FilePreview'
import { MOCK_FILES, MOCK_CHATS } from '@/constants/mockData'

export default function FileDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [file, setFile] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(true)

  useEffect(() => {
    if (params.id) {
      const foundFile = MOCK_FILES.find(f => f.id === params.id)
      if (foundFile) {
        setFile(foundFile)
        setMessages(MOCK_CHATS[params.id as string] || [])
      }
    }
  }, [params.id])

  const handleSend = () => {
    if (!inputText.trim()) return
    
    const userMessage = {
      id: String(Date.now()),
      text: inputText,
      sender: 'user' as const,
      timestamp: new Date().toISOString(),
    }
    
    setMessages((prev) => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)
    
    setTimeout(() => {
      const aiMessage = {
        id: String(Date.now() + 1),
        text: `This is a simulated response about "${file?.name}" to your question: "${inputText}"`,
        sender: 'ai' as const,
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!file) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">File not found</h1>
            <button 
              onClick={() => router.back()}
              className="btn-primary"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="container mx-auto max-w-6xl h-[calc(100vh-80px)] flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-slate-900 truncate max-w-md">
                  {file.name}
                </h1>
                <p className="text-sm text-slate-600">
                  {file.size} • {file.domain} • {new Date(file.uploadDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                title={showPreview ? 'Hide Preview' : 'Show Preview'}
              >
                {showPreview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* File Preview */}
          {showPreview && (
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '40%' }}
              exit={{ width: 0 }}
              className="bg-white border-r border-slate-200 overflow-hidden"
            >
              <FilePreview file={file} />
            </motion.div>
          )}
          
          {/* Chat Section */}
          <div className={`flex-1 flex flex-col ${showPreview ? 'w-3/5' : 'w-full'}`}>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <ChatBubble key={message.id} message={message} />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                    <FilePreview file={file} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No questions yet</h3>
                  <p className="text-slate-600 max-w-md">
                    Ask questions about {file.name} to get AI-powered insights and analysis
                  </p>
                </motion.div>
              )}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="chat-bubble-ai">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-white border-t border-slate-200">
              <div className="flex gap-3">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Ask about ${file.name}...`}
                  className="flex-1 resize-none input-field min-h-[48px] max-h-32"
                  rows={1}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim() || isLoading}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    inputText.trim() && !isLoading
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}