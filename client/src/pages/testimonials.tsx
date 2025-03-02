import { useState, useEffect } from 'react';
import axios from 'axios';

const TestimonialForm = () => {
  const [testimonial, setTestimonial] = useState('');
  const [user, setUser] = useState<any>(null); // State to hold the decoded user info
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch the logged-in user data
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token'); // assuming JWT is stored in localStorage
      if (token) {
        try {
          // Fetch user information using the token
          const response = await axios.get('/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data); // Store decoded user info in state
        } catch (error) {
          setErrorMessage('Failed to fetch user data. Please log in again.');
        }
      } else {
        setErrorMessage('Please log in to submit a testimonial.');
      }
    };
    fetchUser();
  }, []);

  // Handle testimonial input change
  const handleTestimonialChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTestimonial(e.target.value);
  };

  // Handle testimonial form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setErrorMessage('Please log in before submitting a testimonial.');
      return;
    }

    if (!testimonial.trim()) {
      setErrorMessage('Please provide a testimonial.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Send the testimonial and user info to the backend
      const response = await axios.post(
        'http://localhost:3001/api/testimonials',
        {
          testimonialContent: testimonial,
          userId: user.id, // Send the user ID
        }
      );

      // Handle successful submission
      console.log(response.data);
      setTestimonial('');
      alert('Your testimonial has been submitted!');
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      setErrorMessage('There was an error submitting your testimonial. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-900 text-white p-16">
      <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-yellow-300 text-center mb-6">Submit Your Testimonial</h2>

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          {/* Testimonial Input */}
          <div className="mb-6">
            <label htmlFor="testimonial" className="block text-lg text-gray-400 mb-2">Your Testimonial</label>
            <textarea
              id="testimonial"
              value={testimonial}
              onChange={handleTestimonialChange}
              placeholder="Share your experience..."
              className="w-full p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-400 text-gray-900 py-2 rounded-lg text-xl hover:bg-yellow-300 transition-all duration-300"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-lg">Already submitted? <a href="/your-testimonials" className="text-yellow-300">View your testimonials</a></p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialForm;
