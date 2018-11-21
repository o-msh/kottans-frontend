import data from './data.mjs';

const generateMenu = (data) => {
    if (data.length > 0) {
        if (data.every(menuItem => { return menuItem.title && menuItem.link && menuItem.content && menuItem.icon })) {
            let menu = document.createElement("ul");
            data.forEach(el => {
                let li = document.createElement("li");
                li.className = "menu_item";
                let a = document.createElement("a");
                a.href = el.link;
                let div = document.createElement("div");
                div.className = "left_border";
                a.appendChild(div);
                a.innerHTML += `${el.title}${el.icon}`;
                li.appendChild(a);
                menu.appendChild(li);
            })
            return menu;
        }
    }
    return false;
}

const init = () => {
    let menu = generateMenu(data);
    menu ? document.querySelector(".navigation").appendChild(menu) : alert("Error menu generation");
}

export default {
    init
};