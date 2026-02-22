import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    
    // If no API key, return a mock response that still uses the context to prove the logic
    if (!apiKey) {
      const prayers = context?.prayers ? Object.values(context.prayers).filter(Boolean).length : 0;
      const sunnahs = context?.sunnah_actions ? context.sunnah_actions.length : 0;
      
      const mockReply = `Это демо-ответ (OPENAI_API_KEY не установлен). Я получил ваше сообщение: "${message}". Я вижу, что сегодня вы выполнили ${prayers} фарз-намазов и ${sunnahs} действий сунны. МашаАллах!`;
      
      return NextResponse.json({ reply: mockReply });
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
