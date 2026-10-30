const slides = [
    {
        image: "./assets/images/slideshow/slide1.jpg",
        tagLine: "Impressions tous formats <span>en boutique et en ligne</span>"
    },
    {
        image: "./assets/images/slideshow/slide2.jpg",
        tagLine: "Tirages haute définition grand format <span>pour vos bureaux et events</span>"
    },
    {
        image: "./assets/images/slideshow/slide3.jpg",
        tagLine: "Grand choix de couleurs <span>de CMJN aux pantones</span>"
    },
    {
        image: "./assets/images/slideshow/slide4.jpg",
        tagLine: "Autocollants <span>avec découpe laser sur mesure</span>"
    }
];

const image = document.getElementById("slide");
const text = document.getElementById("text");
const previousArrow = document.getElementById("LeftArrow");
const nextArrow = document.getElementById("RightArrow");
const dotsContainer = document.querySelector(".dots");

let currentSlide = 0;
let autoplay;

// Création des points de navigation.
slides.forEach((slide, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.setAttribute("role", "button");
    dot.setAttribute("tabindex", "0");
    dot.setAttribute("aria-label", `Afficher la diapositive ${index + 1}`);

    dot.addEventListener("click", () => {
        showSlide(index);
        restartAutoplay();
    });

    dot.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            showSlide(index);
            restartAutoplay();
        }
    });

    dotsContainer.appendChild(dot);
});

function showSlide(index) {
    // Le modulo assure la boucle infinie dans les deux sens.
    currentSlide = (index + slides.length) % slides.length;

    image.src = slides[currentSlide].image;
    text.innerHTML = slides[currentSlide].tagLine;
    image.alt = slides[currentSlide].tagLine.replace(/<[^>]*>/g, "");

    document.querySelectorAll(".dot").forEach((dot, dotIndex) => {
        dot.classList.toggle("dot_selected", dotIndex === currentSlide);
    });
}

function previousSlide() {
    showSlide(currentSlide - 1);
    restartAutoplay();
}

function nextSlide() {
    showSlide(currentSlide + 1);
    restartAutoplay();
}

previousArrow.addEventListener("click", previousSlide);
nextArrow.addEventListener("click", nextSlide);

// Accessibilité clavier pour les flèches.
previousArrow.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        previousSlide();
    }
});
nextArrow.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        nextSlide();
    }
});

// Défilement automatique toutes les 5 secondes.
function startAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(nextSlide, 5000);
}

function restartAutoplay() {
    startAutoplay();
}

// Pause au survol du carrousel.
const banner = document.getElementById("banner");
banner.addEventListener("mouseenter", () => clearInterval(autoplay));
banner.addEventListener("mouseleave", startAutoplay);

showSlide(0);
startAutoplay();
