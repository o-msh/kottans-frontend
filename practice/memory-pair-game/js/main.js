const flipClassName = "flipped";
const imgs = [
    "../img/santa_christmas_emoji_cool_sunglasses.png",
    "../img/santa_christmas_emoji_dribble_silly.png",
    "../img/santa_christmas_emoji_love.png",
    "../img/santa_christmas_emoji_nerd_smart.png",
    "../img/santa_christmas_emoji_sleep_tired.png",
    "../img/santa_christmas_emoji_wink_tongue.png"
];
let openedCards = [];

const handlerFlip = e => {
    let card = e.target.parentNode;
    let src = card.querySelector("img").getAttribute("src");
    if (card.matches(".card")) {
        if (!card.classList.contains(flipClassName)) {
            let item = card.dataset.item;
            card.classList.add(flipClassName);
            openedCards.push({ item: item, card: card, src: src });
            checkCoincidence();
        }
    }
};

const checkCoincidence = () => {
    let length = openedCards.length;
    if (length === 2) {
        if (openedCards[0].src === openedCards[1].src) {
            hideCoincidence();
        } else {
            hideFlipped();
        }
        openedCards = [];
    }
};

const hideCoincidence = () => {
    openedCards.forEach(({ card }) => {
        setTimeout(() => {
            card.classList.remove(flipClassName);
            card.classList.add("hidden");
        }, 1000);
    });
};

const hideFlipped = () => {
    openedCards.forEach(({ card }) => {
        setTimeout(() => {
            card.classList.toggle(flipClassName);
        }, 1000);
    })
};

createCards = () => {
    let fragment = document.createDocumentFragment();
    let images = imgs;
    images = images.concat(images);
    images.sort(function () { return 0.5 - Math.random() });
    for (let i = 0; i < images.length; i++) {
        let card = document.createElement("div");
        let front_side = document.createElement("div");
        let back_side = document.createElement("img");
        back_side.setAttribute("src", images[i]);
        card.classList.add("card");
        card.dataset.item = i;
        front_side.classList.add("card_side", "front");
        back_side.classList.add("card_side", "back");
        card.appendChild(front_side);
        card.appendChild(back_side);
        fragment.appendChild(card);
    };
    return fragment;
};

window.onload = () => {
    const container = document.querySelector(".container");
    container.appendChild(createCards());
    container.addEventListener("click", handlerFlip);
};