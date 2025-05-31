'use client';

import CountUp from 'react-countup';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
 // Assuming Navbar is correctly imported and works
import Image from 'next/image'; // Import Next.js Image component

const Hero = () => {
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const imageContainerRef = useRef(null); // Renamed from videoRef for clarity

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

    // Ensure refs are current before animating
    if (textRef.current && statsRef.current && imageContainerRef.current) {
      tl.from(textRef.current, { opacity: 0, y: 50 })
        .from(statsRef.current.children, { opacity: 0, y: 50, stagger: 0.2 }, '-=0.5') // Animate children of statsRef
        .from(imageContainerRef.current, { opacity: 0, scale: 0.9 }, '-=0.8');
    }
  }, []);

  return (
    // Consider if h-screen is appropriate here, or if it should be more flexible
    // e.g., min-h-screen or remove h-screen if Navbar has fixed height and you want natural flow
    <div className="relative min-h-screen text-white bg-slate-900"> {/* Added a sample background */}

      <section className="pt-4 pb-16 md:pt-8 md:pb-24"> {/* Added padding top to account for sticky/fixed Navbar */}
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div ref={textRef}>
            <h1 className="text-3xl md:text-5xl font-bold mb-3 block text-purple-400 uppercase tracking-wider leading-tight">
              Provider App
            </h1>
            <h2 className="text-white text-2xl md:text-3xl font-semibold mb-6 leading-tight">
              India’s First Student SuperApp & Marketplace for Hostels, Internships, Courses & More
            </h2>
            <p className="text-lg text-slate-300 mb-2">
              A one-stop solution to every <span className="text-purple-300 font-semibold">student</span> problem
            </p>
            <p className="text-lg text-slate-300 mb-8">
              — trusted by <span className="text-purple-300 font-semibold">50,000+</span> students.
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors duration-300 mb-10">
              Get Started
            </button>

            {/* Stats */}
            <div className="flex flex-wrap gap-x-10 gap-y-6" ref={statsRef}>
              <div>
                <p className="text-4xl font-bold">
                  <CountUp end={50000} duration={2.5} separator="," useEasing={true} />
                  <span className="text-purple-400">+</span>
                </p>
                <p className="text-sm text-slate-300">Students Trust Us</p>
              </div>
              <div>
                <p className="text-4xl font-bold">
                  <CountUp end={35000} duration={2.5} delay={0.2} separator="," useEasing={true} />
                  <span className="text-purple-400">+</span>
                </p>
                <p className="text-sm text-slate-300">App Downloads</p>
              </div>
              <div>
                <p className="text-4xl font-bold">
                  <CountUp end={10000} duration={2.5} delay={0.4} separator="," useEasing={true} />
                  <span className="text-purple-400">+</span>
                </p>
                <p className="text-sm text-slate-300">Hostel Bookings</p>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div
            className="w-full flex items-center justify-center mt-0 md:mt-0"
            ref={imageContainerRef}
          >
            {/* Adjust width and height as needed, or use layout="responsive" */}
            <div className="relative w-full max-w-md md:max-w-lg aspect-[3/4] md:aspect-square rounded-lg overflow-hidden shadow-2xl">
              {/* 
                Replace '/images/hero-image.png' with the path to your image
                The image should be in the `public` folder.
                e.g., if your image is public/app-showcase.png, use src="/app-showcase.png"
              */}
              <Image
                src="/hero.png" // <<< CHANGE THIS TO YOUR IMAGE PATH
                alt="Provider App Showcase"
                layout="fill" // Makes the image fill its parent container
                objectFit="scale-down" // Or "contain", "scale-down", etc.
                priority // Add priority if this is your LCP (Largest Contentful Paint) element
                className="rounded-lg" // Apply rounding to the image itself if parent has overflow-hidden
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
