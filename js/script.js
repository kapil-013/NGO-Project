document.addEventListener('DOMContentLoaded', () => {

    // --- Hamburger Menu Logic ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            
        }));
    }

    // --- Impact Number Counter Animation ---
    const impactNumbers = document.querySelectorAll('.impact-number, .impact-number-slow');

    if (impactNumbers.length > 0) {
        const startCounter = (counter) => {
            let speed;
            if (counter.classList.contains('impact-number-slow')) {
                speed = 2000; // Slower speed
            } else {
                speed = 100; // Default fast speed
            }
            const target = +counter.getAttribute('data-target');
            const updateCount = () => {
                const count = +counter.innerText;
                const increment = target / speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    impactNumbers.forEach(counter => {
                        counter.innerText = '0';
                        startCounter(counter);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        const impactSection = document.querySelector('.impact-section');
        if (impactSection) {
            observer.observe(impactSection);
        }
    }

    // --- Video Slider & Playback Control (Corrected Logic) ---
    const videoSlider = document.querySelector('.video-slider');

    if (videoSlider) {
        // STEP 1: Duplicate the slides first to create the seamless loop.
        const slides = videoSlider.innerHTML;
        videoSlider.innerHTML += slides;

        // STEP 2: NOW, select ALL videos from the container (originals AND copies).
        const allVideos = document.querySelectorAll('.video-slide video');

        if (allVideos.length > 0) {
            // STEP 3: Add the playback rules to ALL videos.

            // Logic for playing one video at a time
            allVideos.forEach(video => {
                video.addEventListener('play', () => {
                    allVideos.forEach(otherVideo => {
                        if (otherVideo !== video) {
                            otherVideo.pause();
                        }
                    });
                });
            });

            // Logic for pausing videos when they scroll out of view
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        entry.target.pause();
                    }
                });
            }, { 
                threshold: 0.5 
            });

            // Tell the observer to watch every single video
            allVideos.forEach(video => {
                videoObserver.observe(video);
            });
        }
    }
});