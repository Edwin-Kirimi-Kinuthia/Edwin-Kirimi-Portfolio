$(document).ready(function() {
    // Progress Circle Animation
    function setProgress(circle, percent) {
        const rightBar = circle.find('.progress-right .progress-bar');
        const leftBar = circle.find('.progress-left .progress-bar');
        
        // Reset transforms
        rightBar.css('transform', 'rotate(0deg)');
        leftBar.css('transform', 'rotate(0deg)');
        
        setTimeout(() => {
            if (percent > 50) {
                rightBar.css('transform', 'rotate(180deg)');
                setTimeout(() => {
                    leftBar.css('transform', `rotate(${(percent - 50) * 3.6}deg)`);
                }, 800);
            } else {
                rightBar.css('transform', `rotate(${percent * 3.6}deg)`);
            }
        }, 100);
    }

    // Initialize Progress Circles
    function initializeProgressCircles() {
        $('.progress-circle').each(function() {
            const percent = $(this).data('percent');
            $(this).find('.progress-value').text(percent + '%');
        });
    }

    // Handle Progress Circle Animation on Scroll
    function handleScrollAnimation() {
        $('.progress-circle').each(function() {
            const circle = $(this);
            const circlePosition = circle.offset().top;
            const scrollPosition = $(window).scrollTop();
            const windowHeight = $(window).height();

            if (scrollPosition > circlePosition - windowHeight + 100 && !circle.hasClass('animated')) {
                const percent = circle.data('percent');
                setProgress(circle, percent);
                circle.addClass('animated');
            }
        });
    }

    // Smooth Scrolling
    $("a[href^='#']").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            const hash = this.hash;
            const headerHeight = $('#header-nav').outerHeight();
            
            $('html, body').animate({
                scrollTop: $(hash).offset().top - headerHeight
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });

    // Navbar Background on Scroll
    function handleNavbarScroll() {
        if ($(window).scrollTop() > 50) {
            $('#header-nav').addClass('navbar-scrolled').css('background-color', 'rgba(255, 255, 255, 0.95)');
        } else {
            $('#header-nav').removeClass('navbar-scrolled').css('background-color', 'white');
        }
    }

    // Mobile Menu Handling
    $('.navbar-toggle').on('click', function() {
        if ($('#collapsable-nav').hasClass('in')) {
            $(this).addClass('collapsed');
        } else {
            $(this).removeClass('collapsed');
        }
    });

    // Close Mobile Menu on Outside Click
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.navbar-header').length) {
            const navbar = $('#collapsable-nav');
            if (navbar.hasClass('in')) {
                navbar.collapse('hide');
                $('.navbar-toggle').addClass('collapsed');
            }
        }
    });

    // Initialize Components
    initializeProgressCircles();
    handleScrollAnimation();
    handleNavbarScroll();

    // Event Listeners
    $(window).on('scroll', function() {
        handleScrollAnimation();
        handleNavbarScroll();
    });

    $(window).on('resize', function() {
        handleScrollAnimation();
    });

    // Initialize Bootstrap Components
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    // Handle external links
    $('a[target="_blank"]').on('click', function(e) {
        const href = $(this).attr('href');
        if (href && href.indexOf('http') === 0) {
            e.preventDefault();
            window.open(href, '_blank');
        }
    });
});
