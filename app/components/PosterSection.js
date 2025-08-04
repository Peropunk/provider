"use client";

import React from "react";

const PosterSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Check Out Our <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Features</span>
          </h2>
    
        </div>

                 {/* Posters Grid - 2 rows, 1 column */}
         <div className="flex flex-col gap-16 max-w-6xl mx-auto">
          {/* Poster 1 - First Row */}
          <div className="group relative">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-pink-100/30 to-blue-100/40 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200/20 via-transparent to-purple-200/20 rounded-3xl"></div>
            
                         {/* Poster Container */}
             <div className="relative bg-gradient-to-br from-white/90 via-blue-50/40 to-purple-50/30 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/50 group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-[1.02]">
              {/* Enhanced Background Textures */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-purple-100/20 rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/15 via-transparent to-indigo-100/15 rounded-3xl"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.1),transparent_50%)] rounded-3xl"></div>
              <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)] rounded-3xl"></div>
              
              {/* Decorative Elements */}
              <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-sm"></div>
              <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-tr from-pink-400/20 to-indigo-400/20 rounded-full blur-sm"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-br from-indigo-300/15 to-purple-300/15 rounded-full blur-md"></div>
              <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-gradient-to-tr from-blue-300/20 to-pink-300/20 rounded-full blur-sm"></div>
              
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg">
                <div className="aspect-[3/2] relative">
                  <img 
                    src="/poster1.png" 
                    alt="Poster 1" 
                    className="w-full h-full object-cover rounded-2xl"
                    onError={(e) => {
                      console.error("Failed to load poster1.png");
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Poster 2 - Second Row */}
          <div className="group relative">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 via-teal-100/30 to-blue-100/40 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-200/20 via-transparent to-green-200/20 rounded-3xl"></div>
            
                         {/* Poster Container */}
             <div className="relative bg-gradient-to-br from-white/90 via-teal-50/40 to-green-50/30 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/50 group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-[1.02]">
              {/* Enhanced Background Textures */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-100/20 via-transparent to-green-100/20 rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/15 via-transparent to-teal-100/15 rounded-3xl"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.1),transparent_50%)] rounded-3xl"></div>
              <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.1),transparent_50%)] rounded-3xl"></div>
              
              {/* Decorative Elements */}
              <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-teal-400/20 to-green-400/20 rounded-full blur-sm"></div>
              <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-tr from-blue-400/20 to-teal-400/20 rounded-full blur-sm"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-br from-teal-300/15 to-green-300/15 rounded-full blur-md"></div>
              <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-gradient-to-tr from-blue-300/20 to-teal-300/20 rounded-full blur-sm"></div>
              
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg">
                <div className="aspect-[3/2] relative">
                  <img 
                    src="/poster2.png" 
                    alt="Poster 2" 
                    className="w-full h-full object-cover rounded-2xl"
                    onError={(e) => {
                      console.error("Failed to load poster2.png");
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PosterSection; 