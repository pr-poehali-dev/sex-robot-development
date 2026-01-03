import { Emotion, EyeState } from './types';

interface EyeAnimationProps {
  currentState: EyeState;
  emotion: Emotion;
  blinking: boolean;
  cameraActive: boolean;
  motionLevel: number;
}

const EyeAnimation = ({ currentState, emotion, blinking, cameraActive, motionLevel }: EyeAnimationProps) => {
  return (
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
  );
};

export default EyeAnimation;
