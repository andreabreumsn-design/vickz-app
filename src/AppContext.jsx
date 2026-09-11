import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  htmlPrint,
  baixarWord,
  abrirRelatorio,
  relatorioImovel,
  relatorioIntegral,
} from './utils/reportGenerator';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [laudoData, setLaudoData] = useState({
    reference: '',
    inspectionData: {
      date: new Date().toISOString().split('T')[0],
      declarantName: '',
      address: '',
      latitude: '',
      longitude: '',
    },
    properties: [],
    signatures: {
      professional: '',
      witness: '',
    },
    geoReferences: {
      latitude: '',
      longitude: '',
    },
  });

  const [reportValidation, setReportValidation] = useState({
    hasProperties: false,
    hasPhotos: false,
    hasAddress: false,
    hasSignature: false,
  });

  // Converte dados React para formato do gerador
  const convertToGeneratorFormat = useCallback(() => {
    const dataGeral = {
      obra: laudoData.reference || 'Laudo de Vizinhança',
      prof: laudoData.inspectionData.declarantName || 'Profissional Responsável',
      data: laudoData.inspectionData.date || new Date().toISOString().split('T')[0],
      rua: laudoData.inspectionData.address || 'Endereço não informado',
      lat: laudoData.inspectionData.latitude || laudoData.geoReferences.latitude || '',
      lng: laudoData.inspectionData.longitude || laudoData.geoReferences.longitude || '',
      const: '',
      crea: '',
      mat: '',
      convList: [],
      artList: [],
    };

    const imoveis = laudoData.properties.map((prop, idx) => ({
      endereco: prop.address || `Propriedade ${idx + 1}`,
      fotos: prop.photos || [],
      sigProf: laudoData.signatures.professional || '',
      sigTest: laudoData.signatures.witness || '',
    }));

    return { dataGeral, imoveis };
  }, [laudoData]);

  // Valida dados para exportação
  const validateReportData = useCallback(() => {
    const validation = {
      hasProperties: laudoData.properties && laudoData.properties.length > 0,
      hasPhotos: laudoData.properties?.some(p => p.photos && p.photos.length > 0) || false,
      hasAddress: !!laudoData.inspectionData.address,
      hasSignature: !!laudoData.signatures.professional,
    };
    setReportValidation(validation);
    return validation.hasProperties && validation.hasPhotos && validation.hasAddress;
  }, [laudoData]);

  // Exporta relatório de propriedade individual
  const exportPropertyReport = useCallback((propertyIndex, format = 'pdf') => {
    if (!validateReportData()) {
      console.error('Dados insuficientes para gerar relatório');
      return;
    }

    const { dataGeral, imoveis } = convertToGeneratorFormat();

    if (propertyIndex < 0 || propertyIndex >= imoveis.length) {
      console.error('Índice de propriedade inválido');
      return;
    }

    const imovel = imoveis[propertyIndex];
    const titulo = `Laudo - ${imovel.endereco}`;

    try {
      relatorioImovel(imovel, propertyIndex, format, dataGeral);
    } catch (error) {
      console.error('Erro ao gerar relatório de propriedade:', error);
    }
  }, [validateReportData, convertToGeneratorFormat]);

  // Exporta relatório completo (todas as propriedades)
  const exportCompleteReport = useCallback((format = 'pdf') => {
    if (!validateReportData()) {
      console.error('Dados insuficientes para gerar relatório completo');
      return;
    }

    const { dataGeral, imoveis } = convertToGeneratorFormat();

    if (imoveis.length === 0) {
      console.error('Nenhuma propriedade para gerar relatório');
      return;
    }

    const titulo = dataGeral.obra || 'Laudo de Vizinhança';

    try {
      relatorioIntegral(imoveis, format, dataGeral);
    } catch (error) {
      console.error('Erro ao gerar relatório completo:', error);
    }
  }, [validateReportData, convertToGeneratorFormat]);

  // Métodos legados para compatibilidade
  const generateReport = useCallback(() => {
    exportCompleteReport('pdf');
  }, [exportCompleteReport]);

  const exportReport = useCallback((format = 'pdf') => {
    exportCompleteReport(format);
  }, [exportCompleteReport]);

  const addProperty = useCallback((property) => {
    setLaudoData(prev => ({
      ...prev,
      properties: [...prev.properties, property],
    }));
  }, []);

  const updateProperty = useCallback((index, property) => {
    setLaudoData(prev => {
      const updated = [...prev.properties];
      updated[index] = property;
      return { ...prev, properties: updated };
    });
  }, []);

  const removeProperty = useCallback((index) => {
    setLaudoData(prev => ({
      ...prev,
      properties: prev.properties.filter((_, i) => i !== index),
    }));
  }, []);

  const updateInspectionData = useCallback((data) => {
    setLaudoData(prev => ({
      ...prev,
      inspectionData: { ...prev.inspectionData, ...data },
    }));
  }, []);

  const updateSignatures = useCallback((signatures) => {
    setLaudoData(prev => ({
      ...prev,
      signatures: { ...prev.signatures, ...signatures },
    }));
  }, []);

  const value = {
    laudoData,
    setLaudoData,
    reportValidation,
    validateReportData,
    exportPropertyReport,
    exportCompleteReport,
    generateReport,
    exportReport,
    addProperty,
    updateProperty,
    removeProperty,
    updateInspectionData,
    updateSignatures,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
};

export default AppContext;
