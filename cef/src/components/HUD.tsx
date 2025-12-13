import { Heart, Shield, Droplet, UtensilsCrossed } from 'lucide-react';

interface HUDProps {
  stats: {
    health: number;
    armor: number;
    thirst: number;
    hunger: number;
  };
}

export function HUD({ stats }: HUDProps) {
  return (
    <div className="absolute bottom-8 left-8 flex gap-4 z-10">
      <StatCircle 
        value={stats.health} 
        icon={Heart} 
        color="health"
      />
      <StatCircle 
        value={stats.armor} 
        icon={Shield} 
        color="armor"
      />
      <StatCircle 
        value={stats.thirst} 
        icon={Droplet} 
        color="thirst"
      />
      <StatCircle 
        value={stats.hunger} 
        icon={UtensilsCrossed} 
        color="hunger"
      />
    </div>
  );
}

interface StatCircleProps {
  value: number;
  icon: React.ElementType;
  color: 'health' | 'armor' | 'thirst' | 'hunger';
}

function StatCircle({ value, icon: Icon, color }: StatCircleProps) {
  const getColor = () => {
    if (value > 70) {
      switch (color) {
        case 'health': return '#22c55e';
        case 'armor': return '#3b82f6';
        case 'thirst': return '#06b6d4';
        case 'hunger': return '#f59e0b';
      }
    } else if (value > 30) {
      return '#eab308';
    } else {
      return '#ef4444';
    }
  };

  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative w-20 h-20">
      {/* Círculo de fondo */}
      <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="rgba(0,0,0,0.3)"
          strokeWidth="6"
          fill="rgba(0,0,0,0.5)"
          className="backdrop-blur-sm"
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke={getColor()}
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
          style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))' }}
        />
      </svg>
      
      {/* Icono centrado */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon size={24} color={getColor()} strokeWidth={2.5} />
      </div>
      
      {/* Valor */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-xs mt-8" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
          {value}%
        </span>
      </div>
    </div>
  );
}
