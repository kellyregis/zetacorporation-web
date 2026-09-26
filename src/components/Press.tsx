'use client';

import React from 'react';
import { Newspaper, Calendar, ExternalLink, ShieldAlert } from 'lucide-react';

interface Article {
  date: string;
  category: string;
  title: string;
  summary: string;
  argClue?: string;
}

const ARTICLES: Article[] = [
  {
    date: '14 DE OUTUBRO, 2025',
    category: 'PESQUISA CLÍNICA',
    title: 'ZETA Corporation Apresenta Resultados da Fase II do Projeto de Resiliência Celular CRT-13',
    summary: 'Estudo apresentado no simpósio internacional de biotecnologia detalha avanços extraordinários na reversão de morte tecidual em cobaias primatas. O Dr. Elias Voss destacou o potencial de eliminar lesões traumáticas irreversíveis.',
    argClue: 'NOTA: O ensaio utilizou amostras purificadas da sequência genética do Paciente 071.'
  },
  {
    date: '28 DE NOVEMBRO, 2025',
    category: 'INFRAESTRUTURA',
    title: 'Acordo com Forças de Segurança para Implementação da Rede Quântica ZETA Link',
    summary: 'A divisão de tecnologia liderada pela Dra. Maya Lin concluiu a instalação de modems de malha resiliente em pontos estratégicos de San Andreas, incluindo o aeródromo de Sandy Shores e subestações industriais.',
    argClue: 'NOTA: O protocolo de redundância garante sinal ininterrupto mesmo com a queda da malha elétrica central.'
  },
  {
    date: '19 DE JANEIRO, 2026',
    category: 'COMUNICADO OFICIAL',
    title: 'Nota de Esclarecimento sobre Operação Logística na Malha Ferroviária de Grand Senora',
    summary: 'A ZETA Corporation desmente boatos sobre vazamento de materiais químicos durante a passagem de vagões de transporte no deserto. O Vice-Presidente Marcus Vance confirmou que todos os lacres de segurança permaneceram intactos.',
    argClue: 'NOTA: O vagão Miller no pátio de manobras foi selado preventivamente com suprimentos militares.'
  },
  {
    date: '03 DE MARÇO, 2026',
    category: 'SEGURANÇA REGIONAL',
    title: 'Diretoria de Biossegurança Emite Alerta de Calibração Atmosférica em Blaine County',
    summary: 'Em coordenação com a força Sentinela do General Hector Briggs, postos de controle temporários foram posicionados ao longo da Route 68 e no entorno de Fort Zancudo para monitoramento de índices de umidade atípica e quarentena preventiva.',
    argClue: 'ALERTA FINAL: Primeiros registros do fenômeno denominado Chuva Negra e ativação da Ordem Negra.'
  }
];

export const Press: React.FC = () => {
  return (
    <section id="press" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-4">
            <Newspaper className="w-3.5 h-3.5" />
            Relações Públicas & Comunicados
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Notícias & Arquivo de <span className="text-cyan-400">Imprensa</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Acompanhe comunicados oficiais, pronunciamentos executivos e publicações científicas emitidas pelo gabinete de relações corporativas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARTICLES.map((article, i) => (
            <article
              key={i}
              className="zeta-glass p-8 rounded-2xl border-cyan-500/20 zeta-glass-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                  <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                    {article.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 hover:text-cyan-300 transition-colors">
                  {article.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
                  {article.summary}
                </p>
              </div>

              {article.argClue && (
                <div className="pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-amber-400/90">{article.argClue}</span>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
