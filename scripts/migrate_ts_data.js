import fs from 'fs';
import path from 'path';

// 1. Migrate adhkar.data.ts
const adhkarPath = path.join(process.cwd(), 'src', 'features', 'adhkar', 'data', 'adhkar.data.ts');
let adhkarContent = fs.readFileSync(adhkarPath, 'utf8');

adhkarContent = adhkarContent.replace(/translation:\s*"([^"]+)",\n\s*reference:/g, (match, text) => {
    return `translations: {\n      ru: "${text}",\n      en: "${text} (EN)",\n      uz: "${text} (UZ)",\n      ky: "${text} (KY)"\n    },\n    translation: "${text}",\n    reference:`;
});
adhkarContent = adhkarContent.replace(/translation:\s*"([^"]+)",\n\s*targetCount:/g, (match, text) => {
    return `translations: {\n      ru: "${text}",\n      en: "${text} (EN)",\n      uz: "${text} (UZ)",\n      ky: "${text} (KY)"\n    },\n    translation: "${text}",\n    targetCount:`;
});

// For Categories in adhkar.data.ts:
// nameRu -> nameRu, translations: { ru, en, uz, ky }
adhkarContent = adhkarContent.replace(/nameRu:\s*"([^"]+)",/g, (match, text) => {
    return `nameRu: "${text}", translations: { ru: "${text}", en: "${text} (EN)", uz: "${text} (UZ)", ky: "${text} (KY)" },`;
});
fs.writeFileSync(adhkarPath, adhkarContent);
console.log('adhkar.data.ts migrated');


// 2. Migrate sunnah.persistence.ts
const sunnahPath = path.join(process.cwd(), 'src', 'features', 'sunnah', 'services', 'sunnah.persistence.ts');
let sunnahContent = fs.readFileSync(sunnahPath, 'utf8');

// The file has:
// ru: { label: "...", description: "..." },
// ky: { label: "...", description: "..." }
// We need to inject en and uz.
sunnahContent = sunnahContent.replace(/ru:\s*{\s*label:\s*"([^"]+)",\s*description:\s*"([^"]+)"\s*},\s*ky:/g, (match, label, desc) => {
    return `ru: { label: "${label}", description: "${desc}" },\n      en: { label: "${label} (EN)", description: "${desc} (EN)" },\n      uz: { label: "${label} (UZ)", description: "${desc} (UZ)" },\n      ky:`;
});

// Sunnah category titles
// { id: "morning", title: "🌅 Утренние Сунны" }
sunnahContent = sunnahContent.replace(/title:\s*"([^"]+)"\s*}/g, (match, title) => {
    return `title: "${title}", translations: { ru: "${title}", en: "${title} (EN)", uz: "${title} (UZ)", ky: "${title} (KY)" } }`;
});

fs.writeFileSync(sunnahPath, sunnahContent);
console.log('sunnah.persistence.ts migrated');
