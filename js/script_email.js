/* $(document).ready(function () {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    $('#btn-submit').click(function (event) {
        event.preventDefault();

        const name = $('#input-name').val();
        const email = $('#input-email').val();
        const subject = $('#input-subject').val();
        const message = $('#text-area-message').val();

        const isValidEmail = (email) => {
            // Utilisez une expression régulière pour vérifier la validité de l'adresse e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        const resetForm = () => {
            $('#contact-form').removeClass('was-validated').trigger('reset');
            $('#btn-submit').prop('disabled', false).removeClass('disabled');
            $('#input-loader').hide();
        };

        const handleSuccess = () => {
            Toast.fire({
                icon: 'success',
                title: 'Your message has successfully been sent.'
            });
            resetForm();
        };

        const handleError = (error) => {
            Toast.fire({
                icon: 'error',
                title: 'Your message has not been sent.<br/>Error: ' + error,
            });
            resetForm();
        };

        const handleValidationError = () => {
            Toast.fire({
                icon: 'error',
                title: 'Please fill all the fields.',
            });
            $('#contact-form').addClass('was-validated');
        };

        if (name && email && isValidEmail(email) && subject && message) {
            $('#btn-submit').prop('disabled', true).addClass('disabled');
            $('#input-loader').fadeIn(200);

            emailjs.send('service_jw4faab', 'template_a4ztb85', {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
            }).then(handleSuccess, handleError);
        } else {
            handleValidationError();
        }
    });
});
 */