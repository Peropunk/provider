"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Verified Hostel Listings",
    description:
      "Find your perfect student home with our curated list of verified hostels. Each listing is checked for safety, comfort, and student-friendly amenities, ensuring peace of mind.",
    icon: "✅",
    image: "/1.png",
  },
  {
    title: "Direct Owner Contact ",
    description:
      "Connect directly with hostel owners. No brokers, no hidden fees. Enjoy transparent communication, quick query resolution, and a hassle-free booking experience.",
    icon: "📞",
    image: "/owner.png",
  },
  {
    title: "No-Cost EMI",
    description:
      "Manage your finances smartly. Pay your hostel fees and other essential expenses in easy, interest-free monthly installments. Focus on your studies, not financial stress.",
    icon: "💸",
    image: "https://play-lh.googleusercontent.com/82j9KXsAmD1qlPaG25o9BJKHCeXEtyid5iAqtzL9q_jtZT7_Rjh9GosM3mrOjqC26kc=w480-h960-rw",
  },
  {
    title: "Free Stationery Delivery ",
    description:
      "Get all your essential study supplies— Calculators, Pens, Filesand more—delivered right to your doorstep, absolutely free delivery. Never run out of what you need to succeed.",
    icon: "📦",
    image: "https://img.freepik.com/free-photo/workplace-with-set-stationary_23-2147830026.jpg?semt=ais_hybrid&w=740",
  },
  {
    title: "Exclusive Internships",
    description:
      "Kickstart your career with access to exclusive internship opportunities curated for students on our platform. Gain valuable industry experience and build your professional network.",
    icon: "🎯",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW50ZXJuc2hpcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=80",
  },
];

export default function CardSlider() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  useEffect(() => {
    // Ensure containerRef.current exists before using it for GSAP context
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top-=100 top",
          end: () => "+=" + window.innerHeight * (features.length + 1),
          scrub: 0.5,
          pin: true,
        },
      });

      cardsRef.current.forEach((card, index) => {
        if (!card) return; // Guard against null elements if any

        // Move the card fully up
        timeline.to(card, {
          yPercent: -105,
          ease: "none",
          duration: 1,
        }, index);

        // Scale out previous card when next card is halfway
        if (index > 0) {
          const prevCard = cardsRef.current[index - 1];
          if (prevCard) { // Check if prevCard exists
            timeline.to(prevCard, {
              // No scale animation was in the original code for this specific tween
              // opacity: 0, // Example: if you want to fade out
              transformOrigin: "center center",
              ease: "power2.out",
              duration: .8,
            }, index - 0.25);
          }
        }
      });
    }, containerRef.current); // Pass the DOM element to context

    return () => ctx.revert();
  }, []);


  return (
    <div ref={containerRef} className="relative w-full h-[65vh] overflow-hidden my-10 flex flex-col items-center justify-center py-10">
      {/* Static Background Card */}
      <div className="absolute w-full h-[80%] my-auto min-h-[400px] bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-center gap-6 z-0">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full shadow-lg">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 14"
            className="w-12 h-12 text-white"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
          </svg>
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
          Why Students <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Love Provider</span>
        </h2>
        <p className="text-gray-600 max-w-xl text-lg">
          Discover a world of opportunities with our comprehensive student platform
        </p>
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          Explore Benefits in App
        </button>
      </div>

      {/* Scrolling Cards */}
      {features.map((feature, index) => (
        <div
          key={index}
          ref={(el) => {
            if (cardsRef.current) {
              cardsRef.current[index] = el;
            }
          }}
          className="absolute w-[90%] h-[90%] bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between overflow-hidden"
          style={{
            top: "100%",
            zIndex: index + 1,
          }}
        >
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 z-0 rounded-3xl"></div>

          {/* Left Text Section */}
          <div className="max-w-xl relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{feature.icon}</span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                {feature.title}
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              {feature.description}
            </p>
            <button
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                const faqSection = document.getElementById('faq');
                if (faqSection) {
                  faqSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Learn More
            </button>
          </div>

          {/* Right Image Preview Section */}
          <div className="hidden md:flex flex-col gap-4 mt-10 md:mt-0 relative z-10">
            <div className="bg-white rounded-2xl p-4 shadow-xl w-80 h-56 overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <img
                src={feature.image}
                alt={`Preview for ${feature.title}`}
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  console.error("Failed to load image:", feature.image, e);
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}