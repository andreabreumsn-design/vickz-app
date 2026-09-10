import React from 'react';

export default function Stepper06() {
  const steps = [
    { num: 1, label: 'Pessoal', status: 'completed' },
    { num: 2, label: 'Empreendimento', status: 'completed' },
    { num: 3, label: 'Vizinhança', status: 'completed' },
    { num: 4, label: 'Identificação', status: 'active' },
    { num: 5, label: 'Fotos', status: 'pending' },
  ];

  return (
    <div className="bg-white px-4 py-4 border-b border-[#e2e8f0]">
      <div className="max-w-[430px] mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => (
            <div key={step.num} className="flex items-center flex-1">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all
                ${step.status === 'active' ? 'bg-[#FF6600] text-white ring-4 ring-[#FF6600]/20' :
                  step.status === 'completed' ? 'bg-[#10b981] text-white' :
                  'bg-[#e2e8f0] text-[#64748b]'}
              `}>
                {step.status === 'completed' ? '✓' : step.num}
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-1 rounded ${step.status === 'completed' ? 'bg-[#10b981]' : 'bg-[#e2e8f0]'}`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs">
          {steps.map(step => (
            <span key={step.num} className={`font-semibold text-center flex-1 ${
              step.status === 'active' ? 'text-[#FF6600]' :
              step.status === 'completed' ? 'text-[#10b981]' :
              'text-[#94a3b8]'
            }`}>
              {step.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
