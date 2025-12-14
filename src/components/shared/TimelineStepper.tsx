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
    <div className="w-full">
      {/* Progress line */}
      <div className="relative mb-2">
        <div className="h-1 bg-slate-100 rounded-full">
          <div 
            className="h-1 bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Labels */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className="flex flex-col items-center"
            style={{ width: `${100 / steps.length}%` }}
          >
            <div 
              className={`
                w-2 h-2 rounded-full mb-1
                ${step.status === 'completed' ? 'bg-primary' : ''}
                ${step.status === 'current' ? 'bg-primary ring-2 ring-primary/30' : ''}
                ${step.status === 'pending' ? 'bg-slate-200' : ''}
              `}
            />
            <span 
              className={`
                text-xs text-center
                ${step.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'}
                ${index === 0 ? 'text-left' : index === steps.length - 1 ? 'text-right' : ''}
              `}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
