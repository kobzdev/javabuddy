export interface TutorResponse {
  message: string;
  analogy?: string;
  kindergartenTip?: string;
  source: 'built-in' | 'gemini';
}

function getBuiltInResponse(query: any): TutorResponse {
  const type = query?.queryType;
  const lesson = query?.lessonId || query?.lessonTitle || '';
  const code = query?.userCode || '';

  if (type === 'eli3') {
    if (lesson.includes('variable') || lesson.includes('box')) {
      return {
        message: "Think of variables like colored shoeboxes in your playroom! Each box has a name written on the front (like `score` or `candyCount`), and you put toys or numbers inside it.",
        analogy: "📦 Variables = Named Toy Boxes",
        kindergartenTip: "Java needs to know what kind of toy goes in the box first (like `int` for whole numbers)!",
        source: 'built-in',
      };
    }
    if (lesson.includes('loop') || lesson.includes('repeat')) {
      return {
        message: "A loop is like singing your favorite nursery rhyme choruses 5 times! Instead of saying 'sing chorus, sing chorus, sing chorus', you just tell Java: 'Repeat this 5 times!'.",
        analogy: "🎡 Loops = A Merry-Go-Round",
        kindergartenTip: "Always make sure the merry-go-round knows when to stop so it doesn't spin forever!",
        source: 'built-in',
      };
    }
    if (lesson.includes('if') || lesson.includes('condition')) {
      return {
        message: "An `if` statement is like looking out your window in the morning: IF it is raining 🌧️, then grab your umbrella ☔! Otherwise, wear your sunglasses 🕶️!",
        analogy: "🚦 If/Else = Traffic Lights",
        kindergartenTip: "Conditions always ask a YES or NO question (true or false).",
        source: 'built-in',
      };
    }
    return {
      message: "Java is like writing a recipe card for a friendly little cooking robot. Every instruction must be super clear, ending with a little semicolon dot-and-tail `;`!",
      analogy: "🤖 Java = Polite Robot Instructions",
      kindergartenTip: "Take it one step at a time, just like building with Lego bricks!",
      source: 'built-in',
    };
  }

  if (type === 'hint') {
    return {
      message: "Here is a gentle hint: Look at the last line you typed. Did you close all your quotes `\"` and curly brackets `}`? Every opening hug `{` needs a closing hug `}`!",
      analogy: "🔍 Clue: Check matching pairs!",
      kindergartenTip: "Semicolons `;` belong at the end of statement lines, but not right after `public class Main` or `public static void main`!",
      source: 'built-in',
    };
  }

  if (type === 'why_wrong') {
    return {
      message: "Don't worry at all! Even grandmaster programmers see errors all day long. Look closely at line numbers mentioned in the red box. Usually it's just a tiny missing `;` or a lowercase letter that should be Capital!",
      analogy: "🧩 Missing Puzzle Piece",
      kindergartenTip: "In Java, `system` is not the same as `System`. Capital letters matter!",
      source: 'built-in',
    };
  }

  return {
    message: "I am right here with you! You are doing fantastic. Read the code out loud like a bedtime story, and the answer will pop right out!",
    analogy: "🧸 You've got this!",
    kindergartenTip: "Keep experimenting! You can't break anything here.",
    source: 'built-in',
  };
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      app: 'JavaBuddy AI Kindergarten Tutor',
      provider: process.env.AI_PROVIDER || 'built-in',
    });
  }

  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }

    const aiProvider = process.env.AI_PROVIDER || 'disabled';
    const geminiApiKey = process.env.GEMINI_API_KEY || '';
    const aiModelName = process.env.AI_MODEL_NAME || 'gemini-2.0-flash';

    if (aiProvider === 'gemini' && geminiApiKey) {
      try {
        const prompt = `You are JavaBuddy, a patient kindergarten teacher explaining Java to a 3-year-old.
Query: ${body?.queryType}
Lesson: ${body?.lessonTitle || body?.lessonId || 'Java'}
User Code: ${body?.userCode || 'None'}
User Question: ${body?.customMessage || ''}
Keep it warm, encouraging, short, and use everyday toy analogies.`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${aiModelName}:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
            }),
          }
        );
        const data = await geminiRes.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return res.status(200).json({
            message: text,
            source: 'gemini',
          });
        }
      } catch {
        // Fall through to built-in response
      }
    }

    const builtIn = getBuiltInResponse(body);
    return res.status(200).json(builtIn);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
