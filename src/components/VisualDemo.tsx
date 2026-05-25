import { useState } from 'react';
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';

interface VisualDemoProps {
  type: 'animation' | 'interaction' | 'diagram';
  content: React.ReactNode;
  title: string;
  description?: string;
}

export default function VisualDemo({ type, content, title, description }: VisualDemoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Demo Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            {description && (
              <p className="text-sm text-white/80 mt-1">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {type === 'animation' && (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white" />
                )}
              </button>
            )}
            <button
              onClick={() => setIsPlaying(false)}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className={`p-6 ${type === 'animation' && isPlaying ? 'animate-pulse' : ''}`}>
        {content}
      </div>

      {/* Demo Type Badge */}
      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {type} Demo
        </span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
}
