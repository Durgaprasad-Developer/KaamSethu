// app/employer/matches/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, Filter, ArrowUpDown, Verified, Star, MapPin, Clock, MessageCircle, Phone, Info, Badge } from 'lucide-react';

const mockWorkers = [
  {
    id: 1,
    name: "राजेश कुमार",
    skill: "Plumber",
    experience: "5 years",
    rating: 4.8,
    reviews: 24,
    distance: "2.3 km",
    location: "Andheri West",
    verified: true,
    available: true,
    avatar: "RK",
    completedJobs: 45,
    responseTime: "Within 1 hour",
  },
  {
    id: 2,
    name: "सुरेश पटेल",
    skill: "Plumber",
    experience: "8 years",
    rating: 4.9,
    reviews: 38,
    distance: "3.5 km",
    location: "Versova",
    verified: true,
    available: true,
    avatar: "SP",
    completedJobs: 72,
    responseTime: "Within 30 mins",
  },
  {
    id: 3,
    name: "महेश शर्मा",
    skill: "Plumber",
    experience: "3 years",
    rating: 4.6,
    reviews: 15,
    distance: "4.1 km",
    location: "Juhu",
    verified: true,
    available: false,
    avatar: "MS",
    completedJobs: 28,
    responseTime: "Within 2 hours",
  },
];

export default function EmployerMatchesPage() {
  const router = useRouter();

  const handleHire = (workerId: number) => {
    // TODO: Implement hire functionality
    alert(`Hiring worker ${workerId}. This will connect you with the worker.`);
  };

  const handleCall = (workerId: number) => {
    // TODO: Implement call functionality
    alert(`Calling worker ${workerId}...`);
  };

  const handleChat = (workerId: number) => {
    // TODO: Implement chat functionality
    alert(`Opening chat with worker ${workerId}...`);
  };

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
          <div className="flex-1">
            <h2 className="text-lg font-bold text-[#3B82F6]">Available Workers</h2>
            <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
              {mockWorkers.length} workers found near you
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-4">
        
        {/* Success Banner */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600 dark:text-green-400 w-8 h-8" />
            <div>
              <h3 className="font-bold text-green-800 dark:text-green-300">
                Job Posted Successfully!
              </h3>
              <p className="text-sm text-green-700 dark:text-green-400">
                These verified workers match your requirements
              </p>
            </div>
          </div>
        </div>

        {/* Job Summary Card */}
        <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-[#1F2937] dark:text-gray-100 mb-1">
                Your Job: Plumber Needed
              </h3>
              <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                Andheri West · ₹800/day
              </p>
            </div>
            <button className="text-[#3B82F6] text-sm font-medium hover:underline">
              Edit
            </button>
          </div>
        </div>

        {/* Filter/Sort */}
        <div className="flex items-center gap-3 mb-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1F2937] rounded-lg shadow-sm text-sm font-medium text-[#1F2937] dark:text-gray-100 hover:shadow-md transition-shadow">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1F2937] rounded-lg shadow-sm text-sm font-medium text-[#1F2937] dark:text-gray-100 hover:shadow-md transition-shadow">
            <ArrowUpDown className="w-4 h-4" />
            <span>Sort by Distance</span>
          </button>
        </div>

        {/* Worker Cards */}
        <div className="space-y-4">
          {mockWorkers.map((worker) => (
            <div
              key={worker.id}
              className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              {/* Worker Header */}
              <div className="flex items-start gap-4 mb-4">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#3B82F6] to-[#60A5FA] flex items-center justify-center text-white font-bold text-xl shrink-0">
                  {worker.avatar}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-[#1F2937] dark:text-gray-100 text-lg">
                      {worker.name}
                    </h3>
                    {worker.verified && (
                      <Verified className="text-[#3B82F6] w-5 h-5" />
                    )}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-0.5 rounded">
                      <Star className="text-yellow-600 dark:text-yellow-400 w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">
                        {worker.rating}
                      </span>
                    </div>
                    <span className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                      ({worker.reviews} reviews)
                    </span>
                  </div>

                  {/* Experience & Location */}
                  <div className="flex flex-wrap gap-3 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                    <div className="flex items-center gap-1">
                      <Badge className="w-4 h-4" />
                      <span>{worker.experience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{worker.location} · {worker.distance}</span>
                    </div>
                  </div>
                </div>

                {/* Availability Badge */}
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  worker.available
                    ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                }`}>
                  {worker.available ? "Available" : "Busy"}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 p-3 bg-[#F9FAFB] dark:bg-[#101922] rounded-lg mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#3B82F6]">
                    {worker.completedJobs}
                  </p>
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                    Jobs Completed
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-[#1F2937] dark:text-gray-100">
                    {worker.responseTime}
                  </p>
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                    Response Time
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleHire(worker.id)}
                  className="flex-1 bg-[#3B82F6] text-white py-3 rounded-lg font-semibold hover:bg-[#3B82F6]/90 transition-all hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Hire Now</span>
                </button>
                
                <button
                  onClick={() => handleChat(worker.id)}
                  className="w-12 h-12 flex items-center justify-center border-2 border-[#3B82F6] text-[#3B82F6] rounded-lg hover:bg-[#3B82F6]/5 transition-colors"
                  title="Chat"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>

                <button
                  onClick={() => handleCall(worker.id)}
                  className="w-12 h-12 flex items-center justify-center border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                  title="Call"
                >
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Footer */}
        <div className="mt-6 flex items-start gap-2 text-sm text-[#6B7280] dark:text-[#9CA3AF] bg-white dark:bg-[#1F2937] rounded-lg p-4">
          <Info className="w-4 h-4 mt-0.5 shrink-0" />
          <p>
            Workers&apos; contact details will be shared after you hire them. All workers are verified with phone and identity checks.
          </p>
        </div>

      </main>
    </div>
  );
}
