'use client';

import React from 'react';
import { Building2, Shield, HeartPulse, Award, Globe, Users } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-950 relative border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Narrative */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-4">
              <Building2 className="w-3.5 h-3.5" />
              Nossa Trajetória Institucional
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              A Fronteira Científica da <span className="text-cyan-400">Vida e Longevidade</span>
            </h2>
            <p className="mt-6 text-slate-300 text-sm sm:text-base leading-relaxed">
              Fundada com a premissa de que a fragilidade celular humana não deveria ser uma sentença definitiva, a <strong>ZETA Corporation</strong> consolidou-se como a autoridade científica primária em terapias regenerativas celulares, biossegurança de nível 4 e telecomunicações de alta resiliência.
            </p>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              Durante os programas de isolamento de peptídeos no complexo de San Andreas, nossa divisão biológica identificou mecanismos biológicos capazes de manter o funcionamento metabólico de tecidos danificados, consolidando o programa <strong>CRT-13</strong>.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 font-mono text-xs">
              <div className="border-l-2 border-cyan-500 pl-4">
                <div className="text-xl font-bold text-white">2018</div>
                <div className="text-slate-400 mt-1">Início do Projeto ZETA e síntese inicial da variante regenerativa.</div>
              </div>
              <div className="border-l-2 border-cyan-500 pl-4">
                <div className="text-xl font-bold text-white">2024</div>
                <div className="text-slate-400 mt-1">Isolamento do genoma do Paciente 071 e expansão do Complexo ZETA-04.</div>
              </div>
            </div>
          </div>

          {/* Right Column: Values & Credentials */}
          <div className="space-y-6">
            <div className="zeta-glass p-6 rounded-2xl border-cyan-500/20 zeta-glass-hover flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Regeneração Tecidual Autônoma</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Desenvolvimento de compostos de rápida replicação celular capazes de reconstituir tecidos orgânicos mesmo sob colapso sistêmico.
                </p>
              </div>
            </div>

            <div className="zeta-glass p-6 rounded-2xl border-cyan-500/20 zeta-glass-hover flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Biossegurança e Contenção Sentinela</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Instalações com isolamento de ar de pressão negativa quádrupla e protocolos táticos de intervenção imediata para proteção biológica.
                </p>
              </div>
            </div>

            <div className="zeta-glass p-6 rounded-2xl border-cyan-500/20 zeta-glass-hover flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Certificação e Governança Internacional</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Supervisão em estrita conformidade com as diretrizes da Organização Mundial de Biossegurança e consórcios de pesquisa bio-médica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
