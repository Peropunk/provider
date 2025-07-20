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
  check: <CheckCircle2 size={28} className="text-blue-500 drop-shadow-sm" />, // blue accent
  cross: <XCircle size={28} className="text-red-400 drop-shadow-sm" />, // softer red
  warn: <AlertTriangle size={28} className="text-yellow-400 drop-shadow-sm" />,
};

const ComparisonTableSection = () => {
  return (
    <section className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:gap-12 items-start">
          {/* Left Column: Heading and Description */}
          <div className="md:w-1/3 text-center md:text-left mb-12 md:mb-0 flex flex-col justify-center">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              How We Stand Out
            </h2>
            <p className="text-lg text-indigo-700 max-w-2xl md:max-w-none mx-auto md:mx-0 font-medium">
              See why students prefer <span className="text-blue-600 font-semibold">Provider App</span> over other alternatives.
            </p>
          </div>

          {/* Right Column: Table */}
          <div className="md:w-2/3">
            <div className="bg-white/90 backdrop-blur-md border border-blue-100 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] md:min-w-full font-sans">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-50 to-indigo-100 border-b border-blue-100">
                      <th className="py-4 px-4 sm:px-6 text-left text-xs sm:text-sm font-bold uppercase text-blue-700 tracking-wider">
                        Feature
                      </th>
                      <th className="py-4 px-4 sm:px-6 text-center text-xs sm:text-sm font-bold uppercase text-blue-700 tracking-wider">
                        Provider App
                      </th>
                      <th className="py-4 px-4 sm:px-6 text-center text-xs sm:text-sm font-bold uppercase text-blue-700 tracking-wider">
                        Other Apps
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((item, index) => (
                      <tr key={index} className={
                        `transition-colors duration-150 ` +
                        (index % 2 === 0 ? 'bg-white' : 'bg-blue-50')
                      }>
                        <td className="py-4 px-4 sm:px-6 text-indigo-900 font-semibold text-base">
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