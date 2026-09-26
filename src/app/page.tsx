'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Research } from '@/components/Research';
import { Team } from '@/components/Team';
import { Press } from '@/components/Press';
import { Footer } from '@/components/Footer';
import { TerminalModal } from '@/components/TerminalModal';
import { EasterEggs } from '@/components/EasterEggs';

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-[#06090e] selection:bg-cyan-500 selection:text-black">
      {/* Easter Egg Event Handlers & Console Listeners */}
      <EasterEggs />

      {/* Main Corporate Header */}
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Hero Section */}
      <Hero onOpenTerminal={() => setTerminalOpen(true)} />

      {/* About Section */}
      <About />

      {/* Research & Pipelines Section */}
      <Research />

      {/* Leadership & Scientific Board Section */}
      <Team />

      {/* Press Releases & Timeline Section */}
      <Press />

      {/* Footer */}
      <Footer onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Interactive ZETA-SEC Terminal Modal */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </main>
  );
}
