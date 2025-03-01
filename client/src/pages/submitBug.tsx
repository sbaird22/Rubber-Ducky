import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Fix import

// Define interface for JWT decoding
interface DecodedToken {
  _id: string;
  username: string;
  email: string;
}

interface Bug {
  _id: string;
  title: string;
  bugDescription: string;
  createdBy: string;
}

const AddBugForm = () => {
  const [bugTitle, setBugTitle] = useState("");
  const [bugDescription, setBugDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [bug, setBugs] = useState<Bug[]>([]);

  // Extract user ID from token
  const getUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to submit a bug.");
      return null;
    }
    try {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded._id; // Correct property name
    } catch (err) {
      console.error("Invalid token:", err);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userId = getUserId();
    if (!userId) {
      return;
    }

    try {
      const response = await fetch("/api/bugs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token with request
        },
        body: JSON.stringify({ title: bugTitle, bugDescription, createdBy: userId }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setSuccess("Bug submitted successfully!");
      setBugTitle(""); 
      setBugDescription(""); 
      fetchBugs();
    } catch (err: any) {
      setError(err.message || "Failed to submit bug.");
    }
  };

  const fetchBugs = async (bugId?: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      let url = "/api/bugs/user";
      if (bugId) {
        url = `/api/bugs/user`; // Fetch specific bug if ID is provided
      }
  
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
  
      if (bugId) {
        console.log("Fetched specific bug:", data); // Debugging
      } else {
        setBugs(data); // Store fetched bugs in state
      }
    } catch (err: any) {
      console.error("Error fetching bugs:", err);
    }
  };

  // Fetch bugs when the component loads
  useEffect(() => {
    fetchBugs();
  }, []);
    return (
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 lg:px-16 space-y-8">
          {/* Form Title */}
          <h2 className="text-4xl font-extrabold text-yellow-400 text-center mb-8">Submit a New Bug</h2>
  
          {/* Form Section */}
          <div className="lg:w-1/2 mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
            <form className="space-y-6" onSubmit ={handleSubmit}>
              {/* Bug Title */}
              <div>
                <label htmlFor="title" className="block text-lg font-medium text-yellow-300">Bug Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={bugTitle}
                  onChange={(e) => setBugTitle(e.target.value)}
                  className="mt-2 p-4 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter the bug title"
                  required
                />
              </div>
  
              {/* Bug Description */}
              <div>
                <label htmlFor="bugDescription" className="block text-lg font-medium text-yellow-300">Bug Description</label>
                <textarea
                  id="bugDescription"
                  name="bugDescription"
                  value={bugDescription}
                  onChange={(e) => setBugDescription(e.target.value)}
                  className="mt-2 p-4 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Describe the bug"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
              {success && <p className="text-green-500 text-center">{success}</p>}
  
              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg text-xl font-semibold hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Submit Bug
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Display the list of submitted bugs */}
        {bug.length > 0 && (
              <div className="mt-8">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Your Submitted Bugs</h3>
              <ul className="bg-gray-800 p-4 rounded-md">
              {bug.map((bug) => (
                <li key={bug._id} className="p-2 border-b border-gray-600">
                  <strong className="text-yellow-300">{bug.title}</strong>: {bug.bugDescription}
              </li>
              ))}
            </ul>
            </div>
        )}
      </section>
    );
  };
  
  export default AddBugForm;
  