export type Language = 'fa' | 'en';

export interface TranslationSchema {
  nav: {
    home: string;
    features: string;
    screenshots: string;
    profile: string;
    howItWorks: string;
    values: string;
    faq: string;
    contact: string;
    downloadApp?: string;
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
    exploreBtn: string;
    screenshotsBtn: string;
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
  screenshots: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      title: string;
      desc: string;
      image: string;
      tag: string;
    }>;
  };
  profileSection: {
    badge: string;
    title: string;
    subtitle: string;
    totalStudyLabel: string;
    totalStudyValue: string;
    tasksDoneLabel: string;
    tasksDoneValue: string;
    features: Array<{
      title: string;
      desc: string;
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
  values: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      desc: string;
      tag: string;
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
    firstNameLabel: string;
    firstNamePlaceholder: string;
    lastNameLabel: string;
    lastNamePlaceholder: string;
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
      firstNameRequired: string;
      firstNameMin: string;
      firstNameMax: string;
      lastNameRequired: string;
      lastNameMin: string;
      lastNameMax: string;
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
      screenshots: 'تصاویر محیط برنامه',
      profile: 'پروفایل کاربری',
      howItWorks: 'نحوه کارکرد',
      values: 'ارزش‌های کلیدی ما',
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
      exploreBtn: 'مشاهده امکانات برنامه',
      screenshotsBtn: 'تصاویر رابط کاربری',
      platformNotice: 'توسعه‌یافته به صورت اختصاصی برای اندروید • ذخیره‌سازی ۱۰۰٪ محلی داده‌ها',
      stats: {
        tasksLabel: 'مدیریت وظایف',
        tasksSub: 'اولویت‌بندی و دسته‌بندی تسک‌ها',
        habitsLabel: 'ردیاب عادت‌ها',
        habitsSub: 'زنجیره استمرار روزانه',
        studyLabel: 'تایمر مطالعه',
        studySub: 'تمرکز عمیق با تکنیک پومودورو',
      },
    },
    features: {
      badge: 'قابلیت‌های واقعی اپلیکیشن',
      title: 'امکانات جامع و یکپارچه در یک محیط مستقل',
      subtitle:
        'کلیه ابزارهای موردنیاز برای سازماندهی روزمرگی و ارتقای ساعات مطالعه، بدون نیاز به اینترنت و بدون شلوغی‌های اضافه.',
      items: [
        {
          id: 'tasks',
          title: 'مدیریت هوشمند وظایف (Task Management)',
          desc: 'ثبت و اولویت‌بندی کارهای جاری و انجام‌شده با برچسب‌های درسی و کاری، ثبت موعد مقرر و فیلتر سریع تسک‌ها.',
          tag: 'سازماندهی کارها',
          bullets: [
            'دسته‌بندی موضوعی بر اساس دروس، کار و پروژه‌ها',
            'تعیین اولویت‌های فوری و عادی',
            'تیک‌زدن آسان و آرشیو سریع موارد تکمیل‌شده',
          ],
        },
        {
          id: 'habits',
          title: 'ردیابی زنجیره عادت‌ها (Habit Tracking)',
          desc: 'ایجاد و حفظ روتین‌های مثبت روزانه با شمارنده استمرار (Streak) و ثبت اهداف تکرار هفتگی.',
          tag: 'پایداری رفتار',
          bullets: [
            'شمارش خودکار روزهای متوالی پایبندی (Streak)',
            'انتخاب آیکون و تم رنگی اختصاصی برای هر عادت',
            'پایش درصد پیشرفت هفتگی و ماهانه',
          ],
        },
        {
          id: 'schedule',
          title: 'گاه‌شمار و برنامه‌ریزی (Schedule Management)',
          desc: 'نمای تقویم هفتگی و ساعتی منظم برای ثبت رویدادها، زمان کلاس‌ها و جلسات مهم بدون تداخل.',
          tag: 'مدیریت زمان',
          bullets: [
            'گاه‌شمار افقی روزهای هفته',
            'تفکیک دقیق بازه‌های زمانی با رنگ‌بندی تفکیک‌شده',
            'مشاهده برنامه‌های اختصاصی هر روز در یک قاب',
          ],
        },
        {
          id: 'timer',
          title: 'تایمر تمرکز و جلسات مطالعه (Focus Timer)',
          desc: 'شمارش معکوس متمرکز ۲۵ دقیقه‌ای پومودورو به همراه کنترل بازه‌های استراحت کوتاه و بلند.',
          tag: 'تمرکز عمیق',
          bullets: [
            'حالت‌های شمارش معکوس (Countdown)، استاپ‌واچ و اینتروال',
            'زنگ هشدار پایان بازه تمرکز و شروع استراحت',
            'ثبت لاگ مباحث مطالعه‌شده در حافظه دستگاه',
          ],
        },
        {
          id: 'analytics',
          title: 'تحلیل و نمودارهای پیشرفت (Progress Analytics)',
          desc: 'گراف‌های آماری از میزان مطالعه، عملکرد در انجام وظایف و روند پایداری عادت‌ها جهت بررسی بهره‌وری.',
          tag: 'بینش واقعی',
          bullets: [
            'نمودار ساعات مطالعه هفتگی و ماهیانه',
            'نسبت تسک‌های انجام‌شده به کل وظایف',
            'محاسبه ۱۰۰٪ محلی بدون ارسال داده به سرور',
          ],
        },
        {
          id: 'notifications',
          title: 'اعلانات و یادآورهای بومی (Notifications)',
          desc: 'یادآوری‌های به‌موقع برای سررسید کارها، زمان اجرای عادت‌ها و پایان بازه‌های مطالعه.',
          tag: 'انضباط فردی',
          bullets: [
            'تنظیم یادآور برای ساعت مشخص در روز',
            'عملکرد بدون نیاز به اینترنت یا سرویس‌های ابری',
            'آلارم‌های صوتی متنوع و قابل انتخاب',
          ],
        },
        {
          id: 'personalization',
          title: 'شخصی‌سازی ظاهر و تم‌ها (Themes & Personalization)',
          desc: 'پشتیبانی از حالت تاریک مخصوص پنل‌های OLED (کاهش مصرف باتری) و پالت‌های رنگی جذاب.',
          tag: 'ظاهر منعطف',
          bullets: [
            'تم مشکی خالص (Ultra Dark OLED) و تم استاندارد',
            'پشتیبانی کامل از زبان فارسی با فونت اصیل وزیرمتن',
            'شخصی‌سازی رنگ کارت‌ها و آیکون‌ها',
          ],
        },
      ],
    },
    screenshots: {
      badge: 'تصاویر واقعی اپلیکیشن',
      title: 'نگاهی به محیط و رابط کاربری Emerald Life',
      subtitle:
        'تصاویر گرفته‌شده از بخش‌های مختلف نسخه واقعی اپلیکیشن اندروید در تم تیره با زبان طراحی ارگونومیک.',
      items: [
        {
          id: 'home',
          title: 'داشبورد جامع (Home Overview)',
          desc: 'مشاهده یکپارچه وضعیت تسک‌های در انتظار، پیوستگی عادت‌ها، برنامه‌های امروز و نوار پیشرفت کلی در یک نگاه.',
          image: '/images/home.jpg',
          tag: 'داشبورد اصلی',
        },
        {
          id: 'schedule',
          title: 'گاه‌شمار و برنامه‌ریزی (Schedule)',
          desc: 'نوار هفتگی تقویم، تفکیک بازه‌های ساعتی کلاس‌ها و برنامه‌ها با خطوط رنگی و کارت‌های مرتب زمانی.',
          image: '/images/schdule.jpg',
          tag: 'گاه‌شمار زمانی',
        },
        {
          id: 'tasks',
          title: 'لیست وظایف (My Tasks)',
          desc: 'فهرست اولویت‌بندی شده تسک‌ها با برچسب‌های درسی و امتحانی، امکان علامت‌گذاری سریع و مشاهده موارد تکمیل‌شده.',
          image: '/images/task.jpg',
          tag: 'مدیریت کارها',
        },
        {
          id: 'habits',
          title: 'ردیاب عادت‌ها (Habits Tracker)',
          desc: 'کارت‌های اختصاصی عادات روزانه با آیکون‌های تفکیک‌شده، شمارنده رکورد روزهای متوالی و ثبت وضعیت روزمره.',
          image: '/images/habit.jpg',
          tag: 'زنجیره عادت',
        },
        {
          id: 'timer',
          title: 'تایمر تمرکز مطالعه (Focus Timer)',
          desc: 'شمارش معکوس دایره‌ای ۲۵ دقیقه‌ای منطبق بر تکنیک پومودورو، دکمه‌های کنترل استراحت و سوئیچ بین حالت‌ها.',
          image: '/images/timer.jpg',
          tag: 'تایمر فکوس',
        },
        {
          id: 'profile',
          title: 'پروفایل و آمار مطالعه (My Profile)',
          desc: 'مشاهده مشخصات، مجموع زمان مطالعه (Total Study)، تسک‌های انجام‌شده، تنظیمات پوسته، زبان و اعلان‌ها.',
          image: '/images/profile.jpg',
          tag: 'پروفایل کاربر',
        },
      ],
    },
    profileSection: {
      badge: 'پروفایل و آمار کاربری',
      title: 'پروفایل اختصاصی و کنترل یکپارچه تنظیمات',
      subtitle:
        'مشاهده خلاصه عملکرد و ساعات مطالعه، تعداد وظایف انجام‌شده، و تنظیمات شخصی‌سازی در یک نگاه.',
      totalStudyLabel: 'مجموع ساعات مطالعه',
      totalStudyValue: '۴ ساعت و ۱۱ دقیقه',
      tasksDoneLabel: 'تسک‌های انجام‌شده',
      tasksDoneValue: '۹ وظیفه',
      features: [
        {
          title: 'کارنامه و آمار دستاوردها',
          desc: 'ثبت دقیق و خودکار زمان‌های صرف‌شده برای مطالعه و شمارش تسک‌های تکمیل‌شده بدون نیاز به محاسبات دستی.',
        },
        {
          title: 'شخصی‌سازی پوسته و تم تاریک OLED',
          desc: 'امکان انتخاب تم مشکی مطلق برای صرفه‌جویی چشمگیر باتری در صفحات آمولد و تغییر پالت‌های رنگی برنامه.',
        },
        {
          title: 'مدیریت یادآورها و اعلانات هوشمند',
          desc: 'شخصی‌سازی زنگ هشدار تایمر و تعیین زمان دقیق اعلان‌های یادآوری عادات و سررسید تسک‌ها.',
        },
        {
          title: 'حفظ ۱۰۰٪ محلی و امن اطلاعات',
          desc: 'کلیه اطلاعات هویتی و سوابق شما صرفاً در دیتابیس امن داخلی گوشی قرار داشته و هرگز به سرور ارسال نمی‌شود.',
        },
      ],
    },
    howItWorks: {
      badge: 'مسیر گام‌به‌گام بهره‌وری',
      title: 'چگونه Emerald Life روز شما را متحول می‌کند؟',
      subtitle:
        'پنج گام ساده برای ساختن روال روزمره منسجم، حذف بی‌نظمی‌ها و دستیابی به کیفیت مطالعه بالاتر.',
      steps: [
        {
          step: '۰۱',
          title: 'ثبت وظایف و برنامه‌های روزانه',
          desc: 'کارهای درسی و شخصی خود را با مشخص کردن مبحث و زمان وارد کنید تا ذهنتان از نگرانی فراموشی خالی شود.',
        },
        {
          step: '۰۲',
          title: 'تعریف عادات سازنده',
          desc: 'عادت‌های کوچک و مهم مانند مطالعه روزانه، ورزش یا زبان را با هدف تکرار مشخص ثبت کنید.',
        },
        {
          step: '۰۳',
          title: 'شروع تایمر تمرکز مطالعه',
          desc: 'هنگام شروع درس یا کار عمیق، تایمر ۲۵ دقیقه‌ای را فعال کنید و بدون حواس‌پرتی روی هدف متمرکز شوید.',
        },
        {
          step: '۰۴',
          title: 'ثبت منظم روند پیشرفت',
          desc: 'پس از پایان هر تسک یا عادت، با یک لمس آن را علامت بزنید و تداوم زنجیره خود را حفظ نمایید.',
        },
        {
          step: '۰۵',
          title: 'تحلیل داده‌ها و رشد مستمر',
          desc: 'در پایان هفته، نمودارهای مطالعه و نرخ تکمیل کارها را بررسی کنید و برنامه‌ریزی هفته بعد را بهبود دهید.',
        },
      ],
    },
    values: {
      badge: 'ارزش‌های کلیدی ما',
      title: 'اصول بنیادین در طراحی Emerald Life',
      subtitle:
        'پنج ارزش محوری که زیربنای تصمیم‌گیری‌ها در توسعه و تجربه کاربری اپلیکیشن هستند.',
      items: [
        {
          title: 'سادگی و وضوح (Simplicity)',
          desc: 'رابط کاربری مینیمال، بی‌آلایش و بدون گزینه‌های گیج‌کننده تا کاربر بدون اتلاف وقت مستقیم به کار اصلی خود برسد.',
          tag: 'اصل اول',
        },
        {
          title: 'نظم و انسجام (Organization)',
          desc: 'سازماندهی منطقی تسک‌ها، رویدادها و عادات در یک ساختار منسجم برای رفع پراکندگی و بار ذهنی روزمره.',
          tag: 'اصل دوم',
        },
        {
          title: 'استمرار و انضباط (Consistency)',
          desc: 'پیوستگی رفتارها مهم‌تر از تلاش‌های مقطعی است. با زنجیره عادت‌ها و یادآورها، نظم شخصی به سبک زندگی تبدیل می‌شود.',
          tag: 'ستون محوری',
        },
        {
          title: 'بهره‌وری هدفمند (Productivity)',
          desc: 'ارائه ابزارهای متمرکز مانند تایمر پومودورو جهت دستیابی به بالاترین کیفیت مطالعه بدون فرسودگی ذهنی.',
          tag: 'اصل سوم',
        },
        {
          title: 'رشد و پیشرفت فردی (Personal Growth)',
          desc: 'ارائه بازخورد شفاف و واقع‌بینانه از زمان‌های صرف‌شده تا فرد گام‌به‌گام به نسخه منظم‌تر و توانمندتر خود تبدیل شود.',
          tag: 'اصل چهارم',
        },
      ],
    },
    faq: {
      badge: 'پاسخ به ابهامات متداول',
      title: 'پرسش‌های پرتکرار کاربران',
      subtitle: 'شفافیت کامل پیرامون قابلیت‌ها، سیستم‌عامل، امنیت و نحوه عملکرد Emerald Life.',
      items: [
        {
          q: 'اپلیکیشن Emerald Life دقیقاً چیست و چه کمکی می‌کند؟',
          a: 'Emerald Life یک سیستم جامع مدیریت زندگی و مطالعه برای اندروید است که ابزارهای مدیریت وظایف، ردیابی عادت‌ها، تقویم و برنامه‌ها، تایمر تمرکز مطالعه و نمودارهای تحلیلی را در یک محیط زیبا و سبک گرد هم آورده است.',
        },
        {
          q: 'Emerald Life برای چه پلتفرمی توسعه داده شده است؟',
          a: 'این اپلیکیشن به صورت اختصاصی برای سیستم‌عامل Android طراحی شده و تمرکز تیم بر روی تجربه بهینه، روان و سازگار با گوشی‌های اندرویدی است.',
        },
        {
          q: 'آیا اطلاعات من روی سرور ابری ذخیره می‌شود؟',
          a: 'خیر؛ معماری برنامه به صورت ۱۰۰٪ محلی (Local-first) است. داده‌های شما تنها در پایگاه‌داده امن داخلی دستگاه خودتان ذخیره می‌شود و حریم خصوصی شما کاملاً محفوظ است.',
        },
        {
          q: 'آیا برای استفاده نیاز به اتصال دائمی اینترنت است؟',
          a: 'خیر؛ تمامی امکانات برنامه اعم از ثبت تسک‌ها، ردیاب عادت‌ها، تقویم و تایمر تمرکز به صورت کاملاً آفلاین و بدون نیاز به اینترنت کار می‌کنند.',
        },
        {
          q: 'آیا تقویم شمسی و زبان فارسی پشتیبانی می‌شود؟',
          a: 'بله؛ اپلیکیشن به صورت کامل از زبان فارسی با فونت استاندارد وزیرمتن و همچنین زبان انگلیسی و تاریخ‌های مربوطه پشتیبانی می‌کند.',
        },
        {
          q: 'تایمر مطالعه چه امکاناتی دارد؟',
          a: 'تایمر مطالعه شامل شمارش معکوس متمرکز بر مبنای تکنیک پومودورو، امکان تعیین فواصل استراحت، زمان‌سنج باز (Stopwatch) و آلارم‌های صوتی هشدار پایان است.',
        },
        {
          q: 'آیا تم تاریک برای صرفه‌جویی باتری در دسترس است؟',
          a: 'بله؛ علاوه بر تم روشن، حالت تاریک مخصوص با زمینه مشکی خالص طراحی شده که در نمایشگرهای AMOLED مصرف باتری را به حداقل می‌رساند.',
        },
        {
          q: 'چگونه می‌توان با تیم توسعه در تماس بود؟',
          a: 'شما می‌توانید از طریق فرم تماس در انتهای همین صفحه پیام، پیشنهاد یا بازخورد خود را ارسال کنید تا مستقیماً به ایمیل توسعه‌دهنده منتقل شود.',
        },
      ],
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
      firstNameLabel: 'نام',
      firstNamePlaceholder: 'مثال: علی',
      lastNameLabel: 'نام خانوادگی',
      lastNamePlaceholder: 'مثال: رضایی',
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
        firstNameRequired: 'لطفاً نام خود را وارد کنید.',
        firstNameMin: 'نام باید حداقل ۲ حرف داشته باشد.',
        firstNameMax: 'نام نباید بیشتر از ۴۰ کاراکتر باشد.',
        lastNameRequired: 'لطفاً نام خانوادگی خود را وارد کنید.',
        lastNameMin: 'نام خانوادگی باید حداقل ۲ حرف داشته باشد.',
        lastNameMax: 'نام خانوادگی نباید بیشتر از ۴۰ کاراکتر باشد.',
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
          body: 'هنگامی که از طریق فرم تماس این وب‌سایت پیامی ارسال می‌کنید، نام، نام خانوادگی، ایمیل، موضوع و متن پیام شما جهت پاسخگویی به ایمیل رسمی توسعه‌دهنده ارسال می‌شود و در پایگاه‌های بازاریابی شخص ثالث ذخیره نمی‌گردد.',
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
          body: 'نام تجاری Emerald Life، نشان‌های گرافیکی، کدهای برنامه و طراحی‌های موجود متعلق به توسعه‌دهنده بوده و هرگونه بازنشر بدون مجوز ممنوع است.',
        },
        {
          heading: '۳. توزیع و دریافت نرم‌افزار',
          body: 'توصیه می‌شود برنامه را تنها از مراجع رسمی معرفی‌شده دریافت کنید تا از اصالت و امنیت بسته نرم‌افزاری اطمینان حاصل شود.',
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
      screenshots: 'Screenshots',
      profile: 'User Profile',
      howItWorks: 'How It Works',
      values: 'Our Key Values',
      faq: 'FAQ',
      contact: 'Contact Us',
      downloadApp: 'Download App',
      account: 'Account',
      signOut: 'Sign Out',
      themeToggle: 'Toggle Theme',
      langToggle: 'فارسی',
      menuOpen: 'Open Menu',
      menuClose: 'Close Menu',
    },
    hero: {
      badge: 'Comprehensive Life & Study Management App for Android',
      title: 'Take Control of Your Life.',
      titleHighlight: 'Make Every Day Count.',
      subtitle:
        'Emerald Life is a local-first Android companion designed to organize daily tasks, sustain healthy habits, schedule your days, focus with study timers, and reflect on genuine personal productivity.',
      exploreBtn: 'Explore App Features',
      screenshotsBtn: 'View App Interface',
      platformNotice: 'Built Exclusively for Android • 100% Local-First Data Storage',
      stats: {
        tasksLabel: 'Task Management',
        tasksSub: 'Categorized priority lists',
        habitsLabel: 'Habit Tracker',
        habitsSub: 'Streak counter & goals',
        studyLabel: 'Study Timer',
        studySub: 'Deep focus with Pomodoro',
      },
    },
    features: {
      badge: 'Real Application Features',
      title: 'Comprehensive, Unified Tools in One Clean Experience',
      subtitle:
        'All the essentials you need to streamline daily life and study sessions—fast, offline, and distraction-free.',
      items: [
        {
          id: 'tasks',
          title: 'Task Management',
          desc: 'Create and organize tasks with subject categories, deadlines, and quick completion tracking.',
          tag: 'Organization',
          bullets: [
            'Categorize by study subjects, personal goals, and exams',
            'Assign urgent and normal priorities',
            'Instant check-off and clean completion archive',
          ],
        },
        {
          id: 'habits',
          title: 'Habit Tracking',
          desc: 'Build positive daily routines with automatic streak counting, goal frequencies, and progress feedback.',
          tag: 'Consistency',
          bullets: [
            'Automatic streak tracking for consecutive days',
            'Customizable icons and color indicators per habit',
            'Weekly and monthly completion overview',
          ],
        },
        {
          id: 'schedule',
          title: 'Schedule Management',
          desc: 'Keep classes, study blocks, and personal appointments organized across a structured weekly calendar.',
          tag: 'Time Planning',
          bullets: [
            'Horizontal week calendar navigation',
            'Color-coded timeline blocks for classes and events',
            'Clean daily timeline without clutter',
          ],
        },
        {
          id: 'timer',
          title: 'Focus Timer & Study Sessions',
          desc: '25-minute Pomodoro focus timer with smart short and long break intervals to maximize retention.',
          tag: 'Deep Focus',
          bullets: [
            'Countdown, open stopwatch, and interval timer modes',
            'Audio alerts signaling start and break periods',
            'Direct on-device study session history',
          ],
        },
        {
          id: 'analytics',
          title: 'Progress Analytics',
          desc: 'Visual metrics illustrating your study hours, task completion ratio, and habit consistency over time.',
          tag: 'Insight',
          bullets: [
            'Weekly and monthly study duration charts',
            'Completed vs pending task success rates',
            '100% local calculation without external cloud telemetry',
          ],
        },
        {
          id: 'notifications',
          title: 'Local Notifications',
          desc: 'Timely reminders for impending task deadlines, habit check-ins, and study break intervals.',
          tag: 'Discipline',
          bullets: [
            'Customizable reminder time per task or habit',
            'Functions reliably without internet connectivity',
            'Selectable audio chime alerts',
          ],
        },
        {
          id: 'personalization',
          title: 'Personalization & Themes',
          desc: 'Support for dark OLED mode to save battery life, along with tailored color themes.',
          tag: 'Flexibility',
          bullets: [
            'Pure black Ultra Dark OLED theme and standard light theme',
            'Full support for English LTR and Persian RTL layouts',
            'Customizable category colors and cards',
          ],
        },
      ],
    },
    screenshots: {
      badge: 'Actual App Screenshots',
      title: 'Explore the Real Emerald Life Interface',
      subtitle:
        'Authentic screenshots captured directly from our running Android application showcasing real screens and features.',
      items: [
        {
          id: 'home',
          title: 'Dashboard Overview (Home)',
          desc: 'Unified daily command center showing pending tasks, habit consistency, today’s schedule, and overall daily progress bar.',
          image: '/images/home.jpg',
          tag: 'Dashboard',
        },
        {
          id: 'schedule',
          title: 'Weekly Schedule (Calendar)',
          desc: 'Weekly timeline calendar featuring horizontal day selector, color-coded class hours, and organized daily events.',
          image: '/images/schdule.jpg',
          tag: 'Schedule',
        },
        {
          id: 'tasks',
          title: 'Task Management (My Tasks)',
          desc: 'Prioritized list of tasks with subject tags (Study, Exam), checkmarks, and one-tap completion controls.',
          image: '/images/task.jpg',
          tag: 'Tasks',
        },
        {
          id: 'habits',
          title: 'Habit Tracker (Habits)',
          desc: 'Daily routine cards with individual icons, consecutive streak counters, and daily completion toggle.',
          image: '/images/habit.jpg',
          tag: 'Habits',
        },
        {
          id: 'timer',
          title: 'Focus Study Timer (Pomodoro)',
          desc: '25:00 circular focus timer based on Pomodoro technique with break controls, countdown mode, and stopwatch.',
          image: '/images/timer.jpg',
          tag: 'Focus Timer',
        },
        {
          id: 'profile',
          title: 'Profile & Settings Overview (My Profile)',
          desc: 'Manage profile details, total study hours (4h 11m), tasks completed, OLED dark mode, and notifications.',
          image: '/images/profile.jpg',
          tag: 'My Profile',
        },
      ],
    },
    profileSection: {
      badge: 'User Profile & Settings',
      title: 'Personal Profile & Settings Hub',
      subtitle:
        'Review total study duration, completed tasks count, and customize appearance and reminders in one unified screen.',
      totalStudyLabel: 'Total Study Time',
      totalStudyValue: '4h 11m',
      tasksDoneLabel: 'Tasks Completed',
      tasksDoneValue: '9 Tasks',
      features: [
        {
          title: 'Study & Achievement Metrics',
          desc: 'Automatic on-device tracking of all focus hours and completed task counts without cloud dependency.',
        },
        {
          title: 'Appearance & Dark OLED Mode',
          desc: 'Switch to true black AMOLED dark mode to extend battery longevity and personalize accent colors.',
        },
        {
          title: 'Smart Reminders & Notifications',
          desc: 'Configure custom audio alarms and reminder schedules for routine habits and urgent task deadlines.',
        },
        {
          title: '100% Private & Stored Locally',
          desc: 'All profile preferences and activity records stay exclusively inside your Android device storage.',
        },
      ],
    },
    howItWorks: {
      badge: 'Step-by-Step Path',
      title: 'How Emerald Life Powers Your Day',
      subtitle:
        'Five straightforward steps to eliminate chaos, build structured daily routines, and enhance study quality.',
      steps: [
        {
          step: '01',
          title: 'Record Tasks & Commitments',
          desc: 'Add your study tasks and daily responsibilities with specific dates and topics to clear your mental bandwidth.',
        },
        {
          step: '02',
          title: 'Set Daily Habits',
          desc: 'Define simple yet high-impact habits like reading, working out, or vocabulary review with weekly goals.',
        },
        {
          step: '03',
          title: 'Start Deep Focus Sessions',
          desc: 'Activate the 25-minute Pomodoro timer whenever studying or doing deep work to maintain sustained concentration.',
        },
        {
          step: '04',
          title: 'Track Routine Streaks',
          desc: 'Check off habits and tasks as you complete them throughout the day, reinforcing your consistency streak.',
        },
        {
          step: '05',
          title: 'Review Insights & Grow',
          desc: 'Examine weekly analytics to spot patterns, recognize productivity peaks, and fine-tune your schedule.',
        },
      ],
    },
    values: {
      badge: 'Our Key Values',
      title: 'Foundational Pillars of Emerald Life',
      subtitle:
        'Five core values guiding the design, architecture, and user experience of our application.',
      items: [
        {
          title: 'Simplicity & Clarity',
          desc: 'Minimalist, distraction-free interface design ensuring your attention stays directly on your goals and studies.',
          tag: 'Core Value 1',
        },
        {
          title: 'Structure & Organization',
          desc: 'Harmonious integration of tasks, calendar events, and habits to eliminate mental friction and daily clutter.',
          tag: 'Core Value 2',
        },
        {
          title: 'Consistency & Discipline',
          desc: 'Daily consistency is far more powerful than sporadic bursts. We celebrate steady progress through habit streaks.',
          tag: 'Center Anchor',
        },
        {
          title: 'Targeted Productivity',
          desc: 'Purpose-built focus timers and interval pacing designed to maximize study output while preventing burnout.',
          tag: 'Core Value 3',
        },
        {
          title: 'Personal Growth',
          desc: 'Transparent on-device feedback on study hours and habit adherence to nurture steady personal improvement.',
          tag: 'Core Value 4',
        },
      ],
    },
    faq: {
      badge: 'Frequently Asked Questions',
      title: 'Common Questions & Answers',
      subtitle: 'Complete clarity regarding Emerald Life features, Android compatibility, and privacy.',
      items: [
        {
          q: 'What is Emerald Life and how does it help?',
          a: 'Emerald Life is an integrated personal management and study OS for Android that brings together task management, habit tracking, scheduling, focus timers, and progress analytics into a clean, lightweight app.',
        },
        {
          q: 'Which platform is Emerald Life developed for?',
          a: 'Emerald Life is built exclusively for Android devices, optimized for responsive performance and native Android notifications.',
        },
        {
          q: 'Is my data uploaded to cloud servers?',
          a: 'No. The app follows a strict local-first architecture. All your tasks, study logs, and habits remain strictly stored on your Android device’s local SQLite database.',
        },
        {
          q: 'Does Emerald Life work offline?',
          a: 'Yes. Every module, including the calendar, task lists, habit streaks, and focus timer, works 100% offline without requiring internet access.',
        },
        {
          q: 'Does it support dark mode for OLED screens?',
          a: 'Yes. In addition to a clean light mode, Emerald Life features a true black OLED dark mode to maximize battery longevity during prolonged study sessions.',
        },
        {
          q: 'What modes are available in the Study Timer?',
          a: 'The focus module includes a 25-minute countdown based on the Pomodoro technique, custom interval breaks, and a continuous stopwatch mode.',
        },
        {
          q: 'Does the application support multiple languages?',
          a: 'Yes, Emerald Life fully supports Persian with authentic Vazirmatn typography and Gregorian/English layouts with responsive RTL and LTR support.',
        },
        {
          q: 'How can I reach the development team?',
          a: 'You can submit feedback, inquiries, or suggestions directly via the contact form on this website; your message is delivered securely to our official inbox.',
        },
      ],
    },
    authModal: {
      title: 'Account Sign In',
      subtitle: 'Connect with your official Google account for support and feedback coordination.',
      googleBtn: 'Sign In with Google',
      privacyNote: 'Authentication is handled securely via Google OAuth 2.0. We never access your password.',
      close: 'Close Window',
      userGreeting: 'Welcome back',
      userEmail: 'Account Email:',
      statusActive: 'Active Session',
    },
    contact: {
      badge: 'Direct Feedback & Support',
      title: 'Get in Touch with the Team',
      subtitle: 'Share your suggestions, feedback, error reports, or ideas regarding Emerald Life.',
      firstNameLabel: 'First Name',
      firstNamePlaceholder: 'e.g. John',
      lastNameLabel: 'Last Name',
      lastNamePlaceholder: 'e.g. Doe',
      nameLabel: 'Full Name',
      namePlaceholder: 'e.g. John Doe',
      emailLabel: 'Valid Email Address',
      emailPlaceholder: 'name@example.com',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'Feature request, feedback, or question...',
      messageLabel: 'Message',
      messagePlaceholder: 'Write your message, feedback, or suggestion here...',
      submitBtn: 'Send Secure Message',
      submittingBtn: 'Sending Message...',
      validationErrors: {
        firstNameRequired: 'Please enter your first name.',
        firstNameMin: 'First name must be at least 2 characters.',
        firstNameMax: 'First name must not exceed 40 characters.',
        lastNameRequired: 'Please enter your last name.',
        lastNameMin: 'Last name must be at least 2 characters.',
        lastNameMax: 'Last name must not exceed 40 characters.',
        nameRequired: 'Please enter your name.',
        nameMin: 'Name must be at least 2 characters.',
        nameMax: 'Name must not exceed 80 characters.',
        emailRequired: 'Please enter your email address.',
        emailInvalid: 'Invalid email address format.',
        emailMax: 'Email must not exceed 120 characters.',
        subjectRequired: 'Please enter a message subject.',
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
          body: 'When you submit a message through this website’s contact form, your first name, last name, email, subject, and message are transmitted directly to the developer’s inbox to respond to your inquiry and are never shared with marketing brokers.',
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
          body: 'By using Emerald Life and this website, you agree to these terms of service and commit to lawful, personal use of the software.',
        },
        {
          heading: '2. Intellectual Property',
          body: 'The Emerald Life brand, graphics, logos, source code, and design assets are the exclusive property of the developer and are protected by applicable copyright laws.',
        },
        {
          heading: '3. Software Distribution',
          body: 'We advise users to acquire the application only from verified, official sources to ensure authenticity and safety.',
        },
        {
          heading: '4. Disclaimer',
          body: 'Emerald Life is an organization and time-management utility provided as-is, without medical or psychological treatment claims.',
        },
      ],
    },
  },
};
