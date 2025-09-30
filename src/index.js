import "./styles/index.css";

import { initialCards } from "./components/cards";
import { createCardElement, handleDeleteCard } from "./components/card";
import { openModal, closeModal } from "./components/modal";

const cardTemplate = document
	.querySelector("#card-template")
	.content.querySelector(".places__item");

const cardSelectors = {
	deleteButton: ".card__delete-button",
	cardImage: ".card__image",
	cardTitle: ".card__title",
};

const placesWrap = document.querySelector(".places__list");

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const editProfilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");

initialCards.forEach((data) => {
	placesWrap.append(
		createCardElement({
			cardTemplate,
			cardSelectors,
			cardData: data,
			cardHandlers: {
				onDelete: handleDeleteCard,
			},
		})
	);
});

editProfileButton.addEventListener("click", () => {
	openModal(editProfilePopup);
});

addCardButton.addEventListener("click", () => {
	openModal(addCardPopup);
});

document.querySelectorAll(".popup").forEach((popup) => {
	const closeButton = popup.querySelector(".popup__close");

	if (closeButton) {
		closeButton.addEventListener("click", () => closeModal(popup));
	}
});
