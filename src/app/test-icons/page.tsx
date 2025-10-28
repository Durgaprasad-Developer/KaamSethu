// app/test-icons/page.tsx
"use client";

import { 
  Home, Search, User, Briefcase, Bell, CheckCircle, 
  AlertCircle, Star, Heart, Mic, MessageSquare, 
  ShieldCheck, Building, CreditCard, Settings 
} from 'lucide-react';

export default function TestIconsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-3">
            Icon Test Page
          </h1>
          <p className="text-gray-400">
            Testing Lucide React Icons
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Basic Icons */}
          <div className="flex flex-col items-center gap-3 p-6 border-2 border-slate-700 rounded-2xl bg-slate-800 shadow-sm hover:shadow-lg transition-shadow">
            <Home className="w-16 h-16 text-blue-400" />
            <p className="text-sm font-semibold text-gray-300">home</p>
          </div>
          
          <div className="flex flex-col items-center gap-3 p-6 border-2 border-slate-700 rounded-2xl bg-slate-800 shadow-sm hover:shadow-lg transition-shadow">
            <Search className="w-16 h-16 text-indigo-400" />
            <p className="text-sm font-semibold text-gray-300">search</p>
          </div>
          
          <div className="flex flex-col items-center gap-3 p-6 border-2 border-slate-700 rounded-2xl bg-slate-800 shadow-sm hover:shadow-lg transition-shadow">
            <User className="w-16 h-16 text-purple-400" />
            <p className="text-sm font-semibold text-gray-300">person</p>
          </div>
          
          <div className="flex flex-col items-center gap-3 p-6 border-2 border-slate-700 rounded-2xl bg-slate-800 shadow-sm hover:shadow-lg transition-shadow">
            <Briefcase className="w-16 h-16 text-pink-400" />
            <p className="text-sm font-semibold text-gray-300">work</p>
          </div>
          
          {/* Filled Icons */}
          <div className="flex flex-col items-center gap-3 p-6 border-2 border-blue-800 rounded-2xl bg-blue-900/30 shadow-sm hover:shadow-lg transition-shadow">
            <Bell className="w-16 h-16 text-blue-400 fill-blue-400" />
            <p className="text-sm font-semibold text-blue-300">notifications</p>
          </div>
          
          <div className="flex flex-col items-center gap-3 p-6 border-2 border-green-800 rounded-2xl bg-green-900/30 shadow-sm hover:shadow-lg transition-shadow">
            <CheckCircle className="w-16 h-16 text-green-400 fill-green-400" />
            <p className="text-sm font-semibold text-green-300">check_circle</p>
          </div>
          
          <div className="flex flex-col items-center gap-3 p-6 border-2 border-red-800 rounded-2xl bg-red-900/30 shadow-sm hover:shadow-lg transition-shadow">
            <AlertCircle className="w-16 h-16 text-red-400 fill-red-400" />
            <p className="text-sm font-semibold text-red-300">error</p>
          </div>
          
          <div className="flex flex-col items-center gap-3 p-6 border-2 border-yellow-800 rounded-2xl bg-yellow-900/30 shadow-sm hover:shadow-lg transition-shadow">
            <Star className="w-16 h-16 text-yellow-400 fill-yellow-400" />
            <p className="text-sm font-semibold text-yellow-300">star</p>
          </div>
          
          {/* App-specific Icons */}
          <div className="flex flex-col items-center gap-3 p-6 border-2 border-red-800 rounded-2xl bg-gradient-to-br from-red-900/30 to-pink-900/30 shadow-sm hover:shadow-lg transition-shadow">
            <Heart className="w-16 h-16 text-red-400 fill-red-400" />
            <p className="text-sm font-semibold text-red-300">favorite</p>
          </div>
          
          <div className="flex flex-col items-center gap-3 p-6 border-2 border-blue-800 rounded-2xl bg-gradient-to-br from-blue-900/30 to-cyan-900/30 shadow-sm hover:shadow-lg transition-shadow">
            <Mic className="w-16 h-16 text-blue-400" />
            <p className="text-sm font-semibold text-blue-300">mic</p>
          </div>
          
          <div className="flex flex-col items-center gap-3 p-6 border-2 border-purple-800 rounded-2xl bg-gradient-to-br from-purple-900/30 to-indigo-900/30 shadow-sm hover:shadow-lg transition-shadow">
            <MessageSquare className="w-16 h-16 text-purple-400" />
            <p className="text-sm font-semibold text-purple-300">chat</p>
          </div>
          
          <div className="flex flex-col items-center gap-3 p-6 border-2 border-green-800 rounded-2xl bg-gradient-to-br from-green-900/30 to-emerald-900/30 shadow-sm hover:shadow-lg transition-shadow">
            <ShieldCheck className="w-16 h-16 text-green-400 fill-green-400" />
            <p className="text-sm font-semibold text-green-300">verified_user</p>
          </div>
          
          <div className="flex flex-col items-center gap-3 p-6 border-2 border-indigo-800 rounded-2xl bg-gradient-to-br from-indigo-900/30 to-blue-900/30 shadow-sm hover:shadow-lg transition-shadow">
            <Building className="w-16 h-16 text-indigo-400" />
            <p className="text-sm font-semibold text-indigo-300">account_balance</p>
          </div>
          
          <div className="flex flex-col items-center gap-3 p-6 border-2 border-orange-800 rounded-2xl bg-gradient-to-br from-orange-900/30 to-yellow-900/30 shadow-sm hover:shadow-lg transition-shadow">
            <CreditCard className="w-16 h-16 text-orange-400" />
            <p className="text-sm font-semibold text-orange-300">payments</p>
          </div>
          
          <div className="flex flex-col items-center gap-3 p-6 border-2 border-slate-700 rounded-2xl bg-gradient-to-br from-slate-800 to-gray-800 shadow-sm hover:shadow-lg transition-shadow">
            <Settings className="w-16 h-16 text-gray-400" />
            <p className="text-sm font-semibold text-gray-300">settings</p>
          </div>
          
          <div className="flex flex-col items-center gap-3 p-6 border-2 border-blue-800 rounded-2xl bg-gradient-to-br from-blue-900/30 to-indigo-900/30 shadow-sm hover:shadow-lg transition-shadow">
            <Briefcase className="w-16 h-16 text-blue-400 fill-blue-400" />
            <p className="text-sm font-semibold text-blue-300">business_center</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-6 bg-green-900/30 border-2 border-green-700 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="w-8 h-8 text-green-400 fill-green-400" />
              <h3 className="text-xl font-bold text-green-300">Icons Working!</h3>
            </div>
            <p className="text-green-200">
              ✅ Icons from Lucide React are now working!
            </p>
          </div>
          
          <div className="p-6 bg-blue-900/30 border-2 border-blue-700 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-bold text-blue-300">Lucide Icons</h3>
            </div>
            <p className="text-blue-200 mb-2">
              ℹ️ Using Lucide React - a modern icon library
            </p>
            <ul className="list-disc ml-6 text-blue-200 space-y-1 text-sm">
              <li>Tree-shakeable (smaller bundle)</li>
              <li>Works perfectly with React</li>
              <li>Beautiful, consistent design</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
