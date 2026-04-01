export default function Hero() {
  return (
    <section className="relative w-full h-[75vh] overflow-hidden">
      
      {/* Background Image */}
      <img
        src="/hero_optimized.jpg"
        alt="AgroChain"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Light Overlay (to match UI softness) */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-12 lg:px-20">
        
        <div className="max-w-2xl">
          
          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
            Empowering the{" "}
            <span className="text-green-700">Future</span> of Agriculture
          </h1>

          {/* Subtext */}
          <p className="mt-4 text-lg md:text-xl text-gray-700">
            Blockchain Based Supply Chain
          </p>

          {/* Button */}
          <button className="mt-8 px-8 py-3 bg-[#e8dfd2] text-gray-800 text-lg font-semibold rounded-full shadow-md hover:shadow-lg transition">
            Get Started
          </button>

        </div>
      </div>

    </section>
  );
}