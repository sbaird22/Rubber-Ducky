import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Testimonials = () => {
  return (
    <section className="bg-gray-800 text-white py-16"> {/* Lighter blue background */}
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-yellow-400 mb-8">What Our Users Say</h2>

        {/* Add the link to the submit testimonial page */}
        <div className="mb-8">
          <Link
            to="/testimonials" // Link to the testimonial submission page
            className="bg-yellow-400 text-gray-800 py-2 px-6 rounded-lg text-xl hover:bg-yellow-300"
          >
            Submit Your Testimonial
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Testimonial 1 */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300"> {/* Darker box */}
            <p className="text-lg text-gray-300 mb-4">"Rubber Duck Debugging has been a lifesaver. Whenever I'm stuck, explaining my issue to a rubber duck always helps me see the problem from a new perspective. Highly recommended!"</p>
            <p className="text-xl font-semibold text-yellow-400">Jane D.</p>
            <p className="text-sm text-gray-400">Software Engineer</p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300"> {/* Darker box */}
            <p className="text-lg text-gray-300 mb-4">"I was skeptical at first, but after trying it out, I really started noticing improvements in my problem-solving process. The rubber duck is a game-changer!"</p>
            <p className="text-xl font-semibold text-yellow-400">John S.</p>
            <p className="text-sm text-gray-400">Developer</p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300"> {/* Darker box */}
            <p className="text-lg text-gray-300 mb-4">"I use the rubber duck every day for debugging. It’s like having a silent companion who helps me work through my toughest coding challenges."</p>
            <p className="text-xl font-semibold text-yellow-400">Emily R.</p>
            <p className="text-sm text-gray-400">Full Stack Developer</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
