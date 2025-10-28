// app/employer/worker-profile/[id]/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

type Review = {
  id: string;
  employerName: string;
  rating: number;
  comment: string;
  date: string;
  badges: string[];
};

export default function WorkerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  // Mock worker data
  const worker = {
    id,
    name: "Ramesh Kumar",
    avatar: "RK",
    skill: "Plumber",
    experience: "5 years",
    location: "Andheri, Mumbai",
    distance: "2.3 km",
    rating: 4.8,
    totalReviews: 12,
    jobsCompleted: 47,
    responseTime: "< 2 hours",
    availability: "Available Now",
    phone: "+91 98765 43210",
    verifications: {
      phone: true,
      aadhaar: true,
      upi: true,
      ngo: false,
    },
    skills: ["Plumbing", "Pipe Fitting", "Water Tank Installation", "Leak Repair"],
    languages: ["Hindi", "English", "Marathi"],
    hourlyRate: "₹500/hour",
    dailyRate: "₹3,000/day",
  };

  const reviews: Review[] = [
    {
      id: "1",
      employerName: "Rajesh Sharma",
      rating: 5,
      comment: "Excellent work! Very professional and completed the job on time.",
      date: "2 days ago",
      badges: ["On Time", "Professional", "Clean Work"],
    },
    {
      id: "2",
      employerName: "Priya Singh",
      rating: 4,
      comment: "Good service. The work was done well.",
      date: "1 week ago",
      badges: ["Friendly", "Fast"],
    },
    {
      id: "3",
      employerName: "Amit Patel",
      rating: 5,
      comment: "Fixed the issue quickly. Very knowledgeable!",
      date: "2 weeks ago",
      badges: ["Expert", "Honest"],
    },
  ];

  const trustScore = Object.values(worker.verifications).filter(Boolean).length * 25;

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#F9FAFB] dark:bg-[#101922]">
      
      {/* Header */}
      <header className="bg-white dark:bg-[#1F2937] shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F9FAFB] dark:hover:bg-[#101922]"
          >
            <span className="material-symbols-outlined text-[#6B7280] dark:text-[#9CA3AF]">
              arrow_back
            </span>
          </button>
          <h2 className="text-lg font-bold text-[#1F2937] dark:text-gray-100">
            Worker Profile
          </h2>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-4 pb-24">
        
        {/* Worker Header Card */}
        <div className="bg-white dark:bg-[#1F2937] rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-[#3B82F6] to-[#60A5FA] flex items-center justify-center text-white font-bold text-3xl shrink-0">
              {worker.avatar}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-[#1F2937] dark:text-gray-100 mb-1 flex items-center gap-2">
                {worker.name}
                {worker.verifications.aadhaar && (
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-xl">
                    verified
                  </span>
                )}
              </h1>
              <p className="text-[#6B7280] dark:text-[#9CA3AF] mb-3">
                {worker.skill} • {worker.experience}
              </p>
              
              {/* Trust Score Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1.5 rounded-full">
                <span className="material-symbols-outlined text-[#3B82F6] text-sm">shield</span>
                <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                  {trustScore}% Trust Score
                </span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-2xl font-bold text-[#1F2937] dark:text-gray-100">
                  {worker.rating}
                </span>
                <span className="material-symbols-outlined text-yellow-500 text-lg" style={{ fontVariationSettings: '"FILL" 1' }}>
                  star
                </span>
              </div>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                {worker.totalReviews} reviews
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#1F2937] dark:text-gray-100 mb-1">
                {worker.jobsCompleted}
              </p>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                Jobs Done
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#1F2937] dark:text-gray-100 mb-1">
                {worker.responseTime}
              </p>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                Response
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => router.push("/employer/rate-worker")}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#3B82F6] text-white hover:bg-[#2563EB] transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">person_add</span>
              <span className="text-xs font-semibold">Hire</span>
            </button>
            <button
              onClick={() => alert("Opening chat...")}
              className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-[#3B82F6] text-[#3B82F6] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">chat</span>
              <span className="text-xs font-semibold">Chat</span>
            </button>
            <button
              onClick={() => alert(`Calling ${worker.phone}...`)}
              className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-[#3B82F6] text-[#3B82F6] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">call</span>
              <span className="text-xs font-semibold">Call</span>
            </button>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          
          {/* Verification Status */}
          <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-5">
            <h3 className="font-bold text-[#1F2937] dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3B82F6]">verified</span>
              <span>Verifications</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {worker.verifications.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-base">check_circle</span>
                  <span className="text-[#1F2937] dark:text-gray-100">Phone Verified</span>
                </div>
              )}
              {worker.verifications.aadhaar && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-base">check_circle</span>
                  <span className="text-[#1F2937] dark:text-gray-100">Aadhaar Verified</span>
                </div>
              )}
              {worker.verifications.upi && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-base">check_circle</span>
                  <span className="text-[#1F2937] dark:text-gray-100">UPI Linked</span>
                </div>
              )}
              {worker.verifications.ngo && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-base">workspace_premium</span>
                  <span className="text-[#1F2937] dark:text-gray-100">NGO Verified</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-5">
            <h3 className="font-bold text-[#1F2937] dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3B82F6]">construction</span>
              <span>Skills</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {worker.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-semibold px-3 py-1.5 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Location & Availability */}
          <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-5">
            <h3 className="font-bold text-[#1F2937] dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3B82F6]">info</span>
              <span>Details</span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#6B7280] dark:text-[#9CA3AF]">location_on</span>
                <div>
                  <p className="text-sm text-[#1F2937] dark:text-gray-100">{worker.location}</p>
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">{worker.distance} away</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400">schedule</span>
                <p className="text-sm text-[#1F2937] dark:text-gray-100">{worker.availability}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#6B7280] dark:text-[#9CA3AF]">language</span>
                <p className="text-sm text-[#1F2937] dark:text-gray-100">{worker.languages.join(", ")}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#6B7280] dark:text-[#9CA3AF]">payments</span>
                <p className="text-sm text-[#1F2937] dark:text-gray-100">
                  {worker.hourlyRate} • {worker.dailyRate}
                </p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-5">
            <h3 className="font-bold text-[#1F2937] dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3B82F6]">star</span>
              <span>Recent Reviews</span>
            </h3>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-[#1F2937] dark:text-gray-100 text-sm">
                      {review.employerName}
                    </p>
                    <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                      {review.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`material-symbols-outlined text-sm ${
                          star <= review.rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"
                        }`}
                        style={{ fontVariationSettings: '"FILL" 1' }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-2">
                    {review.comment}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {review.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 dark:bg-gray-800 text-[#6B7280] dark:text-[#9CA3AF] text-xs font-semibold px-2 py-1 rounded-full"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1F2937] border-t border-[#D1D5DB] dark:border-[#4B5563] p-4">
        <div className="max-w-2xl mx-auto flex gap-3">
          <button
            onClick={() => alert(`Calling ${worker.phone}...`)}
            className="flex-1 bg-white dark:bg-[#101922] border-2 border-[#3B82F6] text-[#3B82F6] font-bold py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">call</span>
            <span>Call Now</span>
          </button>
          <button
            onClick={() => router.push("/employer/rate-worker")}
            className="flex-1 bg-[#3B82F6] text-white font-bold py-3 rounded-xl hover:bg-[#2563EB] transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <span className="material-symbols-outlined">person_add</span>
            <span>Hire Worker</span>
          </button>
        </div>
      </div>

    </div>
  );
}
