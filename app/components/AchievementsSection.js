// src/components/AchievementsSection.jsx
"use client"
import React from 'react';
import CountUp from 'react-countup';
import Navbar from './Navbar';
import { FaHotel, FaMobileAlt, FaUsers, FaCity, FaBuilding, FaYoutube, FaStar } from 'react-icons/fa'; // Example icons

const achievementsData = [
  {
    numericValue: 10000,
    displayValue: '10,000+',
    label: 'Hostel Bookings',
    icon: <FaHotel className="w-10 h-10" />, // Adjusted icon size
    iconColor: 'text-purple-400',
  },
  {
    numericValue: 35000,
    displayValue: '35,000+',
    label: 'App Downloads',
    icon: <FaMobileAlt className="w-10 h-10" />,
    iconColor: 'text-indigo-400',
  },
  {
    numericValue: 50000,
    displayValue: '50,000+',
    label: 'Students Trust Us',
    icon: <FaUsers className="w-10 h-10" />,
    iconColor: 'text-pink-400', // Added a pink for variety
  },
  {
    numericValue: 6,
    displayValue: '6+ Cities',
    label: 'Across 4 States',
    icon: <FaCity className="w-10 h-10" />,
    iconColor: 'text-purple-400',
  },
  {
    numericValue: 1000,
    displayValue: '1000+ Properties',
    label: 'Over 50K+ Beds',
    icon: <FaBuilding className="w-10 h-10" />,
    iconColor: 'text-indigo-400',
  },
  {
    numericValue: 30000,
    displayValue: '30,000+',
    label: 'YouTube Subscribers',
    icon: <FaYoutube className="w-10 h-10" />,
    iconColor: 'text-red-500', // YouTube's red
  },
];

const AchievementsSection = () => {
  return (
    // Using a very dark background, close to your image's top bar
    <section className="bg-[#0D0F2B] py-16 md:py-20 text-white">
       {/* Adjusted padding slightly */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400">
              Our Milestones
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Numbers that showcase our commitment and the trust placed in us.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"> {/* Smaller gaps */}
          {achievementsData.map((item, index) => (
            <div
              key={index}
              className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-xl shadow-xl p-5 text-center transition-all duration-300 ease-in-out hover:shadow-purple-500/30 hover:border-purple-500/50 hover:-translate-y-1 group"
              // Alternative card background:
              // className="bg-gradient-to-br from-indigo-900/50 via-purple-900/40 to-indigo-900/50 border border-purple-700/30 rounded-lg shadow-xl p-5 text-center"
            >
              <div className={`flex justify-center items-center mb-4 ${item.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              
              <div className="text-3xl md:text-4xl font-extrabold mb-1.5 text-white"> {/* White for numbers */}
                <CountUp end={item.numericValue} duration={2.5} separator="," />
                {item.displayValue.replace(/[0-9,]/g, '')} {/* To add the '+' or 'Cities' part */}
              </div>
              <p className="text-sm md:text-base text-slate-300 group-hover:text-white transition-colors duration-300">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;