const Hero = () => {
  return (
    <section id="hero" className="bg-gray-800 text-white p-20 text-center">
      <h1 className="text-4xl font-extrabold text-yellow-300 mb-4">Welcome to Rubber Duck Debugging</h1>
      <p className="text-lg text-gray-400 mb-8">Solve problems by explaining them out loud to your rubber duck!</p>
      <button className="bg-yellow-400 text-gray-900 px-8 py-2 rounded-lg text-xl hover:bg-yellow-500">
        Start Debugging
      </button>
    </section>
  );
};

export default Hero;