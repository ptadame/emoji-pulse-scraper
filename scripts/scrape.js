#!/usr/bin/env node

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function main(outputPath) {
  // ← TikTok endpoint for daily trending
  const url = 'https://ads.tiktok.com/business/creativecenter/inspiration/popular/trending?cursor=0&count=100';
  const res = await fetch(url, {
    headers: { 'Accept': 'application/json' }
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url}`);
  }
  const json = await res.json();

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Wrote ${outputPath}`);
}

const [ , , outputPath ] = process.argv;
if (!outputPath) {
  console.error('Usage: node scripts/scrape.js <outputPath>');
  process.exit(1);
}

main(outputPath).catch(err => {
  console.error(err);
  process.exit(1);
});
