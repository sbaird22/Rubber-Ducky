import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  // State to hold user data, bugs, and error
  const [user, setUser] = useState<any>(null);
  const [ongoingBugs, setOngoingBugs] = useState<any[]>([]);
  const [solvedBugs, setSolvedBugs] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found, please log in');
        return;
      }

      try {
        // Fetch user information
        const userResponse = await fetch('http://localhost:3001/api/user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await userResponse.json();
        setUser(userData);

        // Fetch bugs data
        const bugsResponse = await fetch('http://localhost:3001/api/bugs', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        });

        if (!bugsResponse.ok) {
          throw new Error('Failed to fetch bugs data');
        }

        const bugsData = await bugsResponse.json();
        setOngoingBugs(bugsData.filter((bug: any) => !bug.isSolved));
        setSolvedBugs(bugsData.filter((bug: any) => bug.isSolved));
      } catch (error) {
        setError('An error occurred. Please try again later.');
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Counts
  const ongoingCount = ongoingBugs.length;
  const solvedCount = solvedBugs.length;

  const deleteBug = (bugId: number, isOngoing: boolean): void => {
    if (isOngoing) {
      setOngoingBugs(ongoingBugs.filter(bug => bug.id !== bugId));
    } else {
      setSolvedBugs(solvedBugs.filter(bug => bug.id !== bugId));
    }
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col lg:flex-row space-y-16 lg:space-y-0 lg:space-x-16">
        {/* User Info Section */}
        <div className="lg:w-1/3 bg-gray-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-4xl font-extrabold text-yellow-400 mb-4">Welcome, {user.username}</h2>
          <p className="text-xl text-gray-300">Email: {user.email}</p>

          {/* Bug Counts */}
          <div className="mt-8">
            <p className="text-lg text-yellow-400">Ongoing Bugs: {ongoingCount}</p>
            <p className="text-lg text-yellow-400">Solved Bugs: {solvedCount}</p>
          </div>
        </div>

        {/* Bugs Section */}
        <div className="lg:w-2/3 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-semibold text-yellow-300">Your Bugs</h3>
            {/* Link to Add New Bug */}
            <Link
              to="/bug"
              className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-lg text-xl hover:bg-yellow-300"
            >
              Add New Bug
            </Link>
          </div>

          {/* Ongoing Bugs */}
          <div>
            <h3 className="text-2xl font-semibold text-yellow-300 mb-4">Ongoing Bugs</h3>
            <div className="space-y-6 max-h-80 overflow-y-auto">
              {ongoingBugs.map((bug) => (
                <div
                  key={bug.id}
                  className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-all"
                >
                  <div className="flex justify-between items-center">
                    <Link to={`/bug/${bug.id}`} className="text-xl font-semibold text-yellow-400">
                      {bug.title}
                    </Link>
                    <button
                      onClick={() => deleteBug(bug.id, true)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-400"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-gray-400 text-lg">{bug.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Solved Bugs */}
          <div>
            <h3 className="text-2xl font-semibold text-yellow-300 mb-4">Solved Bugs</h3>
            <div className="space-y-6 max-h-80 overflow-y-auto">
              {solvedBugs.map((bug) => (
                <div
                  key={bug.id}
                  className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-all"
                >
                  <div className="flex justify-between items-center">
                    <Link to={`/bug/${bug.id}`} className="text-xl font-semibold text-yellow-400">
                      {bug.title}
                    </Link>
                    <button
                      onClick={() => deleteBug(bug.id, false)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-400"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-gray-400 text-lg">{bug.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;

