// Función para manejar el desplazamiento suave
function smoothScroll(target, duration) {
    var targetElement = document.querySelector(target);
    var targetPosition = targetElement.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Agregar evento de clic al botón CTA
var ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', function(e) {
    e.preventDefault();
    smoothScroll('#about', 1000);
});

// Función para cargar imágenes de manera lazy
function lazyLoadImages() {
    var images = document.querySelectorAll('img[data-src]');
    var options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    var imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var image = entry.target;
                image.src = image.getAttribute('data-src');
                image.removeAttribute('data-src');
                imageObserver.unobserve(image);
            }
        });
    }, options);

    images.forEach(function(image) {
        imageObserver.observe(image);
    });
}

// Ejecutar lazyLoadImages cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', lazyLoadImages);