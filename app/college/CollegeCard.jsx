'use client';

import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiArrowNarrowRight } from "react-icons/hi";

// This component now uses Tailwind CSS for a modern, aesthetic look.
const CollegeCard = ({ item, colActiv }) => {

  // If the 'item' prop is not provided, we can render a placeholder or nothing.
  if (!item) {
    return null; 
  }

  // Common Card Content for reusability between Grid and List views
  const CardContent = () => (
    <>
      {/* Image Section */}
      <div className={`relative overflow-hidden ${colActiv ? 'md:w-1/3' : 'w-full aspect-video'}`}>
        <Image
          src={item.imgLink || "/fallback-image.jpg"} // Fallback image for safety
          width={400}
          height={225}
          alt={item.title || "College Image"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* You can add an overlay or a badge here if you want */}
        {/* Example: <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md">{item.grade}</span> */}
      </div>

      {/* Text Content Section */}
      <div className={`flex flex-1 flex-col p-4 sm:p-6 ${colActiv ? 'md:w-2/3' : 'w-full'}`}>
        {/* Card Header */}
        <div className="flex-grow">
          <Link href={`/college/${item.id}`} className="hover:underline">
            <h4 className="text-xl font-bold text-gray-800 line-clamp-2" title={item.title}>
              {item.title}
            </h4>
          </Link>
          <p className="mt-1 flex items-center text-sm text-gray-500">
            <FaMapMarkerAlt className="mr-2 shrink-0" />
            <span>{item.location}</span>
          </p>
          <p className="mt-3 text-sm text-gray-600 line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* Stats Section */}
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="text-gray-600">Established: <span className="font-semibold text-gray-800">{item.year}</span></div>
          <div className="text-gray-600">NAAC Grade: <span className="font-semibold text-gray-800">{item.grade}</span></div>
          <div className="text-gray-600">Area: <span className="font-semibold text-gray-800">{item.area}</span></div>
          <div className="text-gray-600">Published: <span className="font-semibold text-gray-800">{item.published}</span></div>
        </div>

        {/* Footer with CTA */}
        <div className="mt-6 pt-4 border-t border-gray-200">
           <Link href={`/college/${item.id}`} className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800 transition-colors">
              View Details
              <HiArrowNarrowRight className="ml-2" />
           </Link>
        </div>
      </div>
    </>
  );


  // Render based on the 'colActiv' prop (Grid vs. List view)
  return (
    <div
      className={`group ${colActiv ? 'w-full' : 'w-full'}`} // Ensure it takes full width of its grid cell
    >
      <div
        className={`bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex ${
          colActiv
            ? 'flex-col md:flex-row' // Stack on mobile, row on desktop for List view
            : 'flex-col' // Always stacked for Grid view
        }`}
      >
        <CardContent />
      </div>
    </div>
  );
};

export default CollegeCard;