import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Hero = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  // Check if the user is logged in (e.g., check for a JWT token in localStorage)
  const isLoggedIn = Boolean(localStorage.getItem('token')); // Example check for a token in localStorage

  // Handle the button click and navigate based on the login status
  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard'); // Redirect to dashboard if logged in
    } else {
      navigate('/register'); // Redirect to register if not logged in
    }
  };

  return (
    <section id="hero" className="bg-gray-800 text-white p-20 text-center">
      <h1 className="text-4xl font-extrabold text-yellow-300 mb-4">Welcome to Rubber Duck Debugging</h1>
      <p className="text-lg text-gray-400 mb-8">Solve problems by explaining them aloud to your rubber duck!</p>
      <button
        onClick={handleButtonClick} // Add the click handler here
        className="bg-yellow-400 text-gray-900 px-8 py-2 rounded-lg text-xl hover:bg-yellow-500"
      >
        Start Debugging
      </button>
    </section>
  );
};

export default Hero;
