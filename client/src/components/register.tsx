import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const userData = {
      username,
      email,
      password
    };

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data);
        // Store the JWT in localStorage
        localStorage.setItem('token', data.token);
        navigate('/dashboard'); // Navigate to the dashboard upon successful registration
      } else {
        console.error('Registration failed:', data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <section className="bg-gray-900 text-white p-16">
      <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-yellow-300 text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-lg text-gray-400 mb-2">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg text-gray-400 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-lg text-gray-400 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-lg"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-lg text-gray-400 mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 py-2 rounded-lg text-xl hover:bg-yellow-300 transition-all duration-300"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-lg">
            Already have an account? 
            <Link to="/login" className="text-yellow-300"> Login</Link> {/* Updated with Link */}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
