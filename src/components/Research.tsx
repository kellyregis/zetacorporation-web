'use client';

import React from 'react';
import { Dna, Wifi, ShieldCheck, Database, FlaskConical, AlertTriangle, ArrowUpRight } from 'lucide-react';

export const Research: React.FC = () => {
  return (
    <section id="research" className="py-24 bg-[#070b14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-4">
            <FlaskConical className="w-3.5 h-3.5" />
            Pipelines Científicos & Tecnologia
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Pilares da <span className="text-cyan-400">Inovação ZETA</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Nossos programas científicos combinam síntese molecular de última geração, criptografia quântica em malha e contenção de nível biossegurança BSL-4.
          </p>
        </div>

        {/* 3 Main Research Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Pillar 1: CRT-13 */}
          <div className="zeta-glass p-8 rounded-2xl border-cyan-500/20 zeta-glass-hover flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Dna className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-2 font-mono text-[11px] text-cyan-400 font-bold uppercase tracking-wider">
                <span>PROGRAMA BIOMÉDICO</span>
                <span className="text-slate-600">·</span>
                <span>FASE III</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Terapia CRT-13 (Regeneração Celular)
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Desenvolvimento de compostos de proliferação celular acelerada para reversão de falências orgânicas críticas e reconstituição de tecidos necrosados em tempo recorde.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Vetor Experimental:</span>
                <span className="font-bold text-white">Z-13 Peptide Complex</span>
              </div>
              <div className="text-[10px] font-mono text-red-400/80 mt-2 bg-red-950/20 p-2 rounded border border-red-900/30">
                ⚠ REGISTRO CONFIDENCIAL: Paciente 071 identificado como catalisador primário natural.
              </div>
            </div>
          </div>

          {/* Pillar 2: ZETA LINK */}
          <div className="zeta-glass p-8 rounded-2xl border-cyan-500/20 zeta-glass-hover flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Wifi className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-2 font-mono text-[11px] text-cyan-400 font-bold uppercase tracking-wider">
                <span>TELECOMUNICAÇÕES QUÂNTICAS</span>
                <span className="text-slate-600">·</span>
                <span>ATIVO</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Malha Descentralizada ZETA LINK
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Rede mesh autônoma com criptografia quântica ponto a ponto. Modems físicos blindados contra pulsos eletromagnéticos garantem conectividade contínua em condições extremas de colapso de infraestrutura.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Dispositivos Físicos:</span>
                <span className="font-bold text-white">Modem ZETA LINK Móvel / Fixo</span>
              </div>
              <div className="text-[10px] font-mono text-cyan-300/80 mt-2 bg-cyan-950/20 p-2 rounded border border-cyan-900/30">
                HUB CENTRAL: Terminal Público da Trade Station em Sandy Shores (Fibra Óptica).
              </div>
            </div>
          </div>

          {/* Pillar 3: Sentinela Containment */}
          <div className="zeta-glass p-8 rounded-2xl border-cyan-500/20 zeta-glass-hover flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-2 font-mono text-[11px] text-cyan-400 font-bold uppercase tracking-wider">
                <span>DEFESA & CONTENÇÃO</span>
                <span className="text-slate-600">·</span>
                <span>BSL-4</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Divisão Tática Sentinela
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Força tática privada encarregada da custódia de dados confidenciais, proteção física de laboratórios subterrâneos e isolamento preventivo de zonas biológicas sob estrita ordem executiva.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Diretiva de Campo:</span>
                <span className="font-bold text-white">Protocolo Ordem Negra</span>
              </div>
              <div className="text-[10px] font-mono text-amber-300/80 mt-2 bg-amber-950/20 p-2 rounded border border-amber-900/30">
                ALERTA: Quarentena de Bolingbroke e custódia militar do Comboio 17.
              </div>
            </div>
          </div>
        </div>

        {/* Global Facilities Banner */}
        <div id="facilities" className="zeta-glass p-8 rounded-2xl border-cyan-500/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-xl font-bold text-white">Complexos Operacionais em San Andreas</h4>
              <p className="text-xs text-slate-400 font-mono mt-1">Instalações registradas no Departamento de Biossegurança e Defesa</p>
            </div>
            <span className="px-3 py-1 rounded bg-cyan-950 border border-cyan-500/30 font-mono text-xs text-cyan-400">
              STATUS: ZONAS SOB QUARENTENA
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800">
              <div className="text-cyan-400 font-bold mb-1">Arcadius Business Center</div>
              <div className="text-slate-400 text-[11px]">Los Santos Central</div>
              <div className="text-slate-500 text-[10px] mt-2">Sede Administrativa e Garagem de Servidores</div>
            </div>

            <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800">
              <div className="text-cyan-400 font-bold mb-1">Humane Labs Research</div>
              <div className="text-slate-400 text-[11px]">San Chianski Mountain</div>
              <div className="text-slate-500 text-[10px] mt-2">Câmara Fria, Geradores & Lab B (BSL-4)</div>
            </div>

            <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800">
              <div className="text-cyan-400 font-bold mb-1">Palmer-Taylor Station</div>
              <div className="text-slate-400 text-[11px]">East Coast Energy Hub</div>
              <div className="text-slate-500 text-[10px] mt-2">Escotilha Subterrânea de Acesso Restrito</div>
            </div>

            <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800">
              <div className="text-red-400 font-bold mb-1">Complexo ZETA-04</div>
              <div className="text-slate-400 text-[11px]">Subsolo Profundo</div>
              <div className="text-slate-500 text-[10px] mt-2">Sala de Controle de Contenção Primária</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
