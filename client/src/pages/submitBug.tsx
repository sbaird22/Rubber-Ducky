
const AddBugForm = () => {
    return (
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 lg:px-16 space-y-8">
          {/* Form Title */}
          <h2 className="text-4xl font-extrabold text-yellow-400 text-center mb-8">Submit a New Bug</h2>
  
          {/* Form Section */}
          <div className="lg:w-1/2 mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
            <form className="space-y-6">
              {/* Bug Title */}
              <div>
                <label htmlFor="title" className="block text-lg font-medium text-yellow-300">Bug Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
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
                  className="mt-2 p-4 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Describe the bug"
                  required
                />
              </div>
  
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
      </section>
    );
  };
  
  export default AddBugForm;
  