# ⚡ EdutechLite | سیستم مدیریت آموزشی

<div align="center">

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

</div>

---

## 📖 درباره پروژه
پروژه **EdutechLite** یک سیستم مدیریت آموزشی سبک، امن و مدرن است که با معماری جداگانه (Decoupled Architecture) توسعه داده شده است. این سیستم با الهام از المان‌های بصری و تم جذاب **هوفلپاف (Hufflepuff)** در طراحی رابط کاربری و بهره‌گیری از مکانیزم‌های امنیتی پیشرفته، بستر مناسبی برای مدیریت امور آموزشی فراهم می‌کند.

---

## 🛠 تکنولوژی‌های استفاده شده

### بخش بک‌اند (Backend):
* **Java 17+ / Spring Boot:** هسته اصلی پردازش و منطق برنامه
* **Spring Security:** مدیریت قدرتمند لایه امنیت و دسترسی‌ها
* **JWT (JSON Web Token):** احراز هویت بدون حالت (Stateless) با امضای امن
* **Spring Data JPA / Hibernate:** ارتباط با پایگاه داده و مدیریت ORM
* **MySQL:** پایگاه داده رابطه ای

### بخش فرانت‌اند (Frontend):
* **React.js:** کتابخانه پویای جاوا اسکریپت
* **React Router DOM:** مدیریت مسیرها و ناوبری صفحات
* **Tailwind CSS:** طراحی رابط کاربری مدرن، ریسپانسیو و سفارشی‌سازی شده

---

## 📂 ساختار امنیت و احراز هویت
پروژه از سیستم احراز هویت مبتنی بر توکن بهره می‌برد که شامل کامپوننت‌های کلیدی زیر است:
* `CustomUserDetailsService`: بارگذاری اطلاعات کاربران از پایگاه داده
* `JwtAuthenticationFilter`: فیلتر بررسی و اعتبارسنچی توکن در هر درخواست
* `JwtTokenProvider`: ابزار تولید، امضا و رمزگشایی توکن‌های JWT
* `SecurityConfig`: فایل جامع تنظیمات امنیتی و مدیریت مسیرهای مجاز/محدود

---

## 🚀 راه اندازی و اجرا

### ۱. کلون کردن مخزن
```bash
git clone https://github.com/AlirezaPakdel/Edutech-Lite.git
cd Edutech-Lite
```

### ۲. اجرای بخش بک‌اند
* پروژه بک‌اند را در محیط برنامه‌نویسی (مثل IntelliJ IDEA) باز کنید.
* تنظیمات اتصال به دیتابیس MySQL را در فایل `application.properties` تنظیم کنید.
* پروژه اسپرینگ‌بوت را اجرا کنید.

### ۳. اجرای بخش فرانت‌اند
```bash
cd front/freekala-frontend (یا مسیر پوشه فرانت‌اند)
npm install
npm run dev
```

---

## 👤 نویسنده
**علیرضا پاکدل**
* GitHub: [@AlirezaPakdel](https://github.com/AlirezaPakdel)

---
<div align="center">
ساخته شده با ⚡ و علاقه برای مدیریت هوشمند آموزش.
</div>
