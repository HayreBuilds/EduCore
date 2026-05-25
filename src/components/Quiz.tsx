import { useState } from 'react';
import { CheckCircle, XCircle, Trophy, Brain, ChevronRight } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  title?: string;
  onComplete?: (score: number) => void;
}

export default function Quiz({ questions, title = 'Knowledge Quiz', onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);

    const newAnswers = [...answers, index];
    setAnswers(newAnswers);

    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
      onComplete?.(score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 0 : 0));
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
    setAnswers([]);
  };

  const percentage = Math.round((score / questions.length) * 100);

  if (quizComplete) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className={`px-6 py-8 text-center ${
          percentage >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
          percentage >= 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
          'bg-gradient-to-r from-red-500 to-pink-600'
        }`}>
          <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h3>
          <p className="text-white/90 text-lg">
            You scored {score} out of {questions.length}
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <span className={`text-4xl font-bold ${
                percentage >= 80 ? 'text-green-600' :
                percentage >= 50 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {percentage}%
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {percentage >= 80 ? 'Excellent work!' :
               percentage >= 50 ? 'Good effort!' :
               'Keep practicing!'}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-gray-800 dark:text-white">Question Review</h4>
            {questions.map((q, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  answers[i] === q.correctAnswer
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : 'bg-red-50 dark:bg-red-900/20'
                }`}
              >
                {answers[i] === q.correctAnswer ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Question {i + 1}: {answers[i] === q.correctAnswer ? 'Correct' : 'Incorrect'}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={resetQuiz}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Quiz Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-white" />
            <div>
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <p className="text-sm text-white/80">Test your knowledge</p>
            </div>
          </div>
          <div className="text-white text-right">
            <p className="text-sm opacity-80">Progress</p>
            <p className="font-bold">{currentQuestion + 1}/{questions.length}</p>
          </div>
        </div>
        <div className="mt-4 bg-white/20 rounded-full h-2">
          <div
            className="bg-white rounded-full h-2 transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="p-6 space-y-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
          <p className="text-gray-800 dark:text-gray-200 font-medium text-lg">
            {currentQ.question}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, index) => {
            let optionClass = 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600';

            if (selectedAnswer !== null) {
              if (index === currentQ.correctAnswer) {
                optionClass = 'bg-green-100 dark:bg-green-900/30 border-green-500';
              } else if (index === selectedAnswer) {
                optionClass = 'bg-red-100 dark:bg-red-900/30 border-red-500';
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${optionClass}
                  ${selectedAnswer === null ? 'border-transparent' : 'border-2'}
                  ${selectedAnswer !== null && index !== currentQ.correctAnswer && index !== selectedAnswer ? 'opacity-50' : ''}
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                    selectedAnswer !== null
                      ? index === currentQ.correctAnswer
                        ? 'bg-green-500 text-white'
                        : index === selectedAnswer
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                      : 'bg-blue-500 text-white'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-gray-800 dark:text-gray-200">{option}</span>
                  {selectedAnswer !== null && index === currentQ.correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                  )}
                  {selectedAnswer !== null && index === selectedAnswer && index !== currentQ.correctAnswer && (
                    <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && currentQ.explanation && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              <strong>Explanation:</strong> {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Next Button */}
        {selectedAnswer !== null && (
          <button
            onClick={handleNext}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            {currentQuestion < questions.length - 1 ? (
              <>
                Next Question
                <ChevronRight className="w-5 h-5" />
              </>
            ) : (
              <>
                See Results
                <Trophy className="w-5 h-5" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
