import React from 'react';
import { FileText, Download, Send } from 'lucide-react';

export default function ReportActionCard({
  onPdfAll = () => {},
  onWordAll = () => {},
  onSubmitBackend = () => {}
}) {
  return (
    <div className="mx-4 my-4 bg-white rounded-lg border border-[#e2e8f0] overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-4 py-3 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <h3 className="text-sm font-bold text-[#001F5B] mb-1">Ações Globais</h3>
        <p className="text-xs text-[#64748b]">Gerar todos os relatórios ou enviar ao backend</p>
      </div>

      {/* Actions */}
      <div className="p-4 space-y-2">
        {/* PDF All Button */}
        <button
          onClick={onPdfAll}
          className="w-full py-3 px-4 rounded-lg bg-[#FF6600] text-white font-semibold text-sm hover:bg-[#E55A00] transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <FileText size={16} />
          PDF integral (todos)
        </button>

        {/* Word All Button */}
        <button
          onClick={onWordAll}
          className="w-full py-3 px-4 rounded-lg border-2 border-[#001F5B] text-[#001F5B] font-semibold text-sm hover:bg-[#001F5B] hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <Download size={16} />
          Word integral (todos)
        </button>

        {/* Backend Submission Button */}
        <button
          onClick={onSubmitBackend}
          className="w-full py-3 px-4 rounded-lg border-2 border-[#001F5B] text-[#001F5B] font-semibold text-sm hover:bg-[#001F5B] hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <Send size={16} />
          Enviar ao Backend / abrir laudo
        </button>

        {/* Backend Info */}
        <div className="mt-3 pt-3 border-t border-[#e2e8f0]">
          <p className="text-xs text-[#64748b]">
            <span className="font-semibold">Backend:</span> http://localhost:3001
          </p>
        </div>
      </div>
    </div>
  );
}
