import { cn } from '@/lib/utils';

interface SemaphoreStatusProps {
  status: 'green' | 'yellow' | 'red';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const statusLabels = {
  green: 'En tiempo',
  yellow: 'Riesgo',
  red: 'Crítico'
};

export function SemaphoreStatus({ status, size = 'md', showLabel = false }: SemaphoreStatusProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const colorClasses = {
    green: 'bg-spi-accent shadow-spi-accent/50',
    yellow: 'bg-spi-warning shadow-spi-warning/50',
    red: 'bg-spi-danger shadow-spi-danger/50 animate-pulse'
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "rounded-full shadow-lg",
          sizeClasses[size],
          colorClasses[status]
        )}
      />
      {showLabel && (
        <span
          className={cn(
            "text-sm font-medium",
            status === 'green' && "text-spi-accent",
            status === 'yellow' && "text-spi-warning",
            status === 'red' && "text-spi-danger"
          )}
        >
          {statusLabels[status]}
        </span>
      )}
    </div>
  );
}
