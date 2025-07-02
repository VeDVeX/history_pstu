$(document).ready(function() { 
    $('.header__burger').click(function(event) {
        $('.header__burger,.nav__bar').toggleClass('active');
        $('body').toggleClass('lock');
    })
    $('.aaa').click(function(event){
        $('.header__burger,.nav__bar').removeClass('active');
        $('body').removeClass('lock')
    })
})