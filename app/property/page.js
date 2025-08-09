'use client'

import React, { useState } from 'react';
import Filter from './Filter';
import Banner from './Banner';
import Properties from './Properties';
import axios from 'axios';

const Property = () => {
  // State for all filters lives in this parent component
  const [selectedLocation, setSelectedLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [gender, setGender] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [seater, setSeater] = useState('');
  
  // State for text-based search results
  const [searchedData, setSearchedData] = useState(null);
  const [query, setQuery] = useState("");
  const [searchError, setSearchError] = useState(null);

  // Function to handle text-based property search
  const searchProperties = async (searchText) => {
    setQuery(searchText);
    setSearchError(null); // Reset error on new search

    if (!searchText || searchText.trim() === '') {
      setSearchedData(null);
      return;
    }
  
    try {
      // The API endpoint for text search
      const response = await axios.get(
        `https://api.dreamprovider.in/api/properties?populate=main_image,price,genders,seaters,location&filters[name][$containsi]=${searchText}`
      );
      
      setSearchedData(response.data);

    } catch (error) {
      console.error("Search Error:", error);
      setSearchError("Failed to fetch search results. Please try again.");
      setSearchedData(null);
    }
  };

  // Function to clear search data and text query
  const onReset = () => {
    setQuery("");
    setSearchedData(null);
    setSearchError(null);
  };

  // Function to clear ALL filters, including dropdowns and search
  const handleClearFilters = () => {
    onReset(); // Clears search text and results
    setSelectedLocation('');
    setPropertyType('');
    setGender('');
    setPriceRange('');
    setSeater('');
  };

  return (
    <>
      {/* Assuming you have a Banner component */}
      <Banner />

      {/* The Filter component receives all states and handler functions as props */}
      <Filter
        location={selectedLocation}
        onSelectLocation={setSelectedLocation}
        onSearchProperties={searchProperties}
        searchError={searchError}
        
        // Pass values and handlers for all new filters
        propertyType={propertyType}
        onPropertyTypeChange={setPropertyType}
        gender={gender}
        onGenderChange={setGender}
        priceRange={priceRange}
        onPriceChange={setPriceRange}
        seater={seater}
        onSeaterChange={setSeater}
        onClearFilters={handleClearFilters}
      />

      {/* The Properties component receives the current values of all filters */}
      <Properties 
        selectedLocation={selectedLocation} 
        sData={searchedData} 
        query={query} 
        onReset={onReset}
        
        // Pass filter values
        propertyType={propertyType}
        gender={gender}
        priceRange={priceRange}
        seater={seater}
      />
    </>
  );
};

export default Property;