/**
 * Rodrigo Vargas Gómez — Portfolio Interactions
 * Features: Category Filtering, Accordion Inspection, Lightbox Modal, Copy to Clipboard, Scrollspy
 */

document.addEventListener('DOMContentLoaded', () => {
    // ---------------- Mobile Menu Navigation ----------------
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-link, .nav-cta-btn');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            const isOpened = navLinks.classList.toggle('open');
            mobileToggle.setAttribute('aria-expanded', String(isOpened));
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('open');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ---------------- Sticky Navbar Shadow & Scrollspy ----------------
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');

    function handleScroll() {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link scrollspy
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ---------------- Project Category Filtering ----------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });

            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = (card.getAttribute('data-category') || '').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 20);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // ---------------- Accordion Deep Dive ----------------
    const accordionToggles = document.querySelectorAll('.accordion-toggle');

    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const panel = toggle.nextElementSibling;
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            toggle.setAttribute('aria-expanded', String(!isExpanded));
            if (panel) {
                panel.hidden = isExpanded;
            }
        });
    });

    // ---------------- Interactive Lightbox Modal ----------------
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    function openLightbox(src, title, caption) {
        if (!lightboxModal) return;
        lightboxImg.src = src;
        lightboxImg.alt = title || 'Captura de pantalla';
        lightboxTitle.textContent = title || '';
        lightboxDesc.textContent = caption || '';

        lightboxModal.classList.add('active');
        lightboxModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightboxModal) return;
        lightboxModal.classList.remove('active');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        setTimeout(() => {
            if (lightboxImg) lightboxImg.src = '';
        }, 300);
    }

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const src = trigger.getAttribute('src');
            const title = trigger.getAttribute('data-title') || trigger.getAttribute('alt');
            const caption = trigger.getAttribute('data-caption') || '';
            openLightbox(src, title, caption);
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', closeLightbox);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ---------------- One-Click Copy Email to Clipboard ----------------
    const btnCopyEmail = document.getElementById('btnCopyEmail');
    const emailValue = document.getElementById('emailValue');
    const copyText = document.getElementById('copyText');

    if (btnCopyEmail && emailValue) {
        btnCopyEmail.addEventListener('click', async () => {
            const email = emailValue.textContent.trim();
            try {
                await navigator.clipboard.writeText(email);
                btnCopyEmail.classList.add('copied');
                if (copyText) copyText.textContent = '¡Copiado!';

                setTimeout(() => {
                    btnCopyEmail.classList.remove('copied');
                    if (copyText) copyText.textContent = 'Copiar';
                }, 2200);
            } catch (err) {
                // Fallback prompt if clipboard API is blocked
                window.prompt('Copia el correo:', email);
            }
        });
    }
});
