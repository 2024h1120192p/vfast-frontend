'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Offcanvas Menu
    $(".canvas-open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".canvas-close, .offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    // Search model
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    /*------------------
        Navigation
    --------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Hero Slider
    --------------------*/
    $(".hero-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        mouseDrag: false
    });

    /*------------------------
        Testimonial Slider
    ----------------------- */
    $(".testimonial-slider").owlCarousel({
        items: 1,
        dots: false,
        autoplay: true,
        loop: true,
        smartSpeed: 1200,
        nav: true,
        navText: ["<i class='arrow_left'></i>", "<i class='arrow_right'></i>"]
    });

    /*------------------
        Magnific Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
        Date Picker
    --------------------*/
    $(".date-input").datepicker({
        minDate: 0,
        dateFormat: 'dd MM, yy'
    });

    /*------------------
        Nice Select
    --------------------*/
    $("select").niceSelect();

    // $("#bookingForm").on('submit', function (e) {
    //     e.preventDefault();
    //     if (!$('#agreeTerms').is(':checked')) {
    //         alert("Please check the box to agree with the Terms and Conditions.");
    //     } else {
    //         var data = {
    //             firstName: $("#firstName").val(),
    //             lastName: $("#lastName").val(),
    //             email: $("#email").val(),
    //             age: $("#age").val(),
    //             guestCount: $("#guestCount").val(),
    //             phone: $("#phone").val(),
    //             checkIn: $("#startDate").val(),
    //             checkOut: $("#endDate").val(),
    //             roomType: $("#roomType").val(),
    //             roomCount: $("#roomCount").val(),
    //             purpose: $("#purpose").val()
    //         };

    //         $.ajax({
    //             type: "POST",
    //             url: "https://ec2-15-207-110-230.ap-south-1.compute.amazonaws.com/api/v1/booking/booking-request",
    //             data: JSON.stringify(data),
    //             contentType: "application/json",
    //             dataType: "json",
    //             success: function (response) {
    //                 alert("Your booking request has been submitted successfully.");
    //                 e.target.reset();
    //             },
    //             error: function (xhr, status, error) {
    //                 console.error("Error:", error);
    //                 alert("There was an error submitting your booking request.");
    //             }
    //         });
    //     }
    // });

})(jQuery);
