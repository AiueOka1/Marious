// (Removed legacy string pulling & sticky handle navbar logic – now pure CSS hover)
// Contact popup logic
document.addEventListener('DOMContentLoaded', function () {
    const openBtn = document.getElementById('open-contact-popup');
    const popup = document.getElementById('contact-popup');
    const closeBtn = document.getElementById('close-contact-popup');
    const form = document.getElementById('popup-contact-form');

    if (openBtn && popup && closeBtn && form) {
        openBtn.addEventListener('click', () => {
            popup.classList.add('active');
        });
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('active');
        });
        window.addEventListener('click', (e) => {
            if (e.target === popup) popup.classList.remove('active');
        });
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('popup-name').value;
            const email = document.getElementById('popup-email').value;
            const message = document.getElementById('popup-message').value;
            const subject = encodeURIComponent('Contact Form Submission');
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
            window.location.href = `mailto:somarious2@gmail.com?subject=${subject}&body=${body}`;
            popup.classList.remove('active');
        });
    }
});


window.addEventListener('DOMContentLoaded', function () {
    // Dark mode switch logic
    const toggleButton = document.getElementById('toggle-button');
    const icon = toggleButton.querySelector('i');
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggleButton.classList.toggle('active');
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fa-solid fa-sun';
        } else {
            icon.className = 'fa-solid fa-cloud-moon';
        }
    });

    // Scroll reveal effect for sections
    const revealSections = () => {
        document.querySelectorAll('section').forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.bottom > 100 && rect.top < window.innerHeight - 100) {
                section.classList.add('revealed');
            } else {
                section.classList.remove('revealed');
            }
        });
    };
    window.addEventListener('scroll', revealSections);
    revealSections();

    // Add typing effect for hero description
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect when page loads
    window.addEventListener('load', () => {
        const heroDescription = document.querySelector('.hero-description p');
        if (heroDescription) {
            // Get only the text content without HTML tags
            const originalText = heroDescription.textContent;
            setTimeout(() => {
                typeWriter(heroDescription, originalText, 30);
            }, 1000);
        }
    });

    // Inline contact form mailto handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();
            const subject = encodeURIComponent('Contact Form Submission');
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
            window.location.href = `mailto:somarious2@gmail.com?subject=${subject}&body=${body}`;
        });
    }
});

const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
if (sidebar && sidebarToggle) {
    sidebarToggle.setAttribute('aria-expanded', 'false');
    sidebarToggle.setAttribute('aria-controls', 'sidebar');
    sidebarToggle.setAttribute('aria-label', 'Toggle sidebar');
    sidebar.setAttribute('id', 'sidebar');
    sidebarToggle.addEventListener('click', () => {
        const isOpen = sidebar.classList.toggle('active');
        sidebarToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

const navbar = document.querySelector('.navbar');
if (navbar) {
    let forced = false;
    const mq = window.matchMedia('(max-width: 780px)');
    const ensureState = () => {
        if (mq.matches) {
            navbar.classList.add('nav-force-open');
            forced = true;
        } else if (forced) {
            navbar.classList.remove('nav-force-open');
            forced = false;
        }
    };
    ensureState();
    mq.addEventListener('change', ensureState);
}

