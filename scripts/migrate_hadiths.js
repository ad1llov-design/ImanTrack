import fs from 'fs';
import path from 'path';

const basePath = path.join(process.cwd(), 'src', 'features', 'hadith', 'data');
const files = ['bukhari.json', 'muslim.json', 'tirmidhi.json', 'nawawi.json'];

for (const file of files) {
  const filePath = path.join(basePath, file);
  if (!fs.existsSync(filePath)) {
    console.log('Skipping', file);
    continue;
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  let data = JSON.parse(content);
  
  let modified = false;
  
  data = data.map(item => {
    if (item.translation && !item.translations) {
      modified = true;
      const translations = {
        ru: item.translation,
        // Since we don't have real translations right now, we will add placeholders 
        // to prove the architecture works and switches instantly as requested.
        en: item.translation + " (EN)",
        uz: item.translation + " (UZ)",
        ky: item.translation + " (KY)"
      };
      
      return {
        id: item.id,
        arabic: item.arabic,
        translations: translations,
        reference: item.reference
      };
    }
    return item;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated structure for ${file}`);
  } else {
    console.log(`No changes needed for ${file}`);
  }
}
