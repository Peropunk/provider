'use client'

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const navRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        display: 'block',
      });
    } else {
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        display: 'none',
      });
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={navRef} className="py-5 px-4 flex justify-between items-center shadow-md relative z-10">
      {/* Logo */}
      <div>
        <img className="h-8" src="https://gogetwell.ai/img/logo/logo-dark-full.png" alt="GGWLogo" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 text-sm font-medium">
        <ul className="flex gap-6 justify-center items-center">
          <li className="cursor-pointer">About Us</li>
          <li className="cursor-pointer">F&Q</li>
          <li className="cursor-pointer">Contact Us</li>
        </ul>
      </div>

      {/* Buttons */}
      <div className="hidden md:flex justify-center items-center gap-5 text-sm font-semibold">
        <button className="px-5 py-2 bg-white text-black border border-black rounded-full">Login</button>
        <button className="px-5 py-2 bg-purple-600 text-white rounded-full">Sign Up</button>
      </div>

      {/* Hamburger for Mobile */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div ref={menuRef} className="absolute top-[70px] left-0 w-full bg-white overflow-hidden md:hidden shadow-md">
        <ul className="flex flex-col items-center gap-6 py-6 text-base font-medium text-black">
          <li className="cursor-pointer">About Us</li>
          <li className="cursor-pointer">F&Q</li>
          <li className="cursor-pointer">Contact Us</li>
          <div className="flex flex-col gap-3 w-3/4">
            <button className="px-5 py-2 bg-white text-black border border-black rounded-full w-full">Login</button>
            <button className="px-5 py-2 bg-purple-600 text-white rounded-full w-full">Sign Up</button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
