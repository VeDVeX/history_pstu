$(document).ready(function(){


    var $width = $(window).width(); // Ширина экрана
    if ($width <= 500) {
        $('.slider-section').fadeOut(0);
        $('.gallery-section').fadeOut(0);
    }

    
    if($(this).attr('class') != 'slide cur') {
        $('.slide').fadeOut(0);
        $('.slide.cur').fadeIn(0);
    }

    $('.next').click(function() {
        let lastCurSlideIndex = $('.slide.cur:last').index();
        let nextSlideIndex = lastCurSlideIndex + 1;
        let nextSlide = $('.slide').eq(nextSlideIndex);
        if (nextSlideIndex != ($('.slide:last').index() + 1)) {
            $('.slide.cur:first').fadeOut(150);
            $('.slide.cur:first').removeClass('cur');
            nextSlide.fadeIn(150);
            nextSlide.addClass('cur');
        }
    });



    $('.prev').click(function() {

        let firstCurSlideIndex = $('.slide.cur:first').index();
        let nextSlideIndex = firstCurSlideIndex - 1;
        let nextSlide = $('.slide').eq(nextSlideIndex);
        if (nextSlideIndex != ($('.slide:first').index() - 1)) {
            $('.slide.cur:last').fadeOut(150);
            $('.slide.cur:last').removeClass('cur');
            nextSlide.fadeIn(150);
            nextSlide.addClass('cur');
        }
    });
});