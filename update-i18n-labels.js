const fs = require('fs');

const labels = {
    ru: {
        "sunnah_details.label_what": "Суть сунны:",
        "sunnah_details.label_history": "Исторический контекст:",
        "sunnah_details.label_why": "Почему это сунна:",
        "sunnah_details.label_spiritual": "Духовная польза:",
        "sunnah_details.label_health": "Влияние на здоровье:",
        "sunnah_details.label_hadith": "Краткий хадис:",
        "sunnah_details.btn_expand": "Подробности",
        "sunnah_details.btn_collapse": "Свернуть"
    },
    en: {
        "sunnah_details.label_what": "What is this Sunnah:",
        "sunnah_details.label_history": "Historical Context:",
        "sunnah_details.label_why": "Why it is a Sunnah:",
        "sunnah_details.label_spiritual": "Spiritual Benefits:",
        "sunnah_details.label_health": "Health Impact:",
        "sunnah_details.label_hadith": "Hadith:",
        "sunnah_details.btn_expand": "Details",
        "sunnah_details.btn_collapse": "Collapse"
    },
    uz: {
        "sunnah_details.label_what": "Sunnatning mohiyati:",
        "sunnah_details.label_history": "Tarixiy jarayon:",
        "sunnah_details.label_why": "Nima uchun bu sunnat:",
        "sunnah_details.label_spiritual": "Ruhiy foydasi:",
        "sunnah_details.label_health": "Sog'liqqa ham ta'siri:",
        "sunnah_details.label_hadith": "Qisqa hadis:",
        "sunnah_details.btn_expand": "Batafsil",
        "sunnah_details.btn_collapse": "Yopish"
    },
    ky: {
        "sunnah_details.label_what": "Сүннөттүн мааниси:",
        "sunnah_details.label_history": "Тарыхый контекст:",
        "sunnah_details.label_why": "Эмне үчүн бул сүннөт:",
        "sunnah_details.label_spiritual": "Руханий пайдасы:",
        "sunnah_details.label_health": "Ден-соолукка таасири:",
        "sunnah_details.label_hadith": "Кыска хадис:",
        "sunnah_details.btn_expand": "Толук маалымат",
        "sunnah_details.btn_collapse": "Жабуу"
    }
};

const langs = ['ru', 'en', 'uz', 'ky'];

langs.forEach(lang => {
    const existingFile = fs.readFileSync(`src/shared/i18n/translations/${lang}.json`, 'utf8');
    const existingJson = JSON.parse(existingFile);
    for (const [k, v] of Object.entries(labels[lang])) {
        if (v) existingJson[k] = v;
    }
    
    fs.writeFileSync(`src/shared/i18n/translations/${lang}.json`, JSON.stringify(existingJson, null, 2));
    console.log(`Updated labels for ${lang}`);
});
