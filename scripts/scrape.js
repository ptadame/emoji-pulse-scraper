import fs from 'fs/promises';
import fetch from 'node-fetch';
import path from 'path';

async function main() {
  // 1) Figure out output path (test.json if provided, otherwise date-named file)
  const [,, outputArg] = process.argv;
  const outputPath = outputArg || `data/emojis-${new Date().toISOString().slice(0,10)}.json`;

  // 2) The correct TikTok Creative Center endpoint
  const url = 'https://www.tiktok.com/business/creativecenter/api/inspiration/popular/trending?country=US&days=1';

  // 3) Fetch JSON (with a real browser UA)
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);

  // 4) Write to disk
  const json = await res.json();
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Wrote ${outputPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
