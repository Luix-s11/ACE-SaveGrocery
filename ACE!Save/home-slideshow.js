(function () {
    const slideInterval = 10000;

    document.querySelectorAll(".hero-carousel").forEach(function (carousel) {
        const track = carousel.querySelector(".hero-track");
        const slides = Array.from(track.children);

        if (slides.length < 2) {
            return;
        }

        let currentSlide = 0;

        function showSlide(index) {
            currentSlide = index;
            track.style.transform = "translateX(-" + (currentSlide * 100) + "%)";
            slides.forEach(function (slide, slideIndex) {
                slide.setAttribute("aria-hidden", slideIndex === currentSlide ? "false" : "true");
            });
        }

        showSlide(currentSlide);

        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            window.setInterval(function () {
                showSlide((currentSlide + 1) % slides.length);
            }, slideInterval);
        }
    });
})();
