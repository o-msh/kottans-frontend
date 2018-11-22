import data from './data.mjs';

const generateMenu = (data) => {
    if (data.length > 0 && (data.every(menuItem => { return menuItem.title && menuItem.link && menuItem.content && menuItem.icon }))) {
        let defaultFlag = false;
        let menu = document.createElement("ul");
        data.forEach(el => {
            let li = document.createElement("li");
            if (el.default && !defaultFlag) {
                defaultFlag = !defaultFlag;
                li.classList.add("menu_item", "active");
                document.querySelector(".content").innerHTML = el.content;
                window.location.hash = el.link;
            } else {
                li.classList.add("menu_item");
            }
            let a = document.createElement("a");
            a.addEventListener("click", e => menuHandlerClick(e));
            a.href = el.link;
            let div = document.createElement("div");
            div.classList.add("left_border");
            a.appendChild(div);
            a.innerHTML += `${el.title}${el.icon}`;
            li.appendChild(a);
            menu.appendChild(li);
        })
        return menu;
    }
    return false;
}

const menuHandlerClick = (e) => {
    let current = e.target;
    document.querySelector(".menu_item.active").classList.remove("active");
    getParentNode(current, "LI").classList.add("active");
    if (current.tagName !== "A") {
        current = getParentNode(current, "A");
    }
    document.querySelector(".content").innerHTML = getContent(current.getAttribute("href"));
    let btnGetData = document.querySelector(".btn_get_data");
        btnGetData ? btnGetData.addEventListener("click", e => btnHandlerClick(e)) : null;
    return;
}

const btnHandlerClick = e => {
    let type = e.target.dataset.type;
    switch (type) {
        case "random_user":
            fetch("https://randomuser.me/api/?results=5").then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            }).then(user => {
                if (window.location.hash === "#random_user") {
                    let div = document.querySelector("div.user_div");
                    if (!div) {
                        div = document.createElement("div");
                    } else {
                        div.innerHTML = "";
                    }
                    div.classList.add("user_div");
                    user.results.forEach(el => {
                        let userCard = document.createElement("div");
                        userCard.classList.add("user_card");
                        let img = document.createElement("img");
                        img.src = el.picture.large;
                        userCard.appendChild(img);
                        let userInfo = document.createElement("div");
                        userInfo.classList.add("user_info");
                        userInfo.insertAdjacentHTML("beforeend", `<ul>
                                <li>${el.name.first.charAt(0).toUpperCase() + el.name.first.slice(1)} ${el.name.last.charAt(0).toUpperCase() + el.name.last.slice(1)}, ${el.dob.age}</li>
                                <li>${el.email}</li>
                                <li>${el.cell}</li>
                            </ul>`);
                        userCard.appendChild(userInfo);
                        div.appendChild(userCard);
                    });
                    document.querySelector(".content").appendChild(div);
                }
            }).catch(e => {
                console.log('There has been a problem with your fetch operation: ' + e.message);
            });
            break;
        case "currency":
            break;
        default:
            break;
    }
}

const getContent = link => {
    let dataElement = data.filter(el => el.link === link);
    return dataElement[0].content;
}

const getParentNode = (node, parentTag) => {
    if (node.parentNode.tagName === parentTag) {
        return node.parentNode;
    } else {
        return getParentNode(node.parentNode, parentTag);
    }
}

const init = () => {
    let menu = generateMenu(data);
    menu ? document.querySelector(".navigation").appendChild(menu) : alert("Error menu generation");
    return;
}

export default {
    init
};