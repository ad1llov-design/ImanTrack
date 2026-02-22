const fs = require('fs');
const iconv = require('iconv-lite');

const files = [
  "src/app/auth/login/page.tsx",
  "src/app/prayer/page.tsx",
  "src/app/tracker/page.tsx",
  "src/app/page.tsx",
  "src/app/(protected)/layout.tsx",
  "src/app/hadith/page.tsx",
  "src/app/design-system/page.tsx",
  "src/app/adhkar/page.tsx",
  "src/app/adhkar/[category]/page.tsx"
];

for (let file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('Р') || content.includes('ШЁШіЩ…') || content.includes('в†’') || content.includes('Р’РѕР№С‚Рё')) { 
    let buf = iconv.encode(content, 'win1251');
    let original = buf.toString('utf8');
    if (original.startsWith('?')) {
        original = original.substring(1);
    }
    fs.writeFileSync(file, original, 'utf8');
    console.log("Fixed", file);
  } else {
    console.log("Skipped", file);
  }
}
