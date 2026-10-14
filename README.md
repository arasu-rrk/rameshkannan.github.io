# rameshkannan.github.io

## Google Tag Manager

Set `NEXT_PUBLIC_GTM_ID` to the GTM container ID in the local environment and deployment settings. When set, the GTM container loads.

In GTM, configure a Google tag for your GA4 measurement ID and leave automatic `page_view` sending enabled. In the GA4 web data stream's Enhanced Measurement settings, enable **Page changes based on browser history events** to track client-side navigation. Do not add a separate Custom Event tag for `page_view`, as it would duplicate the automatically collected events.
