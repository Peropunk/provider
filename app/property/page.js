'use client'

import React, { useState } from 'react';
import Filter from './Filter';
import Banner from './Banner';
import Properties from './Properties';
import axios from 'axios';

const Property = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchedData, setSearchedData] = useState(null);
  const [query, setQuery] = useState("");

  // Function to receive the selected location
  const handleSelectedLocation = (location) => {
    setSelectedLocation(location);
  };

  // Function to handle property search
  const searchProperties = async (searchText) => {
    setQuery(searchText);
    try {
      if (!searchText) {
        // If searchText is empty, set SearchedData to null
        setSearchedData(null);
        return null;
      }
  
      // Make the API request
      const response = await axios.get(
        `https://api.dreamprovider.in/api/properties?populate=main_image,price,genders,seaters&filters[name][$contains]=${searchText}`
      );
  
      // Handle the response data
      const data = response.data;
      setSearchedData(data);
  
      // You can return the data or process it further as needed
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const onReset = () => {
    setSearchedData(null);
  };

  return (
    <>
      {/* Banner start here */}
      <Banner />

      <Filter
        onSelectLocation={handleSelectedLocation}
        location={selectedLocation}
        onSearchProperties={searchProperties} // Pass the search function
      />

      {/* Properties start here, and pass the searchedData as data */}
      <Properties selectedLocation={selectedLocation} sData={searchedData} query={query} onReset={onReset}/>
    </>
  );
};

export default Property;
