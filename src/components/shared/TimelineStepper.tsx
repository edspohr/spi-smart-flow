import { Check } from "lucide-react";

interface Step {
  id: string;
  label: string;
  status: 'completed' | 'current' | 'pending';
}

const steps: Step[] = [
  { id: '1', label: 'Solicitud', status: 'completed' },
  { id: '2', label: 'Documentación', status: 'current' },
  { id: '3', label: 'Revisión', status: 'pending' },
  { id: '4', label: 'Aprobación', status: 'pending' },
  { id: '5', label: 'Completado', status: 'pending' }
];

export function TimelineStepper() {
  const currentIndex = steps.findIndex(s => s.status === 'current');
  const progress = ((currentIndex) / (steps.length - 1)) * 100;

  return (
    <div className="w-full px-2">
      {/* Progress line */}
      <div className="relative mb-6">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-secondary -translate-y-1/2 rounded-full" />
        <div 
          className="absolute top-1/2 left-0 h-[2px] bg-primary -translate-y-1/2 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
        
        {/* Steps on Line */}
        <div className="absolute w-full flex justify-between top-1/2 -translate-y-1/2">
             {steps.map((step, index) => (
                <div key={step.id} className="relative flex flex-col items-center group">
                    <div 
                        className={`
                            w-4 h-4 rounded-full flex items-center justify-center z-10 transition-all duration-300
                            ${step.status === 'completed' ? 'bg-primary text-primary-foreground scale-110' : ''}
                            ${step.status === 'current' ? 'bg-background border-2 border-primary ring-4 ring-primary/10 scale-125' : ''}
                            ${step.status === 'pending' ? 'bg-secondary border border-muted-foreground/30' : ''}
                        `}
                    >
                        {step.status === 'completed' && <Check className="w-2.5 h-2.5" />}
                        {step.status === 'current' && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </div>
                    
                    {/* Label below */}
                    <span 
                      className={`
                        absolute top-6 text-[10px] w-20 text-center font-medium transition-colors duration-300
                        ${step.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'}
                        ${step.status === 'current' ? 'text-primary' : ''}
                        ${index === 0 ? '-left-2 items-start text-left' : index === steps.length - 1 ? '-right-2 items-end text-right' : ''}
                      `}
                    >
                      {step.label}
                    </span>
                </div>
             ))}
        </div>
      </div>
      
      {/* Spacing for labels */}
      <div className="h-6" />
    </div>
  );
}
