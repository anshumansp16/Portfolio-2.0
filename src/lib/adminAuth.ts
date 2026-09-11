// Client-side-only gate shared by /admin and /admin/seo. This is NOT real
// security — the password ships in the JS bundle and is trivially visible
// via view-source. It only keeps this out of casual view; nothing behind
// it is sensitive (site copy, public SEO health data), so that's an
// acceptable tradeoff for a zero-backend site. Don't put secrets behind it.
export const ADMIN_PASSWORD = 'anshuman2024' // Change this
