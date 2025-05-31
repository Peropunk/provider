'use client';

import React from 'react';
import Image from 'next/image';
import { FaStar, FaRegStar, FaUserCircle } from 'react-icons/fa';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// --- Data for Testimonials ---
const testimonialsData = [
  {
    id: 1,
    name: 'Priya Sharma',
    photoUrl: '/images/testimonials/priya.jpg',
    location: 'Pune, Harmony Hostel',
    rating: 5,
    text: 'Provider made finding a safe and friendly hostel near my college so easy! The direct owner contact was a huge plus. Absolutely recommend it to every student.',
  },
  {
    id: 2,
    name: 'Amit Singh',
    photoUrl: null,
    location: 'Delhi, Scholars Abode',
    rating: 4,
    text: "The no-cost EMI option for fees was a lifesaver for my parents. Plus, the organized trips helped me explore the city and make new friends quickly.",
  },
  {
    id: 3,
    name: 'Sneha Reddy',
    photoUrl: '/images/testimonials/sneha.jpg',
    location: 'Bangalore, Tech Nest PG',
    rating: 5,
    text: "I love the free stationery delivery – it's so convenient! The platform is user-friendly, and I found an amazing internship through their listings.",
    youtubeVideoId: 'LxbNqLgDEgM', // Example: Using a generic student life video ID. Replace with actual.
  },
  {
    id: 4,
    name: 'Rohan Mehta',
    photoUrl: null,
    location: 'Mumbai, Coastal Co-living',
    rating: 4,
    text: "The verified listings gave me peace of mind. I knew I was choosing a good place. The local support team was also very helpful when I first moved in.",
  },
  {
    id: 5,
    name: 'Alisha Khan', // Changed for variety
    photoUrl: null,
    location: 'Chennai, Student Haven',
    rating: 5,
    text: "The exclusive courses and stationery delivery have been incredibly helpful for my studies. Provider truly understands student needs.",
  }
];
// --- End of Data ---

const StarRating = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const starNumber = index + 1;
        return starNumber <= rating ? (
          <FaStar key={index} className="text-yellow-400" />
        ) : (
          <FaRegStar key={index} className="text-yellow-400" />
        );
      })}
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
    <div className="flex items-center mb-4">
      {testimonial.photoUrl ? (
        <Image
          src={testimonial.photoUrl}
          alt={testimonial.name}
          width={56}
          height={56}
          className="rounded-full mr-4 object-cover"
          onError={(e) => { e.target.style.display = 'none'; /* Hide if image fails */ }}
        />
      ) : (
        <FaUserCircle className="w-14 h-14 text-slate-400 dark:text-slate-500 mr-4" />
      )}
      <div>
        <h4 className="font-semibold text-lg text-slate-800 dark:text-white">{testimonial.name}</h4>
        <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.location}</p>
      </div>
    </div>
    <div className="mb-3">
      <StarRating rating={testimonial.rating} />
    </div>
    <p className="text-slate-700 dark:text-slate-300 flex-grow italic">
      "{testimonial.text}"
    </p>
  </div>
);


const StudentTestimonials = () => {
  const videoTestimonial = testimonialsData.find(t => t.youtubeVideoId);
  const textTestimonials = testimonialsData.filter(t => !t.youtubeVideoId);

  const swiperSlidesPerView = (isFullWidth) => {
    if (isFullWidth) {
      if (textTestimonials.length >= 3) return 3;
      if (textTestimonials.length >= 2) return 2;
      return 1;
    }
    // When in a narrower column (e.g., next to video)
    if (textTestimonials.length >= 2 && typeof window !== 'undefined' && window.innerWidth >= 1280) return 2; // Show 2 on xl screens in right column
    return 1;
  };


  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900 px-4 sm:px-6 lg:px-8">
      <style jsx global>{`
        :root {
          --swiper-navigation-color-light: #334155; /* slate-700 */
          --swiper-pagination-color-light: #6366F1; /* indigo-500 */
          --swiper-navigation-color-dark: #cbd5e1;  /* slate-300 */
          --swiper-pagination-color-dark: #A78BFA; /* purple-400 */
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: var(--swiper-navigation-color-light);
        }
        .swiper-pagination-bullet-active {
          background-color: var(--swiper-pagination-color-light);
        }
        .dark .swiper-button-next,
        .dark .swiper-button-prev {
          color: var(--swiper-navigation-color-dark);
        }
        .dark .swiper-pagination-bullet-active {
          background-color: var(--swiper-pagination-color-dark);
        }
      `}</style>
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-white mb-12">
          What Students Say About Provider
        </h2>

        <div className="md:flex md:gap-8 items-stretch"> {/* items-stretch to make columns of equal perceived height */}
          {/* Video Testimonial (Left Column on MD+) */}
          {videoTestimonial && (
            <div className="md:w-2/5 mb-8 md:mb-0 flex"> {/* Added flex for h-full on child */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl w-full flex flex-col">
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    src={`https://www.youtube.com/embed/8Q9o2Tp3epQ?si=kXw-9GsMjOlWJ8ql?rel=0`}
                    title={`${videoTestimonial.name}'s Testimonial Video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-lg w-full h-full"
                  ></iframe>
                </div>
                <div className="flex items-center mb-2">
                  {videoTestimonial.photoUrl ? (
                    <Image
                      src={videoTestimonial.photoUrl}
                      alt={videoTestimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full mr-3 object-cover"
                    />
                  ) : (
                    <FaUserCircle className="w-12 h-12 text-slate-400 dark:text-slate-500 mr-3" />
                  )}
                  <div>
                    <h4 className="font-semibold text-lg text-slate-800 dark:text-white">{videoTestimonial.name}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{videoTestimonial.location}</p>
                  </div>
                </div>
                <StarRating rating={videoTestimonial.rating} />
                <p className="text-slate-700 dark:text-slate-300 mt-3 italic flex-grow">
                  "{videoTestimonial.text}"
                </p>
              </div>
            </div>
          )}

          {/* Text Testimonials Slider (Right Column on MD+ or Full Width) */}
          {textTestimonials.length > 0 && (
            <div className={`${videoTestimonial ? 'md:w-3/5' : 'w-full'} min-w-0`}> {/* min-w-0 for flex item squishing */}
              <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={30}
                slidesPerView={1} // Base for mobile
                navigation
                pagination={{ clickable: true }}
                loop={textTestimonials.length > (videoTestimonial ? 1 : 3)} // Adjust loop based on visible slides
                className="h-full" // Important for items-stretch to work with swiper
                grabCursor={true}
                breakpoints={{
                  // Mobile already covered by slidesPerView: 1
                  // Tablet
                  768: { // md
                    slidesPerView: videoTestimonial ? 1 : (swiperSlidesPerView(true) >= 2 ? 2 : 1),
                    spaceBetween: 20,
                  },
                  // Desktop
                  1024: { // lg
                    slidesPerView: videoTestimonial ? (swiperSlidesPerView(false) >=2 ? 2 :1) : swiperSlidesPerView(true),
                    spaceBetween: 30,
                  },
                }}
              >
                {textTestimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial.id} className="pb-10 md:pb-12 h-full flex"> {/* Added h-full flex */}
                    <TestimonialCard testimonial={testimonial} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StudentTestimonials;