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
    let currentCard = e.target;
    let item;
    if (currentCard.matches("[data-item]")) {
        item = currentCard.dataset.item;
        document.querySelector(`[data-item='${item}']`).classList.remove("flipped");
    } else {
        currentCard.parentNode.classList.add("flipped");
        item = currentCard.parentNode.dataset.item;
        openedCards.push(item);
    }
    checkState();
};

const checkState = () => {
    if (openedCards.length > 2) {
        document.querySelectorAll(".flipped").forEach(el => {
            el.classList.toggle("flipped");
        });
        openedCards = [];
    }
};

createCards = () => {
    let fragment = document.createDocumentFragment();
    let images = imgs;
    images = images.concat(images);
    images.sort(function () { return 0.5 - Math.random() });
    for (let i = 0; i < images.length; i++) {
        let card = document.createElement("div");
        let front_side = document.createElement("div");
        let back_side = document.createElement("div");
        let img = document.createElement("img");
        img.setAttribute("src", images[i]);
        img.dataset.item = i;
        card.dataset.item = i;
        card.classList.add("card");
        front_side.classList.add("card_side", "front");
        back_side.classList.add("card_side", "back");
        back_side.appendChild(img);
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