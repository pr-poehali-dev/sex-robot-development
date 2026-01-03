import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { EyeState } from './types';

interface CameraControlsProps {
  cameraActive: boolean;
  arousal: number;
  motionLevel: number;
  currentState: EyeState;
  onStartCamera: () => void;
  onStopCamera: () => void;
}

const CameraControls = ({
  cameraActive,
  arousal,
  motionLevel,
  currentState,
  onStartCamera,
  onStopCamera
}: CameraControlsProps) => {
  return (
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
            onClick={onStartCamera}
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
            onClick={onStopCamera}
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
  );
};

export default CameraControls;
