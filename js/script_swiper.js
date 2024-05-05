// Allow to create a swiper slider for the certifications section
$(document).ready(function() {
    const swiper = new Swiper('.certifications-slider', {
        effect: 'cards',
        grabCursor: true,
        autoplay: {
            delay: 1500,
            pauseOnMouseEnter: true
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
    });
});