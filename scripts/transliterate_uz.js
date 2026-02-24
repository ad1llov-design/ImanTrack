import fs from 'fs';
import path from 'path';

const uzPath = path.join(process.cwd(), 'src', 'shared', 'i18n', 'translations', 'uz.json');
let content = fs.readFileSync(uzPath, 'utf8');

// The user noted that SOME translations might be in Cyrillic. 
// However, the uz.json was previously verified to use Latin.
// For completeness, we will define a map of cyrillic to latin just in case 
// there are keys like (ru: "", uz: "Ассалому алайкум") left around.
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
  'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya',
  'ғ': 'g\'', 'Ғ': 'G\'', 'қ': 'q', 'Қ': 'Q', 'ҳ': 'h', 'Ҳ': 'H'
};

function transliterate(text) {
  return text.split('').map(char => cyrillicToLatinMap[char] || char).join('');
}

const lines = content.split('\n');
const fixedLines = lines.map(line => {
    // Only process lines that have a value
    const match = line.match(/(".*":\s*")(.*)(")(,?)/);
    if(match) {
        let value = match[2];
        const hasCyrillic = /[А-Яа-яЁёҚқҒғҲҳ]/.test(value);
        if (hasCyrillic) {
            value = transliterate(value);
            return `${match[1]}${value}${match[3]}${match[4]}`;
        }
    }
    return line;
});

fs.writeFileSync(uzPath, fixedLines.join('\n'));
console.log('uz.json verified and cleaned successfully.');
