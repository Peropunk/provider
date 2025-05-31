// src/components/AppPromotionSection.jsx
"use client"; // Required for Swiper and useEffect

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules'; // Import EffectCoverflow

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow'; // Import Coverflow effect CSS

const appScreenshots = [
  { id: 1, src: '/ss1.jpg', alt: 'App Screenshot 1 - Hostel Listings' },
  { id: 2, src: '/ss2.jpg', alt: 'App Screenshot 2 - Internship Finder' },
  { id: 3, src: '/ss3.jpg', alt: 'App Screenshot 3 - Course Details' },
  { id: 4, src: '/ss4.jpg', alt: 'App Screenshot 4 - Stationery Order' }, // Add more if you have
  { id: 5, src: '/ss5.jpg', alt: 'App Screenshot 4 - Stationery Order' }, // Add more if you have
];

const AppPromotionSection = () => {
  return (
    <section className="bg-gradient-to-br from-slate-900 to-[#0D0F2B] py-16 md:py-24 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Why Use the <span className="text-purple-400">Provider App</span>?
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          {/* Left Side: App Screenshots Carousel */}
          <div className="w-full md:w-1/2 lg:w-[45%] relative group">
            {/* Optional: Decorative background element for the carousel */}
            <div className="absolute -inset-2 md:-inset-4 bg-purple-600/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            
            <div className="relative p-2 bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl">
              <Swiper
                modules={[Autoplay, Pagination, EffectCoverflow]}
                effect={'coverflow'} // Enable Coverflow effect
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'} // Important for coverflow
                loop={true}
                coverflowEffect={{
                  rotate: 30,       // Slide rotate in degrees
                  stretch: 0,       // Stretch space between slides (in px)
                  depth: 100,       // Depth offset in px (slides translate in Z axis)
                  modifier: 1,      // Effect multiplier
                  slideShadows: true, // Enables slides shadows
                }}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                className="mySwiper w-full h-auto rounded-xl" // Add h-auto or specific height
                style={{
                  // @ts-ignore
                  "--swiper-pagination-color": "#A78BFA", // purple-400
                  "--swiper-pagination-bullet-inactive-color": "#6B7280", // gray-500
                  "--swiper-pagination-bullet-inactive-opacity": "0.7",
                  "--swiper-pagination-bullet-size": "10px",
                  "--swiper-pagination-bullet-horizontal-gap": "6px"
                }}
              >
                {appScreenshots.map((screen) => (
                  // Inside your AppPromotionSection component, in the SwiperSlide:
<SwiperSlide key={screen.id} className="!w-[60%] sm:!w-[50%] md:!w-[270px] aspect-[384/758]">
  <div className="relative w-full h-full bg-slate-700 rounded-lg md:rounded-xl overflow-hidden shadow-lg border-2 border-slate-600">
    <Image
      src={screen.src}
      alt={screen.alt}
      layout="fill"
      objectFit="contain" // CHANGED FROM "cover" to "contain"
      className="rounded-lg md:rounded-xl"
      priority={screen.id === 1}
    />
  </div>
</SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Right Side: Text Content & CTA */}
          <div className="w-full md:w-1/2 lg:w-[55%] text-center md:text-left">
            <h3 className="text-3xl lg:text-4xl font-semibold mb-4 leading-tight">
              Your All-in-One <br className="hidden sm:block" />Student Super App
            </h3>
            <p className="text-lg text-slate-300 mb-3">
              Discover verified <span className="font-medium text-purple-300">Hostels</span>,
              exclusive <span className="font-medium text-purple-300">Internships</span>,
              curated <span className="font-medium text-purple-300">Courses</span>,
              and free <span className="font-medium text-purple-300">Stationery</span> delivery.
            </p>
            <p className="text-lg text-slate-300 mb-8">
              Experience seamless booking, dedicated local support, and a community built for you.
            </p>
            <a
              href="#download-app" // Replace with actual app store links later
              className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <span role="img" aria-label="download icon" className="mr-2 text-xl"></span>
              Download Now
            </a>
            <p className="text-sm text-slate-400 mt-4">
              Available on iOS & Android.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromotionSection;