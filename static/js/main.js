/* ==============================================
   main.js — Malenadu Tiffin
   Task 2: Loader, navbar scroll, mobile menu.
   Task 3: Scroll-reveal (Intersection Observer).
   Task 4: Multi-page support (menu page).
   All code is inside DOMContentLoaded so it
   runs only after the HTML is fully parsed.
   ============================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* ---- 1. LOADER ------------------------------------------------
       The loader screen covers the page on first visit.
       After ~1.8 seconds (enough for the CSS bar to fill),
       we fade it out and add 'page-loaded' to <body>.

       'page-loaded' triggers all the .animate-in CSS animations
       defined in style.css — so hero content fades in smoothly.
    --------------------------------------------------------------- */
    const loader = document.getElementById("loader");

    // Only run the loader if the #loader element exists.
    // The menu page and future pages don't have a loader.
    if (loader) {
        setTimeout(function () {
            loader.classList.add("hidden");
            document.body.classList.add("page-loaded");
        }, 1800);
    } else {
        // No loader: immediately mark page as loaded so any
        // .animate-in elements on other pages still work.
        document.body.classList.add("page-loaded");
    }


    /* ---- 2. NAVBAR SCROLL BEHAVIOUR ------------------------------
       The navbar starts transparent (over the dark hero).
       When the user scrolls past 60px, JS adds the class 'scrolled'.
       CSS then switches it to a solid cream background.
       This is cleaner than changing inline styles in JS.
    --------------------------------------------------------------- */
    const navbar = document.getElementById("navbar");

    function handleNavbarScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleNavbarScroll, { passive: true });

    // If there is NO hero section on this page (e.g. /menu),
    // make the navbar solid immediately instead of transparent.
    if (!document.getElementById("hero")) {
        navbar.classList.add("scrolled");
    } else {
        // Run once on load in case page is already scrolled
        handleNavbarScroll();
    }


    /* ---- 3. MOBILE MENU TOGGLE -----------------------------------
       The hamburger button shows/hides the nav links on small screens.
       'clip-path' in CSS is used to animate the reveal smoothly.
       aria-expanded is updated so screen readers know the state.
    --------------------------------------------------------------- */
    const navToggle = document.getElementById("navToggle");
    const navLinks  = document.getElementById("navLinks");

    navToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", isOpen.toString());
    });

    // Close the mobile menu when the user taps any nav link
    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });


    /* ---- 4. SCROLL REVEAL (Intersection Observer) ----------------
       IntersectionObserver watches elements with class 'reveal'.
       When an element enters the viewport (12% visible),
       the observer adds class 'visible' to it.
       CSS handles the actual fade-in transition.

       Why not just use CSS :hover or scroll events?
       IntersectionObserver is more efficient — the browser
       handles the detection natively without JS firing
       on every single scroll pixel.
    --------------------------------------------------------------- */
    const revealElements = document.querySelectorAll(".reveal");

    // Create the observer
    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                // Element is visible — trigger the CSS transition
                entry.target.classList.add("visible");

                // Stop watching this element — no need to un-reveal it
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12   // fire when 12% of the element is in view
    });

    // Start observing every .reveal element
    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });


    /* ---- Future features will be added here ---- */
    // Task 4+: WhatsApp order button behaviour
    // Task 5+: Contact form handling

});

