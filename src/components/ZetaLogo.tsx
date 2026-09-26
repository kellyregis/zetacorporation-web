import React from 'react';

interface ZetaLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const ZetaLogo: React.FC<ZetaLogoProps> = ({ 
  className = '', 
  size = 36, 
  showText = true 
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div 
        className="relative flex items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 via-sky-600/10 to-transparent p-2 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
        style={{ width: size + 8, height: size + 8 }}
      >
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Hexagon / Shield */}
          <path 
            d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z" 
            stroke="#0ea5e9" 
            strokeWidth="3.5" 
            strokeLinejoin="round"
            className="opacity-75"
          />
          {/* Inner Accent Ring */}
          <circle cx="50" cy="50" r="40" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 4" className="opacity-40 animate-spin" style={{ animationDuration: '30s' }} />
          
          {/* Futuristic Stylized "Z" with Quantum Core Cut */}
          <path 
            d="M30 32 L70 32 L36 68 L70 68" 
            stroke="url(#zeta-gradient)" 
            strokeWidth="7.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <circle cx="50" cy="50" r="3.5" fill="#38bdf8" className="animate-pulse" />

          {/* Gradients */}
          <defs>
            <linearGradient id="zeta-gradient" x1="30" y1="32" x2="70" y2="68" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="0.5" stopColor="#0284c7" />
              <stop offset="1" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold tracking-[0.22em] text-lg text-white font-mono leading-none">
              ZETA
            </span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold tracking-widest leading-none">
              CORP
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-[0.28em] text-slate-400 font-mono mt-0.5">
            Resiliência Celular
          </span>
        </div>
      )}
    </div>
  );
};
