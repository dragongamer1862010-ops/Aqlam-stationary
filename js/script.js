
/* ==========================================
   AQLAM STATIONERY - INTERACTIVE EFFECTS
========================================== */

// 1. AUTOMATIC FOOTER YEAR

const yearElement = document.getElementById("current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// 2. SCROLL REVEAL

const revealElements = document.querySelectorAll(
  ".services-section, .social-section, .branches-section, .management-section, .footer"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}


// 3. INTERACTIVE PRESS EFFECT

const interactiveLinks = document.querySelectorAll(
  ".service-icon, .social-icon, .manager-phone"
);

interactiveLinks.forEach((link) => {
  link.addEventListener("pointerdown", () => {
    link.classList.add("is-pressed");
  });

  ["pointerup", "pointerleave", "pointercancel"].forEach((eventName) => {
    link.addEventListener(eventName, () => {
      link.classList.remove("is-pressed");
    });
  });
});


// 4. SERVICE OBJECT COLLECTIONS

const serviceObjects = {

  printing: [
    "🖨️", "📄", "📃", "📑", "🖋️", "📜", "📄", "✨"
  ],

  copying: [
    "📄", "📃", "📑", "🗎", "📄", "📃", "✨"
  ],

  binding: [
    "📚", "📖", "🌀", "📕", "📗", "📘", "📚", "✨"
  ],

  books: [
    "📚", "📖", "📕", "📗", "📘", "📙", "📓", "⭐"
  ],

  stationery: [
    "✏️", "🖊️", "🖋️", "📏", "📐", "📎",
    "📌", "🖍️", "📒", "🖇️", "🧮", "✨"
  ],

  games: [
    "🎮", "🧩", "🧸", "🎁", "🚗", "🎲",
    "🪀", "🎨", "🎈", "🪁", "🧸", "🎀",
    "🎁", "⭐", "🌟", "🎉"
  ]

};


// 5. RANDOM NUMBER

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}


// 6. CREATE FLYING OBJECT

const effectsLayer = document.getElementById("effects-layer");

function createFlyingObject(button, emoji) {

  if (!effectsLayer) return;

  const rect = button.getBoundingClientRect();

  const object = document.createElement("span");

  object.className = "flying-object";
  object.textContent = emoji;

  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;

  const horizontalDirection = randomBetween(-1, 1);

  const peakX = horizontalDirection * randomBetween(65, 145);
  const peakY = -randomBetween(130, 240);

  const endX = peakX + randomBetween(-65, 65);
  const endY = randomBetween(130, 270);

  const duration = randomBetween(3.3, 4.7);

  object.style.setProperty("--start-x", `${startX}px`);
  object.style.setProperty("--start-y", `${startY}px`);

  object.style.setProperty(
    "--peak-x",
    `${startX + peakX}px`
  );

  object.style.setProperty(
    "--peak-y",
    `${startY + peakY}px`
  );

  object.style.setProperty(
    "--end-x",
    `${startX + endX}px`
  );

  object.style.setProperty(
    "--end-y",
    `${startY + endY}px`
  );

  object.style.setProperty(
    "--rotation",
    `${randomBetween(-180, 180)}deg`
  );

  object.style.setProperty(
    "--end-rotation",
    `${randomBetween(-360, 360)}deg`
  );

  object.style.setProperty(
    "--duration",
    `${duration}s`
  );

  object.style.setProperty(
    "--size",
    `${randomBetween(23, 39)}px`
  );

  effectsLayer.appendChild(object);

  object.addEventListener("animationend", () => {
    object.remove();
  }, { once: true });

}


// 7. CREATE COLORFUL SPARKS

const sparkColors = [
  "#F600DF",
  "#FFB703",
  "#20C96B",
  "#FF6B9D",
  "#8B5CF6",
  "#36BFFA",
  "#FFD166"
];

function createSpark(button) {

  if (!effectsLayer) return;

  const rect = button.getBoundingClientRect();

  const spark = document.createElement("span");

  spark.className = "flying-spark";

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const angle = randomBetween(0, Math.PI * 2);
  const distance = randomBetween(55, 145);

  const color = sparkColors[
    Math.floor(Math.random() * sparkColors.length)
  ];

  spark.style.left = `${centerX}px`;
  spark.style.top = `${centerY}px`;

  spark.style.setProperty("--spark-color", color);

  spark.style.setProperty(
    "--spark-x",
    `${Math.cos(angle) * distance}px`
  );

  spark.style.setProperty(
    "--spark-y",
    `${Math.sin(angle) * distance}px`
  );

  spark.style.setProperty(
    "--duration",
    `${randomBetween(1.8, 3.1)}s`
  );

  effectsLayer.appendChild(spark);

  spark.addEventListener("animationend", () => {
    spark.remove();
  }, { once: true });

}


// 8. SERVICE FIREWORKS

const serviceButtons = document.querySelectorAll(".service-button");

serviceButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const effectType = button.dataset.effect;

    const objects = serviceObjects[effectType];

    if (!objects) return;

    // Random number of flying objects
    const objectCount = effectType === "games"
      ? 12
      : 9;

    // Launch objects gradually
    for (let i = 0; i < objectCount; i++) {

      setTimeout(() => {

        const randomObject =
          objects[Math.floor(Math.random() * objects.length)];

        createFlyingObject(button, randomObject);

      }, i * randomBetween(55, 105));

    }

    // Colorful fireworks
    const sparkCount = effectType === "games" ? 25 : 17;

    for (let i = 0; i < sparkCount; i++) {

      setTimeout(() => {
        createSpark(button);
      }, i * 45);

    }

  });

});


// 9. COPY MANAGER PHONE NUMBERS

const copyButtons = document.querySelectorAll(".copy-btn");

const copyToast = document.getElementById("copy-toast");

let toastTimeout;

function showCopyToast(message) {

  if (!copyToast) return;

  copyToast.textContent = message;
  copyToast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    copyToast.classList.remove("show");
  }, 2500);

}


copyButtons.forEach((button) => {

  button.addEventListener("click", async () => {

    const phoneNumber = button.dataset.copy;
    const icon = button.querySelector("i");

    try {

      await navigator.clipboard.writeText(phoneNumber);

      button.classList.add("copied");

      if (icon) {
        icon.classList.remove("fa-copy");
        icon.classList.add("fa-check");
      }

      showCopyToast("تم نسخ الرقم بنجاح ✓");

      setTimeout(() => {

        button.classList.remove("copied");

        if (icon) {
          icon.classList.remove("fa-check");
          icon.classList.add("fa-copy");
        }

      }, 1800);

    } catch (error) {

      showCopyToast(
        "تعذر النسخ، حاول فتح الموقع باتصال آمن"
      );

    }

  });

});

/* =====================================
   AQLAM LANGUAGE SWITCHER
===================================== */

(() => {
  const button = document.getElementById("languageToggle");

  if (!button) return;

  const translations = {
    ar: {
      ".hero p": "مكتبة أقلام للأدوات المكتبية و لعب الأطفال",
      ".logo-face-back span": "معاك على<br>طريق النجاح",

      ".services-section .section-title": "خدماتنا",
      ".service-button:nth-child(1) span:last-child": "طباعة",
      ".service-button:nth-child(2) span:last-child": "تصوير مستندات",
      ".service-button:nth-child(3) span:last-child": "تغليف وتكعيب",
      ".service-button:nth-child(4) span:last-child": "كتب خارجية",
      ".service-button:nth-child(5) span:last-child": "أدوات مكتبية",
      ".service-button:nth-child(6) span:last-child": "ألعاب وهدايا",

      ".social-section .section-title": "تابعونا",

      ".branches-section .section-title": "فروعنا",
      ".branch:first-child .branch-status": "الفرع الرئيسي",
      ".branch:first-child h3": "فرع الواحة",
      ".branch:last-child .branch-status": "الفرع الجديد",
      ".branch:last-child h3": "فرع إيست بارك",

      ".management-section .section-title": "الإدارة",
      ".manager:first-child .manager-name": "أ. محمد",
      ".manager:last-child .manager-name": "أ. مصطفى",

      "#copy-toast": "تم نسخ الرقم بنجاح"
    },

    en: {
      ".hero p": "AQLAM Stationery for Office Supplies and Toys",
      ".logo-face-back span": "With You on<br>Your Road to Success",

      ".services-section .section-title": "Our Services",
      ".service-button:nth-child(1) span:last-child": "Printing",
      ".service-button:nth-child(2) span:last-child": "Document Copying",
      ".service-button:nth-child(3) span:last-child": "Binding & Packaging",
      ".service-button:nth-child(4) span:last-child": "Educational Books",
      ".service-button:nth-child(5) span:last-child": "Stationery",
      ".service-button:nth-child(6) span:last-child": "Toys & Gifts",

      ".social-section .section-title": "Follow Us",

      ".branches-section .section-title": "Our Branches",
      ".branch:first-child .branch-status": "Main Branch",
      ".branch:first-child h3": "Al Waha Branch",
      ".branch:last-child .branch-status": "New Branch",
      ".branch:last-child h3": "East Park Branch",

      ".management-section .section-title": "Management",
      ".manager:first-child .manager-name": "Mr. Mohamed",
      ".manager:last-child .manager-name": "Mr. Mostafa",

      "#copy-toast": "Number copied successfully"
    }
  };

  const attributes = {
    ".branch:first-child .whatsapp": "WhatsApp - Al Waha Branch",
    ".branch:first-child .maps": "Al Waha Branch Location",
    ".branch:last-child .whatsapp": "WhatsApp - East Park Branch",
    ".branch:last-child .maps": "East Park Branch Location",
    ".manager:first-child .manager-phone": "Call Mr. Mohamed",
    ".manager:last-child .manager-phone": "Call Mr. Mostafa",
    ".manager:first-child .copy-btn": "Copy Mr. Mohamed's Number",
    ".manager:last-child .copy-btn": "Copy Mr. Mostafa's Number"
  };

  function setLanguage(lang) {
    const selected = translations[lang];

    if (!selected) return;

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    Object.entries(selected).forEach(([selector, value]) => {
      const element = document.querySelector(selector);

      if (!element) return;

      if (selector === ".logo-face-back span") {
        element.innerHTML = value;
      } else {
        element.textContent = value;
      }
    });

    Object.entries(attributes).forEach(([selector, value]) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute("aria-label", lang === "en"
          ? value
          : getArabicLabel(selector));
      }
    });

    button.textContent = lang === "ar" ? "EN" : "AR";

    button.setAttribute(
      "aria-label",
      lang === "ar" ? "Switch to English" : "التغيير إلى العربية"
    );

    document.title = lang === "en"
      ? "AQLAM Stationery | Office Supplies & Toys"
      : "AQLAM Stationery | مكتبة أقلام للأدوات المكتبية";

    document.querySelector('meta[name="language"]')
      ?.setAttribute("content", lang === "en" ? "English" : "Arabic");

    document.querySelector('meta[property="og:locale"]')
      ?.setAttribute("content", lang === "en" ? "en_US" : "ar_EG");

    const description = document.querySelector(
      'meta[name="description"]'
    );

    if (description) {
      description.setAttribute(
        "content",
        lang === "en"
          ? "AQLAM Stationery - Office supplies, printing, document copying, binding, educational books, toys and gifts. Discover our branches and contact information."
          : "AQLAM Stationery - مكتبة أقلام للأدوات المكتبية، طباعة وتصوير المستندات، التغليف والتكعيب، الكتب الخارجية، الألعاب والهدايا. تعرّف على فروعنا وطرق التواصل معنا."
      );
    }

    try {
      localStorage.setItem("aqlam-language", lang);
    } catch (error) {
      console.warn("Language preference could not be saved.");
    }
  }

  function getArabicLabel(selector) {
    const labels = {
      ".branch:first-child .whatsapp": "واتساب فرع الواحة",
      ".branch:first-child .maps": "موقع فرع الواحة",
      ".branch:last-child .whatsapp": "واتساب فرع إيست بارك",
      ".branch:last-child .maps": "موقع فرع إيست بارك",
      ".manager:first-child .manager-phone": "اتصال بأستاذ محمد",
      ".manager:last-child .manager-phone": "اتصال بأستاذ مصطفى",
      ".manager:first-child .copy-btn": "نسخ رقم أستاذ محمد",
      ".manager:last-child .copy-btn": "نسخ رقم أستاذ مصطفى"
    };

    return labels[selector] || "";
  }

  button.addEventListener("click", () => {
    const current = document.documentElement.lang || "ar";
    setLanguage(current === "ar" ? "en" : "ar");
  });

  let savedLanguage = "ar";

  try {
    savedLanguage = localStorage.getItem("aqlam-language") || "ar";
  } catch (error) {
    savedLanguage = "ar";
  }

  setLanguage(savedLanguage);
})();
