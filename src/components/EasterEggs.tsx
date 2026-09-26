'use client';

import React, { useEffect, useState } from 'react';
import { AlertOctagon, Radio, ShieldAlert } from 'lucide-react';

export const EasterEggs: React.FC = () => {
  const [breachAlert, setBreachAlert] = useState(false);
  const [typedBuffer, setTypedBuffer] = useState('');

  useEffect(() => {
    // 1. Mensagem diegética no Console do Navegador (F12)
    console.log(
      '%c' +
        ' ███████╗███████╗████████╗ █████╗     ██████╗ ██████╗ ██████╗ ██████╗ \n' +
        ' ╚══███╔╝██╔════╝╚══██╔══╝██╔══██╗   ██╔════╝██╔═══██╗██╔══██╗██╔══██╗\n' +
        '   ███╔╝ █████╗     ██║   ███████║   ██║     ██║   ██║██████╔╝██████╔╝\n' +
        '  ███╔╝  ██╔══╝     ██║   ██╔══██║   ██║     ██║   ██║██╔══██╗██╔═══╝ \n' +
        ' ███████╗███████╗   ██║   ██║  ██║██╗╚██████╗╚██████╔╝██║  ██║██║     \n' +
        ' ╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     ',
      'color: #0ea5e9; font-weight: bold;'
    );

    console.log(
      '%c[ZETA-SEC MAINFRAME // VIGILÂNCIA ATIVA]\n' +
        'Acesso não autorizado detectado na camada de inspeção de script.\n\n' +
        'PISTAS CLASSIFICADAS PARA INVESTIGADORES:\n' +
        '• Tente digitar window.zetaAccess("voss") ou window.zetaAccess("071") aqui no console.\n' +
        '• Digite o código "071" no teclado a qualquer momento no site.\n' +
        '• Investigue os comentários ocultos no código HTML do rodapé e no arquivo /robots.txt.',
      'color: #38bdf8; font-family: monospace; font-size: 12px;'
    );

    // 2. Funções acessíveis pelo DevTools
    (window as any).zetaAccess = (key: string) => {
      const k = String(key || '').toLowerCase();
      if (k === '071' || k === 'patient' || k === 'patient071') {
        console.warn(
          '%c[DOSSIÊ PACIENTE 071]: Sujeito sob protocolo de isolamento BSL-4. Apresenta padrão celular anômalo sem correspondência clínica. Status: Ativo. Paradeiro: INDEFINIDO. Registro Voss #0419: "Quem é esse rapaz? Como o tecido dele se recompõe sem necrose celular? O que realmente estamos enfrentando aqui?"',
          'color: #f87171; font-weight: bold; font-size: 13px;'
        );
        return 'DESBLOQUEADO: Arquivo 071 registrado na memória.';
      } else if (k === 'voss') {
        console.warn(
          '%c[DIÁRIO DO DR. VOSS]: "O barco no píer de Galilee ainda possui a frequência do rádio intacta (104.7 MHz). O Yellow Jack é o ponto de contato inicial."',
          'color: #fbbf24; font-weight: bold; font-size: 13px;'
        );
        return 'DESBLOQUEADO: Coordenadas do Dr. Voss obtidas.';
      } else if (k === 'comboio' || k === 'comboio17') {
        console.warn(
          '%c[COMBOIO 17]: Caminhão tombado na ponte do Zancudo. Três caixas de suprimentos foram remanejadas para McKenzie Field.',
          'color: #38bdf8; font-weight: bold; font-size: 13px;'
        );
        return 'DESBLOQUEADO: Rota do comboio revelada.';
      }
      return 'Chave desconhecida. Tente: "071", "voss", "comboio".';
    };

    // 3. Listener do Teclado para sequência "071"
    const handleKeyDown = (e: KeyboardEvent) => {
      setTypedBuffer((prev) => {
        const next = (prev + e.key).slice(-10);
        if (next.includes('071')) {
          triggerBreachSiren();
          return '';
        }
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const triggerBreachSiren = () => {
    setBreachAlert(true);

    // Síntese de áudio Web Audio API (som de alarme sutil)
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      }
    } catch (err) {
      // Ignora falhas de áudio
    }

    setTimeout(() => {
      setBreachAlert(false);
    }, 5000);
  };

  return (
    <>
      {/* Hidden DOM Comments / Hacker Easter Eggs */}
      <div className="hidden" aria-hidden="true">
        {/* ARG CLUE #1: VOSS GALILEE PIER COORDS: vec3(1320.0, 4220.0, 31.0) */}
        {/* ARG CLUE #2: PATIENT 071 REASON: 'He is not the result. He is the reason the project existed.' */}
        {/* ARG CLUE #3: COMBOIO 17 CRASH AT ROUTE 68 BRIDGE: vec3(-1530.0, 2100.0, 55.0) */}
        {/* ARG CLUE #4: ZETA LINK TRADE TERMINAL: vec3(2340.118, 3125.723, 48.202) */}
      </div>

      {/* Screen Glitch / Siren Overlay when "071" is typed */}
      {breachAlert && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-red-950/40 backdrop-blur-sm animate-pulse">
          <div className="bg-black/90 border-2 border-red-500 text-red-200 p-8 rounded-2xl max-w-lg mx-4 text-center font-mono shadow-[0_0_80px_rgba(239,68,68,0.7)] pointer-events-auto">
            <AlertOctagon className="w-16 h-16 text-red-500 mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-black tracking-widest text-red-400 uppercase">
              QUEBRA DE CONTENÇÃO DETECTADA // PROTOCOLO 071
            </h3>
            <p className="text-xs text-red-300 mt-2 leading-relaxed">
              Tentativa de consulta à telemetria congênita do Paciente 071 interceptada pela Sentinela.
            </p>
            <div className="mt-4 p-3 bg-red-950/80 rounded border border-red-800 text-[11px] text-left">
              <div><strong>LOCALIZAÇÃO DE EXTRAÇÃO:</strong> Píer de Barcos de Galilee (Alamo Sea)</div>
              <div><strong>CONTATO SEGURO:</strong> Frequência 104.7 MHz / Rádio da Doris</div>
              <div><strong>ARQUIVO CHAVE:</strong> C-004 (Pendrive de contingência)</div>
            </div>
            <button
              onClick={() => setBreachAlert(false)}
              className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-bold text-xs uppercase tracking-wider"
            >
              Silenciar Alarme
            </button>
          </div>
        </div>
      )}
    </>
  );
};
