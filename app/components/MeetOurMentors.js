import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa'; // Placeholder icon

// Sample Mentor Data
// In a real application, this would likely come from a CMS or API
const mentorsData = [
  {
    id: 1,
    name: 'Praveen Gopal',
    role: 'CMD, Dream Provider Pvt. Ltd.',
    bio: 'Visionary leader driving innovation in student services and educational technology.',
    imageUrl: '/praveen.png', // Replace with actual image path
    // linkedinUrl: 'https://linkedin.com/in/praveengopal', // Optional
  },
  {
    id: 2,
    name: 'Avadhesh Chaudhary',
    role: 'CEO, Dream Provider',
    bio: 'Strategic thinker focused on operational excellence and scaling student-centric solutions.',
    imageUrl: '/avadesh.png', // Replace with actual image path
  },
  {
    id: 3,
    name: 'Kshitij Goel',
    role: 'Sales Head',
    bio: 'Dynamic sales strategist dedicated to expanding market reach and building strong partnerships.',
    imageUrl: '/kshitij.png', // Replace with actual image path
  }
];

const MentorCard = ({ mentor }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="relative w-32 h-32 md:w-36 md:h-36 mx-auto mb-6 rounded-full overflow-hidden border-4 border-purple-200 dark:border-purple-700 shadow-md">
        {mentor.imageUrl ? (
          <Image
            src={mentor.imageUrl}
            alt={`Photo of ${mentor.name}`}
            layout="fill"
            objectFit="cover"
            className="rounded-full" // Ensure image itself is rounded if parent is
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-full">
            <FaUserCircle className="w-20 h-20 text-slate-400 dark:text-slate-500" />
          </div>
        )}
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-1">
        {mentor.name}
      </h3>
      <p className="text-purple-600 dark:text-purple-400 font-medium text-sm md:text-base mb-3">
        {mentor.role}
      </p>
      <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed">
        {mentor.bio}
      </p>
      {/* Optional: LinkedIn Icon/Link
      {mentor.linkedinUrl && (
        <a
          href={mentor.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-purple-500 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          aria-label={`${mentor.name}'s LinkedIn Profile`}
        >
          <FaLinkedin size={24} />
        </a>
      )}
      */}
    </div>
  );
};

const MeetOurMentors = () => {
  return (
    <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-900 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 dark:text-white">
            Guided by Industry Experts
          </h2>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Our team of seasoned professionals and visionary leaders are dedicated to empowering your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8">
          {mentorsData.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurMentors;