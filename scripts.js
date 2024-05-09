$(document).ready(function() {
    // Function to update circle progress based on data-progress attribute
    function updateCircleProgress() {
        $('.circle-progress').each(function() {
            var progress = $(this).data('progress');
            var degrees = progress * 3.6; // 360 degrees for full progress

            // Update the circle's background to create the progress effect
            $(this).css('background-image', 'conic-gradient(#4caf50 ' + degrees + 'deg, #eee ' + degrees + 'deg)');
        });
    }

    // Call the function initially and on window resize
    updateCircleProgress();
    $(window).resize(updateCircleProgress);

    // Smooth scrolling for anchor links
    $("a[href^='#']").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });

    // Navbar background color change on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar-default').addClass('navbar-scrolled');
        } else {
            $('.navbar-default').removeClass('navbar-scrolled');
        }
    });

    // Close dropdown menu on click outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.navbar-collapse').length) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    // Initialize tooltips and popovers
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
});