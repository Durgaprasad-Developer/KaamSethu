// app/worker/profile-preview/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WorkerProfilePreviewPage() {
  const router = useRouter();

  // Mock data - would come from voice recording/form
  const [profile] = useState({
    name: "राजेश कुमार",
    skill: "Plumber (नल का काम)",
    location: "Andheri West, Mumbai",
    experience: "5 years",
    phone: "+91 98XXX XXXXX",
  });

  const handleConfirm = () => {
    // TODO: Save to database
    router.push("/worker/dashboard");
  };

  const handleEdit = () => {
    router.push("/worker/voice-intro");
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#F9FAFB] dark:bg-[#101922]">
      
      {/* Header */}
      <header className="bg-white dark:bg-[#1F2937] shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#3B82F6]">KaamSetu</h2>
          <div className="flex items-center gap-2 text-[#6B7280] dark:text-[#9CA3AF] text-sm">
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>Step 4 of 4</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-4 py-8">
        
        {/* Success Message */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-3xl">
              check_circle
            </span>
            <div>
              <h3 className="font-bold text-green-800 dark:text-green-300">
                Profile Ready!
              </h3>
              <p className="text-sm text-green-700 dark:text-green-400">
                Aapki digital skill card tayyar hai
              </p>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-[#1F2937] rounded-2xl shadow-lg overflow-hidden mb-6">
          
          {/* Card Header */}
          <div className="bg-linear-to-r from-[#3B82F6] to-[#60A5FA] p-6 text-center">
            <div className="w-24 h-24 mx-auto bg-white dark:bg-gray-100 rounded-full flex items-center justify-center mb-3 shadow-lg">
              <span className="material-symbols-outlined text-[#3B82F6] text-5xl">
                person
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">{profile.name}</h2>
            <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
              <span className="material-symbols-outlined text-base">verified</span>
              <span>Phone Verified</span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 space-y-4">
            
            {/* Skill */}
            <div className="flex items-start gap-3 p-4 bg-[#F9FAFB] dark:bg-[#101922] rounded-xl">
              <span className="material-symbols-outlined text-[#3B82F6] text-2xl">
                construction
              </span>
              <div className="flex-1">
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-1">Skill</p>
                <p className="font-semibold text-[#1F2937] dark:text-gray-100">
                  {profile.skill}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3 p-4 bg-[#F9FAFB] dark:bg-[#101922] rounded-xl">
              <span className="material-symbols-outlined text-[#3B82F6] text-2xl">
                location_on
              </span>
              <div className="flex-1">
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-1">Location</p>
                <p className="font-semibold text-[#1F2937] dark:text-gray-100">
                  {profile.location}
                </p>
              </div>
            </div>

            {/* Experience */}
            <div className="flex items-start gap-3 p-4 bg-[#F9FAFB] dark:bg-[#101922] rounded-xl">
              <span className="material-symbols-outlined text-[#3B82F6] text-2xl">
                workspace_premium
              </span>
              <div className="flex-1">
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-1">Experience</p>
                <p className="font-semibold text-[#1F2937] dark:text-gray-100">
                  {profile.experience}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3 p-4 bg-[#F9FAFB] dark:bg-[#101922] rounded-xl">
              <span className="material-symbols-outlined text-[#3B82F6] text-2xl">
                phone
              </span>
              <div className="flex-1">
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-1">Contact</p>
                <p className="font-semibold text-[#1F2937] dark:text-gray-100">
                  {profile.phone}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleConfirm}
            className="w-full rounded-xl bg-[#3B82F6] text-white py-4 text-lg font-semibold transition-all hover:bg-[#3B82F6]/90 hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">check</span>
            <span>✅ Confirm - Sahi Hai</span>
          </button>

          <button
            onClick={handleEdit}
            className="w-full rounded-xl bg-white dark:bg-[#1F2937] border-2 border-[#3B82F6] text-[#3B82F6] py-3 text-base font-semibold transition-all hover:bg-[#3B82F6]/5 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">edit</span>
            <span>✏️ Edit - Badlav Karein</span>
          </button>
        </div>

        {/* Privacy Note */}
        <div className="mt-6 flex items-start gap-2 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
          <span className="material-symbols-outlined text-base">info</span>
          <p>
            Aapki profile sirf verified employers ko dikhegi. Aapki contact details tab share hongi jab aap apply karenge.
          </p>
        </div>

      </main>
    </div>
  );
}
