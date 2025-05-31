'use client'; // This component uses client-side state (useState)

import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqData = [
  {
    id: 1,
    question: 'How is my booking confirmed?',
    answer:
      'Once you complete your booking and payment, you will receive a confirmation email and SMS with all the details of your booking, including the hostel address and contact information. You can also view your booking status in the "My Bookings" section of the app.',
  },
  {
    id: 2,
    question: 'Can I cancel my booking?',
    answer:
      'Yes, you can cancel your booking. The cancellation policy varies depending on the hostel. Please check the specific hostel\'s cancellation policy at the time of booking or in your confirmation details. Some bookings may be non-refundable or have a cancellation fee.',
  },
  {
    id: 3,
    question: 'What if the hostel denies entry?',
    answer:
      'In the rare event that a hostel denies entry despite a confirmed booking, please contact our customer support immediately. We will assist you in resolving the issue or finding alternative accommodation. Ensure you have your booking confirmation readily available.',
  },
  {
    id: 4,
    question: 'What is the refund process?',
    answer:
      'If your booking is eligible for a refund as per the cancellation policy, the refund will be processed to your original mode of payment. It typically takes 5-7 business days for the amount to reflect in your account, depending on your bank.',
  },
  {
    id: 5,
    question: 'Is it safe to pay online?',
    answer:
      'Absolutely. We use industry-standard encryption and secure payment gateways to ensure all your online transactions are safe and protected. Your financial information is never stored on our servers.',
  },
  {
    id: 6,
    question: 'Do I get contact details of the hostel?',
    answer:
      'Yes, upon successful booking confirmation, you will receive the hostel\'s address, contact number, and other relevant details. This information will be available in your confirmation email and in the app.',
  },
];

const FAQItem = ({ faq, isOpen, toggleFAQ }) => {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700 py-4">
      <button
        onClick={toggleFAQ}
        className="flex justify-between items-center w-full text-left focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">
          {faq.question}
        </h3>
        <span>
          {isOpen ? (
            <FaChevronUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          ) : (
            <FaChevronDown className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          )}
        </span>
      </button>
      <div
        id={`faq-answer-${faq.id}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100 mt-3' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-slate-600 dark:text-slate-300 pt-2">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  // To manage which FAQ is open.
  // null means all are closed, or you can store the id of the open one.
  // For allowing multiple open, you'd need an array or object.
  // Here, we'll manage individual state within each mapped item for simplicity
  // OR, manage a single open item like this:
  const [openFAQId, setOpenFAQId] = useState(null);

  const handleToggleFAQ = (id) => {
    setOpenFAQId(openFAQId === id ? null : id);
  };

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-white mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {faqData.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openFAQId === faq.id}
              toggleFAQ={() => handleToggleFAQ(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;