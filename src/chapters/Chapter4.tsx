import { useState } from 'react';
import { Zap, MousePointer, Database, Calendar, Type, Shield, Code, CheckCircle, ChevronRight, ChevronDown } from 'lucide-react';
import InteractiveCodeEditor from '../components/InteractiveCodeEditor';
import VisualDemo from '../components/VisualDemo';
import Exercise from '../components/Exercise';
import Quiz from '../components/Quiz';

interface Chapter4Props {
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

export default function Chapter4({ progress, updateProgress }: Chapter4Props) {
  const [expandedTopic, setExpandedTopic] = useState<string | null>('dom-intro');

  const markComplete = (topicId: string) => {
    updateProgress('chapter4', topicId, true);
  };

  const topics = {
    'dom-intro': {
      id: 'dom-intro',
      title: 'The DOM (Document Object Model)',
      icon: <Code className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">What is the DOM?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The <strong>DOM (Document Object Model)</strong> is a programming interface for HTML documents. It represents the page so that programs can change the document structure, style, and content.
            </p>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3">DOM Tree Structure</h4>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 font-mono text-sm">
                <p className="text-gray-500">document</p>
                <p className="text-gray-500 ml-4">└── html</p>
                <p className="text-gray-500 ml-8">├── head</p>
                <p className="text-gray-500 ml-12">└── title</p>
                <p className="text-gray-500 ml-8">└── body</p>
                <p className="text-gray-500 ml-12">├── h1</p>
                <p className="text-gray-500 ml-12">└── p</p>
              </div>
            </div>

            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Selecting DOM Elements</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { method: 'getElementById()', desc: 'Select by ID', example: 'getElementById("myId")' },
                { method: 'getElementsByClassName()', desc: 'Select by class', example: 'getElementsByClassName("myClass")' },
                { method: 'getElementsByTagName()', desc: 'Select by tag', example: 'getElementsByTagName("p")' },
                { method: 'querySelector()', desc: 'Select first match', example: 'querySelector(".myClass")' },
                { method: 'querySelectorAll()', desc: 'Select all matches', example: 'querySelectorAll("div p")' }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <p className="font-mono text-purple-600 dark:text-purple-400">{item.method}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                  <code className="text-xs text-blue-600 dark:text-blue-400">{item.example}</code>
                </div>
              ))}
            </div>
          </div>

          <InteractiveCodeEditor
            title="DOM Manipulation Demo"
            language="html"
            initialCode={`<!DOCTYPE html>
<html>
<head>
    <title>DOM Demo</title>
    <style>
        .highlight { background: yellow; padding: 10px; }
        .big { font-size: 24px; font-weight: bold; }
        .hidden { display: none; }
    </style>
</head>
<body>
    <h1 id="title">DOM Manipulation</h1>
    <p class="description">Learn how to manipulate HTML elements</p>
    <div id="content">
        <p>First paragraph</p>
        <p>Second paragraph</p>
    </div>
    <button onclick="changeContent()">Change Content</button>
    <button onclick="addStyle()">Add Style</button>
    <button onclick="createElement()">Create Element</button>
    <button onclick="removeElement()">Remove Element</button>

    <script>
        function changeContent() {
            // Change text content
            document.getElementById("title").textContent = "DOM Changed!";

            // Change HTML content
            document.querySelector(".description").innerHTML = "Content <em>modified</em>!";
        }

        function addStyle() {
            const title = document.getElementById("title");
            title.classList.add("highlight", "big");
        }

        function createElement() {
            const newP = document.createElement("p");
            newP.textContent = "New paragraph added!";
            newP.style.color = "green";
            document.getElementById("content").appendChild(newP);
        }

        function removeElement() {
            const content = document.getElementById("content");
            if (content.lastElementChild.tagName === "P") {
                content.removeChild(content.lastElementChild);
            }
        }
    </script>
</body>
</html>`}
          />

          <Quiz
            questions={[
              {
                question: "Which method selects all elements with a specific class name?",
                options: ["getElementById()", "getElementsByClassName()", "querySelector()", "getElementByTag()"],
                correctAnswer: 1,
                explanation: "getElementsByClassName() returns a collection of elements with the specified class name."
              },
              {
                question: "What is the difference between textContent and innerHTML?",
                options: [
                  "No difference",
                  "textContent sets plain text, innerHTML can set HTML tags",
                  "textContent is faster",
                  "innerHTML is deprecated"
                ],
                correctAnswer: 1,
                explanation: "textContent treats the value as plain text, while innerHTML parses and renders HTML tags."
              }
            ]}
          />
        </div>
      )
    },

    'events': {
      id: 'events',
      title: 'JavaScript Events',
      icon: <MousePointer className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">JavaScript Events</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Events are actions that happen in the browser - clicking a button, hovering over text, submitting a form. JavaScript can respond to these events.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { category: 'Mouse', events: ['click', 'dblclick', 'mouseenter', 'mouseleave', 'mousemove'] },
                { category: 'Keyboard', events: ['keydown', 'keyup', 'keypress'] },
                { category: 'Form', events: ['submit', 'change', 'input', 'focus', 'blur'] },
                { category: 'Document', events: ['DOMContentLoaded', 'load', 'resize', 'scroll'] }
              ].map((item, i) => (
                <div key={i} className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                  <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">{item.category}</h4>
                  <div className="flex flex-wrap gap-1">
                    {item.events.map((event, j) => (
                      <code key={j} className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs text-blue-600 dark:text-blue-400">{event}</code>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <InteractiveCodeEditor
            title="Events Demo"
            language="html"
            initialCode={`<!DOCTYPE html>
<html>
<head>
    <title>Events Demo</title>
    <style>
        .box {
            width: 200px;
            height: 200px;
            background: #3498db;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20px auto;
            border-radius: 10px;
            transition: all 0.3s;
        }
        .box:hover {
            background: #2ecc71;
            transform: scale(1.05);
        }
        .input-group { margin: 20px; }
        input { padding: 10px; border: 2px solid #ddd; border-radius: 5px; }
        input:focus { border-color: #3498db; outline: none; }
    </style>
</head>
<body>
    <h1 style="text-align:center;">JavaScript Events</h1>

    <!-- Mouse Events -->
    <div class="box" id="box">
        Hover or click me!
    </div>
    <p id="eventOutput" style="text-align:center;">Event: none</p>

    <!-- Form Events -->
    <div class="input-group" style="text-align:center;">
        <input type="text" id="nameInput" placeholder="Type your name...">
        <p id="inputStatus">Characters: 0</p>
    </div>

    <form id="myForm" style="text-align:center; margin:20px;">
        <input type="email" id="emailInput" placeholder="Enter email">
        <button type="submit">Submit</button>
    </form>
    <p id="formMessage" style="text-align:center;"></p>

    <script>
        // Mouse Events
        const box = document.getElementById("box");
        const output = document.getElementById("eventOutput");

        box.addEventListener("click", function() {
            output.textContent = "Event: clicked!";
            this.style.background = "#e74c3c";
        });

        box.addEventListener("dblclick", function() {
            output.textContent = "Event: double-clicked!";
            this.style.background = "#9b59b6";
        });

        box.addEventListener("mouseenter", function() {
            output.textContent = "Event: mouse entered";
        });

        box.addEventListener("mouseleave", function() {
            output.textContent = "Event: mouse left";
            this.style.background = "#3498db";
        });

        // Keyboard Events
        const nameInput = document.getElementById("nameInput");
        const inputStatus = document.getElementById("inputStatus");

        nameInput.addEventListener("input", function() {
            inputStatus.textContent = "Characters: " + this.value.length;
        });

        nameInput.addEventListener("focus", function() {
            this.style.boxShadow = "0 0 10px #3498db";
        });

        nameInput.addEventListener("blur", function() {
            this.style.boxShadow = "none";
        });

        // Form Events
        const form = document.getElementById("myForm");
        const formMessage = document.getElementById("formMessage");

        form.addEventListener("submit", function(event) {
            event.preventDefault();
            formMessage.textContent = "Form submitted!";
            formMessage.style.color = "green";
        });

        // Event Object
        document.addEventListener("keydown", function(event) {
            console.log("Key pressed:", event.key);
        });
    </script>
</body>
</html>`}
          />

          <Exercise
            question="Create a button that counts how many times it has been clicked and displays the count"
            hint="Use a variable to store the count and increment it on each click event"
            solution={`let count = 0;
const button = document.getElementById("myButton");
const display = document.getElementById("countDisplay");

button.addEventListener("click", function() {
    count++;
    display.textContent = "Clicked " + count + " times";
});`}
          />
        </div>
      )
    },

    'string-methods': {
      id: 'string-methods',
      title: 'String Methods',
      icon: <Type className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">JavaScript String Methods</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {[
                { method: 'length', desc: 'Returns string length', example: '"hello".length // 5' },
                { method: 'slice(start, end)', desc: 'Extract portion', example: '"hello".slice(1,4) // "ell"' },
                { method: 'substring(start, end)', desc: 'Like slice, no negatives', example: '"hello".substring(1,4)' },
                { method: 'replace(old, new)', desc: 'Replace text', example: '"hi".replace("hi","hello")' },
                { method: 'toUpperCase()', desc: 'Convert to uppercase', example: '"hello".toUpperCase()' },
                { method: 'toLowerCase()', desc: 'Convert to lowercase', example: '"HELLO".toLowerCase()' },
                { method: 'trim()', desc: 'Remove whitespace', example: '" hello ".trim()' },
                { method: 'split(separator)', desc: 'Split into array', example: '"a,b".split(",")' }
              ].map((item, i) => (
                <div key={i} className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3">
                  <p className="font-mono text-green-600 dark:text-green-400">{item.method}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                  <code className="text-xs text-blue-600 dark:text-blue-400">{item.example}</code>
                </div>
              ))}
            </div>
          </div>

          <InteractiveCodeEditor
            title="String Methods Demo"
            language="javascript"
            initialCode={`// String Methods
let text = "   Hello, World!   ";

console.log("=== Basic Methods ===");
console.log("Length:", text.length);
console.log("Trimmed:", text.trim());
console.log("Uppercase:", text.toUpperCase());
console.log("Lowercase:", text.toLowerCase());

// Extracting
console.log("\\n=== Extracting ===");
console.log("charAt(0):", text.charAt(0));
console.log("charCodeAt(0):", text.charCodeAt(0));
console.log("slice(0, 5):", text.slice(0, 5));
console.log("substring(0, 5):", text.substring(0, 5));

// Searching
console.log("\\n=== Searching ===");
let sentence = "The quick brown fox jumps over the lazy dog";
console.log("indexOf('fox'):", sentence.indexOf("fox"));
console.log("lastIndexOf('the'):", sentence.lastIndexOf("the"));
console.log("includes('quick'):", sentence.includes("quick"));
console.log("startsWith('The'):", sentence.startsWith("The"));
console.log("endsWith('dog'):", sentence.endsWith("dog"));

// Modifying
console.log("\\n=== Modifying ===");
console.log("replace():", "hello world".replace("world", "JavaScript"));
console.log("replaceAll():", "hello hello hello".replaceAll("hello", "hi"));
console.log("concat():", "Hello".concat(" ", "World"));
console.log("padStart():", "5".padStart(3, "0"));
console.log("padEnd():", "5".padEnd(3, "0"));

// Split and Join
console.log("\\n=== Split/Join ===");
let csv = "apple,banana,orange";
let fruits = csv.split(",");
console.log("Split:", fruits);

let words = ["Hello", "World"];
console.log("Join:", words.join(" "));

// Template Literals
console.log("\\n=== Template Literals ===");
let name = "Alice";
let age = 25;
let city = "New York";

// Old way
console.log("Old way: My name is " + name + " and I am " + age + " years old.");

// Template literal (preferred)
console.log(\`Template: My name is \${name} and I am \${age} years old.\`);
console.log(\`Multiline:
First line
Second line
Third line\`);

// Expression interpolation
console.log(\`Math: 2 + 3 = \${2 + 3}\`);
console.log(\`Is adult: \${age >= 18 ? "Yes" : "No"}\`);`}
          />

          <Quiz
            questions={[
              {
                question: "What does the split() method return?",
                options: ["String", "Array", "Object", "Number"],
                correctAnswer: 1,
                explanation: "split() divides a string into an array of substrings based on the separator."
              },
              {
                question: "What's the difference between slice() and substring()?",
                options: [
                  "No difference",
                  "slice() can use negative indices, substring() cannot",
                  "substring() is faster",
                  "slice() returns first occurrence"
                ],
                correctAnswer: 1,
                explanation: "slice() allows negative indices (counts from end), while substring() treats negative values as 0."
              }
            ]}
          />
        </div>
      )
    },

    'date-math': {
      id: 'date-math',
      title: 'Date and Math Objects',
      icon: <Calendar className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">JavaScript Date Object</h3>

            <InteractiveCodeEditor
              title="Date Demo"
              language="javascript"
              initialCode={`// Creating Dates
console.log("=== Creating Dates ===");
let now = new Date();
console.log("Now:", now);
console.log("Date string:", now.toDateString());
console.log("ISO string:", now.toISOString());

// Specific Date
let birthday = new Date("2000-01-01");
console.log("Birthday:", birthday);

// Date from components
let customDate = new Date(2024, 0, 15, 10, 30, 0);
console.log("Custom date:", customDate);

// Getting Date Components
console.log("\\n=== Get Methods ===");
console.log("getFullYear():", now.getFullYear());
console.log("getMonth():", now.getMonth()); // 0-11
console.log("getDate():", now.getDate()); // 1-31
console.log("getDay():", now.getDay()); // 0-6 (Sunday = 0)
console.log("getHours():", now.getHours());
console.log("getMinutes():", now.getMinutes());
console.log("getSeconds():", now.getSeconds());
console.log("getMilliseconds():", now.getMilliseconds());
console.log("getTime():", now.getTime()); // Timestamp

// Setting Date Components
console.log("\\n=== Set Methods ===");
let date = new Date();
date.setFullYear(2030);
date.setMonth(5); // June
date.setDate(15);
console.log("Set date:", date.toDateString());

// Formatting
console.log("\\n=== Formatting ===");
console.log("toLocaleDateString():", now.toLocaleDateString());
console.log("toLocaleTimeString():", now.toLocaleTimeString());
console.log("toLocaleString():", now.toLocaleString());

// Date Math
console.log("\\n=== Date Math ===");
let today = new Date();
let tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
console.log("Today:", today.toDateString());
console.log("Tomorrow:", tomorrow.toDateString());

// Date Comparison
let date1 = new Date("2024-01-01");
let date2 = new Date("2024-12-31");
console.log("date1 < date2:", date1 < date2);

// Math Object
console.log("\\n=== Math Object ===");
console.log("Math.PI:", Math.PI);
console.log("Math.E:", Math.E);
console.log("Math.sqrt(16):", Math.sqrt(16));
console.log("Math.pow(2, 3):", Math.pow(2, 3));
console.log("Math.abs(-5):", Math.abs(-5));
console.log("Math.round(4.5):", Math.round(4.5));
console.log("Math.floor(4.9):", Math.floor(4.9));
console.log("Math.ceil(4.1):", Math.ceil(4.1));
console.log("Math.max(1,5,3):", Math.max(1, 5, 3));
console.log("Math.min(1,5,3):", Math.min(1, 5, 3));
console.log("Math.random():", Math.random());
console.log("Math.random() 0-10:", Math.floor(Math.random() * 11));
console.log("Math.random() 1-100:", Math.floor(Math.random() * 100) + 1);`}
            />

            <Exercise
              question="Write JavaScript to display the current date in the format 'Day, Month DD, YYYY' (e.g., 'Tuesday, January 15, 2024')"
              hint="Use toLocaleDateString() with specific options or combine individual date methods"
              solution={`const date = new Date();
const day = date.toLocaleDateString('en-US', { weekday: 'long' });
const month = date.toLocaleDateString('en-US', { month: 'long' });
const dayNum = date.getDate();
const year = date.getFullYear();

console.log(\`\${day}, \${month} \${dayNum}, \${year}\`);`}
            />
          </div>
        </div>
      )
    },

    'regex': {
      id: 'regex',
      title: 'Regular Expressions',
      icon: <Code className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Regular Expressions</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Regular expressions are patterns used to match character combinations in strings. They are powerful for form validation and text processing.
            </p>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-indigo-800 dark:text-indigo-200 mb-3">Common Patterns</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">\d - digit</code>
                <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">\w - word char</code>
                <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">\s - whitespace</code>
                <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">. - any char</code>
                <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">[abc] - any of a,b,c</code>
                <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">[^abc] - not a,b,c</code>
                <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">^ - start</code>
                <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">$ - end</code>
                <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">* - 0 or more</code>
                <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">+ - 1 or more</code>
                <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">? - 0 or 1</code>
                <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">{'{n}'} - exactly n</code>
              </div>
            </div>
          </div>

          <InteractiveCodeEditor
            title="RegExp Demo"
            language="javascript"
            initialCode={`// Creating Regular Expressions
console.log("=== Creating RegExp ===");
let pattern1 = /hello/i; // Case-insensitive
let pattern2 = new RegExp("world", "gi"); // Global, case-insensitive

// test() - returns true/false
console.log("\\n=== test() ===");
let text = "Hello World!";
console.log("/hello/i.test():", /hello/i.test(text));
console.log("/goodbye/i.test():", /goodbye/i.test(text));

// exec() - returns match or null
console.log("\\n=== exec() ===");
let result = /World/.exec(text);
console.log("Match:", result ? result[0] : null);
console.log("Index:", result ? result.index : null);

// String methods with RegExp
console.log("\\n=== String Methods ===");
console.log("match():", text.match(/world/i));
console.log("search():", text.search(/world/i));
console.log("replace():", text.replace(/world/gi, "Universe"));
console.log("split():", "a,b;c d".split(/[,;\s]+/));

// Quantifiers
console.log("\\n=== Quantifiers ===");
let nums = "123 4567 89 12345";
console.log("\\d+ (one or more digits):", nums.match(/\d+/g));
console.log("\\d{3} (exactly 3 digits):", nums.match(/\d{3}/g));
console.log("\\d{2,4} (2-4 digits):", nums.match(/\d{2,4}/g));

// Character classes
console.log("\\n=== Character Classes ===");
console.log("[aeiou] (vowels):", "hello world".match(/[aeiou]/gi));
console.log("[0-9] (digits):", "abc123xyz".match(/[0-9]/g));
console.log("[^0-9] (non-digits):", "abc123xyz".match(/[^0-9]/g));

// Anchors
console.log("\\n=== Anchors ===");
console.log("^Hello (starts with):", /^Hello/.test("Hello World"));
console.log("World$ (ends with):", /World$/.test("Hello World"));
console.log("^Hello World$ (exact):", /^Hello World$/.test("Hello World"));

// Email validation
console.log("\\n=== Email Validation ===");
let emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
console.log("Valid email?:", emailPattern.test("test@example.com"));
console.log("Valid email?:", emailPattern.test("invalid.email"));

// Phone validation
console.log("\\n=== Phone Validation ===");
let phonePattern = /^\\d{3}-\\d{3}-\\d{4}$/;
console.log("Valid phone?:", phonePattern.test("123-456-7890"));

// URL validation
console.log("\\n=== URL Validation ===");
let urlPattern = /^https?:\\/\\/[^\\s]+$/;
console.log("Valid URL?:", urlPattern.test("https://example.com"));
console.log("Valid URL?:", urlPattern.test("not a url"));`}
          />

          <Quiz
            questions={[
              {
                question: "What does the 'g' flag in /test/g do?",
                options: [
                  "Makes it case-insensitive",
                  "Finds all matches, not just first",
                  "Matches at word boundaries",
                  "Enables multiline mode"
                ],
                correctAnswer: 1,
                explanation: "The 'g' (global) flag makes the regex find all matches, not just the first one."
              },
              {
                question: "What does [^0-9] match?",
                options: [
                  "All digits",
                  "All non-digits",
                  "Numbers 0-9",
                  "Nothing"
                ],
                correctAnswer: 1,
                explanation: "The ^ inside brackets negates the class, so [^0-9] matches any character that is NOT a digit."
              }
            ]}
          />
        </div>
      )
    },

    'cookies': {
      id: 'cookies',
      title: 'JavaScript Cookies',
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">JavaScript Cookies</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Cookies are small files stored on a user's computer. They are used to remember information about the user between visits.
            </p>

            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-3">Cookie Structure</h4>
              <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                <code>name=value; expires=date; path=/; domain=example.com; secure</code>
              </p>
              <ul className="text-sm space-y-1 text-orange-700 dark:text-orange-300">
                <li><strong>name=value</strong> - Cookie data (required)</li>
                <li><strong>expires</strong> - When cookie expires</li>
                <li><strong>path</strong> - URL path the cookie applies to</li>
                <li><strong>domain</strong> - Domain the cookie applies to</li>
                <li><strong>secure</strong> - Only over HTTPS</li>
              </ul>
            </div>
          </div>

          <InteractiveCodeEditor
            title="Cookies Demo"
            language="html"
            initialCode={`<!DOCTYPE html>
<html>
<head>
    <title>Cookies Demo</title>
</head>
<body>
    <h1>Cookie Management</h1>

    <div>
        <label>Username:</label>
        <input type="text" id="usernameInput" placeholder="Enter username">
        <button onclick="setCookie()">Save Cookie</button>
    </div>

    <div style="margin-top:20px;">
        <button onclick="getCookie()">Get Cookie</button>
        <button onclick="showAllCookies()">Show All Cookies</button>
        <button onclick="deleteCookie()">Delete Cookie</button>
    </div>

    <p id="cookieOutput"></p>

    <script>
        // Set Cookie
        function setCookie() {
            const username = document.getElementById("usernameInput").value;
            if (!username) {
                alert("Please enter a username");
                return;
            }

            // Set expiration date (7 days from now)
            const expires = new Date();
            expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);

            document.cookie = "username=" + encodeURIComponent(username) +
                "; expires=" + expires.toUTCString() +
                "; path=/";

            document.getElementById("cookieOutput").innerHTML =
                "Cookie saved: <strong>" + username + "</strong>";
        }

        // Get Cookie
        function getCookie() {
            const name = "username=";
            const decodedCookie = decodeURIComponent(document.cookie);
            const ca = decodedCookie.split(';');

            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    const username = c.substring(name.length, c.length);
                    document.getElementById("cookieOutput").innerHTML =
                        "Welcome back: <strong>" + username + "</strong>";
                    return;
                }
            }
            document.getElementById("cookieOutput").innerHTML =
                "No cookie found!";
        }

        // Show All Cookies
        function showAllCookies() {
            const output = document.getElementById("cookieOutput");
            if (document.cookie) {
                const cookies = document.cookie.split(';');
                let html = "<strong>All Cookies:</strong><br>";
                cookies.forEach(cookie => {
                    html += cookie.trim() + "<br>";
                });
                output.innerHTML = html;
            } else {
                output.innerHTML = "No cookies found!";
            }
        }

        // Delete Cookie
        function deleteCookie() {
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.getElementById("usernameInput").value = "";
            document.getElementById("cookieOutput").innerHTML =
                "Cookie deleted!";
        }

        // Auto-load on page visit
        window.addEventListener('load', function() {
            const name = "username=";
            const decodedCookie = decodeURIComponent(document.cookie);
            const ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0) {
                    const username = c.substring(name.length, c.length);
                    document.getElementById("cookieOutput").innerHTML =
                        "Welcome back: <strong>" + username + "</strong>";
                }
            }
        });
    </script>
</body>
</html>`}
          />

          <Exercise
            question="Create a function that checks if a cookie named 'isLoggedIn' exists and returns true or false"
            hint="Search through document.cookie for the cookie name"
            solution={`function isLoggedIn() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        if (cookie.trim().startsWith('isLoggedIn=')) {
            return true;
        }
    }
    return false;
}`}
          />
        </div>
      )
    },

    'jquery-intro': {
      id: 'jquery-intro',
      title: 'Introduction to jQuery',
      icon: <Zap className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">What is jQuery?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              jQuery is a <strong>lightweight JavaScript library</strong> that simplifies HTML DOM manipulation, event handling, and animations. The motto is "write less, do more."
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">Why jQuery?</h4>
              <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                <li>✅ Cross-browser compatible</li>
                <li>✅ Simplified DOM manipulation</li>
                <li>✅ Easy event handling</li>
                <li>✅ Powerful animations</li>
                <li>✅ AJAX support</li>
                <li>✅ Large ecosystem of plugins</li>
              </ul>
            </div>

            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Basic Syntax</h4>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 font-mono text-sm mb-6">
              <p className="text-purple-600">$(selector).action()</p>
              <p className="text-gray-500 mt-2">$ - Define/access jQuery</p>
              <p className="text-gray-500">(selector) - Find HTML elements</p>
              <p className="text-gray-500">.action() - jQuery method</p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 font-mono text-sm">
              <p className="text-green-600">// Document ready</p>
              <p className="text-blue-600">{"$(document).ready(function(){"}</p>
              <p className="pl-4 text-gray-600">// jQuery code here</p>
              <p className="text-blue-600">{"});"}</p>
              <p className="text-green-600 mt-2">// Shorthand</p>
              <p className="text-blue-600">{"$(function(){"}</p>
              <p className="pl-4 text-gray-600">// jQuery code here</p>
              <p className="text-blue-600">{"});"}</p>
            </div>
          </div>

          <InteractiveCodeEditor
            title="jQuery Demo"
            language="html"
            initialCode={`<!DOCTYPE html>
<html>
<head>
    <title>jQuery Demo</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        .demo-box {
            width: 200px;
            height: 200px;
            background: #3498db;
            margin: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            border-radius: 10px;
        }
        .highlight { background: yellow !important; }
    </style>
</head>
<body>
    <h1>jQuery Demonstration</h1>

    <!-- Selectors -->
    <div id="content">
        <p class="text">First paragraph</p>
        <p class="text">Second paragraph</p>
        <p>Third paragraph</p>
    </div>

    <!-- Buttons -->
    <button id="btn1">Hide All</button>
    <button id="btn2">Show All</button>
    <button id="btn3">Toggle</button>
    <button id="btn4">Fade</button>
    <button id="btn5">Slide</button>

    <!-- Animation -->
    <div class="demo-box" id="box">Click me!</div>

    <script>
        $(document).ready(function() {
            // Click handler
            $("#btn1").click(function() {
                $(".text").hide();
            });

            $("#btn2").click(function() {
                $(".text").show();
            });

            // Toggle
            $("#btn3").click(function() {
                $(".text").toggle();
            });

            // Fade
            $("#btn4").click(function() {
                $("#box").fadeToggle(500);
            });

            // Slide
            $("#btn5").click(function() {
                $("#box").slideToggle();
            });

            // jQuery Selectors
            console.log("All p elements:", $("p").length);
            console.log("Elements with class 'text':", $(".text").length);
            console.log("Element with id 'content':", $("#content").text());
        });
    </script>
</body>
</html>`}
          />

          <Quiz
            questions={[
              {
                question: "What is the jQuery syntax for selecting all paragraphs?",
                options: ["$('p')", "$('#p')", "$('.p')", "$('paragraph')"],
                correctAnswer: 0,
                explanation: "$('p') selects all <p> elements, just like the CSS selector for paragraphs."
              },
              {
                question: "What does $(document).ready() do?",
                options: [
                  "Creates a new document",
                  "Waits for DOM to be fully loaded before executing code",
                  "Loads external files",
                  "Creates a new jQuery object"
                ],
                correctAnswer: 1,
                explanation: "The ready event ensures code runs after the DOM is fully loaded, preventing errors from accessing elements that don't exist yet."
              }
            ]}
          />
        </div>
      )
    },

    'dom-advanced': {
      id: 'dom-advanced',
      title: 'Advanced DOM Manipulation',
      icon: <Database className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Advanced DOM Operations</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">Adding Elements</h4>
                <code className="text-sm text-green-600">append()</code>
                <p className="text-xs text-gray-500">Add to end</p>
                <code className="text-sm text-green-600">prepend()</code>
                <p className="text-xs text-gray-500">Add to beginning</p>
                <code className="text-sm text-green-600">after()</code>
                <p className="text-xs text-gray-500">Insert after</p>
                <code className="text-sm text-green-600">before()</code>
                <p className="text-xs text-gray-500">Insert before</p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
                <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">Removing Elements</h4>
                <code className="text-sm text-red-600">remove()</code>
                <p className="text-xs text-gray-500">Remove element + children</p>
                <code className="text-sm text-red-600">empty()</code>
                <p className="text-xs text-gray-500">Remove children only</p>
              </div>
            </div>
          </div>

          <InteractiveCodeEditor
            title="Advanced DOM Demo"
            language="html"
            initialCode={`<!DOCTYPE html>
<html>
<head>
    <title>Advanced DOM</title>
    <style>
        .card { border: 2px solid #3498db; padding: 10px; margin: 10px; border-radius: 5px; }
        .highlight { background: yellow; }
        .bold { font-weight: bold; }
    </style>
</head>
<body>
    <h1>Advanced DOM Manipulation</h1>

    <div id="container">
        <div class="card" id="card1">Card 1</div>
        <div class="card" id="card2">Card 2</div>
    </div>

    <button onclick="addElement()">Add Card</button>
    <button onclick="removeElement()">Remove Last</button>
    <button onclick="cloneElement()">Clone First</button>
    <button onclick="replaceElement()">Replace Card 2</button>

    <hr>

    <div id="contentBox">
        <p>Original content</p>
    </div>
    <button onclick="changeStyles()">Change Styles</button>
    <button onclick="getAttributes()">Get Attributes</button>
    <button onclick="setAttributes()">Set Attributes</button>

    <script>
        let cardCount = 2;

        function addElement() {
            cardCount++;
            const newCard = document.createElement("div");
            newCard.className = "card";
            newCard.id = "card" + cardCount;
            newCard.textContent = "Card " + cardCount;
            document.getElementById("container").appendChild(newCard);
        }

        function removeElement() {
            const container = document.getElementById("container");
            if (container.lastElementChild) {
                container.removeChild(container.lastElementChild);
            }
        }

        function cloneElement() {
            const original = document.getElementById("card1");
            const clone = original.cloneNode(true);
            clone.id = "card" + (cardCount + 1);
            document.getElementById("container").appendChild(clone);
        }

        function replaceElement() {
            const newElement = document.createElement("div");
            newElement.className = "card";
            newElement.textContent = "Replaced!";
            newElement.style.background = "#e74c3c";
            newElement.style.color = "white";

            const oldElement = document.getElementById("card2");
            oldElement.parentNode.replaceChild(newElement, oldElement);
        }

        function changeStyles() {
            const box = document.getElementById("contentBox");
            box.classList.toggle("highlight");
            box.classList.toggle("bold");

            // Direct style manipulation
            box.style.padding = "20px";
            box.style.backgroundColor = box.style.backgroundColor ? "" : "#f0f0f0";
        }

        function getAttributes() {
            const box = document.getElementById("contentBox");
            console.log("ID:", box.id);
            console.log("Class:", box.className);
            console.log("Tag:", box.tagName);
        }

        function setAttributes() {
            const box = document.getElementById("contentBox");
            box.setAttribute("data-info", "custom data");
            box.setAttribute("title", "This is a tooltip");
            console.log("Data-info set:", box.getAttribute("data-info"));
        }
    </script>
</body>
</html>`}
          />

          <Exercise
            question="Write JavaScript to create a todo list where users can add new items and remove existing ones"
            hint="Use createElement, appendChild, and removeChild"
            solution={`const todoList = [];

function addTodo() {
    const input = document.getElementById("todoInput");
    const text = input.value.trim();
    if (!text) return;

    todoList.push(text);
    renderTodos();
    input.value = "";
}

function removeTodo(index) {
    todoList.splice(index, 1);
    renderTodos();
}

function renderTodos() {
    const list = document.getElementById("todoList");
    list.innerHTML = "";
    todoList.forEach((todo, index) => {
        const li = document.createElement("li");
        li.textContent = todo;
        li.onclick = () => removeTodo(index);
        list.appendChild(li);
    });
}`}
          />
        </div>
      )
    }
  };

  const topicList = Object.values(topics);

  return (
    <div className="space-y-6">
      {/* Chapter Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Zap className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Chapter 4: Advanced JavaScript & jQuery</h1>
            <p className="text-white/80">Explore DOM manipulation, events, objects, strings, dates, regular expressions, cookies, and jQuery</p>
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
          const isCompleted = progress[`chapter4-${topic.id}`];

          return (
            <div
              key={topic.id}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 overflow-hidden transition-all ${
                isExpanded ? 'border-purple-500' : 'border-transparent hover:border-gray-200 dark:border-gray-700'
              }`}
            >
              <button
                onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                className="w-full p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isCompleted ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600'
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
