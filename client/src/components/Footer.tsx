import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'; // You can add social icons for better engagement

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto text-center">
        <p className="text-lg mb-6">© 2025 Rubber Duck Debugging. All rights reserved.</p>
        
        {/* Navigation Links */}
        <div className="mb-6">
          <a href="#hero" className="text-yellow-400 hover:text-yellow-300 mx-4 text-lg">Home</a>
          <a href="#about" className="text-yellow-400 hover:text-yellow-300 mx-4 text-lg">About</a>
          <a href="#contact" className="text-yellow-400 hover:text-yellow-300 mx-4 text-lg">Contact</a>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">
            <FaGithub size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">
            <FaTwitter size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">
            <FaLinkedin size={24} />
          </a>
        </div>

        {/* Optional Additional Footer Content */}
        <p className="text-sm text-gray-400">Made with ❤️ by the Rubber Duck Debugging Team</p>
      </div>
    </footer>
  );
};

export default Footer;
