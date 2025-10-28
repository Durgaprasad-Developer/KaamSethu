// app/worker/voice-intro/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Mic, CheckCircle, MessageSquare, ArrowLeft, Lock } from 'lucide-react';

export default function WorkerVoiceIntroPage() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    // Simulate recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      setRecordingComplete(true);
    }, 3000);
  };

  const handleContinue = () => {
    router.push("/worker/profile-preview");
  };

  const handleSkip = () => {
    router.push("/worker/profile-preview");
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 bg-linear-to-br from-[#3B82F6]/10 to-[#F9FAFB] dark:from-[#3B82F6]/5 dark:to-[#101922]">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-8">
          
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#3B82F6] mb-2">KaamSetu</h2>
            <div className="flex items-center justify-center gap-2 text-[#6B7280] dark:text-[#9CA3AF] text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Step 3 of 4: Tell us about yourself</span>
            </div>
          </div>

          {/* AI Assistant Card */}
          <div className="w-full bg-white dark:bg-[#1F2937] rounded-2xl shadow-lg p-8">
            
            {/* AI Avatar */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className={`w-32 h-32 rounded-full bg-linear-to-br from-[#3B82F6] to-[#60A5FA] flex items-center justify-center shadow-xl ${isRecording ? 'animate-pulse' : ''}`}>
                  {isRecording ? (
                    <Mic className="w-16 h-16 text-white" />
                  ) : (
                    <MessageSquare className="w-16 h-16 text-white" />
                  )}
                </div>
                {isRecording && (
                  <div className="absolute inset-0 rounded-full border-4 border-[#3B82F6] animate-ping"></div>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-[#1F2937] dark:text-gray-100 mb-2">
                {!recordingComplete ? "Namaste! 🙏" : "Bahut badhiya! ✅"}
              </h3>
              {!recordingComplete ? (
                <p className="text-[#6B7280] dark:text-[#9CA3AF] text-base leading-relaxed">
                  Main aapki madad karunga. Kripya button daba kar bataiye:
                </p>
              ) : (
                <p className="text-[#6B7280] dark:text-[#9CA3AF] text-base leading-relaxed">
                  Aapki jaankari save ho gayi hai. Aage badhein!
                </p>
              )}
            </div>

            {/* Questions to ask (voice prompts) */}
            {!recordingComplete && !isRecording && (
              <div className="bg-[#F9FAFB] dark:bg-[#101922] rounded-xl p-4 mb-6">
                <p className="text-sm font-semibold text-[#1F2937] dark:text-gray-100 mb-2">
                  Main yeh poochhunga:
                </p>
                <ul className="space-y-2 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#3B82F6] mt-0.5" />
                    <span>Aapka naam kya hai?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#3B82F6] mt-0.5" />
                    <span>Aap kaunsa kaam karte hain? (skill)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#3B82F6] mt-0.5" />
                    <span>Aap kahan rehte hain? (location)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#3B82F6] mt-0.5" />
                    <span>Kitne saal ka experience hai?</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Recording Status */}
            {isRecording && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <p className="text-red-600 dark:text-red-400 font-semibold">
                    Recording... Bol rahe hain...
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {!recordingComplete ? (
                <>
                  <button
                    onClick={handleStartRecording}
                    disabled={isRecording}
                    className={`w-full rounded-xl py-4 text-lg font-semibold transition-all flex items-center justify-center gap-3 ${
                      isRecording
                        ? 'bg-[#D1D5DB] dark:bg-[#4B5563] text-white/50 cursor-not-allowed'
                        : 'bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90 hover:scale-[1.02] active:scale-100'
                    }`}
                  >
                    <Mic className="w-6 h-6" />
                    <span>{isRecording ? 'Recording...' : 'Shuru Karein (Voice)'}</span>
                  </button>
                  
                  <button
                    onClick={handleSkip}
                    className="w-full rounded-xl py-3 text-base font-medium text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#3B82F6] transition-colors"
                  >
                    Skip - Form se bharein
                  </button>
                </>
              ) : (
                <button
                  onClick={handleContinue}
                  className="w-full rounded-xl bg-green-600 text-white py-4 text-lg font-semibold transition-all hover:bg-green-700 hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-2"
                >
                  <span>Aage Badhein</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Bottom hint */}
          <p className="text-center text-sm text-[#6B7280] dark:text-[#9CA3AF] flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            Aapki jaankari safe hai
          </p>
        </div>
      </div>
    </div>
  );
}
