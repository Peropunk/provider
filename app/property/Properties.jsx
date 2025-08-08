import { useState, useEffect } from "react";
import { FaBars, FaGripHorizontal, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PropertyCard from "./PropertyCard"; 
import useFetchPropertiesViewAll from "../../hooks/useFetchPropertiesViewAll";

const Properties = ({ selectedLocation, sData, query, onReset }) => {
    let location = "Knowledge Park 2 & 3";
    if (selectedLocation) {
        location = selectedLocation;
    }

    const [isListView, setIsListView] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [propertyType, setPropertyType] = useState("");
    const [genderType, setGenderType] = useState("");

    const ITEMS_PER_PAGE = 12;

    const filters = {
        page: currentPage,
        location: location,
        property_type: propertyType,
        gender: genderType,
    };

    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useFetchPropertiesViewAll({ filters });

    // Get all properties from loaded pages
    const allLoadedProperties = data?.pages?.flatMap((page) => page.properties) || [];
    
    // For search data, use client-side pagination
    const searchProperties = sData?.data || [];
    const currentProperties = sData ? searchProperties : allLoadedProperties;
    
    // Client-side pagination calculations
    const totalLoadedItems = currentProperties.length;
    const totalClientPages = Math.ceil(totalLoadedItems / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentPageProperties = currentProperties.slice(startIndex, endIndex);

    // Check if we need to load more data from server
    const needsMoreData = !sData && currentPage === totalClientPages && hasNextPage && currentPageProperties.length < ITEMS_PER_PAGE;

    // Auto-fetch more data when needed
    useEffect(() => {
        if (needsMoreData && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [needsMoreData, fetchNextPage, isFetchingNextPage]);

    // Reset to page 1 when search data or filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [sData, selectedLocation, propertyType, genderType]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        
        // If navigating to a page that doesn't have enough data, fetch more
        const requiredItems = pageNumber * ITEMS_PER_PAGE;
        if (!sData && requiredItems > allLoadedProperties.length && hasNextPage) {
            // Calculate how many more pages we need to fetch
            const pagesNeeded = Math.ceil((requiredItems - allLoadedProperties.length) / ITEMS_PER_PAGE);
            for (let i = 0; i < pagesNeeded && hasNextPage; i++) {
                fetchNextPage();
            }
        }
        
        // Scroll to top of properties section
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const generatePageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        // For non-search data, we might have more pages available on server
        let totalPages = totalClientPages;
        if (!sData && hasNextPage) {
            // Add some buffer pages if more data is available
            totalPages = Math.max(totalClientPages, currentPage + 2);
        }
        
        if (totalPages <= maxVisiblePages) {
            // Show all pages if total pages is less than max visible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show pages with ellipsis logic
            if (currentPage <= 3) {
                // Show first 3 pages, ellipsis, and estimated last page
                for (let i = 1; i <= 3; i++) {
                    pages.push(i);
                }
                if (totalPages > 4) {
                    pages.push('...');
                    if (!sData && hasNextPage) {
                        pages.push('More');
                    } else {
                        pages.push(totalPages);
                    }
                }
            } else if (!sData && hasNextPage) {
                // For server data with more pages, show current ± 1 and "More"
                pages.push(1);
                pages.push('...');
                for (let i = Math.max(1, currentPage - 1); i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push('More');
            } else if (currentPage >= totalPages - 2) {
                // Show first page, ellipsis, and last 3 pages
                pages.push(1);
                if (totalPages > 4) {
                    pages.push('...');
                }
                for (let i = totalPages - 2; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Show first page, ellipsis, current page ± 1, ellipsis, last page
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    const handleLoadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    if (isLoading && !data) {
      return (
        <section className="py-20" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="container mx-auto px-4 text-center">
            <p className="text-xl text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>Loading Properties...</p>
          </div>
        </section>
      );
    }
    
    if (isError) {
      return (
        <section className="py-20 bg-red-50">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xl text-red-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>Failed to load properties. Please try again later.</p>
            <p className="text-md text-red-600 mt-2">{error.message}</p>
          </div>
        </section>
      );
    }

    return (
        <section className="py-20" style={{ backgroundColor: '#f8f9fa', fontFamily: 'Montserrat, sans-serif' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800" style={{ color: '#2c3e50' }}>
                                {sData ? "Search Results" : "Properties"}
                            </h2>
                            <p className="text-lg text-gray-600 mt-1">
                                {sData ? `For "${query}"` : `In "${location}"`}
                                <span className="text-sm font-normal text-gray-500 ml-2">
                                    ({totalLoadedItems}{!sData && hasNextPage ? '+' : ''} {totalLoadedItems === 1 ? 'property' : 'properties'})
                                </span>
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                           
                            <div className="flex items-center bg-gray-200 rounded-lg p-1">
                                <button
                                    onClick={() => setIsListView(false)}
                                    className={`p-2 rounded-md transition-colors ${!isListView ? 'bg-white text-indigo-600 shadow' : 'text-gray-600 hover:bg-gray-300'}`}
                                    aria-label="Grid View"
                                >
                                    <FaGripHorizontal size={20} />
                                </button>
                                <button
                                    onClick={() => setIsListView(true)}
                                    className={`p-2 rounded-md transition-colors ${isListView ? 'bg-white text-indigo-600 shadow' : 'text-gray-600 hover:bg-gray-300'}`}
                                    aria-label="List View"
                                >
                                    <FaBars size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Properties Grid */}
                <div
                    className={`grid gap-8 ${isListView ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"}`}
                >
                    {currentPageProperties.map((singleData) => (
                        <PropertyCard key={singleData.id} singleData={singleData} isListView={isListView} />
                    ))}
                </div>

                {/* Loading indicator for fetching more data */}
                {(isFetchingNextPage || needsMoreData) && (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-700">Loading more properties...</p>
                    </div>
                )}

                {/* No Properties Found */}
                {totalLoadedItems === 0 && !isLoading && (
                    <div className="text-center py-24">
                        <h3 className="text-2xl font-semibold text-gray-800" style={{ color: '#2c3e50' }}>No Properties Found</h3>
                        <p className="text-gray-600 mt-4 max-w-md mx-auto">
                            {sData 
                                ? `We couldn't find any properties matching your search for "${query}". Please try a different search term.`
                                : `There are currently no properties available in "${location}". Please check back later.`
                            }
                        </p>
                        {sData && (
                            <button
                                onClick={onReset}
                                className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Reset Search
                            </button>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {(totalClientPages > 1 || (!sData && hasNextPage)) && (
                    <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6">
                        {/* Page Info */}
                        <div className="text-md text-gray-700">
                            Showing <span className="font-bold">{startIndex + 1}</span> to{' '}
                            <span className="font-bold">{Math.min(endIndex, totalLoadedItems)}</span> of{' '}
                            <span className="font-bold">{totalLoadedItems}{!sData && hasNextPage ? '+' : ''}</span> results
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex items-center space-x-2">
                            {/* Previous Button */}
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-4 py-3 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                            >
                                <FaChevronLeft size={12} />
                                <span className="ml-2 hidden sm:inline">Previous</span>
                            </button>

                            {/* Page Numbers */}
                            {generatePageNumbers().map((pageNumber, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        if (pageNumber === 'More') {
                                            handleLoadMore();
                                        } else if (typeof pageNumber === 'number') {
                                            handlePageChange(pageNumber);
                                        }
                                    }}
                                    disabled={pageNumber === '...'}
                                    className={`relative inline-flex items-center justify-center w-12 h-12 text-sm font-bold rounded-lg border transition-colors ${
                                        pageNumber === currentPage
                                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg'
                                            : pageNumber === '...'
                                            ? 'bg-white text-gray-400 border-gray-300 cursor-default'
                                            : pageNumber === 'More'
                                            ? 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200'
                                            : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                            ))}

                            {/* Next Button */}
                            <button
                                onClick={() => {
                                    if (currentPage < totalClientPages) {
                                        handlePageChange(currentPage + 1);
                                    } else if (!sData && hasNextPage) {
                                        handleLoadMore();
                                    }
                                }}
                                disabled={sData && currentPage === totalClientPages}
                                className="relative inline-flex items-center px-4 py-3 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                            >
                                <span className="mr-2 hidden sm:inline">Next</span>
                                <FaChevronRight size={12} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Reset Button for Search Results */}
                {sData && totalLoadedItems > 0 && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={onReset}
                            className="inline-flex items-center px-8 py-4 border border-gray-300 text-lg font-medium rounded-lg shadow-sm text-gray-800 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            Reset Search
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Properties;