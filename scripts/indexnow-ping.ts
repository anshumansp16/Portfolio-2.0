/**
 * Notifies IndexNow (Bing, Yandex — Bing's index also feeds Copilot and
 * much of what ChatGPT search surfaces) that URLs on the site were
 * published or updated, so they get (re)crawled within minutes instead of
 * waiting for the next regular crawl.
 *
 * Usage:
 *   npm run seo:ping                 # pings every URL currently in the sitemap
 *   npm run seo:ping -- /insights/my-new-post
 *
 * Requires INDEXNOW_KEY to match the key file committed at
 * public/<INDEXNOW_KEY>.txt.
 */
import sitemap from '../src/app/sitemap'

const SITE_URL = 'https://anshumansp.com'
const HOST = 'anshumansp.com'

async function main() {
  const key = process.env.INDEXNOW_KEY
  if (!key) {
    console.error('INDEXNOW_KEY is not set (check .env.local).')
    process.exit(1)
  }

  const args = process.argv.slice(2)
  const urlList =
    args.length > 0
      ? args.map((path) => (path.startsWith('http') ? path : `${SITE_URL}${path}`))
      : sitemap().map((entry) => entry.url)

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key,
      keyLocation: `${SITE_URL}/${key}.txt`,
      urlList,
    }),
  })

  console.log(`IndexNow: submitted ${urlList.length} URL(s), status ${res.status}`)
  if (!res.ok) {
    console.error(await res.text())
    process.exit(1)
  }
}

main()
