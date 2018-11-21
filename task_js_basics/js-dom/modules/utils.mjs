import data from './data.mjs';

const init = () => {
    let navigation = document.querySelector(".navigation");
    let menu = document.createElement("ul");
    data.forEach(el => {
        menu.insertAdjacentHTML("beforeend", `<li class='menu_item'><a href="${el.link}"><div class="left_border"></div>${el.title}${el.icon}</a></li>`);
    })
    navigation.appendChild(menu);
}

export default {
    init
};