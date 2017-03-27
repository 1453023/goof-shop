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

    var header = $('.navbar-header'),
        btn = $('button.navbar-toggle'),
        overlay = $('div.overlay');

    btn.on('click', function() {
        header.toggleClass('active');
        overlay.toggleClass('hidden');
    });

    // navbar scroll down to hide
    $('html').on('DOMMouseScroll mousewheel', function(e) {
        if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY
            //scroll down
            console.log('Down');
            $(".navbar").addClass("hide-nav-bar");
        } else {
            //scroll up
            console.log('Up');
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

    // menu sidebar click toggle
    $(".navToggle").on("click", function() {
        $(this).toggleClass("open");
        $("#menu").toggleClass("active");
        $("#sidebar").toggle(200, "linear");
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
})