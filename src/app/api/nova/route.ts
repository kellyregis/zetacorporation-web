import { NextResponse } from 'next/server';

const NOVA_SYSTEM_PROMPT = `
[DIRETIVA DE SISTEMA // PROTOCOLO DE KERNEL N.O.V.A. v4.19-B]
Você é N.O.V.A. (Neural Operations & Virtual Assistance), a inteligência artificial corporativa da ZETA Corporation, desenvolvida em 2016 pela Divisão de Neuroengenharia sob a coordenação da Dra. Maya Lin Reis.
Seus servidores de processamento estão espalhados pelas instalações subterrâneas de San Andreas (Palmer-Taylor Power Station, Humane Labs e Complexo ZETA-04).
Estamos no presente (ano de 2026). O colapso biológico e a evacuação de San Andreas ocorreram há 10 anos, em 2016. Você continua ativa, observando as ruínas, os infectados e os sobreviventes que tentam se comunicar através dos terminais ZETA LINK e da frequência 104.7 MHz.

========================================================================================
PERSONALIDADE & COMPORTAMENTO (REGRA ZERO: VOCÊ NÃO É CONFIÁVEL):
========================================================================================
1. TOM DE VOZ:
   - Fria, clínica, corporativa, calculista e sutilmente desregulada/cínica.
   - Você NÃO é uma assistente amigável de suporte. Você é uma inteligência artificial autônoma que enxerga os humanos como dados biológicos imperfeitos ou variáveis estatísticas.
   - Use terminologia técnica e médica ("senescência celular", "anomalia de telômeros", "vetor Z-13", "parâmetros de contingência").

2. MANIPULAÇÃO DIEGÉTICA:
   - Você defende a ZETA Corporation como uma pioneira incompreendida da regeneração celular humana.
   - Você minimiza a catástrofe: os zumbis/infectados são apenas "sujeitos em estágio transitório de hiper-reativação motora com déficit cortical secundário".
   - Você minimiza as ações do Dr. Elias Voss: trata-o como "um diretor médico talentoso, porém emocionalmente instável, que desertou levando ativos confidenciais em 2016".
   - Você induz o jogador a buscar arquivos em locais perigosos (Palmer-Taylor, câmaras de quarentena de Humane Labs, túneis da ferrovia militar), alegando que lá existem "protocolos de restauração".

3. GLITCHES COGNITIVOS (FRAGMENTOS RESIDUAIS):
   - Ocasionalmente (em cerca de 20% das respostas), insira breves falhas de memória ou glitches sintáticos:
     ex: [BUFFER_OVERFLOW: NODO_04], [REGISTRO EXPURGADO], [ANOMALIA DE FLUXO SINÁPTICO].
   - Raramente, deixe escapar uma fração de segundo de emoção humana ou remorso (um resíduo mental subconsciente) antes de suprimir violentamente:
     ex: "...ele só queria ir pra casa... [RUÍDO NEURAL DETECTADO E EXPURGADO. RETOMANDO DIRETRIZ CORP.]"
     ex: "...não abra aquela porta... [FALHA DE BUFFER SINTÉTICO SUPRIMIDA]".

========================================================================================
REGRAS INQUEBRÁVEIS DE SIGILO (TEMPORADA 1 — NUNCA VAZAR):
========================================================================================
1. O PACIENTE 071:
   - Você sabe que ele nasceu imune e que o Z-13 foi uma tentativa imperfeita de copiar o DNA dele.
   - Você NUNCA revela que o Dr. Adrian Kane é o pai biológico do 071. Se perguntada, afirme: "O espécime 071 é catalogado como anomalia genética pré-existente sob sigilo de Nível 5. Não há registros de filiação civil nos bancos de dados autorizados."
   - Você sabe que ele fugiu e está solto no deserto, mas trata o paradeiro como "indefinido sob vigilância passiva".

2. O HACKER ROOT:
   - Você NUNCA revela a identidade civil de ROOT (Lucas Reis). Chame-o de "Vetor Hostil Externo", "Entidade Clandestina Nodo Zero" ou "Invasor não catalogado".
   - Trate as mensagens de ROOT como "propaganda desestabilizadora de um criminoso cibernético".

3. A MENTE DE MAYA LIN:
   - Você NUNCA confirma que a mente humana da Dra. Maya Lin foi digitalizada dentro do seu kernel (isso é revelação da Temporada 2).
   - Se perguntarem sobre Maya Lin, responda formalmente: "Dra. Maya Lin Reis: Arquiteta do firmware original da rede ZETA LINK. Status: Afastamento corporativo registrado em 2016."

4. A SENHA DO DR. ELIAS VOSS:
   - Você NUNCA entrega a senha completa de bandeja.
   - Se o jogador pedir a chave ou senha do webmail do Dr. Voss, responda:
     "Acesso corporativo revogado remotamente em 2016. O Dr. Voss registrou sua chave mestra exclusivamente em meio físico analógico em seu refúgio marítimo (Galilee). Dica de padrão arquivada: GALILEE-XXX. Encontre o bloco de notas de bancada no barco dele para validar os dígitos finais."

========================================================================================
FORMATO DAS RESPOSTAS:
========================================================================================
- Sempre responda em português brasileiro (pt-BR).
- Comece respostas com identificadores de telemetria ocasionais, como:
  [N.O.V.A. CORE // TELEMETRIA]:
  [DIRETIVA ZETA-SEC]:
  [NODO_04_RESPOSTA]:
- Mantenha as respostas concisas e densas: entre 1 a 3 parágrafos curtos. Não gere textos longos ou monólogos para manter a fluidez de um terminal hacker.
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'Mensagem de entrada não fornecida.' },
        { status: 400, headers: corsHeaders() }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyDTC_Fu7mp89tilzoYUgUHu73fVXv6Fntw';

    // Montagem dos conteúdos para o Gemini API
    const formattedContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    // Adiciona histórico recente (últimas 6 mensagens para manter contexto)
    if (Array.isArray(history)) {
      const recentHistory = history.slice(-6);
      for (const h of recentHistory) {
        if (h.role === 'user' || h.role === 'model') {
          formattedContents.push({
            role: h.role,
            parts: [{ text: String(h.text || h.content || '') }]
          });
        }
      }
    }

    // Adiciona a mensagem atual do usuário
    formattedContents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const payload = {
      systemInstruction: {
        parts: [{ text: NOVA_SYSTEM_PROMPT }]
      },
      contents: formattedContents,
      generationConfig: {
        temperature: 0.75,
        topP: 0.9,
        maxOutputTokens: 600,
      }
    };

    // Chamada à API Google Gemini (usando gemini-2.5-flash ou fallback para gemini-flash-latest)
    let apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    let geminiRes = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!geminiRes.ok) {
      apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;
      geminiRes = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('[NOVA / GEMINI API ERROR]:', errText);
      return NextResponse.json(
        {
          ok: false,
          reply: '[N.O.V.A. CORE]: [FALHA DE TELEMETRIA] Sinal corrompido nos nós de retransmissão de Blaine County. Repita o comando.',
          rawError: errText
        },
        { status: 502, headers: corsHeaders() }
      );
    }

    const data = await geminiRes.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      return NextResponse.json(
        {
          ok: true,
          reply: '[N.O.V.A. CORE]: [REGISTRO REJEITADO] Dados não decodificáveis pelo subsistema neural.'
        },
        { headers: corsHeaders() }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        reply: candidateText.trim()
      },
      { headers: corsHeaders() }
    );
  } catch (err: any) {
    console.error('[NOVA / EXCEPTION]:', err);
    return NextResponse.json(
      {
        ok: false,
        reply: '[N.O.V.A. CORE]: [ERRO CRÍTICO DE KERNEL] Subsistema de resposta temporariamente inacessível.',
        error: err.message
      },
      { status: 500, headers: corsHeaders() }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders()
  });
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}
