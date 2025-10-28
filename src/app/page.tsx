// app/welcome/page.tsx
"use client";

import Link from "next/link";
import { Briefcase, Headphones, Mic, Users, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex justify-center items-center py-6 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Briefcase className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              KaamSetu
            </span>
          </div>
        </header>

        <main className="px-4 flex flex-1 justify-center py-8">
          <div className="layout-content-container flex flex-col max-w-[540px] w-full flex-1">
            <div className="flex flex-col flex-1 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700">
              <div className="grow p-6 md:p-8 space-y-8">
                {/* SingleMessage Component */}
                <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl border border-slate-600">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg">
                    <Headphones className="text-white w-6 h-6" />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-gray-400 text-sm font-semibold">
                      KaamSetu Sahayak
                    </p>
                    <p className="text-base leading-relaxed text-gray-200 bg-slate-700 px-5 py-4 rounded-xl shadow-sm border border-slate-600">
                      Namaste 🙏 Main KaamSetu sahayak hoon. Aap yahan kaam
                      dhundne aaye hain, ya kaam dene aaye hain?
                    </p>
                  </div>
                </div>

                {/* ButtonGroup Component */}
                <div className="flex justify-center">
                  <div className="flex flex-1 gap-4 max-w-[480px] flex-col items-stretch px-2">
                    <Link 
                      href="/worker/onboarding"
                      className="group flex items-center justify-center gap-3 rounded-xl h-14 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-base font-bold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-500/50 transform hover:-translate-y-0.5"
                    >
                      <Users className="w-6 h-6" />
                      <span>Kaam dhundna hai (Worker)</span>
                    </Link>
                    <Link 
                      href="/employer/onboarding"
                      className="group flex items-center justify-center gap-3 rounded-xl h-14 px-6 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-base font-bold shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-indigo-700 focus:ring-4 focus:ring-indigo-500/50 transform hover:-translate-y-0.5"
                    >
                      <Briefcase className="w-6 h-6" />
                      <span>Kaam dena hai (Employer)</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 p-6 md:p-8 bg-gradient-to-br from-slate-800 to-slate-900">
                <div className="flex items-center justify-center gap-5">
                  {/* FAB as Microphone Button */}
                  <button className="flex items-center justify-center rounded-full h-16 w-16 bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-lg hover:shadow-xl hover:from-red-600 hover:to-pink-700 focus:ring-4 focus:ring-red-500/50 transform hover:scale-110">
                    <Mic className="w-7 h-7" />
                  </button>
                  {/* MetaText Component */}
                  <div className="flex flex-col">
                    <p className="text-gray-200 font-semibold text-base">
                      🎤 Voice se bhi bol sakte hain
                    </p>
                    <p className="text-gray-400 text-sm">
                      Apni bhasha mein baat karein
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 px-4 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            Secure & Trusted Platform
          </p>
        </footer>
      </div>
    </div>
  );
}

