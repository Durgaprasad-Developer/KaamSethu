// app/employer/post-job/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Wrench, Zap, Hammer, PaintBucket, Sparkles, 
  Car, ChefHat, HandHelping, Bot, MapPin, Search, Info 
} from 'lucide-react';

const popularSkills = [
  { name: "Plumber", icon: Wrench, hindi: "नल का काम" },
  { name: "Electrician", icon: Zap, hindi: "बिजली का काम" },
  { name: "Carpenter", icon: Hammer, hindi: "बढ़ई" },
  { name: "Painter", icon: PaintBucket, hindi: "पेंटर" },
  { name: "Cleaner", icon: Sparkles, hindi: "सफाई कर्मी" },
  { name: "Driver", icon: Car, hindi: "ड्राइवर" },
  { name: "Cook", icon: ChefHat, hindi: "रसोइया" },
  { name: "Helper", icon: HandHelping, hindi: "मददगार" },
];

export default function EmployerPostJobPage() {
  const router = useRouter();
  const [selectedSkill, setSelectedSkill] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [startImmediately, setStartImmediately] = useState(true);

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSkill) {
      alert("Please select a skill");
      return;
    }
    // TODO: Save to database
    router.push("/employer/matches");
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#F9FAFB] dark:bg-[#101922]">
      
      {/* Header */}
      <header className="bg-white dark:bg-[#1F2937] shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h2 className="text-lg font-bold text-[#3B82F6]">KaamSetu</h2>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-4 py-8">
        
        {/* Welcome Message */}
        <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3B82F6]/10 flex items-center justify-center shrink-0">
              <Bot className="w-6 h-6 text-[#3B82F6]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF] mb-1">
                JobBot
              </p>
              <p className="text-[#1F2937] dark:text-gray-100">
                Welcome! Post your job in just 30 seconds and get matched with verified workers.
              </p>
            </div>
          </div>
        </div>

        {/* Post Job Form */}
        <form onSubmit={handlePostJob} className="space-y-6">
          
          {/* What skill needed? */}
          <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-6">
            <label className="block text-base font-semibold text-[#1F2937] dark:text-gray-100 mb-4">
              What skill do you need? *
            </label>
            
            {/* Popular Skills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {popularSkills.map((skill) => (
                <button
                  key={skill.name}
                  type="button"
                  onClick={() => setSelectedSkill(skill.name)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    selectedSkill === skill.name
                      ? "border-[#3B82F6] bg-[#3B82F6]/10"
                      : "border-[#D1D5DB] dark:border-[#4B5563] hover:border-[#3B82F6]/50"
                  }`}
                >
                  <skill.icon className="w-8 h-8 text-[#3B82F6]" />
                  <span className="text-xs font-medium text-[#1F2937] dark:text-gray-100 text-center">
                    {skill.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Custom Skill Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Or type custom skill..."
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#D1D5DB] dark:border-[#4B5563] bg-transparent focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 text-[#1F2937] dark:text-[#F9FAFB]"
              />
            </div>
          </div>

          {/* Location (Auto-filled) */}
          <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-6">
            <label className="block text-base font-semibold text-[#1F2937] dark:text-gray-100 mb-3">
              Location
            </label>
            <div className="flex items-center gap-3 p-4 bg-[#F9FAFB] dark:bg-[#101922] rounded-lg">
              <MapPin className="w-5 h-5 text-[#3B82F6]" />
              <div className="flex-1">
                <p className="font-medium text-[#1F2937] dark:text-gray-100">
                  Andheri West, Mumbai
                </p>
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                  Auto-detected from your location
                </p>
              </div>
              <button
                type="button"
                className="text-[#3B82F6] text-sm font-medium hover:underline"
              >
                Change
              </button>
            </div>
          </div>

          {/* Budget */}
          <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-6">
            <label htmlFor="budget" className="block text-base font-semibold text-[#1F2937] dark:text-gray-100 mb-3">
              Budget / Pay
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] dark:text-[#9CA3AF] font-semibold">
                ₹
              </span>
              <input
                id="budget"
                type="number"
                placeholder="500"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full pl-8 pr-4 py-3 rounded-lg border border-[#D1D5DB] dark:border-[#4B5563] bg-transparent focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 text-[#1F2937] dark:text-[#F9FAFB]"
              />
            </div>
            <p className="mt-2 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
              Enter approximate budget per day/hour
            </p>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-6">
            <label htmlFor="description" className="block text-base font-semibold text-[#1F2937] dark:text-gray-100 mb-3">
              Job Description (Optional)
            </label>
            <textarea
              id="description"
              placeholder="E.g., Need plumber to fix leaking tap in kitchen..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-[#D1D5DB] dark:border-[#4B5563] bg-transparent focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 text-[#1F2937] dark:text-[#F9FAFB] resize-none"
            />
          </div>

          {/* Start Immediately */}
          <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#1F2937] dark:text-gray-100 mb-1">
                  Start Immediately?
                </p>
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                  Worker can come today
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStartImmediately(!startImmediately)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  startImmediately ? "bg-[#3B82F6]" : "bg-[#D1D5DB] dark:bg-[#4B5563]"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    startImmediately ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-[#3B82F6] text-white py-4 text-lg font-semibold transition-all hover:bg-[#3B82F6]/90 hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            <span>Find Workers</span>
          </button>
        </form>

        {/* Info */}
        <div className="mt-6 flex items-start gap-2 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
          <Info className="w-4 h-4 mt-0.5" />
          <p>
            Your contact details will only be shared with workers after you approve them.
          </p>
        </div>

      </main>
    </div>
  );
}
