// src/components/ComparisonTableSection.jsx
import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

const comparisonData = [
  { feature: 'Real Hostel Images', provider: 'check', other: 'cross' },
  { feature: 'Owner Contact', provider: 'check', other: 'cross' },
  { feature: 'Internships', provider: 'check', other: 'cross' },
  { feature: 'EMI Options', provider: 'check', other: 'cross' },
  { feature: 'Verified Listings', provider: 'check', other: 'warn' },
  { feature: 'Stationery + Courses', provider: 'check', other: 'cross' }
];

const IconMap = {
  check: <CheckCircle2 size={28} className="text-green-500" />,
  cross: <XCircle size={28} className="text-red-500" />,
  warn: <AlertTriangle size={28} className="text-yellow-500" />,
};

const ComparisonTableSection = () => {
  return (
    <section className="bg-[#0D0F2B] py-16 md:py-20 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex container for medium screens and up */}
        <div className="md:flex md:gap-8 lg:gap-12 items-start">
          {/* Left Column: Heading and Description */}
          <div className="md:w-1/3 text-center md:text-left mb-12 md:mb-0">
            <h2 className="text-3xl lg:text-5xl md:mt-12 md:text-5xl sm:text-4xl font-bold mb-3">
              How We Stand Out
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl md:max-w-none mx-auto md:mx-0">
              See why students prefer <span className="text-purple-400 font-semibold">Provider App</span> over other alternatives.
            </p>
          </div>

          {/* Right Column: Table */}
          <div className="md:w-2/3">
            <div className="bg-white text-slate-800 md:bg-opacity-95 backdrop-blur-sm border border-gray-200/80 rounded-xl shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] md:min-w-full"> {/* Adjusted min-width for responsiveness */}
                  <thead>
                    <tr className="bg-slate-100 border-b border-gray-300">
                      <th className="py-4 px-4 sm:px-6 text-left text-xs sm:text-sm font-semibold uppercase text-slate-600 tracking-wider">
                        Feature
                      </th>
                      <th className="py-4 px-4 sm:px-6 text-center text-xs sm:text-sm font-semibold uppercase text-slate-600 tracking-wider">
                        Provider App
                      </th>
                      <th className="py-4 px-4 sm:px-6 text-center text-xs sm:text-sm font-semibold uppercase text-slate-600 tracking-wider">
                        Other Apps
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {comparisonData.map((item, index) => (
                      <tr key={index} className="hover:bg-slate-50 transition-colors duration-150">
                        <td className="py-4 px-4 sm:px-6 text-slate-700 font-medium text-sm">
                          {item.feature}
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-center">
                          <div className="flex justify-center">
                            {IconMap[item.provider]}
                          </div>
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-center">
                          <div className="flex justify-center">
                            {IconMap[item.other]}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ComparisonTableSection;