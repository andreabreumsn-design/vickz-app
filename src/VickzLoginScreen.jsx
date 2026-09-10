import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, AlertCircle, Wifi, WifiOff, Lock, Mail, Briefcase } from 'lucide-react';

export default function VickzLoginScreen() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    crea: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Validate CREA/CAU format (simplified: at least 5 alphanumeric chars)
  const validateCrea = (crea) => {
    return /^[A-Z0-9]{5,}$/.test(crea.toUpperCase());
  };

  // Validate email
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validate and submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }

    if (!formData.crea) {
      newErrors.crea = 'Registro profissional (CREA/CAU) é obrigatório';
    } else if (!validateCrea(formData.crea)) {
      newErrors.crea = 'Formato CREA/CAU inválido (ex: SP1234/D)';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Simulate login request
      setIsLoading(true);
      try {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Save preferences if "Remember Me" is checked
        if (formData.rememberMe) {
          localStorage.setItem('vickz_email', formData.email);
          localStorage.setItem('vickz_crea', formData.crea);
        }

        // Here you would typically call your authentication API
        console.log('Login attempt:', {
          email: formData.email,
          crea: formData.crea,
          rememberMe: formData.rememberMe,
        });

        // Show success (you could redirect to dashboard here)
        alert('Login bem-sucedido! Redirecionando para o dashboard...');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1220] via-[#0f1628] to-[#1a2a3a] text-white font-inter">
      {/* Online/Offline Indicator */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1e293b] border border-[#334155]">
        {isOnline ? (
          <>
            <Wifi size={16} className="text-emerald-500" />
            <span className="text-xs font-medium">Online</span>
          </>
        ) : (
          <>
            <WifiOff size={16} className="text-amber-500" />
            <span className="text-xs font-medium">Offline</span>
          </>
        )}
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            {/* Logo Placeholder */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF6600] to-[#FF8533] flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">V</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white">VICKZ</h1>
            <p className="text-sm text-[#cbd5e1] leading-relaxed">
              Intelligence OS para
              <br />
              <span className="text-[#FF6600] font-semibold">Vistorias Cautelares</span>
            </p>
            <p className="text-xs text-[#94a3b8] mt-2">
              Segurança técnica para um convívio mais tranquilo
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-gradient-to-b from-[#1e293b] to-[#0f1628] rounded-2xl border border-[#334155] p-8 space-y-6 shadow-2xl">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Acesse sua conta</h2>
              <p className="text-sm text-[#94a3b8]">
                Entre para gerenciar suas vistorias, laudos e documentos
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-[#cbd5e1]">
                  E-mail Corporativo
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] pointer-events-none" size={18} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu.email@empresa.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-[#0f1628] border-2 transition-colors font-inter text-sm ${
                      errors.email
                        ? 'border-[#dc2626] focus:border-[#FF6600]'
                        : 'border-[#334155] focus:border-[#FF6600] focus:outline-none'
                    }`}
                  />
                  {errors.email && (
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-[#dc2626]" size={18} />
                  )}
                </div>
                {errors.email && (
                  <p className="text-xs text-[#dc2626] flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-[#cbd5e1]">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] pointer-events-none" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Sua senha segura"
                    className={`w-full pl-10 pr-12 py-3 rounded-lg bg-[#0f1628] border-2 transition-colors font-inter text-sm ${
                      errors.password
                        ? 'border-[#dc2626] focus:border-[#FF6600]'
                        : 'border-[#334155] focus:border-[#FF6600] focus:outline-none'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#cbd5e1] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-[#dc2626] flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.password}
                  </p>
                )}
              </div>

              {/* CREA/CAU Field */}
              <div className="space-y-2">
                <label htmlFor="crea" className="block text-sm font-semibold text-[#cbd5e1]">
                  Registro Profissional (CREA/CAU)
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] pointer-events-none" size={18} />
                  <input
                    type="text"
                    id="crea"
                    name="crea"
                    value={formData.crea}
                    onChange={handleInputChange}
                    placeholder="Ex: SP1234/D ou RJ5678/A"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-[#0f1628] border-2 transition-colors font-inter text-sm uppercase ${
                      errors.crea
                        ? 'border-[#dc2626] focus:border-[#FF6600]'
                        : 'border-[#334155] focus:border-[#FF6600] focus:outline-none'
                    }`}
                  />
                  {errors.crea && (
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-[#dc2626]" size={18} />
                  )}
                </div>
                {errors.crea && (
                  <p className="text-xs text-[#dc2626] flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.crea}
                  </p>
                )}
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-2 border-[#334155] bg-[#0f1628] cursor-pointer accent-[#FF6600]"
                />
                <label htmlFor="rememberMe" className="text-sm text-[#94a3b8] cursor-pointer">
                  Lembrar meu acesso neste dispositivo
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  isLoading
                    ? 'bg-[#FF6600] opacity-75 cursor-not-allowed'
                    : 'bg-[#FF6600] hover:bg-[#FF7722] active:scale-95'
                } text-white shadow-lg`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Acessando...
                  </>
                ) : (
                  <>
                    ACESSAR SISTEMA →
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#334155]"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-[#1e293b] text-[#64748b]">ou</span>
              </div>
            </div>

            {/* Secondary Actions */}
            <div className="space-y-2">
              <button
                type="button"
                className="w-full py-3 rounded-lg font-semibold text-sm border-2 border-[#334155] text-[#CBD5E1] hover:bg-[#0f1628] transition-colors"
              >
                Esqueceu sua senha?
              </button>
              <p className="text-center text-sm text-[#94a3b8]">
                Não tem uma conta?{' '}
                <button type="button" className="text-[#FF6600] font-semibold hover:underline">
                  Cadastre-se aqui
                </button>
              </p>
            </div>
          </div>

          {/* Footer - Features Grid */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#334155]">
            <div className="text-center space-y-2">
              <div className="text-2xl">🛡</div>
              <p className="text-xs text-[#94a3b8] font-medium">PREVENÇÃO</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl">👥</div>
              <p className="text-xs text-[#94a3b8] font-medium">BOA VIZINHANÇA</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl">📊</div>
              <p className="text-xs text-[#94a3b8] font-medium">SEGURANÇA</p>
            </div>
          </div>

          {/* Support Links */}
          <div className="flex justify-center gap-4 pt-4">
            <button type="button" className="text-xs text-[#64748b] hover:text-[#FF6600] transition-colors">
              Suporte
            </button>
            <span className="text-[#334155]">•</span>
            <button type="button" className="text-xs text-[#64748b] hover:text-[#FF6600] transition-colors">
              Documentação
            </button>
            <span className="text-[#334155]">•</span>
            <button type="button" className="text-xs text-[#64748b] hover:text-[#FF6600] transition-colors">
              Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
