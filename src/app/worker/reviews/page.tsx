// app/worker/reviews/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Star, MessageSquare } from 'lucide-react';

type Review = {
  id: string;
  employerName: string;
  employerAvatar: string;
  jobTitle: string;
  rating: number;
  comment: string;
  date: string;
  badges: string[];
};

export default function WorkerReviewsPage() {
  const router = useRouter();

  const mockReviews: Review[] = [
    {
      id: "1",
      employerName: "Rajesh Kumar",
      employerAvatar: "RK",
      jobTitle: "Plumbing Work",
      rating: 5,
      comment: "Excellent work! Very professional and completed the job on time. Highly recommended for plumbing work.",
      date: "2 days ago",
      badges: ["On Time", "Professional", "Clean Work"],
    },
    {
      id: "2",
      employerName: "Priya Sharma",
      employerAvatar: "PS",
      jobTitle: "Home Cleaning",
      rating: 4,
      comment: "Good service. The house was cleaned well. Would hire again.",
      date: "1 week ago",
      badges: ["Friendly", "Thorough"],
    },
    {
      id: "3",
      employerName: "Amit Patel",
      employerAvatar: "AP",
      jobTitle: "Electrical Repair",
      rating: 5,
      comment: "Fixed the wiring issue quickly. Very knowledgeable and explained everything clearly.",
      date: "2 weeks ago",
      badges: ["Expert", "Fast", "Honest"],
    },
  ];

  const averageRating = (mockReviews.reduce((acc, r) => acc + r.rating, 0) / mockReviews.length).toFixed(1);
  const totalJobs = mockReviews.length;

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#F9FAFB] dark:bg-[#101922]">
      
      {/* Header */}
      <header className="bg-white dark:bg-[#1F2937] shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F9FAFB] dark:hover:bg-[#101922]"
          >
            <ArrowLeft className="w-5 h-5 text-[#6B7280] dark:text-[#9CA3AF]" />
          </button>
          <h2 className="text-lg font-bold text-[#1F2937] dark:text-gray-100">
            My Reviews & Ratings
          </h2>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-4">
        
        {/* Rating Summary Card */}
        <div className="bg-white dark:bg-[#1F2937] rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#1F2937] dark:text-gray-100 mb-2">
                {averageRating}
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= parseFloat(averageRating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                {totalJobs} {totalJobs === 1 ? "review" : "reviews"}
              </p>
            </div>

            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = mockReviews.filter((r) => r.rating === star).length;
                const percentage = (count / totalJobs) * 100;
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-sm text-[#6B7280] dark:text-[#9CA3AF] w-8">
                      {star}★
                    </span>
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-[#6B7280] dark:text-[#9CA3AF] w-8 text-right">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {mockReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-5"
            >
              {/* Employer Info */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#3B82F6] to-[#60A5FA] flex items-center justify-center text-white font-bold shrink-0">
                  {review.employerAvatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#1F2937] dark:text-gray-100">
                    {review.employerName}
                  </h3>
                  <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                    {review.jobTitle}
                  </p>
                </div>
                <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                  {review.date}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-sm text-[#1F2937] dark:text-gray-100 mb-3">
                {review.comment}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {review.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (hidden when there are reviews) */}
        {mockReviews.length === 0 && (
          <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-10 text-center">
            <MessageSquare className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4 mx-auto" />
            <h3 className="font-bold text-[#1F2937] dark:text-gray-100 mb-2">
              No Reviews Yet
            </h3>
            <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
              Complete your first job to receive reviews from employers
            </p>
          </div>
        )}

      </main>
    </div>
  );
}
