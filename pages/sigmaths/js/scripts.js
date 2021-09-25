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

  // Expand menu on button click
  $('#navbar__menu__button').click(function () {
    $('#navbar__menu__button').find('div').toggleClass('active_hamburger');
    $('#navbarResponsive').slideToggle("slow");
  });

  // Show up weekly lessons modal box
  $('#pricing-weekly-lessons p').click(function () {
    $('#weekly-lessons-modal').css("display", "block");
  });

  // Show up package modal box
  $('#pricing-package p').click(function () {
    $('#package-modal').css("display", "block");
  });

  // Hide modal boxes on close button
  $( ".modal__container" ).click( function ( event ) {
    if( event.target.id == "weekly-lessons-modal" ) {
      $( "#weekly-lessons-modal" ).css("display", "none");
    }
    else if( event.target.id == "package-modal" ) {
      $( "#package-modal" ).css("display", "none");
    }
    else if( event.target.id == "mail-successfully-sent-modal" ) {
      $( "#mail-successfully-sent-modal" ).css("display", "none");
    };
  });

  // Hide modal boxes when clicked anywhere around
  $( ".modal__close__button" ).click( function () {
    $( "#weekly-lessons-modal" ).css("display", "none");
    $( "#package-modal" ).css("display", "none");
    $( "#mail-successfully-sent-modal" ).css("display", "none");
  });

  // Contact form handling
  $("#contact__form").submit(function(e) {
    // Uncomment it for working

    /*
    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);

    $.ajax({
          type: "POST",
          url: '../php/contact_form_handler.php',
          data: form.serialize(), // serializes the form's elements.
          success: function(data) {
            $('#mail-successfully-sent-modal').css("display", "block");
            $('#contact__form')[0].reset();
          },
          error: function(data) {
              alert(data); // show response from the php script.
          }
        });
    */
  });

  // Manage menu for smaller sizes
  if ( $(window).width() < 991.98 ) {
    // Hide menu if section ref clicked
    $( "#navbarResponsive ul li a" ).click( function () {
      $('#navbarResponsive').slideToggle("slow");
      $('#navbar__menu__button').find('div').toggleClass('active_hamburger');
    });
    
    // Hide menu if logo clicked
    $( "#brand_logo" ).click( function () {
      if( $('#navbar__menu__button').find('div').hasClass('active_hamburger') ) {
        $('#navbarResponsive').slideToggle("slow");
        $('#navbar__menu__button').find('div').toggleClass('active_hamburger');
      }
    });
  }
})(jQuery); // End of use strict