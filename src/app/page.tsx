import TypingAnimation from '../components/TypingAnimation'; 

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-7xl gray-800">Hello, I&apos;m</h1>
        <TypingAnimation />
        <p className="text-3xl gray-400 w-2/3 font-segoe-ui leading-10 tracking-wide">Senior software engineer with 12 years of experience in the software industry, specializing in designing and implementing scalable systems using .NET technologies. Experienced in cloud platforms, including Microsoft Azure, Amazon Web Services (AWS), and Google Cloud Platform (GCP).</p>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
