const handleCloseByEsc = (evt) => {
	if (evt.key === "Escape") {
		const openedPopup = document.querySelector(".popup_is-opened");

		if (openedPopup) {
			closeModal(openedPopup);
		}
	}
};

const handleCloseByOverlay = (evt) => {
	if (evt.target === evt.currentTarget) {
		closeModal(evt.currentTarget);
	}
};

const openModal = (popup) => {
	popup.classList.add("popup_is-opened", "popup_is-animated");

	document.addEventListener("keydown", handleCloseByEsc);
	popup.addEventListener("mousedown", handleCloseByOverlay);
};

const closeModal = (popup) => {
	popup.classList.remove("popup_is-opened");

	document.removeEventListener("keydown", handleCloseByEsc);
	popup.removeEventListener("mousedown", handleCloseByOverlay);
};

export { openModal, closeModal };
