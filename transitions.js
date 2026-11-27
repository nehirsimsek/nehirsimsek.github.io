document.addEventListener('DOMContentLoaded', () => {
    // Page exit fade
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.body.classList.add('page-exit');
                setTimeout(() => { window.location.href = href; }, 350);
            });
        }
    });

    initScrollReveal();
});

// When restored from bfcache (browser back/forward), reset faded-out state
window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
        document.body.classList.remove('page-exit');
        initScrollReveal();
    }
});

function initScrollReveal() {
    // Stagger delays for grouped items
    const staggerGroups = [
        // Case study groups
        { parent: '.case-study .stats',        child: '.stat',          gap: 0.10 },
        { parent: '.case-study .details',       child: '.detail',        gap: 0.08 },
        { parent: '.case-study .content-grid',  child: '.content-item',  gap: 0.10 },
        { parent: '.case-study .workflow',      child: '.workflow-row',  gap: 0.07 },
        // About page groups
        { parent: '.timeline-list',             child: '.timeline-item', gap: 0.07 },
        { parent: '.skills-tags',               child: '.skill-tag',     gap: 0.05 },
    ];
    staggerGroups.forEach(({ parent, child, gap }) => {
        document.querySelectorAll(parent).forEach(group => {
            group.querySelectorAll(child).forEach((el, i) => {
                el.style.transitionDelay = `${i * gap}s`;
            });
        });
    });

    // All revealable elements — case study, about, and index pages
    const revealSelector = [
        // ── Case study pages ──
        '.case-study .eyebrow',
        '.case-study .hero h1',
        '.case-study .hero-intro',
        '.case-study .hero-question',
        '.case-study .hero-image-wrapper',
        '.case-study .stat',
        '.case-study .detail',
        '.case-study .section-title',
        '.case-study h2',
        '.case-study .section-intro',
        '.case-study .image-content-split',
        '.case-study .content-item',
        '.case-study .workflow-row',
        '.case-study .process-map-wrapper',
        '.case-study .large-statement',
        '.case-study .quote',
        '.case-study .takeaway',
        '.case-study .photo-grid-3',
        '.sticker-mid',
        '.project-nav',
        // ── About page ──
        '.photo-scroll-strip',
        '.section-label',
        '.bio-content',
        '.timeline-item',
        '.skills-tags',
        // ── Index page ──
        '.hero-text',
        '.work-section',
        '.works-scroll-strip',
    ].join(', ');

    const els = document.querySelectorAll(revealSelector);
    els.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    els.forEach(el => observer.observe(el));
}
