'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../../hooks/useAuth';
import { revealProperty, toggleSaveProperty } from '../../../property';
import Footer from '../../components/Footer';
import axios from 'axios';
import {
  FaArrowLeft, FaMapMarkerAlt, FaBed, FaCheckCircle,
  FaPhoneAlt, FaWhatsapp, FaHeart, FaRegHeart, FaShare, FaWifi, FaTshirt,
  FaShieldAlt, FaBus, FaDumbbell, FaParking, FaBook, FaSnowflake,
  FaVideo, FaMobileAlt, FaMapMarkedAlt, FaChevronLeft, FaChevronRight, FaExpand,
  FaChevronDown, FaChevronUp, FaPlay, FaMap
} from 'react-icons/fa';
import { BASE_URL } from '../../../lib/endpoints';
import { motion, AnimatePresence } from 'framer-motion';

const PropertyDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const dispatch = useDispatch();
  const { user, token } = useAuth(); // Use AuthContext instead of Redux selector


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
  const [isSaved, setIsSaved] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPriceRevealed, setIsPriceRevealed] = useState(false);

  // Schedule Visit State
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');

  const handleScheduleVisitClick = () => {
    setIsVisitModalOpen(!isVisitModalOpen);
  };

  const handleConfirmVisit = () => {
    if (!visitDate || !visitTime) {
      alert('Please select both a date and time for your visit.');
      return;
    }

    const dateObj = new Date(visitDate);
    const formattedDate = dateObj.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const message = `Hello, I would like to schedule a visit for ${property?.attributes?.name} (${id}) on ${formattedDate} at ${visitTime}.`;
    const phoneNumber = '+917303831326'; // Using the support number for scheduling
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
    setIsVisitModalOpen(false);
    setVisitDate('');
    setVisitTime('');
  };

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

  const handleChat = (property) => {
    window.open(` https://wa.me/+917303831326?text=Hello, I am interested in the ${property.attributes.name} - ${property.id}. Can you provide more details?`, '_blank');
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

  const handleOpenMap = () => {
    const latlng = property?.attributes?.latlng;
    if (latlng && latlng._latitude && latlng._longitude) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${latlng._latitude},${latlng._longitude}`, '_blank');
    } else {
      alert("Location not available on map.");
    }
  };

  const handleReveal = async (action, callback) => {
    if (!token) {
      // Redirect to login or show alert
      // Using router.push to login page (assuming /auth/login or similar exists, or just alert for now as per lead.txt example logic adaptation)
      // The user request implied adapting React Native code where Alert.alert is used.
      // For web, we can use window.confirm or a toast. For simplicity and robustness:
      if (confirm('Authentication Required. Please sign in to reveal property information.')) {
        router.push('/auth/login'); // Adjust route if needed
      }
      return;
    }

    if (!id) {
      console.error('Property ID missing');
      return;
    }

    const data = JSON.stringify({
      data: {
        property: parseInt(id),
        users_permissions_user: user?.id,
        action: action,
        token: token, // Pass token explicitly
      },
    });

    try {
      const res = await dispatch(revealProperty(data)).unwrap();
      // On success (or if action allowed), proceed with the callback (e.g. open map)
      console.log('Reveal success:', res);
      if (callback) callback();
    } catch (error) {
      console.error('Reveal error:', error);
      if (error?.status === 401) {
        alert('Authentication Error. Please sign in again.');
      } else if (error?.status === 403) {
        alert("You don't have permission to perform this action.");
      } else {
        // Even if error, sometimes we might want to allow the action if it's just a logging failure?
        // But usually CRM lead punch is critical for business.
        // Let's assume strict mode: error = no action.
        alert('Failed to process request. Please try again.');
      }
    }
  };

  const handleToggleSave = async () => {
    if (!token) {
      if (confirm('Please sign in to save properties.')) {
        router.push('/auth/login');
      }
      return;
    }

    try {
      const response = await dispatch(toggleSaveProperty({ propertyId: id, token: token, userId: user?.id })).unwrap();
      if (response) {
        setIsSaved(response.isSaved);
        // Ideally also update local property object or refetch if needed,
        // but we are tracking isFavorite/isSaved locally for UI now.
        // Note: The original code had `isFavorite` state but didn't seem to use it effectively with API data initially.
        // We will rely on the response to flip the state.
      }
    } catch (error) {
      console.error('Error saving property:', error);
    }
  };

  // Sync isSaved with property data if available (this part was missing in original logic)
  // Sync isSaved with property data if available (this part was missing in original logic)
  useEffect(() => {
    const checkSavedStatus = async () => {
      if (!user?.id || !id || !token) return;

      try {
        const response = await axios.get(`${BASE_URL}api/users/${user.id}?populate=saved_properties`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data) {
          const userData = response.data;
          const savedProperties = userData.saved_properties?.data || userData.saved_properties || [];

          const isAlreadySaved = savedProperties.some((prop) => {
            const propId = prop.id || prop;
            return parseInt(propId) === parseInt(id);
          });

          setIsSaved(isAlreadySaved);
        }
      } catch (error) {
        console.error("Error checking saved status:", error);
      }
    };

    checkSavedStatus();
  }, [user, id, token]);


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

  const PropertyPriceReveal = ({ price, onReveal, isRevealed, setIsRevealed }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleHeaderClick = () => {
      if (!isRevealed) {
        onReveal(() => {
          // Callback after successful reveal
          setIsOpen(true);
        });
      } else {
        setIsOpen(!isOpen);
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <button
          onClick={handleHeaderClick}
          className="w-full flex justify-between items-center p-6 bg-white hover:bg-gray-50 transition-colors focus:outline-none"
        >
          <h3 className="text-xl font-semibold text-gray-800">Pricing</h3>
          {isOpen ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
        </button>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="p-6 pt-0 border-t border-gray-100">
            <div className="pt-4">
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-center">
                <p className="text-sm font-medium text-indigo-500 uppercase tracking-wide mb-1">Rent / Month</p>
                <div className="flex flex-col items-center justify-center text-indigo-700 gap-1">
                  {Array.isArray(price) && price.length > 0 ? (
                    price.map((p, idx) => (
                      <div key={idx} className="flex flex-col items-center border-b last:border-0 border-indigo-200 py-2 w-full">
                        <span className="text-3xl font-bold">₹{parseInt(p.price).toLocaleString('en-IN')}</span>
                        <span className="text-sm text-indigo-600 font-medium">({p.value} {p.duration ? `- ${p.duration}` : ''})</span>
                        {/* Using selector_name if available or falling back, based on assumption. JSON showed 'value': '1 BHK'. 'seater_relation' ID. */}
                        {/* Re-checking JSON: "value":"1 bhk". */}
                      </div>
                    ))
                  ) : (
                    <span className="text-3xl font-bold">₹{price ? price.toLocaleString('en-IN') : 'N/A'}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PropertyHeaderCard = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        {/* Top Row: Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {attr.genders?.data?.length > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
              {attr.genders.data[0].attributes.name}
            </span>
          )}
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            {attr.property_types}
          </span>
          {/* Example 'Fast Filling' tag if available, using status for now */}
          {attr.status === 'full' && (
            <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Full
            </span>
          )}
          {/* If we had a specific 'fast filling' field we would use it. Using 'Available' as generic or skipping if not special. */}
        </div>

        {/* Middle: Name & Location */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{attr.name}</h1>
          <div className="flex items-start text-gray-500 text-sm">
            <FaMapMarkerAlt className="mr-2 mt-1 flex-shrink-0" />
            <span>{attr.address}</span>
          </div>
        </div>

        {/* Bottom Row: Circular Action Buttons */}
        <div className="flex justify-around items-center pt-2 border-t border-gray-100">
          {attr.video_url && (
            <button
              onClick={() => handleReveal('view_video', () => window.open(attr.video_url, '_blank'))}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <FaPlay size={18} className="ml-1" /> {/* ml-1 to visually center play icon */}
              </div>
              <span className="text-xs text-gray-600 font-medium">Video View</span>
            </button>
          )}

          <button
            onClick={() => handleReveal('call_owner(web)', () => window.location.href = `tel:${attr.owner_number}`)}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <FaPhoneAlt size={18} />
            </div>
            <span className="text-xs text-gray-600 font-medium">Call Owner</span>
          </button>

          <button
            onClick={() => handleReveal('view_map(web)', handleOpenMap)}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <FaMap size={18} />
            </div>
            <span className="text-xs text-gray-600 font-medium">Map View</span>
          </button>
        </div>
      </div>
    );
  };

  // Helper to generate dates for keys
  const getDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const datesList = getDates();
  const timeSlots = [
    "10:00 - 11:00 AM", "11:00 - 12:00 PM", "12:00 - 01:00 PM",
    "01:00 - 02:00 PM", "02:00 - 03:00 PM", "03:00 - 04:00 PM",
    "04:00 - 05:00 PM", "05:00 - 06:00 PM", "06:00 - 07:00 PM",
    "07:00 - 08:00 PM"
  ];

  const ScheduleVisitUI = ({ isMobile }) => {
    return (
      <AnimatePresence>
        {isVisitModalOpen && (
          isMobile ? (
            // Mobile Bottom Sheet
            <div className="fixed inset-0 z-50 flex items-end sm:hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsVisitModalOpen(false)}
              />

              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full bg-white rounded-t-3xl p-6 shadow-2xl z-50 max-h-[85vh] overflow-y-auto"
              >
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Schedule a Visit</h3>
                <p className="text-gray-500 text-sm mb-6">Select a date and time to visit this property.</p>

                <div className="space-y-6">
                  {/* Date Selection */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      Calendar <span className="text-xs font-normal text-gray-400">Select Date</span>
                    </h4>
                    <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide -mx-6 px-6">
                      {datesList.map((date, index) => {
                        const dateStr = date.toISOString().split('T')[0];
                        const isSelected = visitDate === dateStr;
                        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                        const dayNum = date.getDate();
                        const month = date.toLocaleDateString('en-US', { month: 'short' });

                        return (
                          <button
                            key={index}
                            onClick={() => setVisitDate(dateStr)}
                            className={`flex flex-col items-center justify-center min-w-[70px] h-[85px] rounded-2xl border transition-all ${isSelected
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 scale-105'
                              : 'bg-white text-gray-600 border-gray-100 hover:border-indigo-200'
                              }`}
                          >
                            <span className={`text-xs font-medium ${isSelected ? 'text-indigo-100' : 'text-gray-400'}`}>{dayName}</span>
                            <span className="text-xl font-bold my-0.5">{dayNum}</span>
                            <span className={`text-[10px] ${isSelected ? 'text-indigo-100' : 'text-gray-400'}`}>{month}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      Clock <span className="text-xs font-normal text-gray-400">Select Time</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((slot, index) => (
                        <button
                          key={index}
                          onClick={() => setVisitTime(slot)}
                          className={`py-3 px-2 rounded-xl text-xs font-semibold border transition-all ${visitTime === slot
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-2 ring-indigo-500 ring-offset-1'
                            : 'bg-white text-gray-600 border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmVisit}
                    disabled={!visitDate || !visitTime}
                    className={`w-full py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2.5 transition-all active:scale-95 ${!visitDate || !visitTime
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-green-200'
                      }`}
                  >
                    <FaWhatsapp size={22} />
                    Schedule on WhatsApp
                  </button>
                </div>
              </motion.div>
            </div>
          ) : (
            // Desktop Expanding Card (Replaces Button)
            <motion.div
              layoutId="schedule-visit-card"
              className="absolute top-0 left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
                <h3 className="text-sm font-bold text-gray-800">Schedule Visit</h3>
                <button
                  onClick={() => setIsVisitModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <div className="space-y-4">
                  {/* Date Selection */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Select Date</h4>
                    <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
                      {datesList.map((date, index) => {
                        const dateStr = date.toISOString().split('T')[0];
                        const isSelected = visitDate === dateStr;
                        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                        const dayNum = date.getDate();

                        return (
                          <button
                            key={index}
                            onClick={() => setVisitDate(dateStr)}
                            className={`flex flex-col items-center justify-center min-w-[50px] h-[60px] rounded-lg border transition-all flex-shrink-0 ${isSelected
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
                              }`}
                          >
                            <span className={`text-[10px] uppercase ${isSelected ? 'text-indigo-200' : 'text-gray-400'}`}>{dayName}</span>
                            <span className="text-sm font-bold">{dayNum}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Select Time</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((slot, index) => (
                        <button
                          key={index}
                          onClick={() => setVisitTime(slot)}
                          className={`py-2 px-1 rounded-lg text-[10px] font-semibold border transition-all ${visitTime === slot
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-1 ring-indigo-500'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
                            }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmVisit}
                    disabled={!visitDate || !visitTime}
                    className={`w-full py-2.5 text-sm font-bold rounded-lg shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 ${!visitDate || !visitTime
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#25D366] hover:bg-[#20bd5a] text-white'
                      }`}
                  >
                    <FaWhatsapp size={16} />
                    Confirm Schedule
                  </button>
                </div>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    );
  };

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
                        onClick={(e) => { e.stopPropagation(); handleToggleSave(); }}
                        className={`text-white p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors ${isSaved ? 'text-red-500' : ''}`}
                        aria-label="Add to wishlist"
                      >
                        {isSaved ? <FaHeart size={20} className="text-red-500" /> : <FaRegHeart size={20} />}
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

            {/* Property details - Header Card (Replaces old header) */}
            <PropertyHeaderCard />

            {/* Mobile-only sections in specific order */}
            <div className="block lg:hidden space-y-4">
              {/* Pricing - Third on mobile */}
              {/* Pricing - Third on mobile */}
              <PropertyPriceReveal
                price={attr.price}
                onReveal={(callback) => handleReveal('view_price(web)', () => {
                  setIsPriceRevealed(true);
                  if (callback) callback();
                })}
                isRevealed={isPriceRevealed}
                setIsRevealed={setIsPriceRevealed}
              />

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

              {/* Enquire more - Hidden on mobile as it's now in HeaderCard */}
              {/* <div className="bg-white rounded-lg shadow-md p-6"> ... </div> */}
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
              {/* Description - Sixth on mobile (MOVED HERE) */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{attr.description}</p>
              </div>


            </div>
            {/* Facilities - Desktop only */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
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
            {/* Description and Facilities - Desktop layout */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{attr.description}</p>
                </div>
              </div>


            </div>
          </div>

          {/* Sidebar - Desktop only */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">


              {/* Schedule Visit Button - Desktop only */}
              <div className="relative h-[60px]"> {/* Fixed height container to prevent layout shift */}
                <AnimatePresence>
                  {!isVisitModalOpen && (
                    <motion.button
                      layoutId="schedule-visit-card"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={handleScheduleVisitClick}
                      className="absolute inset-0 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg flex items-center justify-center z-10"
                    >
                      Schedule a Visit
                    </motion.button>
                  )}
                </AnimatePresence>
                <ScheduleVisitUI isMobile={false} />
              </div>

              {/* Pricing - Desktop */}
              <PropertyPriceReveal
                price={attr.price}
                onReveal={(callback) => handleReveal('view_price(web)', () => {
                  setIsPriceRevealed(true);
                  if (callback) callback();
                })}
                isRevealed={isPriceRevealed}
                setIsRevealed={setIsPriceRevealed}
              />


              {/* Enquire more - Desktop */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Enquire more</h3>
                <div className="space-y-3">
                  <button onClick={() => handleChat(property)} className="flex items-center justify-center w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"><FaPhoneAlt className="mr-2" /> Chat Now </button>
                  {attr.video_url && <a href={attr.video_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"><FaVideo className="mr-2" /> Watch Video Tour</a>}

                  <button
                    onClick={handleOpenMap}
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


            </div>
          </div>
        </div>
      </div>

      {/* Schedule Visit Sticky Button - Mobile only */}
      <div className="block lg:hidden fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-40">
        <button
          onClick={handleScheduleVisitClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg animate-pulse"
        >
          Schedule a Visit
        </button>
      </div>
      <ScheduleVisitUI isMobile={true} />
      <Footer />
    </div>
  );
};

export default PropertyDetailPage;