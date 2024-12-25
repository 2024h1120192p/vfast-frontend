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
        $(this).css('background-image', `url("${bg}")`);
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

    $("#bookingForm").on('submit', function (e) {
        e.preventDefault();

        let check_in_date = new Date($("#startDate").val());
        check_in_date  = `${check_in_date.getFullYear()}-${check_in_date.getMonth()+1}-${check_in_date.getDate()}`

        let check_out_date = new Date($("#endDate").val());
        check_out_date = `${check_out_date.getFullYear()}-${check_out_date.getMonth()+1}-${check_out_date.getDate()}`

        if (!$('#agreeTerms').is(':checked')) {
            alert("Please check the box to agree with the Terms and Conditions.");
            return false;
        } else {
            var booking_data = {
                first_name: $("#firstName").val(),
                last_name: $("#lastName").val(),
                gender: $("#gender").val(),
                purpose_of_visit: $("#purpose").val(),
                relation_to_user: $("#relation_to_user").val(),
                remarks: "",
                email: $("#email").val(),
                phone_number: $("#phone").val(),
                check_in: check_in_date,
                check_out: check_out_date,
                room_type: $("#roomType").val(),
                // roomCount: $("#roomCount").val(),
                pax: $("#guestCount").val()
            };

            console.log(booking_data);

            $.ajax({
                type: "POST",
                url: "https://ec2-15-207-110-230.ap-south-1.compute.amazonaws.com/api/v1/booking/booking-request",
                headers : {
                    "Authorization" : `Bearer ${getAuthToken()}`
                },
                data: JSON.stringify(booking_data),
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    alert("Your booking request has been submitted successfully.");
                    e.target.reset();
                    window.location.href = "./dashboard.html"
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                    alert("There was an error submitting your booking request.");
                }
            });
        }
    });

})(jQuery);
