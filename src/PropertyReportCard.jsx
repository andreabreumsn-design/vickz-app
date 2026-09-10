import React from 'react';
import { FileText, Download, RotateCcw } from 'lucide-react';

export default function PropertyReportCard({
  propertyIndex = 1,
  propertyName = 'Imóvel Lindeiro',
  ownerName = 'Proprietário',
  address = 'Endereço do imóvel',
  status = 'Pendente',
  onPdfDownload = () => {},
  onWordDownload = () => {},
  onReopen = () => {}
}) {
  return (
    <div className="mx-4 my-4 bg-white rounded-lg border border-[#e2e8f0] overflow-hidden shadow-sm">
      {/* Header with Badge */}
      <div className="px-4 py-3 bg-[#f8fafc] border-b border-[#e2e8f0] flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          {/* Red Badge with Number */}
          <div className="w-8 h-8 rounded-full bg-[#E62117] text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">
            {propertyIndex}
          </div>

          {/* Property Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-[#001F5B] mb-0.5">{propertyName}</h3>
            <p className="text-xs text-[#64748b]">{ownerName}</p>
            <p className="text-xs text-[#94a3b8] mt-1">{address}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="px-2 py-1 bg-[#D1FAE5] border border-[#6EE7B7] rounded-full flex-shrink-0">
          <p className="text-xs font-semibold text-[#047857]">{status}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 space-y-2">
        {/* PDF Download Button */}
        <button
          onClick={onPdfDownload}
          className="w-full py-3 px-4 rounded-lg bg-[#FF6600] text-white font-semibold text-sm hover:bg-[#E55A00] transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <FileText size={16} />
          PDF deste imóvel
        </button>

        {/* Word Download Button */}
        <button
          onClick={onWordDownload}
          className="w-full py-3 px-4 rounded-lg border-2 border-[#001F5B] text-[#001F5B] font-semibold text-sm hover:bg-[#001F5B] hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <Download size={16} />
          Word deste imóvel
        </button>

        {/* Reopen Button */}
        <button
          onClick={onReopen}
          className="w-full py-3 px-4 rounded-lg border-2 border-[#e2e8f0] text-[#64748b] font-semibold text-sm hover:border-[#001F5B] hover:text-[#001F5B] transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <RotateCcw size={16} />
          Reabrir vistoria
        </button>
      </div>
    </div>
  );
}
