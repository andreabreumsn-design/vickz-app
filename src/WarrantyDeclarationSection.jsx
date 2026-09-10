import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function WarrantyDeclarationSection({
  inspectionRef = '',
  inspectionDate = '',
  declarantName = '',
  declarantQuality = '',
  professionalName = '',
  professionalCrea = ''
}) {
  return (
    <div className="mx-4 my-4 space-y-4">
      {/* Identification Section */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] overflow-hidden shadow-sm">
        <div className="px-4 py-3 bg-[#f8fafc] border-b border-[#e2e8f0]">
          <h3 className="text-sm font-bold text-[#001F5B]">Identificação da Vistoria</h3>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs font-semibold text-[#64748b] mb-1">Referência</p>
            <p className="font-semibold text-[#001F5B]">{inspectionRef || 'Não informado'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#64748b] mb-1">Data da Vistoria</p>
            <p className="font-semibold text-[#001F5B]">{inspectionDate || 'Não informado'}</p>
          </div>
        </div>
      </div>

      {/* Declarant Identification */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] overflow-hidden shadow-sm">
        <div className="px-4 py-3 bg-[#f8fafc] border-b border-[#e2e8f0]">
          <h3 className="text-sm font-bold text-[#001F5B]">Identificação do Declarante</h3>
        </div>
        <div className="p-4 space-y-3 text-sm">
          <div>
            <p className="text-xs font-semibold text-[#64748b] mb-1">Nome Completo</p>
            <p className="font-semibold text-[#001F5B]">{declarantName || 'Não informado'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#64748b] mb-1">Qualidade</p>
            <p className="font-semibold text-[#001F5B]">{declarantQuality || 'Não informado'}</p>
          </div>
        </div>
      </div>

      {/* Warranty Declaration */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] overflow-hidden shadow-sm">
        <div className="px-4 py-3 bg-[#f8fafc] border-b border-[#e2e8f0]">
          <h3 className="text-sm font-bold text-[#001F5B]">Declaração de Veracidade</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="bg-[#DBEAFE] border-l-4 border-[#3B82F6] rounded-lg p-3">
            <p className="text-xs text-[#1E40AF] leading-relaxed">
              <span className="font-semibold">Declaração Oficial de Vistoria Cautelar de Vizinhança</span>
              {'\n\n'}
              Pelo presente, declaro, sob as penas da lei, que os fatos descritos neste laudo de vistoria cautelar de vizinhança foram apurados e verificados pessoalmente, em conformidade com as normas técnicas aplicáveis.
              {'\n\n'}
              <span className="font-semibold">Confirmo que:</span>
              {'\n'}
              • As informações prestadas são verdadeiras e precisas
              {'\n'}
              • Os dados da vistoria foram coletados conforme especificação técnica
              {'\n'}
              • As fotos foram registradas em modo paisagem para melhor qualidade
              {'\n'}
              • Os imóveis lindeiros foram inspecionados adequadamente
              {'\n'}
              • Este laudo é emitido sob responsabilidade profissional e legal
            </p>
          </div>

          {/* Professional Info */}
          <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg p-3">
            <p className="text-xs font-semibold text-[#0C4A6E] mb-2">Profissional Responsável</p>
            <p className="text-xs text-[#075985] leading-relaxed">
              <span className="font-semibold">{professionalName || 'Não informado'}</span>
              {professionalCrea && (
                <>
                  {'\n'}
                  CREA/CAU: {professionalCrea}
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Observations */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] overflow-hidden shadow-sm">
        <div className="px-4 py-3 bg-[#f8fafc] border-b border-[#e2e8f0]">
          <h3 className="text-sm font-bold text-[#001F5B]">Ressalvas / Observações Adicionais</h3>
        </div>
        <div className="p-4">
          <textarea
            placeholder="Espaço para ressalvas ou observações adicionais que o declarante deseje registrar"
            rows={4}
            className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none transition-all resize-none"
          />
        </div>
      </div>

      {/* Confirmation Checklist */}
      <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-lg p-4 mx-4 my-4">
        <p className="text-sm font-bold text-[#065F46] mb-3">Confirmações Finais</p>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <CheckCircle size={16} className="text-[#10b981] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#047857]">Todas as informações foram preenchidas corretamente</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle size={16} className="text-[#10b981] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#047857]">As fotos foram capturadas em modo paisagem</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle size={16} className="text-[#10b981] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#047857]">Dados dos imóveis lindeiros foram registrados</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle size={16} className="text-[#10b981] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#047857]">Assinaturas digitais foram coletadas</p>
          </div>
        </div>
      </div>
    </div>
  );
}
