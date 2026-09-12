<!-- 📸 برای افزودن اسکرین‌شات: تصویر را در مسیر .github/assets/ قرار دهید و بلوک زیر را از کامنت خارج کنید.
<p align="center" dir="rtl"><img src=".github/assets/screenshot.png" alt="پیش‌نمایش توست‌های ووکامرس" width="900"></p>
-->

<div align="center" dir="rtl">

# 🛒 Custom WooCommerce Modern Toast Notices

### سیستم اعلان‌های توست مدرن، سریع و زیبا برای تمامی رویدادها، خطاها و افزودن به سبد خرید ووکامرس

جایگزینی اعلان‌های پیش‌فرض ووکامرس با توست‌های شیک Toastify • **بدون AJAX اضافی** • طراحی کامل RTL

[![Version](https://img.shields.io/badge/Version-1.0.1-9F1C31?style=for-the-badge&logo=github)](https://github.com/AmirheydaripourOdin1133/Custom-WooCommerce-Modern-Notices)
[![WordPress](https://img.shields.io/badge/WordPress-5.8%2B-21759B?style=for-the-badge&logo=wordpress)](https://wordpress.org)
[![WooCommerce](https://img.shields.io/badge/WooCommerce-Required-96588A?style=for-the-badge&logo=woocommerce)](https://woocommerce.com)
[![License](https://img.shields.io/badge/License-GPL--2.0-blue?style=for-the-badge)](LICENSE)
[![Author](https://img.shields.io/badge/Author-Amir%20Heydaripour-1F2328?style=for-the-badge&logo=github)](https://wp-amir.ir)

**[🏠 خانه‌ی افزونه](https://github.com/AmirheydaripourOdin1133/Custom-WooCommerce-Modern-Notices)** •
**[🐛 گزارش باگ / پیشنهاد](https://github.com/AmirheydaripourOdin1133/Custom-WooCommerce-Modern-Notices/issues)** •
**[🌐 وب‌سایت توسعه‌دهنده](https://wp-amir.ir)**

</div>

---

<div dir="rtl">

## 📖 معرفی

**Custom WooCommerce Modern Toast Notices** اعلان‌های پیش‌فرض و زشت ووکامرس را با توست‌های مدرن، سریع و حرفه‌ای جایگزین می‌کند؛ **بدون دستکاری هسته ووکامرس** و بدون نیاز به تنظیمات پیچیده.

برخلاف روش‌های سنتی، این افزونه با استفاده از کتابخانه Toastify، رویدادهای مختلف ووکامرس (افزودن به سبد خرید، خطاهای تسویه حساب، کپون، به‌روزرسانی سبد و ...) را تشخیص داده و پیام‌های راست‌چین، زیبا و قابل اعتماد نمایش می‌دهد.

## ✨ ویژگی‌ها

### 🎨 ظاهر و تجربه کاربری
- **طراحی کامل RTL** با تایپوگرافی تمیز و راست‌چین بودن تمام متن‌ها
- جایگزینی خودکار اعلان‌های پیش‌فرض ووکامرس با توست‌های Toastify
- **نوار رنگی عمودی** سمت راست بر اساس نوع اعلان (موفقیت، خطا، اطلاعات)
- **پروگرس‌بار زمان اتمام** توست با قابلیت توقف موقت روی هاور
- آیکون‌های SVG اختصاصی برای هر نوع اعلان
- دکمه اکشن اختصاصی در توست (مثل «مشاهده سبد خرید»)

### ⚡ عملکرد
- **بدون AJAX اضافی** — فقط از رویدادهای بومی ووکامرس استفاده می‌شود
- مکانیزم Debounce و جلوگیری از تکرار توست‌های تکراری در کمتر از ۱.۵ ثانیه
- پشتیبانی از **WooCommerce سنتی** (jQuery Events) و **WooCommerce Blocks**
- پشتیبانی از رویدادهای: `added_to_cart`، `applied_coupon_in_checkout`، `removed_coupon_in_checkout`، `checkout_error`، `update_checkout`، `wc-blocks_added_to_cart`
- **استخراج هوشمند نام محصول** از دکمه‌های افزودن به سبد برای پیام‌های شفاف‌تر
- پشتیبانی از MutationObserver برای هندل خطاهای ایجکسی نامتقارن

### 🔧 سفارشی‌سازی
- کانفیگ کامل از طریق `wp_localize_script` (URL سبد، متن دکمه، پیام‌های سفارشی، مدت زمان نمایش)
- متغیرهای CSS برای تغییر رنگ‌های تم‌بندی (موفقیت، خطا، اطلاعات)
- فایل‌های استاتیک (CSS و JS) به صورت لوکال بارگذاری می‌شوند

## 🗂 انواع اعلان‌ها

| نوع | توضیح | رنگ |
| --- | --- | --- |
| ✅ موفقیت | `success` | سبز |
| ❌ خطا | `error` | قرمز |
| ℹ️ اطلاعات | `info` | آبی |

## 📦 پیش‌نیازها

| مورد | حداقل نسخه |
| --- | --- |
| وردپرس | 5.8 |
| ووکامرس | باید فعال باشد |
| تست‌شده تا | وردپرس 6.7 |

## 📥 نصب

1. پوشه‌ی افزونه را در مسیر `wp-content/plugins/` قرار دهید (یا فایل ZIP را از بخش **افزونه‌ها ← افزودن** آپلود کنید).
2. افزونه را فعال کنید — توست‌های مدرن به‌صورت **خودکار** جایگزین اعلان‌های پیش‌فرض ووکامرس می‌شوند.
3. تمام! نیازی به تنظیمات نیست. ✅

## 🚀 استفاده

### خودکار (پیشنهادی)
کافیست افزونه فعال باشد؛ تمام رویدادهای ووکامرس (افزودن به سبد خرید، خطاهای فرم، به‌روزرسانی سبد و ...) به‌صورت خودکار در قالب توست‌های مدرن نمایش داده می‌شوند.

### سفارشی‌سازی پیام‌ها
برای تغییر پیام‌های پیش‌فرض یا تنظیم URL سبد خرید، از فیلتر `cwd_toast_config` استفاده کنید:

```php
add_filter( 'cwd_toast_config', function( $config ) {
    $config['addedSimple']  = __( 'محصول با موفقیت به سبد اضافه شد.', 'custom-wc-toast' );
    $config['addedProduct'] = __( '«%s» به سبد خرید اضافه شد.', 'custom-wc-toast' );
    $config['cartUrl']      = wc_get_cart_url();
    $config['cartText']     = __( 'مشاهده سبد خرید', 'custom-wc-toast' );
    $config['duration']     = 5000; // میلی‌ثانیه

    return $config;
});
```

## 🎨 شخصی‌سازی رنگ‌ها

رنگ‌های تم‌بندی توست از متغیرهای CSS خوانده می‌شوند؛ برای تغییر رنگ، فایل `assets/css/wc-toast.css` را باز کنید:

```css
:root {
    --cwd-toast-success: #388E3C;
    --cwd-toast-error:   #9F1C31;
    --cwd-toast-info:    #1565C0;
    --cwd-toast-bg:      rgba(22, 8, 8, 0.781);
    --cwd-toast-radius:  12px 0 0 12px;
}
```

## 📦 فایل‌های ships

| فایل | توضیح |
| --- | --- |
| `custom-wc-toast-notices.php` | فایل اصلی و هندلر اصلی افزونه |
| `assets/css/toastify.min.css` | استایل‌های کتابخانه Toastify (لوکال) |
| `assets/css/wc-toast.css` | استایل‌های سفارشی افزونه |
| `assets/js/toastify.min.js` | اسکریپت کتابخانه Toastify (لوکال) |
| `assets/js/wc-toast.js` | موتور اصلی نمایش توست‌ها |

## 🔄 تاریخچه‌ی نسخه‌ها

- **1.0.1** — نسخه اولیه پایدار با پشتیبانی از WooCommerce Blocks و MutationObserver
- **1.0.0** — نسخه اولیه انتشار

> فهرست کامل تغییرات در [`readme.txt`](readme.txt) موجود است.

## 👨‍💻 توسعه‌دهنده

<table dir="rtl">
  <tr>
    <td align="center">
      <strong>Amir Heydaripour</strong><br>
      توسعه‌دهنده‌ی وردپرس و ووکامرس<br><br>
      🌐 <a href="https://wp-amir.ir">وب‌سایت شخصی — wp-amir.ir</a><br>
      💻 <a href="https://github.com/AmirheydaripourOdin1133">گیت‌هاب</a>
    </td>
  </tr>
</table>

اگر این افزونه برایتان مفید بود، ⭐️ به ریپازیتوری ستاره بدهید! 🙌

## 🏬 استفاده شده در

این افزونه به‌صورت واقعی و در محیط تولیدی در **فروشگاه اینترنتی مسترسرام** (کاشی، سرامیک و پوشش‌های ساختمانی) استفاده می‌شود:

<p align="center" dir="rtl">
  <a href="https://mrceram.com/" target="_blank" rel="noopener">
    <strong>🛍️ فروشگاه اینترنتی مسترسرام — mrceram.com</strong>
  </a>
</p>

## 📄 مجوز

این پروژه تحت مجوز **GPLv2 یا بالاتر** منتشر شده است — مشابه وردپرس.
<br>
License URI: [https://www.gnu.org/licenses/gpl-2.0.html](https://www.gnu.org/licenses/gpl-2.0.html)

---

<div align="center" dir="rtl">
ساخته شده با ❤️ توسط <a href="https://wp-amir.ir">Amir Heydaripour</a> برای جامعه‌ی وردپرس فارسی
</div>

</div>
