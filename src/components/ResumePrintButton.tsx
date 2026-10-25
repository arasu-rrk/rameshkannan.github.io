'use client';

import styles from '@/app/resume/resume.module.scss';

/** Opens the browser print dialog for the resume. */
export default function ResumePrintButton() {
  return (
    <div className={styles.printControls}>
      <button className={styles.printButton} type="button" onClick={() => window.print()}>
        Print resume
      </button>
    </div>
  );
}
