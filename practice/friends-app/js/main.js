const url = "https://randomuser.me/api/?results=60";

const domElements = {
    main: false,
    loading: false,
    search: false,
    filter: false
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

const render = data => {
    domElements.main.innerHTML = "";
    domElements.main.append(data);
};

const getPeopleInfo = people => {
    const info = document.createElement("div");
    info.classList.add("info");
    const gender = document.createElement("img");
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
    const picture = document.createElement("div");
    picture.classList.add("picture");
    const img = document.createElement("img");
    img.setAttribute("src", people.picture.large);
    picture.append(img);
    return picture;
};

const generateCards = data => {
    const fragment = document.createDocumentFragment();
    data.forEach(people => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.append(getPeoplePicture(people));
        card.append(getPeopleInfo(people));
        fragment.append(card);
    });
    return fragment;
};

const showLoader = () => domElements.loading.classList.remove("hide");
const hideLoader = () => domElements.loading.classList.add("hide");

const initDomElements = () => {
    domElements.main = document.querySelector(".main");
    domElements.loading = document.querySelector(".loading");
    domElements.search = document.querySelector(".search");
    domElements.filter = document.querySelector(".filter");
};

const searchFriends = (data, value) => data.filter(obj => [obj.name.first].join().toUpperCase().includes(value.toUpperCase()));

const filterByGender = (data, value) => data.filter(obj => obj.gender.toUpperCase() === value.toUpperCase());

const filterController = () => {
    let filteredFriends = state.allFriends;
    return state.filters.reduce((data, filter) => {
        return filter.func(data, filter.value);
    }, filteredFriends);
};

const prepareFilters = options => {
    let filterIndex = state.filters.findIndex(obj => obj.name === options.name);
    filterIndex != "-1" ? state.filters[filterIndex].value = options.value : state.filters.push(options);
}

const searchHandlerInput = e => {
    prepareFilters({ name: "search", func: searchFriends, value: e.target.value });
    render(generateCards(filterController()));
};

const filterHandler = e => {
    const target = e.target;
    if (target.type === "radio") {
        const radioName = target.name;
        const radioValue = target.value;
        console.log(radioName, radioValue);
    }
};

const setEventListener = () => {
    domElements.search.addEventListener('input', searchHandlerInput);
    domElements.filter.addEventListener('click', filterHandler);
};

const generateErrorMessage = (e) => {
    const errorBlock = document.createElement("div");
    errorBlock.classList.add("error");
    errorBlock.innerHTML = `Oops... ${e.message}`;
    return errorBlock;
}

window.onload = async () => {
    try {
        initDomElements();
        showLoader();
        state.allFriends = await getFriends();
        hideLoader();
        render(generateCards(state.allFriends));
        setEventListener();
    } catch (e) {
        hideLoader();
        render(generateErrorMessage(e));
    }
};
