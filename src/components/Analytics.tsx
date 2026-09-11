import Script from 'next/script'

/**
 * GA4 pageview + event tracking. Loads nothing (zero cost, zero external
 * request) until NEXT_PUBLIC_GA_ID is set — create a free GA4 property at
 * analytics.google.com, then add the measurement ID (G-XXXXXXX) to
 * .env.local / your hosting env vars.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  if (!gaId) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
