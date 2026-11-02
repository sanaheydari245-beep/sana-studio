import React, { useState } from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import {
  ShieldCheck,
  Feather,
  UserCheck,
  Award,
  RefreshCw,
  Lock,
} from 'lucide-react';

interface PrinciplesProps {
  lang: Language;
}

const PrincipleCard: React.FC<{
  item: { title: string; desc: string };
  icon: React.ComponentType<{ className?: string }>;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ item, icon: Icon, index, isSelected, onSelect }) => (
  <div
    role="button"
    tabIndex={0}
    onClick={onSelect}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect();
      }
    }}
    aria-pressed={isSelected}
    className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#2A3B60] border transition-all duration-200 shadow-sm group text-start cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3563F5] ${
      isSelected
        ? 'border-[#3563F5] dark:border-[#3563F5] ring-2 ring-[#3563F5]/25 shadow-md -translate-y-0.5'
        : 'border-[#3563F5]/10 dark:border-[#52678D]/50 hover:border-[#3563F5]/40 dark:hover:border-[#3563F5] hover:shadow-md hover:-translate-y-0.5'
    }`}
  >
    <div className="flex items-center justify-between mb-3">
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
          isSelected
            ? 'bg-[#3563F5] text-white shadow-sm scale-105'
            : 'bg-[#DCE5FF] dark:bg-[#35496F] text-[#3563F5] dark:text-[#A9B8D4] group-hover:bg-[#3563F5] group-hover:text-white'
        }`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <span
        className={`font-mono text-xs transition-colors ${
          isSelected
            ? 'text-[#3563F5] dark:text-[#A9B8D4] font-bold'
            : 'text-[#5D6D93] dark:text-[#B7C7E4] font-semibold'
        }`}
      >
        0{index + 1}
      </span>
    </div>
    <h3
      className={`text-sm sm:text-base font-bold mb-1.5 transition-colors ${
        isSelected
          ? 'text-[#3563F5] dark:text-[#F8FAFF]'
          : 'text-[#101B3D] dark:text-[#F8FAFF]'
      }`}
    >
      {item.title}
    </h3>
    <p className="text-xs sm:text-[13px] text-[#3D4C6F] dark:text-[#D5DFF2] leading-relaxed">
      {item.desc}
    </p>
  </div>
);

export const Principles: React.FC<PrinciplesProps> = ({ lang }) => {
  const t = translations[lang].principles;
  const icons = [Feather, UserCheck, Award, RefreshCw, Lock];

  // Selected card index state: null by default so no card is permanently active
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    setSelectedId((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="principles" className="py-10 md:py-12 relative">
      <div className="site-container">
        {/* Section Header */}
        <div className="max-w-xl mb-5 sm:mb-6 text-start">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#DCE5FF] dark:bg-[#35496F] text-[#3563F5] dark:text-[#D5DFF2] border border-[#3563F5]/20 dark:border-[#52678D] mb-2.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-[28px] md:text-[30px] font-bold text-[#101B3D] dark:text-[#F8FAFF] tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#3D4C6F] dark:text-[#D5DFF2] mt-2 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 
          Desktop 3-Column Layout:
          Left Column: 2 Cards (Top and Bottom)
          Middle Column: 1 Central Card (Strictly Centered Vertically & Horizontally)
          Right Column: 2 Cards (Top and Bottom)
        */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-5 items-stretch">
          {/* Left Column (Cards 0 and 1) */}
          <div className="flex flex-col justify-between gap-5 h-full">
            <PrincipleCard
              item={t.items[0]}
              icon={icons[0]}
              index={0}
              isSelected={selectedId === 0}
              onSelect={() => handleSelect(0)}
            />
            <PrincipleCard
              item={t.items[1]}
              icon={icons[1]}
              index={1}
              isSelected={selectedId === 1}
              onSelect={() => handleSelect(1)}
            />
          </div>

          {/* Center Column (Card 2: Exactly centered vertically in column space) */}
          <div className="flex flex-col justify-center h-full">
            <PrincipleCard
              item={t.items[2]}
              icon={icons[2]}
              index={2}
              isSelected={selectedId === 2}
              onSelect={() => handleSelect(2)}
            />
          </div>

          {/* Right Column (Cards 3 and 4) */}
          <div className="flex flex-col justify-between gap-5 h-full">
            <PrincipleCard
              item={t.items[3]}
              icon={icons[3]}
              index={3}
              isSelected={selectedId === 3}
              onSelect={() => handleSelect(3)}
            />
            <PrincipleCard
              item={t.items[4]}
              icon={icons[4]}
              index={4}
              isSelected={selectedId === 4}
              onSelect={() => handleSelect(4)}
            />
          </div>
        </div>

        {/* Tablet 2-Column Layout */}
        <div className="hidden sm:grid lg:hidden grid-cols-2 gap-4">
          <PrincipleCard
            item={t.items[0]}
            icon={icons[0]}
            index={0}
            isSelected={selectedId === 0}
            onSelect={() => handleSelect(0)}
          />
          <PrincipleCard
            item={t.items[1]}
            icon={icons[1]}
            index={1}
            isSelected={selectedId === 1}
            onSelect={() => handleSelect(1)}
          />
          <PrincipleCard
            item={t.items[2]}
            icon={icons[2]}
            index={2}
            isSelected={selectedId === 2}
            onSelect={() => handleSelect(2)}
          />
          <PrincipleCard
            item={t.items[3]}
            icon={icons[3]}
            index={3}
            isSelected={selectedId === 3}
            onSelect={() => handleSelect(3)}
          />
          <div className="col-span-2 sm:max-w-md sm:mx-auto w-full">
            <PrincipleCard
              item={t.items[4]}
              icon={icons[4]}
              index={4}
              isSelected={selectedId === 4}
              onSelect={() => handleSelect(4)}
            />
          </div>
        </div>

        {/* Mobile 1-Column Sequential Layout */}
        <div className="grid grid-cols-1 sm:hidden gap-3.5">
          {t.items.map((item, idx) => (
            <PrincipleCard
              key={idx}
              item={item}
              icon={icons[idx % icons.length]}
              index={idx}
              isSelected={selectedId === idx}
              onSelect={() => handleSelect(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
