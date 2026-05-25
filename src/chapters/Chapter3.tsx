import { useState } from 'react';
import { Terminal, Variable, Hash, Braces, ListChecks, FunctionSquare, GitBranch, Repeat, CheckCircle, ChevronRight, ChevronDown } from 'lucide-react';
import InteractiveCodeEditor from '../components/InteractiveCodeEditor';
import VisualDemo from '../components/VisualDemo';
import Exercise from '../components/Exercise';
import Quiz from '../components/Quiz';

interface Chapter3Props {
  progress: Record<string, boolean>;
  updateProgress: (chapterId: string, topicId: string, completed: boolean) => void;
}

interface Topic {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  exercise?: React.ReactNode;
  quiz?: { questions: { question: string; options: string[]; correctAnswer: number; explanation?: string }[] };
}

export default function Chapter3({ progress, updateProgress }: Chapter3Props) {
  const [expandedTopic, setExpandedTopic] = useState<string | null>('js-intro');

  const markComplete = (topicId: string) => {
    updateProgress('chapter3', topicId, true);
  };

  const topics = {
    'js-intro': {
      id: 'js-intro',
      title: 'Introduction to JavaScript',
      icon: <Terminal className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">What is JavaScript?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>JavaScript</strong> is the programming language of the Web. It can update and change both HTML and CSS. JavaScript can calculate, manipulate and validate data.
            </p>

            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white mb-6">
              <h4 className="font-bold mb-2">The Three Core Web Technologies</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/20 rounded-lg p-3">
                  <p className="font-bold">HTML</p>
                  <p className="text-sm">Structure</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <p className="font-bold">CSS</p>
                  <p className="text-sm">Presentation</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <p className="font-bold">JavaScript</p>
                  <p className="text-sm">Behavior</p>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">JavaScript Can:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {[
                'Change HTML content dynamically',
                'Change HTML attributes',
                'Change HTML styles (CSS)',
                'Show and hide HTML elements',
                'Validate user input',
                'Create interactive web applications'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <InteractiveCodeEditor
            title="Your First JavaScript"
            language="javascript"
            initialCode={`// JavaScript can output content in different ways
console.log("Hello, World!");

// Change HTML content
document.getElementById("demo").innerHTML = "Hello JavaScript!";

// Show an alert
alert("Welcome to JavaScript!");

// Write directly to document
document.write("This was written by JavaScript");

// Output styling
document.body.style.backgroundColor = "lightblue";`}
          />

          <Exercise
            question="Write JavaScript code that outputs 'I am learning JavaScript' to the console and displays an alert saying 'Hello!'"
            hint="Use console.log() for console output and alert() for popup messages"
            solution={`console.log("I am learning JavaScript");
alert("Hello!");`}
          />
        </div>
      )
    },

    'js-variables': {
      id: 'js-variables',
      title: 'Variables and Data Types',
      icon: <Variable className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">JavaScript Variables</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Variables are containers for storing data values. In JavaScript, we use <code>var</code>, <code>let</code>, and <code>const</code> to declare variables.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mb-6">
              <div className="space-y-3 font-mono text-sm">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-200"><strong>let</strong> - Block-scoped, can be reassigned</p>
                  <p className="text-blue-600 dark:text-blue-400 text-xs">let name = "John";</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <p className="text-green-800 dark:text-green-200"><strong>const</strong> - Block-scoped, cannot be reassigned</p>
                  <p className="text-green-600 dark:text-green-400 text-xs">const PI = 3.14159;</p>
                </div>
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <p className="text-yellow-800 dark:text-yellow-200"><strong>var</strong> - Function-scoped, older way (avoid)</p>
                  <p className="text-yellow-600 dark:text-yellow-400 text-xs">var oldWay = "legacy";</p>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Data Types</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { type: 'String', example: '"Hello" or \'Hi\'', color: 'blue' },
                { type: 'Number', example: '42, 3.14, -10', color: 'green' },
                { type: 'Boolean', example: 'true, false', color: 'purple' },
                { type: 'Undefined', example: 'let x; // undefined', color: 'red' },
                { type: 'Null', example: 'let empty = null', color: 'orange' },
                { type: 'Object', example: '{name: "John"}', color: 'pink' },
                { type: 'Array', example: '[1, 2, 3]', color: 'cyan' },
                { type: 'Symbol', example: 'Symbol("id")', color: 'indigo' }
              ].map((item, i) => (
                <div key={i} className={`bg-${item.color}-50 dark:bg-${item.color}-900/20 border border-${item.color}-200 dark:border-${item.color}-800 rounded-xl p-4`}>
                  <p className={`font-bold text-${item.color}-800 dark:text-${item.color}-200`}>{item.type}</p>
                  <code className={`text-xs text-${item.color}-600 dark:text-${item.color}-400`}>{item.example}</code>
                </div>
              ))}
            </div>
          </div>

          <InteractiveCodeEditor
            title="Variables Demo"
            language="javascript"
            initialCode={`// Declaring variables
let name = "Alice";
const age = 25;
let isStudent = true;

console.log("Name:", name);
console.log("Age:", age);
console.log("Is Student:", isStudent);

// Changing value of let
name = "Bob";
console.log("New Name:", name);

// Cannot change const
// age = 26; // This would cause an error!

// Different data types
let score = 95.5;        // Number
let message = "Great!"; // String
let isActive = false;   // Boolean
let nothing = null;      // Null
let notDefined;          // Undefined
let person = {           // Object
  firstName: "John",
  lastName: "Doe"
};
let fruits = ["apple", "banana", "orange"]; // Array

console.log("\\nScore:", score);
console.log("Message:", message);
console.log("Is Active:", isActive);
console.log("Nothing:", nothing);
console.log("Not Defined:", notDefined);
console.log("Person:", person);
console.log("Fruits:", fruits);

// Type checking
console.log("\\nTypes:");
console.log(typeof name);      // string
console.log(typeof score);     // number
console.log(typeof isStudent); // boolean
console.log(typeof person);    // object
console.log(typeof fruits);    // object (arrays are objects)`}
          />

          <Quiz
            questions={[
              {
                question: "Which keyword should you use to declare a constant that won't change?",
                options: ["var", "let", "const", "static"],
                correctAnswer: 2,
                explanation: "const declares a constant that cannot be reassigned after initialization."
              },
              {
                question: "What is the typeof [] (empty array)?",
                options: ["array", "object", "undefined", "null"],
                correctAnswer: 1,
                explanation: "In JavaScript, arrays are technically objects, so typeof [] returns 'object'."
              }
            ]}
          />
        </div>
      )
    },

    'js-operators': {
      id: 'js-operators',
      title: 'Operators',
      icon: <Hash className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">JavaScript Operators</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">Arithmetic Operators</h4>
                <div className="space-y-2 font-mono text-sm">
                  <p className="text-blue-700 dark:text-blue-300">+ Addition</p>
                  <p className="text-blue-700 dark:text-blue-300">- Subtraction</p>
                  <p className="text-blue-700 dark:text-blue-300">* Multiplication</p>
                  <p className="text-blue-700 dark:text-blue-300">/ Division</p>
                  <p className="text-blue-700 dark:text-blue-300">% Modulus (remainder)</p>
                  <p className="text-blue-700 dark:text-blue-300">** Exponentiation</p>
                  <p className="text-blue-700 dark:text-blue-300">++ Increment</p>
                  <p className="text-blue-700 dark:text-blue-300">-- Decrement</p>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                <h4 className="font-bold text-green-800 dark:text-green-200 mb-3">Comparison Operators</h4>
                <div className="space-y-2 font-mono text-sm">
                  <p className="text-green-700 dark:text-green-300">== Equal (value)</p>
                  <p className="text-green-700 dark:text-green-300">=== Strict equal (value + type)</p>
                  <p className="text-green-700 dark:text-green-300">!= Not equal (value)</p>
                  <p className="text-green-700 dark:text-green-300">!== Strict not equal</p>
                  <p className="text-green-700 dark:text-green-300">&gt; Greater than</p>
                  <p className="text-green-700 dark:text-green-300">&lt; Less than</p>
                  <p className="text-green-700 dark:text-green-300">&gt;= Greater or equal</p>
                  <p className="text-green-700 dark:text-green-300">&lt;= Less or equal</p>
                </div>
              </div>
            </div>
          </div>

          <InteractiveCodeEditor
            title="Operators Demo"
            language="javascript"
            initialCode={`// Arithmetic Operators
let a = 10, b = 3;

console.log("=== Arithmetic ===");
console.log("a + b =", a + b);  // 13
console.log("a - b =", a - b);  // 7
console.log("a * b =", a * b);  // 30
console.log("a / b =", a / b);  // 3.333...
console.log("a % b =", a % b);  // 1
console.log("a ** b =", a ** b); // 1000

// Increment/Decrement
console.log("\\n=== Increment/Decrement ===");
let x = 5;
console.log("x++ =", x++); // 5 (then becomes 6)
console.log("x after =", x); // 6
console.log("++x =", ++x); // 7

// Comparison Operators
console.log("\\n=== Comparison ===");
console.log("5 == '5':", 5 == '5');   // true (loose equality)
console.log("5 === '5':", 5 === '5'); // false (strict equality)
console.log("5 != '5':", 5 != '5');   // false
console.log("5 !== '5':", 5 !== '5'); // true

// Logical Operators
console.log("\\n=== Logical ===");
console.log("true && false:", true && false); // false
console.log("true || false:", true || false); // true
console.log("!true:", !true); // false

// Ternary Operator
console.log("\\n=== Ternary ===");
let age = 20;
let status = age >= 18 ? "Adult" : "Minor";
console.log("Status:", status); // Adult

// String Operators
console.log("\\n=== String ===");
let firstName = "John";
let lastName = "Doe";
console.log("Full Name:", firstName + " " + lastName);

// Template Literals (preferred)
console.log(\`Hello, \${firstName} \${lastName}!\`);`}
          />

          <Exercise
            question="Calculate and print: 1) The area of a circle with radius 7 (use PI * r^2), 2) Check if 10 is greater than 5, 3) Use a ternary operator to check if a number is positive or negative"
            hint="Use Math.PI for PI and Math.pow() or ** for exponentiation"
            solution={`// Circle area
let radius = 7;
let area = Math.PI * radius ** 2;
console.log("Area:", area);

// Comparison
console.log("10 > 5:", 10 > 5);

// Ternary
let number = -5;
let result = number >= 0 ? "Positive" : "Negative";
console.log("Number is:", result);`}
          />
        </div>
      )
    },

    'js-conditionals': {
      id: 'js-conditionals',
      title: 'Conditional Statements',
      icon: <GitBranch className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Conditional Statements</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Conditional statements are used to perform different actions based on different conditions.
            </p>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3">Types of Conditionals</h4>
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <p className="font-mono text-purple-600">if</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Executes code if condition is true</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <p className="font-mono text-purple-600">else</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Executes code if condition is false</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <p className="font-mono text-purple-600">else if</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tests multiple conditions</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <p className="font-mono text-purple-600">switch</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Selects from multiple code blocks</p>
                </div>
              </div>
            </div>
          </div>

          <InteractiveCodeEditor
            title="Conditionals Demo"
            language="javascript"
            initialCode={`// If...Else Statement
let score = 85;
console.log("Score:", score);

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else if (score >= 60) {
    console.log("Grade: D");
} else {
    console.log("Grade: F");
}

// Switch Statement
let day = 3;
console.log("\\nDay number:", day);

switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    case 4:
        console.log("Thursday");
        break;
    case 5:
        console.log("Friday");
        break;
    case 6:
        console.log("Saturday");
        break;
    case 7:
        console.log("Sunday");
        break;
    default:
        console.log("Invalid day");
}

// Multiple Cases
let fruit = "apple";
console.log("\\nFruit:", fruit);

switch (fruit) {
    case "apple":
    case "banana":
    case "orange":
        console.log("It's a common fruit");
        break;
    case "mango":
    case "pineapple":
        console.log("It's an exotic fruit");
        break;
    default:
        console.log("Unknown fruit");
}

// Truthy and Falsy Values
console.log("\\n=== Truthy/Falsy ===");
console.log("Boolean(1):", Boolean(1));        // true
console.log("Boolean(0):", Boolean(0));        // false
console.log("Boolean('hello'):", Boolean("hello")); // true
console.log("Boolean(''):", Boolean(""));        // false
console.log("Boolean(null):", Boolean(null));    // false
console.log("Boolean(undefined):", Boolean(undefined)); // false
console.log("Boolean({}):", Boolean({}));      // true
console.log("Boolean([]):", Boolean([]));       // true`}
          />

          <Quiz
            questions={[
              {
                question: "What keyword is used to check an additional condition in an if...else chain?",
                options: ["elseif", "else if", "elsif", "default"],
                correctAnswer: 1,
                explanation: "In JavaScript, it's written as 'else if' (two words), not 'elseif' like in PHP."
              },
              {
                question: "Which value is NOT falsy in JavaScript?",
                options: ["0", '""', '"false"', "null"],
                correctAnswer: 2,
                explanation: '"false" is a non-empty string, which is truthy. 0, empty string, and null are all falsy values.'
              }
            ]}
          />
        </div>
      )
    },

    'js-loops': {
      id: 'js-loops',
      title: 'Loops',
      icon: <Repeat className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">JavaScript Loops</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Loops can execute a block of code a number of times. They are handy when you want to run the same code over and over again.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { name: 'for', desc: 'Loop through code a specific number of times' },
                { name: 'for...in', desc: 'Loop through object properties' },
                { name: 'for...of', desc: 'Loop through array elements' },
                { name: 'while', desc: 'Loop while a condition is true' },
                { name: 'do...while', desc: 'Execute at least once, then loop' },
                { name: 'break/continue', desc: 'Control loop execution' }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <p className="font-mono font-bold text-blue-600 dark:text-blue-400">{item.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <InteractiveCodeEditor
            title="Loops Demo"
            language="javascript"
            initialCode={`// For Loop
console.log("=== For Loop ===");
for (let i = 1; i <= 5; i++) {
    console.log("Iteration:", i);
}

// While Loop
console.log("\\n=== While Loop ===");
let count = 0;
while (count < 3) {
    console.log("Count:", count);
    count++;
}

// Do...While Loop
console.log("\\n=== Do...While Loop ===");
let num = 0;
do {
    console.log("Number:", num);
    num++;
} while (num < 3);

// For...of (Arrays)
console.log("\\n=== For...of (Arrays) ===");
const fruits = ["Apple", "Banana", "Mango"];
for (let fruit of fruits) {
    console.log("Fruit:", fruit);
}

// For...in (Objects)
console.log("\\n=== For...in (Objects) ===");
const person = {
    name: "John",
    age: 30,
    city: "New York"
};
for (let key in person) {
    console.log(key + ":", person[key]);
}

// Nested Loops
console.log("\\n=== Nested Loop ===");
for (let i = 1; i <= 3; i++) {
    let row = "";
    for (let j = 1; j <= 3; j++) {
        row += i * j + "\\t";
    }
    console.log(row);
}

// Break and Continue
console.log("\\n=== Break and Continue ===");
for (let i = 1; i <= 10; i++) {
    if (i === 3) continue; // Skip 3
    if (i === 8) break;     // Stop at 8
    console.log("Number:", i);
}

// Array Methods (Modern Way)
console.log("\\n=== Array Methods ===");
const numbers = [1, 2, 3, 4, 5];

// forEach
numbers.forEach((num, index) => {
    console.log(\`Index \${index}: \${num}\`);
});

// map
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

// filter
const evens = numbers.filter(n => n % 2 === 0);
console.log("Evens:", evens);

// reduce
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum);`}
          />

          <Exercise
            question="Write a loop that prints the first 10 numbers of the Fibonacci sequence (0, 1, 1, 2, 3, 5, 8, 13, 21, 34)"
            hint="Each number is the sum of the two preceding ones: F(n) = F(n-1) + F(n-2)"
            solution={`let a = 0, b = 1;
console.log(a);
console.log(b);

for (let i = 2; i < 10; i++) {
    let c = a + b;
    console.log(c);
    a = b;
    b = c;
}`}
          />
        </div>
      )
    },

    'js-functions': {
      id: 'js-functions',
      title: 'Functions',
      icon: <FunctionSquare className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">JavaScript Functions</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A function is a block of code designed to perform a particular task. It is executed when something invokes (calls) it.
            </p>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-indigo-800 dark:text-indigo-200 mb-3">Function Declaration Types</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <p className="font-mono text-indigo-600 text-sm mb-2">Function Declaration</p>
                  <code className="text-xs text-gray-600 dark:text-gray-400">function name(params) {'{'}...{'}'}</code>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <p className="font-mono text-indigo-600 text-sm mb-2">Function Expression</p>
                  <code className="text-xs text-gray-600 dark:text-gray-400">const name = function(){'{'}...{'}'}</code>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <p className="font-mono text-indigo-600 text-sm mb-2">Arrow Function</p>
                  <code className="text-xs text-gray-600 dark:text-gray-400">{"const name = () => {...}"}</code>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <p className="font-mono text-indigo-600 text-sm mb-2">IIFE</p>
                  <code className="text-xs text-gray-600 dark:text-gray-400">(function(){'{'}...{'}'})()</code>
                </div>
              </div>
            </div>
          </div>

          <InteractiveCodeEditor
            title="Functions Demo"
            language="javascript"
            initialCode={`// Function Declaration
function greet(name) {
    return "Hello, " + name + "!";
}
console.log(greet("Alice"));

// Function with default parameters
function welcome(name = "Guest") {
    console.log("Welcome, " + name);
}
welcome();          // Welcome, Guest
welcome("Bob");     // Welcome, Bob

// Function Expression
const square = function(x) {
    return x * x;
};
console.log("Square of 5:", square(5));

// Arrow Functions
const add = (a, b) => a + b;
console.log("5 + 3 =", add(5, 3));

// Arrow function with block body
const multiply = (a, b) => {
    const result = a * b;
    return result;
};
console.log("4 * 6 =", multiply(4, 6));

// Callback Functions
function processData(data, callback) {
    return callback(data);
}

const double = x => x * 2;
const triple = x => x * 3;

console.log("Double 5:", processData(5, double));
console.log("Triple 5:", processData(5, triple));

// Higher-Order Functions
function multiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double2 = multiplier(2);
const triple2 = multiplier(3);

console.log("Double 10:", double2(10));
console.log("Triple 10:", triple2(10));

// Recursive Function
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}
console.log("5! =", factorial(5));

// Scope
function testScope() {
    let localVar = "I'm local";
    console.log(localVar);
}
testScope();
// console.log(localVar); // Error: not defined outside

// Closures
function createCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log("Counter:", counter()); // 1
console.log("Counter:", counter()); // 2
console.log("Counter:", counter()); // 3`}
          />

          <Quiz
            questions={[
              {
                question: "What is a closure in JavaScript?",
                options: [
                  "A way to end a function",
                  "A function that has access to variables from its outer scope",
                  "A type of loop",
                  "A method to import code"
                ],
                correctAnswer: 1,
                explanation: "A closure is a function that has access to its outer scope's variables even after the outer function has returned."
              },
              {
                question: "What is the main difference between let and var in function scope?",
                options: [
                  "No difference",
                  "let is block-scoped, var is function-scoped",
                  "var is faster",
                  "let cannot be reassigned"
                ],
                correctAnswer: 1,
                explanation: "let is block-scoped (only available within {}), while var is function-scoped (available throughout the function)."
              }
            ]}
          />
        </div>
      )
    },

    'js-arrays': {
      id: 'js-arrays',
      title: 'Arrays',
      icon: <ListChecks className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">JavaScript Arrays</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Arrays are used to store multiple values in a single variable. They are zero-indexed, meaning the first element is at position 0.
            </p>

            <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-cyan-800 dark:text-cyan-200 mb-3">Array Methods</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                {['push()', 'pop()', 'shift()', 'unshift()', 'slice()', 'splice()', 'concat()', 'join()', 'indexOf()', 'includes()', 'find()', 'filter()', 'map()', 'reduce()', 'sort()', 'reverse()'].map((method, i) => (
                  <code key={i} className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-cyan-600 dark:text-cyan-400">{method}</code>
                ))}
              </div>
            </div>
          </div>

          <InteractiveCodeEditor
            title="Arrays Demo"
            language="javascript"
            initialCode={`// Creating Arrays
let fruits = ["Apple", "Banana", "Orange"];
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "hello", true, null, {name: "John"}];

console.log("Fruits:", fruits);
console.log("Numbers:", numbers);
console.log("Mixed array:", mixed);

// Accessing Elements
console.log("\\n=== Accessing ===");
console.log("First fruit:", fruits[0]);
console.log("Last fruit:", fruits[fruits.length - 1]);

// Modifying Arrays
console.log("\\n=== Modifying ===");
fruits.push("Mango");           // Add to end
console.log("After push:", fruits);

fruits.pop();                   // Remove from end
console.log("After pop:", fruits);

fruits.unshift("Strawberry");   // Add to beginning
console.log("After unshift:", fruits);

fruits.shift();                 // Remove from beginning
console.log("After shift:", fruits);

// Finding Elements
console.log("\\n=== Finding ===");
let nums = [1, 5, 10, 15, 20];
console.log("Index of 10:", nums.indexOf(10));
console.log("Includes 15:", nums.includes(15));
console.log("Find > 10:", nums.find(n => n > 10));
console.log("Find index > 10:", nums.findIndex(n => n > 10));

// Filtering and Mapping
console.log("\\n=== Transform ===");
let ages = [12, 18, 25, 16, 30];

// Filter adults (18+)
let adults = ages.filter(age => age >= 18);
console.log("Adults:", adults);

// Map to double
let doubled = ages.map(age => age * 2);
console.log("Doubled:", doubled);

// Chain methods
let result = ages
    .filter(age => age >= 18)
    .map(age => age * 2)
    .reduce((sum, age) => sum + age, 0);
console.log("Sum of doubled adults:", result);

// Sorting
console.log("\\n=== Sorting ===");
let unsorted = [3, 1, 4, 1, 5, 9, 2, 6];
console.log("Unsorted:", unsorted);
console.log("Sorted:", [...unsorted].sort((a, b) => a - b));

// String operations
console.log("\\n=== String Conversion ===");
let arr = ["HTML", "CSS", "JavaScript"];
console.log("Join:", arr.join(" - "));
console.log("Split:", arr.join(",").split(","));

// Spread operator
console.log("\\n=== Spread Operator ===");
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let combined = [...arr1, ...arr2];
console.log("Combined:", combined);

let copy = [...arr1];
copy.push(4);
console.log("Copy:", copy);`}
          />

          <Exercise
            question="Given an array of scores [85, 92, 78, 95, 88], find the average score"
            hint="Use reduce to sum all values, then divide by array length"
            solution={`const scores = [85, 92, 78, 95, 88];
const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
console.log("Average score:", average);`}
          />
        </div>
      )
    },

    'js-objects': {
      id: 'js-objects',
      title: 'Objects',
      icon: <Braces className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">JavaScript Objects</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Objects are collections of key-value pairs. They are used to store related data and functionality.
            </p>

            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-pink-800 dark:text-pink-200 mb-3">Object Properties</h4>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 font-mono text-sm">
                <p className="text-pink-600">const person = {'{'}</p>
                <p className="text-pink-600 ml-4">name: "John",</p>
                <p className="text-pink-600 ml-4">age: 30,</p>
                <p className="text-pink-600 ml-4">isStudent: false,</p>
                <p className="text-pink-600 ml-4">greet: function() {'{'}...{'}'}</p>
                <p className="text-pink-600">{'}'}</p>
              </div>
            </div>
          </div>

          <InteractiveCodeEditor
            title="Objects Demo"
            language="javascript"
            initialCode={`// Creating Objects
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    isStudent: false,
    hobbies: ["reading", "coding", "gaming"],

    // Method
    greet: function() {
        return "Hello, I'm " + this.firstName;
    },

    // Getter
    get fullName() {
        return this.firstName + " " + this.lastName;
    }
};

console.log("=== Object Properties ===");
console.log("Name:", person.firstName);
console.log("Age:", person["age"]);
console.log("Full Name:", person.fullName);
console.log("Greeting:", person.greet());

// Modifying Objects
console.log("\\n=== Modifying ===");
person.age = 31;
person.city = "New York";
console.log("Updated Age:", person.age);
console.log("New City:", person.city);

// Object Methods
console.log("\\n=== Object Methods ===");
console.log("Keys:", Object.keys(person));
console.log("Values:", Object.values(person));
console.log("Entries:", Object.entries(person));

// Destructuring
console.log("\\n=== Destructuring ===");
const { firstName, lastName, age } = person;
console.log(\`\${firstName} \${lastName} is \${age} years old\`);

// Spread operator
console.log("\\n=== Spread Operator ===");
const person2 = { ...person, age: 25 };
console.log("Person2:", person2);

// Object.assign
const defaults = { theme: "dark", fontSize: 14 };
const settings = { fontSize: 16 };
const merged = Object.assign({}, defaults, settings);
console.log("Merged:", merged);

// Object Methods for Checking
console.log("\\n=== Checking ===");
console.log("Has firstName:", person.hasOwnProperty("firstName"));
console.log("Has email:", person.hasOwnProperty("email"));

// Constructor Function
function Car(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.getAge = function() {
        return new Date().getFullYear() - this.year;
    };
}

const myCar = new Car("Toyota", "Camry", 2020);
console.log("\\n=== Constructor ===");
console.log("Car:", myCar.brand, myCar.model);
console.log("Age:", myCar.getAge(), "years");

// Class Syntax
class Animal {
    constructor(name, sound) {
        this.name = name;
        this.sound = sound;
    }

    speak() {
        return this.name + " says " + this.sound + "!";
    }
}

const dog = new Animal("Dog", "Woof");
console.log("\\n=== Class ===");
console.log(dog.speak());`}
          />

          <Quiz
            questions={[
              {
                question: "What is the correct way to access a property named 'first-name' from an object?",
                options: ["obj.first-name", 'obj["first-name"]', "obj.firstName", "Both B and C"],
                correctAnswer: 1,
                explanation: 'When property names contain hyphens or start with numbers, you must use bracket notation: obj["first-name"].'
              },
              {
                question: "What does the Object.freeze() method do?",
                options: [
                  "Deletes all object properties",
                  "Prevents modifications to object properties",
                  "Creates a copy of the object",
                  "Converts object to array"
                ],
                correctAnswer: 1,
                explanation: "Object.freeze() makes an object immutable - you cannot add, remove, or modify its properties."
              }
            ]}
          />
        </div>
      )
    }
  };

  const topicList = Object.values(topics);

  return (
    <div className="space-y-6">
      {/* Chapter Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Terminal className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Chapter 3: JavaScript Basics</h1>
            <p className="text-white/80">Learn JavaScript fundamentals: variables, operators, conditionals, loops, functions, and arrays</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <p className="text-sm opacity-80">Topics</p>
            <p className="font-bold">{topicList.length}</p>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <p className="text-sm opacity-80">Exercises</p>
            <p className="font-bold">{topicList.filter(t => t.exercise).length}</p>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <p className="text-sm opacity-80">Quizzes</p>
            <p className="font-bold">{topicList.filter(t => t.quiz).length}</p>
          </div>
        </div>
      </div>

      {/* Topics Accordion */}
      <div className="space-y-4">
        {topicList.map((topic, index) => {
          const isExpanded = expandedTopic === topic.id;
          const isCompleted = progress[`chapter3-${topic.id}`];

          return (
            <div
              key={topic.id}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 overflow-hidden transition-all ${
                isExpanded ? 'border-yellow-500' : 'border-transparent hover:border-gray-200 dark:border-gray-700'
              }`}
            >
              <button
                onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                className="w-full p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isCompleted ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <span className="font-bold">{index + 1}</span>}
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-800 dark:text-white">{topic.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Click to {isExpanded ? 'collapse' : 'expand'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {topic.exercise && <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 text-xs rounded-lg">Exercise</span>}
                  {topic.quiz && <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 text-xs rounded-lg">Quiz</span>}
                  {isExpanded ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
                </div>
              </button>

              {isExpanded && (
                <div className="p-6 pt-0 space-y-6 border-t border-gray-100 dark:border-gray-700">
                  {topic.content}
                  {topic.exercise && <div className="mt-6">{topic.exercise}</div>}
                  {topic.quiz && <div className="mt-6"><Quiz questions={topic.quiz.questions} /></div>}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    {!isCompleted && (
                      <button onClick={() => markComplete(topic.id)} className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors">
                        <CheckCircle className="w-5 h-5" /> Mark as Complete
                      </button>
                    )}
                    {isCompleted && <span className="flex items-center gap-2 text-green-600 font-medium"><CheckCircle className="w-5 h-5" /> Completed</span>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
