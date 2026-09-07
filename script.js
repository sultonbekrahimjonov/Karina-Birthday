/* =========================
   KARINA BIRTHDAY WEBSITE
========================= */

/* =========================
   PAGE NAVIGATION
========================= */

const pages = [
    document.getElementById("page1"),
    document.getElementById("page2"),
    document.getElementById("page3")
];

let currentPage = 0;

function nextPage() {
    if (currentPage < pages.length - 1) {
        currentPage++;

        pages[currentPage].scrollIntoView({
            behavior: "smooth"
        });
    }
}

function restart() {
    currentPage = 0;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   MUSIC
========================= */

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;


/* Try autoplay */

window.addEventListener("load", () => {

    music.volume = 0.45;

    music.play()
        .then(() => {
            musicPlaying = true;
            musicBtn.textContent = "🔊";
        })
        .catch(() => {
            musicPlaying = false;
            musicBtn.textContent = "🎵";
        });

});


/* Music button */

musicBtn.addEventListener("click", () => {

    if (musicPlaying) {

        music.pause();
        musicPlaying = false;
        musicBtn.textContent = "🎵";

    } else {

        music.play()
            .then(() => {
                musicPlaying = true;
                musicBtn.textContent = "🔊";
            })
            .catch(() => {
                musicPlaying = false;
                musicBtn.textContent = "🎵";
            });

    }

});


/* Start music after first interaction */

document.addEventListener("click", () => {

    if (!musicPlaying) {

        music.play()
            .then(() => {
                musicPlaying = true;
                musicBtn.textContent = "🔊";
            })
            .catch(() => {});

    }

}, { once: true });


/* =========================
   PHOTO LIGHTBOX
========================= */

const photos = document.querySelectorAll(".photo img");

const lightbox = document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

let currentPhoto = 0;


/* Open photo */

photos.forEach((photo, index) => {

    photo.addEventListener("click", () => {

        currentPhoto = index;
        openLightbox();

    });

});


function openLightbox() {

    lightboxImage.src = photos[currentPhoto].src;
    lightboxImage.alt = photos[currentPhoto].alt;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* Close photo */

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}


/* Next photo */

function nextPhoto() {

    currentPhoto++;

    if (currentPhoto >= photos.length) {
        currentPhoto = 0;
    }

    lightboxImage.src = photos[currentPhoto].src;
    lightboxImage.alt = photos[currentPhoto].alt;

}


/* Previous photo */

function previousPhoto() {

    currentPhoto--;

    if (currentPhoto < 0) {
        currentPhoto = photos.length - 1;
    }

    lightboxImage.src = photos[currentPhoto].src;
    lightboxImage.alt = photos[currentPhoto].alt;

}


/* Close when clicking outside image */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


/* =========================
   KEYBOARD CONTROLS
========================= */

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        nextPhoto();
    }

    if (event.key === "ArrowLeft") {
        previousPhoto();
    }

});


/* =========================
   MOBILE SWIPE
========================= */

let touchStartX = 0;
let touchEndX = 0;


lightbox.addEventListener("touchstart", (event) => {

    touchStartX =
        event.changedTouches[0].screenX;

});


lightbox.addEventListener("touchend", (event) => {

    touchEndX =
        event.changedTouches[0].screenX;

    handleSwipe();

});


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;

    if (Math.abs(difference) < 50) {
        return;
    }

    if (difference > 0) {
        nextPhoto();
    } else {
        previousPhoto();
    }

}


/* =========================
   PREVENT BROKEN IMAGES
========================= */

photos.forEach((photo) => {

    photo.addEventListener("error", () => {

        photo.style.display = "none";

        photo.parentElement.style.background =
            "linear-gradient(135deg, #1b1018, #090609)";

    });

});