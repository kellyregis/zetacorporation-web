'use client';

import React from 'react';
import { ZetaLogo } from './ZetaLogo';
import { ShieldCheck, Mail, Globe, Lock, Cpu } from 'lucide-react';

interface FooterProps {
  onOpenTerminal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal }) => {
  return (
    <footer className="bg-slate-950 border-t border-cyan-500/20 text-slate-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <ZetaLogo size={36} />
            <p className="mt-4 text-slate-400 text-xs leading-relaxed max-w-sm">
              A ZETA Corporation é uma corporação multinacional de biotecnologia, engenharia celular regenerativa e sistemas de telecomunicações quânticas autônomas.
            </p>
            <div className="mt-6 flex items-center gap-3 text-cyan-400 font-mono text-[11px]">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>INSTALAÇÃO CERTIFICADA BSL-4 // PROTOCOLO DO CONDADO DE BLAINE</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h5 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-4">
              Divisões
            </h5>
            <ul className="space-y-2.5">
              <li>
                <a href="#research" className="hover:text-cyan-400 transition-colors">
                  Regeneração CRT-13
                </a>
              </li>
              <li>
                <a href="#research" className="hover:text-cyan-400 transition-colors">
                  Rede Mesh ZETA LINK
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-cyan-400 transition-colors">
                  Instalações BSL-4
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-cyan-400 transition-colors">
                  Complexo ZETA-04
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h5 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-4">
              Institucional
            </h5>
            <ul className="space-y-2.5">
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">
                  Sobre a Corporação
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-cyan-400 transition-colors">
                  Conselho Executivo
                </a>
              </li>
              <li>
                <a href="#press" className="hover:text-cyan-400 transition-colors">
                  Relações com a Imprensa
                </a>
              </li>
              <li>
                <a href="#press" className="hover:text-cyan-400 transition-colors">
                  Relatório de Quarentena
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h5 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-4">
              Segurança & Acesso
            </h5>
            <ul className="space-y-2.5 font-mono text-[11px]">
              <li>
                <button
                  onClick={onOpenTerminal}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Portal ZETA-SEC</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerminal}
                  className="hover:text-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Canal Seguro de Comunicação</span>
                </button>
              </li>
              <li>
                <span className="text-slate-500">Nodo: Sandy Shores Hub</span>
              </li>
              <li>
                <span className="text-slate-500">Frequência: 104.7 MHz</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Hidden Base64 Clue */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
          <div>
            &copy; 2016-2026 ZETA Corporation. Todos os direitos reservados. Patentes registradas sob protocolo Z-13 (2016).
          </div>

          <div className="flex items-center gap-4">
            <span>DOMÍNIO OFICIAL: zetacorporation.com.br</span>
            {/* Base64 Encoded Secret for Hackers */}
            <span
              className="text-[9px] text-slate-700 hover:text-cyan-400 transition-colors cursor-pointer select-all"
              title="Base64 encoded string"
            >
              WkVUQS0wNC1CSU9IQVpBUkQtMDcx
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
