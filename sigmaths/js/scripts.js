(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 72)
        }, 500, "easeInOutExpo");

        return false;
      }
    }
  });

  $('#navbar__menu__button').click(function () {
    $('#navbarResponsive').toggleClass('menu_expand');
    $('#navbar__menu__button').find('div').toggleClass('active_hamburger');
  });

  $('#pricing-weekly-lessons p').click(function () {
    $('#weekly-lessons-modal').css("display", "block")
  });

  $('#pricing-package p').click(function () {
    $('#package-modal').css("display", "block")
  });

  $( ".modal__container" ).click( function ( event ) {
    if( event.target.id == "weekly-lessons-modal" ) {
      $( "#weekly-lessons-modal" ).css("display", "none");
    }
    else if( event.target.id == "package-modal" ) {
      $( "#package-modal" ).css("display", "none");
    };
  });

  $( ".modal__close__button" ).click( function () {
    $( "#weekly-lessons-modal" ).css("display", "none");
    $( "#package-modal" ).css("display", "none");
  });
})(jQuery); // End of use strict
