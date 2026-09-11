// Shared JSON-LD builders. Keeping these in one place so every page's
// structured data stays consistent (same Person/site identity everywhere,
// which is what ties E-E-A-T signals together for Google and LLM crawlers).

const SITE_URL = 'https://anshumansp.com'
const AUTHOR_NAME = 'Anshuman Parmar'
const SAME_AS = [
  'https://www.linkedin.com/in/anshumansp16',
  'https://github.com/anshumansp',
  'https://x.com/anshumansp16',
]

export function personJsonLd() {
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: AUTHOR_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/images/assets/anshuman-portrait.png`,
    jobTitle: 'AI Engineer',
    sameAs: SAME_AS,
  }
}

export function websiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: AUTHOR_NAME,
    publisher: { '@id': `${SITE_URL}/#person` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/insights?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

/** Root identity graph — mount once in the root layout. */
export function rootJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [personJsonLd(), websiteJsonLd()],
  }
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export { SITE_URL, AUTHOR_NAME, SAME_AS }
