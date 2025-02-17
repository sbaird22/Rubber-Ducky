import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const SubmitTestimonialPage = () => {
  const [name, setName] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const [role, setRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook for redirection

  // Simulate checking if the user is logged in (you can replace this with actual logic)
  useEffect(() => {
    const userToken = localStorage.getItem('userToken'); // Or check any other login mechanism
    if (!userToken) {
      setIsLoggedIn(false);
      navigate('/login');  // Redirect to login if not logged in
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic, such as sending the data to the server
    console.log('Testimonial Submitted:', { name, testimonial, role });

    // Reset the form
    setName('');
    setTestimonial('');
    setRole('');
  };

  if (!isLoggedIn) {
    return null; // If the user is not logged in, we return null while redirecting
  }

  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-yellow-400 mb-8">Share Your Experience</h2>
        <p className="text-lg text-gray-300 mb-4">Help others by sharing your experience with Rubber Duck Debugging.</p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg text-yellow-400 mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-4 rounded-lg bg-gray-700 text-white focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="testimonial" className="block text-lg text-yellow-400 mb-2">Your Testimonial</label>
            <textarea
              id="testimonial"
              value={testimonial}
              onChange={(e) => setTestimonial(e.target.value)}
              required
              rows={4}
              className="w-full p-4 rounded-lg bg-gray-700 text-white focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-lg text-yellow-400 mb-2">Your Role (Optional)</label>
            <input
              type="text"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-4 rounded-lg bg-gray-700 text-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-400 text-gray-800 py-2 px-6 rounded-lg text-xl hover:bg-yellow-300"
          >
            Submit Testimonial
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubmitTestimonialPage;
