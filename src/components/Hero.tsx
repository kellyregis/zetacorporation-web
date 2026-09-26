'use client';

import React from 'react';
import { ArrowRight, Dna, Activity, Lock, Cpu, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-[#070b14] to-slate-950 bg-grid-pattern pt-12 pb-20">
      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-cyan-600/15 via-sky-500/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-8 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>PROJETO ZETA // DESCOBERTA EM LONGEVIDADE CELULAR</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
          Redefinindo os Limites da{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
            Resiliência Humana
          </span>{' '}
          e da Regeneração.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
          A <strong className="text-white font-semibold">ZETA Corporation</strong> é líder global em pesquisa biomédica avançada, regeneração de tecidos humanos danificados e infraestrutura de telecomunicações quânticas autônomas com a malha <span className="text-cyan-400 font-mono">ZETA LINK</span>.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#research"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-sm tracking-wide shadow-[0_0_25px_rgba(14,165,233,0.35)] transition-all flex items-center justify-center gap-2 group"
          >
            <span>Conheça a Terapia CRT-13</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <button
            onClick={onOpenTerminal}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl zeta-glass zeta-glass-hover text-cyan-300 font-mono text-sm tracking-wider font-medium flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4 text-cyan-400" />
            <span>Terminal Interno ZETA-SEC</span>
          </button>
        </div>

        {/* Corporate Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="zeta-glass p-5 rounded-2xl text-left border-cyan-500/20">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Dna className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Patologia Celular</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white">99.8%</div>
            <div className="text-xs text-slate-400 mt-1">Taxa de regeneração tecidual em ensaios clínicos Z-13.</div>
          </div>

          <div className="zeta-glass p-5 rounded-2xl text-left border-cyan-500/20">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Cpu className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Malha ZETA Link</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white">100%</div>
            <div className="text-xs text-slate-400 mt-1">Cobertura autônoma insensível a interferência de rádio.</div>
          </div>

          <div className="zeta-glass p-5 rounded-2xl text-left border-cyan-500/20">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Activity className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Biossegurança</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white">BSL-4</div>
            <div className="text-xs text-slate-400 mt-1">Nível máximo de contenção física e patológica.</div>
          </div>

          <div className="zeta-glass p-5 rounded-2xl text-left border-cyan-500/20">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Lock className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Diretiva Sentinela</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white">DEF-SEC</div>
            <div className="text-xs text-slate-400 mt-1">Força de resposta tática e custódia de dados vitais.</div>
          </div>
        </div>

        {/* Diegetic Hidden Easter Egg in DOM */}
        <div className="mt-8 text-[11px] font-mono text-slate-600 select-none">
          <span>REGISTRO REGULATÓRIO CONFIDENCIAL: </span>
          <span className="redacted" title="Clique e inspecione o código">
            ZETA-04::PACIENTE_071_AUTENTICADO::CABANA_VOSS_PALETO
          </span>
        </div>
      </div>
    </section>
  );
};
