$(function() {
    var owlMen = $('#men-carousel');
    owlMen.owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        dots: false,
        autoplay: true,
        animateIn: 'fadeInLeft',
        animateOut: 'fadeOutRight',
        smartSpeed: 800
    });
    var owlWomen = $('#women-carousel');
    owlWomen.owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        dots: false,
        autoplay: true,
        animateIn: 'fadeInRight',
        animateOut: 'fadeOutLeft',
        smartSpeed: 800
    });

    // navbar scroll down to hide
    $('html').on('DOMMouseScroll mousewheel', function(e) {
        if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY
            //scroll down
            $(".navbar").addClass("hide-nav-bar");
        } else {
            //scroll up
            $(".navbar").removeClass("hide-nav-bar");
        }
        //prevent page fom scrolling
        //return false;
    });

    // search btn slide toggle
    var sliBtn = '.search-btn',
        sliCont = '.search-slide',
        sliTxt = '.search-slide input[type=text]',
        sliDis = '.search-close',
        sliSpd = 300;

    $(sliBtn).click(function() {
        $(sliCont).animate({ 'width': '15.5625em' }, sliSpd);
        $(sliTxt).focus();
    });
    $(sliDis).click(function() {
        $(sliCont).animate({ 'width': 0 }, sliSpd);
    });

    // toggle slide cart
    var $shadow_layer = $('#cd-shadow-layer'),
        $lateral_cart = $('#cd-cart'),
        $cart_trigger = $('#cd-cart-trigger');

    //open cart
    $cart_trigger.on('click', function(event) {
        event.preventDefault();
        $lateral_cart.addClass('speed-in');
        $shadow_layer.css({
            "opacity": 1,
            "z-index": 2
        });
    });

    //close lateral cart or lateral menu
    $shadow_layer.on('click', function() {
        $lateral_cart.removeClass('speed-in');
        $shadow_layer.css("opacity", "0");
        setTimeout(function() {
            $shadow_layer.css("z-index", "0");
        }, 500)
    });

    // menu sidebar click toggle
    $(".navToggle").on("click", function() {
        $(this).toggleClass("open");
        $("#goof-menu").toggleClass("active");
        if ($("#goof-menu").hasClass("active")) {
            $(".sidebar").css("right", "150%");
        } else {
            $(".sidebar").css("right", "0%");
        }
    })

    //sort filter menu
    var $typeList = $('#filter-type'),
        $typeListItem = $typeList.children('li');

    $typeListItem.sort(function(a, b) {
        var an = a.innerText,
            bn = b.innerText;
        if (an == "All" || bn == "All") { return 1; }
        if (an > bn) {
            return 1;
        }
        if (an < bn) {
            return -1;
        }
        return 0;
    });

    $typeListItem.detach().appendTo($typeList);

    // change img on hover
    var img_path = "/img/products/jacket/thumb_goof_product_jacket_";
    $(".img-block img").on("mouseenter", function() {
        var $el = $(this),
            main_src = $(this).attr("src"),
            sub_src = main_src.replace("1.png", "2.png");
        $el.attr("src", sub_src);
    });
    $(".img-block img").on("mouseout", function() {
        var $el = $(this),
            main_src = $(this).attr("src"),
            sub_src = main_src.replace("2.png", "1.png");
        $el.attr("src", sub_src);
    });

    // user edit
    var chosen_row;
    $(".edit-address").on("click", function() {
        chosen_row = $(this).parent().parent();
        chosen_row.hide();
        $("#row-form-address").show();
        $("#form-address").css("opacity", "1");
    });

    // typing animation
    (function($) {
        $.fn.writeText = function(content) {
            var contentArray = content.split(""),
                current = 0,
                elem = this;
            setInterval(function() {
                if (current < contentArray.length) {
                    elem.text(elem.text() + contentArray[current++]);
                }
            }, 80);
        };

    })(jQuery);

    // input text for typing animation 
    $("#holder").writeText("HIGH-END FAHSION / LUXURY STREET WEAR");

    var login_validate = $('#form-login').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: "required"
        },
        messages: {
            email: {
                required: "Please enter your email.",
                email: "Please enter a valid email address."
            },
            password: { required: "Please enter your password." }
        }
    });

    var register_validate = $('#form-create').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 8,
            },
            cfm_password: {
                required: true,
                minlength: 8,
                equalTo: '#input-password'
            },
            gender: "required",
            region: "required",
            policy: "required"
        },
        messages: {
            email: {
                required: "Please enter your email.",
                email: "Please enter a valid email address."
            },
            password: {
                required: "Please enter your password.",
                minlength: jQuery.register_validate.format("Password must be at least {0} characters")
            },
            cfm_password: {
                required: "Please confirm your password.",
                minlength: jQuery.register_validate.format("Password must be at least {0} characters"),
                equalTo: "Your password does not match with each other."
            },
            gender: { required: "Please choose your gender." },
            region: { required: "Please choose  your region." },
            policy: { required: "Please check this box to continue." }
        }
    });
})