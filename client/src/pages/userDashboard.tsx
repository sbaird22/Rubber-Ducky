import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { type JwtPayload, jwtDecode } from 'jwt-decode';

interface DecodedToken extends JwtPayload {
  _id: string;
  username: string;
  email: string;
}
interface Bug {
  _id: string;
  title: string;
  bugDescription: string;
  status: string;
}

const UserDashboard = () => {
  // State to hold user data, bugs, and error
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [bugs, setBugs] = useState<Bug[]>([]);

  const getProfile = (): DecodedToken | null => {
    console.log("getProfile called");
    const token = localStorage.getItem("token");
    if (!token) return null;
    console.log("Token found:", token);
    try {
      console.log("Decoding token:", token);
      return jwtDecode<DecodedToken>(token); // Explicitly set type
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  const fetchBugs = async (userId: string) => {
    try {
      const token = localStorage.getItem('token');
      console.log("Token found:", token);
      if (!token) return;
  
      const response = await fetch(`/api/bugs/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type":"application/json" },
        credentials: 'include',
      });
      console.log("Response:", response);
      if (!response.ok) {
        throw new Error("Failed to fetch bugs");
      }
  
      const bugsData = await response.json();
      console.log("Fetched bugs:", bugsData);
      setBugs(bugsData); // Store fetched bugs in state
    } catch (error) {
      console.error("Error fetching bugs:", error);
    }
  };
  
  

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found, please log in');
        return;
      }
      const decodedToken = getProfile();
      if (!decodedToken || !decodedToken._id) {
        setError('Invalid token, please log in again');
        return;
      }

      try {
        // Fetch user information
        const userResponse = await fetch(`/api/auth/user/${decodedToken._id}`, {

          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        });
console.log(userResponse);
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await userResponse.json();
        console.log(userData);
        setUser(userData);
        fetchBugs(decodedToken._id); // Fetch bugs for the user
      } catch (error) {
        setError('Failed to fetch user data');
      }
    };

    fetchData();
  }, []);


  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  const handleDelete = async (bugId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/bugs/${bugId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":"application/json"
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete bug');
      }
      setBugs((prevBugs) => prevBugs.filter((bug) => bug._id !== bugId));
    } catch (error) {
      console.error('Error deleting bug:', error);
    }
  };

  return (
    <section className="py-16 bg-gray-900 min-h-[75vh] text-white">
      <div className="container mx-auto flex flex-col lg:flex-row space-y-16 lg:space-y-0 lg:space-x-16">
        {/* User Info Section */}
        <div className="lg:w-1/3 bg-gray-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-4xl font-extrabold text-yellow-400 mb-4">Welcome, {user.username}</h2>
          <p className="text-xl text-gray-300">Email: {user.email}</p>

          {/* Bug Counts */}
          <div className="mt-8">
            <p className="text-lg text-yellow-400">Bugs: {bugs.length}</p>
          </div>
        </div>

        {/* Bugs Section */}
        <div className="lg:w-2/3 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-semibold text-yellow-300">Your Bugs</h3>
            {/* Link to Add New Bug */}
            <Link
              to="/submitbug"
              className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-lg text-xl hover:bg-yellow-300"
            >
              Add New Bug
            </Link>
          </div>

          {/* Ongoing Bugs */}
          <div>
            <div className="space-y-6 max-h-80 overflow-y-auto">
            {bugs.filter(bug => bug.status !== "solved").length === 0 ? (
              <p className="text-gray-400">No ongoing bugs</p>
            ) : (
              bugs.filter((bug: Bug) => bug.status !== "solved").map((bug: Bug) => (
                <div key={bug._id} className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-all">
                  <div className="flex justify-between items-center">
                    <Link to={`/bug/${bug._id}`} className="text-xl font-semibold text-yellow-400">
                      {bug.title}
                    </Link>
                    <button onClick={() => handleDelete(bug._id)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-400">
                      Delete
                    </button>
                  </div>
                    <p className="text-gray-400 text-lg">{bug.bugDescription}</p>
                </div>
  ))
)}

                
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default UserDashboard;

