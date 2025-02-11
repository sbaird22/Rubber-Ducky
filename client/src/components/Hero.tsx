
const Hero = () => {
  return (
    <section id="hero" className="bg-blue-500 text-white p-16 text-center">
      <h1 className="text-4xl font-extrabold mb-4">Welcome to Rubber Duck Debugging</h1>
      <p className="text-lg mb-8">Solve problems by explaining them out loud to your rubber duck!</p>
      <button className="bg-yellow-400 text-gray-800 px-8 py-2 rounded-lg text-xl hover:bg-yellow-300">
        Start Debugging
      </button>
    </section>
  );
};

export default Hero;