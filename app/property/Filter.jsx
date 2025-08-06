import { Search, MapPin, Map } from "lucide-react"; // Using superior icons from Lucide
import { useFetchLocation } from "../../hooks/useFetchLocations";
import { useState, useEffect } from "react";

const Filter = ({ onSelectLocation, location, onSearchProperties, searchError }) => {
  const { data, error, isLoading, isSuccess } = useFetchLocation();
  const [selectedCity, setSelectedCity] = useState(null);
  const [currentLocations, setCurrentLocations] = useState([]);
  const [cities, setCities] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (isSuccess && data?.cities?.data) {
      setCities(data.cities.data);
    }
  }, [data, isSuccess]);

  const handleCitySelect = (event) => {
    const selectedCityName = event.target.value;
    setSelectedCity(selectedCityName);
    onSelectLocation(""); 

    if (!selectedCityName) {
        setCurrentLocations([]);
        return;
    }

    const selectedIndex = cities.findIndex(
      (city) => city.attributes.name === selectedCityName
    );

    if (selectedIndex !== -1) {
        setCurrentLocations(cities[selectedIndex]?.attributes?.locations?.data || []);
    }
  };

  const handleLocSelect = (event) => {
    const selectedLoc = event.target.value;
    onSelectLocation(selectedLoc);
  };

  const handleSearch = (e) => {
    e.preventDefault(); 
    onSearchProperties(searchText);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        handleSearch(e);
    }
  };

  return (
    // Added a subtle shadow and rounded corners for a modern, elevated look
    <div className="bg-white shadow-lg rounded-xl mx-auto max-w-6xl -mt-16 relative z-20">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          
          {/* Search Input */}
          <div className="w-full lg:flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-slate-400" size={20} />
              </div>
              <input
                type="search"
                name="property_search"
                id="propertySearch"
                placeholder="Search by PG, Hostel, Location..."
                value={searchText}
                onKeyDown={handleKeyPress}
                onChange={(e) => setSearchText(e.target.value)}
                className="block w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg leading-5 bg-slate-50 placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              />
            </div>
          </div>

          {/* City Selector */}
          <div className="w-full lg:w-auto">
             <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="text-slate-400" size={20}/>
                </div>
                <select
                  aria-label="Select a city"
                  className="w-full appearance-none pl-12 pr-10 py-3 text-base border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg capitalize bg-slate-50 transition-colors duration-200"
                  value={selectedCity ?? ""}
                  onChange={handleCitySelect}
                >
                  <option value="">Select City</option>
                  {isLoading ? (
                      <option disabled>Loading...</option>
                  ) : (
                      cities.map((city) => (
                        <option key={city.id} value={city.attributes.name}>
                          {city.attributes.name}
                        </option>
                      ))
                  )}
                </select>
             </div>
          </div>
          
          {/* Location Selector */}
          <div className="w-full lg:w-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Map className="text-slate-400" size={20} />
              </div>
              <select
                aria-label="Select a location"
                className="w-full appearance-none pl-12 pr-10 py-3 text-base border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg capitalize bg-slate-50 disabled:bg-slate-100 disabled:cursor-not-allowed transition-colors duration-200"
                value={location ?? ""}
                onChange={handleLocSelect}
                disabled={!selectedCity || currentLocations.length === 0}
              >
                <option value="">Select Location</option>
                {selectedCity && currentLocations.length > 0 ? (
                   currentLocations.map((loc) => (
                      <option key={loc.id} value={loc.attributes.name}>
                        {loc.attributes.name}
                      </option>
                    ))
                ) : selectedCity ? (
                  <option disabled>No locations found</option>
                ) : null}
              </select>
            </div>
          </div>
          
          {/* Search Button */}
          <div className="w-full lg:w-auto">
            <button
              type="button"
              onClick={handleSearch}
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-px"
            >
              <Search className="mr-2 -ml-1" size={20}/>
              Search
            </button>
          </div>
        </div>

        {searchError && (
          <div className="text-center mt-4">
            <p className="text-red-600 text-sm">{searchError}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;