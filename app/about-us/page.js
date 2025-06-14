'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import { useEffect, useState, useRef } from 'react';
import Footer from '../components/Footer';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section with Parallax */}
      <motion.section 
        style={{ y, opacity }}
        className="relative h-[70vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/team.jpg"
            alt="Provider App Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </div>
        <MaxWidthWrapper>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 text-center text-white"
          >
            <motion.h1 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200"
            >
              Our Story
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-2xl md:text-3xl max-w-3xl mx-auto font-light"
            >
              Redefining student accommodation in India
            </motion.p>
          </motion.div>
        </MaxWidthWrapper>
      </motion.section>

      {/* Our Story Section */}
      <MaxWidthWrapper>
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="py-12 relative"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Our Journey</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                What began in 2021 with a few girls searching for a reliable hostel near Greater Noida, became a mission: to solve every student's biggest challenge—finding a safe, affordable, and verified place to live. From proud roots as an incubated project at ITS Engineering College in Knowledge Park 3, we've grown into a full-fledged platform trusted across India.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
              style={{ perspective: "1000px" }}
            >
              <Image
                src="/about-us.jpg"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* About Provider Section */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="py-12 relative bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl my-12"
        >
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10 max-w-4xl mx-auto text-center mb-8"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">About Provider App</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-6 font-light">
              Provider App is India's leading student accommodation platform, built with a mission to redefine how students find verified and affordable living spaces across major educational cities.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded by engineering graduates who personally experienced the challenges of student housing, Provider App was created to solve a real problem faced by thousands of students every year—finding safe, budget-friendly, and reliable accommodation near their colleges. What began with a single college in Greater Noida has now expanded to over 7 cities across 4 states, helping students book verified hostels, PGs, flats, and co-living spaces through a simple, transparent, and trusted platform.
            </p>
          </motion.div>

          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center mb-8 px-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg"
              style={{ perspective: "1000px" }}
            >
              <h3 className="text-3xl font-semibold text-gray-900 mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Our Vision</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                At Provider, we believe that a student's journey begins with the right place to stay. Our platform is designed to take the stress out of hostel hunting by offering curated listings, real-time support, and campus-connected properties—ensuring every student has access to a secure and comfortable living experience.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                rotateY: -5,
                transition: { duration: 0.3 }
              }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg"
              style={{ perspective: "1000px" }}
            >
              <h3 className="text-3xl font-semibold text-gray-900 mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Our Reach</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                With a strong presence across Greater Noida, Gurugram, Varanasi, Kota, and other educational hubs, we have become the go-to solution for students and parents seeking trusted out-campus accommodation.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white mx-4 mb-8"
          >
            <h3 className="text-3xl font-semibold mb-6 relative z-10">What We Offer</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {[
                "Verified hostel & PG listings near top colleges",
                "Transparent pricing with no hidden charges",
                "Free cab visits for property tours",
                "Real-time support for booking and relocation",
                "Early booking discounts & student-friendly offers",
                "Dedicated channel partnerships with colleges"
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-start space-x-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg"
                >
                  <span className="text-yellow-300 text-2xl">•</span>
                  <span className="text-white/90 text-lg">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10 text-center max-w-3xl mx-auto px-4"
          >
            <p className="text-xl text-gray-600 leading-relaxed mb-4 font-light">
              More than just a booking platform, Provider App is building a complete student ecosystem—one that connects housing, student services, career support, and campus partnerships into one seamless experience.
            </p>
            <p className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              As we continue to grow, our commitment remains the same: to make student living simpler, safer, and smarter.
            </p>
          </motion.div>
        </motion.section>

        {/* What We Do Section */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="py-20 bg-gray-50 rounded-3xl my-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We make the daunting hostel hunt simple and stress-free. Whether you're a first-year B.Tech aspirant or a new MBA student, Provider App offers:
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "100% Verified Hostels & PGs",
                description: "Hygiene, safety, comfort guaranteed",
                icon: "🏠"
              },
              {
                title: "Real-Time Booking",
                description: "No calls, no follow-ups, real-time availability",
                icon: "⚡"
              },
              {
                title: "Free Cab Visits",
                description: "We drive you around to check multiple properties at zero cost",
                icon: "🚗"
              },
              {
                title: "Transparent Deals",
                description: "Clear pricing, no hidden fees or commissions",
                icon: "💎"
              },
              {
                title: "Smart Filters",
                description: "Campus proximity, AC/Non-AC, meals, mess quality",
                icon: "🔍"
              },
              {
                title: "Girls Safety Verified",
                description: "CCTV, biometric entry, trusted wardens",
                icon: "🔒"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Why We Exist Section */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="py-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why We Exist 💡</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Because we've been there. We know the angst of parents and students: the uncertainty, the safety worries, the midnight panic, the rushed bookings. That's why we built a platform that:
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Puts student safety first</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Brings total campus-locational transparency</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Removes commission hunting and hidden rate hikes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Supports multiple student personalities—boys, girls, working professionals, part-timers</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-4">Our Promise</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>If a hostel shuts down or violates standards, we don't just refund—we find you a better option and compensate you.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>We maintain monthly inspections, 24×7 helpline, and local teams for support.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>We keep things real: no aggressive selling, no exaggerated promises—just honest service.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Impact Section */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl my-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Impact & Reach</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-xl text-center shadow-lg"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
              <p className="text-gray-600">Students across campuses like Galgotias, GL Bajaj, NIU, Sharda, IILM, Bennett, Amity, and many more</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-xl text-center shadow-lg"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">5.0</div>
              <p className="text-gray-600">Average rating from students & parents</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-xl text-center shadow-lg"
            >
              <div className="text-4xl font-bold text-purple-600 mb-2">7+</div>
              <p className="text-gray-600">Cities Covered</p>
            </motion.div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600">
              🎓 Supported by MSME, Startup India, and featured on college partner sites like ITS.
            </p>
          </div>
        </motion.section>

        {/* Testimonial Section */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="py-20"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white">
            <blockquote className="text-2xl font-light italic mb-6">
              "Provider App made my final year stay stress-free. I visited 5 hostels in 2 days, and picked the best one—all at zero cost."
            </blockquote>
            <p className="text-lg font-semibold">— Jagrati, GL Bajaj alumna</p>
          </div>
        </motion.section>

        {/* Join Us Today Section */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="py-12 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
            >
              Join Us Today
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              If you're looking for a verified, trusted, student-first place to stay in hostels or PGs near colleges—download Provider App now. Start your hassle-free stay today!
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg mb-12"
            >
              Download App
            </motion.button>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6"
            >
              {[
                {
                  title: "For Students",
                  description: "Find your perfect accommodation with verified listings and exclusive deals",
                  icon: "🎓"
                },
                {
                  title: "For Property Owners",
                  description: "List your property and reach thousands of students looking for accommodation",
                  icon: "🏠"
                },
                {
                  title: "For Colleges",
                  description: "Partner with us to provide better housing solutions for your students",
                  icon: "🎯"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-100"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Want to Collaborate Section */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="py-12 relative -mt-8"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Want to Collaborate?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              We partner with colleges, student influencers, and campus groups to expand quality housing. Reach out to us at:
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-4 mb-12"
            >
              <p className="text-xl text-gray-700">
                Email: <a href="mailto:contact@providerapp.in" className="text-blue-600 hover:text-blue-700 font-semibold">contact@providerapp.in</a>
              </p>
              <p className="text-xl text-gray-700">
                Phone: <a href="tel:+917303831326" className="text-blue-600 hover:text-blue-700 font-semibold">+91 7303831326</a>
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6"
            >
              {[
                {
                  title: "Property Partnerships",
                  description: "Partner with us to list your properties and reach more students",
                  icon: "🤝",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  title: "College Collaborations",
                  description: "Work with us to provide better housing solutions for your students",
                  icon: "🎓",
                  color: "from-purple-500 to-purple-600"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  className={`bg-gradient-to-r ${item.color} p-6 rounded-xl shadow-lg text-white`}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/90">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </MaxWidthWrapper><Footer />
    </div>
    
  );
};

export default AboutUs; 