'use client';

import { useLayoutEffect, useState } from 'react';
import ResumeClassic from '@/components/ResumeClassic';
import ResumeModernBlue from '@/components/ResumeModernBlue';
import ResumePrintButton from '@/components/ResumePrintButton';
import ResumeTimeline from '@/components/ResumeTimeline';
import styles from '@/app/resume/resume.module.scss';
import modernBlueStyles from '@/app/resume/resume-modern-blue.module.scss';
import timelineStyles from '@/app/resume/resume-timeline.module.scss';

type ResumeTheme = 'classic' | 'modern-blue' | 'timeline';

/** Renders the selected resume design and query-string theme controls. */
export default function ResumeView() {
  const [theme, setTheme] = useState<ResumeTheme>('classic');
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);

  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedTheme = params.get('theme');
    setShowThemeSwitcher(params.has('theme'));
    setTheme(requestedTheme === 'modern-blue' || requestedTheme === 'timeline'
      ? requestedTheme
      : 'classic');
  }, []);

  function changeTheme(value: string) {
    if (value !== 'classic' && value !== 'modern-blue' && value !== 'timeline') return;

    setTheme(value);
    const url = new URL(window.location.href);
    url.searchParams.set('theme', value);
    window.history.replaceState(null, '', url);
  }

  return (
    <main className={[
      styles.page,
      theme === 'modern-blue' ? modernBlueStyles.modernBluePage : '',
      theme === 'timeline' ? timelineStyles.timelinePage : '',
    ].filter(Boolean).join(' ')}>
      {showThemeSwitcher && (
        <div className={styles.themeControls}>
          <label htmlFor="resume-theme">Theme</label>
          <select
            id="resume-theme"
            value={theme}
            onChange={(event) => changeTheme(event.target.value)}
          >
            <option value="classic">Classic</option>
            <option value="modern-blue">Modern Blue</option>
            <option value="timeline">Timeline</option>
          </select>
        </div>
      )}
      <ResumePrintButton />
      {theme === 'classic' && <ResumeClassic />}
      {theme === 'modern-blue' && <ResumeModernBlue />}
      {theme === 'timeline' && <ResumeTimeline />}
    </main>
  );
}
