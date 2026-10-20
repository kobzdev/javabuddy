import { Lesson } from '../types';

export const LESSONS: Lesson[] = [
  // =========================================================================
  // LEVEL 1: My First Java Program
  // =========================================================================
  {
    id: 'level-1-first-program',
    level: 1,
    title: 'My First Java Program',
    subtitle: 'Saying Hello to the Computer World!',
    badgeIcon: '👋',
    xpReward: 50,
    objective: 'Learn how to ask Java to say "Hello" on the screen using System.out.println().',
    storyAnalogy: {
      title: 'Teaching a Smart Puppy Its First Word',
      story: 'Imagine you adopted a super smart robotic puppy named Java! At first, Java sits quietly waiting for instructions. When you gently whisper System.out.println("Hello, world!"), Java perks up its ears and barks "Hello, world!" right onto your screen!',
      emoji: '🐶',
    },
    simpleExplanation: 'Programming simply means writing a list of friendly steps for a computer to follow. Java is one of the most famous computer languages on Earth. To make words appear on the screen, we put our words inside double quotes (" ") and pass them to System.out.println().',
    codeSnippet: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}`,
    lineByLine: [
      { line: 'public class Main {', explanation: 'This builds our Clubhouse called Main where our instructions live.' },
      { line: 'public static void main(String[] args) {', explanation: 'This is the Big Green Start Button! Java always begins reading right here.' },
      { line: 'System.out.println("Hello, world!");', explanation: 'Prints the friendly greeting onto the screen. Semicolon (;) is the period at the end!' },
      { line: '}', explanation: 'Closes the door of our main start button.' },
      { line: '}', explanation: 'Closes the main clubhouse door.' },
    ],
    visualDemo: {
      title: 'How Java Speaks to You',
      type: 'boxes',
      items: [
        { label: 'Your Words', value: '"Hello, world!"', description: 'Wrapped inside quotation marks', color: 'purple' },
        { label: 'The Mouth', value: 'System.out.println()', description: 'The speaker that prints to screen', color: 'blue' },
        { label: 'Screen Output', value: 'Hello, world!', description: 'What everyone sees!', color: 'green' },
      ],
    },
    sampleOutput: 'Hello, world!',
    guidedExercise: {
      instruction: 'Change the greeting message so Java says "Hello, little programmer!" instead.',
      starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}`,
      solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, little programmer!");
    }
}`,
      expectedOutput: 'Hello, little programmer!',
      hints: [
        'Find the words inside the double quotation marks ("...").',
        'Replace "Hello, world!" with "Hello, little programmer!".',
        'Make sure you keep the quotation marks and the semicolon ; at the end!',
      ],
    },
    independentChallenge: {
      instruction: 'Write a program with two lines: first print "Welcome to Java!", then on the next line print "I am ready to code!".',
      starterCode: `public class Main {
    public static void main(String[] args) {
        // Write your two System.out.println statements here!
    }
}`,
      solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to Java!");
        System.out.println("I am ready to code!");
    }
}`,
      expectedOutput: "Welcome to Java!\nI am ready to code!",
      hints: [
        'Use two System.out.println(...) statements one below the other.',
        'Don\'t forget semicolons ; on both lines!',
      ],
    },
    quiz: [
      {
        id: 'q1-1',
        question: 'What punctuation mark goes at the end of every Java sentence?',
        options: ['A question mark (?)', 'A semicolon (;)', 'An exclamation mark (!)', 'A smiley face :-)'],
        correctIndex: 1,
        explanation: 'Every Java instruction ends with a semicolon (;). It is just like a period at the end of a sentence in an English book!',
        wrongExplanation: 'In Java, sentences must finish with a semicolon (;), otherwise Java gets confused and won\'t know where your command ends.',
      },
      {
        id: 'q1-2',
        question: 'Why do we put quotation marks (" ") around words in Java?',
        options: ['To tell Java these are words to read, not commands', 'To make the text look pretty', 'Because the computer is whispering', 'To delete the text'],
        correctIndex: 0,
        explanation: 'Quotation marks tell Java: "Hey, these are literal words to show on screen, not secret computer keywords!"',
        wrongExplanation: 'Without quotation marks, Java thinks the words are special computer commands or variable names.',
      },
      {
        id: 'q1-3',
        question: 'What is the "Big Green Start Button" method where every Java program starts running?',
        options: ['public static void main(String[] args)', 'public static void cookPancakes()', 'System.out.exit()', 'class Playground'],
        correctIndex: 0,
        explanation: 'The "main" method is where Java always begins reading your program!',
        wrongExplanation: 'Java looks for public static void main(String[] args) to start executing instructions.',
      },
    ],
    nextLessonId: 'level-2-variables',
  },

  // =========================================================================
  // LEVEL 2: Variables and Data Types
  // =========================================================================
  {
    id: 'level-2-variables',
    level: 2,
    title: 'Variables and Data Types',
    subtitle: 'Labeled Toy Boxes for Your Favorite Things',
    badgeIcon: '📦',
    prerequisiteId: 'level-1-first-program',
    xpReward: 60,
    objective: 'Understand how variables work as labeled storage boxes (String, int, double, boolean).',
    storyAnalogy: {
      title: 'The Magical Toy Box with Sticky Labels',
      story: 'Imagine you have clear plastic bins in your playroom. You put a sticker on one bin that says "favoriteToy" and place your Teddy Bear inside. Whenever your friend asks, "What is favoriteToy?", you show them your Teddy Bear! If you change it to a Robot tomorrow, the label stays, but the toy changes!',
      emoji: '🧸',
    },
    simpleExplanation: 'A variable is a labeled container in the computer memory. Different types of things go in different bins: String holds words, int holds whole counting numbers (like 5 apples), double holds numbers with decimals (like 3.50 dollars), and boolean holds true or false.',
    codeSnippet: `public class Main {
    public static void main(String[] args) {
        String toyName = "Teddy Bear";
        int toyAge = 2;
        double toyPrice = 14.99;
        boolean isSoft = true;
        
        System.out.println("My toy is: " + toyName);
        System.out.println("It costs $" + toyPrice);
    }
}`,
    lineByLine: [
      { line: 'String toyName = "Teddy Bear";', explanation: 'Creates a word box labeled toyName and stores "Teddy Bear".' },
      { line: 'int toyAge = 2;', explanation: 'Creates a counting number box labeled toyAge holding the integer 2.' },
      { line: 'double toyPrice = 14.99;', explanation: 'Creates a decimal number box labeled toyPrice holding 14.99.' },
      { line: 'boolean isSoft = true;', explanation: 'Creates a true/false switch box labeled isSoft set to true.' },
      { line: 'System.out.println("My toy is: " + toyName);', explanation: 'The plus (+) sign acts like paper glue to combine words with our box contents!' },
    ],
    visualDemo: {
      title: 'Your Toy Box Organizer',
      type: 'boxes',
      items: [
        { label: 'String toyName', value: '"Teddy Bear"', description: 'Text in quotes', color: 'purple' },
        { label: 'int toyAge', value: '2', description: 'Whole counting number', color: 'blue' },
        { label: 'double toyPrice', value: '14.99', description: 'Decimal number with cents', color: 'yellow' },
        { label: 'boolean isSoft', value: 'true', description: 'True or False switch', color: 'green' },
      ],
    },
    sampleOutput: "My toy is: Teddy Bear\nIt costs $14.99",
    guidedExercise: {
      instruction: 'Change toyName to "Rocket Ship" and change toyAge to 5.',
      starterCode: `public class Main {
    public static void main(String[] args) {
        String toyName = "Teddy Bear";
        int toyAge = 2;
        System.out.println(toyName + " is " + toyAge + " years old!");
    }
}`,
      solutionCode: `public class Main {
    public static void main(String[] args) {
        String toyName = "Rocket Ship";
        int toyAge = 5;
        System.out.println(toyName + " is " + toyAge + " years old!");
    }
}`,
      expectedOutput: 'Rocket Ship is 5 years old!',
      hints: [
        'Replace "Teddy Bear" with "Rocket Ship" (keep the double quotes!).',
        'Replace 2 with 5 (numbers do not need quotes).',
      ],
    },
    independentChallenge: {
      instruction: 'Create an int variable called apples with value 10, then print "I have 10 apples!".',
      starterCode: `public class Main {
    public static void main(String[] args) {
        // 1. Create an int variable called apples
        // 2. Print "I have " + apples + " apples!"
    }
}`,
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int apples = 10;
        System.out.println("I have " + apples + " apples!");
    }
}`,
      expectedOutput: 'I have 10 apples!',
      hints: [
        'Write: int apples = 10;',
        'Then use System.out.println("I have " + apples + " apples!");',
      ],
    },
    quiz: [
      {
        id: 'q2-1',
        question: 'Which type of box should you use to store a person\'s name, like "Emma"?',
        options: ['int', 'double', 'String', 'boolean'],
        correctIndex: 2,
        explanation: 'String is used for words, letters, and sentences in Java!',
        wrongExplanation: 'int is for whole numbers, double is for decimals, and boolean is for true/false. Use String for words!',
      },
      {
        id: 'q2-2',
        question: 'What does a boolean box hold?',
        options: ['Only true or false', 'Any whole number', 'A list of words', 'Decimals with cents'],
        correctIndex: 0,
        explanation: 'A boolean is like a light switch with only two states: true or false (ON or OFF)!',
        wrongExplanation: 'Booleans only store true or false.',
      },
      {
        id: 'q2-3',
        question: 'What happens when you use the plus sign (+) between a String and a number?',
        options: ['It crashes the computer', 'It glues them together into one sentence', 'It subtracts them', 'It erases the number'],
        correctIndex: 1,
        explanation: 'In Java, the plus sign (+) concatenates (glues) text and numbers together like magic glue!',
        wrongExplanation: 'The + operator between a String and another value glues them into a single string.',
      },
    ],
    nextLessonId: 'level-3-decisions',
  },

  // =========================================================================
  // LEVEL 3: Decisions (if / else)
  // =========================================================================
  {
    id: 'level-3-decisions',
    level: 3,
    title: 'Decisions: If and Else',
    subtitle: 'Teaching Java How to Make Smart Choices',
    badgeIcon: '🚦',
    prerequisiteId: 'level-2-variables',
    xpReward: 70,
    objective: 'Make Java choose between two paths using if, else if, and else.',
    storyAnalogy: {
      title: 'Looking Outside Before Putting on Shoes',
      story: 'Every morning before going to the playground, you look out the window. IF it is raining, you put on your yellow raincoat and rubber boots! ELSE (if it is sunny), you put on your sunglasses and sneakers! Your brain makes choices based on conditions, and Java can do the exact same thing!',
      emoji: '🌦️',
    },
    simpleExplanation: 'An "if" statement asks a yes/no question. If the answer is true, Java runs the code inside the curly brackets { }. If the answer is false, Java skips ahead to the "else" branch.',
    codeSnippet: `public class Main {
    public static void main(String[] args) {
        int coins = 5;
        int candyCost = 3;

        if (coins >= candyCost) {
            System.out.println("Yummy! I have enough coins to buy the candy!");
        } else {
            System.out.println("Oh no! I need to save more coins first.");
        }
    }
}`,
    lineByLine: [
      { line: 'if (coins >= candyCost) {', explanation: 'Asks: Are our coins greater than or equal to the candy price?' },
      { line: 'System.out.println("Yummy!...");', explanation: 'Runs ONLY if the condition was TRUE.' },
      { line: '} else {', explanation: 'The backup plan that runs if the question was FALSE.' },
      { line: 'System.out.println("Oh no!...");', explanation: 'Runs ONLY if we didn\'t have enough coins.' },
      { line: '}', explanation: 'Closes the decision branch.' },
    ],
    visualDemo: {
      title: 'The Fork in the Road',
      type: 'decision-tree',
      items: [
        { label: 'Condition Question', value: 'coins >= 3 ?', description: '5 >= 3 is TRUE!', color: 'yellow' },
        { label: 'Green Path (TRUE)', value: 'Buy Candy 🍬', description: 'This block executes', color: 'green' },
        { label: 'Red Path (FALSE)', value: 'Save Coins 🐷', description: 'Skipped safely', color: 'purple' },
      ],
    },
    sampleOutput: 'Yummy! I have enough coins to buy the candy!',
    guidedExercise: {
      instruction: 'Change coins to 1 so the program goes into the "else" branch instead.',
      starterCode: `public class Main {
    public static void main(String[] args) {
        int coins = 5;
        int candyCost = 3;

        if (coins >= candyCost) {
            System.out.println("Yummy! I have enough coins to buy the candy!");
        } else {
            System.out.println("Oh no! I need to save more coins first.");
        }
    }
}`,
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int coins = 1;
        int candyCost = 3;

        if (coins >= candyCost) {
            System.out.println("Yummy! I have enough coins to buy the candy!");
        } else {
            System.out.println("Oh no! I need to save more coins first.");
        }
    }
}`,
      expectedOutput: 'Oh no! I need to save more coins first.',
      hints: [
        'Change the line int coins = 5; to int coins = 1;.',
        'Now 1 >= 3 is false, so Java will jump directly to the else part!',
      ],
    },
    independentChallenge: {
      instruction: 'Check if an int age is 18 or older. If it is, print "You are a grown-up!". Else, print "You are still growing!". Set age to 20.',
      starterCode: `public class Main {
    public static void main(String[] args) {
        int age = 20;
        // Write your if-else statement here!
    }
}`,
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int age = 20;
        if (age >= 18) {
            System.out.println("You are a grown-up!");
        } else {
            System.out.println("You are still growing!");
        }
    }
}`,
      expectedOutput: 'You are a grown-up!',
      hints: [
        'Use if (age >= 18) { ... } else { ... }',
        'Print the exact phrases required.',
      ],
    },
    quiz: [
      {
        id: 'q3-1',
        question: 'Which comparison symbol means "is equal to" in Java?',
        options: ['=', '==', '===', 'equals?'],
        correctIndex: 1,
        explanation: 'In Java, a single = is for assigning a value to a box, but a double == checks if two things are equal!',
        wrongExplanation: 'Single = assigns a value. Double == compares two values!',
      },
      {
        id: 'q3-2',
        question: 'When does the code inside an "else" block run?',
        options: ['Always, every time', 'Only when the if condition is false', 'Only on weekends', 'Never'],
        correctIndex: 1,
        explanation: '"else" is the backup plan! It only runs when the "if" test turns out to be false.',
        wrongExplanation: 'The else block only executes if the initial if check evaluated to false.',
      },
      {
        id: 'q3-3',
        question: 'Which operator checks if BOTH things are true at the same time?',
        options: ['&&', '||', '!', '++'],
        correctIndex: 0,
        explanation: '&& (AND) requires both sides to be true, like: (isWeekend && hasIceCream).',
        wrongExplanation: '|| means OR (either one can be true). && means AND (both must be true).',
      },
    ],
    nextLessonId: 'level-4-loops',
  },

  // =========================================================================
  // LEVEL 4: Loops
  // =========================================================================
  {
    id: 'level-4-loops',
    level: 4,
    title: 'Loops: The Merry-Go-Round',
    subtitle: 'Repeating Fun Actions Without Getting Tired',
    badgeIcon: '🎠',
    prerequisiteId: 'level-3-decisions',
    xpReward: 80,
    objective: 'Use for and while loops to repeat actions easily.',
    storyAnalogy: {
      title: 'Counting Apples for the Apple Pie',
      story: 'If grandma asks you to put 5 shiny red apples into the pie bowl, you don\'t call 5 different people. You take 1 apple, drop it in, count "1!". Take another, count "2!". When you reach 5, you stop and shout "All done!" A loop is just your computer counting and repeating an action for you!',
      emoji: '🍎',
    },
    simpleExplanation: 'Instead of copy-pasting the same line of code 100 times, a loop tells Java: "Start at 1, do this command, add 1, and keep going until you hit the limit!"',
    codeSnippet: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            System.out.println("Apple number: " + i);
        }
        System.out.println("Pie is ready!");
    }
}`,
    lineByLine: [
      { line: 'for (int i = 1; i <= 3; i++) {', explanation: 'Start counter i at 1. Keep looping while i <= 3. Add 1 each lap (i++).' },
      { line: 'System.out.println("Apple number: " + i);', explanation: 'Runs on every lap of the carousel with the current lap number!' },
      { line: '}', explanation: 'Jumps back to the top to check if we reached 3 yet.' },
      { line: 'System.out.println("Pie is ready!");', explanation: 'Runs once the loop is completely finished!' },
    ],
    visualDemo: {
      title: 'The Loop Carousel',
      type: 'carousel',
      items: [
        { label: 'Lap 1', value: 'i = 1', description: 'Prints "Apple number: 1"', color: 'purple' },
        { label: 'Lap 2', value: 'i = 2', description: 'Prints "Apple number: 2"', color: 'blue' },
        { label: 'Lap 3', value: 'i = 3', description: 'Prints "Apple number: 3"', color: 'yellow' },
        { label: 'Stop!', value: 'i = 4 > 3', description: 'Carousel stops and finishes!', color: 'green' },
      ],
    },
    sampleOutput: "Apple number: 1\nApple number: 2\nApple number: 3\nPie is ready!",
    guidedExercise: {
      instruction: 'Change the loop limit so it counts from 1 up to 5 apples instead of 3.',
      starterCode: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            System.out.println("Apple number: " + i);
        }
    }
}`,
      solutionCode: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.println("Apple number: " + i);
        }
    }
}`,
      expectedOutput: "Apple number: 1\nApple number: 2\nApple number: 3\nApple number: 4\nApple number: 5",
      hints: [
        'Find the condition inside the for loop: i <= 3.',
        'Change the number 3 to 5.',
      ],
    },
    independentChallenge: {
      instruction: 'Write a while loop that starts with int countdown = 3; and prints the number, decreasing by 1 each time (countdown--), then prints "Blastoff!" when it hits 0.',
      starterCode: `public class Main {
    public static void main(String[] args) {
        int countdown = 3;
        // Write while (countdown > 0) loop here
        
        System.out.println("Blastoff!");
    }
}`,
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int countdown = 3;
        while (countdown > 0) {
            System.out.println(countdown);
            countdown--;
        }
        System.out.println("Blastoff!");
    }
}`,
      expectedOutput: "3\n2\n1\nBlastoff!",
      hints: [
        'Inside the while loop: System.out.println(countdown); countdown--;',
        'Make sure to decrease countdown so the loop stops!',
      ],
    },
    quiz: [
      {
        id: 'q4-1',
        question: 'What does "i++" mean inside a for loop?',
        options: ['Add 1 to i', 'Multiply i by 2', 'Reset i to zero', 'Print i in green'],
        correctIndex: 0,
        explanation: 'i++ is short for "add 1 to i" (also written as i = i + 1).',
        wrongExplanation: 'i++ is the increment operator, which increases the counter by 1.',
      },
      {
        id: 'q4-2',
        question: 'What happens if a loop\'s condition NEVER becomes false?',
        options: ['The computer turns into gold', 'An infinite loop runs forever until stopped', 'It finishes in one millisecond', 'It deletes your program'],
        correctIndex: 1,
        explanation: 'An infinite loop keeps spinning forever because it never gets the signal to stop! Always make sure your loop counter advances.',
        wrongExplanation: 'Without a stop condition, the loop continues indefinitely.',
      },
      {
        id: 'q4-3',
        question: 'What keyword can you use to immediately jump OUT of a loop early?',
        options: ['break', 'freeze', 'stopItPlease', 'jump'],
        correctIndex: 0,
        explanation: 'The "break" keyword tells Java: "Emergency exit! Hop off the carousel right now!"',
        wrongExplanation: 'break immediately terminates the innermost loop.',
      },
    ],
    nextLessonId: 'level-5-collections',
  },

  // =========================================================================
  // LEVEL 5: Collections and Arrays
  // =========================================================================
  {
    id: 'level-5-collections',
    level: 5,
    title: 'Collections: Fruit Baskets',
    subtitle: 'Holding Lots of Goodies in One Big Basket',
    badgeIcon: '🧺',
    prerequisiteId: 'level-4-loops',
    xpReward: 90,
    objective: 'Store multiple items using Arrays and ArrayLists, and understand 0-indexed slots.',
    storyAnalogy: {
      title: 'The Egg Carton with Numbered Cups',
      story: 'Instead of balancing 6 loose eggs in your hands and dropping them on the kitchen floor, you put them in an egg carton! But there is a funny secret about Java\'s egg carton: Java starts counting the cups starting from CUP 0, not Cup 1! So the very first egg is in cup [0]!',
      emoji: '🥚',
    },
    simpleExplanation: 'An Array holds a fixed list of items of the same type. An ArrayList is like a stretchy magic basket where you can add as many items as you want anytime using .add()!',
    codeSnippet: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Cherry");

        System.out.println("First fruit: " + fruits.get(0));
        System.out.println("Total fruits in basket: " + fruits.size());
    }
}`,
    lineByLine: [
      { line: 'ArrayList<String> fruits = new ArrayList<>();', explanation: 'Creates our magical stretchy basket named fruits.' },
      { line: 'fruits.add("Apple");', explanation: 'Puts an "Apple" in slot 0.' },
      { line: 'fruits.add("Banana");', explanation: 'Puts a "Banana" in slot 1.' },
      { line: 'fruits.add("Cherry");', explanation: 'Puts a "Cherry" in slot 2.' },
      { line: 'fruits.get(0)', explanation: 'Retrieves the item in the first slot (0).' },
      { line: 'fruits.size()', explanation: 'Counts how many items are currently in the basket.' },
    ],
    visualDemo: {
      title: 'The 0-Indexed Fruit Basket',
      type: 'fruit-basket',
      items: [
        { label: 'Slot [0]', value: '🍎 Apple', description: 'First item!', color: 'purple' },
        { label: 'Slot [1]', value: '🍌 Banana', description: 'Second item', color: 'yellow' },
        { label: 'Slot [2]', value: '🍒 Cherry', description: 'Third item', color: 'blue' },
      ],
    },
    sampleOutput: "First fruit: Apple\nTotal fruits in basket: 3",
    guidedExercise: {
      instruction: 'Add a 4th fruit "Orange" to the basket and print the fruit at slot [3].',
      starterCode: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Cherry");

        // 1. Add "Orange"
        // 2. Print fruits.get(3)
    }
}`,
      solutionCode: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Cherry");
        fruits.add("Orange");

        System.out.println(fruits.get(3));
    }
}`,
      expectedOutput: 'Orange',
      hints: [
        'Use fruits.add("Orange");',
        'Then print with System.out.println(fruits.get(3));',
      ],
    },
    independentChallenge: {
      instruction: 'Create an array of 3 numbers: int[] numbers = {10, 20, 30}; and print the sum of the first and last number.',
      starterCode: `public class Main {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30};
        // Print numbers[0] + numbers[2]
    }
}`,
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30};
        System.out.println(numbers[0] + numbers[2]);
    }
}`,
      expectedOutput: '40',
      hints: [
        'Slot 0 is 10, and slot 2 is 30.',
        'Use System.out.println(numbers[0] + numbers[2]); to print 40!',
      ],
    },
    quiz: [
      {
        id: 'q5-1',
        question: 'What is the index number of the VERY FIRST item in a Java array or list?',
        options: ['1', '0', '-1', '10'],
        correctIndex: 1,
        explanation: 'Java is zero-indexed! The first item is always at index [0].',
        wrongExplanation: 'Computers start counting from 0, so the first element is at index 0.',
      },
      {
        id: 'q5-2',
        question: 'How do you check how many items are inside an ArrayList?',
        options: ['fruits.size()', 'fruits.countAll()', 'fruits.howMany()', 'fruits.weight'],
        correctIndex: 0,
        explanation: '.size() tells you the total count of items in an ArrayList!',
        wrongExplanation: 'ArrayLists use the .size() method to report item count.',
      },
      {
        id: 'q5-3',
        question: 'What happens if you try to get an item from an index that doesn\'t exist, like slot 99 in a 3-item list?',
        options: ['Java gives you an empty box', 'Java throws an IndexOutOfBoundsException error', 'It makes up a fruit', 'It restarts your computer'],
        correctIndex: 1,
        explanation: 'Java protects you by throwing an IndexOutOfBoundsException! It means: "You reached into a slot that isn\'t there!"',
        wrongExplanation: 'Accessing an invalid index throws an IndexOutOfBoundsException.',
      },
    ],
    nextLessonId: 'level-6-methods',
  },

  // =========================================================================
  // LEVEL 6: Methods
  // =========================================================================
  {
    id: 'level-6-methods',
    level: 6,
    title: 'Methods: Kitchen Blenders',
    subtitle: 'Reusing Smart Recipes Over and Over',
    badgeIcon: '🍳',
    prerequisiteId: 'level-5-collections',
    xpReward: 100,
    objective: 'Write and call methods with parameters and return values.',
    storyAnalogy: {
      title: 'The Smoothie Blender Machine',
      story: 'When you want strawberry smoothie, you don\'t build a whole new blender from scratch every morning! You have a blender sitting on the kitchen counter. You drop in strawberries and milk (parameters), press BLEND, and out comes a cold strawberry smoothie (return value)! Methods are reusable machines!',
      emoji: '🍓',
    },
    simpleExplanation: 'A method is a block of code with a name that performs a specific task. You can call it whenever you need that task done, passing in ingredients (arguments) and receiving a delicious result.',
    codeSnippet: `public class Main {
    public static int addNumbers(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        int result = addNumbers(3, 4);
        System.out.println("The answer is: " + result);
    }
}`,
    lineByLine: [
      { line: 'public static int addNumbers(int a, int b) {', explanation: 'Creates our method called addNumbers. It takes two int ingredients (a and b) and promises to return an int.' },
      { line: 'return a + b;', explanation: 'Calculates the sum and hands it back to whoever called the method!' },
      { line: 'int result = addNumbers(3, 4);', explanation: 'Calls the method with 3 and 4. It returns 7, which we store in result.' },
      { line: 'System.out.println("The answer is: " + result);', explanation: 'Displays "The answer is: 7".' },
    ],
    visualDemo: {
      title: 'The Method Kitchen Machine',
      type: 'blender',
      items: [
        { label: 'Inputs (Parameters)', value: 'a = 3, b = 4', description: 'The ingredients dropped in', color: 'purple' },
        { label: 'Inside the Blender', value: 'a + b', description: 'The math action', color: 'yellow' },
        { label: 'Output (Return)', value: '7', description: 'The result handed back', color: 'green' },
      ],
    },
    sampleOutput: 'The answer is: 7',
    guidedExercise: {
      instruction: 'Call addNumbers with 10 and 20 so the answer prints 30.',
      starterCode: `public class Main {
    public static int addNumbers(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        int result = addNumbers(3, 4);
        System.out.println("The answer is: " + result);
    }
}`,
      solutionCode: `public class Main {
    public static int addNumbers(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        int result = addNumbers(10, 20);
        System.out.println("The answer is: " + result);
    }
}`,
      expectedOutput: 'The answer is: 30',
      hints: [
        'Look at the line int result = addNumbers(3, 4);.',
        'Change (3, 4) to (10, 20).',
      ],
    },
    independentChallenge: {
      instruction: 'Write a method named makeGreeting that takes a String name parameter and returns "Hello, " + name + "!", then call it with "JavaBuddy" and print the result.',
      starterCode: `public class Main {
    // Write your makeGreeting method here!

    public static void main(String[] args) {
        // Call it with "JavaBuddy" and print it!
    }
}`,
      solutionCode: `public class Main {
    public static String makeGreeting(String name) {
        return "Hello, " + name + "!";
    }

    public static void main(String[] args) {
        String greeting = makeGreeting("JavaBuddy");
        System.out.println(greeting);
    }
}`,
      expectedOutput: 'Hello, JavaBuddy!',
      hints: [
        'Method signature: public static String makeGreeting(String name) { return "Hello, " + name + "!"; }',
        'Inside main: System.out.println(makeGreeting("JavaBuddy"));',
      ],
    },
    quiz: [
      {
        id: 'q6-1',
        question: 'What keyword does a method use to hand a value back to whoever called it?',
        options: ['giveBack', 'return', 'send', 'drop'],
        correctIndex: 1,
        explanation: 'The "return" keyword sends the result back to the caller!',
        wrongExplanation: 'return is the official Java keyword to produce a return value from a method.',
      },
      {
        id: 'q6-2',
        question: 'If a method does NOT return any value, what word do we write in its header?',
        options: ['empty', 'nothing', 'void', 'zero'],
        correctIndex: 2,
        explanation: '"void" means "this method does an action (like printing), but doesn\'t return a value box!"',
        wrongExplanation: 'void specifies that a method returns no value.',
      },
      {
        id: 'q6-3',
        question: 'What are the inputs you pass into a method called?',
        options: ['Parameters or Arguments', 'Decorations', 'Semicolons', 'Packages'],
        correctIndex: 0,
        explanation: 'Inputs are called parameters (or arguments)! They are like the ingredients for a recipe.',
        wrongExplanation: 'Parameters or arguments are the values passed into methods.',
      },
    ],
    nextLessonId: 'level-7-oop',
  },

  // =========================================================================
  // LEVEL 7: Object-Oriented Programming (OOP)
  // =========================================================================
  {
    id: 'level-7-oop',
    level: 7,
    title: 'Object-Oriented Programming',
    subtitle: 'Blueprints, Toy Cars, and Puppy Objects',
    badgeIcon: '🚗',
    prerequisiteId: 'level-6-methods',
    xpReward: 120,
    objective: 'Understand classes (blueprints) and objects (instances), fields, and constructors.',
    storyAnalogy: {
      title: 'The Toy Factory Blueprint',
      story: 'An architect draws a blueprint of a toy race car on paper. The blueprint shows that every car needs a color and a speed, and knows how to "vroom()". You can\'t drive the paper blueprint! But you can use that one blueprint to build 10 real toy race cars: a red one, a blue one, a yellow one! The blueprint is the CLASS; the real cars are OBJECTS!',
      emoji: '🏎️',
    },
    simpleExplanation: 'In Java, a Class is a blueprint that defines what data an object holds (fields) and what actions it can do (methods). An Object is an actual creation made from that blueprint using the "new" keyword.',
    codeSnippet: `class ToyCar {
    String color;

    ToyCar(String c) {
        color = c;
    }

    void honk() {
        System.out.println(color + " car goes Beep Beep!");
    }
}

public class Main {
    public static void main(String[] args) {
        ToyCar myCar = new ToyCar("Red");
        myCar.honk();
    }
}`,
    lineByLine: [
      { line: 'class ToyCar {', explanation: 'Defines the blueprint for all toy cars.' },
      { line: 'String color;', explanation: 'A field: every toy car remembers its own color.' },
      { line: 'ToyCar(String c) { color = c; }', explanation: 'The constructor: a special method that sets up a brand new car when built!' },
      { line: 'void honk() { ... }', explanation: 'An action method: makes the car sound its horn.' },
      { line: 'ToyCar myCar = new ToyCar("Red");', explanation: 'Builds a brand new red toy car using "new"!' },
      { line: 'myCar.honk();', explanation: 'Calls the honk action on our red car!' },
    ],
    visualDemo: {
      title: 'Blueprint vs Real Toy',
      type: 'blueprint',
      items: [
        { label: 'Class (Blueprint)', value: 'ToyCar', description: 'Defines fields & actions on paper', color: 'purple' },
        { label: 'Constructor', value: 'new ToyCar("Red")', description: 'The factory that builds the toy', color: 'yellow' },
        { label: 'Object in Hand', value: 'myCar', description: 'Can run myCar.honk()!', color: 'green' },
      ],
    },
    sampleOutput: 'Red car goes Beep Beep!',
    guidedExercise: {
      instruction: 'Create a second car called blueCar with color "Blue", and make it honk too!',
      starterCode: `class ToyCar {
    String color;

    ToyCar(String c) {
        color = c;
    }

    void honk() {
        System.out.println(color + " car goes Beep Beep!");
    }
}

public class Main {
    public static void main(String[] args) {
        ToyCar myCar = new ToyCar("Red");
        myCar.honk();

        // 1. Create ToyCar blueCar = new ToyCar("Blue");
        // 2. Call blueCar.honk();
    }
}`,
      solutionCode: `class ToyCar {
    String color;

    ToyCar(String c) {
        color = c;
    }

    void honk() {
        System.out.println(color + " car goes Beep Beep!");
    }
}

public class Main {
    public static void main(String[] args) {
        ToyCar myCar = new ToyCar("Red");
        myCar.honk();

        ToyCar blueCar = new ToyCar("Blue");
        blueCar.honk();
    }
}`,
      expectedOutput: "Red car goes Beep Beep!\nBlue car goes Beep Beep!",
      hints: [
        'Add: ToyCar blueCar = new ToyCar("Blue");',
        'Then call: blueCar.honk();',
      ],
    },
    independentChallenge: {
      instruction: 'Create a Puppy class with String name; and a bark() method that prints name + " says Woof!". In main, create Puppy dog = new Puppy("Max"); and call dog.bark().',
      starterCode: `class Puppy {
    String name;

    Puppy(String n) {
        name = n;
    }

    // Add void bark() method here!
}

public class Main {
    public static void main(String[] args) {
        // Create puppy and call bark!
    }
}`,
      solutionCode: `class Puppy {
    String name;

    Puppy(String n) {
        name = n;
    }

    void bark() {
        System.out.println(name + " says Woof!");
    }
}

public class Main {
    public static void main(String[] args) {
        Puppy dog = new Puppy("Max");
        dog.bark();
    }
}`,
      expectedOutput: 'Max says Woof!',
      hints: [
        'Inside Puppy: void bark() { System.out.println(name + " says Woof!"); }',
        'In main: Puppy dog = new Puppy("Max"); dog.bark();',
      ],
    },
    quiz: [
      {
        id: 'q7-1',
        question: 'What keyword is used to create a brand new object from a class blueprint?',
        options: ['make', 'build', 'new', 'spawn'],
        correctIndex: 2,
        explanation: 'The "new" keyword tells Java to allocate memory and build a brand new object!',
        wrongExplanation: 'In Java, "new" is used to instantiate objects.',
      },
      {
        id: 'q7-2',
        question: 'What is a "Constructor" in Java?',
        options: ['A construction worker on the street', 'A special method that initializes a new object when it is born', 'A tool to delete files', 'A loop that never stops'],
        correctIndex: 1,
        explanation: 'The constructor has the same name as the class and prepares all the initial settings of an object!',
        wrongExplanation: 'Constructors initialize state upon object creation.',
      },
      {
        id: 'q7-3',
        question: 'What is the relationship between a Class and an Object?',
        options: ['They are exactly the same thing', 'A Class is the blueprint; an Object is the real thing built from it', 'Objects are only for numbers', 'Classes are only used in school'],
        correctIndex: 1,
        explanation: 'Just like a cookie cutter (Class) and the yummy cookie (Object)!',
        wrongExplanation: 'A class is the template; an object is an instance.',
      },
    ],
    nextLessonId: 'level-8-debugging',
  },

  // =========================================================================
  // LEVEL 8: Debugging and Exceptions
  // =========================================================================
  {
    id: 'level-8-debugging',
    level: 8,
    title: 'Debugging and Exceptions',
    subtitle: 'Catching Spilled Milk with Try and Catch',
    badgeIcon: '🔍',
    prerequisiteId: 'level-7-oop',
    xpReward: 130,
    objective: 'Understand compilation vs runtime errors, read stack traces, and handle exceptions with try-catch.',
    storyAnalogy: {
      title: 'The Sippy Cup with a Spill-Proof Lid',
      story: 'When toddlers drink apple juice from an open glass, it is easy to accidentally knock it over and make a big puddle on the rug! That is like a computer crash! But when mommy puts juice in a sippy cup with a silicone lid (try-catch), even if the cup tips over, the lid CATCHES the spill and nobody cries!',
      emoji: '🍼',
    },
    simpleExplanation: 'Mistakes are not bad—they are helpful clues! If code might cause an unexpected surprise (like dividing by zero or reading a missing file), we wrap it in a "try" block. If a problem happens, Java leaps into the "catch" block instead of crashing the app!',
    codeSnippet: `public class Main {
    public static void main(String[] args) {
        try {
            int cookies = 10;
            int friends = 0; // Uh oh, dividing by zero!
            int share = cookies / friends;
            System.out.println("Each friend gets: " + share);
        } catch (ArithmeticException e) {
            System.out.println("Caught the spill! You cannot divide cookies by zero friends!");
        }
        System.out.println("The kitchen is still clean!");
    }
}`,
    lineByLine: [
      { line: 'try {', explanation: 'Tells Java: "Try doing these steps, but watch out for spills!"' },
      { line: 'int share = cookies / friends;', explanation: 'Dividing by zero causes an ArithmeticException!' },
      { line: '} catch (ArithmeticException e) {', explanation: 'Catches the math spill safely so the program doesn\'t crash!' },
      { line: 'System.out.println("Caught the spill!...");', explanation: 'Friendly recovery message.' },
      { line: 'System.out.println("The kitchen is still clean!");', explanation: 'Notice our program continues running smoothly!' },
    ],
    visualDemo: {
      title: 'The Try-Catch Safety Net',
      type: 'magnifier',
      items: [
        { label: 'Try Block', value: '10 / 0', description: 'Risky math action', color: 'yellow' },
        { label: 'Exception Thrown', value: 'ArithmeticException', description: 'Uh oh, math spill!', color: 'purple' },
        { label: 'Catch Block', value: 'Safe Message', description: 'Caught safely in the safety net!', color: 'green' },
      ],
    },
    sampleOutput: "Caught the spill! You cannot divide cookies by zero friends!\nThe kitchen is still clean!",
    guidedExercise: {
      instruction: 'Change friends to 2 so no exception happens and each friend gets 5 cookies.',
      starterCode: `public class Main {
    public static void main(String[] args) {
        try {
            int cookies = 10;
            int friends = 0;
            int share = cookies / friends;
            System.out.println("Each friend gets: " + share);
        } catch (ArithmeticException e) {
            System.out.println("Caught the spill! You cannot divide cookies by zero friends!");
        }
    }
}`,
      solutionCode: `public class Main {
    public static void main(String[] args) {
        try {
            int cookies = 10;
            int friends = 2;
            int share = cookies / friends;
            System.out.println("Each friend gets: " + share);
        } catch (ArithmeticException e) {
            System.out.println("Caught the spill! You cannot divide cookies by zero friends!");
        }
    }
}`,
      expectedOutput: 'Each friend gets: 5',
      hints: [
        'Change int friends = 0; to int friends = 2;.',
        'Now 10 / 2 = 5, which works perfectly without jumping to the catch block!',
      ],
    },
    independentChallenge: {
      instruction: 'Wrap this risky array code in try-catch (IndexOutOfBoundsException e) so it prints "Slot does not exist!" instead of crashing: int[] items = {1, 2}; System.out.println(items[5]);',
      starterCode: `public class Main {
    public static void main(String[] args) {
        // Wrap the risky array index access in try-catch!
        int[] items = {1, 2};
        System.out.println(items[5]);
    }
}`,
      solutionCode: `public class Main {
    public static void main(String[] args) {
        try {
            int[] items = {1, 2};
            System.out.println(items[5]);
        } catch (IndexOutOfBoundsException e) {
            System.out.println("Slot does not exist!");
        }
    }
}`,
      expectedOutput: 'Slot does not exist!',
      hints: [
        'Place the array code inside try { ... }',
        'Follow with catch (IndexOutOfBoundsException e) { System.out.println("Slot does not exist!"); }',
      ],
    },
    quiz: [
      {
        id: 'q8-1',
        question: 'What is the difference between a Compilation Error and a Runtime Error?',
        options: [
          'Compilation errors happen before the code runs (like a typo); runtime errors happen while running',
          'Compilation errors are made of chocolate',
          'Runtime errors only happen at night',
          'There is no difference',
        ],
        correctIndex: 0,
        explanation: 'Compilation errors happen when Java compiler checks grammar. Runtime errors happen when code is executing (like dividing by zero).',
        wrongExplanation: 'Compile errors occur during build; runtime errors occur during execution.',
      },
      {
        id: 'q8-2',
        question: 'Which block of code ALWAYS runs, whether an error happened or not?',
        options: ['catch', 'finally', 'try', 'maybe'],
        correctIndex: 1,
        explanation: 'The "finally" block is guaranteed to run cleanup steps regardless of whether an exception was thrown!',
        wrongExplanation: 'finally always executes after try and catch blocks finish.',
      },
      {
        id: 'q8-3',
        question: 'What is a "Stack Trace"?',
        options: ['A map of pancake stacks', 'A helpful detective list showing which line of code had a hiccup', 'A type of virus', 'A high score list'],
        correctIndex: 1,
        explanation: 'A stack trace tells you exactly which file, method, and line number caused the error!',
        wrongExplanation: 'A stack trace is a diagnostic report of active stack frames when an error occurred.',
      },
    ],
    nextLessonId: 'level-9-intermediate',
  },

  // =========================================================================
  // LEVEL 9: Intermediate Java
  // =========================================================================
  {
    id: 'level-9-intermediate',
    level: 9,
    title: 'Intermediate Java',
    subtitle: 'Packages, Static, Final, and Generics',
    badgeIcon: '⚡',
    prerequisiteId: 'level-8-debugging',
    xpReward: 140,
    objective: 'Learn packages, imports, static members, final constants, and basic generics.',
    storyAnalogy: {
      title: 'The Super-Organized Tool Shed',
      story: 'When your toolbox has 500 different wrenches and screwdrivers, you don\'t toss them all in one big messy pile on the floor. You put woodworking tools in the "wood" drawer, and painting brushes in the "paint" drawer! In Java, those drawers are called PACKAGES! And when something is stamped "FINAL", it means it is super-glued and can never be changed!',
      emoji: '🧰',
    },
    simpleExplanation: 'Packages organize related classes into folders. "static" means something belongs to the whole club rather than one single member. "final" locks a variable so its value can never be overwritten.',
    codeSnippet: `public class Main {
    // A constant that never changes!
    public static final double PI = 3.14159;
    
    // A shared counter for the whole school
    public static int studentCount = 0;

    public static void main(String[] args) {
        studentCount++;
        studentCount++;
        System.out.println("Students enrolled: " + studentCount);
        System.out.println("Value of PI: " + PI);
    }
}`,
    lineByLine: [
      { line: 'public static final double PI = 3.14159;', explanation: 'final means PI is permanently locked; nobody can change it!' },
      { line: 'public static int studentCount = 0;', explanation: 'static means there is only ONE shared counter for everyone.' },
      { line: 'studentCount++;', explanation: 'Increases the shared student count.' },
      { line: 'System.out.println(...);', explanation: 'Prints the shared static data.' },
    ],
    visualDemo: {
      title: 'Shared vs Permanent',
      type: 'boxes',
      items: [
        { label: 'static variable', value: 'Shared by all', description: 'One copy in memory for everyone', color: 'blue' },
        { label: 'final variable', value: 'Locked forever', description: 'Cannot be changed once set', color: 'yellow' },
        { label: 'Packages', value: 'Organized Drawers', description: 'Keeps big projects clean and tidy', color: 'purple' },
      ],
    },
    sampleOutput: "Students enrolled: 2\nValue of PI: 3.14159",
    guidedExercise: {
      instruction: 'Add one more studentCount++; so the total enrolled students prints 3.',
      starterCode: `public class Main {
    public static int studentCount = 0;

    public static void main(String[] args) {
        studentCount++;
        studentCount++;
        // Add one more student here!
        System.out.println("Students enrolled: " + studentCount);
    }
}`,
      solutionCode: `public class Main {
    public static int studentCount = 0;

    public static void main(String[] args) {
        studentCount++;
        studentCount++;
        studentCount++;
        System.out.println("Students enrolled: " + studentCount);
    }
}`,
      expectedOutput: 'Students enrolled: 3',
      hints: [
        'Add a third studentCount++; line.',
      ],
    },
    independentChallenge: {
      instruction: 'Declare a final String APP_NAME = "JavaBuddy"; and print "Welcome to " + APP_NAME.',
      starterCode: `public class Main {
    public static void main(String[] args) {
        // Declare final String APP_NAME
        // Print greeting
    }
}`,
      solutionCode: `public class Main {
    public static void main(String[] args) {
        final String APP_NAME = "JavaBuddy";
        System.out.println("Welcome to " + APP_NAME);
    }
}`,
      expectedOutput: 'Welcome to JavaBuddy',
      hints: [
        'Write: final String APP_NAME = "JavaBuddy";',
        'Then: System.out.println("Welcome to " + APP_NAME);',
      ],
    },
    quiz: [
      {
        id: 'q9-1',
        question: 'What happens if you try to change the value of a "final" variable in Java?',
        options: ['Java gives a compilation error: cannot assign a value to final variable', 'It changes happily', 'It doubles the number', 'It asks for your password'],
        correctIndex: 0,
        explanation: 'final locks the value! Attempting to reassign it triggers a compilation error.',
        wrongExplanation: 'final variables are immutable once initialized.',
      },
      {
        id: 'q9-2',
        question: 'What does the "static" keyword mean on a field or method?',
        options: ['It belongs to the class itself, not individual instances', 'It makes a buzzing sound like static radio', 'It only works when offline', 'It can only be used once'],
        correctIndex: 0,
        explanation: 'static members belong to the class blueprint directly without needing to instantiate an object with "new".',
        wrongExplanation: 'static fields and methods belong to the class, not instance objects.',
      },
      {
        id: 'q9-3',
        question: 'Why do Java programmers use packages?',
        options: ['To send gifts in the mail', 'To prevent naming collisions and organize large codebases into folders', 'To make files download faster', 'Because Java forces 100 packages per file'],
        correctIndex: 1,
        explanation: 'Packages prevent naming clashes and keep thousands of Java classes cleanly organized!',
        wrongExplanation: 'Packages provide namespace management and modular structure.',
      },
    ],
    nextLessonId: 'level-10-real-apps',
  },

  // =========================================================================
  // LEVEL 10: Building Real Applications
  // =========================================================================
  {
    id: 'level-10-real-apps',
    level: 10,
    title: 'Building Real Applications',
    subtitle: 'JSON, REST APIs, and Spring Boot Magic',
    badgeIcon: '🚀',
    prerequisiteId: 'level-9-intermediate',
    xpReward: 150,
    objective: 'Discover how modern Java powers real web apps, REST APIs, JSON data, and Spring Boot.',
    storyAnalogy: {
      title: 'The Restaurant Waiter (API)',
      story: 'When you sit at a cozy restaurant, you don\'t walk into the kitchen and cook the pasta yourself! You talk to the friendly waiter (the API). You say: "I would like a bowl of spaghetti, please!" (HTTP Request). The waiter takes your order to the kitchen, and brings back a warm plate of spaghetti (HTTP Response / JSON)! That is how apps talk to servers!',
      emoji: '🍝',
    },
    simpleExplanation: 'In the real world, Java is used by banks, NASA, Netflix, and Minecraft! Java programs read JSON data from the internet, store information in databases, and use frameworks like Spring Boot to create fast web servers.',
    codeSnippet: `public class Main {
    public static void main(String[] args) {
        // A mini representation of a JSON API response!
        String userJson = "{\\"name\\": \\"Alex\\", \\"level\\": 10, \\"badge\\": \\"Java Hero\\"}";
        
        System.out.println("Incoming API Data: " + userJson);
        System.out.println("Status: 200 OK — Ready for the real world!");
    }
}`,
    lineByLine: [
      { line: 'String userJson = "...";', explanation: 'JSON is the standard format for sending data across the web.' },
      { line: 'System.out.println(...);', explanation: 'Displays our API payload.' },
      { line: 'Status: 200 OK', explanation: '200 OK is the internet\'s secret code for: "Everything worked perfectly!"' },
    ],
    visualDemo: {
      title: 'How Web APIs Work',
      type: 'decision-tree',
      items: [
        { label: 'Client (Phone/Browser)', value: 'GET /api/user', description: 'Ordering the spaghetti', color: 'purple' },
        { label: 'Java Spring Server', value: 'REST Controller', description: 'The Kitchen Chef', color: 'yellow' },
        { label: 'JSON Response', value: '200 OK + Data', description: 'Delivered to your screen!', color: 'green' },
      ],
    },
    sampleOutput: "Incoming API Data: {\"name\": \"Alex\", \"level\": 10, \"badge\": \"Java Hero\"}\nStatus: 200 OK — Ready for the real world!",
    guidedExercise: {
      instruction: 'Change the name in the JSON string from "Alex" to your own name or "Hero Programmer".',
      starterCode: `public class Main {
    public static void main(String[] args) {
        String userJson = "{\\"name\\": \\"Alex\\", \\"level\\": 10, \\"badge\\": \\"Java Hero\\"}";
        System.out.println("Incoming API Data: " + userJson);
    }
}`,
      solutionCode: `public class Main {
    public static void main(String[] args) {
        String userJson = "{\\"name\\": \\"Hero Programmer\\", \\"level\\": 10, \\"badge\\": \\"Java Hero\\"}";
        System.out.println("Incoming API Data: " + userJson);
    }
}`,
      expectedOutput: 'Incoming API Data: {"name": "Hero Programmer", "level": 10, "badge": "Java Hero"}',
      hints: [
        'Replace \\"Alex\\" with \\"Hero Programmer\\".',
      ],
    },
    independentChallenge: {
      instruction: 'Print an API success message that outputs "Server running on port 8080" followed by "Endpoints: /api/lessons, /api/progress".',
      starterCode: `public class Main {
    public static void main(String[] args) {
        // Print your server port and endpoints!
    }
}`,
      solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Server running on port 8080");
        System.out.println("Endpoints: /api/lessons, /api/progress");
    }
}`,
      expectedOutput: "Server running on port 8080\nEndpoints: /api/lessons, /api/progress",
      hints: [
        'Use two System.out.println statements matching the exact phrases.',
      ],
    },
    quiz: [
      {
        id: 'q10-1',
        question: 'What does the HTTP status code "200 OK" mean?',
        options: ['Success! The request was received and processed smoothly', 'Page not found', 'Computer is on fire', 'Payment is due'],
        correctIndex: 0,
        explanation: '200 OK is the standard HTTP success code across the entire internet!',
        wrongExplanation: '200 indicates standard HTTP success.',
      },
      {
        id: 'q10-2',
        question: 'What is Spring Boot?',
        options: ['A special rubber boot for walking in spring rain', 'The most popular Java framework for building fast web backends and microservices', 'A video game', 'A type of keyboard'],
        correctIndex: 1,
        explanation: 'Spring Boot is the industry-standard Java framework powering massive web applications and cloud APIs worldwide!',
        wrongExplanation: 'Spring Boot is an open source Java-based framework used to create microservices and web apps.',
      },
      {
        id: 'q10-3',
        question: 'What format do modern mobile apps and websites use to exchange data with Java servers?',
        options: ['JSON (JavaScript Object Notation)', 'Morse code', 'Paper letters', 'Smoke signals'],
        correctIndex: 0,
        explanation: 'JSON is the universal, human-readable data format used by modern web apps and REST APIs.',
        wrongExplanation: 'JSON is the standard lightweight data-interchange format.',
      },
    ],
  },
];
