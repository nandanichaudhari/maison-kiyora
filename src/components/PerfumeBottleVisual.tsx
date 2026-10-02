import React from 'react';

interface PerfumeBottleVisualProps {
  name: string;
  liquidColor?: string;
  liquidHighlight?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  interactive?: boolean;
}

export const PerfumeBottleVisual: React.FC<PerfumeBottleVisualProps> = ({
  name,
  size = 'md',
  className = '',
  interactive = true,
}) => {
  // Determine color scheme based on fragrance name
  const isOod = name.includes('OODY') || name.includes('RASPBERRY');
  const isSantal = name.includes('SANTAL');
  const isRose = name.includes('ROSE');
  const isIris = name.includes('IRIS');
  const isCuir = name.includes('CUIR');
  const isNeroli = name.includes('NÉROLI') || name.includes('NEROLI') || name.includes('SOLAIRE');

  let liquidStart = '#8a2b38';
  let liquidMid = '#581822';
  let liquidEnd = '#330c14';
  let highlightColor = 'rgba(255, 140, 160, 0.45)';

  if (isSantal) {
    liquidStart = '#e3b97b';
    liquidMid = '#b58a47';
    liquidEnd = '#7d5822';
    highlightColor = 'rgba(255, 230, 180, 0.5)';
  } else if (isRose) {
    liquidStart = '#c94d65';
    liquidMid = '#942b41';
    liquidEnd = '#591221';
    highlightColor = 'rgba(255, 180, 195, 0.5)';
  } else if (isIris) {
    liquidStart = '#939bbd';
    liquidMid = '#636b8c';
    liquidEnd = '#3f4663';
    highlightColor = 'rgba(220, 230, 255, 0.55)';
  } else if (isCuir) {
    liquidStart = '#8a5833';
    liquidMid = '#523018';
    liquidEnd = '#291508';
    highlightColor = 'rgba(240, 190, 140, 0.45)';
  } else if (isNeroli) {
    liquidStart = '#f5c86e';
    liquidMid = '#d99d34';
    liquidEnd = '#9c6812';
    highlightColor = 'rgba(255, 240, 190, 0.6)';
  }

  // Unique gradient IDs
  const idPrefix = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  const scaleMap = {
    sm: 'w-36 h-48',
    md: 'w-52 h-72',
    lg: 'w-64 h-88',
    hero: 'w-72 sm:w-88 md:w-96 lg:w-[420px] h-[380px] sm:h-[460px] md:h-[520px] lg:h-[580px]',
  };

  return (
    <div
      className={`relative flex items-center justify-center select-none group ${scaleMap[size]} ${className}`}
    >
      {/* Studio Lighting Ambient Glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-40 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${liquidStart} 0%, rgba(216,201,181,0.2) 60%, transparent 80%)`,
        }}
      />

      {/* Travertine Pedestal Base for Hero / LG */}
      {(size === 'hero' || size === 'lg') && (
        <div className="absolute -bottom-4 w-[75%] h-8 bg-[#E3D7C7]/80 rounded-[50%] blur-sm transform -rotate-1 shadow-2xl border-t border-white/60 pointer-events-none" />
      )}

      {/* Ground Contact Shadow */}
      <div className="absolute -bottom-2 w-[60%] h-5 bg-[#211C19]/25 rounded-[50%] blur-md pointer-events-none transition-transform duration-500 group-hover:scale-95 group-hover:opacity-30" />

      {/* Realistic Vector Flacon */}
      <svg
        viewBox="0 0 320 440"
        className={`w-full h-full relative z-10 filter drop-shadow-xl transition-all duration-700 ${
          interactive ? 'group-hover:-translate-y-2 group-hover:scale-[1.02]' : ''
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Champagne Gold Metallic Cap Gradient */}
          <linearGradient id={`gold-cap-${idPrefix}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8C734B" />
            <stop offset="25%" stopColor="#C8AB75" />
            <stop offset="50%" stopColor="#F3E5C8" />
            <stop offset="75%" stopColor="#B69A69" />
            <stop offset="100%" stopColor="#6E5632" />
          </linearGradient>

          {/* Liquid Gradient */}
          <linearGradient id={`liquid-grad-${idPrefix}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={liquidStart} stopOpacity="0.92" />
            <stop offset="50%" stopColor={liquidMid} stopOpacity="0.95" />
            <stop offset="100%" stopColor={liquidEnd} stopOpacity="0.98" />
          </linearGradient>

          {/* Glass Specular Reflection Gradient */}
          <linearGradient id={`glass-glint-${idPrefix}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="20%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="80%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.35" />
          </linearGradient>

          {/* Soft Liquid Highlight */}
          <radialGradient
            id={`liquid-radial-${idPrefix}`}
            cx="40%"
            cy="30%"
            r="60%"
            fx="40%"
            fy="30%"
          >
            <stop offset="0%" stopColor={highlightColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Label texture filter */}
          <linearGradient id={`label-bg-${idPrefix}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FAF7F2" />
            <stop offset="100%" stopColor="#EFE8DD" />
          </linearGradient>
        </defs>

        {/* 1. Atomizer Collar / Sprayer Neck */}
        <rect
          x="142"
          y="70"
          width="36"
          height="20"
          rx="1"
          fill={`url(#gold-cap-${idPrefix})`}
          stroke="#5a4422"
          strokeWidth="0.5"
        />
        {/* Sprayer collar ring */}
        <rect
          x="138"
          y="86"
          width="44"
          height="6"
          rx="1"
          fill={`url(#gold-cap-${idPrefix})`}
          stroke="#473418"
          strokeWidth="0.5"
        />

        {/* 2. Cylindrical Champagne Gold Cap */}
        <rect
          x="126"
          y="16"
          width="68"
          height="60"
          rx="3"
          fill={`url(#gold-cap-${idPrefix})`}
          stroke="#5a4422"
          strokeWidth="0.75"
        />
        {/* Cap bevel highlight */}
        <line x1="128" y1="18" x2="192" y2="18" stroke="#FFF5DC" strokeWidth="1" strokeOpacity="0.8" />
        {/* Cap subtle vertical knurl/brushed rib */}
        <line x1="150" y1="18" x2="150" y2="74" stroke="#FFF5DC" strokeWidth="0.6" strokeOpacity="0.4" />
        <line x1="170" y1="18" x2="170" y2="74" stroke="#473418" strokeWidth="0.6" strokeOpacity="0.4" />

        {/* 3. Outer Crystal Bottle Shape (Clear Heavy Flacon) */}
        {/* Outer glass boundary: width: 170px (from x=75 to x=245), height: 280px (from y=92 to y=372) */}
        <rect
          x="75"
          y="92"
          width="170"
          height="286"
          rx="8"
          fill="#FAF6F0"
          fillOpacity="0.25"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="2.5"
        />

        {/* Subtle Outer Dark Contour to give presence on ivory */}
        <rect
          x="74.5"
          y="91.5"
          width="171"
          height="287"
          rx="8.5"
          stroke="rgba(33,28,25,0.14)"
          strokeWidth="1"
        />

        {/* 4. Heavy Base Glass (The classic thick bottom of luxury perfume) */}
        <path
          d="M 80 344 L 240 344 L 240 372 C 240 375 238 376 235 376 L 85 376 C 82 376 80 375 80 372 Z"
          fill="#FFFFFF"
          fillOpacity="0.45"
        />
        {/* Base optical lens curved line */}
        <path
          d="M 86 348 Q 160 354 234 348"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 90 365 Q 160 369 230 365"
          stroke="rgba(33,28,25,0.08)"
          strokeWidth="1.2"
        />

        {/* 5. Inner Chamber (Containing Fragrance Liquid) */}
        {/* Inner glass wall boundary: x=86, y=104, width=148, height=240 */}
        <rect
          x="86"
          y="104"
          width="148"
          height="240"
          rx="4"
          fill={`url(#liquid-grad-${idPrefix})`}
        />

        {/* Liquid Surface Meniscus (Curved liquid level line) */}
        <ellipse
          cx="160"
          cy="104"
          rx="74"
          ry="6"
          fill={liquidStart}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.8"
        />

        {/* Radial Liquid Glow / Depth */}
        <rect
          x="86"
          y="104"
          width="148"
          height="240"
          rx="4"
          fill={`url(#liquid-radial-${idPrefix})`}
        />

        {/* Internal Dip Tube (Thin glass tube going from atomizer to bottom) */}
        <line
          x1="160"
          y1="94"
          x2="158"
          y2="340"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line
          x1="160.8"
          y1="94"
          x2="158.8"
          y2="340"
          stroke="rgba(33,28,25,0.15)"
          strokeWidth="0.8"
        />

        {/* 6. Signature Maison Kiyora Label */}
        {/* Centered on bottle: x=102, y=168, width=116, height=130 */}
        <rect
          x="102"
          y="168"
          width="116"
          height="132"
          rx="2"
          fill={`url(#label-bg-${idPrefix})`}
          stroke="#B69A69"
          strokeWidth="0.8"
          className="filter drop-shadow-sm"
        />

        {/* Label Inner Inset Border */}
        <rect
          x="105"
          y="171"
          width="110"
          height="126"
          rx="1"
          stroke="#B69A69"
          strokeWidth="0.35"
          strokeOpacity="0.6"
        />

        {/* Brand Text */}
        <text
          x="160"
          y="192"
          textAnchor="middle"
          fill="#211C19"
          fontSize="9"
          fontFamily="Cormorant Garamond, serif"
          fontWeight="600"
          letterSpacing="2.5"
        >
          MAISON KIYORA
        </text>

        {/* Sub-label city */}
        <text
          x="160"
          y="202"
          textAnchor="middle"
          fill="#8C8175"
          fontSize="5"
          fontFamily="Manrope, sans-serif"
          fontWeight="500"
          letterSpacing="1.2"
        >
          PARIS · NEW DELHI
        </text>

        {/* Thin Gold Hairline on Label */}
        <line x1="124" y1="211" x2="196" y2="211" stroke="#B69A69" strokeWidth="0.5" strokeOpacity="0.7" />

        {/* Perfume Name */}
        <text
          x="160"
          y="235"
          textAnchor="middle"
          fill="#211C19"
          fontSize="9.5"
          fontFamily="Cormorant Garamond, serif"
          fontWeight="700"
          letterSpacing="1.4"
        >
          {name.length > 15 ? name.split(' ')[0] : name}
        </text>
        {name.length > 15 && (
          <text
            x="160"
            y="247"
            textAnchor="middle"
            fill="#211C19"
            fontSize="9"
            fontFamily="Cormorant Garamond, serif"
            fontWeight="700"
            letterSpacing="1.4"
          >
            {name.split(' ').slice(1).join(' ')}
          </text>
        )}

        {/* Eau de Parfum */}
        <text
          x="160"
          y="272"
          textAnchor="middle"
          fill="#5a524a"
          fontSize="5.5"
          fontFamily="Manrope, sans-serif"
          fontWeight="400"
          letterSpacing="1"
        >
          EAU DE PARFUM
        </text>

        {/* Volume */}
        <text
          x="160"
          y="283"
          textAnchor="middle"
          fill="#8C8175"
          fontSize="5"
          fontFamily="Manrope, sans-serif"
          fontWeight="500"
          letterSpacing="0.8"
        >
          100 ML · 3.4 FL. OZ.
        </text>

        {/* 7. Front Glass Reflection Overlay (Luxury Glaze) */}
        <path
          d="M 80 96 L 108 96 L 94 370 L 80 370 Z"
          fill="url(#glass-glint-${idPrefix})"
          opacity="0.65"
        />
        <path
          d="M 226 96 L 240 96 L 240 370 L 230 370 Z"
          fill="url(#glass-glint-${idPrefix})"
          opacity="0.35"
        />

        {/* Top Rim Highlight */}
        <line x1="82" y1="94" x2="238" y2="94" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.85" />
      </svg>
    </div>
  );
};
