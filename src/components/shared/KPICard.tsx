import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  icon?: React.ReactNode;
}

export function KPICard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  variant = 'default',
  icon
}: KPICardProps) {
  const variantStyles = {
    default: 'from-spi-primary to-spi-primary-light',
    success: 'from-spi-accent to-spi-accent-light',
    warning: 'from-spi-warning to-spi-warning-light',
    danger: 'from-spi-danger to-spi-danger-light'
  };

  const textColors = {
    default: 'text-spi-primary',
    success: 'text-spi-accent',
    warning: 'text-spi-warning',
    danger: 'text-spi-danger'
  };

  return (
    <div className={cn(
      "elevated-card rounded-2xl p-6 transition-all duration-300",
      "animate-slide-up"
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={cn(
            "text-3xl font-bold",
            textColors[variant]
          )}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {icon && (
          <div className={cn(
            "p-3 rounded-xl bg-gradient-to-br shadow-lg",
            variantStyles[variant]
          )}>
            {icon}
          </div>
        )}
      </div>

      {trend && trendValue && (
        <div className="mt-4 flex items-center gap-2">
          <span
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              trend === 'up' && "text-spi-accent",
              trend === 'down' && "text-spi-danger",
              trend === 'neutral' && "text-muted-foreground"
            )}
          >
            {trend === 'up' && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            )}
            {trend === 'down' && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
            )}
            {trendValue}
          </span>
          <span className="text-xs text-muted-foreground">vs mes anterior</span>
        </div>
      )}
    </div>
  );
}
