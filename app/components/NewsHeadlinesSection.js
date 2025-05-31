// src/components/NewsHeadlinesSection.jsx
import React from 'react';
import Image from 'next/image';

const newsItems = [
  {
    id: 1,
    src: '/news1.jpeg', // Path relative to the 'public' folder
    alt: 'First news headline clipping',
    headline: 'Major Breakthrough in Student Housing Solutions!',
    rotation: '-rotate-3', // Tailwind class for slight rotation
    zIndex: 'z-10',
    margin: 'lg:mr-[-40px]', // Negative margin for overlap on large screens
  },
  {
    id: 2,
    src: '/news2.jpeg',
    alt: 'Second news headline clipping',
    headline: 'Provider App Voted #1 by Students Nationwide',
    rotation: 'rotate-1',
    zIndex: 'z-20', // Higher z-index to be on top
    margin: 'lg:scale-105', // Slightly larger and no x-margin for centering
  },
  {
    id: 3,
    src: '/news3.png',
    alt: 'Third news headline clipping',
    headline: 'Exclusive Internships Program Launched Successfully',
    rotation: 'rotate-2',
    zIndex: 'z-10',
    margin: 'lg:ml-[-40px]', // Negative margin for overlap
  },
  {
    id: 4,
    src: '/pw.jpeg',
    alt: 'Third news headline clipping',
    headline: 'Exclusive Internships Program Launched Successfully',
    rotation: 'rotate-2',
    zIndex: 'z-10',
    margin: 'lg:ml-[-40px]', // Negative margin for overlap
  },
];

const NewsHeadlinesSection = () => {
  return (
    <section className="bg-slate-100 py-6 md:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
            In The Headlines
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            See what the press is saying about our innovative solutions for students.
          </p>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">
          {newsItems.map((item, index) => (
            <div
              key={item.id}
              className={`
                w-full max-w-sm lg:w-1/3 
                bg-white p-3 border border-gray-300 rounded-md shadow-xl 
                transform transition-all duration-300 ease-out
                hover:shadow-2xl hover:scale-105 hover:!rotate-0 hover:!z-30
                ${item.rotation} 
                ${item.zIndex}
                ${item.margin || ''}
                ${index === 1 ? 'lg:relative lg:bottom-[-10px]' : ''} // Slightly elevate middle item on large screens
              `}
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded">
                {/* Use Next.js Image component */}
                <Image
                  src={item.src}
                  alt={item.alt}
                  layout="fill"
                  objectFit="cover" // or "contain" depending on your images
                  className="rounded" // Ensure image itself is rounded if parent has overflow-hidden
                  priority={index === 1} // Prioritize loading the central image
                />
              </div>
              <div className="mt-3 px-1 py-2">
                <h3 className="font-semibold text-slate-700 text-sm md:text-base leading-tight">
                  {/* You can add a placeholder for the actual headline text here */}
                  {/* For now, using a generic style */}
                  <span className="bg-yellow-200 px-1 py-0.5 rounded-sm">Highlighted:</span> {item.headline}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
            <button 
                className="bg-[#5E4AE3] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#4c3cc7] transition-colors"
            >
                Read More News
            </button>
        </div>

      </div>
    </section>
  );
};

export default NewsHeadlinesSection;