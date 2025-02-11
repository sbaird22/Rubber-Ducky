import { FaUser, FaComments, FaBook } from 'react-icons/fa';

const About = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100" id="about">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12">Features of Rubber Duck Debugging</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-white shadow-lg p-8 rounded-xl transform hover:scale-105 transition-all duration-300">
            <FaComments size={50} className="mx-auto text-indigo-500 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Talk It Out</h3>
            <p className="text-gray-600 text-lg">Explain your problem to the rubber duck, and gain new insights.</p>
          </div>
          <div className="bg-white shadow-lg p-8 rounded-xl transform hover:scale-105 transition-all duration-300">
            <FaUser size={50} className="mx-auto text-indigo-500 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Collaborative</h3>
            <p className="text-gray-600 text-lg">Discuss your issue with others to brainstorm solutions together.</p>
          </div>
          <div className="bg-white shadow-lg p-8 rounded-xl transform hover:scale-105 transition-all duration-300">
            <FaBook size={50} className="mx-auto text-indigo-500 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Learning Resource</h3>
            <p className="text-gray-600 text-lg">Use the experience to learn and grow as a developer through reflection.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;