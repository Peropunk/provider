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
    <div className="flex items-center gap-0.5">
      {[...Array(totalStars)].map((_, index) => {
        const starNumber = index + 1;
        return starNumber <= rating ? (
          <FaStar key={index} className="text-amber-400 w-4 h-4" />
        ) : (
          <FaRegStar key={index} className="text-amber-400 w-4 h-4" />
        );
      })}
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full border border-gray-100">
    <div className="flex items-center mb-6">
      {testimonial.photoUrl ? (
        <Image
          src={testimonial.photoUrl}
          alt={testimonial.name}
          width={64}
          height={64}
          className="rounded-full mr-4 object-cover ring-2 ring-blue-50"
          onError={(e) => { e.target.style.display = 'none'; /* Hide if image fails */ }}
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mr-4">
          <FaUserCircle className="w-10 h-10 text-blue-400" />
        </div>
      )}
      <div>
        <h4 className="font-bold text-lg text-gray-900 tracking-tight">{testimonial.name}</h4>
        <p className="text-sm text-gray-600 font-medium">{testimonial.location}</p>
      </div>
    </div>
    <div className="mb-4">
      <StarRating rating={testimonial.rating} />
    </div>
    <p className="text-gray-700 flex-grow text-lg leading-relaxed font-light">
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
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/30">
      {/* Subtle Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-100/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-100/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-100/30 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-gray-900">
            What Students Say About <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Provider</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Join thousands of satisfied students who found their perfect accommodation with us
          </p>
        </div>

        <div className="md:flex md:gap-8 items-stretch"> {/* items-stretch to make columns of equal perceived height */}
          {/* Video Testimonial (Left Column on MD+) */}
          {videoTestimonial && (
            <div className="md:w-2/5 mb-8 md:mb-0 flex"> {/* Added flex for h-full on child */}
              <div className="bg-white p-8 rounded-2xl shadow-sm w-full flex flex-col border border-gray-100">
                <div className="aspect-w-16 aspect-h-9 mb-6 rounded-xl overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/8Q9o2Tp3epQ?si=kXw-9GsMjOlWJ8ql?rel=0`}
                    title={`${videoTestimonial.name}'s Testimonial Video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-xl w-full h-full"
                  ></iframe>
                </div>
                <div className="flex items-center mb-4">
                  {videoTestimonial.photoUrl ? (
                    <Image
                      src={videoTestimonial.photoUrl}
                      alt={videoTestimonial.name}
                      width={56}
                      height={56}
                      className="rounded-full mr-4 object-cover ring-2 ring-blue-50"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mr-4">
                      <FaUserCircle className="w-8 h-8 text-blue-400" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 tracking-tight">{videoTestimonial.name}</h4>
                    <p className="text-sm text-gray-600 font-medium">{videoTestimonial.location}</p>
                  </div>
                </div>
                <StarRating rating={videoTestimonial.rating} />
                <p className="text-gray-700 mt-4 text-lg leading-relaxed font-light flex-grow">
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

      <style jsx global>{`
        :root {
          --swiper-navigation-color: #4F46E5;
          --swiper-pagination-color: #4F46E5;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: var(--swiper-navigation-color);
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px;
        }
        .swiper-pagination-bullet {
          background: #E5E7EB;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: var(--swiper-pagination-color);
        }
      `}</style>
    </section>
  );
};

export default StudentTestimonials;