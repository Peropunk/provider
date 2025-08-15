// components/Banner.js

const Banner = () => {
  return (
    // The main section is a relative container for the overlay and content
    <section className="relative bg-gray-900">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        {/* The background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/college-banner.jpg')" }} // IMPORTANT: Change this path
        ></div>
        
        {/* The dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* We use py-24 to py-36 for responsive vertical padding */}
        <div className="flex flex-col items-center justify-center text-center py-24 md:py-36">
          
          {/* Main Heading with responsive font size */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight [text-shadow:_0_2px_4px_rgb(0_0_0_/_40%)]">
            Find Your Future
          </h1>
          
          {/* Subheading for context */}
          <p className="mt-4 max-w-3xl text-lg md:text-xl font-light text-gray-200">
            Browse through hundreds of top-tier colleges and universities to start your journey.
          </p>

        </div>
      </div>
    </section>
  );
};

export default Banner;
