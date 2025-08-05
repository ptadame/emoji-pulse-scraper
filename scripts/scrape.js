const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function main() {
  // TikTok Creative Center endpoint
  const url = 'https://www.tiktok.com/business/creativecenter/api/inspiration/popular/trending?country=US&days=1';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  const json = await res.json();

  // Build filename with today’s date
  const today = new Date().toISOString().slice(0, 10);
  const fileName = `emojis-${today}.json`;
  const outPath = path.join('data', fileName);

  // Ensure data folder exists, then write file
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(json, null, 2));

  console.log('Wrote', outPath);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
