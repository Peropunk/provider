'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaGripHorizontal } from 'react-icons/fa';
import Footer from '../components/Footer';

// Import your components
import Filter from "./FilterCollege";
import Banner from "./Banner";
import faqData from "./faqData";
import CollegeCard from "./CollegeCard"; // Make sure this is the new Tailwind-styled card

const Property = () => {
  const [filteredData, setFilteredData] = useState(faqData);
  const [colActiv, setColActiv] = useState(false); // false = Grid, true = List

  const handleResetData = () => {
    setFilteredData(faqData);
  };

  const handleFilterChange = (filteredData) => {
    setFilteredData(filteredData);
  };

  return (
    // Use a light background for the entire page section to make cards pop
    <div className="bg-gray-50">
      <Banner />
      
      {/* The Filter component can be styled separately if needed */}
      <Filter data={faqData} onFilterChange={handleFilterChange} onReset={handleResetData} />

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          
          {/* --- Modern Filter Bar --- */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            {/* Left Side: Showing Results */}
            <h6 className="text-gray-700">
              Showing <span className="font-bold text-blue-600">{filteredData.length}</span> colleges
            </h6>
            
            {/* Right Side: Controls */}
            <div className="flex items-center gap-4">
              {/* View Toggle Buttons - Desktop Only */}
              <div className="hidden md:flex items-center bg-gray-200 rounded-md p-1">
                <button
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    !colActiv ? "bg-white text-blue-600 shadow" : "text-gray-600 hover:bg-gray-300"
                  }`}
                  onClick={() => setColActiv(false)}
                  aria-label="Grid View"
                >
                  <FaGripHorizontal className="text-lg" />
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    colActiv ? "bg-white text-blue-600 shadow" : "text-gray-600 hover:bg-gray-300"
                  }`}
                  onClick={() => setColActiv(true)}
                  aria-label="List View"
                >
                  <FaBars className="text-lg" />
                </button>
              </div>
            </div>
          </div>

          {/* --- Responsive Grid/List for College Cards --- */}
          <div
            className={`grid ${
              colActiv
                ? 'grid-cols-1 gap-y-6' // List view: 1 column with vertical gap (desktop only)
                : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8' // Grid view: responsive columns, mobile always uses this
            }`}
          >
            {filteredData.map((item) => (
              <CollegeCard
                key={item.id}
                item={item}
                colActiv={colActiv}
              />
            ))}
          </div>

          {/* --- Load More Button --- */}
          <div className="mt-12 text-center">
            <Link 
              href="#" 
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Load More
            </Link>
          </div>
        </div>
      </section> <Footer />
    </div>
   
  );
};

export default Property;