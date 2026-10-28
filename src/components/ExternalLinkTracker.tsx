'use client';

import { useEffect } from 'react';
import { ANALYTICS_EVENTS } from '@/lib/analytics-events';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/** Sends external-link clicks to Google Tag Manager. */
export default function ExternalLinkTracker() {
  useEffect(() => {
    function configureExternalLink(link: HTMLAnchorElement) {
      if (link.protocol !== 'http:' && link.protocol !== 'https:') return false;

      const linkHostname = link.hostname.replace(/^www\./, '');
      const currentHostname = window.location.hostname.replace(/^www\./, '');
      if (linkHostname === currentHostname) return false;

      link.target = '_blank';
      link.relList.add('noopener', 'noreferrer');
      return true;
    }

    function configureLinks(node: Node) {
      if (!(node instanceof Element)) return;
      if (node instanceof HTMLAnchorElement) configureExternalLink(node);
      node.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(configureExternalLink);
    }

    function trackExternalLink(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest<HTMLAnchorElement>('a[href]');
      if (!link) return;
      if (!configureExternalLink(link)) return;

      const url = new URL(link.href);
      window.dataLayer = window.dataLayer || [];
      if (url.hostname.toLowerCase().includes('github')) {
        window.dataLayer.push({
          event: ANALYTICS_EVENTS.GITHUB_REPO_VISIT,
          domain: url.hostname,
          repository: link.href,
        });
      } else {
        window.dataLayer.push({
          event: ANALYTICS_EVENTS.EXTERNAL_LINK_CLICK,
          domain: url.hostname,
          target_url: link.href,
        });
      }
    }

    document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(configureExternalLink);
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes') {
          configureLinks(mutation.target);
        } else {
          mutation.addedNodes.forEach(configureLinks);
        }
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['href'],
    });
    document.addEventListener('click', trackExternalLink, true);
    return () => {
      observer.disconnect();
      document.removeEventListener('click', trackExternalLink, true);
    };
  }, []);

  return null;
}
