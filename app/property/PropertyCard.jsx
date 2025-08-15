import { FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';

function truncateText(text, maxLength) {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

const VerificationBadge = ({ type }) => {
    if (!type) return null;
    const styles = {
        provider_verified: "bg-teal-100 text-teal-800",
        listed_by_broker: "bg-yellow-100 text-yellow-800",
        unverified: "bg-red-100 text-red-800",
    };
    const text = {
        provider_verified: "Verified",
        listed_by_broker: "Broker",
        unverified: "Unverified",
    };
    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styles[type] || styles.unverified}`}>
            {text[type] || "N/A"}
        </span>
    );
};

// This component is now correct and will work with the fix below.
const AvailabilityBadge = ({ status }) => {
    if (!status) return null;

    const styles = {
        available: "bg-green-100 text-green-800",
        full: "bg-orange-100 text-orange-800",
    };
    const displayText = status.charAt(0).toUpperCase() + status.slice(1);

    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
            {displayText}
        </span>
    );
};

const GenderBadge = ({ gender }) => {
    if (!gender) return null;
    return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
            {gender}
        </span>
    );
};


const PropertyCard = ({ singleData, isListView }) => {
  const { attributes } = singleData || {};
  const router = useRouter();

  if (!attributes) return null;

  // --- THE FIX IS HERE ---
  // We check the 'full' boolean from your data.
  // If attributes.full is true, we set status to "full".
  // Otherwise, we set it to "available".
  const availabilityStatus = attributes.full ? 'full' : 'available';

  const navigateToPropertyDetails = () => {
    router.push(`/property/${singleData.id}`);
  };

  const detailsButton = (
    <button onClick={navigateToPropertyDetails} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
        View Details
    </button>
  );
  
  const BadgesOverlay = () => (
    <div className="absolute top-2 right-2 z-10 flex flex-wrap justify-end gap-2">
        {/* We now pass our corrected 'availabilityStatus' variable to the badge */}
        <AvailabilityBadge status={availabilityStatus} />
        <GenderBadge gender={attributes.genders?.data?.[0]?.attributes.name} />
        <VerificationBadge type={attributes.verification_type} />
    </div>
  );

  if (isListView) {
      return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl w-full flex flex-col sm:flex-row">
            <div className="relative sm:w-1/3 h-48 sm:h-auto flex-shrink-0">
                <img
                    src={attributes.main_image?.data?.attributes.url || 'https://via.placeholder.com/400x300'}
                    alt={attributes.name}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={navigateToPropertyDetails}
                />
                <BadgesOverlay />
            </div>
            <div className="p-4 sm:p-6 flex flex-col justify-between w-full">
                <div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">{attributes.name}</h3>
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                <FaMapMarkerAlt /> {truncateText(attributes.address, 40)}
                            </p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                        {truncateText(attributes.description, 100)}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-sm">
                        
                        <div><p className="text-gray-500">Type</p><p className="font-semibold">{attributes.property_types || 'N/A'}</p></div>
                        <div><p className="text-gray-500">Seaters</p><p className="font-semibold">{attributes.seaters?.data?.[0]?.attributes.value || 'N/A'}</p></div>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                    <div>
                        <p className="text-sm text-gray-600">Starting from</p>
                        <p className="text-xl font-bold text-indigo-600">
                            {attributes.price?.[0]?.price}₹ <span className="text-sm font-normal text-gray-500">/ {attributes.price?.[0]?.duration}</span>
                        </p>
                    </div>
                    {detailsButton}
                </div>
            </div>
        </div>
      );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col">
        <div className="relative">
            <img
                src={attributes.main_image?.data?.attributes.url || 'https://via.placeholder.com/400x300'}
                alt={attributes.name}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={navigateToPropertyDetails}
            />
            <BadgesOverlay />
        </div>
        <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-gray-800">{attributes.name}</h3>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <FaMapMarkerAlt /> {truncateText(attributes.address, 30)}
            </p>
            <div className="grid grid-cols-2 gap-4 my-4 text-center text-sm flex-grow">
                 
                 <div><p className="text-gray-500">Type</p><p className="font-semibold">{attributes.property_types || 'N/A'}</p></div>
                 <div><p className="text-gray-500">Seaters</p><p className="font-semibold">{attributes.seaters?.data?.[0]?.attributes.value || 'N/A'}</p></div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="text-lg font-bold text-indigo-600">
                        {attributes.price?.[0]?.price}₹ <span className="text-sm font-normal text-gray-500">/ {attributes.price?.[0]?.duration}</span>
                    </p>
                </div>
                {detailsButton}
            </div>
        </div>
    </div>
  );
};

export default PropertyCard;