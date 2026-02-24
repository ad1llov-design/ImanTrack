import fs from 'fs';
import path from 'path';

const dictsDir = path.join(process.cwd(), 'src', 'shared', 'i18n', 'translations');

const additions = {
  ru: {
    "profile.title": "Профиль",
    "profile.about_app": "О приложении",
    "profile.app_name": "Название",
    "profile.version": "Версия",
    "profile.description": "Описание",
    "profile.sections": "Разделы",
    "profile.contacts": "Контакты",
    "profile.contact_prompt": "Есть предложения или нашли ошибку? Свяжитесь с нами через Telegram.",
    "sunnah.revival": "Оживление Сунны",
    "sunnah.good_deeds": "Благие Дела",
    "sunnah.description": "Простые действия Пророка (мир ему и благословение), которые меняют сердце и мир вокруг.",
    "adhkar.title": "Азкары и Зикры",
    "adhkar.subtitle": "Поминание Аллаха — покой для сердца",
    "adhkar.quran_quote": "«Поистине, поминанием Аллаха утешаются сердца» (13:28)",
    "adhkar.dua_quote": "«Господь наш! Прими от нас, ведь Ты — Слышащий, Знающий» (2:127)"
  },
  en: {
    "profile.title": "Profile",
    "profile.about_app": "About App",
    "profile.app_name": "Name",
    "profile.version": "Version",
    "profile.description": "Description",
    "profile.sections": "Sections",
    "profile.contacts": "Contacts",
    "profile.contact_prompt": "Have suggestions or found a bug? Contact us via Telegram.",
    "sunnah.revival": "Sunnah Revival",
    "sunnah.good_deeds": "Good Deeds",
    "sunnah.description": "Simple actions of the Prophet (peace be upon him) that change the heart and the world around.",
    "adhkar.title": "Adhkars and Dhikrs",
    "adhkar.subtitle": "Remembrance of Allah is peace for the heart",
    "adhkar.quran_quote": "«Verily, in the remembrance of Allah do hearts find rest» (13:28)",
    "adhkar.dua_quote": "«Our Lord! Accept from us, indeed You are the Hearing, the Knowing» (2:127)"
  },
  uz: {
    "profile.title": "Profil",
    "profile.about_app": "Ilova haqida",
    "profile.app_name": "Nomi",
    "profile.version": "Versiyasi",
    "profile.description": "Tavsifi",
    "profile.sections": "Bo'limlar",
    "profile.contacts": "Aloqa",
    "profile.contact_prompt": "Takliflaringiz bormi yoki xato topdingizmi? Biz bilan Telegram orqali bog'laning.",
    "sunnah.revival": "Sunnatni tiriltirish",
    "sunnah.good_deeds": "Yaxshi amallar",
    "sunnah.description": "Payg'ambarimiz (s.a.v.)ning qalbni va atrofni o'zgartiruvchi oddiy amallari.",
    "adhkar.title": "Azkarlar va Zikrlar",
    "adhkar.subtitle": "Allohni zikr qilish — qalb osoyishtaligidir",
    "adhkar.quran_quote": "«Bilingki, Allohni zikr qilish bilan qalblar orom olur» (13:28)",
    "adhkar.dua_quote": "«Rabbimiz! Bizdan qabul et, albatta, Sen Eshituvchi, Biluvchisan» (2:127)"
  },
  ky: {
    "profile.title": "Профиль",
    "profile.about_app": "Тиркеме жөнүндө",
    "profile.app_name": "Аталышы",
    "profile.version": "Версиясы",
    "profile.description": "Сүрөттөмөсү",
    "profile.sections": "Бөлүмдөр",
    "profile.contacts": "Байланыш",
    "profile.contact_prompt": "Сунуштар барбы же ката таптыңызбы? Биз менен Telegram аркылуу байланышыңыз.",
    "sunnah.revival": "Сүннөттү жандандыруу",
    "sunnah.good_deeds": "Жакшы иштер",
    "sunnah.description": "Пайгамбарыбыздын (с.а.в) жүрөктү жана айлананы өзгөрткөн жөнөкөй амалдары.",
    "adhkar.title": "Азкарлар жана Зикирлер",
    "adhkar.subtitle": "Аллахты эстөө — жүрөктүн тынчтыгы",
    "adhkar.quran_quote": "«Чындыгында, Аллахты эстөө менен жүрөктөр тынчтанат» (13:28)",
    "adhkar.dua_quote": "«Оо, Раббибиз! Бизден кабыл кыл, чындыгында, Сен Угуучу, Билүүчүсүң» (2:127)"
  }
};

const files = ['ru', 'en', 'uz', 'ky'];

files.forEach(lang => {
  const filePath = path.join(dictsDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;
  
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const newContent = { ...content, ...additions[lang] };
  
  fs.writeFileSync(filePath, JSON.stringify(newContent, null, 2));
  console.log(`Updated ${lang}.json`);
});
