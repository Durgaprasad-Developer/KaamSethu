// app/worker/verification/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, Star, Check, Phone, CreditCard, Building2, Clock, Lock, FileText } from 'lucide-react';

type VerificationStatus = "pending" | "verified" | "not-started";

export default function WorkerVerificationPage() {
  const router = useRouter();
  
  const [verifications] = useState({
    phone: "verified" as VerificationStatus,
    aadhaar: "not-started" as VerificationStatus,
    upi: "pending" as VerificationStatus,
    ngo: "not-started" as VerificationStatus,
  });

  const handleVerify = (type: string) => {
    // TODO: Implement verification flow
    alert(`Starting ${type} verification...`);
  };

  const trustScore = Object.values(verifications).filter(v => v === "verified").length * 25;

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#F9FAFB] dark:bg-[#101922]">
      
      {/* Header */}
      <header className="bg-white dark:bg-[#1F2937] shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F9FAFB] dark:hover:bg-[#101922]"
          >
            <ArrowLeft className="text-[#6B7280] dark:text-[#9CA3AF] w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold text-[#1F2937] dark:text-gray-100">
            Trust & Verification
          </h2>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-4">
        
        {/* Trust Score Card */}
        <div className="bg-linear-to-br from-[#3B82F6] to-[#60A5FA] rounded-2xl shadow-lg p-6 mb-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm mb-1">Your Trust Score</p>
              <h1 className="text-5xl font-bold">{trustScore}%</h1>
            </div>
            <div className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center">
              <ShieldCheck className="w-12 h-12" />
            </div>
          </div>
          <p className="text-white/90 text-sm">
            {trustScore < 50 && "Complete verifications to increase your trust score and get more jobs"}
            {trustScore >= 50 && trustScore < 100 && "Great progress! Complete remaining verifications to reach 100%"}
            {trustScore === 100 && "🎉 Perfect! You're a fully verified worker"}
          </p>
        </div>

        {/* Benefits Card */}
        <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-5 mb-6">
          <h3 className="font-bold text-[#1F2937] dark:text-gray-100 mb-3 flex items-center gap-2">
            <Star className="text-[#3B82F6] w-5 h-5" />
            <span>Why Verify?</span>
          </h3>
          <ul className="space-y-2 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
            <li className="flex items-start gap-2">
              <Check className="text-green-600 w-5 h-5 mt-0.5 shrink-0" />
              <span>Get 3x more job requests</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="text-green-600 w-5 h-5 mt-0.5 shrink-0" />
              <span>Employers trust verified workers more</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="text-green-600 w-5 h-5 mt-0.5 shrink-0" />
              <span>Unlock secure payment options</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="text-green-600 w-5 h-5 mt-0.5 shrink-0" />
              <span>Appear higher in search results</span>
            </li>
          </ul>
        </div>

        {/* Verification Items */}
        <div className="space-y-4">
          
          {/* Phone Verification */}
          <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-5">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                verifications.phone === "verified" 
                  ? "bg-green-100 dark:bg-green-900/30" 
                  : "bg-gray-100 dark:bg-gray-800"
              }`}>
                {verifications.phone === "verified" ? (
                  <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                ) : (
                  <Phone className="w-6 h-6 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-[#1F2937] dark:text-gray-100">
                    Phone Verification
                  </h4>
                  {verifications.phone === "verified" && (
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold px-2 py-0.5 rounded-full">
                      VERIFIED
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-3">
                  Your phone number is verified via OTP
                </p>
                {verifications.phone === "verified" && (
                  <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Completed on {new Date().toLocaleDateString()}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Aadhaar Verification */}
          <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-5">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                verifications.aadhaar === "verified" 
                  ? "bg-green-100 dark:bg-green-900/30" 
                  : "bg-gray-100 dark:bg-gray-800"
              }`}>
                <FileText className={`w-6 h-6 ${
                  verifications.aadhaar === "verified" ? "text-green-600 dark:text-green-400" : "text-gray-400"
                }`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-[#1F2937] dark:text-gray-100">
                    Aadhaar Verification
                  </h4>
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold px-2 py-0.5 rounded-full">
                    RECOMMENDED
                  </span>
                </div>
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-3">
                  Verify your identity with Aadhaar for maximum trust
                </p>
                <button
                  onClick={() => handleVerify("Aadhaar")}
                  className="text-sm font-semibold text-[#3B82F6] hover:underline"
                >
                  Start Verification →
                </button>
              </div>
            </div>
          </div>

          {/* UPI Verification */}
          <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-5">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                verifications.upi === "verified" 
                  ? "bg-green-100 dark:bg-green-900/30" 
                  : verifications.upi === "pending"
                  ? "bg-yellow-100 dark:bg-yellow-900/30"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}>
                <CreditCard className={`w-6 h-6 ${
                  verifications.upi === "verified" 
                    ? "text-green-600 dark:text-green-400" 
                    : verifications.upi === "pending"
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-gray-400"
                }`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-[#1F2937] dark:text-gray-100">
                    UPI Account
                  </h4>
                  {verifications.upi === "pending" && (
                    <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-semibold px-2 py-0.5 rounded-full">
                      PENDING
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-3">
                  Link your UPI for secure payments
                </p>
                {verifications.upi === "pending" ? (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Verification in progress (24-48 hours)</span>
                  </p>
                ) : (
                  <button
                    onClick={() => handleVerify("UPI")}
                    className="text-sm font-semibold text-[#3B82F6] hover:underline"
                  >
                    Link UPI Account →
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* NGO Verification */}
          <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-5">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                verifications.ngo === "verified" 
                  ? "bg-green-100 dark:bg-green-900/30" 
                  : "bg-purple-100 dark:bg-purple-900/30"
              }`}>
                <Building2 className={`w-6 h-6 ${
                  verifications.ngo === "verified" 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-purple-600 dark:text-purple-400"
                }`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-[#1F2937] dark:text-gray-100">
                    NGO Partner Verification
                  </h4>
                  <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold px-2 py-0.5 rounded-full">
                    PREMIUM
                  </span>
                </div>
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-3">
                  Get verified through our NGO partners for premium badge
                </p>
                <button
                  onClick={() => handleVerify("NGO")}
                  className="text-sm font-semibold text-[#3B82F6] hover:underline"
                >
                  Learn More →
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Security Note */}
        <div className="mt-6 flex items-start gap-2 text-sm text-[#6B7280] dark:text-[#9CA3AF] bg-white dark:bg-[#1F2937] rounded-lg p-4">
          <Lock className="w-4 h-4 mt-0.5" />
          <p>
            Your personal information is encrypted and secure. We never share your documents with anyone.
          </p>
        </div>

      </main>
    </div>
  );
}
