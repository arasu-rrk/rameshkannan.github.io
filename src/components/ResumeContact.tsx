'use client';

import { useState } from 'react';
import styles from '@/app/resume/resume.module.scss';

const contactFields = [
  { key: 'email', label: 'Email', placeholder: '••••@••••.com' },
  { key: 'phone', label: 'Phone', placeholder: '+91-xxxxxxxxxx' },
  { key: 'address', label: 'Address', placeholder: '•••••, India' },
] as const;

type ContactDetails = Record<(typeof contactFields)[number]['key'], string>;
const retryMessage = 'Contact details could not be loaded. Please try again.';

/** Checks that every contact field is present and contains non-empty text. */
function isContactDetails(value: unknown): value is ContactDetails {
  return typeof value === 'object'
    && value !== null
    && contactFields.every(({ key }) => {
      const fieldValue = (value as Record<string, unknown>)[key];
      return typeof fieldValue === 'string' && fieldValue.trim().length > 0;
    });
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/** Displays masked contact details and reveals them on request. */
export default function ResumeContact() {
  const [contacts, setContacts] = useState<ContactDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /** Fetches contact details without caching and records a reveal event. */
  async function revealContacts() {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/resume-contact', { cache: 'no-store' });
      if (!response.ok) {
        setError(response.status === 503
          ? 'Contact details are not fully configured.'
          : retryMessage);
        return;
      }

      const result: { contacts?: unknown } = await response.json();
      if (!isContactDetails(result.contacts)) {
        setError(retryMessage);
        return;
      }

      setContacts(result.contacts);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'resume_contact_revealed',
        contact_type: 'all',
      });
    } catch {
      setError(retryMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.contact}>
      <div className={styles.contactDetails}>
        {contactFields.map(({ key, label, placeholder }, index) => (
          <span className={styles.contactItem} key={key}>
            {index > 0 && <span aria-hidden="true" className={styles.separator}>|</span>}
            <span>
              {contacts?.[key] ?? <span aria-label={`${label} hidden`}>{placeholder}</span>}
            </span>
          </span>
        ))}
      </div>
      {!contacts && (
        <button
          type="button"
          onClick={revealContacts}
          disabled={loading}
          aria-label="Reveal email, phone, and address"
        >
          {loading ? 'Loading…' : 'Show contact details'}
        </button>
      )}
      {error && <p className={styles.contactError} role="status">{error}</p>}
    </div>
  );
}
