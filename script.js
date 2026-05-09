document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.accordion-toggle');

    toggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            toggle.setAttribute('aria-expanded', String(!isExpanded));
            if (content) {
                content.hidden = isExpanded;
            }
        });
    });
});
