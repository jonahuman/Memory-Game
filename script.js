document.addEventListener("DOMContentLoaded", () => {
    const images = [
        "https://i.pinimg.com/564x/87/a8/a3/87a8a378128df67cc09df6eda20be10f.jpg",
        "https://i.pinimg.com/564x/e2/a1/d0/e2a1d0d0d616667bb25e88e7d1076989.jpg",
        "https://i.pinimg.com/564x/09/04/8c/09048c22163ed65e5adff28ba0f87deb.jpg",
        "https://i.pinimg.com/564x/04/f4/97/04f4976adfaf9c905ccc6712e1126139.jpg",
        "https://i.pinimg.com/564x/04/f4/97/04f4976adfaf9c905ccc6712e1126139.jpg",
        "https://i.pinimg.com/564x/87/a8/a3/87a8a378128df67cc09df6eda20be10f.jpg",
        "https://i.pinimg.com/564x/09/04/8c/09048c22163ed65e5adff28ba0f87deb.jpg",
        "https://i.pinimg.com/564x/e2/a1/d0/e2a1d0d0d616667bb25e88e7d1076989.jpg",
    ];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const randomizedImages = shuffleArray(images);

    const grid = document.querySelector(".grid");
    let cardsChosen = [];
    let cardsChosenIds = [];
    let cardsMatched = [];

    function flipCard() {
        const cardId = this.getAttribute("data-id");
        if (!cardsMatched.includes(cardId) && cardsChosenIds.length < 2) {
            cardsChosen.push(randomizedImages[cardId]);
            cardsChosenIds.push(cardId);
            this.querySelector("img").style.display = "block";

            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll(".card");

        const card1Id = cardsChosenIds[0];
        const card2Id = cardsChosenIds[1];

        if (cardsChosen[0] === cardsChosen[1]) {
            cardsMatched.push(card1Id, card2Id);
            cards.forEach((card) => {
                const cardId = card.getAttribute("data-id");
                if (cardsMatched.includes(cardId)) {
                    card.removeEventListener("click", flipCard);
                }
            });
        } else {
            cards.forEach((card) => {
                card.querySelector("img").style.display = "none";
            });
        }

        cardsChosen = [];
        cardsChosenIds = [];

        if (cardsMatched.length === images.length) {
            setTimeout(() => {
                alert("Felicitaciones, Has acertado!");
            }, 500);
        }
    }

    function createBoard() {
        randomizedImages.forEach((image, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("data-id", index);
            card.addEventListener("click", flipCard);

            const img = document.createElement("img");
            img.src = image;
            card.appendChild(img);

            grid.appendChild(card);
        });
    }

    createBoard();
});
