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
  return new Promise((resolve) => {
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
          resolve(text);
        }
      });
    }).on('error', () => resolve(text));
  });
}

async function processAdhkars() {
  const filePath = path.join(process.cwd(), 'src', 'features', 'adhkar', 'data', 'adhkar.data.ts');
  let content = fs.readFileSync(filePath, 'utf8');

  // Find all dhikrs
  // translation: "...", \s*(?:translations: \{[^\}]*\},)? \s*reference: "...", \s*targetCount: \d+, \s*(?:virtue: "([^"]+)",)?
  // Notice that some dhikrs don't have virtue. We need a regex that matches `translation: "..."` safely
  
  const blocksRegex = /translation:\s*"([^"]+)",(\s*reference:[^,]+,\s*targetCount:[^,]+(?:,\s*virtue:\s*"([^"]+)")?)/g;
  
  const matches = [...content.matchAll(blocksRegex)];
  for (const match of matches) {
    const originalBlock = match[0];
    const translationText = match[1];
    const rest = match[2];
    const virtueText = match[3];

    // Check if this block already has `translations:` next to it. Wait, the regex `translation: "..."` will match without `translations:` if we don't catch it.
    // Let's just do a simple replacement. If it already has `translations:` we don't care because our regex doesn't match `translations:` property, it matches `translation:` and then immediately `reference:`. If there is `translations:` in between, it won't match!
    const enTrans = await translate(translationText, 'en'); await delay(50);
    const uzTrans = await translate(translationText, 'uz'); await delay(50);
    const kyTrans = await translate(translationText, 'ky'); await delay(50);

    let virtueBlock = '';
    if (virtueText) {
      const enVirtue = await translate(virtueText, 'en'); await delay(50);
      const uzVirtue = await translate(virtueText, 'uz'); await delay(50);
      const kyVirtue = await translate(virtueText, 'ky'); await delay(50);
      
      const restWithoutVirtue = rest.replace(/\s*,\s*virtue:\s*"([^"]+)"/, '');
      virtueBlock = `${restWithoutVirtue},
    virtue: "${virtueText}",
    virtueTranslations: { ru: "${virtueText}", en: "${enVirtue.replace(/"/g, '\\"')}", uz: "${uzVirtue.replace(/"/g, '\\"')}", ky: "${kyVirtue.replace(/"/g, '\\"')}" }`;
    }

    const newBlock = `translation: "${translationText}",
    translations: { ru: "${translationText.replace(/"/g, '\\"')}", en: "${enTrans.replace(/"/g, '\\"')}", uz: "${uzTrans.replace(/"/g, '\\"')}", ky: "${kyTrans.replace(/"/g, '\\"')}" },${virtueText ? virtueBlock : rest}`;

    content = content.replace(originalBlock, newBlock);
    console.log('Processed:', translationText.substring(0, 20));
  }

  fs.writeFileSync(filePath, content);
  console.log('Adhkar translations finished');
}

processAdhkars();
