import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { email, password };
  
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
      console.log('Login response:', response);  // Log the whole response
      console.log('Response status text:', response.statusText);  // Status text might provide more info
      console.log('Response data:', data);  // Log the actual response data
  
      if (response.ok) {
        console.log('Login successful:', data);

        // Save JWT token and user information to localStorage
        localStorage.setItem('token', data.token); // Store JWT token
        localStorage.setItem('user', JSON.stringify(data.user)); // Store user data
        
        // Redirect to user dashboard
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        console.error('Login failed:', data.message || 'Invalid credentials');
        setError(data.message || 'Invalid credentials'); // Display error message
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <section className="bg-gray-900 text-white p-16 ">
      <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-yellow-300 text-center mb-6">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
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

          <div className="mb-6">
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

          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 py-2 rounded-lg text-xl hover:bg-yellow-300 transition-all duration-300"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-lg">Don't have an account? <a href="/register" className="text-yellow-300">Register</a></p>
        </div>
      </div>
    </section>
  );
};

export default Login;
