// // Allow to show scroll to top button
// $(document).ready(function() {
//     // Hide the button to return to the top of the page initially
//     $('#toTopBtn').hide();
//     // Processing triggered on scroll
//     $(window).scroll(function() {
//         if ($(this).scrollTop() > 1500) {
//             $('#toTopBtn').fadeIn();
//         } else {
//             $('#toTopBtn').fadeOut();
//         }
//     });
//     // Processing triggered by the click of the button to return to the top of the page
//     $('#toTopBtn').click(function() {
//         $('html, body').animate({
//             scrollTop: 0
//         }, 350);
//         return false;
//     });
// });