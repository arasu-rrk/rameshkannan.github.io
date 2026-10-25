import type { Metadata } from 'next';
import ResumeView from '@/components/ResumeView';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Resume of Ramesh Kannan Rajendran, Senior Software Engineer specializing in .NET, cloud architecture, and scalable systems.',
  alternates: { canonical: '/resume' },
};

/** Renders the resume at its canonical URL. */
export default function ResumePage() {
  return <ResumeView />;
}
