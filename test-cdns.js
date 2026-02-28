const https = require('https');

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ url, error: e.message });
    });
  });
}

async function run() {
  const tests = [
    'https://raw.githubusercontent.com/quran/quran.com-images/master/width_1024/page001.png',
    'https://raw.githubusercontent.com/GlobalQuran/mushaf-images/master/pages/001.png',
    'https://everyayah.com/data/images_pages/page_001.png',
    'https://cdn.quran.com/images/pages/page_1.png'
  ];

  for (const t of tests) {
    const res = await checkUrl(t);
    console.log(res);
  }
}

run();
