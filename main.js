document.addEventListener('DOMContentLoaded', function() {
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    
    const slider = document.querySelector('.hero-slider');
    if (slider) {
        const slides = slider.querySelectorAll('.slide');
        let currentSlide = 0;

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        slides[0].classList.add('active');
        setInterval(nextSlide, 5000); 
    }


    const playersSection = document.querySelector('.players-section');
    if (playersSection) {
        const searchInput = document.querySelector('#player-search');
        const positionFilter = document.querySelector('#position-filter');
        const playerCards = document.querySelectorAll('.player-card');

        function filterPlayers() {
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            const selectedPosition = positionFilter ? positionFilter.value : '';

            playerCards.forEach(card => {
                const name = card.querySelector('.player-name').textContent.toLowerCase();
                const position = card.getAttribute('data-position');

                const matchesSearch = name.includes(searchTerm);
                const matchesPosition = !selectedPosition || position === selectedPosition;

                if (matchesSearch && matchesPosition) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', filterPlayers);
        }
        if (positionFilter) {
            positionFilter.addEventListener('change', filterPlayers);
        }
    }

    // Matches Page: Filter by Date or Type (assuming match cards with class 'match-card' and data-date, data-type)
    const matchesSection = document.querySelector('.matches-section');
    if (matchesSection) {
        const dateFilter = document.querySelector('#date-filter');
        const typeFilter = document.querySelector('#type-filter');
        const matchCards = document.querySelectorAll('.match-card');

        function filterMatches() {
            const selectedDate = dateFilter ? dateFilter.value : '';
            const selectedType = typeFilter ? typeFilter.value : '';

            matchCards.forEach(card => {
                const date = card.getAttribute('data-date');
                const type = card.getAttribute('data-type');

                const matchesDate = !selectedDate || date === selectedDate;
                const matchesType = !selectedType || type === selectedType;

                if (matchesDate && matchesType) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        if (dateFilter) {
            dateFilter.addEventListener('change', filterMatches);
        }
        if (typeFilter) {
            typeFilter.addEventListener('change', filterMatches);
        }
    }

    // Contact Page: Form Validation and Submission
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic validation
            const name = document.querySelector('#name').value.trim();
            const email = document.querySelector('#email').value.trim();
            const message = document.querySelector('#message').value.trim();
            const errorMessage = document.querySelector('#form-error');

            if (!name || !email || !message) {
                if (errorMessage) {
                    errorMessage.textContent = 'Please fill in all fields.';
                }
                return;
            }

            if (!validateEmail(email)) {
                if (errorMessage) {
                    errorMessage.textContent = 'Please enter a valid email.';
                }
                return;
            }

            // Simulate submission (replace with actual fetch to backend if available)
            console.log('Form submitted:', { name, email, message });
            alert('Your message has been sent successfully!');
            contactForm.reset();
            if (errorMessage) {
                errorMessage.textContent = '';
            }
        });

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
    }

    // About Page: Accordion for FAQs or Sections (assuming .accordion-item)
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', function() {
                const content = item.querySelector('.accordion-content');
                if (content) {
                    content.classList.toggle('active');
                    item.classList.toggle('active');
                }
            });
        }
    });

    // Lazy Loading Images (for performance)
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Back to Top Button
    const backToTop = document.querySelector('#back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});