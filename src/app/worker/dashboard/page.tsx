// app/worker/dashboard/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Home, Briefcase, User, Bell, MapPin, Phone, 
  Star, ShieldCheck, TrendingUp, ChevronRight 
} from 'lucide-react';

const mockJobs = [
  {
    id: 1,
    title: "Plumber Needed",
    skill: "Plumbing",
    employer: "राजेश शर्मा",
    location: "Andheri West, Mumbai",
    distance: "2.3 km",
    budget: "₹800/day",
    urgent: true,
    posted: "2 hours ago",
    description: "Fix leaking tap in kitchen",
  },
  {
    id: 2,
    title: "Electrician Required",
    skill: "Electrical",
    employer: "Priya Singh",
    location: "Juhu, Mumbai",
    distance: "4.1 km",
    budget: "₹1200/day",
    urgent: false,
    posted: "5 hours ago",
    description: "Install new fan and wiring",
  },
  {
    id: 3,
    title: "Plumbing Work",
    skill: "Plumbing",
    employer: "महेश पटेल",
    location: "Versova, Mumbai",
    distance: "3.5 km",
    budget: "₹600/day",
    urgent: false,
    posted: "1 day ago",
    description: "Bathroom pipe repair",
  },
];

export default function WorkerDashboardPage() {
  const [activeTab, setActiveTab] = useState<"home" | "myjobs" | "profile">("home");
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      
      {/* Header */}
      <header className="glass-dark sticky top-0 z-10 border-b border-slate-700 shadow-sm backdrop-blur-lg">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <Briefcase className="text-white w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                KaamSetu
              </h2>
            </div>
            <button className="relative w-11 h-11 flex items-center justify-center rounded-full hover:bg-slate-700 transition-colors">
              <Bell className="text-gray-300 w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full pb-24">
        
        {/* Home Tab Content */}
        {activeTab === "home" && (
          <>
            {/* Greeting & Trust Badge */}
            <div className="p-4 space-y-4">
              <div className="bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-700">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-100 mb-2 flex items-center gap-2">
                      Namaste, राजेश! 
                      <span className="text-2xl">👋</span>
                    </h1>
                    <p className="text-gray-400 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      {mockJobs.length} new jobs available near you
                    </p>
                  </div>
                  <button
                    onClick={() => router.push("/worker/verification")}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    75% Trust
                  </button>
                </div>
                
                {/* Trust Badge */}
                <div className="inline-flex items-center gap-2 bg-green-900/30 border-2 border-green-700 rounded-full px-4 py-2">
                  <ShieldCheck className="text-green-400 w-5 h-5" />
                  <span className="text-sm font-semibold text-green-300">
                    Phone Verified
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-slate-800 rounded-xl shadow-lg p-5 flex flex-col items-center gap-3 hover:shadow-xl transform hover:-translate-y-1 transition-all border border-slate-700">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                    <User className="text-white w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-gray-200">
                    Edit Profile
                  </span>
                </button>
                <button className="bg-slate-800 rounded-xl shadow-lg p-5 flex flex-col items-center gap-3 hover:shadow-xl transform hover:-translate-y-1 transition-all border border-slate-700">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                    <TrendingUp className="text-white w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-gray-200">
                    Share Profile
                  </span>
                </button>
              </div>

              {/* Jobs Near You Section */}
              <div>
                <div className="flex items-center justify-between mb-4 px-1">
                  <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
                    <Briefcase className="text-blue-400 w-6 h-6" />
                    Jobs Near You
                  </h2>
                  <button className="text-sm text-blue-400 font-semibold hover:text-blue-300 flex items-center gap-1">
                    View All
                    <span className="text-base">→</span>
                  </button>
                </div>

                {/* Job Cards */}
                <div className="space-y-4">
                  {mockJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-slate-800 rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all border border-slate-700"
                    >
                      {/* Job Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-gray-100 text-lg">
                              {job.title}
                            </h3>
                            {job.urgent && (
                              <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                                <span className="text-xs">⚡</span>
                                URGENT
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400 flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {job.employer} · {job.posted}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-400 text-xl">
                            {job.budget}
                          </p>
                        </div>
                      </div>

                      {/* Job Details */}
                      <p className="text-sm text-gray-300 mb-4 bg-slate-700 rounded-lg p-3">
                        {job.description}
                      </p>

                      {/* Location & Distance */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1.5 bg-blue-900/30 px-3 py-1.5 rounded-lg border border-blue-800">
                          <MapPin className="w-4 h-4 text-blue-400" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-indigo-900/30 px-3 py-1.5 rounded-lg border border-indigo-800">
                          <MapPin className="w-4 h-4 text-indigo-400" />
                          <span>{job.distance}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 shadow-md">
                          <span className="text-xl">✓</span>
                          <span>Apply Now</span>
                        </button>
                        <button className="w-12 h-12 flex items-center justify-center border-2 border-blue-500 text-blue-400 rounded-xl hover:bg-blue-900/30 transition-colors shadow-sm">
                          <Phone className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* My Jobs Tab Content */}
        {activeTab === "myjobs" && (
          <div className="p-4">
            <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-8 text-center">
              <Briefcase className="text-[#6B7280] dark:text-[#9CA3AF] w-16 h-16 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#1F2937] dark:text-gray-100 mb-2">
                No Active Jobs
              </h3>
              <p className="text-[#6B7280] dark:text-[#9CA3AF] mb-4">
                Apply to jobs to see them here
              </p>
              <button
                onClick={() => setActiveTab("home")}
                className="bg-[#3B82F6] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#3B82F6]/90"
              >
                Browse Jobs
              </button>
            </div>
          </div>
        )}

        {/* Profile Tab Content */}
        {activeTab === "profile" && (
          <div className="p-4">
            <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-[#3B82F6]/10 flex items-center justify-center">
                  <User className="text-[#3B82F6] w-10 h-10" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-[#1F2937] dark:text-gray-100">
                    राजेश कुमार
                  </h2>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF]">
                    Plumber · 5 years exp
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-[#F9FAFB] dark:hover:bg-[#101922] transition-colors">
                  <User className="text-[#3B82F6] w-5 h-5" />
                  <span className="flex-1 text-left text-[#1F2937] dark:text-gray-100 font-medium">
                    Edit Profile
                  </span>
                  <span className="text-[#6B7280]">→</span>
                </button>

                <button 
                  onClick={() => router.push("/worker/verification")}
                  className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-[#F9FAFB] dark:hover:bg-[#101922] transition-colors"
                >
                  <ShieldCheck className="text-[#3B82F6] w-5 h-5" />
                  <span className="flex-1 text-left text-[#1F2937] dark:text-gray-100 font-medium">
                    Verification Status
                  </span>
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold mr-2">
                    75%
                  </span>
                  <span className="text-[#6B7280]">→</span>
                </button>

                <button 
                  onClick={() => router.push("/worker/reviews")}
                  className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-[#F9FAFB] dark:hover:bg-[#101922] transition-colors"
                >
                  <Star className="text-[#3B82F6] w-5 h-5" />
                  <span className="flex-1 text-left text-[#1F2937] dark:text-gray-100 font-medium">
                    Reviews & Ratings
                  </span>
                  <span className="text-sm text-yellow-600 dark:text-yellow-400 font-semibold mr-2">
                    4.8 ⭐
                  </span>
                  <ChevronRight className="w-5 h-5 text-[#6B7280]" />
                </button>

                <button className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-[#F9FAFB] dark:hover:bg-[#101922] transition-colors">
                  <User className="text-[#3B82F6] w-5 h-5" />
                  <span className="flex-1 text-left text-[#1F2937] dark:text-gray-100 font-medium">
                    Settings
                  </span>
                  <span className="text-[#6B7280]">→</span>
                </button>

                <button className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-[#F9FAFB] dark:hover:bg-[#101922] transition-colors">
                  <span className="text-red-500 text-xl">⎋</span>
                  <span className="flex-1 text-left text-red-500 font-medium">
                    Logout
                  </span>
                  <span className="text-[#6B7280]">→</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-dark border-t border-slate-700 z-20 shadow-2xl">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-around">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center gap-1.5 py-2 px-5 rounded-xl transition-all ${
              activeTab === "home"
                ? "text-blue-400 bg-blue-900/30"
                : "text-gray-400 hover:text-gray-200 hover:bg-slate-700"
            }`}
          >
            <Home 
              className="w-6 h-6" 
              fill={activeTab === "home" ? "currentColor" : "none"}
            />
            <span className="text-xs font-semibold">Home</span>
          </button>
          
          <button
            onClick={() => setActiveTab("myjobs")}
            className={`flex flex-col items-center gap-1.5 py-2 px-5 rounded-xl transition-all ${
              activeTab === "myjobs"
                ? "text-blue-400 bg-blue-900/30"
                : "text-gray-400 hover:text-gray-200 hover:bg-slate-700"
            }`}
          >
            <Briefcase 
              className="w-6 h-6" 
              fill={activeTab === "myjobs" ? "currentColor" : "none"}
            />
            <span className="text-xs font-semibold">My Jobs</span>
          </button>
          
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex flex-col items-center gap-1.5 py-2 px-5 rounded-xl transition-all ${
              activeTab === "profile"
                ? "text-blue-400 bg-blue-900/30"
                : "text-gray-400 hover:text-gray-200 hover:bg-slate-700"
            }`}
          >
            <User 
              className="w-6 h-6" 
              fill={activeTab === "profile" ? "currentColor" : "none"}
            />
            <span className="text-xs font-semibold">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

