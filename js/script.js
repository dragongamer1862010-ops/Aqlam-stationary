
/* ==========================================
   AQLAM STATIONERY - INTERACTIVE EFFECTS
========================================== */


/* 1. AUTOMATIC FOOTER YEAR */

const yearElement = document.getElementById("current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* 2. SMOOTH REVEAL ON SCROLL */

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


/* 3. INTERACTIVE PRESS EFFECT */

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


/* 4. COPY MANAGER PHONE NUMBERS */

const copyButtons = document.querySelectorAll(".copy-btn");

const copyToast = document.getElementById("copy-toast");

let toastTimeout;

function showCopyToast(message, duration = 2200) {

    if (!copyToast) return;

    copyToast.textContent = message;

    copyToast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {

        copyToast.classList.remove("show");

    }, duration);

}


copyButtons.forEach((button) => {

    button.addEventListener("click", async () => {

        const phoneNumber = button.dataset.copy;

        const icon = button.querySelector("i");

        if (!phoneNumber) return;

        try {

            await navigator.clipboard.writeText(phoneNumber);

            /* Change icon to check mark */

            button.classList.add("copied");

            if (icon) {

                icon.classList.remove("fa-copy");

                icon.classList.add("fa-check");

            }


            /* Show success notification */

            showCopyToast("تم نسخ الرقم بنجاح ✓", 2200);


            /* Restore original icon */

            setTimeout(() => {

                button.classList.remove("copied");

                if (icon) {

                    icon.classList.remove("fa-check");

                    icon.classList.add("fa-copy");

                }

            }, 1800);


        } catch (error) {

            /* Show error notification */

            showCopyToast(
                "تعذر النسخ، حاول فتح الموقع باتصال آمن",
                2500
            );

        }

    });

});

/* ==========================================
   AQLAM - RANDOM SERVICE OBJECT BURST
========================================== */

const serviceObjects = {

    games: ["🧩", "🧸", "🪀", "🚀", "🎲", "🪁"],

    binding: ["📚", "📎", "🌀", "📏", "📒", "🔗"],

    copy: ["📄", "📑", "🗒️", "📃", "🖨️"],

    printing: ["🖨️", "📃", "🖋️", "📄", "✨"],

    stationery: ["✏️", "📏", "🖊️", "🧮", "📌", "📐"],

    books: ["📚", "📖", "📕", "📗", "✨"],

    gifts: ["🎁", "🎀", "⭐", "💝", "🎉"]

};

const sparkColors = [
    "#F600DF",
    "#FFD700",
    "#20C96B",
    "#FF8C42",
    "#8B5CF6",
    "#38BDF8"
];

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

document.addEventListener("click", (event) => {

    const button = event.target.closest("[data-effect]");

    if (!button) return;

    const effect = button.dataset.effect;
    const objects = serviceObjects[effect];

    if (!objects) return;

    // Create burst container

    const container = document.createElement("div");

    container.className = "burst-container";

    button.appendChild(container);


    // Create flying objects

    const objectCount = Math.floor(randomNumber(5, 9));

    for (let i = 0; i < objectCount; i++) {

        const item = document.createElement("span");

        item.className = "burst-item";

        item.textContent =
            objects[Math.floor(Math.random() * objects.length)];

        item.style.setProperty(
            "--x",
            `${randomNumber(-85, 85)}px`
        );

        item.style.setProperty(
            "--rise",
            `${randomNumber(65, 115)}px`
        );

        item.style.setProperty(
            "--fall",
            `${randomNumber(35, 85)}px`
        );

        item.style.setProperty(
            "--rotate",
            `${randomNumber(-180, 180)}deg`
        );

        item.style.setProperty(
            "--size",
            `${randomNumber(19, 30)}px`
        );

        item.style.setProperty(
            "--delay",
            `${randomNumber(0, .12)}s`
        );

        container.appendChild(item);

    }


    // Create fireworks

    for (let i = 0; i < 10; i++) {

        const spark = document.createElement("span");

        spark.className = "burst-spark";

        spark.style.setProperty(
            "--spark-x",
            `${randomNumber(-65, 65)}px`
        );

        spark.style.setProperty(
            "--spark-y",
            `${randomNumber(-75, 75)}px`
        );

        spark.style.setProperty(
            "--spark-color",
            sparkColors[
                Math.floor(Math.random() * sparkColors.length)
            ]
        );

        container.appendChild(spark);

    }


    // Remove animation elements

    setTimeout(() => {

        container.remove();

    }, 1700);

});
