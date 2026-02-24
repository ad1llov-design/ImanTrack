import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'features', 'hadith', 'data', 'hadith.collection.ts');
let content = fs.readFileSync(filePath, 'utf8');

// The goal is to insert translations object inside every Hadith object in HADITH_LIST array.
// Because it's a TS file with 50 items, regex is best. 

// We look for a block that has translation, narrator, and grade (optional).
// Match the whole object body roughly
content = content.replace(/translation:\s*"(.*?)",\s*narrator:\s*"(.*?)",(?:[\s\S]*?)grade:\s*"(.*?)",/g, (match, translation, narrator, grade) => {
    const obj = `translations: {
      ru: { text: "${translation.replace(/"/g, '\\"')}", narrator: "${narrator}", grade: "${grade}" },
      en: { text: "${translation.replace(/"/g, '\\"')} (EN)", narrator: "${narrator} (EN)", grade: "${grade} (EN)" },
      uz: { text: "${translation.replace(/"/g, '\\"')} (UZ)", narrator: "${narrator} (UZ)", grade: "${grade} (UZ)" },
      ky: { text: "${translation.replace(/"/g, '\\"')} (KY)", narrator: "${narrator} (KY)", grade: "${grade} (KY)" }
    },
    ${match.trim()}`;
    return obj;
});

// Since some might not have grade
content = content.replace(/translation:\s*"(.*?)",\s*narrator:\s*"(.*?)",(?![\s\S]*?translations:\s*\{)/g, (match, translation, narrator) => {
    // skip if there is already translations right before it (due to previous replace)
    const obj = `translations: {
      ru: { text: "${translation.replace(/"/g, '\\"')}", narrator: "${narrator}" },
      en: { text: "${translation.replace(/"/g, '\\"')} (EN)", narrator: "${narrator} (EN)" },
      uz: { text: "${translation.replace(/"/g, '\\"')} (UZ)", narrator: "${narrator} (UZ)" },
      ky: { text: "${translation.replace(/"/g, '\\"')} (KY)", narrator: "${narrator} (KY)" }
    },
    ${match.trim()}`;
    return obj;
});

// remove duplicate insertions if any overlap
fs.writeFileSync(filePath, content);
console.log('Migrated hadith.collection.ts');
