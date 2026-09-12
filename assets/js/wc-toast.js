/**
 * WooCommerce Modern Toast Notices Engine
 * File: assets/js/wc-toast.js
 */

(function () {
  "use strict";

  const config = window.CWD_Toast_Config || {
    duration: 5000,
    addedSimple: "به سبد خرید اضافه شد.",
    addedProduct: "«%s» به سبد خرید اضافه شد.",
    cartUrl: "",
    cartText: "مشاهده سبد",
  };

  const noticeSelectors = [
    ".woocommerce-message",
    ".woocommerce-error",
    ".woocommerce-info",
    ".wc-block-components-notice-banner",
  ].join(",");

  const recentCache = new Map();
  let lastClickedBtn = null;

  const sanitize = (str) =>
    String(str || "")
      .replace(/\s+/g, " ")
      .trim();

  // آیکون‌های برداری SVG فوق‌العاده تمیز
  const icons = {
    success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
    info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
  };

  function getNoticeType(el) {
    if (el.matches(".woocommerce-error, .is-error")) return "error";
    if (el.matches(".woocommerce-message, .is-success")) return "success";
    return "info";
  }

  /**
   * ساخت گره DOM برای توست با حفظ لینک اکشن (مثلا مشاهده سبد خرید)
   */
  function buildToastNode(messageText, type, actionLink = null) {
    const body = document.createElement("div");
    body.className = "cwd-toast-body";

    const iconContainer = document.createElement("div");
    iconContainer.className = "cwd-toast-icon";
    iconContainer.innerHTML = icons[type] || icons.info;

    const content = document.createElement("div");
    content.className = "cwd-toast-content";

    const text = document.createElement("div");
    text.className = "cwd-toast-text";
    text.innerHTML = messageText;

    content.appendChild(text);

    if (actionLink && actionLink.url && actionLink.text) {
      const btn = document.createElement("a");
      btn.href = actionLink.url;
      btn.className = "cwd-toast-action-btn";
      btn.textContent = actionLink.text;
      content.appendChild(btn);
    }

    body.appendChild(iconContainer);
    body.appendChild(content);
    return body;
  }

  /**
   * تابع نمایش توست با مکانیزم Debounce و جلوگیری از تکرار
   */
  function showToast(message, type = "info", actionLink = null) {
    if (!message || typeof window.Toastify !== "function") return false;

    const key = `${type}_${sanitize(message)}`;
    const now = Date.now();

    // جلوگیری از اسپم توست‌های تکراری در فاصله کمتر از ۱.۵ ثانیه
    if (recentCache.has(key) && now - recentCache.get(key) < 1500) {
      return false;
    }
    recentCache.set(key, now);

    window
      .Toastify({
        node: buildToastNode(message, type, actionLink),
        duration: config.duration || 5000,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        className: `cwd-wc-toast cwd-wc-toast--${type}`,
        offset: { x: 20, y: 20 },
      })
      .showToast();

    return true;
  }

  /**
   * پارس کردن نوتیفیکیشن‌های استاندارد ووکامرس
   */
  function processNoticeElement(el) {
    if (!el || el.dataset.cwdToastDone === "1") return;
    el.dataset.cwdToastDone = "1";

    const type = getNoticeType(el);
    let actionLink = null;

    // بررسی وجود دکمه‌هایی مثل "مشاهده سبد خرید" داخل نوتیس
    const existingLink = el.querySelector("a.button, a.wc-forward, a");
    if (existingLink && existingLink.href) {
      actionLink = {
        url: existingLink.href,
        text: sanitize(existingLink.textContent),
      };
    }

    // استخراج متن بدون تگ‌های اکشن
    const clone = el.cloneNode(true);
    clone
      .querySelectorAll('a, button, [role="button"]')
      .forEach((node) => node.remove());

    // اگر خطاها چندگانه بودند (li)
    const listItems = clone.querySelectorAll("li");
    if (listItems.length > 0) {
      listItems.forEach((li) => {
        const msg = sanitize(li.innerHTML || li.textContent);
        if (msg) showToast(msg, type, actionLink);
      });
    } else {
      const msg = sanitize(clone.innerHTML || clone.textContent);
      if (msg) showToast(msg, type, actionLink);
    }

    // حذف المان پیش‌فرض از صفحه
    el.remove();
  }

  function scanNotices(root = document) {
    if (root instanceof Element && root.matches(noticeSelectors)) {
      processNoticeElement(root);
    }
    if (root.querySelectorAll) {
      root.querySelectorAll(noticeSelectors).forEach(processNoticeElement);
    }
  }

  /**
   * استخراج هوشمند نام محصول از روی دکمه کلیک شده
   */
  function extractProductName(btn) {
    if (!btn) return "";
    if (btn.dataset.productName) return btn.dataset.productName;

    const card = btn.closest(
      ".product, .wc-block-grid__product, .wc-block-product, .wp-block-post, article",
    );
    if (card) {
      const titleEl = card.querySelector(
        ".woocommerce-loop-product__title, .product_title, .wp-block-post-title, h2, h3",
      );
      if (titleEl) return sanitize(titleEl.textContent);
    }
    return "";
  }

  function handleAddToCartSuccess(btn = lastClickedBtn) {
    const prodName = extractProductName(btn);
    let message = config.addedSimple;

    if (prodName && config.addedProduct) {
      message = config.addedProduct.replace(
        "%s",
        `<strong>${prodName}</strong>`,
      );
    }

    const actionLink = config.cartUrl
      ? { url: config.cartUrl, text: config.cartText }
      : null;
    showToast(message, "success", actionLink);
  }

  // ذخیره آخرین دکمه کلیک شده برای استخراج نام
  document.addEventListener(
    "click",
    (e) => {
      const btn = e.target.closest(
        ".add_to_cart_button, .single_add_to_cart_button, .ajax_add_to_cart",
      );
      if (btn) lastClickedBtn = btn;
    },
    true,
  );

  // هوک افزودن به سبد خرید در ووکامرس سنتی (jQuery Events)
  if (window.jQuery) {
    window
      .jQuery(document.body)
      .on("added_to_cart", function (e, fragments, hash, $button) {
        handleAddToCartSuccess($button ? $button[0] : lastClickedBtn);
      });

    // شنود تغییرات در صفحات تسویه حساب و سبد خرید (آپدیت فرگمنت‌ها یا خطاهای تسویه)
    window
      .jQuery(document.body)
      .on(
        "applied_coupon_in_checkout removed_coupon_in_checkout checkout_error update_checkout",
        function () {
          setTimeout(scanNotices, 100);
        },
      );
  }

  // پشتیبانی از ووکامرس بلاک (WooCommerce Blocks)
  document.addEventListener("wc-blocks_added_to_cart", () =>
    handleAddToCartSuccess(lastClickedBtn),
  );

  // ناظر تغییرات DOM (MutationObserver) برای هندل خطاهای ایجکسی نامتقارن
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          scanNotices(node);
        }
      });
    });
  });

  function init() {
    scanNotices();
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
