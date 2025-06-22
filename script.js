document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const navbar = document.querySelector(".navbar");
    const sections = document.querySelectorAll("section");
    const soundHoverElements = document.querySelectorAll(".activity-card, .project-card, .skill-tag");

    const hoverSound = new Audio('623990__eqylizer__button-hover-click.mp3');
    hoverSound.volume = 0.3;
    let audioUnlocked = false;

    function unlockAudio() {
        if (!audioUnlocked) {
            hoverSound.play().then(() => {
                hoverSound.pause();
                hoverSound.currentTime = 0;
                audioUnlocked = true;
                document.removeEventListener('click', unlockAudio);
                document.removeEventListener('touchstart', unlockAudio);
            }).catch(error => {
                // Ignore errors, as the hover event will still attempt to play.
            });
        }
    }

    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);

    // Hamburger menu toggle
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navLinks.forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    // Handle scroll events
    window.addEventListener("scroll", () => {
        // Navbar scroll effect
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Active link highlighting on scroll
        let current = "";
        const navbarHeight = navbar.offsetHeight;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - navbarHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // Sound effect for hover
    soundHoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (audioUnlocked) {
                hoverSound.currentTime = 0;
                hoverSound.play().catch(error => console.log("Audio play failed."));
            }
        });
    });
});
