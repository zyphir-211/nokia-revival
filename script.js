/* =========================================
   NOKIA REBORN - COMPLETE INTERACTIVE JAVASCRIPT
========================================= */

/* Shortcuts */
const $ = selector => document.querySelector(selector); const $$ = selector => document.querySelectorAll(selector);

/* =========================================
   SIDE MENU CONTROLS
========================================= */
const menuBtn = $("#menuBtn");
const sideMenu = $("#sideMenu");
const overlay = $("#overlay");
const closeMenu = $("#closeMenu");  function toggleMenu(open) {     if (sideMenu && overlay) {         sideMenu.classList.toggle("open", open);         overlay.classList.toggle("open", open);     } }  if (menuBtn) menuBtn.addEventListener("click", () => toggleMenu(true)); if (closeMenu) closeMenu.addEventListener("click", () => toggleMenu(false)); if (overlay) overlay.addEventListener("click", () => toggleMenu(false));  /* Close menu when clicking any link */ $$(".side-menu a").forEach(link => {
    link.addEventListener("click", () => toggleMenu(false));
});

/* ESC key closes menus and modal */
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        toggleMenu(false);
        closeModal();
    }
});

/* =========================================
   SCROLL PROGRESS BAR
========================================= */
window.addEventListener("scroll", () => {
    const page = document.documentElement;
    const scrollTop = page.scrollTop;
    const scrollHeight = page.scrollHeight - page.clientHeight;
    const percentage = (scrollTop / scrollHeight) * 100;
    const progressBar = $("#progress");     if (progressBar) {         progressBar.style.width = percentage + "\%";     } });  /* =========================================    SCROLL REVEAL ANIMATIONS ========================================= */ const observer = new IntersectionObserver(     entries => {         entries.forEach(entry => {             if (entry.isIntersecting) {                 entry.target.classList.add("visible");             }         });     },     { threshold: 0.1 } );  $$(".reveal").forEach(el => observer.observe(el));

/* =========================================
   SPECIFICATION MODAL POPUP
========================================= */
const modal = $("#modal");
const modalTitle = $("#modalTitle");
const modalText = $("#modalText");
const modalSpecs = $("#modalSpecs");
const modalClose = $("#modalClose");

function openModal(title, text, specs = []) {
    if (!modal) return;
    modalTitle.textContent = title;
    modalText.textContent = text;
    modalSpecs.innerHTML = "";

    specs.forEach(spec => {
        const span = document.createElement("span");
        span.textContent = spec;
        modalSpecs.appendChild(span);
    });

    modal.classList.add("open");
}

function closeModal() {
    if (modal) modal.classList.remove("open");
}

if (modalClose) modalClose.addEventListener("click", closeModal);

if (modal) {
    modal.addEventListener("click", event => {
        if (event.target === modal) closeModal();
    });
}

/* Clickable Story & Philosophy Cards */
$$(".clickable").forEach(card => {     card.addEventListener("click", () => {         openModal(card.dataset.title, card.dataset.text);     }); });  /* Product Details View Specs */ $$
(".product-card").forEach(card => {
    const btn = card.querySelector(".details-btn");
    if (btn) {
        btn.addEventListener("click", e => {
            e.stopPropagation();
            const title = card.dataset.title;
            const desc = card.dataset.desc;
            const specs = card.dataset.specs ? card.dataset.specs.split("|") : [];
            openModal(title, desc, specs);
        });
    }
});

/* =========================================
   PRODUCT CATEGORY FILTER
========================================= */
const categoryButtons = $$(".category-tabs button"); const productCards = $$(".product-card");

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        categoryButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        productCards.forEach(card => {
            if (filter === "all" || card.dataset.category === filter) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    });
});

/* =========================================
   ECOSYSTEM ORBIT BUBBLES
========================================= */
$$(".eco-bubble").forEach(bubble => {     bubble.addEventListener("click", () => {         openModal(bubble.dataset.title, bubble.dataset.text);     }); });  /* =========================================    INTERACTIVE REVENUE TIMELINE CHART & TOOLTIPS ========================================= */ const chartCols = $$
(".chart-bar-col");
const detailYear = $("#detailYear");
const detailVal = $("#detailVal");
const detailDesc = $("#detailDesc");

// Automatically build floating tooltips on each bar
chartCols.forEach(col => {
    const tooltip = document.createElement("div");
    tooltip.className = "chart-bar-tooltip";
    tooltip.textContent = col.dataset.val;
    col.appendChild(tooltip);

    col.addEventListener("click", () => {
        chartCols.forEach(c => c.classList.remove("active-bar"));
        col.classList.add("active-bar");

        if (detailYear && detailVal && detailDesc) {
            detailYear.textContent = `${col.dataset.year} — Details`;
            detailVal.textContent = col.dataset.val;
            detailDesc.textContent = col.dataset.desc;
        }
    });
});

/* =========================================
   HERO PARALLAX TILT
========================================= */
const heroPhone = document.querySelector(".hero-phone");

window.addEventListener("mousemove", event => {
    if (!heroPhone) return;
    const x = (event.clientX / window.innerWidth) - 0.5;
    const y = (event.clientY / window.innerHeight) - 0.5;
    heroPhone.style.transform = `rotate(${6 + x * 6}deg) translate(${x * 14}px, ${y * 14}px)`;
});

/* =========================================
   DAILY MOTIVATIONAL QUOTE GENERATOR
========================================= */
const quotes = [
    {
        quote: "Real strength isn't about being unbreakable; it's about repairing yourself every time life tests you.",
        author: "Resilience First"
    },
    {
        quote: "Disconnect from the noise so you can genuinely connect with what matters.",
        author: "Intentional Living"
    },
    {
        quote: "You do not need to move fast to go far. Consistent steps build lasting endurance.",
        author: "Nordic Wisdom"
    },
    {
        quote: "Focus on permanent values: your kindness, your focus, and the real people around you.",
        author: "Calm Mindset"
    },
    {
        quote: "Every master started as a learner who simply refused to quit when things looked hard.",
        author: "Daily Grit"
    },
    {
        quote: "A quiet, focused mind will always outperform an anxious, overwhelmed routine.",
        author: "Clarity Over Clutter"
    },
    {
        quote: "Build your life like durable hardware: honest materials, strong foundations, and zero pretension.",
        author: "Permanent Craft"
    },
    {
        quote: "Breathe. Today's challenges are just the raw material for tomorrow's confidence.",
        author: "Inner Strength"
    }
];

const quoteText = document.querySelector("#quoteText");
const quoteAuthor = document.querySelector("#quoteAuthor");
const newQuoteBtn = document.querySelector("#newQuoteBtn");

let lastIndex = -1;

function displayRandomQuote() {
    if (!quoteText || !quoteAuthor) return;

    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * quotes.length);
    } while (nextIndex === lastIndex && quotes.length > 1);

    lastIndex = nextIndex;

    quoteText.classList.add("fading");
    quoteAuthor.classList.add("fading");

    setTimeout(() => {
        quoteText.textContent = `“${quotes[nextIndex].quote}”`;
        quoteAuthor.textContent = `— ${quotes[nextIndex].author}`;

        quoteText.classList.remove("fading");
        quoteAuthor.classList.remove("fading");
    }, 250);
}

if (newQuoteBtn) {
    newQuoteBtn.addEventListener("click", displayRandomQuote);
}

/* =========================================
   INITIAL LOAD
========================================= */
window.addEventListener("load", () => {
    displayRandomQuote();
    setTimeout(() => {
        $$(".hero .reveal").forEach(el => el.classList.add("visible"));
    }, 150);
});