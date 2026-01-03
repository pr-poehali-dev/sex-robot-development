import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import EyeAnimation from '@/components/EyeAnimation';
import EmotionDisplay from '@/components/EmotionDisplay';
import CameraControls from '@/components/CameraControls';
import { Emotion, eyeStates } from '@/components/types';

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
              <EyeAnimation
                currentState={currentState}
                emotion={emotion}
                blinking={blinking}
                cameraActive={cameraActive}
                motionLevel={motionLevel}
              />
              <EmotionDisplay
                emotion={emotion}
                currentState={currentState}
              />
            </div>

            <CameraControls
              cameraActive={cameraActive}
              arousal={arousal}
              motionLevel={motionLevel}
              currentState={currentState}
              onStartCamera={startCamera}
              onStopCamera={stopCamera}
            />
          </div>

          <video ref={videoRef} className="hidden" playsInline />
          <canvas ref={canvasRef} className="hidden" />
        </Card>
      </div>
    </div>
  );
};

export default Index;
