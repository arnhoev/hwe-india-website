/* ============================================
   Products Page JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Register GSAP ScrollTrigger ----
    gsap.registerPlugin(ScrollTrigger);

    // ---- Mobile Navigation ----
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ---- Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 140; // Account for sticky nav + product nav
                const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- Active Product Nav on Scroll ----
    const productSections = document.querySelectorAll('.product-section');
    const productNavLinks = document.querySelectorAll('.product-nav-link');

    function updateProductNav() {
        const scrollPos = window.pageYOffset + 200;
        productSections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                productNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                        // Scroll the nav to show active link
                        link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateProductNav);

    // ---- Reveal Animations ----
    const revealElements = document.querySelectorAll('.reveal-up');

    revealElements.forEach(el => {
        ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            onEnter: () => {
                gsap.to(el, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                });
                el.classList.add('revealed');
            },
            once: true
        });
    });

    // ---- Product Cards Stagger ----
    const productCards = document.querySelectorAll('.product-detail-card');

    ScrollTrigger.batch(productCards, {
        onEnter: (batch) => {
            gsap.fromTo(batch,
                { opacity: 0, y: 40, scale: 0.97 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out'
                }
            );
        },
        start: 'top 88%',
        once: true
    });

    // ---- Section Title Animations ----
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title,
            { opacity: 0, y: 20, clipPath: 'inset(0 0 100% 0)' },
            {
                opacity: 1,
                y: 0,
                clipPath: 'inset(0 0 0% 0)',
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    once: true
                }
            }
        );
    });

    // ---- Page Hero Animation ----
    gsap.fromTo('.page-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );

    gsap.fromTo('.page-desc',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 }
    );

    // ---- CTA Ring Animation ----
    gsap.to('.cta-ring-1', { rotation: 360, duration: 20, repeat: -1, ease: 'none' });
    gsap.to('.cta-ring-2', { rotation: -360, duration: 15, repeat: -1, ease: 'none' });
    gsap.to('.cta-ring-3', { rotation: 360, duration: 10, repeat: -1, ease: 'none' });

    // ---- Card Hover Tilt ----
    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -3;
            const rotateY = (x - centerX) / centerX * 3;

            gsap.to(card, {
                rotateX,
                rotateY,
                transformPerspective: 1000,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });

});
