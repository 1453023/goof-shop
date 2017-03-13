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

    var $typeList = $('#filter-type'),
        $typeListItem = $typeList.children('li');
    console.log($typeListItem);

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
    console.log($typeListItem);

    $typeListItem.detach().appendTo($typeList);
})