// app/employer/onboarding/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { Briefcase, CheckCircle, ShieldCheck, CreditCard } from 'lucide-react';

export default function EmployerOnboardingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/login?type=employer");
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#F9FAFB] dark:bg-[#101922]">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex w-full items-center justify-center p-6">
          <h2 className="text-xl font-bold text-[#3B82F6]">KaamSetu</h2>
        </header>

        <main className="flex flex-1 items-center justify-center py-5">
          <div className="flex w-full max-w-md flex-col items-center px-4">
            <div className="w-full bg-white dark:bg-[#1F2937] rounded-xl shadow-lg p-6 sm:p-8">
              <div className="flex flex-col items-center gap-6">
                {/* Icon */}
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#3B82F6]/10">
                  <Briefcase className="text-[#3B82F6] w-12 h-12" />
                </div>

                {/* Heading */}
                <div className="text-center">
                  <h1 className="text-[#1F2937] dark:text-gray-100 text-3xl font-bold mb-3">
                    Find Skilled Workers
                  </h1>
                  <p className="text-[#6B7280] dark:text-gray-300 text-base">
                    Post your job in 30 seconds and get matched with verified workers nearby
                  </p>
                </div>

                {/* Features */}
                <div className="w-full space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-[#3B82F6] w-6 h-6 mt-1" />
                    <div>
                      <h3 className="text-[#1F2937] dark:text-gray-100 font-semibold">
                        Instant Matching
                      </h3>
                      <p className="text-[#6B7280] dark:text-[#9CA3AF] text-sm">
                        Get connected with available workers in your area immediately
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="text-[#3B82F6] w-6 h-6 mt-1" />
                    <div>
                      <h3 className="text-[#1F2937] dark:text-gray-100 font-semibold">
                        Verified Profiles
                      </h3>
                      <p className="text-[#6B7280] dark:text-[#9CA3AF] text-sm">
                        All workers are verified with ratings and reviews
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CreditCard className="text-[#3B82F6] w-6 h-6 mt-1" />
                    <div>
                      <h3 className="text-[#1F2937] dark:text-gray-100 font-semibold">
                        Safe Payments
                      </h3>
                      <p className="text-[#6B7280] dark:text-[#9CA3AF] text-sm">
                        Secure payment options and job completion guarantee
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleGetStarted}
                  className="w-full rounded-lg bg-[#3B82F6] text-white py-4 text-lg font-semibold transition-all hover:bg-[#3B82F6]/90 hover:scale-[1.02] active:scale-100"
                >
                  Get Started
                </button>

                <p className="text-[#6B7280] dark:text-[#9CA3AF] text-sm text-center">
                  Quick login with phone number
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
