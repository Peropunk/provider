'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../../components/Footer';
import axios from 'axios';
import {
  FaArrowLeft, FaMapMarkerAlt, FaBed, FaCheckCircle,
  FaPhoneAlt, FaWhatsapp, FaHeart, FaRegHeart, FaShare, FaWifi, FaTshirt,
  FaShieldAlt, FaBus, FaDumbbell, FaParking, FaBook, FaSnowflake,
  FaVideo, FaMobileAlt, FaMapMarkedAlt, FaChevronLeft, FaChevronRight, FaExpand
} from 'react-icons/fa';

const PropertyDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const facilityIconMapping = {
    'Free Unlimited WiFi': FaWifi, 'CCTV': FaShieldAlt, 'Unlimited Laundry with iron': FaTshirt,
    'Transportation': FaBus, 'Gym': FaDumbbell, 'AC': FaSnowflake, 'Parking': FaParking,
    'Fully Furnished': FaBed, 'Library': FaBook, 'Housekeeping (3-4times/week)': FaCheckCircle,
    'Food (Breakfast, Lunch, Snacks & Dinner)': FaCheckCircle,
  };

  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchProperty = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://api.dreamprovider.in/api/properties/${id}?populate=*`);
        if (!response.data?.data) throw new Error('Property data not found');
        setProperty(response.data.data);
      } catch (err) {
        console.error("Error fetching property:", err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  // Scroll to top when component mounts and when property data is loaded
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (property) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [property]);

  const handleDownloadApp = () => {
    const userAgent = typeof window !== 'undefined' ? navigator.userAgent || navigator.vendor || window.opera : '';
    if (/android/i.test(userAgent)) {
      window.open('https://play.google.com/store/apps/details?id=provider.in', '_blank');
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.open('https://apps.apple.com/in/app/provider-app-search-hostel-pg/id1659063733', '_blank');
    } else {
      window.open('https://play.google.com/store/apps/details?id=provider.in', '_blank');
    }
  };

  const handleShare = () => {
    if (navigator.share && property) {
      navigator.share({
        title: property.attributes.name,
        text: `Check out this property: ${property.attributes.name}`,
        url: window.location.href,
      }).catch(err => console.log('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Link href="/properties" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const attr = property.attributes;
  // Combine main image and gallery images, then remove any duplicates
  const rawImageUrls = [
    attr.main_image?.data?.attributes?.url,
    ...(attr.images?.data?.map(img => img.attributes.url) || [])
  ].filter(Boolean);

  const galleryImages = [...new Set(rawImageUrls)];

  const statusStyles = {
    full: "bg-red-100 text-red-800",
    available: "bg-green-100 text-green-800",
  };

  const goToPrevious = () => {
    setCurrentImageIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  }

  const handleImageContextMenu = (e) => {
    e.preventDefault();
  };

  // Fullscreen view component
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center" onContextMenu={handleImageContextMenu}>
        <Image src={galleryImages[currentImageIndex]} alt={attr.name} layout="fill" objectFit="contain" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-white text-6xl font-bold opacity-30 select-none">Provider App</span>
        </div>
        <button
          onClick={toggleFullscreen}
          className="absolute left-6 top-1/6 -translate-y-1/2 z-50 text-white p-3 bg-black bg-opacity-60 rounded-full hover:bg-opacity-80 transition-opacity"
          aria-label="Exit fullscreen"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button onClick={goToPrevious} className="absolute left-16 top-1/2 -translate-y-1/2 z-50 text-white p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-opacity"><FaChevronLeft size={24} /></button>
        <button onClick={goToNext} className="absolute right-6 top-1/2 -translate-y-1/2 z-50 text-white p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-opacity"><FaChevronRight size={24} /></button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0"> {/* Padding bottom for mobile sticky button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content - left column on desktop */}
          <div className="lg:col-span-2">
            {/* Images - Always first */}
            {galleryImages.length > 0 && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div
                  className={`relative ${showThumbnails ? 'h-96' : 'h-[65vh]'} transition-all duration-300 ease-in-out cursor-pointer`}
                  onClick={() => setShowThumbnails(!showThumbnails)}
                  onContextMenu={handleImageContextMenu}
                >
                  <Image
                    src={galleryImages[currentImageIndex]}
                    alt={attr.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-white text-4xl font-bold opacity-25 select-none">Provider App</span>
                  </div>

                   <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
                    <button
                      onClick={(e) => { e.stopPropagation(); router.back(); }}
                      className="flex items-center text-white p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
                      aria-label="Go back"
                    >
                      <FaArrowLeft />
                    </button>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDownloadApp(); }}
                        className="text-white p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
                        aria-label="Add to wishlist"
                      >
                        <FaRegHeart size={20} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleShare(); }}
                        className="text-white p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
                        aria-label="Share property"
                      >
                        <FaShare size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-between p-2">
                     <button onClick={(e) => { e.stopPropagation(); goToPrevious(); }} className="p-2 bg-black bg-opacity-40 text-white rounded-full hover:bg-opacity-60 transition-all"><FaChevronLeft size={20} /></button>
                     <button onClick={(e) => { e.stopPropagation(); goToNext(); }} className="p-2 bg-black bg-opacity-40 text-white rounded-full hover:bg-opacity-60 transition-all"><FaChevronRight size={20} /></button>
                  </div>
                   <button onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="absolute bottom-2 right-2 p-2 bg-black bg-opacity-40 text-white rounded-full hover:bg-opacity-60 transition-all"><FaExpand size={16} /></button>
                </div>

                {showThumbnails && galleryImages.length > 1 && (
                  <div className="flex space-x-2 p-4 overflow-x-auto bg-gray-50">
                    {galleryImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${index === currentImageIndex ? 'border-indigo-500 scale-105' : 'border-transparent hover:border-gray-400'}`}
                        onContextMenu={handleImageContextMenu}
                      >
                        <Image src={image} alt={`Thumbnail ${index + 1}`} width={80} height={80} className="object-cover w-full h-full" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Property details - Second */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <div className="flex flex-wrap items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{attr.name}</h1>
                  <div className="flex items-center text-gray-600"><FaMapMarkerAlt className="mr-2 flex-shrink-0" /><span>{attr.address}</span></div>
                </div>
                {attr.status && <span className={`px-3 py-1 text-sm font-semibold rounded-full capitalize ${statusStyles[attr.status] || 'bg-gray-100 text-gray-800'}`}>{attr.status}</span>}
              </div>
            </div>

            {/* Mobile-only sections in specific order */}
            <div className="block lg:hidden space-y-4">
              {/* Pricing - Third on mobile */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Pricing</h3>
                <button
                  onClick={handleDownloadApp}
                  className="inline-flex items-center justify-center w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                >
                  Reveal Price
                </button>
              </div>

              {/* Quick Info - Fourth on mobile */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Property Type</span><span className="font-medium text-gray-800">{attr.property_types}</span></div>
                  {attr.genders?.data?.length > 0 && <div className="flex justify-between"><span className="text-gray-500">Gender</span><span className="font-medium text-gray-800">{attr.genders.data[0].attributes.name}</span></div>}
                  
                  {attr.seaters?.data?.length > 0 && (
                    <div className="flex justify-between items-start">
                      <span className="text-gray-500 mt-1">Room Types</span>
                      <div className="flex flex-wrap gap-2 justify-end max-w-[70%]">
                        {attr.seaters.data.map((seater) => (
                          <span 
                            key={seater.id} 
                            className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full"
                          >
                            {seater.attributes.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {attr.location?.data?.attributes?.name && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Location</span>
                      <span className="font-medium text-gray-800">{attr.location.data.attributes.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Enquire more - Fifth on mobile */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Enquire more</h3>
                <div className="space-y-3">
                  <button onClick={handleDownloadApp} className="flex items-center justify-center w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"><FaPhoneAlt className="mr-2" /> Call Owner</button>
                  {attr.video_url && <a href={attr.video_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"><FaVideo className="mr-2" /> Watch Video Tour</a>}

                  <button
                    onClick={handleDownloadApp}
                    className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                  >
                    <FaMapMarkedAlt className="mr-2" />
                    View on Map
                  </button>
                </div>
              </div>

              {/* Description - Sixth on mobile (MOVED HERE) */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{attr.description}</p>
              </div>

              {/* Facilities - Seventh on mobile */}
              <div className="bg-white rounded-lg shadow-md p-6">
                {attr.facilities?.data?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">What this place offers</h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                      {attr.facilities.data.map((facility) => {
                        const Icon = facilityIconMapping[facility.attributes.value] || FaCheckCircle; 
                        return (
                          <div key={facility.id} className="flex items-center">
                            <Icon className="text-indigo-600 mr-3 flex-shrink-0" size={20} />
                            <span className="text-gray-700 text-sm">{facility.attributes.value}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description and Facilities - Desktop layout */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{attr.description}</p>
                </div>
              </div>

              {/* Facilities - Desktop only */}
              <div className="bg-white rounded-lg shadow-md p-6">
                {attr.facilities?.data?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">What this place offers</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3">
                      {attr.facilities.data.map((facility) => {
                        const Icon = facilityIconMapping[facility.attributes.value] || FaCheckCircle; 
                        return (
                          <div key={facility.id} className="flex items-center">
                            <Icon className="text-indigo-600 mr-3 flex-shrink-0" size={20} />
                            <span className="text-gray-700">{facility.attributes.value}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Desktop only */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              
              {/* Pricing - Desktop */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Pricing</h3>
                <button
                  onClick={handleDownloadApp}
                  className="inline-flex items-center justify-center w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                >
                  Reveal Price
                </button>
              </div>

              {/* Enquire more - Desktop */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Enquire more</h3>
                <div className="space-y-3">
                  <button onClick={handleDownloadApp} className="flex items-center justify-center w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"><FaPhoneAlt className="mr-2" /> Call Owner</button>
                  {attr.video_url && <a href={attr.video_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"><FaVideo className="mr-2" /> Watch Video Tour</a>}

                  <button
                    onClick={handleDownloadApp}
                    className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                  >
                    <FaMapMarkedAlt className="mr-2" />
                    View on Map
                  </button>
                </div>
              </div>

              {/* Quick Info - Desktop */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Property Type</span><span className="font-medium text-gray-800">{attr.property_types}</span></div>
                  {attr.genders?.data?.length > 0 && <div className="flex justify-between"><span className="text-gray-500">Gender</span><span className="font-medium text-gray-800">{attr.genders.data[0].attributes.name}</span></div>}
                  
                  {attr.seaters?.data?.length > 0 && (
                    <div className="flex justify-between items-start">
                      <span className="text-gray-500 mt-1">Room Types</span>
                      <div className="flex flex-wrap gap-2 justify-end max-w-[70%]">
                        {attr.seaters.data.map((seater) => (
                          <span 
                            key={seater.id} 
                            className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full"
                          >
                            {seater.attributes.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {attr.location?.data?.attributes?.name && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Location</span>
                      <span className="font-medium text-gray-800">{attr.location.data.attributes.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Schedule Visit Button - Desktop only */}
              <div>
                <p className="text-sm font-semibold text-center text-gray-800 mb-2">Want to visit this hostel?</p>
                <button
                  onClick={handleDownloadApp}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg animate-pulse"
                >
                  Schedule a Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Visit Sticky Button - Mobile only */}
      <div className="block lg:hidden fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-40">
        <button
          onClick={handleDownloadApp}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg animate-pulse"
        >
          Schedule a Visit
        </button>
      </div>
      <Footer/>
    </div>
  );
};

export default PropertyDetailPage;