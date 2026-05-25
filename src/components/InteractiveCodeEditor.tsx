import { useState, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check, Code, Eye, Terminal } from 'lucide-react';

interface InteractiveCodeEditorProps {
  initialCode: string;
  language?: 'html' | 'javascript';
  title?: string;
}

export default function InteractiveCodeEditor({
  initialCode,
  language = 'html',
  title = 'Code Editor'
}: InteractiveCodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const runCode = () => {
    setIsRunning(true);
    setActiveTab('preview');

    if (language === 'javascript') {
      try {
        const logs: string[] = [];
        const customConsole = {
          log: (...args: unknown[]) => logs.push(args.map(String).join(' ')),
          error: (...args: unknown[]) => logs.push(`Error: ${args.map(String).join(' ')}`),
          warn: (...args: unknown[]) => logs.push(`Warning: ${args.map(String).join(' ')}`)
        };

        const func = new Function('console', code);
        func(customConsole);

        setTimeout(() => {
          setOutput(logs.length > 0 ? logs.join('\n') : 'Code executed successfully! (no output)');
          setIsRunning(false);
        }, 100);
      } catch (error) {
        setTimeout(() => {
          setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
          setIsRunning(false);
        }, 100);
      }
    } else {
      setTimeout(() => {
        setOutput(code);
        setIsRunning(false);
      }, 100);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
      {/* Editor Header */}
      <div className="bg-gray-800 dark:bg-gray-900 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-gray-400 text-sm ml-2">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('code')}
            className={`p-2 rounded-lg transition-colors ${
              activeTab === 'code' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`p-2 rounded-lg transition-colors ${
              activeTab === 'preview' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={copyCode}
            className="p-2 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={resetCode}
            className="p-2 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            Run
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'code' ? (
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 md:h-80 p-4 bg-gray-900 text-gray-100 font-mono text-sm resize-none focus:outline-none"
          spellCheck={false}
        />
      ) : (
        <div className="h-64 md:h-80 bg-white dark:bg-gray-800 p-4 overflow-auto">
          {language === 'html' ? (
            <iframe
              srcDoc={code}
              className="w-full h-full border-0"
              sandbox="allow-scripts"
              title="Preview"
            />
          ) : (
            <div className="font-mono text-sm">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <Terminal className="w-4 h-4" />
                <span>Output:</span>
              </div>
              <pre className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                {output || 'Click "Run" to execute your code...'}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Action Bar */}
      <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 flex items-center justify-between text-sm">
        <span className="text-gray-500 dark:text-gray-400">
          {language === 'html' ? 'HTML + CSS + JavaScript' : 'JavaScript'}
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          {code.length} characters
        </span>
      </div>
    </div>
  );
}
