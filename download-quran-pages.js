const fs = require('fs');
const path = require('path');
const https = require('https');

const TOTAL_PAGES = 604;
const CONCURRENCY = 15;
const OUT_DIR = path.join(__dirname, 'public', 'quran-pages');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function downloadImage(page) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(OUT_DIR, `${page}.png`);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.size > 1000) {
        return resolve();
      }
    }

    const url = `https://raw.githubusercontent.com/arman088/quranPNG/main/png/${page}.png`;
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get page ${page}: ${res.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(filePath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', (err) => {
        fs.unlink(filePath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log(`Starting download of ${TOTAL_PAGES} Quran pages...`);
  let active = [];
  let completed = 0;
  
  for (let i = 1; i <= TOTAL_PAGES; i++) {
    const p = downloadImage(i).then(() => {
      completed++;
      if (completed % 50 === 0) console.log(`Downloaded ${completed}/${TOTAL_PAGES}`);
      active.splice(active.indexOf(p), 1);
    });
    active.push(p);
    
    if (active.length >= CONCURRENCY) {
      await Promise.race(active);
    }
  }
  
  await Promise.all(active);
  console.log('All 604 pages downloaded successfully.');
}

run().catch(err => {
  console.error('Script failed:', err);
  process.exit(1);
});
