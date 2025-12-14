import { cn } from '@/lib/utils';

interface SemaphoreStatusProps {
  status: 'green' | 'yellow' | 'red';
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

const statusConfig = {
  green: { 
    color: 'bg-green-500',
    label: 'En tiempo'
  },
  yellow: { 
    color: 'bg-amber-500',
    label: 'Riesgo'
  },
  red: { 
    color: 'bg-red-500',
    label: 'Crítico'
  }
};

export function SemaphoreStatus({ 
  status, 
  size = 'sm',
  showLabel = false 
}: SemaphoreStatusProps) {
  const config = statusConfig[status];
  
  return (
    <div className="flex items-center gap-2">
      <div 
        className={cn(
          "rounded-full",
          config.color,
          size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5'
        )}
      />
      {showLabel && (
        <span className="text-xs text-muted-foreground">{config.label}</span>
      )}
    </div>
  );
}
