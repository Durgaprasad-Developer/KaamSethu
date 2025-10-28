// app/worker/onboarding/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mic } from 'lucide-react';

const languages = [
  { code: "hi", name: "हिंदी", label: "Hindi" },
  { code: "en", name: "English", label: "English" },
  { code: "mr", name: "मराठी", label: "Marathi" },
  { code: "ta", name: "தமிழ்", label: "Tamil" },
  { code: "te", name: "తెలుగు", label: "Telugu" },
  { code: "kn", name: "ಕನ್ನಡ", label: "Kannada" },
  { code: "bn", name: "বাংলা", label: "Bengali" },
  { code: "gu", name: "ગુજરાતી", label: "Gujarati" },
];

export default function WorkerOnboardingPage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    // Store in localStorage
    localStorage.setItem("preferredLanguage", code);
    // Navigate to phone login
    setTimeout(() => {
      router.push("/login?type=worker");
    }, 300);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#F9FAFB] dark:bg-[#101922]">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex w-full items-center justify-center p-6">
          <h2 className="text-xl font-bold text-[#3B82F6]">KaamSetu</h2>
        </header>

        <main className="flex flex-1 items-center justify-center py-5">
          <div className="flex w-full max-w-md flex-col items-center px-4">
            <div className="layout-content-container flex flex-col w-full max-w-[480px]">
              <h1 className="text-[#1F2937] dark:text-gray-100 tracking-tight text-[32px] font-bold leading-tight px-4 text-center pb-3 pt-6">
                KaamSetu mein aapka swagat hai!
              </h1>
              <p className="text-[#6B7280] dark:text-gray-300 text-base font-normal leading-normal pb-8 pt-1 px-4 text-center">
                Kripya aage badhne ke liye apni bhasha chunein.
              </p>

              {/* Language Selection Grid */}
              <div className="grid grid-cols-2 gap-3 px-4 pb-6">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedLanguage === lang.code
                        ? "border-[#3B82F6] bg-[#3B82F6]/10"
                        : "border-[#D1D5DB] dark:border-[#4B5563] bg-white dark:bg-[#1F2937] hover:border-[#3B82F6]/50"
                    }`}
                  >
                    <span className="text-2xl mb-2">{lang.name}</span>
                    <span className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                      {lang.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Voice Input */}
              <div className="mt-4 flex flex-col items-center gap-3 px-4">
                <p className="text-[#6B7280] dark:text-[#9CA3AF] text-sm text-center">
                  या
                </p>
                <button className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-[#3B82F6]/20 text-[#3B82F6] transition-all hover:bg-[#3B82F6]/30 hover:scale-105">
                  <Mic className="w-10 h-10" />
                </button>
                <p className="text-[#6B7280] dark:text-[#9CA3AF] text-sm">
                  🎤 Voice se bhasha chunein
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
