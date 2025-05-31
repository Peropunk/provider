'use client'; // This component uses client-side state (useState) and event handlers

import React, { useState } from 'react'; // Removed FormEvent type for JS
import { FaPaperPlane } from 'react-icons/fa'; // Optional: for an icon in the button

const JoinCommunity = () => {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => { // Removed type for event
    event.preventDefault();
    setIsLoading(true);
    setStatusMessage('');

    if (!email) {
      setStatusMessage('Please enter your email address.');
      setIsLoading(false);
      return;
    }

    // Basic email validation (optional, but good practice)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatusMessage('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    // --- Replace with your actual API call to subscribe the user ---
    console.log('Subscribing email:', email);
    // Example:
    // try {
    //   const response = await fetch('/api/subscribe', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email }),
    //   });
    //   const data = await response.json();
    //   if (response.ok) {
    //     setStatusMessage('Thanks for joining! Please check your email to confirm.');
    //     setEmail(''); // Clear input on success
    //   } else {
    //     setStatusMessage(data.message || 'Something went wrong. Please try again.');
    //   }
    // } catch (error) {
    //   setStatusMessage('An error occurred. Please try again later.');
    // } finally {
    //   setIsLoading(false);
    // }
    // --- End of API call example ---

    // For demonstration purposes without a real API:
    setTimeout(() => {
      setStatusMessage(`Thanks for joining, ${email}! Check your inbox (not really).`);
      setEmail(''); // Clear input
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section className="bg-slate-100 dark:bg-slate-800 py-16 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
          Join the Community
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
          Be the first to hear about hostel offers, trips & internships.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <label htmlFor="email-newsletter" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="email-newsletter"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={isLoading}
              className="flex-grow px-4 py-3 text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-150 ease-in-out disabled:opacity-50 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition duration-150 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Joining...
                </>
              ) : (
                <>
                  Join Now
                  {/* Conditionally render icon if you want it */}
                  {FaPaperPlane && <FaPaperPlane className="ml-2 h-4 w-4" />}
                </>
              )}
            </button>
          </div>
          {statusMessage && (
            <p className={`mt-4 text-sm ${statusMessage.includes('Thanks') || statusMessage.includes('confirm') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default JoinCommunity;