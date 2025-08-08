import { Search, MapPin, Map, ChevronDown } from "lucide-react"; // Using superior icons from Lucide
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
          
          {/* Search Input with Integrated Button */}
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
                className="block w-full pl-12 pr-28 py-3 border border-slate-300 rounded-lg leading-5 bg-slate-50 placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              />
              <button
                type="button"
                onClick={handleSearch}
                className="absolute top-1/2 right-2 -translate-y-1/2 inline-flex items-center justify-center px-4 py-1.5 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                <Search size={16}/>
              </button>
            </div>
          </div>

          {/* City Selector */}
          <div className="w-full lg:w-auto">
             <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="text-gray-400" size={20}/>
                </div>
                <select
                  aria-label="Select a city"
                  className="w-full appearance-none pl-12 pr-10 py-3 text-base text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 hover:bg-gray-50 transition-all duration-200"
                  value={selectedCity ?? ""}
                  onChange={handleCitySelect}
                >
                  <option value="" disabled>Select City</option>
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
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDown className="text-gray-400" size={20} />
                </div>
             </div>
          </div>
          
          {/* Location Selector */}
          <div className="w-full lg:w-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Map className="text-gray-400" size={20} />
              </div>
              <select
                aria-label="Select a location"
                className="w-full appearance-none pl-12 pr-10 py-3 text-base text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200"
                value={location ?? ""}
                onChange={handleLocSelect}
                disabled={!selectedCity || currentLocations.length === 0}
              >
                <option value="" disabled>Select Location</option>
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
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDown className="text-gray-400" size={20} />
                </div>
            </div>
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