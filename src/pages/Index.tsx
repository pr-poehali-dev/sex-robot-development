import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Emotion = 'idle' | 'curious' | 'interested' | 'aroused' | 'excited' | 'intense' | 'climax';

interface EyeState {
  pupilSize: number;
  eyelidHeight: number;
  blinkSpeed: number;
  color: string;
  glow: number;
  text: string;
}

const eyeStates: Record<Emotion, EyeState> = {
  idle: {
    pupilSize: 20,
    eyelidHeight: 0,
    blinkSpeed: 3000,
    color: '#8B5CF6',
    glow: 5,
    text: 'Наблюдаю...'
  },
  curious: {
    pupilSize: 24,
    eyelidHeight: -5,
    blinkSpeed: 2500,
    color: '#A78BFA',
    glow: 10,
    text: 'Заинтересована...'
  },
  interested: {
    pupilSize: 28,
    eyelidHeight: -8,
    blinkSpeed: 2000,
    color: '#C084FC',
    glow: 15,
    text: 'Это интересно...'
  },
  aroused: {
    pupilSize: 32,
    eyelidHeight: 10,
    blinkSpeed: 1500,
    color: '#D946EF',
    glow: 20,
    text: 'Возбуждена...'
  },
  excited: {
    pupilSize: 36,
    eyelidHeight: 15,
    blinkSpeed: 1000,
    color: '#E879F9',
    glow: 30,
    text: 'Так горячо...'
  },
  intense: {
    pupilSize: 40,
    eyelidHeight: 20,
    blinkSpeed: 800,
    color: '#F0ABFC',
    glow: 40,
    text: 'Не могу сдержаться...'
  },
  climax: {
    pupilSize: 45,
    eyelidHeight: 25,
    blinkSpeed: 500,
    color: '#FFDEE2',
    glow: 60,
    text: '💫 Оргазм! 💫'
  }
};

const Index = () => {
  const [emotion, setEmotion] = useState<Emotion>('idle');
  const [cameraActive, setCameraActive] = useState(false);
  const [arousal, setArousal] = useState(0);
  const [motionLevel, setMotionLevel] = useState(0);
  const [blinking, setBlinking] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastFrameRef = useRef<ImageData | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (arousal < 15) setEmotion('idle');
    else if (arousal < 30) setEmotion('curious');
    else if (arousal < 45) setEmotion('interested');
    else if (arousal < 60) setEmotion('aroused');
    else if (arousal < 75) setEmotion('excited');
    else if (arousal < 95) setEmotion('intense');
    else setEmotion('climax');

    if (arousal >= 100) {
      setTimeout(() => {
        setArousal(0);
        setEmotion('idle');
      }, 3000);
    }
  }, [arousal]);

  useEffect(() => {
    const currentState = eyeStates[emotion];
    const blinkInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 150);
    }, currentState.blinkSpeed);

    return () => clearInterval(blinkInterval);
  }, [emotion]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
        detectMotion();
      }
    } catch (err) {
      console.error('Camera access denied:', err);
      alert('Разрешите доступ к камере для работы приложения');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setCameraActive(false);
    setArousal(0);
    setMotionLevel(0);
  };

  const detectMotion = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const processFrame = () => {
      if (!cameraActive && !videoRef.current?.srcObject) return;

      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const currentFrame = ctx.getImageData(0, 0, canvas.width, canvas.height);

      if (lastFrameRef.current) {
        let diffSum = 0;
        const step = 4;
        
        for (let i = 0; i < currentFrame.data.length; i += step * 4) {
          const diff = Math.abs(currentFrame.data[i] - lastFrameRef.current.data[i]);
          diffSum += diff;
        }

        const motion = diffSum / (currentFrame.data.length / (step * 4));
        setMotionLevel(Math.min(motion / 2, 100));

        if (motion > 8) {
          setArousal(prev => Math.min(prev + 0.5, 100));
        } else {
          setArousal(prev => Math.max(prev - 0.1, 0));
        }
      }

      lastFrameRef.current = currentFrame;
      animationRef.current = requestAnimationFrame(processFrame);
    };

    processFrame();
  };

  const currentState = eyeStates[emotion];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="container max-w-5xl">
        <Card 
          className="p-8 bg-card/50 backdrop-blur-sm border-2 transition-all duration-500"
          style={{ 
            borderColor: currentState.color,
            boxShadow: `0 0 ${currentState.glow}px ${currentState.color}60`
          }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
              She's Watching You
            </h1>
            <p className="text-muted-foreground">
              Она реагирует на ваши движения через камеру
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center space-y-6">
              <div 
                className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-500"
                style={{ 
                  background: `radial-gradient(circle, ${currentState.color}15, transparent)`,
                  boxShadow: cameraActive ? `0 0 40px ${currentState.color}30` : 'none'
                }}
              >
                <svg 
                  viewBox="0 0 400 300" 
                  className="w-full h-full transition-all duration-500"
                  style={{ filter: `drop-shadow(0 0 ${currentState.glow}px ${currentState.color})` }}
                >
                  <defs>
                    <radialGradient id="eyeGradient">
                      <stop offset="0%" stopColor="white" />
                      <stop offset="70%" stopColor="#f8f9fa" />
                      <stop offset="100%" stopColor="#e9ecef" />
                    </radialGradient>
                    <radialGradient id="pupilGradient">
                      <stop offset="0%" stopColor={currentState.color} />
                      <stop offset="100%" stopColor="#1a1a2e" />
                    </radialGradient>
                  </defs>

                  <ellipse
                    cx="120"
                    cy="150"
                    rx="60"
                    ry={blinking ? 5 : 50}
                    fill="url(#eyeGradient)"
                    stroke={currentState.color}
                    strokeWidth="3"
                    className="transition-all duration-150"
                  />
                  
                  {!blinking && (
                    <>
                      <circle
                        cx="120"
                        cy={150 + currentState.eyelidHeight}
                        r={currentState.pupilSize}
                        fill="url(#pupilGradient)"
                        className="transition-all duration-500"
                      />
                      <circle
                        cx="115"
                        cy={145 + currentState.eyelidHeight}
                        r="8"
                        fill="white"
                        opacity="0.8"
                      />
                      {cameraActive && motionLevel > 10 && (
                        <circle
                          cx="120"
                          cy={150 + currentState.eyelidHeight}
                          r={currentState.pupilSize}
                          fill="none"
                          stroke={currentState.color}
                          strokeWidth="2"
                          opacity="0.5"
                        >
                          <animate
                            attributeName="r"
                            values={`${currentState.pupilSize};${currentState.pupilSize + 5};${currentState.pupilSize}`}
                            dur="0.8s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                    </>
                  )}

                  <path
                    d="M 60 130 Q 80 120 100 125"
                    stroke={currentState.color}
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.7"
                  />

                  <path
                    d={`M 60 ${150 - (blinking ? 0 : currentState.eyelidHeight / 2)} Q 90 ${145 - currentState.eyelidHeight} 120 ${145 - currentState.eyelidHeight} Q 150 ${145 - currentState.eyelidHeight} 180 ${150 - (blinking ? 0 : currentState.eyelidHeight / 2)}`}
                    stroke={currentState.color}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />

                  <ellipse
                    cx="280"
                    cy="150"
                    rx="60"
                    ry={blinking ? 5 : 50}
                    fill="url(#eyeGradient)"
                    stroke={currentState.color}
                    strokeWidth="3"
                    className="transition-all duration-150"
                  />

                  {!blinking && (
                    <>
                      <circle
                        cx="280"
                        cy={150 + currentState.eyelidHeight}
                        r={currentState.pupilSize}
                        fill="url(#pupilGradient)"
                        className="transition-all duration-500"
                      />
                      <circle
                        cx="275"
                        cy={145 + currentState.eyelidHeight}
                        r="8"
                        fill="white"
                        opacity="0.8"
                      />
                      {cameraActive && motionLevel > 10 && (
                        <circle
                          cx="280"
                          cy={150 + currentState.eyelidHeight}
                          r={currentState.pupilSize}
                          fill="none"
                          stroke={currentState.color}
                          strokeWidth="2"
                          opacity="0.5"
                        >
                          <animate
                            attributeName="r"
                            values={`${currentState.pupilSize};${currentState.pupilSize + 5};${currentState.pupilSize}`}
                            dur="0.8s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                    </>
                  )}

                  <path
                    d="M 300 130 Q 310 120 330 125"
                    stroke={currentState.color}
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.7"
                  />

                  <path
                    d={`M 220 ${150 - (blinking ? 0 : currentState.eyelidHeight / 2)} Q 250 ${145 - currentState.eyelidHeight} 280 ${145 - currentState.eyelidHeight} Q 310 ${145 - currentState.eyelidHeight} 340 ${150 - (blinking ? 0 : currentState.eyelidHeight / 2)}`}
                    stroke={currentState.color}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />

                  {emotion === 'climax' && (
                    <>
                      <circle cx="200" cy="150" r="80" fill={currentState.color} opacity="0.05">
                        <animate attributeName="r" values="80;120;80" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.1;0;0.1" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    </>
                  )}
                </svg>

                {emotion === 'climax' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-7xl animate-pulse">💫</div>
                  </div>
                )}
              </div>

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
                    {emotion === 'idle' ? '😌 Спокойна' : 
                     emotion === 'curious' ? '🤔 Интересно' :
                     emotion === 'interested' ? '👀 Смотрю' :
                     emotion === 'aroused' ? '😊 Возбуждена' :
                     emotion === 'excited' ? '😍 Горячо' :
                     emotion === 'intense' ? '🥵 Не могу' :
                     '🌟 Кончаю'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Возбуждение
                  </span>
                  <span 
                    className="text-lg font-bold"
                    style={{ color: currentState.color }}
                  >
                    {Math.round(arousal)}%
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-300"
                    style={{ 
                      width: `${arousal}%`,
                      backgroundColor: currentState.color,
                      boxShadow: `0 0 10px ${currentState.color}`
                    }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Активность движений
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {Math.round(motionLevel)}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-100"
                    style={{ 
                      width: `${Math.min(motionLevel, 100)}%`,
                      backgroundColor: currentState.color,
                      opacity: 0.6
                    }}
                  />
                </div>
              </div>

              <div className="pt-4">
                {!cameraActive ? (
                  <Button
                    size="lg"
                    className="w-full font-semibold transition-all duration-300 hover:scale-105"
                    onClick={startCamera}
                    style={{ backgroundColor: currentState.color }}
                  >
                    <Icon name="Camera" size={20} className="mr-2" />
                    Включить камеру
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full font-semibold transition-all duration-300 hover:scale-105"
                    onClick={stopCamera}
                  >
                    <Icon name="CameraOff" size={20} className="mr-2" />
                    Остановить
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <div className="text-2xl font-bold" style={{ color: currentState.color }}>
                    {currentState.pupilSize}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Размер зрачка
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <div className="text-2xl font-bold" style={{ color: currentState.color }}>
                    {currentState.eyelidHeight > 0 ? '+' : ''}{currentState.eyelidHeight}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Веки
                  </div>
                </div>
              </div>

              <Card className="p-4 bg-muted/30 border-0">
                <div className="flex items-start gap-3">
                  <Icon name="Info" size={18} className="text-primary mt-0.5" />
                  <div className="text-xs text-muted-foreground">
                    Камера анализирует движения в реальном времени. 
                    Чем активнее движения, тем сильнее возбуждение.
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <video ref={videoRef} className="hidden" playsInline />
          <canvas ref={canvasRef} className="hidden" />
        </Card>
      </div>
    </div>
  );
};

export default Index;
