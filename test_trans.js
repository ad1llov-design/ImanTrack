import https from 'https';

async function translate(text, targetLang) {
  return new Promise((resolve, reject) => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ru&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          let result = '';
          if (json[0]) {
            json[0].forEach(t => {
              if (t[0]) result += t[0];
            });
          }
          resolve(result);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function test() {
  try {
    const uz = await translate("Привет мир, как дела?", "uz");
    console.log("UZ:", uz);
    const ky = await translate("Привет мир, как дела?", "ky");
    console.log("KY:", ky);
    const en = await translate("Привет мир, как дела?", "en");
    console.log("EN:", en);
  } catch (e) {
    console.error(e);
  }
}

test();
