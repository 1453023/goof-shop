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