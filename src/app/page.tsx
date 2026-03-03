export default function Home() {
  return (
    <main className="bg-[#f5f0f0] min-h-[calc(100vh-65px)] flex items-center">
      <div className="max-w-6xl mx-auto w-full px-6 sm:px-10 lg:px-16 py-16 lg:py-24 flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">

        {/* Text Content — bottom on mobile, left on desktop */}
        <div className="flex flex-col gap-5 flex-1 text-center md:text-left">
          <span className="text-sm font-semibold tracking-widest uppercase text-gray-400">
            Hello, I&apos;m
          </span>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
            style={{ color: '#100f3a', fontFamily: 'var(--font-bitter), serif' }}
          >
            Ramesh Kannan
          </h1>
          <p className="text-lg text-gray-500 font-medium">
            Senior Software Engineer &nbsp;&middot;&nbsp; .NET &nbsp;&middot;&nbsp; Cloud Architecture
          </p>
          <p className="text-gray-600 leading-relaxed text-base sm:text-lg max-w-xl mx-auto md:mx-0">
            Building robust, scalable systems for over 13 years. I specialise in .NET full-stack
            development and cloud-native architectures on Azure, AWS, and GCP — turning complex
            engineering problems into clean, reliable solutions.
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-2">
            <a
              href="/blog"
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors bg-[#100f3a] hover:bg-[#1e1c5e]"
            >
              Read Blog
            </a>
            {/* <a
              href="/about"
              className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors border-2 border-[#100f3a] text-[#100f3a] hover:bg-[#100f3a] hover:text-white"
            >
              About Me
            </a> */}
          </div>
        </div>

        {/* Photo — top on mobile, right on desktop */}
        <div className="flex-shrink-0 flex justify-center">
          <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="/images/me/ramesh-kannan.jpeg"
              alt="Ramesh Kannan"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </main>
  );
}
