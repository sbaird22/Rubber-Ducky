import { useState } from 'react';
import { FaHamburger } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Change useHistory to useNavigate
import RubberDuckyImg from '../assets/Rubber_Ducky.png'; // Adjust the path if needed

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Remove the JWT token from localStorage or sessionStorage
    localStorage.removeItem('token'); // or sessionStorage.removeItem('token')
    // Redirect the user to the login page after logout
    navigate('/login'); // Use navigate to redirect the user
  };

  // Check if the user is logged in by checking if the JWT token exists in localStorage
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <header className="bg-gray-900 text-white p-4 shadow-md fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img src={RubberDuckyImg} alt="Rubber Duck Logo" className="w-8 h-8" />
          <span className="font-bold text-xl">Rubber Duck Debugging</span>
        </div>

        {/* Navbar Links */}
        <nav className="space-x-4 hidden md:flex">
          <Link to="/" className="text-lg hover:text-yellow-300">Home</Link>
          <Link to="/contact" className="text-lg hover:text-yellow-300">Contact</Link>

          {/* Conditionally render Dashboard, Login/Register, or Logout */}
          {isLoggedIn && (
            <Link to="/dashboard" className="text-lg hover:text-yellow-300">Dashboard</Link>
          )}
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-lg hover:text-yellow-300">Login</Link>
              <Link to="/register" className="text-lg hover:text-yellow-300">Register</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-lg hover:text-yellow-300"
            >
              Logout
            </button>
          )}
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
          <Link to="/contact" className="py-2 hover:text-yellow-300">Contact</Link>

          {/* Conditionally render Dashboard, Login/Register, or Logout */}
          {isLoggedIn && (
            <Link to="/dashboard" className="py-2 hover:text-yellow-300">Dashboard</Link>
          )}
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="py-2 hover:text-yellow-300">Login</Link>
              <Link to="/register" className="py-2 hover:text-yellow-300">Register</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="py-2 hover:text-yellow-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
