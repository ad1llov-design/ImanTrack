import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    
    // If no API key, return a smart contextual mock response
    if (!apiKey) {
      const prayers = context?.prayers ? Object.values(context.prayers).filter(Boolean).length : 0;
      const sunnahs = context?.sunnah_actions ? context.sunnah_actions.length : 0;
      const totalPrayers = 5;
      const remaining = totalPrayers - prayers;
      
      let advice = "";
      
      if (prayers === 0) {
        advice = `Ассаламу алейкум! Я вижу, что сегодня вы ещё не отметили ни одного намаза. Не переживайте — начните с ближайшего фарда. Пророк ﷺ сказал: «Первое, за что будет спрошен раб в День Суда — это намаз». ИншаАллах, каждый шаг приближает вас к Аллаху.`;
      } else if (prayers < 3) {
        advice = `МашаАллах, вы выполнили ${prayers} из 5 намазов! Осталось ${remaining}. Совет: поставьте напоминание за 10 минут до каждого намаза. Пророк ﷺ сказал: «Между человеком и неверием стоит оставление намаза».`;
      } else if (prayers < 5) {
        advice = `Отлично, ${prayers} намазов выполнено! Осталось совсем немного — ещё ${remaining}. Вы на правильном пути. Попробуйте также добавить 2 ракаата сунны-раватиб.`;
      } else {
        advice = `МашаАллах, все 5 намазов выполнены! 🎉 Это великое достижение. Попробуйте сегодня добавить сунны-раватиб (12 ракаатов). Пророк ﷺ обещал за это дом в Раю!`;
      }
      
      if (sunnahs > 0) {
        advice += ` Также вижу, что вы выполнили ${sunnahs} действий сунны — продолжайте в том же духе!`;
      }
      
      advice += "\n\n_(Для более умных ответов добавьте OPENAI_API_KEY в .env файл)_";
      
      return NextResponse.json({ reply: advice });
    }

    // Call OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Ты Исламский духовный ассистент ImanTrack. Будь мягким, используй исламские термины (иншаАллах, машаАллах). Давай короткие мотивационные советы." },
          { role: "system", content: `Текущий прогресс пользователя сегодня: ${JSON.stringify(context || {})}` },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Извините, я не смог сформулировать ответ.";
    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Assistant API Error:", error);
    return NextResponse.json({ reply: "Произошла внутренняя ошибка сервера." }, { status: 500 });
  }
}
