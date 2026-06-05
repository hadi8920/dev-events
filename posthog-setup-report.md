# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into your DevEvent Next.js App Router project. The following changes were made:

- **`instrumentation-client.ts`** (new): Initializes PostHog client-side using the `posthog-js` SDK. Uses a reverse proxy (`/ingest`) to improve reliability and reduce ad-blocker interference. Enables exception capture for error tracking.
- **`next.config.ts`** (updated): Added rewrites to proxy PostHog requests through your Next.js app (`/ingest/*` → PostHog), including static asset and array routes. Also sets `skipTrailingSlashRedirect: true` as required by PostHog.
- **`components/ExploreBtn.tsx`** (updated): Captures `explore_events_clicked` when the "Explore Events" CTA button is clicked.
- **`components/EventCard.tsx`** (updated): Added `"use client"` directive and captures `event_card_clicked` with event title, slug, location, and date properties when a user clicks an event card.
- **`.env.local`** (new): Contains `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.

## Events instrumented

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the 'Explore Events' CTA button on the homepage, indicating intent to browse events | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks on an event card to view the detail page for a specific event | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](https://us.posthog.com/project/454670/dashboard/1670592)
- [Explore Events CTA Clicks](https://us.posthog.com/project/454670/insights/Dr6Dp6nt)
- [Event Card Clicks Over Time](https://us.posthog.com/project/454670/insights/W3aRr5mn)
- [Homepage CTA vs Event Clicks](https://us.posthog.com/project/454670/insights/gozWqrtt)
- [Total Event Card Clicks (30 days)](https://us.posthog.com/project/454670/insights/D4piRYrH)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
