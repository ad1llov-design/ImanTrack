import fs from 'fs';
import path from 'path';
import https from 'https';

const cyrillicToLatinMap = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e',
  'ё': 'yo', 'ж': 'j', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k',
  'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
  'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'x', 'ц': 'ts',
  'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '\'', 'ы': 'y', 'ь': '',
  'э': 'e', 'ю': 'yu', 'я': 'ya',
  'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E',
  'Ё': 'Yo', 'Ж': 'J', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K',
  'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R',
  'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'X', 'Ц': 'Ts',
  'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch', 'Ъ': '\'', 'Ы': 'Y', 'Ь': '',
  'ғ': "g'", 'Ғ': "G'", 'қ': 'q', 'Қ': 'Q', 'ҳ': 'h', 'Ҳ': 'H',
  'ў': "o'", 'Ў': "O'"
};

function transliterateUzbek(text) {
  if (!text) return text;
  return text.split('').map(char => cyrillicToLatinMap[char] || char).join('');
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function translate(text, targetLang) {
  if (!text) return text;
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
          if (targetLang === 'uz') result = transliterateUzbek(result);
          resolve(result);
        } catch (e) {
          resolve(text); // fallback to original
        }
      });
    }).on('error', () => resolve(text)); // fallback
  });
}

async function processFile(filePath) {
  console.log('Processing', filePath);
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to find translation definitions. We will look for anything that ends with (EN)", (UZ)", etc. and replace them by calling translate.
  // Actually, let's parse hadith:
  // Regex to match the translations: { ru: { text: "...", narrator: "...", grade: "..." }, en: {...}, uz: {...}, ky: {...} } block
  // This is tricky because JS regex for nested objects is tough. 
  // We can match every string that has (UZ)" or (EN)" and extract the RU one?
  // It's safer to just match `ru: "..."`, `en: "..."`, `uz: "..."`, `ky: "..."` and similar.

  // Let's replace simple string translations like in adhkar.data.ts
  const simpleRegex = /ru:\s*"([^"]+)",\s*en:\s*"[^"]+",\s*uz:\s*"[^"]+",\s*ky:\s*"[^"]+"/g;
  let matches = [...content.matchAll(simpleRegex)];
  
  for (const match of matches) {
    const originalBlock = match[0];
    const ruText = match[1];
    if (originalBlock.includes('(EN)')) {
      const en = await translate(ruText, 'en'); await delay(50);
      const uz = await translate(ruText, 'uz'); await delay(50);
      const ky = await translate(ruText, 'ky'); await delay(50);
      
      const newBlock = `ru: "${ruText.replace(/"/g, '\\"')}", en: "${en.replace(/"/g, '\\"')}", uz: "${uz.replace(/"/g, '\\"')}", ky: "${ky.replace(/"/g, '\\"')}"`;
      content = content.replace(originalBlock, newBlock);
      console.log('Translated simple:', ruText.substring(0,20));
    }
  }

  // Now replace nested object translations (hadith.collection.ts)
  // en: { text: "... (EN)", narrator: "... (EN)", grade: "... (EN)" }
  const nestedRegex = /ru:\s*\{\s*text:\s*"([^"]+)",\s*narrator:\s*"([^"]+)"(?:,\s*grade:\s*"([^"]+)")?\s*\},\s*en:\s*\{\s*text:\s*"[^"]+",\s*narrator:\s*"[^"]+"(?:,\s*grade:\s*"[^"]+")?\s*\},\s*uz:\s*\{\s*text:\s*"[^"]+",\s*narrator:\s*"[^"]+"(?:,\s*grade:\s*"[^"]+")?\s*\},\s*ky:\s*\{\s*text:\s*"[^"]+",\s*narrator:\s*"[^"]+"(?:,\s*grade:\s*"[^"]+")?\s*\}/g;
  
  const nestedMatches = [...content.matchAll(nestedRegex)];
  for (const match of nestedMatches) {
    const originalBlock = match[0];
    const ruText = match[1];
    const ruNarrator = match[2];
    const ruGrade = match[3];

    if (originalBlock.includes('(EN)')) {
      const enText = await translate(ruText, 'en'); await delay(50);
      const uzText = await translate(ruText, 'uz'); await delay(50);
      const kyText = await translate(ruText, 'ky'); await delay(50);

      const enNar = await translate(ruNarrator, 'en'); await delay(50);
      const uzNar = await translate(ruNarrator, 'uz'); await delay(50);
      const kyNar = await translate(ruNarrator, 'ky'); await delay(50);

      let enGrade = "", uzGrade = "", kyGrade = "";
      if (ruGrade) {
        enGrade = await translate(ruGrade, 'en'); await delay(50);
        uzGrade = await translate(ruGrade, 'uz'); await delay(50);
        kyGrade = await translate(ruGrade, 'ky'); await delay(50);
      }

      let newBlock = `ru: { text: "${ruText}", narrator: "${ruNarrator}"${ruGrade ? `, grade: "${ruGrade}"` : ''} },
      en: { text: "${enText.replace(/"/g, '\\"')}", narrator: "${enNar.replace(/"/g, '\\"')}"${ruGrade ? `, grade: "${enGrade.replace(/"/g, '\\"')}"` : ''} },
      uz: { text: "${uzText.replace(/"/g, '\\"')}", narrator: "${uzNar.replace(/"/g, '\\"')}"${ruGrade ? `, grade: "${uzGrade.replace(/"/g, '\\"')}"` : ''} },
      ky: { text: "${kyText.replace(/"/g, '\\"')}", narrator: "${kyNar.replace(/"/g, '\\"')}"${ruGrade ? `, grade: "${kyGrade.replace(/"/g, '\\"')}"` : ''} }`;
      
      content = content.replace(originalBlock, newBlock);
      console.log('Translated nested:', ruText.substring(0,20));
    }
  }

  // Also catch hadiths that don't have grades at all in their original definitions (narrator only)
  // Already handled by making grade optional via (?:...)?!

  fs.writeFileSync(filePath, content);
  console.log('Finished', filePath);
}

async function run() {
  await processFile(path.join(process.cwd(), 'src', 'features', 'adhkar', 'data', 'adhkar.data.ts'));
  await processFile(path.join(process.cwd(), 'src', 'features', 'hadith', 'data', 'hadith.collection.ts'));
}

run();
