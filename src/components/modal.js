const handleCloseByEsc = (evt) => {
	if (evt.key === "Escape") {
		const openedModal = document.querySelector(".popup_is-opened");

		if (openedModal) {
			closeModal(openedModal);
		}
	}
};

const handleCloseByOverlay = (evt) => {
	if (evt.target === evt.currentTarget) {
		closeModal(evt.currentTarget);
	}
};

const openModal = (modalElement) => {
	modalElement.classList.add("popup_is-opened", "popup_is-animated");

	document.addEventListener("keydown", handleCloseByEsc);
	modalElement.addEventListener("mousedown", handleCloseByOverlay);
};

const closeModal = (modalElement) => {
	modalElement.classList.remove("popup_is-opened");

	document.removeEventListener("keydown", handleCloseByEsc);
	modalElement.removeEventListener("mousedown", handleCloseByOverlay);
};

export { openModal, closeModal };
