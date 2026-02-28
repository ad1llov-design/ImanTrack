const https = require('https');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'node.js' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

fetchJson('https://api.github.com/repos/muhammad2097/quran-images/git/trees/main?recursive=1').then(res => {
  if (res.tree) {
    const pngs = res.tree.filter(t => t.path.endsWith('.png') || t.path.endsWith('.jpg'));
    console.log(pngs.slice(0, 5));
  } else {
    console.log(res);
  }
}).catch(console.error);
