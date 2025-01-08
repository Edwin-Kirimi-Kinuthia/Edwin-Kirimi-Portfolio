$(document).ready(function() {
    // Initialize all functionality
    initNavbar();
    initProgressBars();
    initSmoothScroll();
    initScrollReveal();
    initMobileMenu();
});

// Navbar initialization and handling
function initNavbar() {
    const navbar = $('#header-nav');
    let lastScrollTop = 0;

    $(window).scroll(function() {
        const scrollTop = $(window).scrollTop();
        
        // Add/remove background when scrolling
        if (scrollTop > 50) {
            navbar.css({
                'background-color': 'rgba(255, 255, 255, 0.98)',
                'box-shadow': '0 2px 10px rgba(0, 0, 0, 0.1)'
            });
        } else {
            navbar.css({
                'background-color': 'rgba(255, 255, 255, 0.98)',
                'box-shadow': 'none'
            });
        }
        
        lastScrollTop = scrollTop;
    });
}

// Mobile menu handling
function initMobileMenu() {
    const navbarToggle = $('.navbar-toggle');
    const navbarCollapse = $('.navbar-collapse');
    const navbarBrand = $('.navbar-brand');

    // Handle menu toggle click
    navbarToggle.click(function(e) {
        e.stopPropagation();
        navbarToggle.toggleClass('collapsed');
        navbarCollapse.toggleClass('in');
        navbarBrand.toggleClass('menu-open');
    });

    // Close mobile menu when clicking outside
    $(document).click(function(event) {
        if (!navbarToggle.is(event.target) && 
            !navbarCollapse.is(event.target) && 
            navbarCollapse.has(event.target).length === 0 && 
            navbarCollapse.hasClass('in')) {
            
            navbarToggle.addClass('collapsed');
            navbarCollapse.removeClass('in');
            navbarBrand.removeClass('menu-open');
        }
    });

    // Close menu when window is resized to larger screen
    $(window).resize(function() {
        if ($(window).width() > 768) {
            navbarCollapse.removeClass('in');
            navbarToggle.addClass('collapsed');
            navbarBrand.removeClass('menu-open');
        }
    });
}

// Progress bars initialization and animation
function initProgressBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = $(entry.target).find('.progress-bar');
                progressBars.each(function() {
                    const percent = $(this).data('percent');
                    $(this).css('--percent', percent);
                    setTimeout(() => {
                        $(this).addClass('animated');
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe the skills section
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Smooth scrolling functionality
function initSmoothScroll() {
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();

        const target = $(this.getAttribute('href'));
        if (target.length) {
            const offset = target.offset().top - $('#header-nav').outerHeight();
            $('html, body').animate({
                scrollTop: offset
            }, 800, 'easeInOutQuad');

            // Close mobile menu if open
            $('.navbar-collapse').removeClass('in');
            $('.navbar-toggle').addClass('collapsed');
            $('.navbar-brand').removeClass('menu-open');
        }
    });
}

// Scroll reveal animations
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                if ($(entry.target).hasClass('project-card') || 
                    $(entry.target).hasClass('certificate-card')) {
                    entry.target.classList.add('animate-slide-up');
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements that should animate
    $('.tile, .project-card, .certificate-card, .testimonial-card').each(function() {
        observer.observe(this);
    });
}

// Add active class to nav items on scroll
$(window).scroll(function() {
    const scrollPosition = $(document).scrollTop();
    
    $('section').each(function() {
        const currentSection = $(this);
        const sectionTop = currentSection.offset().top - 100;
        const sectionBottom = sectionTop + currentSection.outerHeight();
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            const id = currentSection.attr('id');
            $('nav a').removeClass('active');
            $('nav a[href="#' + id + '"]').addClass('active');
        }
    });
});

// Form submission handling (if contact form exists)
$('form').submit(function(e) {
    e.preventDefault();
    
    // Add loading state to button
    const submitButton = $(this).find('button[type="submit"]');
    submitButton.prop('disabled', true).addClass('loading');
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        submitButton.prop('disabled', false).removeClass('loading');
        showMessage('Message sent successfully!', 'success');
        this.reset();
    }, 2000);
});

// Helper function to show messages
function showMessage(message, type) {
    const messageDiv = $('<div>')
        .addClass(`alert alert-${type}`)
        .text(message)
        .hide()
        .insertBefore('form')
        .fadeIn();

    setTimeout(() => {
        messageDiv.fadeOut(() => messageDiv.remove());
    }, 3000);
}

// Update copyright year automatically
$('.copyright').html(`© ${new Date().getFullYear()} Edwin Kirimi Kinuthia. All rights reserved.`);

// Handle external links
$('a[href^="http"]').attr('target', '_blank').attr('rel', 'noopener noreferrer');

// Add loading animation for images
$('img').on('load', function() {
    $(this).addClass('loaded');
}).each(function() {
    if (this.complete) {
        $(this).addClass('loaded');
    }
});

// Add smooth scroll polyfill for older browsers
if (!window.CSS || !CSS.supports('scroll-behavior', 'smooth')) {
    $('html').css('scroll-behavior', 'auto');
}

// Handle back to top functionality
$(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('fast');
    } else {
        $('.back-to-top').fadeOut('fast');
    }
});

$('.back-to-top').click(function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop: 0}, 800);
});