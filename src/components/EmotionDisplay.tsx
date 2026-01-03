import { Badge } from '@/components/ui/badge';
import { Emotion, EyeState } from './types';

interface EmotionDisplayProps {
  emotion: Emotion;
  currentState: EyeState;
}

const EmotionDisplay = ({ emotion, currentState }: EmotionDisplayProps) => {
  const getEmotionEmoji = () => {
    switch (emotion) {
      case 'idle': return '😌 Спокойна';
      case 'curious': return '🤔 Интересно';
      case 'interested': return '👀 Смотрю';
      case 'aroused': return '😊 Возбуждена';
      case 'excited': return '😍 Горячо';
      case 'intense': return '🥵 Не могу';
      case 'climax': return '🌟 Кончаю';
      default: return '😌 Спокойна';
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="text-center">
        <p 
          className="text-2xl font-heading font-semibold mb-1 transition-colors duration-500"
          style={{ color: currentState.color }}
        >
          {currentState.text}
        </p>
        <Badge 
          variant="outline" 
          className="text-xs"
          style={{ borderColor: currentState.color, color: currentState.color }}
        >
          {getEmotionEmoji()}
        </Badge>
      </div>
    </div>
  );
};

export default EmotionDisplay;
