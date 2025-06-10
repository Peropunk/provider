import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MaxWidthWrapper from "./components/MaxWidthWrapper";
import Navbar from './components/Navbar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Provider | Verified Hostels, PGs & Flats for Students",
  description: "Provider helps students find verified hostels, PGs, and flats with ease. Explore local listings and amenities tailored for college life.",
  alternates: {
    canonical: 'https://providerapp.in/'
  },
  other: {
    'application/ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Provider",
      "url": "https://providerapp.in",
      "sameAs": [
        "https://www.instagram.com/providerapp.in",
        "https://www.linkedin.com/company/providerapp"
      ],
      "logo": "https://providerapp.in/logo.png"
    })
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
    
        className={`${geistSans.variable} ${geistMono.variable} antialiased  bg-[#ffffff]`}
      >
        <Navbar/>
       
        {children}
       
      </body>
    </html>
  );
}
