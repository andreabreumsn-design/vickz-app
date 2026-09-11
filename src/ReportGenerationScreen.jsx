import React, { useState } from 'react';
import { useApp } from '../AppContext';

const ReportGenerationScreen = () => {
  const {
    laudoData,
    reportValidation,
    validateReportData,
    exportPropertyReport,
    exportCompleteReport,
  } = useApp();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleValidation = () => {
    const valid = validateReportData();
    if (!valid) {
      setError('Dados insuficientes. Verifique: propriedades, fotos, endereço e assinatura.');
      return false;
    }
    setError(null);
    return true;
  };

  const handlePdfAll = async () => {
    if (!handleValidation()) return;
    
    setLoading(true);
    try {
      exportCompleteReport('pdf');
    } catch (err) {
      setError(`Erro ao gerar PDF: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleWordAll = async () => {
    if (!handleValidation()) return;
    
    setLoading(true);
    try {
      exportCompleteReport('word');
    } catch (err) {
      setError(`Erro ao gerar Word: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePropertyPdf = (index) => async () => {
    if (!handleValidation()) return;
    
    setLoading(true);
    try {
      exportPropertyReport(index, 'pdf');
    } catch (err) {
      setError(`Erro ao gerar PDF do imóvel: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePropertyWord = (index) => async () => {
    if (!handleValidation()) return;
    
    setLoading(true);
    try {
      exportPropertyReport(index, 'word');
    } catch (err) {
      setError(`Erro ao gerar Word do imóvel: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Módulo 4: Gerar Relatórios</h1>
          <p className="text-gray-600">Exportar laudos em PDF ou Word</p>
        </div>

        {/* Validation Checklist */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Status da Validação</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className={`flex items-center space-x-3 p-3 rounded ${reportValidation.hasProperties ? 'bg-green-50' : 'bg-red-50'}`}>
              <span className={`text-2xl ${reportValidation.hasProperties ? '✅' : '❌'}`}></span>
              <span className="text-gray-700">Propriedades: {laudoData.properties?.length || 0}</span>
            </div>
            <div className={`flex items-center space-x-3 p-3 rounded ${reportValidation.hasPhotos ? 'bg-green-50' : 'bg-red-50'}`}>
              <span className={`text-2xl ${reportValidation.hasPhotos ? '✅' : '❌'}`}></span>
              <span className="text-gray-700">Fotos: {laudoData.properties?.reduce((sum, p) => sum + (p.photos?.length || 0), 0) || 0}</span>
            </div>
            <div className={`flex items-center space-x-3 p-3 rounded ${reportValidation.hasAddress ? 'bg-green-50' : 'bg-red-50'}`}>
              <span className={`text-2xl ${reportValidation.hasAddress ? '✅' : '❌'}`}></span>
              <span className="text-gray-700">Endereço informado</span>
            </div>
            <div className={`flex items-center space-x-3 p-3 rounded ${reportValidation.hasSignature ? 'bg-green-50' : 'bg-red-50'}`}>
              <span className={`text-2xl ${reportValidation.hasSignature ? '✅' : '❌'}`}></span>
              <span className="text-gray-700">Assinatura do técnico</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-red-800">
            ⚠️ {error}
          </div>
        )}

        {/* Complete Report Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-orange-500">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📄 Relatório Integral (Todos os Imóveis)</h2>
          <p className="text-gray-600 mb-6">Gera um único laudo contendo todas as propriedades vistoriadas</p>
          <div className="flex gap-4">
            <button
              onClick={handlePdfAll}
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              {loading ? '⏳ Gerando PDF...' : '📕 PDF Integral'}
            </button>
            <button
              onClick={handleWordAll}
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              {loading ? '⏳ Gerando Word...' : '📗 Word Integral'}
            </button>
          </div>
        </div>

        {/* Individual Properties Section */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🏠 Relatórios por Imóvel</h2>
          <p className="text-gray-600 mb-6">Gera um laudo separado para cada propriedade</p>

          {laudoData.properties && laudoData.properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {laudoData.properties.map((property, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition">
                  <h3 className="font-semibold text-gray-800 mb-3">Imóvel {index + 1}</h3>
                  <p className="text-sm text-gray-600 mb-4">{property.address || `Propriedade ${index + 1}`}</p>
                  <p className="text-xs text-gray-500 mb-4">📸 {property.photos?.length || 0} fotos</p>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePropertyPdf(index)}
                      disabled={loading}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white text-sm font-medium py-2 px-3 rounded transition duration-200"
                    >
                      PDF
                    </button>
                    <button
                      onClick={handlePropertyWord(index)}
                      disabled={loading}
                      className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white text-sm font-medium py-2 px-3 rounded transition duration-200"
                    >
                      Word
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">
              <p>Nenhuma propriedade registrada. Complete os módulos anteriores primeiro.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportGenerationScreen;
