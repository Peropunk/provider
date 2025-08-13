import Link from 'next/link';
import { FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa'; // Example icons

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Terms', href: '/terms-of-service' },
    { name: 'Privacy', href: '/privacy' },
  ];

  const socialMedia = [
    { name: 'Instagram', href: 'https://www.instagram.com/providerapp.in/', icon: <FaInstagram size={24} /> },
    { name: 'YouTube', href: 'https://www.youtube.com/channel/UCTUVjKuWrQLVBSJKtovx6BQ', icon: <FaYoutube size={24} /> },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/providerapp/posts/?feedView=all', icon: <FaLinkedin size={24} /> },
  ];

  return (
    <footer className="bg-gradient-to-br from-purple-700 via-indigo-600 to-indigo-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Quick Links Section */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Quick Links</h5>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="hover:text-sky-400 transition-colors duration-300 cursor-pointer">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Follow Us</h5>
            <div className="flex space-x-4">
              {socialMedia.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="hover:text-sky-400 transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            {/* You can also list them as text if preferred, like the original request */}
            {/* <ul className="space-y-2 mt-4">
              {socialMedia.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-400 transition-colors duration-300"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul> */}
          </div>

          {/* Company Section (Optional - can be merged or kept separate) */}
          {/* This part is usually at the bottom, so let's move it below the grid */}
        </div>

        {/* Company Info / Copyright */}
        <div className="border-t border-white pt-8 mt-8 text-center">
          <p className="text-sm">
            © {currentYear} Dream Provider Pvt. Ltd. — Empowering India’s Students
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;