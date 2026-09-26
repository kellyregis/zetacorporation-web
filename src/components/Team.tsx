'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, ShieldAlert, Fingerprint, MapPin, Radio, FileText, X } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  department: string;
  clearance: string;
  image: string;
  publicBio: string;
  classified: {
    status: string;
    internalId: string;
    lastKnownLocation: string;
    interceptedNote: string;
    investigationClue: string;
    audioFrequency?: string;
  };
}

const MEMBERS: TeamMember[] = [
  {
    id: 'voss',
    name: 'Dr. Elias Voss',
    title: 'Diretor Médico-Chefe & Pesquisa Celular',
    department: 'Divisão de Pesquisa Biológica ZETA',
    clearance: 'CREDENCIAL ALFA-4 (MESTRE)',
    image: '/images/team/voss.jpg',
    publicBio: 'Líder científico pioneiro em regeneração de tecidos e reconstituição celular humana. Co-fundador do Projeto ZETA e supervisor sênior dos ensaios clínicos da variante Z-13.',
    classified: {
      status: 'DESAPARECIDO // ALERTA DE CAPTURA SENTINELA',
      internalId: 'EMP-0419',
      lastKnownLocation: 'Alamo Sea (Píer de Galilee) / Refúgio em Paleto Forest',
      interceptedNote: '"As reações celulares do Paciente 071 desafiam qualquer lógica biológica... Como um tecido danificado se recompõe em segundos sem inflamação? O que exatamente a ZETA encontrou antes de nos trazer para este laboratório?"',
      investigationClue: 'Arquivos pessoais do Dr. Voss foram copiados para pendrives físicos espalhados pelo mapa e escondidos em seu barco no píer de Galilee e em sua cabana em Paleto.',
      audioFrequency: '104.7 MHz (Transmissor de Sandy Shores)'
    }
  },
  {
    id: 'sterling',
    name: 'Eleanor Sterling',
    title: 'Diretora Executiva (CEO) & Presidente do Conselho',
    department: 'Gabinete Executivo Global',
    clearance: 'CONSELHO DIRETOR',
    image: '/images/team/sterling.jpg',
    publicBio: 'Estrategista corporativa e líder executiva com mais de duas décadas à frente de conglomerados biomédicos e parcerias estratégicas com o Departamento de Defesa.',
    classified: {
      status: 'EM COMANDO // COMPLEXO ZETA-04',
      internalId: 'ZETA-DIR-001',
      lastKnownLocation: 'Complexo Subterrâneo ZETA-04 (Coordenadas Profundas)',
      interceptedNote: '"Qualquer funcionário ou cientista que tentar desacelerar os ensaios Z-13 será removido sob o Artigo 9 da Diretiva Sentinela. O Paciente 071 não pertence a si mesmo; pertence ao conselho."',
      investigationClue: 'Ordens executivas de evacuação e trancamento de portas foram assinadas de seu terminal no edifício Arcadius Business Center em Los Santos.'
    }
  },
  {
    id: 'kane',
    name: 'Dr. Adrian Kane',
    title: 'Geneticista Sênior & Pesquisador em Arquitetura Celular',
    department: 'Genômica Avançada & Projeto Estabilizador',
    clearance: 'CREDENCIAL ALFA-3',
    image: '/images/team/kane.jpg',
    publicBio: 'Pesquisador em alterações cromossômicas atípicas e modulação de imunidade celular. Autor de mais de 40 estudos sobre estabilização metabólica em ambientes patogênicos.',
    classified: {
      status: 'SOB VIGILÂNCIA // INVESTIGAÇÃO DE MOTIM',
      internalId: 'EMP-0112',
      lastKnownLocation: 'Van capotada da HÉLICE (Route 68, Harmony)',
      interceptedNote: '"O perfil biológico do 071 é singular demais para ser tratado como mero espécime de descarte. Voss quer desacelerar as pesquisas por medo ético, mas precisamos do Estabilizador pronto antes que a Sentinela assuma o laboratório."',
      investigationClue: 'Kane transportava frascos do Estabilizador da HÉLICE em uma van de pesquisa na Route 68 antes de sofrer uma emboscada pela Sentinela.'
    }
  },
  {
    id: 'briggs',
    name: 'General Hector Briggs',
    title: 'Diretor de Operações de Segurança & Biossegurança',
    department: 'Divisão Tática Sentinela (DEF-SEC)',
    clearance: 'COMANDO SENTINELA',
    image: '/images/team/briggs.jpg',
    publicBio: 'Oficial superior condecorado, especialista em contenção de ameaças biológicas de nível 4, gestão de zonas de exclusão e custódia de instalações estratégicas.',
    classified: {
      status: 'EM OPERAÇÃO DE CAMPO // DIRETIVA ORDEM NEGRA',
      internalId: 'SENT-CMD-01',
      lastKnownLocation: 'Checkpoint Sentinela (Route 68 perto de Fort Zancudo)',
      interceptedNote: '"Ordem Negra confirmada: Eliminar todos os espécimes classificados como Adaptados e Alfas. Isolar a Penitenciária de Bolingbroke. Se o Comboio 17 for comprometido, explodam as pontes."',
      investigationClue: 'Rádios de campanha e registros de ordens de tiro da Sentinela podem ser inspecionados nas guaritas militares da ponte de Zancudo e da Humane Labs.'
    }
  },
  {
    id: 'vance',
    name: 'Marcus Vance',
    title: 'Vice-Presidente de Logística Global & Cadeia de Frio',
    department: 'Operações Ferroviárias & Cadeia de Custódia',
    clearance: 'CREDENCIAL BETA-4',
    image: '/images/team/vance.jpg',
    publicBio: 'Responsável pelo gerenciamento de transporte especializado de compostos biológicos sensíveis e maquinário de contenção em malha ferroviária e comboios terrestres.',
    classified: {
      status: 'EVADIDO // ESCONDERIJO DE CARGA',
      internalId: 'LOG-VANCE-77',
      lastKnownLocation: 'Pátio Ferroviário do Grand Senora / Vagão Miller',
      interceptedNote: '"O Comboio 17 caiu na ponte do Zancudo! Eles sabiam a nossa rota. Escondi as últimas 3 caixas de suprimentos no hangar de McKenzie e tranquei o vagão da ferrovia."',
      investigationClue: 'Investigue o pátio de manobras de trem no deserto de Grand Senora e o vagão escondido do Miller para recuperar os manifestos de carga do Comboio 17.'
    }
  },
  {
    id: 'lin',
    name: 'Dr. Maya Lin',
    title: 'Diretora de Tecnologia (CTO) & Arquiteta da Rede ZETA Link',
    department: 'Sistemas Quânticos & Infraestrutura de Dados',
    clearance: 'CREDENCIAL ALFA-2',
    image: '/images/team/lin.jpg',
    publicBio: 'Cientista da computação e engenheira de telecomunicações quânticas. Desenvolvedora do protocolo de malha ZETA Link que mantém comunicações operacionais em cenários de colapso.',
    classified: {
      status: 'SISTEMAS OPERACIONAIS EM MALHA',
      internalId: 'TECH-LIN-09',
      lastKnownLocation: 'Data Center da Arcadius & Terminal Central de Sandy Shores',
      interceptedNote: '"Mesmo que a rede elétrica caia na Chuva Negra, os modems físicos ZETA Link continuarão sincronizados. O terminal público da Trade é o coração da nossa transmissão de contingência."',
      investigationClue: 'Os modems ZETA Link com LEDs piscando nos computadores transmitem relatórios criptografados e permitem sincronizar arquivos USB com o ZETA OS.'
    }
  }
];

export const Team: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section id="team" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative gradient lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-4">
            <Fingerprint className="w-3.5 h-3.5" />
            Liderança & Corpo Científico
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Mentes que Moldam o <span className="text-cyan-400">Futuro Biológico</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Conheça o conselho executivo e os pesquisadores pioneiros à frente do Projeto ZETA, dos avanços na regeneração de tecidos e da arquitetura de biossegurança global.
          </p>
          <div className="mt-2 text-xs font-mono text-cyan-500/80">
            [Dica Investigativa: Clique em &quot;Dossiê de Segurança&quot; para inspecionar os registros internos]
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MEMBERS.map((member) => (
            <div
              key={member.id}
              className="zeta-glass rounded-2xl overflow-hidden border border-cyan-500/20 zeta-glass-hover flex flex-col group transition-all duration-300"
            >
              {/* Image Container with Badges */}
              <div className="relative h-80 w-full overflow-hidden bg-slate-900">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Clearance Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 font-mono text-[10px] text-cyan-300 font-bold uppercase tracking-wider">
                    {member.clearance}
                  </span>
                </div>

                {/* Internal ID Tag */}
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-0.5 rounded bg-slate-950/80 font-mono text-[10px] text-slate-400 border border-slate-700">
                    {member.classified.internalId}
                  </span>
                </div>

                {/* Name & Department on bottom of image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white tracking-wide">{member.name}</h3>
                  <p className="text-xs font-mono text-cyan-400 font-semibold">{member.title}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                    {member.department}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
                    {member.publicBio}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">
                    ID: {member.classified.internalId}
                  </span>
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium transition-all hover:border-cyan-300"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Dossiê de Segurança</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Classified Modal Dossier */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-950 border-2 border-red-500/60 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-[0_0_50px_rgba(220,38,38,0.25)] font-mono">
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Dossier Header */}
            <div className="flex items-center gap-3 border-b border-red-900/60 pb-4 mb-6">
              <ShieldAlert className="w-6 h-6 text-red-500 animate-pulse" />
              <div>
                <div className="text-red-400 text-xs font-bold tracking-widest uppercase">
                  [DOSSIÊ CONFIDENCIAL // DIRETIVA DE INVESTIGAÇÃO ZETA-SEC]
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide">
                  {selectedMember.name} <span className="text-xs text-slate-400">({selectedMember.classified.internalId})</span>
                </h3>
              </div>
            </div>

            {/* Status & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg">
                <span className="text-slate-400 block mb-1">STATUS DE OPERAÇÃO:</span>
                <span className="text-red-400 font-bold">{selectedMember.classified.status}</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg">
                <span className="text-slate-400 block mb-1">ÚLTIMO REGISTRO / LOCAL:</span>
                <span className="text-cyan-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {selectedMember.classified.lastKnownLocation}
                </span>
              </div>
            </div>

            {/* Intercepted Memo */}
            <div className="mb-6">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold mb-2">
                <FileText className="w-4 h-4" />
                <span>INTERCEPTAÇÃO DE COMUNICAÇÃO INTERNA:</span>
              </div>
              <blockquote className="bg-red-950/20 border-l-4 border-red-600 p-4 rounded text-xs text-slate-200 italic leading-relaxed">
                {selectedMember.classified.interceptedNote}
              </blockquote>
            </div>

            {/* In-game Investigation Clue */}
            <div className="bg-cyan-950/30 border border-cyan-500/30 p-4 rounded-lg text-xs mb-6">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold mb-1.5">
                <Radio className="w-4 h-4" />
                <span>PISTA INVESTIGATIVA PARA SOBREVIVENTES (IN-GAME):</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">
                {selectedMember.classified.investigationClue}
              </p>
              {selectedMember.classified.audioFrequency && (
                <div className="mt-2 text-cyan-300 font-mono text-[11px] font-bold">
                  SINAL DE RÁDIO: {selectedMember.classified.audioFrequency}
                </div>
              )}
            </div>

            {/* Footer Notice */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-[11px] text-slate-500">
              <span>ZETA CORP ARCHIVE #071</span>
              <span>PRESSIONE ESC OU FECHAR</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
