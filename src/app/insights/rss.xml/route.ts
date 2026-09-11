import { blogPosts } from '@/data/blogs'

const SITE_URL = 'https://anshumansp.com'

function escapeXml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const items = blogPosts
    .map((post) => {
      const url = `${SITE_URL}/insights/${post.slug}`
      const pubDate = new Date(post.date)
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <author>${escapeXml(post.author)}</author>
      ${Number.isNaN(pubDate.getTime()) ? '' : `<pubDate>${pubDate.toUTCString()}</pubDate>`}
    </item>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Anshuman Parmar — Insights</title>
    <link>${SITE_URL}/insights</link>
    <description>Building AI systems, agents, and products — written from someone who ships.</description>
    <language>en-us</language>${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
