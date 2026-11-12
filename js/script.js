
/* ==========================================
   AQLAM STATIONERY - INTERACTIVE EFFECTS
========================================== */

// 1. Automatic Footer Year

const yearElement = document.getElementById("current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// 2. Smooth Reveal On Scroll

const revealElements = document.querySelectorAll(
    ".branches-section, .social-section, .management-section, .footer"
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


// 3. Interactive Press Effect

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


// 4. Copy Manager Phone Numbers

const copyButtons = document.querySelectorAll(".copy-btn");
const copyToast = document.getElementById("copy-toast");

let toastTimeout;

copyButtons.forEach((button) => {

    button.addEventListener("click", async () => {

        const phoneNumber = button.dataset.copy;
        const icon = button.querySelector("i");

        try {

            await navigator.clipboard.writeText(phoneNumber);

            // Change icon to check mark
            button.classList.add("copied");

            icon.classList.remove("fa-copy");
            icon.classList.add("fa-check");

            // Show notification
            if (copyToast) {
                copyToast.textContent = "تم نسخ الرقم بنجاح ✓";
                copyToast.classList.add("show");

                clearTimeout(toastTimeout);

                toastTimeout = setTimeout(() => {
                    copyToast.classList.remove("show");
                }, 2200);
            }

            // Restore original icon
            setTimeout(() => {

                button.classList.remove("copied");

                icon.classList.remove("fa-check");
                icon.classList.add("fa-copy");

            }, 1800);

        } catch (error) {

            if (copyToast) {
                copyToast.textContent =
                    "تعذر النسخ، حاول فتح الموقع باتصال آمن";

                copyToast.classList.add("show");

                clearTimeout(toastTimeout);

                toastTimeout = setTimeout(() => {
                    copyToast.classList.remove("show");
                }, 2500);
            }

        }

    });

});
