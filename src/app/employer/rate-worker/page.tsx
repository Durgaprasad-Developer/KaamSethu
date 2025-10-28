// app/employer/rate-worker/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RateWorkerPage() {
  const router = useRouter();
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [review, setReview] = useState("");

  const worker = {
    name: "Ramesh Kumar",
    avatar: "RK",
    skill: "Plumber",
    jobCompleted: "Fixed bathroom leak",
  };

  const badges = [
    "On Time",
    "Professional",
    "Clean Work",
    "Friendly",
    "Expert",
    "Fast",
    "Honest",
    "Good Value",
    "Thorough",
    "Polite",
  ];

  const handleBadgeToggle = (badge: string) => {
    if (selectedBadges.includes(badge)) {
      setSelectedBadges(selectedBadges.filter((b) => b !== badge));
    } else {
      if (selectedBadges.length < 5) {
        setSelectedBadges([...selectedBadges, badge]);
      }
    }
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    // TODO: Submit rating to database
    alert(`Rating submitted! ${rating} stars with ${selectedBadges.length} badges`);
    router.push("/employer/matches");
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
            <span className="material-symbols-outlined text-[#6B7280] dark:text-[#9CA3AF]">
              arrow_back
            </span>
          </button>
          <h2 className="text-lg font-bold text-[#1F2937] dark:text-gray-100">
            Rate Your Experience
          </h2>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-4">
        
        {/* Worker Card */}
        <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-5 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#3B82F6] to-[#60A5FA] flex items-center justify-center text-white font-bold text-xl shrink-0">
              {worker.avatar}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#1F2937] dark:text-gray-100 text-lg">
                {worker.name}
              </h3>
              <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                {worker.skill}
              </p>
              <p className="text-sm text-[#3B82F6] mt-1">
                ✓ Job completed: {worker.jobCompleted}
              </p>
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-6 mb-6">
          <h3 className="font-bold text-[#1F2937] dark:text-gray-100 mb-2">
            How was your experience?
          </h3>
          <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-4">
            Your rating helps other employers find great workers
          </p>
          
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110"
              >
                <span
                  className={`material-symbols-outlined text-5xl ${
                    star <= (hoverRating || rating)
                      ? "text-yellow-500"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  star
                </span>
              </button>
            ))}
          </div>

          {rating > 0 && (
            <p className="text-center text-sm font-semibold text-[#1F2937] dark:text-gray-100">
              {rating === 5 && "Outstanding! 🌟"}
              {rating === 4 && "Great work! 👍"}
              {rating === 3 && "Good 👌"}
              {rating === 2 && "Could be better"}
              {rating === 1 && "Not satisfied"}
            </p>
          )}
        </div>

        {/* Badges Section */}
        {rating > 0 && (
          <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-6 mb-6">
            <h3 className="font-bold text-[#1F2937] dark:text-gray-100 mb-2">
              What did you like? (Optional)
            </h3>
            <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-4">
              Select up to 5 qualities
            </p>
            
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => {
                const isSelected = selectedBadges.includes(badge);
                return (
                  <button
                    key={badge}
                    onClick={() => handleBadgeToggle(badge)}
                    disabled={!isSelected && selectedBadges.length >= 5}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                      isSelected
                        ? "bg-[#3B82F6] text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-[#6B7280] dark:text-[#9CA3AF] hover:bg-gray-200 dark:hover:bg-gray-700"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {badge}
                  </button>
                );
              })}
            </div>
            
            {selectedBadges.length > 0 && (
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-3">
                {selectedBadges.length}/5 selected
              </p>
            )}
          </div>
        )}

        {/* Written Review */}
        {rating > 0 && (
          <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-6 mb-6">
            <h3 className="font-bold text-[#1F2937] dark:text-gray-100 mb-2">
              Write a review (Optional)
            </h3>
            <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-4">
              Share details about your experience
            </p>
            
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Tell us about your experience with this worker..."
              className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#101922] text-[#1F2937] dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] resize-none"
              maxLength={500}
            />
            
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                {review.length}/500 characters
              </p>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                Your review will be public
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className="w-full bg-[#3B82F6] text-white font-bold py-4 rounded-xl hover:bg-[#2563EB] transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed shadow-lg"
        >
          Submit Rating
        </button>

        {/* Privacy Note */}
        <div className="mt-4 flex items-start gap-2 text-xs text-[#6B7280] dark:text-[#9CA3AF] bg-white dark:bg-[#1F2937] rounded-lg p-3">
          <span className="material-symbols-outlined text-sm">info</span>
          <p>
            Your rating and review will be visible on the worker&apos;s profile. Be honest and respectful.
          </p>
        </div>

      </main>
    </div>
  );
}
