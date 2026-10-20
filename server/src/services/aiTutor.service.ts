import axios from 'axios';
import { config } from '../config';
import { TutorQueryBody } from '../validators/execution.validator';

export interface TutorResponse {
  message: string;
  analogy?: string;
  kindergartenTip?: string;
  source: 'built-in' | 'gemini';
}

export class AiTutorService {
  /**
   * Responds to user tutor queries using built-in knowledge base or optional AI
   */
  public async answer(query: TutorQueryBody): Promise<TutorResponse> {
    // If Gemini is configured and enabled, try AI generation
    if (config.aiProvider === 'gemini' && config.geminiApiKey) {
      try {
        const geminiAnswer = await this.askGemini(query);
        if (geminiAnswer) {
          return {
            message: geminiAnswer,
            source: 'gemini',
          };
        }
      } catch (err: any) {
        console.warn('[Gemini AI Tutor Fallback]:', err.message);
        // Cleanly falls back to built-in kindergarten tutor
      }
    }

    // Built-in kindergarten tutor rules (offline, free, always reliable)
    return this.getBuiltInResponse(query);
  }

  /**
   * Generates response using Gemini REST API
   */
  private async askGemini(query: TutorQueryBody): Promise<string | null> {
    const prompt = `
You are JavaBuddy, a super friendly, warm, patient kindergarten teacher teaching Java programming to a 3-year-old child or absolute beginner.
Guidelines:
1. Explain using simple, warm English and everyday things (toys, puppies, cookies, toy boxes, fruit baskets, coloring books).
2. Never shame the learner. Be encouraging and cheerful.
3. Break things into tiny bite-sized baby steps.
4. If they ask for a hint, do NOT reveal the entire answer immediately. Give a gentle clue.
5. If user code is provided, inspect it gently and point out the tiny fix with love.
6. NEVER claim you executed their code unless the execution status is explicitly provided in the prompt.

Context:
- Lesson: ${query.lessonTitle || query.lessonId || 'Java Basics'}
- Query Type: ${query.queryType}
- User's Current Code:
${query.userCode || '(No code entered yet)'}
- Code Execution Status: ${query.executionOutput?.status || 'Not executed'}
- Compiler / Runtime Output: ${query.executionOutput?.stderr || query.executionOutput?.compileOutput || query.executionOutput?.stdout || 'None'}
- Learner message: ${query.customMessage || ''}

Respond in 2-3 friendly paragraphs with gentle formatting and an analogy.
`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.aiModelName}:generateContent?key=${config.geminiApiKey}`;
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 600,
      },
    };

    const response = await axios.post(url, payload, { timeout: 10000 });
    const candidateText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return candidateText || null;
  }

  /**
   * Built-in kindergarten tutor response library
   */
  public getBuiltInResponse(query: TutorQueryBody): TutorResponse {
    const { queryType, userCode, executionOutput, lessonTitle } = query;
    const lesson = (lessonTitle || '').toLowerCase();

    switch (queryType) {
      case 'eli3':
        if (lesson.includes('variable')) {
          return {
            message: "Imagine you have a plastic toy box with a sticky label on it! If you stick a label saying 'toy' on the box and put a fluffy Teddy Bear inside, whenever you say 'Give me toy!', you get your Teddy Bear! That's all a variable is: a named box for saving your favorite thing!",
            analogy: "📦 Toy Box with a Name Tag",
            kindergartenTip: "String toy = \"Teddy Bear\"; means: make a toy box called 'toy' and put 'Teddy Bear' inside!",
            source: 'built-in',
          };
        }
        if (lesson.includes('loop')) {
          return {
            message: "Think of singing 'Old MacDonald Had a Farm'! Instead of writing the whole song ten times by hand until your hand gets tired, you just tell your music player: 'Play this chorus 5 times!' A loop is like an electric carousel that spins until you say 'Okay, time to get off!'",
            analogy: "🎠 Carousel or Music Replay",
            kindergartenTip: "A loop repeats an action over and over until you reach the target number!",
            source: 'built-in',
          };
        }
        if (lesson.includes('decision') || lesson.includes('if')) {
          return {
            message: "Before going outside, you look out the window. If it's raining, you put on your yellow raincoat! If it's sunny, you put on your sunglasses! Java makes choices the exact same way using the word 'if'.",
            analogy: "🌧️ Checking the weather before putting on boots",
            kindergartenTip: "if (isRaining) { wearRaincoat(); } else { wearSunglasses(); }",
            source: 'built-in',
          };
        }
        if (lesson.includes('method')) {
          return {
            message: "A method is like a juice blender or a toaster! You drop in two slices of bread (inputs), press the button, and out pops yummy warm toast (the return value)! Once you build the toaster, you can make toast whenever you want without building a new toaster each time!",
            analogy: "🍞 Magical Toast Maker",
            kindergartenTip: "Methods do one job well so you can reuse them anytime!",
            source: 'built-in',
          };
        }
        if (lesson.includes('oop') || lesson.includes('class') || lesson.includes('object')) {
          return {
            message: "A 'Class' is like a cookie cutter shaped like a teddy bear. The cutter isn't a real cookie you can eat yet—it's just the shape! But when you press it into dough, you create real 'Objects' (cookies) with sprinkles and chocolate chips!",
            analogy: "🍪 Cookie Cutter vs Real Cookies",
            kindergartenTip: "A Class is the blueprint; an Object is the actual toy built from the blueprint!",
            source: 'built-in',
          };
        }
        return {
          message: "A computer is like a very polite puppy! It doesn't know what to do until you give it a clear, gentle instruction. When you write Java, you are writing friendly instructions on a recipe card for the puppy to read!",
          analogy: "🐶 Teaching a smart puppy tricks",
          kindergartenTip: "Java does exactly what you write, one baby step at a time!",
          source: 'built-in',
        };

      case 'explain_lines':
        return {
          message: `Let's read this code together line by line like a storybook:
1. 'public class Main' — tells Java: "Here is our main clubhouse where our program lives!"
2. '{' — opens the door to the clubhouse so our commands can go inside.
3. 'public static void main(String[] args)' — this is the Big Green Start Button of Java!
4. 'System.out.println(...);' — tells Java to speak words onto the screen!
5. '}' — closes the door so everything stays tidy!`,
          analogy: "📖 Reading a recipe card top to bottom",
          kindergartenTip: "Always follow the curly braces { } to see who belongs inside!",
          source: 'built-in',
        };

      case 'example':
        return {
          message: `Here is a tiny, crystal-clear example you can try right now:

\`\`\`java
public class Main {
    public static void main(String[] args) {
        String petName = "Biscuit";
        int biscuitsEaten = 3;
        System.out.println(petName + " ate " + biscuitsEaten + " cookies!");
    }
}
\`\`\`
Notice how we combined words and numbers with a plus sign (+)? That's called string glue!`,
          analogy: "🎨 Glueing paper crafts together",
          kindergartenTip: "The '+' sign glues words together onto the screen!",
          source: 'built-in',
        };

      case 'hint':
        if (executionOutput?.status === 'Compilation Error') {
          return {
            message: "Check the very end of your lines! Did you remember the tiny period called a semicolon `;`? Also look at your curly braces `{` and `}` to make sure every opened door is closed!",
            analogy: "🚪 Don't leave the front door open when it's cold!",
            kindergartenTip: "Every statement in Java ends with a semicolon `;`",
            source: 'built-in',
          };
        }
        return {
          message: "Look closely at the spelling and capital letters! In Java, 'main' with a lowercase 'm' is different from 'Main' with an uppercase 'M'. Java is very polite but very picky!",
          analogy: "🔤 Capital letters matter in Java!",
          kindergartenTip: "Type carefully and match the sample code step by step.",
          source: 'built-in',
        };

      case 'why_wrong':
        if (executionOutput?.status === 'Compilation Error') {
          return {
            message: `Java told us: "${executionOutput.compileOutput || executionOutput.stderr || 'Syntax check failed'}".
This usually means a tiny typo!
1. Look at the line number mentioned in red.
2. Check if you missed a quotation mark \`"\` or a semicolon \`;\`.
3. Don't worry at all—even astronauts and senior engineers get this error every single day!`,
            analogy: "🔍 Playing detective with clues",
            kindergartenTip: "Mistakes are just clues showing us the way!",
            source: 'built-in',
          };
        }
        return {
          message: "If your output doesn't match what you expected, check what is inside `System.out.println()`. Are you printing the variable name or the literal quotation string?",
          analogy: "🏷️ Tag vs Contents",
          kindergartenTip: "toy prints the contents of the box. \"toy\" prints the word 'toy'!",
          source: 'built-in',
        };

      case 'easier_exercise':
        return {
          message: "Let's take a baby step! Instead of doing everything at once, just try printing one single word on the screen: `System.out.println(\"Hi!\");`. Once you see 'Hi!', you've won this step!",
          analogy: "👣 One tiny baby step first",
          kindergartenTip: "Small steps make giant programmers!",
          source: 'built-in',
        };

      case 'try_again':
      default:
        return {
          message: "You can do this! Take a deep breath, click 'Reset Code' if you want a fresh clean page, and let's try it together. I'm right here cheering for you! 🌟",
          analogy: "🎈 Fresh clean sheet of paper",
          kindergartenTip: "Never be afraid to hit Reset and try again!",
          source: 'built-in',
        };
    }
  }
}

export const aiTutorService = new AiTutorService();
