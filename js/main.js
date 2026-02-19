/* ============================================
   HWE India - Main JavaScript
   GSAP Animations & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Preloader ----
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800);
    });

    // Fallback: hide preloader after 3 seconds even if load event doesn't fire
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 3000);

    // ---- Register GSAP ScrollTrigger ----
    gsap.registerPlugin(ScrollTrigger);

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // ---- Active Nav Link on Scroll ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        const scrollPos = window.pageYOffset + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // ---- Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- Reveal on Scroll Animations ----
    const revealElements = document.querySelectorAll('.reveal-up');

    revealElements.forEach((el, index) => {
        ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            onEnter: () => {
                gsap.to(el, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    delay: el.closest('.stats-grid, .hero-content, .hero-actions, .about-features, .products-grid, .project-highlights, .capability-row')
                        ? index * 0.05 : 0
                });
                el.classList.add('revealed');
            },
            once: true
        });
    });

    // ---- Hero Title Staggered Animation ----
    const heroTitleLines = document.querySelectorAll('.hero-title .title-line');
    gsap.fromTo(heroTitleLines,
        { opacity: 0, y: 60, rotateX: -15 },
        {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 1
        }
    );

    // Hero badge and subtitle
    gsap.fromTo('.hero-badge',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
    );

    gsap.fromTo('.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.5 }
    );

    gsap.fromTo('.hero-actions',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.8 }
    );

    gsap.fromTo('.hero-scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 2.5 }
    );

    // ---- Stats Counter Animation ----
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-count'));
        ScrollTrigger.create({
            trigger: num,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(num, {
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: function () {
                        const progress = this.progress();
                        num.textContent = Math.round(target * progress);
                    }
                });
            },
            once: true
        });
    });

    // ---- Product Cards Stagger ----
    const productCards = document.querySelectorAll('.product-card');

    ScrollTrigger.batch(productCards, {
        onEnter: (batch) => {
            gsap.fromTo(batch,
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: 'power3.out'
                }
            );
        },
        start: 'top 85%',
        once: true
    });

    // ---- Product Card Tilt Effect (desktop only) ----
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const tiltCards = document.querySelectorAll('[data-tilt]');

    if (!isTouchDevice) tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -5;
            const rotateY = (x - centerX) / centerX * 5;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
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

    // ---- Capability Cards Animation ----
    const capabilityCards = document.querySelectorAll('.capability-card');

    capabilityCards.forEach(card => {
        ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            onEnter: () => {
                gsap.fromTo(card,
                    { opacity: 0, y: 40, scale: 0.97 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power3.out'
                    }
                );
            },
            once: true
        });
    });

    // ---- Timeline Cards Stagger ----
    const visualCards = document.querySelectorAll('.visual-card');

    ScrollTrigger.create({
        trigger: '.about-visual',
        start: 'top 80%',
        onEnter: () => {
            gsap.fromTo(visualCards,
                { opacity: 0, x: -40 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.7,
                    stagger: 0.2,
                    ease: 'power3.out'
                }
            );
        },
        once: true
    });

    // ---- Highlight Cards ----
    const highlightCards = document.querySelectorAll('.highlight-card');

    ScrollTrigger.batch(highlightCards, {
        onEnter: (batch) => {
            gsap.fromTo(batch,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: 'power3.out'
                }
            );
        },
        start: 'top 85%',
        once: true
    });

    // ---- CTA Box Parallax ----
    gsap.to('.cta-ring-1', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
    });

    gsap.to('.cta-ring-2', {
        rotation: -360,
        duration: 15,
        repeat: -1,
        ease: 'none'
    });

    gsap.to('.cta-ring-3', {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: 'none'
    });

    // ---- Floating Particles in Hero ----
    const particlesContainer = document.getElementById('particles');

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const size = Math.random() * 3 + 1;

        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        particlesContainer.appendChild(particle);

        gsap.to(particle, {
            opacity: Math.random() * 0.4 + 0.1,
            y: -100 - Math.random() * 200,
            x: (Math.random() - 0.5) * 100,
            duration: 3 + Math.random() * 4,
            ease: 'none',
            onComplete: () => {
                particle.remove();
            }
        });
    }

    // Create particles periodically (fewer on mobile for performance)
    const isMobile = window.innerWidth < 768;
    const particleDelay = isMobile ? 500 : 200;
    let particleInterval;
    function startParticles() {
        particleInterval = setInterval(createParticle, particleDelay);
    }

    function stopParticles() {
        clearInterval(particleInterval);
    }

    // Only run particles when hero is visible
    ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        onEnter: startParticles,
        onLeave: stopParticles,
        onEnterBack: startParticles,
        onLeaveBack: stopParticles
    });

    // Start particles initially
    startParticles();

    // ---- Contact Form ----
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Show success feedback
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10L8 14L16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Message Sent!
        `;
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            contactForm.reset();
        }, 3000);
    });

    // ---- Magnetic Button Effect (desktop only) ----
    const magneticButtons = document.querySelectorAll('.btn-primary, .nav-cta');

    if (!isTouchDevice) magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.2,
                y: y * 0.2,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });

    // ---- Section Text Reveal with GSAP ----
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title,
            {
                opacity: 0,
                y: 30,
                clipPath: 'inset(0 0 100% 0)'
            },
            {
                opacity: 1,
                y: 0,
                clipPath: 'inset(0 0 0% 0)',
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    once: true
                }
            }
        );
    });

    // ---- Parallax Effects ----
    gsap.to('.hero-gradient', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    gsap.to('.hero-grid-lines', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // ---- Glow Ring Animation for Capabilities ----
    gsap.utils.toArray('.visual-ring').forEach((ring, i) => {
        gsap.to(ring, {
            rotation: i % 2 === 0 ? 360 : -360,
            duration: 15 + i * 5,
            repeat: -1,
            ease: 'none'
        });
    });

});
