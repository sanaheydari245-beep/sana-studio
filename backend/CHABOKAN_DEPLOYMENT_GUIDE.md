# راهنمای استقرار بک‌اند اختصاصی Sana Studio در چابکان (Chabokan Deployment Guide)

این مستند، راهنمای گام‌به‌گام برای استقرار بک‌اند Node.js پروژه در سرویس میزبانی چابکان است.

---

## ۱. مشخصات معماری بک‌اند

- **محیط اجرایی:** Node.js v24.x (CommonJS)
- **پورت پیش‌فرض سرویس:** طبق متغیر `PORT` تزریق‌شده توسط چابکان (پیش‌فرض fallback: `5000` یا `3000`)
- **فایل ورودی (Entry Point):** `index.js`
- **مسیر پروژه در سرور:** `/app`

---

## ۲. متغیرهای محیطی در پنل کاربری چابکان (Environment Variables)

وارد داشبورد مدیریت سرویس چابکان شوید، به بخش **متغیرهای محیطی (Environment Variables)** سرویس Node.js بروید و متغیرهای زیر را ثبت کنید:

| نام متغیر | مقدار پیشنهادی | توضیحات |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | وضعیت اجرایی بهینه‌سازی‌شده برای محیط عملیاتی |
| `TRUST_PROXY` | `1` | فعال‌سازی پروکسی معکوس چابکان (جهت تشخیص IP و Rate Limit دقیق) |
| `ALLOWED_ORIGINS` | `https://sanastudio.ir,https://www.sanastudio.ir` | دامنه‌های مجاز برای برقراری ارتباط با API فرانت‌اند |
| `SMTP_HOST` | `smtp.gmail.com` | آدرس سرور ارسال ایمیل جیمیل |
| `SMTP_PORT` | `465` | پورت امن SSL |
| `SMTP_SECURE` | `true` | فعال‌سازی ارتباط امن TLS/SSL مستقیم |
| `SMTP_USER` | `sanaheydari245@gmail.com` | نشانی جیمیل رسمی استودیو |
| `SMTP_PASS` | *(رمز ۱۶ رقمی اختصاصی برنامه Google)* | **App Password** اختصاصی جیمیل (بدون فاصله) |
| `MAIL_TO` | `sanaheydari245@gmail.com` | صندوق ایمیل مقصد دریافت پیام‌ها |
| `MAIL_FROM_NAME` | `Sana Studio Contact Form` | نام نمایش‌داده‌شده فرستنده در اینباکس |

> [!IMPORTANT]
> **نحوه ساخت Google App Password:**
> 1. وارد حساب Google خود شوید: [myaccount.google.com](https://myaccount.google.com/)
> 2. به تب **Security** بروید و مطمئن شوید **2-Step Verification** فعال است.
> 3. در بخش جستجو عبارت **App Passwords** را سرچ کرده یا به مسیر [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) بروید.
> 4. نام برنامه را مثلاً `Chabokan Backend` بگذارید و روی **Create** کلیک کنید.
> 5. رمز ۱۶ حرفی تولید شده (مانند `abcd efgh ijkl mnop`) را کپی کرده و در متغیر `SMTP_PASS` پنل چابکان قرار دهید.

---

## ۳. فایل‌های آماده برای انتقال به پوشه `/app` در چابکان

تمامی فایل‌های زیر در پوشه محلی `E:\student life app\website2\backend` تولید و تست شده‌اند:

```text
/app
├── index.js
├── package.json
├── src/
│   ├── config/
│   │   ├── env.js
│   │   └── mailer.js
│   ├── controllers/
│   │   └── contact.controller.js
│   ├── middleware/
│   │   ├── cors.js
│   │   ├── errorHandler.js
│   │   ├── rateLimiter.js
│   │   └── validator.js
│   ├── routes/
│   │   ├── contact.routes.js
│   │   └── health.routes.js
│   └── services/
│       └── email.service.js
```

---

## ۴. بررسی صحت کارکرد پس از استقرار (Verification & Health Probes)

پس از بالا آمدن سرویس در چابکان:

1. **بررسی سلامت وب‌سرور:**
   ```bash
   GET https://your-chabokan-domain.ir/api/health
   # پاسخ مورد انتظار: 200 OK {"status": "healthy", ...}
   ```
2. **بررسی صحت اتصال SMTP به جیمیل:**
   ```bash
   GET https://your-chabokan-domain.ir/api/health/mailer
   # پاسخ مورد انتظار: 200 OK {"status": "connected", "message": "SMTP credentials verified successfully"}
   ```

---

## ۵. اتصال نهایی فرانت‌اند به بک‌اند چابکان

پس از تایید کارکرد بک‌اند چابکان:
در فرانت‌اند (`website2/.env`) مقدار زیر را ست می‌کنید:
```env
VITE_API_BASE_URL=https://your-chabokan-domain.ir
```
سایت به صورت هوشمند از این پس تمامی پیام‌ها را به بک‌اند چابکان شما ارسال کرده و در صورت هرگونه قطعی سرور یا خطای شبکه، به عنوان لایه دوم امن به EmailJS یا نرم‌افزار ایمیل (`mailto`) مراجعه می‌کند.
