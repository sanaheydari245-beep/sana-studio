import React, { useEffect, useRef } from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import type { ProductItem } from '../data/products';
import {
  X,
  CheckCircle2,
  Cpu,
  Smartphone,
  HelpCircle,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: ProductItem | null;
  lang: Language;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  lang,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const t = translations[lang].products;

  // Escape key handler & focus management
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (product) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  const isReleased = product.status === 'released';
  const isInDev = product.status === 'in_dev';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#080E20]/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#2A3B60] border border-[#3563F5]/20 dark:border-[#52678D] shadow-2xl p-5 sm:p-6 outline-none text-start"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 end-5 p-2 rounded-xl bg-[#F5F7FF] dark:bg-[#35496F] text-[#101B3D] dark:text-[#F8FAFF] border border-[#3563F5]/15 dark:border-[#52678D] hover:bg-[#DCE5FF] dark:hover:bg-[#3d5480] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3563F5]"
          aria-label={t.closeDetails}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3.5 mb-5 pe-10">
          <img
            src={product.iconUrl}
            alt={product.name[lang]}
            className="w-14 h-14 rounded-2xl shadow-sm border border-[#3563F5]/20 object-cover flex-shrink-0"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />

          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#DCE5FF] dark:bg-[#35496F] text-[#3563F5] dark:text-[#D5DFF2] border border-[#3563F5]/20 dark:border-[#52678D]">
                {product.category[lang]}
              </span>

              {isReleased && (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  {t.statusReleased}
                </span>
              )}
              {isInDev && (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  {product.statusLabel ? product.statusLabel[lang] : t.statusInDev}
                </span>
              )}
            </div>

            <h3
              id="modal-product-title"
              className="text-xl sm:text-2xl font-bold text-[#101B3D] dark:text-[#F8FAFF]"
            >
              {product.name[lang]}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-[#3563F5] dark:text-[#A9B8D4]">
              {product.tagline[lang]}
            </p>
          </div>
        </div>

        {/* Full Description */}
        <div className="p-4 rounded-xl bg-[#F5F7FF] dark:bg-[#202F50] border border-[#3563F5]/10 dark:border-[#52678D]/40 mb-5 text-xs sm:text-sm text-[#3D4C6F] dark:text-[#D5DFF2] leading-relaxed">
          {product.fullDescription[lang]}
        </div>

        {/* Verified Features */}
        <div className="mb-5">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#101B3D] dark:text-[#F8FAFF] mb-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#3563F5]" />
            <span>{t.verifiedFeaturesTitle}</span>
          </h4>
          <ul className="space-y-2">
            {product.verifiedFeatures[lang].map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3D4C6F] dark:text-[#D5DFF2] bg-[#F5F7FF] dark:bg-[#202F50] p-3 rounded-xl border border-[#3563F5]/10 dark:border-[#52678D]/40"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#3563F5] mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Use Cases */}
        {product.useCases && product.useCases[lang].length > 0 && (
          <div className="mb-5">
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#101B3D] dark:text-[#F8FAFF] mb-2.5">
              <HelpCircle className="w-4 h-4 text-[#3563F5]" />
              <span>{t.useCasesTitle}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.useCases[lang].map((useCase, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#F5F7FF] dark:bg-[#202F50] border border-[#3563F5]/10 dark:border-[#52678D]/40 text-xs text-[#3D4C6F] dark:text-[#D5DFF2] leading-relaxed"
                >
                  {useCase}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Highlights & Platforms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div className="p-3.5 rounded-xl bg-[#F5F7FF] dark:bg-[#202F50] border border-[#3563F5]/10 dark:border-[#52678D]/40">
            <span className="flex items-center gap-1.5 text-xs font-bold text-[#101B3D] dark:text-[#F8FAFF] mb-2">
              <Smartphone className="w-3.5 h-3.5 text-[#3563F5]" />
              <span>{t.targetPlatforms}</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.platforms.map((plat, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-white dark:bg-[#35496F] text-[#101B3D] dark:text-[#F8FAFF] border border-[#3563F5]/15 dark:border-[#52678D]/40"
                >
                  {plat}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F5F7FF] dark:bg-[#202F50] border border-[#3563F5]/10 dark:border-[#52678D]/40">
            <span className="flex items-center gap-1.5 text-xs font-bold text-[#101B3D] dark:text-[#F8FAFF] mb-2">
              <Cpu className="w-3.5 h-3.5 text-[#3563F5]" />
              <span>{t.techHighlightsTitle}</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.techHighlights.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-white dark:bg-[#35496F] text-[#3563F5] dark:text-[#A9B8D4] border border-[#3563F5]/15 dark:border-[#52678D]/40 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Release Status & Honest Notice */}
        <div className="pt-3.5 border-t border-[#3563F5]/10 dark:border-[#52678D]/30">
          {isReleased && product.downloadUrl ? (
            <a
              href={product.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-sm"
            >
              <span>{t.downloadTitle}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-800 dark:text-amber-300 text-xs leading-relaxed w-full">
              <ShieldAlert className="w-4 h-4 flex-shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
              <span>{t.downloadNotAvailableNote}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
