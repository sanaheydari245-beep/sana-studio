import React, { useState } from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import type { ProductItem } from '../data/products';
import { productsData } from '../data/products';
import { ProductDetailModal } from './ProductDetailModal';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Layers,
  Database,
  Clock,
  Flame,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

interface ProductsProps {
  lang: Language;
}

export const Products: React.FC<ProductsProps> = ({ lang }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const t = translations[lang].products;

  // STRICT REQUIREMENT: Only the verified app (Emerald Life) is rendered.
  const product: ProductItem =
    productsData.find((p: ProductItem) => p.id === 'emerald-life') || productsData[0];

  const ArrowIcon = lang === 'fa' ? ArrowLeft : ArrowRight;

  const quickPillars = [
    {
      icon: Database,
      title: lang === 'fa' ? 'پایگاه‌داده محلی آفلاین (Local SQLite)' : '100% Offline SQLite Database',
    },
    {
      icon: Clock,
      title: lang === 'fa' ? 'تایمر پومودورو با اصوات تمرکز' : 'Pomodoro Timer with Audio',
    },
    {
      icon: Flame,
      title: lang === 'fa' ? 'ردیابی زنجیره استمرار عادات (Streak)' : 'Habit Streak Consistency',
    },
    {
      icon: Calendar,
      title: lang === 'fa' ? 'تقویم آموزشی و برنامه هفتگی' : 'Timetable & Academic Calendar',
    },
  ];

  return (
    <section id="products" className="py-10 md:py-12 relative">
      <div className="site-container">
        {/* Section Header */}
        <div className="max-w-xl mb-5 sm:mb-6 text-start">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#DCE5FF] dark:bg-[#35496F] text-[#3563F5] dark:text-[#D5DFF2] border border-[#3563F5]/20 dark:border-[#52678D] mb-2.5">
            <Layers className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-[28px] md:text-[30px] font-bold text-[#101B3D] dark:text-[#F8FAFF] tracking-tight">
            {t.title}
          </h2>

          <p className="text-sm sm:text-base text-[#3D4C6F] dark:text-[#D5DFF2] mt-2 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Compact & Proportional Emerald Life Card */}
        {product && (
          <div className="rounded-2xl p-5 sm:p-6 md:p-7 bg-white dark:bg-[#2A3B60] border border-[#3563F5]/15 dark:border-[#52678D] shadow-md transition-all hover:border-[#3563F5]/40 dark:hover:border-[#3563F5]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-7 items-start">
              {/* Product Identity Column */}
              <div className="md:col-span-5 flex flex-col items-start text-start pb-5 md:pb-0 md:pe-6 border-b md:border-b-0 md:border-e border-[#3563F5]/10 dark:border-[#52678D]/40">
                <div className="flex items-center gap-3 mb-3.5">
                  <img
                    src={product.iconUrl}
                    alt={product.name[lang]}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shadow-sm border border-[#3563F5]/20 object-cover flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-[22px] font-bold text-[#101B3D] dark:text-[#F8FAFF]">
                      {product.name[lang]}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3563F5] dark:text-[#A9B8D4]">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{t.featuredBadge}</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#DCE5FF] dark:bg-[#35496F] text-[#3563F5] dark:text-[#D5DFF2] border border-[#3563F5]/20 dark:border-[#52678D]">
                    {product.category[lang]}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/25">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{product.statusLabel ? product.statusLabel[lang] : t.statusInDev}</span>
                  </span>
                </div>

                <p className="text-xs sm:text-[13px] font-medium text-[#3563F5] dark:text-[#A9B8D4] mb-3.5 leading-relaxed">
                  {product.tagline[lang]}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-[#5D6D93] dark:text-[#B7C7E4] mt-auto">
                  <Smartphone className="w-3.5 h-3.5 text-[#3563F5] dark:text-[#A9B8D4]" />
                  <span>{lang === 'fa' ? 'سیستم‌عامل مقصد: Android' : 'Target Platform: Android'}</span>
                </div>
              </div>

              {/* Product Details & Capabilities Column */}
              <div className="md:col-span-7 flex flex-col justify-between h-full text-start">
                <div>
                  <p className="text-xs sm:text-sm text-[#3D4C6F] dark:text-[#D5DFF2] leading-relaxed mb-4">
                    {product.shortDescription[lang]}
                  </p>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#101B3D] dark:text-[#F8FAFF] mb-2.5">
                    {t.verifiedFeaturesTitle}
                  </h4>

                  {/* 4 Key Pillars Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                    {quickPillars.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F5F7FF] dark:bg-[#35496F] border border-[#3563F5]/10 dark:border-[#52678D]/40 text-xs text-[#101B3D] dark:text-[#F8FAFF]"
                        >
                          <div className="p-1.5 rounded-lg bg-[#3563F5]/10 dark:bg-[#2A3B60] text-[#3563F5] dark:text-[#D5DFF2] flex-shrink-0">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-medium text-xs leading-snug">{item.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Card Action Bar */}
                <div className="pt-3.5 border-t border-[#3563F5]/10 dark:border-[#52678D]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-[#5D6D93] dark:text-[#B7C7E4]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3563F5]" />
                    <span>{lang === 'fa' ? 'توسعه اختصاصی اندروید با Flutter و SQLite' : 'Android Development with Flutter & SQLite'}</span>
                  </div>

                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3563F5] hover:bg-[#2650DE] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3563F5] active:scale-[0.98]"
                  >
                    <span>{t.viewDetails}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        lang={lang}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};
