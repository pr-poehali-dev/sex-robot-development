export type Emotion = 'idle' | 'curious' | 'interested' | 'aroused' | 'excited' | 'intense' | 'climax';

export interface EyeState {
  pupilSize: number;
  eyelidHeight: number;
  blinkSpeed: number;
  color: string;
  glow: number;
  text: string;
}

export const eyeStates: Record<Emotion, EyeState> = {
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
