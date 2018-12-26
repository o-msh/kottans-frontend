const url = "https://randomuser.me/api/?results=60";

const domElements = {
    main: null,
    loading: null,
    search: null,
    filter: null,
    radio: null
};

const state = {
    allFriends: [],
    filters: []
};

const getFriends = () => {
    return fetch(url)
        .then(response => {
            if (response.ok) return response.json();
            throw new Error(response.status);
        })
        .then(data => data.results);
};

const cleanMain = () => {
    domElements.main.innerHTML = "";
};

const resetFilters = () => {
    state.filters = [];
    domElements.radio.map(radio => radio.checked = false && radio.checked);
    domElements.search.value = "";
};

const render = data => {
    cleanMain();
    domElements.main.append(data);
};

const getPeopleInfo = people => {
    let info = document.createElement("div");
    info.classList.add("info");
    let gender = document.createElement("img");
    people.gender === "male" ? gender.setAttribute("src", "img/icon-male.png") : gender.setAttribute("src", "img/icon-female.png");
    info.innerHTML = `
        <ul>
            <li class='naming'>${people.name.first} ${people.name.last}</li>
            <li>${people.dob.age}</li>
            <li>${people.email}</li>
            <li>${gender.outerHTML}</li>
            <li>${people.phone}</li>
        </ul>`;
    return info;
};

const getPeoplePicture = people => {
    let picture = document.createElement("div");
    picture.classList.add("picture");
    let img = document.createElement("img");
    img.setAttribute("src", people.picture.large);
    picture.append(img);
    return picture;
};

const generateCards = data => {
    let fragment = document.createDocumentFragment();
    data.forEach(people => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.append(getPeoplePicture(people));
        card.append(getPeopleInfo(people));
        fragment.append(card);
    });
    return fragment;
};

const showLoader = () => domElements.loading.classList.remove("hide");

const hideLoader = () => domElements.loading.classList.add("hide");

const searchFriends = (data, value) => data.filter(obj => [obj.name.first].join().toUpperCase().includes(value.toUpperCase()));

const filterByGender = (data, value) => data.filter(obj => obj.gender.toUpperCase() === value.toUpperCase());

const ascSort = (a, b) => a < b ? -1 : 1;

const descSort = (a, b) => a < b ? 1 : -1;

const filterByName = (data, value) => {
    if (value === "asc") {
        return data.sort((a, b) => ascSort(a.name.first, b.name.first));
    } else if (value === "desc") {
        return data.sort((a, b) => descSort(a.name.first, b.name.first));
    } else {
        return data;
    }
};

const filterByAge = (data, value) => {
    if (value === "asc") {
        return data.sort((a, b) => ascSort(a.dob.age, b.dob.age));
    } else if (value === "desc") {
        return data.sort((a, b) => descSort(a.dob.age, b.dob.age));
    } else {
        return data;
    }
};

const filterController = () => state.filters.reduce((data, filter) => filter.func(data, filter.value), state.allFriends);

const prepareFilters = options => {
    let filterIndex = state.filters.findIndex(obj => obj.name === options.name);
    filterIndex != "-1" ? state.filters[filterIndex].value = options.value : state.filters.push(options);
};

const searchHandlerInput = e => {
    prepareFilters({ name: "search", func: searchFriends, value: e.target.value });
    render(generateCards(filterController()));
};

const filterHandlerChange = e => {
    let target = e.target;
    if (target.type === "radio") {
        let radioName = target.name;
        let radioValue = target.value;
        let func = null;
        switch (radioName) {
            case "gender":
                func = filterByGender;
                break;
            case "name":
                func = filterByName;
                break;
            case "age":
                func = filterByAge;
                break;     
            default:
                break;
        }
        prepareFilters({ name: radioName, func, value: radioValue });
        render(generateCards(filterController()));
    }
    if (target.matches("[data-type=fetch]") || target.matches("[data-type=reset]")) {
        let type = target.dataset.type;
        resetFilters();
        switch (type) {
            case "fetch":
                cleanMain();
                initData();
                break;
            case "reset":
                render(generateCards(state.allFriends));
                break;
            default:
                break;
        }
    }
};

const initDomElements = () => {
    domElements.main = document.querySelector(".main");
    domElements.loading = document.querySelector(".loader");
    domElements.search = document.querySelector(".search");
    domElements.filter = document.querySelector(".filter");
    domElements.radio = Array.from(document.querySelectorAll("input[type=radio]"));
};

const initData = async () => {
    try {
        showLoader();
        state.allFriends = await getFriends();
        hideLoader();
        render(generateCards(state.allFriends));
    } catch (e) {
        hideLoader();
        render(generateErrorMessage(e));
    }
};

const initEventListener = () => {
    domElements.search.addEventListener('input', searchHandlerInput);
    domElements.filter.addEventListener('click', filterHandlerChange);
};

const generateErrorMessage = (e) => {
    let errorBlock = document.createElement("div");
    errorBlock.classList.add("error");
    errorBlock.innerHTML = `Oops... ${e.message}`;
    return errorBlock;
};

window.onload = async () => {
    initDomElements();
    initData();
    initEventListener();
};
