const https = require('https');

const padId = (id) => id.toString().padStart(3, '0');

const testUrls = [
  // Quran.com legacy images
  `https://assets.quran.com/images/quran/page001.png`,
  `https://mushaf-images.s3.amazonaws.com/pages/001.png`,
  // Equran
  `https://www.equran.me/Quran/001.jpg`,
  // Internet Archive Mushaf
  `https://archive.org/download/quran-images_202008/001.png`,
  // ClearQuran
  `https://www.clearquran.com/images/001.jpg`,
  // Alquran.cloud
  `https://cdn.islamic.network/quran/images/1_1.png`,
  // EveryAyah
  `https://everyayah.com/data/images_quran/001.png`,
  `https://everyayah.com/data/images_quran_v2/001.png`,
  `https://quranimages.com/pages/001.png`,
  `https://archive.org/download/Quran_Pages/001.jpg`,
  `https://github.com/quran/quran-images-api/raw/master/images/001.png`
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ url, error: e.message });
    });
  });
}

async function run() {
  for (const url of testUrls) {
    console.log(`Testing ${url}...`);
    const result = await checkUrl(url);
    console.log(`Result: `, result);
  }
}

run();
