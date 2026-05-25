import { ArrowRight, Play, Brain, Trophy, Zap } from 'lucide-react';

interface ChapterInfo {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  progress: number;
  description: string;
  topics: number;
  exercises: number;
}

interface HomePageProps {
  chapters: ChapterInfo[];
  setCurrentChapter: (chapter: 'chapter1' | 'chapter2' | 'chapter3' | 'chapter4' | 'home') => void;
}

export default function HomePage({ chapters, setCurrentChapter }: HomePageProps) {
  const features = [
    {
      icon: <Play className="w-6 h-6" />,
      title: 'Interactive Learning',
      description: 'Learn by doing with live code editors and instant feedback'
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Visual Explanations',
      description: 'Complex concepts explained with animations and diagrams'
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Practice Exercises',
      description: 'Reinforce your learning with hands-on challenges'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Track Progress',
      description: 'Monitor your learning journey and celebrate achievements'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-8 md:p-12 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to WebDev Academy
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Master web development through interactive lessons, hands-on coding,
            and visual demonstrations. Start your journey from beginner to professional.
          </p>
          <button
            onClick={() => setCurrentChapter('chapter1')}
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg"
          >
            Start Learning
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Chapters Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Choose Your Learning Path
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => setCurrentChapter(chapter.id)}
              className={`${chapter.bgColor} ${chapter.borderColor} border-2 rounded-2xl p-6 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${chapter.color}`}>
                  {chapter.icon}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    {chapter.progress}%
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Complete
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {chapter.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {chapter.subtitle}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {chapter.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>{chapter.topics} Topics</span>
                  <span>{chapter.exercises} Exercises</span>
                </div>
                <div className={`flex items-center gap-2 ${chapter.color} font-semibold group-hover:gap-3 transition-all`}>
                  Start
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4 bg-white/50 dark:bg-gray-700/50 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${chapter.color.replace('text-', 'from-').replace('600', '400')} to-${chapter.color.replace('text-', 'to-')} rounded-full h-2 transition-all duration-500`}
                  style={{ width: `${chapter.progress}%` }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          How to Use This Platform
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">
              Read & Learn
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Each topic includes clear explanations with visual examples
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">
              Code & Practice
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Write real code in the interactive editor and see instant results
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">
              Test Yourself
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Complete exercises and quizzes to verify your understanding
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
