import { useState } from 'react';
import { FaHamburger } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-yellow-400 text-gray-800 p-4 shadow-md fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img src="/duck-icon.png" alt="Rubber Duck Logo" className="w-8 h-8" />
          <span className="font-bold text-xl">Rubber Duck Debugging</span>
        </div>

        {/* Navbar Links */}
        <nav className="space-x-4 hidden md:flex">
          <a href="#hero" className="text-lg hover:text-blue-600">Home</a>
          <a href="#about" className="text-lg hover:text-blue-600">About</a>
          <a href="#contact" className="text-lg hover:text-blue-600">Contact</a>
        </nav>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleMenu}>
            <FaHamburger size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-blue-500 text-white py-4`}>
        <div className="flex flex-col items-center">
          <a href="#hero" className="py-2">Home</a>
          <a href="#about" className="py-2">About</a>
          <a href="#contact" className="py-2">Contact</a>
        </div>
      </div>
    </header>
  );
};

export default Header;