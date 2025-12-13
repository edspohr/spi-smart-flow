'use client';

import { cn } from '@/lib/utils';

interface Step {
  id: string;
  label: string;
  status: 'completed' | 'current' | 'pending';
}

const steps: Step[] = [
  { id: '1', label: 'Solicitud Recibida', status: 'completed' },
  { id: '2', label: 'Documentación', status: 'current' },
  { id: '3', label: 'En Revisión', status: 'pending' },
  { id: '4', label: 'Aprobado', status: 'pending' },
  { id: '5', label: 'Pagado', status: 'pending' }
];

export function TimelineStepper() {
  const currentStepIndex = steps.findIndex(s => s.status === 'current');
  const progressPercentage = ((currentStepIndex) / (steps.length - 1)) * 100;

  return (
    <div className="w-full py-6">
      <div className="relative">
        {/* Progress bar background */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-muted rounded-full" />
        
        {/* Progress bar fill */}
        <div 
          className="absolute top-5 left-0 h-1 bg-gradient-to-r from-spi-accent to-spi-accent-light rounded-full transition-all duration-1000 ease-out animate-progress-fill"
          style={{ width: `${progressPercentage}%` }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              {/* Circle */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-500 z-10",
                  step.status === 'completed' && "bg-spi-accent text-white shadow-lg shadow-spi-accent/30",
                  step.status === 'current' && "bg-spi-warning text-white shadow-lg shadow-spi-warning/50 animate-pulse-glow",
                  step.status === 'pending' && "bg-muted text-muted-foreground"
                )}
              >
                {step.status === 'completed' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              
              {/* Label */}
              <span
                className={cn(
                  "mt-3 text-xs md:text-sm font-medium text-center max-w-[80px] md:max-w-[100px]",
                  step.status === 'completed' && "text-spi-accent",
                  step.status === 'current' && "text-spi-warning",
                  step.status === 'pending' && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
