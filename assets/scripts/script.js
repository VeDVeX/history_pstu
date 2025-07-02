document.addEventListener("DOMContentLoaded", function() {
    const anchors = document.querySelectorAll('a[href*="#"]');

    for (let anchor of anchors) {
        anchor.addEventListener("click", function(event) {
            event.preventDefault();
            const blockID = anchor.getAttribute('href');
            const targetElement = document.querySelector(blockID);
            const topOffset = targetElement.getBoundingClientRect().top + window.pageYOffset; // Учитываем отступы и текущую позицию прокрутки
            window.scrollTo({
                top: topOffset,
                behavior: "smooth"
            });
        });
    }
});