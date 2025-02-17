const Contact = () => {
  return (
    <section id="contact" className="bg-gray-900 text-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-yellow-400 mb-6">Contact Information</h2>
        <p className="text-lg text-gray-300 mb-8">We'd love to hear from you! You can reach us through the following methods:</p>

        {/* Contact Info */}
        <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-yellow-400 mb-2">Email</h3>
            <p className="text-lg text-gray-300">support@rubberduckdebugging.com</p>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-yellow-400 mb-2">Phone</h3>
            <p className="text-lg text-gray-300">(123) 456-7890</p>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-yellow-400 mb-2">Office Address</h3>
            <p className="text-lg text-gray-300">123 Duck Lane, Debug City, DC 12345</p>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-yellow-400 mb-2">Follow Us</h3>
            <div className="flex justify-center space-x-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">
                GitHub
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">
                Twitter
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
