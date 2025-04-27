'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Navbar from './Navbar';

const Hero = () => {
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    tl.from(textRef.current, { opacity: 0, y: 50 })
      .from(statsRef.current, { opacity: 0, y: 50, stagger: 0.2 }, "-=0.5")
      .from(videoRef.current, { opacity: 0, scale: 0.9 }, "-=0.8");
  }, []);

  return (
    <div className="h-screen text-white">
      <Navbar />
      <section className="text-white py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div ref={textRef}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Website Builder <br />
              <span className="text-white">For Healthcare Facilitators</span>
            </h2>
            <p className="text-lg mb-2">
              Create <span className="text-[#9D8CFB] font-semibold">AI Store</span> in 2 min
            </p>
            <p className="text-lg mb-6">
              Boost Patients Conversion <span className="text-[#9D8CFB] font-semibold">and Earn While Sleeping</span>
            </p>
            <button className="bg-[#6456E8] hover:bg-[#7C6FEF] text-white font-semibold py-3 px-8 rounded-lg mb-10">
              Get Started
            </button>

            {/* Stats */}
            <div className="flex flex-wrap gap-10" ref={statsRef}>
              <div>
                <p className="text-4xl font-bold">2100<span className="text-[#9D8CFB]">+</span></p>
                <p className="text-sm text-gray-300">Qualified Doctors</p>
              </div>
              <div>
                <p className="text-4xl font-bold">1000<span className="text-[#9D8CFB]">+</span></p>
                <p className="text-sm text-gray-300">Hospitals</p>
              </div>
              <div>
                <p className="text-4xl font-bold">800<span className="text-[#9D8CFB]">+</span></p>
                <p className="text-sm text-gray-300">AI Treatment Plans</p>
              </div>
            </div>
          </div>

          {/* Right Content - Video */}
          <div className="w-full h-full" ref={videoRef}>
            <div className="w-full h-full">
              <iframe 
                className="w-full h-64 md:h-96 rounded-lg"
                src="https://www.youtube.com/embed/rl2xsVe8cNw" 
                title="Medical Report Demo gogetwell.ai" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
