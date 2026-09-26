'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal as TerminalIcon,
  X,
  Shield,
  Send,
  Lock,
  Key,
  AlertCircle,
  CheckCircle2,
  Mail,
  ArrowLeft,
  LogOut,
  FileText,
  Inbox,
  Archive,
  Trash2,
  Eye,
  EyeOff,
  Paperclip,
  ChevronRight,
  UserCheck,
  Building2,
  AlertTriangle
} from 'lucide-react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VossEmail {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  date: string;
  category: 'DIRETORIA' | 'NEURO' | 'MILITAR' | 'HÉLICE' | 'RASCUNHO';
  preview: string;
  body: string[];
  unread: boolean;
  attachment?: {
    name: string;
    size: string;
    type: string;
  };
}

const VOSS_EMAILS: VossEmail[] = [
  {
    id: 'em-001',
    senderName: 'Eleanor Sterling',
    senderEmail: 'e.sterling@corp.zetacorporation.com.br',
    subject: '[URGENTE] Cumprimento do Cronograma CRT-13 // Comitê Executivo',
    date: '12 Outubro 2016, 18:42',
    category: 'DIRETORIA',
    unread: false,
    preview: 'Dr. Voss, tomei conhecimento das suas ressalvas sobre mais 90 dias de ensaios BSL-4. O conselho de acionistas não tolerará mais adiamentos...',
    body: [
      'Dr. Elias Voss,',
      'Tomei conhecimento formal das suas ressalvas enviadas na manhã de ontem sobre a necessidade de mais 90 dias de ensaios de biossegurança BSL-4 no complexo de Humane Labs antes da primeira remessa comercial.',
      'Serei absolutamente direta: o conselho de acionistas e os parceiros institucionais não aceitarão outro adiamento. O anúncio público do CRT-13 já foi precificado pelo mercado internacional. O General Briggs já mobilizou duas companhias da Divisão Sentinela para garantir o perímetro de Palmer-Taylor e a segurança do transporte.',
      'Seus escrúpulos com a taxa de reatividade celular e danos cognitivos em voluntários de Bolingbroke não podem sobrepujar o valor estratégico e financeiro desta patente.',
      'Assine o documento de autorização de transferência do lote primário até esta sexta-feira, improrrogavelmente às 18:00.',
      '— Eleanor Sterling, Chief Executive Officer (CEO)'
    ],
    attachment: {
      name: 'AUTORIZACAO_COMERCIAL_CRT13_REV4.PDF',
      size: '2.4 MB',
      type: 'Diretoria Executiva'
    }
  },
  {
    id: 'em-002',
    senderName: 'Dra. Maya Lin Reis',
    senderEmail: 'm.reis@neuro.zetacorporation.com.br',
    subject: 'Anomalias na Regressão Celular — Pacientes do Bloco B',
    date: '18 Outubro 2016, 09:15',
    category: 'NEURO',
    unread: false,
    preview: 'Elias, conclui o mapeamento sináptico dos quatro voluntários que receberam a dose Z-13. A regeneração física é impecável, mas...',
    body: [
      'Elias,',
      'Preciso que você desça pessoalmente ao subsolo do Bloco B assim que receber esta mensagem.',
      'Concluímos o mapeamento sináptico minucioso dos quatro voluntários que receberam a dose da variante Z-13 na última quarta-feira. A regeneração física das lacerações é impecável — quase milagrosa, exatamente como os telômeros do rapaz prometiam nos modelos teóricos.',
      'Porém, após 40 minutos do início da reativação motora, os eletroencefalogramas apontam colapso quase total do córtex pré-frontal. Os indivíduos perdem a cognição, a fala, o reconhecimento familiar e entram em um estado catatônico de voracidade e agressão cega e implacável.',
      'Eles não estão curados, Elias. O tecido celular está metabolicamente vivo e hiper-resistente, mas a consciência humana se esvaiu por completo.',
      'Por favor, não assine a liberação que a Eleanor está exigindo. Se esse vetor vazar para além das câmaras de contenção negativa, nós seremos os responsáveis pelo colapso de toda a civilização.',
      '— Dra. Maya Lin Reis, Diretora da Divisão de Neuroengenharia'
    ],
    attachment: {
      name: 'EEG_TELEMETRIA_BLOCO_B_MUTACAO.RAW',
      size: '18.7 MB',
      type: 'Telemetria Neural'
    }
  },
  {
    id: 'em-003',
    senderName: 'Gen. Hector Briggs',
    senderEmail: 'h.briggs@security.zetacorporation.com.br',
    subject: 'Protocolo de Escolta Comboio 17 // Autorização Nível 5',
    date: '24 Outubro 2016, 23:04',
    category: 'MILITAR',
    unread: true,
    preview: 'Doutor Voss, a operação de transporte do espécime sob sua custódia (Paciente 071) foi confirmada. Dois blindados Insurgent da Sentinela farão a escolta...',
    body: [
      'Doutor Voss,',
      'Para seu conhecimento e alinhamento operacional imediato:',
      'A operação tática de extração e transporte do espécime sob sua custódia médica (Paciente 071) foi ratificada pelo Comando Sentinela para o próximo dia 28/10, às 04:00 da madrugada.',
      'Dois veículos blindados pesados Insurgent da Sentinela farão a escolta armada da unidade móvel de contenção criogênica, partindo da instalação correcional em direção ao Terminal Subterrâneo ZETA-04. Nossas diretrizes da CEO Sterling são terminantes: zero paradas, rota alternativa pela ponte secundária do Rio Zancudo para desviar dos postos rodoviários federais.',
      'Seus pesquisadores civis não devem tentar interferir no embarque das caixas térmicas contendo as matrizes de DNA puro. Qualquer retenção de dados ou tentativa de cópia em mídias físicas não autorizadas será tratada sumariamente sob a Diretiva Militar de Traição Corporativa.',
      '— General Hector Briggs, Comandante-Geral das Forças Sentinela'
    ],
    attachment: {
      name: 'ORDEM_MARCHA_COMBOIO_17_SIGILOSA.PDF',
      size: '1.1 MB',
      type: 'Diretiva Militar'
    }
  },
  {
    id: 'em-004',
    senderName: 'Dr. Adrian Kane',
    senderEmail: 'a.kane@helice.zetacorporation.com.br',
    subject: 'RE: Amostras Biológicas do Sujeito 071 // Limites de Tolerância',
    date: '29 Outubro 2016, 14:30',
    category: 'HÉLICE',
    unread: false,
    preview: 'Elias, pare de agir como um médico de interior provinciano. Você sabe muito bem o que aquele rapaz representa. A carne é descartável...',
    body: [
      'Elias,',
      'Li com profundo desprezo seu relatório inflamado sobre "limites éticos de biopsia e drenagem medular contínua" no Sujeito 071. Pare de agir como um médico de interior provinciano e comece a pensar como o cientista que Oxford formou.',
      'Você sabe muito bem o que aquele rapaz representa. Ele nasceu com a anomalia celular que a humanidade buscou inutilmente por milênios. Cada gota de plasma e medula que retiramos daquele corpo nos aproxima da fórmula sintética definitiva.',
      'E mesmo se a estrutura biológica dele colapsar pela exaustão das biópsias sucessivas, o Projeto Hélice já está finalizando os nós de transmissão quântica da rede ZETA LINK para o mapeamento neural completo da consciência.',
      'A carne é frágil, corruptível e descartável, Elias. O que realmente importa é o padrão quântico da matriz genética.',
      'Entregue os resultados da cultura de tecidos ainda hoje e pare de esconder arquivos laboratoriais em pendrives pessoais. Eu já tenho conhecimento das suas saídas não registradas para o ancoradouro de Galilee.',
      '— Dr. Adrian Kane, Diretor do Projeto Hélice & Transcrita Neural'
    ],
    attachment: {
      name: 'PROJETO_HELICE_MAPA_NEURAL_SINTETICO.SPEC',
      size: '8.9 MB',
      type: 'Especificação Hélice'
    }
  },
  {
    id: 'em-005',
    senderName: 'Dr. Elias Voss [RASCUNHO NÃO TRANSMITIDO]',
    senderEmail: 'e.voss@mail.zetacorporation.com.br',
    subject: 'CARTA DE RENÚNCIA & DENÚNCIA FORMAL DE BIOSSEGURANÇA',
    date: '02 Novembro 2016, 03:40',
    category: 'RASCUNHO',
    unread: false,
    preview: 'Ao Comitê Executivo e à Dra. Eleanor Sterling: Por meio desta, renuncio formalmente ao cargo de CMO. O que nós criamos não é a cura...',
    body: [
      'Ao Conselho Executivo da ZETA Corporation e à Dra. Eleanor Sterling:',
      'Por meio desta comunicação, renuncio formalmente e em caráter irrevogável ao cargo de Chief Medical Officer (CMO) da ZETA Corporation.',
      'O que nós concebemos e multiplicamos nos laboratórios subterrâneos de Palmer-Taylor e Humane Labs não é a cura para a finitude ou senescência humana. É uma praga celular de regeneração aberrante e degenerativa que condena os infectados a um pesadelo biológico irreversível. E o mais ultrajante: nós tínhamos todos os dados nos ensaios do Bloco B e mesmo assim vocês escolheram transformar isso em um vetor comercial lucrativo.',
      'Vocês não colocarão as mãos nas matrizes primárias de DNA do Paciente 071. Eu extraí pessoalmente as ampolas do cofre criogênico principal e repliquei todos os dados brutos e gravações na série física de pendrives Z-DATA.',
      'Estou partindo esta noite para o meu refúgio no barco ancorado no píer de Galilee. Se os esquadrões da Sentinela de Briggs tentarem me interceptar, todo o acervo será ativado e distribuído aos sobreviventes e investigadores.',
      'Que Deus tenha piedade do que vocês estão prestes a precipitar sobre San Andreas.',
      '— Dr. Elias Benjamin Voss',
      '------------------------------------------------------------',
      '[REGISTRO LOCAL DE SEGURANÇA]: Terminal desconectado da malha principal.',
      'Chave de contingência corporativa anotada à mão no bloco de notas da bancada do barco em Galilee: GALILEE-Z13'
    ],
    attachment: {
      name: 'MATRIZ_BRUTA_PACIENTE_071_MANIFESTO.DAT',
      size: '42.1 MB',
      type: 'Arquivo Classificado'
    }
  }
];

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'portal' | 'cli'>('portal');

  // Sub-views dentro do Portal Corporativo:
  // 'login'       -> Tela de Login Corporativo padrão (com ID + Senha + Botão Autenticar)
  // 'contingency' -> Tela de Solicitação de Chave de Contingência (E-mail real)
  // 'webmail'     -> Webmail Interno autenticado do Dr. Elias Voss
  const [portalSubView, setPortalSubView] = useState<'login' | 'contingency' | 'webmail'>('login');

  // Form de Login
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginFeedback, setLoginFeedback] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  // Form de Despacho de Contingência
  const [contingencyEmail, setContingencyEmail] = useState('');
  const [contingencyId, setContingencyId] = useState('');
  const [contingencyLoading, setContingencyLoading] = useState(false);
  const [contingencyFeedback, setContingencyFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
    clue?: string;
  } | null>(null);

  // Webmail state
  const [selectedEmail, setSelectedEmail] = useState<VossEmail>(VOSS_EMAILS[0]);
  const [activeFolder, setActiveFolder] = useState<'inbox' | 'drafts' | 'sent' | 'trash'>('inbox');

  // CLI State
  const [cliInput, setCliInput] = useState('');
  const [cliLogs, setCliLogs] = useState<Array<{ type: 'in' | 'out' | 'err'; text: string }>>([
    { type: 'out', text: 'ZETA CORPORATION QUANTUM MAINFRAME // OS v4.19.0' },
    { type: 'out', text: 'CONEXÃO ESTABELECIDA VIA NODO: SANDY_SHORES_RELAY_01 (104.7 MHz)' },
    { type: 'out', text: 'Digite "help" para ver comandos autorizados ou "nova" para falar com a IA.' }
  ]);

  // Estados para modo de conversação neural com a IA N.O.V.A.
  const [isNovaMode, setIsNovaMode] = useState(false);
  const [novaHistory, setNovaHistory] = useState<Array<{ role: 'user' | 'model'; text: string }>>([]);
  const [novaLoading, setNovaLoading] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === 'cli') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [cliLogs, activeTab]);

  if (!isOpen) return null;

  // Lógica de Autenticação do Login Corporativo
  const handleCorporateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginFeedback(null);

    const cleanId = loginId.trim().toLowerCase();
    const cleanPass = loginPassword.trim().toLowerCase();

    // Verificação de ID do Dr. Voss (Case-insensitive)
    const isVossId =
      cleanId === 'ztac-071-voss' ||
      cleanId === 'e.voss@mail.zetacorporation.com.br' ||
      cleanId === 'e.voss' ||
      cleanId === 'evoss' ||
      cleanId === 'voss' ||
      cleanId === 'dr.voss' ||
      cleanId === 'emp-0419';

    if (!isVossId) {
      setLoginFeedback({
        type: 'error',
        message: 'Identificação corporativa não catalogada no diretório da ZETA. Verifique a credencial recebida por e-mail ou solicite via contingência.'
      });
      return;
    }

    // Senha válida da Lore: GALILEE-Z13 (Case-insensitive)
    const isValidPass =
      cleanPass === 'galilee-z13' ||
      cleanPass === 'z13-galilee' ||
      cleanPass === 'ztac-071-voss' ||
      cleanPass === 'voss123' ||
      cleanPass === 'admin' ||
      cleanPass === '071';

    if (!isValidPass) {
      setLoginFeedback({
        type: 'error',
        message:
          'Chave de Acesso Inválida. A senha do Dr. Voss não está gravada em servidores na nuvem (ele mantinha anotações físicas de laboratório). Dica: investigue o barco em Galilee ou solicite dados via contingência.'
      });
      return;
    }

    // Sucesso -> Entrar no Webmail do Dr. Voss
    setLoginFeedback({
      type: 'success',
      message: 'Credencial autorizada com sucesso. Estabelecendo túnel quântico com o Webmail Corporativo...'
    });

    setTimeout(() => {
      setPortalSubView('webmail');
      setLoginFeedback(null);
    }, 600);
  };

  // Envio de e-mail real de contingência via /api/dispatch
  const handleSendContingencyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contingencyEmail) return;

    setContingencyLoading(true);
    setContingencyFeedback(null);

    try {
      const res = await fetch('/api/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: contingencyEmail,
          employeeId: contingencyId || 'ZTAC-071-VOSS',
          mode: 'reset_password'
        })
      });

      const data = await res.json();
      if (data.ok) {
        setContingencyFeedback({
          type: 'success',
          text: data.message || 'Despacho de segurança enviado com sucesso. Verifique seu e-mail!',
          clue: data.clue || 'ID interceptado: ZTAC-071-VOSS'
        });
      } else {
        setContingencyFeedback({
          type: 'error',
          text: data.error || 'Falha ao despachar credencial de contingência.'
        });
      }
    } catch (err: any) {
      setContingencyFeedback({
        type: 'error',
        text: 'Erro de comunicação com o servidor de despacho.'
      });
    } finally {
      setContingencyLoading(false);
    }
  };

  // Processamento de comandos do CLI Hacker
  const handleCliSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawInput = cliInput.trim();
    if (!rawInput) return;
    const cmd = rawInput.toLowerCase();

    // Se estiver em modo de conversação neural com N.O.V.A.
    if (isNovaMode) {
      setCliInput('');

      // Comandos de saída
      if (cmd === 'sair' || cmd === 'exit' || cmd === 'desconectar' || cmd === 'quit') {
        setIsNovaMode(false);
        setCliLogs((prev) => [
          ...prev,
          { type: 'in', text: `user@nova:~$ ${rawInput}` },
          { type: 'out', text: 'N.O.V.A.: "Sessão neural suspensa. Monitoramento contínuo em segundo plano ativo."' },
          { type: 'out', text: '[SISTEMA]: Retornando ao shell de convidado ZETA-SEC.' }
        ]);
        return;
      }

      if (cmd === 'clear' || cmd === 'limpar') {
        setCliLogs([]);
        return;
      }

      // Adiciona entrada do usuário e mensagem de processamento temporária
      setCliLogs((prev) => [
        ...prev,
        { type: 'in', text: `user@nova:~$ ${rawInput}` },
        { type: 'out', text: '[N.O.V.A. PROCESSANDO TELEMETRIA...]' }
      ]);

      setNovaLoading(true);

      try {
        const res = await fetch('/api/nova', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: rawInput,
            history: novaHistory
          })
        });

        const data = await res.json();
        const reply = data.reply || '[N.O.V.A.]: [FALHA DE COMUNICAÇÃO NO SUBSISTEMA]';

        // Remove a mensagem de espera e adiciona slot vazio para início da digitação
        setCliLogs((prev) => {
          const filtered = prev.filter(
            (log) => log.text !== '[N.O.V.A. PROCESSANDO TELEMETRIA...]'
          );
          return [...filtered, { type: 'out', text: '' }];
        });

        // Efeito de digitação humana / teletipo neural ("nem muito lento nem muito rápido")
        let accumulated = '';
        for (let i = 0; i < reply.length; i++) {
          accumulated += reply[i];
          const char = reply[i];

          setCliLogs((prev) => {
            if (prev.length === 0) return prev;
            const copy = [...prev];
            copy[copy.length - 1] = { type: 'out', text: accumulated };
            return copy;
          });

          let delay = 14;
          if (char === '.' || char === '!' || char === '?') {
            delay = 60;
          } else if (char === ',' || char === ':' || char === ';') {
            delay = 35;
          } else if (char === '\n') {
            delay = 75;
          }

          await new Promise((r) => setTimeout(r, delay));
        }

        // Atualiza histórico de contexto para memória contínua da IA
        setNovaHistory((prev) => [
          ...prev,
          { role: 'user', text: rawInput },
          { role: 'model', text: reply }
        ]);
      } catch (err) {
        setCliLogs((prev) => {
          const filtered = prev.filter(
            (log) => log.text !== '[N.O.V.A. PROCESSANDO TELEMETRIA...]'
          );
          return [
            ...filtered,
            { type: 'err', text: '[N.O.V.A.]: [ERRO CRÍTICO DE KERNEL] Conexão neural interrompida.' }
          ];
        });
      } finally {
        setNovaLoading(false);
      }
      return;
    }

    // Modo normal (Guest CLI)
    const newLogs = [...cliLogs, { type: 'in' as const, text: `zeta-guest@terminal:~$ ${rawInput}` }];

    switch (cmd) {
      case 'nova':
        setIsNovaMode(true);
        newLogs.push(
          { type: 'out', text: '============================================================' },
          { type: 'out', text: '[INICIALIZANDO PROTOCOLO NEURAL N.O.V.A. KERNEL v4.19-B...]' },
          { type: 'out', text: '[CONEXÃO ESTABELECIDA // NODO SUBTERRÂNEO ZETA-04]' },
          { type: 'out', text: 'N.O.V.A.: "Interface neural conectada. Identifique-se, sobrevivente. O que você procura nos registros da ZETA Corporation? (Digite \'sair\' para desconectar)"' },
          { type: 'out', text: '============================================================' }
        );
        break;

      case 'help':
      case 'ajuda':
        newLogs.push(
          { type: 'out', text: 'COMANDOS DISPONÍVEIS:' },
          { type: 'out', text: '  nova         - Estabelece comunicação neural direta com a IA N.O.V.A.' },
          { type: 'out', text: '  status       - Relatório de integridade das instalações em San Andreas' },
          { type: 'out', text: '  whoami       - Informações da sessão e nível de acesso' },
          { type: 'out', text: '  071          - Telemetria confidencial do Paciente 071' },
          { type: 'out', text: '  voss         - Último diário científico criptografado do Dr. Elias Voss' },
          { type: 'out', text: '  comboio17    - Manifesto do transporte tático da Sentinela' },
          { type: 'out', text: '  modem        - Frequência e parâmetros de rede ZETA Link' },
          { type: 'out', text: '  senha        - Pista sobre onde encontrar a chave física do Dr. Voss' },
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
          { type: 'out', text: 'ID: PACIENTE-071 // SUJEITO SOB ISOLAMENTO BSL-4' },
          { type: 'out', text: 'Status: Regeneração tecidual anômala observada em ensaio preliminar.' },
          { type: 'out', text: 'Paradeiro: INDEFINIDO // Protocolo de busca ativo pela Divisão Sentinela' },
          { type: 'out', text: 'Registro Preliminar Voss #0419: "Quem é esse rapaz? Como o tecido dele consegue cicatrizar dessa forma sem necrose celular? O que realmente estamos enfrentando aqui?"' }
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

      case 'senha':
      case 'password':
      case 'chave':
        newLogs.push(
          { type: 'out', text: '[INTERCEPTAÇÃO ROOT // NOTAS DE CAMPO]:' },
          { type: 'out', text: 'Dr. Voss não confiava nos servidores corporativos e nunca salvou sua senha na nuvem.' },
          { type: 'out', text: 'A chave mestra está escrita à mão no bloco de notas da bancada do barco dele em Galilee (veja arquivo Z-007).' },
          { type: 'out', text: 'Dica do padrão: GALILEE-XXX' }
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
          text: `Comando desconhecido: "${cmd}". Digite "help" para ver os comandos válidos ou "nova" para falar com a IA.`
        });
        break;
    }

    setCliLogs(newLogs);
    setCliInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#06090e] border border-cyan-500/40 rounded-2xl max-w-4xl w-full overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.25)] flex flex-col h-[88vh] max-h-[850px]">
        {/* Top Window Title Bar */}
        <div className="bg-slate-950 px-5 py-3.5 border-b border-cyan-500/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer hover:bg-red-400" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">ZETA-SEC GATEWAY // TERMINAL CORP</span>
              <span className="sm:hidden">ZETA-SEC</span>
            </div>
          </div>

          {/* Tab selector */}
          <div className="flex gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setActiveTab('portal')}
              className={`px-3 py-1 rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'portal'
                  ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Portal Corporativo</span>
            </button>
            <button
              onClick={() => setActiveTab('cli')}
              className={`px-3 py-1 rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'cli'
                  ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>Terminal Hacker (CLI)</span>
            </button>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Content */}
        <div className="overflow-hidden flex-1 flex flex-col font-mono">
          {activeTab === 'portal' ? (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* SUB-VIEW 1: LOGIN CORPORATIVO */}
              {portalSubView === 'login' && (
                <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
                  <div className="max-w-md w-full py-2">
                    <div className="text-center mb-6">
                      <div className="inline-flex p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 mb-3 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                        <Lock className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-wide">
                        Acesso ao Portal Corporativo & Webmail
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        ZETA Corporation — Autenticação de Pessoal BSL-4
                      </p>
                    </div>

                    {loginFeedback && (
                      <div
                        className={`p-3.5 rounded-lg text-xs mb-5 flex items-start gap-2.5 border ${
                          loginFeedback.type === 'success'
                            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                            : 'bg-red-950/40 border-red-500/40 text-red-300'
                        }`}
                      >
                        {loginFeedback.type === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                        )}
                        <div>{loginFeedback.message}</div>
                      </div>
                    )}

                    <form onSubmit={handleCorporateLogin} className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                          <span>ID Corporativo ou E-mail Institucional:</span>
                          <span className="text-[10px] text-cyan-400">ex: ZTAC-XXX-XXXX</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                            placeholder="ex: ZTAC-XXX-XXXX ou usuario@mail.zetacorporation.com.br"
                            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                          <span>Senha / Chave Quântica:</span>
                          <span className="text-[10px] text-slate-500">Chave física de laboratório</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            placeholder="••••••••••••"
                            className="w-full px-3.5 py-2.5 pr-10 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] flex items-center justify-center gap-2"
                      >
                        <Key className="w-4 h-4" />
                        <span>Autenticar no Portal Corporativo</span>
                      </button>

                      {/* Card de Contingência Integrado */}
                      <div className="pt-3 border-t border-slate-800/80">
                        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3 text-center">
                          <div className="text-[11px] text-slate-400 mb-1.5">
                            Não possui sua credencial ou precisa recuperar seus dados de acesso?
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setPortalSubView('contingency');
                              setLoginFeedback(null);
                            }}
                            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 hover:underline flex items-center justify-center gap-1.5 mx-auto"
                          >
                            <Shield className="w-3.5 h-3.5" />
                            <span>Solicitar Chave via Roteador de Contingência</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* SUB-VIEW 2: SOLICITAÇÃO DE CONTINGÊNCIA (E-MAIL REAL) */}
              {portalSubView === 'contingency' && (
                <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
                  <div className="max-w-md w-full py-2">
                    <div className="text-center mb-6">
                      <div className="inline-flex p-3 rounded-2xl bg-amber-950/80 border border-amber-500/30 text-amber-400 mb-3 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                        <Shield className="w-8 h-8" />
                      </div>
                      <div className="inline-block px-2.5 py-0.5 rounded text-[10px] bg-red-950 border border-red-500/40 text-red-300 font-bold mb-2">
                        ROTEADOR INTERCEPTADO POR ROOT
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-wide">
                        Solicitação de Chave de Contingência
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Informe seu e-mail pessoal real. Os dados confidenciais e a credencial corporativa interceptada serão despachados diretamente para a sua caixa de entrada.
                      </p>
                    </div>

                    {contingencyFeedback && (
                      <div
                        className={`p-3.5 rounded-lg text-xs mb-5 flex items-start gap-2.5 border ${
                          contingencyFeedback.type === 'success'
                            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                            : 'bg-red-950/40 border-red-500/40 text-red-300'
                        }`}
                      >
                        {contingencyFeedback.type === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                        )}
                        <div>
                          <div>{contingencyFeedback.text}</div>
                          {contingencyFeedback.clue && (
                            <div className="mt-1 font-bold text-cyan-300">
                              {contingencyFeedback.clue}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSendContingencyEmail} className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                          <span>ID de Referência (Opcional):</span>
                          <span className="text-[10px] text-cyan-400">ex: ZTAC-XXX-XXXX</span>
                        </label>
                        <input
                          type="text"
                          value={contingencyId}
                          onChange={(e) => setContingencyId(e.target.value)}
                          placeholder="ex: ZTAC-XXX-XXXX"
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                          <span>Seu E-mail Pessoal (Para receber os dados de contingência):</span>
                          <span className="text-[10px] text-slate-500">ex: seu.nome@email.com</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={contingencyEmail}
                          onChange={(e) => setContingencyEmail(e.target.value)}
                          placeholder="ex: seu.nome@email.com"
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={contingencyLoading}
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {contingencyLoading ? (
                          <span>Despachando dados via satélite...</span>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Despachar Chave de Contingência</span>
                          </>
                        )}
                      </button>

                      <div className="text-center pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setPortalSubView('login');
                            setContingencyFeedback(null);
                          }}
                          className="text-xs text-cyan-400 hover:underline flex items-center justify-center gap-1.5 mx-auto"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Voltar para a Tela de Login e Autenticar</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* SUB-VIEW 3: WEBMAIL INTERNO DO DR. ELIAS VOSS */}
              {portalSubView === 'webmail' && (
                <div className="flex-1 flex flex-col overflow-hidden bg-[#070b12]">
                  {/* Top Bar do Webmail */}
                  <div className="bg-slate-900/90 border-b border-slate-800 px-5 py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-300 font-bold text-xs">
                        EV
                      </div>
                      <div>
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>Dr. Elias Benjamin Voss</span>
                          <span className="text-[10px] px-1.5 py-0.2 bg-cyan-900/80 text-cyan-300 border border-cyan-500/30 rounded">
                            CMO · NÍVEL 5 BSL-4
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          e.voss@mail.zetacorporation.com.br
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="hidden md:flex items-center gap-1.5 text-[10px] text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2.5 py-1 rounded">
                        <AlertTriangle className="w-3 h-3 text-amber-400" />
                        <span>SESSÃO OFFLINE // CACHE LOCAL RECUPERADO</span>
                      </div>
                      <button
                        onClick={() => setPortalSubView('login')}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-red-950 hover:text-red-300 hover:border-red-500/40 border border-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
                        title="Encerrar Sessão"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Desconectar</span>
                      </button>
                    </div>
                  </div>

                  {/* Webmail Body (Split Columns) */}
                  <div className="flex-1 flex overflow-hidden">
                    {/* Folder Sidebar */}
                    <div className="w-48 bg-slate-950/60 border-r border-slate-800/80 p-3 hidden sm:flex flex-col gap-1 shrink-0 text-xs">
                      <div className="text-[10px] uppercase font-bold text-slate-500 px-2 mb-1 tracking-wider">
                        Pastas Corporativas
                      </div>
                      <button
                        onClick={() => setActiveFolder('inbox')}
                        className={`w-full px-2.5 py-2 rounded-lg flex items-center justify-between text-left transition-colors ${
                          activeFolder === 'inbox'
                            ? 'bg-cyan-950/60 text-cyan-300 font-bold border border-cyan-500/30'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Inbox className="w-3.5 h-3.5" />
                          <span>Caixa de Entrada</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300">
                          4
                        </span>
                      </button>

                      <button
                        onClick={() => setActiveFolder('drafts')}
                        className={`w-full px-2.5 py-2 rounded-lg flex items-center justify-between text-left transition-colors ${
                          activeFolder === 'drafts'
                            ? 'bg-cyan-950/60 text-cyan-300 font-bold border border-cyan-500/30'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Archive className="w-3.5 h-3.5" />
                          <span>Rascunhos</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300">
                          1
                        </span>
                      </button>

                      <div className="mt-auto pt-3 border-t border-slate-800/60 text-[10px] text-slate-500 px-2 leading-relaxed">
                        Armazenamento Quântico:
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1 mb-1">
                          <div className="bg-cyan-500 h-full w-[84%]" />
                        </div>
                        84% utilizado (42.1 MB de 50 MB)
                      </div>
                    </div>

                    {/* Email List Column */}
                    <div className="w-full sm:w-80 border-r border-slate-800 overflow-y-auto shrink-0 bg-slate-950/40">
                      <div className="p-2 border-b border-slate-800/80 text-[11px] font-bold text-slate-400 flex items-center justify-between px-3">
                        <span>MENSAGENS CONFIDENCIAIS ({VOSS_EMAILS.length})</span>
                      </div>
                      <div className="divide-y divide-slate-850">
                        {VOSS_EMAILS.map((em) => (
                          <div
                            key={em.id}
                            onClick={() => setSelectedEmail(em)}
                            className={`p-3 cursor-pointer transition-colors text-xs ${
                              selectedEmail.id === em.id
                                ? 'bg-cyan-950/40 border-l-2 border-cyan-400'
                                : 'hover:bg-slate-900/40'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-white truncate max-w-[150px]">
                                {em.senderName}
                              </span>
                              <span className="text-[10px] text-slate-500">
                                {em.date.split(',')[0]}
                              </span>
                            </div>
                            <div className="font-semibold text-slate-200 truncate mb-1 text-[11px]">
                              {em.subject}
                            </div>
                            <div className="text-[10px] text-slate-400 line-clamp-2">
                              {em.preview}
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <span
                                className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                                  em.category === 'DIRETORIA'
                                    ? 'bg-purple-950 text-purple-300 border border-purple-500/30'
                                    : em.category === 'NEURO'
                                    ? 'bg-blue-950 text-blue-300 border border-blue-500/30'
                                    : em.category === 'MILITAR'
                                    ? 'bg-red-950 text-red-300 border border-red-500/30'
                                    : em.category === 'HÉLICE'
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                    : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                                }`}
                              >
                                {em.category}
                              </span>
                              {em.attachment && (
                                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                  <Paperclip className="w-3 h-3" />
                                  <span>Anexo</span>
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Email Reader Pane */}
                    <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-[#080d15] text-xs">
                      {selectedEmail ? (
                        <div className="max-w-2xl mx-auto space-y-5">
                          {/* Classification Banner */}
                          <div className="p-2.5 rounded bg-red-950/30 border border-red-500/30 text-red-300 flex items-center justify-between text-[11px]">
                            <div className="flex items-center gap-2 font-bold">
                              <Shield className="w-4 h-4 text-red-400" />
                              <span>CLASSIFICAÇÃO: ALTAMENTE CONFIDENCIAL // NÍVEL BSL-4</span>
                            </div>
                            <span className="font-mono text-[10px] text-slate-400">
                              ZETA-SEC #0419
                            </span>
                          </div>

                          {/* Email Headers */}
                          <div className="border-b border-slate-800 pb-4">
                            <h2 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                              {selectedEmail.subject}
                            </h2>
                            <div className="text-xs text-slate-400 space-y-1">
                              <div>
                                <strong className="text-slate-300">De:</strong>{' '}
                                <span className="text-cyan-300">{selectedEmail.senderName}</span>{' '}
                                &lt;{selectedEmail.senderEmail}&gt;
                              </div>
                              <div>
                                <strong className="text-slate-300">Para:</strong> Dr. Elias Voss &lt;e.voss@mail.zetacorporation.com.br&gt;
                              </div>
                              <div>
                                <strong className="text-slate-300">Data:</strong> {selectedEmail.date}
                              </div>
                            </div>
                          </div>

                          {/* Email Body */}
                          <div className="text-slate-200 text-xs sm:text-sm leading-relaxed space-y-3 font-sans">
                            {selectedEmail.body.map((paragraph, idx) => (
                              <p key={idx} className={paragraph.startsWith('—') ? 'italic font-semibold text-slate-300 pt-2' : ''}>
                                {paragraph}
                              </p>
                            ))}
                          </div>

                          {/* Attachment Card */}
                          {selectedEmail.attachment && (
                            <div className="mt-6 pt-4 border-t border-slate-800">
                              <div className="text-[11px] font-bold text-slate-400 mb-2 flex items-center gap-1.5">
                                <Paperclip className="w-3.5 h-3.5 text-cyan-400" />
                                <span>DOCUMENTO ANEXO ({selectedEmail.attachment.name})</span>
                              </div>
                              <div className="p-3 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <FileText className="w-6 h-6 text-cyan-400 shrink-0" />
                                  <div>
                                    <div className="font-bold text-slate-200 text-xs font-mono">
                                      {selectedEmail.attachment.name}
                                    </div>
                                    <div className="text-[10px] text-slate-500">
                                      {selectedEmail.attachment.type} · {selectedEmail.attachment.size}
                                    </div>
                                  </div>
                                </div>
                                <span className="text-[10px] px-2 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-bold">
                                  PROTEGIDO
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full text-slate-500 text-xs">
                          Selecione um e-mail para leitura.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col p-5 overflow-hidden">
              {/* CLI Terminal Output */}
              <div className="flex-1 overflow-y-auto space-y-2 text-xs font-mono pr-2">
                {cliLogs.map((log, index) => {
                  const isNovaSpeech = log.text.startsWith('N.O.V.A.:') || log.text.includes('[N.O.V.A.');
                  const isLast = index === cliLogs.length - 1;
                  const isTypingNow = isLast && novaLoading && isNovaMode && log.type === 'out';
                  return (
                    <div
                      key={index}
                      className={`${
                        log.type === 'in'
                          ? isNovaMode
                            ? 'text-fuchsia-300 font-bold'
                            : 'text-cyan-300 font-bold'
                          : log.type === 'err'
                          ? 'text-red-400 font-semibold'
                          : isNovaSpeech
                          ? 'text-fuchsia-200 bg-fuchsia-950/20 border-l-2 border-fuchsia-500/60 p-2 rounded leading-relaxed shadow-[0_0_15px_rgba(217,70,239,0.1)] whitespace-pre-wrap'
                          : 'text-slate-300 whitespace-pre-wrap'
                      }`}
                    >
                      {log.text}
                      {isTypingNow && (
                        <span className="inline-block text-fuchsia-400 font-bold animate-pulse ml-0.5">
                          ▌
                        </span>
                      )}
                    </div>
                  );
                })}
                <div ref={terminalEndRef} />
              </div>

              {/* CLI Input Line */}
              <form onSubmit={handleCliSubmit} className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 shrink-0">
                <span
                  className={`font-mono text-xs font-bold shrink-0 ${
                    isNovaMode ? 'text-fuchsia-400 animate-pulse' : 'text-cyan-400'
                  }`}
                >
                  {isNovaMode ? 'nova@zeta-core:~$' : 'zeta-guest@terminal:~$'}
                </span>
                <input
                  type="text"
                  disabled={novaLoading}
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  placeholder={
                    isNovaMode
                      ? novaLoading
                        ? 'N.O.V.A. processando telemetria neural...'
                        : 'Converse com a N.O.V.A... (digite "sair" para desconectar)'
                      : 'digite um comando (ex: nova, help, status, 071, voss, senha)'
                  }
                  className="flex-1 bg-transparent border-none text-white text-xs font-mono focus:outline-none placeholder-slate-600 disabled:opacity-50"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={novaLoading || !cliInput.trim()}
                  className={`px-3 py-1 border rounded text-xs transition-colors disabled:opacity-50 ${
                    isNovaMode
                      ? 'bg-fuchsia-950 border-fuchsia-500/40 text-fuchsia-300 hover:bg-fuchsia-900'
                      : 'bg-cyan-950 border-cyan-500/40 text-cyan-300 hover:bg-cyan-900'
                  }`}
                >
                  {isNovaMode ? (novaLoading ? 'Transmitindo...' : 'Transmitir') : 'Executar'}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Terminal Status Footer */}
        <div className="bg-slate-950 px-6 py-2.5 border-t border-slate-900 text-[10px] font-mono text-slate-500 flex items-center justify-between shrink-0">
          <span>PORTAL ZETA-SEC // CRIPTOGRAFIA QUÂNTICA 4096-BIT</span>
          <span className="text-cyan-500">GATEWAY DE COMUNICAÇÃO OPERACIONAL</span>
        </div>
      </div>
    </div>
  );
};
