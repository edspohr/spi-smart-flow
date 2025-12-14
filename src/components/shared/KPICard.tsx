interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export function KPICard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
}: KPICardProps) {
  return (
    <div className="bg-white border border-border rounded-lg p-4">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
        {title}
      </p>
      <p className="text-2xl font-semibold text-foreground">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      )}
      {trend && trendValue && (
        <div className="mt-2 flex items-center gap-1">
          <span
            className={`
              text-xs font-medium
              ${trend === 'up' ? 'text-green-600' : ''}
              ${trend === 'down' ? 'text-red-600' : ''}
              ${trend === 'neutral' ? 'text-muted-foreground' : ''}
            `}
          >
            {trend === 'up' && '↑'}
            {trend === 'down' && '↓'}
            {trendValue}
          </span>
        </div>
      )}
    </div>
  );
}
