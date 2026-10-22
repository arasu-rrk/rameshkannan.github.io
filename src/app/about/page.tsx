import type { Metadata } from "next";
import Link from "next/link";
import { getImageUrl } from "@/lib/images";

export const metadata: Metadata = {
  title: "About | Ramesh Kannan",
  description: "About Ramesh Kannan, Senior Software Engineer.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    title: "About | Ramesh Kannan",
    description: "About Ramesh Kannan, Senior Software Engineer.",
    url: "/about",
    siteName: "Ramesh Kannan",
    images: [getImageUrl("/images/me/ramesh-kannan.jpeg")],
  },
};

export default function About() {
  return (
    <main className="min-h-[calc(100vh-65px)] px-6 py-16 sm:px-10">
      <article className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-4xl font-bold text-gray-900">About Ramesh Kannan</h1>
        <p className="mb-5 text-lg leading-relaxed text-gray-700">
          I&apos;m a senior software engineer with over 13 years of experience
          building .NET full-stack applications and scalable systems. I focus on
          turning complex engineering problems into reliable, maintainable
          solutions.
        </p>
        <p className="mb-5 leading-relaxed text-gray-700">
          My work and writing cover .NET development, software architecture,
          DevOps, and cloud-native systems on Microsoft Azure, Amazon Web
          Services, and Google Cloud Platform.
        </p>
        <h2 className="mb-3 mt-10 text-2xl font-semibold text-gray-900">
          Topics I write about
        </h2>
        <p className="mb-8 leading-relaxed text-gray-700">
          This site shares practical notes and guides from my work, including
          .NET solution standards, Git, Azure SQL, and cloud deployments.
        </p>
        <Link
          href="/blog"
          className="inline-flex rounded-lg bg-[#100f3a] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#1e1c5e]"
        >
          Browse the engineering blog
        </Link>
      </article>
    </main>
  );
}
