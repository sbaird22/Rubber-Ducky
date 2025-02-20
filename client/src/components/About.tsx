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
            <p className="text-gray-400 text-lg">
              Work through your bug with the rubber duck by explaining your problem out loud. The act of verbalizing can often lead to new insights and solutions.
            </p>
          </div>
          <div className="bg-gray-800 shadow-lg p-8 rounded-xl transform hover:scale-105 transition-all duration-300 hover:bg-gray-700">
            <FaUser size={50} className="mx-auto text-yellow-200 mb-6" />
            <h3 className="text-2xl font-semibold text-yellow-200 mb-3">Track Your Progress</h3>
            <p className="text-gray-400 text-lg">
              Keep a log of your bugs and track your progress as you work through them. Mark solved issues and revisit unsolved ones, gaining clarity and keeping track of what you've learned.
            </p>
          </div>
          <div className="bg-gray-800 shadow-lg p-8 rounded-xl transform hover:scale-105 transition-all duration-300 hover:bg-gray-700">
            <FaBook size={50} className="mx-auto text-yellow-200 mb-6" />
            <h3 className="text-2xl font-semibold text-yellow-200 mb-3">Learn and Reflect</h3>
            <p className="text-gray-400 text-lg">
              Reflect on your problem-solving process and learn from each bug. Track your improvements, build confidence, and grow as a developer through consistent reflection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

