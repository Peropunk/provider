import Link from "next/link";
import PropertyCard from "../property/PropertyCard";
import axios from "axios";
import LoadingOverlay from './LoadingOverlay';
import faqData from "./faqData";
import { useState,useEffect } from "react";


const AllProperties = ({id}) => {
  const [attributes, setAttributes] = useState(null);
    const [tag, setTag] = useState("niet");
    const data = faqData.find(item => item.id === id);
    useEffect(() => {
        if (data && data.tag !== undefined) {
          setTag(data.tag);
          console.log(data.tag);
        } else {
          console.log('Tag not found or data is undefined.');
        }
      }, [data]);

      const intervalTime = 5000; // Interval time in milliseconds (change this value as needed)

      useEffect(() => {
        
          if (data) {
            const searchProperties = async () => {
              try {
                const response = await axios.get(
                  `https://api.dreamprovider.in/api/tags?filters[name][$contains]=${tag}&populate[properties][populate]=main_image,price,genders,seaters`
                );
                const data1 = response.data;
                setAttributes(data1.data[0].attributes.properties);
                console.log(data1.data[0].attributes.properties);
              } catch (error) {
                console.error("Error:", error);
              }
            };
    
            searchProperties();
          }
    
        // Cleanup function to clear the interval when component unmounts or changes
    
      }, [tag]);

      
    
      if (!attributes) {
        return (
          <div className="property-details-loading">
            <LoadingOverlay />
          </div>
        );
      }
  return (
    <section className="properties__grid section__space bg-gray-50 py-16">
  <div className="container mx-auto px-4">
    {/* Heading */}
    <div className="flex flex-col md:flex-row items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Browse Nearby Hostels
        </h2>
        <p className="text-gray-500 mt-1">
          Find the best stays near your location, tailored for students.
        </p>
      </div>
      <Link
        href="/property"
        className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition-all duration-300"
      >
        Browse All Properties
      </Link>
    </div>

    {/* Property Cards */}
    {!attributes ? (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow p-4 animate-pulse"
          >
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {attributes.data.slice(0, 3).map((singleData) => (
          <div
            key={singleData.id}
            className="transform hover:scale-105 transition-transform duration-300"
          >
            <PropertyCard singleData={singleData} colActiv={false} />
          </div>
        ))}
      </div>
    )}
  </div>
</section>

  );
};

export default AllProperties;
