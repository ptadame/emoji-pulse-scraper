// File: scripts/scrape.js
import fs from 'fs/promises'
import fetch from 'node-fetch'

async function main() {
  // 1️⃣ Our target URL—this one lives on TikTok’s own domain
  const url =
    'https://www.tiktok.com/business/creativecenter/api/inspiration/popular/trending?country=US&days=1'

  console.log(`Fetching ${url}…`)
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json'
    }
  })

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url}`)
  }

  const json = await res.json()
  const fileName = `emojis-${new Date().toISOString().slice(0, 10)}.json`

  // Ensure our data folder exists and write the file:
  await fs.mkdir('data', { recursive: true })
  await fs.writeFile(`data/${fileName}`, JSON.stringify(json, null, 2))

  console.log(`✅ Wrote data/${fileName}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
