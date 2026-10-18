import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ramesh Kannan",
  description: "Senior Software Engineer specializing in .NET, cloud architecture, and scalable systems.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Ramesh Kannan",
    description: "Senior Software Engineer specializing in .NET, cloud architecture, and scalable systems.",
    url: "/",
    siteName: "Ramesh Kannan",
    images: ["/images/me/ramesh-kannan.jpeg"],
  },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Ramesh Kannan",
        url: "https://rameshkannan.com/",
        description:
          "Professional profile and engineering articles by Ramesh Kannan.",
        inLanguage: "en",
      },
      {
        "@type": "Person",
        name: "Ramesh Kannan",
        url: "https://rameshkannan.com/",
        image: "https://rameshkannan.com/images/me/ramesh-kannan.jpeg",
        jobTitle: "Senior Software Engineer",
        description:
          "Senior software engineer specializing in .NET full-stack development and cloud-native architectures on Azure, AWS, and GCP.",
        knowsAbout: [
          ".NET",
          "Full-stack development",
          "Cloud architecture",
          "Microsoft Azure",
          "Amazon Web Services",
          "Google Cloud Platform",
          "Software architecture",
        ],
      },
    ],
  };

  return (
    <main className="bg-[#f5f0f0] min-h-[calc(100vh-65px)] flex items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
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
            <Link
              href="/blog"
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors bg-[#100f3a] hover:bg-[#1e1c5e]"
            >
              Read Blog
            </Link>
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
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="/images/me/ramesh-kannan.jpeg"
              alt="Ramesh Kannan"
              fill
              sizes="(min-width: 1024px) 24rem, (min-width: 768px) 20rem, (min-width: 640px) 18rem, 14rem"
              className="object-cover"
              priority
            />
          </div>
        </div>

      </div>
    </main>
  );
}
