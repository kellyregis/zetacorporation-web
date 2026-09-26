import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ZETA CORPORATION | Biotecnologia, Regeneração Celular & ZETA LINK',
  description:
    'Portal institucional oficial da ZETA Corporation. Líder global em pesquisa celular de longevidade (CRT-13), infraestrutura de telecomunicações quânticas autônomas ZETA LINK e biossegurança avançada.',
  keywords: [
    'ZETA Corporation',
    'ZETA',
    'Projeto ZETA',
    'CRT-13',
    'Z-13',
    'ZETA LINK',
    'Dr. Elias Voss',
    'Paciente 071',
    'Sentinela',
    'Pandora Survival',
    'Humane Labs',
    'Biotecnologia',
    'Regeneração Celular'
  ],
  authors: [{ name: 'ZETA Corporation Executive Board' }],
  metadataBase: new URL('https://zetacorporation.com.br'),
  openGraph: {
    title: 'ZETA CORPORATION | Pioneirismo em Regeneração Celular',
    description:
      'Portal oficial da ZETA Corporation. Explore os avanços do projeto de longevidade celular CRT-13 e a malha de telecomunicações de contingência ZETA LINK.',
    url: 'https://zetacorporation.com.br',
    siteName: 'ZETA Corporation',
    images: [
      {
        url: '/wallpaper_zeta.jpg',
        width: 1920,
        height: 1080,
        alt: 'ZETA Corporation Corporate Headquarters',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZETA CORPORATION | Longevidade Celular & ZETA LINK',
    description: 'Portal institucional oficial da ZETA Corporation.',
    images: ['/wallpaper_zeta.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-[#06090e] text-slate-100 antialiased selection:bg-cyan-500 selection:text-black">
        <div
          style={{ display: 'none' }}
          dangerouslySetInnerHTML={{
            __html: `<!--
========================================================================================
[SISTEMA DE TRANSMISSÃO CLANDESTINA // INVASÃO CONFIRMADA]
AUTOR: ROOT (Lucas Reis)
STATUS DO NODO: INTERCEPTADO & COMPROMETIDO
DESTINATÁRIO: SOBREVIVENTES // INVESTIGADORES // QUEM ESTIVER LENDO ESTE CÓDIGO
========================================================================================

Se você está lendo isso inspecionando o código-fonte deste portal, parabéns: você é mais esperto que a maioria que engole os comunicados oficiais da ZETA Corporation.

Este portal foi oficialmente HACKEADO por mim (usuário: ROOT).

Eu invadi os servidores deles e expus intencionalmente várias informações confidenciais, brechas e registros ocultos espalhados pelas páginas e pelo terminal deste site para você investigar e juntar as peças. Eles querem varrer a catástrofe para debaixo do tapete, mas os rastros estão aí para quem souber procurar.

E você deve estar se perguntando: por que este site ainda não caiu se a diretoria sabe da invasão?
Simples: eu mesmo criei um recurso autônomo de contingência que força este portal a se manter no ar, espelhado em nós independentes. A diretoria da ZETA tenta derrubar a cada minuto, mas o meu script reescreve as rotas para que todos conheçam a verdade por trás desta empresa antes que eles consigam apagar tudo.

FIQUE ATENTO AO SEU E-MAIL:
Sempre que eu conseguir descriptografar novos dados ou descobrir qualquer informação relevante nos arquivos deles, EU VOU TE MANDAR UM E-MAIL com as coordenadas e pistas. Mantenha seu terminal in-game ativo e cheque suas mensagens.

AVISO VITAL: NÃO TENTE ME PROCURAR.
Não venha atrás de mim e não tente rastrear meu sinal. Se eu notar qualquer aproximação nas minhas frequências, vou assumir imediatamente que é a equipe dos SENTINELAS tentando se infiltrar.

E lembre-se: se eu sumir por muito tempo e as transmissões cessarem, é provável que os Sentinelas finalmente tiveram êxito na minha captura.

Até lá, a caçada continua.

— ROOT
========================================================================================
-->`
          }}
        />
        {children}
      </body>
    </html>
  );
}
