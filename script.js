function nextPage() {
    document.getElementById("page2").scrollIntoView({
        behavior: "smooth"
    });
}

function restart() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", function () {
    if (music.paused) {
        music.play();
        musicBtn.textContent = "🔊";
    } else {
        music.pause();
        musicBtn.textContent = "🎵";
    }
});