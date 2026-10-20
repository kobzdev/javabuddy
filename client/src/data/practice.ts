import { PracticeChallenge, MiniProject } from '../types';

export const PRACTICE_CHALLENGES: PracticeChallenge[] = [
  // 1. GUESS THE OUTPUT
  {
    id: 'guess-1',
    type: 'guess_output',
    title: 'What Does the Puppy Say?',
    topic: 'Variables and Printing',
    difficulty: 'Easy Peasy',
    description: 'Read the code and predict what will be printed on the screen!',
    code: `String toy = "Ball";
toy = "Frisbee";
System.out.println("Go fetch the " + toy + "!");`,
    options: [
      'Go fetch the Ball!',
      'Go fetch the Frisbee!',
      'Go fetch the toy!',
      'Error: Cannot change toy',
    ],
    correctAnswer: 1, // index 1
    explanation: 'The variable toy was changed from "Ball" to "Frisbee" before printing, so the puppy fetches the Frisbee!',
    hints: [
      'Look at what value was placed into the toy box last!',
      'toy was updated to "Frisbee".',
    ],
    xp: 25,
  },
  {
    id: 'guess-2',
    type: 'guess_output',
    title: 'Counting Cookies in the Jar',
    topic: 'Math and Loops',
    difficulty: 'A Little Tricky',
    description: 'What number will appear on the screen when this code finishes?',
    code: `int cookies = 0;
for (int i = 0; i < 3; i++) {
    cookies = cookies + 2;
}
System.out.println(cookies);`,
    options: ['3', '4', '6', '8'],
    correctAnswer: 2, // index 2 (6)
    explanation: 'The loop runs 3 times (i=0, 1, 2). Each lap adds 2 cookies! 0 + 2 + 2 + 2 = 6 cookies!',
    hints: [
      'How many laps does the for loop make?',
      'How much is added to cookies on each lap?',
    ],
    xp: 30,
  },

  // 2. FIX THE CODE
  {
    id: 'fix-1',
    type: 'fix_code',
    title: 'The Missing Semicolon',
    topic: 'Syntax and Punctuation',
    difficulty: 'Easy Peasy',
    description: 'Oops! The programmer forgot a tiny punctuation mark at the end of the sentence. Fix the line so it compiles cleanly!',
    code: `public class Main {
    public static void main(String[] args) {
        String greeting = "Good morning"
        System.out.println(greeting);
    }
}`,
    correctAnswer: ';',
    explanation: 'Line 3 was missing a semicolon (;) at the end of String greeting = "Good morning";',
    hints: [
      'Look at line 3: String greeting = "Good morning"',
      'Every Java statement needs a semicolon ; at the end!',
    ],
    xp: 35,
  },
  {
    id: 'fix-2',
    type: 'fix_code',
    title: 'The Case-Sensitive Capital',
    topic: 'Keywords & Identifiers',
    difficulty: 'A Little Tricky',
    description: 'Java is complaining that it cannot find "system". What word needs to start with an uppercase letter?',
    code: `public class Main {
    public static void main(String[] args) {
        system.out.println("Java is fun!");
    }
}`,
    correctAnswer: 'System',
    explanation: 'System must start with a capital S: System.out.println(...)',
    hints: [
      'Look at lowercase "system".',
      'In Java, System is a class, so it starts with a capital S!',
    ],
    xp: 35,
  },

  // 3. FILL IN THE BLANK
  {
    id: 'fill-1',
    type: 'fill_blank',
    title: 'Name That Variable Box',
    topic: 'Data Types',
    difficulty: 'Easy Peasy',
    description: 'Which keyword fills in the blank to store the whole number 42?',
    code: `___ answer = 42;
System.out.println("The answer is: " + answer);`,
    options: ['int', 'String', 'double', 'boolean'],
    correctAnswer: 'int',
    explanation: '42 is a whole number with no decimals, so we use int!',
    hints: ['42 has no decimal point or quotes. It is an integer!'],
    xp: 25,
  },
  {
    id: 'fill-2',
    type: 'fill_blank',
    title: 'Create a Brand New Object',
    topic: 'Object Oriented Programming',
    difficulty: 'A Little Tricky',
    description: 'Which keyword tells Java to build a new object instance in memory?',
    code: `Dog myDog = ___ Dog("Buddy");
myDog.bark();`,
    options: ['new', 'make', 'create', 'class'],
    correctAnswer: 'new',
    explanation: 'The "new" keyword tells Java to instantiate a new object from a class blueprint!',
    hints: ['Three letters: n-e-w!'],
    xp: 30,
  },

  // 4. FIND THE BUG
  {
    id: 'bug-1',
    type: 'find_bug',
    title: 'Reaching Beyond the Basket',
    topic: 'Arrays and Indexing',
    difficulty: 'A Little Tricky',
    description: 'What bug will happen when this code runs?',
    code: `String[] colors = {"Red", "Green", "Blue"};
System.out.println(colors[3]);`,
    options: [
      'ArrayIndexOutOfBoundsException because slots are 0, 1, 2',
      'It prints Blue',
      'It prints null',
      'It prints Red',
    ],
    correctAnswer: 0,
    explanation: 'The array has 3 items at slots [0], [1], and [2]. Asking for slot [3] crashes with ArrayIndexOutOfBoundsException!',
    hints: [
      'Count the items starting from 0: "Red" is 0, "Green" is 1, "Blue" is 2.',
      'There is no slot 3!',
    ],
    xp: 35,
  },

  // 5. BUILD A PROGRAM
  {
    id: 'build-1',
    type: 'build_program',
    title: 'The Even Number Checker',
    topic: 'Decisions and Modulo',
    difficulty: 'Junior Boss',
    description: 'Write a program that tests if int number = 6; is even (number % 2 == 0). If even, print "Even Number!". Otherwise, print "Odd Number!".',
    code: `public class Main {
    public static void main(String[] args) {
        int number = 6;
        // Write your condition here!
    }
}`,
    correctAnswer: 'Even Number!',
    explanation: '6 % 2 is 0, so it prints "Even Number!"',
    hints: [
      'Use: if (number % 2 == 0) { System.out.println("Even Number!"); } else { System.out.println("Odd Number!"); }',
    ],
    xp: 50,
  },
];

export const MINI_PROJECTS: MiniProject[] = [
  {
    id: 'project-greeting-bot',
    title: 'Playful Greeting Bot',
    description: 'Build a cheerful automated bot that greets the user with their name and favorite hobby.',
    icon: '🤖',
    requiredLevel: 2,
    starterCode: `public class Main {
    public static void main(String[] args) {
        String botName = "JavaBuddy";
        String userName = "Alex";
        String hobby = "baking cookies";

        // Print: "Beep Boop! I am JavaBuddy."
        // Print: "Nice to meet you, Alex! Have fun baking cookies!"
    }
}`,
    solutionCode: `public class Main {
    public static void main(String[] args) {
        String botName = "JavaBuddy";
        String userName = "Alex";
        String hobby = "baking cookies";

        System.out.println("Beep Boop! I am " + botName + ".");
        System.out.println("Nice to meet you, " + userName + "! Have fun " + hobby + "!");
    }
}`,
    goals: [
      'Use String variables to store names and hobbies',
      'Concatenate variables with strings using +',
      'Print formatted bot dialogue',
    ],
    sampleOutput: "Beep Boop! I am JavaBuddy.\nNice to meet you, Alex! Have fun baking cookies!",
    xp: 100,
  },
  {
    id: 'project-simple-calculator',
    title: 'Pocket Math Calculator',
    description: 'Create a four-operation math helper that calculates sum, difference, product, and average of two numbers.',
    icon: '🧮',
    requiredLevel: 3,
    starterCode: `public class Main {
    public static void main(String[] args) {
        int a = 12;
        int b = 4;

        // Print Sum: 16
        // Print Difference: 8
        // Print Product: 48
    }
}`,
    solutionCode: `public class Main {
    public static void main(String[] args) {
        int a = 12;
        int b = 4;

        System.out.println("Sum: " + (a + b));
        System.out.println("Difference: " + (a - b));
        System.out.println("Product: " + (a * b));
    }
}`,
    goals: [
      'Perform arithmetic operations: +, -, *',
      'Use parentheses around math expressions when concatenating',
      'Format clean numerical output',
    ],
    sampleOutput: "Sum: 16\nDifference: 8\nProduct: 48",
    xp: 120,
  },
  {
    id: 'project-number-guesser',
    title: 'Secret Number Guesser',
    description: 'Simulate a guessing game checking if a secret number matches the user guess.',
    icon: '🎯',
    requiredLevel: 4,
    starterCode: `public class Main {
    public static void main(String[] args) {
        int secret = 7;
        int guess = 7;

        if (guess == secret) {
            System.out.println("You won! You found the secret number!");
        } else if (guess < secret) {
            System.out.println("Too low! Try higher.");
        } else {
            System.out.println("Too high! Try lower.");
        }
    }
}`,
    solutionCode: `public class Main {
    public static void main(String[] args) {
        int secret = 7;
        int guess = 7;

        if (guess == secret) {
            System.out.println("You won! You found the secret number!");
        } else if (guess < secret) {
            System.out.println("Too low! Try higher.");
        } else {
            System.out.println("Too high! Try lower.");
        }
    }
}`,
    goals: [
      'Implement multi-branch decision logic with if / else if / else',
      'Compare values using ==, <, and >',
    ],
    sampleOutput: 'You won! You found the secret number!',
    xp: 140,
  },
  {
    id: 'project-pet-class',
    title: 'Virtual Pet Simulator',
    description: 'Design a Pet class with hunger level, feed() method, and play() method.',
    icon: '🐾',
    requiredLevel: 7,
    starterCode: `class VirtualPet {
    String name;
    int happiness;

    VirtualPet(String n) {
        name = n;
        happiness = 50;
    }

    void play() {
        happiness += 20;
        System.out.println(name + " played with a ball! Happiness: " + happiness);
    }
}

public class Main {
    public static void main(String[] args) {
        VirtualPet puppy = new VirtualPet("Daisy");
        puppy.play();
    }
}`,
    solutionCode: `class VirtualPet {
    String name;
    int happiness;

    VirtualPet(String n) {
        name = n;
        happiness = 50;
    }

    void play() {
        happiness += 20;
        System.out.println(name + " played with a ball! Happiness: " + happiness);
    }
}

public class Main {
    public static void main(String[] args) {
        VirtualPet puppy = new VirtualPet("Daisy");
        puppy.play();
    }
}`,
    goals: [
      'Construct custom Java classes with instance fields',
      'Create constructors and instance methods',
      'Instantiate objects and invoke their methods',
    ],
    sampleOutput: 'Daisy played with a ball! Happiness: 70',
    xp: 180,
  },
  {
    id: 'project-text-adventure',
    title: 'Cave of Wonders Adventure',
    description: 'Build a branching story adventure where choices lead to treasure!',
    icon: '🏰',
    requiredLevel: 8,
    starterCode: `public class Main {
    public static void main(String[] args) {
        String choice = "left";
        System.out.println("You stand before two mysterious cave doors: left or right.");

        if (choice.equals("left")) {
            System.out.println("You discover a treasure chest full of glowing emeralds!");
        } else {
            System.out.println("A sleepy friendly dragon offers you a cup of warm tea.");
        }
    }
}`,
    solutionCode: `public class Main {
    public static void main(String[] args) {
        String choice = "left";
        System.out.println("You stand before two mysterious cave doors: left or right.");

        if (choice.equals("left")) {
            System.out.println("You discover a treasure chest full of glowing emeralds!");
        } else {
            System.out.println("A sleepy friendly dragon offers you a cup of warm tea.");
        }
    }
}`,
    goals: [
      'Use String comparison (.equals())',
      'Implement narrative branching',
      'Create safe fallback paths',
    ],
    sampleOutput: "You stand before two mysterious cave doors: left or right.\nYou discover a treasure chest full of glowing emeralds!",
    xp: 200,
  },
];
