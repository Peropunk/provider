'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import Footer from '../components/Footer';
import blogData from './blogData.json';

// === 1. DEFINE VARIANTS FOR THE CONTAINER AND ITEMS ===
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Stagger the animation of children by 0.1 seconds
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};


const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <MaxWidthWrapper>
        {/* The section animation is no longer needed here as the container will handle it */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              OUR BLOG
            </h1>
            <p className="text-2xl md:text-3xl max-w-3xl mx-auto font-light text-gray-600">
              Insights and stories from the world of student accommodation.
            </p>
          </div>

          {/* === 2. APPLY VARIANTS TO THE GRID CONTAINER === */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {blogData.map((post) => (
              // === 3. APPLY ITEM VARIANTS AND REMOVE OLD PROPS ===
              <motion.div
                key={post.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
              >
                <div className="relative h-56">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-4 flex-grow">{post.snippet}</p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="mt-auto inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md text-center"
                  >
                    Read More
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </MaxWidthWrapper>
      <Footer />
    </div>
  );
};

export default Blog;