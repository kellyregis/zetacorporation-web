'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Shield, Send, Lock, Key, AlertCircle, CheckCircle2 } from 'lucide-react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'cli'>('login');
  
  // Login / Resend State
  const [email, setEmail] = useState('');
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [isResetMode, setIsResetMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string; clue?: string } | null>(null);

  // CLI State
  const [cliInput, setCliInput] = useState('');
  const [cliLogs, setCliLogs] = useState<Array<{ type: 'in' | 'out' | 'err'; text: string }>>([
    { type: 'out', text: 'ZETA CORPORATION QUANTUM MAINFRAME // OS v4.19.0' },
    { type: 'out', text: 'CONEXÃO ESTABELECIDA VIA NODO: SANDY_SHORES_RELAY_01 (104.7 MHz)' },
    { type: 'out', text: 'Digite "help" para visualizar os comandos de contingência autorizados.' }
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === 'cli') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [cliLogs, activeTab]);

  if (!isOpen) return null;

  // Envio de email real via Resend
  const handleSendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          employeeId: empId || 'EMP-RECOVER',
          mode: 'reset_password'
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setFeedback({
          type: 'success',
          text: data.message || 'Despacho de segurança enviado com sucesso. Verifique seu e-mail!',
          clue: data.clue
        });
      } else {
        setFeedback({
          type: 'error',
          text: data.error || 'Falha ao solicitar credencial.',
        });
      }
    } catch (err: any) {
      setFeedback({
        type: 'error',
        text: 'Erro de comunicação com o servidor de envio.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Processamento de comandos do CLI Hacker
  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...cliLogs, { type: 'in' as const, text: `zeta-guest@terminal:~$ ${cliInput}` }];

    switch (cmd) {
      case 'help':
      case 'ajuda':
        newLogs.push(
          { type: 'out', text: 'COMANDOS DISPONÍVEIS:' },
          { type: 'out', text: '  status       - Relatório de integridade das instalações em San Andreas' },
          { type: 'out', text: '  whoami       - Informações da sessão e nível de acesso' },
          { type: 'out', text: '  071          - Telemetria confidencial do Paciente 071' },
          { type: 'out', text: '  voss         - Último diário científico criptografado do Dr. Elias Voss' },
          { type: 'out', text: '  comboio17    - Manifesto do transporte tático da Sentinela' },
          { type: 'out', text: '  modem        - Frequência e parâmetros de rede ZETA Link' },
          { type: 'out', text: '  limpar       - Limpa o terminal' },
          { type: 'out', text: '  sair         - Encerra a conexão segura' }
        );
        break;

      case 'status':
        newLogs.push(
          { type: 'out', text: '--- RELATÓRIO DE STATUS OPERACIONAL ---' },
          { type: 'out', text: '[OK] NODO CENTRAL ARCADIUS: Operacional (Fibra Óptica)' },
          { type: 'err', text: '[BLOQUEADO] HUMANE LABS BSL-4: Quarentena total ativa' },
          { type: 'err', text: '[COMPROMETIDO] COMBOIO 17: Carga extraviada na ponte do Zancudo' },
          { type: 'out', text: '[ATIVO] TERMINAL TRADE HUB: Conexão física permanente via modem' },
          { type: 'out', text: '[RESTRITO] COMPLEXO ZETA-04: Contenção de nível 5 em curso' }
        );
        break;

      case 'whoami':
        newLogs.push(
          { type: 'out', text: 'Usuário: INVESTIGADOR_CONVIDADO_ANONIMO' },
          { type: 'out', text: 'Permissões: LEITURA_APENAS (NÍVEL 1)' },
          { type: 'err', text: 'ALERTA: Tentativas de invasão serão rastreadas pela Divisão Sentinela.' }
        );
        break;

      case '071':
      case 'paciente':
      case 'cat patient_071.log':
        newLogs.push(
          { type: 'err', text: '[ARQUIVO CLASSIFICADO // GRAU DE SIGILO: MÁXIMO]' },
          { type: 'out', text: 'ID: PACIENTE-071 (Origem: Não infectado / Mutação genética congênita)' },
          { type: 'out', text: 'Status: Regeneração tecidual 100% autônoma identificada em biópsia.' },
          { type: 'out', text: 'Registro Voss #0419: "O Paciente 071 não é o resultado do projeto. Ele é a razão pela qual o projeto existiu."' },
          { type: 'out', text: 'Pai biológico identificado: Dr. Adrian Kane (pesquisador da HÉLICE).' }
        );
        break;

      case 'voss':
      case 'cat voss_memo.txt':
        newLogs.push(
          { type: 'out', text: 'DR. ELIAS VOSS // ÚLTIMA TRANSMISSÃO PESSOAL (GRAVADA):' },
          { type: 'out', text: '"Se alguém estiver ouvindo este canal na frequência 104.7... não acreditem na Sentinela.' },
          { type: 'out', text: 'Eles não querem conter o Z-13. Eles querem a patente perpétua da regeneração.' },
          { type: 'out', text: 'Deixei o diário completo no meu barco em Galilee e na cabana de Paleto. Procurem o rádio da Doris."' }
        );
        break;

      case 'comboio17':
      case 'comboio':
        newLogs.push(
          { type: 'out', text: 'MANIFESTO DE CARGA #COMBOIO-17-SENTINELA:' },
          { type: 'out', text: 'Origem: Fort Zancudo -> Destino: Terminal Subterrâneo ZETA-04' },
          { type: 'err', text: 'Status: AMBOS OS CAMINHÕES ABALROADOS NA PONTE DO RIO ZANCUDO.' },
          { type: 'out', text: 'Caixas de suprimentos remanescentes ocultas no Hangar de McKenzie (Grapeseed).' }
        );
        break;

      case 'modem':
        newLogs.push(
          { type: 'out', text: 'PARÂMETROS DA MALHA ZETA LINK:' },
          { type: 'out', text: 'Hardware: prop_cs_server_drive (Modem Físico com LEDs de pulso)' },
          { type: 'out', text: 'Função In-Game: Permite colocar qualquer computador de San Andreas online.' },
          { type: 'out', text: 'Observação: O modem do Terminal Público da Trade é fixo e protegido contra roubo.' }
        );
        break;

      case 'clear':
      case 'limpar':
        setCliLogs([]);
        setCliInput('');
        return;

      case 'exit':
      case 'sair':
        onClose();
        return;

      default:
        newLogs.push({
          type: 'err',
          text: `Comando desconhecido: "${cmd}". Digite "help" para ver os comandos válidos.`
        });
        break;
    }

    setCliLogs(newLogs);
    setCliInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#06090e] border border-cyan-500/40 rounded-2xl max-w-3xl w-full overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.25)] flex flex-col max-h-[85vh]">
        {/* Terminal Title Bar */}
        <div className="bg-slate-950 px-6 py-4 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-cyan-400" />
              <span>ZETA-SEC GATEWAY // TERMINAL DE CONTINGÊNCIA</span>
            </div>
          </div>

          {/* Tab selector */}
          <div className="flex gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setActiveTab('login')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'login' ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              Autenticação & Resend
            </button>
            <button
              onClick={() => setActiveTab('cli')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'cli' ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              Terminal Hacker (CLI)
            </button>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 font-mono">
          {activeTab === 'login' ? (
            <div className="max-w-md mx-auto py-4">
              <div className="text-center mb-6">
                <div className="inline-flex p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 mb-3 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide">
                  {isResetMode ? 'Recuperação de Credencial ZETA-SEC' : 'Acesso ao Portal Corporativo'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {isResetMode
                    ? 'Insira seu e-mail real para despachar uma chave de contingência via Resend.'
                    : 'Apenas colaboradores com credencial nível 2 ou superior.'}
                </p>
              </div>

              {feedback && (
                <div
                  className={`p-3.5 rounded-lg text-xs mb-5 flex items-start gap-2.5 border ${
                    feedback.type === 'success'
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : 'bg-red-950/40 border-red-500/40 text-red-300'
                  }`}
                >
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  )}
                  <div>
                    <div>{feedback.text}</div>
                    {feedback.clue && (
                      <div className="mt-1 font-bold text-cyan-300">
                        Pista: <code>{feedback.clue}</code>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSendResetEmail} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    ID Corporativo (ex: EMP-0419 ou seu ID):
                  </label>
                  <input
                    type="text"
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value)}
                    placeholder="EMP-0419"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    E-mail Corporativo / Pessoal (Para receber o código real):
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@exemplo.com"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {!isResetMode && (
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Chave de Acesso Quântica:
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Transmitindo via Resend...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{isResetMode ? 'Enviar Despacho via Resend' : 'Solicitar Chave de Contingência'}</span>
                    </>
                  )}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setIsResetMode(!isResetMode)}
                    className="text-xs text-cyan-400 hover:underline text-center"
                  >
                    {isResetMode
                      ? 'Voltar para autenticação padrão'
                      : 'Esqueceu a credencial? Solicitar redefinição por e-mail (Resend)'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex flex-col h-[500px]">
              {/* CLI Terminal Output */}
              <div className="flex-1 overflow-y-auto space-y-2 text-xs font-mono pr-2">
                {cliLogs.map((log, index) => (
                  <div
                    key={index}
                    className={`${
                      log.type === 'in'
                        ? 'text-cyan-300 font-bold'
                        : log.type === 'err'
                        ? 'text-red-400 font-semibold'
                        : 'text-slate-300'
                    }`}
                  >
                    {log.text}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* CLI Input Line */}
              <form onSubmit={handleCliSubmit} className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
                <span className="text-cyan-400 font-mono text-xs font-bold shrink-0">
                  zeta-guest@terminal:~$
                </span>
                <input
                  type="text"
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  placeholder="digite um comando (ex: help, status, 071, voss)"
                  className="flex-1 bg-transparent border-none text-white text-xs font-mono focus:outline-none placeholder-slate-600"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-cyan-950 border border-cyan-500/40 rounded text-cyan-300 text-xs hover:bg-cyan-900"
                >
                  Executar
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Terminal Status Footer */}
        <div className="bg-slate-950 px-6 py-2.5 border-t border-slate-900 text-[10px] font-mono text-slate-500 flex items-center justify-between">
          <span>PORTAL ZETA-SEC // CRIPTOGRAFIA QUÂNTICA 4096-BIT</span>
          <span className="text-cyan-500">GATEWAY RESEND OPERACIONAL</span>
        </div>
      </div>
    </div>
  );
};
