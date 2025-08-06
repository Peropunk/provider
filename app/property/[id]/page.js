'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
// Note: Imports for @react-google-maps/api are removed.
import { 
  FaArrowLeft, FaMapMarkerAlt, FaBed, FaUserFriends, FaCheckCircle,
  FaPhone, FaWhatsapp, FaHeart, FaRegHeart, FaShare, FaWifi, FaTshirt,
  FaShieldAlt, FaBus, FaDumbbell, FaParking, FaBook, FaSnowflake, 
  FaVideo, FaMapMarkedAlt // Added FaMapMarkedAlt for the new button
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

  const handleWhatsApp = () => {
    if (!property) return;
    const ownerPhone = property.attributes.owner_number;
    const message = `Hi, I'm interested in your property: ${property.attributes.name} (ID: ${id})`;
    const whatsappUrl = `https://wa.me/${ownerPhone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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
  const galleryImages = [
    attr.main_image?.data?.attributes?.url,
    ...(attr.images?.data?.map(img => img.attributes.url) || [])
  ].filter(Boolean);
  
  const propertyLocation = attr.latlng;

  const statusStyles = {
    full: "bg-red-100 text-red-800",
    available: "bg-green-100 text-green-800",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => router.back()} className="flex items-center text-gray-600 hover:text-gray-800"><FaArrowLeft className="mr-2" /> Back</button>
            <div className="flex items-center space-x-2">
              <button onClick={() => setIsFavorite(!isFavorite)} className="p-2 rounded-full hover:bg-gray-100">{isFavorite ? <FaHeart className="text-red-500" size={20} /> : <FaRegHeart className="text-gray-500" size={20} />}</button>
              <button onClick={handleShare} className="p-2 rounded-full hover:bg-gray-100"><FaShare className="text-gray-500" size={20} /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {galleryImages.length > 0 && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="relative h-96"><Image src={galleryImages[currentImageIndex]} alt={attr.name} fill sizes="(max-width: 1024px) 100vw, 66vw" priority className="object-cover" /></div>
                {galleryImages.length > 1 && (<div className="flex space-x-2 p-4 overflow-x-auto bg-gray-50">{galleryImages.map((image, index) => (<button key={index} onClick={() => setCurrentImageIndex(index)} className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${index === currentImageIndex ? 'border-indigo-500 scale-105' : 'border-transparent hover:border-gray-400'}`}><Image src={image} alt={`Thumbnail ${index + 1}`} width={80} height={80} className="object-cover w-full h-full" /></button>))}</div>)}
              </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-wrap items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{attr.name}</h1>
                  <div className="flex items-center text-gray-600"><FaMapMarkerAlt className="mr-2 flex-shrink-0" /><span>{attr.address}</span></div>
                </div>
                {attr.status && <span className={`px-3 py-1 text-sm font-semibold rounded-full capitalize ${statusStyles[attr.status] || 'bg-gray-100 text-gray-800'}`}>{attr.status}</span>}
              </div>

              {attr.price?.length > 0 && (<div className="mb-6"><h3 className="text-xl font-semibold text-gray-800 mb-3">Pricing</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{attr.price.map((p, index) => (<div key={index} className="p-4 bg-indigo-50 rounded-lg"><p className="font-semibold text-gray-700">{p.value}</p><p className="text-2xl font-bold text-indigo-600">₹{Number(p.price).toLocaleString('en-IN')}</p><p className="text-sm text-gray-500">/ per {p.duration}</p></div>))}</div></div>)}
              <div className="mb-6"><h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3><p className="text-gray-700 leading-relaxed whitespace-pre-line">{attr.description}</p></div>
              {attr.facilities?.data?.length > 0 && (<div><h3 className="text-xl font-semibold text-gray-800 mb-4">What this place offers</h3><div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3">{attr.facilities.data.map((facility) => {const Icon = facilityIconMapping[facility.attributes.value] || FaCheckCircle; return (<div key={facility.id} className="flex items-center"><Icon className="text-indigo-600 mr-3 flex-shrink-0" size={20} /><span className="text-gray-700">{facility.attributes.value}</span></div>);})}</div></div>)}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Property Manager</h3>
                <div className="space-y-3">
                  <a href={`tel:${attr.owner_number}`} className="flex items-center justify-center w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"><FaPhone className="mr-2" /> Call Now</a>
                  <button onClick={handleWhatsApp} className="flex items-center justify-center w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"><FaWhatsapp className="mr-2" /> WhatsApp</button>
                  {attr.video_url && <a href={attr.video_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"><FaVideo className="mr-2" /> Watch Video Tour</a>}
                  
                  {/* --- MODIFIED LOCATION LINK --- */}
                  {/* This replaces the embedded map with a direct link */}
                  {propertyLocation?._latitude && propertyLocation?._longitude && (
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${propertyLocation._latitude},${propertyLocation._longitude}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    >
                      <FaMapMarkedAlt className="mr-2" />
                      View on Map
                    </a>
                  )}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Property Type</span><span className="font-medium text-gray-800">{attr.property_types}</span></div>
                  {attr.genders?.data?.length > 0 && <div className="flex justify-between"><span className="text-gray-500">Gender</span><span className="font-medium text-gray-800">{attr.genders.data[0].attributes.name}</span></div>}
                  <div className="flex justify-between"><span className="text-gray-500">Available Seaters</span><span className="font-medium text-gray-800">{attr.seaters?.data?.map(s => s.attributes.value).join(', ') || 'N/A'}</span></div>
                  {attr.booking_amount && <div className="flex justify-between"><span className="text-gray-500">Booking Amount</span><span className="font-medium text-gray-800">₹{Number(attr.booking_amount).toLocaleString('en-IN')}</span></div>}
                  <div className="flex justify-between"><span className="text-gray-500">Property ID</span><span className="font-medium text-gray-800">#{property.id}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;