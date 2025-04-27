'use client'


import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const solutions = [
  {
    icon: "🧠",
    title: "Custom AI-Powered Website",
    description:
      "Intelligent, responsive websites tailored to healthcare providers with automated patient interactions.",
    color: "#3B82F6", // blue-500
  },
  {
    icon: "🛍️",
    title: "Enhanced Patient Conversion",
    description:
      "Smart conversion optimization tools to turn visitors into patients with personalized experiences.",
    color: "#8B5CF6", // purple-500
  },
  {
    icon: "💬",
    title: "Real-Time Query Handling",
    description:
      "Instant response system for patient inquiries with AI-powered chat support.",
    color: "#22C55E", // green-500
  },
  {
    icon: "📄",
    title: "Medical Report Analysis",
    description:
      "Advanced AI analysis of medical reports for quick and accurate patient assessments.",
    color: "#FB923C", // orange-400
  },
  {
    icon: "📈",
    title: "Improved Lead Generation",
    description:
      "Data-driven lead generation strategies to attract and engage potential patients.",
    color: "#EC4899", // pink-500
  },
  {
    icon: "📚",
    title: "Comprehensive Healthcare Database",
    description:
      "Extensive medical information database for accurate patient guidance and support.",
    color: "#6366F1", // indigo-500
  },
  {
    icon: "🌐",
    title: "Multilingual Support",
    description:
      "Breaking language barriers with comprehensive multilingual communication tools.",
    color: "#EF4444", // red-500
  },
  {
    icon: "💳",
    title: "Seamless Payment Handling",
    description:
      "Secure and efficient payment processing for medical services globally.",
    color: "#14B8A6", // teal-500
  },
  {
    icon: "🔍",
    title: "Marketing And SEO Support",
    description:
      "Optimized digital presence with advanced SEO and marketing strategies.",
    color: "#06B6D4", // cyan-500
  },
];

export default function Solutions() {
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      const color = solutions[index].color;
      const tl = gsap.timeline({ paused: true });
      tl.to(card, { backgroundColor: color, color: "white", duration: 0.3 });
      tl.to(card.querySelector("h3"), { color: "white" }, 0);
      tl.to(card.querySelector("p"), { color: "white" }, 0);

      card.addEventListener("mouseenter", () => tl.play());
      card.addEventListener("mouseleave", () => tl.reverse());
    });
  }, []);

  return (
    <>
    <div className="py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          Our Comprehensive Solutions
        </h2>
        <div className="h-1 w-16 bg-purple-500 mx-auto mb-10 rounded"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, idx) => (
            <div
              key={idx}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300 p-6 flex flex-col items-center text-center"
            >
              <div
                className="p-3 rounded-md text-white text-2xl mb-4"
                style={{ backgroundColor: solution.color }}
              >
                {solution.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {solution.title}
              </h3>
              <p className="text-gray-600 mb-10">{solution.description}</p>
              <div
                className="absolute bottom-0 left-0 w-full h-1 rounded-b-xl"
                style={{ backgroundColor: solution.color }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-12 ">
      {/* About Us Section */}
      <div className="flex flex-col  md:flex-row items-center gap-3 bg-[#0c0171] text-white rounded-lg p-10">
        <div className="flex-1">
          <img src="https://gogetwell.ai/assets/about_us-9tXCyELx.gif" alt="Healthcare Team" className="h-96 w-fullrounded-sm" />
        </div>
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-bold">About Us</h2>
          <p className="text-gray-400">
            We are a pioneering AI-driven platform focused on revolutionizing the medical tourism industry. By addressing inefficiencies and disorganization, we empower healthcare facilitators to modernize their operations, attract more patients, and deliver seamless, personalized care across borders.
          </p>
          <p className="text-gray-400">
            Our cutting-edge solutions are designed to streamline processes and enhance the overall patient experience.
          </p>
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded">
                <span className="text-indigo-600 text-xl">⚡</span>
              </div>
              <div>
                <h4 className="font-semibold">Modern Solutions</h4>
                <p className="text-sm text-gray-500">Leveraging AI technology for healthcare</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded">
                <span className="text-indigo-600 text-xl">👨‍⚕️</span>
              </div>
              <div>
                <h4 className="font-semibold">Patient-Centric</h4>
                <p className="text-sm text-gray-500">Personalized healthcare experiences</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-12 bg-gray-100 rounded-lg p-10">
        <div className="flex-1">
          <img src="https://gogetwell.ai/assets/our_mission-nN9YP0Qb.gif" alt="Doctor and Patient" className="h-96 rounded-sm" />
        </div>
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to simplify the complex medical tourism process by leveraging advanced AI tools that optimize healthcare facilitators operations, maximize revenue opportunities, and provide patients with personalized and stress-free treatment journeys.
          </p>
          <p className="text-gray-600">
            We strive to become the leading platform for healthcare tourism management and digital transformation.
          </p>
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded">
                <span className="text-indigo-600 text-xl">✅</span>
              </div>
              <div>
                <h4 className="font-semibold">AI-Powered Solutions</h4>
                <p className="text-sm text-gray-500">Optimizing operations with advanced technology</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded">
                <span className="text-indigo-600 text-xl">📈</span>
              </div>
              <div>
                <h4 className="font-semibold">Growth Focus</h4>
                <p className="text-sm text-gray-500">Maximizing revenue and opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenges We Solve Section */}
      <div className="flex flex-col md:flex-row items-center bg-[#0c0171] gap-12 bg p-10 text-white rounded-lg">
        <div className="flex-1">
          <img src="https://gogetwell.ai/assets/challenges_solve-CteFwxY1.gif" alt="Laptop Illustration" className="h-96 rounded-sm" />
        </div>
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-bold">The Challenges We Solve</h2>
          <p className="text-gray-400">
            Medical tourism, especially in India, is plagued by disorganization and inefficiency. Facilitators often rely on outdated methods, leading to delayed bookings, inadequate patient support, and missed growth opportunities.
          </p>
          <p className="text-gray-400">
            Our platform addresses these pain points by streamlining lead management and improving operational efficiency for facilitators and hospitals alike.
          </p>
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded">
                <span className="text-indigo-600 text-xl">🕑</span>
              </div>
              <div>
                <h4 className="font-semibold">Efficient Operations</h4>
                <p className="text-sm text-4ray-500">Streamlined booking and management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded">
                <span className="text-indigo-600 text-xl">💬</span>
              </div>
              <div>
                <h4 className="font-semibold">Enhanced Support</h4>
                <p className="text-sm text-gray-400">Improved patient communication</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
