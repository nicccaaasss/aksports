document.addEventListener("DOMContentLoaded", function () {
    const gamesLink = document.querySelector("#games-link");
    const menu = document.querySelector("#dropdown-menu");

    if (!gamesLink || !menu) return; // Prevent errors if elements are missing

    function toggleMenu(event) {
        event.preventDefault(); // Stops default link action
        event.stopPropagation(); // Stops event from bubbling up
        menu.style.display = (menu.style.display === "block") ? "none" : "block";
    }

    function closeAllMenus() {
        document.querySelectorAll(".dropdown-menu").forEach(menu => {
            menu.style.display = "none";
        });
    }

    gamesLink.addEventListener("click", toggleMenu);

    document.addEventListener("click", function () {
        closeAllMenus(); // Close menu when clicking outside
    });

    menu.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevents menu from closing when clicking inside
    });
});

            // Update the intro animation timeout
            setTimeout(() => {
                document.getElementById('intro').classList.add('hidden');
                document.body.classList.remove('no-scroll'); // Remove no-scroll class after animation
            }, 1300);
            
            const wrapper = document.querySelector('.slide-wrapper');
            const slides = document.querySelectorAll('.slide');
            let currentSlide = 0;
            let slideTimer;

            function moveSlide(direction) {
                currentSlide = (currentSlide + direction + slides.length) % slides.length;
                updateSlidePosition();
                updateIndicators();
                resetTimer();
            }

            function updateSlidePosition() {
                wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            }

            function resetTimer() {
                clearInterval(slideTimer);
                slideTimer = setInterval(() => moveSlide(1), 10000);
            }

            function goToSlide(index) {
                currentSlide = index;
                updateSlidePosition();
                updateIndicators();
                resetTimer();
            }

            function updateIndicators() {
                document.querySelectorAll('.indicator').forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentSlide);
                });
            }

            resetTimer();

            const boxObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            }, { threshold: 0.2 });
            
            document.querySelectorAll('.status-box, .timing-box').forEach(box => {
                boxObserver.observe(box);
            });