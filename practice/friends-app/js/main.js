const url = "https://randomuser.me/api/?results=30";
const friends = {};
let main;

const getFriends = () => {
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(`Error response from '${url}'`);
        })
        .then(data => data)
        .catch(error => console.error(error.message));
};

const renderFriends = () => {
    if (friends.results && friends.results.length > 0) {
        
    }
};

window.onload = async () => {
    main = document.querySelector(".main");
    Object.assign(friends, await getFriends());
    renderFriends();
};