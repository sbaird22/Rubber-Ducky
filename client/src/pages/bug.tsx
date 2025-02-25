import { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import RubberDuckyImg from '../assets/Rubber_Ducky.png';
import axios from 'axios';

const BugPage = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [aiQuery, setAiQuery] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);

  // Function to handle Speech Input and AI Response
  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    if (!isListening) {
      recognition.start();
      setIsListening(true);
    } else {
      recognition.stop();
      setIsListening(false);
      recognition.onend = () => {
        sendToAI();
      };
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setAiQuery(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  // Function to send the bug description to AI
  const sendToAI = async () => {
    if (!aiQuery.trim()) {
      setAiResponse('Please enter a description.');
      return;
    }

    try {
      setAiResponse('Loading...');
      console.log('Sending to AI:', aiQuery);
      const response = await axios.get('/api/generateText', { params: { prompt: aiQuery } });
      console.log(response.data.response);
      setAiResponse(response.data.response); 
      setAiQuery('');
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setAiResponse('Sorry, there was an error processing your request.');
    }
  };

  const addNote = () => {
    if (newNote) {
      setNotes([...notes, newNote]);
      setNewNote('');
    }
  };

  const deleteNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  // Function to render AI response with basic styling (for Markdown-like formatting)
  const renderAIResponse = (response: string) => {
    return response
      .replace(/### (.*?)\n/g, '<h4 class="text-xl font-semibold text-yellow-400">$1</h4>') // Headers
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>') // Bold Text
      .replace(/`(.*?)`/g, '<code class="bg-gray-800 text-yellow-400 p-1 rounded">$1</code>') // Inline code
      .replace(/- (.*?)(\n|$)/g, '<li class="list-disc pl-5">$1</li>') // Lists
      .replace(/\n/g, '<br />'); // Newlines to <br> for line breaks
  };

  // Function to read the AI response aloud
  const readAIResponse = () => {
    if (aiResponse) {
      const speech = new SpeechSynthesisUtterance(aiResponse);
      speech.lang = 'en-US';
      speech.rate = 1; // Normal speed
      speech.pitch = 1; // Normal pitch
      speech.volume = 1; // Max volume
      window.speechSynthesis.speak(speech);
    }
  };

  // Function to stop speech synthesis if it's currently reading
  const stopReading = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Section: Rubber Duck + AI Interaction */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
          <div className="flex justify-center mb-8">
            <img src={RubberDuckyImg} alt="Rubber Duck" className="w-32 h-32" />
          </div>
          <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Ask the Rubber Duck</h3>

          <textarea
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            placeholder="Describe your bug..."
            className="w-full p-4 text-gray-300 rounded-lg mb-4 border-2 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            rows={4}
          />

          <div className="flex space-x-4">
            <button
              onClick={sendToAI}
              className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-lg text-xl hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              Ask the duck
            </button>

            <button
              onClick={handleVoiceInput}
              className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-lg text-xl hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
          </div>

          {aiResponse && (
            <div>
              <div
                className="mt-6 bg-gray-700 p-6 rounded-lg"
                dangerouslySetInnerHTML={{ __html: renderAIResponse(aiResponse) }}
              />

              {/* Text-to-Speech Controls */}
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={readAIResponse}
                  className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-lg text-xl hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                >
                  Read Aloud
                </button>
                <button
                  onClick={stopReading}
                  className="bg-red-400 text-gray-800 px-6 py-2 rounded-lg text-xl hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Stop Reading
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Notes and Actions */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Your Bug Notes</h3>

          <div className="flex space-x-4 mb-8">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a new note..."
              className="w-full p-4 text-gray-300 rounded-lg border-2 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <button
              onClick={addNote}
              className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-lg text-xl hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              Add
            </button>
          </div>

          <div className="space-y-4">
            {notes.length > 0 ? (
              notes.map((note, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-700 p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300"
                >
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
