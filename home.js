document.addEventListener("DOMContentLoaded", function () {
    const gamesLink = document.querySelector("#games-link");
    const dropdownMenu = document.querySelector("#dropdown-menu");
    let isOpen = false;

    if (!gamesLink || !dropdownMenu) return;

    gamesLink.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        isOpen = !isOpen;
        
        if (isOpen) {
            dropdownMenu.classList.add("show");
            dropdownMenu.style.display = "block";
        } else {
            dropdownMenu.classList.remove("show");
            dropdownMenu.style.display = "none";
        }
    });

    document.addEventListener("click", function(event) {
        if (!dropdownMenu.contains(event.target) && !gamesLink.contains(event.target)) {
            isOpen = false;
            dropdownMenu.classList.remove("show");
            dropdownMenu.style.display = "none";
        }
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

            // Add Intersection Observer for scroll animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1
            });

            // Observe the content box
            observer.observe(document.querySelector('.content-box'));

            // Update Intersection Observer for scroll animations
            const textObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view', 'animated');
                        // Unobserve after animation is triggered
                        textObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '-50px'
            });

            // Observe both boxes
            textObserver.observe(document.querySelector('.content-box'));
            textObserver.observe(document.querySelector('.logo-box'));

            // Add observer for new location section
            textObserver.observe(document.querySelector('.location-text'));

            // Add map box to observer
            textObserver.observe(document.querySelector('.map-box'));

            // Add header section to observer
            textObserver.observe(document.querySelector('.header-section'));

            // Add both header sections to observer
            document.querySelectorAll('.header-section').forEach(header => {
                textObserver.observe(header);
            });

            // Add timing box to observer
            document.querySelectorAll('.timing-box').forEach(box => {
                textObserver.observe(box);
            });

            // Add observer for motto boxes
            document.querySelectorAll('.motto-box').forEach(box => {
                textObserver.observe(box);
            });
const bodyChildren = Array.from($0.children);
const elementsToUpdate = bodyChildren.filter(child => {
  const styles = window.getComputedStyle(child);
  return styles.width === '980px';
});
for (const element of elementsToUpdate) {
  await setElementStyles(element, { maxWidth: '100%', width: 'auto' });
}
const updatedChildWidths = elementsToUpdate.map(child => {
  const styles = window.getComputedStyle(child);
  return {
    tagName: child.tagName,
    id: child.id,
    className: child.className,
    width: styles.width,
  };
});
const bodyStyle = window.getComputedStyle($0);
const data = {
  updatedChildWidths,
  bodyWidth: bodyStyle.width,
};
