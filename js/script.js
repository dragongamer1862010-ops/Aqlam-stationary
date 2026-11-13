
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
