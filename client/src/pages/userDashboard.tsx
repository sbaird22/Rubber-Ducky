import { Link } from 'react-router-dom';

const UserDashboard = () => {
  // Sample data (replace with actual user data from your backend)
  const user = {
    username: 'johndoe',
    email: 'johndoe@example.com',
  };

  const ongoingBugs = [
    { id: 1, title: 'Bug in login form', description: 'Unable to submit the login form in some cases.' },
    { id: 2, title: 'UI glitch on dashboard', description: 'Some UI elements overlap on the dashboard page.' },
  ];

  const solvedBugs = [
    { id: 3, title: 'Broken link on homepage', description: 'The “Contact Us” link was broken but fixed now.' },
  ];

  // Counts
  const ongoingCount = ongoingBugs.length;
  const solvedCount = solvedBugs.length;

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
                  <Link to={`/bug/${bug.id}`} className="text-xl font-semibold text-yellow-400">
                    {bug.title}
                  </Link>
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
                  <Link to={`/bug/${bug.id}`} className="text-xl font-semibold text-yellow-400">
                    {bug.title}
                  </Link>
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

