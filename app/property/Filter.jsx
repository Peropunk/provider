import { Search, MapPin, Map, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useFetchLocation } from "../../hooks/useFetchLocations";
import { useState, useEffect } from "react";

const Filter = ({
  onSelectLocation,
  location,
  onSearchProperties,
  searchError,
  propertyType,
  onPropertyTypeChange,
  gender,
  onGenderChange,
  priceRange,
  onPriceChange,
  seater,
  onSeaterChange,
  onClearFilters
}) => {
  const { data, error, isLoading, isSuccess } = useFetchLocation();
  const [selectedCity, setSelectedCity] = useState(null);
  const [currentLocations, setCurrentLocations] = useState([]);
  const [cities, setCities] = useState([]);
  const [searchText, setSearchText] = useState("");

  // This logic determines when the "Clear Filters" button is visible
  const isFilterActive = location || searchText || propertyType || gender || priceRange || seater;

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
    let query = searchText;

    const seaterRegex = /(\d+)\s*seater/i;
    const seaterMatch = query.match(seaterRegex);
    if (seaterMatch) {
      onSeaterChange(`${seaterMatch[1]} Seater`);
      query = query.replace(seaterRegex, '').trim();
    } else {
      onSeaterChange('');
    }

    const priceRegex = /(?:under|below)?\s*(\d{4,})/i;
    const priceMatch = query.match(priceRegex);
    if (priceMatch) {
      const price = parseInt(priceMatch[1], 10);
      onPriceChange(`0-${price}`);
      query = query.replace(priceMatch[0], '').trim();
    } else {
      onPriceChange('');
    }

    onSearchProperties(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        handleSearch(e);
    }
  };

  // This function is called when the "Clear Filters" button is clicked
  const handleClear = () => {
    setSearchText("");
    setSelectedCity(null);
    setCurrentLocations([]);
    onClearFilters();
  }

  const propertyTypeOptions = ["PG", "Hostel", "Flat", "Room"];
  
  // --- UPDATED GENDER OPTIONS ---
  const genderOptions = ["Boys", "Girls", "Independent", "Family"];

  return (
    <div className="bg-white shadow-lg rounded-xl mx-auto max-w-6xl -mt-16 relative z-20">
      <div className="px-4 sm:px-6 lg:px-8 py-6">

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <SlidersHorizontal className="text-indigo-600 mr-2" size={20} />
            <h3 className="text-lg font-semibold text-slate-800">Fill your requirements</h3>
          </div>
          {/* --- CLEAR FILTERS BUTTON --- */}
          {isFilterActive && (
            <button
              onClick={handleClear}
              className="flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all"
            >
              <X size={14} className="mr-1" />
              Clear Filters
            </button>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {/* --- Row 1: Search Bar --- */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-slate-400" size={20} />
            </div>
            <input
              type="search"
              placeholder="Search by name, price (e.g., under 8000), or seater (e.g., 2 seater)..."
              value={searchText}
              onKeyDown={handleKeyPress}
              onChange={(e) => setSearchText(e.target.value)}
              className="block w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg leading-5 bg-slate-50 placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
            />
          </div>

          {/* --- Row 2: Dropdown Filters --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* City Dropdown */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="text-gray-400" size={18}/>
                </div>
                <select
                aria-label="Select a city"
                className="w-full appearance-none pl-10 pr-8 py-3 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
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
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <ChevronDown className="text-gray-400" size={18} />
                </div>
            </div>

            {/* Location Dropdown */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Map className="text-gray-400" size={18} />
                </div>
                <select
                aria-label="Select a location"
                className="w-full appearance-none pl-10 pr-8 py-3 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
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
                <option disabled>No locations</option>
                ) : null}
                </select>
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                    <ChevronDown className="text-gray-400" size={18} />
                </div>
            </div>

            {/* Property Type Dropdown */}
            <select value={propertyType} onChange={(e) => onPropertyTypeChange(e.target.value)} className="w-full text-sm appearance-none px-4 py-3 text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400">
              <option value="">Select Property Type</option>
              {propertyTypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>

            {/* Gender Dropdown */}
            <select value={gender} onChange={(e) => onGenderChange(e.target.value)} className="w-full text-sm appearance-none px-4 py-3 text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400">
              <option value="">Select Gender</option>
              {genderOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        {searchError && (
          <div className="text-center mt-4">
            <p className="text-red-600 text-sm">{searchError}</p>
          </div>
        )}

         <div className="mt-6 text-center">
            <button
                type="button"
                onClick={handleSearch}
                className="w-full md:w-auto inline-flex items-center justify-center px-10 py-3 border border-transparent font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                <Search size={20} className="mr-2"/>
                Search Now
            </button>
         </div>

      </div>
    </div>
  );
};

export default Filter;