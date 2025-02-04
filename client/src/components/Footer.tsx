
const Footer = () => {
  return (
    <footer className="bg-yellow-400 text-gray-800 py-8">
      <div className="container mx-auto text-center">
        <p className="text-lg">© 2025 Rubber Duck Debugging. All rights reserved.</p>
        <div className="mt-4">
          <a href="#hero" className="text-blue-600 hover:text-blue-800 mx-2">Home</a>
          <a href="#about" className="text-blue-600 hover:text-blue-800 mx-2">About</a>
          <a href="#contact" className="text-blue-600 hover:text-blue-800 mx-2">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;