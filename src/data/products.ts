export type ProductStatus = 'released' | 'in_dev' | 'planned';

export interface BilingualText {
  fa: string;
  en: string;
}

export interface BilingualList {
  fa: string[];
  en: string[];
}

export interface ProductItem {
  id: string;
  name: BilingualText;
  tagline: BilingualText;
  shortDescription: BilingualText;
  fullDescription: BilingualText;
  category: BilingualText;
  status: ProductStatus;
  statusLabel?: BilingualText;
  iconUrl?: string;
  platforms: string[];
  featured?: boolean;
  verifiedFeatures: BilingualList;
  useCases: BilingualList;
  techHighlights: string[];
  downloadUrl?: string; // Only provided when actually released
}

/**
 * کاتالوگ دادهمحور و مقیاس‌پذیر محصولات Sana Studio
 * در حال حاضر تنها اپلیکیشن واقعی ساخته‌شده استودیو: Emerald Life (نسخه اندروید)
 * این ساختار آرایه‌ای کاملاً آماده اضافه شدن اپلیکیشن‌های بعدی است.
 */
export const productsData: ProductItem[] = [
  {
    id: 'emerald-life',
    name: {
      fa: 'Emerald Life',
      en: 'Emerald Life',
    },
    tagline: {
      fa: 'اپلیکیشن اندرویدی مدیریت درس، زمان و عادات',
      en: 'Android App for Academic & Habit Management',
    },
    shortDescription: {
      fa: 'Emerald Life یک اپلیکیشن اندرویدی برای مدیریت زندگی و مطالعه با پایگاه‌داده محلی SQLite است.',
      en: 'Emerald Life is an Android app for life and study management powered by local SQLite.',
    },
    fullDescription: {
      fa: 'Emerald Life یک اپلیکیشن اندرویدی برای مدیریت زندگی و مطالعه است که به عنوان محصول رسمی Sana Studio، به صورت کاملاً آفلاین و متمرکز برای دانشجویان و دانش‌آموزان توسعه یافته است. این اپلیکیشن با تکیه بر معماری داده‌های محلی (Local-first)، امکان مدیریت تکالیف درسی بر پایه اولویت، تنظیم برنامه هفتگی آموزشی، ردیابی زنجیره استمرار عادات (Habit Streak) و اجرای جلسات تمرکز پومودورو با اصوات محیطی آرامش‌بخش را بدون نیاز به اتصال اینترنت در دستگاه‌های اندرویدی فراهم می‌سازد.',
      en: 'Emerald Life is an Android app for life and study management created under Sana Studio. Designed as a private, local-first companion for students and learners on Android devices, it unites academic course planning, daily habit streak tracking, ambient Pomodoro focus sessions, and performance analytics into an offline, distraction-free environment.',
    },
    category: {
      fa: 'مدیریت درس و سبک زندگی',
      en: 'Academic & Lifestyle',
    },
    status: 'in_dev',
    statusLabel: {
      fa: 'در حال توسعه برای اندروید',
      en: 'In Development for Android',
    },
    iconUrl: '/assets/emerald-life-icon.png',
    platforms: ['Android'],
    featured: true,
    verifiedFeatures: {
      fa: [
        'معماری کاملاً محلی (Local-first) بر پایه دیتابیس SQLite روی دستگاه اندروید بدون نیاز به اینترنت',
        'مدیریت وظایف و تکالیف درسی با اولویت‌بندی و دسته‌بندی موضوعی',
        'تایمر تمرکز عمیق (روش پومودورو) همراه با فایل‌های صوتی آرامش‌بخش و هشدار پایان بازه',
        'رهگیری استمرار عادات روزانه (Habit Streaks) و ثبت منظم پیشرفت فردی',
        'برنامه زمان‌بندی هفتگی و تقویم درسی برای رویدادها، کلاس‌ها و امتحانات',
        'داشبورد گزارش و تحلیل ساعات مطالعه متمرکز و روندهای هفتگی',
        'پشتیبانی دو زبانه کامل از زبان‌های فارسی (RTL) و انگلیسی (LTR) با تم روشن و تاریک',
      ],
      en: [
        'Local-first SQLite database architecture on Android with 100% offline functionality and zero data telemetry',
        'Academic coursework and task management with priority tagging',
        'Pomodoro deep study timer with integrated ambient soundscapes and session alarms',
        'Daily habit streak tracking calculating consistency and routine adherence',
        'Academic timetable and calendar scheduler for lectures and exam deadlines',
        'Study analysis dashboard visualizing cumulative focus hours and weekly trends',
        'Bilingual localization (Persian RTL & English LTR) with Dark and Light mode support',
      ],
    },
    useCases: {
      fa: [
        'برنامه‌ریزی ترم و زمان‌بندی تکالیف درسی دانش‌آموزان و دانشجویان در گوشی‌های اندروید',
        'تقویت انضباط تحصیلی با ثبت روزانه عادات مطالعه و مرور',
        'ایجاد محیط صوتی متمرکز برای نشست‌های طولانی حل مسائل و مطالعه',
      ],
      en: [
        'Coursework and academic exam scheduling on Android devices',
        'Strengthening study discipline through daily habit streaks',
        'Distraction-free deep work study intervals using audio-assisted timeboxing',
      ],
    },
    techHighlights: ['Flutter & Dart (Android)', 'SQLite (sqflite)', 'Riverpod State Management', 'Bilingual (FA/EN)'],
    downloadUrl: undefined, // در حال توسعه برای اندروید - پس از انتشار رسمی فعال می‌شود
  },
];
