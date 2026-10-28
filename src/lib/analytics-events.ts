export const ANALYTICS_EVENTS = {
  /** Tracks clicks on external HTTP(S) links that are not hosted by GitHub. */
  EXTERNAL_LINK_CLICK: 'external_link_click',
  /** Tracks clicks on links hosted on a GitHub domain. */
  GITHUB_REPO_VISIT: 'github_repo_visit',
  /** Tracks successfully revealing the resume contact details. */
  RESUME_CONTACT_REVEALED: 'resume_contact_revealed',
} as const;
