import { state } from "./state.mjs";

const cleanMain = () => {
    state.dom.main.innerHTML = "";
};

const render = data => {
    cleanMain();
    state.dom.main.append(data);
};

const showLoader = () => state.dom.loading.classList.remove("hide");

const hideLoader = () => state.dom.loading.classList.add("hide");

const generateErrorMessage = (e) => {
    let errorBlock = document.createElement("div");
    errorBlock.classList.add("error");
    errorBlock.innerHTML = `Oops... ${e.message}`;
    return errorBlock;
};

export default {
    cleanMain,
    render,
    showLoader,
    hideLoader,
    generateErrorMessage
};
