// src/components/TrustBadgesSection.jsx
import React from 'react';
import { ShieldCheck, BadgeCheck, Users, Award } from 'lucide-react'; // Or other suitable icons

const trustData = [
  {
    icon: <ShieldCheck size={28} className="text-green-400" />, // Green often associated with security
    text: '100% Secure Payments',
    bgColor: 'bg-green-500/10', // Subtle background for the icon
  },
  {
    icon: <BadgeCheck size={28} className="text-blue-400" />, // Blue for trust/verification
    text: 'Verified Hostels',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: <Users size={28} className="text-purple-400" />, // Purple to match theme
    text: 'Trusted by 50K+ Students',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: <Award size={28} className="text-yellow-400" />, // Yellow/Gold for award/recognition
    text: 'Student-Centric Company',
    bgColor: 'bg-yellow-500/10',
  },
];

const TrustBadgesSection = () => {
  return (
    // Using the very dark background, or a slightly lighter shade if preferred
    <section className="bg-[#0D0F2B] py-12 md:py-16"> 
    {/* Alternative background if you want it slightly different from hero: bg-slate-900 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Why Choose Us?
          </h2>
          <p className="text-slate-400 mt-2 text-lg">
            Our commitment to providing a safe, reliable, and student-focused experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trustData.map((item, index) => (
            <div
              key={index}
              // Card styling: subtle background, border, and shadow for a "badge" feel
              className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-xl p-6 
                         flex flex-col items-center text-center
                         transition-all duration-300 ease-in-out hover:border-purple-500/50 hover:shadow-purple-500/20 hover:-translate-y-1"
            >
              <div className={`mb-4 p-3 rounded-full ${item.bgColor}`}>
                {item.icon}
              </div>
              <p className="text-base md:text-lg font-semibold text-slate-100">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadgesSection;