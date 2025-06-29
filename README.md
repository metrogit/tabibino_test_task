# 🩺 پلتفرم طبیبینو (Tabibino)

پلتفرم جامع نوبت‌دهی و مدیریت خدمات پزشکی با پشتیبانی کامل از زبان فارسی

## 📋 درباره پروژه

طبیبینو یک پلتفرم مدرن و دوزبانه برای مدیریت خدمات پزشکی است که امکان رزرو نوبت آنلاین، مدیریت بیماران و پنل‌های تخصصی برای انواع کاربران را فراهم می‌کند. این پروژه با استفاده از جدیدترین تکنولوژی‌های وب توسعه یافته تا تجربه کاربری بهینه و عملکرد بالا را ارائه دهد.

## ✨ ویژگی‌های کلیدی

### 🌐 چندزبانه
- **پشتیبانی کامل از فارسی و انگلیسی**
- تشخیص خودکار زبان براساس تنظیمات مرورگر
- امکان تغییر زبان در لحظه
- فونت‌های اختصاصی IRANYekanX برای نمایش زیبای متن فارسی

### 👥 سیستم نقش‌محور
- **پنل ادمین**: مدیریت کل سیستم، کاربران و گزارشات
- **پنل پزشک**: مدیریت نوبت‌ها، بیماران و برنامه کاری
- **پنل بیمار**: رزرو نوبت، مشاهده سوابق پزشکی و نسخه‌ها

### 🔐 امنیت پیشرفته
- احراز هویت با NextAuth
- مدیریت Session امن
- کنترل دسترسی براساس نقش کاربر
- رمزنگاری ارتباطات

### 🎨 طراحی مدرن
- رابط کاربری زیبا با Tailwind CSS
- کامپوننت‌های آماده با shadcn/ui
- پشتیبانی از حالت تاریک/روشن
- طراحی Responsive برای همه دستگاه‌ها

## 🛠 تکنولوژی‌های استفاده شده

### Frontend
- **Next.js 15** - فریمورک React با قابلیت‌های SSR/SSG
- **TypeScript** - برای توسعه ایمن و قابل نگهداری
- **Tailwind CSS** - برای استایل‌دهی سریع و مدرن
- **shadcn/ui** - کتابخانه کامپوننت‌های UI

### Authentication & State
- **NextAuth.js** - مدیریت کامل احراز هویت
- **React Hook Form** - مدیریت فرم‌ها با validation
- **Zod** - validation اسکیماها

### UI/UX
- **next-themes** - مدیریت تم تاریک/روشن
- **Lucide React** - آیکون‌های مدرن
- **Sonner** - نوتیفیکیشن‌های زیبا

### Developer Experience
- **ESLint** - کنترل کیفیت کد
- **PostCSS** - پردازش CSS
- **TypeScript** - Type safety

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

## 🧪 تست و کیفیت کد

### کنترل کیفیت
- **ESLint** - بررسی کیفیت کد
- **TypeScript** - جلوگیری از خطاهای Type
- **Prettier** - فرمت یکسان کد

### بهترین شیوه‌ها
- استفاده از TypeScript در همه فایل‌ها
- کامپوننت‌های قابل استفاده مجدد
- نام‌گذاری واضح و توصیفی
- کامنت‌گذاری کدهای پیچیده

## 🚀 استقرار

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

## 🤝 مشارکت در پروژه

### گام‌های مشارکت
1. Fork کردن پروژه
2. ایجاد branch جدید (`git checkout -b feature/amazing-feature`)
3. Commit تغییرات (`git commit -m 'Add amazing feature'`)
4. Push به branch (`git push origin feature/amazing-feature`)
5. ایجاد Pull Request

### استانداردهای کدنویسی
- استفاده از TypeScript
- پیروی از ESLint rules
- نوشتن کامنت برای توابع پیچیده
- تست کردن تغییرات قبل از commit

## 📄 مجوز

این پروژه تحت مجوز MIT منتشر شده است. جزئیات بیشتر در فایل [LICENSE](LICENSE) موجود است.

## 📞 ارتباط و پشتیبانی

- **ایمیل**: developer@tabibino.com
- **وبسایت**: [tabibino.com](https://tabibino.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/tabibino_client/issues)

---

💡 **نکته**: این پروژه در حال توسعه فعال است و ویژگی‌های جدید به‌طور مرتب اضافه می‌شوند. برای آخرین به‌روزرسانی‌ها، repository را دنبال کنید.

⭐ اگر این پروژه برای شما مفید بود، لطفاً یک ستاره بدهید!
