'use client'

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const navRef = useRef(null);

  const curveDepth = 15; // Pixels for the depth of the curve at the sides
  // Path for a curved bottom edge
  const clipPathValue = `path('M0 0 H100% Vcalc(100% - ${curveDepth}px) Q50% 100% 0 calc(100% - ${curveDepth}px) Z')`;

  // Initial Navbar Animation
  useEffect(() => {
    if (!navRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        // Ensure it animates from completely above, considering potential full height
        y: `-${navRef.current.getBoundingClientRect().height + curveDepth}px`,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, navRef);
    return () => ctx.revert();
  }, [curveDepth]); // Recalculate if curveDepth changes

  // Mobile Menu Animation
  useEffect(() => {
    if (!menuRef.current) return;
    if (isOpen) {
      gsap.to(menuRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        onStart: () => { if (menuRef.current) menuRef.current.style.display = 'block'; },
      });
    } else {
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => { if (menuRef.current) menuRef.current.style.display = 'none'; },
      });
    }
  }, [isOpen]);

  // Scroll Listener for Sticky Navbar Styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinkClasses = "cursor-pointer hover:text-purple-600 transition-colors duration-200";

  // Define drop shadow styles
  // These are simpler versions, you can make them more complex to match Tailwind's multi-part shadows if needed
  const shadowNormal = 'drop-shadow(0 4px 6px rgba(0,0,0,0.07))';
  const shadowScrolled = 'drop-shadow(0 10px 15px rgba(0,0,0,0.07))';


  return (
    <nav
      ref={navRef}
      style={{
        clipPath: clipPathValue,
        WebkitClipPath: clipPathValue, // For Safari compatibility
        filter: isScrolled ? shadowScrolled : shadowNormal,
      }}
      className={`
        sticky top-0 w-full
        py-1 px-4 sm:px-6 lg:px-8
        flex justify-between items-center
        z-[999] transition-all duration-300 ease-in-out
        rounded-t-xl 
        ${isScrolled
          ? 'bg-white/90 backdrop-blur-lg'
          : 'bg-white' 
        }
      `}
    >
      {/* Logo */}
      <div>
        {/* Adjusted padding-bottom for logo if curve is deep, or rely on nav's overall padding */}
        <img className="h-12 sm:h-14 transition-all duration-300" src="/provider_logo.png" alt="GGWLogo" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center">
        <ul className="flex gap-6 lg:gap-8 text-sm font-medium text-gray-700">
          <li className={navLinkClasses}>Home</li>
          <li className={navLinkClasses}>Hostels</li>
          <li className={navLinkClasses}>College</li>
          <li className={navLinkClasses}>Blogs</li>
          <li className={navLinkClasses}>About Us</li>
          <li className={navLinkClasses}>Contact Us</li>
        </ul>
      </div>

      {/* Buttons */}
      <div className="hidden md:flex items-center gap-4">
    <a
      href="https://play.google.com/store/apps/details?id=provider.in&hl=en_IN" 
      
      target="_blank"
      rel="noopener noreferrer" // Important for security when using target="_blank"
    >
      <button
        className="px-5 py-2.5 text-sm font-semibold bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        style={{ filter: 'drop-shadow(0 2px 3px rgba(107,33,168,0.3))' }} // Subtle shadow for the button itself
      >
        Download App
      </button>
    </a>
  </div>

      {/* Hamburger for Mobile */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isOpen} className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-gray-700 hover:text-purple-600 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        style={{ display: 'none', height: 0, opacity: 0 }}
        className="absolute top-full left-0 w-full bg-white md:hidden shadow-xl border-t border-gray-200 rounded-b-xl"
        // Optional: If you want the mobile menu to also have rounded corners at the bottom:
        // className="... rounded-b-xl" (if it's the last element visually)
      >
        <ul className="flex flex-col items-center gap-5 py-8 text-base font-medium text-gray-700">
          <li className={navLinkClasses} onClick={() => setIsOpen(false)}>Home</li>
          <li className={navLinkClasses} onClick={() => setIsOpen(false)}>Hostels</li>
          <li className={navLinkClasses} onClick={() => setIsOpen(false)}>College</li>
          <li className={navLinkClasses} onClick={() => setIsOpen(false)}>Blogs</li>
          <li className={navLinkClasses} onClick={() => setIsOpen(false)}>About Us</li>
          <li className={navLinkClasses} onClick={() => setIsOpen(false)}>Contact Us</li>
          <div className="flex flex-col gap-4 w-4/5 max-w-xs pt-4 mt-4 border-t border-gray-200">
            <button className="w-full px-5 py-3 text-sm font-semibold text-purple-600 border border-purple-600 rounded-full hover:bg-purple-50 transition-colors duration-200">
              Download App
            </button>
           
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;