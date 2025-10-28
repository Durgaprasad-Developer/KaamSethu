// app/verify-otp/page.tsx
"use client";

import { verifyOtp } from "./actions";
import OtpInput from "./OtpInput";
import { useSearchParams } from "next/navigation";
import { Bot } from 'lucide-react';
import { Suspense } from 'react';

// This component reads the phone number from the URL
function VerifyOtpContent() {
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const userType = searchParams.get("type") || "worker";
  const message = searchParams.get("message") || "";
  
  // Mask phone number for display (show last 3 digits)
  const maskedPhone = phone 
    ? `+XX XXXXXXX${phone.slice(-3)}`
    : "+XX XXXXXXX123";

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 bg-[#F9FAFB] dark:bg-[#101922]">
      <div className="w-full max-w-md">
        {/* Container Card */}
        <div className="flex flex-col gap-6 rounded-xl bg-white dark:bg-[#1F2937] p-6 sm:p-8 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.05),0_2px_4px_-2px_rgb(0_0_0/0.05)]">
          
          {/* Progress Bar */}
          <div className="flex flex-col gap-2">
            <p className="text-[#6B7280] dark:text-[#9CA3AF] text-sm font-medium">
              Step 2 of 4: Phone Verification
            </p>
            <div className="h-1.5 w-full rounded-full bg-[#F9FAFB] dark:bg-[#101922]">
              <div className="h-1.5 rounded-full bg-[#3B82F6]" style={{ width: "50%" }}></div>
            </div>
          </div>

          {/* Chatbot Message */}
          <div className="flex items-start gap-3">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10 shrink-0 flex items-center justify-center bg-[#3B82F6]/10 dark:bg-[#3B82F6]/20">
              <Bot className="text-[#3B82F6] w-6 h-6" />
            </div>
            <div className="flex flex-1 flex-col gap-2 items-start">
              <p className="text-[#6B7280] dark:text-[#9CA3AF] text-sm font-medium">
                JobBot
              </p>
              <div className="text-base font-normal leading-relaxed rounded-lg rounded-tl-none px-4 py-3 bg-[#F9FAFB] dark:bg-[#101922] text-[#1F2937] dark:text-[#F9FAFB]">
                <h4 className="font-bold mb-1">Let&apos;s verify it&apos;s you.</h4>
                <p>
                  We&apos;ve sent a 6-digit verification code to {maskedPhone}. Please
                  enter it below to continue.
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {message && (
            <div className="px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400">
                {message}
              </p>
            </div>
          )}

          {/* OTP Form */}
          <form action={verifyOtp}>
            {/* Hidden inputs to pass data to the action */}
            <input type="hidden" name="phone" value={phone} />
            <input type="hidden" name="userType" value={userType} />
            
            {/* OTP Input Component */}
            <OtpInput />

            {/* Resend OTP */}
            <div className="text-center mt-6">
              <p className="text-[#6B7280] dark:text-[#9CA3AF] text-sm">
                Didn&apos;t receive a code?{" "}
                <a
                  className="font-semibold text-[#3B82F6] hover:underline"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    // TODO: Implement resend OTP functionality
                    alert("Resend OTP functionality coming soon!");
                  }}
                >
                  Resend OTP
                </a>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="verify-button"
              className="w-full rounded-lg bg-[#D1D5DB] dark:bg-[#4B5563] text-white/80 dark:text-[#F9FAFB]/50 py-3 text-base font-semibold transition-colors disabled:cursor-not-allowed mt-6 data-[enabled=true]:bg-[#3B82F6] data-[enabled=true]:text-white data-[enabled=true]:hover:bg-[#3B82F6]/90"
              disabled
            >
              Verify &amp; Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}
