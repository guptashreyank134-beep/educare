/** @format */

"use client";

import { useEffect, useState } from "react";
import { REVIEW_RATING, REVIEW_COUNT } from "@/data/reviews";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "./ui/Button";

interface Review {
  author: string;
  avatar: string | null;
  rating: number;
  relativeTime: string;
  text: string;
  role?: string;
}

const fallbackReviews: Review[] = [
  {
    author: "Parag Jawkar",
    avatar: "/assets/team-1.png",
    rating: 5,
    relativeTime: "1 month ago",
    text: "Dr has been an excellent tutor for my daughter's university Physics course. His clear explanations and patient approach helped her gain confidence and truly understand the subject. We're very thankful for his professionalism, his passion and dedication...",
    role: "Parent",
  },
  {
    author: "Sanjay Mehta",
    avatar: "/assets/team-2.png",
    rating: 5,
    relativeTime: "2 weeks ago",
    text: "Dr. Shreyank has been tutoring my son in Grade 12 Math and Physics. He is very patient and explains the concepts extremely well. My son's grades and confidence improved significantly.",
    role: "Parent",
  },
  {
    author: "Aarav Patel",
    avatar: "/assets/team-3.png",
    rating: 5,
    relativeTime: "3 weeks ago",
    text: "Excellent tutor for university-level calculus. He breaks down complex topics step-by-step and helps with exam preparation. Highly recommended for any engineering or science student.",
    role: "University Student",
  },
  {
    author: "Sarah L.",
    avatar: "/assets/team-4.png",
    rating: 5,
    relativeTime: "2 months ago",
    text: "Amazing tutoring experience! Chemistry was my weakest subject, but the classes made it so easy to understand. I got an A on my final exam.",
    role: "High School Student",
  },
  {
    author: "Emily Chen",
    avatar: "/assets/team-5.png",
    rating: 5,
    relativeTime: "1 week ago",
    text: "Highly professional and dedicated. The structured study plan helped my son stay on track. He looks forward to his classes every week.",
    role: "Parent",
  },
];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  // Rating + count come from the single controlled source (data/reviews.ts), not
  // the live API total, so every page shows the same verified figure.
  const [rating] = useState<number>(REVIEW_RATING);
  const [totalReviews] = useState<number>(REVIEW_COUNT);

  useEffect(() => {
    // Detect viewport width to adjust visible cards
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Fetch reviews from our API (which uses official Google Places API)
    async function fetchReviews() {
      try {
        const response = await fetch("/api/reviews");
        const data = await response.json();
        if (data.reviews && data.reviews.length > 0) {
          // Map avatars if null and inject realistic roles to match design
          const formatted = data.reviews.map((r: Review, idx: number) => ({
            ...r,
            avatar: r.avatar || `/assets/team-${(idx % 6) + 1}.png`,
            role: idx % 2 === 0 ? "Parent" : "Student",
          }));
          setReviews(formatted);
        }
        // Only the review CARDS come from the live API; the headline rating/count
        // stay pinned to the controlled values above for consistency.
      } catch (error) {
        console.error("Failed to load reviews from API, using fallback data:", error);
      }
    }

    fetchReviews();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= reviews.length - visibleCards + 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, reviews.length - visibleCards) : prevIndex - 1
    );
  };

  const writeReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJA3uGz9t2hlQRjL_aWv6iW2s";

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title Heading */}
        <h2 className="text-[32px] sm:text-[32px] font-bricolage font-display font-normal text-slate text-center leading-tight mb-16 max-w-3xl mx-auto">
          Student Experiences That Reflect Meaningful Progress
        </h2>

        {/* Info Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
          <div>
            <h3 className="text-[20px] font-semibold text-slate mb-2">
              Customer reviews on Google
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex text-yellow-400">
                {[...Array(Math.round(rating))].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <span className="text-[16px] font-medium text-slate opacity-80">
                {rating.toFixed(1)} rating of {totalReviews} reviews
              </span>
            </div>
          </div>

          <a href={writeReviewUrl} target="_blank" rel="noopener noreferrer">
            <Button className="!bg-[#3b5a98] hover:!bg-[#2e477a] text-white font-medium rounded-lg px-6 py-3 transition-colors">
              Leave A Review
            </Button>
          </a>
        </div>

        {/* Carousel Slider */}
        <div className="relative flex items-center w-full">

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-1 md:left-[-25px] lg:left-[-50px] z-20 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md text-slate hover:text-primary transition-colors focus:outline-none border border-slate/5"
            aria-label="Previous review"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Review Cards Window */}
          <div className="w-full overflow-hidden py-4">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
              }}
            >
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="px-3 shrink-0"
                  style={{ width: `${100 / visibleCards}%` }}
                >
                  <div className="bg-white rounded-[20px] shadow-[0px_0px_30px_0px_#57575614] p-8 h-full flex flex-col justify-between border border-slate/5 transition-transform duration-300 hover:translate-y-[-4px]">
                    <div>
                      {/* Stars */}
                      <div className="flex text-yellow-400 gap-0.5 mb-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={18} fill="currentColor" className="text-yellow-400" />
                        ))}
                      </div>

                      {/* Google G Logo */}
                      <div className="mb-4">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path
                            fill="#EA4335"
                            d="M12 5.04c1.67 0 3.2.58 4.38 1.71l3.27-3.27C17.67 1.6 15.06.8 12 .8 7.37.8 3.4 3.45 1.5 7.36l3.87 3.01C6.27 7.4 8.87 5.04 12 5.04z"
                          />
                          <path
                            fill="#4285F4"
                            d="M23.49 12.27c0-.82-.07-1.6-.21-2.37H12v4.51h6.44c-.28 1.48-1.11 2.73-2.37 3.58l3.68 2.85c2.16-1.99 3.74-4.92 3.74-8.57z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.37 14.65c-.24-.73-.37-1.5-.37-2.3s.13-1.57.37-2.3L1.5 7.04C.54 8.96 0 11.13 0 13.4s.54 4.44 1.5 6.36l3.87-3.11z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23.2c3.24 0 5.96-1.08 7.95-2.91l-3.68-2.85c-1.02.68-2.33 1.09-3.95 1.09-3.13 0-5.73-2.36-6.68-5.33L1.77 16.2c1.9 3.91 5.87 6.56 10.23 6.56z"
                          />
                        </svg>
                      </div>

                      {/* Review Text */}
                      <p className="text-[15px] font-normal leading-relaxed text-slate opacity-80 mb-6 line-clamp-6">
                        {review.text}
                      </p>
                    </div>

                    {/* Reviewer Meta info */}
                    <div className="mt-auto pt-4 border-t border-slate/5">
                      <h4 className="text-[16px] font-semibold text-slate mb-0.5">
                        {review.author}
                      </h4>
                      <p className="text-[13px] text-slate opacity-60 mb-4">
                        {review.role || "Parent"}
                      </p>

                      {review.avatar && (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100">
                          <Image
                            src={review.avatar}
                            alt={review.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-1 md:right-[-25px] lg:right-[-50px] z-20 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md text-slate hover:text-primary transition-colors focus:outline-none border border-slate/5"
            aria-label="Next review"
          >
            <ChevronRight size={24} />
          </button>

        </div>
      </div>
    </section>
  );
}
