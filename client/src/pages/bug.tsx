import { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const BugPage = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [aiQuery, setAiQuery] = useState<string>('');

  const addNote = () => {
    if (newNote) {
      setNotes([...notes, newNote]);
      setNewNote('');
    }
  };

  const deleteNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const sortNotes = () => {
    setNotes([...notes].sort());
  };

  const askAi = async () => {
    // Placeholder AI query function (replace with actual AI integration)
    setAiResponse(`AI response for: ${aiQuery}`);
    setAiQuery('');
  };

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Section: Rubber Duck + AI Interaction */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
          <div className="flex justify-center mb-8">
            <img src="/rubber-duck.png" alt="Rubber Duck" className="w-32 h-32" />
          </div>
          <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Ask the Rubber Duck</h3>
          <textarea
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            placeholder="Describe your bug..."
            className="w-full p-4 text-gray-800 rounded-lg mb-4"
            rows={4}
          />
          <button
            onClick={askAi}
            className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-lg text-xl hover:bg-yellow-300"
          >
            Ask AI
          </button>

          {aiResponse && (
            <div className="mt-6 bg-gray-700 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-yellow-400">AI Response:</h4>
              <p className="text-gray-300">{aiResponse}</p>
            </div>
          )}
        </div>

        {/* Right Section: Notes and Actions */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Your Bug Notes</h3>

          {/* Notes Input */}
          <div className="flex space-x-4 mb-8">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a new note..."
              className="w-full p-4 text-gray-800 rounded-lg"
            />
            <button
              onClick={addNote}
              className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-lg text-xl hover:bg-yellow-300"
            >
              Add
            </button>
          </div>

          {/* Sort Button */}
          <button
            onClick={sortNotes}
            className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-lg text-xl hover:bg-yellow-300 mb-6"
          >
            Sort Notes
          </button>

          {/* Notes List */}
          <div className="space-y-4">
            {notes.length > 0 ? (
              notes.map((note, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg">
                  <div className="text-gray-300 text-lg">{note}</div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => deleteNote(index)}
                      className="text-yellow-400 hover:text-yellow-300"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                    <button
                      onClick={() => alert('Edit functionality not yet implemented')}
                      className="text-yellow-400 hover:text-yellow-300"
                    >
                      <FaEdit size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No notes added yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BugPage;
