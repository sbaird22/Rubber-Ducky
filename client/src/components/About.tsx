import { FaUser, FaComments, FaBook } from 'react-icons/fa';

const About = () => {
  return (
    <section className="py-16 bg-gray-900 text-white" id="about">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-yellow-300 mb-12">Features of Rubber Duck Debugging</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-gray-800 shadow-lg p-8 rounded-xl transform hover:scale-105 transition-all duration-300 hover:bg-gray-700">
            <FaComments size={50} className="mx-auto text-yellow-200 mb-6" />
            <h3 className="text-2xl font-semibold text-yellow-200 mb-3">Talk It Out</h3>
            <p className="text-gray-400 text-lg">Explain your problem to the rubber duck, and gain new insights.</p>
          </div>
          <div className="bg-gray-800 shadow-lg p-8 rounded-xl transform hover:scale-105 transition-all duration-300 hover:bg-gray-700">
            <FaUser size={50} className="mx-auto text-yellow-200 mb-6" />
            <h3 className="text-2xl font-semibold text-yellow-200 mb-3">Collaborative</h3>
            <p className="text-gray-400 text-lg">
              Discuss your issue with others to brainstorm solutions together and track your progress over time. Share your coding bugs, collaborate on solutions, and improve as a developer.
            </p>
          </div>
          <div className="bg-gray-800 shadow-lg p-8 rounded-xl transform hover:scale-105 transition-all duration-300 hover:bg-gray-700">
            <FaBook size={50} className="mx-auto text-yellow-200 mb-6" />
            <h3 className="text-2xl font-semibold text-yellow-200 mb-3">Learning Resource</h3>
            <p className="text-gray-400 text-lg">Use the experience to learn and grow as a developer through reflection and continuous improvement.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
