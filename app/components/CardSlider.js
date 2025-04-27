"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Online Website With AI Agent",
    description:
      "Establish an intelligent digital presence that automatically engages visitors, answers questions, and enhances user experience 24/7.",
    icon: "🌐",
  },
  {
    title: "Build Digital Business",
    description:
      "Expand and scale your operations with cutting-edge digital solutions that streamline processes, increase reach, and drive growth.",
    icon: "📈",
  },
  {
    title: "Patient Conversation",
    description:
      "Enable seamless and empathetic communication between patients and healthcare providers through smart, automated systems.",
    icon: "🔐",
  },
  {
    title: "Boost Revenue",
    description:
      "Maximize your earnings potential with optimized conversion strategies, targeted marketing, and intelligent service offerings.",
    icon: "📉",
  },
  {
    title: "Lead Generation Support",
    description:
      "Convert more visitors into qualified leads and loyal clients with personalized engagement tools and automated follow-up systems.",
    icon: "👥",
  },
  {
    title: "24/7 Support for Patient",
    description:
      "Deliver round-the-clock assistance to patients, ensuring they receive timely support, guidance, and care whenever they need it.",
    icon: "🔒",
  },
];

export default function CardSlider() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top-=100 top",
          end: () => "+=" + window.innerHeight * (features.length + 1), // <-- ADD extra scroll
          scrub: 0.5,
          pin: true,
        },
      });

      cardsRef.current.forEach((card, index) => {
        // Move the card fully up
        timeline.to(card, {
          yPercent: -105,
          ease: "none",
          duration: 1,
        }, index);

        // Scale out previous card when next card is halfway
        if (index > 0) {
          timeline.to(cardsRef.current[index - 1], {
            transformOrigin: "center center",
            ease: "power2.out",
            duration: .8,
          }, index - 0.25);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);


  return (
    <div ref={containerRef} className="relative w-full h-[65vh] overflow-hidden my-10 flex flex-col items-center justify-center py-10">
      {/* Static Background Card */}
      <div className="absolute w-full h-[80%] my-auto  min-h-[400px] bg-white rounded-3xl shadow-2xl  flex flex-col items-center justify-center text-center gap-6 z-0">
        <div className="bg-[#5E4AE3] p-4 rounded-full">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="w-12 h-12 text-white"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21.928 11.607c-.202-.488-.635-.605-.928-.633V8c0-1.103-.897-2-2-2h-6V4.61c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5c-1.103 0-2 .897-2 2v2.997l-.082.006A1 1 0 0 0 1.99 12v2a1 1 0 0 0 1 1H3v5c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5a1 1 0 0 0 1-1v-1.938a1.006 1.006 0 0 0-.072-.455zM5 20V8h14l.001 3.996L19 12v2l.001.005.001 5.995H5z" />
            <ellipse cx="8.5" cy="12" rx="1.5" ry="2" />
            <ellipse cx="15.5" cy="12" rx="1.5" ry="2" />
            <path d="M8 16h8v2H8z" />
          </svg>

        </div>
        <h1 className="text-3xl md:text-5xl font-bold">Get Your Patient Ready Website Now</h1>
        <p className="text-gray-600 max-w-xl">
          Use power AI to transform your online presence and automate patient interactions
        </p>
        <button className="bg-[#5E4AE3] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4c3cc7] transition">
          Join the Waiting List
        </button>
      </div>

      {/* Scrolling Cards */}
      {features.map((feature, index) => (
        <div
          key={index}
          ref={(el) => (cardsRef.current[index] = el)}
          className="absolute w-[90%] h-[90%] bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between overflow-hidden"
          style={{
            top: "100%",
            zIndex: index + 1,
          }}
        >
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-gray-300 opacity-60 z-0 rounded-3xl"></div>

          {/* Left Text Section */}
          <div className="max-w-xl relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              {feature.icon} {feature.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
              {feature.description}
            </p>
            <button className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
              Learn More
            </button>
          </div>

          {/* Right Image Preview Section */}
          <div className="hidden md:flex flex-col gap-4 mt-10 md:mt-0 relative z-10">
            <div className="bg-white rounded-xl p-4 shadow-lg w-72">
              <img
                src="https://www.sciencepharma.com/wp-content/uploads/2024/09/forms_drugs_baner_rf-scaled.jpg"
                alt="Feature Preview"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
