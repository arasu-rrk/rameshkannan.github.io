# rameshkannan.github.io

## Google Tag Manager

Set `NEXT_PUBLIC_GTM_ID` to the GTM container ID in the local environment and deployment settings. When set, the GTM container loads and a `page_view` event is pushed on initial load and client-side navigation, including the page path, query string, URL, and title.

In GTM, configure the Google tag not to send an automatic page view, then add a GA4 event tag with event name `page_view` triggered by a Custom Event named `page_view`. This avoids counting the initial visit twice.
