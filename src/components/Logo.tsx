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
    sm: { icon: 28, text: 'text-base' },
    md: { icon: 36, text: 'text-xl' },
    lg: { icon: 48, text: 'text-2xl' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Real Emerald Life Application Icon / SVG Emblem */}
      <div className="relative flex-shrink-0 group">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-sm border border-emerald-500/20 bg-gradient-to-br from-emerald-500 to-emerald-800 p-0.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <img
            src="/assets/emerald-life-icon.png"
            alt="Emerald Life Logo"
            className="w-full h-full object-cover rounded-[10px]"
            onError={(e) => {
              // Fallback to stylized SVG gem if image load fails
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="6 3 18 3 22 9 12 22 2 9 6 3" fill="rgba(255,255,255,0.2)"></polygon>
                  </svg>
                `;
              }
            }}
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col text-start">
          <span className={`font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight ${currentSize.text}`}>
            Emerald Life
          </span>
          <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
            Life & Study OS
          </span>
        </div>
      )}
    </div>
  );
};
