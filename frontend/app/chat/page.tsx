'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, FileText } from 'lucide-react'
import { Navigation } from '@/components/Navigation'
import { ChatBubble } from '@/components/ChatBubble'
import { ChatHeader } from '@/components/ChatHeader'
import { MOCK_FILES, MOCK_CHATS } from '@/constants/mockData'

export default function ChatPage() {
  const [selectedFile, setSelectedFile] = useState(MOCK_FILES[0])
  const [messages, setMessages] = useState(MOCK_CHATS[MOCK_FILES[0].id] || [])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = () => {
    if (!inputText.trim()) return
    
    // Add user message
    const userMessage = {
      id: String(Date.now()),
      text: inputText,
      sender: 'user' as const,
      timestamp: new Date().toISOString(),
    }
    
    setMessages((prev) => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage = {
        id: String(Date.now() + 1),
        text: `This is a simulated response to your question about "${selectedFile?.name}": "${inputText}"`,
        sender: 'ai' as const,
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleFileSelect = (file: any) => {
    setSelectedFile(file)
    setMessages(MOCK_CHATS[file.id] || [])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="container mx-auto max-w-4xl h-[calc(100vh-80px)] flex flex-col">
        <ChatHeader 
          selectedFile={selectedFile}
          files={MOCK_FILES}
          onSelectFile={handleFileSelect}
        />
        
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
                <FileText className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No messages yet</h3>
              <p className="text-slate-600 max-w-md">
                Ask questions about {selectedFile?.name} or upload a new file to get started
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
              placeholder={`Ask a question about ${selectedFile?.name}...`}
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
  )
}