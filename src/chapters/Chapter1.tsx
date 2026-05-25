import { useState } from 'react';
import { Globe, Server, Wifi, Monitor, ChevronRight, ChevronDown, CheckCircle, Play, ArrowRight, Network, Database, Link } from 'lucide-react';
import InteractiveCodeEditor from '../components/InteractiveCodeEditor';
import VisualDemo from '../components/VisualDemo';
import Exercise from '../components/Exercise';
import Quiz from '../components/Quiz';

interface Chapter1Props {
  progress: Record<string, boolean>;
  updateProgress: (chapterId: string, topicId: string, completed: boolean) => void;
}

interface TopicSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  exercise?: React.ReactNode;
  quiz?: { questions: { question: string; options: string[]; correctAnswer: number; explanation?: string }[] };
}

export default function Chapter1({ progress, updateProgress }: Chapter1Props) {
  const [expandedTopic, setExpandedTopic] = useState<string | null>('internet-basics');

  const markComplete = (topicId: string) => {
    updateProgress('chapter1', topicId, true);
  };

  const topics: Record<string, TopicSection> = {
    'internet-basics': {
      id: 'internet-basics',
      title: 'What is the Internet?',
      icon: <Globe className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Understanding the Internet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The <strong>Internet</strong> (sometimes called "the Net") is a <strong>global system of interconnected computer networks</strong> that use the standard Internet protocol suite (TCP/IP) to link billions of devices worldwide.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">Key Internet Facts:</h4>
              <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>It's a network of networks - millions of private, public, academic, business, and government networks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Linked by a broad array of electronic, wireless, and optical networking technologies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>No centralized governance - each network sets its own policies</span>
                </li>
              </ul>
            </div>

            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Internet Services</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <h5 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                  <Monitor className="w-4 h-4" /> World Wide Web
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The most widely used part of the Internet - a system of information resources accessed through hypertext
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <h5 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                  <Server className="w-4 h-4" /> Communication
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Email, VoIP, Video Conferencing, IRC, and more
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <h5 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                  <Database className="w-4 h-4" /> File Transfer
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  FTP, Gopher, and other protocols for sharing files
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <h5 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                  <Network className="w-4 h-4" /> Directory Services
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  DNS (Domain Name System), LDAP for network management
                </p>
              </div>
            </div>
          </div>

          <VisualDemo
            type="diagram"
            title="How the Internet Works"
            description="Visual representation of internet connectivity"
            content={
              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-4 text-center w-32">
                    <Monitor className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Your Computer</p>
                  </div>
                  <div className="text-2xl text-gray-400">→</div>
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-4 text-center w-32">
                    <Server className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">Router</p>
                  </div>
                  <div className="text-2xl text-gray-400">→</div>
                  <div className="bg-purple-100 dark:bg-purple-900/30 rounded-xl p-4 text-center w-32">
                    <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-purple-800 dark:text-purple-200">Internet</p>
                  </div>
                  <div className="text-2xl text-gray-400">→</div>
                  <div className="bg-orange-100 dark:bg-orange-900/30 rounded-xl p-4 text-center w-32">
                    <Server className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-orange-800 dark:text-orange-200">Web Server</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
                  Data travels through multiple networks using standardized protocols until it reaches the destination server
                </p>
              </div>
            }
          />
        </div>
      ),
      exercise: (
        <Exercise
          question="What is the main protocol suite that the Internet uses for communication?"
          hint="Think about the two main protocols that work together: one for transport and one for addressing"
          solution="TCP/IP (Transmission Control Protocol/Internet Protocol)"
        />
      ),
      quiz: {
        questions: [
          {
            question: "What does the Internet use as its standard protocol suite?",
            options: ["HTTP/HTTPS", "TCP/IP", "FTP/SMTP", "All of the above"],
            correctAnswer: 1,
            explanation: "TCP/IP (Transmission Control Protocol/Internet Protocol) is the foundational protocol suite of the Internet."
          },
          {
            question: "Which organization directs the technical standards of the Internet?",
            options: ["ICANN", "IETF", "W3C", "Both ICANN and IETF"],
            correctAnswer: 3,
            explanation: "ICANN manages domain names while IETF standardizes core protocols like IPv4/IPv6."
          }
        ]
      }
    },

    'www-basics': {
      id: 'www-basics',
      title: 'World Wide Web (WWW)',
      icon: <Globe className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">World Wide Web</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The <strong>World Wide Web (WWW)</strong> was created in 1991 by <strong>Tim Berners-Lee</strong> and his team. It introduced <strong>hypertext</strong> - a method of connecting content through hyperlinks that revolutionized information sharing.
            </p>

            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white mb-6">
              <h4 className="font-bold mb-2">Key Innovation: Hypertext</h4>
              <p className="text-white/90">
                Hypertext allows you to click on words or phrases to instantly navigate to related content,
                creating a "web" of interconnected documents across the globe.
              </p>
            </div>

            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">How Web Browsing Works</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div className="flex-1">
                  <h5 className="font-bold text-gray-800 dark:text-white">DNS Lookup</h5>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Your browser asks the DNS server to convert a domain name (like google.com) into an IP address</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div className="flex-1">
                  <h5 className="font-bold text-gray-800 dark:text-white">TCP/IP Connection</h5>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Your browser opens a TCP connection to the web server (typically on port 80)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div className="flex-1">
                  <h5 className="font-bold text-gray-800 dark:text-white">HTTP Request</h5>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Browser sends an HTTP request (like GET /index.html) to fetch the page</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div className="flex-1">
                  <h5 className="font-bold text-gray-800 dark:text-white">HTTP Response</h5>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Server responds with HTML, CSS, JavaScript, and other resources</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                <div className="flex-1">
                  <h5 className="font-bold text-gray-800 dark:text-white">Rendering</h5>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Browser renders the content on screen</p>
                </div>
              </div>
            </div>
          </div>

          <VisualDemo
            type="diagram"
            title="Web Request Flow"
            description="See how a web page is loaded step by step"
            content={
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-3 text-center flex-1">
                    <Monitor className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs font-medium text-blue-800 dark:text-blue-200">Browser</p>
                  </div>
                  <div className="text-blue-500 font-mono text-sm">HTTP</div>
                  <div className="bg-gray-200 dark:bg-gray-600 rounded-full px-2 py-1 text-xs">→</div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-xl p-3 text-center flex-1">
                    <Server className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                    <p className="text-xs font-medium text-yellow-800 dark:text-yellow-200">DNS</p>
                  </div>
                  <div className="text-yellow-500 font-mono text-sm">IP</div>
                  <div className="bg-gray-200 dark:bg-gray-600 rounded-full px-2 py-1 text-xs">↓</div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-3 text-center flex-1">
                    <Server className="w-6 h-6 text-green-600 mx-auto mb-1" />
                    <p className="text-xs font-medium text-green-800 dark:text-green-200">Web Server</p>
                  </div>
                  <div className="text-green-500 font-mono text-sm">HTML</div>
                  <div className="bg-gray-200 dark:bg-gray-600 rounded-full px-2 py-1 text-xs">←</div>
                </div>
              </div>
            }
          />
        </div>
      )
    },

    'tcpip': {
      id: 'tcpip',
      title: 'TCP/IP Protocol Suite',
      icon: <Network className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">TCP/IP Protocol Suite</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>TCP/IP</strong> is a set of protocols developed to allow cooperating computers to share resources across a network. It's the foundational technology of the Internet.
            </p>

            <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-xl p-6 mb-6 text-white">
              <h4 className="font-bold mb-2">TCP vs IP</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/20 rounded-lg p-4">
                  <p className="font-bold mb-1">IP (Internet Protocol)</p>
                  <p className="text-sm">Network Layer - Provides addressing and routing</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <p className="font-bold mb-1">TCP (Transmission Control)</p>
                  <p className="text-sm">Transport Layer - Ensures reliable delivery</p>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">TCP/IP Layers</h4>
            <div className="space-y-3">
              {[
                { layer: 'Application Layer', protocols: 'HTTP, FTP, SMTP, DNS, Telnet', color: 'red' },
                { layer: 'Transport Layer', protocols: 'TCP, UDP', color: 'blue' },
                { layer: 'Internet Layer', protocols: 'IP, ICMP, ARP', color: 'green' },
                { layer: 'Network Interface', protocols: 'Ethernet, Wi-Fi, PPP', color: 'purple' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-32 p-3 bg-${item.color}-100 dark:bg-${item.color}-900/30 rounded-lg`}>
                    <p className={`text-sm font-bold text-${item.color}-800 dark:text-${item.color}-200`}>{item.layer}</p>
                  </div>
                  <div className="flex-1 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.protocols}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <VisualDemo
            type="diagram"
            title="TCP/IP vs OSI Model"
            description="Compare network protocol layers"
            content={
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h5 className="font-bold text-center text-gray-800 dark:text-white mb-2">OSI Model</h5>
                  {['Application', 'Presentation', 'Session', 'Transport', 'Network', 'Data Link', 'Physical'].map((layer, i) => (
                    <div key={i} className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-2 text-center">
                      <p className="text-xs font-medium text-blue-800 dark:text-blue-200">{layer}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <h5 className="font-bold text-center text-gray-800 dark:text-white mb-2">TCP/IP Model</h5>
                  {['Application', 'Transport', 'Internet', 'Network Interface'].map((layer, i) => (
                    <div key={i} className="bg-green-100 dark:bg-green-900/30 rounded-lg p-2 text-center">
                      <p className="text-xs font-medium text-green-800 dark:text-green-200">{layer}</p>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
        </div>
      )
    },

    'http': {
      id: 'http',
      title: 'HTTP Protocol',
      icon: <Link className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">HTTP - Hypertext Transfer Protocol</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              HTTP is a <strong>stateless protocol</strong> that governs how browsers and servers communicate. Each request is independent - the server doesn't remember previous requests.
            </p>

            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">HTTP Methods</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { method: 'GET', desc: 'Retrieve data from server', color: 'green' },
                { method: 'POST', desc: 'Send data to server', color: 'blue' },
                { method: 'PUT', desc: 'Update/replace data', color: 'yellow' },
                { method: 'DELETE', desc: 'Remove data', color: 'red' },
                { method: 'HEAD', desc: 'Get headers only', color: 'gray' },
                { method: 'PATCH', desc: 'Partial update', color: 'purple' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <span className={`px-2 py-1 bg-${item.color}-500 text-white text-xs font-bold rounded`}>
                    {item.method}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</span>
                </div>
              ))}
            </div>

            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3 mt-6">HTTP Status Codes</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                { range: '1xx', name: 'Informational', example: '100 Continue', color: 'gray' },
                { range: '2xx', name: 'Success', example: '200 OK, 201 Created', color: 'green' },
                { range: '3xx', name: 'Redirection', example: '301 Moved, 304 Not Modified', color: 'blue' },
                { range: '4xx', name: 'Client Error', example: '404 Not Found, 400 Bad Request', color: 'red' }
              ].map((item, i) => (
                <div key={i} className={`bg-${item.color}-50 dark:bg-${item.color}-900/20 border border-${item.color}-200 dark:border-${item.color}-800 rounded-xl p-4`}>
                  <p className={`text-2xl font-bold text-${item.color}-600 dark:text-${item.color}-400`}>{item.range}</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{item.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.example}</p>
                </div>
              ))}
            </div>
          </div>

          <InteractiveCodeEditor
            title="HTTP Request Example"
            language="javascript"
            initialCode={`// Simulating an HTTP GET request
const httpRequest = \`GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html
Accept-Language: en-US
Connection: keep-alive

\`;

// This is what your browser sends to get a webpage
console.log("HTTP GET Request:");
console.log(httpRequest);
console.log("\\n--- Response Headers ---");
console.log("HTTP/1.1 200 OK");
console.log("Content-Type: text/html");
console.log("Content-Length: 1234");
console.log("Server: Apache/2.4"`}
          />

          <Quiz
            questions={[
              {
                question: "Which HTTP status code indicates 'Page Not Found'?",
                options: ["200 OK", "301 Moved", "404 Not Found", "500 Internal Server Error"],
                correctAnswer: 2,
                explanation: "404 is the standard response when the server cannot find the requested resource."
              },
              {
                question: "What type of protocol is HTTP?",
                options: ["Stateful", "Stateless", "Connection-oriented only", "Connectionless only"],
                correctAnswer: 1,
                explanation: "HTTP is stateless - each request is independent and the server doesn't maintain session state."
              }
            ]}
          />
        </div>
      )
    },

    'dns-url': {
      id: 'dns-url',
      title: 'DNS and URLs',
      icon: <Database className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Domain Name System (DNS)</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              DNS is like the <strong>phonebook of the Internet</strong>. It translates human-readable domain names (like google.com) into IP addresses (like 142.250.185.206) that computers use to identify each other.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">Why do we need DNS?</h4>
              <p className="text-blue-700 dark:text-blue-300 mb-3">
                Humans are better at remembering words than numbers. DNS makes the web easier to navigate.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-1 text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="text-gray-500 text-sm mb-1">Hard to remember</p>
                  <p className="font-mono text-red-600">192.68.20.50</p>
                </div>
                <div className="text-2xl text-blue-500">→</div>
                <div className="flex-1 text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="text-gray-500 text-sm mb-1">Easy to remember</p>
                  <p className="font-mono text-green-600">www.example.com</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 mt-8">URL Structure</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A URL (Uniform Resource Locator) tells browsers how to access a resource. Let's break down its components:
            </p>

            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white mb-6">
              <p className="font-mono text-lg mb-4 break-all">
                <span className="bg-white/20 px-2 rounded">http</span>://<span className="bg-white/20 px-2 rounded">www.example.com</span>:<span className="bg-white/20 px-2 rounded">80</span>/<span className="bg-white/20 px-2 rounded">path/page.html</span>?<span className="bg-white/20 px-2 rounded">name=value</span>
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                <div><strong>http</strong> = Protocol</div>
                <div><strong>www</strong> = Subdomain</div>
                <div><strong>example.com</strong> = Domain</div>
                <div><strong>80</strong> = Port</div>
                <div><strong>/path</strong> = Path</div>
              </div>
            </div>
          </div>

          <VisualDemo
            type="diagram"
            title="DNS Resolution Process"
            description="How domain names are converted to IP addresses"
            content={
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-3 text-center w-28">
                    <Monitor className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs font-medium text-blue-800 dark:text-blue-200">User types URL</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-3 text-center flex-1">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">www.example.com</p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-gray-400">↓</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-xl p-3 text-center flex-1">
                    <p className="text-xs font-bold text-yellow-800 dark:text-yellow-200">Local DNS Resolver</p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">Checks cache first</p>
                  </div>
                  <div className="text-gray-400">↓ (if not cached)</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-3 text-center flex-1">
                    <p className="text-xs font-bold text-green-800 dark:text-green-200">Root Server</p>
                    <p className="text-xs text-green-600 dark:text-green-400">Knows .com servers</p>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="bg-purple-100 dark:bg-purple-900/30 rounded-xl p-3 text-center flex-1">
                    <p className="text-xs font-bold text-purple-800 dark:text-purple-200">TLD Server (.com)</p>
                    <p className="text-xs text-purple-600 dark:text-purple-400">Knows example.com</p>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-3 text-center flex-1">
                    <p className="text-xs font-bold text-blue-800 dark:text-blue-200">Authoritative DNS</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">Returns IP</p>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      )
    },

    'client-server': {
      id: 'client-server',
      title: 'Client-Server Architecture',
      icon: <Server className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Client-Server Model</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The Internet revolves around the <strong>client-server architecture</strong>. Your computer (client) runs software that interacts with servers located on remote computers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <h4 className="font-bold text-xl mb-3">Client</h4>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Browser (Chrome, Firefox, Safari)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Makes requests to servers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Displays responses to users</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Runs on user's device</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                <h4 className="font-bold text-xl mb-3">Server</h4>
                <ul className="space-y-2 text-purple-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Apache, Nginx, IIS</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Responds to client requests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Stores and processes data</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Runs in data centers</span>
                  </li>
                </ul>
              </div>
            </div>

            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Three Models of Web Architecture</h4>

            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <h5 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
                  Static HTML Pages
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Server sends pre-created HTML files. Content doesn't change unless developer modifies the files.
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">Browser</span>
                  <span>→</span>
                  <span className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">Request HTML</span>
                  <span>→</span>
                  <span className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">Server</span>
                  <span>→</span>
                  <span className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">Response HTML</span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <h5 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                  CGI/Server-Side Scripts
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Server processes code (PHP, Python, Ruby) to generate dynamic content based on user input.
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded">User Query</span>
                  <span>→</span>
                  <span className="bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded">CGI Script</span>
                  <span>→</span>
                  <span className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded">Dynamic HTML</span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <h5 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs">3</span>
                  Full-Stack Applications
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Modern apps with databases, APIs, client-side rendering, and real-time updates.
                </p>
              </div>
            </div>
          </div>

          <VisualDemo
            type="diagram"
            title="Client-Server Communication"
            description="Request-Response cycle"
            content={
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <Monitor className="w-16 h-16 text-blue-500 mx-auto mb-2" />
                    <p className="font-bold text-gray-800 dark:text-white">Client (Browser)</p>
                    <p className="text-xs text-gray-500">HTTP Request</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-sm">
                      GET /api/data HTTP/1.1
                    </div>
                    <div className="px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-sm">
                      HTTP/1.1 200 OK
                    </div>
                  </div>
                  <div className="text-center">
                    <Server className="w-16 h-16 text-purple-500 mx-auto mb-2" />
                    <p className="font-bold text-gray-800 dark:text-white">Server</p>
                    <p className="text-xs text-gray-500">Process & Respond</p>
                  </div>
                </div>
              </div>
            }
          />

          <Exercise
            question="Which model would be best for a personal blog with rarely changing content?"
            hint="Think about whether the content changes based on user input or stays the same for all visitors"
            solution="Model 1 - Static HTML Pages would be most efficient for a personal blog"
          />
        </div>
      )
    },

    'web-security': {
      id: 'web-security',
      title: 'Web Security Basics',
      icon: <Wifi className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Web Security Considerations</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Websites are always prone to security risks. Understanding common vulnerabilities helps you build more secure applications.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                {
                  title: 'SQL Injection',
                  desc: 'Attackers insert malicious SQL code into queries',
                  color: 'red',
                  icon: '💉',
                  prevention: 'Use parameterized queries, input validation'
                },
                {
                  title: 'Cross-Site Scripting (XSS)',
                  desc: 'Injecting malicious scripts into web pages',
                  color: 'orange',
                  icon: '⚠️',
                  prevention: 'Sanitize input, encode output, CSP headers'
                },
                {
                  title: 'CSRF',
                  desc: 'Tricking users into performing unintended actions',
                  color: 'yellow',
                  icon: '🔄',
                  prevention: 'Use anti-CSRF tokens, SameSite cookies'
                },
                {
                  title: 'Man-in-the-Middle',
                  desc: 'Attackers intercept communication between parties',
                  color: 'purple',
                  icon: '👤',
                  prevention: 'Use HTTPS, SSL/TLS encryption'
                }
              ].map((item, i) => (
                <div key={i} className={`bg-${item.color}-50 dark:bg-${item.color}-900/20 border border-${item.color}-200 dark:border-${item.color}-800 rounded-xl p-4`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <h4 className={`font-bold text-${item.color}-800 dark:text-${item.color}-200`}>{item.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.desc}</p>
                  <p className="text-xs font-medium text-gray-500">Prevention: {item.prevention}</p>
                </div>
              ))}
            </div>

            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Best Practices</h4>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 space-y-3">
              {[
                'Keep all software updated (servers, libraries, frameworks)',
                'Validate data on both client-side AND server-side',
                'Use strong password policies with hashing (bcrypt)',
                'Implement rate limiting to prevent brute force attacks',
                'Use HTTPS everywhere (SSL/TLS certificates)',
                'Follow the principle of least privilege',
                'Regular security audits and penetration testing'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-green-800 dark:text-green-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Quiz
            questions={[
              {
                question: "What is SQL Injection?",
                options: [
                  "Flooding a server with requests",
                  "Inserting malicious SQL code into database queries",
                  "Intercepting network traffic",
                  "Stealing user passwords"
                ],
                correctAnswer: 1,
                explanation: "SQL Injection occurs when attackers insert malicious SQL code into queries, potentially gaining access to or destroying database data."
              },
              {
                question: "What does HTTPS provide that HTTP doesn't?",
                options: [
                  "Faster page loads",
                  "Better SEO",
                  "Encrypted communication",
                  "Better caching"
                ],
                correctAnswer: 2,
                explanation: "HTTPS uses SSL/TLS to encrypt data transmitted between the browser and server, protecting against eavesdropping and tampering."
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
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Globe className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Chapter 1: Introduction to Internet Programming</h1>
            <p className="text-white/80">Learn the fundamentals of the Internet, WWW, HTTP, TCP/IP, DNS, and client-server architecture</p>
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
          const isCompleted = progress[`chapter1-${topic.id}`];

          return (
            <div
              key={topic.id}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 overflow-hidden transition-all ${
                isExpanded ? 'border-blue-500' : 'border-transparent hover:border-gray-200 dark:border-gray-700'
              }`}
            >
              <button
                onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                className="w-full p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isCompleted ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <span className="font-bold">{index + 1}</span>}
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-800 dark:text-white">{topic.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Click to {isExpanded ? 'collapse' : 'expand'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {topic.exercise && (
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 text-xs rounded-lg">
                      Exercise
                    </span>
                  )}
                  {topic.quiz && (
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 text-xs rounded-lg">
                      Quiz
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="p-6 pt-0 space-y-6 border-t border-gray-100 dark:border-gray-700">
                  {topic.content}

                  {topic.exercise && (
                    <div className="mt-6">
                      {topic.exercise}
                    </div>
                  )}

                  {topic.quiz && (
                    <div className="mt-6">
                      <Quiz questions={topic.quiz.questions} />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    {!isCompleted && (
                      <button
                        onClick={() => markComplete(topic.id)}
                        className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Mark as Complete
                      </button>
                    )}
                    {isCompleted && (
                      <span className="flex items-center gap-2 text-green-600 font-medium">
                        <CheckCircle className="w-5 h-5" />
                        Completed
                      </span>
                    )}
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
