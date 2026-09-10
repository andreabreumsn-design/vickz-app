import React from 'react';

export default function MiniMap() {
  return (
    <div className="mx-4 my-4 bg-white rounded-lg p-4 border border-[#e2e8f0] shadow-sm">
      <h3 className="text-sm font-semibold text-[#001F5B] mb-3">Visualização Georreferenciada</h3>

      <svg
        viewBox="0 0 300 200"
        className="w-full border border-[#e2e8f0] rounded-lg bg-[#f0f9ff]"
      >
        {/* Grid Background */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="300" height="200" fill="url(#grid)" />

        {/* Terreno 1 (Left - Red) */}
        <rect x="30" y="50" width="50" height="100" fill="#E62117" opacity="0.7" stroke="#991b1b" strokeWidth="2" />
        <text x="55" y="105" textAnchor="middle" dominantBaseline="middle" className="text-xs font-bold" fill="white">
          T1
        </text>

        {/* Empreendimento Central (Blue) */}
        <rect x="100" y="40" width="100" height="120" fill="#3b82f6" opacity="0.8" stroke="#1e40af" strokeWidth="2" />
        <text x="150" y="105" textAnchor="middle" dominantBaseline="middle" className="text-xs font-bold" fill="white">
          Empreendimento
        </text>

        {/* Terreno 2 (Right - Red) */}
        <rect x="220" y="50" width="50" height="100" fill="#E62117" opacity="0.7" stroke="#991b1b" strokeWidth="2" />
        <text x="245" y="105" textAnchor="middle" dominantBaseline="middle" className="text-xs font-bold" fill="white">
          T2
        </text>

        {/* Legend */}
        <g>
          <rect x="10" y="170" width="12" height="12" fill="#3b82f6" stroke="#1e40af" strokeWidth="1" />
          <text x="28" y="176" className="text-xs" fill="#001F5B">
            Empreendimento
          </text>

          <rect x="150" y="170" width="12" height="12" fill="#E62117" stroke="#991b1b" strokeWidth="1" />
          <text x="168" y="176" className="text-xs" fill="#001F5B">
            Vizinhos
          </text>
        </g>
      </svg>

      <p className="text-xs text-[#64748b] mt-3">
        📍 Mapa ilustrativo mostrando posicionamento dos imóveis lindeiros em relação ao empreendimento.
      </p>
    </div>
  );
}
