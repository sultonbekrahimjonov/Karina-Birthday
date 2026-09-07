function nextPage() {

    const page2 = document.getElementById("page2");
    const page3 = document.getElementById("page3");

    // Musiqani birinchi bosishda boshlash
    if (music.paused) {
        music.play().catch(() => {});
        musicBtn.textContent = "🔊";
    }

    if (window.scrollY < page2.offsetTop - 100) {

        page2.scrollIntoView({
            behavior: "smooth"
        });

    } else {

        page3.scrollIntoView({
            behavior: "smooth"
        });

    }
}


function restart() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* MUSIC */

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

music.volume = 0.45;


/* Music button */

musicBtn.addEventListener("click", function () {

    if (music.paused) {

        music.play()
            .then(function () {
                musicBtn.textContent = "🔊";
            })
            .catch(function () {});

    } else {

        music.pause();
        musicBtn.textContent = "🎵";

    }

});


/* PHOTO LIGHTBOX */

const photos = document.querySelectorAll(".photo img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

let currentPhoto = 0;


photos.forEach(function (photo, index) {

    photo.addEventListener("click", function () {

        currentPhoto = index;

        lightboxImage.src = photo.src;
        lightboxImage.alt = photo.alt;

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}


function nextPhoto() {

    currentPhoto++;

    if (currentPhoto >= photos.length) {
        currentPhoto = 0;
    }

    lightboxImage.src = photos[currentPhoto].src;
    lightboxImage.alt = photos[currentPhoto].alt;

}


function previousPhoto() {

    currentPhoto--;

    if (currentPhoto < 0) {
        currentPhoto = photos.length - 1;
    }

    lightboxImage.src = photos[currentPhoto].src;
    lightboxImage.alt = photos[currentPhoto].alt;

}


lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {
        closeLightbox();
    }

});