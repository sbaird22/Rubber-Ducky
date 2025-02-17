import { useState } from 'react';
import { FaHamburger } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-900 text-white p-4 shadow-md fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img src="https://media.discordapp.net/attachments/1009075678592913420/1340864485958877234/Rubber_Ducky.png?ex=67b3e8dd&is=67b2975d&hm=77c925ae4287f5b84b8f5da05ca2e4e8552797c56b4d0c234a742611151badae&=&format=webp&quality=lossless&width=746&height=746" alt="Rubber Duck Logo" className="w-8 h-8" />
          <span className="font-bold text-xl">Rubber Duck Debugging</span>
        </div>

        {/* Navbar Links */}
        <nav className="space-x-4 hidden md:flex">
          <Link to="/" className="text-lg hover:text-yellow-300">Home</Link>
          <Link to="/about" className="text-lg hover:text-yellow-300">About</Link>
          <Link to="/contact" className="text-lg hover:text-yellow-300">Contact</Link>
          
          {/* Login and Register Buttons */}
          <Link to="/login" className="text-lg hover:text-yellow-300">Login</Link>
          <Link to="/register" className="text-lg hover:text-yellow-300">Register</Link>
        </nav>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleMenu}>
            <FaHamburger size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-800 text-white py-4`}>
        <div className="flex flex-col items-center">
          <Link to="/" className="py-2 hover:text-yellow-300">Home</Link>
          <Link to="/about" className="py-2 hover:text-yellow-300">About</Link>
          <Link to="/contact" className="py-2 hover:text-yellow-300">Contact</Link>
          
          {/* Mobile Login and Register Links */}
          <Link to="/login" className="py-2 hover:text-yellow-300">Login</Link>
          <Link to="/register" className="py-2 hover:text-yellow-300">Register</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;