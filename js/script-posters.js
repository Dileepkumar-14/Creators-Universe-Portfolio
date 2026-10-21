
document.addEventListener("DOMContentLoaded", function () {
    const posters = {
        "PARANORMAL CONNECTIONS":
            "assets/cards for scripts/paranormal-connections.png",

        "LOOP - BREAK - FREE":
            "assets/cards for scripts/loop-break-free.png"
    };

    const grid = document.getElementById("scriptGrid");
    if (!grid) return;

    function addPosters() {
        const cards = grid.querySelectorAll(".script-card");

        cards.forEach(function (card) {
            const heading = card.querySelector("h3");
            if (!heading) return;

            const title = heading.textContent.trim().toUpperCase();
            const imagePath = posters[title];
            if (!imagePath) return;

            // Avoid adding the same poster more than once.
            let image = card.querySelector(".script-poster-addon");

            if (!image) {
                image = document.createElement("img");
                image.className = "script-poster-addon";
                image.alt = title + " vertical poster";
                image.loading = "lazy";

                // Add the poster at the top of the existing card.
                card.insertBefore(image, card.firstChild);
            }

            image.src = imagePath;

            image.onerror = function () {
                console.error("Poster not found:", imagePath);
                image.alt = "Poster not found: " + imagePath;
                image.style.display = "none";
            };

            image.onload = function () {
                image.style.display = "block";
            };
        });
    }

    // main.js creates the cards dynamically, so check briefly
    // for the cards to appear before attaching the posters.
    let attempts = 0;

    const timer = setInterval(function () {
        addPosters();
        attempts++;

        if (grid.querySelectorAll(".script-card").length >= 2 ||
            attempts >= 30) {
            clearInterval(timer);
        }
    }, 200);
});
