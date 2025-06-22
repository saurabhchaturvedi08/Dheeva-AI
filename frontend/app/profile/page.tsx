'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Settings, 
  LogOut, 
  Moon, 
  Sun, 
  Lock, 
  Download, 
  Bell,
  FileText,
  Crown
} from 'lucide-react'
import Image from 'next/image'
import { Navigation } from '@/components/Navigation'

export default function ProfilePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  
  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    plan: 'Pro',
    usage: {
      files: 14,
      storage: '245 MB',
      queries: 156,
    }
  }

  const settingsItems = [
    {
      icon: isDarkMode ? Sun : Moon,
      label: 'Dark Mode',
      type: 'toggle',
      value: isDarkMode,
      onChange: setIsDarkMode,
    },
    {
      icon: Bell,
      label: 'Notifications',
      type: 'toggle',
      value: notifications,
      onChange: setNotifications,
    },
    {
      icon: Lock,
      label: 'Privacy & Security',
      type: 'link',
    },
    {
      icon: Download,
      label: 'Export Data',
      type: 'link',
    },
  ]

  const accountItems = [
    {
      icon: User,
      label: 'Edit Profile',
      type: 'link',
    },
    {
      icon: Settings,
      label: 'Account Settings',
      type: 'link',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <Image
                src={user.avatar}
                alt={user.name}
                width={100}
                height={100}
                className="rounded-full"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Crown className="w-4 h-4 text-yellow-800" />
              </div>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-bold text-slate-900 mb-1">{user.name}</h1>
              <p className="text-slate-600 mb-3">{user.email}</p>
              <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-full">
                <Crown className="w-3 h-3 mr-1" />
                {user.plan} Plan
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Usage Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-8"
        >
          <h2 className="text-xl font-semibold mb-6">Usage Statistics</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-1">{user.usage.files}</div>
              <div className="text-sm text-slate-600">Files Uploaded</div>
            </div>
            <div className="text-center border-l border-r border-slate-200">
              <div className="text-3xl font-bold text-green-600 mb-1">{user.usage.storage}</div>
              <div className="text-sm text-slate-600">Storage Used</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">{user.usage.queries}</div>
              <div className="text-sm text-slate-600">AI Queries</div>
            </div>
          </div>
        </motion.div>
        
        {/* Settings Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-8"
        >
          <h2 className="text-xl font-semibold mb-6">Settings</h2>
          <div className="space-y-4">
            {settingsItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="font-medium text-slate-900">{item.label}</span>
                </div>
                {item.type === 'toggle' ? (
                  <button
                    onClick={() => item.onChange?.(!item.value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      item.value ? 'bg-indigo-600' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        item.value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                ) : (
                  <button className="text-slate-400 hover:text-slate-600">
                    <Settings className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Account Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mb-8"
        >
          <h2 className="text-xl font-semibold mb-6">Account</h2>
          <div className="space-y-4">
            {accountItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 -mx-6 px-6 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="font-medium text-slate-900">{item.label}</span>
                </div>
                <Settings className="w-5 h-5 text-slate-400" />
              </button>
            ))}
            
            <button className="w-full flex items-center justify-between py-3 hover:bg-red-50 -mx-6 px-6 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200 transition-colors">
                  <LogOut className="w-5 h-5 text-red-600" />
                </div>
                <span className="font-medium text-red-600">Logout</span>
              </div>
            </button>
          </div>
        </motion.div>
        
        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-slate-500"
        >
          Dheeva v1.0.0 • Made with ❤️ for intelligent document interaction
        </motion.div>
      </div>
    </div>
  )
}