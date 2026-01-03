import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface Scenario {
  id: string;
  title: string;
  description: string;
  duration: string;
  intensity: 'low' | 'medium' | 'high';
  category: string;
  icon: string;
}

const scenarios: Scenario[] = [
  {
    id: '1',
    title: 'Романтический вечер',
    description: 'Нежная и чувственная программа с медленными ласками',
    duration: '30 мин',
    intensity: 'low',
    category: 'Романтика',
    icon: 'Heart'
  },
  {
    id: '2',
    title: 'Страстная встреча',
    description: 'Интенсивная программа для максимального удовольствия',
    duration: '45 мин',
    intensity: 'high',
    category: 'Страсть',
    icon: 'Flame'
  },
  {
    id: '3',
    title: 'Нежное пробуждение',
    description: 'Мягкий утренний режим для приятного начала дня',
    duration: '20 мин',
    intensity: 'low',
    category: 'Романтика',
    icon: 'Sunrise'
  },
  {
    id: '4',
    title: 'Дикая фантазия',
    description: 'Экспериментальная программа с неожиданными сюрпризами',
    duration: '60 мин',
    intensity: 'high',
    category: 'Экстрим',
    icon: 'Sparkles'
  },
  {
    id: '5',
    title: 'Расслабляющий массаж',
    description: 'Терапевтические движения для снятия стресса',
    duration: '40 мин',
    intensity: 'medium',
    category: 'Релакс',
    icon: 'Wind'
  },
  {
    id: '6',
    title: 'Игривое настроение',
    description: 'Веселая и легкая программа для хорошего настроения',
    duration: '25 мин',
    intensity: 'medium',
    category: 'Игра',
    icon: 'Smile'
  }
];

const Index = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('scenarios');
  const [intensity, setIntensity] = useState([50]);
  const [privateMode, setPrivateMode] = useState(true);
  const [notifications, setNotifications] = useState(false);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const getIntensityColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
              Intimate AI
            </h1>
            <p className="text-muted-foreground">
              Персонализированные сценарии для идеального опыта
            </p>
          </div>
          <Avatar className="h-12 w-12 bg-primary">
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              ME
            </AvatarFallback>
          </Avatar>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="scenarios" className="font-medium">
              <Icon name="BookOpen" size={18} className="mr-2" />
              Сценарии
            </TabsTrigger>
            <TabsTrigger value="profile" className="font-medium">
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scenarios" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-1">
                  Каталог сценариев
                </h2>
                <p className="text-sm text-muted-foreground">
                  {scenarios.length} доступных программ
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Icon name="Filter" size={16} className="mr-2" />
                Фильтр
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scenarios.map((scenario, index) => (
                <Card 
                  key={scenario.id} 
                  className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-scale-in cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                        <Icon name={scenario.icon as any} size={24} className="text-primary" />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 -mt-2 -mr-2"
                        onClick={() => toggleFavorite(scenario.id)}
                      >
                        <Icon 
                          name={favorites.includes(scenario.id) ? "Heart" : "Heart"} 
                          size={18}
                          className={favorites.includes(scenario.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}
                        />
                      </Button>
                    </div>
                    <CardTitle className="text-lg font-heading font-semibold">
                      {scenario.title}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-2">
                      {scenario.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className={getIntensityColor(scenario.intensity)}>
                        {scenario.intensity === 'low' && 'Мягко'}
                        {scenario.intensity === 'medium' && 'Средне'}
                        {scenario.intensity === 'high' && 'Интенсивно'}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {scenario.category}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Icon name="Clock" size={14} className="mr-1.5" />
                      {scenario.duration}
                    </div>
                    <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Начать
                      <Icon name="Play" size={16} className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {favorites.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-heading font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="Star" size={20} className="mr-2 text-primary" />
                  Избранное
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {scenarios
                    .filter(s => favorites.includes(s.id))
                    .map((scenario) => (
                      <Card key={scenario.id} className="border-primary/30">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="border-primary/30 text-primary">
                              {scenario.category}
                            </Badge>
                            <Icon name="Heart" size={18} className="fill-red-500 text-red-500" />
                          </div>
                          <CardTitle className="text-base font-heading">
                            {scenario.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Button size="sm" variant="outline" className="w-full">
                            Запустить
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 bg-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                      ME
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl font-heading">Мой профиль</CardTitle>
                    <CardDescription>Персональные настройки и предпочтения</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div className="space-y-0.5">
                      <Label htmlFor="private-mode" className="text-base font-medium">
                        Приватный режим
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Скрывать активность и историю использования
                      </p>
                    </div>
                    <Switch
                      id="private-mode"
                      checked={privateMode}
                      onCheckedChange={setPrivateMode}
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications" className="text-base font-medium">
                        Уведомления
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Получать рекомендации новых сценариев
                      </p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>

                  <div className="py-3 space-y-4">
                    <div className="space-y-2">
                      <Label className="text-base font-medium">
                        Предпочитаемая интенсивность
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Влияет на рекомендуемые сценарии
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Slider
                        value={intensity}
                        onValueChange={setIntensity}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Мягко</span>
                        <span className="font-medium text-primary">{intensity}%</span>
                        <span>Интенсивно</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Download" size={18} className="mr-3" />
                    Экспорт данных
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                    <Icon name="Trash2" size={18} className="mr-3" />
                    Удалить все данные
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Статистика</CardTitle>
                <CardDescription>Общая информация об использовании</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="text-3xl font-bold text-primary font-heading">12</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Сценариев пройдено
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="text-3xl font-bold text-primary font-heading">
                      {favorites.length}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      В избранном
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="text-3xl font-bold text-primary font-heading">8.5</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Средняя оценка
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="text-3xl font-bold text-primary font-heading">6ч</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Общее время
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
