
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
