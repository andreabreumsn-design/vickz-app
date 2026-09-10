import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

/**
 * AppContext - Gerenciamento de estado global para VICKZ
 * Controla: dados de vistoria, fotos, propriedades, assinaturas, persistência
 */
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Estado principal do laudo
  const [laudoData, setLaudoData] = useState({
    // Tela 06: Dados de Identificação
    reference: '',
    inspectionData: {
      date: new Date().toISOString(),
      time: '',
      address: '',
      complement: '',
      municipality: '',
      state: '',
      cep: '',
      declarantName: '',
      declarantQuality: '',
      cpfCnpj: '',
      phone: '',
      email: ''
    },

    // Tela 07: Fotos e Georreferenciamento
    photos: [],
    geoReferences: {
      latitude: null,
      longitude: null,
      altitude: null
    },

    // Tela 08: Propriedades Lindeiras
    properties: [],

    // Tela 09: Assinaturas e Declarações
    signatures: {
      declarant: null,
      professional: null,
      witness: null
    },
    declarations: {
      warranty: false,
      authenticity: false,
      responsibility: false
    },
    timestamp: null,
    reportId: ''
  });

  // Estado de carregamento
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('identification');

  // Carregar dados do localStorage ao iniciar
  useEffect(() => {
    const savedData = localStorage.getItem('vickz_laudo_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setLaudoData(parsed);
      } catch (err) {
        console.error('Erro ao carregar dados salvos:', err);
      }
    }
  }, []);

  // Salvar dados no localStorage automaticamente quando mudam
  useEffect(() => {
    localStorage.setItem('vickz_laudo_data', JSON.stringify(laudoData));
  }, [laudoData]);

  /**
   * Atualiza dados de identificação (Tela 06)
   */
  const updateInspectionData = useCallback((newData) => {
    setLaudoData(prev => ({
      ...prev,
      inspectionData: {
        ...prev.inspectionData,
        ...newData
      }
    }));
  }, []);

  /**
   * Adiciona foto com metadata
   */
  const addPhoto = useCallback((photo) => {
    setLaudoData(prev => ({
      ...prev,
      photos: [...prev.photos, {
        id: `photo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        ...photo
      }]
    }));
  }, []);

  /**
   * Remove foto por ID
   */
  const removePhoto = useCallback((photoId) => {
    setLaudoData(prev => ({
      ...prev,
      photos: prev.photos.filter(p => p.id !== photoId)
    }));
  }, []);

  /**
   * Atualiza foto (marca patologias, descrição, etc)
   */
  const updatePhoto = useCallback((photoId, updates) => {
    setLaudoData(prev => ({
      ...prev,
      photos: prev.photos.map(p =>
        p.id === photoId ? { ...p, ...updates } : p
      )
    }));
  }, []);

  /**
   * Atualiza georreferenciamento
   */
  const updateGeoReferences = useCallback((geoData) => {
    setLaudoData(prev => ({
      ...prev,
      geoReferences: {
        ...prev.geoReferences,
        ...geoData
      }
    }));
  }, []);

  /**
   * Adiciona propriedade lindeira
   */
  const addProperty = useCallback((property) => {
    setLaudoData(prev => ({
      ...prev,
      properties: [...prev.properties, {
        id: `prop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...property
      }]
    }));
  }, []);

  /**
   * Remove propriedade por ID
   */
  const removeProperty = useCallback((propertyId) => {
    setLaudoData(prev => ({
      ...prev,
      properties: prev.properties.filter(p => p.id !== propertyId)
    }));
  }, []);

  /**
   * Atualiza propriedade
   */
  const updateProperty = useCallback((propertyId, updates) => {
    setLaudoData(prev => ({
      ...prev,
      properties: prev.properties.map(p =>
        p.id === propertyId ? { ...p, ...updates } : p
      )
    }));
  }, []);

  /**
   * Salva assinatura
   */
  const updateSignature = useCallback((type, signatureData) => {
    setLaudoData(prev => ({
      ...prev,
      signatures: {
        ...prev.signatures,
        [type]: signatureData
      }
    }));
  }, []);

  /**
   * Atualiza declarações
   */
  const updateDeclarations = useCallback((declarations) => {
    setLaudoData(prev => ({
      ...prev,
      declarations: {
        ...prev.declarations,
        ...declarations
      }
    }));
  }, []);

  /**
   * Valida dados antes de gerar laudo
   */
  const validateReportData = useCallback(() => {
    const errors = [];

    if (!laudoData.reference) errors.push('Referência do laudo não informada');
    if (!laudoData.inspectionData.date) errors.push('Data da vistoria não informada');
    if (!laudoData.inspectionData.address) errors.push('Endereço não informado');
    if (laudoData.photos.length === 0) errors.push('Nenhuma foto registrada');
    if (laudoData.properties.length === 0) errors.push('Nenhuma propriedade lindeira informada');
    if (!laudoData.signatures.declarant) errors.push('Assinatura do declarante não coletada');
    if (!laudoData.declarations.warranty) errors.push('Termo de veracidade não aceito');

    return {
      isValid: errors.length === 0,
      errors
    };
  }, [laudoData]);

  /**
   * Gera laudo em HTML
   */
  const generateReport = useCallback(async (format = 'html') => {
    const validation = validateReportData();
    if (!validation.isValid) {
      setError(`Dados inválidos: ${validation.errors.join(', ')}`);
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const endpoint = {
        html: '/api/reports/generate',
        pdf: '/api/reports/generate-pdf',
        word: '/api/reports/generate-word'
      }[format];

      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(laudoData)
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      if (format === 'html') {
        return await response.text();
      } else {
        return await response.blob();
      }
    } catch (err) {
      setError(err.message);
      console.error('Erro ao gerar laudo:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [laudoData, validateReportData]);

  /**
   * Submete laudo ao backend
   */
  const submitReport = useCallback(async () => {
    const validation = validateReportData();
    if (!validation.isValid) {
      setError(`Dados inválidos: ${validation.errors.join(', ')}`);
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const reportData = {
        ...laudoData,
        timestamp: new Date().toISOString(),
        reportId: `RPT-${Date.now()}`
      };

      const response = await fetch('http://localhost:3001/api/reports/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData)
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      // Limpar dados após submissão bem-sucedida
      setLaudoData(prev => ({
        ...prev,
        timestamp: new Date().toISOString(),
        reportId: result.reportId
      }));

      return result;
    } catch (err) {
      setError(err.message);
      console.error('Erro ao submeter laudo:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [laudoData, validateReportData]);

  /**
   * Limpa todos os dados
   */
  const clearAllData = useCallback(() => {
    setLaudoData({
      reference: '',
      inspectionData: {
        date: new Date().toISOString(),
        time: '',
        address: '',
        complement: '',
        municipality: '',
        state: '',
        cep: '',
        declarantName: '',
        declarantQuality: '',
        cpfCnpj: '',
        phone: '',
        email: ''
      },
      photos: [],
      geoReferences: { latitude: null, longitude: null, altitude: null },
      properties: [],
      signatures: { declarant: null, professional: null, witness: null },
      declarations: { warranty: false, authenticity: false, responsibility: false },
      timestamp: null,
      reportId: ''
    });
    localStorage.removeItem('vickz_laudo_data');
  }, []);

  /**
   * Exporta laudo como arquivo
   */
  const exportReport = useCallback(async (format = 'pdf') => {
    const blob = await generateReport(format);
    if (!blob) return;

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `laudo-${laudoData.reference || 'vistoria'}-${Date.now()}.${format}`;
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }, [laudoData.reference, generateReport]);

  const value = {
    // Estado
    laudoData,
    loading,
    error,
    currentScreen,

    // Setters
    setCurrentScreen,
    setLaudoData,
    setError,

    // Métodos de atualização
    updateInspectionData,
    addPhoto,
    removePhoto,
    updatePhoto,
    updateGeoReferences,
    addProperty,
    removeProperty,
    updateProperty,
    updateSignature,
    updateDeclarations,

    // Métodos de geração
    validateReportData,
    generateReport,
    submitReport,
    clearAllData,
    exportReport
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Hook para usar AppContext
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext deve ser usado dentro de AppProvider');
  }
  return context;
};
