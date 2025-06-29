# 🩺 پلتفرم تستی طبیبینو (Tabibino)

## 🚀 راه‌اندازی پروژه

### پیش‌نیازها
```bash
Node.js 18+ 
npm یا yarn یا pnpm
```

### نصب و راه‌اندازی

1. **کلون کردن پروژه**
```bash
git clone https://github.com/your-username/tabibino_client.git
cd tabibino_client
```

2. **نصب وابستگی‌ها**
```bash
npm install
# یا
yarn install
# یا
pnpm install
```

3. **تنظیم متغیرهای محیطی**
```bash
cp .env.example .env.local
```

فایل `.env.local` را ویرایش کنید:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
# سایر تنظیمات API
```

4. **اجرای پروژه در محیط توسعه**
```bash
npm run dev
# یا
yarn dev
# یا
pnpm dev
```

پروژه روی آدرس `http://localhost:3000` در دسترس خواهد بود.

## 📁 ساختار پروژه

```
tabibino_client/
├── app/                    # Next.js App Router
│   ├── [lang]/            # صفحات چندزبانه
│   │   ├── (main)/        # صفحات اصلی
│   │   ├── auth/          # صفحات احراز هویت
│   │   └── [...slug]/     # صفحات پویا
│   ├── api/               # API Routes
│   └── globals.css        # استایل‌های سراسری
├── components/            # کامپوننت‌های React
│   ├── ui/               # کامپوننت‌های UI پایه
│   ├── dashboard/        # کامپوننت‌های داشبورد
│   ├── landing/          # کامپوننت‌های لندینگ
│   └── providers/        # Provider ها
├── lib/                  # توابع کمکی و تنظیمات
│   ├── dictionaries/     # فایل‌های ترجمه
│   ├── auth.ts          # تنظیمات احراز هویت
│   └── utils.ts         # توابع کمکی
├── public/              # فایل‌های استاتیک
│   └── fonts/           # فونت‌های فارسی
└── types/               # تعریف Type ها
```

## 🔧 اسکریپت‌های در دسترس

```bash
# اجرای پروژه در محیط توسعه
npm run dev

# ساخت پروژه برای تولید
npm run build

# اجرای پروژه در محیط تولید
npm run start

# بررسی کیفیت کد
npm run lint
```

## 🌍 پشتیبانی چندزبانه

این پروژه از سیستم i18n پیشرفته استفاده می‌کند:

- **زبان‌های پشتیبانی شده**: فارسی (fa) و انگلیسی (en)
- **تشخیص خودکار زبان** براساس تنظیمات مرورگر
- **مسیریابی زبان** با middleware سفارشی
- **ذخیره تنظیمات زبان** در کوکی‌ها

### افزودن ترجمه جدید

فایل‌های ترجمه در مسیر `lib/dictionaries/` قرار دارند:

```typescript
// lib/dictionaries/fa.json
{
  "auth": {
    "login": "ورود",
    "email": "ایمیل"
  }
}

// lib/dictionaries/en.json
{
  "auth": {
    "login": "Login",
    "email": "Email"
  }
}
```

## 🎨 سفارشی‌سازی ظاهر

### تم‌ها
پروژه از سیستم تم پیشرفته next-themes استفاده می‌کند:

- **حالت روشن** - برای استفاده روزانه
- **حالت تاریک** - برای کاهش فشار چشم
- **تشخیص خودکار** براساس تنظیمات سیستم

### فونت‌ها
فونت اختصاصی IRANYekanX برای نمایش بهینه متن فارسی:

```css
@font-face {
  font-family: 'IRANYekanX';
  src: url('/fonts/IRANYekanX-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}
```

## 🔐 سیستم احراز هویت

### تنظیمات NextAuth

```typescript
// lib/auth.ts
export const authOptions = {
  providers: [
    CredentialsProvider({
      // تنظیمات احراز هویت
    })
  ],
  callbacks: {
    // مدیریت session و JWT
  }
}
```

### نقش‌های کاربری

```typescript
enum UserRole {
  ADMIN = 'admin',
  DOCTOR = 'doctor', 
  CLIENT = 'client'
}
```

## 📱 PWA و SEO

### Progressive Web App
- فایل `manifest.json` برای نصب روی دستگاه‌های موبایل
- Service Worker برای کارکرد آفلاین
- آیکون‌های مختلف برای پلتفرم‌های مختلف

### SEO
- تولید خودکار `sitemap.xml`
- Meta tags بهینه شده
- تگ‌های Open Graph
- ساختار Schema.org


### Vercel (توصیه شده)
```bash
npm i -g vercel
vercel
```

### سایر پلتفرم‌ها
```bash
# ساخت پروژه
npm run build

# فایل‌های آماده در پوشه .next قرار می‌گیرند
```

