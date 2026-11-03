export type Language = 'fa' | 'en';

export interface TranslationSchema {
  nav: {
    home: string;
    features: string;
    howItWorks: string;
    preview: string;
    benefits: string;
    faq: string;
    contact: string;
    downloadApp: string;
    account: string;
    signOut: string;
    themeToggle: string;
    langToggle: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    downloadBtn: string;
    exploreBtn: string;
    platformNotice: string;
    stats: {
      tasksLabel: string;
      tasksSub: string;
      habitsLabel: string;
      habitsSub: string;
      studyLabel: string;
      studySub: string;
    };
  };
  features: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      title: string;
      desc: string;
      tag: string;
      bullets: string[];
    }>;
  };
  howItWorks: {
    badge: string;
    title: string;
    subtitle: string;
    steps: Array<{
      step: string;
      title: string;
      desc: string;
    }>;
  };
  preview: {
    badge: string;
    title: string;
    subtitle: string;
    tabs: Array<{
      id: string;
      label: string;
      title: string;
      desc: string;
      metrics: Array<{ label: string; value: string }>;
    }>;
  };
  benefits: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      desc: string;
    }>;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      q: string;
      a: string;
    }>;
  };
  download: {
    badge: string;
    title: string;
    subtitle: string;
    apkBtn: string;
    versionInfo: string;
    sizeInfo: string;
    instructionsTitle: string;
    instructions: string[];
    notice: string;
  };
  authModal: {
    title: string;
    subtitle: string;
    googleBtn: string;
    privacyNote: string;
    close: string;
    userGreeting: string;
    userEmail: string;
    statusActive: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    validationErrors: {
      nameRequired: string;
      nameMin: string;
      nameMax: string;
      emailRequired: string;
      emailInvalid: string;
      emailMax: string;
      subjectRequired: string;
      subjectMin: string;
      subjectMax: string;
      messageRequired: string;
      messageMin: string;
      messageMax: string;
    };
    successTitle: string;
    successMessage: string;
    errorTitle: string;
    errorMessage: string;
    rateLimitWarning: string;
    unconfiguredNotice: string;
    unconfiguredSetupHint: string;
    fallbackMailBtn: string;
    sendAnotherBtn: string;
    tryAgainBtn: string;
    clientActionNotice: string;
    directEmailLabel: string;
    directEmailValue: string;
    statusNote: string;
  };
  footer: {
    tagline: string;
    navTitle: string;
    featuresTitle: string;
    legalTitle: string;
    privacy: string;
    terms: string;
    copyright: string;
    reserved: string;
    designedBy: string;
  };
  privacyModal: {
    title: string;
    lastUpdated: string;
    sections: Array<{ heading: string; body: string }>;
  };
  termsModal: {
    title: string;
    lastUpdated: string;
    sections: Array<{ heading: string; body: string }>;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  fa: {
    nav: {
      home: 'صفحه اصلی',
      features: 'امکانات و قابلیت‌ها',
      howItWorks: 'نحوه کارکرد',
      preview: 'نمای اپلیکیشن',
      benefits: 'مزایا و ارزش‌ها',
      faq: 'پرسش‌های متداول',
      contact: 'ارتباط با ما',
      downloadApp: 'دانلود اپلیکیشن',
      account: 'حساب کاربری',
      signOut: 'خروج از حساب',
      themeToggle: 'تغییر تم (روشن / تاریک)',
      langToggle: 'English',
      menuOpen: 'باز کردن منو',
      menuClose: 'بستن منو',
    },
    hero: {
      badge: 'اپلیکیشن مدیریت جامع زندگی و مطالعه برای اندروید',
      title: 'زندگی‌ات را مدیریت کن،',
      titleHighlight: 'هر روز یک قدم پیشرفت کن.',
      subtitle:
        'Emerald Life یک دستیار هوشمند، جامع و محلی (Local-first) برای سازماندهی وظایف روزانه، تثبیت عادت‌های پایدار، زمان‌بندی دقیق برنامه‌ها، پایش زمان مطالعه و تحلیل شفاف بهره‌وری است.',
      downloadBtn: 'دانلود رایگان نسخه اندروید',
      exploreBtn: 'مشاهده قابلیت‌ها',
      platformNotice: 'توسعه‌یافته به صورت اختصاصی برای اندروید • کاملاً محلی و بدون وابستگی ابری',
      stats: {
        tasksLabel: 'مدیریت اولویت‌ها',
        tasksSub: 'سیستم پویا و منعطف وظایف',
        habitsLabel: 'زنجیره استمرار',
        habitsSub: 'ثبت عادت‌ها و روتین‌های روزمره',
        studyLabel: 'تمرکز و مطالعه',
        studySub: 'تایمر هوشمند و لاگ سرفصل‌ها',
      },
    },
    features: {
      badge: 'قابلیت‌های واقعی نرم‌افزار',
      title: 'یک پلتفرم کامل، بدون ابزارهای متفرقه',
      subtitle:
        'تمامی ماژول‌های Emerald Life بر پایه معماری داده‌های محلی و نیازهای واقعی یادگیری و زندگی هدفمند طراحی شده‌اند.',
      items: [
        {
          id: 'tasks',
          title: 'مدیریت پیشرفته وظایف (Task Management)',
          desc: 'ایجاد تسک‌ها با تعیین اولویت‌بندی، دسته‌بندی موضوعی، موعد مقرر و ثبت وضعیت تکمیل جهت حفظ انضباط کاری.',
          tag: 'سازماندهی',
          bullets: [
            'ثبت تسک‌ها همراه با یادداشت و جزئیات',
            'سطوح اولویت‌بندی فوری، ضروری و عادی',
            'فیلتر هوشمند بر اساس وضعیت اتمام و تاریخ',
            'مرتب‌سازی آسان و پایش وظایف روزانه',
          ],
        },
        {
          id: 'habits',
          title: 'مدیریت و تثبیت عادت‌ها (Habit Tracker)',
          desc: 'ساخت و پیگیری عادت‌های فردی، حفظ زنجیره استمرار و تبدیل اهداف کوچک به رفتارهای خودکار و ماندگار.',
          tag: 'رشد فردی',
          bullets: [
            'تعریف عادت‌های روزانه، هفتگی و بازه‌ای',
            'محاسبه زنجیره موفقیت (Streak) و نرخ پیوستگی',
            'ثبت سریع و تک‌لمسی انجام عادت',
            'پایش روند پایداری و یادآورهای هدفمند',
          ],
        },
        {
          id: 'schedule',
          title: 'برنامه‌ها و تقویم زمانی (Schedule & Programs)',
          desc: 'طراحی جدول زمانی روزمره، مدیریت رویدادهای پیش‌رو و چیدمان حساب‌شده فعالیت‌های آموزشی و شخصی.',
          tag: 'مدیریت زمان',
          bullets: [
            'تقویم جامع شمسی (جلالی) و میلادی هماهنگ',
            'مشاهده فعالیت‌های هر روز در یک نگاه',
            'جلوگیری از تداخل برنامه‌ها و کلاس‌ها',
            'برنامه‌ریزی دقیق جلسات، امتحانات و رویدادها',
          ],
        },
        {
          id: 'study',
          title: 'جلسات مطالعه و تایمر تمرکز (Study Sessions)',
          desc: 'ابزار اختصاصی مدیریت مطالعه همراه با تایمر تمرکز، تفکیک دروس و مباحث، و ثبت ساعات مفید خواندن.',
          tag: 'ویژه محصلان',
          bullets: [
            'تایمر دقیق تمرکز با فواصل استراحت هوشمند',
            'ثبت تفکیک‌شده مبحث، کتاب و مدت مطالعه',
            'لاگ تاریخچه کامل تمام جلسات آموزشی',
            'صدای زنگ اعلام اتمام بازه و استراحت',
          ],
        },
        {
          id: 'analytics',
          title: 'آمار و تحلیل جامع عملکرد (Analytics)',
          desc: 'مشاهده کارنامه بهره‌وری روزانه، هفتگی، ماهانه و نمودار روند ۶ ماهه برای شناخت الگوهای رفتاری.',
          tag: 'بینش آماری',
          bullets: [
            'کارنامه جامع درصد تکمیل برنامه‌ها و تسک‌ها',
            'نمودار مقایسه‌ای ساعات مطالعه در طول هفته',
            'گزارش دوره‌ای ۶ ماهه پیشرفت فردی',
            'نمایش بصری عملکرد بدون نیاز به اتصال اینترنت',
          ],
        },
        {
          id: 'notifications',
          title: 'یادآورها و اعلانات هوشمند (Notifications)',
          desc: 'سیستم اطلاع‌رسانی بومی اندروید برای یادآوری سررسید تسک‌ها، زمان عادت‌ها و اعلان شروع جلسات مطالعه.',
          tag: 'هماهنگی',
          bullets: [
            'یادآورهای به‌موقع بدون مصرف باتری اضافه',
            'اعلان پایان بازه‌های تمرکز و زنگ استراحت',
            'تنظیم اختصاصی ساعت و صدای اعلانات',
            'عملکرد کاملاً آفلاین بدون قطعی در اعلان',
          ],
        },
        {
          id: 'personalization',
          title: 'شخصی‌سازی گسترده و تم‌ها (Customization)',
          desc: 'حالت‌های تم روشن و تاریک OLED، انتخاب رنگ سازمانی، تغییر فرمت تقویم و گزینه‌های سفارشی تایمر.',
          tag: 'انعطاف‌پذیری',
          bullets: [
            'پشتیبانی همزمان از تم روشن، تیره و Ultra Dark',
            'بیش از ۳۰ پالت رنگی برای سربرگ و اِلِمان‌ها',
            'سوئیچ سریع میان تقویم شمسی و میلادی',
            'دو زبانه بودن محیط اپلیکیشن (فارسی و انگلیسی)',
          ],
        },
      ],
    },
    howItWorks: {
      badge: 'شروع آسان و گام‌به‌گام',
      title: 'مسیر بهره‌وری با Emerald Life',
      subtitle: 'چگونه در ۵ گام منظم، کنترل کامل وظایف و ساعات یادگیری خود را به دست بگیرید.',
      steps: [
        {
          step: '۰۱',
          title: 'تنظیم فضای کاری و اولویت‌ها',
          desc: 'برنامه را باز کرده، زبان و تقویم مورد نظر را برگزینید و رنگ دلخواه رابط کاربری را تنظیم کنید.',
        },
        {
          step: '۰۲',
          title: 'ثبت وظایف و جدول زمان‌بندی',
          desc: 'تسک‌های تحصیلی و کارهای روزانه را با اولویت‌بندی مشخص در بخش وظایف و تقویم اضافه کنید.',
        },
        {
          step: '۰۳',
          title: 'تعریف و پایش عادت‌های مثبت',
          desc: 'عادت‌های روزانه خود (ورزش، مطالعه آزاد، مرور لغات) را ثبت کرده و هر روز تیک بزنید.',
        },
        {
          step: '۰۴',
          title: 'مدیریت جلسات مطالعه با تایمر',
          desc: 'درس مورد نظر را انتخاب کنید، تایمر تمرکز را استارت بزنید و زمان واقعی مطالعه را ذخیره کنید.',
        },
        {
          step: '۰۵',
          title: 'بررسی کارنامه و نمودارهای رشد',
          desc: 'در پایان هفته، گزارش روند ۶ ماهه و ساعات مطالعه خود را در تب تحلیل مشاهده و بهینه‌سازی کنید.',
        },
      ],
    },
    preview: {
      badge: 'طراحی رابط کاربری مدرن',
      title: 'پیش‌نمایش بخش‌های Emerald Life',
      subtitle: 'نگاهی به بخش‌های گوناگون اپلیکیشن که با دقت و ظرافت بالا برای سیستم‌عامل اندروید پیاده شده است.',
      tabs: [
        {
          id: 'home',
          label: 'داشبورد اصلی',
          title: 'صفحه اصلی (Home Overview)',
          desc: 'مشاهده سریع وضعیت تسک‌های امروز، عادت‌های پیش‌رو، میانگین ساعات مطالعه و نقل‌قول‌های انگیزشی.',
          metrics: [
            { label: 'وضعیت روزانه', value: 'خلاصه پویا' },
            { label: 'تقویم جاری', value: 'خورشیدی/میلادی' },
            { label: 'تمرکز روز', value: 'دسترسی سریع' },
          ],
        },
        {
          id: 'tasks',
          label: 'وظایف و تسک‌ها',
          title: 'لیست تعاملی تسک‌ها (Tasks)',
          desc: 'فیلتر سریع کارهای جاری و انجام‌شده با رنگ‌بندی اولویت‌های کاری و تیک زدن آسان پس از اتمام.',
          metrics: [
            { label: 'دسته‌بندی', value: 'بر اساس اولویت' },
            { label: 'ثبت جزئیات', value: 'یادداشت‌دار' },
            { label: 'مرتب‌سازی', value: 'بر اساس تاریخ' },
          ],
        },
        {
          id: 'habits',
          label: 'زنجیره عادت‌ها',
          title: 'ردیاب پایدار عادت‌ها (Habits Tracker)',
          desc: 'نمایش خط استمرار روزانه با تقویم لمسی و انیمیشن موفقیت برای تقویت پیوستگی رفتارهای مثبت.',
          metrics: [
            { label: 'Streak Counter', value: 'زنجیره فعال' },
            { label: 'ثبت آسان', value: 'تک‌لمسی' },
            { label: 'پایش روند', value: 'آرشیو ۳۰ روزه' },
          ],
        },
        {
          id: 'schedule',
          label: 'جدول برنامه‌ها',
          title: 'تقویم و برنامه‌ریزی (Schedule)',
          desc: 'مشاهده رویدادها، کلاس‌ها و برنامه‌های اختصاصی هر روز در ساختاری تمیز و بدون شلوغی.',
          metrics: [
            { label: 'رویدادها', value: 'برنامه ساعتی' },
            { label: 'هماهنگی', value: 'بدون تداخل' },
            { label: 'سررسیدها', value: 'یادآور بومی' },
          ],
        },
        {
          id: 'study',
          label: 'جلسات مطالعه',
          title: 'تایمر متمرکز یادگیری (Focus & Study)',
          desc: 'ثبت زمان دقیق به همراه مشخص کردن مبحث آموزشی و کنترل وقفه‌ها و فواصل استراحت هوشمند.',
          metrics: [
            { label: 'تایمر هوشمند', value: 'دقیقه‌ای' },
            { label: 'لاگ مباحث', value: 'تفکیک دروس' },
            { label: 'آلارم پایان', value: 'هشدار صوتی' },
          ],
        },
        {
          id: 'analytics',
          label: 'نمودار و آمار',
          title: 'کارنامه و گراف‌های تحلیلی (Analytics)',
          desc: 'نمودارهای ستونی مقایسه ساعات مطالعه هفتگی و ماهیانه به همراه پایش نسبت موفقیت در تسک‌ها.',
          metrics: [
            { label: 'افق دید', value: '۶ ماهه' },
            { label: 'تفکیک مطالعه', value: 'ساعتی/روزانه' },
            { label: 'محاسبه بومی', value: 'بدون سرور' },
          ],
        },
        {
          id: 'settings',
          label: 'تنظیمات شخصی',
          title: 'سفارشی‌سازی ظاهر و عملکرد (Settings)',
          desc: 'سوئیچ تم تاریک Ultra Dark، تغییر زبان، تنظیمات زنگ هشدار و انتخاب از بین ۳۰ پالت رنگی جذاب.',
          metrics: [
            { label: 'حالت تاریک', value: 'OLED / Dark' },
            { label: 'رنگ سازمانی', value: '۳۰ رنگ' },
            { label: 'زبان‌ها', value: 'فارسی / انگلیسی' },
          ],
        },
      ],
    },
    benefits: {
      badge: 'ارزش‌های کلیدی محصول',
      title: 'چرا کاربران Emerald Life را برمی‌گزینند؟',
      subtitle: 'تمرکز بر تجربه کاربری مستقل، حریم خصوصی مطلق داده‌ها و ابزارهای منسجم در یک برنامه.',
      items: [
        {
          title: 'انضباط فردی و سازماندهی بدون پراکندگی',
          desc: 'به جای استفاده همزمان از چند برنامه مجزا برای تسک، عادت، تایمر و تقویم، همه چیز در یک محیط یکپارچه مدیریت می‌شود.',
        },
        {
          title: 'حفظ ۱۰۰٪ حریم خصوصی با معماری Local-first',
          desc: 'کلیه اطلاعات، ساعات مطالعه و برنامه‌های شخصی شما فقط در حافظه امن گوشی و در پایگاه‌داده SQLite محلی ذخیره می‌شود.',
        },
        {
          title: 'برنامه‌ریزی دقیق و مطالعه نتیجه‌محور',
          desc: 'با ثبت جلسات یادگیری و استفاده از تایمرهای تمرکز، زمان‌های پرت کاهش یافته و کیفیت ساعات مطالعه بالا می‌رود.',
        },
        {
          title: 'بینش واقعی و واقع‌بینانه از پیشرفت',
          desc: 'نمودارهای آماری دقیق به شما کمک می‌کنند تا نقاط قوت و افت‌های هفتگی خود را با داده‌های واقعی شناسایی کنید.',
        },
        {
          title: 'شخصی‌سازی عمیق با سلیقه شما',
          desc: 'با وجود تم تاریک مخصوص نمایشگرهای اولد و پالت‌های رنگی متنوع، محیط کاری کاملاً مطابق با ترجیح بصری شما شکل می‌گیرد.',
        },
        {
          title: 'استقلال کامل از اتصال اینترنت',
          desc: 'تمامی بخش‌ها، تایمرها، آمارها و اعلان‌ها در شرایط آفلاین و بدون هیچ اختلالی کار می‌کنند.',
        },
      ],
    },
    faq: {
      badge: 'پاسخ به ابهامات متداول',
      title: 'پرسش‌های پرتکرار کاربران',
      subtitle: 'شفافیت کامل پیرامون قابلیت‌ها، سیستم‌عامل‌ها، روش دانلود و خط‌مشی‌های Emerald Life.',
      items: [
        {
          q: 'اپلیکیشن Emerald Life دقیقاً چیست و چه کمکی می‌کند؟',
          a: 'Emerald Life یک سیستم جامع مدیریت زندگی و مطالعه برای اندروید است که ابزارهای مدیریت وظایف، ردیابی عادت‌ها، تقویم و برنامه‌ها، تایمر تمرکز مطالعه و نمودارهای تحلیلی را در یک محیط زیبا و سبک گرد هم آورده است.',
        },
        {
          q: 'Emerald Life برای چه سیستم‌عامل‌هایی منتشر شده است؟',
          a: 'این اپلیکیشن در حال حاضر به صورت اختصاصی برای سیستم‌عامل Android توسعه داده شده است. نسخه‌ای برای iOS، ویندوز یا وب وجود ندارد و تمرکز تیم بر روی تجربه بهینه کاربری در اندروید است.',
        },
        {
          q: 'چگونه می‌توان اپلیکیشن را دریافت و نصب کرد؟',
          a: 'شما می‌توانید فایل رسمی نصب مستقیم (APK) را از بخش دانلود همین وب‌سایت دریافت کنید. همچنین نسخه‌های پایدار به مرور در استورهای رسمی اندروید قرار خواهند گرفت.',
        },
        {
          q: 'آیا برای استفاده از برنامه نیاز به اینترنت و ساخت اکانت است؟',
          a: 'خیر؛ معماری برنامه Local-first است. یعنی تمام امکانات و داده‌ها به صورت محلی در دستگاه شما قرار می‌گیرند و بدون اتصال اینترنت و بدون نیاز به ورود اجباری کار می‌کنند.',
        },
        {
          q: 'آیا تقویم شمسی و زبان فارسی پشتیبانی می‌شود؟',
          a: 'بله؛ اپلیکیشن به صورت کامل و استاندارد از تقویم خورشیدی (جلالی)، میلادی، زبان فارسی با فونت وزیرمتن و همچنین زبان انگلیسی پشتیبانی می‌کند.',
        },
        {
          q: 'آیا می‌توان اعلانات و یادآورها را شخصی‌سازی کرد؟',
          a: 'بله؛ شما می‌توانید یادآورهای مستقل برای سررسید تسک‌ها، زمان ثبت عادت‌ها، و آلارم‌های صوتی پایان بازه تمرکز و استراحت را با دقت دقیقه تنظیم نمایید.',
        },
        {
          q: 'آیا حالت تاریک (Dark Mode) در دسترس است؟',
          a: 'بله؛ علاوه بر تم روشن، حالت تاریک استاندارد و همچنین حالت Ultra Dark (مشکی مطلق ویژه نمایشگرهای OLED برای صرفه‌جویی باتری) در بخش تنظیمات در دسترس است.',
        },
        {
          q: 'آیا اطلاعات من به سرورهای خارجی ارسال می‌شود؟',
          a: 'خیر؛ حریم خصوصی خط قرمز پروژه است. داده‌های برنامه‌ها و ساعات مطالعه شما هرگز بدون رضایت یا به سرورهای واسطه ارسال نمی‌شوند.',
        },
      ],
    },
    download: {
      badge: 'دریافت مستقیم و رسمی',
      title: 'Emerald Life را روی اندروید تجربه کنید',
      subtitle: 'نسخه رسمی و تاییدشده را دانلود کنید و سبک زندگی و مطالعه خود را هوشمندانه متحول سازید.',
      apkBtn: 'دانلود مستقیم فایل APK',
      versionInfo: 'نسخه رسمی: 1.0.0 (پایدار)',
      sizeInfo: 'حجم فایل: حدود ۶۷ مگابایت',
      instructionsTitle: 'راهنمای نصب سریع روی اندروید:',
      instructions: [
        'روی دکمه دانلود کلیک کنید تا فایل emerald-life.apk دریافت شود.',
        'پس از اتمام دانلود، روی اعلان یا فایل دانلود شده کلیک نمایید.',
        'در صورت درخواست سیستم، مجوز Install unknown apps را برای مرورگر خود موقتاً فعال کنید.',
        'روی Install بزنید و اپلیکیشن را اجرا نمایید.',
      ],
      notice: 'نیازمند سیستم‌عامل اندروید ۷.۰ و بالاتر • تست‌شده و امن',
    },
    authModal: {
      title: 'ورود به حساب کاربری',
      subtitle: 'جهت هماهنگی بازخوردها و پشتیبانی، با حساب رسمی گوگل خود متصل شوید.',
      googleBtn: 'ورود امن با حساب Google',
      privacyNote: 'احراز هویت از طریق درگاه امن Google OAuth 2.0 انجام می‌شود و به پسورد شما دسترسی نخواهد داشت.',
      close: 'بستن پنجره',
      userGreeting: 'خوش آمدید',
      userEmail: 'نشانی حساب:',
      statusActive: 'حساب فعال',
    },
    contact: {
      badge: 'ارتباط مستقیم و پشتیبانی',
      title: 'با تیم توسعه در ارتباط باشید',
      subtitle: 'نظرات، پیشنهادات، گزارش خطاها یا ایده‌های ارزشمند خود درباره Emerald Life را برای ما بفرستید.',
      nameLabel: 'نام و نام خانوادگی',
      namePlaceholder: 'مثال: علی رضایی',
      emailLabel: 'نشانی ایمیل معتبر',
      emailPlaceholder: 'name@example.com',
      subjectLabel: 'موضوع پیام',
      subjectPlaceholder: 'پیشنهاد قابلیت، بازخورد یا سوال...',
      messageLabel: 'متن پیام شما',
      messagePlaceholder: 'پیام، نظر یا بازخورد خود را اینجا بنویسید...',
      submitBtn: 'ارسال امن پیام',
      submittingBtn: 'در حال ارسال پیام...',
      validationErrors: {
        nameRequired: 'لطفاً نام خود را وارد کنید.',
        nameMin: 'نام باید حداقل ۲ حرف داشته باشد.',
        nameMax: 'نام نباید بیشتر از ۸۰ کاراکتر باشد.',
        emailRequired: 'لطفاً نشانی ایمیل خود را وارد کنید.',
        emailInvalid: 'قالب نشانی ایمیل معتبر نیست.',
        emailMax: 'نشانی ایمیل نباید بیشتر از ۱۲۰ کاراکتر باشد.',
        subjectRequired: 'لطفاً موضوع پیام را مشخص کنید.',
        subjectMin: 'موضوع پیام باید حداقل ۳ کاراکتر باشد.',
        subjectMax: 'موضوع پیام نباید بیشتر از ۱۵۰ کاراکتر باشد.',
        messageRequired: 'لطفاً متن پیام خود را بنویسید.',
        messageMin: 'متن پیام باید حداقل ۱۰ کاراکتر باشد.',
        messageMax: 'متن پیام نباید بیشتر از ۳۰۰۰ کاراکتر باشد.',
      },
      successTitle: 'پیام شما با موفقیت ارسال شد',
      successMessage: 'با تشکر از پیام شما. پیام مستقیماً به صندوق ایمیل تیم ارسال شد و به زودی به ایمیل شما پاسخ خواهیم داد.',
      errorTitle: 'خطا در ارسال پیام',
      errorMessage: 'ارسال پیام با سرویس با خطا مواجه شد. لطفاً مجدداً تلاش کنید یا مستقیماً ایمیل بزنید.',
      rateLimitWarning: 'لطفاً پیش از ارسال پیام جدید، ۶۰ ثانیه صبر فرمایید.',
      unconfiguredNotice: 'سرویس ارسال متصل نشده است.',
      unconfiguredSetupHint: 'تا زمان تنظیم کلیدها، می‌توانید از طریق دکمه زیر مستقیماً با نرم‌افزار ایمیل خود پیام ارسال نمایید.',
      fallbackMailBtn: 'ارسال مستقیم از طریق ایمیل',
      sendAnotherBtn: 'ارسال پیام جدید',
      tryAgainBtn: 'تلاش مجدد',
      clientActionNotice:
        'ارسال امن و مستقیم: پیام شما از طریق ارتباط رمزنگاری‌شده SSL به سرور اختصاصی منتقل شده و مستقیماً به توسعه‌دهنده ارسال می‌شود.',
      directEmailLabel: 'نشانی ایمیل رسمی ارتباط:',
      directEmailValue: 'sanaheydari245@gmail.com',
      statusNote: 'پاسخ‌ها در اسرع وقت به ایمیل ثبت‌شده شما فرستاده خواهد شد.',
    },
    footer: {
      tagline: 'سیستم جامع مدیریت زندگی، مطالعه و بهره‌وری فردی برای اندروید.',
      navTitle: 'بخش‌های اصلی',
      featuresTitle: 'امکانات برجسته',
      legalTitle: 'حریم خصوصی و شرایط',
      privacy: 'سیاست حفظ حریم خصوصی',
      terms: 'شرایط و ضوابط استفاده',
      copyright: 'تمامی حقوق مادی و معنوی برای اپلیکیشن Emerald Life محفوظ است.',
      reserved: 'طراحی اختصاصی با هویت بصری Emerald Green و فونت اصیل وزیرمتن.',
      designedBy: 'توسعه‌یافته توسط Sana Studio',
    },
    privacyModal: {
      title: 'سیاست حفظ حریم خصوصی (Privacy Policy)',
      lastUpdated: 'آخرین به‌روزرسانی: آبان ۱۴۰۵',
      sections: [
        {
          heading: '۱. اصل بنیادین: ذخیره‌سازی محلی داده‌ها (Local-First)',
          body: 'اپلیکیشن Emerald Life بر پایه حفظ استقلال کاربر طراحی شده است. تمام وظایف، عادات، ساعات مطالعه و برنامه‌های شما در دیتابیس محلی دستگاه اندرویدی‌تان ذخیره شده و هیچ نسخه‌ای از آن در سرورهای ابری ذخیره نمی‌شود.',
        },
        {
          heading: '۲. اطلاعات فرم تماس وب‌سایت',
          body: 'هنگامی که از طریق فرم تماس این وب‌سایت پیامی ارسال می‌کنید، صرفاً نام، ایمیل، موضوع و متن پیام شما جهت پاسخگویی به ایمیل رسمی توسعه‌دهنده ارسال می‌شود و در پایگاه‌های بازاریابی شخص ثالث ذخیره نمی‌گردد.',
        },
        {
          heading: '۳. احراز هویت با گوگل (Google Sign-In)',
          body: 'در صورت استفاده از ورود با گوگل، تنها اطلاعات عمومی نمایه شما (نام، ایمیل و تصویر) جهت شناسایی کاربری دریافت می‌شود. این وب‌سایت هیچ‌گونه دسترسی به ایمیل‌ها، پیام‌ها یا اطلاعات خصوصی جیمیل شما ندارد.',
        },
        {
          heading: '۴. دسترسی‌های اپلیکیشن در اندروید',
          body: 'اپلیکیشن Emerald Life تنها نیازمند مجوز ارسال اعلان‌های بومی (Notifications) جهت یادآوری تسک‌ها و هشدار تایمر است و دسترسی به دوربین، میکروفون، موقعیت مکانی یا مخاطبین درخواست نمی‌کند.',
        },
      ],
    },
    termsModal: {
      title: 'شرایط و ضوابط استفاده (Terms of Service)',
      lastUpdated: 'آخرین به‌روزرسانی: آبان ۱۴۰۵',
      sections: [
        {
          heading: '۱. پذیرش شرایط',
          body: 'استفاده از وب‌سایت و اپلیکیشن Emerald Life به منزله پذیرش کامل این ضوابط و تعهد به بهره‌برداری قانونی و شخصی از امکانات برنامه است.',
        },
        {
          heading: '۲. مالکیت معنوی و حق نشر',
          body: 'نام تجاری Emerald Life، نشان‌های گرافیکی، کدهای برنامه و طراحی‌های موجود متعلق به توسعه‌دهنده بوده و هرگونه بازنشر بدون مجوز یا دستکاری در بسته نصبی ممنوع است.',
        },
        {
          heading: '۳. توزیع و دریافت نرم‌افزار',
          body: 'توصیه اکید می‌شود فایل نصب APK را تنها از طریق این وب‌سایت رسمی یا مارکت‌های معتبر دریافت کنید تا از اصالت و امنیت بسته نصبی اطمینان حاصل شود.',
        },
        {
          heading: '۴. سلب مسئولیت ادعاهای غیرواقعی',
          body: 'این نرم‌افزار یک ابزار کمکی برای مدیریت زمان و سازماندهی است و هیچ ادعای قطعی درمانی یا پزشکی برای اختلالات تمرکز ارائه نمی‌دهد.',
        },
      ],
    },
  },
  en: {
    nav: {
      home: 'Home',
      features: 'Features',
      howItWorks: 'How It Works',
      preview: 'App Preview',
      benefits: 'Benefits',
      faq: 'FAQ',
      contact: 'Contact',
      downloadApp: 'Download App',
      account: 'Account',
      signOut: 'Sign Out',
      themeToggle: 'Toggle Theme (Light / Dark)',
      langToggle: 'فارسی',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
    },
    hero: {
      badge: 'Comprehensive Life & Study Management for Android',
      title: 'Take Control of Your Life.',
      titleHighlight: 'Make Every Day Count.',
      subtitle:
        'Emerald Life is an elegant, local-first Android application designed to help you organize daily tasks, build lasting habits, schedule study sessions, and monitor productivity with crystal-clear analytics.',
      downloadBtn: 'Download for Android',
      exploreBtn: 'Explore Features',
      platformNotice: 'Developed exclusively for Android • 100% Local-First & Cloud-Free',
      stats: {
        tasksLabel: 'Task Priority',
        tasksSub: 'Dynamic hierarchy & tracking',
        habitsLabel: 'Habit Streaks',
        habitsSub: 'Consistency & daily routines',
        studyLabel: 'Study Focus',
        studySub: 'Integrated timer & session logs',
      },
    },
    features: {
      badge: 'Genuine Capabilities',
      title: 'A Complete System, Zero Clutter',
      subtitle:
        'Every Emerald Life module is built around local data security and genuine learning and productivity workflows.',
      items: [
        {
          id: 'tasks',
          title: 'Task Management',
          desc: 'Create, organize, and prioritize daily tasks with clear deadlines and completion tracking to maintain structured momentum.',
          tag: 'Organization',
          bullets: [
            'Create tasks with contextual notes and details',
            'Configurable priority levels: High, Medium, Low',
            'Smart filtering by completion status and due date',
            'Smooth daily progress checkoffs',
          ],
        },
        {
          id: 'habits',
          title: 'Habit Management',
          desc: 'Build positive routines, track daily completion consistency, and turn small actions into lasting habits.',
          tag: 'Personal Growth',
          bullets: [
            'Track daily, weekly, and interval habits',
            'Live streak calculations & consistency monitoring',
            'Single-tap daily habit completion checkoff',
            'Long-term consistency trend visibility',
          ],
        },
        {
          id: 'schedule',
          title: 'Schedule & Programs',
          desc: 'Organize your daily schedule, track upcoming milestones, and prevent conflicts between study and personal life.',
          tag: 'Time Management',
          bullets: [
            'Dual Solar Hijri (Jalali) and Gregorian calendar support',
            'Clean daily timeline overview at a glance',
            'Avoid scheduling overlaps between classes and tasks',
            'Plan exams, routines, and important events cleanly',
          ],
        },
        {
          id: 'study',
          title: 'Study Sessions & Timer',
          desc: 'Dedicated study companion featuring focus timers, subject categorization, and detailed session logging.',
          tag: 'Student Focus',
          bullets: [
            'Precision focus timer with customizable break intervals',
            'Categorize sessions by subject, textbook, and topics',
            'Comprehensive historical log of all study sessions',
            'Audible chime notifications on interval completion',
          ],
        },
        {
          id: 'analytics',
          title: 'Analytics & Statistics',
          desc: 'Visualize your daily, weekly, monthly, and 6-month productivity trends to understand your study habits and output.',
          tag: 'Data Insights',
          bullets: [
            'Daily and weekly completion percentages',
            'Comparative weekly study hours bar charts',
            '6-month long-term progression analysis',
            '100% locally calculated without remote dependencies',
          ],
        },
        {
          id: 'notifications',
          title: 'Intelligent Reminders',
          desc: 'Native Android notifications alerting you to task deadlines, habit check-ins, and study session intervals.',
          tag: 'Timely Alerts',
          bullets: [
            'Battery-efficient local notification dispatch',
            'Alerts on session completion and rest cycles',
            'Customizable sound and alert schedules',
            'Zero server downtime: runs completely locally',
          ],
        },
        {
          id: 'personalization',
          title: 'Personalization & Themes',
          desc: 'Comfortable light and dark themes, pure OLED black mode, customizable accent colors, and dual-language preferences.',
          tag: 'Tailored UX',
          bullets: [
            'Support for Light, Dark, and Ultra Dark (OLED)',
            'Over 30 vibrant accent color palettes',
            'Instant toggle between Jalali and Gregorian calendars',
            'Full bilingual Persian and English support',
          ],
        },
      ],
    },
    howItWorks: {
      badge: 'Simple Setup',
      title: 'How Emerald Life Powers Your Day',
      subtitle: 'Five practical steps to take charge of your tasks, habits, and academic milestones.',
      steps: [
        {
          step: '01',
          title: 'Set Up Your Workspace',
          desc: 'Select your preferred language, calendar format, and visual theme upon launching.',
        },
        {
          step: '02',
          title: 'Organize Tasks & Schedules',
          desc: 'Add your study assignments and daily responsibilities with custom priorities and dates.',
        },
        {
          step: '03',
          title: 'Build & Track Daily Habits',
          desc: 'Set up habits you want to cultivate and check them off daily to build unbreakable streaks.',
        },
        {
          step: '04',
          title: 'Run Focused Study Sessions',
          desc: 'Launch the focus timer, choose your topic, and log exact study hours with built-in breaks.',
        },
        {
          step: '05',
          title: 'Review Insights & Optimize',
          desc: 'Inspect weekly and 6-month analytics to discover your peak productive hours and adjust routines.',
        },
      ],
    },
    preview: {
      badge: 'Visual Experience',
      title: 'Explore the Emerald Life Interface',
      subtitle: 'A clean, high-contrast mobile interface crafted specifically for focused productivity on Android.',
      tabs: [
        {
          id: 'home',
          label: 'Home Dashboard',
          title: 'Home Overview Screen',
          desc: 'Instant view of today’s tasks, upcoming habits, study hour metrics, and personalized daily greeting.',
          metrics: [
            { label: 'Daily Status', value: 'Live Digest' },
            { label: 'Calendar', value: 'Jalali/Gregorian' },
            { label: 'Quick Focus', value: 'Single Tap' },
          ],
        },
        {
          id: 'tasks',
          label: 'Task Manager',
          title: 'Interactive Task Management',
          desc: 'Filter easily between pending and completed tasks with color-coded priority flags and deadlines.',
          metrics: [
            { label: 'Priorities', value: 'High/Med/Low' },
            { label: 'Task Notes', value: 'Detailed' },
            { label: 'Ordering', value: 'Chronological' },
          ],
        },
        {
          id: 'habits',
          label: 'Habit Tracker',
          title: 'Habit Consistency & Streaks',
          desc: 'Visual consistency chain with streak counters and satisfaction haptics on daily completion.',
          metrics: [
            { label: 'Streak Tracker', value: 'Active Counter' },
            { label: 'Ease of Use', value: '1-Tap Log' },
            { label: 'Retention', value: '30-Day View' },
          ],
        },
        {
          id: 'schedule',
          label: 'Schedule & Calendar',
          title: 'Event & Program Planner',
          desc: 'Organize your classes, study hours, and milestones without clutter or overlapping commitments.',
          metrics: [
            { label: 'Timeline', value: 'Hourly Flow' },
            { label: 'Overlap Check', value: 'Zero Conflict' },
            { label: 'Reminders', value: 'Native Alert' },
          ],
        },
        {
          id: 'study',
          label: 'Study Focus Timer',
          title: 'Focused Study Companion',
          desc: 'Dedicated session timer tracking effective study time, breaks, and subject-specific history.',
          metrics: [
            { label: 'Focus Clock', value: 'Interval Based' },
            { label: 'Subjects', value: 'Categorized' },
            { label: 'Completion', value: 'Audio Chime' },
          ],
        },
        {
          id: 'analytics',
          label: 'Analytics & Insights',
          title: 'Long-Term Performance Metrics',
          desc: 'Detailed bar charts, task completion ratios, and 6-month progress trajectories.',
          metrics: [
            { label: 'Time Horizon', value: '6 Months' },
            { label: 'Chart Types', value: 'Weekly/Monthly' },
            { label: 'Processing', value: '100% Offline' },
          ],
        },
        {
          id: 'settings',
          label: 'Customization',
          title: 'Themes & Preferences',
          desc: 'Switch between Light, Dark, and OLED Ultra Dark, adjust notification sounds, and choose from 30 colors.',
          metrics: [
            { label: 'Dark Mode', value: 'OLED Black' },
            { label: 'Palettes', value: '30 Options' },
            { label: 'Languages', value: 'EN / FA' },
          ],
        },
      ],
    },
    benefits: {
      badge: 'Core Value',
      title: 'Why Students & Creators Rely on Emerald Life',
      subtitle: 'Uncompromising privacy, zero clutter, and all your productivity essentials in one unified app.',
      items: [
        {
          title: 'All-In-One Unified Ecosystem',
          desc: 'Stop juggling four separate apps for tasks, habit tracking, focus timers, and schedules. Everything is seamlessly integrated.',
        },
        {
          title: '100% Local-First Privacy',
          desc: 'Your study notes, personal habits, and daily plans stay solely on your Android device in a secure SQLite database.',
        },
        {
          title: 'Structured, Result-Driven Learning',
          desc: 'Keep track of real study hours and study topics to eliminate procrastination and boost academic retention.',
        },
        {
          title: 'Honest, Objective Productivity Data',
          desc: 'Understand your true weekly progress with transparent analytics rather than subjective feelings.',
        },
        {
          title: 'Deep Ergonomic Personalization',
          desc: 'Choose from 30+ accent colors and True OLED Dark Mode to customize an interface that inspires focus without eye strain.',
        },
        {
          title: 'Uninterrupted Offline Independence',
          desc: 'No login walls, no mandatory internet connections, and no cloud outages. Emerald Life works anytime, anywhere.',
        },
      ],
    },
    faq: {
      badge: 'Transparent Answers',
      title: 'Frequently Asked Questions',
      subtitle: 'Clear, honest information regarding platforms, functionality, and downloading Emerald Life.',
      items: [
        {
          q: 'What exactly is Emerald Life?',
          a: 'Emerald Life is an all-in-one life and study management app for Android combining task organization, habit tracking, daily scheduling, study timers, and performance analytics into a clean, unified experience.',
        },
        {
          q: 'Which operating systems does Emerald Life support?',
          a: 'Emerald Life is developed exclusively for Android. There are no iOS, desktop, or web editions, allowing us to deliver a deeply optimized Android experience.',
        },
        {
          q: 'How can I download and install the application?',
          a: 'You can download the verified release APK directly from the download section on this website. Stable releases will also be published to official Android distribution channels.',
        },
        {
          q: 'Does Emerald Life require an internet connection or account?',
          a: 'No. The app is local-first. All your data stays privately stored on your phone’s internal storage, operating fully offline without compulsory account logins.',
        },
        {
          q: 'Are both Jalali and Gregorian calendars supported?',
          a: 'Yes. Emerald Life features comprehensive native support for both Persian Solar Hijri (Jalali) and Gregorian calendars, complete with dual Persian and English language support.',
        },
        {
          q: 'Can I customize study timer intervals and notifications?',
          a: 'Yes. Focus durations, short/long rest breaks, reminder times, and audible chime alerts can be fully configured in app settings.',
        },
        {
          q: 'Is dark mode supported?',
          a: 'Yes. Emerald Life offers both a refined standard Dark Mode and an Ultra Dark (True Black) mode optimized for battery conservation on OLED screens.',
        },
        {
          q: 'Does the application send my personal data to external servers?',
          a: 'No. User privacy is a non-negotiable principle. Your personal tasks, routines, and study records are stored in your device’s local SQLite database.',
        },
      ],
    },
    download: {
      badge: 'Official Release',
      title: 'Experience Emerald Life on Android',
      subtitle: 'Download the verified APK release to elevate your daily routines and study habits today.',
      apkBtn: 'Download APK Release',
      versionInfo: 'Official Version: 1.0.0 (Stable)',
      sizeInfo: 'File Size: ~67 MB',
      instructionsTitle: 'Quick Installation Steps for Android:',
      instructions: [
        'Tap the download button to save emerald-life.apk to your device.',
        'Once downloaded, tap the notification or open the file from your Downloads folder.',
        'If prompted by Android, temporarily grant permission to install from your browser.',
        'Tap Install and launch Emerald Life to begin organizing your day.',
      ],
      notice: 'Requires Android 7.0 (Nougat) or higher • Verified & Clean',
    },
    authModal: {
      title: 'Account Authentication',
      subtitle: 'Connect with your Google account for feedback, updates, and community support.',
      googleBtn: 'Continue with Google',
      privacyNote: 'Authentication is securely processed via Google OAuth 2.0. We never access your Gmail password or private inbox.',
      close: 'Close Window',
      userGreeting: 'Welcome',
      userEmail: 'Account Email:',
      statusActive: 'Active Account',
    },
    contact: {
      badge: 'Direct Support',
      title: 'Connect with the Development Team',
      subtitle: 'Share your feedback, bug reports, feature ideas, or questions regarding Emerald Life.',
      nameLabel: 'Full Name',
      namePlaceholder: 'e.g. Alex Morgan',
      emailLabel: 'Email Address',
      emailPlaceholder: 'name@example.com',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'Feature request, feedback, or inquiry...',
      messageLabel: 'Your Message',
      messagePlaceholder: 'Please share your thoughts, ideas, or feedback...',
      submitBtn: 'Send Message Securely',
      submittingBtn: 'Sending Message...',
      validationErrors: {
        nameRequired: 'Please enter your name.',
        nameMin: 'Name must be at least 2 characters.',
        nameMax: 'Name must not exceed 80 characters.',
        emailRequired: 'Please enter your email address.',
        emailInvalid: 'Please enter a valid email address.',
        emailMax: 'Email must not exceed 120 characters.',
        subjectRequired: 'Please provide a message subject.',
        subjectMin: 'Subject must be at least 3 characters.',
        subjectMax: 'Subject must not exceed 150 characters.',
        messageRequired: 'Please write your message.',
        messageMin: 'Message must be at least 10 characters.',
        messageMax: 'Message must not exceed 3000 characters.',
      },
      successTitle: 'Message Sent Successfully',
      successMessage: 'Thank you for reaching out. Your message has been safely delivered to the development team.',
      errorTitle: 'Failed to Send Message',
      errorMessage: 'The message could not be delivered. Please try again or reach out directly using the official email.',
      rateLimitWarning: 'Please wait 60 seconds before sending another message.',
      unconfiguredNotice: 'Contact service is not configured.',
      unconfiguredSetupHint: 'Please use the direct email button below to send your message directly.',
      fallbackMailBtn: 'Send via Direct Email',
      sendAnotherBtn: 'Send Another Message',
      tryAgainBtn: 'Try Again',
      clientActionNotice:
        'Secure direct dispatch: Your message is encrypted via SSL and delivered through our dedicated Node.js backend straight to the developer inbox.',
      directEmailLabel: 'Official Contact Email:',
      directEmailValue: 'sanaheydari245@gmail.com',
      statusNote: 'Responses will be sent to your provided email address in a timely manner.',
    },
    footer: {
      tagline: 'Comprehensive Life & Study Management Application for Android.',
      navTitle: 'Navigation',
      featuresTitle: 'Core Modules',
      legalTitle: 'Legal & Privacy',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      copyright: 'All rights reserved for Emerald Life.',
      reserved: 'Crafted with Emerald Green visual identity and authentic Vazirmatn typography.',
      designedBy: 'Developed by Sana Studio',
    },
    privacyModal: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: November 2026',
      sections: [
        {
          heading: '1. Core Principle: 100% Local-First Storage',
          body: 'Emerald Life is built with user sovereignty at its core. All your tasks, habits, study sessions, and schedules are stored solely inside your Android device’s local SQLite database without cloud sync or remote harvesting.',
        },
        {
          heading: '2. Website Contact Form Data',
          body: 'When you submit a message through this website’s contact form, your name, email, subject, and message are transmitted directly to the developer’s inbox to respond to your inquiry and are never shared with marketing brokers.',
        },
        {
          heading: '3. Google Sign-In Authentication',
          body: 'If you choose to sign in with Google on this website, only your basic public profile information (name, email, and avatar) is retrieved for session identification. We never access your private Gmail messages or inbox data.',
        },
        {
          heading: '4. Android Device Permissions',
          body: 'The Emerald Life Android app requests only standard local notification permissions to alert you of task deadlines and focus intervals. It does not require access to your camera, microphone, contacts, or location.',
        },
      ],
    },
    termsModal: {
      title: 'Terms of Service',
      lastUpdated: 'Last Updated: November 2026',
      sections: [
        {
          heading: '1. Acceptance of Terms',
          body: 'By downloading or using Emerald Life and this website, you agree to these terms of service and commit to lawful, personal use of the software.',
        },
        {
          heading: '2. Intellectual Property',
          body: 'The Emerald Life brand, graphics, logos, source code, and design assets are the exclusive property of the developer and are protected by applicable copyright laws.',
        },
        {
          heading: '3. Software Distribution',
          body: 'We advise users to download the official APK directly from this official website or verified distribution stores to ensure integrity and security.',
        },
        {
          heading: '4. Disclaimer',
          body: 'Emerald Life is an organization and time-management utility provided as-is, without medical or psychological treatment claims.',
        },
      ],
    },
  },
};
