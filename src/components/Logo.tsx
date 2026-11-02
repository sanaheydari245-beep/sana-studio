import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const sizeMap = {
    sm: { icon: 30, text: 'text-base' },
    md: { icon: 38, text: 'text-xl' },
    lg: { icon: 52, text: 'text-2xl' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Bespoke Sana Studio Emblem */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
        aria-label="Sana Studio Emblem"
      >
        <defs>
          <linearGradient id="logoSanaBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F7EFF" />
            <stop offset="50%" stopColor="#3563F5" />
            <stop offset="100%" stopColor="#1942C8" />
          </linearGradient>
          <linearGradient id="logoSanaAccentGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#3563F5" />
          </linearGradient>
          <filter id="logoSanaGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#3563F5" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Midnight Squircle */}
        <rect
          x="4"
          y="4"
          width="112"
          height="112"
          rx="28"
          fill="#101B3D"
          stroke="#3563F5"
          strokeOpacity="0.35"
          strokeWidth="2"
        />

        {/* Geometric 'S' Motif */}
        <g filter="url(#logoSanaGlow)">
          <path
            d="M78 30 C90 30, 96 38, 96 48 C96 60, 78 64, 60 66 C42 68, 24 72, 24 84 C24 96, 36 102, 52 102 C68 102, 84 94, 90 88"
            fill="none"
            stroke="url(#logoSanaBrandGrad)"
            strokeWidth="13"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M42 30 C30 30, 24 38, 24 48 C24 54, 30 58, 42 60"
            fill="none"
            stroke="url(#logoSanaAccentGrad)"
            strokeWidth="11"
            strokeLinecap="round"
          />
        </g>

        {/* Precision Node */}
        <circle cx="60" cy="66" r="4.5" fill="#FFFFFF" />
      </svg>

      {/* Brand Logotype Typography */}
      {showText && (
        <div className="flex flex-col tracking-tight text-start">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-extrabold ${currentSize.text} text-[#101B3D] dark:text-[#F5F7FF] tracking-tight`}
            >
              Sana
            </span>
            <span
              className={`font-semibold ${currentSize.text} text-[#3563F5] tracking-tight`}
            >
              Studio
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#4D5C82] dark:text-[#A9B8D4] -mt-1">
            استودیو سنا
          </span>
        </div>
      )}
    </div>
  );
};
