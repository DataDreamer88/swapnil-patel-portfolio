// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when a nav link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Sticky header
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Active menu based on scroll position
    const sections = document.querySelectorAll('section');
    
    function setActiveLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    // Initialize active link on page load
    setActiveLink();
    
    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';

        // Use EmailJS to send form
        emailjs.sendForm('service_i287ixm', 'template_36fq8hi', contactForm)
            .then(function(response) {
                contactForm.reset();
                alert('✅ Thank you! Check if you have recieved a mail from me. If not please enter correct email and try again.');
                submitBtn.innerHTML = 'Message Sent!';
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }, 3000);
            }, function(error) {
                console.error('EmailJS error:', error);
                alert('❌ Failed to send message. Please try again.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
    });
}

    // Add animation effects on scroll
    const animateElements = document.querySelectorAll('.project-card, .timeline-item, .volunteering-card, .extracurricular-card, .skills-category-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
        // Initially hide elements that will be animated
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Add CSS class for animated elements
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .animate {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);
    
    // Project filtering functionality (optional)
    const projectCards = document.querySelectorAll('.project-card');
    const addFilterButtons = () => {
        const projectsSection = document.querySelector('#projects .section-header');
        if (!projectsSection || projectCards.length === 0) return;
        
        // Extract unique tags from projects
        const allTags = new Set();
        projectCards.forEach(card => {
            const tagElements = card.querySelectorAll('.project-tags span');
            tagElements.forEach(tag => {
                allTags.add(tag.textContent);
            });
        });
        
        // Create filter buttons
        const filterContainer = document.createElement('div');
        filterContainer.className = 'project-filters';
        filterContainer.innerHTML = '<button class="filter-btn active" data-filter="all">All</button>';
        
        allTags.forEach(tag => {
            filterContainer.innerHTML += `<button class="filter-btn" data-filter="${tag}">${tag}</button>`;
        });
        
        projectsSection.insertAdjacentElement('afterend', filterContainer);
        
        // Add filtering functionality
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                        return;
                    }
                    
                    const tagElements = card.querySelectorAll('.project-tags span');
                    let hasTag = false;
                    
                    tagElements.forEach(tag => {
                        if (tag.textContent === filter) {
                            hasTag = true;
                        }
                    });
                    
                    card.style.display = hasTag ? 'block' : 'none';
                });
            });
        });
        
        // Add CSS for filter buttons
        document.head.insertAdjacentHTML('beforeend', `
            <style>
                .project-filters {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-bottom: 30px;
                }
                
                .filter-btn {
                    background-color: #f2f2f2;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .filter-btn.active,
                .filter-btn:hover {
                    background-color: var(--primary-color);
                    color: white;
                }
                
                @media (max-width: 576px) {
                    .project-filters {
                        gap: 5px;
                        margin-bottom: 20px;
                    }
                    
                    .filter-btn {
                        padding: 6px 12px;
                        font-size: 12px;
                    }
                }
            </style>
        `);
    };
    
    // Only add filter buttons if there are projects
    if (document.querySelector('#projects')) {
        addFilterButtons();
    }
    
    // Enable image lightbox for project images
    const projectImages = document.querySelectorAll('.project-img img');
    
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close-lightbox">&times;</span>
            <img class="lightbox-image">
        </div>
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const closeLightbox = lightbox.querySelector('.close-lightbox');
    
    // Show lightbox on image click
    projectImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    closeLightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Add CSS for lightbox
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .lightbox {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                justify-content: center;
                align-items: center;
                z-index: 2000;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            
            .lightbox-image {
                max-width: 100%;
                max-height: 90vh;
                object-fit: contain;
            }
            
            .close-lightbox {
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 30px;
                cursor: pointer;
            }
        </style>
    `);
});