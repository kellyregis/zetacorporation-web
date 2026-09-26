'use client';

import React, { useState } from 'react';
import { ZetaLogo } from './ZetaLogo';
import { Shield, Terminal, Globe, Lock } from 'lucide-react';

interface NavbarProps {
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [clickCount, setClickCount] = useState(0);
  const [glitchAlert, setGlitchAlert] = useState(false);

  const handleLogoClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 5) {
      setGlitchAlert(true);
      setTimeout(() => setGlitchAlert(false), 3500);
      setClickCount(0);
      console.warn('%c[ZETA-SEC ARG TRIGGERED] Conexão clandestina detectada na porta ZETA Link 104.7 MHz.', 'color: #f87171; font-weight: bold; font-size: 14px;');
    }
  };

  return (
    <>
      {/* Top Corporate Stock & Regulatory Bar */}
      <div className="bg-slate-950/90 border-b border-cyan-500/20 text-[11px] font-mono py-1.5 px-4 text-slate-400 flex items-center justify-between overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            NASDAQ: ZTAC $348.20 (+2.15%)
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-400">
            DIVISÃO DE PESQUISA BIOLÓGICA E LONGEVIDADE CELULAR
          </span>
          <span className="hidden lg:inline text-slate-600">|</span>
          <span className="hidden lg:inline text-slate-500">
            CERTIFICAÇÕES: BSL-4 · ISO 13485:2016 · INOVAÇÃO BIOMÉDICA CERTIFICADA
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" />
            REDE ZETA LINK: OPERACIONAL
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div onClick={handleLogoClick} className="cursor-pointer">
            <ZetaLogo size={38} />
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-cyan-400 transition-colors">
              Sobre Nós
            </a>
            <a href="#research" className="hover:text-cyan-400 transition-colors">
              Pesquisa & CRT-13
            </a>
            <a href="#team" className="hover:text-cyan-400 transition-colors">
              Conselho & Pesquisadores
            </a>
            <a href="#press" className="hover:text-cyan-400 transition-colors">
              Comunicados
            </a>
            <a href="#facilities" className="hover:text-cyan-400 transition-colors">
              Instalações
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold tracking-wider hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] group"
            >
              <Terminal className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>PORTAL ZETA-SEC</span>
            </button>
          </div>
        </div>
      </header>

      {/* Secret Glitch Banner Alert */}
      {glitchAlert && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-red-950/95 border-2 border-red-500 text-red-200 px-6 py-3 rounded-lg shadow-[0_0_30px_rgba(239,68,68,0.5)] font-mono text-xs flex items-center gap-3 animate-bounce">
          <Lock className="w-5 h-5 text-red-400 animate-pulse" />
          <div>
            <strong className="text-red-400">[ALERTA DE SEGURANÇA INTERNA]:</strong> Canal de emergência ativado.
            <br />
            <span className="text-[11px] text-red-300">
              Chave de contingência: <code className="bg-red-900/60 px-1 py-0.5 rounded text-white">VOSS_071_YELLOWJACK</code>
            </span>
          </div>
        </div>
      )}
    </>
  );
};
