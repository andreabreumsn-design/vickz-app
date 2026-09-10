import React from 'react';

export default function StepperScreen04() {
  const steps = [
    { num: 1, label: 'Empreendimento', status: 'completed' },
    { num: 2, label: 'Mapa da Obra', status: 'active' },
    { num: 3, label: 'Vizinhança', status: 'pending' },
  ];

  return (
    <div className="bg-[#0f1419] px-4 py-4 border-b border-[#334155]">
      <div className="max-w-[430px] mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => (
            <React.Fragment key={step.num}>
              {/* Step Circle */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all
                  ${
                    step.status === 'active'
                      ? 'bg-[#FF6600] text-white ring-4 ring-[#FF6600]/20'
                      : step.status === 'completed'
                      ? 'bg-[#10b981] text-white'
                      : 'bg-[#334155] text-[#94a3b8]'
                  }
                `}
              >
                {step.status === 'completed' ? '✓' : step.num}
              </div>

              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div
                  className={`
                    flex-1 h-1 mx-1 rounded transition-all
                    ${
                      step.status === 'completed'
                        ? 'bg-[#10b981]'
                        : 'bg-[#334155]'
                    }
                  `}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-3">
          {steps.map(step => (
            <span
              key={step.num}
              className={`
                text-xs font-semibold text-center flex-1
                ${
                  step.status === 'active'
                    ? 'text-[#FF6600]'
                    : step.status === 'completed'
                    ? 'text-[#10b981]'
                    : 'text-[#94a3b8]'
                }
              `}
            >
              {step.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
