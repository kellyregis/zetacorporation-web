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
        {/* Hidden Diegetic Comment for Web Hackers */}
        {/* <!-- [ZETA-SEC DIRECTIVE 09]: PACIENTE 071 ESTÁ SOB SALVAGUARDA. CONTATO: E.VOSS@ZETACORPORATION.COM.BR --> */}
      </head>
      <body className="bg-[#06090e] text-slate-100 antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
