'use client';

import { useEffect, useState } from 'react';
import styles from '@/app/resume/resume.module.scss';

/** Opens the browser print dialog for the resume. */
export default function ResumePrintButton() {
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  return (
    <>
      <div className={styles.printControls}>
        <button className={styles.printButton} type="button" onClick={() => window.print()}>
          Print resume
        </button>
      </div>
      <footer className={styles.printFooter}>{pageUrl}</footer>
    </>
  );
}
