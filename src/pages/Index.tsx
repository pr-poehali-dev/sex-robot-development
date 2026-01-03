import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

type Emotion = 'idle' | 'curious' | 'excited' | 'pleasure' | 'intense' | 'climax';

interface EmotionConfig {
  leftEye: string;
  rightEye: string;
  mouth: string;
  color: string;
  text: string;
}

const emotions: Record<Emotion, EmotionConfig> = {
  idle: {
    leftEye: 'M 30 40 Q 50 45 70 40',
    rightEye: 'M 130 40 Q 150 45 170 40',
    mouth: 'M 70 120 Q 100 125 130 120',
    color: '#8B5CF6',
    text: 'Спокойствие...'
  },
  curious: {
    leftEye: 'M 30 35 Q 50 30 70 35',
    rightEye: 'M 130 35 Q 150 30 170 35',
    mouth: 'M 70 115 Q 100 120 130 115',
    color: '#A78BFA',
    text: 'Любопытство...'
  },
  excited: {
    leftEye: 'M 30 30 Q 50 25 70 30',
    rightEye: 'M 130 30 Q 150 25 170 30',
    mouth: 'M 70 110 Q 100 105 130 110',
    color: '#C084FC',
    text: 'Возбуждение...'
  },
  pleasure: {
    leftEye: 'M 30 40 Q 50 50 70 40',
    rightEye: 'M 130 40 Q 150 50 170 40',
    mouth: 'M 65 110 Q 100 95 135 110',
    color: '#D946EF',
    text: 'Удовольствие...'
  },
  intense: {
    leftEye: 'M 30 45 Q 50 55 70 45',
    rightEye: 'M 130 45 Q 150 55 170 45',
    mouth: 'M 60 105 Q 100 85 140 105',
    color: '#F0ABFC',
    text: 'Интенсивность...'
  },
  climax: {
    leftEye: 'M 30 50 Q 50 60 70 50',
    rightEye: 'M 130 50 Q 150 60 170 50',
    mouth: 'M 50 100 Q 100 70 150 100',
    color: '#FFDEE2',
    text: '✨ Экстаз! ✨'
  }
};

const Index = () => {
  const [emotion, setEmotion] = useState<Emotion>('idle');
  const [intensity, setIntensity] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    if (intensity < 20) {
      setEmotion('idle');
    } else if (intensity < 40) {
      setEmotion('curious');
    } else if (intensity < 60) {
      setEmotion('excited');
    } else if (intensity < 80) {
      setEmotion('pleasure');
    } else if (intensity < 95) {
      setEmotion('intense');
    } else {
      setEmotion('climax');
      if (intensity >= 100) {
        setTimeout(() => {
          setIntensity(0);
          setPulseCount(0);
          setIsActive(false);
        }, 2000);
      }
    }
  }, [intensity]);

  const handleInteraction = () => {
    if (intensity >= 100) return;
    
    setIsActive(true);
    setPulseCount(prev => prev + 1);
    setIntensity(prev => Math.min(prev + 8, 100));
  };

  const handleReset = () => {
    setIntensity(0);
    setPulseCount(0);
    setIsActive(false);
    setEmotion('idle');
  };

  const currentEmotion = emotions[emotion];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="container max-w-4xl">
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 transition-all duration-300"
              style={{ borderColor: currentEmotion.color }}>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
              Intimate Robot AI
            </h1>
            <p className="text-muted-foreground">
              Интерактивный опыт с эмоциональным откликом
            </p>
          </div>

          <div className="flex flex-col items-center space-y-8">
            <div 
              className="relative w-80 h-80 rounded-full flex items-center justify-center transition-all duration-500"
              style={{ 
                background: `radial-gradient(circle, ${currentEmotion.color}20, transparent)`,
                boxShadow: isActive ? `0 0 60px ${currentEmotion.color}40` : 'none'
              }}
            >
              <svg 
                viewBox="0 0 200 160" 
                className="w-64 h-64 transition-all duration-500"
                style={{ filter: `drop-shadow(0 0 20px ${currentEmotion.color}60)` }}
              >
                <path
                  d={currentEmotion.leftEye}
                  stroke={currentEmotion.color}
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
                <circle
                  cx="50"
                  cy={emotion === 'climax' ? 50 : 40}
                  r={emotion === 'climax' ? 3 : 4}
                  fill={currentEmotion.color}
                  className="transition-all duration-300"
                >
                  {isActive && (
                    <animate
                      attributeName="r"
                      values="4;6;4"
                      dur="0.6s"
                      repeatCount="indefinite"
                    />
                  )}
                </circle>

                <path
                  d={currentEmotion.rightEye}
                  stroke={currentEmotion.color}
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
                <circle
                  cx="150"
                  cy={emotion === 'climax' ? 50 : 40}
                  r={emotion === 'climax' ? 3 : 4}
                  fill={currentEmotion.color}
                  className="transition-all duration-300"
                >
                  {isActive && (
                    <animate
                      attributeName="r"
                      values="4;6;4"
                      dur="0.6s"
                      repeatCount="indefinite"
                    />
                  )}
                </circle>

                <path
                  d={currentEmotion.mouth}
                  stroke={currentEmotion.color}
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />

                {emotion === 'climax' && (
                  <>
                    <circle cx="100" cy="80" r="30" fill={currentEmotion.color} opacity="0.1">
                      <animate attributeName="r" values="30;50;30" dur="1s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.2;0;0.2" dur="1s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}
              </svg>

              {emotion === 'climax' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-6xl animate-pulse">✨</div>
                </div>
              )}
            </div>

            <div className="w-full max-w-md space-y-6">
              <div className="text-center">
                <p className="text-2xl font-heading font-semibold mb-2 transition-colors duration-300"
                   style={{ color: currentEmotion.color }}>
                  {currentEmotion.text}
                </p>
                <p className="text-sm text-muted-foreground">
                  Прикосновений: {pulseCount}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Интенсивность</span>
                  <span className="font-medium" style={{ color: currentEmotion.color }}>
                    {intensity}%
                  </span>
                </div>
                <Progress 
                  value={intensity} 
                  className="h-3 transition-all duration-300"
                  style={{
                    background: `linear-gradient(to right, ${currentEmotion.color}20, ${currentEmotion.color}10)`
                  }}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 font-semibold transition-all duration-300 hover:scale-105"
                  onClick={handleInteraction}
                  disabled={intensity >= 100}
                  style={{
                    backgroundColor: currentEmotion.color,
                    opacity: intensity >= 100 ? 0.5 : 1
                  }}
                >
                  {intensity >= 100 ? (
                    <>
                      <Icon name="Sparkles" size={20} className="mr-2" />
                      Завершено
                    </>
                  ) : (
                    <>
                      <Icon name="Hand" size={20} className="mr-2" />
                      Прикоснуться
                    </>
                  )}
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleReset}
                  className="transition-all duration-300 hover:scale-105"
                >
                  <Icon name="RotateCcw" size={20} />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-4">
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <div className="text-lg font-bold" style={{ color: currentEmotion.color }}>
                    {emotion === 'idle' ? '😌' : emotion === 'curious' ? '🤔' : emotion === 'excited' ? '😊' : emotion === 'pleasure' ? '😍' : emotion === 'intense' ? '🥵' : '🌟'}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Эмоция</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <div className="text-lg font-bold" style={{ color: currentEmotion.color }}>
                    {Math.floor(intensity / 20)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Уровень</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <div className="text-lg font-bold" style={{ color: currentEmotion.color }}>
                    {pulseCount}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Счётчик</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
