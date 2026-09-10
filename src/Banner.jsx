import React from 'react';

export default function Banner() {
  return (
    <div
      className="relative min-h-[200px] bg-cover bg-center flex flex-col items-center justify-center text-center px-4 py-12"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0,20,40,0.8) 0%, rgba(0,31,91,0.8) 100%), url('https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=60')`,
        backgroundAttachment: 'fixed',
      }}
    >
      <h2 className="text-2xl font-bold text-white mb-2">
        <span>Evitar conflitos </span>
        <span className="text-[#FF6600]">amanhã</span>
      </h2>
      <p className="text-sm text-[#cbd5e1] italic">
        "Segurança técnica começa com vizinhança informada"
      </p>
    </div>
  );
}
