const Banner = () => {
  return (
    // Replaced the old gradient with the vibrant one from SearchBarHero
    // Removed the dark overlay as it's no longer needed
    <section className="relative bg-gradient-to-br from-purple-700 via-indigo-600 to-indigo-900">
      {/* Container to manage width and centering */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Content area with responsive padding and centered text */}
        <div className="py-24 sm:py-32 text-center">
          
          {/* Updated heading with new text color, weight, and a gradient span for accent */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Find Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">Perfect Stay</span>
          </h1>

          {/* Updated subheading with a lighter, more subtle text color */}
          <p className="mt-4 max-w-2xl mx-auto text-lg text-indigo-200">
            Find your next home from our curated list of verified properties.
          </p>
          
        </div>
      </div>
    </section>
  );
};

export default Banner;