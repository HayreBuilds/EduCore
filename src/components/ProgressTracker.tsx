import { Trophy, Star } from 'lucide-react';

interface ProgressTrackerProps {
  progress: number;
}

export default function ProgressTracker({ progress }: ProgressTrackerProps) {
  const getProgressColor = () => {
    if (progress >= 80) return 'text-yellow-500';
    if (progress >= 50) return 'text-blue-500';
    return 'text-gray-500';
  };

  const getProgressBgColor = () => {
    if (progress >= 80) return 'bg-yellow-100 dark:bg-yellow-900/30';
    if (progress >= 50) return 'bg-blue-100 dark:bg-blue-900/30';
    return 'bg-gray-100 dark:bg-gray-700';
  };

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${getProgressBgColor()}`}>
      {progress >= 80 ? (
        <Trophy className={`w-5 h-5 ${getProgressColor()}`} />
      ) : (
        <Star className={`w-5 h-5 ${getProgressColor()}`} />
      )}
      <div className="flex flex-col">
        <span className={`text-sm font-bold ${getProgressColor()}`}>
          {progress}%
        </span>
      </div>
      <div className="w-20 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            progress >= 80
              ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
              : progress >= 50
                ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                : 'bg-gradient-to-r from-gray-400 to-gray-600'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
