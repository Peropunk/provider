import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import { FaBookOpen } from 'react-icons/fa';

// Sample data for blog posts - now with imageUrl
// In a real application, this would likely come from a CMS or API
const blogPostsData = [
  {
    id: 1,
    title: 'Top Hostels in Varanasi for Students',
    slug: '/blog/top-hostels-varanasi-students',
    excerpt: 'Discover the best and most affordable student accommodations in the heart of Varanasi.',
    imageUrl: '/varanasi.jpg', // Example image path
    imageAlt: 'Students in a hostel in Varanasi',
  },
  {
    id: 2,
    title: 'How to Find a Safe PG in Delhi',
    slug: '/blog/how-to-find-safe-pg-delhi',
    excerpt: 'A comprehensive guide to navigating the PG hunt in Delhi, focusing on safety and amenities.',
    imageUrl: '/delhi.jpg', // Example image path
    imageAlt: 'Map of Delhi with location pins',
  },
  {
    id: 3,
    title: 'Best Summer Internships in India for 2025',
    slug: '/blog/best-summer-internships-india-2025',
    excerpt: 'Kickstart your career with these top-rated summer internship opportunities across various sectors in India.',
    imageUrl: '/maang.webp', // Example image path
    imageAlt: 'Students collaborating during an internship',
  },
];

const GuidesAndResources = () => {
  const postsToPreview = blogPostsData.slice(0, 3);

  return (
    <section className="py-16 bg-white dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12">
          Guides & Resources for Students
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {postsToPreview.map((post) => (
            <Link href={post.slug} key={post.id}>
              <div className="block bg-slate-50 dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-left h-full flex flex-col overflow-hidden"> {/* Added overflow-hidden */}
                {/* Image Container */}
                <div className="relative w-full h-48 sm:h-56"> {/* Adjust height as needed */}
                  <Image
                    src={post.imageUrl}
                    alt={post.imageAlt || post.title} // Use provided alt or fallback to title
                    layout="fill"
                    objectFit="cover" // 'cover' will fill and crop, 'contain' will fit and show all
                    className="transition-transform duration-300 ease-in-out group-hover:scale-105" // Optional: zoom effect on hover
                  />
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-400 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm flex-grow">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 text-purple-600 dark:text-purple-300 font-medium hover:underline self-start">
                    Read More →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link href="/blog">
          <button
            type="button"
            className="inline-flex items-center justify-center px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-colors duration-300"
          >
            <FaBookOpen className="mr-2 h-5 w-5" />
            View All Articles
          </button>
        </Link>
      </div>
    </section>
  );
};

export default GuidesAndResources;