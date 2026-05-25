import { useState } from 'react';
import { CheckCircle, XCircle, Lightbulb, Code, Eye } from 'lucide-react';

interface ExerciseProps {
  question: string;
  hint?: string;
  solution?: string;
  validationCode?: string;
  onComplete?: () => void;
}

export default function Exercise({
  question,
  hint,
  solution,
  validationCode,
  onComplete
}: ExerciseProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);

  const checkAnswer = () => {
    if (!validationCode) {
      setResult('correct');
      onComplete?.();
      return;
    }

    try {
      const isCorrect = new Function(validationCode.replace('{answer}', `"${userAnswer}"`))();
      setResult(isCorrect ? 'correct' : 'incorrect');
      if (isCorrect) {
        onComplete?.();
      }
    } catch {
      setResult('incorrect');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Question Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Code className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Practice Exercise</h3>
            <p className="text-sm text-white/80">Test your understanding</p>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="p-6 space-y-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
          <p className="text-gray-800 dark:text-gray-200 font-medium">{question}</p>
        </div>

        {/* Answer Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Answer
          </label>
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-full p-4 bg-gray-900 text-gray-100 font-mono text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={4}
            placeholder="Write your code or answer here..."
          />
        </div>

        {/* Result Feedback */}
        {result && (
          <div className={`p-4 rounded-xl ${
            result === 'correct'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
              : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
          }`}>
            <div className="flex items-center gap-3">
              {result === 'correct' ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <XCircle className="w-6 h-6" />
              )}
              <div>
                <p className="font-bold">
                  {result === 'correct' ? 'Correct!' : 'Not quite right'}
                </p>
                <p className="text-sm opacity-80">
                  {result === 'correct'
                    ? 'Great job! Move on to the next topic.'
                    : 'Try again or check the hint for help.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={checkAnswer}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            <CheckCircle className="w-5 h-5" />
            Check Answer
          </button>

          {hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 px-4 py-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 font-medium rounded-xl hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors"
            >
              <Lightbulb className="w-5 h-5" />
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
          )}

          {solution && (
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Eye className="w-5 h-5" />
              {showSolution ? 'Hide Solution' : 'Show Solution'}
            </button>
          )}
        </div>

        {/* Hint Content */}
        {showHint && hint && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">Hint</p>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm">{hint}</p>
              </div>
            </div>
          </div>
        )}

        {/* Solution Content */}
        {showSolution && solution && (
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
            <p className="font-medium text-purple-800 dark:text-purple-200 mb-2">Solution</p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              {solution}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
