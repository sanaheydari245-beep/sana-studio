export type Language = 'fa' | 'en';

export interface TranslationSchema {
  nav: {
    home: string;
    about: string;
    products: string;
    principles: string;
    roadmap: string;
    faq: string;
    contact: string;
    themeToggle: string;
    langToggle: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaProducts: string;
    ctaAbout: string;
    statLocalFirst: string;
    statLocalFirstSub: string;
    statScalable: string;
    statScalableSub: string;
    statPrivacy: string;
    statPrivacySub: string;
  };
  about: {
    badge: string;
    title: string;
    lead: string;
    p1: string;
    p2: string;
    p3: string;
    pillarsTitle: string;
    pillars: Array<{
      title: string;
      desc: string;
    }>;
  };
  products: {
    badge: string;
    title: string;
    subtitle: string;
    statusInDev: string;
    statusReleased: string;
    viewDetails: string;
    closeDetails: string;
    targetPlatforms: string;
    verifiedFeaturesTitle: string;
    useCasesTitle: string;
    techHighlightsTitle: string;
    downloadTitle: string;
    downloadNotAvailableNote: string;
    featuredBadge: string;
  };
  featured: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    specsTitle: string;
    architectureTitle: string;
    architectureDesc: string;
    ctaDetails: string;
  };
  principles: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      desc: string;
    }>;
  };
  vision: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    points: Array<{
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
    brandName: string;
    brandTagline: string;
    quickLinksTitle: string;
    productsTitle: string;
    privacyNote: string;
    copyright: string;
    allRightsReserved: string;
    languageLabel: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  fa: {
    nav: {
      home: 'صفحه اصلی',
      about: 'معرفی استودیو',
      products: 'محصولات',
      principles: 'اصول و ارزش‌ها',
      roadmap: 'مسیر توسعه',
      faq: 'پرسش‌های متداول',
      contact: 'تماس با ما',
      themeToggle: 'تغییر حالت نور (روشن / تاریک)',
      langToggle: 'English',
      menuOpen: 'باز کردن منو',
      menuClose: 'بستن منو',
    },
    hero: {
      badge: 'استودیو طراحی و مهندسی نرم‌افزار',
      title: 'ایده‌ها را به محصول تبدیل می‌کنیم.',
      subtitle:
        'Sana Studio فضایی برای طراحی و توسعه محصولات دیجیتال با تمرکز بر سادگی، کاربردپذیری و تجربه کاربری بهتر است.',
      ctaProducts: 'مشاهده محصول',
      ctaAbout: 'آشنایی با برند',
      statLocalFirst: 'Local-First',
      statLocalFirstSub: 'پایگاه‌داده محلی آفلاین بدون وابستگی ابری',
      statScalable: 'توسعه پایدار',
      statScalableSub: 'معماری استاندارد و آماده گسترش',
      statPrivacy: 'حفظ حریم خصوصی',
      statPrivacySub: 'بدون ردیاب‌های تجاری و بدون تبلیغات',
    },
    about: {
      badge: 'درباره ما',
      title: 'Sana Studio چیست و چه هدفی دارد؟',
      lead: 'یک استودیوی مستقل برای ساخت ابزارهای نرم‌افزاری کاربردی، بدون زوائد اضافه و متمرکز بر ارزش واقعی برای کاربر.',
      p1: 'سنا استودیو (Sana Studio) بر پایه یک اصل بنیادین شکل گرفته است: ابزارهای روزمره باید سریع، سبک و بدون پیچیدگی‌های بی‌مورد باشند. در دورانی که اغلب برنامه‌ها با اعلان‌های مداوم و جمع‌آوری بی‌رویه اطلاعات همراه شده‌اند، ما محصولاتی می‌سازیم که در خدمت تمرکز، انضباط فردی و آرامش کاربر باشند.',
      p2: 'تمرکز اصلی استودیو بر تولید ابزارهای کاربردی با رویکرد محلی (Local-first) است؛ به این معنی که داده‌های شما روی حافظه اختصاصی دستگاه شما باقی می‌مانند و برنامه بدون نیاز به اینترنت بهترین عملکرد را ارائه می‌دهد.',
      p3: 'ما کیفیت و دقت در پیاده‌سازی را بر کمیت ترجیح می‌دهیم و هر محصول را بر پایه حل یک نیاز واقعی و ملموس، با کد تمیز و به دور از ادعاهای اغراق‌آمیز توسعه می‌دهیم.',
      pillarsTitle: 'ارکان بنیادین طراحی در استودیو سنا',
      pillars: [
        {
          title: 'سادگی در تجربه (Simplicity)',
          desc: 'حذف عناصر غیرضروری؛ رابط کاربری باید در اولین نگاه قابل فهم و به دور از سردرگمی باشد.',
        },
        {
          title: 'کاربردپذیری واقعی (Usability)',
          desc: 'تمرکز بر اثربخشی در شرایط استفاده روزمره، بدون تحمیل روندهای پیچیده به کاربر.',
        },
        {
          title: 'معماری پایدار و آفلاین (Reliability)',
          desc: 'کارکرد مستقل از شبکه اینترنت و صیانت از داده‌ها بر پایه پایگاه‌داده محلی.',
        },
      ],
    },
    products: {
      badge: 'محصولات استودیو',
      title: 'محصولات Sana Studio',
      subtitle: 'Emerald Life یک اپلیکیشن اندرویدی برای مدیریت زندگی و مطالعه است.',
      statusInDev: 'در حال توسعه برای اندروید',
      statusReleased: 'منتشرشده',
      viewDetails: 'مشاهده مشخصات کامل',
      closeDetails: 'بستن پنجره',
      targetPlatforms: 'سیستم‌عامل مقصد:',
      verifiedFeaturesTitle: 'امکانات تأییدشده نسخه اندروید:',
      useCasesTitle: 'موارد کاربرد:',
      techHighlightsTitle: 'فناوری‌های کلیدی:',
      downloadTitle: 'وضعیت انتشار نسخه اندروید:',
      downloadNotAvailableNote:
        'این اپلیکیشن اندرویدی هم‌اکنون در مرحله توسعه فعال و بهینه‌سازی قرار دارد و نسخه نهایی آن هنوز منتشر نشده است. پس از تکمیل بررسی‌ها، لینک رسمی دانلود اندروید در این قسمت قرار خواهد گرفت.',
      featuredBadge: 'اپلیکیشن اختصاصی اندروید',
    },
    featured: {
      badge: 'محصول رسمی در حال توسعه',
      title: 'Emerald Life',
      subtitle: 'اپلیکیشن اندرویدی مدیریت درس و زندگی بر بستر فلاتر و دیتابیس محلی SQLite',
      description:
        'اپلیکیشن Emerald Life محصول رسمی Sana Studio، یک اپلیکیشن اندرویدی برای مدیریت زندگی و مطالعه است. این محصول مدیریت تکالیف درسی، تقویم و برنامه هفتگی، ردیابی زنجیره استمرار عادات (Habit Streak) و تایمر تمرکز پومودورو را در یک محیط کاملاً آفلاین اندرویدی گردهم آورده است.',
      specsTitle: 'قابلیت‌های پیاده‌سازی‌شده در سورس پروژه:',
      architectureTitle: 'معماری ۱۰۰٪ محلی (Local-first):',
      architectureDesc:
        'تمام داده‌ها اعم از وظایف، عادات و آمارهای مطالعه در پایگاه‌داده محلی SQLite دستگاه اندرویدی شما نگهداری می‌شوند؛ بدون نیاز به اینترنت و بدون ارسال داده‌ها به هیچ سرور خارجی.',
      ctaDetails: 'مشاهده مشخصات Emerald Life',
    },
    principles: {
      badge: 'اصول و تعهدات',
      title: 'ارزش‌های کلیدی در تمام محصولات سنا',
      subtitle:
        'اصولی شفاف و غیرقابل چشم‌پوشی که مبنای طراحی، تجربه کاربری و کدنویسی در استودیو سنا هستند.',
      items: [
        {
          title: 'سادگی در استفاده',
          desc: 'نرم‌افزار کارآمد نیاز به آموزش پیچیده ندارد؛ کوتاه‌ترین مسیر برای انجام کار طراحی می‌شود.',
        },
        {
          title: 'طراحی کاربرمحور',
          desc: 'نیاز واقعی کاربر همواره بر ترفندهای نگه‌داشت اجباری یا الگوریتم‌های جلب توجه اولویت دارد.',
        },
        {
          title: 'توجه به کیفیت و کارایی',
          desc: 'کدنویسی تمیز، مصرف بهینه باتری و رم، و اجرای روان و سریع در تمام بخش‌ها.',
        },
        {
          title: 'توسعه و تکامل مستمر',
          desc: 'بهبود گام‌به‌گام و اصلاح منظم بر اساس بازخوردها و آزمون روی دستگاه‌های واقعی.',
        },
        {
          title: 'حفظ حریم خصوصی کاربران',
          desc: 'اطلاعات شما کاملاً شخصی است. ما هیچ اطلاعات غیرضروری را جمع‌آوری نمی‌کنیم و بر معماری Local-first تکیه داریم.',
        },
      ],
    },
    vision: {
      badge: 'مسیر توسعه',
      title: 'آینده محصولات Sana Studio',
      subtitle: 'تعهد به پایداری، توسعه مرحله‌به‌مرحله و خلق ابزارهای باکیفیت برای تمرکز و یادگیری',
      description:
        'رویکرد استودیو سنا بر ساخت نرم‌افزارهای هدفمند، سبک و خصوصی استوار است. مسیر پیش‌رو شامل تکمیل پایدار محصول فعلی و در آینده، طراحی ابزارهای تکمیلی بر پایه همین اصول خواهد بود.',
      points: [
        {
          title: 'تکمیل و انتشار پایدار نسخه اندروید Emerald Life',
          desc: 'انجام تست‌های عملکردی، بهینه‌سازی رابط کاربری روی دستگاه‌های اندرویدی و آماده‌سازی برای انتشار عمومی در مارکت‌های رسمی.',
        },
        {
          title: 'توسعه ابزارهای متمرکز بر حریم خصوصی',
          desc: 'تحقیق و پیاده‌سازی ابزارهای دیجیتال جدید بر پایه معماری محلی (Local-first) و عدم وابستگی به سرورهای خارجی.',
        },
        {
          title: 'بهینه‌سازی مستمر تجربه کاربری',
          desc: 'ارتقای پیوسته سرعت، کاهش مصرف منابع سخت‌افزاری و طراحی محیط‌های بدون حواس‌پرتی.',
        },
      ],
    },
    faq: {
      badge: 'پرسش‌های متداول',
      title: 'سوالاتی که ممکن است مطرح باشند',
      subtitle: 'پاسخ‌های شفاف و صادقانه درباره استودیو، اپلیکیشن و خط‌مشی‌ها',
      items: [
        {
          q: 'Sana Studio (استودیو سنا) چیست؟',
          a: 'استودیو سنا یک فضای مستقل توسعه نرم‌افزار است که بر ساخت ابزارهای دیجیتال کاربردی، محلی (Local-first) و متمرکز بر بهره‌وری، مطالعه و سبک زندگی تمرکز دارد.',
        },
        {
          q: 'محصولات این استودیو برای چه سیستم‌عاملی هستند و از کجا می‌توان دریافت کرد؟',
          a: 'اپلیکیشن Emerald Life به صورت اختصاصی برای سیستم‌عامل Android توسعه داده شده است. پس از اتمام فاز توسعه و بررسی‌های کیفی، نسخه اندروید از طریق مارکت‌های رسمی از جمله کافه‌بازار و وبسایت رسمی در دسترس قرار خواهد گرفت. در حال حاضر نسخه دیگری برای سایر پلتفرم‌ها وجود ندارد.',
        },
        {
          q: 'آیا اپلیکیشن‌ها رایگان هستند؟',
          a: 'بخش‌های اصلی و پایه به صورت دسترسی آزاد طراحی می‌شوند. خط‌مشی استودیو پرهیز از اشتراک‌های اجباری و حفظ دسترسی آسان برای کاربران است.',
        },
        {
          q: 'چگونه می‌توان با استودیو ارتباط برقرار کرد؟',
          a: 'شما می‌توانید از طریق فرم تماس انتهای همین صفحه یا ارسال ایمیل مستقیم به sanaheydari245@gmail.com نظرات و پیشنهادات خود را مطرح کنید.',
        },
        {
          q: 'آیا در آینده محصولات دیگری اضافه خواهند شد؟',
          a: 'بله؛ با تکمیل و انتشار Emerald Life، برنامه‌ها و ابزارهای جدیدی که با استانداردها و اصول استودیو همخوانی داشته باشند، به مرور معرفی و به سایت اضافه خواهند شد.',
        },
      ],
    },
    contact: {
      badge: 'ارتباط مستقیم',
      title: 'با ما در ارتباط باشید',
      subtitle: 'نظرات، پیشنهادات یا ایده‌های شما برای بهبود محصولات Sana Studio برای ما ارزشمند است.',
      nameLabel: 'نام و نام خانوادگی',
      namePlaceholder: 'مثال: علی رضایی',
      emailLabel: 'نشانی ایمیل',
      emailPlaceholder: 'name@example.com',
      subjectLabel: 'موضوع پیام',
      subjectPlaceholder: 'درباره محصول، بازخورد یا پیشنهاد...',
      messageLabel: 'متن پیام شما',
      messagePlaceholder: 'پیام یا نظر خود را اینجا بنویسید...',
      submitBtn: 'ارسال پیام',
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
      successMessage: 'با تشکر از پیام شما. پیام مستقیماً به نشانی sanaheydari245@gmail.com ارسال شد و به زودی به ایمیل شما پاسخ خواهیم داد.',
      errorTitle: 'خطا در ارسال پیام',
      errorMessage: 'ارسال پیام با سرویس ایمیل ناموفق بود. لطفاً مجدداً تلاش کنید یا مستقیماً از طریق ایمیل پیام خود را ارسال فرمایید.',
      rateLimitWarning: 'لطفاً پیش از ارسال پیام جدید، ۶۰ ثانیه صبر فرمایید.',
      unconfiguredNotice: 'کلیدهای اتصال EmailJS در متغیرهای محیطی (.env) تنظیم نشده‌اند.',
      unconfiguredSetupHint: 'تا زمان تنظیم کلیدها، می‌توانید از طریق دکمه زیر مستقیماً با نرم‌افزار ایمیل خود پیام ارسال نمایید.',
      fallbackMailBtn: 'ارسال مستقیم از طریق ایمیل',
      sendAnotherBtn: 'ارسال پیام جدید',
      tryAgainBtn: 'تلاش مجدد',
      clientActionNotice:
        'ارسال امن و مستقیم: پیام شما از طریق ارتباط امن SSL با سرویس EmailJS مستقیماً به صندوق ایمیل استودیو منتقل می‌شود و هیچ اطلاعاتی در پایگاه‌داده ذخیره نمی‌گردد.',
      directEmailLabel: 'نشانی ایمیل رسمی استودیو:',
      directEmailValue: 'sanaheydari245@gmail.com',
      statusNote: 'پاسخ‌ها در اسرع وقت به ایمیل شما ارسال خواهد شد.',
    },
    footer: {
      brandName: 'Sana Studio | استودیو سنا',
      brandTagline: 'ایده‌ها را به محصول تبدیل می‌کنیم.',
      quickLinksTitle: 'بخش‌های سایت',
      productsTitle: 'محصولات',
      privacyNote: 'توسعه‌یافته با تمرکز بر سادگی، تجربه کاربری مستقل و معماری داده‌های محلی.',
      copyright: 'تمامی حقوق برای برند Sana Studio محفوظ است.',
      allRightsReserved: 'طراحی تک‌صفحه‌ای اختصاصی با پالت رنگی Midnight & Electric Blue.',
      languageLabel: 'زبان نمایش:',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Studio',
      products: 'Products',
      principles: 'Principles',
      roadmap: 'Roadmap',
      faq: 'FAQ',
      contact: 'Contact',
      themeToggle: 'Toggle Light / Dark Mode',
      langToggle: 'فارسی',
      menuOpen: 'Open Navigation Menu',
      menuClose: 'Close Navigation Menu',
    },
    hero: {
      badge: 'Software Design & Engineering Studio',
      title: 'Transforming Ideas into Digital Products.',
      subtitle:
        'Sana Studio is a dedicated space for crafting digital tools focused on simplicity, usability, and thoughtful user experiences.',
      ctaProducts: 'View Product',
      ctaAbout: 'About the Studio',
      statLocalFirst: 'Local-First',
      statLocalFirstSub: 'On-device SQLite database with zero cloud tethering',
      statScalable: 'Sustainable Design',
      statScalableSub: 'Modular architecture ready for growth',
      statPrivacy: 'User Privacy',
      statPrivacySub: 'Zero commercial trackers and zero ads',
    },
    about: {
      badge: 'About Us',
      title: 'What is Sana Studio and What Drives Us?',
      lead: 'An independent digital studio crafting purposeful software tools without bloat, anchored in honest utility.',
      p1: 'Sana Studio was founded on a simple truth: everyday software should be nimble, quiet, and straightforward. While contemporary applications increasingly lean into intrusive notifications and data collection, we build utilities that foster tranquility and productive focus.',
      p2: 'Our core focus centers on local-first digital utilities; all primary data remains stored securely on your hardware and functions seamlessly without internet connectivity.',
      p3: 'We prioritize craftsmanship and clean execution over sheer volume, engineering each tool around genuine real-world needs without exaggerated claims.',
      pillarsTitle: 'Our Foundational Design Pillars',
      pillars: [
        {
          title: 'Simplicity in Experience',
          desc: 'Omitting superfluous buttons and clutter; interfaces that feel immediately intuitive.',
        },
        {
          title: 'Genuine Usability',
          desc: 'Designed for daily routines under real-world constraints, without unnecessary friction.',
        },
        {
          title: 'Resilient Offline Architecture',
          desc: 'Rock-solid offline durability and client-side database independence on your device.',
        },
      ],
    },
    products: {
      badge: 'Studio Products',
      title: 'Products by Sana Studio',
      subtitle: 'Emerald Life is an Android app for life and study management.',
      statusInDev: 'In Development for Android',
      statusReleased: 'Released',
      viewDetails: 'View Full Specifications',
      closeDetails: 'Close Panel',
      targetPlatforms: 'Supported Platform:',
      verifiedFeaturesTitle: 'Verified Android Capabilities:',
      useCasesTitle: 'Intended Use Cases:',
      techHighlightsTitle: 'Tech Highlights:',
      downloadTitle: 'Android Release & Download Status:',
      downloadNotAvailableNote:
        'This Android application is currently in active development and internal testing. Official Android release builds will be made accessible through verified channels upon completing quality milestones.',
      featuredBadge: 'Dedicated Android Application',
    },
    featured: {
      badge: 'Official Project in Active Development',
      title: 'Emerald Life',
      subtitle: 'Android academic & habit planner built on Flutter and local SQLite',
      description:
        'Emerald Life is an Android app for life and study management created under Sana Studio. Designed for students and learners, it brings together academic task management, weekly timetables, habit streak tracking, and an ambient Pomodoro focus timer into an offline Android environment.',
      specsTitle: 'Core Capabilities Verified in Source Code:',
      architectureTitle: '100% Local-First Architecture:',
      architectureDesc:
        'All schedules, habits, notes, and study analytics reside exclusively within your Android device’s SQLite database. No mandatory cloud accounts, no third-party data tracking, and uninterrupted offline access.',
      ctaDetails: 'View Emerald Life Specs',
    },
    principles: {
      badge: 'Guiding Values',
      title: 'Core Commitments in Every Sana Product',
      subtitle:
        'The non-negotiable principles that shape our conceptualization, UI/UX design, and codebase architecture.',
      items: [
        {
          title: 'Simplicity in Use',
          desc: 'Well-crafted tools require no cumbersome manuals. The pathway to task completion should be clear and minimal.',
        },
        {
          title: 'User-Centric Architecture',
          desc: 'User intent always takes precedence over aggressive retention tricks or algorithmic engagement traps.',
        },
        {
          title: 'Commitment to Quality',
          desc: 'Lean execution, minimal battery consumption, low memory footprint, and swift load times.',
        },
        {
          title: 'Continuous Evolution',
          desc: 'Direct responsiveness to user feedback and iterative refinement based on actual usage patterns.',
        },
        {
          title: 'User Privacy First',
          desc: 'Your data is strictly yours. We design with a local-first philosophy and reject unnecessary telemetry.',
        },
      ],
    },
    vision: {
      badge: 'Roadmap & Horizon',
      title: 'Development Path for Sana Studio',
      subtitle: 'A steady commitment to quality, step-by-step progress, and privacy-first digital tools',
      description:
        'Our philosophy is anchored in crafting thoughtful, local-first software. Our journey begins with finalizing Emerald Life and laying the groundwork for future focused tools.',
      points: [
        {
          title: 'Stable Release of Emerald Life on Android',
          desc: 'Performance optimizations, multi-device Android validation, and preparing for official market rollout.',
        },
        {
          title: 'Engineering Privacy-First Digital Tools',
          desc: 'Researching and developing new utilities rooted in local-first architecture and zero cloud tethering.',
        },
        {
          title: 'Refining Offline User Experience',
          desc: 'Continuous performance tuning, lightweight footprints, and tranquil, distraction-free workspaces.',
        },
      ],
    },
    faq: {
      badge: 'FAQ',
      title: 'Frequently Asked Questions',
      subtitle: 'Transparent insights into our studio philosophy, app roadmap, and distribution policies',
      items: [
        {
          q: 'What is Sana Studio?',
          a: 'Sana Studio is an independent software brand focused on creating clean, local-first digital utilities designed to empower students and professionals in their learning and daily routines.',
        },
        {
          q: 'Which operating system is the application built for, and where can it be downloaded?',
          a: 'Emerald Life is developed exclusively for Android. Official Android releases will be published via verified distribution channels such as Cafe Bazaar and the studio’s official website upon reaching stable status. No desktop or non-Android versions exist.',
        },
        {
          q: 'Are the applications free of charge?',
          a: 'Core offline functionality is built to be accessible without paywalls or compulsory subscription barriers. User privacy and feature independence remain paramount.',
        },
        {
          q: 'How can I contact the studio with feedback?',
          a: 'You can reach out through the contact form on this page or send an email directly to sanaheydari245@gmail.com.',
        },
        {
          q: 'Will additional products be added in the future?',
          a: 'Yes. As Emerald Life reaches its stable release milestones, new utilities matching our studio standards will be introduced over time.',
        },
      ],
    },
    contact: {
      badge: 'Direct Contact',
      title: 'Connect with Sana Studio',
      subtitle: 'We welcome honest feedback, questions, and thoughtful suggestions from our community.',
      nameLabel: 'Full Name',
      namePlaceholder: 'e.g. Alex Morgan',
      emailLabel: 'Email Address',
      emailPlaceholder: 'name@example.com',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'Regarding app development, collaboration, or feedback...',
      messageLabel: 'Your Message',
      messagePlaceholder: 'Please share your thoughts, questions, or ideas...',
      submitBtn: 'Send Message',
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
      successMessage: 'Thank you for reaching out. Your message has been safely delivered to sanaheydari245@gmail.com and we will reply to your email shortly.',
      errorTitle: 'Failed to Send Message',
      errorMessage: 'The message could not be delivered. Please try again or reach out directly using the official email address.',
      rateLimitWarning: 'Please wait 60 seconds before sending another message.',
      unconfiguredNotice: 'EmailJS keys are not yet configured in environment variables (.env).',
      unconfiguredSetupHint: 'You can use the direct email button below or follow EMAILJS_SETUP_GUIDE.md to activate instant web delivery.',
      fallbackMailBtn: 'Send via Direct Email',
      sendAnotherBtn: 'Send Another Message',
      tryAgainBtn: 'Try Again',
      clientActionNotice:
        'Secure direct dispatch: Your message is encrypted via SSL and delivered through EmailJS straight to the studio inbox with zero third-party database retention.',
      directEmailLabel: 'Official Studio Email:',
      directEmailValue: 'sanaheydari245@gmail.com',
      statusNote: 'Responses will be sent to your provided email address in a timely manner.',
    },
    footer: {
      brandName: 'Sana Studio',
      brandTagline: 'Transforming ideas into digital products.',
      quickLinksTitle: 'Quick Links',
      productsTitle: 'Products',
      privacyNote: 'Engineered with a strong emphasis on privacy, local-first databases, and clean digital ergonomics.',
      copyright: 'All rights reserved for Sana Studio.',
      allRightsReserved: 'Single-page responsive design built with the Midnight Blue & Electric Blue palette.',
      languageLabel: 'Language:',
    },
  },
};
