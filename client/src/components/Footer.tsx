import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto text-center">
        {/* Copyright */}
        <p className="text-lg mb-6">© 2025 Rubber Duck Debugging. All rights reserved.</p>

        {/* Team Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-8">
          {/* Team Member 1 */}
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-yellow-300 mb-4">Drew DeMarois</h3>
            <div className="flex justify-center space-x-4">
              <a href="https://github.com/DDeMarois" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">
                <FaGithub size={24} />
              </a>
              <a href="https://linkedin.com/in/your-linkedin-username1" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-yellow-300 mb-4">Yosuke Kibe</h3>
            <div className="flex justify-center space-x-4">
              <a href="https://github.com/this-is-yosuke" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">
                <FaGithub size={24} />
              </a>
              <a href="https://linkedin.com/in/your-linkedin-username2" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-yellow-300 mb-4">Kristy Thompson</h3>
            <div className="flex justify-center space-x-4">
              <a href="https://github.com/Kristy-H-Thompson" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">
                <FaGithub size={24} />
              </a>
              <a href="https://www.linkedin.com/in/kristy-thompson-372990243/" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Team Member 4 */}
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-yellow-300 mb-4">Shane Baird</h3>
            <div className="flex justify-center space-x-4">
              <a href="https://github.com/sbaird22" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">
                <FaGithub size={24} />
              </a>
              <a href="https://linkedin.com/in/your-linkedin-username4" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Additional Footer Content */}
        <p className="text-sm text-gray-400">Made with ❤️ by the Rubber Duck Debugging Team</p>
      </div>
    </footer>
  );
};

export default Footer;
