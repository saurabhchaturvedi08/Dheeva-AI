'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, Globe, Sparkles } from 'lucide-react'
import { Navigation } from '@/components/Navigation'
import { ChatBubble } from '@/components/ChatBubble'
import { DomainSelector } from '@/components/DomainSelector'

export default function SearchPage() {
  const [domain, setDomain] = useState('general')
  const [messages, setMessages] = useState<any[]>([])
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
      domain,
    }
    
    setMessages((prev) => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage = {
        id: String(Date.now() + 1),
        text: `This is a simulated AI response to your ${domain} domain question: "${inputText}". In a real implementation, this would provide comprehensive answers using real-time web search and domain-specific knowledge.`,
        sender: 'ai' as const,
        timestamp: new Date().toISOString(),
        domain,
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

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="container mx-auto max-w-4xl h-[calc(100vh-80px)] flex flex-col">
        <div className="bg-white border-b border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">AI Search</h1>
              <p className="text-slate-600">Ask any question - get real-time AI answers</p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Select Knowledge Domain:
            </label>
            <DomainSelector 
              selectedDomain={domain} 
              onSelectDomain={setDomain} 
            />
          </div>
        </div>
        
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
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <Globe className="w-12 h-12 text-blue-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-yellow-800" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Ask anything</h3>
              <p className="text-slate-600 max-w-md">
                Get answers to general questions or specific {domain} domain inquiries with real-time web search
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
              placeholder={`Ask a ${domain} question...`}
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