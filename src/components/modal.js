const openModal = (popup) => {
	popup.classList.add("popup_is-opened", "popup_is-animated");
};

const closeModal = (popup) => {
	popup.classList.remove("popup_is-opened");
};

export { openModal, closeModal };
